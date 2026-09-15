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

**Three builds, in this order.** *Why cut rather than built whole: the whole
thing is far larger than anything this workshop has reviewed, and a review of
one large change catches much less than the same work reviewed in pieces. Each
piece is worth having on its own.*

1. **The notebook.** Capture, photos read, everything kept, a list to scroll
   back through, a lock, and the look. No filing yet.
2. **The filing.** The model reads each capture and maintains the wiki.
3. **The asking.** Research with real sources, written back in as pages.

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
