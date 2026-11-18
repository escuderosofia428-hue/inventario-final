# Despliegue (cuando la versión local esté probada)

La guía del curso propone GitHub público, Neon para PostgreSQL, Render para Express y Netlify para React.

1. Publicar el repositorio en GitHub como público. Verificar antes que no se incluya ningún `.env`.
2. Crear una base PostgreSQL en Neon y copiar su cadena de conexión privada.
3. Crear un Web Service en Render conectado al repositorio, con raíz `backend`, comando de build `npm install && npm run build` y comando de inicio `npm start`.
4. Configurar en Render: `DATABASE_URL` (cadena de Neon), `JWT_SECRET` (clave aleatoria larga), `FRONTEND_URL` (se completa después de crear Netlify), `ADMIN_USER` y `ADMIN_PASSWORD`. Si Neon exige SSL, agregar `DATABASE_SSL=true`.
5. Ejecutar la migración y la creación del administrador inicial contra la base de Neon desde una terminal local con `DATABASE_URL` apuntando a Neon: `npm run migrate` y `npm run seed` dentro de `backend`. No publicar el valor de la cadena.
6. Crear el sitio en Netlify conectado al repositorio, directorio base `frontend`, comando de build `npm run build` y directorio de publicación `dist`.
7. En Netlify definir `VITE_API_URL` con `https://TU-SERVICIO.onrender.com/api` y volver a desplegar.
8. Copiar el dominio de Netlify y colocarlo como `FRONTEND_URL` en Render. Guardar y volver a desplegar el backend.
9. Probar el enlace público: login, alta de producto, entrada, salida, intento de salida excesiva e historial.

No completar el informe como aprobado hasta ejecutar realmente las pruebas. Los nombres y paneles de los proveedores pueden cambiar.
