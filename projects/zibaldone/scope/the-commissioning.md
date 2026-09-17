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

## How he asks

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
- **A commission does not ride on a filing run.** It is its own run, started by
  the filing when it finds a commission waiting. *Why: the asking's design has one
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

**They are capped, and the cap is on the run, not the query.** At most six
outbound questions for a commission. *Why a cap at all when usage is not the
constraint: the cap is not about cost. Each query on its own may be perfectly
general, and the set of them still identifies him — see the worked question
below, where exactly that happens. The number of questions is the only handle on
the aggregate that a machine can actually hold.*

**One mechanical rule on a query: it may name at most one of his particulars.**
A particular is a place, a trade, a nationality, a family arrangement, a visa or
health status, an employer, an age. *Why one and not none: none is
unsearchable — a query with no particular in it returns advice columns. Why not
two: one particular is a topic and two is a person. This is checkable by a
program against a list the run writes down, which is the only kind of rule worth
having here.*

**Leaves the machine: nothing, yet.**

### 4. Search, on those questions and nothing else. This is the only thing that leaves.

Several agents, one question or two each, as he asked for. **Each agent is given
its question and nothing else** — not the mind, not the pages, not the other
agents' questions, not what the question was derived from.

*Why the agents are blinded to his material and not merely told not to send it:
an agent that holds his mind can put a phrase of it into a query without anyone
deciding to. An agent that was never given it cannot. This is the same mechanism
as the noticing's per-sentence checkers, which see one capture and nothing else,
and it is the one guard here that is structural rather than instructed.*

**Leaves the machine: the six query strings, and nothing else. They are kept,
and they are printed in the finished paper.** *Why printed rather than logged:
the same reasoning as citation. He is the only one who can look at a query and
say "that is me on a page". A log he never opens cannot tell him that.*

### 5. Write the paper, locally. Nothing leaves.

His material and the findings are put together by a call that has both. His
words never went anywhere; the findings came back as text.

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

**Stage 3 would write these six queries, literally:**

```
1  research on deciding to leave a job and then reversing the decision
2  status quo bias and omission bias in career change decisions
3  why people abandon a career change after committing to it
4  career decision making under immigration status uncertainty
5  exercise adherence and physical activity during periods of uncertainty
6  reversible and irreversible decisions how people weigh them
```

**And this is where the shape breaks.** Not in the abstract — here, on this
question, in these six lines.

**First: generality and usefulness pull against each other, and nothing in the
scope's shape acknowledged that.** Query 1 and query 3 are safely general and
will return advice columns and popular psychology. Query 4 is the one that would
return something worth citing — and query 4 is the leak. The precision that makes
a search useful is the same quantity as its power to identify. The scope's
instruction to derive questions "which are general and have no him in them" reads
as though generality were free. It is not. It is paid for in usefulness, and a
design that does not say so will be quietly resolved in favour of usefulness by
whoever builds it.

**Second: no single query identifies him and the set of them does.** Taken one
at a time, every line above is a question thousands of people have typed. Taken
together, in one session, within one minute: someone is researching visa-
contingent career reversal, exercise adherence under stress, and irreversibility.
Add a seventh about family obligation abroad and it is a person. **The scope's
protection is written per query and the exposure is per run.** That is the flaw,
and it is why the cap above is on the run.

**Third, and this one has no fix here: the question itself may be the leak.**
*"Why do I keep talking myself out of leaving"* is already general. But *"should
I take the offer from X"* cannot be made general without becoming useless, and
there is no derivation that saves it.

**So the rule that falls out of the test: where the question cannot be made
general, nothing goes out, and the paper is built from his material alone and
says on its face that it searched nothing.** *Why this is a real outcome and not
a failure: it is the narrating's rule — report the numbers, do not quietly build
the paid version instead. Half the value of this piece is reading a year of his
own words carefully, and that half never needed the internet.*

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

### It may say what he should consider. It may not end there.

He struck the muzzle out on 16 September 2026: he does not mind being called out
and does not want to be managed, and the code no longer carries the no-advice
rule. `noticing/prompts/read.md` now says outright: *"Say what he should consider. Those are his
words."* **That stands here.**

**What changes at this length: it may not produce a list of steps, and the
document may not end on its recommendations.** *Why the first: a plan was never
the thing he asked for, and at white-paper length the pull toward one is far
stronger, because a long document about a problem has a shape that wants
recommendations at the end of it. Why the second, which is a rule about position
and looks fussy: the last page is the position of authority, and what sits there
is what he will remember. A consulting report ends on what to do. This ends on
what it does not know — the part of his question its evidence could not reach.
That is a real section with real content, and putting it last is the cheapest
guard on this page.*

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

### Whether it may still say nothing, and the honest answer

**Commissioning makes refusing harder, and a straight "nothing" would not
survive.** He asked, he waited, he spent from his allowance, and a machine that
comes back with one line has, to him, failed. The existing design is already
tilting: `noticing/prompts/read.md` tells the reader that having nothing to say *"should be
rare"*, because it was handed everything. A commission tilts further, because it
was also asked.

**So refusal changes shape rather than being kept as a word nobody will use.**
The paper always answers, and what it is allowed to answer is *how far your own
material reaches*:

- It states at the front how many captures bear on the question. Four captures
  cannot support a paper about his psychology, and the number says so before any
  prose does.
- It carries a closing section naming **what it could not establish** — the part
  of his question the evidence did not reach.
- **If that section is empty, that is the warning, not the reassurance.** A paper
  that could establish everything asked of it has stopped noticing where its
  evidence ends.

*Why this rather than keeping the fourth verdict: a refusal that every force in
the situation pushes against is a refusal that gets recorded as available and
never used, which is worse than not having it — this workshop's own budget exists
because a check never seen refusing cannot be told from one that cannot fire.
Graded reach is a refusal the machine will actually give, because giving it is
not the same as coming back empty-handed.*

*What this costs, said plainly: he loses the clean signal. "Nothing" was one word
he could not misread. "Here is how far your material reaches" is a paragraph he
has to actually read, and he may skim it. That is a real loss and it is the price
of a refusal that gets used.*

## What it produces, and how it is told from an article

A page in Disegno, and **it does not pretend to be an article**:

- **It is marked as commissioned, and it names the question he asked**, in his
  words, at the top.
- **It opens with the count** — captures bearing on the question, span, outside
  sources found.
- **It prints the queries that were sent out**, in full. *Why in the document and
  not in a log: it is the only way he will ever look at them.*
- **It lists its outside sources**, which an article is forbidden to do.
- **It ends on what it could not establish.**
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

**One commission, estimated:**

| stage | tokens in | wall time |
|---|---|---|
| 1. read the mind | 40k–130k | 2–5 min |
| 2. what the mind can carry | small | under a minute |
| 3. write the queries | small | under a minute |
| 4. search, 4–6 agents in parallel | 30k–60k each, 150k–350k total | 5–15 min |
| 5. write the paper | 100k–200k | 5–15 min |
| the second independent run (above) | doubles stages 1–5 | doubles |

**So: roughly 600,000 to 1.2 million tokens and 25 to 70 minutes, doubled if it
is commissioned twice — call it an hour to two hours.** *How the search figure
was reasoned: a search agent that reads eight to fifteen pages at two to five
thousand tokens each lands in that band. Nothing here measured it.*

**Against his allowance.** Fifteen Routine runs a day on Max, shared across the
account. **A commission is one run, so the cap is not the constraint** — he said
himself these will be rare. What is unknown is whether a single run of this size
hits a limit other than the cap; nobody here has run one. *This is the number
most likely to be wrong on this page.*

## What this costs him, and what it takes away

- **An hour or two of not knowing.** The asking's promise of same-evening answers
  does not hold for this, which is why the acknowledgement is in the design.
- **Six questions about his life exist outside his machine**, and no promise here
  makes that untrue. The design makes them few, general, and visible to him. It
  does not make them private.
- **The clean "nothing" is gone**, traded for a refusal he will actually be
  given. Above, with its price.
- **A second opinion he has to read.** Commissioning twice means he is shown
  disagreements rather than a settled answer. That is more work for him, and it
  is the point.
- **A long document he may believe more than he should.** The count at the front,
  the unmarked-sentence share and the closing section are the whole of what
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

**The generality of the outbound questions.** Everything in the privacy half
rests on the claim that a useful question can be made general enough not to
identify him, and the worked question above shows that useful and general pull
against each other. My six-query cap and one-particular rule are the best handles
I found, and neither is strong. **For this to fail him it only takes a builder
who wants better search results** — the pressure is constant, the loosening is
invisible, and nothing downstream would ever show it.

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
