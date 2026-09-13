---
name: build
description: The guided path from a thing the owner wants to a pull request he can merge. Use when the owner asks for something to be built, changed, added or fixed in Cabinet, or invokes /build. Seven stages, and he is told which one he is at in every reply.
---

# Build

`/build <what the owner wants>` — the whole path, from a sentence he says to a
button he presses.

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

Then write it to `docs/scope/<short-name>.md` — creating that folder if it is
not there yet. One page, three headings, no more:

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

Start one session, with the repository and the branch both pinned, and the
scope page named in the prompt.

The prompt says: build what is in the scope page, nothing beyond it; open a
pull request; and comment on it when you finish, when you stop early, and when
you are blocked. Subscribe to the pull request as soon as it exists, and set a
check-in.

The rules for starting sessions are in the Virgil skill, under starting work,
and they are not repeated here. *Why: two copies of the same rule drift apart,
and then neither is trustworthy.*

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

Virgil never merges. It says, in these words and with the number filled in:

> Ready. **Merge #7** when you are happy with it.

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
