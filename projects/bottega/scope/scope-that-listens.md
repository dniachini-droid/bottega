# Scope that listens

## What it does

Makes the scoping stage interpret what the owner means, rather than
transcribing what he said.

Three changes, all in the part of the build path that turns a sentence he says
into a page the work is measured against. They come from
`docs/research/WHAT-MAKES-IT-EASY.md`, which surveyed a system he found easier
to use than a plain session and asked which of it Bottega lacks.

## What done looks like

- **The session looks at the code before it asks anything.** It reads what is
  already there in the project, then asks questions that name the real
  alternatives it found. *Why: the research puts this first as the change most
  likely to produce "it interpreted what I was asking", and stage 1 already
  says to ask only what would change what gets built — looking is how you find
  out which questions those are.*
- **It reads back what it understood, in his words, and waits.** Before the
  scope page is written, it says what it took the job to be and lets him
  correct it. *Why: the scope page becomes the list Da Vinci checks against.
  A misunderstanding written into it is a misunderstanding the review will
  confirm rather than catch.*
- **It drafts the fifth answer rather than asking for it.** "How will we know
  it is right?" is the load-bearing question and the hardest to produce cold.
  The session proposes an answer from what it has learned and he corrects it.
  *Why: for an owner who is not an engineer, correcting a draft is easier than
  producing one, and this is the answer stage 4 depends on most.*
- Each of the three carries its reason, in the same style as the rules already
  there. No rule arrives without one.
- **The fourth idea from that research — letting a session refuse a job as
  unbuildable or not worth building — is recorded as decided against.** The
  owner decided on 15 September 2026 to leave it out and take it off the
  roadmap. It is written down where somebody proposing it again would look,
  with the date and the fact that it was his decision, so that it is not
  rediscovered as a gap. *Why written down rather than simply not done: the
  research page lists it as worth considering, and a thing nobody wrote a
  decision against gets proposed again every time somebody reads that page.*
- `docs/PLAN.md` records these three as done, since they were on no list.
- The budget check exits 0 and the whole test suite passes, on this branch
  merged into `main`. The heaviest startup number stays under 10,000. It stood
  at about 9,554 tokens with about 446 of room before this change; report what
  it is afterwards.

## What is out

- The refusal, as above.
- A written pass-or-fail standard the scope page must meet. That is a fourth
  idea from the same research and it is not in this job.
- Any change to stages 3 to 7, to `AGENTS.md`, to `docs/REVIEWER.md` or to
  `.claude/agents/da-vinci.md`.
- Moving the 10,000 limit. If the three additions do not fit, that is the
  finding: say so and stop, rather than making room by taking out something
  that is doing work.
