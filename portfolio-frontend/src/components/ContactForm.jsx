import { useForm } from "react-hook-form";
import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setStatus({ loading: true, message: "", type: "" });

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ 
          loading: false, 
          message: "¡Mensaje enviado con éxito! 🚀", 
          type: "success" 
        });
        reset(); 
      } else {
        throw new Error(result.message || "Error al enviar");
      }
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      setStatus({ 
        loading: false, 
        message: "Error de conexión con el servidor ❌", 
        type: "error" 
      });
    }
  };

  return (
    <section id="contacto" className="max-w-2xl mx-auto bg-slate-900/80 border border-purple-500/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
      
      {/* Mensajes de feedback visual */}
      {status.message && (
        <div className={`p-4 mb-6 rounded-xl text-sm font-bold text-center animate-pulse ${
          status.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Nombre</label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            disabled={status.loading}
            placeholder="Tu nombre"
            className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
              errors.name ? 'border-red-500' : 'border-slate-800'
            } ${status.loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
        </div>

        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Email</label>
          <input
            type="email"
            disabled={status.loading}
            placeholder="tu@email.com"
            {...register("email", { 
              required: "Email requerido",
              pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
            })}
            className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
              errors.email ? 'border-red-500' : 'border-slate-800'
            } ${status.loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>

        {/* Campo Mensaje */}
        <div>
          <label className="block text-sm font-medium text-purple-400 mb-2">Mensaje</label>
          <textarea
            disabled={status.loading}
            placeholder="Cuéntame sobre tu proyecto..."
            {...register("message", { 
              required: "El mensaje no puede estar vacío", 
              minLength: { value: 10, message: "Mínimo 10 caracteres" } 
            })}
            className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                status.loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
          ></textarea>
          {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
        </div>

        {/* Botón de envío */}
        <button 
          type="submit" 
          disabled={status.loading}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
            status.loading 
            ? 'bg-slate-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-purple-500/20 active:scale-95'
          }`}
        >
          {status.loading ? "Enviando..." : "Enviar Mensaje 🚀"}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;