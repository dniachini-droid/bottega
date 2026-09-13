# Where this is going

This is the end goal. Everything in this repository gets checked against it,
and anything that cannot be traced back to something on this page is a
candidate for deletion.

*Why: a goal that lives only in a conversation dies with the window it was made
in, and then every later decision has to be argued from scratch.*

## What Bottega is for

A lean, fast, accurate system for building applications, which guides somebody
who has never built one from "I want a thing" to a working app on his phone.

Better software than the popular alternatives, at a fraction of the running
cost, and the person never wondering what is happening or what to do next.

## The five things that make it different

### 1. It guides rather than presenting options

`/build` walks seven stages and says which stage it is at in every reply.
`/virgil` answers "where am I". Every reply ends with one `Next:` line.

Four moments need the person: answer the scope questions, approve the smallest
version, look at the result, press merge. Nothing else waits on him.

### 2. Plain language is a rule, not a preference

Do not translate a technical term — do not use it. Identifiers are the system's
to carry, not his. A report on work done ends with four questions answered in
plain words. "Nothing changed on any screen" is a useful answer.

### 3. Almost no ceremony up front; strong checks at the end

Rigidity is not how many rules you have, it is when they fire. A form before
starting taxes every job. A check at the end costs nothing until something is
actually wrong.

*Why: neither of the two systems the owner measured does this. Both front-load.*

### 4. Every rule carries its reason

*Why: across 247,694 instruction lifetimes, adding a "why" to a rule improved
how often rules were followed by 23.1%, and made 99.3% of surplus rules safely
deletable afterwards. The limit that matters is not how large a file is, it is
whether it can ever shrink.*

### 5. Things are added when their absence hurts, never on a schedule

A register of findings when something actually gets dropped. Memory when a
session actually repeats a mistake it has made before.

*Why: both systems the owner measured built the machinery first and then went
looking for work to apply it to. One ended with 43 of its 45 findings being
about its own machinery. The other ended with 51 failing tests nobody runs.*

## Decided

- **Memory** is Claude Code's own per-agent memory at project scope: plain
  markdown, committed, capped, readable by the owner, no infrastructure.
- **Finding things again** is plain text search first, structure second, and
  embeddings never — until a real question fails without them. *Why: an agent
  using plain text search reached about 94.5% of full retrieval performance
  with no embedding model at all, and short keyword queries collapse nearly
  every embedding model.*
- **A memory prune when a piece of work closes**, from day one. *Why: every
  failure in that field is stale entries poisoning what gets found, not too
  little storage.*
- **Two agents, a builder and a reviewer.** *Why: five of six multi-agent
  systems lost to a matched single agent, and the noise floor in that
  literature is wider than most of the gains anyone has published.*
- **One review, a fresh session, a different model family.**
- **Never a second review round on the same version.** *Why: 62% more false
  alarms, and precision falls from 0.30 to 0.20.*
- **Automatic checks on every push, and a check on this machine as work
  happens.**
- **Skills cherry-picked as files**, rather than installing a bundle. *Why: a
  bundle loads about 22,000 tokens before a session has done anything.*
- **Nothing installed from third-party marketplaces.** *Why: 13.4% of 3,984
  audited skills carry a critical security problem.*
- **Claude never merges.**

## Refused

No vector database. No graph database. No Docker. No local model. No MCP
server. No specification framework. No agent roster beyond two. No
orchestration chain. No self-review as a gate. No second review round.

## How we know it worked

Bottega is measured against a widely-used agent framework, assessed on
13 September 2026, which scored:

| dimension | the benchmark |
|---|---|
| product exists and runs | 7 |
| deterministic verification | 7 |
| review machinery | 4 |
| plan and state | 3 |
| findings tracking | 4 |
| context economy | 2 |
| agent definitions | 4 |
| safety rails | 6 |
| evidence discipline | 5 |
| delivered output | 6 |
| **mean** | **4.8** |

Bottega must beat it on every one of those dimensions, not on the average.

And six hard numbers:

| number | the benchmark | Bottega |
|---|---|---|
| tokens loaded before work starts | 49,669 | under 10,000 — 5,914 on 13 September 2026 |
| agent definitions | 17 | 2 |
| automatic checks | none | green |
| failing tests on the main branch | 51 | 0 |
| a guard on reading huge files | none | yes |
| dead links in the files read first | 11 of 21 | 0 |

### The caveat, stated honestly

This comparison cannot be run until Bottega has built at least one application
the owner uses daily. That benchmark scores 7 and 6 on the two "does it exist"
dimensions because it is 76,509 lines of working software. Until Bottega has
shipped something, a win would only measure having fewer lines to get wrong.

### The test that matters more than the score

Can somebody who has never built an application use this to build one?

The scorecard is a proxy. That question is the product.

## What would tell us we are going wrong

- The rules file grows and nothing is ever deleted.
- Machinery gets built before an application needs it.
- A session reports success without looking at the result. *This happened here
  on day one and was caught in ninety seconds.*
- The owner has to ask "so what do I do?"
- Two sessions working on one branch.
- A check that has never been seen refusing anything.
