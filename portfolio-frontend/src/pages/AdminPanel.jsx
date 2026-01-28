import React, { useState, useEffect } from 'react';
import { logout, getToken } from '../services/auth'; // Importamos getToken
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configuración dinámica de URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL_ADMIN = `${API_BASE_URL}/admin/messages`;

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('messages');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = getToken(); // Obtenemos el token almacenado
      const res = await axios.get(API_URL_ADMIN, {
        headers: { Authorization: `Bearer ${token}` } // Seguridad JWT
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error cargando mensajes del servidor:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      try {
        const token = getToken();
        await axios.delete(`${API_URL_ADMIN}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        alert("No se pudo eliminar el mensaje. Verifica la conexión.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* NAVBAR */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-white/5 p-6 shadow-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter">
              ROD_ADMIN
            </h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Gestión de Sistemas v1.0</p>
          </div>
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <span>Cerrar Sesión</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex gap-4 mb-12 bg-slate-900/30 p-1.5 rounded-2xl w-fit border border-white/5">
          <button 
            onClick={() => setTab('messages')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${tab === 'messages' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            Buzón ({messages.length})
          </button>
          <button 
            onClick={() => setTab('profile')}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${tab === 'profile' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-slate-400 hover:text-white'}`}
          >
            Hoja de Vida
          </button>
        </div>

        {/* CONTENIDO MENSAJES */}
        {tab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              Mensajes Recibidos
            </h2>
            
            {loading ? (
              <div className="text-center py-20 text-slate-500 animate-pulse">Cargando base de datos...</div>
            ) : messages.length === 0 ? (
              <div className="bg-slate-900/50 border border-dashed border-slate-800 p-20 rounded-[2.5rem] text-center">
                <p className="text-slate-500">No se encontraron mensajes en la base de datos.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div key={msg._id} className="group bg-slate-900/40 border border-slate-800/50 p-6 rounded-[2rem] flex justify-between items-center hover:border-cyan-500/30 transition-all hover:bg-slate-900/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white">{msg.name}</span>
                        <span className="text-xs font-mono text-cyan-500/70">{msg.email}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed italic">"{msg.message}"</p>
                    </div>
                    <button 
                      onClick={() => deleteMessage(msg._id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;