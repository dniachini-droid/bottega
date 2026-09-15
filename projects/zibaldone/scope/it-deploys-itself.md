# It deploys itself

## What it does

Gets the notebook onto the internet, and keeps it there, **without the owner
ever opening a terminal.**

Merging code deploys it. He does three things in a browser, once: creates an
account at the host, copies a token, pastes it into the repository's settings.
After that every new version goes live on its own.

*Why this is a job rather than something done by hand: this is how his private
thoughts get onto the internet. A deployment done once by somebody typing
commands is a deployment nobody can repeat, check, or explain afterwards. And
the guide window cannot reach the host at all — its network policy refuses the
connection — so a hand deployment from here is not merely undesirable, it is
impossible.*

## What done looks like

- **Merging to `main` deploys the notebook.** Nothing else is needed and nobody
  types anything.
- **The passphrase is never in the repository.** It is set once as a secret at
  the host and read by the program when it starts. *Why: a passphrase in a
  repository is a passphrase in everyone's clone, in the history, forever.*
- **A page in the project's repository tells the owner exactly which buttons to
  press**, in order, in ordinary words, with no step that assumes he knows what
  anything means. He is not a software engineer and does not want to become
  one.
- **Every step that genuinely cannot be done from the host's website is named,
  with the exact single line he would paste and where to paste it.** *Why said
  rather than hidden: the guide window promised him a path with no terminal and
  then could not verify every step of it. If one step needs one command, he
  should be told which and why, not discover it at the point of failure.*
- **What was established by trying it, and what was taken from documentation,
  is marked apart.** *Why: sign-up flows and dashboards change, and a set of
  instructions that confidently names a button that is no longer there is worse
  than one that says where it was and that it may have moved.*
- **The first deployment is watched happening, and the page records what came
  back** — the address, and what the first page load looked like. *Why: "it
  should work" is not evidence it works, and this repository does not accept
  that anywhere else.*
- **It is clear what this costs**, in pounds a month, with the sleeping
  behaviour explained, so no bill is a surprise.
- **The tests still pass and nothing about the notebook itself changes.**

## What is out

- Any change to how the notebook works. This is only how it gets onto the
  internet.
- The five findings from the review of the notebook. They are recorded and were
  left alone deliberately.
- Anything for piece two — no model reading captures, no wiki, no repository as
  storage.
- Moving the application to a different host. Fly.io is chosen because the
  build already wrote its configuration; if a step proves impossible there,
  say so and stop rather than switching host unasked.
