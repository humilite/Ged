import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

console.log('Test DB_PASSWORD env:', JSON.stringify(process.env.DB_PASSWORD));

async function testConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ged_dgrh',
    user: process.env.DB_USER || 'postgres',
    password: String(process.env.DB_PASSWORD || ''),
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connexion à la base de données réussie!');
    client.release();
  } catch (err) {
    console.error('❌ Erreur de connexion:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
