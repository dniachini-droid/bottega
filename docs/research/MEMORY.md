# Memory

What other people actually run for agent memory, what the evidence for it is,
and what that suggests Bottega should do.

Gathered 14 September 2026, before anything is built. Nothing here has been
tried in this repository.

**This is the second version of this page.** The first was written the same
day. It was rewritten because two of its claims did not survive going back to
the primary sources, and because a third source — the one that decides the
whole shape of the answer — had never been looked at. What changed, and what
survived, is said plainly in each section and summarised at the end.

## How claims in this file are marked

Per `docs/research/README.md`, every claim below is marked:

- **[read]** — the source was fetched and read directly in this session.
- **[summary]** — the claim comes only from a search summary. The original
  could not be opened from this container, and the attempts are listed below.

### What was reachable, and what was not

The blocking is per-domain, not general, so each domain below was actually
tried in this session rather than assumed.

**Reachable, read directly:** `code.claude.com` (including the `.md` suffix
that returns the raw source of any documentation page),
`platform.claude.com`, `raw.githubusercontent.com`.

**Refused by the network proxy, tried this session:** `github.com` (HTML
pages, 403), `api.github.com` (403), `docs.github.com`, `github.blog`,
`docs.cursor.com`, `cursor.com`, `forum.cursor.com`, `anthropic.com`,
`code.visualstudio.com`, `research.trychroma.com`, `localskills.sh`,
`kenmuse.com`, `byteiota.com`, `aidevme.com`, `medium.com`,
`en.wikipedia.org`, `researchgate.net`, `sri.inf.ethz.ch`.

**Academic sources: every route tried, all refused.** `arxiv.org` (via both a
direct fetch and the fetch tool, which named the block explicitly),
`ar5iv.labs.arxiv.org`, `alphaxiv.org`, `huggingface.co/papers`,
`api.semanticscholar.org`, `api.crossref.org`, `openreview.net`,
`r.jina.ai`, `themoonlight.io`, `developersdigest.tech`.

**A change of policy from the first version.** That version found the same
academic block and responded by citing no paper at all. That was the wrong
call in one direction: the only sources that disagree with what this
repository already believes are academic, so a blanket exclusion of them
produced a survey that agreed with its commissioner on every point. This
version cites them, marks them **[summary]**, and says plainly that their
existence and contents could not be confirmed from here. An unconfirmed
disagreement that is disclosed is more useful than a tidy page that omits it.

---

# PART ONE — THE MECHANICS, SETTLED

This part is about what the product actually does. It is first because the
first version of this page got part of it wrong in one direction, and the
correction handed to this session got it wrong in the other.

## 1. Main-session auto memory cannot work here

**[read]** — `code.claude.com/docs/en/memory`, read in full.

Claude Code ships two things that carry across sessions, and they are not the
same:

- **`CLAUDE.md`** — instructions a person writes. Loaded every session.
- **Auto memory** — notes Claude writes itself, at
  `~/.claude/projects/<project>/memory/`.

On where auto memory lives, the documentation is flat:

> *"Auto memory is machine-local. All worktrees and subdirectories within the
> same git repository share one auto memory directory. Files are not shared
> across machines or cloud environments."*

**Every session in this workshop is a fresh cloud container.** Auto memory
here would be created empty, written to once, and destroyed with the
container. It is not committed, it is not pushed, and no later session would
ever see it. For the main session — which is what a building session is —
**auto memory is not a candidate mechanism at all.**

The committed mechanisms are `CLAUDE.md` (here, `AGENTS.md` behind a symbolic
link) and `.claude/rules/`. Anything else this repository keeps is an ordinary
committed file, charged to the budgets like any other.

**Unchanged from the first version.** It said the same thing about the main
session, and it was right.

## 2. Subagent memory at project scope *is* committed — the correction handed to this session is wrong

**[read]** — `code.claude.com/docs/en/sub-agents`, read in full.

This session was told that a subagent's memory is "a separate directory under
the same machine-local scheme at `~/.claude/projects/<project>/memory/`", and
that therefore the asymmetry the first version described does not exist.

**That is not what the documentation says.** The sub-agents page gives
subagent memory three scopes, two of which are inside the repository:

| Scope | Location | Use when |
|---|---|---|
| `user` | `~/.claude/agent-memory/<name-of-agent>/` | learnings apply across all projects |
| `project` | `.claude/agent-memory/<name-of-agent>/` | *"the subagent's knowledge is project-specific and shareable via version control"* |
| `local` | `.claude/agent-memory-local/<name-of-agent>/` | *"project-specific but shouldn't be checked into version control"* |

and the page's own advice is:

> *"`project` is the recommended default scope. It makes subagent knowledge
> shareable via version control."*

The path `~/.claude/projects/<project>/memory/` appears nowhere on the
sub-agents page. The memory page's "machine-local" sentence sits under a
heading describing *that* directory — the main conversation's — and the
sub-agents page describes different directories for subagents.

**So the first version's mechanical claim was correct, and the correction
given to this session was not.** This is recorded rather than smoothed over,
because a session that accepts a correction without checking it has replaced
one unverified claim with another.

**One genuine ambiguity, which could not be resolved.** The sub-agents page
also says *"Subagent memory is part of [auto memory]"* **[read]**, and the
memory page says auto memory is machine-local. Those two sentences are in
tension. The most coherent reading is that "machine-local" scopes to the
main-conversation directory it is describing, and that the sub-agents page's
explicit table of repository paths governs subagents. **That reading was not
confirmed by observation. Nobody here has turned the feature on and looked.**

## 3. Why the asymmetry still does not help this repository

This is the part neither the first version nor the correction got to, and it
matters more than which of them was right about the path.

Committed subagent memory is a real mechanism. It is still a poor fit here,
for four reasons, all read at the source:

**It needs someone to commit it, and that someone cannot be Da Vinci.**
`.claude/agent-memory/da-vinci/` is a directory in the working tree. In a
fresh cloud container it survives only if it is committed and pushed. Da
Vinci is forbidden to write, commit, push or merge — by `AGENTS.md`, by
its own definition, and by `disallowedTools` in its header. Worse, Da
Vinci's working tree *is the branch under review*, so notes it wrote would
land in the diff it was reviewing.

**It hands a write tool to the one agent deliberately denied one.** The claim
the first version could not verify is now verified. From the sub-agents page,
on what happens when `memory:` is set **[read]**:

> *"Read, Write, and Edit tools are automatically enabled so the subagent can
> manage its memory files."*

`.claude/agents/da-vinci.md` sets `disallowedTools: Edit, Write, NotebookEdit,
Task`, and its body says the header *"takes those tools away rather than
trusting this paragraph to hold."* **Which of the two wins is not documented
anywhere this session could reach.** The page states the precedence between
`tools` and `disallowedTools` — *"disallowedTools is applied first, then tools
is resolved against the remaining pool"* **[read]** — and says nothing about
the automatic enablement. That is now a known unknown, not an unsupported
rumour.

**It is charged to Da Vinci's context, and the check cannot see it.**
*"The subagent's system prompt also includes the first 200 lines or 25KB of
MEMORY.md in the memory directory"* **[read]**. That is up to 25KB entering a
Da Vinci session, and `tools/check-budgets.mjs` counts none of it.

**It depends on a setting outside the repository.** *"Subagent memory is part
of auto memory: if you turn auto memory off, with the `autoMemoryEnabled`
setting or `CLAUDE_CODE_DISABLE_AUTO_MEMORY`, the `memory` field has no effect
and the subagent launches without the memory instructions or the memory tool
access"* **[read]**. A mechanism that silently does nothing depending on a
machine-level setting is a check that cannot be observed refusing anything.

**What this means.** The asymmetry exists, but it points the wrong way. The
agent that *can* have committed memory natively is the one this repository has
most carefully arranged to write nothing. Any memory here should be an
ordinary committed file for both agents — which is what the first version
recommended for Michelangelo, arrived at now for both, and for better reasons.

## 4. The index shape, and what the platform does with it

**[read]** — same page. The design of auto memory is the closest existing
thing to what Bottega is considering, and it is worth taking seriously even
though the mechanism itself is unusable here.

- **Shape.** A directory holding `MEMORY.md` — *"Index, one line per memory,
  loaded into every session"* — plus one topic file per memory.
- **What loads.** *"The first 200 lines of MEMORY.md, or the first 25KB,
  whichever comes first, are loaded at the start of every conversation.
  Content beyond that threshold is not loaded at session start."* Topic files
  are **not** loaded at startup; *"Claude reads them on demand."*
- **The cap nags, then refuses.** *"If the file is near a limit, Claude Code
  reminds Claude to shorten it: keep one line per entry, move detail into
  topic files, and merge or drop stale entries. If the file is over a limit,
  the write still succeeds, but Claude Code returns an error telling Claude to
  rewrite the index, because everything past the limit is dropped on the next
  load."*
- **A subtractive test decides what is written.** *"Claude skips anything it
  can derive from the codebase, such as architecture, file paths, or debugging
  fixes. It also skips anything your CLAUDE.md files already say."* And:
  *"Claude doesn't save something every session."*
- **Staleness is timestamped.** A `modified` field, ISO 8601: *"The timestamp
  shows how current the fact is, both to you and to Claude when it reads the
  memory back."*
- **Imports do not save context.** *"Imported files still load and enter the
  context window at launch."* Splitting a file into `@path` imports is
  organisation, not economy — the same trap `AGENTS.md` already names about
  moving bulk elsewhere and pointing at it.
- **Size.** *"Target under 200 lines per CLAUDE.md file. Longer files consume
  more context and reduce adherence."*

---

# PART TWO — THE SURVEY

## A distinction that runs through all of it

Almost everything marketed as "agent memory" solves a different problem from
the one Bottega has. The commercial systems — Mem0, Zep, Letta, LangMem — are
built to remember **facts about a user across conversations**, at a scale of
thousands to millions of items, retrieved a handful at a time. Bottega's
question is whether **a lesson learned in one piece of work** can be carried
into the next, at a scale of tens of items, all of which are loaded.

These are not the same problem and the evidence for one does not transfer.

## 5. AutoGPT's vector databases — the primary source was reached, and it says something different

**[read]** — `raw.githubusercontent.com`, AutoGPT
`docs/configuration/memory.md` at tags `v0.4.0` and `v0.4.1`, identical text
in both.

**This is the claim the first version leaned on hardest, and it does not hold
up.** That version said AutoGPT removed **four** vector databases in favour of
a plain file, because *"we over-engineered this, the simpler approach works
better"* — and cited it as independent support for "plain text first,
embeddings never."

The project's own documentation says:

> *"The Pinecone, Milvus and Weaviate memory backends were rendered
> incompatible by work on the memory system, and have been removed in
> `master`. Whether support will be added back in the future is subject to
> discussion."*

Three differences that matter:

1. **Three backends, not four.** Redis was separate, and reported removed
   *"temporarily"* **[summary]**.
2. **The stated reason is a refactor casualty, not a judgement.** Nothing in
   the source says vector databases were overkill, too slow, or not worth the
   complexity. They stopped compiling against a rewritten memory system and
   were dropped.
3. **Restoration was left open** — *"subject to discussion"*, with a link to
   the discussion thread, which could not be opened from here.

The "we over-engineered this" wording and the Jina.AI quote in the first
version came from commentary about the removal, not from the project. Neither
could be reached at source this session.

**What this does to the finding.** It stops being independent support for
"embeddings never" and becomes a much weaker observation: a project that
offered four memory backends now ships one plain file, for reasons that
include a refactor nobody finished. That is still mildly interesting. It is
not evidence for a design decision, and it should not be quoted as such again.

## 6. Cline's "Memory Bank" — the most widely copied pattern, and read-all

**[read]** — `cline/cline` `docs/best-practices/memory-bank.mdx` from GitHub
raw.

Six fixed markdown files in the repository: `projectbrief.md`,
`productContext.md`, `activeContext.md`, `systemPatterns.md`,
`techContext.md`, `progress.md`. The instruction is absolute:

> *"I MUST read ALL memory bank files at the start of EVERY task — this is not
> optional."*

Updates happen on discovering new patterns, after significant changes, on an
explicit *"update memory bank"* request, and when context needs clarification.

**Where it is reported to fail.** The refresh is manual, so the memory is only
as fresh as the last manual update **[summary]**; one write-up estimates the
markdown layer at roughly 2,500 tokens per session **[summary]** — more than
Bottega's entire remaining room, for the cheap version of this pattern.

This is the pattern most people mean when they say a coding agent has memory.
Measured against this budget, it is unaffordable. **Unchanged.**

## 7. Anthropic's memory tool — just-in-time, not load-everything

**[read]** —
`platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool`, read
directly.

> *"Memory supports just-in-time context retrieval. Rather than loading all
> relevant information up front, an agent records what it learns in memory
> files and reads them back on demand."*

The injected system prompt begins *"IMPORTANT: ALWAYS VIEW YOUR MEMORY
DIRECTORY BEFORE DOING ANYTHING ELSE"* — list first, then open what looks
relevant. On hygiene: *"You can rename or delete files that are no longer
relevant. Do not create new files unless necessary."*

Under "Memory expiration", the entire published guidance is one sentence:
*"Periodically delete memory files that haven't been accessed in a long
time."* That is thinner than the question deserves. **Unchanged.**

## 8. GitHub Copilot — the only reported numbers, and a better staleness rule than the first version credited

**[summary]** — `github.blog`, `docs.github.com` and three secondary
write-ups were all tried this session and all refused. Everything here is a
search summary of GitHub reporting on its own product.

- Memories expire after **28 days** — but the timer is not purely time.
  *"When an agent verifies a memory and finds it accurate, the memory is
  recreated, extending its life."* And memories are *"validated against the
  current codebase before being applied, so stale or inaccurate context is
  never used."*
- Reported effect: *"a 3% increase in precision and 4% increase in recall"* on
  code review, and a **7% increase in pull request merge rates** (reported as
  90% against 83%) for the coding agent.

**Two things changed from the first version.** It described Copilot's rule as
*"a mechanical answer to staleness, based on time alone"* and argued time was
the wrong signal. That is not what Copilot does: the signal is **time since
last confirmed useful**, with verification against the codebase before use.
That is a genuinely better mechanism than a timer, and it undercuts the first
version's argument on question 5.

What has not changed: this is a vendor measuring itself, and even taken at
face value the effect is **small** — single digits.

## 9. Mem0 — and the thing it abandoned

**[read]** — `mem0ai/mem0` README from GitHub raw, re-read this session.

Mem0's April 2026 release removed a mechanism it had been built around:

> *"**Single-pass ADD-only extraction** — one LLM call, no UPDATE/DELETE.
> Memories accumulate; nothing is overwritten."*

The previous design had a model decide, per incoming fact, whether to add,
update, delete or do nothing. **That is exactly the obvious design for keeping
memory clean, and they took it out.** Scores rose sharply: LoCoMo 71.4 → 92.5,
LongMemEval 67.8 → 94.4.

Two cautions from the README itself **[read]**: *"Scores reflect Mem0's
managed platform, which includes proprietary optimizations not available in
the open-source SDK"*, and the benchmarks run *"at a top_200 retrieval
budget"* — two hundred candidate memories per query.

So the lesson is not "never delete". It is: *when you can retrieve selectively
from a large store, it is better to accumulate and retrieve well than to ask a
model to prune.* Bottega cannot retrieve selectively, because everything it
keeps is loaded — so this finding tells Bottega the opposite of what it tells
Mem0. **Unchanged.**

## 10. Cursor's automatic memories — could not be reached at source

**[summary]** — `docs.cursor.com`, `cursor.com`, `forum.cursor.com` and the
write-up the quotations trace to were all tried this session and all refused.

Reported: Cursor generates memories from chat, and developers accumulate
*"a ton of 'memories'… applied at a global level, with all those memories
being very project-specific"*; auto-extracted memories *"captured the right
idea with mushy wording"*. The reported response from some teams:

> *"Some teams disable auto-generated memories entirely and keep all
> persistent context in reviewed, committed rules — a reasonable call in
> regulated codebases where every instruction the AI receives should be
> auditable."*

And the reported reason: *"rules go through pull requests while memories
don't. There's no diff, no blame, or rollback."*

**This is the closest thing in the survey to Bottega's own posture**, arrived
at independently by people who tried the automatic version first — and it
points at the same answer as Part Three below. It remains **[summary]**, and
the first version's confidence in it was higher than one unreachable write-up
supports.

## 11. The other commercial systems, briefly

- **Letta (formerly MemGPT)** — treats the context window like virtual memory,
  with tiered "core memory" blocks the agent edits itself **[summary]**.
  Reported limitation: the OS-paging metaphor adds complexity and latency that
  does not always pay off **[summary]**.
- **Zep** — a temporal knowledge graph with explicit fact-validity intervals
  **[summary]**.
- **LangMem (LangChain)** — **[read]**, README from GitHub raw. Ships two
  postures: memory tools called *"in the hot path"*, and a *"background memory
  manager that automatically extracts, consolidates, and updates agent
  knowledge"*. Notable that it ships both rather than picking one.

All require a database. All solve the personalization problem. **Unchanged.**

## 12. What the research patterns say about *when* to write

**[summary]** for all of this — no paper could be opened by any route.

- **ExpeL** extracts insights by comparing **successful and failed**
  trajectories, not by recording every episode.
- **Agent Workflow Memory** induces workflows from **commonly reused**
  routines — a pattern must recur before it is stored.
- **Voyager** **[read, README]** keeps *"an ever-growing skill library of
  executable code"*. Its entries are verified programs, not advice.
- **Reflexion** **[read, README]** exposes `use_memory` as a flag that can be
  turned off *"to run a baseline run"* — the authors expected someone to check
  whether memory helped.

Common thread: **something has to happen more than once, or be verifiable,
before it earns a place.** **Unchanged.**

## 13. Long context is itself a cost

**[summary]** — Chroma's "Context Rot" report was tried again this session and
refused. Reported: across 18 frontier models, *"every single one… gets worse
as input length increases"*, and *"a model with a 200K token window can
exhibit significant degradation at 50K tokens."* Consistent with the reasoning
already in `AGENTS.md`. **Unchanged.**

---

# PART THREE — THE COUNTER-CASE

The first version reported that nothing it found contradicted any of the four
settled decisions. That result was produced in part by a policy of citing no
academic source at all. With that policy dropped, there is a counter-case, and
it is aimed lower than any of the four decisions — at the premise underneath
them.

## Two studies report that context files do not help

**[summary], and this is the weakest-sourced material in the file.** Neither
paper could be opened by any of the ten routes listed at the top. **Their
existence and contents could not be confirmed from this container.** They are
cited because omitting the only disagreement found would be worse.

- **"Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for
  Coding Agents?"** (Gloaguen, Mündler, Müller, Raychev, Vechev; reported
  February 2026). Reported finding: *"providing context files does not
  generally improve task success rates, while increasing inference cost by
  over 20% on average"*, reportedly holding *"across different LLMs, coding
  agents, and for both LLM-generated and developer-committed context files."*
- **"Do Context Files Help Coding Agents? A Two-Agent Ablation Study on Real
  Repositories"** (reported July 2026). Reported: two agents, 17 tasks, 288
  runs; *"context strategy does not measurably move correctness on either
  agent"*; and the proposed explanation that *"agents fail on implementation
  skill — feature design, pattern selection, exact wiring — not missing
  repository knowledge that a context file could supply."*

**Why this matters more than any finding in Part Two.** If it holds, it does
not argue for a different memory design. It argues that a file loaded into
every session — `AGENTS.md` itself, and any memory file beside it — buys less
than this repository assumes, and costs more. That is a claim against the
foundation, not against one of the four decisions.

**What it does not establish.** Both are reported to measure *task success on
benchmark issues*. Most of what `AGENTS.md` does here is not task success: it
is who reviews what, what gets merged, what gets said plainly to the owner.
Nothing in either reported result speaks to that. And neither could be read.

**The honest position.** This repository should not treat "instructions in a
file improve the work" as established. It is not established, and the only
evidence found in either direction is unreachable or vendor-reported. What
justifies `AGENTS.md` here is not measured effectiveness — it is that the
rules are visible, arguable and deletable, which is a different and smaller
claim than the one the budgets are written as if to defend.

## The four decisions, re-scored

| decision | first version | this version |
|---|---|---|
| per-agent memory, project scope, committed, capped, no infrastructure | supported, with one mechanical correction | **partly supported.** The mechanism exists for subagents **[read]** but is unusable by the one subagent here (§3). For Michelangelo it must be an ordinary committed file. |
| plain text first, embeddings never | supported independently by AutoGPT | **no longer supported.** The primary source says the backends were a refactor casualty, restoration open **[read]** (§5). Nothing else found argues either way at this scale. |
| a clear-out when work closes, from day one | supported | **supported, with a better mechanism available** than the first version proposed — verification on use, not a citation check alone (§8, question 5). |
| build it only when a mistake actually recurs | supported, strongest result | **supported, but over-claimed before.** The research patterns hold (§12). Claude Code's own trigger list is broader than "twice" (question 1). |

**And one finding against all four at once:** the two studies above, if they
hold, say the whole category buys less than assumed. That was missing from the
first version and is the single most important thing on this page.

---

# PART FOUR — THE FIVE QUESTIONS

## The constraint

Measured this session with `node tools/check-budgets.mjs`:

| session | loads now | room to 10,000 |
|---|---|---|
| a building session (opens the build skill) | **7,968 tokens** | **2,032 tokens** — about 8,100 characters |
| a Da Vinci session | 5,266 tokens | 4,734 tokens |
| every session, before opening anything | 3,033 tokens | 6,967 tokens |

Michelangelo is the tight one. `docs/research/` is charged to no session, so
this page itself costs nothing against either number.

## 1. What makes a session write a note?

**Only a mistake that actually recurred. Kept — but the case for it is
weaker than the first version claimed.**

**This is one of the two answers the documentation independently supports.**
Under *"When to add to CLAUDE.md"* **[read]**, the first trigger listed is:

> *"Claude makes the same mistake a second time"*

And the subtractive test, which is the single most transferable sentence in
the survey **[read]**:

> *"Claude skips anything it can derive from the codebase, such as
> architecture, file paths, or debugging fixes. It also skips anything your
> CLAUDE.md files already say."*

**The honest caveat the first version left out.** That "second time" bullet is
one of four, and the other three fire on a *first* occurrence:

> *"A code review catches something Claude should have known about this
> codebase"* · *"You type the same correction or clarification into chat that
> you typed last session"* · *"A new teammate would need the same context to be
> productive"*

So the documentation supports *"a second mistake is a trigger"*. It does not
support *"only a second mistake is a trigger"*. The first version quoted the
one bullet that agreed with the decision already made and did not mention the
other three. That is the failure mode this page was commissioned to look for,
and it happened here.

**The answer still stands, on a different argument.** Not because the field
endorses recurrence-only, but because **this repository cannot afford the
broader triggers.** Two thousand tokens does not fund "a new teammate would
need this". The trigger has two halves, both of which must hold:

1. **It happened twice.** The session that hits the mistake the *second* time
   writes the note, and cites both occurrences. A note that cannot cite two
   occurrences is not a note.
2. **It survives the subtractive test.** Not derivable from the code. Not
   already in `AGENTS.md`. Not confined to a set of files — if it is, it is a
   path-scoped rule instead (Part Five).

The second half now takes more than it did, because Part Five adds a third
claimant. Memory is what is left after `AGENTS.md`, a check, and
`.claude/rules/` have each taken what is theirs. That residue should be small.

## 2. What does a note look like?

**One line. Kept, unchanged.**

```
YYYY-MM-DD  <what to do differently, one sentence>  (#12, #17)
```

**This is the second answer the documentation independently supports**, on two
counts. On shape, the guidance Claude Code gives itself when the index nears
its limit **[read]**:

> *"keep one line per entry, move detail into topic files, and merge or drop
> stale entries"*

On the date, the reason Claude Code writes a `modified` timestamp **[read]**:

> *"The timestamp shows how current the fact is, both to you and to Claude
> when it reads the memory back."*

Here the date goes in the line rather than in frontmatter, because frontmatter
costs bytes Michelangelo does not have — and because *"imported files still
load"* **[read]** means there is no structural trick that makes detail free.

The two pull request numbers are what make the note checkable and prunable,
and they are the guard against the Cursor failure of *"mushy wording"*
**[summary]** — you cannot cite two pull requests for a lesson you did not
learn twice. Nothing else: no type field, no severity, no tags.

## 3. What is the cap, as a number?

**Thirty lines and 2,400 bytes. About 600 tokens. Kept — and this is the
answer most at risk of being right for the wrong reason.**

Both numbers, because lines alone can be gamed by writing long ones — the
lesson this repository learned about its own counting.

**Said first, because the brief asked for suspicion of exactly this.** Thirty
is not derived from evidence. There is no measurement anywhere in this survey
of how many lessons a memory needs to hold to be useful. Thirty is derived
from the budget: 600 tokens is under a third of Michelangelo's remaining 2,032,
which leaves the build skill room to grow. **A design whose main virtue is
that it fits is a design under suspicion, and this one fits.** Memory that is
small because it is useless is not a success.

What stops it being useless is not the number, it is the trigger. Thirty
genuinely recurring mistakes, each surviving the subtractive test, is a lot
for a repository a few weeks old with fewer than ten merged changes. If thirty
ever accumulate, the honest reading is that `AGENTS.md` is failing to prevent
them, and the fix is the rules, not a bigger file.

**The test that would show the number is wrong:** the second recurrence
arrives and one line cannot hold it. If that happens, do not quietly raise the
cap. Say what has to come out to pay for more. The build skill is 18,482 bytes
and the largest single file any session loads; that is where the room is.

**The number this is deliberately not.** Claude Code's own cap is 200 lines or
25KB **[read]** — roughly 6,250 tokens, three times this repository's entire
remaining room. An implementation that simply turned a feature on would
inherit a cap that breaks the budget.

## 4. Does a session read all its notes, or search them?

**Read all of them. Kept, unchanged.**

- The systems that search — Mem0, Zep, Letta — search because they hold
  thousands to millions of items and retrieve hundreds of candidates per query
  **[read, for Mem0's top_200]**. At that scale there is no choice.
- The systems at document scale read everything. Cline: *"I MUST read ALL
  memory bank files at the start of EVERY task"* **[read]**.
- Anthropic's own tool splits the difference: list the directory, then open on
  demand **[read]**. Claude Code does the same — index every session, topic
  files only when needed **[read]**.

The danger in skipping notes is real **only when the index is titles**. A
title is a guess about relevance. Claude Code's index is *"one line per
memory"* — the line carries the claim, not a label for it. So the cap and the
read-all policy are the same decision: at thirty one-line notes, reading
everything costs about 600 tokens, the index *is* the notes, and there is
nothing left to retrieve. Search would be machinery guarding a page of text.

This holds only while question 3's cap holds.

## 5. Who prunes, when, and how is a stale note recognised?

**Changed. The first version's argument against time was wrong about the
facts.**

That version said Copilot uses a 28-day timer, that *"time is the wrong signal
for this kind of memory"*, and that a timer *"deletes the good notes at the
same rate as the bad."* Copilot's rule as reported is not a plain timer
**[summary]**: the clock resets when an agent verifies the memory and finds it
accurate, and memories are validated against the current codebase before being
applied. The signal is **time since last confirmed useful**, which does not
delete good notes at the same rate as bad ones — it is aimed at exactly that
problem.

**So the mechanism to copy is verification on use, not expiry and not a
citation check alone.** A note is stale when it fails to verify:

- **its citation no longer resolves** — the pull requests, path or rule it
  names is gone. This is the half a machine can check, and it is the same
  shape as the dead-file-reference budget already in `AGENTS.md`. A note whose
  citation does not resolve should stop the check.
- **a check now catches the mistake**, so the note is furniture.
- **it has not been confirmed useful** by any session since it was written.
  This is the half no machine here can check, and it is where a person is
  needed.

**Who, and when:**

- **When a piece of work closes** — already decided in `docs/VISION.md`. The
  session that closes the work reads all thirty lines (it already loaded them)
  and *proposes* deletions.
- **It proposes, it does not act silently.** Mem0's abandonment of
  model-driven delete **[read]** is direct evidence against letting a session
  quietly rewrite memory. Every deletion is a line in a reviewed diff.
- **The owner can delete any line at any time**, because thirty lines is short
  enough to read.

That auditability is the one genuine advantage this repository has over every
system in the survey. Memory here is a committed text file, so every change is
a reviewed diff. None of the commercial systems can say that — and it is the
same property the Cursor teams reportedly went back to **[summary]**.

---

# PART FIVE — THE QUESTION THE CORRECTION OPENED

## Is `.claude/rules/` with `paths:` a better answer than memory?

**To part of the problem, yes — and it is cheaper than anything else on this
page.** This repository spent a day on its startup budget without knowing the
mechanism existed.

### What it is

**[read]** — `code.claude.com/docs/en/memory`, the `.claude/rules/` section.

Markdown files in `.claude/rules/`, one topic per file, discovered
recursively. A file may carry YAML frontmatter naming glob patterns:

```markdown
---
paths:
  - "tools/**/*.mjs"
---
```

> *"Rules can also be scoped to specific file paths, so they only load into
> context when Claude works with matching files, reducing noise and saving
> context space."*

### What it can do that memory cannot

- **It is free until relevant.** A path-scoped rule is not loaded at startup.
  It enters context only when a session reads a matching file. Nothing else in
  this survey is free until relevant: `AGENTS.md` is loaded always, a memory
  file would be loaded always, and imports *"still load and enter the context
  window at launch"* **[read]**.
- **It is committed and reviewed.** It is a file in the repository, so every
  change to it is a diff in a pull request — the property the Cursor teams
  reportedly went back to memory to get **[summary]**.
- **It reaches subagents.** A non-fork subagent's startup context includes
  *"project rules"* **[read]**, so a rule reaches Da Vinci without giving
  Da Vinci a write tool.
- **It survives compaction.** *"Rules with `paths:` frontmatter reload as
  Claude reads files they apply to"* **[read]**.

### What it cannot do

- **It only fires when a matching file is read.** *"Path-scoped rules trigger
  when Claude reads files matching the pattern, not on every tool use"*
  **[read]**. So a rule is absent until something opens the file — and the
  troubleshooting section names this as a way instructions go missing: *"a
  path-scoped rule that hasn't matched a file since"* **[read]**. Anything that
  must govern a session **before** it touches a file cannot be path-scoped.
- **It has no pattern for most of this repository's lessons.** "Never review
  your own work", "say what you did not do", "do not claim a review passed"
  are about how a session behaves, not about a set of files. Those stay in
  `AGENTS.md`.
- **It is not memory.** Nobody writes it automatically; a session proposes it
  and a review accepts it. Here that is a feature, not a shortfall — but it
  means `.claude/rules/` answers "where should this guidance live", not "how
  does a session learn".
- **A rule is a rule.** `AGENTS.md` budgets rules with no stated reason at
  zero. A path-scoped rule must carry its reason, or the budget stops being
  true the moment one is added.
- **Without a `paths:` field it is not free.** *"Rules without a `paths` field
  are loaded unconditionally"*, *"at launch with the same priority as
  `.claude/CLAUDE.md`"* **[read]**. An unconditioned rule is `AGENTS.md` under
  another name, with the bulk moved somewhere the check cannot see it.

### Where the line falls

**If the recurring mistake is confined to a set of files, a path-scoped rule
beats memory on every axis:** committed, reviewed in a diff, carries its
reason, deletable when the reason stops holding, and costs nothing until a
session opens one of those files.

**If it is about how a session behaves, it has no pattern**, and it belongs in
`AGENTS.md` as a rule — or, if it is too specific to be a rule the owner would
want to read, in memory.

So the three-way test at question 1 becomes a four-way one, in this order:

1. Can a **check** catch it? Then a check, not words.
2. Is it a **rule about how sessions work**? Then `AGENTS.md`, with its reason.
3. Is it **confined to a set of files**? Then `.claude/rules/` with `paths:`.
4. Only what is left is **memory**.

**`.claude/rules/` shrinks the problem memory has to solve. It does not
replace memory**, because step 4 is not empty — the lessons this repository has
actually hit so far (miscounting its own budget, claiming a review happened)
are process lessons, not file-shaped ones.

Candidates that are file-shaped today, if anyone wants one:
`tools/**/*.mjs` (watch a check refuse before believing it works),
`.claude/agents/**` and `.claude/skills/**` (these are the files where Virgil
must ask the owner before merging).

**This is a recommendation, not a decision.** Whether to use `.claude/rules/`
at all is the owner's.

### A note for whoever builds any of this

**`tools/check-budgets.mjs` knows nothing about `.claude/rules/`, and would
undercount if one were added.** It charges `AGENTS.md`, `.claude/settings.json`,
the name and description of each skill and agent definition, and the heaviest
single skill or agent definition in full. That list is fixed in the file and
does not include the rules directory.

The consequences, in order of severity:

- **An unconditioned rule would be loaded into every session and charged
  zero.** That is a silent hole in the "what every session loads" number — and
  it is precisely the failure `AGENTS.md` already names: moving the bulk
  somewhere else and pointing at it from one line, with neither number moving.
- **A path-scoped rule is not loaded at startup**, so under the current
  definitions it arguably belongs to neither number. But it does enter context
  during the work, which is when accuracy falls. The check would need a third
  number, or an explicit written decision that path-scoped rules are out of
  scope and why.
- **The same hole exists for `.claude/agent-memory/<name>/MEMORY.md`**, up to
  25KB of which enters a subagent's system prompt **[read]**, and which the
  check also cannot see.

**Recorded here, not fixed.** Fixing the check is out of scope for this
session, and a check that learns about rules is itself a change to the thing
that governs every session — which under `AGENTS.md` gets a review.

---

# THE RECOMMENDATION, IN PLAIN WORDS

**Do not build memory yet.** That was already decided, and the survey agrees
more strongly than before — the only studies found that measure whether files
like this help report that they do not.

**When a mistake does recur, ask four questions in order.** Can a check catch
it? Is it a rule about how sessions work, for `AGENTS.md`? Is it confined to a
set of files, for `.claude/rules/` with `paths:` — which costs nothing until a
session opens one of those files? Only what survives all three becomes memory.

**If it becomes memory:** one file, one line per lesson, thirty lines and
2,400 bytes, each line dated and citing the two pull requests where the
mistake happened. Read in full by the session that loads it. Pruned when a
piece of work closes, by a session that proposes deletions in a reviewed diff
and never deletes silently. Deletable by the owner at any time, because it is
one page of plain English.

**Give it to Michelangelo.** Leave Da Vinci alone. The product would let
Da Vinci keep committed notes, but doing so hands it a write tool it was
deliberately denied, and puts its notes in the diff it is reviewing.

**Before any of that, the counting has to learn about `.claude/rules/` and
`.claude/agent-memory/`,** or the budgets stop being true the first time one
is used.

**And the thing to hold on to:** the cap fits the budget, which is exactly the
reason to distrust it. What keeps memory honest is not thirty lines. It is
that a note needs two pull request numbers before it exists.

---

# WHAT COULD NOT BE ESTABLISHED

1. **Whether a memory or instruction file helps a coding agent at all.** The
   only measurements found are a vendor's about its own product **[summary]**
   and two academic studies reporting no measurable effect **[summary]**. None
   could be read at source. Nothing here establishes that memory will make
   this repository better. It establishes what shape to give it *if* it is
   built.
2. **The two studies reporting no effect could not be confirmed to exist.**
   Ten routes to arXiv and its mirrors were tried this session; all refused.
   They are cited anyway, and marked, because they are the only disagreement
   found and omitting them is how the first version reached an unanimous
   result.
3. **Whether `disallowedTools` overrides the automatic Read/Write/Edit
   enablement** that comes with a subagent's `memory:` field. The enablement is
   documented **[read]**; the precedence is not documented anywhere reachable,
   and was not tested.
4. **Whether subagent memory at `project` scope really is exempt from
   "machine-local".** The sub-agents page says the directory is in the
   repository and version-controllable **[read]**; the memory page says auto
   memory is machine-local **[read]**; the sub-agents page says subagent memory
   *is* auto memory **[read]**. The reading taken here (§2) is the coherent
   one, not an observed one. **Nobody has turned the feature on and looked.**
5. **The reason AutoGPT's vector backends were removed, beyond
   "incompatible".** The discussion thread the documentation links to is on
   `github.com`, which refused every request this session.
6. **Cursor's memory problems at source.** Every Cursor domain was refused.
   The quotations trace to one write-up that could not be opened.
7. **Nothing here was measured in this repository.** No memory file was
   written, no rule was added, no session was run with either. Every number
   about Bottega comes from `tools/check-budgets.mjs`, which was run this
   session.

# WHAT THIS SESSION DID NOT DO

- Did not build any memory or any rule, and did not change `AGENTS.md`, either
  skill, any agent definition, `tools/check-budgets.mjs`, `tools/reads.json`,
  or either limit.
- Did not fix the counting hole in Part Five. It is recorded for whoever
  builds, as the brief required.
- Did not test whether thirty lines is the right number. It is reasoned from
  the budget, and Part Four says so plainly rather than dressing it as
  evidence.
- Did not resolve the Da Vinci write-tool conflict, or the machine-local
  ambiguity. Both are surfaced and left for the owner.
- Did not read the two papers in Part Three, or any academic source.
- Did not review this page. A fresh session does that.
