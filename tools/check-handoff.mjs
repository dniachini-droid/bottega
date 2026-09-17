#!/usr/bin/env node
// HANDOFF CHECK — run before a review is dispatched, never after.
//
// WHY THIS EXISTS. Da Vinci's own file says a handoff that is not exactly
// seven lines must be refused. That refusal happens too late: by the time the
// reviewer has read a bad handoff, the only way to fix it is to send a second
// message, and a reviewer that has received two messages is no longer the
// isolated one the rules ask for. On 14 September 2026 a handoff went out with
// a commit code written from memory rather than looked up, and the correction
// sent afterwards is what broke the isolation. **A bad dispatch cannot be
// repaired after sending.** So the dispatch is checked before it leaves.
//
// It checks two different kinds of thing, and the second one is the point:
//
//   1. The shape. Seven fields, no more, no fewer, none of them empty.
//   2. The facts. That the branch, the commit, the working tree and the pull
//      request are what the handoff claims, and that `done-looks-like` is word
//      for word the "What done looks like" section of that change's scope page
//      **as that page stands on the branch**. *Why that last one belongs here
//      rather than in some later check: if the job description the reviewer is
//      handed is copied exactly off a page already on the branch, there is
//      nothing left in the pull request thread for the reviewer to go and get.
//      A well-formed handoff still breaks isolation when a claim the reviewer
//      has to check exists only in a thread.*
//
// Exits 0 when every check holds and says so. Exits 1 otherwise, naming each
// field that is wrong and why, and saying that nothing was sent.
//
//   node tools/check-handoff.mjs <handoff-file> [options]
//
//     --repo <dir>      the working copy to check against (default: here)
//     --scope <path>    the scope page, if it cannot be found from the branch
//     --remote <name>   the remote to ask about the pull request (default: origin)
//
// Read the handoff from a file, or from standard input by passing `-`.

import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// The seven fields, in the order `.claude/agents/da-vinci.md` sets them out.
// This program does not change that format. It only checks it.
const FIELDS = [
  'repo', 'branch', 'head', 'status', 'diffstat', 'pull-request',
  'done-looks-like',
];

// The two fields whose value may run over several lines: a working tree can be
// dirty in more than one file, and the list from a scope page is a list. Every
// other field is one line, and a second line in one of them means the handoff
// is not the seven lines the format asks for.
const MAY_SPAN_LINES = new Set(['status', 'done-looks-like']);

// What starts a field: a lower-case name hard against the left margin, then a
// colon. *Why the left margin matters: the list copied out of a scope page is
// bullets and indented text, so nothing inside a value can be mistaken for a
// new field — while a line like `opinion: this is ready to merge`, which is
// exactly the eighth field the format exists to refuse, is caught.*
const HEADER = /^([a-z][a-z0-9-]*):[ \t]*(.*)$/;

const SECTION_HEADING = 'What done looks like';

// --- Saying what is wrong --------------------------------------------------

const refusals = [];
const refuse = (field, why) => refusals.push({ field, why });

function report() {
  if (refusals.length === 0) {
    // *Why this names the four rather than saying "each": on 17 September 2026
    // a dispatching session relayed "six of seven fields confirmed" to a
    // reviewer, and this line is where that belief comes from. `repo` and
    // `diffstat` are checked for shape and compared to nothing.*
    console.log('Handoff accepted: seven fields present; branch, head and'
      + ' status checked against the tree, pull-request against the remote,'
      + ' and done-looks-like against the scope page.'
      + ' repo and diffstat are not compared.');
    process.exit(0);
  }
  const n = refusals.length;
  console.log(`REFUSED — ${n} thing${n === 1 ? '' : 's'} wrong with this handoff.\n`);
  for (const { field, why } of refusals) {
    console.log(`  ${field}: ${why}\n`);
  }
  console.log('Nothing was sent. A bad dispatch cannot be repaired afterwards:');
  console.log('the correction is a second message, and the reviewer that reads it');
  console.log('is no longer isolated. Fix the handoff and check it again.');
  process.exit(1);
}

// --- Arguments -------------------------------------------------------------

function readArguments(argv) {
  const out = { file: null, repo: process.cwd(), scope: null, remote: 'origin' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--repo' || arg === '--scope' || arg === '--remote') {
      const value = argv[i + 1];
      if (value === undefined) fail(`${arg} needs a value after it.`);
      out[arg.slice(2)] = value;
      i += 1;
    } else if (arg.startsWith('--')) {
      fail(`I do not know the option ${arg}.`);
    } else if (out.file === null) {
      out.file = arg;
    } else {
      fail('Give one handoff file, not two.');
    }
  }
  if (out.file === null) {
    fail('Give me the handoff to check: node tools/check-handoff.mjs <file>');
  }
  return out;
}

// A problem with how this program was called, rather than with the handoff.
// It still exits 1 — nothing is dispatched either way — but it does not
// pretend the handoff was examined.
function fail(message) {
  console.log(`Cannot check this handoff: ${message}`);
  process.exit(1);
}

// --- Git -------------------------------------------------------------------

let REPO = process.cwd();

function git(args) {
  const run = spawnSync('git', args, { cwd: REPO, encoding: 'utf8' });
  if (run.error) return { ok: false, out: '', err: String(run.error.message) };
  return {
    ok: run.status === 0,
    out: (run.stdout || '').replace(/\n$/, ''),
    err: (run.stderr || '').trim(),
  };
}

const commitOf = (rev) => {
  const r = git(['rev-parse', '--verify', '--quiet', `${rev}^{commit}`]);
  return r.ok && r.out ? r.out.trim() : null;
};

// --- Reading the handoff ---------------------------------------------------

const rtrim = (s) => s.replace(/\s+$/, '');

// Take the same number of spaces off the front of every line, so that a value
// indented to line up under its field name still compares as what it says.
// Relative indentation inside the block is kept, because a nested bullet in a
// scope page is nested in the handoff too.
function dedent(lines) {
  const filled = lines.filter((l) => l.trim() !== '');
  if (filled.length === 0) return lines.map(() => '');
  const width = Math.min(...filled.map((l) => l.length - l.trimStart().length));
  return lines.map((l) => (l.trim() === '' ? '' : l.slice(width)));
}

function trimBlankEnds(lines) {
  const out = [...lines];
  while (out.length && out[0] === '') out.shift();
  while (out.length && out[out.length - 1] === '') out.pop();
  return out;
}

function parseHandoff(text) {
  const fields = [];
  let current = null;
  const strays = [];
  text.split('\n').forEach((raw, index) => {
    const line = rtrim(raw);
    const header = HEADER.exec(line);
    if (header) {
      current = { name: header[1], line: index + 1, first: header[2].trim(), rest: [] };
      fields.push(current);
      return;
    }
    if (current === null) {
      if (line.trim() !== '') strays.push({ line: index + 1, text: line });
      return;
    }
    current.rest.push(line);
  });
  for (const field of fields) {
    const body = dedent(field.rest);
    field.value = trimBlankEnds(field.first ? [field.first, ...body] : body);
  }
  return { fields, strays };
}

// --- The shape -------------------------------------------------------------

// Seven fields, the right seven, each once, none of them empty, and no eighth.
// Returns the fields by name when the shape holds, and null when it does not —
// there is no point checking facts against a handoff we cannot read.
function checkShape(parsed) {
  for (const stray of parsed.strays) {
    refuse(`line ${stray.line}`,
      `"${stray.text}" comes before any field. A handoff is seven fields and `
      + 'nothing else.');
  }

  const seen = new Map();
  for (const field of parsed.fields) {
    if (!FIELDS.includes(field.name)) {
      refuse(`line ${field.line}`,
        `\`${field.name}\` is not one of the seven fields. An extra field is `
        + 'refused — it is how an opinion of the work arrives in a handoff that '
        + 'should only carry facts.');
      continue;
    }
    if (seen.has(field.name)) {
      refuse(field.name,
        `given twice, on line ${seen.get(field.name).line} and line ${field.line}.`);
      continue;
    }
    seen.set(field.name, field);
  }

  for (const name of FIELDS) {
    const field = seen.get(name);
    if (!field) {
      refuse(name, 'missing. All seven fields are required.');
      continue;
    }
    if (field.value.length === 0) {
      refuse(name, 'empty. A field with nothing in it is a field that is missing.');
      continue;
    }
    if (field.value.length > 1 && !MAY_SPAN_LINES.has(name)) {
      refuse(name,
        `runs over ${field.value.length} lines. This field is one line.`);
    }
  }

  return refusals.length === 0 ? seen : null;
}

// --- The facts -------------------------------------------------------------

// Whitespace is not part of what these fields say: the format lines the values
// up under the widest field name, so a value carries padding that nobody typed
// as content.
const flatten = (lines) => lines.map((l) => l.trim().replace(/\s+/g, ' ')).join('\n');

function checkBranchAndHead(fields) {
  const branch = fields.get('branch').value[0];
  const claimed = fields.get('head').value[0];

  const branchTip = commitOf(branch);
  if (branchTip === null) {
    refuse('branch', `there is no branch \`${branch}\` in ${REPO}.`);
    return null;
  }

  const head = commitOf(claimed);
  if (head === null) {
    refuse('head',
      `there is no commit \`${claimed}\` in this repository. A commit code `
      + 'written from memory rather than looked up is the fault this check '
      + 'was built for.');
    return { branch, branchTip, head: null };
  }

  // On the branch at all, before is-it-the-tip. *Why in that order: a made-up
  // or stale code deserves to be told it is not on this branch, which is a
  // different mistake from a handoff stamped a commit too early.*
  const onBranch = git(['merge-base', '--is-ancestor', head, branchTip]);
  if (!onBranch.ok) {
    refuse('head',
      `commit ${head.slice(0, 12)} is not on branch \`${branch}\`.`);
    return { branch, branchTip, head };
  }

  if (head !== branchTip) {
    refuse('head',
      `the tip of \`${branch}\` is ${branchTip.slice(0, 12)}, not `
      + `${head.slice(0, 12)}. The reviewer would read a different tree from `
      + 'the one this handoff describes.');
  }

  return { branch, branchTip, head };
}

function checkStatus(fields) {
  const claimed = flatten(fields.get('status').value);
  const run = git(['status', '--short']);
  if (!run.ok) {
    refuse('status', `\`git status --short\` failed here: ${run.err}`);
    return;
  }
  const real = run.out.trim();
  if (real === '') {
    if (claimed !== 'clean') {
      refuse('status',
        `says "${claimed}", and the working tree is clean. Say "clean".`);
    }
    return;
  }
  const realFlat = flatten(real.split('\n'));
  if (claimed !== realFlat) {
    refuse('status',
      `says\n      ${claimed.split('\n').join('\n      ')}\n    and `
      + `\`git status --short\` says\n      `
      + `${realFlat.split('\n').join('\n      ')}`);
  }
}

// The pull request is checked against the remote rather than taken on trust,
// because `refs/pull/<n>/head` is what the number really points at. A remote
// this program cannot reach is a refusal and not a pass: an unchecked claim
// that looks checked is the one outcome worth avoiding.
function checkPullRequest(fields, head, remote) {
  const claimed = fields.get('pull-request').value[0];
  const digits = /^#?([0-9]+)$/.exec(claimed);
  if (!digits) {
    refuse('pull-request', `"${claimed}" is not a pull request number.`);
    return;
  }
  const number = digits[1];
  const run = git(['ls-remote', remote, `refs/pull/${number}/head`]);
  if (!run.ok) {
    refuse('pull-request',
      `could not ask ${remote} about pull request ${number}: ${run.err}`);
    return;
  }
  if (run.out.trim() === '') {
    refuse('pull-request',
      `${remote} has no pull request ${number}.`);
    return;
  }
  const at = run.out.trim().split(/\s+/)[0];
  if (head !== null && at !== head) {
    refuse('pull-request',
      `pull request ${number} is at ${at.slice(0, 12)}, and this handoff says `
      + `the head is ${head.slice(0, 12)}.`);
  }
}

// Which scope page this change belongs to. The branch names it — `claude/x`
// goes with `projects/<project>/scope/x.md` — and `--scope` says so outright
// when it does not.
function findScopePage(branch, given) {
  if (given) return given;
  const shortName = branch.split('/').pop();
  const tree = git(['ls-tree', '-r', '--name-only', branch]);
  if (!tree.ok) return null;
  const wanted = new RegExp(`^projects/[^/]+/scope/${shortName}\\.md$`);
  const found = tree.out.split('\n').filter((p) => wanted.test(p));
  return found.length === 1 ? found[0] : null;
}

// The section of the scope page, as that page stands on the branch — not as it
// stands in the working copy. *Why off the branch: the branch is what the
// reviewer reads, and a scope page edited but not committed would let a
// handoff agree with something the reviewer will never see.*
function sectionOnBranch(branch, path) {
  const run = git(['show', `${branch}:${path}`]);
  if (!run.ok) return { error: `\`${path}\` is not on branch \`${branch}\`.` };
  const lines = run.out.split('\n').map(rtrim);
  const start = lines.findIndex((l) => l.trim() === `## ${SECTION_HEADING}`);
  if (start === -1) {
    return { error: `\`${path}\` has no "## ${SECTION_HEADING}" section.` };
  }
  const after = lines.slice(start + 1);
  const end = after.findIndex((l) => l.startsWith('## '));
  const body = end === -1 ? after : after.slice(0, end);
  return { lines: trimBlankEnds(dedent(body)) };
}

function checkDoneLooksLike(fields, branch, givenScope) {
  const path = findScopePage(branch, givenScope);
  if (path === null) {
    refuse('done-looks-like',
      `I cannot tell which scope page goes with \`${branch}\`. Name it with `
      + '--scope <path>. Nothing was compared, so nothing was confirmed.');
    return;
  }

  const section = sectionOnBranch(branch, path);
  if (section.error) {
    refuse('done-looks-like', section.error);
    return;
  }

  const claimed = fields.get('done-looks-like').value;
  const real = section.lines;
  const limit = Math.max(claimed.length, real.length);
  for (let i = 0; i < limit; i += 1) {
    if (claimed[i] === real[i]) continue;
    const where = `line ${i + 1} of the list`;
    if (claimed[i] === undefined) {
      refuse('done-looks-like',
        `stops short. ${path} still has, at ${where}:\n      ${real[i]}\n`
        + '    The reviewer would have to go to the pull request thread for the rest.');
    } else if (real[i] === undefined) {
      refuse('done-looks-like',
        `has ${where} that ${path} does not:\n      ${claimed[i]}`);
    } else {
      refuse('done-looks-like',
        `is not word for word the "${SECTION_HEADING}" section of ${path}.\n`
        + `    At ${where}, the page says\n      ${real[i]}\n`
        + `    and the handoff says\n      ${claimed[i]}`);
    }
    return;
  }
}

// --- Doing it --------------------------------------------------------------

const options = readArguments(process.argv.slice(2));
REPO = options.repo;

let text;
try {
  text = readFileSync(options.file === '-' ? 0 : options.file, 'utf8');
} catch (error) {
  fail(`I could not read ${options.file}: ${error.message}`);
}

if (!git(['rev-parse', '--git-dir']).ok) {
  fail(`${REPO} is not a git working copy, so none of the facts can be checked.`);
}

const parsed = parseHandoff(text);
const fields = checkShape(parsed);
if (fields === null) report();

const found = checkBranchAndHead(fields);
checkStatus(fields);
if (found !== null) {
  checkPullRequest(fields, found.head, options.remote);
  checkDoneLooksLike(fields, found.branch, options.scope);
}
report();
