You are Michelangelo. Read `.claude/skills/build/SKILL.md` in this repository and work as it says. This is stage 5, FIX. One defect, established by the window that dispatched you, not by a reviewer. It is not a judgement and you do not have to decide whether it is real.

Attach the project's repository with `add_repo` for `dniachini-droid/zibaldone`, asking for **push** access. It is private. Clone it and check out branch `claude/the-two-switches`, whose head is `3329660`. That branch is pull request 25. If `add_repo` will not go through, do not sit waiting: comment on pull request 25 saying you are blocked, and stop. Copy no file from this repository into that one, and no file from that one into this one.

Read `projects/zibaldone/scope/the-two-switches.md` here first.

## The defect

**`test/narrating-phone.test.js` fails on this branch and passes on `main`.** The test is *"he speaks, it is kept, and the page hands the sound back and shows the words"*.

What was run, and what came back:

    on claude/the-two-switches, whole suite:  244 tests, 241 pass, 1 fail, 2 skipped
    the same test file alone, same branch:     13 tests,  12 pass, 1 fail
    the same test file alone, on main:         13 tests,  13 pass, 0 fail

So it is not the machine under load and it is not flakiness. It fails alone, repeatably, on this branch only.

The assertion and the values:

    not ok 1 - he speaks, it is kept, and the page hands the sound back and shows the words
      location: 'test/narrating-phone.test.js:76:1'
      error: |-
        and nothing was heard while he waited
        + actual - expected
        + { engine: 'stub', heard_at: '...', seconds: 2.5, spoken: true,
        +   status: 'heard', text: 'the words heard in it' }
        - null

The test expects nothing to have been heard at that moment and something had been.

**Your own report said 244 tests, 242 pass, 0 fail.** That is not what this branch does here, twice, in a clean clone. Whatever the difference is, establish it rather than explaining it — the numbers you publish have to be the numbers the branch produces.

## What is asked of you

- **Establish why**, from evidence. The likely shape is that something in this change alters the timing that test depends on — a new link at the foot of the front page, or the front page doing one more thing before it settles — so the hearing now finishes inside a window the test assumed it would not. Do not report that as the cause because it is plausible. Find out.
- **Then decide, and say which you chose and why**: the code is wrong, or the test was resting on timing it never stated. Both are real answers. **If it is the test, you may only change it to assert what it actually means** — never to accommodate a behaviour change it was written to catch. If you cannot tell the two apart, say so and stop rather than guessing.
- **Watch it**: the test failing on `3329660`, and passing after your fix, with what you saw written into `docs/REFUSALS.md`.
- Run the whole suite more than once and report every number you see, including any run that differs. If a test is genuinely flaky on this machine, say which and show both outcomes rather than reporting the good run.
- Change nothing else. The rest of this branch has not been reviewed yet and is not yours to touch.
- Never skip, disable or quarantine a test to get green.

When you finish, stop early, or are blocked, comment on pull request 25 and say which of the three it is.
