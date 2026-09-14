# What can and cannot carry an event here

Read this before designing anything that waits. Each line says what was tried
and when.

*Why this file exists: three of the obvious ways to make the workshop
event-driven do not work, and each one fails silently. A design resting on any
of them looks, from outside, exactly like a design that is working.*

---

## Carries an event

**A comment, a review, or a failing check on a pull request wakes the guide
window within seconds.** The mechanism is `subscribe_pr_activity`. Tested
14 September 2026; it is real and it is fast.

**But it needs a pull request number, so it cannot start before the pull
request exists.** That is the whole reason every session this workshop starts
is required to open its pull request first, as a draft, before doing the work.

## Does not carry an event

**An automatic check cannot wake the guide window.** Tested 14 September 2026.
The session's own address exists, but an unsigned caller is refused with a 401
and the credential needed to sign is sealed where a workflow cannot reach it.
A workflow can still run, and can still post a comment on the pull request —
which is a signal, because the comment is what the window is subscribed to.
What it cannot do is call into a running session.

**A running session cannot be messaged by the window that started it.**
Checked twice on 14 September 2026. Nothing addresses it.

**Nothing signals that a session has ended.** There is no such event, in
either direction. This is why every dispatched session is ordered to comment
on the pull request when it finishes, when it stops early, and when it is
blocked: that comment *is* the event, and without it silence cannot be told
apart from a session that died.

---

## The gap that is left, and it is not closed

Between a session starting and its pull request existing, nothing can be
subscribed to and nothing can be woken. The pull-request-first rule shrinks
that gap from the length of a whole build to the length of one push, but it
does not remove it: the number still has to be fetched rather than delivered.

The guide window therefore looks for it — twice, then stops, and tells the
owner. That is a bounded lookup, not a timer. Everything after it is events.

**Not attempted, and why:** having the guide window open the draft pull
request itself would close the gap completely, because it would know the
number before the session started. It was not built because opening a pull
request needs a commit, and Virgil does not write to the repository. That
trade — Virgil stops being read-only — is the owner's to make, not a session's.
