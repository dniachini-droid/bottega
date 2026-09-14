# What travels between sessions, and what must not

Reference for building the handoff from the builder to the reviewer. Nothing
here binds until it becomes a rule in `AGENTS.md` with its reason attached —
see `docs/research/README.md`.

**How claims are marked.** Every item below says whether it was **read
directly** from the source, or came **only from a search summary**. Anything
in the second class is marked **unverified** and stays marked. Where the class
was never recorded at all, the item says so rather than guessing — an unmarked
item is not the same as a checked one.

---

## Enforce the exclusions in the format itself, not by asking

A published handoff format does not request that the transcript be left out.
It writes:

```
"raw_transcript_included": { "const": false }
```

A constant, not a default. **The format cannot express a packet that contains
a transcript.** There is nothing to disobey.

*(Read directly.)*

## What must never reach the reviewer

- the prompt that produced the work
- the builder's reasoning
- the builder's record of what tools it called
- the raw transcript
- the contents of files — the reviewer reads the tree as it stands, not a
  snapshot somebody else took
- **the builder's own assessment of its work**

The last one matters most. A guess, written into a named field, acquires
*"social status as a database field"* — it stops reading as a guess and starts
reading as a fact about the change.

## Record whether the isolation was real

Two values on every review that comes out:

- `context_isolation: true | false`
- `reviewer_mode: fresh_eyes | challenger`

A reviewer that was merely *told* to behave as though it had fresh eyes has to
say so.

*Why: today a contaminated review and a clean one look identical in the
record. If they look identical, the rule that the reviewer must be a fresh
session cannot be checked after the fact — and an unverifiable rule is one
that will eventually be broken quietly.*

## Stamp the handoff, and check it for staleness

Capture at handoff: branch, head commit, `git status --short`, and
`git diff --stat`.

The reviewer compares the live repository against what was captured and
reports four plain true-or-false answers:

- `branch_matches`
- `head_matches`
- `status_matches`
- `diff_stat_matches`

Two independent implementations do exactly this. It is roughly 25 lines of
shell.

*(Source class not recorded — this was handed over without saying whether the
two implementations were read directly or came from a summary.)*

## Make the handoff refusable, not advisory

One published relay rejects both **missing** fields and **unexpected** ones.

The second half is the point: a builder cannot smuggle in an "assessment"
section, because a field nobody asked for is a rejection, not a curiosity.

*(Source class not recorded.)*

## The stage finishing is not the task finishing, and neither is the file existing

`agent lifecycle completed ≠ task completed ≠ artifact valid`.

From a real bug report: a sub-agent announced that it understood the task, ran
`mkdir`, never wrote the file, and the parent reported success.

**Check that the thing exists before calling the stage done.**

*(Source class not recorded — recorded here as "a real bug report", which is
how it was handed over.)*

## Answer every conditional gate out loud, yes or no, never by leaving it out

Measured incident:

> "a conductor that never considered the question produced exactly the same
> prompt as one that considered it and decided against. Those are different
> states and the worker cannot distinguish them."

Silence is not an answer. "Considered, decided no" and "never thought about
it" have to look different on the page.

## Put the fact that would invalidate an instruction inside that instruction

Not in a warnings section further down.

> "An imperative gets executed before a warning gets applied."

If step four stops being correct when the branch is dirty, that condition
belongs in step four, not in a list of caveats at the top or the bottom.

## Do not copy the mainstream handoff patterns

The popular agent frameworks pass the **entire conversation history** between
agents by default. Their only alternative setting is "last message".

Both are *continuation* handoffs — built so the next agent can carry on where
the last one stopped. A review handoff is the architectural opposite: it
exists to make sure the next agent cannot carry on from anywhere, and arrives
knowing only what the tree says.

Copying the mainstream pattern here imports exactly the thing the reviewer is
for.

## A correction worth recording

The usual justification for a facts-only handoff is that reviewers anchor on
whatever they are told first.

**That is not supported.** The one randomised trial found (n=108) no anchoring
effect.

The case for facts-only does not rest on anchoring. It rests on models
preferring their own output. That is the reason to cite, and the anchoring
argument should not be repeated.
