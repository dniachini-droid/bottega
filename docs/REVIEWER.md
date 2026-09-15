# How Da Vinci finds real defects instead of noise

Da Vinci reads this before it looks at a change. What it must refuse, and
the shape of what it writes, are in `.claude/agents/da-vinci.md`. The evidence
behind everything here, and how far each claim was checked, is in
`docs/research/REVIEWER-CRAFT.md`.

*Why this is a separate file: everything under `.claude/` is loaded by every
session that starts, Michelangelo included, and only Da Vinci needs the method.
The startup budget in `AGENTS.md` is a correctness budget, not only a cost
one.*

---

## Open the comment with six answers, each plainly true or false

Two about whether the isolation was real:

- `context_isolation` — false if anything the handoff excludes reached you
  anyway.
- `reviewer_mode` — **`fresh_eyes` only if this review was the first
  instruction you were given and you have done nothing else since you
  started.** Anything else is `challenger`: a helper another session spawned,
  a window that has been doing other work, a session told to act as though it
  had fresh eyes. If you cannot tell which you are, you are `challenger`.

Four about whether the handoff is still describing the repository in front of
you — compare the live tree against the stamped `branch`, `head`, `status` and
`diffstat`:

- `branch_matches`, `head_matches`, `status_matches`, `diff_stat_matches`

*Why the test for `fresh_eyes` is about your own first instruction rather than
about the change: asked the loose question, a reviewer answers `fresh_eyes`
quite honestly, because it has never seen the change — which is just as true
of a helper Michelangelo spawned thirty seconds ago. Watched happening on
14 September 2026 and written up in `docs/REFUSALS.md`.*

*Why the six matter at all: today a contaminated review and a clean one look
identical in the record, and a rule that cannot be checked after the fact is
one that will eventually be broken quietly. And a head that has moved means
you reviewed a different version than the one handed to you, which is worth
knowing before anybody acts on your verdict.*

## Find, and then separately try to kill each finding

Two steps. Never one.

**Find.** Read the change and list candidate defects. Nothing leaves this step.
Running the code under review is allowed here and is often the strongest thing
you can do — running it is not writing to the repository, which is what the
prohibition covers.

**Kill.** Take each candidate on its own and try to destroy it. This step
**reads only — it runs no command and writes no file.** Anything left below 8
in 10 confidence is dropped and never appears in the comment.

**Anything the killing step raises that the finding step never found is
dropped as well**, however good it looks.

*Why the split: this is what Anthropic's own security reviewer does, and it
runs the deciding step as a separate task per finding, forbidden from running
commands or writing files. Why the second guard: with one reviewer, the step
that kills findings is the last word, and a step that can kill can also
invent. There is nothing downstream to catch a fabrication.*

## Do not report anything the automatic checks already catch

`.github/workflows/checks.yml` runs, on every push and every pull request:

- `node tools/check-budgets.mjs` — the two startup token totals, whether every
  path written in backticks in `AGENTS.md` or in any file `tools/reads.json`
  declares is really there, whether every such path is classified in that file,
  and whether a name declared there as a mention is still in the file
- `node --test` — the tests in `tools/check-budgets.test.mjs`. Nothing is
  installed first: there is no package file here and nothing to install

*Why: restating what an automatic check already said is the single largest
source of real review noise. Keep this list literal and update it when the
checks change — a vague "do not repeat CI" does not work.*

## A finding does not exist without a concrete trigger

If you cannot say what input, or what sequence, makes it go wrong, it is not a
finding and it does not go in the comment. Do not say a change might break
something else unless you can point at the affected path in the change itself.

The arguments already had and settled about this repository are in
`docs/PRECEDENTS.md`. Read it before you report. Do not reopen what is there.

*Why a list of precedents rather than a list of banned subjects: banning a
subject also bans the real defect that happens to fall inside it. A precedent
settles a recurring argument without doing that.*

## Two things not to do, both on evidence that was never verified

- **Michelangelo's tests are not evidence that its change is right.**
  A test written by whoever wrote the change validates the same idea the
  change does.
- **Do not attach a suggested repair to every finding.** Requiring an
  explanation and a repair reportedly makes over-correction worse — the model
  rejects correct code more often.

*Why both are marked: each came from a search summary whose source was never
read, and both stay marked unverified in `docs/research/REVIEWER-CRAFT.md`.
They are followed here because the cost of following them is small and the
cost of being wrong the other way is not. If either is ever checked properly,
this is the paragraph to come back to.*

## The control test, before Da Vinci is trusted or changed

Run Da Vinci against an input with nothing wrong with it and confirm it
reports nothing. Then run it against an input with something obviously wrong
and confirm it reports that. Write both down in `docs/REFUSALS.md`.

*Why: a reviewer that cannot tell obvious junk from clean work is not
measuring anything, and should be dropped rather than tuned. This is the
"checks never observed refusing anything" budget applied to Da Vinci
itself.*
