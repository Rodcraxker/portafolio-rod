const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet'); 
// const mongoSanitize = require('express-mongo-sanitize'); // SE COMENTÓ POR INCOMPATIBILIDAD
const rateLimit = require('express-rate-limit'); 
require('dotenv').config();

// --- IMPORTACIÓN DE MODELOS ---
const Contact = require('./models/Contact');
const Project = require('./models/Project'); 

const app = express();

// --- 1. MIDDLEWARES DE SEGURIDAD ---

// Helmet: Configura cabeceras HTTP seguras
app.use(helmet());

// Mongo Sanitize: DESACTIVADO TEMPORALMENTE
// app.use(mongoSanitize()); 

// Rate Limit: Protege la API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { message: "Demasiados intentos, por favor intente más tarde." }
});
app.use('/api/', limiter);

// CORS: ¡OJO AQUÍ! Cambia localhost por la URL de tu portafolio en Vercel después
app.use(cors({
  origin: '*', // Cambiado a '*' temporalmente para que no te dé errores de conexión
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Body Parser
app.use(express.json({ limit: '10kb' }));

// --- 2. CONEXIÓN A LA BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexión segura a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión:', err));

// --- 3. RUTAS (Endpoints) ---

// Ruta raíz para evitar el "Internal Server Error" al entrar al link directo
app.get('/', (req, res) => {
    res.send('🚀 Servidor de Rod funcionando correctamente');
});

// Salud del servidor
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor seguro funcionando 🚀' });
});

// OBTENER PROYECTOS (GET)
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        res.status(500).json({ message: "Error al obtener proyectos" });
    }
});

// ENVIAR CONTACTO (POST)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log(`📩 Nuevo mensaje de: ${name}`);
        res.status(201).json({ success: true, message: '¡Mensaje guardado con éxito! 🚀' });
    } catch (error) {
        console.error('Error al guardar contacto:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

// --- 4. ARRANQUE DEL SERVIDOR ---
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    console.log(`🚀 Servidor Seguro corriendo en el puerto ${PORT}`);
});