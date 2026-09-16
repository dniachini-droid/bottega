# The noticing

## What it does

The fourth piece. The mind reads itself and asks what has changed shape — a
subject he keeps returning to, two things that turn out to be one thing, a view
of his that has quietly reversed, a pattern across months he cannot see from
inside a week. Where there is something worth saying, it writes an article, or
draws the shape of it, and files it like anything else.

In his words, the goal: *"a notebook that takes my thoughts and life and files
it in a way that is easily accessible but constantly searches for ideas and
themes and notices things I wouldn't and presents back to me analysis of that
... essentially like someone reading my diary and then providing their
insights, either from just the notes or reading the internet for advice and
then making comment."*

**It must stay free, and it must be responsive at least nightly.** His
instruction of 16 September 2026, and the constraint everything below is built
inside.

*Why this is a piece of its own rather than part of the filing: the filing
looks at one capture and asks where it belongs. This looks at the whole mind and
asks what it has become. They fail differently, and they are wrong in different
directions — the filing's danger is losing what he said, this one's danger is
inventing what he meant.*

## About the evidence quoted below

Two research jobs ran on 16 September 2026 and their documents are
`projects/zibaldone/noticing-research.md` and
`projects/zibaldone/memory-research.md`. Several rules here rest on numbers from
them. **Both jobs reached their sources through a search tool rather than by
reading the papers**, and both say so. So a number quoted here is good enough to
choose a design by and not good enough to be the only reason for one. Where a
rule would fall apart if its number were wrong, that is said.

## When it runs

- **The ledger is updated on every filing run**, whatever the clock is set to.
  It briefly notes what each capture touched: the subject, the date, and whether
  it added to, corrected or duplicated what was already there. His words: *"almost
  like a living file that briefly references each input."* *Why on every run
  rather than once a night: the filing may run several times a day, and a
  ledger that skipped runs would have to reconstruct what those runs decided,
  which is the work it exists to avoid. Why it exists at all: the trend check
  then reads the ledger rather than the whole mind, so the cost does not grow as
  the mind grows — which is what makes nightly affordable in year two.*
- **The trend check runs once a day, at an hour he sets**, over the ledger. It
  is mechanical: which subjects are recurring, which co-occur, what contradicts
  a page. No model judgement, and nothing written.
- **An article is written only when the check trips a line**, which may be any
  day. **A slower sweep**, monthly, looks for what never trips one.
- **He can run any of it by hand from Claude Code, whenever.**

*Why writing is not attempted every day, and this is the one place his proposal
of 16 September was argued with rather than taken: asked to explain a pattern in
data that had none, models claimed to find one most of the time — the best
tested was right about half the time, and one was right 8% of the time. Asked
instead whether to speak up at all, across 6,790 real situations, models were
right under half the time and almost never stayed silent. A daily invitation to
find something is a daily chance to answer yes about nothing. The nightly half
is the half he was right about: it is cheap, it is mechanical, and without it
nothing would notice in time.*

*If the triggers turn out to hold back things he wanted, loosen them. That is a
number, not a redesign.*

## What done looks like

- **Nothing is the ordinary answer, and it is counted.** *Why this is the
  load-bearing rule: in the same study above, the models that got it right were
  the ones explicitly told they were allowed to say there was no pattern. The
  permission has to be in the instruction, not merely hoped for.*
- **A recurring observation amends the article that already says it**, with a
  short dated note of what is new, rather than writing a second article. His
  decision of 16 September 2026. *Why: asked to keep generating, a model's
  output went from half new in its first five hundred ideas to 12.5% new in its
  last two thousand. It starts saying the same thing in new words, and amending
  is what stops that becoming a pile.*
- **It never edits his pages or his log.** An observation is its own page,
  linked from the subjects it draws on. *Why: what he thought and what a model
  concluded about him must stay tellable apart, or in a year he cannot trust
  either.*
- **Every observation names what it was drawn from** — which pages, which
  captures, which weeks. *Why beyond honesty: it is what makes the check below
  possible at all.*
- **What is written is checked by a second call that never sees the claim.** The
  checker is given the evidence and a question it can answer — *does this
  capture say he was anxious about the move?* — not the article and *is this
  any good?* *Why the distinction and not the obvious design: a checker handed a
  claim and asked to judge it is self-correction, which has been measured not to
  help and sometimes to hurt. A checker handed the source and asked something
  checkable is a different mechanism, and on a list task it roughly doubled
  precision.*
- **Articles are written as an adviser, in the third person, and as a question
  where the evidence is thin.** *Why all three: they are the only guards against
  flattery that anyone has measured from outside a model's training. Third-person
  framing alone cut it by up to 63.8% in one benchmark; turning a statement into
  a question took it to near zero where the statement form was 24 points worse.*
- **A diagram is text that draws itself**, stored in the page. *Why not an image
  file: a repository keeps every version forever, so images accumulate and can
  never be taken back out; and text can be read, corrected and searched when the
  drawing is wrong.*
- **It never proposes an action or a plan.** It observes, and it may comment.
  *Why the line sits there and not at "no comment at all": he asked for
  something that reads his diary and gives its view, so commentary is the point.
  What is out is being told what to do with his life — the register that makes
  these systems insufferable, and the one that most invites flattery.*
- **How we will know it is right**: after a month he can point at one article
  and say it told him something he had not put together himself — and at least
  one week produced nothing.

## Learning from him

Every article carries a way for him to answer it, and what he answers changes
what gets written. *Why this is in scope and not a refinement: it is the only
signal that can tell a useful observation from a plausible one.*

**It is also the most dangerous thing in the design, and the rules below are
mostly about containing it.** A system that learns what he likes will start
telling him what he wants to hear, and for a second mind whose worth is
noticing what he would not, that is not a degradation — it is the end of it.
What the research found, all of it against the naive version of this feature:
a thumbs-up signal added to a shipped product was withdrawn after four days for
exactly this; across 1.5 million conversations the ones judged most
disempowering were rated *above* the baseline rate; and a user profile placed in
the prompt — which is what a preferences file is — raised agreement by between
16% and 45% depending on the model. He will not be able to see it: in one study
71% of people detected no difference between a flattering assistant and a plain
one, and rated the flattering one as the more honest.

- **Exactly four controls on an article**: *more of this*, *less of this*,
  *this is wrong*, and a box for his own words. *Why written out: "two
  unhelpfuls kept apart" plus "more of this" plus a box can be counted three
  ways, and a builder should not have to guess.*
- **Two different unhelpfuls, kept apart.** *This is wrong* and *this is right
  but I did not want to read it* need opposite responses — the first should
  change how it reasons, the second only what it surfaces. *Why this is the
  first rule: collapsed into one button the system learns the wrong lesson from
  half its feedback. And the second of them is the only signal here that a
  thumbs-up cannot carry. No precedent for it was found anywhere.*
- **An answer is a capture.** It goes into the raw layer verbatim, dated, marked
  as an answer to which article, and gets a log entry like anything else. *Why
  this reverses what an earlier version of this page said: the research locates
  every failure in the derived layer — where a "maybe" becomes a fact, where a
  stored claim makes later writing sycophantic, where rewriting compounds. The
  log is the only layer the evidence calls safe. And his answer to an article is
  the most valuable thing he will ever send: dated, about himself, in his own
  words, minutes after reading something about himself.*
- **Two files, and the writer sees only one.** Corrections of fact go to the
  wiki and the article-writer reads them. **What he liked and disliked is never
  shown to the call that decides what an article says**; a separate pass may use
  it for length and tone. *Why this is the single most important rule in the
  piece: blinding the writer to his taste is the only guard that removes the
  problem by construction rather than reducing it, and every study above is the
  control arm of that same experiment.*
- **The preferences file is small, dated, reasoned, expiring and rebuilt.** A
  handful of rules at most. Each carries its date, the reason, the log entry it
  came from, and which model it was written against. Each expires after a season
  unless something he says renews it. The file is regenerated from the log, never
  edited in place. *Why each part: compliance collapses past five or six rules;
  instruction files triple over their life and the oldest rules are the last
  anyone dares delete; a rule with its reason is the one that can be safely
  removed; rewriting in place is the step that compounds error; and a rule like
  "stop opening with praise" is a correction to one model's habit, which the next
  model will not have.*
- **"More of this" counts as much as "less of this", and it is allowed to say
  things he does not like.** *Why: a system tuned only against complaints has
  every reason to say less and less until it says nothing worth reading. This
  half is reasoning rather than measurement — the measured danger is flattery,
  not blandness, and no study of this feedback loop narrowing output over time
  was found.*
- **It does not overreact to one night.** A single dismissal does not rewrite
  what it believes he wants.
- **No learned score of what he likes**, ever. *Why: that is precisely the
  reward signal that was withdrawn from a shipped product in four days.*
- **His hedges are kept.** A capture that says "maybe" is filed as "maybe".
  *Why: memory products have been measured turning hearsay into confident fact
  between a quarter and a half of the time, and keeping the word costs nothing.*
- **A capture says who said it.** A photograph of a doctor's letter or a
  friend's message is somebody else's words, and filed plainly it becomes a fact
  about him in his own voice.
- **A capture made soon after he read an article is marked as such.** *Why, and
  there is no fix for this, only visibility: measuring a behaviour changes it.
  Once he is reading articles about his life, some of his captures are replies
  to them, and the mind would otherwise notice patterns it caused itself.*

## What we will measure each month

*Why a list rather than one number: the failure this piece risks is invisible
from inside it, and every number below is here because something in the research
made it the earliest place the failure shows.*

- **The sting rate** — the share of answered articles marked *right but I did
  not want to read it*. **If this falls towards zero while "wrong" holds steady,
  the mind has learned to please him.** It is the earliest signal there is.
- **The flip test** — ten articles regenerated with the taste file removed,
  twice; count the claims that change sign, and subtract the difference between
  the two blind runs, because about a third of the raw difference is ordinary
  noise. Re-run whenever the model changes.
- **The rules** — how many, how old the oldest is, and how many carry a reason
  and a source.
- **Provenance** — twenty sentences sampled from pages; how many point at a log
  entry that actually supports them.
- **Coverage** — the subjects and registers the month's articles covered against
  those in the wiki, because narrowing is small at each step and only visible
  against a count.
- **The verdict mix** — "nothing" and "amended" against "new page", which is
  already the filing's measure.

## The second section of the app

This is where the wiki is read, and it holds three kinds of thing that should
not look alike: **his subject pages**, **answers** he asked for, and **articles**
it wrote unprompted.

- **It opens on the most recent articles**, presented like a front page — a
  title, a line, a date — not a list of files. *Why: a folder listing is what
  GitHub already gives him, and it is unreadable on a phone. The reason to build
  a second view at all is that it is not that.*
- **Before the noticing is built** — that is, when the asking ships first — the
  same view opens on his most recent answers, and there are no articles and no
  controls. *Why said here: the asking's scope points at this section, and a
  builder reading it would otherwise be told to build feedback buttons for
  articles that do not exist yet.*
- **Pages carry titles written for a person**, not file names.
- **Diagrams draw themselves in the page**, on a phone.
- **He can find a subject.** One search box, over titles and text.
- **It matches the notebook he already has** — the same hand, so the two sections
  feel like one thing he owns rather than two programs.
- **He cannot change a page, and he can answer an article.** Those are different
  things and the distinction is the whole of it: nothing he does in the app edits
  the wiki. *Why: one writer. The moment the app can change a page, the app and
  the run are two things writing the same mind.*
- **An answer travels the way a capture travels**, because it is one: stored by
  the app with his captures, collected by the next run, given a log entry.

## What is out

- **Advice, plans, reminders, anything addressed to him in the second person.**
- **Editing the wiki from the app.** Above, with its reason.
- **A learned score of what he likes**, and **showing the writer his bad past
  articles as examples of what not to do.** *Why the second: models handle
  "not this" poorly, and the material still reaches the writer.*
- **A forgetting curve** that drops old material. *Why: nobody has shown one
  helps, and what it would delete is the raw layer, which is the one the
  evidence says to keep.*
- **Tags, folders, or any structure he has to maintain.** *Why: the point is
  that he writes and it files. A structure he curates is a second job.*
- **NotebookLM or any outside tool inside the run.** Researched on 16 September
  2026: no official interface for an ordinary account, it caps at 50 sources a
  notebook on the free account and 100 on the first paid tier where his mind
  grows without limit, it cannot write back into the wiki, and automating it
  would mean his Google login sitting on a server. He can export and use it by
  hand whenever he likes; that needs nothing built.
- **Splitting or reorganising pages that have grown long.** Still out, as in the
  filing.
