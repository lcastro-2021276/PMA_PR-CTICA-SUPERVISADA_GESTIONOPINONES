# Gestor de Opiniones API

Backend desarrollado en **Node.js** con **Express** y **MongoDB** para gestionar usuarios, publicaciones y comentarios, con autenticación basada en JWT.

---

##  Arquitectura del Sistema

## Cómo funciona

- **Usuarios:** pueden crear cuenta, entrar con su correo o nombre de usuario, y su contraseña se guarda de forma segura.
- **Publicaciones:** se pueden crear, editar, borrar y ver. Cada usuario solo puede modificar sus propias publicaciones.
- **Comentarios:** los usuarios pueden comentar en publicaciones, siempre respetando que solo pueden editar o borrar sus comentarios.
- **Seguridad:** se usa **JWT** para proteger rutas y asegurar que solo los dueños del contenido puedan modificarlo.

---

## Tecnologías usadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT para autenticación
- Bcrypt para encriptación de contraseñas
- Helmet y CORS para seguridad
- Morgan para logging
- Dotenv para configuración de variables de entorno

---
 Rutas principales
Públicas

| Método | Ruta                  | Descripción         |
| ------ | --------------------- | ------------------- |
| POST   | /api/v1/auth/register | Registrar usuario   |
| POST   | /api/v1/auth/login    | Login y obtener JWT |

Protegidas (requieren JWT)

| Método | Ruta             | Descripción          |
| ------ | ---------------- | -------------------- |
| GET    | /api/v1/users    | Listar usuarios      |
| POST   | /api/v1/users    | Crear usuario        |
| GET    | /api/v1/posts    | Listar publicaciones |
| POST   | /api/v1/posts    | Crear publicación    |
| GET    | /api/v1/comments | Listar comentarios   |
| POST   | /api/v1/comments | Crear comentario     |

