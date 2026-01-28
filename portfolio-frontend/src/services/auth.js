import axios from 'axios';

// Detecta automáticamente si usa Render o Localhost
// Usamos la variable de entorno, y si falla, apuntamos directamente a Render
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portafolio-rod-final.onrender.com/api';
const API_URL = `${API_BASE_URL}/auth`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error en el servicio de login:", error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('userToken');
};

export const getToken = () => {
  return localStorage.getItem('userToken');
};


// update