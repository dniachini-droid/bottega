# What makes a reviewer find real defects

Reference for building the reviewer. Nothing here binds until it becomes a
rule in `AGENTS.md` with its reason attached — see `docs/research/README.md`.

**How claims are marked.** Every item below says whether it was **read
directly** from the source, or came **only from a search summary** because the
source could not be reached. Anything in the second class is marked
**unverified** and stays marked. Where the class was never recorded at all,
the item says so rather than guessing — an unmarked item is not the same as a
checked one.

---

## Split finding things from deciding whether they are real

Anthropic's own security reviewer, `anthropics/claude-code-security-review`,
does not do these in one pass. Detection runs as one task. Then **a separate
sub-task runs per finding, and its only job is to kill that finding.**
Anything that survives below 8 out of 10 confidence is dropped.

The part that decides is **forbidden from running commands or writing files**.
It re-decides by reading only.

*(Read directly from the repository.)*

## Tell the reviewer what else already checks the work, and forbid repeating it

From `block/goose`:

> "You review PRs immediately, before CI completes. Do not flag issues that CI
> will catch"

followed by a literal list of what the automatic checks actually run.

Restating what a linter already said is the single largest source of real
review noise.

*(Read directly.)*

## A finding does not exist without a concrete trigger

From Qodo's reviewer prompt:

> "If you cannot confidently explain why something is a problem with a
> concrete scenario, do not flag it"

and

> "Do not speculate that a change might break other code unless you can
> identify the specific affected code path from the diff context."

*(Read directly.)*

## A "do not report" list, written as decided precedents about this codebase

Not a list of banned topics — a list of arguments that have already been had
and settled, about this repository, versioned, and grown from actual false
alarms as they happen.

A precedent settles a recurring argument. A category merely bans a subject,
which also bans the real defect that happens to fall inside it.

*(No source recorded for this one — it is a conclusion drawn here, not a
report of how somebody else does it.)*

## The verdict is one field, separate from the severity of individual findings

Qodo uses a single top-level value: `safe_to_merge`, `merge_with_caution`, or
`changes_required`.

A reader acts on one field. Working out an overall verdict by reading down a
list of severities is how a blocking finding gets lost in a long report.

*(Source class not recorded — the Qodo prompt above was read directly, but
whether this detail came from the same reading was not written down.)*

## Cap how many findings come back, and permit none at all

> "An empty list is acceptable if no clear issues are found."

A reviewer that must produce findings will produce findings.

*(Source class not recorded.)*

## Counter-evidence: do not do the obvious thing without testing it

A study on judging whether code conforms to its requirements reportedly finds
that prompts which require an explanation and a proposed repair make
over-correction **worse** — the model rejects correct code more often.

**So: do not require a suggested fix on every finding without first testing
what that does.** The obvious improvement is, on this evidence, a regression.

**Unverified — search summary only. The source, on arXiv, was blocked and was
never read.** The size of the effect and the conditions it held under are not
known here.

## The test paradox

Among reviews that wrongly approved a change:

- reportedly 82% of the review reports contain the word "pass"
- reportedly 62% of false-positive patches include test files written by the
  same AI that wrote the patch — *"they naturally validate the same mental
  model as the patch itself."*

A reviewer must not lean on the builder's tests as evidence that the builder's
change is correct.

**Unverified — search summary only.** Both figures are recorded as they were
received and neither was checked against its source.

## Two guards that nobody else appears to have

**First: a gate on anything the deciding step introduced that the finding step
never raised.** With one reviewer and one step that decides, a fabricated
finding has nothing downstream to catch it. The step that is supposed to kill
findings can also invent them, and at that point it is the last word.

**Second: a control test for the reviewer itself.** Run a deliberately empty
input through it. A reviewer that cannot score obvious junk clearly below real
work is not measuring anything, and gets dropped.

*(This second one is the "checks never observed refusing anything" budget,
applied to the reviewer.)*

## The most-installed community reviewer is a warning, not a model

The most-installed reviewer agent available publicly has:

- no fixed shape for its output
- no list of things not to report
- no confidence rule
- **write and edit tools granted to the reviewer**
- invented statistics in what it emits

*(Read directly.)*

Popularity is not evidence. This one is the modal example of the category and
it fails on every point above.
