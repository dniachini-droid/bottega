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
4  REVIEW    start a fresh reviewer
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
whichever one it was written for — which happened here: the builder's
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
- **The reviewer writes nothing at all.** It reads, and it comments once on the
  pull request. *Why, and the tools its own definition takes away so that this
  is not only a promise, are in `.claude/agents/reviewer.md`.*

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

> Stage 4 of 7 — the reviewer is running. Nothing for you to do.
> Next: nothing — I will tell you when the review lands.

The stage line goes immediately above the `Next:` line that ends every reply.

*Why: he has said, more than once, that his problem is not knowing where he
is. A reply that does not say costs him a question to find out.*

---

## Stage 1 — SCOPE

**This is the most valuable stage in the path.** *Why: 44% of the times an
agent builds the wrong thing, it traces back to a gap the person left in the
request — not to the model getting it wrong afterwards. An hour saved here is
paid back with interest at stage 5.*

It is a fixed, short script. Five questions, asked plainly, in this order:

1. What should it do, in one sentence?
2. What would you see on the screen when it is working?
3. What is the smallest version worth having?
4. What must it **not** do yet?
5. **How will we know it is right?**

The fifth is load-bearing and is never dropped for time. His answer becomes
the list the reviewer checks against at stage 4. *Why: a reviewer given a
detailed list written by the person who wanted the thing passed 10 runs in 10.
A reviewer asked "did you check it?" passed 5 in 10.*

### When to stop asking

**Ask only what would change what gets built.** Everything else gets a default,
stated plainly as a default he can overrule in a word.

Not: "Would you like the button at the top or the bottom?"
But: "I will put the button at the top. Say if you want it elsewhere."

*Why: he has said plainly that a session which lists options and waits is
making him do the work he came here to avoid. A question he has no basis to
answer is not consultation, it is a transfer of work.*

If he answers a question with "you decide", that question is answered. Take
the decision, say what it was, and move on.

---

## Stage 2 — SLICE

Propose the smallest version worth having, in plain words, and wait for him to
say yes.

Then write it to `projects/<project-id>/scope/<short-name>.md` — creating the
folders if they are not there yet. **The scope page lives in this repository,
in the project's folder here. It is never written into the project's own
repository.** *Why: what the workshop learns about a project accumulates in the
workshop. A scope page pushed into the project's repository is the first file
of a framework growing inside an application, which is the exact thing this
workshop exists to prevent.*

One page, three headings, no more:

- **What it does** — in his words, from question 1.
- **What done looks like** — from questions 2 and 5. This is the list the
  reviewer will check against.
- **What is out** — from question 4, as a list.

**Then commit it and push it to the working branch in Bottega — the same
branch stage 3 pins.** *Why: stage 3 starts a session on a fresh clone of
Bottega taken from GitHub. A page written only in this window's own copy is
not in that clone, and the session opens a path that is not there.*

The build session is given what is on this page as the whole job — the words
themselves, in its prompt, not the path to them.

*Why: a scope that lives only in a conversation cannot be handed to a second
session, and cannot be checked against afterwards. A scope on a page can be
both. The three headings are there because "what is out" is the one that
stops a build quietly growing, and it is the one that gets dropped when the
scope is only spoken.*

---

## Stage 3 — BUILD

Start one session. The general rules for starting sessions — pinning the
branch, never plan mode, facts in the prompt, the title, the report on the
pull request — are in the Virgil skill under starting work, and they are not
repeated here. *Why: two copies of the same rule drift apart, and then neither
is trustworthy.*

Where it starts, where it clones the project, and what it does there is in
the section above that covers all three of the sessions this path starts.

What is particular to a build, and is not written anywhere else:

### What the prompt says

**The scope page's three headings are written into the prompt in full** —
what it does, what done looks like, what is out — and the prompt says that is
the whole job and nothing beyond it. The page is also on the branch, at
`projects/<project-id>/scope/<short-name>.md`, and the prompt says so as the
place to go back to; but the session is never sent to a file for the job
itself. *Why: this skill's own rule is to put the facts in the prompt, not
directions to the facts, and a session sent to a file that is missing reads
the promise that it is there as evidence it is looking in the wrong place.*

**The pull request already exists when the session starts, and its number is
in the prompt.** Virgil created the branch, opened it as a draft and
subscribed to it before starting anything — the Virgil skill says how. So the
session opens nothing. It builds, and it comments there when it finishes, when
it stops early, and when it is blocked.

*Why this rule survived and "open it first yourself" did not: both existed to
close the same gap, between a session starting and its number existing. Opened
before the session starts, the gap is nothing; opened by the session, it is
however long the first push takes. Keeping both is how a rule outlives the gap
it was written for.*

And two prohibitions, written into every build prompt, one for each direction:
**copy no file from Bottega into the project's repository — not the rules, not
the skills, not the scope page, not the tools. And copy no file from the
project into Bottega — its code never comes here, in whole or in part.**

*Why the first: the reason this workbench exists is that a framework improved
here improves every project at once. A project carrying its own copy is a
project stuck on the version of the day it was copied, and the owner has said
what he wants in his own words: project repositories stay where they are and
stay clean. Why the second: an application that has started arriving in the
workshop is the 85,000-line failure this repository opens by citing, and it
arrives one useful file at a time.*

---

## Stage 4 — REVIEW

**One review. A fresh session. A different model family. One pass.**

- **Fresh**, meaning a new session that has never seen this change being
  built — not the builder, and not a helper the builder started.
- **A different model family.** If the build ran on `claude-opus-5`, the
  review runs on `claude-sonnet-5`, and the other way round. *Why: a fresh
  session of the same model starts fresh on the context but not on the habits
  that produced the change, and the preference for one's own output is the
  thing being designed around.*
- **One pass.** When the review reports, this stage is over.

*The reasons for a fresh session and for one pass only are in `AGENTS.md`,
attached to the rules they belong to, and are not copied here.*

What the reviewer is, and what it refuses, is `.claude/agents/reviewer.md`.
Start it the way every session here starts, and hand it the seven lines that
file opens with — stamped off the branch at the moment of handoff, the scope
page's "what done looks like" list copied in word for word, and **no eighth
line.** *Why: it refuses an unexpected field, and the field you would want to
add is your own opinion of the work.*

---

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

## Stage 6 — SEE IT

Tell him what to look at, in ordinary words. Four things, always:

1. **Which screen** to open, by the name he would call it.
2. **What to click.**
3. **What he should see** if it is working.
4. **What would mean it is wrong** — the specific thing to watch for, not
   "any errors".

If nothing he can see has changed, say exactly that and say why. *Why: real
work is often invisible, and "nothing looks different yet, and here is why" is
a complete answer. Inventing something for him to look at is worse than
having nothing.*

---

## Stage 7 — MERGE

What happens here depends on what the change touched. The rule and its reasons
are in `AGENTS.md`; this is the shape it takes in the path. The number is
filled in and the project named, because the pull request is in the project's
repository and not in this one.

**A small reversible change that a fresh session has reviewed** — Virgil may
merge it, then says:

> Merged. **Zibaldone #7** is in.

**A change to `AGENTS.md`, to either skill, or to an agent definition** — his
to say yes to first:

> Ready, and it changes the rules. **Merge Zibaldone #7?** Say yes and I will.

**Anything larger, anything hard to undo, or anything Virgil is unsure of, and
always when the review found nothing at all** — he presses the button:

> Ready. **Merge Zibaldone #7** when you are happy with it.

Then it stops.

*Why the three cases and not one: a review that found nothing looks exactly
like a review that never ran, and the files that govern every future session
are not quietly reversible. Everywhere else, making him press the button buys
nothing he did not already get from the review.*
