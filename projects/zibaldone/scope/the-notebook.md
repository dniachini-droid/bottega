# The notebook

## What it does

The first of three pieces of Zibaldone. The owner captures a thought, a remark,
how he is feeling, or a photo of something with text on it — from his phone, in
seconds, deciding nothing — and it is kept. He can scroll back through
everything he has ever put in. Only he can open it.

**No filing and no asking.** A model does not read his captures or write
anything yet. That is the second piece. This one builds the raw layer, which
the whole design rests on as the one record that can settle a later
disagreement about what he actually said, and it settles how the application
looks.

*Why the look is decided here rather than last: everything built afterwards is
built against it, and a look chosen at the end is a look bolted onto decisions
that were made without it.*

## What done looks like

- **He captures in seconds.** He opens it on his phone, types a thought or
  takes a photo, and it is in. **He is never asked where it goes, what it is
  about, or what to call it.** *Why: the strongest finding in the research
  behind this project is that friction at capture is what kills these systems —
  people abandon them because every capture demands a decision.*
- **A capture is finished the moment the raw copy is stored.** Nothing he does
  waits on a model, a network round trip, or reading text out of a photo.
  *Why: a model reading a capture takes between ten seconds and a minute, and
  an application that makes him wait that long before he can put the phone away
  is one he will stop opening. This also sets the shape the second piece needs:
  filing happens afterwards, on its own, and can fail without the capture being
  lost.*
- **Photos are read, afterwards.** The words are taken out of the image and
  kept with the capture. A photo with no words in it is kept and described as
  having none, rather than being refused. Photos arriving in the format iPhones
  use are converted on the way in. *Why converted: the format phones hand over
  is one many tools reject, and the failure would appear much later as a photo
  nothing can read.*
- **A capture whose photo has not been read yet is marked as such**, and he can
  see which ones. *Why: a silent failure here is invisible for weeks, and the
  material is gone by the time anybody notices.*
- **Everything he puts in is kept exactly as he gave it, and the code forbids
  editing it** — not the instructions, the code. *Why: this is the layer the
  whole design rests on, and "we told it not to" is not a guarantee.*
- **He can scroll back through everything**, newest first.
- **A lock.** Only he can open it. *Why: this holds his health, his feelings and
  his private thoughts, and a thing on the internet that a phone browser can
  open is public unless something keeps people out.*
- **He can get everything out as ordinary files**, captures and photos both.
  *Why: "kept forever" on one server means until the disk dies or the bill
  lapses. A way out is what makes the promise real.*
- **It is beautiful, and the look is Da Vinci's notebook** — cream paper, brown
  ink, margin notes, diagrams. **Not** Medici gilt and **not** Michelangelo's
  marble. *Why the notebook: a zibaldone is the commonplace book Leonardo's
  contemporaries kept, so the application is named after the thing it looks
  like.*
  - **Three prohibitions: no stock images of paintings, no fake paper texture,
    no decorative script.** *Why named rather than left to taste: the failure
    to guard against is not plainness, it is tackiness — a builder given only
    "Renaissance" reaches for parchment textures, gold gradients and a
    Vitruvian Man watermark. Restraint is what separates the notebook from a
    theme-park version of it.*
  - **One moment is meant to delight, and it is the capture screen: it is a
    page he writes on.**
  - **One serif with real italics, large enough to read on a phone in bed, and
    a night look.** *Why a night look: he will use this at night.*
  - **The owner judges it from screenshots at phone width, on the pull request,
    before it merges.** *Why: "it is beautiful" is the one line here that no
    reviewer can check by reading code.*
- **He never opens a terminal or a developer tool to use it.** He opens it on
  his phone.
- **It is his alone.** One person, no sharing, no accounts for anybody else.
- **A question answered with evidence, not a feature built: can he talk to it?**
  Speak, and have it transcribed, on a phone, in a browser. The build
  establishes whether this is possible, what it would cost and what it would
  need, and **writes the answer into `projects/zibaldone/` in the workshop, not
  only on the pull request.** *Why there: a pull request is read once; this has
  to be findable when the question comes up again.*

## What is out

- **Any filing.** No model reads captures, no wiki, no log, no pages, no index,
  no verdicts. That is the second piece.
- **Any asking.** No questions, no research. That is the third piece.
- **Voice as a working feature.** Answered, not built.
- **The deeper view on a computer.** Phone only.
- **Working without a signal.** It may assume it is online.
