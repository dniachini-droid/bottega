#!/usr/bin/env node
// BUDGET CHECK — two of the six budgets in AGENTS.md, enforced.
//
// WHY THIS EXISTS. A budget nobody measures is a wish. This measures the two
// that a machine can measure honestly:
//
//   1. What a session loads before it does any work — must be under 10,000
//      tokens. Context volume by itself degrades accuracy, so this is a
//      correctness budget and not only a cost one.
//   2. Whether every file path written in backticks in AGENTS.md, or in any
//      file tools/reads.json declares, is really
//      there — must be all of them. A rules file that points at files which
//      no longer exist teaches every session to distrust it.
//
// Exits 0 when both hold, 1 when either fails, and says which in plain words.
//
// It also prints a third number that is not a budget and has no limit: how big
// the prompt was that started a session. That one cannot be measured from
// here at all — a prompt is never a file in this repository — so what is
// printed is the size of the copy the guide window saved. The long note above
// that section says what the number is and what it is not.

import {
  readFileSync, readdirSync, statSync, existsSync, realpathSync,
} from 'node:fs';
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

// Which files a session is sent to open, declared rather than guessed.
const READS_FILE = 'tools/reads.json';

// A backticked span counts as a file reference when it looks like a path and
// nothing else: letters, digits, dot, dash, slash. Anything with a space, a
// colon or an angle-bracket placeholder is prose or a template, not a path,
// and is left alone.
//
// It has to look like a path in one of three ways: it names a folder, or it
// ends in a file extension we know, or there is really something of that name
// in the repository. *Why the third: without it a file with no extension and
// no folder in front of it — `.gitignore` is the one here — is invisible to
// the count, which makes "call it NOTES" a way to park bulk out of sight. It
// can only ever add a path that exists, so it cannot turn a live reference
// into a dead one.*
const PATHISH = /^[A-Za-z0-9._\/-]+$/;
const EXTENSION = /\.(md|mjs|cjs|js|ts|sh|json|ya?ml|txt)$/i;
const looksLikeAPath = (s) =>
  PATHISH.test(s) &&
  (s.includes('/') || EXTENSION.test(s) || existsSync(join(ROOT, s)));

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

// The same bytes can be reachable under two names — CLAUDE.md and AGENTS.md
// are one file. Resolving to the real path first means they are charged once.
const realOf = (full) => {
  try {
    return realpathSync(full);
  } catch {
    return full;
  }
};

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

// --- Following what a skill or an agent sends a session to read ----------
//
// THE HOLE THIS CLOSES. Counting only the files that sit inside a skill's own
// folder leaves an open door: park the bulk anywhere else in the repository
// and point at it from one line of the skill. Both numbers then stay where
// they were. That was demonstrated — a 20,000-byte file under docs/ with a
// one-line pointer from the build skill moved the heavier number by 15 tokens,
// the weight of the pointer sentence — and it was already true of this
// repository: every Da Vinci session is sent, unconditionally, to read
// docs/REVIEWER.md and from there docs/PRECEDENTS.md, and both were charged
// zero. 6,540 bytes of required reading, counted as nothing.
//
// Worse, that split was made in order to fit under this budget. The move that
// solved the budget problem was itself the way to defeat the budget.
//
// THE RULE. A file that a skill or an agent definition sends a session to read
// is charged to that session, wherever in the repository it lives.
//
// HOW A REFERENCE IS RECOGNISED. Mechanically: a path written in backticks, in
// a file that is already charged. That is the same test the dead-reference
// check below uses on AGENTS.md, so writing a path in backticks already means
// "this is a real file" in this repository. The sentence around it is not
// read. *Why not: if the check looked for the word "read", the way to move
// weight out of the number would be to reword the sentence, and nothing about
// what the session loads would change.*
//
// READ OR ONLY NAMED — DECLARED, NOT GUESSED. A backticked path is either a
// file the session is sent to open or a file the text merely names, and the
// two are the same shape. tools/reads.json says which, for each referencing
// file. A path in neither list fails the check. *Why refusing rather than
// picking one: over-counting is safer than under-counting, and refusing is
// safer than either — a new pointer out of a skill cannot slip through
// silently, and writing down "this is only a mention" beside a large file is
// a visible act Da Vinci sees.*
//
// TRANSITIVE — YES. docs/REVIEWER.md sends Da Vinci on to
// docs/PRECEDENTS.md, so stopping after one step would reopen the same hole
// one level down. Reading is followed from file to file until nothing new is
// found. *What stops a cycle: each file is charged at most once per session
// and a file already charged is not opened again. The repository is finite, so
// the walk ends.*
//
// A FOLDER is followed to every file inside it. *Why: otherwise a folder is
// somewhere to park bulk and point at.*
//
// A FILE A SESSION IS SENT TO READ THAT IS NOT THERE fails the check. *Why: a
// skill that sends a session to a file which does not exist is a dead
// reference in the place it does most harm.*
//
// WHICH NUMBER IT LANDS IN. A file reached from a skill or an agent definition
// is charged to that set, so it shows in the heaviest number and not in the
// every-session one. *Why: only the sessions that open those instructions are
// sent to it — a file only Da Vinci opens is not loaded by every session.* A
// file reached from AGENTS.md would be charged to every session. Today there
// are none: every path AGENTS.md names, it names as a subject.

const readsPath = join(ROOT, READS_FILE);
let declarations = null;
let readsProblem = null;
if (!existsSync(readsPath)) {
  readsProblem =
    `${READS_FILE} is not there. That file is what says which of the files ` +
    `named in the instructions a session is actually sent to read. Without ` +
    `it nothing outside a skill's own folder can be counted, and the count ` +
    `would be quietly too low.`;
} else {
  try {
    declarations = JSON.parse(readFileSync(readsPath, 'utf8'));
  } catch (err) {
    readsProblem = `${READS_FILE} could not be read as JSON: ${err.message}`;
  }
}

function referencesIn(full) {
  let text;
  try {
    text = readFileSync(full, 'utf8');
  } catch {
    return [];
  }
  return [...new Set(
    [...text.matchAll(/`([^`\n]+)`/g)]
      .map((m) => m[1].trim())
      .filter(looksLikeAPath)
  )];
}

const unclassified = new Map(); // "file -> ref" so it is reported once
const staleDeclarations = new Map(); // declared as mentioned, not in the file
const deadReads = new Map();

// Charge these files, and everything they send a session on to read.
// `exclude` holds real paths already charged elsewhere, so the same bytes are
// never paid for twice inside one number.
function chargeReading(seeds, exclude) {
  const charged = new Map(); // real path -> bytes
  const queue = [...seeds];
  while (queue.length) {
    const full = realOf(queue.shift());
    if (charged.has(full) || exclude.has(full)) continue; // and stops a cycle
    if (!existsSync(full) || !statSync(full).isFile()) continue;
    charged.set(full, sizeOf(full));

    const rel = relative(ROOT, full);
    const entry = (declarations && declarations[rel]) || {};
    const reads = Array.isArray(entry.reads) ? entry.reads : [];
    const mentions = Array.isArray(entry.mentions) ? entry.mentions : [];

    // What is charged comes from the declaration, not from the backticks.
    // *Why: a file can be handed to a session without its name ever being set
    // in backticks. Charging only what is backticked would let that one
    // through, and would also mean a declared file that is not there is never
    // looked for.*
    for (const ref of reads) {
      const target = join(ROOT, ref.endsWith('/') ? ref.slice(0, -1) : ref);
      if (!existsSync(target)) {
        deadReads.set(`${rel} -> ${ref}`, { from: rel, ref });
        continue;
      }
      if (statSync(target).isDirectory()) queue.push(...walk(target));
      else queue.push(target);
    }

    // The backticks are how an undeclared file is caught: anything this file
    // names that has not been classified either way stops the check.
    const namedHere = new Set(referencesIn(full));
    for (const ref of namedHere) {
      if (reads.includes(ref) || mentions.includes(ref)) continue;
      unclassified.set(`${rel} -> ${ref}`, { from: rel, ref });
    }

    // A DECLARATION THE FILE NO LONGER EARNS. A name listed here that the file
    // does not contain is a standing pre-approval: the next change to write
    // that name is classified before anybody looks at it, which is the one
    // thing tools/reads.json exists to prevent. Reads are exempt — a file can
    // be handed to a session without its name ever appearing in backticks,
    // which is why reads are charged from the declaration and not the text.
    for (const ref of mentions) {
      if (!namedHere.has(ref)) staleDeclarations.set(`${rel} -> ${ref}`, { from: rel, ref });
    }
  }
  return charged;
}

const sumOfMap = (m) => [...m.values()].reduce((n, b) => n + b, 0);

// --- Budget 1: what is loaded, in two numbers ----------------------------

const alwaysSeeds = []; // files every session pays for
const sets = [];        // { label, offered, seeds } — offered always, rest on demand

for (const rel of ALWAYS_FILES) {
  const full = join(ROOT, rel);
  if (existsSync(full)) alwaysSeeds.push(full);
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
      const folderRel = `${SKILL_DIR}/${entry.name}/`;
      sets.push({ label: folderRel, offered, seeds: files });
      continue;
    }
    // No readable SKILL.md front matter: we cannot tell when this is loaded,
    // so it is charged to every session.
    alwaysSeeds.push(...files);
  } else if (entry.isFile()) {
    alwaysSeeds.push(full);
  }
}

// Each agent definition is one set on its own.
for (const full of walk(join(ROOT, AGENT_DIR))) {
  const offered = basename(full).endsWith('.md') ? offeredLine(full) : null;
  if (offered === null) alwaysSeeds.push(full);
  else sets.push({ label: relative(ROOT, full), offered, seeds: [full] });
}

const alwaysCharged = chargeReading(alwaysSeeds, new Set());
const alwaysRows = [...alwaysCharged.entries()]
  .map(([full, bytes]) => [relative(ROOT, full), bytes])
  .sort((a, b) => a[0].localeCompare(b[0]));

const offeredBytes = sets.reduce((n, s) => n + s.offered, 0);
const everyBytes = sumOfMap(alwaysCharged) + offeredBytes;
const everyTokens = Math.floor(everyBytes / BYTES_PER_TOKEN);

// What each set costs the session that opens it. The offered line is already
// in the every-session floor, so it is not charged a second time here.
const alwaysKeys = new Set(alwaysCharged.keys());
for (const s of sets) {
  s.charged = chargeReading(s.seeds, alwaysKeys);
  s.rows = [...s.charged.entries()]
    .map(([full, bytes]) => [relative(ROOT, full), bytes])
    .sort((a, b) => a[0].localeCompare(b[0]));
  s.onOpen = Math.max(sumOfMap(s.charged) - s.offered, 0);
  s.sessionBytes = everyBytes + s.onOpen;
  s.sessionTokens = Math.floor(s.sessionBytes / BYTES_PER_TOKEN);
}
sets.sort((a, b) => a.label.localeCompare(b.label));

// The heaviest single session is the floor above plus the one largest set it
// opens. *Why one: a session opens the skill it was started for. If that ever
// stops being true, this number is the thing that has to change.*
const heaviestSet = sets.reduce((a, b) => (b.onOpen > (a?.onOpen ?? -1) ? b : a), null);
const heaviestBytes = everyBytes + (heaviestSet?.onOpen ?? 0);
const heaviestTokens = Math.floor(heaviestBytes / BYTES_PER_TOKEN);

const everyOver = everyTokens >= EVERY_SESSION_BUDGET;
const heaviestOver = heaviestTokens >= HEAVIEST_SESSION_BUDGET;

// --- Budget 2: every path in backticks in AGENTS.md exists ---------------

const agentsPath = join(ROOT, 'AGENTS.md');
if (!existsSync(agentsPath)) {
  // Without this, a missing rules file would mean no references to check and
  // almost nothing to count — the check would pass, loudly and wrongly.
  console.log('AGENTS.md is not there. That is the rules file; nothing else');
  console.log('in this repository means anything without it.');
  console.log('\nBUDGET CHECK FAILED.');
  process.exit(1);
}
// EVERY DECLARED FILE IS SCANNED, NOT ONLY AGENTS.md. *Why: on 15 September
// 2026 the paragraphs naming CLAUDE.md, .claude/settings.json and the tests
// moved out of AGENTS.md into docs/THE-CHECK.md, and all three silently lost
// this warning — the symbolic link every session's rules arrive through could
// have been deleted with the check still green. A path in backticks is how you
// ask to be warned when a file disappears, and that promise has to hold
// wherever the path is written, not only in one file.*
const scanned = new Set([agentsPath]);
for (const rel of Object.keys(declarations || {})) {
  if (rel.includes('/') || rel.endsWith('.md')) {
    const full = join(ROOT, rel);
    if (existsSync(full) && statSync(full).isFile()) scanned.add(full);
  }
}
const refSource = new Map(); // ref -> the file that names it
for (const f of scanned) {
  for (const ref of referencesIn(f)) {
    if (!refSource.has(ref)) refSource.set(ref, relative(ROOT, f));
  }
}
const referenced = [...refSource.keys()].sort();

const dead = [];
for (const ref of referenced) {
  const wantsDir = ref.endsWith('/');
  const full = join(ROOT, wantsDir ? ref.slice(0, -1) : ref);
  if (!existsSync(full)) dead.push(ref);
  else if (wantsDir && !statSync(full).isDirectory()) dead.push(ref);
}

// --- Beside the budgets: how big the prompt was ---------------------------
//
// WHAT CANNOT BE MEASURED FROM HERE, SAID PLAINLY. A session's prompt is not
// a file in this repository. It is written in the guide window and handed to
// the session at the moment it is started. Nothing on disk holds it, so this
// check cannot see one, and no amount of searching this repository will find
// one. That is the honest answer and it does not improve by being restated.
//
// *Why that is worth saying rather than working around: the obvious
// workaround is to measure something the check can reach — the scope page, or
// the template in the build skill — and call it the prompt. Neither is the
// prompt. The scope page is a fraction of it and the template is the empty
// form. A third number that measures the wrong thing is worse than no third
// number, because it would be watched, trusted, and argued about.*
//
// SO SOMETHING ELSE HAS TO RECORD IT. The only place that knows the prompt
// exactly is the window that wrote it, at the moment it hands it over. So the
// window saves a copy: one file per prompt, in a `prompts` folder beside that
// project's scope pages, named for the pull request and the stage it was sent
// for. The file holds the prompt and nothing else — no heading, no note, no
// date — because the size of the file is the measurement, and anything added
// to it is counted as prompt.
//
// WHAT THIS NUMBER IS, AND WHAT IT IS NOT. It is the size of a copy somebody
// saved. It is not a measurement of what the session received. If the window
// saves nothing, there is no number and this says so. If the window saves
// something other than what it sent, nothing here can tell. *Why record it
// anyway: an approximate number that says what it is beats no number at all,
// and the failure it is meant to catch — a prompt three times the size of the
// instruction budget — is not a failure that hides inside a rounding error.*
//
// NO LIMIT ON IT. Deliberately. *Why: a limit set before anyone has seen what
// a normal prompt looks like gets met by leaving out things the session
// needed, which moves the cost somewhere the check cannot see rather than
// removing it. Print it, watch it, argue about a number later with evidence.*
//
// IT IS NOT ADDED TO EITHER OF THE TWO NUMBERS ABOVE. A session really is
// handed its prompt on top of everything it loads, so the sum is the true
// weight — but both limits above were ratified against the instruction
// numbers alone, and quietly folding a third input into them would move two
// settled limits without anybody deciding to.
//
// WHAT IT REFUSES. A record that is empty, and a record whose name does not
// say which pull request and which stage it belongs to. *Why those two: an
// empty record prints a prompt of nothing, which no prompt is, and an
// unnamed one prints a number nobody can attach to the session it came from.
// Either one turns this into a number that measures the wrong thing, which is
// the whole failure it exists to avoid.*

const PROJECTS_DIR = 'projects';
const PROMPTS_DIR = 'prompts';
const PROMPT_FILENAME = /^(\d+)-([a-z][a-z-]*)\.md$/;

const promptRecords = [];
const promptProblems = [];

let projectEntries = [];
try {
  projectEntries = readdirSync(join(ROOT, PROJECTS_DIR), { withFileTypes: true });
} catch { /* no projects folder: nothing has been dispatched from here */ }

for (const project of projectEntries) {
  if (!project.isDirectory()) continue;
  const dir = join(ROOT, PROJECTS_DIR, project.name, PROMPTS_DIR);
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    continue; // This project has had nothing dispatched for it yet.
  }
  for (const entry of entries) {
    const rel = `${PROJECTS_DIR}/${project.name}/${PROMPTS_DIR}/${entry.name}`;
    if (!entry.isFile()) {
      promptProblems.push(
        `  NOT A PROMPT  ${rel}  — everything in a prompts folder is one ` +
        `saved prompt.`
      );
      continue;
    }
    const named = PROMPT_FILENAME.exec(entry.name);
    if (!named) {
      promptProblems.push(
        `  BADLY NAMED  ${rel}  — name it <pull request number>-<stage>.md, ` +
        `as in 12-build.md.`
      );
      continue;
    }
    const full = join(dir, entry.name);
    const bytes = sizeOf(full);
    let text = '';
    try {
      text = readFileSync(full, 'utf8');
    } catch { /* falls through to the empty case below */ }
    if (text.trim() === '') {
      promptProblems.push(
        `  EMPTY  ${rel}  — a saved prompt with nothing in it would be ` +
        `reported as a prompt of no size.`
      );
      continue;
    }
    promptRecords.push({
      rel,
      project: project.name,
      pr: Number(named[1]),
      stage: named[2],
      bytes,
      tokens: Math.floor(bytes / BYTES_PER_TOKEN),
    });
  }
}
promptRecords.sort((a, b) => a.rel.localeCompare(b.rel));
promptProblems.sort();

// --- Report ---------------------------------------------------------------

const pad = (n) => String(n).padStart(7);

console.log('WHAT EVERY SESSION LOADS');
for (const [name, bytes] of alwaysRows) console.log(`  ${pad(bytes)} bytes  ${name}`);
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

console.log('\nWHAT EACH KIND OF SESSION LOADS, ONCE IT OPENS ITS INSTRUCTIONS');
for (const s of sets) {
  console.log(`\n  ${s.label}`);
  for (const [name, bytes] of s.rows) console.log(`    ${pad(bytes)} bytes  ${name}`);
  console.log(`    ${pad(-s.offered)} bytes  its name and description, already counted above`);
  console.log(`    ${pad(everyBytes)} bytes  what every session loads`);
  console.log(
    `    ${pad(s.sessionBytes)} bytes  TOTAL — about ${s.sessionTokens} tokens.`
  );
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
    `budget. Take something out of it, or out of what it sends the session on ` +
    `to read, or split it so a session opens only the part it needs.`
  );
} else {
  console.log(`  Room left: about ${HEAVIEST_SESSION_BUDGET - heaviestTokens} tokens.`);
}

console.log('\nHOW BIG THE PROMPTS WERE — reported, with no limit on them');
console.log(
  '  A prompt is not a file in this repository. It is written in the guide\n' +
  '  window and handed to a session as it starts, so this check cannot see\n' +
  '  one. What is measured below is the copy the window saved afterwards.'
);
if (promptRecords.length) {
  for (const p of promptRecords) {
    console.log(
      `  ${pad(p.bytes)} bytes  about ${String(p.tokens).padStart(6)} tokens  ` +
      `${p.project} #${p.pr} ${p.stage}`
    );
  }
  const largest = promptRecords.reduce((a, b) => (b.tokens > a.tokens ? b : a));
  console.log(
    `\n  The largest so far is about ${largest.tokens} tokens ` +
    `(${largest.rel}).`
  );
  console.log(
    `  A session is handed that on top of the instructions counted above, ` +
    `which\n  run from about ${everyTokens} tokens to about ${heaviestTokens}. ` +
    `The two are not added\n  together here: both limits above were settled ` +
    `against the instruction\n  numbers alone.`
  );
} else {
  console.log(
    '\n  Nothing has been saved yet, so there is no number. Nothing is put in\n' +
    '  its place: the two numbers above measure files, and a prompt is not a\n' +
    '  file. The guide window saving a copy of what it sent is the only way a\n' +
    '  number appears here.'
  );
}

if (promptProblems.length) {
  console.log('\nThese saved prompts cannot be measured:');
  for (const line of promptProblems) console.log(line);
  console.log(
    'A prompts folder holds one file per prompt, named for the pull request ' +
    'and the\nstage, holding the prompt and nothing else — no heading, no ' +
    'note, no date. The\nsize of the file is the measurement, so anything ' +
    'added to it is counted as\nprompt, and anything the name does not say ' +
    'is a number nobody can place.'
  );
}

if (readsProblem) {
  console.log(`\n${readsProblem}`);
}

if (unclassified.size) {
  console.log(
    `\nThese files are named in backticks by instructions a session loads, and ` +
    `\n${READS_FILE} does not say whether the session is sent to read them:`
  );
  for (const { from, ref } of unclassified.values()) {
    console.log(`  UNDECLARED  ${ref}  (named in ${from})`);
  }
  console.log(
    `Add each one to that file: to "reads" if a session is sent to open it, ` +
    `and its\nwhole size is then charged to that session; to "mentions" if ` +
    `the text only names it.\nThe check refuses rather than guessing, because ` +
    `a large file pointed at from a skill\nis exactly how weight leaves this ` +
    `count without either number moving.`
  );
}

if (deadReads.size) {
  console.log(
    `\nThese are declared as files a session is sent to read, and are not there:`
  );
  for (const { from, ref } of deadReads.values()) {
    console.log(`  MISSING  ${ref}  (named in ${from})`);
  }
}

console.log(
  `\nFile paths written in backticks, in AGENTS.md and every file ` +
  `${READS_FILE} declares: ${referenced.length} checked.`
);
if (dead.length) {
  console.log('These are named in backticks but are not in the repository:');
  for (const ref of dead) console.log(`  MISSING  ${ref}`);
  console.log(
    'Either put the file back, or stop naming it in the rules. A rules file ' +
    'that points at things which are not there stops being believed.'
  );
} else {
  console.log('All of them exist.');
}

if (staleDeclarations.size) {
  console.log('\nNames declared in ' + READS_FILE + ' that the file does not contain:');
  for (const { from, ref } of staleDeclarations.values()) {
    console.log(`  STALE  ${from}  declares the mention  ${ref}`);
  }
  console.log(
    'A mention listed for a file that no longer names it is a standing ' +
    'pre-approval: the next change to write that name is classified before ' +
    'anybody looks at it. Take it out of the list, or put the name back.'
  );
}

if (everyOver || heaviestOver || dead.length || readsProblem ||
    unclassified.size || deadReads.size || promptProblems.length ||
    staleDeclarations.size) {
  console.log('\nBUDGET CHECK FAILED.');
  process.exit(1);
}
console.log('\nBudget check passed.');
