# **Gestor de Opiniones – API (Node.js / Express)**

## **Descripción**
Este proyecto corresponde al **backend completo** para un sistema de gestión de opiniones, desarrollado como una **API REST con Node.js y Express**, cuyo objetivo es manejar usuarios, publicaciones y comentarios de manera segura y eficiente.

La aplicación implementa **autenticación segura con JWT**, control de acceso por usuario y endpoints funcionales básicos, los cuales permiten crear, leer, actualizar y eliminar contenido de manera controlada.

---

## **Tecnologías utilizadas**
- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **JWT (JSON Web Tokens)**  
- **Bcrypt** (encriptación de contraseñas)  
- **Helmet y CORS** (seguridad)  
- **Morgan** (logging)  
- **Dotenv** (configuración de variables de entorno)  

---

## **Funcionalidades implementadas**
- Registro y autenticación de usuarios con **JWT**  
- Creación, edición y eliminación de **publicaciones**  
- Creación, edición y eliminación de **comentarios**  
- Control de acceso: cada usuario solo puede modificar sus propios contenidos  
- Seguridad reforzada en rutas protegidas  
- Listado de usuarios, publicaciones y comentarios  

---

## **Rutas principales**

### **Públicas**
| **Método** | **Ruta**                  | **Descripción**       |
| ---------- | ------------------------ | ------------------- |
| **POST**   | `/api/v1/auth/register`   | Registrar usuario    |
| **POST**   | `/api/v1/auth/login`      | Login y obtener JWT  |

### **Protegidas (requieren JWT)**
| **Método** | **Ruta**             | **Descripción**           |
| ---------- | ------------------ | ----------------------- |
| **GET**    | `/api/v1/users`      | Listar usuarios         |
| **POST**   | `/api/v1/users`      | Crear usuario           |
| **GET**    | `/api/v1/posts`      | Listar publicaciones    |
| **POST**   | `/api/v1/posts`      | Crear publicación       |
| **GET**    | `/api/v1/comments`   | Listar comentarios      |
| **POST**   | `/api/v1/comments`   | Crear comentario        |

---

## **Estructura general del proyecto**
GestorOpiniones.API  
│  
├── **Controllers** – manejo de rutas y endpoints  
├── **Models** – esquemas de MongoDB (usuarios, posts, comentarios)  
├── **Middleware** – autenticación y seguridad (JWT, validaciones)  
├── **Routes** – definición de rutas públicas y protegidas  
├── **Services** – lógica de negocio  
└── **app.js / server.js** – archivo principal de configuración y arranque  

---

## **Autor**
Luis Fernando Castro Xicon - 2021276
