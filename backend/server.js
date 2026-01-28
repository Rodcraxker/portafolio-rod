const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// --- IMPORTACIÓN DE MODELOS ---
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const User = require('./models/User');

const app = express();

// --- 1. CONFIGURACIÓN DE CORS MANUAL (DEBE IR PRIMERO) ---
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Responde 200 al preflight inmediatamente
  }
  next();
});

// --- 2. MIDDLEWARES DE SEGURIDAD ---
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { message: "Demasiados intentos, por favor intente más tarde." }
});
app.use('/api/', limiter);

// --- 3. CONEXIÓN A LA BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexión segura a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión:', err));

// --- 4. RUTAS PÚBLICAS ---

app.get('/', (req, res) => {
    res.send('🚀 Servidor de Rod funcionando correctamente');
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor funcionando 🚀' });
});

// LOGIN (Procesa la entrada del Admin)
app.post('/api/auth/login', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, message: "Bienvenido, Rod" });
  } catch (error) {
    next(error);
  }
});

// OBTENER PROYECTOS (Para el Portafolio)
app.get('/api/projects', async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.json(projects);
    } catch (error) {
        next(error);
    }
});

// FORMULARIO DE CONTACTO
app.post('/api/contact', [
  body('name').trim().notEmpty().escape(),
  body('email').isEmail().normalizeEmail(),
  body('message').isLength({ min: 10 }).escape()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ success: true, message: '¡Mensaje guardado! 🚀' });
  } catch (error) {
    next(error);
  }
});

// --- 5. RUTAS ADMINISTRATIVAS ---

app.get('/api/admin/messages', async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/messages/:id', async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Mensaje no encontrado" });
    res.json({ success: true, message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    next(error);
  }
});

// --- 6. MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});