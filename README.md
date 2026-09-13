# Bottega

A workshop for building applications with AI agents.

Bottega is not an application. The applications built with it live in their own
repositories — the first is
[Cabinet](https://github.com/dniachini-droid/cabinet).

## What is in here

- `AGENTS.md` — the rules every session follows. Each one carries the reason it
  exists, so a rule whose reason has gone can be deleted. Six budgets say when
  a change is not finished, whatever else it did.
- `/build` — the guided path from a sentence you say to a pull request you can
  merge, in seven stages, and you are told which stage you are at in every
  reply.
- `/virgil` — the window you look through to ask where things stand. It
  answers; it does not work.
- `tools/check-budgets.mjs` — checks two of the six budgets and fails loudly.
  It runs on every push and every pull request.
- `tools/read-guard.sh` — refuses a whole-file read of a document too large to
  afford.
- `docs/VISION.md` — what this is for, and how we will know it worked.
- `docs/OPEN.md` — the one register of open items. There is never a second one.

Four moments need you: answer the scope questions, approve the smallest
version, look at the result, press merge.

Claude never merges. That last one is yours.
