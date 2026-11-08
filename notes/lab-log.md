# Email Studio Lab: progress log

Source: `2026-11-08_035953.pdf` (Email Studio Lab Assignment FDE-102, 15 steps) in `02-assignment/`.
Studio folder: `C:\MyComputer\11-my-learning\04-SSUET\02-FDE102\00-assignment\my-email-studio\` (local git, branch `master`, no remote).
Brand: **CreditX Advisor** (made-up, from project 07 of the AGENTIC projects). It replaces the PDF's sample, Kettlebird Tea / The Steep Club.

## Decisions made along the way

| Decision | Choice |
|---|---|
| Brand | CreditX Advisor, an AI advisor that suggests credit cards by score and spending |
| Audience | Busy working adults, 28-52, at three credit stages |
| Lead groups | `credit-builders` (under 670), `rewards-seekers` (670-769), `premium-spenders` (770+) |
| Campaign link | `https://creditx.example/advisor` |
| Footer | "You're getting this because you joined the CreditX Advisor waitlist." / "CreditX Advisor, {{company_address}} · Unsubscribe: {{unsubscribe_url}}" |
| Sign-off | "Here to help you choose well, / The CreditX Advisor team" |
| `MY_EMAIL` (step 10) | `sshdtechgen@gmail.com` (goes only in `.claude/settings.local.json`, never committed) |
| Real inbox testing | Optional extra after step 11: Gmail plus-addresses `sshdtechgen+<group>_<firstname>@gmail.com`, kept in `notes/real-test-addresses.csv` (git-ignored). `leads.csv` stays `@example.com` so lab checks pass. |
| How checks run | Each CHECK prompt runs in a fresh headless process (`claude -p`), so the checker did not write the work |

## Step log

### Step 0: prep (no PDF step)
- Node v24.16, Git 2.54, Claude Code 2.1.311, all fine.
- Created the studio folder and ran `git init`.

### Step 1: look before you build
- Searched skills.sh for email marketing, email sequence, campaign plan and resend. Nothing installed.
- Use: `anthropics/knowledge-work-plugins` (about 35K stars, official) and `resend/resend-skills` (official, 211 stars).
- Avoid: `caffeinelabs/skills` (about 30.5K installs but 2 stars) and `samber/dev-event-organizer-skills` (4 stars, wrong purpose).
- Output: `notes/skills-i-chose.md`.
- Check: passed. It caught one claim I could not support, an account creation date, and I corrected it.
- Exam point: for a standard need, use an existing source first and build your own only for work special to your team. Judge by publisher and stars, not install counts.

### Step 2: set up the studio
- Installed `marketing@knowledge-work-plugins` at project scope. This wrote `.claude/settings.json`.
- Created `brand/`, `leads/`, `campaigns/`, `notes/`, plus `CLAUDE.md` and `.gitignore` (ignores `.claude/settings.local.json` and system files).
- Commit `b29b663`. Check passed: scope is project, plugin skills visible (`campaign-plan`, `email-sequence`, `brand-review`), a classmate gets the plugin via the committed settings, and the local settings file is ignored.
- Exam point: team standards live at project level (`CLAUDE.md`, `.claude/settings.json`). Personal files (`~/.claude/CLAUDE.md`, `settings.local.json`) never reach teammates.

### Step 3: brand voice (plus card catalog)
- Added `brand/cards.md`: 15 made-up cards (the app's 9 plus 6 new ones) with score bands, fees, rates and a guide for which score gets which card. Rates and fees are practice numbers.
- Interviewed on 6 questions and wrote `brand/voice.md`: voice (clear, calm, fair), words to use and avoid, six claims we must never make, and the sign-off.
- `CLAUDE.md` imports `@brand/voice.md` and `@brand/cards.md`.
- Commit `153dafc`. Check passed: a fresh session wrote a launch subject without opening any file and named `voice.md` as the source. It refused the "get you approved" subject line.
- Exam point: `@import` keeps `CLAUDE.md` small. The interview pattern is for unfamiliar work. `/memory` or `/context` shows which memory files are loaded.

### Step 4: campaign plan
- Ran `/marketing:campaign-plan` with the goal 300 waitlist members start using CreditX Advisor in the first month, about 2,000 people in three groups, 4 weeks from Mon 2026-12-07, small budget, email only.
- Output: `campaigns/creditx-launch/plan.md` (11 sections, 10 emails plus 1 internal report, all with real dates).
- Commits `22bbb38` and `bd5989b`. Check passed all four tests. It found one inconsistency: the plan avoided Dec 24 but offered it as an open slot. Fixed, so the open slot is Tue 2026-12-29 only.
- Open decisions for you: what "start using" means (suggested: finishing the first step and seeing a card suggestion), group sizes (suggested 40/40/20), and whether to use the Dec 29 slot.
- Exam point: type `/marketing:campaign-plan` with nothing after it to see the hint. That hint comes from the skill's `argument-hint`.

### Step 5: practice leads
- `leads/leads.csv`: 24 made-up people, 8 per group, exact columns `first_name,last_name,email,group,joined_on,consent`, all `@example.com`.
- `leads/CLAUDE.md`: folder-only rules (made-up people only, never real addresses, every row needs consent, never change the `@example.com` addresses, no scores stored).
- Commit `75a1e89`. Check passed: 24 people, 8 per group, no repeats, every row has a date and consent. A pretend request to add a real Gmail address was refused, quoting the rule.
- Exam point: when prose instructions get misread, give 2-3 input/output examples. A `CLAUDE.md` inside a subfolder loads when Claude works on files in that folder.

### Step 6: email rule and sequence
- `.claude/rules/emails.md` with `paths: "campaigns/**/emails/*.md"`. It requires a subject of 50 characters or fewer, a preview of 90 or fewer, a `{{first_name}}` greeting, exactly one link, the who-decides line, the sign-off and the plain-text footer. Commit `c459a47`.
- Four emails in `campaigns/creditx-launch/emails/`: `01-launch`, `02-three-steps`, `03-who-decides`, `04-friendly-reminder`. Written by `/marketing:email-sequence`. Commit `4bc0090`.
- Check passed. Measured subjects of 26-33 characters, previews of 61-78, one link in each, and no avoided words.
- Exam point: for conventions that apply to files spread across folders, use `.claude/rules/` with `paths:` patterns. A subfolder `CLAUDE.md` covers one folder only. A skill only works when someone runs it.

### Step 7: fresh-eyes review
- A new session ran `/marketing:brand-review` on the emails. It found 10 findings by severity, none high, two medium (both in email 3).
- All fixed in one message. `brand/voice.md` now says contractions are fine. Commit `e745eb7`.
- Check passed: Glob found 4 emails, Grep found no backticks or avoided words, the last commit touched only the four emails and `voice.md`, and the footer is plain text.
- Still for you to confirm before any real send: the privacy practice (removed from email 3), whether "typically takes a few minutes" is true, and whether the reply address is monitored. `{{company_address}}` and `{{unsubscribe_url}}` are unfilled placeholders.
- Exam point: the session that wrote something rarely questions it, so review in a fresh session. Fixes that affect each other go in one detailed message. Glob finds files by name, Grep finds text inside files.
