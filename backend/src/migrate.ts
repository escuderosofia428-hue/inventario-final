import fs from 'node:fs'; import path from 'node:path'; import {pool} from './config/db';
async function main(){const sql=fs.readFileSync(path.join(__dirname,'../database/schema.sql'),'utf8'); await pool.query(sql); console.log('Tablas creadas correctamente.'); await pool.end();} main().catch(e=>{console.error(e);process.exit(1)});
