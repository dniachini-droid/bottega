# Second mind, version one

## What it does

The owner captures a thought, a remark, how he is feeling, or a photo of
something with text on it — from his phone, in seconds, deciding nothing. A
model reads it, works out what it is about, and files it. Later he asks it a
question, and it researches a real answer using everything he has ever given
it plus the internet, and writes that answer back in as a new page.

It is a second mind. Asking it something makes it bigger.

Three layers, after the pattern Andrej Karpathy published on 4 April 2026:
**raw**, kept forever and never edited; **the wiki**, written by the model;
and **a rules file** in plain language that the model reads before it writes
anything. *Why that pattern: it is a real published shape that matches this
application almost exactly, and its author deliberately left the folder
structure open, so the structure below is a decision made here and not one
inherited.*

## What done looks like

- **Capture, on a phone, in seconds.** He opens it, types a thought or takes a
  photo, and it is in. **He is never asked where it goes, what it is about, or
  what to call it.** *Why: the strongest finding in the research behind this is
  that friction at capture is what kills these systems — people abandon them
  because every capture demands a decision. He makes none.*
- **Photos are read.** The words come out of the image and are held with the
  capture, so a photograph of a document is material the wiki can think with
  rather than a picture it cannot see into.
- **Everything he puts in is kept exactly as he gave it, forever, and is never
  edited.** *Why: it is the only record that can settle a later disagreement
  about what he actually said, and storage is cheap.*
- **The wiki has two halves and no subject folders at all.**
  - **A log** — dated entries for things that were true of a moment: how he
    felt, a remark someone made, something that happened. **Never rewritten.**
  - **Pages** — one per subject: a person, his CV, a view he holds, a decision
    he keeps circling. **Rewritten freely as he learns more.**
  - **An index**, one line per page.
  *Why that line and no other: it is not a filing convenience, it is a
  difference in what the model is allowed to do. "Never rewrite the log" can be
  checked mechanically. Put both kinds in one place and a single bad judgement
  silently overwrites how he felt on a Tuesday, and nothing can recover it,
  because the only record was the thing that was overwritten. Why no `health/`
  or `work/` folders: one doctor's note is personal and health and work and
  insurance at once, and a tree forces a wrong choice. The model finds pages by
  reading the index and searching the text.*
- **Every capture gets exactly one of four verdicts, and which one is
  recorded:** a new page, an amendment to an existing page, a correction to a
  page it contradicts, or **nothing at all, because the wiki already says
  this.** *Why the fourth: it is the one that stops the wiki bloating, and
  models like producing output. It has to be an allowed and unembarrassing
  answer.*
- **Before writing, it looks for the subject three ways:** an exact page name,
  then a search for near-matches under other names, then it reads the closest
  two or three pages properly. *Why: the failure this prevents is documented —
  searching for a topic you know you covered and finding three files with
  different partial takes, none of them complete.*
- **It merges into an existing page** when the new material duplicates it,
  overlaps it heavily, is too thin to stand alone, or only makes sense in its
  context; otherwise it makes a new page. *Why those four: they are Wikipedia's
  own tests and they have survived twenty years of people arguing over them.*
- **When a page gets fat it splits**, moving a section to its own page and
  leaving a short summary and a link behind. *Why: without it, convergence
  quietly becomes three enormous unreadable pages.*
- **Every page names the raw captures it came from**, so any claim can be
  traced back to what he actually said.
- **Asking is research, not lookup.** He asks a question; it uses the wiki as
  its starting material, goes out to the internet, and returns a real answer
  with its sources. One round deep, not a long investigation — depth comes
  later.
- **The answer is written back into the wiki as a page**, showing what it drew
  on. *Why: this is what makes it a second mind rather than a search box. Asking
  it something makes it bigger.*
- **It counts its own verdicts and he can see the count.** *Why, and this is the
  measurement the whole design turns on: if "nothing at all" and "amended an
  existing page" together are not the clear majority of captures after a few
  weeks, it is accumulating rather than converging, whatever the folders say.
  Nobody who has built one of these has measured this. It is built in from day
  one.*
- **It is beautiful.** Renaissance, the Italian masters — the Medici, Vitruvian
  Man, da Vinci's notebooks. On a phone. *Why this is in "done" and not a polish
  pass: the owner asked for real time spent on it, and "it works but it is
  plain" is a failure here rather than a partial success.*
- **He never opens a terminal or a developer tool to use it.** He opens it on
  his phone. Whatever it needs to reach a model is the application's problem.
- **It is his alone.** One person, no sharing, no accounts for anybody else.
- **A question answered with evidence, not a feature built: can he talk to it?**
  Speak, and have it transcribed, on a phone, in a browser. The build
  establishes whether this is possible, what it would cost and what it would
  need, and reports that. **It is not built in this version.**

## What is out

- **Voice as a working feature.** Answered, not built.
- **The deeper view on a computer.** Later, and not now. Phone only.
- **Working without a signal.** It may assume it is online.
- **Subject folders of any kind.** If `pages` ever feels like it wants
  subdividing, that is the moment to resist rather than the moment to add a
  third folder.
- **Deep multi-round research.** One round, real sources. Depth is version two.
- **Anything for a second person.**

## What the owner should be told plainly

This is much larger than anything this workshop has reviewed. Every change so
far has been a few files. A review of one large change catches roughly a third
of what the same work catches under review in small pieces. If the build can
reach the owner in more than one reviewable piece, it should; if it cannot, the
review's weaker grip on it is a cost he is paying and he should know that rather
than find out later.
