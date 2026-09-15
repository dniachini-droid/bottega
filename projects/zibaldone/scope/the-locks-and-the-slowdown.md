# The locks and the slowdown

## What it does

Fixes the three worst findings from the review of the notebook. The owner chose
to merge with all five unfixed, was told what they were, and asked for these
three fixed overnight before he begins putting real material in.

*Why these three and not all five: the fourth — converting a photo from the
iPhone format stops the program answering anything else while it runs — was
measured on a small photo and its real size is arithmetic rather than
observation, and the fifth resolved itself when the workshop's notes merged.*

## What done looks like

- **Changing the passphrase closes every notebook that is already open.** Today
  it does not: the reviewer opened it, changed the passphrase, restarted, and
  the old session still worked and could still write. The only remedy is
  deleting a file on the server from a terminal, which is written down nowhere
  and which he is never supposed to need. *Why this one first: it is the only
  finding that matters on the worst day — the day he needs to take the keys
  back. A lock you cannot change is not a lock, it is a door that happens to be
  shut.*
- **The fix is watched working**: open it, change the passphrase, restart, and
  the old session is refused. Written down with what was seen.
- **Opening it does not get slower as it fills up.** Today every page load reads
  every capture ever made, to count the photos not yet read — measured at 24
  milliseconds when empty and 1,381 at six thousand captures, growing in a
  straight line, on a disk faster than the real one. *Why it matters: he
  captures several times a day and intends to for years, and the request that
  pays this cost is the one his phone loads the instant after he taps Keep.*
- **The fix is measured, not assumed.** The same counts as before, at the same
  sizes, reported beside the old ones.
- **A photo too large to keep gets a page that says so.** Today the connection
  is dropped before the message can reach him, so he sees a failed page and no
  explanation on a capture he thought he had made. iPhone photographs in the
  raw format are routinely larger than the limit.
- **The test named for that refusal actually checks it.** Today its assertion
  sits inside a condition that was false in five runs out of five, so it would
  pass even if the refusal were deleted. *Why it is called out separately: a
  check never observed refusing anything cannot be told apart from one that
  cannot fire, and this repository holds that number at zero.*
- **Every one of the three is watched failing against the version merged today,
  and watched passing against the fix**, and what was seen is written in the
  project's own record. *Why: three of these were found by a reviewer running
  the program rather than reading it, and a fix nobody watched work is a claim.*
- All the tests pass, and nothing else about the notebook changes.

## What is out

- The fourth finding, the freeze while a photo is converted. Its true size has
  never been observed.
- Anything for piece two — no model reading captures, no wiki, no repository as
  storage.
- Any change to how it looks.
- Anything about getting it onto the internet. That is a separate job already
  built and under review.
