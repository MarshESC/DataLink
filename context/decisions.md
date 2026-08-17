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
