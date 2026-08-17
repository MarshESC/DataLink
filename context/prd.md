# DataLink — PRD

Track A, demo #7: RDS-connected app.

## Problem / Goal

Prove hands-on ability to stand up a free-tier RDS Postgres instance and
connect an app to it over a security-group-restricted path (no public DB
access). Learn: RDS setup, SG-to-SG rules between app and DB.

## Scope (MVP)

- One RDS PostgreSQL instance (db.t4g.micro or db.t3.micro, free tier),
  **not** publicly accessible.
- One small EC2 instance ("app host") in the same VPC, used only to run
  the connection script.
- One Node.js script (`app/index.js`) using `pg` that does exactly one
  write and one read:
  - INSERT a row into `visits` (message + timestamp).
  - SELECT all rows, print to stdout.
- Security group on RDS allows inbound 5432 **only** from the app host's
  security group (SG-to-SG reference, same pattern as NetSegment demo).

## Out of scope

- No frontend/UI.
- No ORM — plain `pg` client, parameterized queries only (per Vibe-Shield
  rule 4: no string interpolation in queries).
- No multi-AZ, no read replicas, no auto-scaling.
- No load balancer, no bastion beyond the single app host.

## Success criteria

- `node app/index.js` run on the app host inserts a row and prints all
  rows back, proving read + write against RDS.
- RDS security group has zero inbound rules from `0.0.0.0/0`.
- Screenshot: RDS console (SG rules), terminal output of script run.
- README written (Light Doc Standard — see aws-learning-plan.md).

## Teardown

Per learning plan discipline: once verified + documented, tear down RDS
instance and app EC2 (unlike BudgetGuard/StaticSite/etc. this one has no
ongoing public-facing value to leave running). Confirm no orphaned
Elastic IPs after.
