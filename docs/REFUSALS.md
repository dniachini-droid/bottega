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
