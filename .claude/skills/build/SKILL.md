---
name: build
description: The guided path from a thing the owner wants to a pull request he can merge, in a project registered with this workshop. Use when the owner asks for something to be built, changed, added or fixed, or invokes /build. Seven stages, and he is told which one he is at in every reply.
---

# Build

`/build <project-id> <what the owner wants>` — the whole path, from a sentence
he says to a button he presses.

```
1  SCOPE     ask the questions            ← he answers
2  SLICE     propose the smallest version ← he approves
3  BUILD     start the build session
4  REVIEW    start a fresh Da Vinci
5  FIX       one cycle, if needed
6  SEE IT    tell him what to look at     ← he looks
7  MERGE     small and reviewed, or ask  ← his, unless small
```

Virgil runs this path. It does not build or review any part of it itself —
stages 3, 4 and 5 are sessions it starts. Stage 7 it may do, within the limits
in `AGENTS.md`.

## Which project, before anything else

A build happens in a project registered in `projects/registry.json`, and lands
in that project's own repository — **except Bottega, which is its own first
project.** When the work is Bottega's own, this repository is the project:
nothing to attach, nothing to clone, and the sections below about the
project's clone do not apply. *Why: the workshop has to carry its own changes
through the seven stages before it can be trusted with an application's;
`docs/PLAN.md` decided that, and it is the later decision.*

So the first thing, before the first question of stage 1:

**Look the id up in `projects/registry.json`.** That file gives the address of
the project's repository. It is the only place that address is read from.

**An id that is not in the registry is an error, not a guess.** Say that the
id is not there, name `projects/registry.json` as the file it would be in, and
list the ids that are. *Why: a guessed project is a change pushed at the wrong
repository, and it can be pushed before anyone notices the guess was made.*

If he does not name a project and only one is registered, say which one is
being used and carry on. If more than one is registered, ask which — that
question changes what gets built, so it is worth his time.

---

## Every session this path starts

Stages 3, 4 and 5 each start a session — the build, the review and the fix.
**What is the same for all three is written here once. What each one does in
the project's repository is different, and that is written here too, one line
each.** *Why: a rule written out at three stages drifts in two of them. But a
rule written once for all three hands every session the instructions of
whichever one it was written for — which happened here: Michelangelo's
"open the pull request" reached the fix session, whose repairs then land in a
second pull request and not in the one the owner is told to merge.*

### The same for all three — it starts in Bottega and attaches the project

**Its repository is this one. Every time. Never the project's.** Bottega goes
in `source_url` and the working branch in `source_revision`.

**The prompt then tells the session to attach the project's repository to
itself** — `add_repo`, with the address taken from `projects/registry.json` —
**asking for push access, not read.** *Why: that tool gives read access unless
push is asked for, and read access fails nowhere until the very end. The
session attaches, clones, builds the whole change and commits it, and is
refused at the push — with the work done, nothing saved anywhere, and no pull
request to report into.*

*Why start in Bottega at all, and this is the load-bearing part of this whole
skill: a session started on the project's repository loads the project's
files, and a project's repository deliberately contains no rules. Such a
session would be unbound by everything in `AGENTS.md` — it would not know to
build in small pieces, to get a fresh session to review, to show evidence
rather than claim a pass, or that it must never merge. Starting in Bottega is
what makes the rules apply. Attaching the project is what gives it the code.
Both, every time, and neither one on its own is enough. The fix session at
stage 5 needs this most rather than least: it works quickly, against a list of
findings, on code it did not write.*

### The same for all three — the project is cloned beside Bottega

**The prompt says where.** The session wakes up in Bottega's own directory.
The project is cloned into a separate directory next to it, `../<project-id>`,
and never anywhere inside Bottega's. Every command the session runs for the
project is run from that directory.

*Why: with the project cloned inside Bottega's directory, a single `git add -A`
run in Bottega stages the whole project as an embedded repository — not the
files, a pointer to a commit that nobody who clones Bottega can fetch — and
pushes that broken pointer into the workshop. Observed, both ways round: with
the project nested, `git add -A` in the workshop staged it as mode 160000 with
git's own warning about an embedded repository; with the project in its own
directory beside the workshop, there was nothing to stage.*

*What this reason is not, because it was wrong here once and a rule in this
repository is kept or deleted on the strength of its reason: it is not that a
careless `git add -A` in the project's clone sweeps Bottega's files into the
project's commit. Two clones never share an index. Run in the project's clone
it staged the project's own file and nothing else, nested or beside. The
direction that needs preventing is the other one.*

Bottega's `.gitignore` is the second lock on the same door: it lists each
registered project's id, so a clone that lands inside anyway is not staged.
**Registering a project adds its id to `.gitignore` as well as to the
registry.** *Why: whether a session can clone outside its own working
directory has not been established, so the rule above may not hold in every
environment, and the backstop then carries it.*

What no directory stops, said plainly rather than patched with a second
mechanism: a session that deliberately copies a file from one side to the
other can still do it, and a session sitting in Bottega's own clone can add
the project as a second remote and push Bottega's tree straight into it
without copying anything. The separation removes the accident, which is how
this actually happens. The two prohibitions in the build prompt — copy nothing
either way — are what cover the deliberate act, and they stay.

### Different for each — what the session does in the project's clone

- **The build session** does its editing, committing and pushing there, on the
  branch Virgil has already opened the pull request on. It opens nothing.
- **The fix session pushes its repairs to the branch that is already under
  review, and opens nothing.** *Why: the pull request the owner is told to
  merge at stage 7 is the one the review was about. Repairs in a second pull
  request are repairs he does not merge.*
- **Da Vinci writes nothing at all.** It reads, and it comments once on the
  pull request. *Why, and the tools its own definition takes away so that this
  is not only a promise, are in `.claude/agents/da-vinci.md`.*

### What these sessions must be created with

`add_repo` is not a free call — it goes through a permission decision, and a
session started by this path is unattended by design. So `create_session` is
given `permission_mode: "dontAsk"` — never `"plan"`, which waits for ever for
an approval from a person who is not there — and the repository-attaching tool
named in `extra_allowed_tools`. **That tool's name carries the prefix of the
server it comes from, which differs between environments: take it from the
window's own tool list, never from memory.** A session cannot be given a
permission the window does not itself hold, so the window must hold that one,
and a session cannot be started in a mode more permissive than the window's.

**This has never been done unattended, and it is the single biggest untested
assumption in the workshop.** It is written down in `docs/OPEN.md` rather than
softened here. *Why: the one time a session attached a project and pushed, a
person was present to approve it. A refusal in an unattended session looks,
from outside, exactly like a session that is working.*

---

## Say the stage in every single reply

Every reply during a build says which stage it is at, out of seven, and
whether anything is wanted from him. Not only at the changeovers. Every reply.

> Stage 4 of 7 — Da Vinci is running. Nothing for you to do.
> Next: nothing — I will tell you when the review lands.

The stage line goes immediately above the `Next:` line that ends every reply.

*Why: he has said, more than once, that his problem is not knowing where he
is. A reply that does not say costs him a question to find out.*

---

## The seven stages — open only the one you are at

**Each stage is its own file in `stages/`. Open the one you are on and no
others.** *Why: a scope session that also loads the merge instructions is
carrying six stages it will never use, and context volume degrades accuracy
whoever put the context there. The check knows this shape: a skill may declare
its stages, and is charged the one that costs most rather than all seven.*

| stage | file | what it is |
|---|---|---|
| 1 | `stages/1-scope.md` | SCOPE — five questions, and the answer to the fifth is what Da Vinci checks against |
| 2 | `stages/2-slice.md` | SLICE — the scope page, the branch, the draft pull request |
| 3 | `stages/3-build.md` | BUILD — Michelangelo is started, and reports on the pull request |
| 4 | `stages/4-review.md` | REVIEW — Da Vinci, fresh, seven lines and nothing else |
| 5 | `stages/5-fix.md` | FIX — given the review itself, never a summary of it |
| 6 | `stages/6-see-it.md` | SEE IT — the owner looks at the thing working |
| 7 | `stages/7-merge.md` | MERGE — and what may be merged without him |

Everything above this line holds at every stage. Everything below it lives in
the stage files.
