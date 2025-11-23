import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

process.env.DB_NAME = 'ged_db';  // Force DB_NAME here to avoid .env confusion

import fs from 'fs';
import path from 'path';
import { pool } from './initDb.js';

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD in initDatabase.js:', JSON.stringify(process.env.DB_PASSWORD), 'type:', typeof process.env.DB_PASSWORD);

async function initDatabase() {
  try {
    // Fix sql file path relative to current file location
    const sqlFile = path.resolve(path.dirname(new URL(import.meta.url).pathname).slice(1), '..', 'db-scripts', 'init_ordered.sql');
    const sql = fs.readFileSync(sqlFile, { encoding: 'utf-8' });
    await pool.query(sql);
    console.log('✅ Base de données initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await pool.end();
  }
}

initDatabase();
