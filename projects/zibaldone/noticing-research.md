# Noticing: what the evidence says before anything is built

*Research done on 16 September 2026, against the design for the piece that
comes after filing — the part of Zibaldone that reads what the owner has
written and says something back. It was asked to attack the design, not
confirm it.*

**Nothing here binds.** It becomes a decision when it reaches a scope page and
the owner says yes.

**How to read the marks.** The session that did this could open GitHub and
almost nothing else — arXiv, the ACM library, PubMed Central, Letta, OpenAI,
Substack, Medium and dev.to all refused through the proxy. So every claim is
marked: **[verified]** means read at the source named; **[reported]** means it
came back in a search summary and the original could not be opened, so the
number is the summary's and not the paper's; **[my reasoning]** means
judgement or arithmetic, with what it rests on said. *Why the marks matter
here more than usual: most of the numbers a builder would want to lean on in
this document are [reported]. They are good enough to design with and not good
enough to argue from without opening the paper.*

---

## 1. Finding themes without re-reading everything

**The short answer: nobody has an incremental theme detector. What exists is
incremental *bookkeeping* — a counter, a ledger, a graph, a set of memory
blocks — plus a periodic whole-corpus pass that everyone admits gets expensive.
The design's split, cheap nightly ledger and a slow sweep, is the same split
every serious system has arrived at. What the evidence adds is that the stored
structure is where the damage accumulates, silently.**

### What each system keeps between runs, and what it costs

**Karpathy's wiki. [verified — gist.github.com/karpathy/442a6bf555914893e9891c11519de94f, read 16 September 2026]** Keeps `index.md` ("each page listed with a link, a one-line summary", updated "on every ingest") and `log.md` ("an append-only record of what happened and when"). Theme-finding is a **lint** pass, run "periodically", that looks for "contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps". That is a whole-wiki read. The gist says so itself: it "works surprisingly well at moderate scale (~100 sources, ~hundreds of pages)", and "a single source might touch 10–15 wiki pages" on ingest. Nothing in the pattern is incremental beyond the index. Practitioners who ran it for months report the predictable consequence: past roughly 150–200 pages the agent "can't hold the full wiki in context during an update", starts forgetting pages exist and creates duplicates, and a wiki whose lint is not run regularly becomes "a closed epistemic loop that cites itself" **[reported — practitioner write-ups on dev.to and Medium, 2026; none could be opened]**.

**Generative Agents (Park et al., 2023) — the closest published ancestor of the ledger. [verified — source code at github.com/joonspk-research/generative_agents, `scratch.py` and `reflect.py`, read 16 September 2026]** Each perceived event carries an importance score. A running counter, `importance_trigger_max = 150`, is drawn down by each event's score; when it reaches zero the agent reflects. Reflection reads only the records since the last reflection (`importance_ele_n`, reset to zero afterwards), generates exactly 3 "focal point" questions, and for each produces 5 insights **each carrying pointers to the evidence records**. Insights are stored as ordinary memories and retrieved by recency × importance × relevance, weights all 1, recency decay 0.99. In practice agents reflected "roughly two or three times a day" **[reported]**. Cost between reflections is a subtraction. Cost of a reflection is fixed, not proportional to the corpus. This is the ledger design, three years old, with numbers.

**Mem0. [reported — arXiv 2504.19413, April 2025; ECAI 2025]** Per extracted fact, one of ADD, UPDATE, DELETE or NOOP, decided by a model call against the retrieved nearest neighbours — the same four-verdict shape as Zibaldone's filing. Reported 1,764 tokens per conversation against 26,031 for full context, 67% on the LOCOMO memory benchmark. **What it keeps**: a vector store of facts plus, in the graph variant, entity edges. **What went wrong [verified — github.com/mem0ai/mem0/issues/4573, read 16 September 2026]:** an audit of one production deployment, 32 days, 10,134 entries, found **97.8% junk**. 52.7% were the same facts re-extracted repeatedly; 5.2% were hallucinated user profiles; one hallucinated fact ("user prefers Vim") reached **808 copies** because the pipeline re-extracted its own recalled memories. Switching the extraction model from a 2B local model to Claude Sonnet 4.6 "didn't fix" it, it "shifted hallucination patterns". And on contradictions **[verified — github.com/mem0ai/mem0/discussions/4787]**: duplicate detection works, but "deciding what kind of conflict each one is still needs a human" — a true contradiction and a temporal supersession look the same to the machine.

**Zep / Graphiti. [reported — arXiv 2501.13956, January 2025; README verified at github.com/getzep/graphiti]** A temporal graph: every edge has when it became true and when it stopped, plus when the system learned each. A contradicting fact **invalidates** the old edge rather than deleting it, so "what was true at any point in time" stays answerable. Ingest is incremental: "new data integrates immediately without batch recomputation". The contradiction judgement is a model call per new edge against overlapping ones. Costs grow with the number of neighbours a new fact has, not with the corpus.

**Microsoft GraphRAG. [reported — Microsoft Research blog, November 2024, and 2025–26 write-ups]** Keeps entity graph plus **community summaries at rising levels** — the "summaries at rising levels" option in the question. Their own documented failure: the summaries go stale after corpus drift and need periodic full re-indexing; indexing a corpus reportedly cost $33,000 in early 2024. Their answer, LazyGraphRAG, was to **stop storing the summaries** and derive them at query time, at "700 times lower query cost" than the global search. The people who built the rising-summaries design abandoned it because the stored layer could not be kept in agreement with the material.

**Letta sleep-time compute. [reported — arXiv 2504.13171, April 2025; letta.com blog could not be opened]** A background agent rewrites "memory blocks" while the main agent is idle. Reported 5× less test-time compute for the same accuracy, up to 13–18% accuracy gain on their tasks. The caveat that matters here: it "is more effective in settings where the query is more easily predictable from the context". Unprompted noticing is, by definition, the unpredictable-query case.

**Claude Code auto memory and Auto Dream. [reported — Anthropic documentation and third-party write-ups, March–May 2026; none could be opened]** A production system doing exactly what the nightly run would do. Users report that after 30-plus sessions the memory holds "contradictory entries, stale debugging solutions, references to files that were renamed, and relative dates that lost meaning". The consolidation pass ("Auto Dream") triggers only when **both** 24 hours have passed **and** 5 or more sessions have run; it merges duplicates, deletes contradicted facts, turns "yesterday" into a date, and rebuilds the index to under 200 lines. Two gates, not one, so that neither a long quiet stretch nor a burst of short sessions alone fires it.

**GitHub Copilot memory. [from this repository's own `docs/research/MEMORY.md`, itself a search summary]** Memories expire after 28 days unless an agent re-verifies them against the current code, in which case the clock restarts. Staleness is measured as time since last confirmed useful, not time since written.

**Two studies on what happens when you keep everything. [reported]** "How Memory Management Impacts LLM Agents" (arXiv 2505.16067, May 2025; ACL 2026): storing every experience performed **worse than no memory at all**, and strict filtering before storage gave about a 10% gain; the named failure modes are *error propagation* (a wrong stored item keeps being followed) and *misaligned replay* (a stored item that looks relevant and is not). MemTrace (arXiv 2605.28732, May 2026): memory failures "originate from earlier construction, update, or deletion operations and only surface much later during retrieval".

### What goes wrong where the structure and the material disagree

Every system above has the same story, and none has a cure, only a posture:

- **The error is silent and compounds.** Mem0's 808 copies; Copilot's stale notes; the wiki that cites itself. No system reported catching its own drift by any means other than a human reading the store.
- **The only mechanisms with evidence behind them** are: keep the raw immutable and re-derive from it (Karpathy, LazyGraphRAG); verify a stored item against ground truth before acting on it (Copilot); invalidate rather than delete (Graphiti); and refuse to store most things (the Harvard-reported study, the Mem0 audit's conclusion).

**What this means for the ledger [my reasoning].** The ledger is a *third* derived layer: raw → wiki → ledger. Each derivation is a place to drift, and the ledger will be read by the nightly check instead of the wiki, so a wrong ledger silently steers every observation. The design already has the fix available and should use it: **the filing run emits a verdict per subject per capture. The ledger should be a mechanical fold over those verdicts — no model call, regenerable from the log at any time, like the index.** Then it cannot disagree with the log. It can still disagree with the *pages*, because pages are rewritten, and that is exactly what a monthly lint is for. The ledger update being "mechanical, no model judgement" is the most important line in the current design. Keep it.

---

## 2. The noise problem

**Measured directly: when a model is asked "is there something here?" and the honest answer is no, it says yes about half the time, and it says yes about random data most of the time unless the prompt explicitly permits "nothing". Nobody has measured this on a personal diary. The guards with evidence are: permission to answer nothing, evidence that a separate call checks without seeing the claim, and refusing to store. A second call that merely "judges" the first, with no external fact to check against, has evidence against it.**

### How often the answer is worthless

**Random data. [reported — "The Idola Tribus of AI", Findings of EMNLP 2025, arXiv 2510.09709, October 2025]** Models were asked to explain the pattern in integer series, some of which were random. On the random ones the rate at which they correctly said there was no pattern: o3 52%, o4-mini 43%, Gemini 2.5 Flash Thinking 31%, GPT-4.1 8%, Llama 3.3 0%. The authors report that models "force themselves to explain patterns even when they do not find a plausible one, unless explicitly instructed to acknowledge the absence of regularities", and ran that second prompt as a control. That last clause is the whole of the design's "nothing is the ordinary answer" rule, with a measurement behind it.

**Deciding whether to speak. [verified — results table at github.com/thunlp/ProactiveAgent, read 16 September 2026; paper arXiv 2410.12361, October 2024]** ProactiveBench: 6,790 events across coding, writing and daily life, each labelled by whether the person would have wanted the assistant to step in. Asked to decide, off the shelf:

| model | recall | precision | false-alarm rate |
|---|---|---|---|
| GPT-4o-mini | 100.0% | 35.3% | 64.7% |
| GPT-4o | 98.1% | 48.2% | 51.9% |
| Claude 3.5 Sonnet | 97.9% | 45.4% | 54.6% |
| fine-tuned on the task (best) | 100.0% | 49.8% | 50.2% |

Recall near 100% and precision under 50%: **the models almost never stay silent when they should.** Fine-tuning barely moved the false-alarm rate. The reward model they validated against human labels reached an F1 of 0.918, so the labels themselves were not the problem.

**Generated findings. [reported — "Evaluating Sakana's AI Scientist", arXiv 2502.14297, February 2025]** Of the machine-written papers, **57% contained hallucinated or incorrect numerical results**, and the system "mislabeled established ideas as novel". Different task, same shape: an unprompted claim about what is interesting, with the evidence invented or misread.

**Repetition. [reported — Si, Yang & Hashimoto, "Can LLMs Generate Novel Research Ideas?", arXiv 2409.04109, September 2024; ICLR 2025]** 79 expert reviewers blind-rated machine ideas as *more* novel than human ones — the optimistic finding. The finding that matters here: of the first 500 ideas generated, half were non-repetitive; of the last 2,000, **12.5%**. Asked repeatedly, the generator says the same thing in new words. For a nightly job this is the wear-out mechanism (section 3), measured.

**The one counter-example. [reported — InsightEval, arXiv 2511.22884, November 2025; Findings of ACL 2026]** On *structured* business data with expert-written reference insights, agents were "cautious — high precision but low recall": they missed things rather than inventing them. That is the opposite failure, and the difference is the task: a table with a defined question. A diary is not that.

**This repository's own number.** A second review pass on unchanged code "produces 62% more false alarms, and precision collapses from 0.30 to 0.20. Once the real errors run out, reviewers invent them" (`AGENTS.md`, from `docs/research/WHAT-MAKES-IT-EASY.md`). A nightly "anything here?" against a slow-moving wiki is a second pass on nearly unchanged material, every night.

**Documented absence.** No study was found that measures the precision of unprompted observations about a person's own writing. The nearest, Rosebud, has one reviewer's count: about "70% insightful, 30% surface-level" on follow-up questions **[reported — a comparison blog, 2026; a single tester, no method]**.

### Guards, sorted by whether anyone measured them

| guard | evidence | strength |
|---|---|---|
| Prompt explicitly permits "nothing" as the answer | Idola Tribus control prompt changed the rate at which models declared randomness [reported]; abstention studies report avoiding roughly half of hallucinations on unanswerable questions [reported, 2025, several papers, none opened] | measured, on other tasks |
| Verification questions answered **without sight of the original claim** | Chain-of-Verification, factored variant: precision 0.17 → 0.36 on a Wikidata list task, hallucinated entities 2.95 → 0.68 per answer [reported — arXiv 2309.11495, September 2023; Findings of ACL 2024] | measured, on other tasks |
| Second call judges the first | GPT-4 as judge agrees with humans over 80% of the time on chatbot answers [reported — MT-Bench, NeurIPS 2023]; **but** "LLMs cannot self-correct reasoning yet" [reported — ICLR 2024, arXiv 2310.01798]: intrinsic self-correction without external feedback does not help and sometimes degrades | mixed: works when the judge has a fact to check, not when it has only the claim |
| Require evidence pointers | Generative Agents stores each insight with the records it drew on [verified code]; Karpathy's lint demands "the exact conflicting sentences quoted from both pages" [reported] | design practice, not measured |
| Filter before storing | add-all worse than no memory; strict filtering about +10% [reported, ACL 2026] | measured, agents not diaries |
| Thresholds and rate caps | ProactiveBench shows the model's own "should I?" is a coin flip [verified]; no study of caps on insight output found | reasoning only |
| Score against held-out material | **nothing found** | absence |

**What follows [my reasoning].** The verifier must be given the *evidence* and asked a checkable question — "does this capture say he was anxious about the move?" — not given the observation and asked "is this good?". The first is Chain-of-Verification and has a number behind it. The second is self-correction and has a number against it. And the observation must carry the captures it rests on, because that is what makes the first kind of check possible at all.

---

## 3. Journals that answer back

**Prior art is thin, short and small: the longest study is eight weeks with twenty paid students. What people keep coming back for is a reader that remembers and asks; what makes them stop is repetition, advice they did not ask for, and being shown something painful without warning. Whether being told things about yourself by a machine wears out has not been studied past two months. The indirect evidence says it does, and says why.**

**MindScape (Dartmouth). [reported — arXiv 2409.09570, September 2024; IMWUT]** 20 students, 8 weeks, paid up to $130, no control group. The app wrote journaling prompts from the phone's sensed behaviour (sleep, location, conversation). Reported: positive affect +7%, negative affect −11%, loneliness −6%, PHQ-4 falling 0.25 a week. Small, uncontrolled, and the prompts were *questions*, not observations. The qualitative section on repetitiveness could not be opened.

**DiaryMate. [reported — CHI 2024, DOI 10.1145/3613904.3642693]** 24 participants, 10 days, a model that offered sentences while they wrote. Participants used the suggestions to see their day "from multiple perspectives", and the authors observed them "over-relying on the LLM, often prioritizing its emotional expressions over their own". Ten days was enough for that to show.

**ExploreSelf. [reported — CHI 2025, DOI 10.1145/3706598.3713883]** 19 participants. What they valued was **control** over where the reflection went — themes, questions and a summary they could steer — and perceived agency rose. The design lesson the authors draw is that "current systems often limit users' flexibility to direct their reflections".

**Rosebud, the commercial case. [reported — help.rosebud.app and comparison blogs, 2026; the vendor's comparison page could not be opened]** Weekly report of "up to five key insights"; a deeper analysis unlocks past 1,500 words in a week. Praised for connecting entries across weeks and for prompts "relevant to what they've written before, not generic". The recurring complaint that drives people to alternatives: "responses becoming repetitive or generic after months of use". A calendar cadence, a word-count gate, and wear-out at the months scale.

**Woebot. [reported — JMIR 2023 engagement study, PMC10612009; STAT, July 2025]** In an 8-week trial "use was highest early in treatment and declined over the 8 weeks", and more use did not mean better outcomes. The consumer app closed on 30 June 2025 — the founder cites regulation and the market, not efficacy — so the closure is not evidence about wear-out, but the engagement curve is.

**Companion apps generally. [reported — industry blogs, 2025–26; weak sourcing]** Typical 30-day retention 8–18%; the products that hold users are the ones whose memory "compounds". Treat as direction, not number.

**What one bad answer costs. [reported — Apple, "Feedback Effect in User Interaction with Intelligent Assistants", arXiv 2303.10255, March 2023]** From production assistant logs: one unhelpful interaction reduces the probability of re-engagement by up to 3.2% over the following two weeks, peaking about 24 hours later; over time users "adjust the scope and wording of their requests" to what the assistant can handle, or leave. The second effect is the one to fear: **he will start writing for what the reader can use.**

### Tone

**[reported — a pair of preregistered studies on mental-health chatbot communication, PubMed 42290401, 2025; a JMIR comparison of therapists and chatbots, 2025; a systematic review, 2024]** The consistent finding across them: reflective listening and questions that "evoke" are the most valued; "excessive problem-solving coupled with advice" and "directive advice without sufficient inquiry" are the named failure. People also expect the system to bring up relevant things from earlier conversations — that is the feature they want from memory. None of these studies tested *observations about the person* as a distinct mode; the owner's own words ("providing their insights") sit between "reflection" and "advice", and the evidence favours the reflective end.

**The retrospective products, which are the closest thing to a system that notices things about your life. [reported — Meyer, "Inadvertent Algorithmic Cruelty", 24 December 2014; Facebook On This Day preferences, October 2015; Google Photos memory controls, 2021–23]** Facebook's Year in Review put a photograph of Eric Meyer's daughter, who had died that year, under party clip-art and "Here's what your year looked like". His diagnosis: "the result of code that works in the overwhelming majority of cases, reminding people of the awesomeness of their years", and it fails for anyone whose year held "the death of loved ones, hospital stays, divorce, or job loss". His fix, adopted in some form by Facebook within a year and by Google Photos later: **do not auto-show; preview, opt in, and let people filter by person and by date.** A diary is *made* of the material these products stumbled on. The noticing run will, sooner or later, correctly identify the theme of a bad month and present it as an insight.

### Does it wear out?

**Documented absence:** no longitudinal study past eight weeks, and none on observation-mode specifically. **[my reasoning]** The indirect evidence gives a mechanism, which is more useful than a number: the generator repeats itself (Si et al., 12.5% new by the end), the person notices (Rosebud, "repetitive after months"), each repeat is an unhelpful interaction (Apple, −3.2%, peak at 24 hours — exactly the cadence of a nightly run), and they narrow what they give it. The design's own rate limit is therefore not a cost control; it is the wear-out control.

---

## 4. Triggering

**Published rules exist and are few. Nobody has published a threshold for a personal diary. Here is what is published, then what I would start with and why.**

| system | rule | source |
|---|---|---|
| Generative Agents | reflect when the sum of importance scores since last reflection reaches 150 (scores 1–10); read only the records since then; 3 questions, 5 insights each, with evidence pointers | [verified — code] |
| Claude Code Auto Dream | consolidate when **both** 24 hours have passed **and** 5 or more sessions ran | [reported] |
| Rosebud | every week; deeper report past 1,500 words in the week | [reported] |
| Copilot memory | expire at 28 days unless re-verified | [repo research, summary] |
| Kleinberg burst detection (2002) | a term is bursting when its rate departs from **its own baseline** enough to justify a state change; no fixed count | [reported] |
| Mem0 | NOOP if the model, shown the nearest existing memories, judges the fact already held; only exact-hash dedup afterwards | [verified — discussion] |
| Graphiti | contradiction when a new edge's validity period overlaps an existing edge's and the model judges them incompatible | [verified — README] |

Secondary write-ups on the 150 threshold say what any builder would expect: too high and it never fires, too low and reflections "fire constantly and dilute each other" **[reported]**. No one reports having tuned it against outcomes.

**What I would start with [my reasoning, from the base rates].**

First the arithmetic that the current draft skips. At 5–20 captures a day, a fortnight holds 70–280 captures. If the filing makes or touches a subject for most captures, then "a subject returned to several times in a fortnight" will be true of *most active subjects most fortnights* — the threshold trips on his ordinary life. Kleinberg's point is the fix: **a theme is a departure from that subject's own baseline, not an absolute count.**

- **Return.** Trip when a subject's fortnight count is at least 3 **and** at least three times its trailing eight-week weekly mean. A subject with no history has no baseline; for those require at least 4 captures across at least two different weeks. Both numbers are guesses meant to be replaced after eight weeks of ledger.
- **Pairing.** Two subjects filed from the same capture at least 3 times in the fortnight, **and** neither page links the other. The second clause is novelty against what is already written, and it is a grep, not a model call.
- **Contradiction.** Do not build a detector. The filing already returns *correction* as a verdict; that is the contradiction signal, and Mem0's experience says the machine cannot reliably tell a contradiction from a change of mind anyway. Trip an observation only when one page receives 2 or more corrections in a fortnight — he is revising something, which is a theme in itself.
- **Convergence.** Per subject, the share of verdicts that are "nothing, already says this". Rising means the subject has settled; a settled subject that suddenly produces additions is the interesting case, and it is one ledger column away.
- **Cap.** At most one observation a week, and the ledger records how many candidates it suppressed. Reason: ProactiveBench's coin-flip and Apple's 24-hour inhibition; the reader's tolerance is the scarce resource, not the model's.
- **The slow sweep.** Monthly, not nightly. Read the index (one line per page), not the pages, and ask for **one question**, not an insight — the shape ExploreSelf found people valued and Karpathy's lint is good at ("the LLM being good at suggesting new questions to investigate"). Karpathy's own scale note says this is affordable at hundreds of pages and not beyond; when the index outgrows a comfortable read, the sweep needs a design of its own, not a bigger context.

---

## 5. Unprompted external research

**There is one product doing this at scale, launched a year ago, and a decade of proactive assistants before it. What went wrong is the same list the question predicted, with two additions: the person has to keep teaching it what to look for, and it goes to the most expensive tier.**

**ChatGPT Pulse. [reported — openai.com announcement, 25 September 2025, could not be opened; The Verge, Tom's Guide, and several reviews, September–December 2025]** Overnight research from chat history, memory, connected calendar and email; a set of cards each morning; cards **expire after 24 hours** unless saved, "a deliberate guardrail against infinite scrolling"; thumbs up and down on each card, plus a "curate" box where the person writes what to look for. Released **to the $200-a-month Pro tier only**, mobile only, with a stated plan to widen once they had learned from early use. Reception, a year on: useful for people "actively managing complex schedules and long-term projects" who "engage with the feedback loop"; "overhead" and generic for everyone else; discussion "dominated by privacy concerns". The feedback loop is not a nicety. Without it Pulse researches what it guesses, and the reviewers who liked it were the ones who told it what to research.

**Google Now. [reported — Wikipedia and Android Central, 2016–17]** Proactive cards, 2012; folded into a feed and then into Assistant by 2016–17; the cards users valued (commute, appointments) were "relegated to a second press and a different interface". The proactive surface did not survive contact with a product roadmap. Not evidence about the idea; evidence that it is hard to keep.

**The measured false-alarm rate is in section 2:** roughly half the time the model decides the person wants help, they did not **[verified — ProactiveBench]**. That is the "researching the wrong subject" failure, measured before any research is done.

**Drift inside the research itself. [reported — deep-research evaluation write-ups, 2025–26; a Deep Research survey, arXiv 2508.12752]** The named failure is scope drift mid-run: the agent answers "a reframed adjacent question" and the final report looks fine; evaluators now score whether "the executed sub-question graph covers the scope the user asked about" separately from the answer. For Zibaldone the "user" is a machine's guess about what he is wrestling with, so there are two guesses stacked before any page is read.

**Provenance. [reported — NotebookLM design write-ups, 2024–26]** Google's NotebookLM took the opposite decision on purpose: it is "architecturally forbidden from wandering off your sources", every claim is cited to a passage the person uploaded, and even so reviewers report "interpretive drift" — a cited opinion becomes a factual declaration. And the Mem0 audit's 808 copies **[verified]** is what happens when fetched or generated material is put back where the extractor will read it again. The owner losing track of what is his and what was fetched is not a hypothetical; it is the default outcome of writing fetched material into the wiki.

**Cost [my estimate, prices verified in `filing-research.md` on 15 September 2026].** One research pass that reads twenty web pages of about 3,000 tokens each and writes a 1,500-word page is roughly 60,000 tokens in and 2,000 out — about 17p on Sonnet 5, about 40p on Opus 5. Cheap per run. The Pulse lesson is not that it is expensive per run but that OpenAI gated it to the tier where unlimited daily runs could be absorbed; a nightly unprompted run is the wrong cadence for something that is right about the subject half the time.

**What follows [my reasoning].** Fetched material goes into **raw**, as its own capture, with the source and the date, exactly as his own captures do — never into his pages. The observation page cites both his captures and the fetched captures, and the filing treats fetched captures as a distinct kind so that "nothing, already says this" can never be satisfied by something the machine wrote last week. And research should begin as *prompted-by-a-tap*: an observation ends with "look into this?", and the research runs on yes. That is the Pulse feedback loop with the person's intent obtained before the money is spent, not after.

---

## 6. What the design has not thought of

**The reader changes the writer.** Every guard in this design protects the *reader* from noise. Nothing in it notices when the *writer* starts to change what he writes because he knows it is read.

The evidence that he will:

- DiaryMate's participants, in ten days, were "prioritizing its emotional expressions over their own" **[reported, CHI 2024]**.
- Apple's assistant users learned to "adjust the scope and wording of their requests" to what got a useful reply **[reported, 2023]**.
- Pennebaker's expressive-writing work, the strongest evidence that a diary does a person good, finds the largest benefits for "previously undisclosed" material and notes that some people "get to the heart of their issues more quickly without an audience" **[reported — secondary summaries; the original studies were not opened]**.

Now put that next to the design's own success measure. The filing counts it a success when "nothing" and "amended" outnumber "new page" after a fortnight. **He can make that number good by writing less, or by writing only the kind of thing the machine files cleanly.** The ledger would report convergence. The mind would be shrinking. Nothing in the design can tell those apart, because nothing in it watches the input rate.

The same blind spot has a second face: **the design has no feedback channel at all.** There is no place for him to say "yes, that" or "no" to an observation. Without it none of the precision guards in section 2 can be measured on his material, the wear-out in section 3 cannot be seen until he has already stopped, and the research trigger in section 5 has nothing to learn from. Pulse's reviewers were explicit that the feedback loop was the product. Rosebud's weekly report has no such loop and is the one with "repetitive after months".

---

## Recommendation

**Build:**

1. **The ledger, as a fold over the filing log with no model in it.** Regenerable from the log at any time, like the index. *Why: it is the only one of the three layers that can be made unable to drift, and every stored structure surveyed drifted silently.*
2. **Relative thresholds, from section 4, with the numbers written down as guesses and a date to revisit them** — eight weeks of ledger. *Why: absolute counts trip on his ordinary life at his capture rate; Kleinberg's baseline idea is thirty years old and still the one used.*
3. **One observation a week at most, with the suppressed count reported beside the weeks-with-nothing count.** *Why: the model says "yes, speak" half the time it should not, and each unneeded one costs re-engagement for a day.*
4. **An observation is a claim plus the quoted captures it rests on, at least two, and a separate call that is shown the captures and the claim's factual parts and asked whether the captures say that — never shown the observation and asked if it is good.** *Why: the first has a measured doubling of precision; the second has a measured null.*
5. **The prompt permits "nothing" in so many words, every time.** *Why: the Idola Tribus control prompt is the only measured intervention on exactly this failure.*
6. **A one-line headline he can dismiss without opening, and a way to say "not this subject" and "not this period".** *Why: Meyer, 2014, and every retrospective product since; a diary is made of the material they got wrong.*
7. **Two buttons on every observation: useful / not, and "look into this?".** *Why: without the first nothing in sections 2 and 3 can be measured; without the second, external research is a guess about a guess.*
8. **Fetched material into raw as its own kind of capture, with source and date, and the filing told which kind it is reading.** *Why: the 808 copies.*

**Do not build, yet:**

- **Unprompted external research.** Start it prompted by a tap. Revisit when the useful/not ratio on observations has a history. *Why: every failure in section 5 is a failure of guessing the subject, and the tap removes the guess.*
- **A contradiction detector.** The filing's *correction* verdict is the signal. *Why: Mem0's maintainers say the classification "still needs a human", and a second detector is a second thing to drift.*
- **The nightly slow sweep.** Monthly, over the index only, asking for a question. *Why: whole-corpus reads are what every system above found expensive, and questions are what the journaling studies found people valued.*

**Measure, from the first week:**

| number | what it tells you | where it comes from |
|---|---|---|
| captures per week, before and after observations begin | whether the reader is shrinking the writer — **the canary** | the raw store |
| observations shown / dismissed unopened / opened / marked useful | precision, in his terms | the two buttons |
| weeks with nothing, and candidates suppressed by the cap | whether "nothing" is being honoured or evaded | the ledger |
| verifier rejections | how often the first call invented its evidence | the second call |
| near-duplicate rate against previous observations | wear-out, before he feels it | text similarity, no model |
| whether the next fortnight's captures touch the theme | the only held-out score available; a theme that predicts nothing was noise | the ledger |

**If the canary falls**, stop the observations and keep filing. *Why: the filing is worth having on its own, and a second mind that makes the first one quieter has failed at the only thing it is for.*

---

## What this session did not do

It could not open any paper directly: arXiv, ACL, ACM, PubMed Central, Semantic Scholar, Hugging Face, alphaXiv, Letta, OpenAI, Apple, Substack, Medium and dev.to were all refused by the proxy. Every number marked [reported] should be checked at source by whoever builds from it; the ones a decision rests on are the ProactiveBench table (which *was* verified), the Idola Tribus rates, the Chain-of-Verification precision figures, and the DiaryMate finding. It did not measure anything on the owner's own captures. It did not price a real noticing run; the one cost figure is an estimate from the prices in `filing-research.md`. And it found no study of unprompted observation on personal writing at all, which is the finding: this is being built ahead of the evidence, and the measurements above are how it will make its own.
