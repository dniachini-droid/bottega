# Say it once

## What it does

Turns the owner's complaint into a rule. The existing rule about how to talk to
him covers jargon and nothing else. What he actually objects to is padding —
a thing said, then said again in different words, then explained, then followed
by a sentence telling him what he already knew.

The rule is widened rather than a second one added, so the count of rules does
not grow and neither does the file by more than the words themselves.

## What done looks like

- `AGENTS.md` carries one rule covering both: no technical term defined
  afterwards, and no restating, no explaining your own sentence, no telling him
  what he already knows.
- It carries its reason, and the reason is what he actually said, dated.
- It replaces the old rule rather than sitting beside it. The count of rules is
  unchanged.
- It is in `AGENTS.md` and not in a skill, so it binds build sessions as well as
  the guide window. *Why: build sessions report to him at every stage, and the
  padding he objected to came from both.*
- The heaviest startup number stays under 10,000. It stood at about 9,930 with
  70 tokens of room; the change costs 125 bytes. Report what it is afterwards.
- The budget check exits 0 and the tests pass.

## What is out

- A second rule. Widening the one that exists is the whole point.
- Any change to what the guide window or the build path does.
- Moving the 10,000 limit.
- Anything about how sessions talk to each other. This is about what he reads.
