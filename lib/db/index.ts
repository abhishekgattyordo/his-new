// import { Pool } from 'pg';

// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432'),
//   user: process.env.DB_USER || 'a1989',  // Changed from 'postgres' to 'a1989'
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'patient_registration',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// // Add connection test
// pool.on('connect', () => {
//   console.log('✅ Connected to PostgreSQL database');
// });

// pool.on('error', (err) => {
//   console.error('❌ Unexpected PostgreSQL error:', err);
// });

// export async function query(text: string, params?: any[]) {
//   const start = Date.now();
//   try {
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('✅ Executed query:', { text, duration, rows: res.rowCount });
//     return res;
//   } catch (error) {
//     console.error('❌ Database query error:', error);
//     throw error;
//   }
// }

// export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
//   const client = await pool.connect();
  
//   try {
//     await client.query('BEGIN');
//     const result = await callback(client);
//     await client.query('COMMIT');
//     return result;
//   } catch (error) {
//     await client.query('ROLLBACK');
//     throw error;
//   } finally {
//     client.release();
//   }
// }

// export default pool;


import { Pool, types } from 'pg';  // ✅ import types

// ✅ Override DATE type (OID 1082) to return as string (YYYY-MM-DD)
types.setTypeParser(1082, (val: string) => val);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ DATABASE_URL is not set. Using fallback local connection.');
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },   // ✅ disable certificate validation
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error:', err);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('✅ Executed query:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Database query error:', error);
    throw error;
  }
}

export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default pool;