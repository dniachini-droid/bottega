# Bottega

Bottega is a workshop for building applications with AI agents. It is not an
application itself, and no application is built inside it. The applications
built with Bottega live in their own repositories. *Why: a system and an
application that share a repository stop being separable. One of the owner's
earlier repositories needed 85,000 lines taken out across two merges to get
the system free of the application that had grown up inside it.*

What Bottega is for, and how we will know it worked, is written down in
`docs/VISION.md`.

The rules below hold for every session that works in this repository, and for
every session that works in a project built with Bottega.

## How to work here

Every rule below carries the reason it exists. If a rule's reason no longer
holds, the rule can be deleted. A rule without a reason can never be safely
removed, which is how instruction files grow and never shrink.

**Build in small pieces.** Make and review small changes rather than large
ones. *Why: a small change under review catches roughly three times more
defects than a large one.*

**One review, in a fresh session. Never review your own work.** The session
that built a change does not review it, and neither does a helper that
inherited the builder's context. *Why: a model reviewing its own work misses
about a third of its own drift, and this does not improve as models get
better. A fresh session scores measurably better than a helper carrying the
builder's context.* The reviewer's method is `docs/REVIEWER.md`.

**Never run a second review round on the same version.** One review per
version. If the review found things, fix them and the next review is of the
new version. *Why: a second pass on unchanged code raises what it catches
only slightly but produces 62% more false alarms, and precision collapses
from 0.30 to 0.20. Once the real errors run out, reviewers invent them.*

**Evidence, not claims.** Nothing is done because a test passed. Reproduce the
problem, watch it fail, fix it, watch it pass, and say what you observed.
*Why: about 1 in 50 real agent transcripts contains a claim that a review
passed when no review ran.*

**Grep, do not read.** Search for what you need and read around the hit.
*Why: reading a large file whole spends the session's budget on retrieval, and
the volume of context by itself degrades accuracy. The same task passes 8 runs
in 10 on a small context and 3 in 10 on a large one, whether or not the extra
material is relevant.*

**Say what you did not do**, as plainly as what you did. *Why: the owner can
only act on a gap he has been told about.*

**Plain language for the owner.** Do not use a technical term and then define
it. Say the thing in ordinary words instead. File names, branch names and
identifiers are yours to carry, not his. *Why: he is not a software engineer
and does not want to become one. Two earlier repositories of his became too
complex to follow, and this one is a deliberate reset.*

**Review is proportionate to blast radius.** A change to the file that starts
every future session gets a review. A typo does not. *Why: reviewing
everything equally is how a project ends up with five reviews of a two-file
change, most of the findings about the reviewing machinery rather than the
work.*

**A fix session is given the review itself, not a summary of it.** *Why: on
one pull request here, three of five blocking findings were dropped in the
relay from review to fix, and the second review spent its whole pass
rediscovering them.*

**Virgil may merge small reversible changes.** For a change to `AGENTS.md`, to
either skill, or to an agent definition, it asks the owner first and merges on
his yes. It never merges on an empty review alone — a fresh session has to
have reviewed that version and said what it found. *Why: the owner settled
this on 14 September 2026. A small change that can be undone costs little if
it is wrong, and making him press every button is how automation stops paying
for itself. The three exceptions are the files that govern every future
session, where a wrong merge is not small and not quietly reversible. And a
review that found nothing looks exactly like a review that never ran — about 1
in 50 real agent transcripts claims a review passed when none happened.*

A build session still never merges its own work, and the reviewer still merges
nothing at all. *Why: a session that merges what it just wrote has removed the
step that exists to catch it.*

## The budgets

Six numbers. A change that pushes one of them past its limit is not finished,
whatever else it did.

| budget | limit |
|---|---|
| tokens loaded before a session starts work | under 10,000, twice over |
| failing tests on `main` | 0 |
| checks never observed refusing anything | 0 |
| dead file references in `AGENTS.md` | 0 |
| agent definitions | 2 (a builder and a reviewer) |
| rules with no stated reason | 0 |

**Tokens loaded before a session starts work — under 10,000.** Two numbers,
both under it: what **every** session loads, and what the **heaviest single**
session loads once it opens the largest set of instructions it will use.
*Why two: a skill is offered to a session as a name and a description, and its
body arrives only if the session opens it — so charging every session for
every skill over-counts, and counting only what is offered lets a skill grow
without limit behind its own description. Neither number on its own is the
truth.*

*Why the limit at all: a comparable framework measured 49,669 tokens spent
before its agent did any work at all. Context volume by itself degrades
accuracy — the same task passes 8 runs in 10 on a small context and 3 in 10 on
a large one, whether or not the extra material is relevant. This is a
correctness budget, not only a cost one.* *Why the same limit for both
numbers: accuracy falls with context while the session is working, which is
exactly when the heavier number is real. A looser limit for the heavier one
would say accuracy matters less once the work starts.*

**Failing tests on `main` — 0.** *Why: that same framework carries 51 failing
tests on its only branch, including a real data-loss bug, because nothing ever
runs them. A failing test nobody runs is not a warning, it is furniture.*

**Checks never observed refusing anything — 0.** Every check here must be
watched refusing something at least once, and what was seen written down in
`docs/REFUSALS.md`. *Why: a check never seen refusing anything cannot be
told apart from one that cannot fire.*

**Dead file references in `AGENTS.md` — 0.** *Why: in that same framework, 11
of the 21 links in the files a session reads first are broken — including the
rules file it tells every session to go and read.*

**Agent definitions — 2: a builder and a reviewer.** *Why: under matched
conditions, five of six multi-agent systems performed worse than a single
agent and cost more, and the noise floor in that literature is about 15
points — wider than most of the gains anyone has published. The one
multi-agent pattern with a clean, replicated benefit is a fresh session for
review. That is the reviewer, and it is the whole reason the limit is two
rather than one.*

**Rules with no stated reason — 0.** *Why: adding the reason to a rule
improved how often rules were followed by 23.1% across 247,694 instruction
lifetimes, and made 99.3% of surplus rules safely deletable afterwards. Once a
reason is lost nobody dares remove the rule, so instruction files grow 226%
over their lifetime and never shrink.*

### The point of all six

The limit that matters is not how large a file is. It is whether the file can
ever shrink.

Every budget above is written so that something can be taken out later and the
number will show it. A budget that can only be approached and never reversed
is a countdown, not a budget.

### Deliberately not a budget

There is no limit on how many lines `AGENTS.md` may run to, and one should not
be added. *Why: a controlled study across 16,050 observations varied
instruction-file length from 25 lines to 500, varied where in the file a rule
sat, and varied one file against nested files against paired files. None of it
changed whether the rules were followed. A line limit would cost real
reasons — the thing that does work — to buy a number that does not.*

### Which of the six a machine checks

`tools/check-budgets.mjs` checks two of them and fails loudly: the startup
token count, and dead file references. It runs on every push and every pull
request, through `.github/workflows/checks.yml`.

For the startup count it reports the two numbers above, and fails if either is
over. Every session is charged `AGENTS.md`, `.claude/settings.json`, and the
name and description of each skill and each agent definition — all a session
is shown of them until it opens one. The heaviest session is that, plus the
largest single skill or agent definition in full, counting any supporting
files that sit beside it. Bytes divided by four.

`CLAUDE.md` is a symbolic link to `AGENTS.md`: the same bytes under a second
name, not a second file. A session is given that text once, so it is counted
once, and counting `AGENTS.md` counts exactly what arrives.

For dead references it takes every path written in backticks in `AGENTS.md`
and checks that it is really there. So writing a path in backticks is how you
ask to be warned when it disappears.

The other four are on their word: failing tests, checks never seen refusing,
the count of agent definitions, and rules with no reason. *Why: saying which
budgets a machine enforces and which it does not is the difference between a
budget and a decoration.*
