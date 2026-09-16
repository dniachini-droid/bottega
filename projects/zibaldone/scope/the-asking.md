# The asking

## What it does

The third of four pieces of Zibaldone. He asks his second mind a question and
gets back real research, written into the wiki as a page he keeps.

He can ask from either place. At Claude Code he types the question and the work
happens there and then. On his phone he writes the question into the notebook
the same way he writes anything else, marked so it is recognisable as a
question, and it is answered the next time the filing runs.

**The filing stops being something he runs and becomes something that runs.**
Several times a day, on a clock he sets, it wakes up and asks the notebook
whether anything is new. Usually nothing is, and it stops. When something is,
it files it — and answers any question among it.

*This replaces the line in the filing's scope that put automatic and scheduled
filing out. That decision of 15 September rested on three reasons. Two still
hold and are kept: it costs nothing, and one writer at one door means no queue
and nothing editing a page at the same time as something else. The third was
that a batch sees a week at once and can tell that three captures over five days
are about the same thing. **That reason no longer applies, and not because of
anything here.** The filing's first review found a race between two captures
about the same subject, and the fix decides captures one at a time, oldest
first, each written before the next is decided — so what a run sees is the same
whether it holds two captures or two hundred. What changed the decision is that
a question can now be waiting: on a nightly run an answer is up to a day away,
and on a run every four hours it is a few hours away.*

*What the reviewer was right to ask about, and the answer: the filing's success
measure counts "amended" and "nothing" against "new page", and short batches
would break it if batch size changed the verdicts. It does not, for the reason
above. If that measure does start drifting once this is running, the first
suspect is the clock and the test is to file a week by hand and compare.*

## What done looks like

- **A question is a capture like any other.** It goes into the raw layer
  untouched and gets a log entry like everything else. *Why: otherwise there
  are two ways into his mind and two things that can go wrong, and the raw
  layer stops being the record of what he actually did.*
- **It is marked deliberately, not guessed at.** A line beginning with a word
  he chooses. *Why not a question mark: he writes thoughts that end in question
  marks and does not want them researched. The cost of guessing wrong is a
  research job he did not ask for, on his allowance.*
- **One path out, whichever door he asked through.** An answer is a page in the
  wiki, and the wiki reaches the app. Asked at Claude Code he sees it
  immediately and it reaches the app at the next run; asked on the phone he
  sees it in the app when the run finishes. *Why one path: two ways of storing
  an answer means two places to look for it in six months.*
- **An answer is its own page, linked from the subject it concerns, not merged
  into it.** *Why, and this is the one place the filing's merge rules do not
  apply: his own words and material a model went and found are different kinds
  of thing. Mixed on one page, he cannot tell later what he thought from what
  was fetched for him — which is the failure this whole system exists to
  prevent.*
- **Every answer names what it was built from**: which of his captures, and
  which outside sources. *Why: an answer with no provenance becomes indistinct
  from memory, and then it is worse than not having it.*
- **The app can be read, not only written to.** A second view, separate and
  clearly marked, showing the wiki. *Why separate: the notebook is what he put
  in and must stay trustworthy as that.* What that view looks like is settled in
  the noticing's scope, because the articles it writes are most of what the view
  is for — including what it shows when this piece ships first and there are no
  articles yet.
- **The wiki is pushed to the app by the run.** The app never reaches out for
  it. *Why: the app then holds no key to his private repository, and a running
  program that can read a repository is a program that can leak one.*
- **The app never asks a model itself.** *Why, and this is his decision of 16
  September 2026: every other part of this costs nothing beyond hosting and the
  Claude allowance he already pays for. A model called from the app is billed
  per question and is the only thing in the design that would put a separate
  bill on him.*
- **An empty check is cheap, and how cheap is to be measured rather than
  assumed.** It asks how many captures are unfiled and stops on zero. *Why it is
  expected to be affordable at six times a day: filing four times a day is the
  same work as filing once, split up — same captures, same thinking — so
  responsiveness costs almost nothing beyond the price of waking a session. What
  that price actually is has not been measured here. It is not this workshop's
  10,000-token startup budget: that number covers this repository's instruction
  files and explicitly excludes the prompt, and a run of his notebook also pays
  for the model's own setup, the fetch and the thinking. Measure one empty check
  before settling the number of checks a day.*
- **The run is a Routine.** Settled on 16 September 2026; the record is in
  `docs/OPEN.md`. Anthropic's own page says routines draw down subscription usage
  the same way interactive sessions do. *Why a Routine rather than a GitHub
  Action, which is the obvious way and the way this workshop runs its own
  checks: a Routine is the feature built for this and is stated to draw on the
  subscription, where nothing states that of a workflow calling Claude. An
  earlier version of this page gave a stronger reason — that the Agent SDK and
  `claude -p` had been moved to a separate credit in mid-2026 — and **that is
  wrong**: the change was announced for 15 June 2026 and paused before it took
  effect, and subscription usage still covers them. The decision stands; the
  reason it stood on did not.*
- **Routines are in research preview**, and Anthropic says their behaviour,
  limits and interface may change. *Why on the page: the whole of this design
  being free rests on one preview feature.*
- **The daily cap is five runs on Pro and fifteen on Max, shared by everything
  on the account**, and he can see what he has left on his own routines page.
  *Why this replaces "measure it", which an earlier version of this page said:
  the number is published, and telling a builder to go and measure something he
  can read off a screen is how a working figure survives unchecked. Why it is
  load-bearing: past the cap, runs are simply rejected — and on an account with
  usage credits turned on they run as metered overage, which is a bill. This is
  the one place where "it costs nothing" could quietly stop being true.*
- **The filing check and the noticing's daily trend check are one run, not
  two.** *Why: they share the cap, and on five a day two schedules cannot both
  fit. It is also what he said in the first place — that the trend check is the
  same work as collating — and splitting them was a decision of this page's, not
  his.*
- **He is on Max, so the cap is fifteen a day and is not the constraint.**
  Settled 16 September 2026, in his words: *"But doesn't have to be 6 per day.
  It can just be 2 per day if that makes it easier."*
- **Start at three a day, the last of them carrying the trend check, and raise
  it on evidence.** *Why start low when there is room for five times that: what
  an empty check actually costs has still never been measured, and the number is
  trivial to raise once it has been. Why three and not his two: two checks
  twelve hours apart make the phone's asking feel like the overnight batch it
  was supposed to improve on, and the third is what buys the "ask in the morning,
  answered by evening" he was shown. Why not six: nothing yet says the extra
  three buy anything he would notice.*
- **Running it by hand does not touch the cap.** Typing "file what's new" at
  Claude Code is an ordinary session, not a Routine. *Why worth saying: it means
  he can always get an answer now, whatever the clock is set to and whatever the
  cap has left.*
- **Two runs never overlap, and a run never collides with him.** *Why this is
  named rather than assumed: the filing was designed around one writer at one
  door, which was true while he ran it by hand. A clock plus a man at a
  keyboard is two writers, and the filing pushes to a repository — the failure
  is silent and the loser is whichever finished first.*
- **A run that fails says so where he will see it**, in the app, not only in a
  log — and **the app notices a run that never arrives.** The run tells the app
  when it starts and when it finishes; the app knows the hours it should hear
  from, and says plainly when it has not. *Why the second half and not just the
  first: the run pushes to the app, the app never reaches out to the run, so a
  run that dies before pushing — or never starts, which is the commonest failure
  of anything on a clock — has no road to tell him. Only the app noticing the
  silence covers that, and it is the case the rule was written for.*
- **How we will know it is right**: with the clock set to run several times a
  day, he asks something from his phone on a Tuesday morning and finds a
  researched page in the app that evening, citing his own captures and saying
  where the rest came from. *Said with the setting attached because it is not
  true of every setting: on a once-a-night clock the same test is "by the next
  morning", and the page should not appear to promise something the hours he
  chose cannot deliver.* And a week of runs where he asked nothing costs him
  nothing he can feel.

## What is out

- **The app calling a model.** Above, with its reason.
- **Talking to it.** He asked for voice to be looked at, not built.
- **Instant answers.** His words, 15 September 2026: he does not want instant.
- **Deciding for him how often it runs.** He sets the hours.
- **Replacing the hand-run.** The clock is added; typing "file what's new"
  still works. *Why: it is the way to make it run now, and it is what he will
  use the first time the clock does not.*
