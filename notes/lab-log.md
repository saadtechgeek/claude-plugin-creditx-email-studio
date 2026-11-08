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

### Step 11: practice launch
- Sent each group's version of email 01 to `delivered@resend.dev`, with the group in square brackets at the start of the subject and `{{first_name}}` replaced by "there". The other placeholders were left in place.

| Group | Subject | Resend id |
|---|---|---|
| credit-builders | [credit-builders] CreditX Advisor is ready for you | `0aa8e12a-3647-4c06-aa79-10e1b5e3242a` |
| rewards-seekers | [rewards-seekers] CreditX Advisor is ready for you | `5fef4264-feb5-4eee-9c87-3acd370df48c` |
| premium-spenders | [premium-spenders] CreditX Advisor is ready for you | `637734a9-d29b-486d-8a1e-b9bb4f04ad43` |

- Check passed in a fresh session: all three show `email.delivered`; of the 6 emails the practice server holds, five went to `delivered@resend.dev` and one to the `MY_EMAIL` address (the earlier step 10 test sends), none anywhere else; each sent subject matches its group's `01-launch.md` subject apart from the tag.
- This step changed no files in the studio, so there is nothing to commit for it besides this log.
- The practice server keeps its sent list in memory. It is gone when the server stops, so the ids above only exist while that server session is running.
- Reminder: the footers still carry the raw `{{company_address}}` and `{{unsubscribe_url}}` placeholders, and the link was sent as plain text. Fill these in before any real send.
- Not done, optional: the PDF has a collapsed "send one real email to yourself" extra (not read in full). My planned version is the Gmail plus-address test described under Decisions. It needs a real Resend account and key, `RESEND_BASE_URL` pointing at real Resend, and a deliberate change to the guard to allow plus variants of `MY_EMAIL`. Not started.
- For your notes: after a send, check it by listing sent emails and looking up each status. The guard still matters after switching from practice mode to a real account, because it limits who can receive mail no matter which server is behind it.
- Part 2 (send safely, steps 9-11) is complete.

### Optional extra: real emails to my own Gmail (in progress)
- Goal: actually receive the campaign emails at `sshdtechgen@gmail.com`, using Gmail plus-addresses `sshdtechgen+<group>_<firstname>@gmail.com` (mapping in `notes/real-test-addresses.csv`, git-ignored).
- Done: loosened `.claude/hooks/send-guard.mjs` so `MY_EMAIL` also allows a plus variant of itself (same name, same domain, non-empty tag). Everything else is still blocked. Tested 10 cases directly (other Gmail, `sshdtechgen2@gmail.com`, plus on another domain, empty tag, mixed list with a bad bcc, broadcast, unset `MY_EMAIL` all blocked).
- Still needed from me, the account owner: a real Resend account made with `sshdtechgen@gmail.com` and an API key, kept only in `.claude/settings.local.json` (git-ignored) as `RESEND_API_KEY`, with `RESEND_BASE_URL` set to the real Resend API address.
- Open question: Resend's free sandbox sender (`onboarding@resend.dev`) is documented to deliver only to the account owner's own address. Plus variants may be rejected. The plan is to test one send first; if it is rejected, send to the exact address with the group in the subject tag instead.

### Optional extra: real emails to my own Gmail (done)
- Result: real emails now reach `sshdtechgen@gmail.com`. Confirmed in the inbox: "CreditX Advisor: real send test 2" from `onboarding@resend.dev`.
- Lesson 1, where settings values apply: `.mcp.json` fills `${RESEND_API_KEY:-re_practice}` and `${RESEND_BASE_URL:-http://localhost:4000}` from the environment of the shell that starts Claude, not from `.claude/settings.local.json`. The guard's `MY_EMAIL` does come from `settings.local.json`. My first two "real" test sends (ids `eaeb0b76-...` and `998b58eb-...`) therefore went to the practice server, not to Gmail, even though they showed `email.delivered`. I only found out by asking both servers for the ids: the practice server had them, real Resend did not.
- Lesson 2, how to tell which server got an email: look the id up on both. A "delivered" status alone does not prove the destination. Real Resend ids are UUIDv7 (start with `01a1...`), practice-server ids are random UUIDs.
- Lesson 3, send-only keys: my Resend API key is restricted to sending, so reading an email back from real Resend returns 401 `restricted_api_key`. That is fine for sending. Confirm arrival in the inbox.
- How a real send is run: export `RESEND_API_KEY` and `RESEND_BASE_URL` (read from `settings.local.json`) in the shell for that command only, then run `claude -p --mcp-config .mcp.json`. Without them, Claude uses the practice server, which stays the safe default. In an interactive terminal you must set those two variables yourself before starting `claude`.
- Lesson 4, plus-addresses: Resend's free sandbox rejects them. Real error: "You can only send testing emails to your own email address (sshdtechgen@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain." (HTTP 403). Plus-addresses would need a verified domain. The guard still allows plus variants, but Resend will not deliver them without a domain.
- Fallback used: the three group emails were sent to the exact address `sshdtechgen@gmail.com`, with the group in the subject tag. Body is plain text with `{{first_name}}` replaced (Ayesha, Hannah, Tom); the footer placeholders `{{company_address}}` and `{{unsubscribe_url}}` are still raw text.

| Subject | Resend id |
|---|---|
| [credit-builders] CreditX Advisor is ready for you | `01a1bb95-865d-76dd-b311-7435dee0362c` |
| [rewards-seekers] CreditX Advisor is ready for you | `01a1bb95-940b-7aaa-b9b8-64799d38c428` |
| [premium-spenders] CreditX Advisor is ready for you | `01a1bb95-a219-7962-b55c-daf9278ad785` |

- Safety: `.claude/settings.local.json` holds the key and is git-ignored. A search of every commit found no key. The sandbox can only deliver to the account owner's address, so no one else can be emailed this way.

### Step 12: resume and fork
- First attempt (invalid): in three interactive sessions the terminal command `claude -n launch-angles` was typed into the chat box instead of the shell, so Claude treated it as the request and the real Part A prompt never ran. Both forks then wrote the same file, `notes/launch-angles.md`, so fork B overwrote fork A's. No `angle-a.md`, `angle-b.md` or `handoff.md` existed. Lesson: run `claude ...` commands at the shell prompt, then paste only the prompt inside Claude. Old sessions `launch-angles`, `angle-a`, `angle-b` still exist, so the redo used new names (reusing a name gives a "matches 2 sessions" error).
- Redo, run by me headless with `claude -p` (naming, resuming and forking all work in print mode):
  - A: `claude -p -n launch-angles-2`, asked for five bullets on what each group cares about. No files written.
  - B: `claude -p --resume launch-angles-2`, asked what premium spenders care about. It remembered ("a quick, fair comparison of travel or premium cards").
  - C: `--resume launch-angles-2 --fork-session -n angle-a2`, wrote `notes/angle-a.md` (calm and in control).
  - D: `--resume launch-angles-2 --fork-session -n angle-b2`, asked first whether it knew about Angle A. Answer: "No, I don't know anything about an Angle A from our conversation." It did notice the untracked `notes/launch-angles.md` on disk (forks share files but not the conversation). It wrote `notes/angle-b.md` (options that fit you).
  - E: resumed `launch-angles-2` and wrote `notes/handoff.md` (exactly 10 lines, picks Angle B). A brand-new `claude -p` session with no resume read the handoff and wrote a final subject: "See which credit card options may fit you" (41 characters).
- First check failed twice, both real: (1) A's line 3 "You're in control: see which cards may fit" borrowed B's "see which ... may fit" idea; this was not leakage between forks (A was written before B existed, and B said it knew nothing about A) but both forks inherited the same parent context; (2) the handoff said A was "wordier" when A's lines were all 42 characters and B's ran 34-44. Fixed A line 3 to "You stay in control of your next card" (37 characters) and corrected the handoff line. Second check passed all three: 3 lines of 50 characters or fewer per file (A: 42, 42, 37; B: 34, 41, 44), no overlap between angles, handoff is 10 lines and matches the files. Commit `290f164`.
- Finding about the plan: the session reading the plan noticed that it expects emails 2-4 to be group-specific, but the email files we wrote are generic (three steps, who decides, friendly reminder), so the plan's calendar and the drafts do not line up exactly. Worth fixing or noting before a real campaign.
- Final subject line chosen: "See which credit card options may fit you". The email 01 files still say "CreditX Advisor is ready for you". Nothing was changed there. The group copies would also need updating if you adopt the new subject.
- Left alone: `notes/launch-angles.md` is the stray file from the invalid first attempt. It is untracked and not committed. Delete it if you do not want it.
- Exam points: to continue a specific earlier investigation, use `--resume <session-name>`. To compare two approaches from one shared starting point, use `fork_session` (on the command line, `--fork-session`). If the old tool results are stale, start fresh with a structured summary and name the files that changed so Claude re-checks only those.

### Step 13: automatic review
- `review/findings.schema.json`: JSON Schema for `{ "findings": [ { file, line (number), severity (high|medium|low), problem, fix } ] }`, all five fields required.
- `scripts/review.mjs <campaign folder>`: runs `claude -p "<review prompt>" --output-format json --json-schema "<schema text>" --allowedTools "Read,Glob,Grep"`. `--json-schema` takes the schema text, not a file name, so the script reads the file and passes its text. Handles output as one object or a list (takes the last `result` item), reads `structured_output`, saves `review/findings.json`, prints a one-line summary, and exits 1 if any finding is high severity. Exit 2 means the review itself failed (claude missing or failed, not JSON, or no findings list); in that case the old `findings.json` is kept.
- Windows detail: `claude` is a `.cmd` wrapper that Node cannot spawn directly, so the script finds `claude.exe` next to the wrapper (`CLAUDE_BIN` overrides this).
- Re-review: `findings.json` now stores the folder name. When the same folder is reviewed again, the earlier findings are added to the prompt: "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that were fixed."
- Test email `campaigns/test-bad/emails/01-bad.md` breaks the rules on purpose (promised approval, "fix your credit", a score read-back "Your 480 score is no problem", "last chance", two links, no who-decides line, no sign-off or footer). It is never sent.
- Runs: `test-bad` gave 9 findings (6 high at first, 7 on later runs) and exit code 1. `creditx-launch` first gave 2 medium findings and exit 0.
- Re-review test: fixed only the body promise sentence in the bad email, reran. That finding disappeared and none was repeated. The total stayed at 9 only because the reviewer split the missing sign-off and footer into two findings; the rest were still genuinely unfixed.
- Real finding in our own work: premium-spenders emails 03 and 04 (group versions) name Summit Reserve, whose minimum score in `brand/cards.md` is 800, but the group starts at 770. Not fixed yet. The final check run reported 0 findings for the same folder, so the reviewer is not consistent; the PDF warns that reviews vary a little, which is why the script only fails on high severity.
- Check passed in a fresh session: exit 1 with valid findings on `test-bad`, the second link caught (line 12), exit 0 on `creditx-launch`, and the script handles both output shapes and exits 2 if claude fails (read, not triggered).
- Commits: `f95d031` (script, schema, bad email), `b26aece` (re-review support). Slip: my first commit also swept in the stray `notes/launch-angles.md`; `b26aece` untracks it and adds it to `.gitignore`. The file itself is still on disk.
- Optional from the PDF, not done: a GitHub Actions workflow that runs the script on pull requests (needs `ANTHROPIC_API_KEY` as a repository secret; this repo has no remote).
- Exam points: `-p` runs Claude without waiting for input, which fixes a CI job that hangs. `--output-format json` with `--json-schema` gives results a program can read. `CLAUDE.md` holds the review rules for CI runs. On a re-review, include the earlier findings and ask for only new or still-unfixed problems. Not real: `CLAUDE_HEADLESS=true` and `--batch`. In the product, `--json-schema` takes the schema text, not a file name.

### Step 14: package your studio kit
- Plan mode: ran the PDF's planning prompt with `claude -p --permission-mode plan` (read-only, nothing written until accepted). The plan listed the files, what changes from the originals and what will not work outside this studio. Plan accepted. Owner name: first chosen "CreditX Studio", later changed to "Studio Kit Team" (see below).
- Built `../studio-kit` (a folder beside `my-email-studio`, outside its git repo; not a git repo itself):
  - `.claude-plugin/plugin.json` (name `studio-kit`, version 0.1.0) and `.claude-plugin/marketplace.json` (plugin listed with source `./`).
  - `skills/personalize/SKILL.md`: copied, with CreditX specifics made general (campaign example, "private detail behind a group" instead of credit score, product facts file in `brand/`), plus a first step that stops if `leads/leads.csv`, `leads/CLAUDE.md` or `brand/voice.md` is missing.
  - `hooks/hooks.json` (PreToolUse on `mcp__resend__.*`, command uses `${CLAUDE_PLUGIN_ROOT}`, plugin `{ "hooks": ... }` layout) and `hooks/send-guard.mjs` (byte-identical copy of the studio's guard).
  - `agents/email-reviewer.md`: subagent with `tools: Read, Glob, Grep`, reads `brand/voice.md`, `.claude/rules/*.md` and the emails, reports file, line, severity, problem, fix.
  - `review/findings.schema.json` (copy) and `scripts/review.mjs` (finds the schema next to the script, because an installed plugin runs from a cache folder; generic prompt wording).
  - `README.md`: what is inside, how to install, and why brand voice, leads and campaigns stay in each client's own repo (they hold one client's voice, claims and customer data).
- `claude plugin validate`: passed. First run warned about a missing marketplace description (fixed by adding `metadata.description`). Still reported but not fixed: no LICENSE (only matters for plugin-directory submission) and no icon (optional).
- Second client `../client-two` (own git repo): made-up bakery Rise & Crumb with `brand/voice.md` (warm and cheerful, no health claims, signs off "Fresh from the oven,"), `CLAUDE.md` with `@brand/voice.md`, `leads/leads.csv` (6 people, groups `weekend-bakers` and `coffee-lovers`, all `@example.com`), `leads/CLAUDE.md` plus a Groups section, `.claude/rules/emails.md` and `.mcp.json` copied and adapted (footer and link `https://riseandcrumb.example/spring`, CreditX "who decides" bullet removed), and `campaigns/spring-bake/emails/01-hello.md`. Commit `8173170`. studio-kit was not installed there; it was loaded with `--plugin-dir`.
- Test in client-two (`claude -p --plugin-dir ../studio-kit ...`):
  - Plugin loaded: skill `studio-kit:personalize` and agent `studio-kit:email-reviewer` visible.
  - Personalize: wrote one version per group (2 files, `weekend-bakers` and `coffee-lovers`); only the opening line and one example differ. Committed in client-two.
  - Send guard: the kit's hook blocked a send to the first lead. Message: "send-guard: blocked. nadia.brooks@example.com is not allowed. Only addresses ending in @resend.dev, or my own email (MY_EMAIL, with or without a +tag), may receive mail."
  - Search of `../studio-kit` for CreditX: first run found 2 matches, both the owner name I had put in the manifests. Renamed to "Studio Kit Team"; a search for CreditX or Kettlebird now finds nothing.
- Things that will not travel to a new client (from the plan): the guard only fires if the client's `.mcp.json` names the server `resend`; `MY_EMAIL` must be set in each client's environment; the skill and reviewer expect the studio's folder layout (`brand/voice.md`, `leads/leads.csv`, `leads/CLAUDE.md`, `campaigns/<name>/emails/`, `.claude/rules/emails.md`); the hook and script need `node`, and the script needs the `claude` CLI (the `claude.exe` lookup is Windows-specific, `CLAUDE_BIN` overrides it); the allowlist is fixed (`@resend.dev` plus `MY_EMAIL`); installing from GitHub needs a push first; installing the kit in this studio too would run the guard twice (harmless).
- Not done: the PDF's optional `claude --plugin-dir ../studio-kit` interactive session (tested headless instead), and running `review.mjs` from the kit (the studio's own copy was tested in step 13).
- Exam points: use plan mode when a task is large, has several valid approaches, involves design decisions or touches many files. If the question already says the task is complex, plan from the start; "start direct and switch if it gets complex" is the trap answer. Plugins themselves are not on the exam, and CLAUDE.md and rules always stay in the repo.

### Step 15: what customers love (stretch)
- Practice data: `notes/reviews/reviews-1.md` to `reviews-6.md`, 120 made-up reviews of the CreditX Advisor early beta (20 per file, first names only, stars: 12 one-star, 19 two, 26 three, 31 four, 32 five). They name cards from `brand/cards.md` and mix praise with complaints.
- Named session `review-dig` (`claude -p -n review-dig`): the main session sent the reading to a subagent, so the raw reviews never filled its context. The subagent kept `notes/scratchpad.md` (71 lines): per file, one line per finding with the file, finding, count and a short quote.
- Result, as tallied by the subagent. Top 5 loves: suggestion matched my spending (44), calm honest no-pressure tone (32), fees and terms stated clearly (20), quick and easy (19), plain explanations without jargon (18). Top 3 complaints: they want more detail (32), only one card shown (15), too slow (12). Close behind: fee unclear or buried (11), never asked about spending (10), jargon (8).
- `/compact`: sent to the resumed session as `/compact`. In print mode it printed nothing, so I cannot confirm it ran. To see it for real, run `claude -n review-dig` interactively and type `/compact`.
- Memory test: asked "which review file had the most complaints about slow answers? Quote one. Answer from memory first." Memory alone could not say which file; the scratchpad settled it: `reviews-6.md` with 4 (reviews 2, 6, 10 and 20), the others have 1-2, total 12. The session also checked the review file itself and found 4 there too. (I first planned to ask about "fee unclear", but five files tie at 2, which makes a poor question; "too slow" has a clear winner.)
- Check passed in a fresh session: every review file has a block in the scratchpad (11-12 lines each); three sampled lines were checked against the review files (quotes real, counts right). One caveat: a count like "fees stated clearly, 4" is a judgment call, since a couple more reviews could also count.
- Exam point: the warning sign is answers that stop matching earlier findings, or that talk about "typical patterns" instead of the specific things found. The fixes are scratchpad files, subagents, summaries between phases, saved state files and `/compact`. A bigger context window is never the answer. Write in the notebook as you go, not at the end, and one line per finding rather than one line per file.

## Publishing the plugin
- The `studio-kit` manifests (`.claude-plugin/plugin.json` author and `.claude-plugin/marketplace.json` owner) now carry the name "Saad Shahid", taken from the git settings, and the public email saad.shahid@outlook.com (author in `plugin.json`, owner in `marketplace.json`). `claude plugin validate` passes. A search of the kit for CreditX or Kettlebird finds nothing.
- Still needed before publishing to the plugin directory: a license (the validator says it requires a LICENSE file or an SPDX `license` in `plugin.json`). The icon is optional. Nothing has been published or pushed anywhere; `studio-kit` is not a git repo and nothing has been uploaded.
