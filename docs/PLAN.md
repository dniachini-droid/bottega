# What happens next

This is the live statement of the work. It is updated when a piece finishes.

**Finishing something removes it from here.** A finished piece leaves this
file; where it landed is recorded in the pull request that carried it, and
anything still outstanding moves to `docs/OPEN.md`. *Why: a plan that only
grows is not a plan, it is a history nobody reads. The same reason the
register of open items keeps only what is open.*

History does not belong here. Neither does anything that is merely a good
idea — only work that is next.

---

## Done

- **The foundation.** Rules that each carry their reason, the six budgets, the
  guard that refuses a whole-file read, the budget check, automatic checks
  running green, `/build`, `/virgil`, and the register of findings.
- **The workshop separated from the application.** Applications are registered
  here and built in their own repositories. Nothing is built inside Bottega.
- **The vision**, written down and committed, in `docs/VISION.md`.
- **The workbench.** A register of projects, a folder for each one, and a
  `/build` that knows which project it is working on. Pull request #3, merged:
  two reviews, seven findings, all of them resolved. What those reviews raised
  as worth knowing rather than blocking is in `docs/OPEN.md`.

## In flight

- **Pull request #4 — what only existed in a conversation, written down.**
  This plan, more entries in the register of open items, and the research
  behind the reviewer and the handoff, in `docs/research/`. No review of it has
  been done yet.

## Next, in this order

Each is built, then reviewed, then merged, before the next one begins.

### 1. The reviewer, the handoff, and the automatic start — as one piece

A reviewer that nothing hands work to, and that nothing starts, is
three-quarters of nothing. The three are one piece of work and ship together.

The research for both halves is in `docs/research/` —
`docs/research/REVIEWER-CRAFT.md` for what makes a reviewer find real defects
instead of generating noise, and `docs/research/HANDOFF.md` for what may
travel between sessions and what must not.

### 2. The check before a commit

The same checks that run after a push, run before a commit as well.

The automatic checks cannot be bypassed and they stand between the work and
the merge. The check on this machine is faster and comes earlier. They are not
alternatives to each other and neither replaces the other.

### 3. Memory

Claude Code's own per-agent memory, at project scope. Plain markdown,
committed, readable by the owner. Plus a prune when a piece of work closes.

No vector store. No embeddings. No infrastructure. *Why: this is already
decided in `docs/VISION.md`, and every failure in that field is stale entries
poisoning what gets found, not too little storage.*

### 4. Zibaldone

Only after the loop above has run end to end on Bottega itself, several times,
and worked.

---

## Why that order, and this reason is the point of it

The owner has two earlier repositories where machinery was built before
anything needed it. One ended with 43 of its 45 findings being about its own
machinery. The other ended with 51 failing tests nobody runs.

**Bottega is its own first project.** It does not need an application to prove
the loop works — its own changes are the work. Every change to this repository
goes through the same seven stages, the same reviewer, the same checks. If the
loop cannot carry Bottega's own changes, it is not ready to carry an
application's.

That is why Zibaldone is fourth and not first.
