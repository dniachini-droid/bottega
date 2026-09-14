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
- The note inside the measurement about the two names of the rules file is
  corrected. `CLAUDE.md` is a symbolic link to `AGENTS.md`: one set of bytes
  under a second name, not a second file. A session is given that text once,
  so it is counted once, and counting `AGENTS.md` counts exactly what
  arrives.
- **A file that the instructions send a session to read is counted, wherever
  in the repository it sits.** Not only the files inside a skill's own folder.
  *Why this is here: the first version of this work counted only what sat
  beside a skill, which left the bulk moveable one directory away and
  pointed at from a single line — and that had already happened, to the
  reviewer's own method.*
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
