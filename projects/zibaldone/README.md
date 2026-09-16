# Zibaldone — what the workshop knows about it

Zibaldone is a second mind. The owner captures a thought, a remark, how he is
feeling, or a photo of something with text on it — from his phone, in seconds,
deciding nothing. A model reads it, works out what it is about, and files it.
Later he asks it a question, and it researches a real answer using everything he
has ever given it plus the internet, and writes that answer back in as a new
page. Asking it something makes it bigger.

*This replaced an earlier description — "capture, card, search, related", and no
external facts — on 15 September 2026, after the owner described at length what
he actually wanted. The old line survived into a scope page before anybody
noticed it no longer matched.*

## The shape it is being built in

Three layers, after the pattern Andrej Karpathy published on 4 April 2026:
**raw**, kept forever and never edited; **the wiki**, written by the model; and
**a rules file** in plain language that the model reads before it writes
anything. *Why that pattern: it is a real published shape that matches this
application almost exactly, and its author deliberately left the folder
structure open, so the structure below was decided here.*

Inside the wiki, one division and no subject folders: **a log** of dated things
that were true of a moment and are never rewritten, and **pages** about
subjects, rewritten freely. *Why that line and no other: it is not a filing
convenience, it is a difference in what the model is allowed to do. Put both
kinds in one place and a single bad judgement silently overwrites how he felt on
a Tuesday, and nothing can recover it. Why no `health/` or `work/`: one doctor's
note is personal and health and work and insurance at once, and a tree forces a
wrong choice.*

**Four builds, in this order.** *Why cut rather than built whole: the whole
thing is far larger than anything this workshop has reviewed, and a review of
one large change catches much less than the same work reviewed in pieces. Each
piece is worth having on its own.*

1. **The notebook.** Capture, photos read, everything kept, a list to scroll
   back through, a lock, and the look. No filing yet.
2. **The filing.** The model reads each capture and maintains the wiki.
3. **The asking.** Research with real sources, written back in as pages. Two
   doors — Claude Code, and a marked line written into the notebook from his
   phone — and one path out. The filing goes on a clock here.
4. **The noticing.** The mind reads itself and writes about what it sees, and
   learns from what he says back. *Added 16 September 2026.*

**The noticing before the asking**, settled 16 September 2026 — after the
filing's first real run, and reversing an order set earlier the same day. His
words: *"can we do the noticing and reading view in the app for the noticing?
Please. And we do the asking after - which is less important."* *Why he changed
it: he had just watched the filing work on his own thoughts and read the result
as files on GitHub. What he wanted next was to see it properly and to be told
something he had not noticed himself — not a way to ask it questions. The
earlier order was reasoned from the ledger dependency, which turns out not to
force anything: the ledger is the filing's to build and can be built with either
piece.*

**And the clock comes first, before either.** Once a day to begin with, his
decision of the same day, replacing the five a day settled an hour earlier — he
has seen how long a run takes and what it costs him in approvals. *Why it is
first: it is the smallest of the three, it is what makes the mind keep itself up
to date without him, and it is gated by a blocker neither of the other pieces
can start without — see `docs/OPEN.md`.*

**And each of the two is cut into two or three changes, not sent whole.**
Settled the same day, on the evidence of the piece before them. *Why: the
filing went in as one change of 2,461 lines across 18 files and took five
rounds of review to get clean. Three of the four serious faults were in one
feature — taking something out — which should have been a small change of its
own. The rounds were not waste: each found something worse than the last, and
the fourth round's fault was caused by the second round's fix. But the total
work would have been smaller if the pieces had been. This workshop's own rule
already says a small change under review catches about three times more defects
than a large one; this is that rule meeting a real number.*

## Two doors, and two ways of filing — decided 15 September 2026

**Partly overturned the next day. Read the corrections at the end of this
section before building from it.**

**The wiki is markdown files in a repository.** *Why that and not a database:
it is what the pattern this is built on actually is, it makes "he can get
everything out as files" true rather than a feature to build, and — the reason
the owner chose it — it means Claude Code can read and write the wiki directly.*

**So there are two doors to the deep research, and he wants both.**

- **From his phone.** Wherever he is. *This was to cost money per question,
  because the application would reach a model on his behalf. Overturned 16
  September 2026 — see below.*
- **From Claude Code, at his computer, on the repository.** Him asking, himself,
  in a tool he already pays for. No separate bill for the expensive part.

*Where the line is: a person driving a session is ordinary use of a
subscription. An application routing its automated work through that
subscription to avoid a bill is not, and is not to be built.* **The test this
line used to give — "is a human asking" — was overturned on 16 September 2026
and no longer decides it. See the corrections at the end of this section.**

**Filing works both ways too, and he wants both.**

- **Instant, on capture, from the phone.** Costs money per capture.
- **In a batch, when he next sits down at Claude Code.** Free, and captures wait
  until then.

*Why both rather than one: instant filing is what makes the wiki feel alive, and
batch filing is what makes it affordable to use twenty times a day. Neither on
its own is the thing he asked for.*

### What he decided instead, on 16 September 2026

*The two lines above about money are no longer what is being built. Both were
overturned by him the following day, and the scope pages for the asking and the
noticing carry the replacements.*

- **The application never calls a model itself.** Not for filing, not for
  asking. That removes the only per-use bill in the design. What is left is
  hosting, about US$6 a month, and the Claude allowance he already pays for.
- **Instant filing on capture is not being built.** His words on 15 September,
  which the line above did not record: he does not want instant. Filing happens
  in batches, and from 16 September on a clock he sets rather than only when he
  sits down.
- **Both doors for asking remain, and both are free to him.** The phone door is
  a marked line written into the notebook like any other capture, answered by
  the next run. It stays a clearly separate option in the app — not because it
  costs money, but so he always knows which he is using and when the answer will
  come.
- **The boundary above has been settled for a run on a clock, and the test it
  gave is overturned.** Anthropic ships Routines for scheduled unattended Claude
  Code work and states that they draw on subscription usage the same way an
  interactive session does — so a run on a clock is ordinary use whether or not
  anybody asked for the particular thing it produces. What governs instead is a
  published cap: **five runs a day on Pro, fifteen on Max, shared across the
  whole account.** Past it runs are rejected, or billed as metered overage on an
  account with usage credits turned on. So "it costs nothing" now depends on
  staying under a number, and the scope pages for the asking and the noticing
  carry it. Routines are in research preview and their limits may change.
- **One thing that was written here and is wrong**, recorded because it was used
  as a reason: that the Agent SDK, `claude -p` and GitHub Actions had been moved
  off subscription usage onto a separate credit in mid-2026. That change was
  announced for 15 June 2026 and **paused before it took effect**; those still
  draw on the subscription. It had been the whole argument for one design
  decision, which survives on a weaker reason.

**Two things he was told and accepted when he decided this.** His raw captures —
health, feelings, private thoughts — would live in a private repository on
somebody else's servers. And a repository handles text well and photographs
badly at any volume, so the photographs may have to live elsewhere with the text
pointing at them.

**The look is decided in piece one, not last.** Da Vinci's notebook — cream
paper, brown ink, margin notes, diagrams. Not Medici gilt, not Michelangelo's
marble. *Why the notebook: a zibaldone is the commonplace book Leonardo's
contemporaries kept, so the application is named after the thing it looks
like.* **The owner judges it from screenshots before anything merges**, because
it is the one thing in "done" that no reviewer can check by reading code.

**Its code is at https://github.com/dniachini-droid/zibaldone and nowhere
else.**

## What belongs in this folder

- `scope/` — one page per piece of work: what it does, what done looks like,
  what is out. Written at stage 2 of a build, and the page Da Vinci checks
  the finished work against.
- `voice.md` — the answer to "can he talk to it?", with what was and was not
  checked. Written by the notebook build, 15 September 2026.
- Findings worth keeping — what a review caught, what turned out to be wrong
  about an assumption, what the owner said he actually wanted.
- Lessons — the things a later session would have to learn the hard way again
  if they were not written here.

## What never belongs in this folder

**The application's source code. Not a file of it, not a copy of it, not a
snapshot "for reference".**

*Why: the owner has two earlier repositories where a system and an application
grew up in the same place. One needed 85,000 lines taken out across two merges
to get them apart again. A copy kept here would be out of date within a day
and would still be read as if it were true.*

Nothing in this folder is ever copied into the project's repository either.
The workshop knows about the project; the project does not carry the workshop.

*Why: the whole point of a workbench is that the framework is improved once,
here, and every project already has the improvement. Copying files into a
project puts that project back on a version that ages the moment it lands.*
