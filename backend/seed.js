const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Importación de Modelos
const Project = require('./models/Project');
const User = require('./models/User');

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

const seedDatabase = async () => {
  try {
    // 1. Conexión a la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Conectado a MongoDB Atlas para sembrado completo...");

    // --- SECCIÓN PROYECTOS ---
    await Project.deleteMany({});
    console.log("🗑️  Base de datos de proyectos limpiada.");
    
    await Project.insertMany(projects);
    console.log(`✅ ¡Éxito! Se han insertado ${projects.length} proyectos.`);

    // --- SECCIÓN ADMINISTRADOR ---
    const adminEmail = "rodmunoz28@gmail.com";
    const adminPassword = "Rod2801@"; 

    // Verificamos si ya existe para no duplicar
    const existingUser = await User.findOne({ email: adminEmail });
    
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const newAdmin = new User({
        email: adminEmail,
        password: hashedPassword
      });

      await newAdmin.save();
      console.log('🚀 ¡Admin creado con éxito!');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
    } else {
      console.log('⚠️ El usuario administrador ya existe en la base de datos.');
    }

    console.log("✨ Proceso de sembrado finalizado correctamente.");
    process.exit();

  } catch (error) {
    console.error("❌ Error durante el semillado:", error);
    process.exit(1);
  }
};

seedDatabase();