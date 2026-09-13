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
7  MERGE     he presses the button        ← he merges
```

Virgil runs this path. It does not build, review or merge any part of it
itself — stages 3, 4 and 5 are sessions it starts, and stage 7 is his.

## Which project, before anything else

Nothing is built in this repository. Every build happens in a project that is
registered in `projects/registry.json`, and the work lands in that project's
own repository.

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

## Say the stage in every single reply

Every reply during a build says which stage it is at, out of seven, and
whether anything is wanted from him. Not only at the changeovers. Every reply.

> Stage 4 of 7 — the reviewer is running. Nothing for you to do; I will tell
> you when.

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

The build session at stage 3 is given this file and told it is the whole job.

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

What is particular to a build, and is not written anywhere else:

### The session starts in Bottega and attaches the project

**Its repository is this one. Every time. Never the project's.** Bottega goes
in `source_url` and the working branch in `source_revision`.

**The prompt then tells the session to attach the project's repository to
itself** — `add_repo`, with the address taken from `projects/registry.json` —
clone it, and do all of its editing, committing and pushing there. The pull
request is opened in the project's repository, against that repository's main
branch.

*Why, and this is the load-bearing part of this whole skill: a session started
on the project's repository loads the project's files, and a project's
repository deliberately contains no rules. Such a session would be unbound by
everything in `AGENTS.md` — it would not know to build in small pieces, to get
a fresh session to review, to show evidence rather than claim a pass, or that
it must never merge. Starting in Bottega is what makes the rules apply.
Attaching the project is what gives it the code. Both, every time, and neither
one on its own is enough.*

### What the prompt says

Build what is in the scope page, nothing beyond it. The scope page is at
`projects/<project-id>/scope/<short-name>.md` in Bottega, where the session
already is. Open a pull request in the project's repository, and comment on it
when you finish, when you stop early, and when you are blocked.

And one prohibition, written into every build prompt: **copy no file from
Bottega into the project's repository — not the rules, not the skills, not the
scope page, not the tools.** *Why: the reason this workbench exists is that a
framework improved here improves every project at once. A project carrying its
own copy is a project stuck on the version of the day it was copied, and the
owner has said what he wants in his own words: project repositories stay where
they are and stay clean.*

Subscribe to the pull request as soon as it exists, and set a check-in.

---

## Stage 4 — REVIEW

**One review. A fresh session. A different model family. One pass.**

- **Fresh**, meaning a new session that has never seen this change being
  built — not the builder, and not a helper the builder started.
- **A different model family.** If the build ran on `claude-opus-5`, the
  review runs on `claude-sonnet-5`, and the other way round.
- **One pass.** When the review reports, this stage is over.

*Why, in three parts: a model reviewing its own work misses 31.7% of its own
drift, and this does not improve as models get better. A fresh session scores
measurably better than a helper that inherited the builder's context. And a
second review of the same unchanged code raises false alarms by 62% while
precision falls from 0.30 to 0.20 — once the real problems run out, reviewers
start inventing them.*

The reviewer starts the same way the builder does: **in Bottega, attaching the
project's repository**, for the same reason — a reviewer that had never loaded
the rules would not know that one pass is the whole job, or that it must
report whatever it finds.

The reviewer is given the scope page's "what done looks like" list and told to
check the change against it, and to comment its findings on the pull request
whatever it finds — including finding nothing.

---

## Stage 5 — FIX

Only if the review found something that blocks.

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

Virgil never merges. It says, in these words, with the number filled in and
the project named, because the pull request is in the project's repository and
not in this one:

> Ready. **Merge Zibaldone #7** when you are happy with it.

Then it stops.

*Why: the merge is the last point at which he can say no, and it is his. A
session that merges its own work has removed the only step in this path that
he controls outright.*

---

## Ending a reply during a build

The last line is the `Next:` line, exactly as everywhere else, and it names
the one thing he does now — or says plainly that there is nothing.

The stage line goes immediately above it.

> Stage 2 of 7 — I have written down what I think the smallest version is.
> Next: read the four lines above and say yes, or tell me what is missing.
