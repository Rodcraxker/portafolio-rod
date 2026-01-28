import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import { 
  SiDjango, SiReact, SiNodedotjs, SiGithub, 
  SiAmazonwebservices as SiAmazonaws, SiMongodb, 
  SiTailwindcss, SiJavascript, SiPython, SiOpenjdk 
} from "react-icons/si";
import "../index.css";

function Home() {
  const [projects, setProjects] = useState([
  { 
    title: "Aivance", 
    description: "Plataforma de IA diseñada para optimizar procesos empresariales mediante modelos predictivos complejos.", 
    technologies: ["React", "Python", "Node.js"] 
  },
  { 
    title: "RDTWare", 
    description: "E-commerce de alto rendimiento para el sector gaming con pasarelas de pago seguras.", 
    technologies: ["Node.js", "MongoDB", "Express"] 
  },
  { 
    title: "VinilRod", 
    description: "Aplicación premium para coleccionistas. Permite catalogar y valorar discografías completas.", 
    technologies: ["React", "Tailwind", "Firebase"] 
  },
  { 
    title: "PixlVibe", 
    description: "Ecosistema visual para creadores de contenido enfocado en la gestión de portafolios digitales.", 
    technologies: ["Framer Motion", "React", "Cloudinary"] 
  },
  { 
    title: "CedulaCheck", 
    description: "Herramienta especializada en la validación de identidades mediante algoritmos para documentos ecuatorianos.", 
    technologies: ["JavaScript", "Algorithms", "Backend"] 
  },
  { 
    title: "BioFit Calc", 
    description: "Calculadora de salud biométrica para el seguimiento de rendimiento físico e indicadores clave.", 
    technologies: ["React", "UI/UX", "Logic"] 
  }
]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portafolio-rod.onrender.com/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) setProjects(data);
        }
      } catch (error) {
        console.log("Usando datos locales.");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30 font-sans scroll-smooth">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 tracking-tighter">RM</span>
          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-purple-400">Home</a>
            <a href="/blog" className="hover:text-purple-400">Blog Técnico</a>
            <a href="#cv" className="hover:text-purple-400">Hoja de Vida</a>
            <a href="#proyectos" className="hover:text-purple-400">Proyectos</a>
            <a href="#contacto" className="text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-lg">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="text-center pt-48 pb-24 relative px-4">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] -z-10"></div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Rod Muñoz
        </h1>
        <p className="text-2xl md:text-3xl mt-6 text-cyan-300 font-mono tracking-[0.3em] uppercase">
          Full-Stack Developer • 22 Años
        </p>
      </header>

      {/* SECCIÓN HOJA DE VIDA (Requisito 7) */}
      <section id="cv" className="max-w-6xl mx-auto mb-40 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Experiencia Laboral */}
          <div>
            <h2 className="text-3xl font-bold mb-8 border-l-4 border-purple-500 pl-4">Experiencia</h2>
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-slate-800">
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-2"></div>
                <h3 className="text-xl font-bold text-white">Pasante de IT</h3>
                <p className="text-cyan-400 text-sm">Centro de Informática PUCE | Actualidad</p>
                <p className="text-slate-400 mt-2">Soporte técnico y gestión de sistemas informáticos universitarios.</p>
              </div>
              <div className="relative pl-6 border-l border-slate-800">
                <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[6.5px] top-2"></div>
                <h3 className="text-xl font-bold text-white">Servicio Comunitario</h3>
                <p className="text-cyan-400 text-sm">Casa Somos Chiriyacu | 2024</p>
                <p className="text-slate-400 mt-2">Gestión de trámites PUCA para comerciantes del sector.</p>
              </div>
              <div className="relative pl-6 border-l border-slate-800">
                <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[6.5px] top-2"></div>
                <h3 className="text-xl font-bold text-white">Asistente de Almacén</h3>
                <p className="text-cyan-400 text-sm">Ferrisariato | Hasta 2023</p>
                <p className="text-slate-400 mt-2">Control de inventarios y logística operativa.</p>
              </div>
            </div>
          </div>

          {/* Educación y Habilidades */}
          <div>
            <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-500 pl-4">Formación & Skills</h2>
            <div className="mb-10">
              <h3 className="text-xl font-bold">Desarrollo de Software</h3>
              <p className="text-slate-400 italic">Pontificia Universidad Católica del Ecuador</p>
              <h3 className="text-xl font-bold mt-4">Bachillerato</h3>
              <p className="text-slate-400 italic">Academia Borja 3 Cavanis | Graduado 2022</p>
              <p className="text-cyan-400 mt-2 font-bold">Inglés: Nivel B1.1</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-purple-400 font-bold mb-2">Backend</p>
                <ul className="text-sm text-slate-300">
                  <li>Python / Django</li>
                  <li>Node.js / Express</li>
                  <li>Java / MongoDB</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-blue-400 font-bold mb-2">Frontend</p>
                <ul className="text-sm text-slate-300">
                  <li>React / Vite</li>
                  <li>Tailwind CSS</li>
                  <li>JavaScript ES6</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK LOGOS */}
      <section className="max-w-4xl mx-auto mb-40 px-6 flex flex-wrap justify-center gap-12 opacity-50 hover:opacity-100 transition-all">
          <SiReact className="text-6xl hover:text-cyan-400 hover:scale-110 transition-all" />
          <SiNodedotjs className="text-6xl hover:text-green-500 hover:scale-110 transition-all" />
          <SiPython className="text-6xl hover:text-yellow-500 hover:scale-110 transition-all" />
          <SiMongodb className="text-6xl hover:text-green-400 hover:scale-110 transition-all" />
          <SiDjango className="text-6xl hover:text-green-800 hover:scale-110 transition-all" />
          <SiOpenjdk className="text-6xl hover:text-red-500 hover:scale-110 transition-all" />
          <SiJavascript className="text-6xl hover:text-yellow-400 hover:scale-110 transition-all" />
      </section>

      {/* GRILLA DE PROYECTOS */}
      <section id="proyectos" className="max-w-6xl mx-auto mb-40 px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <div key={i} className="group relative bg-slate-900/40 border border-slate-800/50 p-10 rounded-[2.5rem] hover:border-purple-500/40 transition-all">
              <h3 className="text-3xl font-bold text-white mb-5">{p.title}</h3>
              <p className="text-slate-400 mb-10">{p.description || p.desc}</p>
              <div className="flex flex-wrap gap-3">
                {(p.technologies || p.tech).map(t => (
                  <span key={t} className="text-[11px] px-4 py-1.5 bg-slate-950 text-purple-300 rounded-full border border-purple-500/20 font-bold uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO */}
      <main id="contacto" className="pb-40 px-6 relative">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic text-cyan-400">¡Hablemos!</h2>
            <p className="text-slate-400">0995069928 | rodmunoz28@gmail.com</p>
        </div>
        <ContactForm />
      </main>

      {/* FOOTER */}
      <footer className="text-center py-12 border-t border-slate-900 bg-slate-950">
        <p className="text-slate-600 text-xs tracking-[0.4em] font-bold uppercase">
          © 2026 • ROD MUÑOZ • QUITO, ECUADOR • M-SERIES WORKFLOW
        </p>
        <a href="/login" className="text-slate-900 hover:text-slate-800 text-[10px] mt-4 block">Admin Access</a>
      </footer>
      
    </div>
  );
}

export default Home;