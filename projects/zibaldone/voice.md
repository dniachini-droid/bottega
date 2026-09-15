# Can he talk to it?

*The question the notebook's scope asked to have answered with evidence, not
built. Answered on 15 September 2026 by the session that built the notebook
(pull request #1 in the project). Nothing here was tried on an iPhone: there
was none in the room. What was checked, and what was not, is said below.*

**Short answer: yes, today, and it costs nothing — through the microphone key
on the phone's keyboard.** The notebook's writing area is an ordinary text
field, and the iPhone's keyboard puts a dictation key beside the space bar
for every text field, in any app, Safari included. He taps the page, taps the
key, speaks, and the words appear where he would have typed them. Nothing to
build, no permission dialog from the web page, no bill. Apple does the
listening on the phone itself for Italian and English on recent phones, so it
works without a good signal and sends nothing to us until he taps *Keep*.

**The one thing to check, on his phone, in ten seconds:** open the notebook,
tap the page, tap the microphone key on the keyboard, say a sentence, tap
*Keep*. If the words land, this question is closed. *What was checked here:
that the writing area is a plain text field, which is what the dictation key
attaches to. What was not: the phone itself.*

## The three ways, and what each would take

**1. The keyboard's dictation key.** Above. Cost: nothing. Build: nothing.
Limits: he has to tap the key each time, it stops after a pause, and what is
kept is the words, not his voice. *Recommended, because it already works.*

**2. Asking the browser to listen, from the page.** Safari on iPhone has had a
built-in "speech recognition" for web pages since early 2021. The page could
show its own microphone and fill the writing area as he speaks. It sends the
audio to Apple's servers; free; no key or account. But it has a poor record:
it asks for microphone permission, results arrive in bursts and stop at
silences, and for a long stretch it did not work at all once the notebook was
added to the home screen as its own icon, which is exactly how he will open
it. Whether that is fixed on his phone's version could not be checked here.
Cost: nothing. Build: half a day. *Not recommended: it does what the keyboard
key already does, less reliably.*

**3. Recording his voice and keeping it.** The page records (Safari can, since
late 2020), the recording goes in as a capture exactly as a photo does — kept
byte for byte, never edited — and the words are written out afterwards as a
separate file beside it, the way the words in a photo are. This is the only
way that keeps *his voice*, and it fits the shape the notebook already has:
the capture is finished when the recording is stored, and the writing-out can
be slow or fail without losing anything.

What it needs: someone to write the words out. Two choices.
- **An outside service.** The model he already pays for cannot listen to
  audio, so this is a new, third bill. The usual one charges about half a
  cent a minute: an hour of notes a month would be about 40 cents, a hundred
  minutes about 60. It needs a second account and key.
- **On our own server.** Free, and nothing leaves the server, but the small
  machine the notebook is sized for would take about as long as the recording
  lasts to write it out, or longer. Fine for one-minute notes; a bigger
  machine costs a few dollars more a month.

Build: a day or two — a record button on the page, a new kind of capture, the
writing-out step in the same queue that reads photos. *Worth doing only if he
wants the recordings themselves kept. If he only wants the words, way 1 gives
him that now.*

## Why the answer is written here

A pull request is read once. The next time somebody asks "could it just
listen?", this is where the answer is, with the date and what was and was not
checked.
