# Research

Reference material gathered while working out what to build.

## The rule that governs this folder

**Research is reference, not authority. A figure recorded here governs nothing
on its own.**

It informs what gets built. The rule that results from it is what binds. If
you want something here to have force, it has to become a rule in `AGENTS.md`,
with its reason attached — and then it can be argued with, and deleted when
its reason stops holding.

*Why: a number in a document acquires authority it was never given, simply by
being written down. Nothing in this folder has been through the test that a
rule goes through.*

## What belongs here

Notes on how a thing is done elsewhere, and what the evidence for it is, for
work that is coming. A file here should be readable by somebody who was not in
the conversation that produced it.

## What does not belong here

- A record of what happened. That is the pull requests.
- Open items. Those go in `docs/OPEN.md`, and nowhere else.
- Anything that is actually a rule. That goes in `AGENTS.md`, with its reason.

## How claims are marked

Every body of research below distinguishes **what was read directly** from
**what came only from a search summary** — the containers that ran this work
could not reach most academic sources, so some findings were never seen in
their original form.

There is a third case, and a page that meets it marks it separately rather than
folding it into either: **the primary source was reached, but read through a
summariser** — the page was fetched and a small model extracted the answer,
while the original text was never read. It counts as **not read directly**, and
is marked unverified along with the rest. *Why it is named rather than merged
into one of the other two: a fetch that ends in somebody else's summary is
closer to a search result than to reading, and calling it read directly would
quietly upgrade it. `PROMPTS.md` drew this distinction first and uses it; it is
written here so that what the folder says of itself matches what its pages do.*

**That distinction is preserved, and it must survive every edit.** Anything not
read directly is marked unverified, in place, next to the claim.

*Why: a number that loses its uncertainty on the way into a document becomes
false confidence. It then gets quoted by the next document without the
qualifier, and by then nobody can tell which numbers were checked.*

## What is here

- `REVIEWER-CRAFT.md` — what goes into a reviewer that finds real defects
  instead of generating noise.
- `HANDOFF.md` — what travels between sessions, and what must not.
- `MEMORY.md` — what other people run for agent memory, what they abandoned,
  and what that suggests for a memory here.
- `PROMPTS.md` — what goes in the prompt that starts a session, how long it
  may be, how it is produced, and whether anything should measure it.
- `USAGE.md` — where a session's usage actually goes, and how other people cut
  it across a whole agent system.

`PROMPTS.md` and `USAGE.md` both ask whether the size of a dispatch prompt
should become a seventh budget, and answer it differently: `USAGE.md` says
print the number and add no row, `PROMPTS.md` argued for the row. What was
built is `USAGE.md`'s version. Both were written on 14 September 2026, and
`USAGE.md` merged first. Each now says on its own page where it stands against
the other. *Why this is written here too: two pages sitting side by side in one
folder, answering the same question opposite ways with nothing saying which is
which, is how the next session gets told both and believes the one it opened
first.*
