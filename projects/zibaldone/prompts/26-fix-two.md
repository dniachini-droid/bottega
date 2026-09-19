You are Michelangelo. Fix one review finding on a change that is already built,
already reviewed twice and already fixed once. Do not start the change again,
and change nothing the finding does not reach.

repo:         https://github.com/dniachini-droid/zibaldone
branch:       claude/the-research
head:         6c57e79efdde7057937ab57bfcb036f8cc922536
pull-request: 26

Push your repair to that same branch. Open no second pull request.

The scope page for this change is `projects/zibaldone/scope/the-research.md`
in Bottega, on branch `claude/virgil-kus0id`. Read it. It says what the thing
is for and what it must never do.

The owner was told this round was stopping and he said to fix it. It is the
last round: whatever is not right after this goes back to him, not into
another round.

The finding below blocks the merge. Before it is merged it:

  - is written as a test that drives the real path, not the inner function
    with a hand-supplied argument — the reason this was never caught is that
    the only test called `choose()` directly,
  - is watched failing against `6c57e79`,
  - is watched passing against the fix,
  - and what you saw goes in `docs/REFUSALS.md`.

Do not buy a refusal with a change that stays. Bad inputs live beside the
tests as fixtures, or are a temporary edit put back afterwards.

Run the whole suite where a browser exists, more than once, and say what you
saw.

Comment on the pull request when you finish, when you stop early, and when you
are blocked — and say which of the three it is.

Here is the review, in full and unedited.

---

context_isolation: true
reviewer_mode: fresh_eyes
branch_matches: true
head_matches: true
status_matches: true
diff_stat_matches: true

changes_required

1. `research/subject.js:70-73` promises a specific refusal — if he asks a question whose nearest page is marked a named person (or "how he feels"), the run stops and tells him so in his own words. In the running system that branch never fires. `research/research.js:248` always calls `chooseSubject(...)` with `nearest: () => null`, so at the point subject.js checks `subject && !may(subject)`, `subject` is always null and the throw is dead code. The real nearest-page lookup happens afterward, at `research/research.js:254-259`, and it only attaches a subject when the eligible mark is exactly `'subject'`; when the nearest page turns out to be `'person'` or `'feelings'`, it does nothing. `chosen.because` is left at the value subject.js set when it thought no page was near: "he asked this himself, at his own computer, and no page of his is near it" (`subject.js:78`) — which is false in this case. A page was found; it was walled off, and he is never told that.

   Concrete trigger: he types a question (`research ask "..."`) whose nearest page by `ctx.mind.find()` is a page marked a named person. Expected, per subject.js's own docstring and the message it constructs: an explicit refusal naming the wall, the way `test/research.test.js:140` already covers for "no eligible subject at all." Actual: the pass proceeds with no subject attached and reports that no page of his was near his own question, when one was.

   No secret of his leaves the house either way — captures tied to the walled page are never attached when `chosen.subject` stays null, so this isn't the privacy break the two rooms exist to prevent. It's the tool stating something false about what it just did, which is the same class of fault the fix in this PR's own last commit was written to correct on the network side. It's also untested: the only `NothingToResearch` coverage for this throw calls `subject.js`'s `choose()` directly with a hand-supplied `nearest`; nothing drives it through `research.js`'s real `choose(ctx)` with a mocked `ctx.mind.find()` resolving to a person-marked page, so nothing would have caught that the real caller never wires `nearest` up at all.
