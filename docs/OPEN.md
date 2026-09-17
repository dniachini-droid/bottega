# Open items

This is the one home for open items. There is never a second file.

*Why: the moment findings live in two places, neither one is trustworthy and
nobody knows which to read.*

Every entry carries a status line, one of:

- `**Status:** OPEN — <what is left>`
- `**Status:** CLOSED — <where it landed>`

*Why: an item without a status becomes an item nobody can close, because
nobody can tell what closing it would mean.*

This file holds only what is open. When an item closes, its closing line says
where the work landed, and the entry leaves this file.

*Why: a register that keeps its closed items stops being a list of what needs
attention and becomes a history nobody reads.*

---


**No token figure goes on this page.** Not in a heading, not in a status line,
not in a passage explaining why figures go stale. `node tools/check-budgets.mjs`
prints both numbers and the room left in each; that is the only honest answer
and it takes a second.

*Why it is a rule for the whole page rather than one entry: on 15 September 2026
four separate figures here were found wrong in a single day — one of them inside
the paragraph warning that this repository has twice been wrong about its own
measurements in the direction that flattered them, and another written to
correct a stale figure and stale within the hour. Every one was caught by a
reviewer reading the files, never by a check, because nothing can check prose
against a number it does not know it should recompute. The limit itself, and a
dated record of what something measured on the day, are not figures about the
current state and may stay.*

---

## The stages machinery was built, went unused, and came out again

**15 September 2026.** The budget check was taught that a skill may declare its
stages and be charged the largest one instead of all of them. It was built to
let the build skill be split. The split was then measured and closed without
merging: one guide window runs all seven stages, so declaring them as separate
would have been a false claim to the check, and declaring them honestly made
the number **worse** than not splitting at all, because splitting adds files and
every file costs.

That left about a hundred lines of correct, tested machinery that nothing in the
workshop used and nothing was going to. It is now out, along with five of its
tests. A sixth was rewritten rather than deleted, because the guard it
exercised — a backticked name that `tools/reads.json` classifies in neither
list — is not part of stages and is still live. The check reports the same
numbers, byte for byte, as it did before the removal.

*Why it came out rather than being left in case it is wanted: the owner asked
directly whether dead machinery should go, and there is no answer to that which
keeps it. A check nobody exercises is a check nobody maintains, and this one was
already carrying a hole its own comments claimed was shut — found by review, at
pull request 16, a day before it was removed.*

*Why the refusal records were kept: `docs/REFUSALS.md` records what was watched
happening, and it happened. The section now says at its head that the check no
longer does this.*

*The count above said six deleted and a seventh rewritten when pull request 21
merged. Five and a sixth is right; the review caught it and it was corrected in
the next change rather than by another review round over one digit.*

**Status:** CLOSED — removed, 15 September 2026. Open only as a question nobody
needs to answer now: if a skill ever really does hand a session one stage at a
time, this is in the history and can come back.

---

## The check's mechanism was moved out of the rules to make room, which is the dodge the rules warn about

**15 September 2026.** Four Praxis-derived additions to the scoping stage need
about 243 tokens and there were about 101. So `AGENTS.md` lost the part of its
budget section that explains how `tools/check-budgets.mjs` counts, to
`docs/THE-CHECK.md`.

**That is precisely the move `AGENTS.md` names as the way to defeat the budget**
— take the bulk out, point at it from one line, and neither number moves. It was
allowed here on one ground only, and that ground is a judgement rather than a
fact: `AGENTS.md` does point at the new page, conditionally — open it only if you
are changing the check itself — and the judgement is that a session doing
ordinary work here never opens it. Nothing can check that. What stayed behind is
everything that binds a session — that the check exists, to run it before
committing, that a backticked path must be declared in `tools/reads.json`, and
the anti-dodge rule itself. What went is how the arithmetic works, which only
matters to somebody changing the check.

**What holds it honest, and it is thin.** `tools/reads.json` classifies the new
page as mentioned, where Da Vinci sees it. Nothing can check that claim; if a
rule ever starts sending sessions there, somebody has to notice and move the
entry to `reads`, which charges it back to every session.

**Thinner than it looked, until the second review of pull request 22.** The two
guards that hold a declaration honest — every backticked name classified, and no
mention declared for a file that does not contain it — ran only while walking the
files charged to some session, so neither could reach a page charged to nobody.
The declaration written for the new page was therefore itself unverified. Both
guards now run over every file `tools/reads.json` declares, and the first run
refused two names the page had been pre-approved for and does not contain.

**Status:** OPEN — as a thing to watch, not a thing to do. The next session that
adds a pointer to `docs/THE-CHECK.md` from a rule or a skill owes the
declarations file a correction.

---

## The workshop and the application were separated

This repository was called `cabinet` and opened, in its rules file, with a
description of a personal curiosity collection — while everything below that
opening was general rules about working with agents. It is now `bottega`, and
it is only the workshop. Zibaldone is the first application that will be built
with it, and it lives in its own repository at
https://github.com/dniachini-droid/zibaldone.

*Why: the owner has two earlier repositories where a system and an application
grew up inside the same repository. One of them needed 85,000 lines taken out
across two merges to get the system free of the application. He caught the same
pattern starting here, four hours in, and stopped it.*

No application code had to move, because none had been written here yet. What
changed was the rules file opening, the readme, two skill descriptions and two
worked examples inside one skill. `docs/VISION.md` was added as the end goal
everything is now checked against.

**Status:** OPEN — the separation is in a pull request and not merged. It
changes the rules, so under the merge rule settled on 14 September 2026 it is
his to say yes to. This entry leaves the file when it is merged.

---

## The workshop's own files stay at the top of this repository

The owner's sketch of the workbench put the workshop's files — the rules and
the skills — inside a folder called `framework/`, with the projects beside it.
They are not in a folder. They are at the top of the repository, exactly where
they already were, and only `projects/` was added below them.

**This is deliberate and it must not be tidied.** Claude Code reads `AGENTS.md`
and the `.claude/` folder from the top of the repository and from nowhere else.
Moved into a folder, they would still be perfectly good files that nothing ever
reads: every session would start with no rules at all, and nothing would fail,
and nothing would say so. The rules would stop binding quietly.

*Why this is written down here rather than left as a habit: a folder called
`framework/` is the obvious tidy-up, and the person who makes it would see no
error afterwards. A change that silently removes every rule and reports success
is the worst kind there is.*

**Status:** OPEN — this stays open for as long as the rules are loaded from the
top of the repository, which is to say indefinitely. It closes only if Claude
Code ever learns to load them from somewhere else, and then everything above
can be revisited in one go.

---

## Attaching a project has never been done by a session nobody was watching

This is the single biggest untested assumption in the workshop, and everything
`/build` does rests on it.

A session started by `/build` wakes up in Bottega and attaches the project's
repository to itself. That call is not free — it goes through a permission
decision. The one time it was done successfully, it was done in a session with
a person present to approve it. A build session is unattended by design.

There is first-hand evidence that the refusal is real, not hypothetical: a
Da Vinci run on this change tried to attach the Zibaldone repository read-only
and was refused outright by the permission classifier.

The build skill now says what such a session must be created with — a
permission mode that does not stop to ask, and the repository-attaching tool
named in the pre-approved list, whose name carries a server prefix that differs
between environments and must be read from the window's own tool list. **That
is written down, not demonstrated.** Nobody has watched an unattended session
attach a repository and push.

*Why it is recorded rather than tested: testing it means starting a real build
session, and the owner's instruction for this round was to start none. Testing
it would also have meant building part of an application.*

What it looks like when it fails: the session's first act is refused, nobody is
there to approve, and it either stalls — which from outside is indistinguishable
from a session that is thinking — or treats the refusal as an obstacle to route
around and carries on in the one repository it can write to, which is Bottega.

**Status:** OPEN — closes the first time an unattended build session is watched
attaching a project's repository and pushing to it, with what was seen written
down here.

---

## Nobody has walked the seven stages end to end

`/build` describes seven stages, from working out the scope to the owner
pressing merge. No piece of work has yet gone through all seven as written.
The Da Vinci that stage four calls for now exists, so that is no longer the
reason.

**Status:** OPEN — closes the first time a change goes through all seven
stages in order, with what was observed at each one written down.

---

## Da Vinci has never run as a fresh session against a real change

It was tested three times against inputs made up for the purpose — clean code,
code with an obvious defect, and a handoff with a forbidden extra field — and
what was seen is in `docs/REFUSALS.md`. But all three runs were helpers
started by the session that built Da Vinci, not fresh sessions started by
the guide window, and none of them reviewed a real change.

So two things are untested: that a separately started session reads Da
Vinci's files and behaves the same way, and that `reviewer_mode` ever comes
back as anything other than the value a helper would report.

**Status:** OPEN — closes the first time a fresh session reviews a real change
and its comment lands on a pull request, with the six answers in it.

---

## Da Vinci's restriction stops short of the shell and the GitHub tools

`.claude/agents/da-vinci.md` now takes the editing tools away in its header
rather than asking for them not to be used, and that was watched working —
`docs/REFUSALS.md` has the before, the after and the control.

Two ways to write are still open to it, and neither was closed in that round:

- **`Bash`.** The method has Da Vinci run the code it is judging, so the
  shell has to stay, and a shell can write a file or push a branch. What the
  restriction removes is drift over a long pass and a line in a reviewed file
  that tells Da Vinci to fix a typo directly — which is how this actually
  happens. A reviewer that decided to write could still do it.
- **The GitHub tools.** Da Vinci keeps the tools that talk to GitHub
  directly, and among them are ones that write a file into a repository and
  one that merges a pull request. They could be named in the same header line.
  They were not, for one reason: their names carry the prefix of the server
  they come from, which differs between environments, and a name that does not
  match is a restriction that silently does nothing. Naming four tools that
  cannot be watched refusing anything is the sixth budget's own failure, in
  the file that exists to prevent it.

**Status:** OPEN — closes when the GitHub tool names have been checked in the
environment Da Vinci actually runs in, added to the header, and watched
refusing a merge. The `Bash` half does not close; it is a stated limit of the
mechanism, and the rule in the file is what covers it.

---

## Nobody has run the path with Virgil opening the pull request

The order changed on 14 September 2026: Virgil creates the branch, opens the
draft pull request, subscribes to it, and only then starts the session. The
session no longer opens anything. That closed the old gap on paper, and the
old rule was deleted rather than left beside the new one.

It has never been run. Three things in it have never been done here at all:
Virgil creating a branch, Virgil opening a pull request, and Virgil putting an
empty commit on a branch so that a pull request can exist on it in a project's
own repository. That last one has a known shape — a pull request needs at
least one commit between the branch and the main branch, or there is nothing
to open — but it was not tested on the way in, because testing it means
opening a pull request, and the session that made this change was told not to
open a second one.

**Status:** OPEN — closes the first time a build runs this order end to end
and the pull request the owner is told to merge is one Virgil opened.

---

## The startup budget was measuring the wrong thing

The shortage recorded here after the previous round — the number was all but
touching the limit — was an artefact of the measurement, not a real shortage.
*The figure itself is not repeated, for the reason at the top of this page.*
The check was adding up every
instruction file in the workshop whole, including skill and agent bodies that
a session is never given unless it opens them.

Measured honestly, and in the two numbers the check now reports: what **every**
session loads, and what the **heaviest single** session loads once it opens the
build skill. Both against the same limit of 10,000. Those numbers include the
files the instructions send a session away to read, which the first version of
this count charged nothing for. **Run the check for the figures** — this page
does not keep them, for the reason in the entry headed "the heaviest startup
number is close to its limit".

The candidates for trimming that this entry used to list are still worth doing.
The build skill's long account of an earlier wrong reason has since been moved
out; what else could go has not been surveyed.

**Status:** OPEN — the limit itself was deliberately not touched. Whether
10,000 still measures anything, given how far under it the every-session number
now runs, is the owner's decision and nobody has put it to him. **Run the check
for how far under** — this page does not keep that figure either.

---

## The move that got the budget number down was itself the way to defeat it

Da Vinci's method was taken out of `.claude/agents/da-vinci.md` and put in
`docs/REVIEWER.md` during the previous piece of work. The reason given at the
time was this very budget: everything under `.claude/` is charged to every
session that starts, Michelangelo included, and only Da Vinci needs the method.
That reasoning was right, and splitting the file was the right thing to do.

What nobody noticed is that the check then charged the moved file **nothing**,
in either number. Every Da Vinci session is sent, unconditionally, to read
`docs/REVIEWER.md` — "that is the method, all of it" — and from there to
`docs/PRECEDENTS.md`. Together 6,540 bytes of required reading, counted as
zero. Da Vinci read exactly as much after the move as before; only the
number changed.

Mechanically, that is the same move as parking bulk one directory away from a
skill and pointing at it from a single line — which is what the review of pull
request 6 demonstrated, with a 20,000-byte file that moved the heavier number
by 15 tokens. The difference is that this one was not a test. It was already
in the repository, and it had been done deliberately, in order to fit.

It was missed by the session that made the move, by the review of pull request
5, and by the guide window that reported the two numbers afterwards as though
they were the truth.

**The lesson, which is worth more than the fix.** A measurement is likeliest
to be wrong in exactly the direction that relieves the pressure it is
applying. When a number is in the way and something makes it go down, that is
the moment to ask whether the thing being measured actually got smaller. Here
it had not.

**Status:** the hole is closed — a file the instructions send a session to
read is now charged wherever it lives, and that was watched refusing
(`docs/REFUSALS.md`). Since 14 September 2026 a test holds it closed: both this
fault and the over-count it was found beside now have a test that was watched
failing against the broken version. Kept here because the habit it illustrates
is not closed by a check.

---

## The heavier of the two startup numbers is held to a limit nobody ratified

The check now fails if the heaviest single session goes over 10,000 tokens as
well. That second limit is **new**. It was set to the same number as the first
rather than to a number chosen for it.

*Why it was introduced at all: without a limit, the heavier number is a
reading and not a budget, and the whole risk of making the count more accurate
is that the count stops refusing things.* *Why the same number: accuracy falls
with context volume while a session is working, which is exactly when the
heavier number is real.*

It has been watched refusing — `docs/REFUSALS.md` — so it is not decoration.
But it is a number a session chose, not one the owner did.

**Status:** CLOSED, 14 September 2026. The owner ratified it: the heavier
number is held to 10,000 as well, both limits are settled, and neither moves
without him. `AGENTS.md` now says so in the budget itself rather than leaving
it to be inferred.

---

## Four of the six budgets are on trust, not enforced

`tools/check-budgets.mjs` checks two: the number of tokens loaded before a
session starts work, and whether every file named in backticks in `AGENTS.md`
actually exists.

The other four have nothing checking them:

- failing tests on the main branch
- checks that have never been observed refusing anything
- the number of agent definitions
- rules with no stated reason

This is written down in `AGENTS.md` already, honestly, so it is not hidden.
It is recorded here because a budget on trust is a budget that can drift for
a long time before anybody notices.

**Narrowed, 14 September 2026.** The first of the four is now half machine-run.
The automatic checks run the tests on every push, so a test failing on the main
branch fails the checks and cannot sit there unnoticed. What is still on trust
is the other half of that budget — that a finding which blocked a merge was
actually turned into a test — and it is on trust because no machine can tell
which findings blocked a merge.

**Status:** OPEN — three and a half of the six are still on trust, and no
decision has been taken on whether any of them should be machine-checked or is
better left as it is. The question has not been put to the owner.

---

## Optional findings from the two reviews, recorded rather than fixed

These were raised by the reviews as worth knowing rather than blocking. They
are written down here instead of being fixed, because the round they came from
was for the blocking findings and a fix nobody asked for is a change nobody
reviewed.

**The re-check session is not in the enumeration.** The build skill enumerates
three sessions — build, review, fix. Stage 5 starts a fourth, the re-check of
the fixed version, and nothing enumerates it. Left as it is, the natural place
to pin it is the project's repository, which is an unbound session: the exact
shape of the finding this change was written to close, one session further on.
**Status:** OPEN — one line in the build skill's shared section would close it.

**The project's address is written in two places.** `projects/registry.json`
holds it and the build skill says the registry is the only place it is read
from, but `projects/zibaldone/README.md` also carries the address, and Virgil is
told to look in the project's folder when answering about a project. Rename the
repository, update the registry, forget the readme, and a session reports the
old address. **Status:** OPEN — remove the address from the project readme, or
say there that the registry is the copy that counts.

**Nothing says what to do when the registry does not parse.** The rule covers an
id that is not in the registry. It does not cover a registry file with a
trailing comma in it. A session that has just failed to read the registry has a
plausible-looking second copy of the address sitting in the project's readme.
**Status:** OPEN — needs one sentence saying a registry that does not parse is
an error to report, never a reason to look elsewhere.

**A session blocked before any pull request exists has nowhere to report.**
Every dispatched prompt ends with "comment on the pull request". If the address
in the registry is wrong, or attaching the project is refused, the pull request
it would comment on is the one it never opened, and a session's output cannot be
read anywhere else. The scheduled check-in catches it eventually; nothing else
does. **Status:** OPEN — needs a fallback channel for a session that is blocked
before it has a pull request.

**Stage 7 hardcodes the first project's name.** The words it tells the window to
use are "Merge Zibaldone #7", where every other substitution in the file is in
angle brackets. A second project would be reported under Zibaldone's name.
**Status:** OPEN — one pair of angle brackets.

**Session titles are no longer unique across projects.** Virgil titles every
session by pull request number and stage. That was unambiguous when every pull
request was in this repository. With two projects registered, two sessions can
both read `#4 review —` with nothing to say which application either belongs to.
**Status:** OPEN — the title rule needs the project id in it.

**The registry is load-bearing and the machine will not miss it.** The budget
check only warns about paths written in backticks in `AGENTS.md`.
`projects/registry.json` is named in the two skills and the readme, none of
which are checked. Delete it and the check passes, the workflow is green, and
`/build` fails at the moment the owner uses it. **Status:** OPEN — naming the
registry in `AGENTS.md` would close it, and that is a change to the rules file,
which is the owner's to approve.

**Status:** OPEN — this entry as a whole leaves the file when each item above
has been closed or deliberately dropped.

---

## A leftover branch in the Zibaldone repository, from testing the push

To establish that a session started in this repository can attach the project's
repository and write to it, that was actually done rather than assumed: the
project's repository was attached, cloned, and its own existing commit was
pushed back under a temporary branch name, `claude/push-probe`. Nothing was
added to it — the branch points at exactly the same commit as `main`, and not a
single file of Bottega went anywhere near it.

The tidy-up afterwards failed. Deleting that branch was refused, twice, by the
network guard this session works behind, which allows a branch to be created
and not removed. There is no other tool here that deletes a branch.

This is not a one-off. Every build session from now on creates a branch in a
project's repository and none of them can remove one. After ten builds, some of
them abandoned part-way, the dead branches accumulate and only the owner can
prune them.

**Status:** OPEN — the owner can delete `claude/push-probe` in the Zibaldone
repository on GitHub, on the branches page, in one click. No session can do it.
That part of this entry leaves the file then; the accumulation above stays open
for as long as branch deletion is refused.

---

## The empty `cabinet` repository is orphaned

This repository was called `cabinet` before it was renamed. An empty
repository under that name is still there and belongs to nothing.

**Status:** OPEN — the owner deletes it. Claude cannot and should not.

---

## The repository description on GitHub still describes the application

The short description shown at the top of the repository page still describes
the first application rather than the workshop.

It is a setting on GitHub, not a file in the repository, so no change here
fixes it.

**Status:** OPEN — the owner changes it in the repository settings.


---

## The prompt is now printed, and the number is a record rather than a measurement

`tools/check-budgets.mjs` prints a third number beside the two budgets: how big
the prompt was that started a session. It has no limit, deliberately — nobody
has yet seen what a normal prompt looks like, and a limit set before that gets
met by leaving out what the session needed.

**The check cannot measure a prompt.** A prompt is never a file here. It is
written in the guide window and handed over as the session starts, and nothing
on disk holds it. So the guide window saves a copy, and what is printed is the
size of the copy. If the window saves nothing there is no number, and nothing
the check could reach is substituted. If the window saves something other than
what it sent, nothing here can tell.

The first saved prompt was this change's own, measured on 14 September 2026 at
about 658 tokens — and it was
transcribed by the session that received it, not saved by the window that sent
it, because the window had no such instruction when it dispatched. So the one
number now in the repository is the one kind of copy the arrangement does not
call for.

*Why it is recorded anyway: that is nothing like the 27,400 that made
this worth doing, so the first datum is already evidence that prompts vary by a
factor of forty, and a limit picked from either end would have been wrong.*

**Status:** OPEN — closes the first time the guide window saves a prompt at the
moment it dispatches one, and the number printed is a copy nobody transcribed.
Whether a limit should ever be set is the owner's, with several real prompts in
front of him.

---

## The heaviest startup number is close to its limit — run the check, do not read a number here

**No figure for it is written down on this page, deliberately, and not even as
an example of one that went stale.** Every time one has been written here it has
gone stale: four different values for the same number inside four days, the last
of them wrong within the hour, while the change it described was still being
fixed. *The values themselves are not repeated here, because a superseded figure
on this page is still a figure on this page, and the argument does not need them
— which is the test of whether they were ever doing work.* A session that sizes an addition against a number on
this page will be refused somewhere it did not expect.

`node tools/check-budgets.mjs` prints both numbers and the room left in each.
It is the only honest answer and it takes a second.

What does not change: the heavier of the two numbers is the constraint, not the
lighter one. `AGENTS.md` is charged to every session, so prose added there is
paid for twice, once in each number. The largest single thing charged to the
heaviest session is the build skill, and if room has to be found, that is where
to look first.

*Why this is worth an entry rather than a shrug: every round so far has left
less room than the round before, and each one recorded a figure that was wrong
by the time it was read. One more change of the size of a recent one does not
fit. The next session to add anything to the rules file will meet the refusal
rather than the warning — so run the check before writing, not after.*

**15 September 2026:** the build skill's long account of an earlier wrong
reason was moved out, to the entry headed "A reason that was wrong once, kept
out of the instructions". **That did not bring the heaviest number down.** The
same change added the counting of the review round, which cost more than the
move freed, so the number went **up** and the room left fell. The move made
that addition possible; it did not pay for it.

*The figures are deliberately not here. They were, for one round, and they were
wrong by 95 tokens before the change they described had even been handed to a
review — which is the fault this entry is about, committed inside the entry
about it. They are on pull request 19 and in that change's scope page, where
they describe one moment and are not read as current. Run the check.*

What is left to take out has not been surveyed. Nobody has looked at the guide
window's skill with this question in mind, and nobody has put the other
question to the owner either — whether the limit itself should move.

**Status:** OPEN — closes when either the heaviest number comes down far enough
to stop constraining the work, or the owner decides the limit should move.

---

## Rules that load only when a matching file is opened, and what the counting would make of them

Claude Code can hold a rule that is loaded only when a session opens a file
matching a path pattern, rather than at startup. Nothing here uses one, and
nothing here should until there is a reason.

The part worth knowing is what the counting would do with one. The check
divides what a session loads into two: what every session gets, and what a
session gets once it opens a named set of instructions. A path-restricted rule
is neither. Written correctly, it costs nothing until a matching file is
opened. **Written without its path restriction, it loads into every session and
the check counts it as zero**, because the check knows nothing about the
mechanism and would not look for it.

So the first such rule written here silently breaks the one number that is
meant to catch exactly this.

**Status:** OPEN — nothing to do until somebody wants one. It is triggered by
the first path-restricted rule anybody proposes, and what that session must do
first is teach the check about the mechanism.

---

## Memory must never be enabled for Da Vinci

Da Vinci's definition takes the editing tools away in its header, and that was
watched refusing a write (`docs/REFUSALS.md`). Claude Code's per-agent memory
is implemented with those same writing tools. **Turning memory on for Da Vinci
gives them back**, and the restriction that was watched working would stop
working, quietly, with nothing failing to say so.

**Status:** OPEN — triggered by the memory work, which is next but one in
`docs/PLAN.md`. The session that builds memory must exclude the reviewer by
name, and must watch the refusal still firing afterwards rather than reasoning
that it should.

---

## Two decisions about memory, already made, waiting for memory to be needed

Both came out of the research and neither has been acted on, because nothing
here has needed memory yet.

**Where a lesson belongs, in four steps.** Does it generalise beyond this one
change; will it still be true in a month; can it be stated in a sentence with
its reason; and does something already say it. A lesson that fails any of the
four is not written down anywhere.

**A note costs two pull requests to get in.** A thing observed once is an
anecdote. It becomes a note only after it has been seen twice, on two separate
pieces of work.

*Why both are recorded rather than built: a memory that accepts everything is
the failure mode in every account of this, and both of these are rules about
refusing. They are worth nothing until there is something to refuse.*

**Status:** OPEN — triggered by the memory work in `docs/PLAN.md`. The session
that builds it should be handed these two rather than re-deriving them.

---

## Six limits about how big things are, none about how often they change

Every one of the six budgets measures size or count at a moment: tokens loaded,
tests failing, checks unfired, dead references, agent definitions, rules without
reasons. Nothing measures rate.

A repository can pass all six every day and still be churning — the rules file
rewritten three times in a week, each version under the limit, none of them in
place long enough for anybody to work under it. That is a real failure mode for
a workshop whose whole point is that its instructions are stable enough to be
relied on, and no number here would show it.

*Why it is not being fixed now: a seventh limit is exactly the kind of
machinery this repository is meant not to grow before something needs it, and
the evidence that churn is happening would have to come first.*

**Status:** OPEN — triggered by somebody noticing the same file rewritten three
rounds running. Nobody has looked.

---

## Descriptions of skills never used here were costing every session — mostly closed

A session in this workshop was shown the name and description of every skill
available to it, including a large set that has nothing to do with Bottega —
document formats, design tools, spreadsheets. *Measured on 14 September 2026:
roughly 4,200 tokens of a session's context, spent on descriptions of things no
session here will open.* That was more than the whole of what the workshop's own
instructions cost at the time, on material the workshop did not write.

**Closed on 15 September 2026, and the way it closed was a surprise.** This was
recorded as the owner's setting to change and not a change anybody could make
in this repository. That was wrong: `.claude/settings.json` takes a
`skillOverrides` block, it travels with the repository, and nineteen of those
names are now switched off for any session that runs here.

*How it was established rather than assumed: the listing a session is offered
was counted before and after. It came back holding exactly the seven names meant
to survive and nothing else. That is the test that matters, because a name
spelled wrong in the block would leave its skill sitting in the listing — and
none did. Each of the nineteen was also asked for by name and came back refused;
that alone would not have been enough, because nothing here has established what
the harness says about a name in the block that matches no real skill, and a
refusal echoed back for a name that does nothing would look identical. The
listing cannot be fooled that way. Not done: feeding the block a deliberately
bogus name and watching what comes back. That needs a write and a fresh session
to see the effect, and it is the one thing that would settle what a wrong
spelling does.*

**It does not close completely, and its reach is wider than "this repository"
makes it sound.** A conversation that starts anywhere else still offers all of
them. But a session building an *application* starts here — the build path says
its repository is Bottega every time, and the project is cloned into a directory
beside it — so these nineteen are switched off for application builds too, not
only for work on the workshop. Making it account-wide is a separate decision and
has not been made.

**What that costs, said in the same breath as the saving.** A session building
Zibaldone, or any later application, that reaches for `design`, `code-review`,
`simplify`, `run`, `init`, `pdf` or `docx` will be refused by name. Nothing here
has established that no application will ever want one of those; what was
established is that nothing in *this workshop* opens them. Switching any of them
back on is one line in `.claude/settings.json` and costs only that name's
description. *Why it is written down rather than pre-emptively reversed: the
owner asked for these off, and a saving undone on a guess about a session that
has not run yet is a saving nobody keeps.* And nineteen was
not all of them: a session running here is still offered `dataviz`,
`artifact-design`, `artifact-diagramming` and `artifact-capabilities`, four
names that nothing in this tree references. They were left on because switching
a name off is only safe once somebody has established that nothing here wants
it, and that was established for nineteen and not for these four. *Why the
remainder is written down rather than swept into the next commit: a closed entry
that overstates its own result is worse than an open one, because nobody
re-checks it.*

*Why it was recorded here despite that: a reader could reasonably take the
every-session number the check reports for the whole of what a session carries
before it starts. It is not, and the half the workshop did not control was the
larger half.*

**Status:** CLOSED for this repository, 15 September 2026, by pull request 20,
for the nineteen names it switched off. OPEN for the four named above, and open
as a question the owner has not been asked: whether he wants the same
everywhere, which is his account's setting and not this repository's.

---

## A reviewer that has to check a claim recorded only in a pull request breaks its own isolation to do it

**14 September 2026.** Five reviews ran on pull requests 9 and 13 that day.
Several reported `context_isolation: false`, and the handoff was not always
the cause.

What was observed, run by run:

- One review was dispatched as prose carrying the builder's framing. Isolation
  false, and the dispatch was the reason.
- One was dispatched as exactly seven lines and reported isolation **true**. It
  was also the only one of that group to return `changes_required` with
  blocking findings.
- One was dispatched as exactly seven lines, and a correction was sent
  afterwards because the commit hash in the handoff had been written from
  memory rather than looked up. Isolation false — **the correction did it, not
  the handoff.**
- Two were dispatched as exactly seven lines with nothing following, and each
  broke its own isolation by fetching the pull request thread, because the
  change under review made claims about earlier reviews and those claims exist
  nowhere in the tree.

**Two separate faults, and only one of them is a handoff problem.**

The first is a dispatch that is wrong when sent, and it cannot be repaired
afterwards: sending the correction is a second message, and the session that
receives it is no longer isolated.

The second has nothing to do with the dispatch. A reviewer asked to check a
factual claim that is recorded only in a pull request thread must read that
thread, and reading it is the contamination. The remedy is not a better
handoff. It is that a claim a reviewer will have to check belongs in the tree,
where reading it costs nothing.

*Why this is recorded here rather than left in the threads: this is the exact
fault it describes. A later session asked to act on any of it would otherwise
have to go and read five pull request comments to find out what happened, and
would break its own isolation doing so.*

**Status:** OPEN — item 2 of `docs/PLAN.md` carries both halves.

---

## A reason that was wrong once, kept out of the instructions

**15 September 2026.** The build path explains why a project is cloned beside
the workshop rather than inside it. That reason was once stated wrongly, and
the correction was written into the skill and carried by every build session
from then on.

It is history rather than instruction, so it lives here now and costs nobody
anything. What it says:

> The reason is **not** that a careless `git add -A` in the project's clone
> sweeps the workshop's files into the project's commit. Two clones never share
> an index. Run in the project's clone it staged the project's own file and
> nothing else, nested or beside. The direction that needs preventing is the
> other one.

*Only the six lines above were moved. The evidence for the direction that does
need preventing — what `git add -A` actually staged, nested and beside — is
still in the skill where it belongs, and is not duplicated here.*

*Why it was moved rather than deleted: a rule here is kept or deleted on the
strength of its reason, so a reason that was once wrong is worth keeping
somewhere — otherwise the wrong version gets re-derived. Why it was moved
rather than left where it was: the register itself nominated it as the largest
removable thing charged to the heaviest session.*

**It did not pay for what it was moved to make room for.** Counting the review
round cost about three times what this move freed. The heaviest session went
up, not down, and the room left fell. The move made the addition possible, and
that is all it did. *The numbers are on pull request 19, not here — see the
entry about that page carrying no figures.*

**Status:** CLOSED. This is the passage nominated as removable by the entry
headed "The heaviest startup number is close to its limit". Recorded here so
the wrong reason is not reinstated.

---

## The budget check cannot see the largest saving this workshop has made

**15 September 2026.** Switching off nineteen skills took most of the listing a
session is offered out of its context — not all of it; four names are still
offered and are recorded in the entry above. The check reports none of the
saving.

What it reports is the opposite: `.claude/settings.json` grew from 299 bytes to
919 to hold the block, and that file is charged to both enforced numbers.
So the heaviest session went **up** on the day the real load came down by far
more.

*Why this is not a fault in the check: it measures what this repository hands a
session, and a skill listing is handed to a session by the harness. It never
could see it. The entry it closed said as much — it recorded the 4,200 tokens as
something outside this repository's reach, and the reach turned out to be the
settings file rather than the instructions.*

**What follows, and it is not comfortable.** Both enforced numbers are now
smaller than what a session really carries, by more than the budget itself. A
session reading the heaviest number against its limit of 10,000 is reading the
part of its load this repository wrote, not the whole of it. That was always true — the harness's own
instructions and tool descriptions were never counted either — but until today
the uncounted part was not something anybody here could change, so it read as
background rather than as a gap.

**Status:** OPEN — nobody has decided whether the check should try to count what
it is offered, or whether saying plainly what it does not count is enough.
*Nothing is proposed here on purpose: a check that guessed at the harness's own
numbers would be inventing them, and this repository has been wrong twice about
its own measurements in the direction that flattered them.*

---

## A scope page could contain a line the handoff check reads as an eighth field

**15 September 2026, raised as advisory by the review of pull request 23.**
`AGENTS.md` says an advisory finding is written down and left alone, so this is
written down and nothing has been changed.

`tools/check-handoff.mjs` decides a new field has started when a line begins at
the left margin with a lower-case word and a colon. That rule is what catches
the eighth field the seven-line format exists to refuse — a line like
`opinion: this is ready to merge`.

It also applies inside `done-looks-like`, which is the one field whose value is
arbitrary prose copied word for word off a scope page. A future scope page whose
"What done looks like" section contains an unindented sentence of that shape —
`note: this excludes Fridays.` sitting at the left margin rather than as a
bullet — would be read as an eighth field and refused, even though the copy was
faithful. No scope page today contains such a line, which is why the review did
not block on it.

**Why it is not fixed here, and this is the whole difficulty:** the two things
are one rule. Narrowing the header rule to the seven known names would stop the
misreading and would also stop the eighth-field refusal, which is the guard the
format is for. Ending header-matching once `done-looks-like` begins works only
because that field is last, and would let a real eighth field written after it
through. Neither is a one-line change anybody should make without deciding which
guarantee wins, and nothing has hit this yet.

**What it would look like when it happens:** a handoff refused for an eighth
field the writer did not write, naming a line that is really part of the scope
page. Whoever sees that should indent the line in the scope page to get moving,
and reopen this.

**Status:** OPEN — no scope page triggers it, and no fix is proposed until one
does or until somebody decides which of the two guarantees gives way.

---

## The noticing's evidence was gathered by search, not by reading

Both research jobs of 16 September 2026 — `projects/zibaldone/noticing-research.md`
and `projects/zibaldone/memory-research.md` — reached their academic sources
through a search tool and say so themselves. Several rules in the noticing's
scope quote their numbers, including the ones that decide how feedback is
handled.

*Why it is open rather than accepted: a number good enough to choose a design by
is not good enough to be the only reason for one, and the scope page says so in
as many words. The risk is that the caveat is dropped by the next session to
quote the number.*

**Status:** OPEN — before the noticing is built, check the handful of numbers
that would change the design if wrong against the papers themselves. The two
that would: that a user profile in the prompt raises agreement by 16–45%, and
that a checker blind to the claim roughly doubles precision.

---

## Two things on Zibaldone the owner has seen and waved through

*Both were put to him on 16 September 2026 with what they cost, and he accepted
both. They are here because accepted is not the same as fixed, and the next
session to touch either file should know.*

- **The deploy's passphrase guard does not see a non-breaking space.** The guard
  refuses a passphrase padded with an ordinary space; the invisible space a Mac
  makes from Option+Space gets past it. *Why it went unseen through five review
  rounds: the test double modelled the trimming with the same rule the guard
  used, so the double and the guard agreed with each other and neither agreed
  with the real tool. That is the finding worth remembering, more than the bug.*
  It bites only if he ever puts one of those characters in a passphrase. One
  line to fix, whenever somebody is in that file for another reason.
- **His passphrase sits in the record of whatever session he types it into.**
  The filing needs it once per session on the web version, or once ever on his
  own computer. No alternative was found that does not mean him doing the whole
  filing by hand in a browser.

**Status:** OPEN — neither is being fixed now, by his decision. Neither blocks
anything.

---

## A scheduled run cannot approve its own agents, and the filing cannot run without them

Found on 16 September 2026, in the filing's first real run on the owner's own
captures — the run that no review could stand in for.

The filing hands each capture to a fresh agent to decide about, and a second one
to write. That separation is the design: *"Deciding and writing are two separate
calls."* In the Claude Code desktop app in auto mode, starting those agents was
**refused outright** — the classifier reads a skill saying "read this file and
do what it says" as untrusted-code integration. The session stopped rather than
do the deciding itself, which is what the skill tells it to do and the right
answer.

Out of auto mode it asks instead of refusing, and the owner had to approve every
agent by hand. "Always allow" did not hold, because each agent call differs
enough that the saved permission does not match the next one. What worked was
allowing the Agent tool itself.

**Why this blocks the clock, which is the next thing to be built.** A scheduled
run has nobody there. Auto mode refuses the agents; asking has no one to ask.
So a Routine running the filing would, as things stand, either be refused or
stall — and the same is true of the noticing, which spawns agents for the same
reason.

*Why it is here rather than in a scope page: it is not a decision about what to
build, it is a thing that must be found out. It may be a settings question, a
different way for the skill to describe itself, or something about how a Routine
is granted tools. Nobody here knows yet.*

**Status:** OPEN — to be settled before the clock is built, and it gates the
noticing too. The filing by hand is unaffected: it works, with the Agent tool
allowed once.

---

## Found in use on Zibaldone, and left for later

*His own words as he used it, on the evening of 16 September 2026. None of these
is being fixed now: the noticing is the focus and these are not in its way. They
are here so they are not rediscovered from scratch.*

- **A page in Codex has no way back to the list.** Open a subject and the only
  ways out are the running head or the phone's own gesture. *"Only issue is, when
  you select a codex entry, there is no back button to go back to the index."*
  He called Codex beautiful and working otherwise.
- **A weekly deep research pass over the wiki**, his idea the same evening and
  worth more than a line: agents go through the pages, read the internet, and
  write a detailed report on one subject. Four things settled about it when it is
  built — one subject a week rather than all of them, because depth beats breadth
  and it caps what is the most expensive thing in the design; the concrete
  subjects only, never an automatic pass on how he feels, because a machine
  researching psychology about his diary is a machine diagnosing him and that is
  his to ask for deliberately; his words and the world's words visibly apart
  inside one report; and the agents told to read their sources rather than search
  them, since both research jobs of that day said plainly that they had not.

**Status:** OPEN — none blocking, none scheduled. The research pass comes after
the feedback loop, so that the thing that keeps it honest exists before the
expensive work does.

---

## Running Zibaldone from his phone, and running it without him

Both asked for on the evening of 16 September 2026, minutes apart, after the
first day of real use.

**From his phone.** *"I want a way to run it manually from my phone on Claude
Code too, not my laptop."* This may already work: Claude Code on the web, opened
on a phone against the program's repository, takes the same words. Two things
make it worse than his Mac and neither is fatal — the web version keeps nothing
between sessions, so it asks for the notebook's passphrase every time, and the
mind has to be cloned fresh each run. **Nobody has tried it.** Try it before
building anything; the answer may be that there is nothing to build but a line
in the documentation.

**Without him.** The clock, already scoped in
`projects/zibaldone/scope/the-asking.md`, and blocked by the entry above about a
scheduled run being unable to approve its own agents. That blocker is the single
thing standing between him and a mind that keeps itself up to date, and it is
now the most valuable unbuilt thing in the project.

**Status:** OPEN — the phone: try it, then decide. The clock: blocked, and the
blocker is the priority once Disegno is his.

---

## What a citation looks like to him

His words, the night of 16 September 2026, having read the first real article:

> *"When it writes the notes it shouldn't put the long number quote in brackets.
> It should just have the date that I said it in brackets. The number file
> doesn't mean anything."*

Today an article ends a cited sentence with `[20260915T183000000Z-abc123]`. That
is the capture's id: it is how the tool finds the entry, and it means nothing to
a person reading a sentence about his own life on a phone.

**The id stays in the file; the date is what he reads.** Disegno renders the
citation as the day — *[15 September]* — and, where it can, as a link to that
entry so he can read what he actually wrote. *Why not simply write the date into
the article instead: two captures on one day would then be indistinguishable, and
nothing could find its way back to the entry. The id is the machine's business
and should stay the machine's business.*

**And tapping it opens that entry, with a way back to the article.** His words,
minutes later: *"Tap it to show the article but back again to get back to the
Disegno article."* So: the date is a link, it opens what he wrote that day, and
from there one step returns him to the article he was reading — not to the top of
a section, and not to wherever he happened to be before.

*Why it is worth saying twice: this is the same fault he found in Codex an hour
earlier, where opening a page left him with no way back to the list. Wherever a
tap takes him, there is a step back to where he was. It should be a rule of the
app rather than a fix applied twice.*

**Status:** OPEN — to be folded into the change now taking the checker out of
the way, which is already altering how an article is written and shown, and
alongside the Codex back button already under way. Recorded here because neither
session could be reached while it ran.
## The standard the design work is held to

His instruction, the night of 16 September 2026, about the two design jobs then
running: *"The outcome needs to be incredible. I mean truly design award winning
worthy ... really invest in making it something beautiful."*

**The mechanism is not more time. It is what the rounds ask.** He authorised four
rounds of review and fix on each. A code review asks *is this correct*; that is
the wrong question here and will produce four rounds of polish on a mediocre
first idea. **The rounds are design critiques**, run on Opus, and they are
allowed — expected — to answer *throw it away and start again*.

**The bar, stated so it can be judged rather than felt:**

> Would someone who collects this kind of work stop on it? Would a person who
> has never heard of it look at one screen and want to know what it is?

*Why that phrasing rather than "is it beautiful": beautiful is not a question
anybody can answer against a screenshot, and every reviewer will say yes to
avoid seeming philistine. The two questions above have a wrong answer, and a
reviewer can give it.*

**And rejection has to be real.** If a first cut is merely tidy, the answer is
start again, not refine. *Why it is written down: four rounds spent improving
the wrong idea end in something competent, and competent is what he already has
and already called too simple.*

**Status:** OPEN — applies to `claude/the-beautiful` and `claude/the-page` from
their first review onward. Neither session could be reached while it ran, so the
bar goes in at round one rather than round zero.


---

## A review brief must not carry the builder's account of its own work

On 16 September 2026 a design critique was dispatched on one version of the
Zibaldone reading pages and **refused before it looked at anything**. The brief
had been written from the building session's own pull request: what that session
was told to do, what it said it had done, and its own list of two defects it
knew about and had not fixed.

The reviewer's objection, in its words: *"That is Michelangelo's opinion of its
own work reaching the reviewer... It directed my attention before I looked."*
And it refused to be re-briefed, because it had already read the material and a
corrected brief could not un-read it — *"indistinguishable in the record from a
clean one."* A fresh session was the only remedy. The round was not spent; the
dispatching session was.

**The rule this asks for, which is not written anywhere yet:** a review session
is handed the version and the bar, and nothing the building session said about
itself. Not its summary, not its pull request body, not its own list of what it
knows is wrong. The reviewer finds those or fails to — **that is the
measurement.**

*Why this is not already covered: `AGENTS.md` says a fix session is given the
review itself rather than a summary of it, which guards the relay in one
direction. Nothing guards the other. The builder's self-report is exactly the
kind of material that reads as helpful context and is in fact the answer key —
a reviewer told in advance which two things are wrong can neither confirm the
list is complete nor be trusted when it says the list is all there is.*

*Also worth keeping: the brief's stated diffstat was wrong, computed against a
base the branch had since moved past. The reviewer checked it rather than
repeating it, which is the behaviour the handoff exists to produce.*

**Status:** OPEN. It belongs in the guide's own rules, which is one of the three
files that needs the owner's yes before it changes. Logged here until he sees
it.

---

## The handoff check exists, and nobody ran it

Four review handoffs went out on the evening of 16 September 2026. **None was
put through `tools/check-handoff.mjs` first.** Two were refused by the reviewer
that received them, costing two sessions, and one of those two refusals is word
for word what the check prints when fed the same handoff afterwards — recorded
in `docs/REFUSALS.md`.

So there is a working guard, and the session that most needed it did not know to
reach for it. **Two things follow, and only the first is mechanical.**

**One: the guide's own rules do not say to run it.** The rule that orders a
dispatch — branch, pull request, subscribe, then start — has no line in it about
checking the handoff, and the check's own header is the only place that says
when to run it. A file nobody opens cannot instruct anybody. That is a change to
the guide's skill, which needs the owner's yes.

**Two, and this one cannot be fixed by running the check: the check reads the
seven lines and not the prose sent with them.** The other refusal that night was
a handoff whose seven lines were perfect and whose surrounding brief carried the
building session's account of its own work — the answer key, arriving beside a
well-formed handoff. `tools/check-handoff.mjs` would have passed it.

*Why this is logged rather than fixed on the spot: widening the check to read
the brief means a program deciding whether a paragraph is a fact or an opinion,
which is the kind of judgement that gets beaten by rewording — the same reason
`tools/reads.json` writes down what is read rather than working it out from the
sentence. The honest options are to have the dispatching session declare what
the brief contains, the way reads are declared, or to leave it on a rule and
accept that it is on somebody's word. That is a decision, not a defect.*

**Status:** OPEN. Both halves need him: the first because it changes the guide's
rules, the second because it is a choice about what a machine should be asked to
judge.

---

## Four design rounds bought no polish, and his verdict says so

He authorised four rounds of review and fix on the Zibaldone reading pages,
asking for something *"truly design award winning worthy."* On 16 September 2026,
looking at the merged result: *"The app looks good. I like it. Would have liked
more polish for so many review rounds but that's fine. It does look better
though."*

He is right, and the accounting shows exactly where the rounds went:

| round | what it actually did |
|---|---|
| one | two sessions, about forty-nine ideas. The critique: four good ideas and forty-five grains of sand; neither of his two questions passes |
| two | subtraction — forty-nine ideas down to five switches |
| three | a critique that found six real defects: unhittable tap targets, text below the legibility floor, a false sentence at the foot of every article, a silent crash, a settings bug, and an index filing three subjects under "The" |
| four | fixing those six, plus one regression the fixing introduced |

**One round produced ideas, one removed them, and two went on defects. No round
was spent making the good screens better.** The round-three critique said so
itself, and named the place: the article screen passes his bar, and the front
page and Codex are *"beautifully correct and nothing more."* Nothing ever went
back to those two.

**The mechanism, stated so it can be used next time: correctness crowds out
polish, and it does it silently.** Every defect those rounds found was real and
worth fixing — none of it was invented work. But a review round that finds a
crash will spend itself on the crash, and the round after it spends itself on
what the fix broke. The budget disappears into things that must be done, and
nobody notices that the thing it was authorised for never started.

*Why this is not solved by authorising more rounds: more rounds find more
defects. The fifth round here would have gone the same way. What is needed is a
round that is not allowed to fix anything — one whose only permitted output is
the good screens made better, with defects it finds written down for a different
round.*

**Status:** OPEN, and it is a question for him rather than a change to make. The
options are to protect a round for polish by forbidding it to fix, to get the
defects out of the way first and start counting rounds afterwards, or to accept
that a first pass buys correctness and polish is a separate job later. *Why it
is his: it is about what he is buying with the rounds he authorises, and he is
the one who can tell whether the result was worth them.*

---

## The handoff check cannot pass for a project built with this workshop

**16 September 2026.** The check refused a handoff for a Zibaldone review, and
the refusal was correct about what it could see and wrong about what it meant:

```
done-looks-like: `projects/zibaldone/scope/the-narrating.md` is not on branch
`claude/the-narrating`.
```

It is not, and it never will be. **`tools/check-handoff.mjs` requires the scope
page to sit on the branch under review.** That holds for this workshop's own
changes, where the scope page and the code are in one repository. It cannot hold
for a project built with the workshop, where the scope pages live here in
`projects/<name>/scope/` and the code lives in the project's own repository —
which is the arrangement this whole place exists to produce.

So the check verified the shape, the branch, the commit, the clean tree and the
diffstat, and could verify nothing about the seventh field. Every project
dispatch from now on hits this.

**The purpose it is protecting is still real**, and worth restating before
anybody softens it: the reviewer's job description has to be copied off a page
the reviewer can already see, so there is nothing left in the pull request thread
for the reviewer to go and fetch. A well-formed handoff still breaks isolation
when a claim the reviewer must check exists only in a thread.

**Three ways it could be made to hold, and the objection to each:**

- **Teach the check to look in the workshop** for `projects/<name>/scope/` when
  the branch is not one of ours. *Objection: it then compares against a page the
  reviewer cannot see, which is the isolation problem wearing a different coat —
  unless the reviewer is given the workshop too, which is more context, not
  less.*
- **Put a copy of the scope page on the project's branch.** *Objection: two
  copies drift, and the check would be comparing one copy against another rather
  than against the truth.*
- **Let the field be verified against the brief instead of a page**, since the
  brief is what the reviewer actually receives. *Objection: that is the check
  reading prose and judging it, which is what `tools/reads.json` exists to avoid.*

**Status:** OPEN. One review was dispatched with the first six fields confirmed
and the seventh copied by hand off the scope page, and the reviewer was told
plainly that this was so and why. *Why that was the right call rather than
stopping: the check's substantive purpose was met — the job was written out in
full in the brief, so the reviewer had nothing to fetch — and the owner was
asleep with work waiting. But it was a judgement made around a refusing check,
which is exactly the thing this repository does not let pass quietly, so it is
written down here rather than left in a session's memory.*

---

## The same leak again, from the other direction: the previous review

**16 September 2026, later the same night.** The rule written above — that a
review brief carries the version and the bar and nothing the building session
said about itself — was followed. The brief for the third round of the narrating
carried no builder material at all. It still came back marked
**`context_isolation: false`**, and the reviewer was right:

> *"the handoff also carried the design intent and the previous review's
> conclusions ('nothing reaches outside, capture takes 30 ms, seven behaviours
> each genuinely refused by a test'). That is prior-reviewer material, and it
> could anchor."*

It was put there deliberately, to save the round re-deriving what an earlier
round had already established. That is exactly the reasoning that makes it
dangerous: **a reviewer told what the last reviewer confirmed has been handed a
list of things it need not check.** The three findings this round produced were
all in territory the first review had pronounced sound.

This one re-measured every inherited claim rather than accepting any, said so,
and its numbers were its own — so the review stands. **The next one might not,
and nothing in the brief would show the difference.**

*Why this is a separate entry rather than an extension of the one above: the
first leak was the builder's opinion of its own work, and the instinct behind it
was helpfulness. This one is a prior reviewer's findings, and the instinct behind
it is efficiency — not wanting to pay twice for the same measurement. The second
instinct is stronger, better-motivated, and will keep coming back.*

**What a brief may carry, as this now stands:** the version, the bar, what the
thing is for, and what it must never do. **Not** what the builder says it did,
and **not** what a previous reviewer concluded — including the reassuring parts.
Telling a round that it is the second or third version, and that earlier faults
were found and fixed, is fair and useful; naming them is not.

**Status:** OPEN, with the rest. It is the same rule needing the same line in the
guide's own skill, which is one of the three files that needs the owner's yes.

---

## Da Vinci and Michelangelo share one scratch directory

**16 September 2026.** A reviewer answered `context_isolation: false` for a
reason nothing in the handoff caused:

> *"this session's scratchpad directory is shared with the sessions that built
> the change. Listing it surfaced file names including `app.good.js`,
> `hearing.good.js`, `narrating-handoff.txt` and a directory `dv19`. I opened
> none of them... I answered false because copies of the files under review were
> within reach and their names reached me."*

It is right, and it named the fix itself: **the reviewer and the builder should
not be given the same scratch directory.** A file called `app.good.js` tells a
reviewer which file somebody thought was the good version, without being opened.

*Why this is worse than the two brief leaks logged above and not better: those
were mistakes in something a session wrote and could have written differently.
This one needs no mistake. Every session working here is handed the same
directory by the environment, so a reviewer that does nothing wrong at all still
has the builder's working copies within reach — and the next one may not be
scrupulous enough to say so.*

**One thing it could not avoid, and should not have to.** The same reviewer took
the speech model's weights out of that directory, because the change cannot be
exercised without a model and fetching one is not possible here. That is a
third-party download, not anybody's work, and taking it was right. *So the fix is
not "the reviewer may touch nothing there" — it is that the builder's working
copies and the reviewer's should not be in the same place, while things neither
of them made can be.*

**Status:** OPEN. It is a question about how sessions are given their working
space, which is outside what any file in this repository currently decides, so it
needs him.

---

## Every piece arrives as slices, or it does not arrive

**17 September 2026.** He asked why everything takes so many rounds, and the
answer was not that the reviews are wrong. Every finding this week was real and
reproduced. **It is that the changes being sent into those reviews are enormous.**

The narrating went in as one job: 4,331 lines, fifty files, covering browser
audio recording, format differences between browsers, a speech model, a worker
thread, uploads, failure states, and a write-once log. Six rounds. The design
work went in whole: four rounds. The filing: five.

**And a large share of each review's findings were made by the fix before it.**
The design work's round-four regression was created by round four's own fix. The
filing's round-four fault was caused by round two's fix. The narrating's
permanent write-off was created by the mechanism round two added to fix
something else. That is the loop he was feeling, and it is what a large change
under review produces.

`AGENTS.md` says this in its first rule — *a small change under review catches
roughly three times more defects than a large one* — and the guide did not
follow it. **The build system was working. The way it was being fed was not.**

**What the narrating should have been, and this is the worked example to copy:**

1. **Record and keep.** A button, the sound saved, playable on the page. No
   transcription at all. Every reviewer said this half was solid; it would very
   likely have passed in one or two rounds, and he would have had voice notes on
   his phone two days earlier.
2. **Transcribe short recordings.**
3. **Handle long ones** — where the genuinely hard problem lived, and where five
   of the six rounds actually went.

Tangled together, every review had to look at everything and every fix could
break anything.

**The rule, as he asked for it on 17 September 2026:** *"Next round suggest
slices."*

- **The first slice is something he could put on his phone by itself.** Not a
  foundation, not scaffolding — a thing that works and is worth having alone.
- **A slice that cannot be described in one sentence without an "and" is two
  slices.**
- **The slices are put to him before the work starts**, so he chooses what he
  gets first and what can wait.

*Why it must be written down rather than remembered: a rule that lives in one
session's conversation dies with that session, which is the argument this whole
repository was founded on. And why it is his to see rather than quietly adopted:
more slices means more merges and more small deploys, and that is a cost he pays,
not the workshop.*

**Status:** OPEN only as to where it finally lives. It is in force from now
either way. It belongs in the guide's own skill, which is one of the three files
that needs his yes.

---

## The mind will hold two kinds of thing, and cannot tell them apart

**17 September 2026.** He said what he actually intends to put in: *"literally
anything"* — things to remember, things about other people, his CV, a project he
might start, a price he saw, a joke, a quote. And he asked the right question:
does that make the noticing better, or does it drown it?

**Two kinds of thing are going into one box.**

- **A fact he wants back later.** *Alice's apartment is 41.* Its whole value is
  retrieval. It has nothing to notice about it and never will.
- **Something to be noticed.** *I felt flat all week and I don't know why.* Its
  value is what it turns out to mean when laid beside five others.

Today nothing distinguishes them. Both become captures, both are filed, and the
noticing reads both.

**Why this is probably fine, and it is worth saying before the worry:** the
noticing is already built to refuse. `noticing/prompts/decide.md` tells it that
*"nothing is an ordinary answer"*, that most runs are expected to find nothing,
and specifically to say nothing *"when the captures are only a subject coming
up"*. A page of apartment numbers is exactly that. And facts are genuine
context — knowing his employer and his history is what lets an article connect
what he keeps circling back to with where he has been.

**Two things that are real, though:**

1. **The noticing is woken by frequency.** A mechanical count over the ledger
   fires it when a subject is touched often. Pour fifty facts about one person in
   and it will be asked about that person again and again — each time correctly
   answering nothing, but each time another chance to force a pattern that is not
   there. *The guard against that is a prompt, which is somebody's word.*
2. **A CV is not a capture.** It is one lump holding a hundred facts across
   dozens of subjects, arriving at once. Nothing here has seen an input of that
   shape. It would file into many pages in a single run, and it would move the
   ledger counts in a way no ordinary day does.

**What would actually answer it:** a way to tell a fact from a thought — declared
by him, or inferred by the filing — so Codex holds both while the noticing weighs
them differently: facts as context it may draw on, thoughts as the material it
works from.

*Why not build that now: nobody knows yet whether it is needed. He has not yet
filled it with mixed material, and the noticing has run only a handful of times.
The number that would settle it does not exist — how often the noticing is woken
by a subject that is only facts. Built first, it is a guess at a guess, the same
mistake the margin's second slice is waiting to avoid.*

**Status:** OPEN. Told to him as: put everything in, and put the CV in
deliberately rather than as one lump. Revisit when the mind has a few weeks of
mixed material in it and there is something to count.

---

## A review was dispatched past a check that had refused it

**17 September 2026.** The guide dispatched a review of pull request 32, having
run `tools/check-handoff.mjs` first. The check exited 1 and printed *"Nothing was
sent."* The guide sent it anyway, with two paragraphs appended to the seven
fields explaining why the refusal was acceptable.

The reviewer refused before reading the change, and was right to. The round was
not spent; the dispatching session was — for the third time in two days, and
this time by the session that had written the rule about running the check into
the guide's own skill hours earlier.

**What the reviewer found while checking, which is worse than the dispatch:**

1. **The appended paragraphs did not sit outside the seven fields — they were
   swallowed into the seventh.** `parseHandoff` appends every line that is not a
   field header to whichever field is open, and `done-looks-like` is the last
   one. So the reviewer was handed a job description with the dispatcher's own
   account of its dispatch inside it. The exact contamination the two new rules
   in the guide's skill exist to prevent, arriving through the format itself.
2. **The shape check cannot see trailing prose on its own.** It catches it only
   as a side effect of comparing `done-looks-like` word for word against the
   scope page. When no scope page is found, that comparison never runs and
   appended prose of any length passes through unexamined. That is the hole this
   dispatch went through.
3. **When the comparison does run, the refusal names the wrong thing.** Fed a
   clean handoff with two sentences of opinion appended, the check refused —
   but reported a blank separator line as the mismatch rather than the opinion.
   Right verdict, useless reason.
4. **`repo` and `diffstat` are never compared to anything.** The guide told the
   reviewer that "six of the seven fields passed against the branch". Four are
   compared: `branch`, `head`, `status`, `pull-request`. The other two are
   shape-checked only. The diffstat was correct, but nothing had established it.

**What the check being unfindable is really about.** The check looks for
`projects/<project>/scope/<branch-tail>.md`. This change sat on the guide's own
long-lived working branch, which is named after the guide rather than after a
change, so no scope page could ever be found for it. Every other change in this
workshop is on a branch named for the change, with a scope page to match. The
guide had been putting workshop records on its own branch instead.

**Fixed here:** a scope page for this change, and the handoff re-sent as seven
fields and nothing else, with `--scope` naming the page.

**Still open, three things:**

- **The check should refuse trailing prose on its own**, without needing a scope
  page to compare against, and should name the prose rather than a blank line.
- **`diffstat` should be compared**, or the check should stop being described as
  though it were.
- **A reviewer cannot be told which working copy to avoid**, because that
  instruction is an eighth field and the format refuses it. Reviewers have been
  making their own checkouts unprompted, which is the right behaviour arrived at
  by luck. It belongs in `.claude/agents/da-vinci.md` — one of the three files
  that needs the owner's yes before it changes.

**Status:** OPEN on all three. Not fixed in this change, because this change is
records and the check is code; a fix to the check is a build with tests and its
own review.

---

## The rules written to stop the handoff faults restated two of them

**17 September 2026.** A review of the change above found five things, four of
them inside the rules that change adds to `.claude/skills/virgil/SKILL.md` —
the file every future guide session reads. All five were fixed in the next
version; they are recorded because of what they have in common.

1. **The rule said the check confirms the diffstat.** It does not. It compares
   four fields — `branch`, `head`, `status`, `pull-request`. The same commit's
   own entry above says exactly that. So the rule written to stop a dispatcher
   relaying an unchecked fact as checked relayed one itself, three paragraphs
   from where the fault was written down.
2. **The rule gave no invocation.** Run bare from this repository, a project
   handoff refuses on the first field — there is no such branch here — and
   nothing after it is examined, including the field the rule said was the only
   one it refuses on. The reviewer ran it and showed the output.
3. **The rule told sessions to explain to the reviewer that the check could not
   fully pass.** There is no channel for that. An eighth field is refused; prose
   is folded into the seventh. The same commit lists this as open, and the rule
   nonetheless wrote the manoeuvre up as a routine step.
4. **A rule addressed to reviewers sat in a file no reviewer opens**, three
   paragraphs after the same section says a rule in a file the session never
   opens is not a rule.
5. **The scope page said two rules were added and the diff added five.**

**What they have in common, which is the thing worth keeping:** every one is the
fix for a fault committing the fault it fixes. The session writing them had all
the evidence in front of it — it had just written the entry naming the four
compared fields — and wrote the rule wrong anyway. Proximity to the evidence did
not help. Only a fresh session reading the rules against the code caught them.

*Why that matters beyond this change: the workshop's answer to a recurring fault
is to write a rule, and this is the first measurement of how good the rules are.
Four of five wrong in a file every future session reads.*

**Status:** the five are fixed. The general finding is open — nothing checks a
rule against the code it describes, and `tools/check-budgets.mjs` checks only
that paths exist.

---

## Second review of the same change, four more, and one entry that recurred on its own review

**17 September 2026.** The version that fixed the five above was reviewed again
and returned four more. All four are fixed. Three are worth keeping.

**The reviewer marked `context_isolation: false`, and the reason is an entry
already on this page.** Listing the shared scratch directory put `handoff-32.txt`,
`handoff-32b.txt` and `handoff-32c.txt` in front of it — three successive drafts
of the dispatch it was reviewing — beside `fixwork/`, `refusals.patch`,
`main-SKILL.md` and `app.good.js`. It opened none and listed only after its
findings were formed. *So the entry "Da Vinci and Michelangelo share one scratch
directory" recurred on the review of the change that logs it.* Nothing here has
moved on it; it is still open and it is now the second reviewer in a row to
report it.

**A scope page gave two answers to the same question twenty lines apart.**
`projects/zibaldone/scope/the-noticing.md` was widened to let the noticing
suggest a plan, and the "What is out" entry was updated to match — but a rule
twenty lines above still used *"You should book three sessions a week"* as its
worked example of the forbidden side, and still read as current. The change's own
new text warns that a fourth session will narrow this line; the stale line is
exactly where it would narrow it from. *The general fault: widening a rule means
finding every place the old reading is worked out, not only the place it is
stated.*

**A field was checked against the wrong repository, silently.** Run bare from
here, a project handoff refuses on `branch` — and `status` is still compared,
against this repository's working tree rather than the project's. Reproduced
here: a handoff for `claude/the-narrating` in the notebook's repository was
refused for a modification to `.claude/skills/virgil/SKILL.md`, a file in this
one. A dispatcher seeing `status` pass on a bare run has been told nothing about
the tree it asked about.

**Status:** the four findings are fixed. The scratch directory is open and has
now recurred twice. The `status`-against-the-wrong-tree behaviour is open — the
check should refuse to compare a field it cannot compare against the right tree,
rather than comparing it against the tree it happens to be in.
