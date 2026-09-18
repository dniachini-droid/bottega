# The research

## What it does

Takes a question, goes out to the world, and brings back what it found written
in the margin of his own page.

Two ways in, and he asked for both on 17 September 2026: *"deep research to run
manually in Claude code, and weekly for a topic of the AI's choosing - and NO,
it should NOT be declined."*

- **He asks.** He types a question at his own computer. It reads what he has
  actually written on that subject, goes and finds what is known, and gives him
  back a page: his words, and beside them what the world says, each with a
  source he can open.
- **It asks.** Once a week, nobody having asked, it picks a subject itself and
  does the same.

Shown two slices on 18 September and asked which he wanted first, he said
**"Both."** So this is one change and one merge, not two.

## The one sentence, from the research

*A page of his own writing comes back to him a week later with the world's
answers written in the margin beside the questions he asked himself, and the
notebook keeps score of whether the answers held.*

`projects/zibaldone/deep-research-research.md` is where that came from: nine
questions answered on 16 September 2026, every claim marked verified, reported
or reasoning. It is the evidence for everything below and it is not repeated
here. **Read it before building.**

## Where it runs, and why that is settled

**On the machines the nights already run on.** Not in a session at his
computer, and not in the workshop's own window.

*Why: it has to reach the internet, and neither of those can. The window that
scoped this tried Wikipedia, arXiv and a plain test page on 18 September 2026
and got nothing from any of them; the research session of 16 September could
not open a single paper, product page or leaderboard at source and said so in
its own last paragraph. The nights fetch from the world every night. That is
the library, and it already exists.*

**So "manually in Claude Code" means he starts it from there, not that it runs
there.** He asks; the run happens where the nights happen; the answer comes back
into his mind like anything else. How he starts it is a detail of the build,
not of this page.

## How the subject is chosen, when nobody asks

In this order, and **the ledger records which one chose**:

1. **His own open questions.** A capture where he hedged — *maybe*, *not sure*,
   *I wonder whether*, *should I* — is a question he asked himself. The subject
   with the most unresolved ones of his own is the subject, and **the question
   researched is his own sentence**.
2. **The noticing's tap.** Where an article ended by asking whether to look
   into something and he said yes.
3. **A visible rotation.** Every concrete subject gets a turn in order.

*Why three and not one: the first has no guess in it, which is the point — a
model asked "is this worth researching?" was wrong about half the time across
6,790 labelled situations. But the first can be empty, and he has said it is
never to decline. Rotation is the floor, is the dullest rule, and is the only
one that cannot be wrong about him.*

## What it must never do

- **Never research a named person.** Settled by him, and by the two-room design
  below it is a wall rather than a rule.
- **Never read his feelings pages.** Same.
- **Never send a name, a date or a place out of the house.** The brief that
  leaves for the world is in the third person and carries none. Every query is
  written to the ledger, and the count of queries containing one must be zero.
- **Never write a sentence about the world without a passage quoted from a page
  that says it, with its address and the day it was fetched.** The citation is
  the product. *Why: of the sentences these systems produce, between 3% and 18%
  are not supported by the source they name, and a third of one broadcaster's
  sample misattributed its sourcing outright.*
- **Never file a gloss whose source cannot be fetched at the moment of filing.**
  Links rot.
- **Never be longer than his own page plus its glosses.** *Why: the cost that is
  not on the bill is his attention.*
- **Never decline.** His instruction of 17 September, in those words. The
  rotation is what makes that possible without inventing a reason to write.
- **Never put anything of his in a build log** — not a capture, an id, a page,
  a subject, a word. The rule that already binds the clock, unchanged.
- **Never cost him anything he has not been told.** A pass is estimated at
  US$1.50 on Sonnet and US$3.70 on Opus at list price. **Nobody has measured a
  real one.** The first pass is timed and its tokens recorded, and he is told
  the figure in Australian dollars without having to ask.

## The two rooms

The study and the library, and neither has what the other has.

- **The study** reads his mind and writes the questions. It has no way out to
  the world.
- **The library** goes out and reads. It never sees his mind, his pages, or
  anything he wrote. It is handed questions in the third person and brings back
  passages.

*Why, and this is the load-bearing part: it makes "nothing of his leaves the
house" a fact about what the library can reach rather than a promise about what
it chooses to send, and it blinds the reader of the world to what he thinks,
which is the only way its answer can disagree with him.*

## What done looks like

- He can ask a question of his own at his computer and get back, in his mind, a
  page of his own writing with the world's answers glossed beside it, each gloss
  carrying a quoted passage, its address, the day it was fetched, and what kind
  of source it was.
- Once a week, without anyone asking, the same thing happens on a subject it
  chose, and the ledger says which of the three rules chose it.
- A week where he has asked himself nothing still produces a pass, from the
  rotation. **It never declines.**
- Every query that left the house is in the ledger, and none contains a name, a
  date or a place.
- The library cannot reach his mind, and the study cannot reach the world — by
  construction, watched, not by instruction.
- No gloss is filed whose source could not be fetched when it was filed.
- Every gloss ends with an expectation about his life, in his terms, that a
  later filing can score as met, missed, or untestable.
- Nothing in any log names a capture, an id, a page, a subject or a word of his.
- A run that found nothing, or could not reach the world, says so and goes red
  rather than filing a page that looks like the others.
- What a real pass cost is measured and written down, in Australian dollars.
- Every refusal above watched failing and then passing, in `docs/REFUSALS.md`.
- The whole suite is green, run where a browser exists.

## What is out

- **A pass over every page every week**, and a fleet of agents. One subject, one
  agent. *Why: breadth is what a fleet buys at fifteen times the tokens, and
  this design chose depth.*
- **A learned score of which subjects he likes.** Rotation is the floor and his
  hedges are the signal.
- **The commissioning** — the long piece on a large question he poses, designed
  on `claude/the-commissioning` and not built. Adjacent, larger, and not this.
- **The monthly measurements** the research lists. They are how this is judged
  over time, not part of shipping it.
