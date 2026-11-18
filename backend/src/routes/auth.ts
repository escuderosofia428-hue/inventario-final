import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
const router = Router();
router.post('/login', async (req, res) => {
  const parsed = z.object({ usuario: z.string().min(1), clave: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Completá usuario y contraseña.' });
  const result = await pool.query('SELECT id, usuario, clave_hash FROM usuarios WHERE usuario=$1', [parsed.data.usuario]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(parsed.data.clave, user.clave_hash))) return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET || '', { expiresIn: '8h' });
  res.json({ token, usuario: user.usuario });
});
export default router;
