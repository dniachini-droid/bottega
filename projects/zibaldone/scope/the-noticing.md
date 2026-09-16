# The noticing

## What it does

The fourth piece. Once a week the mind reads itself and asks what has changed
shape — a subject he keeps returning to, two things that turn out to be one
thing, a view of his that has quietly reversed, a pattern across months he
cannot see from inside a week. Where there is something worth saying, it writes
an article, or draws the shape of it, and files it like anything else.

He can also run it by hand from Claude Code whenever he wants, without waiting
for the week. *Why both: the clock is what makes it happen when he forgets, and
the hand-run is what he uses the first time the clock does not, and when he has
just captured something and wants to know what it connects to.*

*Why this is a piece of its own rather than part of the filing: the filing looks
at one capture and asks where it belongs. This looks at the whole mind and asks
what it has become. They fail differently and cost differently, and folding the
second into the first would mean paying for it on every run.*

## What done looks like

- **Weekly by default, on an hour he sets, and on demand from Claude Code.**
  *Why weekly and not on every run: this is the only part of the system that
  works when he has asked for nothing, so it is the only part with an
  open-ended cost. A week is also the shortest span over which "he keeps
  returning to this" means anything.*
- **Nothing is the ordinary answer, and it is counted.** A week where it
  observes nothing is a normal week, reported as such. *Why this is the
  load-bearing rule: a model asked to find insights will always find some. This
  is the same trap the filing's fourth verdict exists for, and it needs the same
  guard and the same count — if it produces an article every week, it is
  generating, not noticing, and the count is how we will see that before the
  mind fills with profound-sounding observations about nothing.*
- **It never edits his pages or his log.** An observation is its own page,
  linked from the subjects it draws on. *Why, and this is the same rule as for
  answers: what he thought and what a model concluded about him must stay
  tellable apart, or in a year he cannot trust either.*
- **Every observation names what it was drawn from** — which pages, which
  captures, which weeks.
- **A diagram is text that draws itself**, stored in the page. *Why not an
  image file: a repository keeps every version forever, so images accumulate
  and can never be taken back out; and text can be read, corrected and searched
  when the drawing is wrong.*
- **It never proposes an action, a plan or advice.** It reports what it
  observes about what he has written. *Why: he asked for a second mind, not a
  coach, and an observation he can check against his own pages is worth
  something where a suggestion is not.*
- **How we will know it is right**: after a month he can point at one article
  and say it told him something he had not put together himself — and at least
  one week produced nothing.

## Learning from him

Every article carries a way for him to answer it, and what he answers changes
what gets written next. *Why this is in scope and not a refinement: it is the
only signal that can tell a useful observation from a plausible one, and
without it the noise problem has no remedy except guessing.*

- **Two different unhelpfuls, kept apart.** "This is wrong" and "this is right
  but I did not want to read it" need opposite responses — the first should
  change how it reasons, the second only what it surfaces. *Why this is the
  first rule: collapsed into one button the system learns the wrong lesson from
  half its feedback, and the more he uses it the further it goes wrong.*
- **A free text box as well as the buttons**, because his own words about why
  something missed are worth more than a score.
- **What he says becomes a written preferences file** — the third of Karpathy's
  layers, which this design has so far not built. The run reads it before
  writing. *Why a file and not something learnt invisibly: he can open it, read
  what it believes about him, and cross out a line that is wrong. Nothing else
  here gives him that.*
- **The preferences file is rewritten, never appended to, and capped.** Every
  line names the article and date it came from. *Why: instruction files grow
  226% over their lifetime and never shrink, and a line whose origin is lost is
  one nobody dares delete. This is the same rule this workshop holds itself to.*
- **"More of this" counts as much as "less of this", and it is allowed to say
  things he does not like.** *Why, and this is the failure this design most
  needs to avoid: a system tuned only against complaints learns to say less and
  less until it says nothing worth reading. Blandness is the documented end
  state of optimising against negative feedback, and it would arrive slowly
  enough that neither of us would notice it happening.*
- **Feedback is not a capture.** It lives beside the wiki, not in his log.
  *Why: the log is the record of his life, and what he thought of an article is
  a fact about this program.*
- **It does not overreact to one night.** A single dismissal does not rewrite
  what it believes he wants.
- **How we will know the learning works**: the share of articles he marks
  helpful rises over a month. If it does not move, the feedback is being
  collected and not used, and we should find out which.

## The second section of the app

This is where the wiki is read, and it holds three kinds of thing that should
not look alike: **his subject pages**, **answers** he asked for, and
**articles** it wrote unprompted.

- **It opens on the most recent articles**, presented like a front page — a
  title, a line, a date — not a list of files. *Why: a folder listing is what
  GitHub already gives him, and it is unreadable on a phone. The reason to
  build a second view at all is that it is not that.*
- **Pages carry titles written for a person**, not file names.
- **Diagrams draw themselves in the page**, on a phone.
- **He can find a subject.** One search box, over titles and text.
- **It matches the notebook he already has** — the same hand, so the two
  sections feel like one thing he owns rather than two programs.
- **It is read-only.** No editing, no notes, no marking. *Why: one writer. The
  moment the app can change a page, the app and the weekly run are two things
  writing the same mind, which is the failure the filing was designed to
  avoid.*

## What is out

- **Advice, plans, reminders, anything addressed to him in the second person.**
- **Editing anything from the app.** Above, with its reason.
- **Tags, folders, or any structure he has to maintain.** *Why: the point is
  that he writes and it files. A structure he curates is a second job.*
- **NotebookLM or any outside tool inside the run.** Researched on 16 September
  2026: there is no official interface for an ordinary account, it caps at 100
  sources where his mind grows without limit, it cannot write back into the
  wiki, and automating it would mean his Google login sitting on a server. He
  can export and use it by hand whenever he likes; that needs nothing built.
- **Splitting or reorganising pages that have grown long.** Still out, as in the
  filing.
