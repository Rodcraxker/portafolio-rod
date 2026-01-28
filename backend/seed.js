const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: "Aivance",
    description: "Plataforma de Inteligencia Artificial para el análisis predictivo y procesamiento de datos en tiempo real.",
    technologies: ["React", "Node.js", "Python", "Tailwind"],
    link: "https://github.com/rodmunoz/aivance"
  },
  {
    title: "RDTWare",
    description: "E-commerce de alto rendimiento especializado en hardware gamer, componentes y laptops de gama alta.",
    technologies: ["React", "MongoDB", "Express", "Node.js"],
    link: "https://github.com/rodmunoz/rdtware"
  },
  {
    title: "PixlVibe",
    description: "Aplicación creativa para la gestión de contenido visual y vibras digitales con una interfaz moderna.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "VinilRod",
    description: "Sistema integral de inventario y catalogación para coleccionistas de discos de vinilo.",
    technologies: ["React", "Context API", "CSS Neon"],
    link: "#"
  },
  {
    title: "CedulaCheck",
    description: "Algoritmo de validación de identidad basado en lógica matemática para verificación de cédulas ecuatorianas.",
    technologies: ["JavaScript", "Algorithms", "Regular Expressions"],
    link: "#"
  },
  {
    title: "BioFit Calc",
    description: "Calculadora de salud profesional que analiza el índice de masa corporal y métricas biométricas.",
    technologies: ["React", "UI/UX", "Mathematical Logic"],
    link: "#"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Conectando a MongoDB para sembrar datos...");
    
    // 1. Borramos lo que exista para no duplicar
    await Project.deleteMany({});
    console.log("🗑️  Base de datos de proyectos limpiada.");

    // 2. Insertamos los nuevos
    await Project.insertMany(projects);
    console.log("✅ ¡Éxito! Se han insertado " + projects.length + " proyectos.");
    
    process.exit(); // Cerramos el proceso
  })
  .catch(err => {
    console.error("❌ Error durante el semillado:", err);
    process.exit(1);
  });