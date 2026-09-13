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

## The workshop's own files stay at the top of this repository

The owner's sketch of the workbench put the workshop's files — the rules and
the skills — inside a folder called `framework/`, with the projects beside it.
They are not in a folder. They are at the top of the repository, exactly where
they already were, and only `projects/` was added below them.

**This is deliberate and it must not be tidied.** Claude Code reads `AGENTS.md`
and the `.claude/` folder from the top of the repository and from nowhere else.
Moved into a folder, they would still be perfectly good files that nothing ever
reads: every session would start with no rules at all, and nothing would fail,
and nothing would say so. The rules would stop binding quietly.

*Why this is written down here rather than left as a habit: a folder called
`framework/` is the obvious tidy-up, and the person who makes it would see no
error afterwards. A change that silently removes every rule and reports success
is the worst kind there is.*

**Status:** OPEN — this stays open for as long as the rules are loaded from the
top of the repository, which is to say indefinitely. It closes only if Claude
Code ever learns to load them from somewhere else, and then everything above
can be revisited in one go.

---

## A leftover branch in the Zibaldone repository, from testing the push

To establish that a session started in this repository can attach the project's
repository and write to it, that was actually done rather than assumed: the
project's repository was attached, cloned, and its own existing commit was
pushed back under a temporary branch name, `claude/push-probe`. Nothing was
added to it — the branch points at exactly the same commit as `main`, and not a
single file of Bottega went anywhere near it.

The tidy-up afterwards failed. Deleting that branch was refused, twice, by the
network guard this session works behind, which allows a branch to be created
and not removed. There is no other tool here that deletes a branch.

**Status:** OPEN — the owner can delete `claude/push-probe` in the Zibaldone
repository on GitHub, on the branches page, in one click. This entry leaves the
file then.
