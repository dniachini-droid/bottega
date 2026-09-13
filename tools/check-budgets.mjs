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
import { join, relative, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKEN_BUDGET = 10000;
const BYTES_PER_TOKEN = 4;

// Everything a session loads before it is asked to do anything. CLAUDE.md is
// a link to AGENTS.md rather than a second copy, so it is counted once here.
const STARTUP_FILES = ['AGENTS.md', '.claude/settings.json'];
const STARTUP_DIRS = ['.claude/skills', '.claude/agents'];

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

// --- Budget 1: what is loaded before work starts -------------------------

const loaded = [];
for (const rel of STARTUP_FILES) {
  const full = join(ROOT, rel);
  if (existsSync(full)) loaded.push(full);
}
for (const rel of STARTUP_DIRS) loaded.push(...walk(join(ROOT, rel)));

let totalBytes = 0;
const rows = [];
for (const full of loaded.sort()) {
  const bytes = statSync(full).size;
  totalBytes += bytes;
  rows.push([relative(ROOT, full), bytes]);
}
const tokens = Math.floor(totalBytes / BYTES_PER_TOKEN);
const startupOver = tokens >= TOKEN_BUDGET;

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

console.log('Loaded before a session starts work:');
for (const [name, bytes] of rows) {
  console.log(`  ${String(bytes).padStart(7)} bytes  ${name}`);
}
console.log(`  ${String(totalBytes).padStart(7)} bytes  TOTAL`);
console.log(
  `\nStartup cost: about ${tokens} tokens against a budget of ${TOKEN_BUDGET}.`
);
if (startupOver) {
  console.log(
    `OVER BUDGET by about ${tokens - TOKEN_BUDGET} tokens. Take something out ` +
    `of what loads at startup, or move it somewhere a session reads only when ` +
    `it needs it.`
  );
} else {
  console.log(`Room left: about ${TOKEN_BUDGET - tokens} tokens.`);
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

if (startupOver || dead.length) {
  console.log('\nBUDGET CHECK FAILED.');
  process.exit(1);
}
console.log('\nBudget check passed.');
