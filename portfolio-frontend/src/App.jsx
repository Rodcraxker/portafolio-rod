import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import { 
  SiDjango, SiReact, SiNodedotjs, SiGithub, 
  SiAmazonwebservices as SiAmazonaws, SiMongodb, 
  SiTailwindcss, SiJavascript 
} from "react-icons/si";
import './index.css'; 

function App() {
  // Estado inicial con descripciones extendidas
  const [projects, setProjects] = useState([
    { 
      title: "Aivance", 
      description: "Plataforma de IA de vanguardia diseñada para optimizar procesos empresariales mediante modelos predictivos complejos y análisis de Big Data en tiempo real.", 
      technologies: ["React", "Python", "TensorFlow", "Node.js"] 
    },
    { 
      title: "RDTWare", 
      description: "E-commerce de alto rendimiento para el sector gaming. Implementa pasarelas de pago seguras, gestión dinámica de inventario y una experiencia de usuario ultra rápida.", 
      technologies: ["Node.js", "MongoDB", "Express", "Stripe API"] 
    },
    { 
      title: "VinilRod", 
      description: "Aplicación premium de gestión para coleccionistas. Permite catalogar, valorar y organizar discografías completas con integración de APIs de música globales.", 
      technologies: ["React", "Tailwind", "Firebase"] 
    },
    { 
      title: "PixlVibe", 
      description: "Ecosistema visual para creadores de contenido. Enfocado en la estética y la fluidez, permite la gestión de portafolios digitales con animaciones de alto nivel.", 
      technologies: ["Framer Motion", "React", "Cloudinary"] 
    },
    { 
      title: "CedulaCheck", 
      description: "Herramienta técnica especializada en la validación de identidades mediante algoritmos matemáticos de verificación para documentos oficiales ecuatorianos.", 
      technologies: ["JavaScript", "Algorithms", "Backend Logic"] 
    },
    { 
      title: "BioFit Calc", 
      description: "Calculadora de salud biométrica que analiza el índice de masa corporal y otros indicadores clave para el seguimiento del rendimiento físico.", 
      technologies: ["React", "UI/UX", "Mathematical Logic"] 
    }
  ]);

  // Carga dinámica desde el servidor puerto 5001
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) setProjects(data);
        }
      } catch (error) {
        console.log("Servidor offline: Usando datos locales de respaldo.");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 font-sans scroll-smooth">
      
      {/* NAVBAR PROFESIONAL */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 tracking-tighter">
            RM
          </span>
          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#proyectos" className="hover:text-purple-400 transition-colors">Proyectos</a>
            <a href="#contacto" className="text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-400/30 px-3 py-1 rounded-lg hover:bg-cyan-400/10">
              Contactame
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION NEÓN */}
      <header className="text-center pt-48 pb-24 relative px-4">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] -z-10"></div>
        
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
          Rod Muñoz
        </h1>
        <p className="text-2xl md:text-3xl mt-6 text-cyan-300 font-mono tracking-[0.3em] uppercase animate-pulse">
          22 Años • Full-Stack Developer
        </p>
        <p className="text-slate-400 mt-10 text-lg max-w-2xl mx-auto leading-relaxed italic">
          "Ingeniería de software con enfoque en escalabilidad, desarrollada y optimizada en ecosistemas macOS."
        </p>
      </header>

      {/* TECH STACK LOGOS */}
      <section className="max-w-4xl mx-auto mb-40 px-6">
        <div className="flex flex-wrap justify-center gap-12 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-700">
          <SiReact className="text-6xl hover:text-cyan-400 hover:scale-125 transition-all cursor-pointer" title="React" />
          <SiNodedotjs className="text-6xl hover:text-green-500 hover:scale-125 transition-all cursor-pointer" title="Node.js" />
          <SiDjango className="text-6xl hover:text-green-800 hover:scale-125 transition-all cursor-pointer" title="Django" />
          <SiMongodb className="text-6xl hover:text-green-400 hover:scale-125 transition-all cursor-pointer" title="MongoDB" />
          <SiAmazonaws className="text-6xl hover:text-orange-400 hover:scale-125 transition-all cursor-pointer" title="AWS" />
          <SiGithub className="text-6xl hover:text-white hover:scale-125 transition-all cursor-pointer" title="GitHub" />
          <SiTailwindcss className="text-6xl hover:text-blue-400 hover:scale-125 transition-all cursor-pointer" title="Tailwind CSS" />
          <SiJavascript className="text-6xl hover:text-yellow-400 hover:scale-125 transition-all cursor-pointer" title="JavaScript" />
        </div>
      </section>

      {/* GRILLA DE PROYECTOS (2 COLUMNAS) */}
      <section id="proyectos" className="max-w-6xl mx-auto mb-40 px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Proyectos Destacados</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group relative bg-slate-900/40 border border-slate-800/50 p-10 rounded-[2.5rem] hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
              
              <h3 className="text-3xl font-bold text-white mb-5 relative z-10">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg relative z-10">
                {p.description || p.desc}
              </p>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {(p.technologies || p.tech).map(t => (
                  <span key={t} className="text-[11px] px-4 py-1.5 bg-slate-950 text-purple-300 rounded-full border border-purple-500/20 font-bold uppercase tracking-tighter">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO FINAL */}
      <main id="contacto" className="pb-40 px-6 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] -z-10"></div>
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">¿Tienes un proyecto en mente?</h2>
            <p className="text-slate-500 text-xl font-light max-w-xl mx-auto">
              Estoy listo para llevar tu próxima idea al siguiente nivel tecnológico.
            </p>
        </div>
        <ContactForm />
      </main>

      {/* FOOTER TÉCNICO */}
      <footer className="text-center py-12 border-t border-slate-900 bg-slate-950">
        <p className="text-slate-600 text-xs tracking-[0.4em] font-bold uppercase">
          © 2026 • ROD MUÑOZ • QUITO, ECUADOR • M-SERIES WORKFLOW
        </p>
      </footer>
      
    </div>
  );
}

export default App;