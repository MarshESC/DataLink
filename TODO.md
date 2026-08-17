# DataLink — Build Checklist

Track A demo #7. Plan docs in `context/` — read those before touching
infra. Light Doc Standard README when done (see aws-learning-plan.md).

## AWS Console setup
- [ ] Create `datalink-app-sg` security group (inbound 22 from My IP only)
- [ ] Create `datalink-rds-sg` security group (inbound 5432, source =
      `datalink-app-sg`, not a CIDR)
- [ ] Launch RDS PostgreSQL (db.t4g.micro, free tier, single-AZ,
      publicly accessible = No, SG = `datalink-rds-sg`)
- [ ] Launch EC2 t3.micro app host (Amazon Linux 2023, same VPC, SG =
      `datalink-app-sg`), key pair for SSH
- [ ] Confirm RDS SG shows zero `0.0.0.0/0` inbound rules

## App
- [ ] SSH into app host, install Node.js
- [ ] Create `app/` folder, `npm init`, install `pg`
- [ ] Write `app/index.js`: connect via env vars, INSERT one row into
      `visits`, SELECT all rows, print
- [ ] Create `visits` table (see `context/db/schema.md`) — run via
      `psql` or the script itself on first run
- [ ] `.env` for DB creds, add to `.gitignore` (never commit)
- [ ] Run script, verify insert + select output in terminal

## Verify + document
- [ ] Screenshot: RDS console SG rules (proves no public access)
- [ ] Screenshot or terminal capture: script output (insert + select)
- [ ] Write README (Light Doc Standard: what it does, services used,
      screenshots, one learning/gotcha sentence)
- [ ] Push repo to GitHub (`github.com/MarshESC/DataLink` or similar)
- [ ] Update `~/.claude/aws-learning-plan.md` checklist: mark #7 done,
      add repo link + date

## Teardown
- [ ] Delete RDS instance (skip final snapshot, this is a demo)
- [ ] Terminate app host EC2
- [ ] Delete both security groups
- [ ] Confirm no orphaned Elastic IPs / snapshots left behind
