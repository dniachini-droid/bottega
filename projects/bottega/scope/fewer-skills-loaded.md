# Fewer skills loaded

## What it does

Switches off, for every session that runs in this repository, the skills that
nothing in this workshop opens — and corrects the two files that had recorded
the cost of those skills as something only the owner's account could change.

The register had carried the skill listing as a standing instruction to the
owner to go and change a setting outside this repository. It is not outside:
`.claude/settings.json` takes a `skillOverrides` block, it travels with the
repository, and it applies to every session that starts here.

The same change stops this register keeping token figures at all. Four of them
were found wrong in a single day, every one caught by somebody reading the
prose rather than by a check, because nothing can check a sentence against a
number it does not know it should recompute.

## What done looks like

- `.claude/settings.json` switches off nineteen names. Every spelling is the
  one the harness uses — established by counting the listing a session is
  offered and finding exactly the seven meant to survive, because a name
  spelled wrong in the block would have left its skill sitting in the listing.
  A name that failed silently was the whole risk.
- `build` and `virgil` are not switched off, and neither is
  `anthropic-skills:skill-creator` — this workshop's two deliverables are
  skills, so the skill that makes and improves them earns its place.
- The existing read-guard hook in that file is untouched in behaviour.
- `docs/OPEN.md` carries a rule for the whole page: no token figure goes on it,
  not in a heading, not in a status line, not in a passage explaining why
  figures go stale. The limit itself and a dated record of what something
  measured on the day may stay. Every present-tense figure is gone and the page
  says to run the check instead.
- Nothing in the tree claims the listing is now only what this workshop uses.
  Four names are still offered — `dataviz`, `artifact-design`,
  `artifact-diagramming`, `artifact-capabilities` — and the entry names them
  and says why they were left.
- The saving names its cost in the same breath: an application build session
  starts in Bottega, so these nineteen are off for application builds too, and
  the entry says which of them an application might plausibly have wanted.
- `docs/OPEN.md` and `docs/PLAN.md` both stop saying this change is impossible.
- `docs/OPEN.md` records that the budget check cannot see this saving at all,
  and proposes nothing about it.
- The budget check exits 0 and `node --test` passes 10 of 10.

## What is out

- Switching off the remaining four. Nothing has established that nothing here
  wants them, and that is the only thing that makes switching one off safe.
- Restoring any of the nineteen for application builds. The owner asked for
  them off; a saving undone on a guess about a session that has not run yet is
  a saving nobody keeps. It is one line when somebody hits it.
- Making it account-wide. That is the owner's setting and a separate decision.
- Any change to the budget check. It cannot see a skill listing — the harness
  hands that to a session, not this repository — and pretending otherwise would
  be a number that measures the wrong thing.
- Rewriting `projects/bottega/scope/measure-the-prompt.md`, which still records
  the belief that this was the owner's setting to change. A scope page is the
  record of a job as it was dispatched. Correcting it to match what was learned
  afterwards would make it say the session was told something it was not told.
