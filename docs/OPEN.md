# Open items

This is the one home for open items. There is never a second file.

*Why: the moment findings live in two places, neither one is trustworthy and
nobody knows which to read.*

Every entry carries a status line, one of:

- `**Status:** OPEN — <what is left>`
- `**Status:** CLOSED — <where it landed>`

*Why: an item without a status becomes an item nobody can close, because
nobody can tell what closing it would mean.*

This file holds only what is open. When an item closes, its closing line says
where the work landed, and the entry leaves this file.

*Why: a register that keeps its closed items stops being a list of what needs
attention and becomes a history nobody reads.*

---

## The workshop and the application were separated

This repository was called `cabinet` and opened, in its rules file, with a
description of a personal curiosity collection — while everything below that
opening was general rules about working with agents. It is now `bottega`, and
it is only the workshop. Zibaldone is the first application that will be built
with it, and it lives in its own repository at
https://github.com/dniachini-droid/zibaldone.

*Why: the owner has two earlier repositories where a system and an application
grew up inside the same repository. One of them needed 85,000 lines taken out
across two merges to get the system free of the application. He caught the same
pattern starting here, four hours in, and stopped it.*

No application code had to move, because none had been written here yet. What
changed was the rules file opening, the readme, two skill descriptions and two
worked examples inside one skill. `docs/VISION.md` was added as the end goal
everything is now checked against.

**Status:** OPEN — the separation is in a pull request and not merged, and
Claude never merges. This entry leaves the file when the owner merges it.


---

## Two findings on the workbench, and a review that is owed

Pull request #3 — the workbench, which adds a register of projects, a folder
per project, and a `/build` that knows which project it is working on — was
reviewed once. Two findings block it and are being repaired.

One review per version is the rule, and the repaired version has not had its
one. So a fresh review, in a session that did not do the repairs, is owed
before this merges.

**Status:** OPEN — two findings under repair, then a fresh review of the
repaired version, then the owner merges. This entry leaves the file then.

## Four of the six budgets are on trust, not enforced

`tools/check-budgets.mjs` checks two: the number of tokens loaded before a
session starts work, and whether every file named in backticks in `AGENTS.md`
actually exists.

The other four have nothing checking them:

- failing tests on the main branch
- checks that have never been observed refusing anything
- the number of agent definitions
- rules with no stated reason

This is written down in `AGENTS.md` already, honestly, so it is not hidden.
It is recorded here because a budget on trust is a budget that can drift for
a long time before anybody notices.

**Status:** OPEN — no decision yet on whether any of the four should be
machine-checked, or whether some of them are better left on trust. The
question has not been put to the owner.

## Nobody has walked the seven stages end to end

`/build` describes seven stages, from working out the scope to the owner
pressing merge. No piece of work has yet gone through all seven as written —
partly because the reviewer, which stage four calls for, does not exist yet.

**Status:** OPEN — closes the first time a change goes through all seven
stages in order, with what was observed at each one written down.

## The empty `cabinet` repository is orphaned

This repository was called `cabinet` before it was renamed. An empty
repository under that name is still there and belongs to nothing.

**Status:** OPEN — the owner deletes it. Claude cannot and should not.

## The repository description on GitHub still describes the application

The short description shown at the top of the repository page still describes
the first application rather than the workshop.

It is a setting on GitHub, not a file in the repository, so no change here
fixes it.

**Status:** OPEN — the owner changes it in the repository settings.
