# Feed the check something bad, never the product

## What it does

Adds the missing half of one budget. "Checks never observed refusing anything
— 0" says every check must be watched refusing something. It has never said
where to get the something.

On 14 September 2026 a build session answered that by removing the smallest
allowed value from a number box, so its empty-workout guard would have
something to refuse. Two blind reviewers, neither of whom had seen this
repository's rules, each recorded that as a defect in the product.

The budget now says: the bad input is either written for the test and kept with
the tests, or a temporary edit that is put back afterwards. Both are proper,
and most entries in `docs/REFUSALS.md` are the second — a file padded until the
check refused, then restored. What is never allowed is buying a refusal with a
change that stays. If what a person actually gets is worse afterwards, that is
the finding — write it down and leave the change unmade.

## What done looks like

- `AGENTS.md` carries the new half under the existing budget, with its reason,
  naming what happened on 14 September 2026.
- `docs/REFUSALS.md` says an entry must name the bad input and where it is now,
  and that an entry resting on a change that stayed does not count. Neither
  file voids the entries already recorded there, which were made by padding a
  shipped file until the check refused and then restoring it.
- The budget itself is unchanged. It was not at fault and its limit does not
  move.
- Both startup numbers stay under 10,000, and the heaviest is reported from a
  run of the check rather than copied from an earlier one.
- A guard that cannot be exercised without damaging the product is said to be
  an open item rather than a standoff between two budgets.
- The budget check and the tests pass.

## What is out

- Anything mechanical. No check can tell a test fixture from a product change
  without knowing what the product is, and one that tried would refuse honest
  work. This is wording, and the reviewer reading the entry is the enforcement.
- The other two faults from that trial. They are separate changes.
- Any change to the limit, to the other five budgets, or to either skill.
