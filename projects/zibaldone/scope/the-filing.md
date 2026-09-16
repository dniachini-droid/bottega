# The filing

## What it does

The second of four pieces of Zibaldone. The owner sits down at Claude Code
and says "file what's new". It fetches the captures his phone has taken since
last time, reads them, and builds his second mind: a log of what happened and
pages about the subjects he keeps returning to.

**It runs when he runs it.** No schedule, no background work, nothing on the
phone. *Why, and this is his decision of 15 September 2026 rather than a
compromise: filing from the phone costs money on every capture, and filing in
a batch at his computer costs nothing under what he already pays. It is also
better — a batch sees a week at once and can tell that three captures over
five days are about the same thing, which one capture alone cannot. And it
removes a whole class of problem: one writer, one door, no queue, no two
things editing the same page at once.*

## What done looks like

- **He runs one thing at his computer and his mind is up to date.** It fetches
  what is new, files it, and stops.
- **His mind is its own repository**, private, separate from the program.
  *Why: the program can then be rebuilt without touching his thoughts, and his
  thoughts can move somewhere else without the program. They are not the same
  kind of thing and should not share a fate.*
- **Two layers, after the pattern Karpathy published on 4 April 2026.** The raw
  captures, already built and never edited. And the wiki, written by the model:
  - **A log** — one dated entry per capture. What happened, how he felt, what
    someone said. **Never rewritten.**
  - **Pages** — one per subject. Rewritten freely as he learns more.
  - **An index**, generated from the pages every time rather than stored.
    *Why generated: an index the model writes drifts the first time a page is
    renamed or a write half-fails, and then it cannot find pages that exist.*
- **A capture can touch several subjects, and each gets its own verdict.**
  *Why: "Dinner with Marco — he is moving to Milan, and I have decided to take
  the job" is Marco's page and the job decision at least. A design that allowed
  one verdict per capture would be wrong the moment he says two things in one
  breath, which is most of the time.*
- **The log entry always happens**, with no judgement. Then, for each subject
  the capture touches, one of four: a new page, an addition to an existing
  page, a correction to a page it contradicts, or **nothing, because the wiki
  already says this.** *Why the fourth matters: it is what stops the mind
  bloating, and models like producing output. It has to be an ordinary answer.*
- **Deciding and writing are two separate calls.** The first works out which
  subjects are touched and what should happen to each; only where it says write
  does a second call write. *Why: a study of models judging whether code met
  its requirements found that asking a model to explain and fix in one breath
  made it significantly likelier to declare correct things faulty. The writing
  task biases the verdict towards finding something to write.*
- **Before writing, it looks for the subject three ways:** an exact page name,
  then a search for near names, then it reads the closest pages properly.
  *Why: the documented failure is searching for a topic you know you covered
  and finding three files with different partial takes, none complete.*
- **It merges into an existing page** when the new material duplicates it,
  overlaps heavily, is too thin to stand alone, or only makes sense in its
  context; otherwise a new page. *Why those four: they are Wikipedia's own
  tests, survived twenty years of argument.*
- **Every page names the captures it came from**, so any claim traces back to
  what he actually said.
- **Every capture carries a mark saying whether it has been filed**, so nothing
  is filed twice and nothing is missed.
- **It counts its verdicts and shows him, by week.** *Why by week and not in
  total: an all-time number is drowned by the first weeks, when nearly
  everything is new because the wiki is empty. Why at all, and this is the
  measurement the whole design turns on: if "nothing" and "amended" together do
  not outnumber "new page" after a fortnight, it is accumulating rather than
  converging, whatever the folders say. Nobody who has built one of these has
  measured it.*
- **The photographs stay on the server.** The repository gets the words read
  out of them and a pointer back. *Why: a repository keeps every version of
  everything forever, so a photograph put in one is permanent, and taking it
  out later breaks every copy anybody holds.*
- **Removal is possible and deliberate.** The ordinary rule is that nothing is
  edited or removed. But he can decide to remove something, and there is a
  written way to do it that actually removes it rather than hiding it. *Why it
  is in scope at all: this holds his health, his feelings and his private
  thoughts, and a system he cannot take something out of is one he will
  eventually be afraid to put something into. Why it is deliberate and rare:
  really removing something from a repository means rewriting its history,
  which breaks every copy — fine occasionally, impossible as routine.*
- **How we will know it is right**, in his words: after a fortnight of his real
  captures, he opens the wiki and finds fewer pages than captures, because
  things merged. He picks a subject he has mentioned several times and finds
  one page, not three. And the count shows "amended" and "nothing" together
  outnumbering "new page".

## Two lines on this page his later decisions overturned

*Added 16 September 2026, the same day, after he decided the asking. This page
is otherwise unchanged: it is what the second piece was built against and it
stays as it was. But whoever builds next reads this page, not another one, so
what is no longer true is said here.*

- **"It runs when he runs it. No schedule, no background work"**, and **"Any
  automatic or scheduled filing"** under what is out. Overturned. The filing
  goes on a clock he sets, several times a day, so that a question waiting in
  the notebook is answered in hours rather than at his convenience. The asking's
  scope carries it.
- **"the phone one as its own clearly separate option so he always knows which
  he is using and which costs money."** Half overturned. The phone way of asking
  is still its own clearly separate option. But it costs nothing: it is a marked
  line written into the notebook like any other capture, answered by the run.
  The app never calls a model itself, so there is no per-question bill to warn
  him about.

## What later pieces need from the filing

*Added 16 September 2026, for the same reason as the section above: this is the
page whoever builds the filing reads.*

- **The ledger.** The noticing's scope has the filing maintaining a small
  running record of what each capture touched — the subject, the date, and
  whether it added to, corrected or duplicated what was already there — updated
  on every run. It is what lets the noticing read a day against a summary rather
  than the whole mind, so its cost does not grow. It can be built later and
  filled in from the log in one pass, but it is the filing's to build, not the
  noticing's.
- **A reply to an article is split by kind, not turned away at the door.** A
  capture marked as a reply is filed like any other, **except for the part that
  says what he thought of the article** — the buttons, and any words about the
  writing. That part gets its log entry and stops: no verdict, no page, no
  amendment. A correction of fact in the same reply, and anything he says about
  his own life in it, are filed exactly as any capture is. **When a sentence is
  both at once — "I have had enough of reading about my mother, she is fine
  now" — the whole sentence stops at the log.** *Why it errs that way: holding
  back a fact costs him one thing he said and will say again; passing his taste
  to the article-writer costs him flattery, which he cannot see and which
  compounds.* *Why the exception:
  what he thought of an article is about this program rather than about his
  life, and letting it reach a page would hand the article-writer exactly what
  the noticing's design goes to some trouble to keep from it. Why only that part
  and not the whole reply: his corrections are the half of his feedback that
  makes the mind more accurate, and a design that kept only the other half would
  get steadily more agreeable and never more right.*

## What is out

- **Asking it questions.** That is the third piece, and it has both doors: his
  phone as well as Claude Code, with the phone one as its own clearly separate
  option so he always knows which he is using and which costs money. Recorded
  on 16 September 2026, not built here.
- **Anything on the phone.** It captures; it does not file.
- **Any automatic or scheduled filing.**
- **Splitting a page that has grown long.** It is a rewrite the model performs
  unprompted and the easiest place to lose his material.
- **Cost-saving cleverness** — a cheap first pass, caching, batching for price.
  None of it is needed when the filing is free, and each is a thing that can be
  wrong.
