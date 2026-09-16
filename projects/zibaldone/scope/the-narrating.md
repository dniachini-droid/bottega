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

## What has to be found out, with measurements and not guesses

Three things gate the design, and a wrong guess at any of them builds the wrong
thing:

1. **Will Whisper run in Safari on his iPhone, and how fast?** The model can run
   in a web page through WebAssembly, and his phone's processor is far better
   than the small machine the app runs on. Unknown: whether iPhone Safari gives a
   page enough memory to hold the model, and what a minute of speech costs in
   seconds.
2. **What does iPhone Safari hand back when a page records audio?** The format
   is not the same as other browsers and the answer decides what is stored.
3. **Which size of the model is good enough for him?** The small ones are fast
   and rough; the larger ones are slow and accurate. The test is his speech, not
   a benchmark — Australian, and with Italian names in it.

*Why these are answered by measurement rather than by reading: every one of them
is a number on his phone, and a number taken from documentation is a claim about
somebody else's device.*

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

## If the phone cannot do it

Say so with the numbers, and do not quietly build the expensive version instead.
The fallbacks, in order, are: the same model run on the app's own machine, which
is one shared processor with a gigabyte of memory and sleeps when unused, so the
honest report is how many minutes a two-minute narration takes; or keeping the
recording only, and reading it during a run he starts himself.

**Keeping the recording and no transcript at all is a real outcome and not a
failure.** *Why written down: it is most of the value, and a session that treats
it as defeat will reach for the paid service to avoid reporting it.*

## What is out

- **The paid API.** Settled above.
- **Live words as he speaks.** That is what his keyboard already does.
- **Any change to the filing, the noticing or the asking.** What he narrates
  becomes an ordinary capture and everything downstream is untouched.
- **Voice anywhere but capture.** He is not reading the app by ear.
