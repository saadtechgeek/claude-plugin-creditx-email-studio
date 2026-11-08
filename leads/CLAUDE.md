# Leads folder rules

These rules apply only when working with files in `leads/`.

- Everyone in `leads.csv` is a made-up practice person. Never add real people or real email addresses here.
- Every row needs a `consent` value.
- Never change the `@example.com` addresses. That domain is reserved and can never receive mail, so no real person is ever emailed.
- Keep exactly these columns: `first_name,last_name,email,group,joined_on,consent`.

## Groups

- `credit-builders`: credit scores under 670. Rebuilding credit, looking for a card that helps.
- `rewards-seekers`: credit scores 670-769. Want cash back or points on everyday spending.
- `premium-spenders`: credit scores 770 and up. Want travel perks or one top card.

Scores are never stored in this file and never appear in emails. See `brand/voice.md`.
