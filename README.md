# Full-Stack Portfolio - Rod Muñoz 🚀

Portafolio profesional desarrollado como proyecto final, enfocado en escalabilidad y seguridad. Implementado bajo una arquitectura MERN (MongoDB, Express, React, Node.js).

## 🔗 Enlaces de Despliegue
- **Frontend (Vercel):** https://portafolio-rod-final.vercel.app/
- **Backend (Render):**  https://portafolio-rod.onrender.com/

## 🛠️ Tecnologías y Justificaciones

### Base de Datos: MongoDB (NoSQL)
**Justificación (Requisito 5):** Elegí MongoDB debido a su modelo de datos orientado a documentos (BSON). Para un portafolio y blog técnico, la flexibilidad es clave:
1. **Esquema Dinámico:** Permite evolucionar los posts del blog agregando metadatos (como nuevos lenguajes o categorías) sin necesidad de migraciones de tablas SQL complejas.
2. **Escalabilidad:** Se adapta perfectamente a las necesidades de un portafolio personal donde el rendimiento en lectura de documentos es prioritario.
3. **Integración:** La naturaleza JSON de MongoDB se alinea de forma nativa con el ecosistema JavaScript/Node.js.

### Seguridad (Requisito 6)
- **Autenticación:** Implementada mediante **JWT (JSON Web Tokens)** para sesiones stateless.
- **Protección de Datos:** Hashing de contraseñas con **BcryptJS**.
- **Middleware:** Uso de **Helmet** para cabeceras seguras, **CORS** restringido y **Rate Limiting** para prevenir ataques de fuerza bruta.

## 🚀 Ejecución Local
1. Clonar el repositorio.
2. En `/backend`: `npm install`, configurar `.env` y `npm start`.
3. En `/frontend`: `npm install` y `npm run dev`.