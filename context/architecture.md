# DataLink — Architecture

## Components

- **VPC:** default VPC (simplest — this demo's focus is RDS + SG, not
  custom networking; NetSegment already covered custom VPC).
- **RDS PostgreSQL** — db.t4g.micro (or db.t3.micro if t4g unavailable
  in region), single-AZ, 20GB gp2/gp3 storage, free tier.
  - Publicly accessible: **No**.
  - Security group `datalink-rds-sg`: inbound 5432 from
    `datalink-app-sg` only.
- **EC2 "app host"** — t3.micro, Amazon Linux 2023, same VPC/subnet
  group as RDS (or any subnet with route to RDS's subnet).
  - Security group `datalink-app-sg`: inbound 22 from My IP only.
  - Node.js installed, runs the connection script.
- **App script** — `app/index.js`, uses `pg` client, reads DB
  connection info from environment variables (never hardcoded — see
  Vibe-Shield rule "Safety: t3-env / env validation" and "Secrets" rule).

## Data flow

1. SSH into app host from local machine (My IP only).
2. Run `node app/index.js`.
3. Script connects to RDS endpoint on 5432 (allowed because app host's
   SG is referenced in RDS SG's inbound rule).
4. Script inserts one row into `visits`, then selects all rows, prints
   them.

## Security notes

- RDS never exposed to `0.0.0.0/0` — SG-to-SG reference only, same
  pattern used in NetSegment (demo #6).
- DB credentials passed via environment variables on the app host, not
  committed to the repo (`.env` gitignored).
- Parameterized queries only (`pg`'s `$1`/`$2` placeholders) — no string
  interpolation into SQL.

## Diagram (text form)

```
[Local machine] --SSH(22, My IP only)--> [EC2 app host] --5432(SG ref)--> [RDS Postgres]
```
