---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign's emails by lead group

Input: a campaign folder, for example `campaigns/creditx-launch`.

If no campaign folder is given, stop and list the campaign folders that exist under `campaigns/`. Write nothing.

## Steps

1. Read the unique values in the `group` column of `leads/leads.csv`. Read `leads/CLAUDE.md` for what each group means.
2. Read every email in `<campaign folder>/emails/` (files named `01-....md`, `02-....md`, and so on).
3. For each email and each group, write a version to `<campaign folder>/groups/<group>/emails/<same file name>`.

## What changes and what stays

Each version keeps the same structure, Subject, Preview, link, who-decides line, sign-off and footer as the original, character for character.

Only two things change:
- the opening line (the first sentence after the greeting), and
- one example sentence in the body, so it fits that group's situation.

Never state or hint at a person's credit score. Speak to the group's situation, not to a number. Follow `brand/voice.md` and `.claude/rules/emails.md` for every version, including the original limits on Subject and Preview length. If an example names a card with an annual fee, say the fee exists in the same sentence or the next, and never quote a rate, limit or promise approval. Use `brand/cards.md` for card facts.

## Reply

When finished, reply with a short summary only: how many files you wrote, plus one example opening line per group. Do not paste the emails.
