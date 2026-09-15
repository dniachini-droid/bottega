## Stage 4 — REVIEW

**One review. A fresh session. A different model family. One pass.**

- **Fresh**, meaning a new session that has never seen this change being
  built — not Michelangelo, and not a helper Michelangelo started.
- **A different model family.** If the build ran on `claude-opus-5`, the
  review runs on `claude-sonnet-5`, and the other way round. *Why: a fresh
  session of the same model starts fresh on the context but not on the habits
  that produced the change, and the preference for one's own output is the
  thing being designed around.*
- **One pass.** When the review reports, this stage is over.

*The reasons for a fresh session and for one pass only are in `AGENTS.md`,
attached to the rules they belong to, and are not copied here.*

What Da Vinci is, and what it refuses, is `.claude/agents/da-vinci.md`.
Start it the way every session here starts, and hand it the seven lines that
file opens with — stamped off the branch at the moment of handoff, the scope
page's "what done looks like" list copied in word for word, and **no eighth
line.** *Why: it refuses an unexpected field, and the field you would want to
add is your own opinion of the work.*

---
