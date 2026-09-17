repo:            https://github.com/dniachini-droid/zibaldone
branch:          claude/the-clock
head:            7c8afe2fceecd17218eb1c8357adffee880415c1
status:          clean
diffstat:        15 files changed, 1229 insertions(+)
pull-request:    23
done-looks-like: - A schedule at GitHub runs the filing and then the noticing, once a night, at
  a time that is the middle of his night in Australia, and he can also start a
  night by hand.
- The filing and the noticing run as the two skills in `.claude/skills/`, with
  no change to what either of them does.
- The noticing's counting road is unchanged, and a night on which it finds
  nothing goes to the reading road instead, so a night ends with an article
  written unless something broke.
- A night that broke goes red, and writes no article to cover it.
- Two nights never overlap, and a night he starts by hand never runs beside the
  scheduled one.
- Before anything is opened or written, a check refuses the night if any of the
  settings he pasted is missing or misshapen, and names every one of them at
  once rather than one per night.
- Nothing in any log, remote or failure message contains the passphrase, the
  token for his mind, or the token the night thinks with.
- His mind is not in this repository and not in the notebook's.
- A page in his own words says what happens each night, what it costs him in
  Australian dollars, and exactly what he pastes in once; and something holds
  that page and the schedule to each other so a setting renamed in one cannot
  leave the other saying the old name.
- Every fault the checks above catch has been watched failing and then passing,
  with what was seen written in `docs/REFUSALS.md`.
- The whole suite is green.
