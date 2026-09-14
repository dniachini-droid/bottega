#!/usr/bin/env node
// TESTS FOR THE BUDGET CHECK.
//
// WHY THESE EXIST, AND WHY THESE TWO. The measurement script was wrong twice
// in one day, in opposite directions, and both faults were found by a person
// reading it rather than by anything that would have caught them a second
// time:
//
//   1. It counted every instruction file whole, including skills a session is
//      only ever shown one line of. It reported about 9,980 tokens of 10,000
//      when the true figure was about 2,200 — a four-fold over-count that made
//      the workshop look nearly full when it was a quarter full, and nearly
//      forced real content out to make room.
//   2. It charged nothing for a file the instructions order a session to read
//      when that file sits outside the skill's own folder. Every Da Vinci
//      session is sent to docs/REVIEWER.md and on to docs/PRECEDENTS.md —
//      6,540 bytes of compulsory reading, counted as zero. Worse, that split
//      was made in order to fit under this budget: the move that solved the
//      budget problem was the way to defeat it.
//
// So there is one test per fault. Each was watched failing against the old
// broken behaviour before it was trusted — what was seen is written down in
// docs/REFUSALS.md. *Why that matters: a test never seen failing cannot be
// told apart from one that cannot fail.*
//
// HOW THEY WORK. Each test builds a tiny make-believe workshop in a temporary
// folder — its own rules file, its own skill, its own agent definition, its own
// reading list — copies the real check into it, and runs it. *Why a copy rather
// than pointing the check at a folder: the check works out where the repository
// is from where it sits, which is the right behaviour for a check that must
// not be talked into measuring somewhere else. Copying it needs no change to
// the thing being tested, and no way to aim it at a different tree.*
//
// *Why a make-believe workshop rather than this repository: a test that reads
// the real numbers would have to be edited every time a real file changes, and
// would soon be edited to whatever the code said. The sizes here are chosen by
// the test, so the expected numbers are arithmetic and not a recording.*
//
// These tests are never read by a session, so they cost nothing against either
// startup limit. They run in the automatic checks on every push.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, statSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CHECK = join(HERE, 'check-budgets.mjs');

// --- Building the make-believe workshop -----------------------------------

// Filler of an exact size, with nothing in it that could be read as a file
// path. *Why it matters that there are no backticks in it: a backticked path
// inside a charged file that the reading list does not classify stops the
// check, and the fixture would then fail for a reason that has nothing to do
// with what is being tested.*
const filler = (bytes) => 'padding words that mean nothing '
  .repeat(Math.ceil(bytes / 32)).slice(0, bytes - 1) + '\n';

// A skill body large enough that counting it whole instead of counting the one
// line a session is shown is unmistakable in the number, not a rounding.
const SKILL_BODY_BYTES = 8000;
const METHOD_BODY_BYTES = 1200;
const PRECEDENTS_BODY_BYTES = 600;

const SKILL_NAME = 'heavy';
const SKILL_DESCRIPTION = 'One short line, which is all a session is shown.';
const AGENT_NAME = 'reader';
const AGENT_DESCRIPTION = 'Another short line, and a file it must go and read.';

// What a session is shown of a skill or an agent definition: its name and its
// description, as one line.
const offeredBytes = (name, description) =>
  Buffer.byteLength(`- ${name}: ${description}\n`, 'utf8');

function writeAt(root, rel, text) {
  const full = join(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, text);
  return full;
}

function buildFixture() {
  const root = mkdtempSync(join(tmpdir(), 'budget-check-test-'));

  writeAt(root, 'AGENTS.md',
    '# Rules\n\nThe measurement is `tools/check-budgets.mjs`, and nothing\n' +
    'here sends a session away to read anything.\n');

  writeAt(root, '.claude/settings.json', '{}\n');

  // A skill: one line offered, a large body behind it.
  writeAt(root, '.claude/skills/heavy/SKILL.md',
    `---\nname: ${SKILL_NAME}\ndescription: ${SKILL_DESCRIPTION}\n---\n\n` +
    filler(SKILL_BODY_BYTES));

  // An agent definition that orders its session to read a file living outside
  // its own folder, which in turn sends it on to a third file.
  writeAt(root, '.claude/agents/reader.md',
    `---\nname: ${AGENT_NAME}\ndescription: ${AGENT_DESCRIPTION}\n---\n\n` +
    'Read `docs/METHOD.md` before you look at anything. That is the method.\n');

  writeAt(root, 'docs/METHOD.md',
    'The precedents are in `docs/PRECEDENTS.md`. Read that before you report.\n' +
    filler(METHOD_BODY_BYTES));

  writeAt(root, 'docs/PRECEDENTS.md', filler(PRECEDENTS_BODY_BYTES));

  writeAt(root, 'tools/reads.json', JSON.stringify({
    'AGENTS.md': { reads: [], mentions: ['tools/check-budgets.mjs'] },
    '.claude/skills/heavy/SKILL.md': { reads: [], mentions: [] },
    '.claude/agents/reader.md': { reads: ['docs/METHOD.md'], mentions: [] },
    'docs/METHOD.md': { reads: ['docs/PRECEDENTS.md'], mentions: [] },
  }, null, 2) + '\n');

  mkdirSync(join(root, 'tools'), { recursive: true });
  copyFileSync(CHECK, join(root, 'tools/check-budgets.mjs'));

  return root;
}

// --- Running it and reading its report ------------------------------------

// The report is read back rather than the script's insides being inspected,
// because the report is the thing a person acts on. If the printed number is
// wrong, the check is wrong, whatever it worked out on the way.
function run(root) {
  const result = spawnSync(process.execPath, [join(root, 'tools/check-budgets.mjs')],
    { encoding: 'utf8' });
  const out = result.stdout ?? '';

  const sections = { every: [], sets: [], heaviest: [] };
  let where = null;
  let label = null;
  const setBlocks = new Map();

  for (const line of out.split('\n')) {
    if (line.startsWith('WHAT EVERY SESSION LOADS')) { where = 'every'; continue; }
    if (line.startsWith('WHAT EACH KIND OF SESSION LOADS')) { where = 'sets'; continue; }
    if (line.startsWith('WHAT THE HEAVIEST SINGLE SESSION LOADS')) { where = 'heaviest'; continue; }
    if (!where) continue;

    const row = /^\s+(-?\d+) bytes {2}(.*)$/.exec(line);
    if (row) {
      const entry = { bytes: Number(row[1]), what: row[2].trim() };
      if (where === 'sets' && label) setBlocks.get(label).push(entry);
      else if (where !== 'sets') sections[where].push(entry);
      continue;
    }
    const heading = /^ {2}(\S.*)$/.exec(line);
    if (heading && where === 'sets') {
      label = heading[1].trim();
      if (!setBlocks.has(label)) setBlocks.set(label, []);
    }
  }

  const totalOf = (rows) => {
    const hit = rows.find((r) => r.what.startsWith('TOTAL'));
    return hit ? hit.bytes : null;
  };

  return {
    status: result.status,
    stdout: out,
    everyBytes: totalOf(sections.every),
    heaviestBytes: totalOf(sections.heaviest),
    set(name) {
      const rows = setBlocks.get(name);
      assert.ok(rows, `the report has no section for ${name}. It printed:\n${out}`);
      return {
        rows,
        total: totalOf(rows),
        bytesFor(rel) {
          const hit = rows.find((r) => r.what === rel);
          return hit ? hit.bytes : null;
        },
      };
    },
  };
}

const sizeOf = (root, rel) => statSync(join(root, rel)).size;

// --- Fault one: instruction files counted whole ---------------------------

test('a skill is charged to every session as one line, not as its whole body', (t) => {
  const root = buildFixture();
  // The make-believe workshop is thrown away afterwards either way. *Why even
  // on a failure: every assertion below prints the whole report it read, so
  // there is nothing left in the folder that a person would need to go and
  // look at.*
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const report = run(root);

  assert.equal(report.status, 0,
    `the check should pass on this fixture. It printed:\n${report.stdout}`);

  // What every session really loads: the rules file, the settings file, and one
  // offered line each for the skill and the agent definition. Nothing else.
  const expected =
    sizeOf(root, 'AGENTS.md') +
    sizeOf(root, '.claude/settings.json') +
    offeredBytes(SKILL_NAME, SKILL_DESCRIPTION) +
    offeredBytes(AGENT_NAME, AGENT_DESCRIPTION);

  assert.equal(report.everyBytes, expected,
    'what every session loads was not the rules file, the settings file and ' +
    'one line per set of instructions. If it is larger by about the size of ' +
    `the skill body (${SKILL_BODY_BYTES} bytes), the check is counting ` +
    `instruction files whole again.\nIt printed:\n${report.stdout}`);

  // And the body is not simply ignored: it is charged to the session that
  // opens the skill. *Why this half is here too: a check that counted nothing
  // at all would pass the assertion above.*
  const skill = report.set('.claude/skills/heavy/');
  assert.equal(skill.bytesFor('.claude/skills/heavy/SKILL.md'),
    sizeOf(root, '.claude/skills/heavy/SKILL.md'),
    `the skill body must be charged in full to the session that opens it.\nIt printed:\n${report.stdout}`);
});

// --- Fault two: reading the instructions order, charged as nothing --------

test('a file an agent definition sends a session to read is charged to it, and so is the next one', (t) => {
  const root = buildFixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const report = run(root);

  assert.equal(report.status, 0,
    `the check should pass on this fixture. It printed:\n${report.stdout}`);

  const reader = report.set('.claude/agents/reader.md');

  assert.equal(reader.bytesFor('docs/METHOD.md'), sizeOf(root, 'docs/METHOD.md'),
    'the reader is ordered to read docs/METHOD.md and it was charged nothing. ' +
    'That is the fault that hid 6,540 bytes of compulsory reading behind a ' +
    `one-line pointer.\nIt printed:\n${report.stdout}`);

  assert.equal(reader.bytesFor('docs/PRECEDENTS.md'), sizeOf(root, 'docs/PRECEDENTS.md'),
    'docs/METHOD.md sends the reader on to docs/PRECEDENTS.md, and that was ' +
    'charged nothing. Stopping after one step reopens the same hole one level ' +
    `down.\nIt printed:\n${report.stdout}`);

  // The whole number for that session, worked out by hand: everything every
  // session loads, plus the agent definition and both files it is sent to,
  // less the one line already counted in the floor.
  const expected = report.everyBytes +
    sizeOf(root, '.claude/agents/reader.md') +
    sizeOf(root, 'docs/METHOD.md') +
    sizeOf(root, 'docs/PRECEDENTS.md') -
    offeredBytes(AGENT_NAME, AGENT_DESCRIPTION);

  assert.equal(reader.total, expected,
    `what a reader session loads was not what it loads.\nIt printed:\n${report.stdout}`);
});
