#!/usr/bin/env node
// TESTS FOR THE HANDOFF CHECK.
//
// WHY THESE EXIST. The handoff check has one job: refuse a dispatch that would
// have to be corrected afterwards, because the correction is what breaks the
// reviewer's isolation. A check that has never been watched refusing cannot be
// told apart from one that cannot fire, so there is one test for each thing it
// refuses, and each of them was watched failing against a version of the check
// with that guard taken out before it was trusted. What was seen is written
// down in docs/REFUSALS.md.
//
// There is also a test that a correct handoff is accepted. *Why that one is
// not optional: seven tests that watch a program say no prove nothing on their
// own — a program that refuses everything would pass all of them.*
//
// HOW THEY WORK. Each test builds a small make-believe repository in a
// temporary folder: a scope page, a branch named after it, and a bare
// repository standing in for the remote with a `refs/pull/7/head` ref, which
// is the ref GitHub really publishes for a pull request. Then it writes a
// handoff, right in every respect but one, and runs the real check against it.
//
// *Why a make-believe repository rather than this one: a test that read the
// real branch would have to be edited every time the branch moved, and would
// soon be edited to whatever the code said. Everything these tests compare
// against is put there by the test.*
//
// These tests are never read by a session, so they cost nothing against either
// startup limit. They run in the automatic checks on every push.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
// The check itself. `HANDOFF_CHECK` points these tests at a different copy,
// which is how each guard was watched being missed: a copy with exactly one
// guard taken out, run against the whole suite. *Why it is safe to leave here:
// pointing the suite somewhere else can only make tests fail, never pass — the
// first test below requires a correct handoff to be accepted, and the other
// eight require specific refusals in specific words.*
const CHECK = process.env.HANDOFF_CHECK || join(HERE, 'check-handoff.mjs');

const BRANCH = 'claude/make-believe';
const SCOPE_PAGE = 'projects/make-believe/scope/make-believe.md';
const PULL_REQUEST = 7;

// The list a scope page holds, and the list a correct handoff repeats word for
// word. Nested on purpose, so that a check which flattened the shape of the
// list would be caught by the comparison.
const DONE_LIST = [
  '- A thing that does the thing, where:',
  '  - it does it on Tuesday;',
  '  - it does not do it twice.',
  '- A second thing, which is smaller.',
];

const SCOPE_TEXT = [
  '# Make believe',
  '',
  '## What it does',
  '',
  'Nothing. It is a fixture.',
  '',
  '## What done looks like',
  '',
  ...DONE_LIST,
  '',
  '## What is out',
  '',
  'Everything else.',
  '',
].join('\n');

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.stderr}`);
  }
  return (result.stdout || '').trim();
}

const git = (cwd, ...args) => run('git', args, cwd);

// A repository with one scope page on one branch, a remote that knows about
// pull request 7, and a second commit on a branch of its own that was never
// merged — that last one is what a commit code written from memory looks like
// when it happens to be a real commit in the repository.
function buildFixture() {
  const root = mkdtempSync(join(tmpdir(), 'handoff-check-test-'));
  const work = join(root, 'work');
  const remote = join(root, 'remote.git');

  mkdirSync(work, { recursive: true });
  git(work, 'init', '--quiet', '--initial-branch', BRANCH);
  git(work, 'config', 'user.email', 'fixture@example.invalid');
  git(work, 'config', 'user.name', 'Fixture');

  mkdirSync(join(work, dirname(SCOPE_PAGE)), { recursive: true });
  writeFileSync(join(work, SCOPE_PAGE), SCOPE_TEXT);
  git(work, 'add', '.');
  git(work, 'commit', '--quiet', '-m', 'first');
  const first = git(work, 'rev-parse', 'HEAD');

  writeFileSync(join(work, 'thing.txt'), 'the work itself\n');
  git(work, 'add', '.');
  git(work, 'commit', '--quiet', '-m', 'second');
  const head = git(work, 'rev-parse', 'HEAD');

  git(work, 'checkout', '--quiet', '-b', 'elsewhere', first);
  writeFileSync(join(work, 'other.txt'), 'never merged\n');
  git(work, 'add', '.');
  git(work, 'commit', '--quiet', '-m', 'elsewhere');
  const elsewhere = git(work, 'rev-parse', 'HEAD');
  git(work, 'checkout', '--quiet', BRANCH);

  git(root, 'init', '--quiet', '--bare', remote);
  git(work, 'remote', 'add', 'origin', remote);
  git(work, 'push', '--quiet', 'origin', BRANCH);
  git(work, 'push', '--quiet', 'origin', `HEAD:refs/pull/${PULL_REQUEST}/head`);

  return { root, work, first, head, elsewhere };
}

// A handoff that is right in every respect. Each test spoils exactly one
// thing, so that what the check refuses can only be the thing that was spoiled.
function handoff(fixture, changes = {}) {
  const lines = {
    repo: 'github.com/make-believe/fixture',
    branch: BRANCH,
    head: fixture.head,
    status: 'clean',
    diffstat: ' 1 file changed, 1 insertion(+)',
    'pull-request': String(PULL_REQUEST),
    'done-looks-like': DONE_LIST.join('\n'),
    ...changes,
  };
  const text = Object.entries(lines)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => (value.includes('\n')
      ? `${name}:\n${value}`
      : `${name}: ${value}`))
    .join('\n');
  const path = join(fixture.root, 'handoff.txt');
  writeFileSync(path, `${text}\n`);
  return path;
}

function check(fixture, changes = {}, extra = []) {
  const path = handoff(fixture, changes);
  const result = spawnSync(
    process.execPath, [CHECK, path, '--repo', fixture.work, ...extra],
    { encoding: 'utf8' },
  );
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

function withFixture(body) {
  const fixture = buildFixture();
  try {
    body(fixture);
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
}

// --- The tests -------------------------------------------------------------

// Without this one, every test below could be passed by a check that refuses
// everything it is given.
test('it accepts a handoff that is right', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture);
    assert.equal(code, 0, out);
    assert.match(out, /accepted/);
  });
});

test('it refuses a handoff with a field missing', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture, { diffstat: null });
    assert.equal(code, 1, out);
    assert.match(out, /diffstat: missing/);
  });
});

test('it refuses a handoff with an eighth field', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture, {
      'my-view': 'this is ready to merge',
    });
    assert.equal(code, 1, out);
    assert.match(out, /`my-view` is not one of the seven fields/);
  });
});

// The fault this check was built for: a commit code written from memory. A
// made-up code is not in the repository at all; a real one from somewhere else
// is in the repository and still not on the branch. Both are refused, and the
// second is the one a shape check could never catch.
test('it refuses a head that is not on the branch', () => {
  withFixture((fixture) => {
    const invented = check(fixture, { head: '0'.repeat(40) });
    assert.equal(invented.code, 1, invented.out);
    assert.match(invented.out, /head: there is no commit/);

    const real = check(fixture, { head: fixture.elsewhere });
    assert.equal(real.code, 1, real.out);
    assert.match(real.out, /is not on branch/);
  });
});

test('it refuses a head that is on the branch but is not its tip', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture, { head: fixture.first });
    assert.equal(code, 1, out);
    assert.match(out, /the tip of .* is/);
  });
});

test('it refuses a status that is not what the working tree says', () => {
  withFixture((fixture) => {
    writeFileSync(join(fixture.work, 'unsaved.txt'), 'not committed\n');
    const { code, out } = check(fixture);
    assert.equal(code, 1, out);
    assert.match(out, /status: says/);
    assert.match(out, /unsaved\.txt/);
  });
});

test('it refuses a pull request the remote does not have', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture, { 'pull-request': '9' });
    assert.equal(code, 1, out);
    assert.match(out, /has no pull request 9/);
  });
});

// The second half of the job. A handoff whose job description is not word for
// word the page on the branch leaves the reviewer something to go and find in
// the pull request thread, and going to find it is what breaks isolation.
test('it refuses a done-looks-like that is not word for word the scope page', () => {
  withFixture((fixture) => {
    const reworded = [...DONE_LIST];
    reworded[1] = '  - it does it on Wednesday;';
    const changed = check(fixture, { 'done-looks-like': reworded.join('\n') });
    assert.equal(changed.code, 1, changed.out);
    assert.match(changed.out, /not word for word/);
    assert.match(changed.out, /Wednesday/);

    const short = check(fixture, {
      'done-looks-like': DONE_LIST.slice(0, 2).join('\n'),
    });
    assert.equal(short.code, 1, short.out);
    assert.match(short.out, /stops short/);
  });
});

// The page as it stands on the branch, not as it stands in the working copy.
// A scope page edited to agree with the handoff but never committed is a page
// the reviewer will never see.
test('it reads the scope page off the branch, not the working copy', () => {
  withFixture((fixture) => {
    const reworded = [...DONE_LIST];
    reworded[3] = '- A second thing, which is larger.';
    writeFileSync(
      join(fixture.work, SCOPE_PAGE),
      SCOPE_TEXT.replace(DONE_LIST[3], reworded[3]),
    );
    const { code, out } = check(
      fixture,
      { 'done-looks-like': reworded.join('\n'), status: ` M ${SCOPE_PAGE}` },
    );
    assert.equal(code, 1, out);
    assert.match(out, /not word for word/);
  });
});

// *Why this is a test rather than a comment: on 17 September 2026 a dispatching
// session told a reviewer that six of seven fields had passed against the
// branch. Four had. It had just read this program's own success line, which
// said "seven fields, each checked against the branch". A dispatcher who
// repeats what the tool tells it should not be the one who is wrong. Watched
// failing against the old line and passing against the new one.*
test('what it says on acceptance is what it actually compared', () => {
  withFixture((fixture) => {
    const { code, out } = check(fixture, {});
    assert.equal(code, 0, out);
    assert.doesNotMatch(out, /each checked against the branch/);
    for (const field of ['branch', 'head', 'status', 'pull-request']) {
      assert.match(out, new RegExp(field));
    }
    // The two it never compares have to be named as not compared, so the line
    // cannot be read as a clean bill for the whole handoff.
    assert.match(out, /repo and diffstat are not compared/);
  });
});
