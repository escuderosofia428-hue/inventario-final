import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';
const router = Router();
const productSchema = z.object({ nombre:z.string().trim().min(1).max(120), precio:z.coerce.number().min(0), stock:z.coerce.number().int().min(0), stock_minimo:z.coerce.number().int().min(0) });
router.get('/', async (req,res) => {
 const q = String(req.query.q || '').trim();
 const result = await pool.query(`SELECT id,nombre,precio::float,stock,stock_minimo,(stock <= stock_minimo) AS stock_bajo FROM productos WHERE nombre ILIKE $1 ORDER BY nombre`, [`%${q}%`]);
 res.json(result.rows);
});
router.post('/', async (req:AuthRequest,res) => { const p=productSchema.safeParse(req.body); if(!p.success) return res.status(400).json({error:'Revisá nombre, precio, stock y stock mínimo.'}); const client=await pool.connect(); try { await client.query('BEGIN'); const r=await client.query('INSERT INTO productos(nombre,precio,stock,stock_minimo) VALUES($1,$2,$3,$4) RETURNING *',[p.data.nombre,p.data.precio,p.data.stock,p.data.stock_minimo]); if(p.data.stock>0) await client.query("INSERT INTO movimientos(producto_id,tipo,cantidad,usuario_id) VALUES($1,'ENTRADA',$2,$3)",[r.rows[0].id,p.data.stock,req.user?.id||null]); await client.query('COMMIT'); res.status(201).json(r.rows[0]); } catch(e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); } });
router.put('/:id', async (req,res) => { const id=Number(req.params.id); const p=z.object({nombre:z.string().trim().min(1).max(120),precio:z.coerce.number().min(0),stock_minimo:z.coerce.number().int().min(0)}).safeParse(req.body); if(!Number.isInteger(id)||id<1||!p.success) return res.status(400).json({error:'Datos del producto inválidos.'}); const r=await pool.query('UPDATE productos SET nombre=$1,precio=$2,stock_minimo=$3 WHERE id=$4 RETURNING *',[p.data.nombre,p.data.precio,p.data.stock_minimo,id]); if(!r.rowCount) return res.status(404).json({error:'Producto no encontrado.'}); res.json(r.rows[0]); });
router.delete('/:id', async (req,res) => { const id=Number(req.params.id); try { const r=await pool.query('DELETE FROM productos WHERE id=$1 RETURNING id',[id]); if(!r.rowCount) return res.status(404).json({error:'Producto no encontrado.'}); res.status(204).end(); } catch { res.status(409).json({error:'No se puede eliminar: el producto tiene movimientos registrados.'}); } });
export default router;
