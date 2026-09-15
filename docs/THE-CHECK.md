# How the budget check counts

This is the mechanism behind the two enforced budgets. It was moved out of
`AGENTS.md` on 15 September 2026 to make room, and the move is the exact thing
the anti-dodge rule in `AGENTS.md` warns about — so it was done the only way
that is honest: **nobody is sent here.** A session working in this repository
does not need to know how the counting works. It needs to know the check exists,
to run it before committing, and that a path in backticks must be declared. All
three stayed behind. Open this file if you are changing the check itself.

*If that ever stops being true — if a rule starts telling sessions to read this
page — then it is required reading and `tools/reads.json` has to say so, which
charges it back to every session. That is the rule working, not a problem.*

---

## What it charges

For the startup count it reports the two numbers, and fails if either is over.
Every session is charged `AGENTS.md`, `.claude/settings.json`, and the name and
description of each skill and each agent definition — all a session is shown of
them until it opens one. The heaviest session is that, plus the largest single
skill or agent definition in full, counting any supporting files that sit beside
it. Bytes divided by four.

Reading is followed onward: a file that sends the session to a third file is
charged for that one too, each file once.

## The declarations file

Which files those are is written down in `tools/reads.json`, one entry per file,
saying which of the names it uses a session is sent to open and which it only
mentions. A name that is in neither list stops the check.

*Why it is written down rather than worked out: "read this file" and "the
reasoning is in this file" are the same shape to a machine, so a check that
guessed from the wording could be beaten by rewording the sentence — and a check
that quietly dropped what it could not tell apart would undercount, which is the
direction that does harm. Refusing until somebody says which it is means a new
pointer out of a skill cannot pass unnoticed.*

## The symbolic link

`CLAUDE.md` is a symbolic link to `AGENTS.md`: the same bytes under a second
name, not a second file. A session is given that text once, so it is counted
once, and counting `AGENTS.md` counts exactly what arrives.

## The tests

`tools/check-budgets.test.mjs` is the tests for that check. Each was watched
failing against the broken version before it was trusted: two for the faults the
counting really had, two for the prompt record, and one for a backticked name
left in neither list. `node --test` runs them in the same automatic checks, so a
failing test on `main` cannot sit unnoticed. No session ever reads them, so they
cost nothing against either limit.

## The prompt number, and why it is a record rather than a measurement

The check cannot measure a prompt. A prompt is never a file here — it is written
in the guide window and handed to the session at the moment it starts, and
nothing on disk holds it. So the window saves a copy beside that project's scope
pages, one file per prompt, named for the pull request and the stage, holding
the prompt and nothing else. What is printed is the size of that copy.

**It is a record, not a measurement**, and nothing here can tell whether the
copy matches what was sent. Nothing saved prints nothing, and nothing the check
could reach is put in its place. *Why not: the scope page and the empty template
in the build skill are both things it could measure and call the prompt, and
neither is the prompt. A number that measures the wrong thing is worse than no
number, because it would be watched and trusted.*

It is printed beside the two budgets and added to neither, because both limits
were settled against the instruction numbers alone.
