# Measure the prompt, and write down where the rule stops

## What it does

Prints how big the prompt is that starts a session, writes down the half of
an existing rule that was missing, records the research findings nobody is
acting on yet, and corrects the plan.

## Why

A building session is held to 10,000 tokens of instructions. The guide window
then hands it a prompt that reached **27,400 tokens** — nearly three times the
budget, written by hand, and measured by nothing. Six limits, and none of them
looks at the largest single thing a session receives.

## What done looks like

- **The counting prints a third number: the size of the prompt.** Beside the
  two it already prints. **No limit on it.** *Why no limit: a limit set before
  anyone has seen what a normal prompt looks like gets met by leaving out
  things the session needed, which moves the cost rather than removing it.
  Print it, watch it, argue about a number later with evidence.*
- **`AGENTS.md` carries the boundary of the rule it already has.** "Put the
  facts in the prompt, not directions to the facts" is half a rule: right for
  the scope of the job, wrong for reference material a session can fetch when
  it needs it. The missing half is why the prompt grew. Keep the rule, add
  where it stops, with the reason.
- **`docs/OPEN.md` records every research finding not being acted on**, each
  with what would trigger it:
  - rules that load only when a matching file is opened — and that the
    counting knows nothing about them, so one written without its path
    restriction would load into every session and be counted as zero;
  - never enable memory for Da Vinci: it restores the writing tools removed
    from it deliberately;
  - the four-step test for where a lesson belongs, and the two-pull-request
    price of admission for a note — both waiting on memory actually being
    needed;
  - six limits about how big things are, none about how often they change;
  - roughly 4,200 tokens spent describing skills that are never used — the
    owner's setting to change, not the workshop's.
- **`docs/PLAN.md` is corrected.** It still lists item 1 as in flight; item 1
  merged. Record what actually happened.
- The grammar slip the review of the rename recorded — "the Michelangelo's
  context" in `AGENTS.md` — is fixed, because this change already touches that
  file.
- Both startup numbers stay under 10,000, the tests pass, the checks pass.

## What is out

- **A limit on the prompt.** Deliberately. See above.
- Building memory, writing any path-scoped rule, teaching the counting about
  them, a seventh limit, Zibaldone.
- Anything else the research suggested. Recording is not acting.
