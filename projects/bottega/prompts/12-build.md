Build session for pull request #12 in https://github.com/dniachini-droid/bottega, branch `claude/measure-the-prompt`. #12 is already open — do not open another. Do not review your own work. Never merge.

**The scope is `projects/bottega/scope/measure-the-prompt.md` on this branch. Read it — it is the whole job.**

Read also `AGENTS.md` and `CLAUDE.md`, which bind you.

## The facts

- Base `main` is at `7df8a62`. This repository IS the project — nothing to clone.
- `git` may need `-c user.email=dn.iachini@gmail.com -c user.name=dniachini-droid`.
- **The agents were renamed an hour ago**: the builder is **Michelangelo**, the reviewer is **Da Vinci**. Use the new names. The agent file is `.claude/agents/da-vinci.md`.
- Current numbers: every session 3,546 tokens, heaviest 8,477, both against 10,000. **The heaviest has about 1,500 of room — watch it**, you are adding prose to `AGENTS.md`.
- Both the counting check and the tests must pass: `node tools/check-budgets.mjs` and `node --test tools/check-budgets.test.mjs`.

## The hard part, and it is part (a)

**The prompt is not a file in this repository.** It is written by the guide window and handed to a session at the moment it is started. Nothing on disk holds it.

So "print its size" needs you to decide *what can actually be measured, from where*, and say so plainly. If the honest answer is that the check cannot see a prompt at all and something else has to record it, **say that rather than inventing a number the check can reach.** A third number that measures the wrong thing is worse than no third number — this repository spent today learning that twice.

Whatever you build, **watch it refuse or report something real** and write what you saw into `docs/REFUSALS.md`. Do not write "verified".

## Do not add a limit

Deliberate, and the scope says why. A limit set before anyone knows what a normal prompt looks like gets met by leaving things out that the session needed. Print it; the owner argues about a number later.

## One extra, already agreed

The review of the rename recorded a grammar slip in `AGENTS.md`: *"a helper carrying the Michelangelo's context"* — a leftover "the" from "the builder's context". Fix it. This change already touches that file, which is why it rides here rather than earning its own round.

## Finish

1. Commit, push to this branch. No second pull request.
2. Update #12's body: what you built, what you watched happen, what you could not measure and why, where the numbers stand, and what you did not do.
3. Take #12 out of draft, then **comment saying whether you finished, stopped early, or are blocked.**
