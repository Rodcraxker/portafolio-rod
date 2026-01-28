# Documentación de la API (RESTful)

Base URL: `https://portafolio-rod-final.onrender.com`

## 🔐 Autenticación
### `POST /api/auth/login`
- **Descripción:** Valida credenciales y entrega un token JWT.
- **Body (JSON):** `{ "email": "...", "password": "..." }`
- **Respuesta:** `200 OK` con `{ "token": "..." }`

## 📁 Proyectos
### `GET /api/projects`
- **Descripción:** Obtiene la lista de proyectos destacados del portafolio.
- **Respuesta:** `200 OK` - Array de objetos de proyectos.

## 📩 Contacto
### `POST /api/contact`
- **Descripción:** Guarda un nuevo mensaje de contacto en la base de datos.
- **Body (JSON):** `{ "name": "...", "email": "...", "message": "..." }`
- **Validaciones:** Email real, mensaje min. 10 caracteres (Express-validator).

## 🛡️ Administración (Privado)
### `GET /api/admin/messages`
- **Descripción:** Obtiene todos los mensajes de contacto. (Requiere Auth).
### `DELETE /api/admin/messages/:id`
- **Descripción:** Elimina un mensaje específico por su ID.