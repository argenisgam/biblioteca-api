# Biblioteca API

API Express para autenticación, autorización y gestión de libros, lectores y préstamos.

## Inicio

1. Instala dependencias con `npm install`.
2. Copia `.env.example` como `.env` y configura la conexión a MySQL, un `JWT_SECRET` aleatorio y el origen del frontend. No compartas ni subas `.env`.
3. Define `ADMIN_INITIAL_USERNAME`, `ADMIN_INITIAL_EMAIL` y `ADMIN_INITIAL_PASSWORD` en ese entorno local. La contraseña inicial debe tener al menos 12 caracteres.
4. Crea la cuenta inicial y sus roles/permisos con `npm run admin:create`.
5. Si necesitas una cuenta de consulta, define `USER_INITIAL_USERNAME`, `USER_INITIAL_EMAIL` y `USER_INITIAL_PASSWORD`, y ejecuta `npm run user:create`.
6. Inicia la API con `npm run dev`.

El comando de inicialización no imprime ni almacena la contraseña en el código. Si el email o el nombre de usuario ya existen, se detiene sin modificar la cuenta.
La cuenta estándar se limita al permiso de consulta de libros.

## Acceso

- `POST /auth/login` y `POST /auth/register` son rutas públicas. El registro público siempre crea una cuenta con rol `Usuario`, asociada a un lector; no permite escoger roles ni permisos.
- Envía el token JWT en `Authorization: Bearer <token>` para las demás rutas.
- El token vence después de una hora.
- `Administrador` puede gestionar libros, lectores y préstamos.
- `Usuario` solo puede consultar libros.
- Al crear un lector desde el panel, se crea en una transacción una cuenta de acceso asociada con el rol `Usuario`. La contraseña se almacena con hash; para compartirla con el lector, entrégala por un canal seguro.

La autenticación y los permisos se verifican en la API; ocultar acciones en el frontend no sustituye esos controles.
