import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de Páginas
import Home from './pages/Home';
import Blog from './pages/Blog';
import AdminPanel from './pages/AdminPanel';

// Importación de Componentes
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Ruta principal: Tu Portafolio y CV (Requisito 7) */}
        <Route path="/" element={<Home />} />

        {/* 2. Blog Técnico: Contenido de alta calidad (Requisito 8) */}
        <Route path="/blog" element={<Blog />} />

        {/* 3. Acceso Administrativo (Requisito 4) */}
        <Route path="/login" element={<Login />} />

        {/* 4. Panel Privado: Protegido por JWT (Requisito 4 y 6) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;