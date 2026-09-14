# Measuring the loop

## What it does

Puts measuring the loop on `docs/PLAN.md` as the next piece of work, with its
reason attached, and brings the plan up to date with what has already merged.

For each change, two numbers get recorded: what the review found, and what got
through the review and was discovered later. No limit is set on either.

Also adds, each with its reason, the four jobs the owner approved on
14 September 2026, and corrects the plan where it had drifted from the record.

## What done looks like

- `docs/PLAN.md` carries measuring the loop as item 1, with its reason.
- Every factual claim in every reason added is true of the record it
  describes — the pull request threads for the isolation claims, and
  `docs/REFUSALS.md` for the control test.
- Item 2 states both halves of the isolation problem, so that building a
  check on the shape of a dispatch cannot be mistaken for finishing it.
- What cannot be done inside this repository is not listed as work here.
- Pull requests #9 and #12 sit under Done.
- No rule, skill, agent definition or check changes. `AGENTS.md` untouched.
- The budget check and the tests pass.

## What is out

- Building any of it. This change is the plan, not the work.
- Anything from the comparison run on the night of 14 September 2026. Those
  findings stay where the owner parked them and are not in this diff.
- Any change to `AGENTS.md`, either skill, or an agent definition.
