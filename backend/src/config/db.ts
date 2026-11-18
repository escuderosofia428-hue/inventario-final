import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL en el archivo .env');
export const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined });
