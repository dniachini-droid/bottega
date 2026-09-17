# The narrating

## What it does

He speaks into the notebook instead of typing, and what he said is kept — both
the recording and the words read out of it.

*Why he wants it, in his words on 16 September 2026: "having an app I can just
narrate to would be ideal. Because then I would use it a lot more."* That is the
whole case. A second mind is worth what goes into it, and the thing standing
between him and putting more in is the keyboard.

## What is actually broken today

He already dictates, using his phone's keyboard. **It keeps no recording.** When
it mishears him the words are simply wrong, and there is nothing to go back to.

**So the recording is the feature, not the transcript.** Keep the audio and a bad
transcript is recoverable: he can listen, or have it read again later by
something better. *Why that ordering matters: a transcript good enough to trust
is a hard problem and the recording is an easy one, and the easy one already
fixes his complaint. Building the transcript first and the recording never is how
this ends up no better than the keyboard.*

## The shape it takes, which the app already has

**This is what photos do.** A photo is kept the moment he takes it, sits as *not
yet read*, and afterwards `server/reading.js` reads the words out of it with
tesseract — an ordinary program, no model, no cost, nothing leaving the machine.

Voice is the same shape: kept at once, marked not yet heard, read afterwards.
*Why to follow it rather than invent something: the pattern is built, tested and
understood here, and it already answers the hard questions — where the file
lives, what the page says while it waits, what happens when the reading fails.*

## The owner's decision, 16 September 2026, which does not move

**Free, and never a paid service.** He asked directly whether Whisper is free,
and the answer is that two things share the name: the hosted API, which charges
per minute, and the model itself, released open under the MIT licence, which
anybody may download and run. **This piece uses the model, run on hardware he
already owns, and never the API.**

This is the same refusal he made about the margin answering, and it is the same
reason. **The app has never made an outbound call.** Nothing here may be the
first.

## What had to be found out, and what building it answered

Three things gated the design. They were settled by building rather than by
measuring first, which is not how this page originally said they would be
settled. What follows is what is now known, and what is still not.

1. **Will the speech model run in Safari on his iPhone, and how fast?**
   **Not answered, because the design stopped needing it.** The model does not
   run in the page at all. The phone records and uploads; the app's own machine
   reads the words afterwards, the way a photograph is read. Thirteen minutes of
   sound was heard in 111 seconds on that machine, with the front page
   answering throughout.
2. **What does iPhone Safari hand back when a page records audio?**
   **Handled rather than measured.** Whatever the browser gives is stored as it
   arrives and converted on the machine. **No part of this has been tried on an
   iPhone or in Safari.** Every measurement in this piece is Chromium at phone
   width. That is a real gap and is written down as one.
3. **Which size of model is good enough for him?** **`tiny.en`**, with its
   limits found by measurement rather than assumed: it takes thirty seconds of
   sound at a time, and long recordings are cut at a pause rather than at a
   clock tick. A quiet start of eleven seconds or more could lose everything
   after the first sentence, which was found in review on 17 September 2026 and
   is fixed rather than tolerated.

*Why this section now reads as answers rather than questions: the original
wording said these would be measured before the design was settled, and the
work went ahead and settled them. A page that still asks them sends the next
session to re-derive what is already known.*

## What done looks like

- **He can hold a button, speak, and let go, and the thought is kept**, on his
  phone, in the app he already has.
- **Capture is not slower.** The recording is saved the moment he stops. Nothing
  is transcribed while he waits. *Why: this limit has held through every piece
  built here, and speaking is the one path where a delay would be most tempting
  to allow.*
- **The audio is kept after the words are read**, not thrown away. See above: it
  is the recoverable thing.
- **The page says honestly what state it is in** — kept, not yet heard, heard —
  exactly as it does for a photo that has not been read.
- **A failure loses nothing.** If the words cannot be read, the recording is
  still there and still filed, the way a photo with no words in it is described
  rather than refused.
- **Nothing leaves the phone or the machine.** No address, no key, no account.

## What was decided when the phone could not do it

It could not, and this is what was done — recorded because the page previously
offered these as live options and they are no longer open.

The model does not run on the phone. It runs on the app's own machine: one
shared processor with a gigabyte of memory that sleeps when unused. The honest
number is above — thirteen minutes of sound heard in 111 seconds, with nothing
transcribed while he waits.

**The recording itself is the thing kept, and the transcript is the
improvement.** *Why it stays written down: it is most of the value, and a
session that treats a poor transcript as defeat will reach for the paid service
to avoid reporting it. He refused the paid service in his own words and that
refusal is recorded above.*

## Held back deliberately, and why it is held rather than dropped

**Correcting a transcript by hand, after it is read.** He raised it himself on
16 September 2026 and set the order: *"let's leave that for later if the direct
transcribe doesn't work well."*

*Why that order is right: an edit box is the answer to a transcript that is
wrong often enough to be worth fixing by hand, and nobody knows yet whether this
one is. Built first, it becomes the thing he uses, and the transcript never gets
better because the editing hides how bad it is. Built second, it is a small
addition to something already working, or it is not needed at all.*

**The condition for building it is a number, not a feeling**: how often he has to
correct what came back. That number does not exist until he has narrated into it
for a while.

*And one thing it must not become when it is built: an edit that rewrites the
log. The log is his words as given, written once. A correction is a second layer
over the first, the way a subject page is a reading of a capture rather than a
replacement for it — otherwise the recording and the transcript disagree and
there is no way to tell which was him.*

## What is out

- **The paid API.** Settled above.
- **Live words as he speaks.** That is what his keyboard already does.
- **Any change to the filing, the noticing or the asking.** What he narrates
  becomes an ordinary capture and everything downstream is untouched.
- **Voice anywhere but capture.** He is not reading the app by ear.
