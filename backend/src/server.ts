import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import rateLimit from 'express-rate-limit'; import dotenv from 'dotenv';
import auth from './routes/auth'; import products from './routes/products'; import movements from './routes/movements'; import {requireAuth} from './middleware/auth'; import {pool} from './config/db';
dotenv.config(); const app=express(); app.use(helmet()); app.use(cors({origin:process.env.FRONTEND_URL||'http://localhost:5173'})); app.use(express.json()); app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:30}));
app.get('/api/health',async(_req,res)=>{await pool.query('SELECT 1');res.json({ok:true,mensaje:'API e inventario conectados'});}); app.use('/api/auth',auth); app.use('/api/products',requireAuth,products); app.use('/api/movements',requireAuth,movements);
app.use((err:Error,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);res.status(500).json({error:'Error interno del servidor.'});});
const port=Number(process.env.PORT||4000); app.listen(port,()=>console.log(`Backend listo en http://localhost:${port}`));
