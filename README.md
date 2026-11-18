# Sistema de Gestión y Control de Inventario

Aplicación web con React + TypeScript (frontend), Node.js + Express + TypeScript (backend) y PostgreSQL.

## Requisitos
- Node.js 20 o superior
- PostgreSQL 15 o superior

## Preparación local en Windows
1. Instalar PostgreSQL y crear una base de datos llamada `inventario_db`.
2. Abrir `backend`, copiar `.env.example` y pegarlo como `.env`.
3. Editar `backend/.env`: poner la contraseña real del usuario PostgreSQL en `DATABASE_URL`, cambiar `JWT_SECRET` por una clave larga y elegir `ADMIN_PASSWORD` (mínimo 8 caracteres).
4. Abrir una terminal dentro de `backend` y ejecutar `npm install`, después `npm run migrate`, después `npm run seed` y finalmente `npm run dev`.
5. Abrir otra terminal dentro de `frontend`, ejecutar `npm install`, copiar `.env.example` como `.env` y ejecutar `npm run dev`.
6. Abrir `http://localhost:5173`.

Usuario/clave iniciales: los valores `ADMIN_USER` y `ADMIN_PASSWORD` de `backend/.env`.

## Funcionalidades incluidas
- Autenticación con contraseña hasheada (bcrypt) y token JWT.
- Alta, consulta, búsqueda, modificación y eliminación restringida de productos.
- Precio, stock actual y stock mínimo con validaciones.
- Entradas y salidas transaccionales; las salidas no permiten stock negativo.
- Historial con producto, tipo, cantidad y fecha.
- Identificación de productos con stock igual o inferior al mínimo.
- El stock se modifica mediante movimientos; el stock inicial queda registrado como entrada.
- Protección de endpoints, limitación de intentos de login y credenciales fuera del repositorio.

## Importante
No subir archivos `.env` a GitHub. Antes de publicar, configurar variables de entorno en el proveedor de hosting y una base PostgreSQL administrada. Consultar `documentos/despliegue.md`.
