You are Michelangelo. Read `.claude/skills/build/SKILL.md` in this repository and work as it says. This is stage 5, FIX, of an existing change. You are not starting a new piece of work and you are not widening this one.

Attach the project's repository with `add_repo` for `dniachini-droid/zibaldone`, asking for **push** access. It is a private repository as of 17 September 2026. Clone it and check out branch `claude/the-clock`, whose head is `6275cd1d52fbb49bb4be6ef85eede79886372f21`. That branch is pull request 23. If `add_repo` will not go through, do not sit waiting on it: comment on pull request 23 saying you are blocked, and stop. Copy no file from this repository into that one, and no file from that one into this one.

The scope page is `projects/zibaldone/scope/the-clock.md` in this repository. Read it first.

There is one defect, established and verified by the window that dispatched you, not by a reviewer. It is not a judgement and you do not need to decide whether it is real.

**`.github/workflows/nightly.yml` is rejected by GitHub before it runs. The clock has never run and cannot run as written.**

The job-level `env:` block uses `${{ runner.temp }}`:

    env:
      ZIBALDONE_MIND: ${{ runner.temp }}/zibaldone-mind
      ZIBALDONE_FILING_STATE: ${{ runner.temp }}/filing-state

The `runner` context is not available at `jobs.<job_id>.env`. GitHub fails the workflow at startup with "Unrecognized named-value: 'runner'".

The evidence, gathered before you were started: workflow runs `35226388722` (head `6275cd1d`) and its predecessor (head `b20e024`) on `claude/the-clock` both have `conclusion: failure`, `created_at` equal to `updated_at` to the second, and **zero jobs**. GitHub also lists the workflow under its file path rather than under its `name:`, which is what it does when it could not evaluate the file.

What is asked of you, and nothing beyond it:

- **Fix it**, so that GitHub accepts the workflow. Keep it minimal.
- **Then make something catch it.** This is the part that matters more than the two lines. Every test in `test/clock.test.js` reads the workflow file as text. Three sessions — a builder, a reviewer and a fixer — all looked at a file GitHub had already thrown out, and every check was green the whole time. A check that cannot see a workflow GitHub refuses is a check that cannot fire. Put something in the repository that would have gone red on `b20e024`: a validator run over the workflow files in `npm test`, or the same contexts-and-shape rules written as a test, or whatever you can make actually refuse. Watch it refuse the broken version.
- **Watch both**, against the broken version first, then against the fix, and write what you saw into `docs/REFUSALS.md` beside the clock entries already there. Watch them; do not assert them.
- `npm test` green before you push. Say the numbers.
- Never skip, disable or quarantine a test to get there.

**What is deliberately not in this job.** A review of `6275cd1d` finished but could not post its comment, because it was given read access to the project and a comment needs write. Its findings are not relayed to you, in summary or otherwise — a summary of a review is how findings get dropped, and that is a rule here. A fresh review of your version will see the same file and raise anything real. Do not go looking for what it might have said.

When you finish, stop early, or are blocked, comment on pull request 23 and say which of the three it is.
