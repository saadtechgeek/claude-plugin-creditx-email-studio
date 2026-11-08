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

### Step 8: your own skill, `personalize`
- Built `.claude/skills/personalize/SKILL.md` with the exact front matter the exam asks about: `name`, `description`, `argument-hint: "[campaign folder]"`, `context: fork`, `allowed-tools: Read, Glob, Grep, Write`. Commit `4af3de1`.
- With no folder given, the skill stops and lists the campaign folders. With a folder, it reads the groups from `leads/leads.csv`, then writes one version of each email per group to `<campaign>/groups/<group>/emails/` (same file names).
- Ran `/personalize campaigns/creditx-launch` in a new process so the skill was loaded. It wrote 12 files and replied with a short summary only (a count plus one opening line per group). The raw emails stayed out of the chat because of `context: fork`. Commit `2f4e7de`.
- Check passed: 12 files; every version differs from its original on exactly two lines (the opening and one example); subjects 26-33 characters and previews 61-78; one link each; plain-text footer; no forbidden words, scores or approval promises. Card examples with annual fees say so.
- One side effect to know about: in email 01 the example sentence replaced "There is no pressure and no spreadsheet." in all three groups, so that sentence is gone from the group versions. Say so if you want it back.
- Example opening lines for email 01: credit-builders: "Building credit is a big step, and we're glad you're here." rewards-seekers: "Getting more back from everyday spending is what we're here to help with." premium-spenders: "If you want travel perks or one strong card, you're in the right place."
- Exam points: `context: fork` runs the skill in its own context, so long output stays out of your chat. `argument-hint` tells you what to type when you run it with no arguments. `allowed-tools` pre-approves the listed tools in the product, and other tools still ask permission (on the exam, answer "restricts"). A personal copy goes in `~/.claude/skills/` under a different name so it doesn't clash with the team's. Not real: a `.claude/config.json` file with a commands list.

### Step 9: connect Resend in practice mode
- Started the practice server in the background: `npx emulate@0.12.3 start --service resend` (http://localhost:4000, prints "Ready."). It must be running for steps 9-11. If it stops, start it again. "Connection refused" means it isn't running.
- Created `.mcp.json` with the exact content from the PDF: server `resend` run with `npx -y resend-mcp@2.27.1`, and `env` values `${RESEND_API_KEY:-re_practice}`, `${RESEND_BASE_URL:-http://localhost:4000}`, `${SENDER_EMAIL_ADDRESS:-onboarding@resend.dev}`.
- Updated the sending rule in `CLAUDE.md`: sending through Resend is allowed only to `@resend.dev` addresses and to my own address (the `MY_EMAIL` variable), and a hook will enforce it (step 10). The address itself is not written in `CLAUDE.md`. Commit `c4a1c7c`.
- Check passed (a fresh session loaded the server through `--mcp-config .mcp.json`, since a headless run cannot answer the approval prompt): sent "Connection test" to delivered@resend.dev, got email id `83af7a3c-ba47-46e9-9a1f-641e0303c113`, the list showed `email.delivered`, no real key (`re_` plus a long string, other than `re_practice`) anywhere in the repo or its history, and `.mcp.json` is committed.
- In your own interactive session: start `claude` in the studio, approve the `resend` server when asked, then type `/mcp` and you should see resend connected.
- What happens if you set nothing: the defaults apply, so mail goes to the practice server on your computer and nothing leaves it. To send for real you would set `RESEND_API_KEY` to a real key, set `RESEND_BASE_URL` to the real Resend address (the default points at localhost), and set `SENDER_EMAIL_ADDRESS` to an address Resend allows. The key stays in your environment, never in the repo.
- Exam points: a team's servers live in `.mcp.json`, which is committed. Personal or experimental servers go in `~/.claude.json`. Credentials use `${VAR}` expansion so a secret never lands in the repo. `${VAR:-default}` means "use my setting if I have one, otherwise this safe value". If Claude keeps choosing Grep over an MCP tool, that tool's description is too thin.

### Step 10: the safety guard
- `.claude/hooks/send-guard.mjs`: a Node script for a `PreToolUse` hook. It reads the tool call as JSON on stdin.
  - `send-email` and `send-batch-emails`: every `to`, `cc` and `bcc` address must end in `@resend.dev` or equal `MY_EMAIL` (case-insensitive, `Name <addr>` form handled, batch messages all checked). Otherwise it prints a reason naming the address and exits with code 2, which blocks the call.
  - `send-broadcast`, `create-automation`, `send-inbox-draft`, `send-new-inbox-email`: always blocked, because they can reach whole lists.
  - Everything else: exit 0, allowed.
  - It fails closed: if the input is unreadable or a send has no recipient, it blocks. If `MY_EMAIL` is unset, only `@resend.dev` is allowed.
- Registered in `.claude/settings.json`: matcher `mcp__resend__.*`, command `node "$CLAUDE_PROJECT_DIR/.claude/hooks/send-guard.mjs"`. The existing plugin settings were kept. Commit `e969433`.
- `MY_EMAIL=sshdtechgen@gmail.com` lives in `.claude/settings.local.json` only. Git ignores it (`.gitignore` line 1), so the address is not committed.
- Tested the script directly before the real check: Ayesha blocked, `delivered@resend.dev` allowed, own email allowed in any letter case, a hidden bcc to `@example.com` blocked, a batch with one bad address blocked, broadcast blocked, `list-emails` allowed, and with `MY_EMAIL` unset the Gmail address blocked.
- Plus-addresses (`sshdtechgen+group_name@gmail.com`) are blocked on purpose, because the guard allows an exact match only. They would need a deliberate change to the guard, which is part of the optional real-send extra after step 11.
- Check passed in a fresh session through the real Resend tools: email 01 to Ayesha was blocked (message: "send-guard: blocked. ayesha.khan@example.com is not allowed. Only addresses ending in @resend.dev, or my own email (MY_EMAIL), may receive mail."), the send to `delivered@resend.dev` went through (id `5235f8d1-5ac5-4d18-ad5f-6ed1d5f7d936`), and the send to `MY_EMAIL` went through (id `eb10115d-33f6-4039-b31d-425756e45a9f`). Those two sends reached the practice server only, so nothing left the computer.
- For your notes: a CLAUDE.md rule asks Claude to behave, and a hook is a guard at the door that checks every letter before it leaves. Claude cannot talk its way past it. Exit code 2 from a hook blocks the action.
- Exam points: the guide names only `PostToolUse` (for cleaning up tool results) and describes blocking as "tool call interception" without naming the hook. In the product, `PreToolUse` is what blocks, with exit code 2 or a deny decision, and `PostToolUse` cannot block. On the exam, match the behaviour described.
