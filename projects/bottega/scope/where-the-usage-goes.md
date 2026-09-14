# Where the usage goes, and how other people cut it

## What it does

Finds out how other people reduce what an agent system consumes — across the
whole of it, not just the prompt that starts a session. How the reduction is
automated rather than remembered. Produces one research page and a
recommendation. It builds nothing.

## What is already known, measured today

A session here begins at about **74,600 tokens** before it does any work:

| | tokens | ours to change? |
|---|---|---|
| tool definitions, loaded | 26,400 | no |
| system prompt | 10,000 | no |
| the prompt the guide window writes | 27,400 | **yes — and nothing measures it** |
| skills, all descriptions | 4,200 | partly — plugins we do not use |
| this repository's rules | 3,600 | yes, and already policed |
| reserved buffer, unspent | 33,000 | no |
| tool definitions held back until needed | 66,400 | already free |

The floor we cannot move is about 36,000. **The largest movable item is the
prompt, and it is three times the whole budget this repository polices.**

## What done looks like

- **`docs/research/USAGE.md`**, following `docs/research/README.md`: research
  is reference not authority, every claim marked read-in-full or
  search-summary-only.
- **A survey of several named approaches** — what people actually run, not
  only what they publish.
- **Five questions answered with evidence:**
  1. **Where does it actually go** in a working agent system, and which parts
     do people find are worth attacking?
  2. **Which techniques have a measured effect**, and how big? Loading on
     demand, summarising, pruning, cheaper models for cheaper steps, fewer
     tools, shorter instructions — which of these are real and which are folk
     wisdom?
  3. **How is it automated?** Not remembered by a careful operator — enforced,
     generated, or measured by something that refuses.
  4. **How do people design the agents themselves to be cheap** — the shape of
     the work, not just the wording. Fewer steps, narrower tools, smaller
     models where they suffice.
  5. **What has been tried and abandoned?** The most useful answer and the
     hardest to find.
- **A recommendation for this workshop, in plain words**, that could have
  prevented a 27,400-token prompt — and says what to measure, since nothing
  currently measures the largest movable thing.

## What is out

- Building any of it. No rule, no check, no template, no change to anything.
- Memory. That is pull request 8.
- The prompt itself as a piece of craft. That is pull request 9 — this one is
  about the whole system, and the two must not duplicate. Read #9's scope and
  stay off it.
- Zibaldone, the rename, and either 10,000 limit.
