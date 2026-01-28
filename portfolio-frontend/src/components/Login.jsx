import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin'); // Te manda al panel si todo sale bien
    } catch (err) {
      setError('Credenciales incorrectas o servidor caído');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-xl border border-cyan-500">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Contraseña" 
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded transition">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;