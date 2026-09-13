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
it is only the workshop. Cabinet is the first application that will be built
with it, and it lives in its own repository at
https://github.com/dniachini-droid/cabinet.

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

