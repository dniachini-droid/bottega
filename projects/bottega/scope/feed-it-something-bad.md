# Feed the check something bad, never the product

## What it does

Adds the missing half of one budget. "Checks never observed refusing anything
— 0" says every check must be watched refusing something. It has never said
where to get the something.

On 14 September 2026 a build session answered that by removing the smallest
allowed value from a number box, so its empty-workout guard would have
something to refuse. Two blind reviewers, neither of whom had seen this
repository's rules, each recorded that as a defect in the product.

The budget now says: the bad input is written for the test and lives with the
tests, and never ships. If the only way to watch a check refuse is to change
what a person actually gets, that is the finding — write it down and leave the
change unmade.

## What done looks like

- `AGENTS.md` carries the new half under the existing budget, with its reason,
  naming what happened on 14 September 2026.
- `docs/REFUSALS.md` says an entry must name the bad input and where it lives,
  and that an entry resting on a change to the product does not count.
- The budget itself is unchanged. It was not at fault and its limit does not
  move.
- Both startup numbers stay under 10,000, and the heaviest is reported.
- The budget check and the tests pass.

## What is out

- Anything mechanical. No check can tell a test fixture from a product change
  without knowing what the product is, and one that tried would refuse honest
  work. This is wording, and the reviewer reading the entry is the enforcement.
- The other two faults from that trial. They are separate changes.
- Any change to the limit, to the other five budgets, or to either skill.
