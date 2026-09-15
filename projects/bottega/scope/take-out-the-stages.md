# Take out the stages

## What it does

Removes the stages machinery from `tools/check-budgets.mjs`. It was built so
the build skill could be split into seven files and charged one of them; that
split was measured and closed without merging, so nothing uses the machinery
and nothing is going to.

The reason the split failed is not fixable. One guide window runs all seven
stages. Declaring them as separate would be a false claim to the check;
declaring them honestly made the heaviest number worse than not splitting,
because splitting adds files and every file costs.

## What done looks like

- `declaredStages`, `stageProblems`, `stageCandidates` and the two comment
  blocks explaining them are gone from `tools/check-budgets.mjs`.
- The check prints exactly the same output, byte for byte, as it did before the
  removal. Verified by diffing a run against the version on `main`.
- Six stage tests are gone. A seventh was rewritten rather than deleted: the
  guard it exercises — a backticked name that `tools/reads.json` classifies in
  neither list — is not part of stages and is still live. It was watched
  failing against a check with that guard deliberately broken, and passing
  against the restored one.
- `docs/REFUSALS.md` keeps its record of the three refusals that were watched,
  with a note at the head of the section saying the check no longer does this.
- `docs/OPEN.md` records that the machinery was built, went unused and came
  out, and why.
- `tools/reads.json` needed no change; no skill ever declared a stage.
- The budget check exits 0 and the tests pass.

## What is out

- Deleting the refusal records. They record what was watched happening, and a
  refusal record that vanishes when its check does leaves nobody able to tell a
  check that was removed from one that was never watched.
- Any change to the build skill. It was never split; the file is as it was.
- Reclaiming budget room. There is none to reclaim — `tools/check-budgets.mjs`
  is a tool, no session reads it, and it is charged nothing against either
  number. This change makes the repository smaller, not the sessions cheaper.
