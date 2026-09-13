# Cabinet

Cabinet is a personal curiosity collection. The owner drops in a thing he found
interesting and the app uses the Claude API to turn it into a small knowledge
card. Over time it surfaces connections between the cards.

Version one is: capture, card, search, related. Nothing else.

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
builder's context.*

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

**Claude never merges.** Open the pull request and stop. *Why: the merge is
the owner's decision and the last point at which he can say no.*
