# Tests, but only the ones something earned

## What it does

Gives the measurement script tests, starting with the two faults it actually
had today. Writes down the rule that a fault which blocked a merge becomes a
test, so the same fault cannot come back silently. And fixes the limit on
failing tests, which today rewards having none at all.

## What done looks like

- **`tools/check-budgets.mjs` has tests**, and they run in the automatic
  checks on every push. They are never read by any session, so they cost
  nothing against either limit.
- **The first two tests are the two faults that really happened today**, not
  invented ones:
  - a file a session is *instructed* to read must be charged, wherever it
    lives — the reviewer's method was charged nothing while every reviewer
    was ordered to read it;
  - an instruction file a session is *not* given whole must not be charged as
    though it were — the old count summed every skill file and reported nearly
    four times the true figure.
- **Each test has been watched failing**, against the broken version of the
  code it is there to catch, and then watched passing. What was seen is
  written into `docs/REFUSALS.md`. *A test never seen failing cannot be told
  apart from one that cannot fail.*
- **A rule in `AGENTS.md`, with its reason: a finding that blocked a merge
  becomes a test before the fix is merged.** Only blocking findings. Not
  advisory ones — those are recorded and left alone, and turning them into
  tests would be chasing findings, which is the thing that broke an earlier
  repository of the owner's.
- **The limit "failing tests on `main` — 0" is reworded so it cannot be
  satisfied by having no tests.** As written today it scores a perfect zero
  because nothing exists to fail, and the first test can only make it look
  worse. A limit that punishes the right action is not a limit.
- **The second 10,000 limit is written into `AGENTS.md` as settled**, not as a
  proposal. The owner ratified it on 14 September 2026.
- The automatic checks pass, and both numbers stay under 10,000.

## What is out

- Tests for anything other than `tools/check-budgets.mjs`. The read guard has
  never been wrong; the measurement script has been wrong twice in one day.
- A rule that a project must have tests before it is built. That is a form to
  fill in before starting, and the vision rejects front-loading: *a check at
  the end costs nothing until something is actually wrong.*
- A testing framework, or any dependency. If it needs more than the language
  itself, it is too much.
- Memory, the check before a commit, Zibaldone, and renaming anything.
