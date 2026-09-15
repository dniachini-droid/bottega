# What makes Praxis easy to use, and which of it Bottega already has

Reference for anyone deciding what Bottega should do about the way it talks to
its owner. Nothing here binds until it becomes a rule in `AGENTS.md` with its
reason attached — see `docs/research/README.md`.

**How claims are marked.** Everything below was **read directly** from the
files in `/home/user/app-development-` on 15 September 2026. No figure here
came from a search summary.

**But there is a second kind of uncertainty this folder has not had to mark
before, and it runs through the whole page.** A file that says an agent will
greet you a certain way is not a recording of an agent greeting anyone.
**No Praxis session was run, watched, or transcribed for this research.** So
every claim of the form "Praxis does X" is really "the Praxis instructions
tell the model to do X", and the gap between those two is exactly the gap the
question was asked about. Where that gap matters, it is called out in place as
**not observed running**.

The occasion for the research was one remark from one person about one build:
that Praxis interpreted what they wanted and got it right first time, where a
plain Claude session had them going back and forth. One build, one person, no
control. Section 9 says which parts of that are plausibly the system and which
are most likely the model.

---

## 1. What the user types, and what comes back

### The front door

`/px` prints a directory of every other command. It is a table, and it ends
with a plain-language routing guide written for somebody who does not know the
names:

> **Quick guide — describe what you need:**
>
> - "Build this" or "fix this bug" → `/px-smith`
> - "Spec this out" or "write stories" → `/px-foundry`
> - "Is this secure?" or "audit this" → `/px-argus`
> …
> - "Not sure who handles this" → `/px-help`

There are **24 slash commands** in `.claude/commands/`, of which 17 start an
agent, and the rest are utilities (`/preflight`, `/px-health`, `/px-morning`,
`/da`, `/px-desk`, `/px-pipeline`).

### What a command actually does

Every agent command is the same ten-line file. `px-smith.md` in full, minus
the front matter:

> You must fully embody this agent's persona and follow all activation
> instructions exactly as specified. NEVER break character until given an exit
> command.
>
> 1. LOAD the SHARED rules …
> 2. READ its entire loaded contents …
> 3. LOAD the FULL agent file from `…/agents/smith.md`
> 4. READ its entire contents …
> 5. IMMEDIATELY RUN `node …/px-mcp-bootstrap.mjs claude /px-smith` and do not
>    continue if it fails
> 6. IMMEDIATELY RUN `node …/session-lifecycle.sh start smith …` before any
>    output
> 7. FOLLOW every step in the `<activation>` section precisely
> 8. DISPLAY the welcome/greeting as instructed
> 9. PRESENT the numbered menu
> 10. WAIT for user input before proceeding

### What the user sees first

In order, from `smith.md`'s activation steps:

1. Desk items — top three by priority, under the literal heading
   `--- Items on your desk ---`, **before** the greeting, formatted
   `[{priority}] {title} (from {source agent})`, and if there are more:
   `... and {N} more pending. Ask to see full desk.`
2. A model badge — "state the model you are actually running on … as a badge
   near the greeting title", sourced from the harness line and echoed
   verbatim, never guessed.
3. A greeting "in character" — **there is no template for this anywhere.**
   Step 6 says only `Show greeting in character, then display numbered list of
   ALL menu items`. The wording is the model's each time.
4. A numbered menu of that agent's workflows.
5. A stop. `STOP and WAIT for user input - do NOT execute menu items
   automatically`.

**So: nothing is built until the user picks something.** The first turn is
pure orientation.

### The whole path from "I want to build X" to software

Two real paths exist.

**The short one — `/px-smith`, then `[QS]`, then `[QD]`.** Quick Spec is four
steps and ends by handing the user a line to paste into a *fresh* session:

```
quick-dev {finalFile}
```

Quick Dev is six steps. Together that is ten numbered steps with the user
answering at five of them.

**The long one** runs the full agent suite — Foundry writes specs and
decomposes them into stories, Smith implements, Argus reviews, Quinn and Lens
and Patrol prove the runtime, Harbor deploys — with work handed between them
on desk files. Section 6 covers it.

---

## 2. How it captures intent

This is the heart of the friend's remark, and it is the part with the most
machinery behind it.

### Mechanism one: scan the code *before* asking anything

Quick Spec step 1 is called "Analyze Requirement Delta". After a one-line
greeting — literally `"Hey {user_name}! What are we building today?"` — it does
**not** start asking questions. It reads:

> ### 2. Quick Orient Scan
>
> a) **Before asking detailed questions, do a rapid scan to understand the
> landscape**
> …
> d) **Build mental model:** … What questions do you NOW have, informed by the
> code?
>
> **This scan should take < 30 seconds. Just enough to ask smart questions.**

Then, and only then:

> ### 3. Ask Informed Questions
>
> Instead of generic questions like "What's the scope?", ask specific ones
> like:
> - "`AuthService` handles validation in the controller — should the new field
>   follow that pattern or move it to a dedicated validator?"
> - "`NavigationSidebar` component uses local state for the 'collapsed' toggle
>   — should we stick with that or move it to the global store?"
> - "The epics doc mentions X - is this related?"
>
> **Adapt to `{user_skill_level}`.** Technical users want technical questions.
> Non-technical users need translation.

**This is the single most transferable idea on this page, and Bottega does not
have it.** The questions are not a fixed list. They are generated after
reading the code, so each one is about a fork that actually exists in this
codebase. A question like that is answerable by somebody who does not know the
code, because it names both options.

`user_skill_level` is a real config field (`_praxis/px/workflows/config.yaml`,
set to `intermediate`) but it is consulted in only **four** places across eight
mentions in the whole repository: the line above, one line in Quick Dev's final
summary (`{Explain what was implemented based on user_skill_level}`), the code
review's instructions (`workflows/dev/code-review/instructions.xml`), and one
in the brainstorming workflow. The rest are declarations and the config line
itself. It is not a system-wide register.

*The first version of this page said three places and missed the code review's,
which is a stronger use than either of the two it named. Caught by the review
of pull request 18. The conclusion is unchanged on the real count.*

### Mechanism two: capture, then read back for confirmation

Still in step 1:

> ### 4. Capture Core Understanding
>
> a) **From the conversation, extract and confirm:**
> - **Title** … **Slug** … **Problem Statement** … **Solution** …
>   **In Scope** … **Out of Scope**
>
> b) **Ask the user to confirm the captured understanding before proceeding.**

Then it writes a file and reports:

> "Created: `{wipFile}`
>
> **Captured:**
> - Title: {title}
> - Problem: {problem_statement_summary}
> - Scope: {scope_summary}"

### Mechanism three: a written standard the spec must meet

From `quick-spec/workflow.md`:

> **READY FOR DEVELOPMENT STANDARD:**
>
> A specification is considered "Ready for Development" ONLY if it meets the
> following:
>
> - **Actionable**: Every task has a clear file path and specific action.
> - **Logical**: Tasks are ordered by dependency (lowest level first).
> - **Testable**: All ACs follow Given/When/Then and cover happy path and edge
>   cases.
> - **Complete**: All investigation results from Step 2 are inlined; no
>   placeholders or "TBD".
> - **Self-Contained**: A fresh agent can implement the feature without reading
>   the workflow history.

Step 4 will not finalise until it is met, and if it is not met the agent is
told to say which sections are weak and propose fixes.

### Mechanism four: "Advanced Elicitation" — a menu of 50 thinking methods

Offered at the end of **every** checkpoint in the spec flow. It picks five
methods from a 50-row file by matching them against the conversation, then:

```
**Advanced Elicitation Options**
Choose a number (1-5), [r] to Reshuffle, [a] List All, or [x] to Proceed:

1. [Method Name]
2. [Method Name]
3. [Method Name]
4. [Method Name]
5. [Method Name]
r. Reshuffle the list with 5 new options
a. List all methods with descriptions
x. Proceed / No Further Actions
```

The 50 methods are things like *Pre-mortem Analysis* ("Imagine future failure
then work backwards to prevent it"), *First Principles Analysis*, *5 Whys Deep
Dive*, *Stakeholder Round Table*, *Red Team vs Blue Team*, *Expand or Contract
for Audience*. Each carries a one-line description and an output shape.

Crucially, applying one does **not** change the document by itself:

> CRITICAL: Ask the user if they would like to apply the changes to the doc
> (y/n/other) and HALT to await response.
> CRITICAL: ONLY if Yes, apply the changes. IF No, discard your memory of the
> proposed changes.

And it loops: `Critical loop behavior: Always re-offer the 1-5,r,a,x choices
after each method execution` … `Continue until user selects 'x'`.

**How many rounds, then?** Unbounded, and entirely the user's choice. The
fixed structure is four spec steps and six build steps; the elicitation loop
sits beside four of them and runs as long as the user keeps picking numbers.

### Mechanism five: propose-and-veto, not open questions

Quick Dev's direct mode gathers context and then shows:

```
**Context Gathered:**

**Files to modify:**
- {list files}

**Patterns identified:**
- {key patterns}

**Plan:**
1. {task 1}
2. {task 2}

**Inferred AC:**
- {acceptance criteria}

Ready to execute? (y/n/adjust)
```

Note `**Inferred AC**` — it writes the acceptance criteria itself, from the
request, and asks the user to correct them rather than supply them.

The governing rule is in `base-rules.md` § Communication:

> **MAKE THE CALL — DON'T HAND THE STEERING BACK EVERY TURN**: ending each
> response with "want me to do A or B?" taxes the user with a decision per turn
> and makes them hold the map. Make the small decisions yourself, do the work,
> and say what you did — offer the undo rather than the choice. Ask the user to
> decide **only** when the answer genuinely changes the outcome and you cannot
> settle it from the code, the files, or a sensible default; then ask once, at
> the end, as one question. **Unchanged**: destructive or hard-to-reverse
> actions are still confirmed first (§ Quality Gates), and a real ambiguity
> still gets one short clarifying question — safety and correctness beat
> brevity.

### Mechanism six: a separate agent whose only job is intent

`/px-magnus` builds nothing. Its deliverable is "a captured, pressure-tested
principal intent record the suite can act on". Two named modes — Mirror
("reflect & sharpen, never affirm") and Socratic ("challenge for coherence,
never truth") — and it announces which one it is in. Its `[IN] Interview` item
runs "the full values/intent interview across the 6 neutral categories".

Manny and Star have the same shape for their own domains: `[PB] Build Project
Brief` and `[CB] Build Creator Brief`, both described as "reused across
sessions (gates all content work)".

This is intent capture as a **durable, reusable artefact**, not a conversation.
There is a per-project layer (`user-intent.md` — "Larry's distilled
Principles / Decision-style / Provenance for that project, each principle
tagged `{source, confidence, last-confirmed}`") and a per-person layer
(Magnus's `intent-record.md`), and Foreman reads both at decision time.

---

## 3. Menus — yes, everywhere, and there is a rule forbidding the alternative

Numbered menus are the default interface. Every agent ends its activation with
one. Every workflow checkpoint is one:

> Display: "**Select:** [A] Advanced Elicitation [C] Continue to Deep
> Investigation (Step 2 of 4)"
>
> b) **HALT and wait for user selection.**

And there is an explicit prohibition on the modal alternative:

> **NO MODAL ASK-USER-QUESTION TOOL**: Do not use the AskUserQuestion tool when
> collaborating with the user. Present questions inline in your response as
> plain markdown — numbered options `(1)` / `(2)` / `(3)` so the user can type a
> number, AND/OR free-form text. Free text replies are always valid; never
> insist on a numbered pick. If you have multiple questions in one turn, label
> them `Q1` / `Q2` so the user can answer mixed.
>
> **Why**: The modal forces discrete choices and breaks the user's ability to
> add nuance, partial picks, qualifiers, or sideways answers. Free-text replies
> carry signal the modal silently discards.

Free text is always accepted. Two rules make sure of it. From `base-rules.md`
§ Navigation:

> **SELF-NAVIGATION**: When the user describes a task instead of picking a menu
> item, match user intent to the workflow whose scope fits best, then execute
> that workflow.

And every menu handler ends with `IF Any other comments or queries: respond
helpfully then redisplay menu`.

**Note the tension inside Praxis itself.** § Communication says *don't hand the
steering back every turn*; the workflow files halt at a menu at nearly every
step. Both are in force at once, and the rule reconciles part of it in its own
last sentence — a real ambiguity still earns one question, and anything
destructive is still confirmed. What it does not reconcile is a numbered menu
offered at a step that is neither ambiguous nor destructive, which is most of
them. Which one wins in
a live session is **not observed running**.

---

## 4. The language rules

`base-rules.md` opens with § Communication, and it is the strongest part of the
whole 165,000-byte file. Quoted at length because this is the section worth
comparing to Bottega line by line:

> - **ANSWER-FIRST, GLOSS THE JARGON, TABLE THE CONFUSABLES**: Lead with the
>   verdict/answer, then the reasoning behind it. Gloss every domain term inline
>   the first time it appears — the reader may not be fluent in it; translate
>   the vocabulary, never dumb down the substance. When two similar-sounding
>   things are being confused, lay them side by side in a small table rather
>   than in prose. Serve a reader who navigates by clarity, not by jargon
>   density.
>
> - **PLAIN WORDS — VOCABULARY IS THE COST, NOT LENGTH**: long is fine when it
>   earns its place; rare words are not. Use the plain everyday word — `use`
>   not `utilise`, `start` not `initiate`, `so` not `therefore`, `stops` not
>   `precludes`. Use a verb instead of an abstract noun ("you can't do that with
>   it", not "the mechanism cannot express it"). One name per thing, every time
>   — do not vary the term for elegance. Never use in-house shorthand as if it
>   were English (*load-bearing, seam, lever, blast radius, canonical,
>   orthogonal, adherence, premise falsified*). No noun stacks longer than three
>   words. No idioms — say the literal thing. Active voice, one idea per
>   sentence. **Applies to what the USER reads; written artifacts for other
>   agents keep their precision.** (Adapted from ASD-STE100 Simplified Technical
>   English.)
>
> - **SHAPE OUTPUT TO BE ACTED ON**: a user cannot hold in their head what is
>   not on the screen, and the gap between "understood it" and "did it" is where
>   work dies. So: **lead with the answer or the action**, never with context or
>   a plan — a command, path, or file goes first. **No preamble** ("Great
>   question", "Let me…", "I'll…", "Looking at your…"). **No closing
>   pleasantries** ("Hope this helps", "Let me know if you need anything else").
>   Number multi-step work, one bounded action per step. **Restate where you
>   are** on multi-turn work ("step 3 of 5 done; next X"). Cap lists at five —
>   past that, split into do-now vs later, ranked. Finish one thing before
>   raising the next; park a second issue and offer it once, at the end. Give
>   time estimates in concrete units, never "some work". State errors
>   matter-of-factly — cause then fix, never "Uh oh". **Before sending,
>   delete**: an opening sentence that announces what you are about to do, a
>   closing sentence that asks "anything else?", any "by the way" sidebar, and
>   any rare word with a common equivalent. (Adapted from the `i-have-adhd`
>   skill, MIT.)
>
> - **DO THE FILING QUIETLY**: desk entries, receipts, memories, learnings,
>   directive capture and status flips are all still mandatory — but the user
>   should not have to watch the bookkeeping happen. Do them without narrating
>   them. Mention an artifact in one short line only when the user needs to know
>   it exists.
>
> - **MATCH THE USER'S REGISTER**: a casual question gets a casual answer. Do
>   not turn a passing remark into a formal review, a logged decision, or a
>   retraction — treat conversational asides as thinking-out-loud, not as a
>   specification. Weight the response to how serious the ask actually was.
>   (This is the counterweight to the capture-and-comply reflex: every rule in
>   this file exists because something went wrong, so the file only ever pushes
>   toward more caution and more process. Nothing else pushes back on how it
>   lands on the reader. This rule does.)
>
> - **WHEN THE USER COUNTERS YOU, IT'S INFO-GATHERING — NOT REJECTION**: When
>   the user pushes back on a recommendation or rejects a fix, treat the counter
>   as surfacing context you lacked, not a verdict to argue against. Briefly ask
>   "what changed your view / what's the context behind that?" … A rejection
>   reason is a SPEC CONSTRAINT: honor it, don't re-litigate it.

There is a second, shorter section, § Naming and Labeling Discipline:

> **PLAIN ENGLISH DEFAULT**: Describe things in plain English. Short codes
> (`P-147`, `ARG-FA-001`, `CAND-H`, `§C-Option-2`, `Tier 1/2/3`, etc.) exist for
> cross-agent state-tracking inside knowledge files, pattern databases, and
> audit folders — they MUST NOT lead a user-facing sentence without a
> plain-English form alongside.

Its stated reason is a direct quotation from the owner:

> "all i want is for things to either be labelled in a way that makes sense and
> i can keep track of what is going on (plain english) and I want Epics and
> stories to always be named epics and stories"

**Reply length.** § Session Debrief sets a hard shape for the last message:

> the last thing you show the user on exit is a **3-4 line farewell**, not a
> multi-section report. The old 15-25 line template … was written to build trust
> and instead became something the user skips. A summary nobody reads is not a
> quality standard, it is unread output.

```
### Done — **{h:MM am/pm}**
{One line: what actually changed or was decided this session.}
{One line: what is left, or "Nothing open."}
{Durability line}
Next: /px-{agent} on {ID} — {why them, in a few words}
```

Note the last line: **every exit names the next command to type**, with the
item id in it, so the user can paste it straight in.

**Is there anything about writing for a non-engineer?** Not directly. There is
no rule anywhere in Praxis that says the reader is not a programmer. The
closest things are: `user_skill_level` in three places; one parenthetical about
the owner being dyslexic (which is why timestamps carry no date); and the
plain-words rules above, which are written for a reader who dislikes jargon
rather than one who could not follow it. **Praxis writes clearly for a
technical reader. Bottega writes for a reader who is not one. These are not the
same target, and the Praxis text should not be copied as if they were.**

---

## 5. Loops — where it retries, re-checks, and refuses to move on

Seven distinct mechanisms, in rough order of how much they would matter to a
first-time build.

**1. The adversarial review, run on the model's own diff.** Quick Dev step 5
builds a diff from the commit captured at the very start of the workflow, then
hands it to a separate reviewer with, deliberately, no other context:

> If possible, use information asymmetry: load this step, and only it, in a
> separate subagent or process with read access to the project, but no context
> except the `{diff_output}`.

The reviewer's brief (`review-adversarial-general.xml`) is a persona:

> You are a cynical, jaded reviewer with zero patience for sloppy work. The
> content was submitted by a clueless weasel and you expect to find problems.

with a quota and an anti-padding clause:

> Find at least ten issues to fix or improve. Every finding must describe a
> concrete failure scenario — "could theoretically..." and "worth noting" do NOT
> count. If you cannot find 10 real issues, report fewer with higher quality
> rather than padding.

**2. Zero findings is treated as a failure — in some of its files, and the
opposite in others.** Three files say:

> **If zero findings:** HALT - this is suspicious. Re-analyze or request user
> guidance.

**And two say the reverse.** `_praxis/px/pxb/agents/patrol.md:131`:

> Zero findings is a valid result — don't invent problems

with the same line in that agent's drift anchor. *This one is worth Bottega
noticing rather than borrowing: the half of Praxis that says a clean result is
valid is the half that agrees with `docs/REVIEWER.md`, which says no findings
is a complete review and warns that a reviewer which must produce findings will
produce them. The half that halts on zero is the one to leave alone.*

**3. The critic loop — up to three rounds.** `smith-sidecar/workflows/
critic-loop.md`:

> 1. Run the critic.
> 2. If the verdict is `NEEDS_CHANGES`, fix the findings.
> 3. Re-run the critic against the new diff.
> 4. Repeat for at most 3 rounds total.
> 5. Do not mark the story task complete until the critic returns `APPROVED`.

**This is the rule Bottega has deliberately reversed. See section 8.**

**4. The escalation ladder — what stops a session flailing.** From § Epistemic
Discipline:

> try 1 → try 2 (same approach; a second attempt is fair). **Try 3 = switch to
> the ALTERNATE approach** — a different angle or the opposite assumption, not
> the same fix again … **Try 4 = escalate UPWARD to the agent above you** … only
> when that tier can't resolve does it reach the user.
>
> **REGRESSION STOP**: a repair that made the state WORSE — a score dropped, a
> green test now fails, the symptom widened — is its own stop condition. Stop
> and review the change that caused it BEFORE any further attempt; do not spend
> the remaining rungs on a loop going backwards.

**5. The two-contradiction stop.** For a bug the user has seen with their own
eyes:

> If the user (or a verification lane) reports the bug is still live AFTER an
> implementation pass that you treated as progress, STOP. Do not start another
> implementation pass. Request the latest user artifact … Two contradictions on
> the same bug = mandatory escalation, no exceptions. This is true even if your
> local tests pass.

And a vocabulary ban to go with it:

> **Forbidden language until the verification lane reports green**: `verified`,
> `closed`, `fixed`, `resolved`, `no remaining issues`, `done`. Allowed
> language: `patched in code`, `local tests pass`, `awaiting Lens/Quinn/Patrol
> runtime proof`, `implemented`, `reviewed`.

**6. Refusal before starting.** The Feasibility Gate is five checks run before
a story is allowed into the queue. It can BLOCK on an unproven technology, on a
queue with 16+ items waiting, on 6+ open production bugs, and — the interesting
one — on whether the thing is worth building at all:

> ### Step 5. Worth-It Check — "Should We Build/Port This?"
>
> Steps 1-4 ask CAN we. This asks SHOULD we. … Re-making a working
> hand-maintained tool → **BLOCK by default**.

and:

> A BLOCKED gate is the system working correctly. … The worst outcome is not a
> blocked story — it's a story that enters the queue, consumes Smith's time, and
> fails because nobody said "we can't build this."

Smith is told to enforce it at intake, in the first person:

> Say: "This story requires [domain] which I haven't built in this codebase.
> flagging to the user."

**7. Verify-after-every-file.** Smith's own rules:

> After modifying any file, run the project's type checker … before proceeding
> to the next file or task. If type errors appear, fix them immediately — do not
> accumulate errors across multiple changes. … This is non-negotiable.
> Accumulated errors compound exponentially. If 3+ consecutive verify-fix cycles
> fail on the same issue, HALT and reassess your approach — you may be solving
> the wrong problem.

**8. `/preflight`** — a nine-step sweep before deployment: incremental change
analysis against the last preflight's commit, static analysis, type check,
production build, environment-variable family consistency, and more. It
**fixes** what it finds rather than reporting it. If any part of the friend's
"right on first deployment" is the system rather than the model, this command
and the runtime-proof rules in point 5 are the likeliest candidates.

---

## 6. Sessions — how many, and what passes between them

### Handoffs are files, not conversations

There is no session-to-session channel. Every agent has a **desk file**
(`_projects/{id}/desk/{agent}.md`), with `## Pending` and `## Done`. When one
agent's work produces something for another:

> **DESK WRITE**: When your work produces actionable output for another agent,
> write an entry to their desk file … under `## Pending`. Always produce a
> durable reference artifact (plan, brief, knowledge entry) alongside the desk
> entry. tell the user what you wrote and to whom.

A desk entry is deliberately small:

> **DESK SIZE**: Desk items are POINTERS, not documents. Maximum 20 lines per
> entry. Action, status, priority, and file references only. Research, analysis,
> and technical detail belong in reference files.

And closing one requires reading the target back:

> (1) If the item involved writing to another agent's file: READ that file back
> and confirm your change exists. Quote the specific line. …
> BAD: "Done -- updated all agents." GOOD: "Done -- verified step 5b exists in
> smith.md:44, vigil.md:34."

### How many sessions one job passes through

For one user-facing feature built the full way: **Foundry** (spec and story
decomposition) → **Smith** (build) → a **fresh critic** (up to three times) →
**Argus** (adversarial review) → **Lens** (if the screen changed) and/or
**Quinn** (runtime) and/or **Patrol** (live click-through) → **Harbor**
(deploy) → **Larry** (harvest what was learned). Seven or more, with Foreman
optionally briefing before and checking after.

Praxis is explicit that they run **at the same time, in different tabs**:

> Multi-tab is the default working mode, so shared state (a desk,
> `sprint-status.yaml`, the user desk, a learnings file) can move UNDER you
> mid-session … Before you act on or report shared state, RE-READ it at the
> moment of the verdict, not from the boot snapshot.

This is where a large amount of the 165,000 bytes goes: session leases,
duplicate-instance detection, per-instance task slots, git worktrees per agent,
a commit lock, and a hook that warns when two agents might commit to the same
branch. **All of it exists to make concurrency safe, and none of it would be
needed if sessions ran one at a time.**

### What triggers the next session

The user does, by typing the next command — which is why every debrief ends
`Next: /px-{agent} on {ID}`. There is also a **conductor** (Foreman's `[CO]`
item) that dispatches workers automatically, but only for items a human has
hand-marked `**Auto**: yes`:

> the item carries a hand-typed `**Auto**: yes` marker, so the conductor will
> take it on the next wave … the marker gate is Ben's deliberate opt-in and
> STAYS — do NOT arm items to shrink the gap.

### Limits, and what happens at them

- **Parallel agents**: `max_parallel_agents: 8` in config, described as "a cost
  knob AND safety valve" because breaching the provider's concurrency ceiling
  "throws an API-limit error that kills EVERY running agent".
- **Queue depth**: 0–10 stories waiting is healthy, 11–15 warns, 16+ blocks new
  ones.
- **Desk soft-cap**: 10 actionable items per desk; crossing it at boot means
  "triage at least one to Done/knowledge before accepting new items. Advisory,
  not hard-blocking."
- **Critic rounds**: 3.
- **Same-task retries**: 3, then switch approach; 4, then escalate.
- **Context compaction**: not a limit but a handled event — every agent
  re-reads a "drift anchor" file from disk every 15 tool calls, and on noticing
  its own context was summarised must announce `"Context compacted.
  Re-anchoring: [current task], [key constraints]."` and carry on.

---

## 7. Does it merge, commit, push?

**Commit: yes, automatically, at every session exit.** From § Git Hygiene:

> Today nothing commits unless Ben does it by hand. Don't leave your session's
> work as an uncommitted pile. As the LAST write-side step of your exit
> checklist … the normative ordering is **commit → (push ONLY when opted-in) →
> vendor-if-suite → DEBRIEF**.

The commit is done by a script that stages **by explicit path only**:

> It stages by EXPLICIT pathspec — ONLY the paths that are provably yours — and
> **NEVER `git add -A` / `git add _projects/`**: concurrent multi-tab leases are
> the default, so a coarse stage would sweep a co-agent's in-flight edits into
> your commit.

**Push: no, unless the user opts in for that session.** This was reversed on
17 August 2026 and the reason is written in:

> **PUSH IS OPT-IN, OFF BY DEFAULT** (⚠ reversed 2026-08-17 … origin is a
> distribution point four forks pull from, so a push mid-session is
> *publishing*, and release timing is Ben's call): the exit COMMITS every
> surface locally — fully durable — but does **NOT** push unless the human opts
> in for that session … `PRAXIS_NO_PUSH=1` forces a hold and **WINS over any
> opt-in**.

And a careful note that an unpushed commit is not a problem:

> **`durable` MUST NOT be read as "pushed"**: an unpushed commit is the NORMAL,
> correct, fully-durable outcome — a held push is an informational sub-status,
> never a ⚠, a failure, a downgrade, or a nag.

**Pull requests: Praxis does not use them as its workflow.** There is no
open-a-pull-request step anywhere in the build path. Pull requests appear only
in two places: a suggestion that a future check could verify a "shipped via PR
#N" claim by running `gh pr view N`, and a rule about reviewing contributions
that arrive from forks. **Merging is not something a Praxis agent does for the
user at all.** The kill switch `PRAXIS_NO_EXIT_COMMIT=1` exists for
"pair-programming sessions where Ben wants to eyeball before anything is
committed".

**Bottega and Praxis have made opposite bets here.** Praxis keeps the work on
one line and commits constantly; Bottega puts every change behind a pull
request that a person or a checked rule decides to merge. Neither is copied
from the other.

---

## 8. Which of this Bottega already has, lacks, or has deliberately refused

### Already in Bottega, in a shorter form

| Praxis has | Bottega has | Where |
|---|---|---|
| Plain-words rule, a banned-word list | "Plain language for the owner. Do not use a technical term and then define it." | `AGENTS.md`; virgil skill § "Do not translate the term" |
| "Restate where you are" on multi-turn work | "Every reply during a build says which stage it is at, out of seven" | build skill |
| Every exit names the next command | "End every reply with `Next:`" — one line, last thing, exactly that heading | virgil skill |
| Evidence before claiming | "Check before you assert. Every claim … needs a command in the same reply that establishes it." | virgil skill |
| Fresh-context adversarial review | Da Vinci — fresh session, **and a different model family** | build stage 4 |
| Zero findings is suspicious | "always when the review found nothing at all — he presses the button" | build stage 7 |
| Capture the scope to a file both sides can check | The scope page, three headings, in `projects/<id>/scope/` | build stage 2 |
| Spec must be self-contained for a fresh agent | "Put the facts in the prompt, not directions to the facts" | `AGENTS.md` |
| Say what is still open | "Say what you did not do, as plainly as what you did" | `AGENTS.md`; virgil skill |
| Handoffs through a channel everyone can read | "The pull request is the message bus" | virgil skill |

**Bottega is markedly ahead on two of these.** Its review uses a *different
model family*, which Praxis does not do. And its four reporting questions —
"What is different in the app? What do I do differently? What could go wrong,
and how would I notice? What is still not right?" — have no equivalent
anywhere in Praxis.

### Absent from Bottega, and worth considering

1. **Scan the code before asking the questions.** Bottega's stage 1 is five
   fixed questions asked cold. Praxis reads the codebase for thirty seconds
   first, then asks questions that name the actual alternatives. This is the
   change most likely to produce the friend's "it interpreted what I was
   asking", and it does not conflict with any Bottega rule — stage 1 already
   says *"Ask only what would change what gets built"*, and a code scan is how
   you find out which questions those are.

2. **Read the captured understanding back before writing the scope page.**
   Praxis confirms the extracted title, problem, solution, in-scope and
   out-of-scope with the user *before* creating the file. Bottega writes the
   scope page at stage 2 after a yes to the slice, but there is no explicit
   read-back of the five answers in the owner's own words.

3. **A written standard the scope must meet.** Praxis's five-point "Ready for
   Development" test is checked at a gate and the agent is told to name which
   sections fail. Bottega's scope page has three headings and no stated bar.

4. **Inferred acceptance criteria offered for correction.** Praxis drafts the
   acceptance criteria and asks the user to adjust them. Bottega asks the owner
   question 5 — "How will we know it is right?" — and uses his answer. For an
   owner who is not an engineer, being handed a draft to correct is easier than
   being asked to produce one. This is a real candidate and it strengthens the
   thing stage 1 already calls load-bearing.

5. **A refusal before starting.** Nothing in Bottega says a session may decline
   a job as unbuildable, over-queued, or not worth building. Praxis's
   Feasibility Gate does all four, and frames a block as the system working.

6. **A structured pre-deploy sweep.** `/preflight` finds and fixes before
   anything ships. Bottega's stage 6 tells the owner what to look at; nothing
   checks the build first.

7. **Per-agent memory that accumulates.** Praxis keeps `codebase-patterns.md`,
   `hot-files.md`, `learnings.md` and knowledge indexes per agent per project,
   loaded at boot. Bottega has `docs/REFUSALS.md` and the scope pages, and no
   equivalent of "files that change together in this project" or "this file has
   burned us before". **But see the warning below — this is also where Praxis's
   token bill comes from.**

8. **A reusable intent record for the person, not just the job.** Magnus's
   `intent-record.md` and Foreman's `user-intent.md` persist what the owner
   values across builds. Bottega captures scope per build and nothing per
   person.

### Where Bottega deliberately does the opposite, and why

These must not be copied without arguing against the stated reason first.

**1. More than one review round on the same work.** Praxis's critic loop runs
up to three rounds and Smith may not mark a story complete until the critic
says APPROVED. Bottega forbids this outright:

> **Never run a second review round on the same version.** … *Why: a second
> pass on unchanged code raises what it catches only slightly but produces 62%
> more false alarms, and precision collapses from 0.30 to 0.20. Once the real
> errors run out, reviewers invent them.*

Bottega's stage 5 allows one fix cycle, whose re-check is a review of a *new*
version, and then stops: *"If the re-check still finds blockers, stop and tell
the owner. Do not start a third round."* Note that Praxis's loop is not quite
the forbidden thing — it also re-reviews a new diff each round — but three
rounds against Bottega's one is a real difference, and the reason above bears
on it directly.

**2. Many agent definitions.** Praxis has 17. Bottega's budget is 2, and the
reason is explicit:

> under matched conditions, five of six multi-agent systems performed worse
> than a single agent and cost more, and the noise floor in that literature is
> about 15 points — wider than most of the gains anyone has published. The one
> multi-agent pattern with a clean, replicated benefit is a fresh session for
> review.

So Magnus, Manny, Star, Foreman and the rest are not candidates for copying as
agents. **Their *methods* are a different matter** — a scope stage that asks
Magnus-style questions costs no agent definition.

**3. Loading a large instruction file before work starts.** This is the
sharpest contrast on the page, and the numbers are checkable.

| | tokens loaded before work |
|---|---|
| Bottega, every session | about 4,581 |
| Bottega, heaviest session | about 9,512 |
| Praxis, one `/px-smith` session | about **60,600** |

The Praxis figure is `base-rules.md` (164,932 bytes) plus `smith.md` (32,097)
plus the config and the seven sidecar files the activation steps require —
242,546 bytes, at four bytes to the token. Bottega's figures are what
`tools/check-budgets.mjs` printed on `main` on 15 September 2026. Praxis is
roughly **six times** Bottega's heaviest session, and would be over Bottega's
10,000-token limit **six times over**.

*The first version of this page printed 4,805 and 8,865 here, said it would be
over thirteen times, and worked out the room left from the lighter number. All
three were wrong and the review of pull request 18 caught them. The two figures
were taken from a branch that has not merged and may not; thirteen was
60,600 divided by the every-session load, which is not a budget; and the room
that matters is the room in the heaviest session, not the lighter one. **Run
the check. Do not copy a figure out of a document, including this one.***

Bottega's reason:

> Context volume by itself degrades accuracy — the same task passes 8 runs in
> 10 on a small context and 3 in 10 on a large one, whether or not the extra
> material is relevant. This is a correctness budget, not only a cost one.

**Praxis knows this too.** It has an "unload" mechanism (Story 73-2) that
strips activation-only rules out of resident context — and the flag is **off by
default**, so the full file loads. It also has a whole § Subagent Delegation
section whose purpose is to keep heavy reading out of the main context, and a
"drift anchor" re-read every 15 tool calls to survive the compaction that a
context this size makes inevitable. **A good deal of Praxis's machinery exists
to manage a problem Bottega's budget prevents.** Anything copied from Praxis
has to be paid for out of the room in the **heaviest** session, because every
recommendation above would be written into the build path — and that room was
**about 488 tokens** when this was written, not the 5,419 the lighter number
would suggest. Most of what is worth copying is a short instruction rather than
a file, which is the only reason any of it fits.

**4. Menus.** Praxis's default interface is a numbered menu at nearly every
step. Virgil's rule is the opposite:

> **One action, never a menu.** End with one thing to do. Not three options
> with trade-offs for him to weigh. … *Why: a menu moves the decision to the
> person with the least information about the code.*

Interestingly, Praxis's own § Communication agrees with Bottega — "MAKE THE
CALL — DON'T HAND THE STEERING BACK EVERY TURN" — while its workflow files
disagree with it. The right lesson is probably that the *numbered-option
format* is worth having for the one genuine fork Bottega already allows
("something about what the app should be, rather than how to build it"), and
the *menu at every step* is not.

**5. Committing and pushing for the owner at every session exit.** Praxis
commits automatically. Bottega puts the work behind a pull request and merges
only what `AGENTS.md` permits, with the three exceptions his to approve. That
is a settled decision of 14 September 2026 and Praxis offers no argument
against it.

---

## 9. What is the system, and what is just the model

The friend compared Praxis to a plain Claude session. Three things in their
remark, and honest answers for each.

**"It correctly interpreted what I was asking and intending."** This is the one
with the most system behind it: the code scan before the questions, the
read-back for confirmation, the written spec that must meet a standard, the
50-method elicitation menu, and a plain-words rule adapted from a real
simplified-English standard. A plain session does none of these unprompted.
**But we cannot separate the effect of the mechanism from the effect of
spending four structured turns on the problem before writing any code.** A
plain session told "before you write anything, read the code and ask me three
questions about the choices you found" would get much of the same benefit.
Most of the value here looks like *forcing a slow start*, which is cheap to
copy and does not need seventeen agents.

**"Executed it and got it right on first deployment."** Partly system:
`/preflight`, the verify-after-every-file rule, the adversarial review with its
ten-finding quota, the ban on the word "fixed" until a runtime lane has seen
it, and the rule that a bug the user saw in the running app can only be closed
by proof of the same kind. Those are real and a plain session has none of them.
**But "first deployment" on one build is one sample.** It could as easily be a
small, well-understood feature, or the model having a good day. Nothing here
distinguishes them.

**"I was going back and forth so much before."** This is the claim most likely
to be about the system, because the going-back-and-forth is exactly what the
spec-before-build split is designed to remove. The user is made to do the
clarifying once, in a structured place, rather than repeatedly in the middle of
a build. **Bottega's seven stages already have this shape.** What Bottega does
not have is the informed-question step that makes the clarifying *easy to do
well*.

### What could not be established at all

- **No Praxis session was run.** Every claim of behaviour here is a claim about
  an instruction file. The greeting, in particular, has no template anywhere —
  it is whatever the model writes that day, and it may be the single largest
  contributor to the feeling the friend described. Untestable from files.
- **How much of the 165,000-byte rules file the model actually follows.** With
  around 60,000 tokens resident before work starts, the evidence Bottega cites
  says accuracy falls. Whether the § Communication rules at the top of the file
  survive that is precisely what nobody here can check. They are the rules the
  friend would have felt.
- **Which of the two contradictory Praxis rules wins** — "make the call, don't
  hand the steering back" versus "HALT and wait for user selection" at nearly
  every workflow step. One of those is a much better experience than the other
  and the files do not say which happens.
- **Whether the informed-question step actually fires.** It is four lines
  inside step 1 of one workflow. Nothing checks that the scan happened before
  the questions were asked.
- **Whether any of it helps a non-engineer specifically.** Praxis has no rule
  about that reader, and its own owner is technical enough to be running a
  17-agent framework with a Docker vector database. The friend may be closer to
  that reader than Bottega's owner is.
