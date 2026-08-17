# DataLink — DB Schema

Single table, minimal, proves read + write only.

```sql
CREATE TABLE visits (
  id          SERIAL PRIMARY KEY,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Access pattern

- **Write:** `INSERT INTO visits (message) VALUES ($1) RETURNING id;`
- **Read:** `SELECT id, message, created_at FROM visits ORDER BY id;`

Both run via `pg` parameterized queries — no raw string interpolation.

## Notes

- No RLS here — this is a single-tenant demo script, not a Supabase
  project with client-facing access. RLS rule from global Vibe-Shield
  applies to Supabase-backed apps; DataLink connects directly via `pg`
  with DB credentials the app host holds, not a public anon key.
- No migrations tooling for this demo (one-table, one-time script) — if
  DataLink ever gets reused inside CertFlow Cloud (Track B), migrate
  this to a proper additive-migration flow at that point.
