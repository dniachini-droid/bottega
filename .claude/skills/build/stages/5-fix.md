## Stage 5 — FIX

Only if the review found something that blocks.

The fix session starts the way every session here starts, in the section
above. It is not exempt. As it says there, it pushes its repairs to the branch
already under review and opens no second pull request.

**It is given the review itself, in full, not a summary of it** — the rule
and the reason for it are in `AGENTS.md`.

**One cycle.** The fixes go in, and the re-check is a review of the new
version — which is allowed, because it is a different version.

**If the re-check still finds blockers, stop and tell the owner.** Do not
start a third round.

*Why: findings that survive a fix round usually mean the specification was
wrong, not the code. Another round builds the wrong thing more carefully. At
that point the useful thing is to go back to him and say what the change looks
like it needs, in plain words.*

---
