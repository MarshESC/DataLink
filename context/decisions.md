# DataLink — Decisions Log

Append-only. Most recent last.

- 2026-08-17: Chose default VPC (not a new custom VPC) for RDS + app
  host. Reason: custom VPC/subnet design already proven in NetSegment
  (demo #6); repeating it here would test nothing new and slow down a
  Track A "quick demo." Kept the SG-to-SG reference pattern from
  NetSegment though, since that's the actual learning target for this
  demo (security groups between app and DB).
- 2026-08-17: App host is a plain EC2 instance running a Node.js script
  manually via SSH, not Lambda. Reason: demo goal explicitly says
  "script or app that connects... does one read/write" — EC2 keeps the
  SG-to-SG relationship visible and simple; Lambda-in-VPC would add ENI
  cold-start complexity that doesn't serve the learning goal here.
- 2026-08-19: Switched `index.js`'s pg SSL config from
  `rejectUnauthorized: false` to `rejectUnauthorized: true` + AWS's
  RDS global CA bundle (`app/global-bundle.pem`, committed — it's a
  public cert, not a secret). Reason: `false` encrypts the connection
  but accepts any certificate, including a forged one from a MITM —
  caught by a post-push automated security review, fixed and verified
  live before continuing.
- 2026-08-19: Torn down via AWS CLI (`aws ec2 terminate-instances`,
  `aws rds delete-db-instance`, `aws ec2 delete-security-group`)
  instead of the console, once doc/proof was already captured.
  Reason: faster, and output doubled as a clean audit trail of exactly
  what got deleted (instance IDs, SG IDs) — pasted into this log and
  the learning plan checklist.
