# One stage loaded, not seven

## What it does

Splits the build path so a session opens the stage it is at and none of the
other six.

The seven stages were one file of 18,465 bytes. Every build session loaded all
of it: a scope session read the merge instructions, a fix session read the
scoping questions. The shared setup stays in the skill file; each stage moves
to its own file beside it, and the skill lists them.

The check learned this shape in the previous change and charges the stage that
costs most rather than all seven.

## What done looks like

- Seven stage files exist and the skill routes to them, saying plainly that a
  session opens one and no others.
- No words are lost. The stages are the same text, moved.
- `tools/reads.json` declares the stages, and every stage file has its own
  entry for whatever it names.
- `AGENTS.md` describes the stage rule, because this change made its existing
  description of the count inaccurate.
- The heaviest number falls, measured from a run of the check rather than
  predicted.
- The budget check exits 0 and the tests pass.

## What is out

- Changing what any stage says. This is a move, not a rewrite.
- Splitting the guide window's skill, which this change reveals is now the
  heaviest session. That is a separate piece of work and it is written down in
  `docs/OPEN.md`.
- Any change to the limits or to the other five budgets.
