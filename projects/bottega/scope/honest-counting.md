# Counting what a session actually reads

## What it does

Fixes the thing that measures how much a session has to read before it starts
work, so that it counts what a session really loads rather than every
instruction file in the workshop. And writes down the decision the owner made
today about when Claude may merge, which could not be written before because
the broken measurement said there was no room for it.

## What done looks like

- The measurement counts what a session actually loads at startup. A set of
  instructions that is only opened when it is needed is not counted as though
  every session reads it.
- It reports two numbers, not one: what **every** session loads, and what the
  **heaviest single** session loads once it opens the largest set of
  instructions it will use. Neither number alone is the truth.
- The corrected measurement has been **watched refusing something**, and what
  was seen is written into `docs/REFUSALS.md`. A measurement rewritten to be
  more permissive and never seen refusing anything is worth less than the
  wrong one it replaced.
- The owner's merge rule is written into `AGENTS.md` with its reason, and the
  stale wording that says Claude or Virgil never merges is replaced rather
  than left beside it. The rule, as he settled it: Virgil may merge small
  reversible changes; must ask him first for changes to `AGENTS.md`, the
  skills or the agent definitions, and merges those on his yes; and never
  merges on an empty review alone.
- The false note inside the measurement — that `CLAUDE.md` is "a pointer to
  `AGENTS.md`, not a second copy" — is corrected. The two files are
  byte-identical.
- The automatic checks pass.

## What is out

- **Changing the 10,000 limit itself, up or down.** The number stays. This
  piece makes the measurement honest; whether the limit still measures
  anything is the owner's decision afterwards, not a side effect of this work.
- The check that runs before a commit. That is the next item on the plan.
- Memory. That is the item after it.
- Anything to do with Zibaldone.
- The three non-blocking notes from the second review of pull request #5,
  unless one is directly in the way.
