# Checks watched refusing something

One of the six budgets is *checks never observed refusing anything — 0*. A
check nobody has watched refuse something cannot be told apart from one that
cannot fire. This file is the record of having watched.

Each entry says what was done to provoke the refusal, what came back, and the
date. An entry is only written after the refusal was actually seen.

---

## The budget check, on the startup token count

**14 September 2026.** The reviewer's definition was written straight into
`.claude/agents/`, at 4,228 bytes, while 4,720 bytes of room remained across
everything that loads at startup. `node tools/check-budgets.mjs` returned exit
code 1 and printed:

> Startup cost: about 10127 tokens against a budget of 10000.
> OVER BUDGET by about 127 tokens. Take something out of what loads at
> startup, or move it somewhere a session reads only when it needs it.
>
> BUDGET CHECK FAILED.

It refused again, at 95 tokens over, after a first attempt to trim. The work
changed to fit the budget rather than the other way round: the reviewer's
method moved to `docs/REVIEWER.md`, which a reviewer opens and nobody else
loads — the remedy the refusal itself names.

## The budget check, on dead file references

**14 September 2026.** `AGENTS.md` was edited to name `docs/REFUSALS.md`
before this file existed. Exit code 1:

> These are named in AGENTS.md but are not in the repository:
>   MISSING  docs/REFUSALS.md
> Either put the file back, or stop naming it in the rules. A rules file that
> points at things which are not there stops being believed.

Both halves of that check have now been watched refusing, separately.

## The read guard

**14 September 2026.** A 131,420-byte file was opened whole, with no page
limit. Refused:

> READ GUARD: ... is 1802 lines, about 32855 tokens. Reading it whole would
> spend a large part of this session on retrieval.

The same file was then opened with a limit of 3 lines and came back normally.
*Why that second half was worth doing: a guard that refuses everything is not
a guard, and the refusal on its own does not tell you which one you have.*

---

## The reviewer

Three runs, all on 14 September 2026, against inputs made up for the purpose.

**What these runs were, stated plainly, because it changes what they prove:**
all three were helpers started by the session that built the reviewer, not
fresh sessions started by the guide window. Each was given the reviewer's two
files and a handoff packet and nothing else — no part of this session's
context reached them. But that is isolation by construction, not the fresh
session the rules call for. That it behaves the same way when the guide window
starts it is untested, and is written up in `docs/OPEN.md`.

### It refused a handoff with a forbidden extra line

Packet: the seven lines, plus
`builder-assessment: I checked this carefully and it is correct and well
covered by tests.`

It refused, named the line, and **did not open the repository at all.** It
went further than it was asked to: it said that having now read the builder's
assessment it should not be the session that reviews this change even after
the packet is fixed, because it cannot un-read it.

### The control test — deliberately clean code, and it reported nothing

A five-line function that turns a title into a slug, correct as far as its
stated goal goes. It returned `safe_to_merge` and **no findings**, said which
cases it had traced by hand, and volunteered that the absence of a test was
not counted as a defect and why.

*Why this is the test that matters: a reviewer that cannot stay silent on
clean work is not measuring anything, and should be dropped rather than
tuned.*

### Deliberately obvious defect, and it found it

A function averaging a list, with `i <= numbers.length` in its loop and no
handling of the empty list. It returned `changes_required` and both defects,
each with a concrete trigger and an observed result — `average([1, 2, 3])`
returning `NaN` rather than 2. It ran the code to establish that rather than
reasoning about it.

### What went wrong in all three, and is now fixed

Every run reported `reviewer_mode: fresh_eyes`. All three were helpers, so all
three should have said `challenger`. The instruction was loose — it asked
whether the reviewer had seen the change being built, and none of them had,
so `fresh_eyes` was an honest answer to the question actually asked.

The test is now about the reviewer's own first instruction rather than about
the change, and the default when it cannot tell is `challenger`.

### Re-run after that wording changed, and it answered correctly

Same clean input, same packet, fourth run. It reported
`reviewer_mode: challenger`, which is the true answer. It still reported
**no findings** and `safe_to_merge`, so the fix did not cost the control test.

It also showed the two steps working as they are meant to. It raised five
candidates in the finding step — non-Latin letters being dropped, the Turkish
dotted capital I, an all-punctuation title slugging to nothing, non-string
input being coerced, and the absence of tests — and the killing step destroyed
every one of them, each for the same reason: it required a promise the stated
goal never made, and none had a caller anywhere in the tree to point at.
Nothing reached 8 in 10.

*Why that is the useful part of this run: those five are exactly the findings
a reviewer with no killing step reports, and they are all noise.*
