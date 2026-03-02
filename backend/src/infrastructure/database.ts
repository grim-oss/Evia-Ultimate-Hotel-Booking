import { Pool } from 'pg';

let pool: Pool;

export async function createDatabaseConnection(): Promise<void> {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
  });

  // Test connection
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('✅ PostgreSQL connected');
  } finally {
    client.release();
  }
}

export function getPool(): Pool {
  if (!pool) throw new Error('Database not initialized. Call createDatabaseConnection first.');
  return pool;
}