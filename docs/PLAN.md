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

- **Measuring the prompt.** A third number beside the two, the missing half of
  the rule about what goes in a prompt, and the research findings nobody is
  acting on recorded in `docs/OPEN.md`. Pull request #12, merged.
- **What the prompt that starts a session should contain**, surveyed and
  written down. Pull request #9, merged after five review rounds.

## Next, in this order

Each is built, then reviewed, then merged, before the next one begins.

### 1. Measuring the loop

For each change, record two numbers: what the review found, and what got
through it and was discovered later. Nothing else. No limit yet.

*Why: there are six budgets here about how big things are and how sessions
work, and not one of them asks whether the review round produces better
software than no review round. The loop is most of what this workshop is, and
it is the only part of it that has never been measured. Two numbers per change
make that answerable with evidence after a dozen changes, and a review that
turns out not to earn its cost can then be deleted and the saving will show.
The same argument the prompt research already made and won: print the number
first, argue about a limit later.*

### 2. The handoff refusal, made real

Da Vinci's own file says a handoff that is not exactly seven lines must be
refused. Three reviews in one day reported the handoff was contaminated and
reviewed anyway. Whatever sends a dispatch checks its shape before sending, so
a bad one never arrives.

*Why: on 14 September 2026 the one review dispatched as exactly seven lines
was the only one of four that found anything blocking; the three contaminated
ones found four advisory findings between them and nothing serious. One run is
not proof, but it is the only evidence there is, and it points one way. And a
bad dispatch cannot be corrected after the fact — the correction itself
contaminates the session, which is why this has to happen before sending.*

### 3. The check before a commit

The same checks that run after a push, run before a commit as well.

The automatic checks cannot be bypassed and they stand between the work and
the merge. The check on this machine is faster and comes earlier. They are not
alternatives to each other and neither replaces the other.

### 4. Three small ones, in any order

- **The control test on Da Vinci.** `docs/REVIEWER.md` already says to run it
  and it has never been run. *Why: the budget says a check never seen refusing
  anything cannot be told apart from one that cannot fire, and that budget has
  never been applied to the reviewer itself.*
- **The seventh budget: dispatch prompts sent without a recorded size — 0.**
  *Why: the number is already printed; this makes an unrecorded dispatch a
  failure, and it asserts no ceiling, because nothing has established that any
  particular size is too large.*
- **Drop the plugin descriptions this workshop never uses.** *Why: about 4,200
  tokens go on describing skills, some belonging to plugins never invoked here,
  and every session is charged for all of them.*

### 5. Memory

Claude Code's own per-agent memory, at project scope. Plain markdown,
committed, readable by the owner. Plus a prune when a piece of work closes.

No vector store. No embeddings. No infrastructure. *Why: this is already
decided in `docs/VISION.md`, and every failure in that field is stale entries
poisoning what gets found, not too little storage.*

### 6. Zibaldone

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
