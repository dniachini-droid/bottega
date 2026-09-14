# The prompt that starts a session

Reference for deciding what goes into the prompt a window hands a working
session, how long it may be, how it is produced, and whether anything should
measure it. Nothing here binds until it becomes a rule in `AGENTS.md` with its
reason attached — see `docs/research/README.md`.

This page is about **size and composition**. What may travel between sessions
and what must not is `docs/research/HANDOFF.md`, and it is not repeated here.

---

## How claims are marked

The folder's convention is two classes: read directly, or taken from a search
summary. Gathering this page produced a third, and it is marked separately
rather than folded into either.

- **Read directly.** The file was fetched and its own text read here. Every
  such claim below names the file and, where it matters, the line.
- **Primary source reached, read through a summariser.** The page was fetched,
  but a small model extracted the answer; the original text was not read here.
- **Search summary only — unverified.** The source could not be fetched. What
  is recorded came from search result summaries, which are themselves written
  from secondary write-ups.

Three domains refused every attempt from this container: `anthropic.com`,
`cognition.ai` / `cognition.com`, and `research.trychroma.com`. `arxiv.org` and
`aclanthology.org` also refused. Everything attributed to those below is in the
third class and is marked in place. `code.claude.com`, `github.com` and
`raw.githubusercontent.com` served every request.

*Why the third class exists: a fetch that ends in a summary is closer to a
search result than to reading, and calling it "read directly" would quietly
upgrade it.*

---

## What was surveyed

Named, so that a later session can go and check any of them.

| Approach | What it is | How it was seen here |
|---|---|---|
| Claude Code — skills, memory, hooks, subagents, compaction, `plugin eval`, `/doctor` | The tool this workshop runs on, documented in public | Read directly (`code.claude.com/docs/en/*.md`, including a 710 KB changelog) |
| Aider — the repo map | Prompt material generated from the repository and squeezed to a token budget | Read directly (`aider/repomap.py`) |
| GitHub `spec-kit` | Spec-driven development: a chain of generated artefacts, commands as checked-in templates | Read directly (`templates/commands/implement.md`, `README.md`, `CHANGELOG.md`) |
| OpenAI Agents SDK — handoffs | A fixed prompt prefix prepended by a function | Read directly (`handoff_prompt.py`) |
| `promptkit-os` issue #141 | Somebody actually gating prompt size in CI | Reached, read through a summariser |
| `ctxmeter` | A tool that measures what context compression destroys | Read directly (`README.md`) |
| Cognition / Devin | "Don't Build Multi-Agents", and its 2026 successor | Search summary only |
| Anthropic engineering posts | Context engineering; the multi-agent research system; the Claude 5 prompt deletion | Search summary only |
| Manus | Context engineering lessons from a shipped agent | Search summary only |
| Chroma "Context Rot", "Lost in the Middle", IFScale | Measured degradation with input length and instruction count | Search summary only |
| BMAD-METHOD | Story-file handoffs between agent roles | Fetched, but the README carries no detail on prompt composition — nothing usable found |

---

## 1. What belongs in a dispatch prompt, and what does not

This workshop's rule is **put the facts in the prompt, not directions to the
facts**, because a fact a session must go and find costs part of the accuracy
it has left. The survey does not settle this either way. It draws a line
through it, and the line is sharper than the rule.

### Where the evidence supports the rule

Claude Code's own memory documentation says the thing this workshop discovered
independently and wrote into its budget check:

> "Splitting into `@path` imports helps organization but doesn't reduce
> context, since imported files load at launch."

*(Read directly, `memory.md`.)* An always-followed pointer is not a saving. It
is the same bytes arriving by a longer route, plus a hop the session can get
wrong. On that class of material — anything the session will certainly open —
inlining is strictly better, and the house rule is right.

The reason the workshop gives for inlining the scope page also holds up
against a real failure mode named in the build skill: a session sent to a file
that is missing reads the promise that the file is there as evidence it is
looking in the wrong place. Nothing in the survey contradicts that.

### Where the evidence is against the rule

Everything the leaders have built in the last two years points the other way
for material a session **might** not need.

- Claude Code's `claude-api` skill went from **"~200k+ tokens to ~25k by
  loading reference docs on demand"**. *(Read directly, changelog.)* That is an
  eight-fold cut achieved by replacing facts with directions to facts, inside
  the tool this workshop runs on.
- MCP tool schemas are **deferred by default**. Even the opt-in setting only
  loads them upfront "when they fit within 10% of the context window".
  *(Read directly, `context-window.md`.)*
- Skills exist for exactly this: "a skill's body loads only when it's used, so
  long reference material costs almost nothing until you need it." *(Read
  directly, `skills.md`.)*
- `spec-kit`'s implement command — the closest published thing to this
  workshop's build prompt — does not inline the plan. It runs a script, parses
  a feature directory, and then says **"IF EXISTS: Read research.md for
  technical decisions and constraints"**, and the same for the constitution and
  the quickstart. *(Read directly, `templates/commands/implement.md`.)*
- Anthropic reportedly removed **more than 80% of Claude Code's system
  prompt** for the Claude 5 generation "with no measurable loss on our coding
  evaluations", and named "upfront context becomes progressive disclosure
  through skills" as one of the shifts that made it possible. *(Search summary
  only — unverified. The primary post could not be fetched.)*

### The line the leaders actually draw

Not "facts versus pointers". **Certain versus conditional.**

- Material every session of this kind will use: inline it. A pointer costs a
  hop and saves nothing.
- Material only some sessions will use: point at it, and let the session fetch
  it. Inlining it charges every session for the ones that needed it.

The house rule is the first half stated as though it were the whole thing. It
is right about the scope page — a build session that does not read the scope
has done the wrong job — and it is wrong about anything a session opens only
sometimes. **That is where it stops being right, and that boundary is what
should be written down, not the rule as it stands.**

### One thing no source disputes

Where in the prompt a thing sits matters. Claude Code's compaction
"truncation keeps the start of the file, so put the most important
instructions near the top of `SKILL.md`" *(read directly,
`context-window.md`)*, and the academic result in the same direction is
"Lost in the Middle": accuracy is highest at the beginning and end of the
input and "degrades by more than 30% when relevant information is positioned
in the middle", replicated across six model families *(search summary only —
unverified)*. IFScale reports a "bias towards earlier instructions" *(search
summary only — unverified)*.

---

## 2. Is there a length at which a prompt costs more than it buys?

**Nobody has published a threshold for a dispatch prompt.** What exists is
degradation curves for context in general, and published rules of thumb for
instruction files.

Measured degradation, all of it search summary only and unverified:

- **Chroma, "Context Rot" (July 2025).** 18 frontier models; every one
  degraded at every input-length increment tested; "a model with a 200K token
  window can exhibit significant degradation at 50K tokens."
- **IFScale.** Instruction counts from 10 to 500, 20 models; "even the best
  frontier models only achieve 68% accuracy at the max density of 500
  instructions", with a bias toward earlier instructions.
- **"Lost in the Middle".** The U-shaped curve above.

Published rules of thumb, read directly:

- `CLAUDE.md`: "target under 200 lines per `CLAUDE.md` file. Longer files
  consume more context and reduce adherence."
- Skills: "Keep `SKILL.md` under 500 lines."
- Claude Code's own failure-pattern list: "Ruthlessly prune. If Claude already
  does something correctly without the instruction, delete it or convert it to
  a hook."

**And the evidence that points the other way, which matters more here than any
of the above.** Anthropic's multi-agent research system reportedly found that
**token usage alone explains 80% of the variance** in performance on their
BrowseComp evaluation, with tool calls and model choice accounting for most of
the rest — and that "prompt phrasing, instruction style, and the things teams
typically iterate on did not show up as primary drivers." *(Search summary
only — unverified.)*

Read plainly: on that evaluation, **spending more tokens was what made the
system better**, and fiddling with the wording was not. A prompt is not a cost
to be minimised. It is a purchase, and the question is whether it bought
anything.

`ctxmeter`'s README puts the same warning at the other end, about tools that
sell context reduction:

> "None of them advertise an information-loss number. Compaction is lossy by
> construction, so there is one, and it is measurable."

*(Read directly.)*

**Answer to the question: no length is known at which a prompt starts costing
more than it buys, and the honest reading of the evidence is that length is
the wrong variable.** The curves above say long context degrades; the
multi-agent finding says more context wins. Both can hold, because what
degrades is *attention spread over material that is not doing work*. A prompt
of 27,400 tokens is not condemned by its size. It is condemned if most of it
is not doing work — and nothing here measures that.

---

## 3. How is the prompt produced?

Four patterns, in ascending order of how much the machine does.

**Typed by hand.** What this workshop does. No published system found here
does it for dispatched work. It is what everything below was built to replace.

**A fixed prefix prepended by a function.** The OpenAI Agents SDK ships
`RECOMMENDED_PROMPT_PREFIX` — nine lines explaining that handoffs exist and
that transfers must not be mentioned to the user — and a function
`prompt_with_handoff_instructions(prompt)` that returns the prefix plus the
caller's prompt. *(Read directly.)* Small, but the shape matters: the standing
part is a constant in source control, not retyped per dispatch.

**A checked-in template with slots.** `spec-kit`'s commands are markdown files
in the repository with frontmatter and a `$ARGUMENTS` placeholder. The user's
words go in the slot; everything else is version-controlled text that changes
only when somebody changes the template. *(Read directly.)*

**Generated from the state of the work, to a budget.** Two examples, and they
are the most interesting thing in the survey.

- **Aider's repo map.** Aider does not paste the repository into the prompt and
  does not paste a hand-written summary of it either. It builds a ranked list
  of code symbols from the repository as it stands, then **binary-searches for
  how many of them fit a token budget**: default `map_tokens=1024`; when no
  files are in the chat it multiplies that by `map_mul_no_files=8` to give a
  wider view; it accepts a tree within 15% of the target and otherwise keeps
  halving. If the repository is too large to process it prints "Disabling repo
  map, git repo too large?" and sets the budget to zero. *(Read directly,
  `repomap.py`.)* The prompt's size is a **parameter**, not an outcome.
- **Claude Code's dynamic context injection.** A line in a skill written as
  `` !`git diff HEAD` `` is replaced by the command's output "before Claude
  sees the skill content, so the instructions arrive with the current diff
  already inlined." *(Read directly, `skills.md`.)* The facts are in the
  prompt, and no human typed them.

That last one is worth dwelling on, because it dissolves the argument this
workshop has been having with itself. "Facts in the prompt" and "do not type
the prompt by hand" are not in tension. The facts get in by being fetched at
assembly time.

---

## 4. What is kept out on purpose, and how?

The commission asked for mechanisms that refuse, not mechanisms that ask. They
exist, and all of the following were read directly.

**A hook that rejects the prompt outright.** A `UserPromptSubmit` hook exiting
with code 2 "Blocks prompt processing and erases the prompt." Not a warning —
the prompt does not reach the model. This is the only mechanism found anywhere
in the survey that can refuse a prompt for what is in it.

**A hard cap on injected text.** "Hook output strings, including
`additionalContext`, `systemMessage`, and plain stdout, are capped at 10,000
characters. Output that exceeds this limit is saved to a file and replaced
with a preview and file path ..." The over-long material is not rejected and not
silently truncated — it is **converted into a pointer**. The system decides
for you where the line between facts and directions falls.

**A budget that drops the oldest material.** After compaction, Claude Code
re-injects the body of each skill the session invoked, "capped at 5,000 tokens
per skill and 25,000 tokens total; oldest dropped first." Invoke enough skills
in one session and the earliest ones are gone.

**A fit test before loading.** MCP tool schemas load upfront only "when they
fit within 10% of the context window."

**A refusal on unexpected fields.** Skill frontmatter rejects keys nobody asked
for: "Unexpected key(s) in SKILL.md frontmatter: argument-hint. Allowed
properties are: ..." *(This is the same shape as the schema refusal already
recorded in `HANDOFF.md`, arriving from a different direction — there for what
a packet may contain, here for what an instruction file may declare.)*

**A prerequisites script the command cannot skip.** `spec-kit`'s implement
command runs `check-prerequisites.sh --json --require-tasks --include-tasks`
before anything else, and then computes a PASS/FAIL table from the checklist
files on disk. The gate is a script and a count, not a request.

**A CI job with a number.** `promptkit-os` issue #141 adds a separate
`token-budget` job: Balanced template ≤ 2,500 tokens (2,076 at the time), Lite
≤ 1,500 (845), with per-task baselines of 12,861 / 24,666 / 24,761 tokens; a
`--strict` flag makes the measurement script exit 1, and the error names the
budget: "Balanced 3076 tok exceeds 2500 budget — see docs/BENCHMARKS.md."
*(Primary source reached, read through a summariser. Opened and closed
14 September 2026.)* This is the only example found of somebody gating prompt
size in CI, and it is a small project, not a leader.

**What nobody found:** no mechanism anywhere in the survey refuses a *dispatch
prompt* for being too long. Caps exist on instruction files, on hook output,
on re-attached skills, on tool schemas. The prompt a window hands a worker is
unmeasured everywhere this session could see.

---

## 5. What was tried and abandoned

The category the commission called most valuable and hardest to find. Six,
graded by how well attested they are.

**Anthropic deleted most of Claude Code's own system prompt.** Reportedly more
than 80% for the Claude 5 generation, with "no measurable loss on our coding
evaluations", after finding "we were overconstraining Claude Code, both
through our system prompt and in our `CLAUDE.md` files and skills" — with
overlapping rules forcing the model to spend tokens resolving contradictions
before starting work. *(Search summary only — unverified, and the strongest
single item on this page, which is unfortunate. The primary post, attributed
to Thariq Shihipar and titled "The new rules of context engineering for
Claude 5 generation models", is on a domain this container cannot reach.)*

**A skill that learned from every run was abandoned for one that learns
rarely.** "Before v2.1.205, the bundled skill told Claude to fold in anything
a run learned, which caused frequent merge conflicts." Now "Claude edits the
recorded file only when it steered a run wrong, such as a command that failed
or a missing step." *(Read directly, `skills.md`.)* A self-growing instruction
file was shipped, and then stopped, by the people who ship the tool.

**Inlining imports was withdrawn in one surface.** "Cowork sessions no longer
inline external `@`-imports from user-scope memory files." *(Read directly,
changelog.)*

**Cognition reversed itself on handoffs.** "Don't Build Multi-Agents" (2025)
argued for sharing **full agent traces, not just individual messages**, so
every agent has the context of the ones before it — the opposite of a
facts-only handoff. Its 2026 successor, "Multi-Agents: What's Actually
Working", describes what survived: one orchestrator holding the conversation,
subagents in fresh isolated contexts returning **compressed summaries**, and
most deployed subagents being read-only, with writes kept single-threaded.
*(Both search summary only — unverified.)* The thing they abandoned was
sharing everything. What replaced it is much closer to what this workshop
already does than the 2025 post was.

**Manus rebuilt its agent framework four times**, each time after finding a
better way to shape context, calling the process "Stochastic Graduate
Descent". They also report keeping the prompt prefix byte-stable to preserve
the cache, with cached input roughly ten times cheaper than uncached. *(Search
summary only — unverified.)* The second half is a caution against regenerating
a prompt's standing text on every dispatch.

**`spec-kit` retired three whole agent integrations** — Roo Code ("extension
shut down"), Windsurf ("absorbed into Cognition Devin"), iflow ("product
discontinued") — and removed its legacy `--ai` flags at v0.10.0. *(Read
directly, `CHANGELOG.md`.)* Not about prompt size, but it is what abandonment
looks like when it is written down properly, which is rare.

**And one thing that was not abandoned but should have been.** `spec-kit`'s
implement template, which points at files rather than inlining them
everywhere else, carries an inline table of ignore-file patterns for roughly
fifteen languages — Node, Python, Java, C#, Go, Ruby, PHP, Rust, Kotlin, C++,
C, Swift, R, plus Docker, ESLint, Prettier, Terraform and Kubernetes — in
every run of the command, for a task that touches at most one of them. *(Read
directly.)* **The leaders' templates bloat too, in exactly the same way and
for exactly the same reason: somebody added a case, and nothing ever counted
it.**

---

## Counter-evidence, collected

The commission asked for evidence against the house position, and warned that
a survey agreeing with everything the repository already believed would be
suspicious. It does not agree.

1. The single largest documented prompt reduction in the tool this workshop
   runs on — 200k+ to ~25k tokens for the `claude-api` skill — was achieved by
   **replacing facts with directions to facts**. *(Read directly.)*
2. Claude Code defers MCP schemas, defers skill bodies, and loads path-scoped
   rules only when a matching file is touched. The architecture is built on
   pointers. *(Read directly.)*
3. `spec-kit` points its implementation agent at four files it must read. It
   inlines the user's words and nothing else. *(Read directly.)*
4. Anthropic reportedly cut its own prompt by 80% and named progressive
   disclosure as the replacement. *(Unverified.)*
5. Measured degradation with length is real and reproduced. *(Unverified.)*

And the counter-evidence to *that*, so the correction does not overshoot:

6. Token usage reportedly explained 80% of the performance variance on
   Anthropic's own multi-agent evaluation, in the direction of more being
   better. *(Unverified.)*
7. Context reduction is lossy and the loss is rarely reported. *(Read
   directly, `ctxmeter`.)*
8. Pointing at a file the session will read anyway saves nothing. *(Read
   directly, `memory.md`, and already enforced by this repository's own budget
   check.)*

**Why this survey does not simply confirm the house position:** because the
house position was derived from one true observation — a missing file is a
disaster, and a hop costs accuracy — and then applied to a class of material
it was never tested on. The workshop tested it on the scope page, where it is
right, and generalised. Everyone else tested it on reference material, where
it is wrong. Both parties are reasoning correctly from the case in front of
them.

---

## What could not be established

- **The primary text of the Anthropic posts.** The two most load-bearing
  claims on this page — the 80% deletion and the 80%-of-variance finding —
  rest on search summaries of secondary write-ups. A session on a network that
  can reach `anthropic.com` should re-verify both before any rule is built on
  them.
- **Whether anyone measures a dispatch prompt.** No leader found doing it. One
  small project (`promptkit-os`) gates template size in CI. Absence of
  evidence here is weak: the thing may be common and undocumented.
- **Any published relationship between dispatch-prompt size and whether the
  dispatched work succeeded.** Searched for, not found. The degradation
  research is about model context generally, not about handoff prompts.
- **BMAD-METHOD's story-file handoff.** The repository was reachable but the
  README carries nothing about prompt composition, and the deeper
  documentation paths tried returned 404. Reported as not established rather
  than guessed at.
- **Cognition's two posts in their own words.** Both domains refused.

---

## Recommendation for this workshop

In plain words, and in the order they should be done.

### 1. Stop typing the prompt. Assemble it.

The prompt should be a fixed skeleton with named gaps, and the gaps filled
from things that already exist: the repository and branch, the pull request
number, the scope page's three headings, the standing rules every dispatched
session gets. The only free text is the owner's own words.

**Why this prevents a 27,400-token prompt:** you cannot reach 27,400 tokens by
filling six gaps. That length came from prose composed fresh at each dispatch,
and prose composed fresh has no ceiling. A skeleton has one, and it moves only
when somebody edits the skeleton — which is a visible act, in a diff, that a
reviewer sees. Aider does this with a budget and a binary search; `spec-kit`
does it with a checked-in template; Claude Code does it with commands whose
output is spliced in before the session sees it. All three were read directly.

This also settles the argument the workshop has been having. "Facts in the
prompt, not directions to the facts" survives intact — the facts still go in.
They just get fetched rather than typed.

**Checked against what the workshop already does.** The review of this page
pointed out that the claim above was asserted and never tested against the one
mechanism here that actually produced 27,400 tokens. That was correct, so here
is the test. Two rules already say what a build prompt must contain:
`.claude/skills/virgil/SKILL.md` asks for "the branch, the commit, the
numbers, the exact question, the file the work lives in", and
`.claude/skills/build/SKILL.md` requires that "the scope page's three headings
are written into the prompt in full", plus the pull request number and the
closing requirement to report. That is already most of a skeleton with named
gaps — and it still produced a 27,400-token prompt.

Measured for this dispatch: the scope page is 2,657 bytes, about 664 tokens,
and the identifiers and the closing requirement come to roughly 150 more.
**Everything the two skills actually specify totals about 800 tokens. The
prompt was 27,400.** Around 97% of it was free text that no rule asked for.

This does not weaken the recommendation so much as locate it. The named gaps
were never the problem; the unbounded slot beside them is. A skeleton helps
only if the free-text slot is itself bounded — which is the argument for
measuring the number rather than trusting the shape. **Do that check against
the real prompt before any of this becomes a rule.**

### 2. Narrow the rule with a test, and write the test down.

Replace "put the facts in the prompt, not directions to the facts" with the
same rule plus its boundary:

> Inline what a session of this kind will certainly use. Point at what only
> some sessions will need. The test is: would a session that never opened this
> do the job wrong? If yes, inline it. If no, point at it.

The scope page passes that test and stays inlined. Everything the survey found
being deferred elsewhere fails it.

*Why it needs saying: the reason attached to the current rule — a hop costs
accuracy — is true, and it is also true that charging every session for
material most of them will not read costs accuracy too. A rule with only one
of its two reasons written down will keep growing in one direction, which is
what happened.*

### 3. Print the number, and put it where the owner can see it.

Virgil already opens the pull request before the session starts. The size of
the prompt it then sends belongs in that first comment: how many tokens, and
how they split between skeleton, filled gaps, and free text.

**That one line is the whole fix for the thing that actually went wrong.**
27,400 tokens was not discovered by a check. It was discovered by somebody
counting, once, by hand. Claude Code solved the same problem for itself twice:
`/skill-doctor` reports "what each of your skills costs in context and how
often it gets used", and `/doctor` "finds unused skills, MCP servers, and
plugins versus their context cost" and carries a `CLAUDE.md` trim check. *(Both
read directly.)* Neither refuses anything. They make the cost visible next to
the use, and a person decides.

---

## Should the prompt be measured, and against what?

**Yes — and the seventh number should not be a size limit.**

A size limit on the dispatch prompt fails three ways, and each failure is
already documented in this repository or in this page.

- **It is gameable in the exact way `AGENTS.md` already names.** Move the bulk
  into a file, point at it from one line, and the number falls while the
  session loads the same material. `AGENTS.md` calls this out for the startup
  budget and says it is not hypothetical. `memory.md` confirms it
  independently: an import "doesn't reduce context, since imported files load
  at launch."
- **It can starve the session.** The strongest measured claim in the survey
  points the other way: token usage reportedly explained 80% of performance
  variance, more being better. *(Unverified — but a limit built while that is
  unverified is a limit built on a guess.)* The commission's own caution
  applies: a prompt that is short because it starves the session is not a
  success.
- **It is not what went wrong.** Nothing established that 27,400 was too many.
  What was established is that nobody knew the number. A limit answers a
  question nobody has yet been able to ask.

So the proposal, stated as a budget in the form the other six take:

> **Dispatch prompts sent without a recorded size — 0.**

Every session this workshop starts has its prompt measured at the moment it is
sent, and the number written on the pull request. A dispatch with no recorded
number is the failure. This satisfies the workshop's own rule that a check
must be seen refusing something — it refuses an unmeasured dispatch — without
asserting a ceiling nobody has evidence for.

**Measured against what, then?** Two things, and only the first is affordable
today.

- **Against itself, over time.** The number on each pull request, next to the
  outcome of that build. After a dozen builds there is a record of how large
  the prompts were and how the work went. That is when a ceiling can be argued
  for with evidence instead of assumed.
- **Against the work being done without it.** The rigorous version exists and
  was read directly: `claude plugin eval` runs each case with and without the
  material and reports the difference, three runs per case by default because
  "one run of a non-deterministic agent tells you little", and it warns that
  "if a case scores 1.0 both with and without the plugin, the plugin isn't
  what made it pass." **This workshop cannot afford that** — it runs one build
  per scope, not three with and three without. Recording it here so that the
  gap is known, and so that nobody later claims the cheap measurement is the
  same thing as the expensive one.

*One last caution, which is why the second bullet is not quietly dropped: a
size number alone will push in one direction only. Every number on this page
that got smaller got smaller because somebody decided smaller was better, and
`ctxmeter` is worth quoting twice — "none of them advertise an information-loss
number." A prompt that shrinks and a prompt that improves are not the same
event, and a budget that can only see one of them will eventually mistake the
first for the second.*
