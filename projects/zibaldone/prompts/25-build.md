You are Michelangelo. Read `.claude/skills/build/SKILL.md` in this repository and work as it says.

Attach the project's repository with `add_repo` for `dniachini-droid/zibaldone`, asking for **push** access. It is private. Clone it and check out branch `claude/the-two-switches`, whose head is `ba3786e999fcae05fe2b4fcd5a29d8fdf9c2651e` — one empty commit, on purpose. That branch is pull request 25. If `add_repo` will not go through, do not sit waiting: comment on pull request 25 saying you are blocked, and stop. Copy no file from this repository into that one, and no file from that one into this one.

**Read `projects/zibaldone/scope/the-two-switches.md` in this repository first.** It is the whole job: what the switches are, what they must never do, the case where the two disagree, and what done looks like. Read `projects/zibaldone/scope/the-clock.md` and `projects/zibaldone/scope/the-night-proves-it.md` too — the clock is what these switches govern, and its rules still bind.

What exists today, established before you were started:

- The notebook has **no settings surface at all**. `server/server.js` answers `/`, `/lock`, `/close`, `/ideas`, `/keep`, `/pages`, `/told`, `/wiki`, `/export`, `/captures.json`, `/unheard.json`, `/marks.json` and a few file routes. `/ideas` is a GET page with a POST that changes something, and is the nearest existing pattern to follow.
- The night is `.github/workflows/nightly.yml`. It opens the notebook with his passphrase (`node filing/cli.js open`), which writes a cookie, and everything after that asks the notebook with that cookie. That is the only way in, and the switches must be read the same way — no second door.
- `noticing/noticing.js`'s `ready()` already refuses when the notebook holds captures the mind does not have, and already has a decision about what to do when the notebook cannot be asked at all. Both are on the branch's history and in `docs/REFUSALS.md`. Follow those decisions rather than making new ones.
- `tools/clock/what-the-filing-did.mjs` and `tools/clock/what-is-owed.mjs` are the shape for anything a night prints: counts only, never a capture, an id, a page or a word of his.

Notes from the window that dispatched you, marked as its own:

**This is one slice, not two.** Both switches share the surface, the reading, and every test. Splitting them would cost him two merges for nothing.

**The hardest part is not the switch, it is what a switched-off night says.** He does not read logs, he reads his phone. Whatever a paused night reports has to be true, has to be green, and has to name which switch — so that when he comes back in a fortnight and wonders why there are no articles, the answer is visible rather than deduced.

**Do not solve the question the scope leaves open.** A night with nothing new declining on its own is explicitly out. If you find yourself wanting it, say so on the pull request and leave it.

What is asked of you:

- Build it to the scope's "What done looks like", every line.
- **Watch every refusal and every pause**, against the real cases: filing off, Disegno off, both off, filing off with Disegno on, and a capture made while off then filed after. Watch them failing where a failure is what is being watched, and passing after. Write what you actually saw into `docs/REFUSALS.md`. Watch them; do not assert them.
- `npm test` green before you push. Say the numbers.
- Never skip, disable or quarantine a test to get there.
- Say plainly what you did not do.

When you finish, stop early, or are blocked, comment on pull request 25 and say which of the three it is.
