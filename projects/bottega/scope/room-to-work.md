# Room to work

## What it does

Makes room under the settled 10,000-token limit, so the four scoping additions
taken from the Praxis research can be built. They need about 243 tokens and
there were about 101.

The room comes from one place: the part of `AGENTS.md` that explains how the
budget check counts. That is a description of a tool's arithmetic, not a rule
anybody follows. It moves to `docs/THE-CHECK.md` and nobody is sent to read it.

## What done looks like

- `AGENTS.md` keeps everything that binds a working session: that the check
  exists and runs on every push, to run it before committing, that a path in
  backticks must be declared in `tools/reads.json` and a name in neither list
  stops the check, that a backticked path is how you ask to be warned when a
  file disappears, that the prompt number is printed with no limit and why, and
  — above all — the rule that a file the instructions send a session to read is
  charged wherever it sits.
- `docs/THE-CHECK.md` holds what went: what the check charges, how the
  declarations file works, the symbolic link, the tests, and why the prompt
  number is a record rather than a measurement.
- `docs/THE-CHECK.md` opens by saying it is the dodge the anti-dodge rule warns
  about, that it is allowed only because nobody is sent there, and that the day
  a rule sends somebody there it is charged back to every session.
- `tools/reads.json` classifies it as mentioned, with that reasoning in its
  note, where Da Vinci sees it.
- `docs/OPEN.md` carries the same as a standing thing to watch.
- Two wrong counts are corrected. `docs/OPEN.md` said six stage tests were
  deleted and a seventh rewritten; it was five and a sixth, caught by the
  review of pull request 21 and merged wrong. And the rules file described the
  test suite as "one for each of the two faults it really had", which stopped
  being true at five tests; the replacement in `docs/THE-CHECK.md` says what
  each test is for.
- The check exits 0 and `node --test` passes 5 of 5.

## What is out

- Reclassifying `.gitignore` as mentioned rather than read. It would have
  bought about 200 tokens on the heaviest number. A build session registering a
  project really does open that file to add a line, so the bytes really are
  loaded, and calling it a mention would be buying room with a false
  declaration — the exact fault this change had to argue its way past once
  already.
- Trimming the build path. It is operational steps, and cutting those is how
  the quality this workshop is trying to produce goes away.
- Moving the limit. It is the owner's and it was ratified; nothing here touches
  it.
- Building the four additions. That is the next change, and it is what this
  one makes possible.
