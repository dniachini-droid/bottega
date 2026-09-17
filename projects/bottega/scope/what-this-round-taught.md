# What this round taught

## What it does

Writes down what went wrong in one round of work on the notebook, and turns the
two faults that can recur into rules the guide reads every session.

Nothing is built. This is the workshop recording its own failures, which is the
only way a fault stops being one somebody has to remember.

*Why it is one change rather than several: every entry here came out of the same
stretch of work between 15 and 17 September 2026, and splitting them would mean
the same evidence cited from four places. Why it is a change at all rather than
notes in a thread: `docs/OPEN.md` is where a gap survives the session that found
it.*

## What done looks like

- Every fault recorded in `docs/OPEN.md` happened in this workshop, is written
  as it happened with the date, and is not generalised into a maxim. *Why: a
  maxim cannot be checked against anything later, and a dated occasion can.*
- The rules added to `.claude/skills/virgil/SKILL.md` each carry the reason they
  exist and name the occasion that produced it. *Why: "rules with no stated
  reason" is a budget here and it is zero.*
- The two rules are the two faults that recur: what a review brief may never
  carry, and that the handoff check is run every time even when it cannot fully
  pass. *Why only two: the rest are logged rather than ruled, because a rule
  for a fault seen once is how an instruction file grows and never shrinks.*
- `docs/REFUSALS.md` claims no refusal that was not watched, and each entry
  says what was fed in and what came back. *Why: a check never seen refusing
  cannot be told apart from one that cannot fire.*
- Each scope page edited says what the built product actually does, and where a
  page was narrowed and widened back, the page carries that history rather than
  a quietly corrected line. *Why: on 17 September 2026 the owner widened the
  same line for the third time, and a page that hid the first two narrowings
  would let a fourth session make the same move blind.*
- `node tools/check-budgets.mjs` exits 0 on this branch, and the heavier token
  number is still under 10,000 with the skill's growth counted.
