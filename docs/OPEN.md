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

**Status:** OPEN — the separation is in a pull request and not merged, and
Claude never merges. This entry leaves the file when the owner merges it.

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
reviewer of this change tried to attach the Zibaldone repository read-only and
was refused outright by the permission classifier.

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
The reviewer that stage four calls for now exists, so that is no longer the
reason.

**Status:** OPEN — closes the first time a change goes through all seven
stages in order, with what was observed at each one written down.

---

## The reviewer has never run as a fresh session against a real change

It was tested three times against inputs made up for the purpose — clean code,
code with an obvious defect, and a handoff with a forbidden extra field — and
what was seen is in `docs/REFUSALS.md`. But all three runs were helpers
started by the session that built the reviewer, not fresh sessions started by
the guide window, and none of them reviewed a real change.

So two things are untested: that a separately started session reads the
reviewer's files and behaves the same way, and that `reviewer_mode` ever comes
back as anything other than the value a helper would report.

**Status:** OPEN — closes the first time a fresh session reviews a real change
and its comment lands on a pull request, with the six answers in it.

---

## The reviewer's restriction stops short of the shell and the GitHub tools

`.claude/agents/reviewer.md` now takes the editing tools away in its header
rather than asking for them not to be used, and that was watched working —
`docs/REFUSALS.md` has the before, the after and the control.

Two ways to write are still open to it, and neither was closed in that round:

- **`Bash`.** The method has the reviewer run the code it is judging, so the
  shell has to stay, and a shell can write a file or push a branch. What the
  restriction removes is drift over a long pass and a line in a reviewed file
  that tells the reviewer to fix a typo directly — which is how this actually
  happens. A reviewer that decided to write could still do it.
- **The GitHub tools.** The reviewer keeps the tools that talk to GitHub
  directly, and among them are ones that write a file into a repository and
  one that merges a pull request. They could be named in the same header line.
  They were not, for one reason: their names carry the prefix of the server
  they come from, which differs between environments, and a name that does not
  match is a restriction that silently does nothing. Naming four tools that
  cannot be watched refusing anything is the sixth budget's own failure, in
  the file that exists to prevent it.

**Status:** OPEN — closes when the GitHub tool names have been checked in the
environment the reviewer actually runs in, added to the header, and watched
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

## The startup budget has almost nothing left

After this round, what loads before a session starts work is about 9,980
tokens against a limit of 10,000. Twenty tokens — roughly one sentence.

The next change to the rules file, to either skill, or to the reviewer's
definition fails the check unless something comes out first. That is the budget working
as designed, and it is written here so that the next session finds it before
the check does rather than after.

Candidates for what comes out, in the order they should be considered: the
build skill still explains at length what an earlier wrong reason was and why
it was wrong, which is history rather than instruction; and the same skill's
account of why the three sessions are written up together cites a failure —
the builder's "open the pull request" reaching the fix session — that the
change above has made impossible.

**Status:** OPEN — closes when something has been taken out and the number has
gone down.

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

**Status:** OPEN — no decision yet on whether any of the four should be
machine-checked, or whether some of them are better left on trust. The
question has not been put to the owner.

---

## Optional findings from the two reviews, recorded rather than fixed

These were raised by the reviewers as worth knowing rather than blocking. They
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

