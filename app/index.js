require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, 'global-bundle.pem')).toString(),
    rejectUnauthorized: true,
  },
});

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const insertResult = await pool.query(
    'INSERT INTO visits (message) VALUES ($1) RETURNING id;',
    [`hello from datalink-app-host at ${new Date().toISOString()}`]
  );
  console.log('Inserted row id:', insertResult.rows[0].id);

  const selectResult = await pool.query(
    'SELECT id, message, created_at FROM visits ORDER BY id;'
  );
  console.log('All rows:');
  console.table(selectResult.rows);

  await pool.end();
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
