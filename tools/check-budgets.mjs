#!/usr/bin/env node
// BUDGET CHECK — two of the six budgets in AGENTS.md, enforced.
//
// WHY THIS EXISTS. A budget nobody measures is a wish. This measures the two
// that a machine can measure honestly:
//
//   1. What a session loads before it does any work — must be under 10,000
//      tokens. Context volume by itself degrades accuracy, so this is a
//      correctness budget and not only a cost one.
//   2. Whether every file path written in backticks in AGENTS.md is really
//      there — must be all of them. A rules file that points at files which
//      no longer exist teaches every session to distrust it.
//
// Exits 0 when both hold, 1 when either fails, and says which in plain words.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BYTES_PER_TOKEN = 4;

// The limit every session is held to. Unchanged since the budget was written.
const EVERY_SESSION_BUDGET = 10000;
// The limit the heaviest single session is held to. Set to the same number,
// deliberately. *Why: the reason for the budget is that context volume
// degrades accuracy while the session is working — which is exactly the
// moment the heavier number is real. A looser limit here would say that
// accuracy matters less once the work starts.*
const HEAVIEST_SESSION_BUDGET = 10000;

// What reaches every session before it is asked to do anything.
//
// AGENTS.md: what a session actually receives is CLAUDE.md, which is a
// symbolic link to AGENTS.md — the same bytes under a second name. Measuring
// AGENTS.md therefore measures exactly what is loaded, once.
//
// .claude/settings.json: this configures the session rather than being read
// to it, and it was not observed arriving as text. It is counted anyway, at
// full size. *Why: it could not be ruled out, and a budget check that drops
// what it is unsure of only ever shrinks.*
const ALWAYS_FILES = ['AGENTS.md', '.claude/settings.json'];

// Sets of instructions that are offered by name and opened only when needed.
// A skill is one folder; an agent definition is one file.
const SKILL_DIR = '.claude/skills';
const AGENT_DIR = '.claude/agents';

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out; // A folder that does not exist yet contributes nothing.
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    // Symbolic links are skipped: whatever they point at is counted where it
    // actually lives, so following them would count the same bytes twice.
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

const sizeOf = (full) => statSync(full).size;
const sumOf = (files) => files.reduce((n, f) => n + sizeOf(f), 0);

// A session is shown a skill or an agent as one line: its name and its
// description, nothing else. This measures that line. Everything behind it
// arrives only if the session opens it.
function offeredLine(full) {
  let text;
  try {
    text = readFileSync(full, 'utf8');
  } catch {
    return null;
  }
  const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!front) return null;
  const name = /^name:[ \t]*(.+?)[ \t]*$/m.exec(front[1]);
  const description = /^description:[ \t]*(.+?)[ \t]*$/m.exec(front[1]);
  if (!name || !description) return null;
  return Buffer.byteLength(`- ${name[1]}: ${description[1]}\n`, 'utf8');
}

// --- Budget 1: what is loaded, in two numbers ----------------------------

const always = []; // [label, bytes] — every session pays these
const sets = [];   // { label, offered, onOpen } — offered always, rest on demand

for (const rel of ALWAYS_FILES) {
  const full = join(ROOT, rel);
  if (existsSync(full)) always.push([rel, sizeOf(full)]);
}

// Each folder under .claude/skills that has a SKILL.md with a name and a
// description is one set. Its supporting files count with it, not separately:
// a skill that grows a large reference file has grown, and the heavier number
// must show that.
let skillEntries = [];
try {
  skillEntries = readdirSync(join(ROOT, SKILL_DIR), { withFileTypes: true });
} catch { /* no skills folder yet */ }
for (const entry of skillEntries) {
  const full = join(ROOT, SKILL_DIR, entry.name);
  if (entry.isDirectory()) {
    const files = walk(full);
    const offered = offeredLine(join(full, 'SKILL.md'));
    if (offered !== null) {
      sets.push({
        label: `${SKILL_DIR}/${entry.name}/`,
        offered,
        onOpen: Math.max(sumOf(files) - offered, 0),
      });
      continue;
    }
    // No readable SKILL.md front matter: we cannot tell when this is loaded,
    // so it is charged to every session.
    for (const f of files) always.push([relative(ROOT, f), sizeOf(f)]);
  } else if (entry.isFile()) {
    always.push([`${SKILL_DIR}/${entry.name}`, sizeOf(full)]);
  }
}

// Each agent definition is one set on its own.
for (const full of walk(join(ROOT, AGENT_DIR))) {
  const rel = relative(ROOT, full);
  const offered = basename(full).endsWith('.md') ? offeredLine(full) : null;
  if (offered === null) always.push([rel, sizeOf(full)]);
  else sets.push({ label: rel, offered, onOpen: Math.max(sizeOf(full) - offered, 0) });
}

always.sort((a, b) => a[0].localeCompare(b[0]));
sets.sort((a, b) => a.label.localeCompare(b.label));

const everyBytes =
  always.reduce((n, [, b]) => n + b, 0) + sets.reduce((n, s) => n + s.offered, 0);
const everyTokens = Math.floor(everyBytes / BYTES_PER_TOKEN);

// The heaviest single session is the floor above plus the one largest set it
// opens. *Why one: a session opens the skill it was started for. If that ever
// stops being true, this number is the thing that has to change.*
const heaviestSet = sets.reduce((a, b) => (b.onOpen > (a?.onOpen ?? -1) ? b : a), null);
const heaviestBytes = everyBytes + (heaviestSet?.onOpen ?? 0);
const heaviestTokens = Math.floor(heaviestBytes / BYTES_PER_TOKEN);

const everyOver = everyTokens >= EVERY_SESSION_BUDGET;
const heaviestOver = heaviestTokens >= HEAVIEST_SESSION_BUDGET;

// --- Budget 2: every path in backticks in AGENTS.md exists ---------------

// A backticked span counts as a file reference when it looks like a path and
// nothing else: letters, digits, dot, dash, slash. Anything with a space, a
// colon or an angle-bracket placeholder is prose or a template, not a path,
// and is left alone.
const agentsPath = join(ROOT, 'AGENTS.md');
if (!existsSync(agentsPath)) {
  // Without this, a missing rules file would mean no references to check and
  // almost nothing to count — the check would pass, loudly and wrongly.
  console.log('AGENTS.md is not there. That is the rules file; nothing else');
  console.log('in this repository means anything without it.');
  console.log('\nBUDGET CHECK FAILED.');
  process.exit(1);
}
const agents = readFileSync(agentsPath, 'utf8');
const PATHISH = /^[A-Za-z0-9._\/-]+$/;
const EXTENSION = /\.(md|mjs|cjs|js|ts|sh|json|ya?ml|txt)$/i;

const referenced = [...new Set(
  [...agents.matchAll(/`([^`\n]+)`/g)]
    .map((m) => m[1].trim())
    .filter((s) => PATHISH.test(s) && (s.includes('/') || EXTENSION.test(s)))
)].sort();

const dead = [];
for (const ref of referenced) {
  const wantsDir = ref.endsWith('/');
  const full = join(ROOT, wantsDir ? ref.slice(0, -1) : ref);
  if (!existsSync(full)) dead.push(ref);
  else if (wantsDir && !statSync(full).isDirectory()) dead.push(ref);
}

// --- Report ---------------------------------------------------------------

const pad = (n) => String(n).padStart(7);

console.log('WHAT EVERY SESSION LOADS');
for (const [name, bytes] of always) console.log(`  ${pad(bytes)} bytes  ${name}`);
for (const s of sets) {
  console.log(`  ${pad(s.offered)} bytes  ${s.label}  (its name and description only)`);
}
console.log(`  ${pad(everyBytes)} bytes  TOTAL`);
console.log(
  `\n  About ${everyTokens} tokens against a budget of ${EVERY_SESSION_BUDGET}.`
);
if (everyOver) {
  console.log(
    `  OVER BUDGET by about ${everyTokens - EVERY_SESSION_BUDGET} tokens. Take ` +
    `something out of what every session loads, or move it somewhere a session ` +
    `opens only when it needs it.`
  );
} else {
  console.log(`  Room left: about ${EVERY_SESSION_BUDGET - everyTokens} tokens.`);
}

console.log('\nWHAT THE HEAVIEST SINGLE SESSION LOADS');
console.log(`  ${pad(everyBytes)} bytes  what every session loads`);
if (heaviestSet) {
  console.log(`  ${pad(heaviestSet.onOpen)} bytes  + ${heaviestSet.label}  (opened)`);
}
console.log(`  ${pad(heaviestBytes)} bytes  TOTAL`);
console.log(
  `\n  About ${heaviestTokens} tokens against a budget of ${HEAVIEST_SESSION_BUDGET}.`
);
if (heaviestOver) {
  console.log(
    `  OVER BUDGET by about ${heaviestTokens - HEAVIEST_SESSION_BUDGET} tokens. ` +
    `The heaviest set of instructions is too large to be opened inside the ` +
    `budget. Take something out of it, or split it so a session opens only the ` +
    `part it needs.`
  );
} else {
  console.log(`  Room left: about ${HEAVIEST_SESSION_BUDGET - heaviestTokens} tokens.`);
}

console.log(
  `\nFile paths written in backticks in AGENTS.md: ${referenced.length} checked.`
);
if (dead.length) {
  console.log('These are named in AGENTS.md but are not in the repository:');
  for (const ref of dead) console.log(`  MISSING  ${ref}`);
  console.log(
    'Either put the file back, or stop naming it in the rules. A rules file ' +
    'that points at things which are not there stops being believed.'
  );
} else {
  console.log('All of them exist.');
}

if (everyOver || heaviestOver || dead.length) {
  console.log('\nBUDGET CHECK FAILED.');
  process.exit(1);
}
console.log('\nBudget check passed.');
