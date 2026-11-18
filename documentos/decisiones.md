# Decisiones del proyecto

- Se conserva el alcance definido en `spec.md`.
- Se utiliza React y TypeScript para la interfaz.
- Se utiliza Node.js, Express y TypeScript para la API.
- Se utiliza PostgreSQL para persistir usuarios, productos y movimientos.
- Las contraseñas se almacenan mediante hash bcrypt.
- El acceso a las rutas privadas se protege con JWT.
- Los cambios de stock se hacen únicamente mediante movimientos, para que exista historial.
- Se rechazan las salidas que superan el stock disponible.
- Se conserva el historial impidiendo eliminar productos que ya tengan movimientos.
- Las credenciales y claves se guardan en variables de entorno y no se suben a GitHub.
