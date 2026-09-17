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
- **Three rules, and each is a fault that has already recurred or that the
  owner ruled on himself:** cut a piece into slices and show him the slices
  before work starts; what a review brief may carry and what it may never; and
  how the handoff check is run, what it actually compares, and that nothing is
  ever appended to the seven fields. *Why three and not fewer: the brief fault
  happened twice in two days and the handoff fault three times. Why the slicing
  rule despite coming from one occasion: the owner ruled on it himself on 17
  September 2026 after four rounds bought no polish, and a rule he settled is
  not the workshop adding one. Why nothing beyond those three: every other fault
  in this change is logged rather than ruled, because a rule for a fault seen
  once is how an instruction file grows and never shrinks.*
- **The handoff rule is one rule in several parts**, because the check has
  several ways of being got wrong and they all came out of the same night: not
  run at all, run against the wrong tree, described as confirming more than it
  does, and overridden by appending prose to the seven fields. Counting those
  as four rules would be counting sentences.
- The rule that a reviewer must not open the builder's working copies is **not**
  in the guide's skill, because a reviewer never opens that file. It is logged
  as belonging in `.claude/agents/da-vinci.md`, which needs the owner's yes.
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
