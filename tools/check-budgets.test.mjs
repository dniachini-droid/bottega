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
// A third group of tests was added on 14 September 2026, when the check began
// printing a number it cannot itself measure: how big the prompt was that
// started a session. There was no fault behind those — they are here because
// that number is a recording rather than a measurement, and the two ways it
// could quietly become wrong are a saved prompt with nothing in it and one
// whose name says nothing about which session it belongs to. Both were watched
// refusing before the tests were written; what was seen is in docs/REFUSALS.md.
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
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, statSync, rmSync } from 'node:fs';
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

// `prompts` is a map of file name to contents, written into one project's
// prompts folder. A prompt saved there is measured and reported beside the two
// budgets, and is charged to neither.
function buildFixture(prompts = null) {
  const root = mkdtempSync(join(tmpdir(), 'budget-check-test-'));

  if (prompts) {
    for (const [name, text] of Object.entries(prompts)) {
      writeAt(root, `projects/make-believe/prompts/${name}`, text);
    }
  }

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

  const sections = { every: [], sets: [], heaviest: [], prompts: [] };
  let where = null;
  let label = null;
  const setBlocks = new Map();

  for (const line of out.split('\n')) {
    if (line.startsWith('WHAT EVERY SESSION LOADS')) { where = 'every'; continue; }
    if (line.startsWith('WHAT EACH KIND OF SESSION LOADS')) { where = 'sets'; continue; }
    if (line.startsWith('WHAT THE HEAVIEST SINGLE SESSION LOADS')) { where = 'heaviest'; continue; }
    if (line.startsWith('HOW BIG THE PROMPTS WERE')) { where = 'prompts'; continue; }
    if (!where) continue;

    const prompt = /^\s+(\d+) bytes {2}about\s+(\d+) tokens {2}(.*)$/.exec(line);
    if (where === 'prompts' && prompt) {
      sections.prompts.push({
        bytes: Number(prompt[1]),
        tokens: Number(prompt[2]),
        what: prompt[3].trim(),
      });
      continue;
    }

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
    prompts: sections.prompts,
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

// --- The third number: a saved prompt, measured and kept apart ------------

test('a saved prompt is reported at its real size, and added to neither budget', (t) => {
  const bare = buildFixture();
  t.after(() => rmSync(bare, { recursive: true, force: true }));
  const before = run(bare);

  const PROMPT_BYTES = 3000;
  const root = buildFixture({ '12-build.md': filler(PROMPT_BYTES) });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const report = run(root);

  assert.equal(report.status, 0,
    `a saved prompt is not a failure. It printed:\n${report.stdout}`);

  assert.deepEqual(report.prompts.map((p) => p.what), ['make-believe #12 build'],
    'the saved prompt was not reported, or was reported without saying which ' +
    `pull request and stage it belongs to.\nIt printed:\n${report.stdout}`);

  assert.equal(report.prompts[0].bytes, sizeOf(root, 'projects/make-believe/prompts/12-build.md'),
    `the prompt was reported at a size that is not its size.\nIt printed:\n${report.stdout}`);

  // The point of the comparison with a fixture that has no prompt in it: the
  // two budgets must be the same number either way. *Why that is worth a test:
  // a prompt is handed to a session on top of everything it loads, so folding
  // it in looks like the accurate thing to do — and would move two limits the
  // owner settled, without anybody deciding to.*
  assert.equal(report.everyBytes, before.everyBytes,
    `saving a prompt changed what every session loads.\nIt printed:\n${report.stdout}`);
  assert.equal(report.heaviestBytes, before.heaviestBytes,
    `saving a prompt changed what the heaviest session loads.\nIt printed:\n${report.stdout}`);
});

test('a saved prompt that is empty, or that does not say which session it is, stops the check', (t) => {
  const empty = buildFixture({ '12-build.md': '   \n' });
  t.after(() => rmSync(empty, { recursive: true, force: true }));
  const onEmpty = run(empty);

  assert.equal(onEmpty.status, 1,
    'a saved prompt with nothing in it passed. It would be reported as a ' +
    `prompt of no size, which no prompt is.\nIt printed:\n${onEmpty.stdout}`);
  assert.match(onEmpty.stdout, /EMPTY {2}projects\/make-believe\/prompts\/12-build\.md/,
    `the refusal did not say which file was empty.\nIt printed:\n${onEmpty.stdout}`);

  const misnamed = buildFixture({ 'notes.md': 'a prompt with no session named\n' });
  t.after(() => rmSync(misnamed, { recursive: true, force: true }));
  const onMisnamed = run(misnamed);

  assert.equal(onMisnamed.status, 1,
    'a saved prompt whose name says nothing about which session it came from ' +
    `passed. Its size is then a number nobody can place.\nIt printed:\n${onMisnamed.stdout}`);
  assert.match(onMisnamed.stdout, /BADLY NAMED {2}projects\/make-believe\/prompts\/notes\.md/,
    `the refusal did not say which file was badly named.\nIt printed:\n${onMisnamed.stdout}`);
  assert.deepEqual(onMisnamed.prompts, [],
    'a badly named prompt was measured anyway, beside the refusal. It must be ' +
    `refused instead of counted.\nIt printed:\n${onMisnamed.stdout}`);
});

// --- A backticked name inside a skill that is in neither list ---------------
//
// WHY THIS EXISTS. This test was written on 15 September 2026 as the stages
// machinery came out. Six tests went with it; this one was rewritten rather
// than deleted, because the guard it exercises is not part of stages and is
// still live: a file a session is sent to read may name another file, and a
// name that tools/reads.json puts in neither the reads list nor the mentions
// list stops the check rather than being quietly dropped. Watched failing
// against a check with that guard removed before it was trusted.

test('a backticked name a skill leaves unclassified stops the check', () => {
  const root = buildFixture();
  writeAt(root, '.claude/skills/heavy/extra.md',
    'The rules for this part are in `docs/UNDECLARED.md`.\n');
  writeAt(root, 'docs/UNDECLARED.md', filler(300));
  const reads = JSON.parse(readFileSync(join(root, 'tools/reads.json'), 'utf8'));
  reads['.claude/skills/heavy/extra.md'] = { note: 'for the test' };
  writeFileSync(join(root, 'tools/reads.json'), JSON.stringify(reads, null, 2) + '\n');
  const { status, stdout } = run(root);
  assert.equal(status, 1, 'an undeclared name inside a skill must stop the check');
  assert.match(stdout, /UNDECLARED\s+docs\/UNDECLARED\.md/);
  rmSync(root, { recursive: true, force: true });
});

// --- Two guards the review of pull request 22 asked for --------------------
//
// WHY THESE EXIST. Moving a section out of AGENTS.md into docs/THE-CHECK.md to
// make room took three paths with it — CLAUDE.md among them, the symbolic link
// every session's rules arrive through. The dead-reference pass read backticks
// in AGENTS.md and nowhere else, so all three silently stopped being watched:
// deleting the link left the check green. That was reproduced by hand before
// either fix, and what was seen is in docs/REFUSALS.md.
//
// The second guard came out of the same review. Taking the paragraphs out left
// their names sitting in tools/reads.json, pre-approved for a file that no
// longer contained them — so the next change to write one of those names would
// have been classified before anybody looked at it, which is the one thing that
// file exists to prevent.

test('a backticked path in a declared file, not only in AGENTS.md, is watched for disappearing', () => {
  const root = buildFixture();
  // docs/METHOD.md is declared in the reading list and names docs/GONE.md.
  writeAt(root, 'docs/METHOD.md',
    'The precedents are in `docs/PRECEDENTS.md`. Read that before you report.\n' +
    'The rest of it is in `docs/GONE.md`.\n' + filler(1200));
  writeAt(root, 'docs/GONE.md', filler(200));
  const reads = JSON.parse(readFileSync(join(root, 'tools/reads.json'), 'utf8'));
  reads['docs/METHOD.md'].mentions.push('docs/GONE.md');
  writeFileSync(join(root, 'tools/reads.json'), JSON.stringify(reads, null, 2) + '\n');
  assert.equal(run(root).status, 0, 'the fixture must start clean');

  rmSync(join(root, 'docs/GONE.md'));
  const { status, stdout } = run(root);
  assert.equal(status, 1,
    'a backticked path that vanished from a declared file must stop the check. ' +
    `It printed:\n${stdout}`);
  assert.match(stdout, /MISSING\s+docs\/GONE\.md/);
  rmSync(root, { recursive: true, force: true });
});

test('a name declared as mentioned that the file no longer contains stops the check', () => {
  const root = buildFixture();
  const reads = JSON.parse(readFileSync(join(root, 'tools/reads.json'), 'utf8'));
  reads['AGENTS.md'].mentions.push('docs/PRECEDENTS.md');
  writeFileSync(join(root, 'tools/reads.json'), JSON.stringify(reads, null, 2) + '\n');
  const { status, stdout } = run(root);
  assert.equal(status, 1,
    'a mention declared for a file that does not name it is a standing ' +
    `pre-approval and must stop the check. It printed:\n${stdout}`);
  assert.match(stdout, /STALE\s+AGENTS\.md\s+declares the mention\s+docs\/PRECEDENTS\.md/);
  rmSync(root, { recursive: true, force: true });
});
