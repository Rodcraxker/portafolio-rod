const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // Evita que guardes proyectos sin nombre
  },
  description: { 
    type: String, 
    required: true // La descripción es clave para el SEO y el usuario
  },
  technologies: {
    type: [String], // Array de strings (ej: ["React", "Node.js"])
    default: []
  },
  link: { 
    type: String, 
    default: "#" // Si no hay link, apunta a un ancla por defecto
  },
  image: { 
    type: String, 
    default: "" // URL de la imagen del proyecto
  },
  date: { 
    type: Date, 
    default: Date.now // Se llena solo con la fecha actual
  }
});

module.exports = mongoose.model('Project', ProjectSchema);