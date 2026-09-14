# Memory

What other people actually run for agent memory, what the evidence for it is,
and what that suggests Bottega should do.

Gathered 14 September 2026, before anything is built. Nothing here has been
tried in this repository.

## How claims in this file are marked

Per `docs/research/README.md`, every claim below is marked:

- **[read]** — the source page was fetched and read in full in this session.
- **[summary]** — the claim comes only from a search summary. The original page
  could not be opened from this container.

**What could not be reached at all.** The container's network proxy refused the
connection (403 on the tunnel) for: `anthropic.com`, `github.blog`,
`code.visualstudio.com`, `docs.cursor.com`, `docs.letta.com`, `mem0.ai`,
`arxiv.org` and every mirror tried (`export.arxiv.org`, `ar5iv`,
Semantic Scholar's API, Hugging Face papers, OpenReview), Hacker News, Reddit,
and `simonwillison.net`. The owner gave approval mid-session to search
anywhere; the blocks are network-level, not permission ones, so the approval
did not lift them.

What *was* reachable directly: Anthropic's product documentation
(`code.claude.com`, `platform.claude.com`) and anything served from
`raw.githubusercontent.com`. That is the whole basis of the **[read]** marks.

**A deliberate omission.** Searches returned many arXiv papers with 2026
identifiers that look directly relevant. None of them could be opened, so there
is no way to confirm from here that they say what a search summary says they
say, or that they exist as described. **None of them are cited in this file.**
That is a real gap in this survey, not a tidy one.

---

# PART ONE — THE SURVEY

## A distinction that runs through all of it

Almost everything marketed as "agent memory" solves a different problem from
the one Bottega has.

The commercial systems — Mem0, Zep, Letta, LangMem — are built to remember
**facts about a user across conversations** ("prefers pnpm", "works at X"),
at a scale of thousands to millions of items, retrieved a handful at a time.
Bottega's question is whether **a lesson learned in one piece of work** can be
carried into the next, at a scale of tens of items, all of which are loaded.

These are not the same problem, and the evidence for one does not transfer to
the other. Where a system below is solving the other problem, this file says so.

## 1. Claude Code's own memory — two separate mechanisms

**[read]** — `code.claude.com/docs/en/memory`, read in full.

Claude Code ships two things, and they are not the same:

- **`CLAUDE.md`** — instructions you write. Loaded every session. Documentation
  guidance: *"target under 200 lines per CLAUDE.md file. Longer files consume
  more context and reduce adherence."*
- **Auto memory** — notes Claude writes itself. Claude records a `type` in each
  file's frontmatter, one of four: `user` (role, preferences), `feedback`
  (corrections you gave, approaches you confirmed), `project` (ongoing work,
  decisions not derivable from the code or git history), `reference` (where to
  find things outside the project).

The design of auto memory, which is the closest existing thing to what Bottega
is considering:

- **Shape.** A directory holding `MEMORY.md` — *"Index, one line per memory,
  loaded into every session"* — plus one topic file per memory.
- **What loads.** *"The first 200 lines of MEMORY.md, or the first 25KB,
  whichever comes first, are loaded at the start of every conversation. Content
  beyond that threshold is not loaded at session start."* Topic files are
  **not** loaded at startup; *"Claude reads them on demand using its standard
  file tools when it needs the information."*
- **The cap is enforced, and it nags.** *"After Claude writes to MEMORY.md,
  Claude Code measures the file against the 200-line and 25KB read limits. If
  the file is near a limit, Claude Code reminds Claude to shorten it: keep one
  line per entry, move detail into topic files, and merge or drop stale
  entries. If the file is over a limit, the write still succeeds, but Claude
  Code returns an error telling Claude to rewrite the index, because everything
  past the limit is dropped on the next load."*
- **What makes it write.** A subtractive test, not an additive one: *"Claude
  skips anything it can derive from the codebase, such as architecture, file
  paths, or debugging fixes. It also skips anything your CLAUDE.md files
  already say."* And: *"Claude doesn't save something every session. It decides
  what's worth remembering based on whether the information would be useful in
  a future conversation."*
- **Staleness is timestamped.** When a memory file has frontmatter, Claude Code
  writes a `modified` field, an ISO 8601 timestamp: *"The timestamp shows how
  current the fact is, both to you and to Claude when it reads the memory
  back."*

**The finding that matters most for Bottega.** Main-session auto memory lives
at `~/.claude/projects/<project>/memory/` and is *"machine-local… Files are not
shared across machines or cloud environments."* It is **not committed**. But
**subagent** memory can be, and this is documented separately
(`code.claude.com/docs/en/sub-agents`, **[read]**): a subagent definition may
carry a `memory:` field with three scopes, one of which is

> `project` — `.claude/agent-memory/<name-of-agent>/` — *"the subagent's
> knowledge is project-specific and shareable via version control"*

and the documentation's own advice is *"`project` is the recommended default
scope. It makes subagent knowledge shareable via version control."* When
enabled, *"the subagent's system prompt also includes the first 200 lines or
25KB of MEMORY.md in the memory directory"*, and *"Read, Write, and Edit tools
are automatically enabled so the subagent can manage its memory files."*

So the decision already recorded in `docs/VISION.md` — per-agent memory at
project scope, plain markdown, committed, capped, no infrastructure — is
**exactly what the product supports**, for a subagent. For the main session it
is not, and Part Two says what follows from that.

## 2. Anthropic's memory tool — just-in-time, not load-everything

**[read]** — `platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool`,
read in full.

The stated principle is the opposite of reading everything:

> *"Memory supports just-in-time context retrieval. Rather than loading all
> relevant information up front, an agent records what it learns in memory
> files and reads them back on demand. This keeps the active context focused on
> the current task."*

The system prompt the API injects begins *"IMPORTANT: ALWAYS VIEW YOUR MEMORY
DIRECTORY BEFORE DOING ANYTHING ELSE"* — that is, list the directory first,
then open what looks relevant.

On keeping it clean, the suggested wording is *"always try to keep its content
up-to-date, coherent and organized. You can rename or delete files that are no
longer relevant. **Do not create new files unless necessary.**"*

Under "Memory expiration", the entire recommendation is one sentence:
*"Periodically delete memory files that haven't been accessed in a long time."*
That is the whole of the published guidance on pruning. It is thinner than the
question deserves.

Worth noting, because it is easy to misread as supporting a lessons-file: the
**"Multisession software development pattern"** in the same page is about
**project state**, not lessons — a progress log, a feature checklist, an
end-of-session update so *"each new session resumes from the state the last one
recorded."* That is a handoff. Bottega already has separate research on
handoffs in `docs/research/HANDOFF.md`. It is not the same thing as memory.

## 3. Cline's "Memory Bank" — the most widely copied pattern, and read-all

**[read]** — `cline/cline` `docs/best-practices/memory-bank.mdx`, read in full
from GitHub raw.

Six fixed markdown files in the repository: `projectbrief.md`,
`productContext.md`, `activeContext.md`, `systemPatterns.md`, `techContext.md`,
`progress.md`. The instruction the agent is given is absolute:

> *"I MUST read ALL memory bank files at the start of EVERY task — this is not
> optional."*

Updates happen *"1. Discovering new project patterns. 2. After implementing
significant changes. 3. When user requests with **update memory bank** (MUST
review ALL files). 4. When context needs clarification."*

**Where it is reported to fail.** The refresh is manual — *"the cost is that
the memory is only as fresh as your last manual update"* **[summary]**. And it
is six documents, read in full, every task. One write-up estimates the markdown
layer at roughly 2,500 tokens per session **[summary]** — which is more than
Bottega's entire remaining room, for the *cheap* version of this pattern.

This is the pattern most people mean when they say a coding agent has memory.
It is also, measured against Bottega's budget, unaffordable.

## 4. GitHub Copilot's agentic memory — the only reported numbers

**[summary]** — `github.blog` was blocked; all of this is from search
summaries, and all of it is GitHub reporting on its own product.

- Memories *"are automatically expired after 28 days to prevent stale
  information"* — a mechanical answer to staleness, based on time alone.
- Reported effect: *"a 3% increase in precision and 4% increase in recall"* on
  Copilot code review, and *"a 7% increase in pull request merge rates"* for
  the coding agent.

Two things follow. First, this is the only quantified claim found anywhere that
memory helps a *coding* agent, and it is a vendor measuring itself on its own
evaluation set — not evidence that it works, in the sense `AGENTS.md` means.
Second, even taken at face value, the effect is **small**: single-digit
percentages. Anyone expecting memory to transform how a repository works should
adjust that expectation downward.

## 5. Mem0 — and the thing it abandoned

**[read]** — `mem0ai/mem0` README, read from GitHub raw.

Mem0's April 2026 release removed a mechanism it had previously been built
around. In its own words, under "What changed":

> *"**Single-pass ADD-only extraction** — one LLM call, no UPDATE/DELETE.
> Memories accumulate; nothing is overwritten."*

The previous design had a model decide, per incoming fact, whether to add,
update, delete, or do nothing against what was already stored. **That is
exactly the obvious design for keeping memory clean, and they took it out.**
Reported scores went up sharply (LoCoMo 71.4 → 92.5, LongMemEval 67.8 → 94.4).

Two cautions on those numbers, both from the README itself **[read]**:
*"Scores reflect Mem0's managed platform, which includes proprietary
optimizations not available in the open-source SDK"*, and the benchmarks are
run *"at a top_200 retrieval budget"* — that is, two hundred candidate memories
per query. So the lesson is **not** "never delete". It is:

> When you can retrieve selectively from a large store, it is better to
> accumulate and retrieve well than to ask a model to prune.

Bottega cannot retrieve selectively from a large store, because everything it
keeps is loaded. So this finding tells Bottega the opposite of what it tells
Mem0: with no retrieval step, accumulation is precisely what Bottega cannot
afford, and pruning is not optional.

## 6. The other commercial systems, briefly

- **Letta (formerly MemGPT)** — an agent runtime that treats the context window
  like virtual memory, with tiered "core memory" blocks the agent edits itself
  **[summary]**. Reported limitation: *"the OS-paging metaphor adds complexity
  and latency that doesn't always pay off on standard benchmarks"*
  **[summary]**. Its README **[read]** is a 1.5KB pointer to hosted docs that
  could not be reached.
- **Zep** — a temporal knowledge graph with explicit fact-validity intervals,
  so a fact can be marked as having stopped being true **[summary]**. Its
  repository **[read]** confirms benchmark harnesses for LoCoMo and
  LongMemEval exist; the design claims could not be read directly.
- **LangMem (LangChain)** — **[read]**, README from GitHub raw. Offers two
  postures, explicitly named: memory tools the agent calls *"in the hot path"*
  during a conversation, and a *"background memory manager that automatically
  extracts, consolidates, and updates agent knowledge"*. Notable that the
  library ships both rather than picking one.

All four require a database. All four are solving the personalization problem,
not the lessons problem. `docs/VISION.md` already refuses infrastructure, and
nothing found here argues against that refusal.

## 7. Tried and abandoned — the most useful category

**This is what the survey was mainly looking for.** Three clear cases, none of
which could be read at the source.

**Vector databases for agent memory — abandoned by AutoGPT.** **[summary]**
AutoGPT removed support for Pinecone, Milvus, Redis and Weaviate, replacing
them with a JSON file. The reasons reported: *"the overhead of vector database
operations was negligible compared to LLM latency, and the complexity wasn't
justified by the performance gains"*, and a criticism from Jina.AI's founder
that vector databases were *"an overkill solution"* when *"even with 100k
embeddings, using a simple brute-force algorithm like Numpy's dot query takes
just milliseconds."* One account summarises the team's position as *"We
over-engineered this. The simpler approach works better."*

This is independent support for the decision already recorded in
`docs/VISION.md` — plain text search first, embeddings never.

**Automatically generated memories — turned off by teams using Cursor.**
**[summary]** Cursor generates memories from chat: *"a background process
watches for durable facts — corrections made repeatedly, preferences stated, or
project conventions explained — and when it spots one, it proposes a memory."*
Reported outcomes: developers accumulating *"a ton of 'memories'… applied at a
global level, with all those memories being very project-specific"*; memories
*"created by the IDE in new projects… immediately ignored by the responses"*;
and the failure mode that an auto-extracted memory *"captured the right idea
with mushy wording"*. The reported response from some teams:

> *"Some teams disable auto-generated memories entirely and keep all persistent
> context in reviewed, committed rules — a reasonable call in regulated
> codebases where every instruction the AI receives should be auditable."*

That is the closest thing in this survey to Bottega's own posture, arrived at
independently by people who tried the automatic version first.

**Model-driven UPDATE/DELETE — removed by Mem0.** Covered in section 5 above,
**[read]**. The one abandonment that could be read at the source.

## 8. What the research patterns say about *when* to write

**[summary]** for all of this — no paper could be opened.

- **ExpeL** extracts natural-language insights by comparing **successful and
  failed** trajectories, rather than recording every episode.
- **Agent Workflow Memory (AWM)** induces workflows from **commonly reused
  routines** — a pattern has to recur before it is stored.
- **Voyager** **[read, README]** keeps *"an ever-growing skill library of
  executable code"*, and the library is reusable in a fresh world. Its entries
  are *verified programs*, not advice — the skill either runs or it does not.
- **Reflexion** **[read, README]** stores verbal self-reflections between
  trials; the repository exposes `use_memory` as a flag that can be turned off
  *"to run a baseline run"*, which at least means the authors expected someone
  to check whether memory helped.

The common thread across all four: **something has to happen more than once, or
be verifiable, before it earns a place.** Not one of them writes down every
lesson.

## 9. Long context is itself a cost

**[summary]** — Chroma's "Context Rot" technical report could not be opened.
Reported findings: across 18 frontier models, *"every single one… gets worse as
input length increases"*, and *"a model with a 200K token window can exhibit
significant degradation at 50K tokens."*

This is consistent with the reasoning already written into `AGENTS.md` for the
10,000-token budget, and it is the reason memory cannot be treated as free just
because disk is cheap.

---

# PART TWO — THE FIVE QUESTIONS

Answered against the survey above, and against one hard constraint.

## The constraint

Measured this session with `node tools/check-budgets.mjs`:

| session | loads now | room to 10,000 |
|---|---|---|
| a building session (opens the build skill) | **7,968 tokens** | **2,032 tokens** — about 8,100 characters |
| a reviewer session | 5,266 tokens | 4,734 tokens |
| every session, before opening anything | 3,033 tokens | 6,967 tokens |

The builder is the tight one. The reviewer has room to spare.

**And a structural finding that changes the shape of the answer.** From
section 1: committed, per-agent memory is a **subagent** feature. Bottega's
reviewer *is* a subagent, so it can have exactly the memory
`docs/VISION.md` describes, natively, for about 25 lines of configuration.
Bottega's builder is **not** — it is the main session running the build skill,
whose auto memory is machine-local and never committed. So builder memory has
to be an ordinary committed file that the build skill points at, and it is
charged to the session with 2,032 tokens left.

**One warning about the reviewer, which is the opposite of good news.** Turning
on `memory:` for a subagent *"automatically enables"* Read, Write and Edit
**[read]**. `.claude/agents/reviewer.md` currently sets
`disallowedTools: Edit, Write, NotebookEdit, Task`, and `AGENTS.md` says the
reviewer *"Writes nothing and never merges."* Giving the reviewer memory hands
a write tool to the one agent deliberately denied one. That is a decision for
the owner, not for a session, and it is flagged here rather than designed
around.

## 1. What makes a session write a note?

**Only a mistake that actually recurred.** The survey supports the answer
already recorded in `docs/VISION.md`, and supports it from three directions:

- AWM stores a routine only once it is *commonly reused*; ExpeL extracts an
  insight only from a success/failure *contrast*; Voyager stores only a program
  that *runs*. None of them writes every lesson. **[summary, except Voyager]**
- Cursor does write on a lighter trigger, and the reported result is noise,
  wrong-scope memories, and teams switching it off. **[summary]**
- Claude Code's own auto memory applies a **subtractive** test, and this is the
  single most transferable sentence in the whole survey **[read]**: it skips
  *"anything it can derive from the codebase"* and *"anything your CLAUDE.md
  files already say."*

So the trigger has two halves, and both must hold:

1. **It happened twice.** The session that hits the mistake the *second* time
   writes the note, and cites both occurrences. A note that cannot cite two
   occurrences is not a note.
2. **It survives the subtractive test.** Not derivable from the code. Not
   already in `AGENTS.md`. If it *is* the kind of thing that belongs in
   `AGENTS.md`, it goes there instead, with its reason — and then it is a rule
   that can be argued with, which is better than a memory that cannot.

The second half matters more than it looks. Most true things a session learns
belong in the code, in a check, or in `AGENTS.md`. Memory is what is left after
those three have taken what is theirs — which should not be much.

## 2. What does a note look like?

**One line.** Not a file with frontmatter, not a topic file, not a template.

```
YYYY-MM-DD  <what to do differently, one sentence>  (#12, #17)
```

The date, the lesson in the imperative, and the two pull requests where it bit.

Why this shape:

- **The one-line index is the part with evidence behind it.** Claude Code's
  own design is *"one line per memory"* in the index, with detail pushed into
  topic files **[read]**. Bottega's volume is low enough that the line is the
  whole note and the topic file never needs to exist. Anthropic's own
  instruction to its memory tool is *"Do not create new files unless
  necessary"* **[read]**.
- **The date is what makes staleness visible.** Claude Code writes a `modified`
  timestamp precisely so the age *"shows how current the fact is, both to you
  and to Claude"* **[read]**. Here it is written in the line instead of
  frontmatter, because frontmatter costs bytes the builder does not have.
- **The two citations are what make the note checkable and prunable.** They are
  the mechanism for question 5, and the guard against the Cursor failure of
  *"mushy wording"* — you cannot write two pull request numbers for a lesson
  you did not actually learn twice.
- **Nothing else.** No type field, no severity, no tags. Every field is a thing
  a session has to fill in correctly and a reader has to skip past, and the
  survey's clearest failure mode is memory nobody maintains properly.

## 3. What is the cap, as a number?

**Thirty lines, and 2,400 bytes.** About 600 tokens.

Both numbers, because lines alone can be gamed by writing long ones — the same
lesson this repository learned about its own counting today.

The reasons, in order of how much they should count:

- **Thirty is a lot of genuinely recurring mistakes.** The write trigger is a
  *second* occurrence that also survives the subtractive test. Bottega is a few
  weeks old and has fewer than ten merged changes. If thirty such lessons ever
  accumulate, the honest reading is that `AGENTS.md` is failing to prevent
  them, and the fix is the rules, not a larger memory.
- **Thirty lines can be read by the owner in about a minute.** That is the only
  pruning mechanism the survey actually supports — a person looking at the
  whole thing. Beyond a page, nobody re-reads it, and it becomes furniture.
- **600 tokens is under a third of the builder's remaining 2,032**, leaving the
  rest for the build skill to grow into. A memory sized to consume the entire
  remaining budget would make every future change to the skill a fight.

**The number this is deliberately not.** Claude Code's own cap is 200 lines or
25KB **[read]** — roughly 6,250 tokens, three times Bottega's *entire*
remaining room. The platform default is unusable here and must be overridden
explicitly. That is worth knowing, because an implementation that simply turned
the feature on would inherit a cap that breaks the budget.

**Said plainly, as the brief asked.** The binding constraint is the budget, and
a design should not be trusted just because it makes a number look acceptable.
So: if thirty lines turns out to be too few — if real lessons are being
discarded to stay under it — the honest response is **not** to quietly raise the
cap. It is to say so, and to name what would have to come out to pay for more.
The build skill is 18,482 bytes and is the largest single file any session
loads; it is where the room would have to come from.

## 4. Does a session read all its notes, or search them?

**Read all of them. And the argument in the brief is right — but for a reason
that dissolves the question rather than settling it.**

The brief's argument is that anything picking "the relevant ones" is either
reading them all anyway or guessing from titles. Tested against the survey:

- The systems that search — Mem0, Zep, Letta — search because they hold
  thousands to millions of items and retrieve a couple of hundred candidates
  per query **[read, for Mem0's top_200]**. At that scale there is no choice.
- The systems at document scale **read everything**. Cline: *"I MUST read ALL
  memory bank files at the start of EVERY task"* **[read]**.
- Anthropic's own tool splits the difference **[read]**: list the directory
  first, then open files on demand. Claude Code does the same — index loaded
  every session, topic files opened only when needed **[read]**.

So the survey does *not* contradict the brief, and here is the precise reason.
The danger the brief identifies is real **only when the index is titles**. A
title is a guess about relevance; a session skipping a file by its title can
skip the one that mattered. But Claude Code's index is *"one line per memory"*
— the line carries the claim, not a label for it.

Which means the cap and the read-all policy are **the same decision**. At one
line per note and thirty notes, reading everything costs about 600 tokens, the
index *is* the notes, and there is nothing left to retrieve. Search would be
machinery guarding a page of text.

This holds only while question 3's cap holds. If memory ever outgrows a page,
this answer expires with it, and the honest move at that point is to ask why it
grew rather than to add a search step.

## 5. Who prunes, when, and how is a stale note recognised?

Recognising staleness is the hard half, and the survey is weakest exactly here.
Anthropic's published guidance is one sentence — *"Periodically delete memory
files that haven't been accessed in a long time"* **[read]**. Copilot uses a
28-day timer **[summary]**. Mem0 tried having a model decide what to delete and
**removed it** **[read]**.

**Time is the wrong signal for this kind of memory.** A 28-day expiry suits
facts about a user, which go out of date on their own. A lesson about how
this repository breaks does not become false in 28 days — and worse, a timer
deletes the good notes at the same rate as the bad, which is how you get memory
that is small because it is useless.

**The signal should be the note's own citations.** This is what the two pull
request numbers in question 2 are for. A note is stale when **the thing it
points at is gone**:

- the rule it guards has been deleted from `AGENTS.md`,
- the file or path it names no longer exists,
- or a check now catches the mistake, so the note is furniture.

All three are things a person can see in a minute, and the middle one is
something a machine can check — the same shape as the dead-file-reference
budget already in `AGENTS.md`. A note whose citation no longer resolves should
stop the check, exactly as a dead path in `AGENTS.md` does. That is a
suggestion for whoever builds this, not a decision made here.

**Who, and when:**

- **When a piece of work closes** — already decided in `docs/VISION.md`, and
  the survey supports it. The session that closes the work reads all thirty
  lines (it costs nothing; it already loaded them) and *proposes* deletions.
- **It proposes, it does not act silently.** Mem0's abandonment of model-driven
  delete **[read]** is the direct evidence against letting a session quietly
  rewrite memory. Every deletion is a line in a diff, in a pull request,
  reviewed like any other change.
- **The owner can delete any line at any time**, because thirty lines is short
  enough to read. The teams who disabled Cursor's automatic memories wanted
  exactly this — *"reviewed, committed rules… every instruction the AI receives
  should be auditable"* **[summary]**.

That auditability is the one genuine advantage Bottega has over every system in
this survey. Memory here is a committed text file, so every change to it is a
reviewed diff. None of the commercial systems can say that.

---

# Against the decisions already made

The brief asked for strong evidence against any of the four settled decisions,
shown rather than designed around. Here is the honest accounting.

| decision | what the survey says |
|---|---|
| per-agent memory, project scope, committed, capped, no infrastructure | **Supported, with one correction.** This is exactly what the `memory: project` subagent scope provides **[read]** — but only for a *subagent*. The builder is a main session and its auto memory is machine-local and uncommitted, so builder memory needs an ordinary committed file instead. |
| plain text first, embeddings never | **Supported, independently.** AutoGPT removed four vector databases for a JSON file **[summary]**. Nothing found argues the other way at this scale. |
| a clear-out when work closes, from day one | **Supported.** Staleness, not capacity, is the reported failure everywhere. No source found argues for deferring pruning. |
| build it only when a mistake actually recurs | **Supported, and this is the strongest result in the survey.** Every research system that works writes on recurrence or verification; the system that writes on a lighter trigger is the one people turn off. |

**No evidence was found that contradicts any of the four.** The only correction
is mechanical — where memory can live for which agent — and it changes the
implementation, not the decision.

## The recommendation, in one paragraph

Do not build it yet; that is already decided and the survey agrees. When a
mistake does recur: one file, one line per lesson, thirty lines and 2,400 bytes,
each line dated and citing the two pull requests where the mistake happened,
read in full by the session that loads it, pruned when a piece of work closes by
a session that proposes deletions in a reviewed diff, and deletable by the owner
at any time because it is one page of plain English. Give it to the builder
first, where the need is. Leave the reviewer alone until the write-tool question
above is settled.

---

# What could not be established

Said plainly, because the owner can only act on a gap he has been told about.

1. **No independent evidence that memory helps a coding agent.** The only
   numbers found anywhere are GitHub's, about GitHub's own product, reported by
   GitHub, and read only in summary. Nothing in this survey establishes that
   memory will make Bottega better. It establishes what shape to give it *if*
   it is built.
2. **The primary sources for most of the abandonment stories could not be
   read.** AutoGPT's vector-database removal, Cursor's memory problems, and
   Copilot's 28-day expiry are all **[summary]**. Only Mem0's abandonment of
   UPDATE/DELETE was read at the source.
3. **No academic source could be opened at all** — arXiv and every mirror
   tried were blocked. Papers that searches suggested were directly relevant
   are deliberately not cited, because there was no way to confirm from here
   what they say.
4. **No case was found of anyone abandoning committed, repo-scoped lesson
   memory specifically.** The abandonment evidence is about *automatic*
   memories and about *vector databases*. That is an absence of evidence, and
   it may simply mean few people have tried the committed version long enough
   to give up on it.
5. **Nothing here was measured in this repository.** No memory file was
   written, no session was run with one, nothing was observed failing or
   passing. Every number about Bottega in this file comes from
   `tools/check-budgets.mjs`, which was run; every number about anyone else
   comes from a document.

## What this session did not do

- Did not build any memory, write any memory file, or change any skill, agent
  definition, rule, or budget.
- Did not test whether thirty lines is the right number. It is reasoned from
  the budget and from how rarely the trigger should fire, not observed.
- Did not resolve the reviewer write-tool conflict. It is surfaced for the
  owner and left alone.
- Did not review this page. A fresh session does that.
