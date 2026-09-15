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
- **A scope stage that listens.** Stage 1 looks at the code before it asks
  anything, stage 2 says back what it understood before the scope page is
  written, and the fifth question — how we will know it is right — is drafted
  for the owner to correct rather than asked cold. Pull request 24. It was on
  no list: the three came out of the survey of a system he found easier to
  use, in `docs/research/WHAT-MAKES-IT-EASY.md`. A fourth idea from the same
  survey, a session refusing a job as unbuildable or not worth building, he
  decided against on 15 September 2026; that decision is written on the
  research page itself, where somebody proposing it again would be reading.

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

### 2. Isolation that holds, not just a handoff that is checked

Da Vinci's own file says a handoff that is not exactly seven lines must be
refused. Two things have to happen, and the first one alone is not enough.

**The dispatch is checked before it is sent.** Whatever sends a handoff
confirms its shape first, so a malformed one never arrives. *Why it has to be
before: a bad dispatch cannot be corrected afterwards — sending the correction
is itself a second message, and the session that receives it is no longer
isolated. That happened on 14 September 2026: a handoff went out with a commit
hash written from memory rather than looked up, and the correction that fixed
the fact broke the isolation.*

**And isolation has to survive a clean dispatch.** *Why this half exists: what
was observed on 14 September 2026 is written up in `docs/OPEN.md` under "A
reviewer that has to check a claim recorded only in a pull request breaks its
own isolation to do it". In short: a well-formed handoff is not enough, because
the reviewer breaks isolation itself when a claim it must check exists only in
a thread. A shape check cannot touch that. A session could build the check,
watch it refuse a bad dispatch, mark this item done, and leave the real fault
untouched — which is why the two halves are written down together.*

*What the evidence does and does not say: the one review that reported
isolation intact was also the only one that returned `changes_required` with
blocking findings, where the others returned `merge_with_caution`. That is
one run, it is a correlation, and it is not proof of anything. It is recorded
because it is the only evidence there is, not because it settles the question.*

### 3. The handoff checker cannot check a project build

`tools/check-handoff.mjs` verifies a review dispatch before it is sent. It only
knows the repository it is run inside. That is fine for a change to the
workshop, where the code and the scope page sit together. **A project build has
the code in the project's repository and the scope page here**, and the checker
can see only one of them.

**Observed, 15 September 2026, on the first project build ever run** — pull
request 1 in Zibaldone. The handoff was correct and the checker refused it,
saying the commit did not exist, because it was looking in the wrong
repository. It refused rather than waving it through, which is the right way to
be wrong. But every project build is dispatched unchecked until this is fixed,
and the facts were verified by hand instead — which is exactly the arrangement
this check was built to replace.

What it needs: to be told which repository holds the code and which holds the
scope page, rather than assuming one repository holds both. The four things it
checks do not change.

*Why it matters more for a project build than for a workshop one: a project
build is larger, the owner is further from the code, and the job description is
the only thing standing between what he approved and what a reviewer measures.
That is the thing most worth checking, and it is the one case the checker
cannot reach.*

*Why it was not fixed on the spot: a build was in flight against the very
scope page the fix would touch, and the owner had just said to stop improving
the system and start using it. He asked for this on the roadmap rather than
done immediately, on 15 September 2026.*

### 4. A review that a building session cannot have reported as fresh

Every review started by a building session reports `reviewer_mode: challenger`
rather than `fresh_eyes`, whatever actually reached it. `docs/REVIEWER.md` sets
that test on how the review was started — a helper another session spawned is
`challenger`, and when it cannot tell, it is `challenger`. So a building
session may be unable to produce the fresh review `AGENTS.md` requires, and the
rule and the machinery disagree about what counts as one.

*What the evidence is, and all it is: the four runs recorded in
`docs/REFUSALS.md` on 14 September 2026 were all helpers started by the session
that built the reviewer. Nothing of that session reached them, so they were
isolated by construction, and they still are not the fresh session the rules
call for. Nothing here has established what the label costs, if anything.*

**And the label is not reliable, which is worse than the label being wrong.**
*Observed 15 September 2026: every review that day was started the same way, as
a helper spawned by the guide window. Some reported `challenger` and some
reported `fresh_eyes` — the same starting condition, opposite answers, from the
sessions whose own method says that starting condition decides it. So the one
signal anybody has about whether a review was independent is produced by the
review grading itself, and it does not agree with itself. A self-assessment that
varies is not a check.*

**The real difficulty, named, because neither half of it is obvious:** Da Vinci
is a defined role with its writing tools **removed** — it cannot edit, commit or
push, because those tools are not there. That is an absence, not a promise.
Starting it as a helper keeps that absence and loses the independence. Starting
it as its own session gains the independence and loses the absence: a plain
separate session *could* write to the repository and is only asked not to.
**Nobody has built the arrangement that gives both**, and that is the work, not
the label.

*Why it matters: this is the weakest joint in the whole loop. The one
multi-agent pattern with a clean replicated benefit is a fresh session for
review, and that benefit is the entire reason `AGENTS.md` allows two agent
definitions rather than one. If the review is not actually fresh, the budget is
paying for something it is not getting.*

**The owner decided on 15 September 2026 to park this as its own item** rather
than widen "Isolation that holds", which checks the handoff and does not touch
this. He asked on the same day that the two paragraphs above be added to it.
Where it belongs in the order is not settled.

### 5. The check before a commit

The same checks that run after a push, run before a commit as well.

The automatic checks cannot be bypassed and they stand between the work and
the merge. The check on this machine is faster and comes earlier. They are not
alternatives to each other and neither replaces the other.

### 6. Two small ones, in either order

- **The control test on Da Vinci, started the way the rules require.** It has
  been run twice — `docs/REFUSALS.md` records four runs against made-up inputs
  on 14 September 2026, of which two were the control test: clean code
  reported as no findings, and the same clean input again after a wording fix,
  still no findings. What has never been done is running it from the guide
  window. *Why that is the gap rather than the test itself: all four of those
  runs were helpers started by the session that built the reviewer. Nothing of
  that session reached them, so they were isolated by construction — but that
  is not the fresh session the rules call for. The real reviewer has since run
  on a real change, at pull request 5, which `docs/REFUSALS.md` records; what
  has not happened is the real reviewer meeting a deliberately clean input.*
- **The seventh budget: dispatch prompts sent without a recorded size — 0.**
  *Why: the number is already printed; this makes an unrecorded dispatch a
  failure, and it asserts no ceiling, because nothing has established that any
  particular size is too large.*

**Mostly done, 15 September 2026, and it was on no list because everybody
believed it could not be:** the context spent on descriptions of skills no
session here opens, measured that week at roughly 4,200 tokens. It was recorded
as the owner's account setting and outside this repository's reach. It is not —
`.claude/settings.json` switches them off and travels with the repository.
Pull request 20 switched off nineteen names; four more are still offered and are
named in `docs/OPEN.md`. *Why it is worth a line in a
file that only holds what is next: a thing written down as impossible stays
impossible until somebody checks, and this one had been sitting in the register
as a standing instruction to the owner to go and do something he did not need
to do.*

### 7. Memory

Claude Code's own per-agent memory, at project scope. Plain markdown,
committed, readable by the owner. Plus a prune when a piece of work closes.

No vector store. No embeddings. No infrastructure. *Why: this is already
decided in `docs/VISION.md`, and every failure in that field is stale entries
poisoning what gets found, not too little storage.*

### 8. Zibaldone

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
