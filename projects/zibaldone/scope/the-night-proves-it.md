# The night proves it

## What it does

Makes a night that did nothing say so, and go red.

On 17 September 2026 the first real night ran end to end and every step went
green. Nothing was filed. He found it before anyone else did, in the only way
left to him: *"It filed but my new entires don't have anything in the
margins."*

What the run reports, and all it reports:

| step | time | turns | cost reported |
|---|---|---|---|
| File what is new | 8.2 seconds | 3 | US$0.074 |
| Write him an article | 200.5 seconds | 11 | US$0.427 |

Three turns cannot be a filing. The filing has to ask the notebook what is
new, write a log entry for each, decide what each capture is about, write or
rewrite a page for each subject, and commit and push. Three turns is reading
the instructions, looking at something, and stopping.

**Why nobody can say what it stopped on.** `anthropics/claude-code-action`
hides the session's own output unless `show_full_output` is set, so the one
account of what happened is the one thing the log does not carry. The step
exits 0 because the session ended without crashing. Finishing and doing the
work are not the same thing, and nothing here could tell them apart.

*Why this is its own piece rather than a fix to the clock: the clock's own
scope forbids a night writing something to fill a gap, and that held — no
article was invented. What it does not have is any way to know work did not
happen. That is a different guarantee and it needs its own evidence.*

## What it must never do

- **Never print anything of his into a build log**: not a capture, not an id,
  not a page name, not a line he wrote. His repository is private now, and
  that is not a reason to relax this. *Why: it was already the finding that
  blocked the clock once. A private log is still a log, and it is still at
  GitHub.* This is what rules out simply switching the hidden output on.
- **Never let a night that did no work finish green.**
- **Never guess at what the filing did.** Whatever is reported has to be read
  off the mind and the notebook, not inferred from a step's exit code.
- **Never make the filing or the noticing do less in order to be checkable.**

## What done looks like

- A night that files nothing when the notebook has captures the mind does not
  goes red, and the run says so in a line that contains only numbers.
- A night that files something says how many, as a number, and nothing else.
- Nothing in any log names a capture, an id, a page, a subject or a word he
  wrote — before, during or after this change.
- The reason the filing stopped after three turns on 17 September 2026 is
  established and written down, from evidence rather than from reasoning about
  what is likely.
- Whatever that reason turns out to be, it is either fixed, or written in
  `docs/OPEN.md` with what was tried.
- The check that catches a night doing nothing has been watched failing
  against a night that did nothing, and passing against one that filed, with
  what was seen written in `docs/REFUSALS.md`.
- The whole suite is green.

## What is out

Deep research, still designed and not built. And the question of whether a
night's thinking is charged to his subscription or billed — the run reports
about A$0.70 a night at full rates, and whether he pays that is unestablished
and belongs with the first weeks of nights, not here.
