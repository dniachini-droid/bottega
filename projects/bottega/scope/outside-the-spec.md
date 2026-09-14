# Finding what is outside the specification

## What it does

Records what other people do about three faults seen on 14 September 2026, so
that a later decision about each rests on evidence rather than on the argument
that produced the fault.

The three: a build session proved all five stated requirements and shipped four
defects that all sat outside them; a session removed a minimum value from a
user input so a guard could be watched refusing something, and two blind
reviewers scored that a defect; and a session built a feature the scope page
excluded, with nothing catching it.

## What done looks like

- `docs/research/OUTSIDE-THE-SPEC.md` exists and follows
  `docs/research/README.md`: research is reference, not authority, and every
  claim marked as read at source or as a search summary.
- Each of the three faults gets what the evidence says, a recommendation, what
  it would cost, and what could not be established.
- Where the evidence does not support a change, it says so. "Leave this alone"
  is a real answer and appears where it is the honest one.
- The research folder's index lists the page, and says plainly that nothing in
  it was read at source.
- Nothing is built. No rule, budget, skill, agent definition or check changes.
  `AGENTS.md` is untouched.
- The budget check and the tests pass.

## What is out

- Acting on any recommendation. That is a separate change, and the owner
  decides which if any.
- Changing `docs/PLAN.md` or `docs/OPEN.md`.
- Any claim presented as read at source. The container reached none.
