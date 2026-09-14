# The builder becomes Michelangelo, the reviewer becomes Da Vinci

## What it does

Renames the two agents, everywhere, properly. The owner decided this on
14 September 2026 and confirmed the spelling. He was advised against it and
overruled the advice. It is his workshop and his call.

## What done looks like

- **The builder is Michelangelo. The reviewer is Da Vinci.** Standard
  spellings, both.
- **The agent definition file is renamed**, and the `name:` field inside it
  with it. *Why this one matters most: that field is what the machinery looks
  the agent up by. Miss it and nothing errors — the reviewer simply is not
  found, and every review afterwards fails silently.*
- **`tools/reads.json` follows the rename.** It names the agent file by path.
  A stale entry there stops the budget check, which is the good failure; a
  missed one makes required reading invisible, which is the bad one.
- **Every other mention is carried over**: the rules file, both skills, the
  reviewer's own method page, the register of open items, and the record of
  what was watched refusing. Roughly 135 in all.
- **The records are handled deliberately, not swept.** About forty mentions
  sit in `docs/REFUSALS.md` and `docs/OPEN.md`, which record what happened on
  a given day. Renaming those rewrites a log. **Decide which way, do it
  consistently, and say in the pull request which was chosen and why.**
- **The renamed agent was started and answered**, and its tool restrictions
  survived — `Edit`, `Write`, `NotebookEdit` and `Task` still absent. Watched,
  with the output written into `docs/REFUSALS.md`.
- Both startup numbers stay under 10,000, and the automatic checks pass.

## What is out

- Anything that is not the rename. No rule changed, no behaviour changed, no
  limit touched, nothing reworded because it happened to be nearby.
- Memory, path-scoped rules, the check before a commit, Zibaldone.
- The two research pull requests in flight, #9 and #10.

## The one thing to be careful of

A rename is the easiest change to do almost correctly. The failure is silent:
the machinery cannot find an agent that has been renamed in nine places and
not the tenth, and a review that never runs looks exactly like a review that
found nothing. **That is why the finished work has to be watched running, not
reasoned about.**
