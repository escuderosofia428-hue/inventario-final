# Plan técnico — Sistema de Gestión y Control de Inventario

## Arquitectura
- Frontend: React + TypeScript + Vite.
- Backend: Node.js + Express + TypeScript.
- Persistencia: PostgreSQL.
- Capas: rutas/controladores HTTP, validación y reglas de negocio en backend, acceso SQL mediante `pg`.
- Autenticación: JWT de 8 horas; contraseñas con bcrypt.

## Modelo de datos
- `usuarios`: id, usuario único, clave_hash, creado_en.
- `productos`: id, nombre obligatorio, precio >= 0, stock >= 0, stock_minimo >= 0, creado_en.
- `movimientos`: id, producto_id, tipo ENTRADA/SALIDA, cantidad > 0, fecha, usuario_id.

## API
| Método | Ruta | Uso |
|---|---|---|
| POST | /api/auth/login | Autenticar administrador |
| GET | /api/products?q= | Listar/buscar productos |
| POST | /api/products | Crear producto y registrar stock inicial como entrada |
| PUT | /api/products/:id | Modificar nombre, precio y stock mínimo; el stock se modifica con movimientos |
| DELETE | /api/products/:id | Eliminar producto sin movimientos |
| GET | /api/movements | Consultar historial |
| POST | /api/movements | Registrar entrada o salida |
| GET | /api/health | Verificar API y conexión a PostgreSQL |

## Ubicación de reglas
- Nombre obligatorio y valores no negativos: validación Zod y restricciones SQL.
- Identificador único: clave primaria serial.
- Entrada/salida: transacción SQL que bloquea la fila del producto (`FOR UPDATE`).
- Salida superior al stock: rechazada antes de actualizar.
- Registro de cada cambio de stock: tabla movimientos; el stock inicial se registra como entrada.
- Stock bajo: `stock <= stock_minimo`, calculado al consultar.
- No se elimina un producto con movimientos, para no perder historial.

## Seguridad
- Rutas de productos y movimientos requieren JWT.
- Contraseñas con hash bcrypt (12 rondas).
- Límite de intentos de inicio de sesión.
- CORS configurado por `FRONTEND_URL`.
- Secretos en `.env`, excluido de Git.

## Decisiones y límites
- Se utiliza la hora del servidor PostgreSQL (`NOW()`) para los movimientos.
- La fecha se genera automáticamente; no se permite editarla desde la pantalla.
- El primer administrador se crea mediante el script `npm run seed`.
- El proyecto local no queda publicado por crear el repositorio: se requieren los pasos de despliegue descritos en `documentos/despliegue.md`.
