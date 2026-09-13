# Zibaldone — what the workshop knows about it

Zibaldone is a second mind: the owner captures a thought of his own, and the
application helps him hold it and shows what it connects to in what he has
already written. Version one is capture, card, search, related.

**Its code is at https://github.com/dniachini-droid/zibaldone and nowhere
else.**

## What belongs in this folder

- `scope/` — one page per piece of work: what it does, what done looks like,
  what is out. Written at stage 2 of a build, and the page the reviewer checks
  the finished work against.
- Findings worth keeping — what a review caught, what turned out to be wrong
  about an assumption, what the owner said he actually wanted.
- Lessons — the things a later session would have to learn the hard way again
  if they were not written here.

## What never belongs in this folder

**The application's source code. Not a file of it, not a copy of it, not a
snapshot "for reference".**

*Why: the owner has two earlier repositories where a system and an application
grew up in the same place. One needed 85,000 lines taken out across two merges
to get them apart again. A copy kept here would be out of date within a day
and would still be read as if it were true.*

Nothing in this folder is ever copied into the project's repository either.
The workshop knows about the project; the project does not carry the workshop.

*Why: the whole point of a workbench is that the framework is improved once,
here, and every project already has the improvement. Copying files into a
project puts that project back on a version that ages the moment it lands.*
