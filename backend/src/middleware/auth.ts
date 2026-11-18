import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export interface AuthRequest extends Request { user?: { id: number; usuario: string } }
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Debés iniciar sesión.' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || '') as { id: number; usuario: string };
    next();
  } catch { return res.status(401).json({ error: 'Sesión vencida. Volvé a iniciar sesión.' }); }
}
