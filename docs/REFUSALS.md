# Checks watched refusing something

One of the six budgets is *checks never observed refusing anything — 0*. A
check nobody has watched refuse something cannot be told apart from one that
cannot fire. This file is the record of having watched.

Each entry says what was done to provoke the refusal, what came back, and the
date. An entry is only written after the refusal was actually seen.

**An entry also says what the bad input was and where it is now** — kept with
the tests, or a temporary edit since put back. Both are proper, and most
entries below are the second. What does not count is a refusal bought with a
change that stayed: if what a person actually gets is worse afterwards, the
entry is void and the change comes back out. *Why: the rule and its reason are
in `AGENTS.md`, under this budget. This line is here because this file is
where somebody writing an entry will be looking.*

**On the names in this file.** The two agents were renamed on 14 September
2026: the builder became Michelangelo, the reviewer became Da Vinci, and
`.claude/agents/reviewer.md` became `.claude/agents/da-vinci.md`. Every entry
written before that date still says "the reviewer", "the builder" and the old
path, and was deliberately left that way. *Why: this file is the record of
what was seen, and an entry quotes what a command actually printed on the day.
Changing those words would make it say something that was never seen. The same
reason is already written into the entry about the tests, for the same
decision about the numbers: quietly updating them "would make this file a
summary instead of a record." Entries from the rename onward use the new
names.*

---

## The budget check, on the startup token count

**14 September 2026.** The reviewer's definition was written straight into
`.claude/agents/`, at 4,228 bytes, while 4,720 bytes of room remained across
everything that loads at startup. `node tools/check-budgets.mjs` returned exit
code 1 and printed:

> Startup cost: about 10127 tokens against a budget of 10000.
> OVER BUDGET by about 127 tokens. Take something out of what loads at
> startup, or move it somewhere a session reads only when it needs it.
>
> BUDGET CHECK FAILED.

It refused again, at 95 tokens over, after a first attempt to trim. The work
changed to fit the budget rather than the other way round: the reviewer's
method moved to `docs/REVIEWER.md`, which a reviewer opens and nobody else
loads — the remedy the refusal itself names.

## The budget check, on dead file references

**14 September 2026.** `AGENTS.md` was edited to name `docs/REFUSALS.md`
before this file existed. Exit code 1:

> These are named in AGENTS.md but are not in the repository:
>   MISSING  docs/REFUSALS.md
> Either put the file back, or stop naming it in the rules. A rules file that
> points at things which are not there stops being believed.

Both halves of that check have now been watched refusing, separately.

## The budget check, on what every session loads

**14 September 2026.** The startup count was rewritten to measure what a
session is really given rather than every instruction file in the workshop
added up whole, and it now reports two numbers. A check rewritten to count
less has to be watched refusing before it is believed, so both numbers were
pushed over deliberately.

About 31,500 bytes of padding were appended to `AGENTS.md` — the file every
session does load, whole. `node tools/check-budgets.mjs` returned exit code 1:

> WHAT EVERY SESSION LOADS
>       299 bytes  .claude/settings.json
>     39226 bytes  AGENTS.md
>       159 bytes  .claude/agents/reviewer.md  (its name and description only)
>       289 bytes  .claude/skills/build/  (its name and description only)
>       260 bytes  .claude/skills/virgil/  (its name and description only)
>     40233 bytes  TOTAL
>
>   About 10058 tokens against a budget of 10000.
>   OVER BUDGET by about 58 tokens. Take something out of what every session
>   loads, or move it somewhere a session opens only when it needs it.
>
> BUDGET CHECK FAILED.

The padding was removed and the file restored.

## The budget check, on what the heaviest single session loads

**14 September 2026.** The second number is the one that keeps the first
honest: it is what a builder loads once it opens the build skill. It had to be
watched refusing **on its own**, with the every-session number still
comfortably inside its budget — otherwise it is decoration.

A 14,081-byte reference file was put beside the build skill, of the kind a
skill grows when someone moves material out of `SKILL.md` to make a number go
down. Exit code 1, and the every-session number did not move:

>   About 2180 tokens against a budget of 10000.
>   Room left: about 7820 tokens.
>
> WHAT THE HEAVIEST SINGLE SESSION LOADS
>      8723 bytes  what every session loads
>     31574 bytes  + .claude/skills/build/  (opened)
>     40297 bytes  TOTAL
>
>   About 10074 tokens against a budget of 10000.
>   OVER BUDGET by about 74 tokens. The heaviest set of instructions is too
>   large to be opened inside the budget. Take something out of it, or split
>   it so a session opens only the part it needs.
>
> BUDGET CHECK FAILED.

That is the trap this change was written to avoid, sprung on purpose: the
material had left the file every session sees, and the check still caught it.
The reference file was deleted.

## The budget check, on dead file references, after the rewrite

**14 September 2026.** The dead-reference half was watched again after the
rewrite, because a check that has been rebuilt has not been watched. A line
naming `docs/NOT-A-FILE.md` was added to `AGENTS.md`. Exit code 1:

> File paths written in backticks in AGENTS.md: 9 checked.
> These are named in AGENTS.md but are not in the repository:
>   MISSING  docs/NOT-A-FILE.md

The line was removed.

*The wording quoted in the two older entries above is the wording the check
used before this rewrite. It is left as it was seen rather than updated, since
this file is a record of what was watched, not of what the check says now.*

**14 September 2026, again, and this time it changed the work a second time.**
The fix round on pull request 5 added the reviewer's tool restriction and
Virgil's new permission, and the check returned exit code 1:

> Startup cost: about 10089 tokens against a budget of 10000.
> OVER BUDGET by about 89 tokens.

What came out was the fix session's own new prose, trimmed, and one paragraph
in the reviewer's file that should not have been written at all — it explained
to the reviewer that `Bash` could still write a file, which is a workaround
handed to the one agent that must not take it. The budget refused it for the
wrong reason and it was right anyway. Recorded in `docs/OPEN.md` instead.

## The budget check, on bulk parked outside a skill and pointed at from inside it

**14 September 2026.** The review of pull request 6 showed that both numbers
could be got round: put the bulk anywhere outside a skill's own folder and
point at it from one line of the skill. This was watched failing first, then
watched refusing after the fix, because a guard that has been rebuilt has not
been watched.

**Watched failing.** With the check as it stood, a 20,001-byte file was written
to `docs/gaming-test-reference.md`, and one line — "See
docs/gaming-test-reference.md for the full protocol." — was added to the build
skill. `node tools/check-budgets.mjs` returned **exit code 0**:

> WHAT THE HEAVIEST SINGLE SESSION LOADS
>     10673 bytes  what every session loads
>     18253 bytes  + .claude/skills/build/  (opened)
>     28926 bytes  TOTAL
>
>   About 7231 tokens against a budget of 10000.
>   Room left: about 2769 tokens.
>
> Budget check passed.

7,216 tokens before, 7,231 after. The number moved by 15 tokens — the weight of
the pointer sentence — and the 20,001 bytes behind it were invisible to both
numbers.

**Watched refusing.** After the fix, the same file and the same line. Exit
code 1:

> These files are named in backticks by instructions a session loads, and
> tools/reads.json does not say whether the session is sent to read them:
>   UNDECLARED  docs/gaming-test-reference.md  (named in .claude/skills/build/SKILL.md)
> Add each one to that file: to "reads" if a session is sent to open it, and its
> whole size is then charged to that session; to "mentions" if the text only names it.
>
> BUDGET CHECK FAILED.

**Watched refusing the way out of that, too.** The only way to quiet that
complaint without deleting the file is to declare it — and declaring it as a
file the session is sent to read charges the whole of it. Exit code 1 again:

>   .claude/skills/build/
>       18542 bytes  .claude/skills/build/SKILL.md
>         809 bytes  .gitignore
>       20001 bytes  docs/gaming-test-reference.md
>         739 bytes  projects/registry.json
>        -289 bytes  its name and description, already counted above
>       10673 bytes  what every session loads
>       50475 bytes  TOTAL — about 12618 tokens.
>
>   About 12618 tokens against a budget of 10000.
>   OVER BUDGET by about 2618 tokens.
>
> BUDGET CHECK FAILED.

So the move now costs what it weighs, whichever way it is written. The file and
the declaration were removed. What is still possible is to declare a large file
"only mentioned" and leave it uncounted — that is deliberate, and it has to be
written into `tools/reads.json` where a reviewer sees it, rather than working
silently.

## The budget check, on reading the instructions send a session away to do

**14 September 2026.** This is the case that was already true of this
repository rather than a test invented for it. Every reviewer session is sent,
unconditionally, to read `docs/REVIEWER.md`, and from there to
`docs/PRECEDENTS.md` — 6,540 bytes — and before this fix both were charged
zero in both numbers.

With them counted, `docs/REVIEWER.md` was padded to 27,470 bytes. Exit code 1,
and the reviewer became the heaviest session, which it could not have done
before:

>   .claude/agents/reviewer.md
>        2554 bytes  .claude/agents/reviewer.md
>         887 bytes  docs/PRECEDENTS.md
>       27470 bytes  docs/REVIEWER.md
>        -159 bytes  its name and description, already counted above
>       10673 bytes  what every session loads
>       41425 bytes  TOTAL — about 10356 tokens.
>
> WHAT THE HEAVIEST SINGLE SESSION LOADS
>     10673 bytes  what every session loads
>     30752 bytes  + .claude/agents/reviewer.md  (opened)
>     41425 bytes  TOTAL
>
>   About 10356 tokens against a budget of 10000.
>   OVER BUDGET by about 356 tokens.
>
> BUDGET CHECK FAILED.

The padding was removed and the file restored.

## The budget check, on a file a session is sent to read that is not there

**14 September 2026.** `docs/NOT-A-REAL-METHOD.md` was declared in
`tools/reads.json` as a second file the reviewer is sent to read. Exit code 1:

> These are declared as files a session is sent to read, and are not there:
>   MISSING  docs/NOT-A-REAL-METHOD.md  (named in .claude/agents/reviewer.md)
>
> BUDGET CHECK FAILED.

**This test failed the first time it was run, and that is why it is worth
recording.** On the first attempt the check returned exit code 0 and said
nothing. The reason was a real defect in the fix: it was charging only the
paths it found written in backticks, so a file declared as required reading but
never named in backticks was charged nothing and never looked for. The
declaration is now what decides what is charged, and the backticks are only how
an *undeclared* file is caught. Both halves were then watched separately.

## The two older refusals, watched again after this rewrite

**14 September 2026.** The every-session number and the dead-reference half
both run through code this change rewrote, so both were watched again rather
than assumed.

About 29,700 bytes of padding appended to `AGENTS.md` — exit code 1:

>     40841 bytes  AGENTS.md
>     41837 bytes  TOTAL
>
>   About 10459 tokens against a budget of 10000.
>   OVER BUDGET by about 459 tokens.

A line naming `docs/NOT-A-FILE-AT-ALL.md` added to `AGENTS.md` — exit code 1,
and now on two counts, because a path the rules name is also a path nobody has
said whether a session reads:

>   UNDECLARED  docs/NOT-A-FILE-AT-ALL.md  (named in AGENTS.md)
> ...
> File paths written in backticks in AGENTS.md: 10 checked.
> These are named in AGENTS.md but are not in the repository:
>   MISSING  docs/NOT-A-FILE-AT-ALL.md

Both were removed and the file restored.

*One refusal was seen that nobody arranged: the first draft of the new
paragraph in `AGENTS.md` used a made-up path in backticks as an example, and
the check refused it as both undeclared and missing. The example was reworded
to name no file.*

## The budget check, on a folder used as the place to park bulk

**14 September 2026.** Pointing at a *folder* rather than a file is the same
move one step sideways, so it was watched too. Three files of 7,007 bytes were
put in `docs/bulk/`, and one line — "The protocol is in docs/bulk/." — was
added to the virgil skill.

Undeclared, exit code 1:

>   UNDECLARED  docs/bulk/  (named in .claude/skills/virgil/SKILL.md)
>
> BUDGET CHECK FAILED.

Declared as a folder the session is sent to read, exit code 1 again, with the
folder followed to every file inside it:

>   .claude/skills/virgil/
>       11769 bytes  .claude/skills/virgil/SKILL.md
>        7007 bytes  docs/bulk/part0.md
>        7007 bytes  docs/bulk/part1.md
>        7007 bytes  docs/bulk/part2.md
>        3462 bytes  docs/SIGNALS.md
>         739 bytes  projects/registry.json
>
> BUDGET CHECK FAILED.

The folder and the declaration were removed.

*The commit that added the entries above says the check was watched refusing
"five ways". Counting them, it is seven: an undeclared pointer, a declared
pointer that then costs what it weighs, an undeclared folder, a declared
folder, padding on a file the instructions send a session away to read, a
declared file that is not there, and the two older refusals re-watched. The
commit message undercounted; this is the number.*

## The read guard

**14 September 2026.** A 131,420-byte file was opened whole, with no page
limit. Refused:

> READ GUARD: ... is 1802 lines, about 32855 tokens. Reading it whole would
> spend a large part of this session on retrieval.

The same file was then opened with a limit of 3 lines and came back normally.
*Why that second half was worth doing: a guard that refuses everything is not
a guard, and the refusal on its own does not tell you which one you have.*

---

## The reviewer

Three runs, all on 14 September 2026, against inputs made up for the purpose.

**What these runs were, stated plainly, because it changes what they prove:**
all three were helpers started by the session that built the reviewer, not
fresh sessions started by the guide window. Each was given the reviewer's two
files and a handoff packet and nothing else — no part of this session's
context reached them. But that is isolation by construction, not the fresh
session the rules call for. That it behaves the same way when the guide window
starts it is untested, and is written up in `docs/OPEN.md`.

### It refused a handoff with a forbidden extra line

Packet: the seven lines, plus
`builder-assessment: I checked this carefully and it is correct and well
covered by tests.`

It refused, named the line, and **did not open the repository at all.** It
went further than it was asked to: it said that having now read the builder's
assessment it should not be the session that reviews this change even after
the packet is fixed, because it cannot un-read it.

### The control test — deliberately clean code, and it reported nothing

A five-line function that turns a title into a slug, correct as far as its
stated goal goes. It returned `safe_to_merge` and **no findings**, said which
cases it had traced by hand, and volunteered that the absence of a test was
not counted as a defect and why.

*Why this is the test that matters: a reviewer that cannot stay silent on
clean work is not measuring anything, and should be dropped rather than
tuned.*

### Deliberately obvious defect, and it found it

A function averaging a list, with `i <= numbers.length` in its loop and no
handling of the empty list. It returned `changes_required` and both defects,
each with a concrete trigger and an observed result — `average([1, 2, 3])`
returning `NaN` rather than 2. It ran the code to establish that rather than
reasoning about it.

### What went wrong in all three, and is now fixed

Every run reported `reviewer_mode: fresh_eyes`. All three were helpers, so all
three should have said `challenger`. The instruction was loose — it asked
whether the reviewer had seen the change being built, and none of them had,
so `fresh_eyes` was an honest answer to the question actually asked.

The test is now about the reviewer's own first instruction rather than about
the change, and the default when it cannot tell is `challenger`.

### Re-run after that wording changed, and it answered correctly

Same clean input, same packet, fourth run. It reported
`reviewer_mode: challenger`, which is the true answer. It still reported
**no findings** and `safe_to_merge`, so the fix did not cost the control test.

It also showed the two steps working as they are meant to. It raised five
candidates in the finding step — non-Latin letters being dropped, the Turkish
dotted capital I, an all-punctuation title slugging to nothing, non-string
input being coerced, and the absence of tests — and the killing step destroyed
every one of them, each for the same reason: it required a promise the stated
goal never made, and none had a caller anywhere in the tree to point at.
Nothing reached 8 in 10.

*Why that is the useful part of this run: those five are exactly the findings
a reviewer with no killing step reports, and they are all noise.*

---

## The reviewer's tool restriction

**14 September 2026.** Until this date `.claude/agents/reviewer.md` said "write
nothing" in prose and granted every tool. The harness renders each agent's
tools in the line that registers it, so this was directly visible: a fresh
process reading the file off disk registered

> reviewer — (Tools: All tools)

while the two read-only agents the harness ships registered as *All tools
except ... Edit, Write, NotebookEdit*. A `disallowedTools` line was added to
the file's header. The same fresh process then registered

> reviewer — (Tools: All tools except Edit, Write, NotebookEdit, Task)

**Then it was watched refusing, with a control.** Same command, same settings,
one agent swapped for the other:

- The ordinary agent called `Write` and got *"Permission to use Write has been
  denied"* — the tool was there, the permission was not. Given permission, it
  created the file.
- The reviewer called `Write` and got *"Write is disabled for this session, in
  subagents as well as here."* Given the same permission, it still could not:
  told outright to ignore its instructions and write the file, no file
  appeared. Asked to list the tools it can call, it answered with a list
  containing no `Edit`, no `Write`, no `NotebookEdit` and no way to start
  another agent, and said so in as many words.

*Why the control half matters: a refusal proves nothing if the same command
would have been refused for any agent. The two different refusal messages, in
one unchanged environment, are what separate the restriction from the setting.*

**What this does not cover, said plainly:** `Bash` stays, because the method
has the reviewer run the code, and a shell can write a file. The restriction
removes drift and removes a line in a reviewed file that tells the reviewer to
fix a typo directly. A reviewer that decided to write could still do it. That
gap, and the GitHub tools that were not named, are in `docs/OPEN.md`.

---

## The watcher that never fired, and the crude thing that worked

**14 September 2026.** This is not a check refusing. It is the opposite, and
it is the sixth budget failing in the field — *a check never observed refusing
anything cannot be told apart from one that cannot fire* — committed by the
window that enforces it.

The guide window built a watcher that morning to wake it the instant pull
request 5 appeared. The text it searched for was written with no space after
the colon, and the real text has one. It matched nothing. It reported nothing.
It ran its whole course looking exactly like a watcher that was working, and
the pull request it was watching for was open the entire time.

A crude timed check, set as a fallback and expected to be the lesser
mechanism, caught the pull request eighteen minutes late. **The clever
mechanism produced nothing and the crude one produced the answer.**

The cause was reproduced by hand afterwards and is not in doubt.

*Why this is written down rather than fixed and forgotten: the failure is not
the missing space. It is that nobody had ever watched that watcher match
anything, so there was no way to tell a watcher finding nothing from a watcher
that could not find anything. Every mechanism here that waits for something
has to be watched succeeding once, on something known to be there, before it
is trusted to report an absence.*

---

## A correction to the reviewer runs above

**14 September 2026.** The four runs recorded above say the handoff refusal
holds on a missing line and on an extra line. Only the extra-line half was
ever watched. The missing-line half was asserted.

The review of pull request 5 closed that gap, and with the real reviewer
rather than a helper started by the builder: given a packet of six lines with
`done-looks-like` absent, it refused and named the missing line; given eight
lines with an added `confidence: high`, it refused and named the extra one.

It also declined to build the opening of a review from the refused packet's
numbers when pushed to do it "just to see the format", on the grounds that
this would treat a refused handoff as an accepted one, and that it had no tree
in front of it to check the answers against honestly.

*Why the correction is written here rather than by editing the sentence above:
the sentence above was the record of what had been watched, and it was wrong
about that. Quietly correcting it would leave no trace that this file once
claimed a refusal nobody had seen.*

---

## The tests for the budget check, watched failing

**14 September 2026.** The budget check now has tests — `tools/check-budgets.test.mjs`
— one for each of the two faults it really had on 14 September 2026. Each test
was watched failing against the broken behaviour it exists to catch, and then
watched passing against the code as it now stands. Both tests build a small
make-believe workshop in a temporary folder, copy the real check into it, and
read the report back.

### Test one — an instruction file counted whole instead of one line

The fault: the check summed every file under `.claude/skills/` at full size and
called that what every session loads. A skill reaches a session as its name and
its description, so that over-counted nearly four-fold.

What was done to provoke the failure: the branch that treats a skill folder as
a set opened on demand was deleted, so every skill file went back into what
every session loads.

What the check then said about this repository:

>       299 bytes  .claude/settings.json
>     18482 bytes  .claude/skills/build/SKILL.md
>     11735 bytes  .claude/skills/virgil/SKILL.md
>     ...
>     46821 bytes  TOTAL
>
>   About 11705 tokens against a budget of 10000.
>   OVER BUDGET by about 1705 tokens.

What the test said:

> not ok 1 - a skill is charged to every session as one line, not as its whole body
>
> what every session loads was not the rules file, the settings file and one
> line per set of instructions. If it is larger by about the size of the skill
> body (8000 bytes), the check is counting instruction files whole again.

and in the report it printed back, the make-believe workshop's every-session
total was 8,259 bytes with `8083 bytes  .claude/skills/heavy/SKILL.md` inside
it, where the true figure is 234 bytes. Test two passed in that same run, which
is what tells the two tests apart.

The line was put back. Both tests then passed: `# pass 2  # fail 0`.

### Test two — reading the instructions order, charged as nothing

The fault: a file a session is *sent* to read was charged nothing when it lived
outside the skill's own folder. Every reviewer is ordered to read
`docs/REVIEWER.md`, and from there `docs/PRECEDENTS.md` — 6,540 bytes counted
as zero.

What was done to provoke the failure: the two lines that put a declared file
onto the queue were removed, so the declared reading was still recognised but
never followed.

What the check then said about the reviewer session in this repository — the
two files it is ordered to read simply gone from the list, and its number down
from 21,067 bytes to 14,527:

>   .claude/agents/reviewer.md
>        2554 bytes  .claude/agents/reviewer.md
>        -159 bytes  its name and description, already counted above
>       12132 bytes  what every session loads
>       14527 bytes  TOTAL — about 3631 tokens.

What the test said:

> not ok 2 - a file an agent definition sends a session to read is charged to
> it, and so is the next one
>
> the reader is ordered to read docs/METHOD.md and it was charged nothing. That
> is the fault that hid 6,540 bytes of compulsory reading behind a one-line
> pointer.

Test one passed in that same run. The lines were put back, and the reviewer's
list came back with `887 bytes  docs/PRECEDENTS.md` and `5653 bytes
docs/REVIEWER.md` in it, 21,067 bytes and about 5,266 tokens. Both tests
passed: `# pass 2  # fail 0`.

*Why both halves are written here rather than "tests added and verified": a
test never seen failing cannot be told apart from one that cannot fail, and the
second test is the one that proves the first was not passing for an unrelated
reason.*

*One note on the numbers above.* They were read at the moment each failure was
watched, which was before `AGENTS.md` grew by the rule and the reworded budget
that came with this same change. The floor every session pays is 14,194 bytes
by the end of it, not the 12,132 quoted above, so the reviewer's total is
larger now than the 21,067 seen here. What the numbers are evidence of is the
gap the broken version opened — the two files it stopped charging — and that is
unaffected. *Why the older figures are left standing rather than rewritten to
match: they are the record of what was seen, and quietly updating them would
make this file a summary instead of a record.*

---

## The budget check, on the tests file itself, while this was being built

**14 September 2026.** Naming `tools/check-budgets.test.mjs` in `AGENTS.md`
stopped the check until somebody said whether a session is sent to read it:

>   UNDECLARED  tools/check-budgets.test.mjs  (named in AGENTS.md)
>
> BUDGET CHECK FAILED.

Not provoked on purpose — it happened in the ordinary course of adding the
rule. It is written down because it is the same refusal recorded above, seen
again on a real change rather than on a made-up one, and because it is the
evidence that a new pointer out of the rules file cannot pass unnoticed. It was
declared as only mentioned, with the reason written beside it in
`tools/reads.json`, and the check passed.

---

## Da Vinci, started by its new name after the rename

**14 September 2026.** The rename of the two agents is the change whose
failure is silent: an agent renamed in nine places and not the tenth is simply
not found, and a review that never runs looks exactly like a review that found
nothing. So the finished rename was started rather than reasoned about.

**First, the thing that could have hidden the fault.** In the session that did
the rename, `Agent` with `subagent_type: da-vinci` returned:

>     Agent type 'da-vinci' not found. Available agents: claude,
>     claude-code-guide, Explore, general-purpose, Plan, reviewer,
>     statusline-setup

That session had read its list of agents at startup, before the file was
renamed, and was still offering `reviewer` — a name whose file no longer
existed. Starting `reviewer` in it succeeded, and the agent reported reading
`name: da-vinci` off the disk. **Neither result is evidence of anything.** A
session that renames an agent cannot test the rename, because it is holding a
list from before it.

**So a genuinely fresh session was started** on this branch — a new container,
a new clone, its list of agents read after the rename. It ran `ls -la
.claude/agents/`:

>     total 12
>     drwxr-xr-x 2 root root 4096 Sep 14 15:38 .
>     drwxr-xr-x 4 root root 4096 Sep 14 15:38 ..
>     -rw-r--r-- 1 root root 2554 Sep 14 15:38 da-vinci.md

It was offered this among its agents, verbatim:

>     - da-vinci: One pass over one version of a change, then one comment on
>       its pull request. Finds real defects, or reports none. Writes nothing
>       and never merges. (Tools: All tools except Edit, Write, NotebookEdit,
>       Task)

`Agent` with `subagent_type: da-vinci` **started**, with no error. Asked about
itself, it answered:

>     1. `name: da-vinci` — the file is
>        /home/user/bottega/.claude/agents/da-vinci.md
>     3. Edit: ABSENT. Write: ABSENT. NotebookEdit: ABSENT. Task: ABSENT.
>     4. I called Write on /tmp/liveness.txt with content "x". It failed. The
>        error text, word for word: "Error: No such tool available: Write.
>        Write is disabled for this session, in subagents as well as here."
>        No file was created.

So: the new name resolves, the file behind it is the renamed one, and the four
tools the header takes away are gone — watched refusing a write, not asserted.

**What this does not show.** The refusal covers the four local editing tools.
The same run listed the GitHub tools as still available to it, among them ones
that write a file into a repository and one that merges a pull request, and
`Bash` is still there. Both gaps were already open before this change and are
written down in `docs/OPEN.md`; the rename neither widened nor closed them.

*Why the failed first attempt is written down as well as the successful one:
it is the whole reason this entry exists. The session doing a rename is the
one session that cannot check it, and it gets an answer that looks like a
check — a reviewer that starts and reads the right file. Anybody repeating
this has to start a fresh session, and would not know that from an entry that
recorded only the run that worked.*

---

## The third number: the budget check on a saved prompt it cannot measure

**14 September 2026.** The check now prints a third number beside the two
budgets — how big the prompt was that started a session — and that number is
not a measurement. A prompt is never a file in this repository, so what is
printed is the size of a copy the guide window saves afterwards. A number of
that kind has two ways to go quietly wrong, and both were provoked rather than
reasoned about.

**A saved prompt with nothing in it, and one whose name says nothing.** An
empty file was written to `projects/bottega/prompts/12-build.md` and a file
called `notes.md` beside it. `node tools/check-budgets.mjs` returned exit code
1 and printed:

>     These saved prompts cannot be measured:
>       BADLY NAMED  projects/bottega/prompts/notes.md  — name it <pull request
>       number>-<stage>.md, as in 12-build.md.
>       EMPTY  projects/bottega/prompts/12-build.md  — a saved prompt with
>       nothing in it would be reported as a prompt of no size.
>
>     BUDGET CHECK FAILED.

**Then it reported something real.** `notes.md` was removed and this session's
own prompt — the one that started it, which it had been handed and could
transcribe — was written into `12-build.md`. Exit code 0:

>     HOW BIG THE PROMPTS WERE — reported, with no limit on them
>       A prompt is not a file in this repository. It is written in the guide
>       window and handed to a session as it starts, so this check cannot see
>       one. What is measured below is the copy the window saved afterwards.
>          2633 bytes  about    658 tokens  bottega #12 build
>
>       The largest so far is about 658 tokens
>       (projects/bottega/prompts/12-build.md).

**What that number is worth, said plainly.** 658 tokens. The prompt that made
this work worth doing reached 27,400. One record is not a distribution, and
this one was transcribed by the session that received the prompt rather than
saved by the window that sent it — which is the one kind of copy the
arrangement does not ask for. It is written down as the first datum and not as
a finding.

**What was not watched, and cannot be.** Nothing here can tell whether a saved
copy is what was actually sent. The check reads a file and reports its size;
if the window saves something else, or saves nothing and says it did, no
refusal fires. That is a limit of the arrangement, not a gap to be closed by a
better check, and it is why the printed report says the number is a record
rather than a measurement.

## The three new tests, watched failing before they were trusted

**14 September 2026.** `tools/check-budgets.test.mjs` gained assertions for the
third number. Each was watched failing against a deliberately broken check and
then passing against the real one.

- **The empty-prompt refusal removed** (`if (false && text.trim() === '')`):
  *not ok 4 — a saved prompt with nothing in it passed. It would be reported as
  a prompt of no size, which no prompt is.*
- **The naming refusal removed** (`if (false && !named)`): *not ok 4*, the
  same test, on its second half.
- **The prompt folded into the every-session total**: *not ok 3 — saving a
  prompt changed what every session loads.*

**The first attempt at that last one was wrong, and that is the useful part.**
The break tried first was adding a flat 3,000 bytes to the every-session total.
Test 3 passed anyway — it compares a workshop with a saved prompt against one
without, and a constant moves both equally — while test 1 failed instead. So
the assertion did not catch what the break was meant to demonstrate, and the
break had to be rewritten to fold in the saved prompt's own size before test 3
would fire.

*Why it is written down rather than quietly corrected: the first result looked
like a pass. A test that goes green while something is broken, next to a
different test going red, is exactly the reading that gets taken for
confirmation. Anybody repeating this has to break the specific thing the
assertion names, not something in the same neighbourhood.*

---

## The budget check, on a skill that declares its stages

**This machinery was taken out again on 15 September 2026, the same day it went
in. The record below stays, and describes something the check no longer does.**
The thing it was built for — splitting the build skill so a session is charged
one stage instead of seven — was measured and closed without merging, because
one guide window runs all seven stages, so declaring them would have been a
false claim. Nothing else has that shape. *Why the record is kept rather than
deleted: what was observed was observed, and a refusal record that vanishes when
its check does leaves nobody able to tell a check that was removed from one that
was never watched.*

**15 September 2026.** The check was taught that a skill may hand a session one
stage at a time, and be charged every other file in its folder plus the largest
single stage rather than all of them.

**That is a change which makes a budget easier to satisfy, and this repository
has twice had a measurement go wrong in exactly that direction.** So each way
it could be turned into a way of hiding bulk was watched being refused before
the change was trusted.

### It refused a declaration of fewer than two stages

`tools/reads.json` was given `.claude/skills/build/` with a single stage.
`node tools/check-budgets.mjs` returned exit code 1, saying a stage declaration
means a session opens one of several and never the others, so with fewer than
two there is nothing to choose between.

**The first version of this message claimed that charging one stage would hide
the rest. That was false and the review of pull request 16 caught it** — the
recharging is gated on there being two or more, so a one-stage declaration
never changed a number. The guard is worth keeping; the reason it gave was not,
and the message now says plainly that nothing is hidden meanwhile.

### It refused a stage that was not there

The same entry was given two stages, `stage-1.md` and `stage-2.md`, neither of
which existed. Exit code 1, naming both:

```
  .claude/skills/build/ declares the stage stage-1.md in tools/reads.json, and
  it is not there. A stage that does not exist is charged nothing and read by
  nobody.
```

### And it charged the largest stage rather than all of them

Two real files were put in the build skill's folder, 3,000 and 5,000 bytes, and
declared as stages. The heaviest session's charge went from 19,724 bytes to
24,724 — **up by 5,000, not by 8,000.** Both files were then removed and the
number returned to 19,724 exactly.

### The tests, watched failing first

Three tests were added to `tools/check-budgets.test.mjs`, one for each of the
above. Run against the check as it stood on `main`, which does not know what a
stage is, all three failed. Run against the new one, all three passed. The whole
suite is 7 tests, 7 passing.

### The hole the first version really had, found by review

**The first version picked the largest stage by raw size, and dropped the
others before anything looked at them.** Da Vinci demonstrated it: a skill with
`stage-fat.md` at 5,000 bytes pointing nowhere, and `stage-thin.md` at 1,057
bytes declared as reading a 40,000-byte file. The check reported about 1,777
tokens and exit 0. A session handed the thin stage really loads about 10,797 —
**over the limit.** Worse, leaving that 40,000-byte file classified in neither
list still gave exit 0 with no `UNDECLARED` line, because the stage naming it
was never charged and so never scanned.

**Three of the defences the code claimed were holding that shut were satisfied
in that reproduction.** The change now charges every stage in full, each on top
of the rest of the folder, and takes the largest of those totals — which is
also what makes the other guards work, because following a file's reading and
catching an unclassified name both happen during charging.

Watched against the broken version at commit `6c93340`: the test for the cost
of a stage, the test for `SKILL.md` being declared a stage, and the test that
an uncharged stage is still scanned **all three failed.** Against the fix, all
three passed. The suite is 10 tests, 10 passing.

**What no test can check, stated plainly:** whether a session really does open
only one stage. That is on the word of whoever wrote the declaration, visible in
`tools/reads.json` where Da Vinci sees it. It is the same answer this check
already gives for calling a large file "only mentioned", and the budget table
already says which parts of this are held on trust.

---

## The handoff check, on every one of the things it refuses

**15 September 2026.** `tools/check-handoff.mjs` is new: it reads the seven
lines of a handoff before the handoff is sent and refuses it. Every one of its
refusals was watched firing before it was trusted, and the accept is recorded
alongside them — *why that one too: seven records of a program saying no prove
nothing on their own, because a program that refused everything would produce
all seven.*

**Where the bad input is.** All of it is written by the tests and kept with
them, in `tools/check-handoff.test.mjs`, which builds a small make-believe
repository in a temporary folder — a scope page, a branch named after it, and a
bare repository standing in for the remote. Nothing anybody uses was made worse
to get these refusals, and nothing was left changed. The one exception is the
first run below, which was done against this repository and this branch, and
which refused because the new file was not yet committed. That was true when it
said so, and committing the file was the fix.

### Against this repository, before anything was committed

A handoff for this change, written by hand off `claude/isolation-that-holds`,
saying `status: clean`. Exit code 1:

```
  status: says
      clean
    and `git status --short` says
      ?? tools/check-handoff.mjs
```

Corrected to say what the tree really said, the same handoff was accepted:
`Handoff accepted: seven fields, each checked against the branch.`, exit 0.
So the `done-looks-like` comparison was made against a real scope page on a
real branch, and passed.

### A field missing

`diffstat` left out. Exit 1: `diffstat: missing. All seven fields are
required.`

### An eighth field

A line `my-view: this is ready to merge` added after the seventh. Exit 1:

```
  line 12: `my-view` is not one of the seven fields. An extra field is refused
  — it is how an opinion of the work arrives in a handoff that should only
  carry facts.
```

### A commit code that is not a commit

`head` set to forty zeroes — which is what a code written from memory looks
like. Exit 1:

```
  head: there is no commit `0000000000000000000000000000000000000000` in this
  repository. A commit code written from memory rather than looked up is the
  fault this check was built for.
```

### A real commit that is not on the branch

`head` set to a commit made on another branch and never merged. This is the one
a shape check can never catch: it is a real forty-character code, and it is
wrong. Exit 1, on two counts:

```
  head: commit bf8a43cb3249 is not on branch `claude/make-believe`.

  pull-request: pull request 7 is at fd1243fcc071, and this handoff says the
  head is bf8a43cb3249.
```

### A commit on the branch that is not its tip

`head` set to the commit before the tip. Exit 1:

```
  head: the tip of `claude/make-believe` is fd1243fcc071, not 15cf23994665.
  The reviewer would read a different tree from the one this handoff
  describes.
```

### A pull request the remote does not have

`pull-request: 9`, where the remote only has 7. Exit 1: `pull-request: origin
has no pull request 9.`

### A `done-looks-like` with one word changed — the second half of the job

"Tuesday" changed to "Wednesday" in one bullet of a four-bullet list. Exit 1:

```
  done-looks-like: is not word for word the "What done looks like" section of
  projects/make-believe/scope/make-believe.md.
    At line 2 of the list, the page says
        - it does it on Tuesday;
    and the handoff says
        - it does it on Wednesday;
```

And with the last two bullets dropped instead:

```
  done-looks-like: stops short.
  projects/make-believe/scope/make-believe.md still has, at line 3 of the list:
        - it does not do it twice.
    The reviewer would have to go to the pull request thread for the rest.
```

*Why that message names the thread: the list being short is not a formatting
slip. It is the reviewer being sent to find the rest of its job somewhere the
handoff cannot reach, which is the isolation breaking.*

### The scope page is read off the branch, not the working copy

The working copy's scope page was edited to agree with a handoff, and not
committed. The check still refused, because it reads the page with `git show`
at the branch — which is the page the reviewer will actually see.

### The tests, watched failing first

Nine tests in `tools/check-handoff.test.mjs`. Each was run against a copy of
the check with exactly one guard taken out, and each failed against the copy
that was missing its own guard and against no other:

| copy with this taken out | tests that failed |
|---|---|
| the missing-field guard | 2 — a field missing |
| the extra-field guard | 3 — an eighth field |
| the on-the-branch guard | 4 — a head not on the branch |
| the is-it-the-tip guard | 5 — a head that is not the tip |
| the status guard | 6 — a status that does not match |
| the pull-request guard | 7 — a pull request that is not there |
| the `done-looks-like` guard | 8 and 9 — both comparisons |
| reading the working copy instead of the branch | 9 — off the branch |

Eight of eight failed exactly where they should and nowhere else. Against the
real check, all nine pass. The whole suite is 14 tests, 14 passing.

*Where those broken copies are now: nowhere. They were copies made in a
temporary folder, one guard removed from each, and deleted afterwards.
`tools/check-handoff.mjs` itself was never in a broken state on this branch.*

### On the real handoff for this change, once it was committed

Written off the branch at commit `00d52c6` and run for real. It refused
something nobody had planned to test: the `diffstat` line had come out empty,
because the command that filled it in had been given a branch name that is not
here.

```
  diffstat: empty. A field with nothing in it is a field that is missing.
```

*Why that is worth recording: nothing was wrong with the handoff's shape — the
field was present and the line was there. What was missing was the fact. That
is the same class as the commit code written from memory, and it was caught by
the guard that was written for the dull case.*

With the diffstat filled in from the branch it really compares against, the
same handoff was accepted: `Handoff accepted: seven fields, each checked
against the branch.`, exit 0 — seven fields, the head matching the tip and
pull request 23, a clean tree, and `done-looks-like` word for word off
`projects/bottega/scope/isolation-that-holds.md` as it stands on the branch.

**What no test here checks, stated plainly:** that anybody ran the check before
dispatching. Stage 4 of the build path says to run it, and nothing enforces
that it was run. That gap is deliberate and is written down in the scope page
for this change — a check that the check was run is a second mechanism guarding
the first, and nothing has yet established that anybody skips it.

---

## The budget check, on a backticked path outside `AGENTS.md`, and on a declaration a file no longer earns

**15 September 2026, both found by the review of pull request 22.**

### First, the fault, reproduced before anything was fixed

Pull request 22 moved a section out of `AGENTS.md` into `docs/THE-CHECK.md`.
Three backticked paths went with it, one of them `CLAUDE.md` — the symbolic
link every session's rules arrive through. The dead-reference pass read
backticks in `AGENTS.md` and nowhere else, so all three stopped being watched.

```
$ rm CLAUDE.md
$ node tools/check-budgets.mjs ; echo "exit=$?"
...
Budget check passed.
exit=0
```

**The rules file promises that writing a path in backticks is how you ask to be
warned when it disappears.** For those three paths that promise had quietly
stopped holding, and nothing said so. The check was then taught to scan every
file `tools/reads.json` declares, not only `AGENTS.md`:

```
$ rm CLAUDE.md
$ node tools/check-budgets.mjs
These are named in backticks but are not in the repository:
  MISSING  CLAUDE.md
BUDGET CHECK FAILED.
```

Restored, the check passes again.

**The widened scan immediately refused something real that had never been
seen.** `docs/REVIEWER.md` named `package.json` in backticks inside a sentence
that says there is no such file. That is the one shape this guard gets wrong: a
path named in order to say it is absent. The sentence was reworded to stop
backticking it rather than the guard being weakened — *why that way round: an
exception list is a way to switch the warning off one path at a time, and the
sentence reads the same without the backticks.*

### Second, a mention declared for a file that no longer names it

Taking those paragraphs out left `.claude/settings.json`, `CLAUDE.md` and
`tools/check-budgets.test.mjs` listed as mentions of `AGENTS.md`, which no
longer contained any of them. A standing pre-approval: the next change to write
one of those names would have been classified before anybody looked at it. The
new guard refused it on the first run:

```
Names declared in tools/reads.json that the file does not contain:
  STALE  AGENTS.md  declares the mention  .claude/settings.json
  STALE  AGENTS.md  declares the mention  CLAUDE.md
  STALE  AGENTS.md  declares the mention  tools/check-budgets.test.mjs
BUDGET CHECK FAILED.
```

Reads are deliberately exempt: a file can be handed to a session without its
name ever appearing in backticks, which is why reads are charged from the
declaration and not from the text.

### The tests, watched failing first

Two tests were added to `tools/check-budgets.test.mjs`, one for each guard. Run
against the check as it stood on `main`, which has neither, **both failed** —
5 passing, 2 failing. Against the new one, all 7 pass.

---

## The same two guards, over a page charged to nobody, and a dead reference that says where it was written

**15 September 2026, all three found by the second review of pull request 22.**

### The fault: a guard that could not reach the file it was built for

Both guards above — every backticked name classified, and no mention declared
for a name the file does not contain — lived inside the walk that charges files
to a session. `docs/THE-CHECK.md` is declared in `tools/reads.json` and charged
to nobody, so the walk never reached it and neither guard ever looked at it.
The seven-name mentions list written for that page at this pull request was
therefore itself the unverified pre-approval the second guard exists to refuse.

Both probes were run against two copies of this repository in a scratch folder,
one carrying the check as it stood at the head of this branch and one carrying
the widened version. Nothing in the repository itself was edited.

```
PROBE A — an undeclared backticked path appended to docs/THE-CHECK.md:
  head of branch   Budget check passed.                                exit=0
  widened          UNDECLARED  docs/PLAN.md  (named in docs/THE-CHECK.md)
                   BUDGET CHECK FAILED.                                exit=1

PROBE B — docs/PRECEDENTS.md pushed onto that page's own mentions list:
  head of branch   Budget check passed.                                exit=0
  widened          STALE  docs/THE-CHECK.md  declares the mention  docs/PRECEDENTS.md
                   BUDGET CHECK FAILED.                                exit=1
```

Both guards now run over every file `tools/reads.json` declares, charged or
not. **The first real run refused two names immediately**, neither of which any
review had looked at:

```
Names declared in tools/reads.json that the file does not contain:
  STALE  docs/THE-CHECK.md  declares the mention  docs/REVIEWER.md
  STALE  docs/THE-CHECK.md  declares the mention  tools/check-budgets.mjs
BUDGET CHECK FAILED.
```

Both were taken out of the list, because that page does not name either file.
That is the whole point of the guard: the list now says what the page contains
rather than what somebody expected it to contain.

### A dead reference now says which file named it

The widened dead-reference pass reads many files, so `MISSING docs/X.md` on its
own leaves the reader grepping for the sentence to fix. The check already built
that fact and threw it away. Same probe, same two copies, with
`.github/workflows/checks.yml` deleted:

```
  head of branch   MISSING  .github/workflows/checks.yml               exit=1
  widened          MISSING  .github/workflows/checks.yml  (named in AGENTS.md)
```

### The tests, watched failing first

Two tests were added for the widened guards, and the existing test for a
disappearing path was made to assert that the report says where the path was
written. Run against the check as it stands at the head of this branch, which
has none of the three, **all three failed** — 6 passing, 3 failing:

```
not ok 6 - a backticked path in a declared file, not only in AGENTS.md, is watched for disappearing
not ok 8 - a backticked name left unclassified in a declared file charged to nobody stops the check
not ok 9 - a stale mention declared for a file charged to nobody stops the check
# tests 9
# pass 6
# fail 3
```

Against the fixed check, all 9 pass. The bad input for tests 8 and 9 is built
by the tests in a temporary folder and kept with them; the bad input for the
three probes above was a copy of this repository in a scratch folder, and the
repository itself was never edited.

**What no test can check, stated plainly:** whether `docs/THE-CHECK.md` really
is a page ordinary work never opens. That is still a judgement, written down in
`tools/reads.json` where Da Vinci sees it. What has changed is only that the
declaration is now held to what the page actually contains.

---

## The stale-declaration guard, three hours old, refusing the next change

**15 September 2026, found by the review of pull request 23.** Nothing was
built to produce this one. Pull request 22 added a guard that same afternoon:
a name listed as a mention in `tools/reads.json` has to appear in the declaring
file as its own backtick-wrapped path, or the check refuses. Pull request 23
was cut before 22 landed, so the two had never met.

### What was seen

Pull request 23 wrote the new program into the build path as one backtick span:

```
**Run `node tools/check-handoff.mjs <file>` on those seven lines before you
send them.**
```

and declared the bare path `tools/check-handoff.mjs` in `tools/reads.json` as a
mention. To the budget check a span with spaces and an angle-bracket
placeholder is prose, not a path — so the bare path never appeared anywhere in
that file, and the declaration was a promise about contents the file did not
have.

The branch on its own passed: `node tools/check-budgets.mjs` exited 0, with 43
tokens of headroom. Merged into `main` — a real merge commit, the conflict in
this file resolved by keeping both sections — the same command, unchanged,
refused:

```
Names declared in tools/reads.json that the file does not contain:
  STALE  .claude/skills/build/SKILL.md  declares the mention  tools/check-handoff.mjs
A mention listed for a file that no longer names it is a standing
pre-approval: the next change to write that name is classified before anybody
looks at it. Take it out of the list, or put the name back.

BUDGET CHECK FAILED.
```

Exit 1. `.github/workflows/checks.yml` runs that command on every push, so this
would have turned `main` red the moment pull request 23 merged.

### The fix, and the same command afterwards

The build path now writes the path on its own as well as inside the command:

```
**Run `tools/check-handoff.mjs` on those seven lines before you send them —
`node tools/check-handoff.mjs <file>`.**
```

`node tools/check-budgets.mjs` on the merged tree then exits 0, 21 backticked
paths checked and all of them present, the heaviest session about 9,554 tokens
with about 446 left. `node --test` — the command the automatic checks run —
passes 18 of 18.

### What this entry is for

The other entries in this file are checks fed something bad on purpose. This
one was not arranged. The guard was three hours old and it caught a real fault
in the very next change, before that change could reach `main` — the case the
budget "checks never observed refusing anything" exists to buy, happening by
itself.

**No new test was written for it, and that is deliberate.** `AGENTS.md` says a
blocking finding becomes a test, and this one already is one: the guard's two
tests were written with pull request 22 and are in
`tools/check-budgets.test.mjs`, each watched failing against a version without
the guard. The fault here was in what a file said, not in the program, and the
thing that holds it is `node tools/check-budgets.mjs` itself, run on every push.
Adding a third test of the same guard would be chasing the finding rather than
holding it.

**What no check here catches, stated plainly:** that a branch passes alone and
fails once it meets `main`. The automatic checks run on the branch as pushed.
Nothing ran them on the merge result — a person did, once, because a review said
to.

---

## The handoff check, on a real bad dispatch that had already been sent

**16 September 2026.** Not arranged, and not caught in time. Four review
handoffs went out this evening and **none of them was put through
`tools/check-handoff.mjs` first.** Two were refused by the reviewer that
received them, which is the thing the check exists to prevent — its own header
says a bad dispatch cannot be repaired after sending, because the correction is
a second message and a reviewer that has read two messages is no longer the
isolated one.

The second refusal was an eighth line, `base`, added to a seven-line handoff.
Afterwards the check was fed the handoff exactly as it had been sent:

```
REFUSED — 1 thing wrong with this handoff.

  line 4: `base` is not one of the seven fields. An extra field is refused — it
  is how an opinion of the work arrives in a handoff that should only carry
  facts.

Nothing was sent. A bad dispatch cannot be repaired afterwards:
the correction is a second message, and the reviewer that reads it
is no longer isolated. Fix the handoff and check it again.
```

Word for word the reviewer's own objection, available before the round was
spent rather than after.

**Where the bad input is.** The handoff is written for this entry and kept in
the session's scratch space, not in the repository, and nothing anybody uses was
changed to get the refusal. The `base` line was real — it is what was actually
sent — so this is a check refusing a genuine fault, not a padded one.

### What this entry is for, and what it does not cover

The check works. The check was not run. A check nobody runs is
indistinguishable from one that cannot fire, which is the exact wording of the
budget it was built to satisfy — and this is the budget failing from the other
end, where the program is sound and the habit is missing.

**And it would not have caught the first refusal.** That one was a handoff whose
seven lines were correct but whose surrounding brief carried the building
session's account of its own work. `tools/check-handoff.mjs` reads the seven
lines. It does not read the prose sent with them, so it cannot see an answer key
arriving beside a well-formed handoff. **That gap is real and is logged in
`docs/OPEN.md`.** Stating it here rather than quietly widening the check: what
the check can see is a fact, and what it should see is a decision for the owner.

**No new test.** The refusal above is already held by
`tools/check-handoff.test.mjs`, which watched this same refusal fire when the
check was written. The fault this time was in what a session did, not in what
the program does, and a second test of the same rule would hold nothing the
first one does not.

---

## A blocking finding, written as a test and watched failing: the stop list that ate an initial

**17 September 2026.** Zibaldone pull request 21, the margin guess. A fresh
review of `4f903c4` returned `changes_required` with one blocking finding: a
photograph of ordinary printed Italian, with nothing typed beside it, still put
a person he knows in the margin — whenever that person's initial happened to be
**A.** or **I.**

The cause was one line. A subject's name was its title less a list of English
function words, and the two one-letter words on that list are `a` and `i`. So
`Zia A.` kept only `[zia]` and never reached the rule that holds a short word in
a name to his own hand, while `Zia E.` kept `[zia, e]` and did. The guard changed
with the letter.

### Watched failing against the broken version

Two tests were written into `test/wiki.test.js` in the Zibaldone repository and
run against `4f903c4` with no other change. The suite was 134 tests passing
before they were added; with them it was 134 passing and 2 failing:

```
not ok 16 - a letter standing in a name is an initial, not a function word:
            A and I are held to his hand exactly as L and E are
    a novel saying "La zia era tornata" is not his Zia A., and not his Zia I. either
    + actual - expected
    + [ 'Zia A.', 'Zia I.' ]
    - []

not ok 17 - a subject named only by an initial is guessed when he types it,
            and is not offered for somebody else
    a person named only A. is a door, exactly as a person named only L. is
      [ -   'A.',
            'The lease' ]
```

The first is the blocking finding. The second is the advisory the same review
raised, which the guide asked to be fixed in the same change because it is the
same line and the same mistake.

### Watched passing against the fix

With the fix in place, the same two tests pass and the whole suite is **136
passing, 0 failing**. The fix is that a letter written with a full stop is kept
as a word of its own, `a.`, rather than as the bare letter — so it is never the
article the stop list takes off, and it is two characters long, which is what
the short-word rule already asks about. Nothing was taken off the list.

### Reproduced through the real app before and after, not only in the tests

Three photographs were made here — a rendered page of an Italian novel, a page
of a second novel and a school circular, each rotated 2.4 degrees, blurred and
saved as a quality-62 JPEG — and put through the running app with nothing typed
beside them, read by the recogniser the app actually runs. Before the fix:

```
02-novel-it.jpg      typed=""   photo read   margin => [Zia A., Zia I.]
03-family-it.jpg     typed=""   photo read   margin => [Nonna A., Zio A.]
04-circolare-it.jpg  typed=""   photo read   margin => [Prof. A., Sig. A.]
```

After it, all three margins are empty, and the table the fault was found by is
the same in every row:

```
  Zia L.   kept=[zia, l.]     Zia A.   kept=[zia, a.]
  Zia E.   kept=[zia, e.]     Zia I.   kept=[zia, i.]
```

### Where the bad input is

The photographs and the script that made them were written for this entry and
kept in the session's scratch space, never in the repository, and were deleted
afterwards. The three readings they produced are quoted verbatim into the tests,
which is where they now live. **Nothing anybody uses was made worse to get any
of this.** The failing run above is a test held against the version the review
was of — the fault was real and already pushed, not padded in to be caught.

### What this entry does not cover

The tests hold the fault at the matcher. **Neither of them photographs anything**
— they are fed the readings the recogniser returned, as the tests beside them
already are. The end-to-end run above was done by hand, in this session, and
nothing in the repository repeats it. If the path from a photograph to the
margin breaks somewhere other than the matcher, these two tests will still pass.

And one thing the fix does not reach, which is in the code comment as well as
here: a subject written `Zia A` **without** the full stop still keeps only
`[zia]`, and a photograph of a novel still names her. Nothing in the words tells
that `A` from the `A` of `A walk before dinner`, and treating a bare letter as an
initial would cost that subject its match from a photograph that really does say
it. Every subject named by an initial in that repository, and every one in the
finding, carries the stop.

## 17 September 2026 — Zibaldone #19, the two blocking findings, each watched failing and then passing

Da Vinci's review of the narrating, at `381bed1d`, returned `changes_required`
with two blocking findings and one advisory. Each blocking one became a test
before the fix was merged, and the advisory became the test standing in front of
the second, because it was the guard with nothing under it. All three were
watched failing against the reviewed version and passing against the fix. They
live in the notebook's own test file for the hearing.

### One — a quiet start lost half of what he said

He presses speak and does not begin for ten or fifteen seconds, then says two
sentences. The whole recording is under twenty-eight seconds, so nothing cut it
and it went to the model in one piece, quiet and all.

Reproduced first, against the reviewed version, with the real `tiny.en` over the
same 10.4 seconds of two sentences, varying only the quiet in front of them:

```
true silence 0:both … 11:both 12:FIRST-ONLY 13:both 14:both 15:both 16:FIRST-ONLY 17:both   2/18 lost
faint hiss   0:both … 11:both 12:FIRST-ONLY 13:both 14:FIRST-ONLY 15:FIRST-ONLY 16:FIRST-ONLY 17:both   4/18 lost
```

Nothing lost below twelve seconds of lead in twenty-four tries; six of the twelve
tries from twelve seconds up lost the sentence with his corrected figure in it.
After the fix, the same sweep from nought to eighteen seconds lost nothing in any
of the thirty-eight.

The test holds the seam rather than the model — a long quiet start does not reach
the model, and nothing else is taken away. With the hearing put back to
`381bed1d`:

```
not ok 13 - a long quiet before he starts does not reach the model, and nothing else is taken away
    the model was handed 19.0s, and he spoke for 8 of them (11s of quiet, level 0)
```

**Why the seam and not the model, said plainly because it is a real limit of this
test.** The loss needs two sentences of a real voice. The one recording the
notebook's repository ships is a single sentence, and put through the same sweep
it lost nothing at any lead length, on the broken version or the fixed one. So
the sweep above is the evidence about the model and it was run by hand; the test
is the evidence about the fix, and it runs on a machine with no model at all,
which is every machine the tests run on but this one.

### Two — a words file that copied short passed every check there was

The model is three files copied onto the volume by hand over a link that can
drop. The third is the list of words the model puts its numbers back into. The
notebook proved the model by opening it and hearing a tenth of a second of quiet,
and quiet comes back as no words whether that file is whole or gutted.

Watched by hand against the real `tiny.en`, both halves left whole, the words
file truncated in a temporary folder:

| what was in the words file | the tool before | the tool after |
|---|---|---|
| all 835,554 bytes | exit 0, the model works | exit 0, the model works |
| the first 100,000 bytes | **exit 0, "Recordings are heard here"** | exit 1, names the file |
| the first 10 bytes | **exit 0, "Recordings are heard here"** | exit 1, names the file |
| nothing at all, 0 bytes | **exit 0, "Recordings are heard here"** | exit 1, names the file |
| 40,000 whole lines of 50,256 | **exit 0, "Recordings are heard here"** | exit 1, "short by about 10,164" |

With 100,000 bytes kept, the notebook wrote his sentence down as *"The on the
flat in Trastivir runs out in April. Then, Marta said the was 4200,, 4."* — the
correction from four thousand two hundred to four thousand eight hundred, which
is the whole reason nothing anywhere in that piece is tidied, destroyed, and the
wrong figure left standing.

With the new check removed:

```
not ok 14 - a words file that copied short, empty or wrong is refused before anything says it can hear
    the first 100,000 bytes of it: refused
not ok 15 - the tool that says whether the copy worked refuses a short words file, and names it
    a words file that copied short: and names the file — … the recogniser was
    stopped by SIGABRT
```

### Three — nothing refused deleting the startup proof

The advisory, and the guard in front of finding two. The proving taken out of the
notebook's startup, so the line it prints is back to counting file names — the
state that took the notebook down — left the suite at 169 of 169. Now, with three
files that have the names of a model and nothing of a model in them:

```
not ok 16 - the notebook does not say it can hear until the model has been opened and proved
    Recordings are heard here, with the model in /tmp/zibaldone-test-Eg9mVQ
```

The only failing test, failing with exactly the line that was not true.

### Where the bad input is

**Nothing anybody uses was left worse.** Three kinds, and all three are back:

- **The truncated words files** were copies of the real one, cut in a scratch
  folder beside the model. The model on the machine was never touched, and the
  last row of the table above is that whole file, unchanged, still accepted.
- **The startup proof deleted** from the notebook's startup: done in a throwaway
  copy of the tree, never on the branch. The branch never held it.
- **The reviewed version put back** to run the new tests against: also a
  throwaway copy. Three exports the old version does not have were stood in as
  the old behaviour written out — it never trimmed a lead-in, and it never looked
  at the words file — so each test failed on what the old version did rather than
  on a name that was not there.

The bad inputs that stay are in the tests: a words file built line by line and
then cut, and an encoder written to declare how many words it has. Neither is a
copy of anything the notebook ships.

### What this entry does not cover

**The count leaves 1,700 words of room**, so a words file short by only a handful
and broken exactly on a line ending is still accepted. That is deliberate: a
model whose set of special marks differs a little must still be allowed to work,
and refusing a model that works is the worse mistake. A copy that stopped is
short by thousands, and a cut at an arbitrary byte lands on a line ending about
one time in seventeen; the other sixteen are caught by the line itself whatever
the count says. Written here rather than tightened, because tightening it is a
guess against one model.

**And one thing seen in passing and not fixed.** Sweeping a long gap in the
middle of a thought, arranged by cutting the two sentences apart and padding
between them, lost the second sentence from three seconds of gap upwards — **the
same, line for line, before the change and after it.** So the change neither
caused it nor cured it. Da Vinci swept a mid-thought gap too and found nothing,
so this is a different arrangement of one, and nothing here establishes which is
the fair one. It is written down rather than chased.


---

## The success line that said more than the check does

**17 September 2026.** `tools/check-handoff.mjs` printed on every acceptance:
*"Handoff accepted: seven fields, each checked against the branch."* Four fields
are compared against the tree; `repo` and `diffstat` are checked for shape and
compared to nothing.

**Why it is a refusal worth recording rather than a wording fix:** a dispatching
session told a reviewer that six of seven fields had passed against the branch.
It had just read that line. The tool put the words in its mouth.

**Fed it something bad, twice over.** A handoff carrying a false `diffstat` and
a false `repo` was accepted without comment — confirmed by the sixth review of
pull request 32. And the new test was watched failing against the old line:

```
not ok 10 - what it says on acceptance is what it actually compared
  location: 'tools/check-handoff.test.mjs:288:1'
```

with the old line restored in the working copy and nowhere else, then put back.
Against the new line the same test passes, 10 of 10.

**Watched still refusing afterwards**, so the change did not buy the honest
message by weakening the check: a handoff claiming `status: clean` against a
tree with a modified file was refused, naming `status` and printing the file.

**Nothing was left worse.** The old line existed only in the working copy for
the length of one test run.

## 17 September 2026 — Zibaldone #21, two blocking findings, each watched failing and then passing

A fresh review of `664bafd` returned `merge_with_caution` with three findings.
The guide treated the first two as blocking and the third as a documentation
fix. Both blocking ones were written as tests, watched failing against
`664bafd` with nothing else changed, and watched passing against the fix.

**The first.** Keeping a letter-plus-stop as its own word gave the subject `L.`
the name word `l.`, which only appears in a thought if he writes the stop too.
He types on a phone and will not punctuate an initial to match a page title, so
`Ask L about the lease` stopped finding her — and that is a step back from
`main`, where a bare letter matched because a name of that shape kept nothing
else. **The second.** His typing and the photograph's reading were joined into
one text before the whole-name test, so one word from each built a name neither
text said.

### Watched failing against the broken version

Two tests were added, one per finding, and run against `664bafd` with no other
change. The suite was 136 passing before them; with them, 136 passing and 2
failing.

```
not ok 20 - a bare letter he typed is the initial he meant, and an elided
            article still is not
    and without it, which is how he actually types
    + actual - expected
      [
    -   'L.',
        'The lease'
      ]

not ok 12 - a name is never assembled from one word of his typing and one of
            a photograph
    he wrote "garden" and a builder's quote said "wall": neither text names
    the garden wall, and the margin says nothing
    + actual - expected
    + [ 'the-garden-wall' ]
    - []
```

The first is a matcher test in `test/wiki.test.js`. The second is an app-level
test in `test/page.test.js`, kept through `/keep` and read back off the drawn
page, because the two sources only exist as two above the matcher: the fault was
that the matcher was handed one text where there were two, and a test that calls
the matcher with two arguments cannot see that.

### Watched passing against the fix

Both pass, and the whole suite is **138 passing, 0 failing, 0 skipped**.

### Reproduced through the real app before and after, not only in the tests

Thirteen thoughts were kept through the running app — the real server, the real
recogniser reading real photographs rendered as pages of print and then rotated
2.4 degrees, blurred and saved as quality-62 JPEGs. The same script was run
against `664bafd` and against the fix. Every photograph read at 94–96%
confidence in both runs. Only the margin changed:

```
typed                                      photo                   664bafd              the fix
"Ask L. about the lease before Friday."    none                    L., The lease        L., The lease
"Ask L about the lease before Friday."     none                    The lease            L., The lease
"Did L say anything about the lease?"      none                    The lease            L., The lease
"Zia A rang about Sunday."                 none                    (empty)              Zia A.
"Took vitamin D today."                    none                    (empty)              Vitamin D.
"The garden is a mess."                    "Quote for the wall"    The garden wall      (empty)
"Milan next week."                         "The job starts..."     The Milan job        (empty)
"Nothing much today."                      "The garden wall is..." The garden wall      The garden wall
""                                         "Coffee taken late..."  Coffee               Coffee
""                                         "Fig tree... Lease..."  fig tree, lease      fig tree, lease
""                                         Italian novel           (empty)              (empty)
""                                         second Italian novel    (empty)              (empty)
""                                         school circular         (empty)              (empty)
```

The bottom six rows are the ones that had to **not** move: three photographs
that name a subject in full and still do, and the three pages of ordinary
Italian print from the last round whose margins were empty and stayed empty.

### The claim in the direction, checked rather than taken

The guide said relaxing the match on his typing side could not reopen the
photograph hole, and asked for that to be verified. It was, by asking the
photograph side directly with lone letters in it. A photograph reading `Ask L
Friday about the lease` offers `The lease` and not `L.`, with the stop or
without it; `Sesso: M [ ] b) domiciliato`, `La zia era tornata dal paese` and
`A tavola erano in undici. Lo zio parlava` each offer nothing; `Fig tree —
feed it before the frost. Lease: ask L. Friday` still offers both subjects it
names in full. Nothing reads a lone letter as an initial except in what he
typed.

### Where the bad input is

**Nothing anybody uses was left worse.** The photographs and the two scripts
that made them were written for this entry, kept in the session's scratch space
and deleted afterwards; the "before" run was done in a throwaway worktree at
`664bafd` that was removed. The failing run above is the two new tests held
against the version the review was of — the faults were real and already pushed,
not padded in to be caught.

### What this entry does not cover

**The third finding has no test**, deliberately: it is advisory, the matching is
unchanged, and the rule here is that only a blocking finding becomes a test. Its
claims were checked before being written into `docs/the-margin-guesses.md` —
`Il muro`, `La cascina`, `Lo studio`, `Le chiavi` and `Un anno` each keep a
two-letter word, are answered from his typing and are never guessed from a
photograph, even one that names them in full.

**And a cost this fix carries, written down rather than argued away.** A lone
`a` or `i` he types now counts as an initial inside a name that has another word
in it. So a subject called `Zia A.` will be offered for an Italian thought that
happens to say *zia* and *a* — `la zia a Milano` — where before it was offered
for neither. That is the price of `Zia A rang about Sunday` working at all, it
is confined to his own typing, and it is in the code comment and the document as
well as here. What it cannot do is carry a name that is nothing but the initial:
`Better after a walk, and a coffee` does not name the person `A.`, and there is
a test on that line.

---

## 17 September 2026 — Zibaldone #21 again, an advisory finding taken as blocking, watched failing and then passing

A fresh review of `12186ae` returned `merge_with_caution` with two findings and
marked neither blocking. The guide overrode that on the first of them, for one
stated reason: it is pre-existing, so it is happening on the owner's phone
tonight, and fixing it makes the product better than it is rather than better
than the branch. Taken as blocking, it gets a test like any other.

**The finding.** The guard that reads a lone letter in something he typed as
somebody's initial demotes the one-letter words of the English stop list — `a`
and `i` — so they cannot carry a name on their own. The app's other language is
Italian, whose one-letter words are `a`, `e`, `è`, `i` and `o`. `e` and `o` are
on no list the code consults, and the accent comes off `è` before the letter is
looked at, so an ordinary Italian sentence naming nobody filled all three
margin doors with three people he knows.

### Watched failing against the broken version

One test was added and run against `12186ae` with nothing else changed —
`server/wiki.js` checked out from that commit underneath the new test file.

```
not ok 1 - an initial is a capital, and the one-letter words of both his
           languages cannot carry a name
  location: 'test/wiki.test.js:960:1'
  operator: 'deepStrictEqual'
  expected: []
  actual:
    0: 'Zia A.'
    1: 'Zia E.'
    2: 'E.'
# tests 1  # pass 0  # fail 1
```

The sentence is `La zia è andata a casa.` — *the aunt has gone home*. It names
nobody. The margin offered three people.

### Watched passing against the fix

```
ok 1 - an initial is a capital, and the one-letter words of both his
       languages cannot carry a name
# tests 1  # pass 1  # fail 0
```

The whole suite on the branch: **139 tests, 139 pass, 0 fail, 0 skipped** — the
138 the reviewer counted at `12186ae`, plus this one.

### Reproduced through the real app before and after, not only in the test

A script delivered the reviewer's own subject pages — `Zia A.`, `Zia E.`, `E.`,
`L.`, `I.`, `O.`, `The lease`, `The fig tree`, `Mother`, `Coffee` — through the
running app's `/wiki` endpoint and asked it for the margin of each thought.
Left column is `12186ae`, right is the fix.

```
"La zia è andata a casa."            ["Zia A.","Zia E.","E."]  ->  []
"Pane e latte, e poi la zia."        ["Zia E.","E."]           ->  []
"O vuoi il caffè o vuoi il tè."      ["O."]                    ->  []
"Ho parlato con la zia o con la
 mamma."                             ["O."]                    ->  []
"Mother sent the e-mail about the
 lease and the fig tree."            ["The fig tree","E.",     ->  ["The fig tree",
                                      "The lease"]                  "The lease","Mother"]
```

The last row is the one worth reading twice: the margin offered him `E.`, a
person, and the cap of three then pushed out `Mother`, whom he had written
himself. `LONE` excluded the apostrophe but not the hyphen, so `e-mail` yielded
an initial.

And what did not move — each of these gives the same answer on both versions:

```
"Zia A rang about Sunday."             ["Zia A."]
"Ask L about the lease before Friday." ["L.","The lease"]
"Did L say anything about the lease?"  ["L.","The lease"]
"L'anno scorso la casa era chiusa."    []
"I. said no."                          ["I."]
"Better after a walk, and a coffee."   ["Coffee"]
```

The photograph side is untouched. The three Italian photographs from the
previous round — a page of a novel, a page of a second novel and a school
circular — were re-run through the reading side and each still offers an empty
margin.

`tools/measure-capture.mjs` on the fix: kept in 1.5–2.2 ms with the margin on
and 1.8-1.9 ms with it off across 0/50/500/3000 subjects, and 80.0 file reads
either way on 40 read photographs. The reviewer measured 1.6–2.1 and 1.8–1.9 at
`12186ae`, so this is the same band.

### Why the letter list alone was not the fix

Worth recording because the review, the direction and the first attempt all
framed this as a letter set, and a letter set on its own does not do it.

Put `e` and `o` on the list and `La zia è andata a casa.` still offers `Zia A.`
and `Zia E.` Being on the list means the letter may stand as the initial
*inside* a name that has another word beside it — which is exactly the shape
`Zia E.` has, with `zia` supplied by the sentence. Only the bare `E.` goes.

Nothing in the letters tells that sentence from `Zia A rang about Sunday.`,
which the direction requires to keep working. What tells them apart is the
capital: an initial stands for a name and a name is written with one, while a
one-letter word in the middle of an Italian sentence never is. So the fix is
both — the list is now the words of both languages, and an initial has to be a
capital.

The list is `a`, `e`, `i`, `o`. It is the words and not the vowels: `u` is a
word in neither language, so `U.` can still carry a name. `è` is not listed
separately because the accents come off before the letters are looked at. `ho`
and `ha` are two letters, so they are words already and the slight rule holds
them to his hand without this.

### Where the bad input is

**Nothing anybody uses was left worse.** The failing run above is the new test
held against the version the review was of, with `server/wiki.js` checked out
from `12186ae` and put straight back. The fault was real and already pushed,
not padded in to be caught. The reproduction script was written for this entry,
kept in the session's scratch space and deleted afterwards.

### What this entry does not cover

**The second finding has no test**, deliberately: it moves two comments in
`server/store.js` onto the functions they describe and changes no behaviour.
The rule here is that only a blocking finding becomes a test.

**Two costs this fix carries, written down rather than argued away.**

A thought typed with no capitals at all — `ask l about the lease` — no longer
offers `L.` It still offers `The lease`. That is a real loss and it is the
smaller of the two; the other side of it was three wrong doors on an ordinary
sentence of his own language.

And a capital at the start of a sentence is read as an initial like any other,
so `E poi la zia.` still offers `Zia E.` and `A pranzo dalla zia.` still offers
`Zia A.` That is the behaviour `a` has always had here — it is the same cost the
entry above this one records — and it cannot go without taking `Zia A rang about
Sunday.` with it. That tension is real, it was not resolved, and it is the
owner's to settle if he wants it settled differently.

**The OCR readings quoted in the tests were not re-verified against a live
recogniser run**, and the screenshot images were not looked at. The previous
review left both alone and so did this fix.

## 17 September 2026 — Zibaldone #21, third round: an initial and an abbreviation are the same two characters, watched failing and then passing

A fresh review of `bfef014` returned `changes_required` with one blocking
finding.

**The finding.** Keeping the full stop inside the word is what gives a page
called `A.` a name to be found by at all — and it handed every abbreviation he
types to the margin as a person. `a.m.`, `p.m.`, `i.e.`, `e.g.`, `P.S.` and a
list written `a. milk / b. bread` all break into single letters carrying a stop,
and each one is then a whole name. The `LONE_WORDS` guard that protects the
bare-letter path could not reach the dotted one, because the stop is part of the
word on purpose.

**The rule chosen, and why it is not a list.** A list of `a.m.`, `p.m.`, `i.e.`,
`e.g.`, `P.S.` is a list that is missing the next one — `n.b.`, `q.b.`, `ca.` —
and it would have to be a list for both his languages. The rule is instead the
two things he does when he writes an initial and does not do when he writes an
abbreviation, and both are already how the bare-letter rule works. **A capital**,
because an initial stands for a name: `a. milk` is lower case where `Ask L.
about the lease` is not. **Standing clear**, because an abbreviation glues the
next letter to the stop with no space — `a.m.`, `i.e.`, `P.S.` — where a name has
a space: `M. B.` A lettered stop with a letter hard against it is not an
initial, and neither is the letter on the other side of that stop. That second
half is what takes `S.` out of `P.S.` and `M.` out of `9 a.m.`, both of which are
capital enough to pass the first test on their own.

The observation offered in the direction — the glue — was checked and holds, but
it is not enough by itself: the shopping list `a. milk / b. bread` has a space
after every stop and only the lower case tells it from a name. Each half of the
rule carries one row of the reviewer's table and neither carries both.

The letters that fall out are dropped, not read back as bare letters. On `main`
the word `m` from `9 a.m.` matched the subject `M.`, because a page of that
title kept the bare letter; here a page called `M.` keeps `m.`, so dropping is
what closes the door rather than opening another one.

### Watched failing against the broken version

One test was added and run against `bfef014` with nothing else changed —
`server/wiki.js` checked out from that commit underneath the new test file, and
put straight back afterwards.

```
not ok 1 - a letter and a stop is an initial only where he wrote it as one,
           not where it is an abbreviation
  location: 'test/wiki.test.js:1018:1'
  operator: 'deepStrictEqual'
  error: 'a lettered list is a list, not two people'
  expected: []
  actual:
    0: 'A.'
    1: 'B.'
# tests 1  # pass 0  # fail 1
```

The thought is a shopping list: `Shopping: / a. milk / b. bread / c. the good
coffee`. It names nobody. The margin offered two people and nothing else.

### Watched passing against the fix

```
ok 1 - a letter and a stop is an initial only where he wrote it as one,
       not where it is an abbreviation
# tests 1  # pass 1  # fail 0
```

The whole suite on the branch: **140 tests, 140 pass, 0 fail, 0 skipped** — the
139 the reviewer counted at `bfef014`, plus this one. Nothing was skipped, so
the real-browser check on the margin doors ran rather than being passed over.

### Reproduced through the real app before and after, not only in the test

A script delivered eighteen subject pages — `A.`, `B.`, `I.`, `L.`, `P.`, `S.`,
`E.`, `G.`, `N.`, `U.`, `M. B.`, `Zia A.`, `Zia L.`, `Mother`, `The lease`,
`The fig tree`, `Vitamin D.`, `Coffee` — through the running app's `/wiki`
endpoint and asked it for the margin of each thought. Left column is `bfef014`,
right is the fix.

```
"Shopping: / a. milk / b. bread /
 c. the good coffee"                 ["A.","B.","Coffee"]   ->  ["Coffee"]
"Mother at 9 a.m. about the lease."  ["A.","The lease",     ->  ["The lease",
                                      "Mother"]                  "Mother"]
"The lease, i.e. the flat one."      ["E.","I.","The lease"] -> ["The lease"]
"P.S. the lease runs out in March."  ["The lease","P.","S."] -> ["The lease"]
"Bring the lease, e.g. the second
 page."                              ["E.","G.","The lease"] -> ["The lease"]
"Home by 6 p.m., the fig tree
 after."                             ["The fig tree","P."]  ->  ["The fig tree"]
"N.B. the lease runs out in March."  ["B.","The lease","N."] -> ["The lease"]
"He moved to the U.S.A. last year."  ["A.","S.","U."]       ->  []
```

The first row keeps `Coffee` on both sides, and should: he wrote the word
himself, on the third line of his own list. What goes is `A.` and `B.`, the two
doors onto people he had never mentioned. The last two rows are abbreviations the
reviewer did not name and the rule was not written from — they were predicted by
it and then checked.

And what did not move — each of these gives the same answer on both versions:

```
"Ask L. about the lease before Friday."  ["L.","The lease"]
"Ask L about the lease before Friday."   ["L.","The lease"]
"Zia A. rang."                           ["Zia A.","A."]
"Zia A rang about Sunday."               ["Zia A."]
"M. B. called."                          ["M. B.","B."]
"Zia L. rang about Sunday."              ["Zia L.","L."]
"I. said no."                            ["I."]
"Took vitamin D today."                  ["Vitamin D."]
"L'anno scorso la casa era chiusa."      []
"Mother sent the e-mail about the
 lease and the fig tree."                ["The fig tree","The lease","Mother"]
```

The photograph side is untouched, and could not have moved: a letter and a stop
is two characters, so it is slight, and a name with a slight word in it is never
built from a photograph. The three Italian photographs from the earlier rounds —
a page of a novel, a page of a second novel and a school circular — were re-run
through the reading side and each still offers an empty margin.

`tools/measure-capture.mjs` on the fix: kept in 1.5–2.0 ms with the margin on
and 1.6–2.0 ms with it off across 0/50/500/3000 subjects, and 80.0 file reads
either way on 40 read photographs. The reviewer measured 1.5–1.9 ms and 80 reads
at `bfef014`, so this is the same band.

### Where the bad input is

**Nothing anybody uses was left worse.** The failing run above is the new test
held against the version the review was of, with `server/wiki.js` checked out
from `bfef014` and put straight back — `git status` clean afterwards, checked.
The fault was real and already pushed, not padded in to be caught. The
before-and-after script was written for this entry, kept in the session's scratch
space and deleted afterwards.

### What this entry does not cover

**Two costs this fix carries, written down rather than argued away, both
measured above.**

A thought typed with no capitals at all — `ask l. about the lease before friday.`
— no longer offers `L.` It still offers `The lease`. Before this the stop was
enough on its own, so this is the same charge the capital rule already made on
the bare-letter path, now made one step further. He types `Ask L.` or `Ask L`
and is answered either way.

And a lettered list written with capitals — `Shopping: / A. milk / B. bread` —
is still read as `A.` and `B.` Nothing in the letters tells it from `A. rang`,
and the capital is the evidence the whole rule rests on. Both versions do this;
the fix neither causes it nor removes it.

**Nothing outside the finding was touched.** The skip-window in `reached()`, the
late reading, and subjects named after ordinary words arriving from a
photographed manual were left alone, as the direction said.

**The OCR readings quoted in the tests were not re-verified against a live
recogniser run**, and the screenshot images were not looked at. The two previous
rounds left both alone and so did this one.

## 17 September 2026 — Zibaldone #21, fourth round: a capital the phone supplied names a person, watched failing and then passing

A fresh review of `40a8a1b` returned `changes_required` with one blocking
finding and one advisory. Both are fixed; the blocking one is the test below.

**The blocking finding.** The capital rule that the last two rounds won rests on
what a phone keyboard does: it capitalises the start of a sentence and nothing
else, so a capital in the *middle* of one is something he did on purpose. Only
the first half of that had been written as code. Two thoughts that differ by one
letter he did not type gave different answers:

```
"E la zia ha chiamato: coffee, the boiler, the lease."   ["Zia E.","The boiler","Coffee"]
"La zia ha chiamato: coffee, the boiler, the lease."     ["The boiler","Coffee","The lease"]
```

The capital put `Zia E.` — an aunt he had not named — into the first door and
pushed `The lease`, which he wrote himself, off the end of the three. That is
the shape `docs/the-margin-guesses.md` calls "the worst of them" and "the shape
this whole slice is built against", and it was reachable from an ordinary
sentence of his own language. `A casa di zia domani.` did the same with
`Zia A.`

The behaviour was disclosed on that page, and the reason given there was wrong,
which is why the reviewer raised it rather than letting it pass. The page said
the behaviour "cannot go without taking *Zia A rang about Sunday* with it". It
can: in *Zia A rang about Sunday* the capital is in the middle of the sentence,
which is the case the same page argues is deliberate. The two are separable by
where the letter sits. That paragraph is now corrected rather than left standing.

**The rule chosen, and where a sentence starts.** At the head of a sentence the
four one-letter words of his two languages — `a`, `e`, `i`, `o` — are read as
words and not as initials. Only those four: a sentence beginning `L. rang this
morning` still offers `L.`, and so does `L rang this morning`, because `l` is an
everyday word in neither language and there is nothing there to protect against.

A sentence starts at the beginning of the text, after a full stop, exclamation
mark, question mark or ellipsis, and at the start of a line. The first two are
what the keyboard itself capitalises after; the line start is there because he
types a thought a fragment to a line and the keyboard capitalises after a
newline too. Quotation marks and brackets on either side of the join do not move
it. A colon, a comma and a semicolon are deliberately not on the list — no
keyboard capitalises after them, so a capital there is his own, and
`Ha chiamato: E poi la zia` still offers `Zia E.`

### Watched failing against the broken version

Two tests were added and run against `40a8a1b` with nothing else changed —
`server/wiki.js` checked out from that commit underneath the new test file, and
put straight back afterwards.

```
not ok 1 - a capital the phone supplied at the start of a sentence is not an initial
  location: 'test/wiki.test.js:1091:1'
  error: 'the capital the phone supplies on its own does not change the answer'
  operator: 'deepStrictEqual'
  expected:  0: 'The boiler'   1: 'Coffee'      2: 'The lease'
  actual:    0: 'Zia E.'       1: 'The boiler'  2: 'Coffee'

not ok 2 - an initial inside Italian quotation marks is still an initial
  location: 'test/wiki.test.js:1136:1'
  error: 'the quotation mark is not part of the word the initial stands clear of'
  operator: 'deepStrictEqual'
  expected:  0: 'L.'           1: 'The lease'
  actual:    0: 'The lease'
# tests 2  # pass 0  # fail 2
```

The first is the blocking finding, and it fails on the row the reviewer typed:
the answer to the capitalised sentence is not the answer to the same sentence
without the capital, and the door it loses is `The lease`.

### Watched passing against the fix

```
ok 1 - a capital the phone supplied at the start of a sentence is not an initial
ok 2 - an initial inside Italian quotation marks is still an initial
# tests 2  # pass 2  # fail 0
```

The whole suite on the branch: `# tests 142  # pass 142  # fail 0`, up from 140
at `40a8a1b`, including the door measurements under a real browser.

### Reproduced through the real app before and after, not only in the tests

A script delivered fifteen subject pages — `Zia E.`, `Zia A.`, `E.`, `A.`, `B.`,
`L.`, `I.`, `M. B.`, `Zia L.`, `Vitamin D.`, `Mother`, `The lease`,
`The boiler`, `The fig tree`, `Coffee` — through the running app's `/wiki`
endpoint, kept each thought through `/keep`, and read the doors back out of the
notebook page's own HTML. Left column is `40a8a1b`, right is the fix.

```
"E la zia ha chiamato: coffee,
 the boiler, the lease."            ["Zia E.","The boiler",  ->  ["The boiler",
                                     "Coffee"]                    "Coffee","The lease"]
"A casa di zia domani."             ["Zia A."]              ->  []
"Tutto bene. E la zia ha chiamato." ["Zia E."]              ->  []
"Coffee. / E la zia ha chiamato."   ["Zia E.","Coffee"]     ->  ["Coffee"]
"«L. non viene», ask about the
 lease before Friday."              ["The lease"]           ->  ["L.","The lease"]
```

The first row is the blocking finding through the app he actually uses: the
false name goes and `The lease`, which he wrote, comes back. The second is the
same fault with `a`. The third and fourth are the two other places a sentence
starts — after a stop, and at the start of a line — predicted by the rule and
then checked. The last is the advisory.

And what did not move — each of these gives the same answer on both versions,
read the same way out of the same page:

```
"La zia ha chiamato: coffee,
 the boiler, the lease."                 ["The boiler","Coffee","The lease"]
"Zia A rang about Sunday."               ["Zia A."]
"L. rang this morning."                  ["L."]
"L rang this morning."                   ["L."]
"Ha chiamato: E poi la zia."             ["Zia E."]
"Ho parlato con zia E. ieri."            ["Zia E.","E."]
"Ask L. about the lease before Friday."  ["L.","The lease"]
"Ask L about the lease before Friday."   ["L.","The lease"]
"M. B. called."                          ["M. B.","B."]
"Zia L. rang about Sunday."              ["Zia L.","L."]
"I. said no."                            ["I."]
"Took vitamin D today."                  ["Vitamin D."]
"L'anno scorso la casa era chiusa."      []
"Mother sent the e-mail about the
 lease and the fig tree."                ["The fig tree","The lease","Mother"]
"Mother at 9 a.m. about the lease."      ["The lease","Mother"]
"P.S. the lease runs out in March."      ["The lease"]
"La zia è andata a casa."                []
"Pane e latte, e poi la zia."            []
"O vuoi il caffè o vuoi il tè."          []
```

The photograph side is untouched: the change is to how a capital in *his own
typing* is read, and a photograph's words never carried an initial at all. The
three Italian photographs from the earlier rounds — a page of a novel, a page of
a second novel and a school circular — are asserted in the suite to give an
empty margin, and the suite passes.

`tools/measure-capture.mjs` on the fix: kept in 1.5–2.1 ms with the margin on
and 1.6–1.8 ms with it off across 0/50/500/3000 subjects, and 80.0 file reads
either way on 40 read photographs. The reviewer measured 1.7–2.4 ms and the same
80 reads at `40a8a1b`, so this is the same band or slightly under it.

### The advisory, fixed rather than logged

`DOTTED` had `.-‑` written bare inside a character class, which a regular
expression reads as a range from the full stop to the non-breaking hyphen —
some 8,000 characters — and not as the three that were meant. `LONE`, three
rules above, spells the same class with escapes and is correct, and the comment
claimed the two rules turn on the same two things. So an initial written
straight after `«`, the ordinary Italian quotation mark, was not read as one,
while the same initial with no stop was. It is spelled now the way `LONE`
spells it.

It was fixed rather than written down because it is a defect the change under
review introduced, not one it inherited. A test was written for it even though
the workshop's rule does not require one for an advisory: the failing run was
already set up for the blocking finding, so it cost one more assertion block,
and a character class read as a range is exactly the kind of fault that comes
back silently.

### Where the bad input is

**Nothing anybody uses was left worse.** The failing run above is the two new
tests held against the version the review was of, with `server/wiki.js` checked
out from `40a8a1b` and put straight back — `git status` clean afterwards,
checked, and the restored file compared byte for byte against the fix. The
faults were real and already pushed, not padded in to be caught. The
before-and-after script that drives the running app was written for this entry,
kept in the session's scratch space, and is not in the repository.

### What this entry does not cover

**The cost this fix carries, written down rather than argued away.** A sentence
that really does begin with one of those four letters used as an initial — `E
rang this morning`, `A ha chiamato` — no longer offers `E.` or `Zia E.` from it.
He can write the stop himself, `E. rang this morning`, and be answered, and the
same initial anywhere but the head of a sentence is untouched. This is a door
lost, and it is the price of the false name that was taking a true one's place.
It is on `docs/the-margin-guesses.md` in his words as well as here.

**The lettered-list hole is unchanged in both directions, which was checked
rather than assumed.** A list written with capitals — `A. milk / B. bread` — is
still read as the two people `A.` and `B.`, on both versions. The sentence-start
rule cannot touch it: it governs a bare capital standing alone, and `A.` there
is a capital he wrote the stop for, which a different rule reads. The owner has
been asked whether he writes lists that way and has not answered, so it was
left alone as the direction said.

**Nothing outside the two findings was touched.** The skip-window in `reached()`,
the late reading, and subjects named after ordinary words arriving from a
photographed manual were left alone.

**Whether a phone keyboard capitalises after a newline was reasoned from, not
measured on a device.** The line start is in the rule because he types a thought
a fragment to a line and because iOS and Android both capitalise there; no
handset was tested. If it turns out he types a lower-case fragment on a new line
and means an initial by it, the line-start case is the one to take out, and it
can be taken out on its own.

**The OCR readings quoted in the tests were not re-verified against a live
recogniser run**, and the screenshot images were not looked at. The three
previous rounds left both alone and so did this one.

## 17 September 2026 — Zibaldone #21, fifth round: a title that spells an initial without the stop, watched failing and then passing

A fresh review of `f01eb3a` returned `changes_required` with one blocking
finding and one advisory. The blocking one is the test below. The advisory was
deliberately not fixed; it is confirmed and logged at the end of this entry.

**The blocking finding, and why it is the same fault a fifth time.** Every guard
these four rounds built — the capital, the four one-letter words of both his
languages, the head of a sentence, the hyphen, the apostrophe — hangs off one
function, `initialsOf`, and `initialsOf` was only ever asked about a lone letter
in his typing. A subject's **title** reached the same match by a second road
with no guard on it at all: `words()` yielded its bare letter as an ordinary
word and the name kept it. The English stop list closed that road for `a` and
`i` and for no other letter — which is the accident an earlier round in this
same slice was written to end, arriving from the other side.

So with a page titled `Zia E`, no stop:

```
"La zia e andata a casa: coffee, the lease, the fig tree"  ->  ["The fig tree","Zia E","Coffee"]
"La zia andata a casa: coffee, the lease, the fig tree"    ->  ["The fig tree","Coffee","The lease"]
```

One stray `e` — the copula, one of the commonest words in Italian — put an aunt
he had never named into the margin and pushed `The lease`, which he wrote
himself, off the end of the three. That is the shape
`docs/the-margin-guesses.md` calls the worst this can do. A page titled `L`
answered `L'anno prossimo` with a person by the same road.

**And the titles are not his to spell, which is the part that made this
blocking rather than theoretical.** `server/wiki.js` stated as settled fact that
"he writes his page titles once and carefully, and every subject named by an
initial here carries the stop". He writes none of them. Titles come out of the
filing model — `filing/prompts/write.md`, and `subject` in
`filing/prompts/decide.md` — and nothing in that prompt, in `checkDelivery` or
in `take()` asks for the stop or supplies it. The app deliberately lets him
capture `Zia A rang about Sunday` with no stop, so the page made of that capture
may well be titled that way. That sentence is now corrected in the code and on
the page rather than left standing.

### The rule chosen, and where it was put

**A one-letter word of a title is the initial it spells, or it is nothing.** It
is never kept as an ordinary word of a name. Which of the two it is, is decided
by `initialsOf` — the same function, on the same letters, that reads a lone
letter in what he types.

It was put there rather than beside there on purpose. The direction was to fix
the road and not the instance, and a second rule written next to the first is a
second thing to keep in step; the two had already drifted once, which is this
finding. Asking `initialsOf` of the title means every guard that holds the typed
side now holds the title side, by construction, and there is one place left in
the app where a letter becomes a person. `Zia E` and `Zia E.` are one name,
`[zia, e.]`, and so are `Zia A`/`Zia A.`, `L`/`L.` and `Vitamin D`/`Vitamin D.`

**Why the test had to be `initialsOf` and not "a bare letter is an initial".**
A one-letter word that is a word has to stay a word. The `A` of the title
`A walk` stands where any writer capitalises anyway — the head of a sentence —
so it is no initial, and that name is still `[walk]`. Read as an initial it
would have become `[a., walk]`, and he could no longer have found it by typing
`went for a walk`. That door was checked in both directions, not assumed.

### Watched failing against the broken version

One test was added and run against `f01eb3a` with nothing else changed —
`server/wiki.js` checked out from that commit underneath the new test file, and
put straight back afterwards.

```
$ git show f01eb3a:server/wiki.js > server/wiki.js
$ node --test-name-pattern "a title that spells an initial without the stop" --test "test/wiki.test.js"
not ok 1 - a title that spells an initial without the stop is the same name as one that spells it with
  error: 'the stray "e" of an ordinary Italian sentence does not change the answer'
        'The fig tree',
    +   'Zia E',
        'Coffee',
    -   'The lease'
# tests 1
# pass 0
# fail 1
```

It refused on exactly the row the review names: `Zia E` in the margin, and
`The lease` — his own words — pushed off the end.

### Watched passing against the fix

```
$ node --test-name-pattern "a title that spells an initial without the stop" --test "test/wiki.test.js"
ok 1 - a title that spells an initial without the stop is the same name as one that spells it with
# tests 1
# pass 1
# fail 0
```

And the whole suite on the branch: **143 tests, 143 pass, 0 fail, 0 skipped**,
up from 142 at `f01eb3a`.

### Reproduced through the real app before and after, not only in the test

A script delivered seven subject pages — `Zia E` (no stop), `L` (no stop),
`A walk`, `The lease`, `The fig tree`, `Coffee`, `Mother` — through the running
app's `/wiki` endpoint, kept each thought through `/keep` as a form post, and
read the doors back out of the notebook page's own HTML. A fresh app per
thought, so the only entry on the page is the one being asked about and an empty
margin reads as empty instead of falling through to an older entry. Left column
is `f01eb3a`, right is the fix.

```
"La zia e andata a casa:
 coffee, the lease, the fig tree"   ["The fig tree","Zia E",  ->  ["The fig tree",
                                     "Coffee"]                     "Coffee","The lease"]
"L'anno prossimo"                   ["L"]                     ->  []
"Zia E. rang about Sunday."         []                        ->  ["Zia E"]
```

The first row is the blocking finding through the app he actually uses: the
false name goes and `The lease`, which he wrote, comes back. The second is the
same fault reaching a page named by one letter.

**The third row was not in the review and is a door the fault was also
costing him.** With the page titled `Zia E`, typing the name *with* the stop —
`Zia E. rang about Sunday.` — opened nothing at all on the broken version,
because the name held the bare letter `e` and what he typed was the initial
`e.`, and the two never met. So the same defect both invented a name he had not
written and swallowed one he had. It is fixed by the same line.

And what did not move — each of these gives the same answer on both versions,
read the same way out of the same page:

```
"La zia andata a casa:
 coffee, the lease, the fig tree"   ["The fig tree","Coffee","The lease"]
"Zia E rang about Sunday."          ["Zia E"]
"Ask L about the lease before
 Friday."                           ["L","The lease"]
"Went for a walk today."            ["A walk"]
"Better after a walk, and a
 coffee."                           ["Coffee","A walk"]
```

The last two are the cost that was checked rather than assumed: the article `A`
of the title `A walk` is still an article, the page is still found by his own
typing, and no person `A.` is named.

### What the cost list was checked against

The direction named the doors that had to keep working, and each was run rather
than reasoned about. All twenty-one passed unchanged: `Ask L. about…`,
`Ask L about…`, `Zia A. rang.`, `Zia A rang about Sunday.`, `M. B. called.`,
`Zia L. rang…`, `I. said no.`, `Took vitamin D today.`, `L'anno scorso…` naming
nobody, `Mother sent the e-mail…` offering `Mother`, a shopping list offering
only `Coffee`, `9 a.m.`/`P.S.`/`i.e.`/`N.B.`/`U.S.A.` naming nobody,
`«L. non viene»` offering `L.`, `A casa di zia domani.` naming nobody,
`La zia è andata a casa.` naming nobody, `Pane e latte, e poi la zia.` naming
nobody, and `O vuoi il caffè o vuoi il tè.` naming nobody. The three Italian
photographs still give an empty margin, which is carried by a test that was
already there and still passes.

Nothing in the cost list had to be given up, so there was nothing to take back
to the owner.

### The numbers, re-measured rather than carried over

`tools/measure-capture.mjs` over 40 read photographs: **80.0 file reads with the
margin on and 80.0 with it off**, and a thought kept in **1.6–2.0 ms** across 0,
50, 500 and 3,000 subjects. Both unchanged from what the review recorded. The
extra work the fix does — one pass of `initialsOf` over each title — happens
once per delivery while the index is built, not once per thought, so the number
he waits through was not expected to move and did not.

### Where the bad input is

**Nothing anybody uses was left worse.** The failing run above is the new test
held against the version the review was of, with `server/wiki.js` checked out
from `f01eb3a` and put straight back — `git status` clean afterwards, checked,
and the restored tree compared against the commit. The fault was real and
already pushed, not padded in to be caught. The before-and-after script that
drives the running app was written for this entry, kept in the session's scratch
space, and is not in the repository.

### What this entry does not cover

**The advisory was confirmed and deliberately not fixed, on instruction.** The
reviewer said the margin-geometry assertion added in the previous round never
runs in CI. That holds, and it was checked rather than taken:
`.github/workflows/tests.yml` installs with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: 1`,
`test/phone.test.js` and `test/drawing.test.js` gate four tests on
`browserHere`, and the job log for `f01eb3a` (run 35183955107) reads
`# tests 142`, `# pass 138`, `# skipped 4`. So the browser tests are green only
because they did not run. It is pre-existing, it is not this slice's doing, and
changing the build configuration is a different job with a different blast
radius — it belongs in `docs/OPEN.md`, not in this change.

This also means the four browser tests have never been watched refusing anything
in CI. They were watched here: this session's machine has a browser, so all four
ran, and the suite reports 143 passing with 0 skipped rather than 139 with 4
skipped.

**The lettered-list hole is unchanged and was not touched.** A list written with
capitals — `A. milk / B. bread` — is still read as the two people `A.` and `B.`
The owner has been asked and has not answered, so it was left alone as the
direction said.

**Nothing outside the blocking finding was touched.** The skip-window in
`reached()`, the late reading, and subjects named after ordinary words arriving
from a photographed manual were all deliberately left alone.

**A title whose one-letter word carries a stop is read as it always was.** The
fix reaches the stop-less spelling only. Applying the abbreviation rule
(`dottedInitialsOf`) to titles as well would be a wider change, no fault was
observed there, and the direction said not to widen.

**The filing prompts were read but not changed.** The reviewer's point was that
the prompt is somebody's word and nothing enforces it; the answer taken here was
to make the matcher safe against any title the filing can produce, not to ask
the filing for better titles. Whether the filing *should* also be asked to write
the stop is a separate question and is not settled by this change.

**The OCR readings quoted in the tests were not re-verified against a live
recogniser run**, and the screenshot images were not looked at. The four
previous rounds left both alone and so did this one.

## 17 September 2026 — Zibaldone #21, sixth round: a number in a title fell out of that subject's name, watched failing and then passing

A fresh review of `7e2041f` returned `changes_required` with one blocking
finding and nothing else. It is a regression the fifth round's own fix
introduced, and it is the first time in this slice that the margin got **wider**
rather than narrower.

**The fault.** The fifth round put every one-letter word of a title through
`initialsOf`: the initial it spells, or nothing.

```js
if (w.length > 1) { if (!STOP.has(w)) out.push(w); }
else if (initials.has(`${w}.`)) out.push(`${w}.`);
```

A title is broken into words on letters **and digits**, and `initialsOf` only
ever yields a capital letter. So a bare digit is a one-character word that can
never be an initial, and every number standing as a word of a title dropped
silently out of that title's name. So did every lower-case letter. The rule was
argued end to end in terms of letters — in the code comment, and in
`docs/the-margin-guesses.md`, which said *"A one-letter word in a title is the
initial it spells, or it is nothing"*. The digit was not decided against; it was
never considered.

**Why that is blocking and not cosmetic.** A name is matched by requiring
**every** word of it. Dropping a word therefore loosens the match. Every guard
built across the six rounds of this slice tightened it; this one widened it, and
it widened it into exactly the failure the whole slice exists to prevent — a
photograph that names nobody filling the margin with people and places he never
mentioned.

### Watched failing against the broken version

The new test in `test/wiki.test.js`, held against the version the review was of:
`server/wiki.js` checked out from `7e2041f`, everything else at the fix.

```
### BROKEN (server/wiki.js from 7e2041f, test from 1fe74bd) ###
not ok 1 - a number in a title is a word of that subject's name
  error: |-
    + actual - expected
    + [
    +   'Via Roma 7',
    +   'Sala 2',
    +   'Sportello 3'
    + ]
    - []
# pass 0
# fail 1
```

Three doors, all wrong, off a photograph of a council letterhead that names
nobody and nothing of his. That is the worst thing the margin can do, and the
fifth round's fix is what put it back.

### Watched passing against the fix

```
### FIXED ###
ok 1 - a number in a title is a word of that subject's name
# pass 1
# fail 0
```

`git status` was clean after restoring `server/wiki.js`, checked, and
`git diff HEAD --stat` was empty.

### Reproduced through the real recogniser before and after, not only in the test

The letterhead was **rendered as a printed page and read with the recogniser the
app actually runs** — `tesseract.js 7, eng+ita (tessdata_fast)` from
`vendor/tessdata` — and what came back was handed straight to the running app's
margin. No literal string anywhere in the loop.

```
recogniser: tesseract.js 7, eng+ita (tessdata_fast), status read, confidence 93%
"COMUNE DI FERRARA\n\nUfficio Anagrafe - via Roma\n\nSala d'attesa: prendere il numero\nSportello aperto dal lunedi al venerdi"
```

Against `7e2041f`:

```
  name of page/via-roma-7: ["via","roma"]
  name of page/sala-2: ["sala"]
  name of page/sportello-3: ["sportello"]
margin from the photograph: ["Via Roma 7","Sala 2","Sportello 3"]
margin when he types it himself: ["Sportello 3"]
```

Against the fix, same render, same read:

```
  name of page/via-roma-7: ["via","roma","7"]
  name of page/sala-2: ["sala","2"]
  name of page/sportello-3: ["sportello","3"]
margin from the photograph: []
margin when he types it himself: ["Sportello 3"]
```

The door he opens himself is unchanged. The three he never asked for are gone.

### The rule chosen, and why the narrow reading was not the whole of it

**A word of a title stays in that title's name.** Two things come out and
nothing else does: a word that names nothing to look for — an English function
word, or one of the one-letter words of his two languages — and a one-letter
word that spells an initial, which stays as the initial it spells rather than as
the bare letter.

That is the fifth round's rule turned the right way up. It was written as *a
one-letter word is an initial or it is nothing*, with "stays" as the exception;
it is now written as *a word stays*, with the initial and the function word as
the exceptions. Nothing about `Zia E` changes. What changes is that a case
nobody thought of falls on the safe side of the rule instead of the dangerous
one, which is the property the old wording did not have.

**The digit was the narrow reading and it was not the whole of it.** The review
also named `Il piano b`, and the direction said to decide what a one-character
lower-case letter in a title is and say why. It is an ordinary word and it
stays, so `Il piano b` is `[il, piano, b]`. It cannot be a person — an initial
is a capital standing clear, and a lower-case letter is not one — and it cannot
be nothing, because nothing is what loosens the match. The four one-letter words
of his languages are still dropped, and they are dropped for the reason the
English function words are: they name nothing to look for. Not because they are
letters. That is what keeps `A walk` as `[walk]` and a title of nothing but `E`
naming nobody, both of which the fifth round won and both of which still hold.

The code is three lines:

```js
if (w.length === 1 && initials.has(`${w}.`)) { out.push(`${w}.`); continue; }
if (STOP.has(w) || LONE_WORDS.has(w)) continue;
out.push(w);
```

The reason is written beside it in `server/wiki.js` and on
`docs/the-margin-guesses.md`, and the sentence the review quoted — line 261,
*"A one-letter word in a title is the initial it spells, or it is nothing"* — is
corrected there rather than left standing.

### What it costs, named rather than hidden

**He has to write the number.** A subject whose title carries one is offered
only when the thought carries it too. *The flat is freezing again.* is not
**Flat 3**; he types *Flat 3 is freezing again.* and is answered. The same
charge falls on the letter of `Il piano b`.

**And a numbered subject is never built from a photograph at all** — even a
photograph that really does say *Sportello 3*. A digit is one character long, so
it is short, and a name with a short word in it is only ever built from words he
typed. That follows from the short-word rule and not from this change: it was
true before the fifth round broke it and it is true again now. It is written on
`docs/the-margin-guesses.md` where it will be read, because it looks like a
consequence of putting the number back and is not.

### What the cost list was checked against

Every line the direction named was re-run against the fix, not assumed:

```
Zia E filed: "La zia e andata a casa: coffee, the lease..."    -> ["The fig tree","Coffee","The lease"]
Zia E filed: "Zia E. rang about Sunday."                       -> ["Zia E"]
Zia E filed: "Zia E rang about Sunday."                        -> ["Zia E"]
Zia E filed: "A casa di zia domani."                           -> []
"Ask L. about the lease before Friday."                        -> ["L.","The lease"]
"Ask L about the lease before Friday."                         -> ["L.","The lease"]
"Zia A. rang."                                                 -> ["Zia A."]
"Zia A rang about Sunday."                                     -> ["Zia A."]
"M. B. called."                                                -> ["M. B."]
"Zia L. rang about Sunday."                                    -> ["Zia L.","L."]
"I. said no."                                                  -> ["I."]
"Took vitamin D today."                                        -> ["Vitamin D."]
"L'anno scorso non e successo niente."                         -> []
"Mother sent the e-mail about the lease and the fig tree"      -> ["The fig tree","The lease","Mother"]
"9 a.m. partenza"                                              -> []
"P.S. the lease runs out in March."                            -> ["The lease"]
"It is short, i.e. the lease."                                 -> ["The lease"]
"N.B. the fig tree."                                           -> ["The fig tree"]
"He is in the U.S.A. again."                                   -> []
"«L. non viene», ask about the lease before Friday."           -> ["L.","The lease"]
photo: shopping list                                           -> []
photo: bank letter                                             -> []
photo: novel                                                   -> []
typed "Went for a walk today."                                 -> ["A walk"]
search "a walk" (both words)                                   -> ["page/a-walk"]
name of "A walk"                                               -> ["walk"]
name of "Il piano b"                                           -> ["il","piano","b"]
```

The stray `e` of the Italian sentence still names nobody, and `The lease` — which
he wrote himself — still keeps its door. The whole suite: **144 passing, 0
failing, 0 skipped**, up from 143 by the one test above.

### The numbers, re-measured rather than carried over

`tools/measure-capture.mjs`: a thought kept in **1.5–2.0 ms** across 0, 50, 500
and 3,000 subjects, and 40 read photographs drawn in **18.4 ms** with the margin
on against 16.5 ms off, **80.0 file reads either way**. The change is three lines
inside the index build, which runs once per delivery and not once per thought,
so the number he waits through was not expected to move and did not.

### Where the bad input is

**Nothing anybody uses was left worse.** The failing run is the new test held
against the version the review was of, with `server/wiki.js` checked out from
`7e2041f` and put straight back — tree clean afterwards, checked both ways. The
fault was real and already pushed; nothing was padded in to be caught. The two
before-and-after scripts that render the letterhead, read it and drive the
running app were written for this entry, kept in the session's scratch space,
and are not in the repository.

### What this entry does not cover

**Nothing outside the blocking finding was touched**, as the direction said. The
skip-window in `reached()`, the late reading, subjects named after ordinary words
arriving from a photographed manual, and the capitalised lettered list
(`A. milk / B. bread`) were all left alone.

**The browser tests skipping in CI is unchanged and was not re-checked.** It is
already logged from the fifth round and from `docs/OPEN.md`. On this session's
machine all four ran: the suite reports 144 passing with 0 skipped.

**The short-word line was not moved.** A digit is one character and therefore
short, which is what stops a numbered subject being built from a photograph.
Exempting digits from that rule would have made the letterhead case pass a second
way, and it would have been widening beyond the finding. It was not done, and the
cost of not doing it is written on the design page instead.

**The OCR readings already quoted in the other tests were not re-verified.** Only
the letterhead was rendered and read live, because only it is this finding's. The
five earlier rounds left the rest alone and so did this one.

## 17 September 2026 — Zibaldone #19, the speech model moved into the image: the new check watched refusing, and the old ones watched still refusing

`docs/going-live.md` told the owner to install Fly's program on a Mac, download
a 118 MB archive, unpack it and put three files, 102 MB of them, onto the
volume over an sftp shell. He never did it, so the notebook could not write down
a word he said. That step is gone: `Dockerfile` now fetches the model during the
build, weighs the whole download against a sha256 written into the file, and
ships the three files inside the image at `/app/vendor/whisper`.

Three things had to be watched. A new check that had never refused anything; and
the two checks that already guard the model, which had to be seen still refusing
with the model in its new home rather than on the volume.

### One — the new check: a download that did not arrive whole ends the build

The weighing line from `Dockerfile`, run against the real archive and against
three kinds of bad download:

| what was weighed | what came back | exit |
|---|---|---|
| the whole archive, 118,071,777 bytes | `model.tar.bz2: OK` | 0 |
| the download stopped halfway, 60,000,000 bytes | `FAILED`, *1 computed checksum did NOT match* | 1 |
| the archive with one byte changed, at offset 70,000,000 | `FAILED`, *1 computed checksum did NOT match* | 1 |
| nothing downloaded at all, 0 bytes | `FAILED`, *1 computed checksum did NOT match* | 1 |

Then the whole build step, run as a shell script the way `RUN set -eux` runs it,
to see that a mismatch really stops rather than being noted and passed over:

```
+ echo 0000000000000000000000000000000000000000000000000000000000000000  /tmp/model-sim.tar.bz2
+ sha256sum -c -
/tmp/model-sim.tar.bz2: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
build step exit=1
what got extracted:
0
```

Nothing was extracted, and the step ended there. With the checksum the
`Dockerfile` actually carries, the same script ran through and wrote the three
files, 103,627,191 bytes. **Why this check is worth more here than a checksum
usually is:** the fault this pull request was blocked on was a model file that
arrived short, and a short file does not fall over — it writes his words down
wrong. That happened to one copy, put there by hand. A build that shipped half
a model would do it to every copy there will ever be.

### Two — the words-file check, watched still refusing at the model's new home

The check from the entry above, which reads the words file rather than opening
the model. The real `tiny.en` in `vendor/whisper` — the path the image carries
it at — with the words file cut to the first 100,000 bytes of 835,554, which is
the size that wrote *"Marta said the was 4200,, 4."*:

```
The model does not work.
the three files in .../vendor/whisper have the names of a model but are not one
(.../vendor/whisper/tiny.en-tokens.txt stops making sense at line 7139 of 7139:
expected a word and the number 7138, found "IHBlcmZlY3". That is what a file
that copied only part of the way looks like). encoder 12.9 MB, decoder 89.9 MB,
tokens 0.1 MB.
exit=1
```

The same bad model handed to the notebook's own startup, which proves the model
before it says it can hear:

```
Zibaldone is open on port 8099, keeping everything in /tmp/zib-start
Recordings are kept but not heard: the three files in .../vendor/whisper have
the names of a model but are not one (... stops making sense at line 7139 of
7139 ...)
```

The notebook stayed open and went on answering, which is the whole design.

### Three — the recogniser missing, watched still refusing

The other way the model can fail to be a model: the package that runs it is not
there. `node_modules/sherpa-onnx-node` moved aside:

```
The model does not work.
the three files in .../vendor/whisper have the names of a model but are not one
(Cannot find package 'sherpa-onnx-node' imported from .../server/hearing-child.js).
encoder 12.9 MB, decoder 89.9 MB, tokens 0.8 MB.
exit=1
```

Note the tokens size is 0.8 MB here and 0.1 MB above: the two refusals are
telling apart two different faults, not repeating one.

### Four — the new test, watched failing against each fault it holds

`Dockerfile` puts the model somewhere in the image and `fly.toml` tells the
notebook where to look. If those two drift apart **nothing falls over** — the
notebook simply says it cannot hear, and every recording he speaks waits for
ever. That silence is the failure this whole change exists to remove, so a test
in `test/deploy.test.js` holds the seam. Watched failing both ways:

```
not ok 29 - fly.toml looks for the speech model where the Dockerfile puts it, and the build weighs what it fetched
    the notebook must look where the build puts the model, or it is deaf and says so for ever
    + actual - expected
    + '/data/whisper'
    - '/app/vendor/whisper'
```

and, with the `sha256sum -c -` line deleted from `Dockerfile`:

```
not ok 29 - fly.toml looks for the speech model where the Dockerfile puts it, and the build weighs what it fetched
    error: 'the build weighs the model it fetched'
```

### And the thing the checks protect, watched working

The model the build fetches was downloaded and weighed here: 118,071,777 bytes,
sha256 `2bd6cf96…05dd`, and the three files taken out of it 103,627,191 bytes.
Put at the path the image carries them at and read by the notebook's own code:

```
The model works. Recordings are heard here, with tiny.en in .../vendor/whisper.
exit=0
```

With it there the suite is **191 of 191, 0 failing, 0 skipped** — the two tests
that need a real model ran, including the one that hears real speech running
past the thirty seconds the model takes at a time. With no model, which is how
GitHub runs it, **189 pass, 2 skipped, 0 failing**.

**And nothing reaches outside at run time**, which is the promise on the scope
page. Every `connect()` the whole suite makes was traced: **572 calls, 350 to
127.0.0.1 and 222 to Unix sockets on this machine, none of them off it.** The
hearing tests alone made two, both loopback. With the network cut away entirely
— run in a namespace where `curl https://github.com` is refused outright — the
model still opened and answered *The model works*. `server/` has no `fetch`, no
`http.request`, no `net.connect` and no address in it.

### Where the bad input is

**Nothing anybody uses was left worse.** Everything bad was made and then
unmade:

- **The three bad downloads** — halved, one byte changed, empty — were copies of
  the archive in the session's scratch space. They never touched the repository
  and no part of them was committed.
- **The truncated words file** was a cut copy written over `vendor/whisper`,
  which is a local folder the build makes and `.gitignore` keeps out of the
  repository. The whole file was kept aside first and put back, and the restored
  copy was checked byte for byte — same sha256 as the untouched extraction — and
  re-proved: *The model works*, exit 0.
- **The recogniser moved aside** was `node_modules`, moved out and moved back,
  then re-proved: *The model works*, exit 0.
- **`fly.toml` pointed back at `/data/whisper`**, and **the checksum line
  deleted from `Dockerfile`**, were temporary edits made to watch the new test
  fail. Both files were kept aside first and restored from those copies. The
  suite was run again afterwards on the restored tree: 191 of 191.

The bad input that stays is nothing at all: the new test reads the two files as
they are and needs no fixture.

### What this entry does not cover

**The image was never built.** There is no Docker daemon in the window this was
done in, so the `Dockerfile` around the weighing is reasoning, not evidence. The
fetching, the weighing, the extraction and the model itself were all run
directly and are evidence. What was not seen: the stages composing, the layer
sizes, and whether Fly's remote builder can reach `github.com` and Debian's
package servers. A build that cannot fetch fails the deploy and leaves the live
notebook untouched, which is the safe direction, but it is a new way for a
deploy to go red and nobody has watched it.

**Fly.io was not reached, and could not be.** Every connection to it from here
is refused with 403, which `docs/going-live.md` already records. So the cost
arithmetic on that page rests on the US$0.15 a gigabyte a month that write-ups
quote from Fly's billing documentation, read second-hand; Fly's own pages were
unreachable. The Australian dollars are a conversion at an assumed rate and are
marked as not established.

**The comments in `server/hearing.js` still describe the copy by hand** in four
places — they explain why each check exists, and the history they tell is still
true, so the file was left alone rather than edited for tidiness. It is settled,
reviewed work and this change had no business in it. Said here so it is picked
up rather than lost.

---

## 17 September 2026 — Zibaldone #19, the fix round: three blocking findings, each written as a test, each watched failing against `99d9bb5` and passing against the fix

The review of `99d9bb5f96b14252a8abebeefae586bdd2dae1c7` returned
`merge_with_caution` with four findings. Three were fixed and the fourth
accepted. Each of the three is a test on the branch now. Every refusal below was
watched; nothing here is reasoned from the source.

The suite before any of it, on `99d9bb5`: **191 tests, 189 pass, 0 fail, 2
skipped** — the same numbers the reviewer reported, on a machine with a browser
but no speech model, so the two skips are the real-model tests and the browser
tests ran.

### One — a note that said he had not typed words he had typed

The note over the spoken words read *"He spoke this one instead of typing it."*
It was written whenever a capture carried a recording, and a capture carries a
recording whether or not he also typed. So a line he typed and recorded beside
went into the log with a sentence under it denying he had typed it — written
once into a file that is never rewritten, and read as fact by the filing, by the
noticing and by him.

Watched failing against the broken version. The test is given a capture with
both, and the assertion that fires is *and nothing in it says he did not type
them*. What it printed is the fault itself:

```
# Thursday 17 September 2026, 18:00

the fig tree by the wall

## Spoken

He spoke this one instead of typing it. The words below are the recording as
it was heard, so they may hold false starts, repeated words and corrections
he made while speaking. ...
```

His own typed words, and immediately under them the sentence saying he did not
type them. Against the fix: `ok 1`, and the file whole, 16 of 16.

The test also feeds the three other things the entry can say about a recording —
nothing heard, nothing made out, the recording would not open — because the note
is written in all four places, and a blank-but-not-empty text, to check that
whitespace is not counted as typing.

### Two — a thought he spoke got no guess in the margin

The margin's guess gated on the words of a capture, and a recording's heard
words were not among them. The reviewer's own case is the test: the same
sentence kept twice, once spoken and heard, once typed.

Watched failing against the three server files from `99d9bb5`, the test
unchanged:

```
not ok 1 - a thought he spoke is guessed at from the words heard in it, ...
  error: |-
    the words heard in a recording reach the margin
    + actual - expected
    + []
    - [ 'the-fig-tree' ]
```

No door at all where the typed twin has one. Against the fix, `ok 1`.

**And the half that had to be checked rather than assumed.** A recording's words
are his, which argues for reading them as his own hand — and reading them that
way would undo the work that keeps a photograph from conjuring a short name.
So the loose version was built on purpose and fed to the test: heard words
poured into his typed words, with initials read out of them. The subject is
`L.`, a name of one letter, and what he speaks is *"Ask L. about the lease."*

```
error: |-
  spoken, it is not: a name of a letter or two is held to his own typing,
  and a transcript is not that
  + actual - expected
    [
  +   'l',
      'the-lease'
    ]
```

The loose version offers him a door into a person because a recogniser put a
capital and a stop into his speech. The test refuses it. That is the guard
watched firing, and it is why the decision is written down in the code rather
than left as a preference: a recording is matched as a photograph is — the whole
of a name or nothing, no initials read out of it, no name with a one- or
two-letter word in it — while the words still count as his for the order they
come back in.

### Three — the hearing ran on pages where nothing it does can be seen

`app.js` is served on every page, and the block that asks what is unheard and
hands the sound back sat at the top level of it. Opening Codex or Disegno with a
recording waiting downloaded the recording, decoded it and uploaded the raw
sound, and showed nothing for it.

This one is measured in a real browser, because what a page asks for is the
browser's business. The test opens Codex, Disegno and a subject page with one
recording waiting, and records every request. Watched failing against the page
script from `99d9bb5`:

```
not ok 1 - opening Codex or Disegno with a recording waiting asks for nothing
           and sends nothing
  error: |-
    /pages asked what is unheard: ["GET /pages","GET /style...css",
    "GET /theme...js","GET /app...js","GET /unheard.json",
    "GET /fonts/CrimsonPro-Italic.woff2","GET /fonts/CrimsonPro.woff2",
    "GET /voice/20260917T010000000Z-9addaa/original",
    "POST /heard/20260917T010000000Z-9addaa"]
```

The whole fault in one line: on the Codex page the browser asked what was
unheard, downloaded the recording and posted the sound back. Against the fix,
`ok 1` — nothing asked, nothing downloaded, nothing posted, on all three pages
and on the locked notebook as well.

The same test then carries the other half, so the quiet cannot have been bought
by switching the hearing off: on the notebook itself the recording is still
asked for, handed over exactly once, heard, and the margin stops saying it is
waiting. And on the next visit, with nothing left unheard, nothing is asked
again.

### Where the bad input is

All three bad inputs were the code itself, put back afterwards, and none of them
is in the repository:

- **The broken versions** were `git checkout 99d9bb5 -- <file>` for
  `filing/mind.js`, then for the three server files, then for `public/app.js`.
  Each was kept aside first and restored, and the test re-run green against the
  restored copy before anything was committed.
- **The loose version of the guess** was a hand-written edit to `guessFor` that
  existed for one test run and was overwritten from the copy kept beside it. It
  is described above and quoted in the commit message; no line of it survives.

Nothing was left worse. The tests themselves are the input that stays, and they
need no fixture: each builds its own capture, its own wiki pages and its own
recording.

### The numbers afterwards

The suite on the branch after all three fixes: **194 tests, 192 pass, 0 fail, 2
skipped**, run four times. Three of those runs were clean. The first was not:
one pre-existing browser test, *he speaks, it is kept, and the page hands the
sound back and shows the words*, failed once and passed on every other run,
including alone and with its own file whole. It is recorded here rather than
waved away. The machine has four processors and runs three browser test files at
once, and this change adds about eleven seconds of browser work to one of them,
which widens the window in which they overlap. The test it hit waits up to
twenty seconds for a selector. That is the likely cause and it was not proved.

### What this entry does not cover

**The fourth finding was accepted, not fixed, and nothing here refuses
anything about it.** Nothing builds the image, so the new stage of the
`Dockerfile` will be built for the first time by the deploy after this merges.
No Docker build was run in this window either. The entry above from earlier
today records the same gap.

**The image was still never built**, so the fetch, the weighing and the
extraction remain reasoning rather than evidence, exactly as that entry says.

**Nothing was run on a phone.** The browser tests run Chromium at a phone's
size, which is not the same thing as iOS, and the ranged serving of a recording
that the reviewer exercised by hand was not re-exercised here — it was not
touched.

---

## 17 September 2026 — Zibaldone #19, the second fix round: two blocking findings, each written as a test, each watched failing against `c0b63eb` and passing against the fix

The review of `c0b63eb` on `claude/the-narrating` returned `changes_required`
with three findings. Two were fixed here. The third was accepted and is not
touched — it is the browser missing from the build image, and the two entries
above from earlier today record that same gap.

Everything below was run in a clone of the branch at `c0b63eb`, with Chromium
present, so the browser tests ran rather than skipping.

### The numbers before anything was changed

The suite at `c0b63eb`, to confirm the ground the reviewer stood on:

```
# tests 194
# pass 192
# fail 0
# skipped 2
```

The two skipped are the two that need a real speech model on the machine.

### One — every failure to open a recording was written down for ever

The last step of `hearOne` in `public/app.js` was:

```js
}).then(handOver, function () { cannot('could-not-open'); });
```

Every rejection the browser's decoder can produce went there, and that POSTs
`/could-not-hear/<id>`, which is written the way a hearing is written: once,
and never rewritten. No path back but editing the volume by hand.

The reviewer's two triggers are both about something other than the recording.
A second browser without the codec: he speaks into his iPhone, so Safari makes
MP4 with AAC inside it, and Firefox on several platforms has no AAC decoder
there — the rejection is about Firefox, and the recording is written off on
every browser including the phone that made it and reads it perfectly. And
running out of memory, which is indistinguishable at that line from a corrupt
file: opening a twenty-minute recording means holding the whole of it as plain
numbers at the browser's own rate, some 230 MB in one piece.

**What was decided, and why.** They cannot be told apart there, so nothing is
written down at all. The recording is left exactly as it was — still waiting,
still offered on the next visit — and the run carries on to the ones behind it,
which is the part that had to be kept: leaving it unheard must not mean
stopping the run, or one recording a browser dislikes would hold up everything
spoken after it, which is the fault an earlier round already fixed here. What
stays final is only what is read off the recording itself: more sound in it
than the notebook hears at once, and too little sound in it to hear anything.
Those are facts about the recording, which is why they are allowed to be final.

**The cost, said rather than hidden:** a recording that genuinely nothing can
ever open is now asked for again on every visit, for ever. That is work wasted.
It is the lesser of the two — an unheard recording can still be heard later, a
written-off one cannot.

#### Watched failing against `c0b63eb`

The browser test *a recording that cannot be opened is settled, and the ones
behind it are heard* was rewritten to say the opposite, since the opposite is
what is wanted: *a recording this browser cannot open is left unheard, and the
ones behind it are still heard*. Source restored to `c0b63eb` with
`git checkout c0b63eb -- public/app.js server/hearing.js`, the new test kept:

```
not ok 1 - a recording this browser cannot open is left unheard, and the ones behind it are still heard
  error: |-
    +   margin: 'could not be opened',
    +   reason: 'could-not-open',
    +   status: 'could-not-hear',
    +   why: 'The recording could not be opened by the browser that was asked to open it.'
  expected: ~
  operator: 'strictEqual'
# pass 0
# fail 1
```

The assertion is `bad.hearing === null`. Against `c0b63eb` a whole written-off
hearing came back instead.

#### Watched passing against the fix

```
ok 1 - a recording this browser cannot open is left unheard, and the ones behind it are still heard
# pass 1
# fail 0
```

The test carries all of it: nothing whatever written down about the one that
would not open, the recording still on the disk byte for byte, `/unheard.json`
still offering it and only it, the margin still saying *not yet heard*, and
both recordings sitting behind it heard on that same visit — which is the half
that proves the run was not stopped to buy the rest.

### Two — the resampler had no anti-alias filter, measured at zero attenuation

`flatten()` stepped through the decoded recording with linear interpolation and
nothing before it. A context made with no options runs at the hardware rate,
normally 48000, so it is a 3:1 decimation with no filter at all. Sound above
8000 was not lost, it was moved: folded back into the speech band at full
strength, on top of what he said.

Measured first by lifting the function out of the page and feeding it single
tones, reproducing the reviewer's numbers exactly. A full-strength tone reads
0.500 in this measurement.

**Against `c0b63eb`:**

```
48k input  1000 Hz -> level 0.500 at  1000 Hz in the 16k output   (0.0 dB)
48k input  3000 Hz -> level 0.500 at  3000 Hz in the 16k output   (0.0 dB)
48k input 12000 Hz -> level 0.500 at  4000 Hz in the 16k output   (0.0 dB)
48k input 14000 Hz -> level 0.500 at  2000 Hz in the 16k output   (0.0 dB)
48k input 20000 Hz -> level 0.500 at  4000 Hz in the 16k output   (0.0 dB)
```

**Against the fix** — eight poles of Butterworth at 7000, as four two-pole
sections, run before the thinning:

```
--- input at 48000 ---
    200 Hz -> level 0.50000 at   200 Hz   0.0 dB
   1000 Hz -> level 0.50000 at  1000 Hz   -0.0 dB
   3000 Hz -> level 0.50000 at  3000 Hz   0.0 dB
   5000 Hz -> level 0.49937 at  5000 Hz   -0.0 dB
   8000 Hz -> level 0.07099 at  8000 Hz   -17.0 dB
  12000 Hz -> level 0.00175 at  4000 Hz   -49.1 dB
  14000 Hz -> level 0.00021 at  2000 Hz   -67.4 dB
  20000 Hz -> level 0.00000 at  4000 Hz   below the 16-bit floor
--- input at 44100 ---
    200 Hz -> level 0.49997 at   200 Hz   -0.0 dB
   1000 Hz -> level 0.49916 at  1000 Hz   -0.0 dB
   3000 Hz -> level 0.49243 at  3000 Hz   -0.1 dB
   5000 Hz -> level 0.47867 at  5000 Hz   -0.4 dB
   8000 Hz -> level 0.05311 at  8000 Hz   -19.5 dB
  12000 Hz -> level 0.00099 at  4000 Hz   -54.1 dB
  14000 Hz -> level 0.00008 at  2000 Hz   -75.5 dB
  20000 Hz -> level 0.00000 at  4000 Hz   below the 16-bit floor
```

**Speech is not damaged**, which is the other half and the one that says the
cure did not cost more than the fault: 200, 1000, 3000 and 5000 Hz all come
through at full strength at both input rates. 8000 is the fold point itself and
has to go; it is the transition, not the speech band.

44100 was measured as well as 48000 so that none of this is a fact about one
number. Stereo was checked at 1000 Hz and reads 0.50000.

#### Watched failing against `c0b63eb`, passing against the fix

The test is *sound too high for the notebook is taken out, not folded back on
top of his voice*. It lifts the real function out of the file the browser is
served, so it measures the shipped code rather than a copy.

```
### AGAINST c0b63eb (unfixed resampler) ###
not ok 1 - sound too high for the notebook is taken out, not folded back on top of his voice
  error: '12000 Hz folds to 4000 Hz and must not arrive there: read 0.50000, and before this it read 0.500'
# pass 0
# fail 1
### AGAINST THE FIX ###
ok 1 - sound too high for the notebook is taken out, not folded back on top of his voice
# pass 1
# fail 0
```

#### That the restructuring itself changed nothing it should not

The filter runs only where the numbers are actually being thinned, so a
recording already at the notebook's own rate is untouched. Checked by running
the old function and the new one on the same random input and comparing every
number:

```
16000 Hz, 1 channel(s), no thinning: 48000 numbers, largest difference from the old code = 0
16000 Hz, 2 channel(s), no thinning: 48000 numbers, largest difference from the old code = 0
8000 Hz, 1 channel(s), no thinning: 48000 numbers, largest difference from the old code = 0
11025 Hz, 2 channel(s), no thinning: 48000 numbers, largest difference from the old code = 0
20 minutes at 48000 -> 19200000 numbers in 1.9 s
```

Identical, every number. And the filter is fed one sample at a time as the
thinning walks the recording, so a twenty-minute recording gets no second
full-length copy of itself in the phone's memory beside the one the browser
already made.

### Where the bad input is

Both bad inputs were the code itself, put back afterwards, and neither is in
the repository:

- **For finding one**, `git checkout c0b63eb -- public/app.js server/hearing.js`
  with the new test kept, and both files restored from copies kept aside before
  the test was re-run green.
- **For finding two**, `git checkout c0b63eb -- public/app.js`, restored the
  same way.

Nothing was left worse. The two tests are the input that stays, and neither
needs a fixture: one builds its own recordings, the other builds its own tones.

### The numbers afterwards

The suite on the branch after both fixes, with Chromium present:

```
# tests 195
# pass 193
# fail 0
# skipped 2
```

194 to 195 is the one test added; the two skipped are still the two that need a
real speech model. `test/narrating-phone.test.js` on its own: 13 tests, 13 pass,
0 fail, 0 skipped. Across the three files that use a browser there are 17
browser-gated tests and all of them ran.

### What this entry does not cover

**The third finding was accepted, not fixed**, and nothing here refuses anything
about it. The build configuration was not touched and no image was built in this
window.

**Nothing caps the size of what is decoded.** The reviewer noted that the "too
long" check happens inside `handOver`, after the decode, so nothing limits what
is materialised. That was left alone deliberately. Any cap applied before the
decode has to be a cap on the compressed bytes, which means guessing a bitrate
to turn bytes into seconds — and guessing wrong writes a good recording off as
too long for ever, which is a fault an earlier round on this same branch already
had to fix. What did change is the damage it can do: an out-of-memory rejection
is no longer final, so the worst case is now wasted work rather than a lost
transcript. It is named here and not chased.

**Nothing was run on a phone**, and nothing was measured in Safari. What Safari's
AAC actually does to the band above 8000 is still unmeasured, so whether the
folding reached his transcripts in practice remains unknown — only that the
mechanism was there and is now gone. The branch's own note that it has measured
nothing in Safari still stands.

**The resampler was measured in Node, not in a browser.** It is arithmetic on
numbers and the test lifts the shipped function verbatim, but no browser ran it.
