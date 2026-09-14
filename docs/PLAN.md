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
- **What only existed in a conversation, written down.** This plan, more
  entries in the register of open items, and the research behind Da Vinci
  and the handoff, in `docs/research/`. Pull request #4, merged.
- **Da Vinci, the handoff, and the automatic start.** What this file listed as
  item 1 and left standing as "in flight" long after it landed. Pull request
  #5, merged. The reviewer exists, the handoff between sessions is written
  down, and the guide window starts the review without being asked.
- **The counting made honest, twice.** Pull request #6 replaced a count that
  added up every instruction file whole with the two numbers now reported, and
  pull request #7 put a test under each of the two faults that count really
  had. What those faults were is in `docs/OPEN.md`.
- **What memory should be**, decided and written down rather than built. Pull
  request #8, merged.
- **The two agents named.** The builder is Michelangelo and the reviewer is Da
  Vinci. Pull request #11, merged.

## In flight

- **Measuring the prompt.** Pull request #12: a third number beside the two,
  the missing half of the rule about what goes in a prompt, and the research
  findings nobody is acting on recorded in `docs/OPEN.md`.

## Next, in this order

Each is built, then reviewed, then merged, before the next one begins.

### 1. The check before a commit

The same checks that run after a push, run before a commit as well.

The automatic checks cannot be bypassed and they stand between the work and
the merge. The check on this machine is faster and comes earlier. They are not
alternatives to each other and neither replaces the other.

### 2. Memory

Claude Code's own per-agent memory, at project scope. Plain markdown,
committed, readable by the owner. Plus a prune when a piece of work closes.

No vector store. No embeddings. No infrastructure. *Why: this is already
decided in `docs/VISION.md`, and every failure in that field is stale entries
poisoning what gets found, not too little storage.*

### 3. Zibaldone

Only after the loop above has run end to end on Bottega itself, several times,
and worked.

---

## Why that order, and this reason is the point of it

The owner has two earlier repositories where machinery was built before
anything needed it. One ended with 43 of its 45 findings being about its own
machinery. The other ended with 51 failing tests nobody runs.

**Bottega is its own first project.** It does not need an application to prove
the loop works — its own changes are the work. Every change to this repository
goes through the same seven stages, the same Da Vinci, the same checks. If the
loop cannot carry Bottega's own changes, it is not ready to carry an
application's.

That is why Zibaldone is last and not first.
