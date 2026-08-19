# DataLink — Build Checklist

Track A demo #7. Plan docs in `context/` — read those before touching
infra. Light Doc Standard README when done (see aws-learning-plan.md).

Status: **done, 2026-08-19.** All resources torn down after
verification. Repo: github.com/MarshESC/DataLink

## AWS Console setup
- [x] Create `datalink-app-sg` security group (inbound 22 from My IP only)
- [x] Create `datalink-rds-sg` security group (inbound 5432, source =
      `datalink-app-sg`, not a CIDR)
- [x] Launch RDS PostgreSQL (db.t3.micro, free tier, single-AZ,
      publicly accessible = No, SG = `datalink-rds-sg`)
- [x] Launch EC2 t3.micro app host (Amazon Linux 2023, same VPC, SG =
      `datalink-app-sg`), key pair for SSH
- [x] Confirm RDS SG shows zero `0.0.0.0/0` inbound rules

## App
- [x] SSH into app host, install Node.js
- [x] Create `app/` folder, `npm init`, install `pg`
- [x] Write `app/index.js`: connect via env vars, INSERT one row into
      `visits`, SELECT all rows, print
- [x] Create `visits` table (see `context/db/schema.md`) — run via
      `psql` or the script itself on first run
- [x] `.env` for DB creds, add to `.gitignore` (never commit)
- [x] Run script, verify insert + select output in terminal

## Verify + document
- [x] Screenshot: RDS console SG rules (proves no public access)
- [x] Screenshot or terminal capture: script output (insert + select)
- [x] Write README (Light Doc Standard: what it does, services used,
      screenshots, one learning/gotcha sentence)
- [x] Push repo to GitHub (`github.com/MarshESC/DataLink`)
- [x] Update `~/.claude/aws-learning-plan.md` checklist: mark #7 done,
      add repo link + date

## Teardown
- [x] Delete RDS instance (skip final snapshot, this is a demo)
- [x] Terminate app host EC2
- [x] Delete both security groups
- [x] Confirm no orphaned Elastic IPs / snapshots left behind
