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

## The gap that was left, and how it was closed

Between a session starting and its pull request existing, nothing can be
subscribed to and nothing can be woken. The old rule — the session opens its
pull request first, before doing the work — shrank that gap to the length of
one push but could not remove it: the number still had to be fetched rather
than delivered, so the guide window looked for it twice and then gave up and
told the owner.

**Closed on 14 September 2026, by the owner deciding it rather than by a
better mechanism.** Asked whether the guide window may write to the
repository, he said yes, narrowly. Virgil now creates the branch, opens the
draft pull request, subscribes to it, and only then starts the session, which
is given the number. There is no gap to cover, so the two-look lookup is gone
and the rule that the session opens its own pull request is gone with it. The
order is in the Virgil skill; why one of those two rules survived and the
other was deleted is in the build skill.

**The commit this needs.** Opening a pull request needs at least one commit on
the branch — that was the reason this design was not built earlier, recorded
here before the permission existed, and it did not go away with the
permission. In Bottega the scope page supplies it. In a project's own
repository nothing does, so Virgil puts one empty commit on the branch. An
empty commit changes no file, which is what keeps it inside a permission that
does not extend to writing work.

**Still not observed.** None of it has run: not Virgil creating a branch, not
Virgil opening a pull request, not the empty commit. `docs/OPEN.md` carries
that, and until it has run this section describes an intention.
