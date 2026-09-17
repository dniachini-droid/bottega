# The commissioning

He asks the mind a large question — his career, a business decision, his own
psychology — and gets back something longer and more considered than an article:
a piece of work that reads everything he has ever put in, goes and finds what is
known about the question outside him, and puts the two together. It lands in
Disegno like anything else.

**This page is the design for it. Nothing is built yet.**

## What he asked for, in his words

*"Commission as part of the ask section, a very deep fable research on a
particular area — like career development or business analysis or my
psychological improvement. Or anything else. And the deep research would look at
all my entries and then scour the internet with multiple agents and piece
together a white paper on my ask, and publish it in the Disegno."*

And his reason: *"Chatbots like Claude and ChatGPT have memories. But this, I am
assuming, contains much more detail."*

## Why his mind is not a chatbot's memory, which is the thing to build on

A chatbot's memory is a summary: compressed, rewritten as it goes, and kept to
make the next reply better. The source is gone.

His is the opposite. `log/<id>.md` holds his words exactly as given, written once
with the create-only flag and made read-only. Everything above it — the subject
pages, the articles — is interpretation layered over that, and every claim
points back at the capture it rests on.

**That trail is the asset, not the volume.** An analysis built on it can be
checked, sentence by sentence, against what he actually said.

## Settled before the work starts

**Usage is not the constraint.** He said so: *"Usage is fine. It won't happen
often and I'm on a max plan."* Do not design around cost. Do report what a run
would actually take.

**His material does not have to leave, and mostly must not.** The shape to
design toward: read the mind with no network at all; derive from it the questions
worth asking, which are general and have no him in them; search on those; bring
the findings back; apply them to his material locally, where it never moved.
*Why: his mind decides which questions to ask. It does not have to be in the
asking.*

**The design below takes that one step further, and the step is load-bearing.**
The shape above still has a *specific* question going out and a specific answer
coming back, and testing it on a real question showed that the only query worth
citing was also the only one that identified him. So: **retrieve broadly and
generally, narrow locally.** Pull the literature, not the answer, and do the
narrowing on the machine where his particulars already live. *Why this is not a
departure from what was settled but the same principle followed through: the
settled rule is that his mind decides which questions to ask without being in the
asking. Specificity is how he gets into the asking. Moving all of it to his side
of the wire is what the rule was for.*

**Where something specific genuinely must go out, it goes deidentified — and say
plainly what that does not protect.** His name is easy to strip. *A man in his
forties in Australia, aesthetics sales, Italian family, weighing a change* is
identifying in aggregate with no name in it. Treat it as the exception, not the
plan.

**This does not happen in the app.** The notebook has never made an outbound call
and never will. A commissioned piece runs where the filing and the noticing run,
against the mind's own repository — a different place with different rules.

---

# The design

## Two modes, and they are not the same instrument

He named a second way this could run, on 17 September 2026: *"Or if I like it I
can automate a topic chosen by the system once a week."*

**Commissioned.** He asks a question. Described throughout this page.

**Chosen.** Once a week, nothing asked, the system picks the topic itself and may
decline to pick one at all.

**They differ in exactly one respect that matters, and everything else on this
page applies to both**: whether *nothing to say* is available in its clean,
one-word form. It is not, in the commissioned mode; it is, in the chosen mode.
The reasoning is under *Whether it may still say nothing*, below, and it is the
most consequential difference in this design.

### How a topic gets chosen

**It rides the machinery that already exists rather than inventing a second
one.** The ledger records what each capture touched and when; the counting road's
trend check already reads it for which subjects recur, which co-occur, and what
contradicts a page. *Why reuse it: that check is mechanical, costs nothing, and
was built so the cost would not grow as the mind grows — which is the same
problem this has.*

**It must not choose by volume, and this is the trap.** The subject with the most
captures is the subject he writes most freely about, which is the subject he is
most comfortable with. **Selecting for material selects for comfort**, and a
weekly piece about his most-written subject is the definition of an article that
tells him what he already knows.

**So it chooses for interest, and lets the material set the length.** The reading
road's own list of what to look for is the right selector, and it is already
written: what he circles back to and what he never mentions again after once; the
gap between how he talks about one part of his life and another; what he said he
would do against what he then wrote about having done; a view that has turned
without his saying so. **A thin subject may be chosen precisely because it is
thin** — and the rule that length is set by the material then caps what can be
said about it, which is the right outcome rather than a conflict.

### What stops it choosing the same comfortable subject every week

- **A subject that has been chosen is not chosen again for a season**, unless
  something new has been filed against it. *Why a season and not a week: the
  point of a slow instrument is that it can wait, and the noticing's own rule is
  that a recurring observation amends the article that already says it rather
  than writing a second one.*
- **The chosen topics are counted against the subjects the mind holds.** This is
  the noticing's existing coverage measure, which exists because *narrowing is
  small at each step and only visible against a count*. Applied here it answers
  the exact question: is it circling three subjects out of forty?
- **Declining is counted too**, and a run of weeks with nothing chosen is as much
  a signal as a run of weeks all on one subject.

### Which should be the default: the chosen one, once both exist

**A view, since one was asked for rather than an even presentation.**

**The chosen mode is the better instrument, for one reason above the others: it
is the only one of the two that can refuse.** A weekly piece allowed to say
nothing is honest by construction. One he has to ask for is under pressure to
produce something every single time, and the whole of this page's difficulty —
the count at the front, graded reach, the arc — is machinery built to withstand
that pressure. The chosen mode does not need most of it.

**And it is closer to what he asked the notebook for in the first place**:
*"notices things I wouldn't."* A topic he chose is by definition one he already
knows he cares about. The value of a second mind is in what he would not have
thought to ask.

**Against it, honestly: he asked for commissioning first and explicitly, and the
chosen mode arrived as "or if I like it."** So the order to build is the order he
said them — **commissioned first, because he asked for it and because it is the
one that proves the machinery** — and the chosen mode becomes the default once it
exists and he has seen both. *Why not simply build the better one first: a weekly
instrument that chooses its own topics is hard to judge until there is something
to judge it against, and the commissioned mode is where he finds out whether a
long piece about himself is worth reading at all.*

## How he asks, in the commissioned mode

**In the chosen mode he does not ask at all**, and there is no door: a weekly
Routine picks the subject or declines to. Everything in this section is about the
commissioned mode only.

**It is the asking's door, with one word different.** `the-asking.md` settles
that a question is a capture like any other: it goes into the raw layer
untouched, gets a log entry, and is marked deliberately by a word he chooses
rather than guessed at from a question mark. A commission is that same line with
a second word on it.

So if his question word is *ask*, a commission reads:

```
ask deeply why I keep talking myself out of leaving
```

*Why a second word rather than a second door: the asking's reason for one door
was that two ways into his mind means two things that can go wrong and the raw
layer stops being the record of what he did. That reason applies to this with
more force, not less — this is the expensive road, and a machine guessing which
road he meant would spend an hour and his allowance on a guess.*

*Why marked rather than judged by length or difficulty: the cost of getting it
wrong is asymmetric. Reading a large question as an ordinary one gives him a
short answer in minutes and he can ask again. Reading an ordinary one as a
commission spends an hour and produces a white paper about whether he should
buy a new phone.*

**The answer arrives the way every answer arrives** — a page in the wiki, pushed
to the app, appearing in Disegno. Nothing new is built to deliver it.

**What the asking needs that it does not yet have, and this is the one place
this piece pushes back on it.** The asking's promise is *ask on a Tuesday
morning, find a page that evening*. A commission cannot keep that promise and
must not appear to. Two things have to be added:

- **He is told it was understood, before it is answered.** A commission is
  acknowledged on the run that picks it up — a line in Disegno saying the
  question was taken and is being worked on. *Why: the asking's own rule is that
  a run which fails must say so where he will see it, and that the app notices a
  run that never arrives. A commission that runs for an hour looks exactly like a
  failed run for that hour, and he has no way to tell the difference. The
  acknowledgement is what makes the silence readable.*
- **Neither mode rides on a filing run.** A commission is its own run, started by
  the filing when it finds one waiting; the chosen mode is its own weekly
  Routine. *Why: the asking's design has one
  writer at one door, and a filing run that took an hour would block the next
  one and collide with him. Why this does not break the cap: it is one extra run
  on the days he commissions something, and he said himself these will be rare.*

## What happens, step by step, and what leaves at each step

Five stages. **Three of the five never touch the network at all**, and the two
that do send only what stage three wrote down.

### 1. Read the mind. Nothing leaves.

Not the whole log in one packet — the numbers below say why that stops working
inside a year. It reads in three widening steps and stops when it has enough:

1. `INDEX.md` and `LEDGER.md`. One line per page, one line per capture. This is
   the map: which subjects exist, which captures touched them, when, and what
   the filing did.
2. The pages for the subjects the question touches, in full.
3. **The log entries themselves, in his own words**, for the captures the ledger
   points at — and for those alone.

*Why the ledger is the way in: it is the only index into his log that exists.
`mind.find()` searches pages and never captures, so there is no search over his
own words. The ledger was built so the noticing's cost would not grow as the mind
grows, and this is the same problem with a larger appetite.*

*Why it widens rather than taking everything: at a year of spoken captures the
whole log is about 425,000 tokens. That is not a budget question, it is an
accuracy question — this workshop's own rule is that the same task passes 8 runs
in 10 on a small context and 3 in 10 on a large one.*

**Leaves the machine: nothing. No network call is possible in this stage.**

### 2. Say what the mind can and cannot carry. Nothing leaves.

Before any question is asked outside, it writes down, mechanically:

- how many of his captures bear on the question at all, and over what span of
  time;
- which part of the question his material can speak to, and which part it cannot.

**This is the brake, and it is the reason the piece can still refuse.** See
*Whether it may still say nothing*, below.

**Leaves the machine: nothing.**

### 3. Write the questions to be asked outside. Nothing leaves yet.

It derives general questions — about the shape of the thing, not about him — and
**writes them to a file as literal query strings**. They are the outbound
traffic, in full, before any of it moves.

**They name bodies of knowledge, not situations.** *"What is known about people
who decide to leave and reverse it"* is a literature. *"Career decision making
under immigration status uncertainty"* is a situation, and it is a situation only
a few thousand people are in.

*Why this replaces the six-query cap and the one-particular rule an earlier
version of this page proposed: those were weak handles on a problem correctly
named — that the precision which makes a search useful is the same quantity as
its power to identify. **Inverting the retrieval removes most of the problem
instead of managing it.** Ask broadly, bring back the whole literature, and do
the narrowing here, where his particulars already live. He loses no detail,
because the detail is applied after retrieval rather than before it. It costs
more, and he has said cost is not the constraint.*

**Leaves the machine: nothing, yet.**

### 4. Fetch what is known, broadly. This is the only stage that reaches out.

**Three ways, in order of preference, and the first two are the usual case.**

**(a) Ask the model, with his material, and take no source mark for it.**

For what is broadly known — what the literature holds about reversing a
decision, what the phenomenon is called, which fields study it — a model already
has it, and asking it is one provider under terms he is already on rather than an
arbitrary search company.

*Why this is not the concession it looks like: **his words already go to a model,
and have from the first day of the filing.*** `read.md` puts his entire mind into
one call. The boundary this design protects has never been *his words never reach
a model* — that was never true and was never the claim. It is **his words reach
exactly one party, the one already reading them.** A search engine is a second
party, and asking the model instead of searching collapses it entirely. That is a
larger reduction in exposure than any rule about query wording could buy.

**And the price, which is exactly the right price: a model's recollection of the
literature may not carry a source mark.** It is the machine's own reasoning and
is marked as the third kind of sentence, below, and counted with it. *Why: the
whole discipline here is that a claim he cannot go and check is a machine
inventing him. That does not stop being true because the claim is about the world
rather than about him. A paraphrase of "the research says" with nothing he can
open is the same failure wearing a lab coat.*

**(b) Where a claim needs a source he can open, prefer bulk over queries.**

An open corpus fetched whole reveals that it was fetched whole. Every specific
question against it then happens on his disk, where the question never leaves.
*Why bulk is safer than it sounds: one download of a field's open literature is
an act thousands of people perform, and it carries none of his particulars. The
specificity moves to his side of the wire, which is the whole of this section.*

**What this cannot do, and it bears directly on the questions he named.** Bulk
open corpora are strong where the field is open — preprint archives, the open
biomedical literature, open bibliographic collections. **The psychology of career
decisions, which is his own first example, sits largely in paywalled journals.**
So for exactly his kind of question, (b) is thin and most of the outside material
will come from (a) and carry no source mark. **That is a real limit on what this
piece can promise, and the count at the front is where he sees it.** *Nothing
here verified which corpora are actually fetchable; that is a build-time
question, and this page should not pretend it was answered.*

**(c) An ordinary search, broadly worded, as the exception.**

Where neither serves, a general query. Blinded agents, one question each, given
the question and nothing else — not the mind, not the pages, not what the
question was derived from. *Why the agents are blinded rather than instructed: an
agent holding his mind can put a phrase of it into a query without anyone
deciding to; one that was never given it cannot. Same mechanism as the noticing's
per-sentence checkers, and the one guard here that is structural rather than
asked for.*

**Leaves the machine: the general questions and the corpus fetches, in full. They
are kept, and they are printed in the finished paper.** *Why printed rather than
logged: the same reasoning as citation. He is the only one who can look at what
went out and say "that is me on a page", and a log he never opens cannot tell him
that.*

### 5. Narrow locally, and write the paper. Nothing leaves.

**This is where the specificity lives.** The literature came back general; his
particulars are applied to it here, on the machine, where they have not moved.
Searching a fetched corpus for what bears on a visa, a trade, a family in another
country is an ordinary search over files on his disk.

**Leaves the machine: nothing.**

## The shape, tested against a real question

The scope says to test the shape on a real question rather than in the abstract.
The question:

> **ask deeply why I keep talking myself out of leaving**

It is a fair test because it is close to what the reading road already said to
him unprompted — *"You have written about leaving three times in six weeks, and
each time you had talked yourself out of it by the next entry"* — and it is his
own example area, career.

**Stage 1 finds** (as the mind would hold it): three episodes of deciding to
leave across six weeks, each reversed within days; the visa recurring alongside
them; the gym stopping in the weeks the visa comes up; family in Italy; the
trade he is in.

**Under the shape this page first proposed, stage 3 wrote six queries** — and
one of them, *career decision making under immigration status uncertainty*, was
the only one worth citing and also the leak. That is what forced the inversion.
The old list is not reproduced here; what matters is that its useful line and its
dangerous line were the same line.

**Under the inverted shape, here is what literally leaves the machine.**

To the model, with no search engine involved (route **a**):

```
What does the research literature hold about people who decide to leave
a job and then reverse the decision? Name the effects, what they are
called, and which fields study them.

What is known about how people weigh reversible against irreversible
decisions?

What is known about how life decisions are made when they depend on a
pending status or permission that has not yet been granted?
```

As bulk fetches, if the field is open (route **b**):

```
the open literature on career transitions and occupational change
the open literature on decision reversal and commitment
```

**And then, on his disk and reaching nothing:** search what came back for
*visa*, *residency*, *pending status*, *exercise adherence*, *family abroad* —
every particular of his, applied to material that was fetched without them.

### Does the shape hold now? Largely yes, and here is the part that does not.

**The leak that forced this page's first version is gone.** The dangerous query
was dangerous because it married two of his particulars to a research question.
Under the inversion there is no such query: the third question above asks about
*a pending status or permission*, which is a category covering visas, licences,
probation, planning permission, medical clearance and a dozen other things, and
it is asked by anyone studying decision-making. The narrowing from that category
to his visa happens on his machine.

**The set no longer identifies him either**, because the set is now three
literatures rather than six situations, and a literature is pulled by thousands
of people a day.

**What does not go away: the choice of which literatures to pull is still derived
from his life.** Nobody pulls *career transitions* and *decision under pending
permission* and *exercise adherence* in one week by coincidence. **That is a
coarse silhouette rather than a portrait** — it says something like *a person
thinking about work, waiting on something, and not exercising* — and it is a
great deal less than a name, but it is not nothing and this page should not claim
it is. *Why it cannot be removed: it is the irreducible residue. Any outward act
chosen because of his life carries some information about his life. The design
can make it coarse; it cannot make it absent.*

**Decoy queries are not the answer and are ruled out.** *Why: anyone holding the
logs filters noise trivially, so the protection is theatre, and it spends his
allowance to buy it. He was offered them and declined.*

**And the third break from the first version stands, unchanged by the
inversion.** *"Why do I keep talking myself out of leaving"* generalises
cleanly. *"Should I take the offer from X"* does not, and no inversion saves it:
the question is the particular. **So: where the question cannot be generalised,
nothing goes out at all, the paper is built from his material alone, and it says
on its face that it searched nothing.** *Why this is a real outcome rather than a
failure: it is the narrating's rule — report the numbers, do not quietly build
the paid version instead. Half the value of this piece is a year of his own words
read carefully, and that half never needed the internet.*

## What discipline this needs that a short article does not

This is the heart of it. The rules that keep Disegno honest were written for a
few hundred words about a fortnight. Six of them break here, and the breaks are
not all in the same direction.

### Length is set by the material, not by the commission

**The paper is as long as the evidence carries and no longer, and it says how
much evidence that was.** He asked for *very deep research* and a machine will
read *deep* as *long*.

*Why this is first and load-bearing: everything else here is downstream of it. A
document is trusted in proportion to its length — that is exactly why he wants
one and exactly why a wrong one costs more. If length is the commission's to set,
then a thin base produces a long document, and a long document built on four
captures is the worst object this system could make. If length is the material's
to set, a thin base produces three honest paragraphs and he can see that it is
three paragraphs.*

**So the paper opens with the count**: how many of his captures bear on the
question, over what span, and how many outside sources were found. Mechanical,
not a judgement. *Why at the front rather than in a footnote: it is the one thing
that lets him discount the whole document in four seconds, and a reader who has
already read forty pages will not discount them.*

### Three kinds of sentence, and he can tell them apart at a glance

A short article has one kind of citation, because there is one kind of source.
This has two, and the difference between them is the most important thing on the
page.

- A sentence resting on **his own words** ends with the capture id, as now.
- A sentence resting on **an outside source** ends with a source mark, and the
  sources are listed in the paper.
- A sentence resting on **neither** is the machine's own reasoning, and carries
  nothing.

**A model's unsourced recollection of the literature is the third kind, not the
second.** It may not take a source mark. *Why this is the rule that makes route
(a) above safe to prefer: asking the model instead of a search engine is a large
reduction in exposure, and it would be bought at the price of unfalsifiable
authority if "the research says" could wear a source mark with nothing behind it.
A claim he cannot go and open is the machine's reasoning, whether it is about him
or about the world.*

**And the third kind is counted, and the count is shown.** *Why this and not a
ban: the third kind is where the argument lives, and a paper with none of it is a
bibliography. But it is also where the invention lives. The noticing's own scope
already admits the characteristic failure — every ingredient can be faithfully
described while the pattern drawn across them is invented, and nothing catches
that. At article length the argument is two sentences. At white-paper length the
argument is most of the document. A paper that is four-fifths unmarked is a
machine writing an essay about a man it has partly made up, and the number is the
only thing that shows him this without his reading it twice.*

### When his account and the outside evidence disagree, both stay on the page

**His account wins on what happened. The outside source wins on what is common.
Neither is allowed to quietly overwrite the other, and where they conflict the
paper says so in plain words.**

*Why his account wins on fact: the outside source knows about populations and
knows nothing whatever about him, and the failure this whole system exists to
prevent is a machine inventing him. Why the outside source is not simply
discarded: then it is decoration, and he asked for it. Why the disagreement is
shown rather than resolved: it is the single most valuable thing the document can
contain — the place where he is not typical is the place he could not have got
from a search engine or from himself. Resolving it silently throws away the one
thing that needed both halves.*

### It may say what he should consider, and it may suggest a plan

**He settled this on 17 September 2026, in his own words:** *"I like reading what
I should consider. Honestly it knows a lot about me and so if it finds a good
plan it should suggest it."* **So a plan is in, at this length as at article
length**, and a piece that has read a year of him and has a good suggestion is
earning its place.

**What is still out is being managed**, not being advised: reminders, chasing, a
plan he did not ask for repeated at him. *Why this distinction survives when the
rest of the restriction did not: he said on 16 September that he does not mind
being called out and does not want to be handled, and those are different
things.*

**An earlier version of this page said the opposite** — that it may not produce a
list of steps and may not end on its recommendations — **and it was wrong.** It
was written before his decision of 17 September and it would have been the fourth
time in a row that a session narrowed this one line and he widened it back. *Why
that history is written here rather than quietly corrected: the line has now been
wrong in three directions, each time by a session deciding on his behalf what he
should be allowed to be told. The pattern is the finding. A session that reaches
for a restriction here should assume it is repeating the mistake.*

**What survives of the concern, turned from a restriction into a requirement.**
The worry was real: a long document about a problem has a shape that wants
recommendations at the end, and the last page is the position of authority. The
answer is not to forbid the plan. It is that **the paper must carry a section
naming what it could not establish, and that section must be real.** *Why a
requirement rather than a rule about position: requiring the limits to be stated
costs him nothing he wants, and telling a document where its plan may sit is
exactly the fussiness that has been struck out three times. Where the section
sits is the writer's business; that it exists and is not empty is the
discipline.*

### The arc is the danger, not the sentences

At article length the failure is a sentence that says more than its capture. At
this length the failure is a shape.

**A long document about a man's life is redemptive by default.** *You struggled,
here is the pattern, here is what it means* is a comforting arc even when every
sentence in it is hard, and every existing guard here is sentence-level: the
checker sees one sentence and one capture, the third-person framing changes one
call's input, *do not flatter* is one line in a prompt. None of them can see a
shape.

Two things are proposed against it, and I am marking honestly which is which:

- **Commission it twice, independently, and show him where the two disagree.**
  Two runs, same question, same mind, neither seeing the other. Where they reach
  the same place, the material carried it. Where they diverge, the argument was
  the model's and not his. He is shown the divergences — not a merged document,
  and not a winner. *Why this is affordable: he said usage is not the constraint
  and that this will be rare, and this is the one place in the whole design where
  that permission buys something that could not otherwise be had. Why it works
  where a checker cannot: it compares shapes, which is the level the failure
  lives at, and it needs no rule about what a good shape is.* **This is
  reasoning, not measurement. No study was found behind it and it should be
  written down as a choice.**
- **The flip test, which the noticing already defines**, run once per commission
  rather than monthly: regenerate with his stated views stripped out and count
  the claims that change sign. *Why it transfers: the writer reads his views
  here as it does there, and a long document has far more room to agree with him.
  This one has research behind it, through the noticing's page.*

### Whether it may still say nothing — and this is the one place the two modes differ

**In the commissioned mode, a straight "nothing" would not survive.** He asked,
he waited, he spent from his allowance, and a machine that comes back with one
line has, to him, failed. The existing design is already tilting:
`noticing/prompts/read.md` tells the reader that having nothing to say *"should
be rare"*, because it was handed everything. A commission tilts further, because
it was also asked.

**So in the commissioned mode refusal changes shape** rather than being kept as a
word nobody will use. The paper always answers, and what it answers is *how far
your own material reaches*:

- It states at the front how many captures bear on the question. Four captures
  cannot support a paper about his psychology, and the number says so before any
  prose does.
- It carries a section naming **what it could not establish** — the part of his
  question the evidence did not reach.
- **If that section is empty, that is the warning, not the reassurance.** A paper
  that could establish everything asked of it has stopped noticing where its
  evidence ends.

*Why this rather than keeping the fourth verdict here: a refusal that every force
in the situation pushes against is one that gets recorded as available and never
used, which is worse than not having it — this workshop's own budget exists
because a check never seen refusing cannot be told from one that cannot fire.
Graded reach is a refusal the machine will actually give, because giving it is
not the same as coming back empty-handed.*

**In the chosen mode, the clean one-word "nothing" comes back, and it should.**
Nobody asked, nobody waited, nothing was spent on his say-so. Every force that
made refusing hard in the commissioned mode is simply absent. **This is exactly
the ground the noticing already stands on** — it refuses most runs, it is told
that nothing is the ordinary answer, and the research behind that rule is that
models invent patterns in random data unless told they may say there is none.

*Why this is not a small difference: it means the two modes have different
failure modes and need different instruments. The commissioned mode's danger is
producing something when there was nothing, and its guard is the count at the
front. The chosen mode can simply decline, so its danger is the opposite one —
declining so often it becomes furniture — and its guard is the coverage count,
which the noticing already measures monthly.*

**Both keep the graded answer as well.** *Nothing this week* and *here is a thin
thing, and here is how thin* are different answers and both are wanted: the first
for when no subject was worth choosing, the second for when one was and the
material under it is slight.

## What it produces, and how it is told from an article

A page in Disegno, and **it does not pretend to be an article**:

- **It says which mode made it.** Commissioned, and it names the question he
  asked in his words at the top; or chosen, and it names the subject and says
  plainly that nobody asked for it. *Why on the page and not only in the run
  record: a piece he did not ask for is read differently from one he did, and he
  should not have to work out which he is holding.*
- **It opens with the count** — captures bearing on the question, span, outside
  sources found.
- **It prints what went out**, in full: the general questions asked of the model,
  and any corpus fetched. *Why in the document and not in a log: he is the only
  one who can look at it and say "that is me on a page", and a log he never opens
  cannot tell him that.*
- **It lists its outside sources**, which an article is forbidden to do.
- **It carries a section naming what it could not establish**, and that section
  is not empty.
- **It carries the same four controls as an article** — *more of this*, *this is
  wrong*, *right, but I did not want to read it*, and his own words. *Why
  unchanged: they are what makes the piece measurable, and a commissioned paper
  he did not want to read is exactly as important a signal as an article he did
  not want to read.*

**And it is a page like any other page: he cannot edit it, and an answer is its
own page, linked from the subjects it concerns, never merged into them.** *Why
this matters more here than anywhere: this page contains material from outside
him. Merged into a subject page it would become indistinguishable from his own
thinking within a year, which is the failure the whole system is built against.*

## What one run actually takes

**What is measured, and it is not much.** The log entry's fixed overhead is 148
bytes, measured from the code. A filing run takes several minutes and asks him to
approve an agent per capture — he watched that on 16 September 2026, and it is
why he cut the clock to once a day. **The real mind held four captures at the
last recorded run.** Everything below is arithmetic on top of those, at four
characters to the token.

**Everything else here is an estimate and is labelled as one.** No commissioning
has been run, because none is built.

**A year of captures, at five a day, spoken length (~140 words), about 120
pages:**

| what is read | about |
|---|---|
| `INDEX.md`, one line a page | 1,800 tokens |
| `LEDGER.md`, one line a capture | 34,000 tokens |
| every page in full | 67,000 tokens |
| **every log entry — the reading road's one packet, as built** | **425,000 tokens** |
| log entries for the 15% the ledger points at | 64,000 tokens |

**The last row is the design and the fourth row is why.** At a year of spoken
captures the existing whole-mind packet is twice the ordinary 200,000-token
context window. Even where a larger one is available, it degrades long before it
fails, and degrading is the dangerous case because nothing announces it. If he types short notes twice a day instead, a
year is about 53,000 tokens and the whole mind still fits — so the crossing
depends entirely on whether the narrating gets built and whether he uses it as
much as he says he would.

**This is not a new worry. It is already written down as an unknown**, in the
notebook's own `docs/REFUSALS.md` on 16 September 2026: *"whether the packet is too long to read
well once the mind is a few hundred captures, which is where the counting road
takes over and nothing here measures the crossing."* The commissioning walks
straight into the crossing, at greater length, with search results added.

**How often, which is what makes the rest of this affordable.** His words, 17
September 2026: *"It's not an often request so the usage is ok. It would only
happen maybe once a week, maybe less frequently."* **So at most weekly, in either
mode, and probably less.** *Why this is written into the design rather than noted
beside it: it settles that a run may be expensive. Everything above is designed
for a good answer rather than a cheap one — reading widely, fetching whole
corpora, and running the thing twice — and none of that would be defensible at
several runs a day. **Design for a good answer, not a cheap one** is the
instruction, and weekly is what pays for it.*

**One run, estimated:**

| stage | tokens in | wall time |
|---|---|---|
| 1. read the mind | 40k–130k | 2–5 min |
| 2. what the mind can carry | small | under a minute |
| 3. write the general questions | small | under a minute |
| 4. fetch: model routes, bulk corpus, or agents | 100k–400k | 5–20 min |
| 5. narrow locally and write the paper | 150k–300k | 5–20 min |
| the second independent run (above) | doubles stages 1–5 | doubles |

**So: roughly 600,000 to 1.6 million tokens and 25 to 90 minutes, doubled where
it is run twice — call it an hour to three hours.** *Why the range widened from
this page's first version: fetching a corpus whole and searching it locally reads
more than six queries did. That is the cost of the inversion, and it is paid in
the resource he said is not the constraint.*

*How the fetch figure was reasoned: an agent that reads eight to fifteen pages at
two to five thousand tokens each lands in that band, and a bulk corpus is read
selectively rather than whole. Nothing here measured any of it.*

**Against his allowance.** Fifteen Routine runs a day on Max, shared across the
account. **One run a week against a cap of fifteen a day is not a constraint by
any reading**, and that is the point of the frequency being settled. What is
unknown is whether a single run of this size hits a limit other than the cap;
nobody here has run one. *This is the number most likely to be wrong on this
page.*

## What this costs him, and what it takes away

- **An hour to three of not knowing.** The asking's promise of same-evening
  answers does not hold for this, which is why the acknowledgement is in the
  design.
- **A coarse silhouette of his week exists outside his machine**, and no promise
  here makes that untrue. The inversion makes it literatures rather than
  situations, and it is much less than the first version of this design would
  have leaked. It is not nothing, and it is visible to him in the paper itself.
- **In the commissioned mode the clean "nothing" is gone**, traded for a refusal
  he will actually be given. Above, with its price. **In the chosen mode he keeps
  it** — and the cost there is the opposite one: some weeks he is told nothing at
  all, having got used to a weekly piece.
- **Outside claims he cannot check.** Where the literature is paywalled, what the
  paper can say arrives as the machine's own reasoning with no source mark. He
  gets the reasoning and not the receipt, and the count is where he sees how much
  of the paper that is.
- **A second opinion he has to read.** Commissioning twice means he is shown
  disagreements rather than a settled answer. That is more work for him, and it
  is the point.
- **A long document he may believe more than he should.** The count at the front,
  the unmarked-sentence share and the limits section are the whole of what
  stands against that, and none of them can stop him.

## What will not survive contact, in the code as it stands

Each of these works at article length and breaks here. Three are mechanical and
would refuse a commissioned paper outright.

- **"Nothing from elsewhere: no outside sources, no links, no images."**
  `noticing/prompts/read.md:58`, `noticing/prompts/write.md:27`, and enforced by `refuseOutside` in
  `noticing/checks.js:192-196`, which refuses any `https?://` in a title, summary
  or body. **This is the hard stop: the commissioning cannot exist without
  changing a mechanical check.** The audit already recorded this rule as invented
  by a session, and noted that his own words for the piece were *"either from just
  the notes or reading the internet for advice and then making comment"* — the
  internet half was deferred by a guide, not by him.
- **"No list of sources in the body; the header carries them."** `noticing/prompts/read.md:59`. A
  document built on outside sources must list them in the body. Direct conflict.
- **"The summary must be one line under 160 characters."** `noticing/checks.js:225`. A
  white paper needs more than a tweet of summary.
- **"Sources: at least two", and an article must draw on at least two captures.**
  `noticing/checks.js:230,237`. Harmless but meaningless as a floor here; the real
  question is whether there is *enough*, which is what the count at the front is
  for.
- **"Cite a capture, never a page."** `noticing/prompts/read.md:37`. Needs a third case for an
  outside source, which is the three-kinds rule above.
- **One "no" throws away everything.** `noticing/noticing.js:678-684` adds a
  refusal and sets the article to `null` if any checking call says no. The audit
  found thirty-eight sentences destroyed by three refusals. **This one does not
  break on contact — it is already switched off on the reading road**, where the
  loop over sentences is skipped and what the reader wrote is filed as written.
  It is here because a commissioned paper has *more* reason to check things than
  an article does, since it carries outside sources, and whoever adds that
  checking will find this design sitting there ready to be copied. At an hour and
  a million tokens a run, an all-or-nothing refusal is not a check, it is a
  demolition.
- **A refusal leaves no record**; `finish` deletes the packets, the answers and
  the article. The audit found this at article length and called it *"no way to
  look at tonight after tonight"*. At this length it is an hour of work with
  nothing kept.
- **"It is shown every article already written to him and told that saying the
  same thing again has failed."** `noticing/noticing.js:532`. A commissioned question will
  legitimately overlap what an article already said — he asked about it, probably
  *because* an article raised it. "Has failed" is wrong here.

## Where this design is weakest

**The inversion moves the weak point rather than removing it.** Retrieving broadly
and narrowing locally genuinely dissolves the leak that the first version of this
page could not solve — there is no longer a query whose usefulness and whose
danger are the same property. What remains is that **the choice of which
literatures to pull is still derived from his life**, and that residue cannot be
designed away. It is a coarse silhouette rather than a portrait, and it is much
less than the old design leaked, but a page that called it solved would be
lying.

**And the pressure that worried me has not gone, it has moved.** Under the old
design a builder who wanted better results would tighten a query. Under this one
he will reach for route (c), an ordinary search, because it is the quickest thing
that works — and (c) is where the old problem lives. **The ordering of the three
routes is the whole guard, and an ordering is the easiest thing in a design to
quietly reverse.** Nothing downstream would show it.

**The bulk route may not be available for his own first example.** Career and
decision psychology is largely paywalled. If route (b) turns out to be thin for
the questions he actually asks, most outside material arrives by route (a),
carrying no source mark and counted as the machine's own reasoning — which is
honest, but it means a paper with far less he can go and check than the word
*research* implies. **This is the most likely way the piece disappoints him**, and
nothing here verified it either way.

**The second-run proposal has no evidence behind it.** It is the main thing
standing against the redemptive-arc failure, and it is my reasoning and nothing
more. If two runs of a long argument turn out to agree almost always — which is
plausible, since they share a model and the same material — it is an expensive
ritual that produces reassurance, which is the worst possible outcome for a guard
against flattery.

**The whole thing is designed for a mind that does not exist.** His mind held
four captures. Every number about reading cost is arithmetic over an assumed
capture rate and an assumed capture length, and the assumption that matters most —
that he will speak into it rather than type — is a feature that is not built.
**If he keeps typing short notes, the crossing never arrives, stage 1 is the
existing reading road, and a good deal of this page is machinery for a problem he
does not have.**

**And the count at the front can be gamed by the thing that writes it.** "How
many captures bear on this question" is a judgement wearing a number's clothes.

## What is out

- **Building any of it.** This is a design.
- **A survey of what is possible in principle.** Grounded in what this mind
  actually holds and this architecture actually does, or it is not useful.
- **The second slice**, which is what else the mind could be used for. That waits
  on this one, because this establishes what is really possible and without it
  the second produces forty ideas and four good ones.
- **Optimising for cost.** He said usage is not the constraint. The numbers above
  are reported, not minimised.
- **Sending his captures out, deidentified or otherwise, as the ordinary path.**
  The settled shape is that his words stay. The scope allows an exception; this
  design does not use one, and nothing here should be read as opening it.
- **A merged verdict from two runs.** They disagree in front of him or they are
  not worth running twice.
- **Decoy queries**, and any other manufactured noise around what goes out. *Why:
  anyone holding the logs filters noise trivially, so it is theatre, and it
  spends his allowance to buy the theatre. He was offered them and declined.*
- **A second door for asking.** A commission is the asking's line with a second
  word on it; the chosen mode has no door at all.
