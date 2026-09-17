Build session for pull request #1 in https://github.com/dniachini-droid/fashion-school-of-design, branch `claude/the-first-page`. #1 is already open as a draft — do not open another. Do not review your own work. Never merge.

You wake up in Bottega, the workshop, on branch `claude/vibrant-babbage-6fu75b`. Read `AGENTS.md` and `CLAUDE.md` there; they bind you. Then attach the project to yourself with the repository-attaching tool — owner `dniachini-droid`, repo `fashion-school-of-design`, **access `push`, not read** — and clone it into `../fashion-school-of-design`, beside Bottega's directory and never inside it. Every command for the project runs from that directory. Copy no file from Bottega into the project — not the rules, not the skills, not the scope page, not the tools. Copy no file from the project into Bottega.

## The facts

- The project repository has one empty commit on the branch and a README from GitHub on `main`. Nothing else exists yet. You are building the first version of a website from scratch.
- `git` may need `-c user.email=dn.iachini@gmail.com -c user.name=dniachini-droid`.
- The reference for the look is `projects/fashion-school-of-design/look.dc.html` in Bottega: the page the owner and Anna chose, drawn at phone width. Open it to see the structure, the type and the colours. It is a mock-up in a drawing format, not a web page — rebuild it as a real one, do not copy the file. Its essentials: fonts **Anton** for headings and **Work Sans** for text, from Google Fonts; colours black `#0E0E0E`, red `#FF3B1F`, white, text grey `#2A2A2A`; a black first screen with the headline in red condensed capitals; a red ticker strip; three white boxes with a thick black border and a red line icon; big red numbers; a black quote block; a black footer.
- Plain HTML and CSS, one page, no framework. A tiny build step is fine if it is what makes the photo grid come from the folder.
- Hosting is **Netlify**, deploying from this repository, with **Netlify Forms** for the enquiry — it emails the submission and filters spam, and Anna needs no account. You cannot connect the Netlify account yourself. Build so that the owner connects it in a few clicks, and write those clicks into the pull request in plain words: which button, what to type, and where he enters `anna.iachini@gmail.com` as the address the form notifies. You cannot watch that email arrive; say so rather than claiming it works.
- The owner adds photos by dropping files into a folder called `photos/` on GitHub and doing nothing else. Make that folder, with a one-line note in it saying what goes there. The site picks the photos up on the next deploy. The folder may be empty when you build; the page must look deliberate, not broken, when it is.
- Screenshots at phone width (390 wide) go on the pull request: the first screen, the boxes, the form, the empty photo grid. Playwright and Chromium are already installed; do not run `playwright install`.

## The job — the whole job, and nothing beyond it

## What it does

Anna teaches the SITAM method of pattern drafting from her studio in Woodville
South, Adelaide. The website tells someone who she is and what the course is,
shows what her students have made, and lets them ask for the free one-hour
orientation. Anna gets the enquiry by email and calls them back.

Who it is for: half young people who want to learn fashion, many of them
straight out of TAFE; half people who cannot get clothes to fit from a shop;
and anyone else at all. Not hundreds of students. The right ones.

The owner and Anna chose the look on 17 September 2026 from five drawn pages:
**number 3, "The Cover", with the three boxes from number 4 drawn in its
style** — black first screen, "MAKE IT FIT." in red condensed capitals, a
ticker strip of the facts, then three bordered boxes: *Fitted to you*, *Six
people, one teacher*, *Everything is here*. The chosen page is the fifth
artboard on the canvas at https://claude.ai/artifact/S9SbffZzEw4xctJGyNTRsA
and its source is `Combined.dc.html` there. Build what that page shows.

## What done looks like

One long page, live on the internet at a free address, that works on a phone.
On it, top to bottom:

1. **The black first screen.** "MAKE IT FIT." in red, one line under it, and
   the free-hour button — all visible on a phone without scrolling. A real
   photo fills the screen behind it once the owner has put one in `photos/`;
   until then, plain black.
2. **The ticker strip** — no commercial patterns · groups of 6 · $220 · 5 × 3
   hrs — and the **three boxes**, in the style of the chosen page.
3. **What SITAM is**, warm, not technical, and not in Anna's words verbatim:
   it began in Padova in 1946, when the Padovani family, tailors for
   generations, devised a simple curved rule that draws a pattern from a
   handful of your own measurements; still taught from the same numbered
   books; simple, quick, and the clothes fit because they were drawn for you.
   Anna learned it at sixteen and has taught it for forty years.
4. **What you will do**, in the same warm register: five short lines, one
   per session, so a stranger can picture the course. **Write them yourself**
   as the sensible progression of SITAM's first book — measuring yourself and
   drawing your first block with the SITAM rule; the skirt; the bodice; the
   sleeve and a design of your own; cutting, sewing and finishing it to wear.
   The owner decided on 17 September 2026 that this is written now and Anna
   corrects it afterwards, so say on the pull request that it is yours and
   hers to check, and say nothing on the page that claims it is her syllabus.
5. **The numbers**: 40 years teaching · 6 per class · 0 shop patterns.
6. **Anna**: a photo slot and a paragraph. Dressmaking since she was four,
   self-taught, worked in couture, SITAM since sixteen, forty years of
   teaching; wedding dresses, menswear, children's clothes, high fashion; her
   former students run their own labels and work at Paolo Sebastian. **Her
   age is never stated.**
7. **The facts of the course**, somewhere on the page, exactly these: five
   sessions of three hours, once or twice a week, groups of six, $220; private
   lessons two hours, $150; industrial and domestic machines and overlockers
   in the studio, bring your own if you prefer; fabric there to buy or advice
   on where to buy it; finish book one and a certificate is issued and mailed
   by SITAM in Italy, Anna being accredited by SITAM to assess. **The site
   never calls the certificate a qualification, accredited training, or
   anything that implies Australian recognition.** It says what it is: a
   certificate from SITAM in Italy.
8. **What her students make**: a grid of photos from `photos/`. If the folder
   is empty the grid shows labelled slots, not broken images.
9. **One testimonial slot**, marked as coming, with no invented words in it.
10. **The enquiry form**: name, phone, email, what they would like to make,
   whether they have sewn before, whether they came through TAFE. Someone
   completes it on a phone in under two minutes and sees "Sent — Anna will
   call you." **Anna receives it as an email at anna.iachini@gmail.com** with
   every field readable. Her number, 0433 353 612, sits under the form for
   anyone who would rather ring. Spam is filtered before it reaches her.
11. **Footer**: Instagram @Fashion_school_of_design linked, "Woodville South,
    South Australia". **No street address anywhere on the site.**
12. A **video slot** and a **certificate photo slot**, laid out, empty, and
    not ugly while empty.

And these, which no single section owns:

- A stranger on a phone understands within fifteen seconds that this is not an
  ordinary sewing class and that the first hour is free.
- It works on a phone first. Screenshots at phone width go on the pull request.
- Anna never opens anything technical to use it. No account, no login, no
  dashboard. Enquiries arrive in her email and nowhere else.
- No student's face or name appears except from `photos/`, which the owner
  fills with photos he has permission for.
- It loads fast. No framework the page does not need.
- Hosting is free and the form is handled by the host's own form service.
  Which host, and what the owner has to do once to connect it, is written in
  the pull request in plain words.
- The site's own address is a free one. A bought domain comes later.

## What is out

- A booking calendar.
- Online payment, deposits, a shop, or fabric for sale online.
- Italian.
- Accounts, logins, or a back end of any kind for Anna.
- A second page. One long page only.
- The video itself. The slot is built; the file does not exist yet.
- A blog, news, or anything that needs updating on a schedule.
- Any copying between this repository and the workshop, in either direction.

## Finish

1. Commit, push to `claude/the-first-page`. No second pull request.
2. Update #1's body: what you built, what you watched happen (with the screenshots), what you could not verify and why, the Netlify steps for the owner, and what you did not do.
3. Take #1 out of draft, then **comment saying whether you finished, stopped early, or are blocked.**
