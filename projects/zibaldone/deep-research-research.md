# Deep research: what the evidence says before the weekly report is built

*Research done on 16 September 2026, against the owner's ask for a weekly
"deep mind scan" — agents that read his pages, go out to the internet, and
write a detailed report about one thing he is living with. It follows
`projects/zibaldone/noticing-research.md` and
`projects/zibaldone/memory-research.md`, both of the same day, and takes
their findings as given: models invent patterns when there are none, a
person's stated view in the prompt makes the answer agree with it, the model
rewriting its own words is where memory goes wrong, and hedges harden into
facts on the way through a summary. Nothing below argues with those; several
things below rest on them.*

**Nothing here binds.** It becomes a decision when it reaches a scope page and
the owner says yes.

**How to read the marks.** This session could open GitHub, the Claude Code
documentation and the Claude platform documentation, and nothing else that
mattered: arXiv, OpenAI, Anthropic's main site, Google, Wikipedia, Hugging
Face, GitHub Pages, the Internet Archive and the Jina reader were all refused
by the proxy, by both the shell and the fetch tool. So, as in the two earlier
jobs: **[verified]** means read at the source named; **[reported]** means it
came back in a search summary and the original could not be opened, so the
number is the summary's and not the paper's; **[my reasoning]** means
judgement or arithmetic, with what it rests on said. Section 4 has more to say
about that, because it turns out to be the finding.

**The one sentence.** Deep research is a solved product and an unsolved
measurement: every vendor has one, the independent scores are close together
and rest on model judges, and nobody has built one that starts from a person's
own dated words and goes outward. That gap is the whole opportunity, and the
same gap is why the first version must be small.

---

## 1. What exists, and what is measured about it

### The systems

| system | what it does, step by step | time and cost | measured by anyone but its makers |
|---|---|---|---|
| **OpenAI Deep Research** (Feb 2025) | asks clarifying questions, makes a plan, searches and reads pages and PDFs, cross-references, writes a cited report. Since Feb 2026 on a GPT-5.2-based model; the original mode was removed on 26 March 2026; the standalone API models shut on 23 July 2026, replaced by a general model plus a search tool [all reported] | 5–30 minutes; 25 a month on Plus, 250 on Pro, 5 free; API ran $1.50–$8 a query [reported] | best on instruction-following in DeepResearch Bench; best system on Mind2Web 2 at 50–70% of human performance in half the time; **beaten on FutureSearch's bench by the same lab's plain model with search on, despite the longer run** [all reported] |
| **Gemini Deep Research** (Dec 2024) | turns the prompt into an editable plan, browses in loops — search, read, spot a gap, search again — reads 20–100 or more sources, writes a 10–20 page report; since Nov 2025 also reads Gmail, Drive and Chat; "Personal Intelligence" over Gmail, Photos and search history from Jan 2026, opt-in [reported] | Pro $19.99: 20 reports a day [reported] | most effective citations of any system on DeepResearch Bench (111.21 per task) but lower citation accuracy than Perplexity; best factual accuracy on PDR-Bench (8.40 of 10) [reported] |
| **Perplexity Deep Research** | search-first; the model with the fewest wrong citations [reported] | $0.50–$3 a query on the API; $5 per thousand searches on top of tokens [reported] | citation accuracy 90.24% on DeepResearch Bench, the highest [reported] |
| **Claude Research / Advanced Research** (Anthropic) | a lead agent plans, spins up 3–5 subagents in parallel, synthesises, then a separate citation pass; searches the web and connected apps [reported] | most reports 5–15 minutes, up to 45; Max, Team and Enterprise [reported] | Anthropic's own: 90.2% better than a single Opus 4 agent on an internal eval, **at about 15 times the tokens of a chat**; token use explained 80% of the variance on BrowseComp [reported — the blog could not be opened]. FutureSearch: the three frontier labs "roughly tied" [reported] |
| **STORM / Co-STORM** (Stanford, NAACL and EMNLP 2024) | discovers perspectives by reading articles on similar topics, simulates conversations between a writer and an expert grounded in fetched pages, builds an outline, then writes with citations; Co-STORM adds a moderator that raises questions from what was retrieved but not yet used, and a live mind map [verified — README, github.com/stanford-oval/storm] | **no cost, token or time figure anywhere in the README** [verified] | expert Wikipedia editors: +25% on structure, +10% on coverage against a search-and-write baseline; about 85% citation precision and recall; the remaining errors are "improper inferential linking" and inaccurate paraphrase, not invented sources; the experts also saw "the bias of internet sources transferred" and "connections between actually independent facts" [reported]. Poisonable: about 13 words added to one Reddit or Wikipedia page the agent keeps retrieving got the attacker's content mentioned in 38–51% of the related queries in which that page came back from search; Co-STORM cited the poisoned page every time it was retrieved [reported — arXiv 2605.24245, May 2026] |
| **GPT Researcher** (open source) | make a task agent, generate the questions "that collectively form an objective opinion", a crawler per question with JavaScript-enabled scraping, summarise and source-track each page, aggregate; "over 20 sources" [verified — README] | deep mode: "~$0.4 per research" and "~5 minutes" on o3-mini [verified — README, its own claim] | none found |
| **LangChain Open Deep Research** | supervisor delegates to parallel researchers; results summarised and compressed; a final writing model [verified — README] | **the full 100-task DeepResearch Bench run cost $45.98 and 58,015,332 tokens — about 46 cents and 580,000 tokens a report** in the default configuration [verified — README, Aug 2025] | ranked 6th on DeepResearch Bench at 0.4344; 0.4943 with GPT-5 [verified — README, self-submitted] |
| **Tongyi DeepResearch** (Alibaba, Sep 2025) | one 30-billion-parameter model with search, a page-visit tool, a scholar search and a code sandbox; a "heavy" mode that runs several attempts [verified — README for the tools; sizes reported] | up to 128 tool calls and a 128,000-token context per task [reported] | its own benchmark table only [verified — README] |
| **ChatGPT Pulse** (25 Sep 2025 – about 1 Jul 2026) | overnight research from chat history, memory and connected apps; cards each morning; thumbs and a "curate" box | Pro only, then **retired on 17 June 2026 with 14 days' notice, replaced by scheduled tasks the person writes themselves** [reported] | reviewers: useful for those who "engage with the feedback loop"; generic for everyone else [reported] |
| **NotebookLM Deep Research** (Nov 2025) | researches the web and offers the report and its sources as new sources in the notebook, beside the person's own [reported] | — | one reviewer "disappointed" [reported] |

### The benchmarks, and how far to trust them

- **DeepResearch Bench** [verified — github.com/Ayanami0730/deep_research_bench, read 16 September 2026]: 100 PhD-level tasks in 22 fields; reports scored on comprehensiveness, insight, instruction-following and readability against a reference, and citations scored by extracting each claim and checking whether the cited page supports it. Published at ICLR 2026; a second version on 6 February 2026. **The judge is a model**: it switched from Gemini 2.5 Pro to GPT-5.5 on 11 May 2026 because GPT-5.5 agreed with human raters 71.82% of the time, against a 68.78% baseline. So every score above is a model's opinion that agrees with people about seven times in ten.
- **FutureSearch Deep Research Bench** [reported — arXiv 2506.06287, June 2025]: 89 tasks with answers worked out by people. Its failure catalogue is the useful part: agents "give up too early" and "repeat the same failed search" — one product ran essentially the same query six times rather than change approach. FutureSearch sells research; weigh accordingly.
- **Mind2Web 2** [reported — NeurIPS 2025]: 130 long tasks, 1,000 hours of human labour, judged by task-specific judge agents that agreed with humans 99% of the time, and every answer must carry the URL of each critical fact.
- **BrowseComp and BrowseComp-Plus** [reported; the Plus repository exists, verified]: 1,266 hard-to-find facts; Plus fixes the corpus so retrieval can be controlled. Section 4 uses one of its ablations.
- **Citation reliability across all of them** [reported — Rao, Wong and Callison-Burch, arXiv 2604.03173, April 2026]: over 221,000 cited URLs; **3–13% never existed** (no record even in the Wayback Machine) and 5–18% do not resolve; deep research agents cite more than search-augmented models and **fabricate URLs at a higher rate**; a tool that checks every URL against the archive before the report is written cut dead links to under 1%.

**What this means for Zibaldone [my reasoning].** Three things. The independent scores separate the products by a few points on a model judge, so the choice of vendor or framework is not where quality will come from. The one lesson that repeats — Mind2Web 2, DeepResearch Bench's FACT score, the Rao study — is that **the citation is the product**: a report is as good as the fraction of its sentences that a checker can trace to a page that says that. And the one cost figure that was read at source, 46 cents and 580,000 tokens a report for a full open-source pipeline, is the number to plan against.

---

## 2. Research grounded in one person's own material

**Nobody found has built research that starts from a private record of a person's life and goes outward. The two academic lines that call themselves "personalised deep research" start from a profile and a question the person typed. The products that read personal data read it to answer a question the person asked, or, in Pulse's case, to guess a topic — and Pulse was shut down nine months in and replaced by the person writing the brief. Documented absence, with three near-misses.**

**PDR-Bench** [verified — github.com/OPPO-PersonalAI/PersonalizedDeepResearchBench, read 16 September 2026; paper arXiv 2509.25106, ICLR 2026]: 50 research tasks in 10 domains paired with 25 personas — "age, occupation, lifestyle, financial traits" plus a dynamic context — giving 250 queries. Reports are scored on personalisation (goal, content, presentation, actionability), quality, and reliability (factual accuracy and citation coverage). **The finding that matters here: the systems that personalised best were the least reliable.** The top open-source agent scored 6.64 on personalisation and 3.77 of 10 on factual accuracy; Gemini's Deep Research scored 6.58 overall with 8.40 on factual accuracy and 9.26 on citation coverage. Tailoring to the person and telling the truth pulled in opposite directions across the whole table.

**"Personalized Deep Research"** [reported — SIGIR 2026, arXiv 2605.10530, May 2026]: extends the plan-search-write pipeline with four modules — profile extraction, personalised question development, a two-stage retrieval, and personalised report generation. Its stated concern is "reports aligning closely with individual preferences and established user writing patterns". The person still supplies the question; the profile shapes the answer. Synthetic users.

**The products.** Gemini Deep Research has read Gmail and Drive since November 2025 and its help pages say every source is linked; **nothing found says whether a sentence from his own email is marked differently from a sentence from the web** [reported]. NotebookLM adds the research report and its sources as further sources beside the person's own, which is the Karpathy raw-folder move made into a button [reported]. Pulse read chat history and memory to choose the morning's topics, and the reviewers who liked it were the ones who used the "curate" box to say what to look for [reported]; it was retired on 17 June 2026 and what replaced it is a scheduled task the person writes [reported]. That is the one deployment of "guess the subject from the person's own material" at scale, and the vendor's answer after nine months was to give the choosing back to the person.

**The practitioners.** Karpathy's wiki has a raw folder that takes "web clips, transcripts, articles" alongside the person's own notes, and people running it report using it for their own research, with wikis of "over 100 articles and 400,000 words" [reported — write-ups, April–September 2026]. Nothing measured; the gist itself, as the memory research already found, gives no numbers of any kind.

**What was learned, such as it is [my reasoning from the above].** Two things carry over. First, PDR-Bench's trade-off is the exact risk of this design: the more the report leans on his words, the more it is measured to invent, and the fix the benchmark implies is to score factual reliability separately and never let personalisation excuse it. Second, Pulse's arc says the guess is the weak part. Both earlier jobs said the same from other evidence: the model decides to speak when it should not about half the time. So the innovation in section 8 cannot be a better guesser. It has to be a design in which the question is his, in his words, and the machine only goes to find out.

---

## 3. Keeping his words apart from fetched material, inside one document

**Prior art for the line is old and durable; prior art for holding it inside a machine-written document is a year old and already failing in measured ways. The oldest convention that survived is a page layout, not a citation style.**

### What has held for centuries

- **The Talmud page** [reported — Hadran, the National Library of Israel blog, and the Talmud Blog; none opened]: the original text sits in the centre in the largest square type; the commentary of Rashi in the inner margin, the Tosafot in the outer, both in a different semi-cursive face "suggestive of marginal notes one might make while reading"; later centuries' commentary further out. The layout was fixed by Daniel Bomberg's press in Venice in the 1520s and **every printed edition since has kept it**. The reader knows at a glance which century is speaking, and the centre never moves.
- **The critical edition** [reported — TEI Guidelines, chapter on the critical apparatus]: the *lemma* is "the reading accepted as that of the base text"; every variant and every editor's note is an entry keyed to it and printed apart from it. The base text is not rewritten to absorb the notes.
- **The Zettelkasten** [reported — Ahrens, and the zettelkasten.de commentary]: a literature note stays with its source; a permanent note is written in one's own words and is a separate thing. The separation is the method, not a filing choice.
- **This design's own ancestors**: Karpathy's raw-versus-wiki line, verified by the noticing research; Zep's rule that every derived fact points at the raw passage it came from, verified by the memory research.

### What goes wrong when a machine holds the line

- **Quotes get changed.** The EBU and BBC audit of assistants on news, 14 languages and 18 countries [reported — October 2025]: 45% of answers had a significant issue, **31% had sourcing problems** — missing, misleading or wrong attribution — and "at times quotes are altered … and sometimes assistants appeared to fabricate quotes completely". Gemini was worst at 76%, "largely due to its poor sourcing".
- **Paraphrase drifts.** STORM's remaining errors are "inaccurate paraphrasing" and inferential links the source does not make [reported]. The memory research's "Manufactured Confidence" is the same mechanism on the person's side: "might" becomes "is".
- **Fetched words are re-read as his.** The noticing research's 808 copies. And NotebookLM, which is "architecturally forbidden from wandering off your sources", still shows "interpretive drift" — a cited opinion returned as fact [reported by the noticing research].
- **The world's words rot and his do not.** Pew [reported — May 2024]: 38% of pages that existed in 2013 were gone by October 2023; a quarter of all pages from 2013–2023; 54% of Wikipedia articles have at least one dead reference; a fifth of pages from 2021 were gone two years later. In a year, some of what the report links will be unreachable, while every capture it quotes is still in the log. A link is not a record.
- **Nothing found measures a mixed document's legibility after a year.** Documented absence.

**What follows [my reasoning].** Three voices on one page, each in its own register and never paraphrased into another, is the Talmud's answer and it is also the one this design can enforce mechanically:

1. **His words**, quoted exactly from the capture, with its date. Never paraphrased in the report. If the report needs to say what he meant, it says "he wrote:" and quotes.
2. **The world's words**, quoted exactly from the page, with the URL, the date it was fetched, and the quoted passage kept — because Pew says the link alone will not survive. Where a page has been archived, the archive address too.
3. **The machine's words**, and every sentence of them must point at one of the first two. A sentence that points at neither is the thing the provenance sample (memory research, recommendation 6) catches.

The document that results is not a report that cites him. It is his page, glossed. Section 8 makes that the design. The layout answer — his sentence in the centre, the finding beside it — happens to be the look the app already has: cream paper, brown ink, margin notes.

---

## 4. Reading versus searching

**There is measured evidence, from one controlled benchmark and one vendor's own analysis, that an agent which opens its sources does better; the effect is real and not large; and reading is not "dump the page into the context". The finding that matters more is about this workshop: in its own cloud environment, on 16 September 2026, the agent could not read most of the web at all, and the tool it is given for reading is itself a summary.**

### The evidence

- **BrowseComp-Plus ablation** [reported — arXiv 2508.06600, ACL 2026; the repository exists but its README carries no numbers, verified]: with search results truncated to 512-token previews, GPT-4.1 scored 35.4%; given a tool that fetches the full document it scored 43.6%, using about 1.8 full reads a question. The authors: "preview truncation is not merely a latency optimization; it materially shapes the reasoning regime". Given all the right documents up front, the same model scored 93.5% — so most of the remaining gap is finding, not reading.
- **Anthropic's own analysis** [reported — engineering blog, June 2025]: on BrowseComp, token use explained 80% of the variance in performance, tool calls and model choice most of the rest. More reading, more right.
- **Against whole-page reading** [reported — "Search, Inspect, Fetch", arXiv 2608.02751, August 2026]: "whole-webpage visits are a poor match for how webpages are organized"; structured access to parts of a page did better.
- **Against long runs as such** [reported — FutureSearch]: OpenAI's plain model with search on beat OpenAI Deep Research "despite the much longer runtime of the latter".
- **The professional systems all read** [verified for GPT Researcher, "JavaScript-enabled web scraping", and Tongyi, a page-visit tool; reported for the rest]. The visit tool's standard shape [reported — Tongyi technical report]: fetch the page, strip it to text, then **the same model summarises it against a stated goal**. Reading, in the systems that score well, means fetch and then extract toward the question — not snippet, and not raw dump.

### How an agent is actually made to read, and what it costs

- **Tokens.** Anthropic's platform pricing page [verified — platform.claude.com, read 16 September 2026]: an average 10-kilobyte page is about 2,500 tokens; a large documentation page about 25,000; a research paper PDF about 125,000. Web fetch on the API costs nothing beyond those tokens; web search costs $10 per thousand searches. Twenty sources read in full is somewhere between 50,000 and 300,000 input tokens depending on how many are long, and in a single-agent loop the context is re-sent every turn at a tenth of the price once cached.
- **Time.** One fetch-and-read turn is tens of seconds; twenty sources sequentially is 20–40 minutes, which is the same band as every product above [my reasoning from their stated times].
- **Claude Code's reading tool is a summary.** The fetch tool available to a Claude Code session "converts the page to markdown, and answers `prompt` against it using a small fast model" [verified — the tool's own description in this session]. Reverse-engineering write-ups add [reported — Shilkov, October 2025; Lin, April 2026]: text truncated at about 100 kilobytes, then a small model with an empty system prompt answers the question "based only on the content"; the main model never sees the page unless it was already markdown under 100,000 characters. **So the default "read" in Claude Code is exactly the [reported] mark this document uses: a summary by a smaller model, steered by whatever question the agent thought to ask.** To read in the sense this job means, the session has to fetch the page itself — with the shell — and take the text into its own context.
- **And this environment could not.** Both earlier jobs said arXiv, OpenAI and the rest refused them. This session tested it directly [verified, 16 September 2026]: of 24 addresses tried from the shell, 22 could not be tunnelled through the proxy at all, GitHub answered with a refusal of its own, and only the Claude Code documentation opened; the fetch tool reached GitHub and the Claude documentation and was refused everywhere else, GitHub Pages, the Internet Archive and a reader proxy included. **A Routine runs in a cloud environment whose default network access allows "only the default allowlist of package registries, cloud provider APIs, container registries, and common development domains"; anything else is a setting the owner changes to Custom or Full** [verified — code.claude.com/docs/en/routines].

**What this means for Zibaldone [my reasoning].** The question "does reading beat searching" has an answer — yes, by about eight points on the one clean test, and more when the tokens are actually spent — but the question that decides this build is "can it read at all", and today the answer is no. The research run needs its own environment with network access set to Full or to a list, and the run should fetch with the shell and read the text, using the summarising tool only to decide whether a page is worth the full read. That is a configuration and a prompt, not a cost. And the aquarium forums, the immigration department's pages and the coding documentation are exactly the kind of long, structured pages that the August 2026 paper says to read in parts: fetch, find the section, quote the section.

---

## 5. Choosing what to research

**Published rules exist and are few; none has been measured against whether the person found the result worth reading. The one product that chose for the person was shut down and replaced by the person choosing. Documented absence, then what to start with.**

| rule | where | evidence it produced something worth reading |
|---|---|---|
| Choose from memory, chat history and connected apps, corrected by thumbs and a "curate" box | ChatGPT Pulse [reported] | reviewers valued it in proportion to how much they told it what to look for; retired July 2026 |
| Reflect when accumulated importance crosses a fixed threshold; ask three "focal" questions about what has accumulated | Generative Agents [verified by the noticing research] | believability of simulated characters only |
| A subject is worth attention when its rate departs from its own baseline | Kleinberg, 2002 [reported] | none on people |
| Retrieve when the agent's own uncertainty crosses a threshold; "curiosity" as information gain | mobile agents, Jan 2026; proactive conversational agents, CHI 2025 [reported] | task benchmarks; no reader study |
| Weekly, past a word count | Rosebud [reported by the noticing research] | one reviewer; "repetitive after months" |
| Ask the model whether to act | ProactiveBench [verified by the noticing research] | false alarm about half the time |

**What to start with [my reasoning].** Three sources of choice, in this order, and the ledger records which one chose:

1. **His own open questions.** A capture that hedges — "maybe", "not sure", "I wonder whether", "should I" — is a question he asked himself. The memory research already says hedges must be kept as hedges; the filing can mark a capture as carrying one, mechanically, the way the ledger records verdicts. The subject with the most unresolved questions of his own is the subject to research, and the question researched is his sentence. That removes the guess ProactiveBench measured, because nothing is being guessed. It also makes "nothing this week" an ordinary answer: no open questions, no run.
2. **The noticing's tap.** The noticing research's recommendation 7 — an observation ends with "look into this?" and research runs on yes — stands. It is the Pulse curate box with intent obtained before the money is spent.
3. **A visible rotation as the floor.** Every concrete subject gets a turn in order, so nothing starves and he can see the order. Rotation is the dullest rule and the only one that cannot be wrong about him.

And two rules about which subjects are eligible, both from the earlier jobs' evidence rather than from anything new: **named people are never a subject** (a report researching a person he knows is a different product and a worse one), and **the feelings pages are never read by the research run** — not as a policy the prompt states but as a room the run cannot enter, in section 8.

---

## 6. What it costs

**Per pass, at list price, one to four dollars. On his subscription, one Routine run a week out of a daily cap of fifteen, drawing on a weekly allowance that a single research pass barely dents. "Nothing beyond hosting" survives, with three conditions, one of which is a warning the repository already carries.**

### The arithmetic [my reasoning; prices verified at platform.claude.com on 16 September 2026]

A single-agent pass that reads twenty sources in full — fifteen ordinary pages at about 4,000 tokens and five long ones at about 25,000 — takes in roughly 185,000 tokens of source text. Over forty turns the context is re-sent each time; call the average context 100,000 tokens, so about four million cached input tokens, plus the 185,000 written once, plus perhaps 30,000 output tokens for thinking, tool calls and a report of two to three thousand words on the newer tokenizer.

| | Sonnet 5 | Opus 5 |
|---|---|---|
| cached re-reads, ~4M tokens | $0.80 | $2.00 |
| first reads, ~185k tokens | $0.37 | $0.93 |
| output, ~30k tokens | $0.30 | $0.75 |
| **one pass** | **about $1.50** | **about $3.70** |

That sits inside the bands the products charge — OpenAI $1.50–$8, Perplexity $0.50–$3 [reported] — and is three to eight times LangChain's measured 46 cents [verified], which used cheaper models and summarised rather than read. A multi-agent pass, at Anthropic's stated 15 times a chat's tokens [reported], would be several times this; one subject a week does not need it, because the whole reason for subagents is breadth across many parallel paths and this design has chosen depth on one.

### On the subscription

- **Routines draw on the subscription**: "Routines draw down subscription usage the same way interactive sessions do", with "a daily cap on how many runs can start per account"; when either the cap or the usage limit is hit, runs are rejected unless usage credits are on, in which case they are billed [verified — code.claude.com/docs/en/routines]. One-off runs do not count against the cap [verified]. The cap itself is 5 on Pro and 15 on Max [reported — third-party pages; the documentation page does not print the numbers].
- **The weekly allowance.** Anthropic does not publish it in tokens. Third-party pages put the $100 Max plan at "roughly 480 Sonnet hours or about 40 Opus hours" a week [reported, weakly sourced]; Anthropic's own enterprise figure is an average of about $13 of tokens per developer per active day [verified — code.claude.com/docs/en/costs]. A $1.50–$3.70 pass once a week is a small fraction of one ordinary working day. The cache lifetime on a subscription is one hour [verified], which comfortably covers a 40-minute run.
- **Wall-clock**: 20–40 minutes, inside the products' 5–45.
- **Hosting**: unchanged, about US$6 a month per the project README.

### The three conditions

1. **The cap is shared.** The filing runs daily and the noticing rides on it; the research is one more run a week. Seven plus one is well under 15 on Max and over 5 on Pro. The repository's own scope pages already carry this; it is repeated here because a research run is the largest single spend the account will have.
2. **The programmatic-usage split is paused, not cancelled.** Anthropic announced on 13 May 2026 that the Agent SDK, `claude -p` and GitHub Actions would move to a separate capped credit from 15 June, and paused it on the day [reported — The New Stack and others; the project README records the same]. Routines were not named in that change and their documentation today says subscription. If the split returns and reaches Routines, a weekly pass at list price is a dollar or two a week, which is still not a design problem, but "costs nothing" would then be false and should be re-said.
3. **The network setting.** Section 4: the research run needs an environment with network access widened, or it reads nothing. That costs nothing and is the first thing to do.

---

## 7. The failure modes

The earlier jobs found three: models invent patterns, flatter, and repeat themselves. Each has an equivalent in a research report, and there are five more that are specific to fetching the world.

| failure | evidence | how it would be seen |
|---|---|---|
| **Citations that do not exist.** 3–13% of URLs never existed; 5–18% do not resolve; agents cite more and fabricate more than plain search [reported — Rao et al., April 2026] | the same study cut it to under 1% with a liveness check before writing | every URL fetched again before the report is filed; count of dead links at filing and at ninety days |
| **The quote is not what the page says.** 31% sourcing problems; quotes altered and invented [reported — EBU/BBC, Oct 2025]; STORM's paraphrase errors [reported] | the design in section 3 stores the passage, so this is checkable | twenty quoted passages a month re-fetched and compared, no model in the loop |
| **Generic.** A report that could be about anyone's aquarium. PDR-Bench: personalisation and reliability trade off; the best-tailored agents fabricated most [verified — README] | — | share of the report's sentences that quote one of his captures; and his "right but I did not want to read it" from the memory research |
| **Flattery.** A user profile in the prompt raised agreement sycophancy 16–45% by model [reported by the memory research]; **his pages in the research run's prompt are a user profile** | third-person, adviser framing, up to 63.8% reduction [verified by the memory research] | the flip probe from the memory research, run on reports: regenerate with his pages removed, count claims that changed sign |
| **Diagnosing him anyway.** A report on sleep or the gym that drifts into his state of mind; settled out of scope, but a rule in the prompt is followed about nine times in ten on its own and less in company [reported by the memory research] | a room the run cannot enter, section 8 | grep the report for the feelings pages' subjects; the count should be zero |
| **Poisoned and machine-written sources.** 13 words on a forum page reached 38–51% of the related queries that retrieved it [reported — May 2026]; fabricated references in one PubMed paper in 277 in early 2026, up from one in 2,828 in 2023 [reported — Retraction Watch, May 2026]; the aquarium and coding subjects live on forums | prefer primary and official pages; record source type | share of citations to primary, official or dated-author pages |
| **Prompt injection.** A run that holds his private wiki, reads untrusted pages, and can reach the network is the "lethal trifecta" [reported — 2026 security write-ups]; the share of crawled pages carrying injected instructions rose 32% between November 2025 and February 2026 [reported] | the two-room design in section 8, which keeps the private pages and the network apart | the research room never sees a capture; the count of captures in its transcript is zero |
| **Scope drift and giving up.** Answers a reframed adjacent question; repeats a failed search six times [reported — FutureSearch; the deep research survey cited by the noticing research] | the question is his sentence, quoted at the top of the report, and the report has to answer it or say it could not | a monthly read: does the answer answer the quoted question |
| **Repetition.** 12.5% novel by the two-thousandth idea [reported by the noticing research]; "repetitive after months" [Rosebud] | rotation; diff against the last report on the subject | similarity of each report to the previous one on its subject, no model |
| **The world moved and the report did not.** Visa rules change; a report is true on its date | the fetch date on every passage; re-research diffs against the old report | age of the newest source in each report |
| **He writes for the researcher.** The mirror, from both earlier jobs | the canary | captures per week, before and after |
| **His situation leaks in the queries.** A search for "partner visa 820 processing time [city]" tells the search provider his situation; a name in a query tells it more | queries carry no names, no dates, no places beyond the country; the ledger keeps the queries | count of queries containing a name or a date: zero |

---

## 8. The innovative answer

*This section is my reasoning throughout. Where a piece rests on measured evidence it says so; where it does not, it says that too.*

**The thing nobody has built is not a better report. It is a report that never exists on its own: his own page, glossed by the world, with the questions taken from his own hedges and each gloss making one claim that his own future captures can confirm or refute.** Four parts, each doing one job.

### Part one: the questions are his sentences

Every product above starts from a question the person typed or a topic the machine guessed. Zibaldone has something neither has: years of the person's own uncertainty, dated and verbatim. "Not sure the nitrate reading means the tank is cycled." "I wonder if the visa needs the older bank statements." "Should I be doing the exercises the app suggests or the ones from the book." Those are research questions. They were written by the only person whose judgement of "worth reading" counts, before any machine was involved, and they carry the date he had the doubt.

So the filing marks a capture that hedges, mechanically, like a ledger verdict; the ledger holds his open questions per subject; the week's research subject is the one with the most open questions, and the questions researched are quoted verbatim at the top of the report. *What this rests on:* the noticing research's measurement that models say "something is here" about half the time when nothing is, and Pulse's retirement; *what it does not rest on:* nobody has tested hedge-extraction as a selection rule, and the hedge words will need tuning on his captures, not a paper.

### Part two: two rooms

The run is two sessions, not one, and they never share a context.

- **The study** holds his pages and the log and has no network. It reads the subject's page, quotes the open questions, and writes a brief for the other room: the questions, the facts of his situation that the world needs to know to answer them — stated in the third person, with no name, no date beyond the month, no place beyond the country — and nothing else. It can also say the brief is empty.
- **The library** holds the brief and the network and has no access to the wiki. It searches, fetches with the shell, reads in parts, quotes passages with URL and fetch date, checks every URL is live, and returns a set of quoted findings, each tied to one of the questions, each in the world's words. It never sees a capture.
- **The study** then takes the findings back, and writes the gloss.

Three things fall out of the split at once. The lethal trifecta is broken: the room with the private pages cannot reach the network and the room with the network holds nothing private but a third-person brief. The line between his words and the world's is physical, because the world's words can only arrive in the form the library returned them — quoted, sourced, dated. And the flattery evidence is answered by construction: the library, which decides what the world says, has never read what he thinks. *What this rests on:* the memory research's blinding guard, "removes it by construction; it is the control arm of every study", and the 2026 injection literature; *what it costs:* two Routine runs instead of one, or one run that spawns a sub-session with a different environment, which is a builder's question and not a design one.

### Part three: the gloss

The report is not a document about his subject. It is his page — unchanged, in the centre, in his words — with the library's findings set beside the sentences they answer, in the world's words, each with its source and its fetch date, and the machine's own sentences in a third register, each pointing at a sentence of his or a passage of the world's. Five hundred years of the Talmud page say this layout stays legible; the app's own look already has margin notes; and it makes section 3's three-voice rule something a reader sees rather than something a checker enforces. A gloss that has nothing to attach to is not written. A page with no glosses this week is the ordinary outcome.

### Part four: each gloss ends with an expectation

Every gloss that makes a claim about his situation ends with one sentence about what should follow if the claim is right and he acts on it, in terms his captures could later confirm: "if the tank is cycled, the next nitrite reading you note should be zero"; "if the older statements are needed, the checklist you receive will list them". The ledger keeps the expectations. When later captures on that subject arrive, the filing already reads them; it can also say whether an expectation was met, missed, or not yet testable.

This is the part with no precedent at all, and it is the part that turns the whole feature from a thing he reads into a thing that is measured. The noticing research asked for a held-out score and found none in the literature — "a theme that predicts nothing was noise". A research report that predicts his own diary and is scored on it is that score. It is also the honest answer to "was it worth reading": not whether he liked it, which the memory research shows he cannot judge, but whether the world's word, applied to his life, turned out to be true.

### What this would be, in one sentence for the owner

A page of his own writing comes back to him a week later with the world's answers written in the margin beside the questions he asked himself, and the notebook keeps score of whether the answers held.

---

## 9. What we have not thought of

- **The environment.** The single most concrete finding in this document is that the workshop's own cloud sessions cannot read the web, and the research job was asked to report on reading. Whoever builds the library room widens its network policy first, and the research is not "reading" until a run's transcript shows fetched page text and not a summary.
- **The visa is not like the aquarium.** A report about the partner visa is, functionally, legal advice, on a subject where a wrong date or a wrong form costs him a year. The library should be told that for this subject only official pages count as sources, that every passage carries the date the page was fetched, and that the gloss says plainly that it is a quotation and not advice. A subject-level source rule is a small thing to build and the difference between useful and dangerous.
- **The world's words are increasingly a machine's.** The Retraction Watch count, the injection statistics, and the poisoning result all say the same thing from different sides: what the library fetches in 2026 is partly model output, and a report that quotes the web is quoting models quoting models. The gloss should say what kind of source each passage is — official, primary, forum, unknown — so that he can weigh it, and the monthly measure counts the share.
- **His questions leak.** The brief that leaves the study is the most compact description of his situation that exists anywhere, and it goes to a search provider. Section 7's query rule is a start; the honest note is that a search for his exact question, however anonymised, describes him, and the design should say so on the scope page rather than discover it later.
- **Reading is his cost too.** Gemini writes ten to twenty pages. He will read this on a phone, in the app's reading view, and one report a week is fifty-two a year. The gloss format is shorter by construction because it can only attach to his sentences; the measure is not whether he opened it but how far he read, and the reading view can record that without a model.
- **He can already get most of this by hand.** Advanced Research on his Max plan will write him a cited report on saltwater aquariums in fifteen minutes today. What it cannot do is start from his own dated questions, keep his words apart from its own, return the findings into his notebook as captures, or keep score. If those four are not built, what is built is a slower Claude Research; if they are, it is something that does not exist. That is the whole case for parts one through four, and the whole case against a first version that "sends deep researcher agents through all the pages".
- **The model under the run will change**, and the memory research's rule applies: each report records the model that wrote it, and the flip probe re-runs on every change.

---

## Recommendation

**Build, in this order, each as its own small change:**

1. **The library environment.** A cloud environment with network access widened for the research run only, and a check that one run's transcript contains fetched page text. *Why: nothing else in this list is testable until this exists, and it is a setting.*
2. **The hedge mark in the filing, and an open-questions column in the ledger.** Mechanical, no model, regenerable from the log. *Why: it is the selection rule with no guess in it, and the ledger already has the shape.*
3. **The two-room run, weekly, one subject, chosen by open questions, then the noticing's tap, then rotation — and the choice recorded.** The study has no network; the library has no wiki; the brief is third-person and carries no name, date or place. *Why: it breaks the injection triad, blinds the writer to his views by construction, and makes the his-words line physical, all at once.*
4. **The gloss format, with three registers, quoted passages, URL, fetch date and source kind, and a liveness check on every URL before filing.** Findings go into raw as their own kind of capture, with the source, as the noticing research already recommended. *Why: the citation is the product; links rot; the 808 copies.*
5. **The expectation line and its ledger column.** *Why: it is the only held-out score available and the only measure of "worth reading" that does not ask him to judge what the memory research says he cannot.*

**Do not build:**

- **A pass over all the pages every week**, or a fleet of subagents. One subject, one agent. *Why: breadth is what subagents buy at 15 times the tokens, and the design chose depth; the whole-mind sweep is the noticing's monthly job, not this one's.*
- **Any research on how he feels, or on a named person.** *Why: settled by him, and the two-room design makes it a wall rather than a rule.*
- **A learned score of which subjects he likes researched.** *Why: the memory research's reward-signal finding; rotation is the floor and his hedges are the signal.*
- **A report longer than his page plus its glosses.** *Why: the cost that is not on the bill is his attention.*

**What it costs:** about $1.50 on Sonnet 5 or $3.70 on Opus 5 a pass at list price, drawn from the Max subscription through one or two Routine runs a week out of a cap of fifteen a day, 20–40 minutes of wall-clock, and no change to hosting. "Nothing beyond hosting" holds, on the condition that the June 2026 programmatic-usage split stays paused and Routines stay on subscription; if that changes, the same pass is a dollar or two a week on credits and the scope page should say so.

**Measure, monthly:**

| number | what it tells you | how |
|---|---|---|
| **expectations met / missed / untestable** | whether the world's word held in his life — the only score that is not his opinion | ledger, from the filing's later verdicts |
| **provenance**: of twenty sentences sampled from the month's glosses, how many point at a quoted capture or a quoted passage that supports them | drift from the two voices into the machine's | a person, twenty minutes; from the memory research |
| **dead links** at filing and at ninety days | whether the liveness check runs and how fast the world rots | a script |
| **quote fidelity**: twenty quoted passages re-fetched and compared | whether the library alters what it quotes | a script, no model |
| **open questions closed** | whether it is answering him or writing near him | ledger |
| **how far he read**, and useful / not / right-but-did-not-want | his terms; the sting rate from the memory research | the reading view and its buttons |
| **similarity to the previous report on the same subject** | repetition before he feels it | text similarity, no model |
| **captures per week** | the canary, unchanged from the noticing research | the raw store |
| **queries containing a name, date or place** | the leak | ledger of queries; must be zero |
| **source kinds**: share of passages from official or primary pages | how much of "the world" was a forum or a machine | the source-kind field |

**If the expectations come back mostly untestable for three months**, the glosses are not saying anything about his life, and the feature is a slower Claude Research; stop and keep the filing. *Why: the only thing this system has that the products do not is his record, and a report that his record cannot check has not used it.*

---

## What this session did not do

It could not open a single paper, product announcement or benchmark leaderboard at source: arXiv, OpenAI, Anthropic's main site, Google, Wikipedia, Hugging Face, GitHub Pages, the Internet Archive and a reader proxy were all refused, from the shell and from the fetch tool alike. What it read at source was: the README files of STORM, GPT Researcher, LangChain's Open Deep Research, Tongyi DeepResearch, DeepResearch Bench, BrowseComp-Plus, Mind2Web 2 and PDR-Bench; the Claude Code documentation on Routines and on costs; the Claude platform pricing page; and its own fetch tool's description. Every number marked [reported] should be checked at the paper before a decision rests on it alone; the ones that decisions here rest on are the BrowseComp-Plus reading ablation (35.4% to 43.6%), the Rao citation figures (3–13% and 5–18%), the EBU sourcing rate (31%), the PDR-Bench trade-off (verified in its README summary, not in the paper), and the Pew link-rot rates. It did not run a research pass on the owner's own pages, so the cost figures are arithmetic from verified prices and not a measured run — the first real run should be timed and its tokens recorded against the table in section 6. It found no measurement anywhere of whether a person found a machine's research about their own life worth reading, and no system that starts from a person's own record and goes outward; both are documented absences, and part four of section 8 is how this project would make its own measurement.
