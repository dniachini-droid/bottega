# Two numbers per change

## What it does

Makes the build path count what its own review round found, and pays for the
room to say it by moving history out of the instructions.

Two numbers go on every pull request: how many findings the review produced and
how many of them blocked, and — added later, as it becomes known — what got
past the review and turned up afterwards. No limit on either.

The room comes from the build skill's long account of a reason that was once
stated wrongly. That is history rather than instruction, the register had
already nominated it as the largest removable thing, and it moves to the
register rather than being deleted.

## What done looks like

- Stage 4 says to count what the review found.
- Stage 7 puts both numbers on the pull request, in one line, before anything
  is merged, and says the second half starts at "none yet" and is edited later.
- The reason is attached, and it says plainly that no limit is set and why.
- The wrong reason is preserved in `docs/OPEN.md` rather than lost, and the
  entry that nominated it as removable records that it went.
- The heaviest session is **higher** than it was on `main` — about 9,649
  against 9,512 — and the change says so plainly rather than implying the move
  paid for the addition. Counting the review costs about 984 bytes; the history
  that came out freed about 437. Measured from a run of the check on both.
- The budget check exits 0 and the tests pass.

## What is out

- Any limit on either number. Nobody has seen what a normal one looks like, and
  a limit set before that is met by leaving out what was needed.
- Anything that reads the numbers back or adds them up. Two numbers on a pull
  request, and nothing else, until there are a dozen of them.
- The four additions from `docs/research/WHAT-MAKES-IT-EASY.md`. They are a
  separate change and they did not fit alongside this one.
