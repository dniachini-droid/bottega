# What the filing will cost, and what will bite

*Research done on the night of 15 September 2026, before piece two was scoped,
so that scoping could be one sitting rather than a morning of questions. It
answers five things the owner would otherwise have had to decide blind.*

**Nothing here binds.** It becomes a decision when it reaches a scope page and
the owner says yes.

**How to read the marks.** The session that did this could reach Anthropic's own
documentation directly and everything else only through a search tool, so it
marked every claim: **[verified]** means read at the source named,
**[reported]** means it came back in a search summary and the original could not
be opened, and **[my estimate]** means arithmetic or judgement, with what it
rests on said. Those marks are kept exactly as written. *Why they are kept: the
difference between a price read off Anthropic's page and a price recalled is the
difference between a number to plan with and a number to check.*

---

## 1. What instant filing costs, per capture

**The prices. [verified — docs.claude.com/en/docs/about-claude/pricing, read 15 September 2026]** Per million units, in and out: Haiku 4.5 $1/$5; Sonnet 5 $2/$10; Opus 5 $5/$25. A cached read is a tenth of the input price; a batch is half.

Two things on that page that change the answer and are easy to miss. **[verified]** Claude 4.7 and later use a newer counter that produces about 30% more units for the same text — Sonnet 5 and Opus 5 are on it, Haiku 4.5 is not — so the same paragraph costs about 30% more on Sonnet 5 than the headline ratio suggests. That is built into every figure below. And **[verified]** Sonnet 5's price was introductory and has been made permanent; the rise planned for 1 September 2026 was cancelled.

**Which model, and why.** Sonnet 5 is the answer. Filing is judgement under a rule — is this the same subject, does it contradict what is written, is it already covered — over a few thousand words of his own prose. Haiku 4.5 is priced too because it is the right model for a cheap first pass. Opus 5 is priced to show what it would cost; the job does not earn it, and at twenty captures a day it is the difference between a coffee and a phone bill.

**Money on this page is Australian dollars.** *Why it is said rather than
assumed: he lives in Australia, and these figures were written in pounds and
pence until 17 September 2026. Anthropic bills in US dollars, so those are the
firm prices; the Australian figures below are converted at an assumed rate and
nobody here checked a rate.*

**The answer, on Sonnet 5 with an index that is bare page names [my estimate]:**

| wiki | per capture | per month, 5/day to 20/day |
|---|---|---|
| 200 pages | about 4c | A$5.45 – A$21.80 |
| 500 pages | about 5c | A$6.85 – A$27.40 |
| 2,000 pages | about 9c | A$13.90 – A$55.60 |

**If the index carries a one-line description beside each name, that roughly doubles to triples.** At 2,000 pages it goes from about 9c to about 22c a capture — A$34 to A$136 a month. *That is the single most likely thing to be added later without anyone noticing the cost.*

**What would make it wrong**, worst first. If filing runs as a loop of separate calls rather than one, the conversation so far is re-sent every turn and the input is charged roughly twice over — A$6–28 becomes A$14–70. *The five-minute cache genuinely fixes this: one capture's loop finishes in seconds, so the rules and the index are written once and read back at a tenth of the price.* If extended thinking is on, reasoning is billed as output at the higher rate and would be the largest line on the bill; these figures assume none. If pages settle at 2,000 words rather than 600, reading the closest three triples.

**Caching does not help between captures.** They are scattered through the day and the five-minute cache will be cold almost every time. On the batch door it is a large win, because the rules and index are read once for the whole batch.

*Not established: no real filing call was measured. Every count above is constructed from the described design. One week of real logs will be worth more than this table.*

---

## 2. Whether reading the whole index every time survives growth

**The money ceiling is far away. The accuracy ceiling arrives much sooner, and it is the one that matters.**

**[reported]** Chroma Research tested 18 production models from 10,000 to 500,000 units of context and every one scored worse as input grew. A separate study across 26 models found the median drop from a 32,000-unit context to a 128,000-unit one was 10.4 percentage points, with one model losing 28.3. Three named causes: the middle of a long context is attended to worst, attention thins as length grows, and material that is similar but irrelevant actively misleads.

**That last one is the killer here.** An index is a long list of short, similar-looking items with nothing to hang attention on — a 2,000-line list of names where three are nearly right is the hardest possible shape to be reliable on.

**Where the line sits [my estimate, inferred from that literature and not measured on his index]:** comfortable to about 500 pages, usable with care to about 1,500, and past roughly 2,000 the model is likelier to miss the right existing page and create a duplicate — precisely the failure the whole design exists to prevent.

**He has years, not months.** At five to twenty captures a day, with perhaps one new page per three or four captures, 500 pages is nine months to three years away and 2,000 pages is three to twelve years away.

**What Anthropic themselves did, which is a strong precedent for his design.** **[reported]** Early Claude Code used a meaning-based search index over the code. They removed it. Its creator said plain agentic search "outperformed everything. By a lot." The reason given was that such an index "is really tricky to maintain because you have to continuously re-index" against something that changes constantly. Claude Code now uses pattern matching, text search, and reading files on demand — which is what he is proposing.

**When to add machinery, and the trigger is a behaviour rather than a number.** The cheap next step is not a meaning-based index; it is a two-level index — themes at the top with counts, and only the names under the two or three themes that look relevant. Plain markdown, readable by him, nothing to maintain, roughly tenfold headroom. **The signal to act is duplicate pages appearing** — the same subject under two names. That is the visible symptom of the index having outgrown the model's attention, and it shows up long before any cost alarm. Worth counting from day one.

---

## 3. Where the raw captures live

**The limits [verified/reported from GitHub's documentation]:** 100 MB per file is a hard rejection; under 1 GB per repository is recommended; under 5 GB strongly recommended, beyond which GitHub may ask him to shrink it; 100 GB is the hard ceiling.

**The usual reason a repository is bad at photographs does not apply to him, and this is worth knowing.** The standard problem is that a repository cannot tell what changed between two versions of a photograph, so an edited photo is stored again whole. **His captures are never edited** — each photograph is written once and never touched — so exactly one copy of each is kept. His design's central rule accidentally removes the worst of it. What remains is that it adds up, none of it ever goes away, and every fresh copy of the repository downloads all of it.

**The number [my estimate, on 3 MB a photo]:** about 340 photographs to 1 GB, about **1,700 to 5 GB** — roughly one to two years of ordinary use. The 100 GB wall is decades away and is not the constraint. Halve the photo size and the number doubles.

**Text is nothing.** Twenty text captures a day is under 2 MB a year.

**What mitigates it.** **[reported — GitHub's own engineering blog]** Cloning without file contents, fetching them only when something reads a file, cuts clone time by an average of 88.6%. For his case that is close to a complete answer: Claude Code needs the markdown, which downloads on demand, and the photographs sit on the server until asked for. It costs one extra word on one command.

**The recommendation, and the reason is not the 5 GB number.** Put the text captures and the wiki in the repository; put photographs on the server's disk from the start, with the repository holding the words read out of each photograph and a pointer to it. *Why: photographs in a repository are effectively permanent — the history keeps everything, and removing one later means rewriting history and breaking every copy anybody holds. Photographs outside means he can move, shrink or delete them at any time without touching the wiki. The choice is made once and reversing it is genuinely painful.*

If he would rather have everything in one place — a real and defensible preference — it works fine; clone without contents, and revisit at about 1,700 photographs.

---

## 4. Making it reliably choose "do nothing"

**It is a named, currently unsolved problem, and no prompt wording fixes it. Two structural things have evidence behind them.**

**That it is real, with numbers. [reported]** A paired benchmark — each task in a should-act and a should-abstain version differing by one controlled change — across 17 frontier models in 4 harnesses found the best of them reached only 59.5% paired accuracy. **Its headline finding is the one that matters here: the ability to abstain is largely independent of general capability, so a better model will not fix this.**

**Why it happens, mechanically, and this is the most useful finding for his design. [reported]** A study of models judging whether code meets its requirements found that **when a model is asked to explain and propose a fix, it becomes significantly more likely to declare correct code faulty.** More detailed prompts asking for explanation and correction produced *higher* rates of wrong judgement.

**The implication is direct: separate the decision from the writing.** If one call decides the verdict and writes the page, the writing task biases the verdict toward "there is something to write". One cheap call decides the verdict and nothing else — no draft, no proposed wording. Only when it says amend, new or correct does a second call do the writing.

**That over-filing corrupts rather than merely clutters. [reported]** A study of memories continuously updated by models found usefulness first rises, then falls, and can end up worse than having no memory at all — one model went on to fail 54% of problems it had previously solved without any memory. The fault was in the consolidating step itself, not the material. **Its two recommendations are almost word for word his design: keep the raw episodes as first-class evidence, and gate consolidation explicitly rather than firing it after every interaction.** Agents that kept raw episodes doubled the accuracy of those forced to consolidate every time. *This is the strongest argument that the design is pointed the right way.*

**What is measured to work. [reported]** A novelty gate scores each new fact against what is stored, then sends only the uncertain cases to the expensive model: clearly new goes straight in, clearly redundant is dropped. It cut the writing phase's cost 3.4× and its delay 2.5×, and as a plain yes-or-no gate skipped 16–18% of model calls with little quality change.

**What over-filing looks like in the wild. [reported, and the session could not open the original]** An audit filed against one memory system reports reading 10,134 stored memories and finding 38 clean ones. That system has exactly these four verdicts including "do nothing". **Treat the number as one person's claim; treat the shape of it as the warning. Having the right four options in the prompt is not what makes a wiki converge.**

**The counterweight. [reported]** The opposite failure is real too: adding an explicit "unknown" option induces serious over-abstention, and in one study a model's over-abstention reached 34%. So "do nothing" cannot simply be made attractive — it has to be made *correct*, which means giving the model what it needs to tell "already covered" from "new".

**The suggestion:** build the cheap first pass as a Haiku call that reads only the index and the capture and returns one word. **[my estimate]** well under a cent a capture, A$2–16 a month at twenty a day, and it pays for itself if it correctly kills a third of captures before the expensive call.

**And whatever is built: count the four verdicts and show him the numbers.** If "nothing" and "amend" together are not the clear majority after a month, it is accumulating — and he will only know because somebody counted.

---

## 5. What breaks when both doors write at once

**Three distinct failures, not equally bad.**

**The push race.** **[reported]** When two things update the same branch and the second started from an older state, the second is refused. On its own this is safe — nothing is lost. **The danger is a system that responds by forcing it through, which silently discards the other side's work.**

**The genuine content clash.** Both doors rewrite the same page. A repository merges by line position, not by meaning, so two independent rewrites of the same paragraph produce either a mess or a conflict marker sitting in his wiki. **This is the one that loses information**, and it is likeliest on exactly the pages being actively amended.

**The double filing.** The same capture filed twice — once by the phone on arrival, once by the batch that did not know. This needs no simultaneity at all, only the two doors not agreeing on what has been done. **Most likely of the three and least discussed.**

**The arrangement that prevents it: one writer to the wiki, everything else queues.**

1. **Capture never touches the wiki.** The phone writes the capture to the server and returns. That is already how it works and it is why capture is fast; do not compromise it.
2. **Every capture carries a mark saying whether it has been filed**, where both doors can see it, written by whichever door files it. **Without this the two doors duplicate each other's work and no cleverness with the repository helps.**
3. **The server is the only thing that pushes filings**, one at a time. One writer means no race and no content clash, ever, and a queue of five to twenty a day is never more than a second behind.
4. **When he files a batch at his computer, that takes the wiki over for the session** — the server's queue pauses, or simpler, the server waits while it sees uncommitted work.
5. **When they collide anyway** — his laptop was offline and has a day to push — the recovery is to pull with rebase and push again. **[reported]** The standard warning applies: the automatic stash can exit successfully while leaving a half-merged state, so the retry must stop and ask rather than loop.
6. **Never force the wiki through.** A refused push means something else wrote; the answer is always to look, never to overwrite.

**One design choice makes most of this free: the log is append-only and each entry is its own file named by its moment.** Two writers adding two differently-named files never clash at all. Only the subject pages are contested, and the single writer removes that.

---

## 6. Things that will bite that were not asked about

**The two doors will disagree, and that is a design question rather than a fault.** Instant filing is a paid model with one capture in front of it. Batch filing is Claude Code with a day of captures and the whole wiki available. They will reach different verdicts on the same capture, **and the batch door will be better**, because it can see that three captures over a week are about the same thing. **Decide which door wins.** *Suggestion: instant filing always writes the log entry and takes only the obvious verdicts, deferring anything uncertain; the batch door may revise what the instant door did. That turns the instant door's bias toward action from a corruption into a cheap first draft.*

**The free door is not free. [reported, and not verified at a first-party source]** Claude Code subscriptions run on a five-hour rolling window plus a weekly cap, and **the same allowance is shared with claude.ai**. A batch of a hundred captures against a growing wiki is not a trivial run, and it competes with whatever else he wanted Claude for that week.

**Nothing in the repository can ever really be deleted.** A capture he regrets — a name, a medical detail, something said in anger — can be removed from the current state but stays in the history, and truly removing it means rewriting history and breaking every copy. **For a system explicitly designed to hold his inner life, he should decide before it starts whether "never edited" also means "never removable", and whether he is comfortable with that on somebody else's servers.** *This is the one decision here that is hard to reverse and easy not to notice.*

**Every page citing its raw captures means pages carry a growing tail.** A page that has absorbed forty captures carries forty references, and the "read the closest three pages" step pays for them every time. Keep citations short — a moment-stamp, not a quotation.

**Nothing in the design says what maintains the index.** If the model writes it when it creates a page, it drifts the first time a page is renamed or a write half-fails. *Suggestion: generate the index from the pages on disk every time rather than storing it as a file anyone edits. It costs nothing, cannot drift, and removes a whole class of "could not find a page that exists".*

---

## What could not be established

The session could not open any of the research papers directly — it reached Anthropic's documentation and a search tool and nothing else — so every paper finding above is a summary of an abstract rather than a reading of the method, and the audit reporting 10,134 memories with 38 clean ones is one report it could not verify. No measurement exists of how long a list of page names can get before a model stops finding the right one in it. No published figure exists for what fraction of verdicts a well-built filing system chooses "do nothing" on, beyond the 16–18% skip rate of a novelty gate, which is a narrower thing than the full four-way decision. And every cost in section 1 is constructed from the described design rather than measured on a real call.
