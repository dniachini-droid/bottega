Fix session for pull request #1 in https://github.com/dniachini-droid/fashion-school-of-design, branch `claude/the-first-page`. #1 is already open and has been reviewed once; the owner then asked for wording changes and a photo change before he merges. You push to that same branch and open nothing. Do not review your own work. Never merge.

You wake up in Bottega, the workshop, on branch `claude/vibrant-babbage-6fu75b`. Read `AGENTS.md` and `CLAUDE.md` there; they bind you. Then attach the project to yourself with the repository-attaching tool, owner `dniachini-droid`, repo `fashion-school-of-design`, **access `push`, not read**, and clone it into `../fashion-school-of-design`, beside Bottega's directory and never inside it. Check out `claude/the-first-page` and fetch it fresh before you push. Copy no file from Bottega into the project and none from the project into Bottega.

## The facts

- The page is `index.html`, one long page, plain HTML and CSS. `tools/build-photos.mjs` turns whatever is in `photos/` into web-sized JPEGs in `img/` and writes the photo regions into `index.html`; run it after any change to `photos/` and commit `img/` and `index.html` together. Running it twice produces the same file.
- `git` may need `-c user.email=dn.iachini@gmail.com -c user.name=dniachini-droid`.
- Screenshots at phone width (390 wide) of every section you changed go into `docs/screenshots/` and onto the pull request. Playwright and Chromium are already installed; do not run `playwright install`. Google Fonts are blocked in the container; the earlier build downloaded the font files to serve them locally for screenshots, and its notes on the pull request say how.

## The job, all nine changes, and nothing beyond them

These are the owner's words and decisions. Put them on the page exactly.

1. **No long dashes anywhere on the page.** No em dash or en dash as punctuation, anywhere in `index.html`, including the "Sent" message, which becomes "Sent. Anna will call you." Use commas, full stops or colons. Hyphens inside words such as "self-taught" stay. Check with a search for the two characters when you are done, and say what it found.
2. **The desk photo goes behind the headline.** `photos/IMG_1232.HEIC` is Anna at her cutting table. Rename it in git to `photos/hero.HEIC`, run the build, and confirm the build's own report says `hero:hero.jpg` and that the grid no longer contains it.
3. **First screen**, the line under the headline becomes: "Pattern drafting the Italian way. Small classes in Woodville South. Bring your ideas, leave with a garment that's actually yours." And on its own line beneath it, in the same style as that line or slightly smaller: "No commercial patterns, ever". The ticker keeps its shorter wording.
4. **What you will do.** The heading stays. The intro line "Five sessions, three hours each. Roughly, one session at a time:" becomes "During your lessons at Fashion School of Design, you'll learn:". The five bullets become, in order: "How to take your own measurements, properly, and your first block drawn with the SITAM rule." / "The skirt: drafted from your block, cut, and fitted on you." / "The bodice: darts, balance, and the shape you actually are." / "The sleeve, and then a design of your own on top of it." / "Cutting, sewing and finishing it, so you walk out with something you can wear." The sentence after the bullets stays: "This is the shape of the first SITAM book. Anna will tell you where your own class goes next."
5. **What is SITAM?** Both paragraphs are replaced. First: "SITAM was born in Padova, in the north of Italy, in 1946. The Padovani family had been tailors for generations, and they wanted a way for anyone, not just a trained cutter, to make clothes that truly fit. So they designed a beautifully simple tool: a curved ruler where each curve is a part of you. The shoulder, the armhole, the sleeve. You take a handful of your own measurements, follow the curves, and a pattern appears on the paper that was drawn for your body and nobody else's." Second: "Eighty years on, it's still taught the same way, from the same numbered books, and it still feels a little like magic the first time it works. Anna learned it at sixteen. She has been teaching it for forty years, and she has never found anything that fits better."
6. **Anna.** Both paragraphs are replaced. First: "Anna has been making clothes since she was four years old, and she has never really stopped. She taught herself first, then worked in couture, and at sixteen she found the SITAM method. From that day on she has never used a bought pattern again." Second: "Over the years she has made wedding dresses, suits, children's clothes, detailed costumes and high fashion, and for the last forty she has been teaching other people to do the same, one small class at a time. Some of her former students now run their own labels; some work at Paolo Sebastian. Most just make clothes they love wearing. She'd be happy to help you do any of them."
7. **The form button** says "Send", not "Send it".
8. **Remove the line "Or just ring Anna:"** and the number under it at the bottom of the form section; it repeats the number already given in the "Sent" message. The number stays in the "Sent" message and in the footer.
9. **The certificate line.** Its last sentence, "It is a certificate from SITAM in Italy, and that is all it is.", becomes "It is a certificate from SITAM in Italy, not an Australian qualification, and not pretending to be."

Nothing else on the page changes. Not the layout, not the colours, not the form fields, not the other copy.

## Finish

1. Run the build, take the screenshots, commit, push to `claude/the-first-page`. No second pull request.
2. Comment on #1: what changed, what you watched (the dash search result, the build's hero line, the screenshots), and what you did not do. Then say whether you finished, stopped early, or are blocked.
