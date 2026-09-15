# Isolation that holds

## What it does

Makes the reviewer's isolation something the workshop can rely on, rather than
something each review reports on afterwards.

One small program checks a handoff before it is sent, and refuses it. Whatever
is about to dispatch a review runs it first, so a malformed handoff never
arrives — and a handoff that would force the reviewer to go and read a pull
request thread never arrives either.

*Why both halves in one thing: `docs/PLAN.md` says the shape check alone is not
enough, because a well-formed handoff still breaks isolation when a claim the
reviewer has to check exists only in a thread. A session could build the shape
check, watch it refuse, mark the item done, and leave the real fault untouched.*

## What done looks like

- A program that takes the seven lines of a handoff and refuses it, saying
  which line is wrong and why, when any of these is true:
  - there are not exactly seven lines, or a required field is missing, or there
    is an eighth field;
  - the commit named as `head` is not on the branch named as `branch`.
    *Why this one first: on 14 September 2026 a handoff went out with a commit
    code written from memory rather than looked up, and the correction sent
    afterwards is what broke the reviewer's isolation. A bad dispatch cannot be
    repaired after sending.*
  - `branch`, `head`, `status` or `pull-request` do not match what is really
    there;
  - `done-looks-like` is not word for word the "What done looks like" section
    of that change's scope page, as that page stands on the branch.
- **That last check is the second half of the job.** If the job description the
  reviewer is given is copied exactly off a page already on the branch, there is
  nothing left in the pull request thread for the reviewer to go and get.
- It is watched refusing each of those, and what was seen is written in
  `docs/REFUSALS.md`. *Why: "checks never observed refusing anything" is a
  budget here and it is zero.*
- A test for each refusal, each watched failing against a version without that
  guard before it is trusted.
- The build path says to run it before dispatching a review, at stage 4, and
  writes the program's path on its own between backticks as well as inside the
  command. *Why on its own: a path bundled into a longer backtick span is not a
  path to the budget check, so declaring it in `tools/reads.json` is a
  declaration the file does not earn — which is what the stale-declaration
  guard refuses, and did refuse here.*
- The budget check exits 0 and the whole test suite passes **on this branch
  merged into `main`**, not only on the branch standing alone. *Why the merged
  result: this branch was cut before pull request 22 landed, and it passed
  alone while failing the moment it met `main`.* The heaviest startup number
  stays under 10,000 — it is about 9,554 tokens, with about 446 tokens of room
  left for later additions.

## What is out

- The seven-line handoff format. It is not changed, only checked.
- `docs/REVIEWER.md` and `.claude/agents/da-vinci.md`. Da Vinci's method is not
  touched.
- The "spawned as a helper" problem — that every review started by a building
  session reports itself as `challenger` rather than `fresh_eyes`, whatever
  reached it, so a building session may be unable to produce the fresh review
  `AGENTS.md` requires. **The owner decided on 15 September 2026 to park this
  as its own item rather than widen this job.** It goes on `docs/PLAN.md` with
  the evidence gathered so far, and nothing here attempts it.
- Making the program run automatically. It is run before a dispatch because the
  build path says to; nothing here enforces that it was run.
  *Why that gap is left open and written down rather than closed: a check that
  the check was run is a second mechanism guarding the first, and nothing has
  yet established that anybody skips it.*
- Moving the 10,000 limit.
