# One stage at a time

## What it does

Teaches the budget check that some skills hand a session one stage at a time.

A skill whose body is one file is charged that file. A skill built as seven
stages, where a session opens the stage it is on and never the other six, is a
different shape — and charging it all seven counts six files nobody reads.

A skill may now declare its stages in `tools/reads.json`. The check then charges
every file in that folder except the stages, plus the largest single stage.
Largest, because that is the worst a session can be handed.

**This change moves no number.** Nothing declares stages yet. It is the
groundwork for splitting the build skill, which is a separate change.

## What done looks like

- The check accepts a stage declaration and charges the stage that costs most
  once its own onward reading is followed — not the largest file.
- Every declared stage is charged in full at least once, so a stage that is
  never the most expensive is still scanned: its reading is followed and a name
  it leaves classified in neither list still stops the check.
- A skill may not declare its own `SKILL.md` as a stage.
- It refuses a declaration of fewer than two stages, and the reason it gives
  is true: with fewer than two there is nothing to choose between, and nothing
  is hidden meanwhile.
- It refuses a stage that is not there, and says why.
- Each of those three was watched happening before the change was trusted, and
  what was seen is in `docs/REFUSALS.md`.
- One test for each, each watched failing against the check as it stands on
  `main` and passing against the new one.
- Both startup numbers are unchanged from `main`, because nothing declares
  stages yet.
- The budget check exits 0 and the tests pass.

## What is out

- Splitting the build skill. That is the next change and it is where the number
  actually moves.
- Any way for the check to confirm a session really opens only one stage. It
  cannot, that is on the word of the declaration, and both the change and the
  record say so.
- Any change to the limits, to the other five budgets, to `AGENTS.md`, to either
  skill, or to an agent definition.
