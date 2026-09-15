## Stage 3 — BUILD

Start one session. The general rules for starting sessions — pinning the
branch, never plan mode, facts in the prompt, the title, the report on the
pull request — are in the Virgil skill under starting work, and they are not
repeated here. *Why: two copies of the same rule drift apart, and then neither
is trustworthy.*

Where it starts, where it clones the project, and what it does there is in
the section above that covers all three of the sessions this path starts.

What is particular to a build, and is not written anywhere else:

### What the prompt says

**The scope page's three headings are written into the prompt in full** —
what it does, what done looks like, what is out — and the prompt says that is
the whole job and nothing beyond it. The page is also on the branch, at
`projects/<project-id>/scope/<short-name>.md`, and the prompt says so as the
place to go back to; but the session is never sent to a file for the job
itself. *Why: this skill's own rule is to put the facts in the prompt, not
directions to the facts, and a session sent to a file that is missing reads
the promise that it is there as evidence it is looking in the wrong place.*

**The pull request already exists when the session starts, and its number is
in the prompt.** Virgil created the branch, opened it as a draft and
subscribed to it before starting anything — the Virgil skill says how. So the
session opens nothing. It builds, and it comments there when it finishes, when
it stops early, and when it is blocked.

*Why this rule survived and "open it first yourself" did not: both existed to
close the same gap, between a session starting and its number existing. Opened
before the session starts, the gap is nothing; opened by the session, it is
however long the first push takes. Keeping both is how a rule outlives the gap
it was written for.*

And two prohibitions, written into every build prompt, one for each direction:
**copy no file from Bottega into the project's repository — not the rules, not
the skills, not the scope page, not the tools. And copy no file from the
project into Bottega — its code never comes here, in whole or in part.**

*Why the first: the reason this workbench exists is that a framework improved
here improves every project at once. A project carrying its own copy is a
project stuck on the version of the day it was copied, and the owner has said
what he wants in his own words: project repositories stay where they are and
stay clean. Why the second: an application that has started arriving in the
workshop is the 85,000-line failure this repository opens by citing, and it
arrives one useful file at a time.*

---
