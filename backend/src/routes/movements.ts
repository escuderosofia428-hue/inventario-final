import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';
const router=Router();
router.get('/', async (_req,res)=>{ const r=await pool.query(`SELECT m.id,m.producto_id,p.nombre AS producto,m.tipo,m.cantidad,m.fecha FROM movimientos m JOIN productos p ON p.id=m.producto_id ORDER BY m.fecha DESC,m.id DESC LIMIT 500`); res.json(r.rows); });
router.post('/', async (req:AuthRequest,res)=>{
 const parsed=z.object({producto_id:z.coerce.number().int().positive(),tipo:z.enum(['ENTRADA','SALIDA']),cantidad:z.coerce.number().int().positive()}).safeParse(req.body);
 if(!parsed.success) return res.status(400).json({error:'Elegí un producto y una cantidad entera mayor que cero.'});
 const {producto_id,tipo,cantidad}=parsed.data; const client=await pool.connect();
 try { await client.query('BEGIN'); const pr=await client.query('SELECT id,stock FROM productos WHERE id=$1 FOR UPDATE',[producto_id]); if(!pr.rowCount){await client.query('ROLLBACK');return res.status(404).json({error:'Producto no encontrado.'});} const stock=Number(pr.rows[0].stock); if(tipo==='SALIDA'&&cantidad>stock){await client.query('ROLLBACK');return res.status(400).json({error:`Stock insuficiente. Disponible: ${stock}.`});} const nuevo=tipo==='ENTRADA'?stock+cantidad:stock-cantidad; await client.query('UPDATE productos SET stock=$1 WHERE id=$2',[nuevo,producto_id]); const mov=await client.query('INSERT INTO movimientos(producto_id,tipo,cantidad,usuario_id) VALUES($1,$2,$3,$4) RETURNING *',[producto_id,tipo,cantidad,req.user?.id||null]); await client.query('COMMIT'); res.status(201).json({...mov.rows[0],stock_actual:nuevo}); }
 catch(e){await client.query('ROLLBACK'); throw e;} finally{client.release();}
});
export default router;
