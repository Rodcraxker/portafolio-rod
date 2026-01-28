import React from 'react';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: "Arquitectura NoSQL: Por qué elegí MongoDB para este Portafolio",
    date: "24 de Enero, 2026",
    excerpt: "Un análisis profundo sobre la flexibilidad de los esquemas BSON y la escalabilidad horizontal en entornos modernos.",
    content: `Elegir la base de datos correcta es fundamental para cualquier proyecto de software. Para este portafolio desarrollado en macOS, opté por MongoDB sobre soluciones relacionales tradicionales como SQL Server o PostgreSQL por tres razones clave: escalabilidad de esquema, rendimiento en lectura y su naturaleza JSON-friendly. 

    En un contexto de **Ingeniería Civil**, por ejemplo, donde los datos de un proyecto pueden variar desde coordenadas GPS hasta archivos adjuntos de planos estructurales, la flexibilidad de MongoDB permite evolucionar el modelo de datos sin tiempos de inactividad por migraciones de tablas. A diferencia de las bases de datos SQL, donde un cambio en la estructura requeriría una migración compleja, MongoDB nos permite almacenar documentos BSON. Esto significa que si mañana decido que mis proyectos necesitan un campo de 'Metadata Técnica' adicional, simplemente lo inserto. La integración nativa con Node.js a través de Mongoose facilita el mapeo de objetos, eliminando la fricción de los ORM tradicionales.`
  },
  {
    id: 2,
    title: "Seguridad en APIs: Implementación de JWT y Middleware Defensivo",
    date: "25 de Enero, 2026",
    excerpt: "Cómo proteger un backend Node.js utilizando Helmet, Rate Limiting y autenticación basada en tokens.",
    content: `La seguridad no es una característica, es un proceso. En el backend de esta aplicación, implementamos una estrategia de defensa en capas. La primera capa es Helmet.js, que configura cabeceras HTTP seguras.

    En el sector de la **Jurisprudencia y LegalTech**, la integridad de los datos es sagrada. Imagina un sistema de gestión de juicios; el acceso no autorizado podría alterar evidencias. Para mitigar esto, usamos JSON Web Tokens (JWT). Al no usar sesiones en el servidor, nuestra API es stateless. Los tokens se firman con una clave secreta (JWT_SECRET). Además, configuramos 'express-rate-limit' para evitar ataques de fuerza bruta que intenten adivinar contraseñas de abogados o jueces, restringiendo el tráfico por IP y asegurando que la infraestructura se mantenga resiliente ante intentos de denegación de servicio.`
  },
  {
    id: 3,
    title: "REST vs GraphQL: Eficiencia en la Transferencia de Datos",
    date: "26 de Enero, 2026",
    excerpt: "Comparativa técnica entre paradigmas de comunicación y por qué REST sigue siendo el estándar para portafolios.",
    content: `En el desarrollo de APIs modernas, la elección entre REST y GraphQL define cómo los clientes consumen información. En este proyecto, utilizamos REST (Representational State Transfer) debido a su simplicidad y excelente soporte para caché.

    Consideremos un sistema de **Salud y Telemedicina**. En una aplicación que muestra el historial clínico de un paciente, REST permite endpoints claros como '/api/pacientes/:id/historial'. Sin embargo, GraphQL brillaría si el médico necesitara pedir solo la presión arterial y nada más para ahorrar ancho de banda en zonas rurales con mala conexión. 
    
    Código de ejemplo REST en Express:
    app.get('/api/projects', async (req, res) => {
      const data = await Project.find();
      res.json(data);
    });

    Conclusión Personal: Para este portafolio, REST es superior porque no enfrentamos el problema de 'Over-fetching' (traer demasiados datos) y la implementación con Express es directa, permitiendo un manejo de errores centralizado mucho más limpio.`
  },
  {
    id: 4,
    title: "Uso de Variables de Entorno y Gestión de Secretos en Producción",
    date: "27 de Enero, 2026",
    excerpt: "Guía práctica para proteger credenciales en servicios como Render y Vercel.",
    content: `El manejo de secretos es la piedra angular de la seguridad en producción. Nunca, bajo ninguna circunstancia, se deben subir archivos .env a repositorios públicos de GitHub. En este proyecto, gestionamos claves como MONGO_URI y JWT_SECRET a través de las configuraciones de entorno de la plataforma.

    En una agencia de **Marketing Digital**, donde se gestionan múltiples APIs de terceros (Google Ads, Facebook Meta), perder una API Key por subirla al código puede costar miles de dólares en facturación no autorizada. Utilizamos la librería 'dotenv' para desarrollo local y las variables del panel de control de Render para producción.
    
    Ejemplo de implementación segura:
    // backend/config/db.js
    const mongoose = require('mongoose');
    const connectDB = async () => {
      await mongoose.connect(process.env.MONGO_URI); // La URL nunca está en el código
    };

    Para este portafolio, el uso de variables de entorno garantiza que aunque el código sea público (requisito del entregable), la base de datos de MongoDB Atlas permanezca privada y protegida contra inyecciones y accesos externos no autorizados.`
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 pt-32">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-cyan-400 hover:underline mb-8 block font-bold">← Volver al Inicio</Link>
        <h1 className="text-5xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Blog Técnico Profesional
        </h1>
        
        <div className="space-y-16">
          {posts.map(post => (
            <article key={post.id} className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-2xl">
              <span className="text-cyan-500 text-sm font-mono font-bold uppercase tracking-widest">{post.date}</span>
              <h2 className="text-4xl font-bold mt-4 mb-6 text-white">{post.title}</h2>
              <p className="text-slate-300 italic text-lg mb-8 border-l-4 border-purple-500 pl-4">{post.excerpt}</p>
              <div className="text-slate-400 space-y-6 leading-relaxed text-justify whitespace-pre-line">
                {post.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;