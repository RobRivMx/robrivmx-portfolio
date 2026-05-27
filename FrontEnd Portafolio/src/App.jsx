import { useState, useEffect, useRef } from 'react';
import { Badge, GlowCard, StatCard, Typewriter } from './components/ui/Cards';
import * as Icon from './components/Icons';
import ProjectModal from './components/ProjectModal';
import profileImg from './assets/Roberto-Rivera-Profile.jpg';
import AutoFlowDemo from './components/AutoFlowDemo';
import InsightAIDemo from './components/InsightAIDemo';
import DocBrainDemo from './components/DocBrainDemo';

import ParticleBackground from './components/ParticleBackground';

/* ─────────────────────────────────────────────────────
   Data — proyectos
───────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'nsl',
    title: 'Non‑Stop Learning',
    badge: 'En producción', variant: 'green',
    icon: <Icon.Zap className="w-5 h-5" />,
    desc: 'PWA educativa con 9 motores pedagógicos, tutor IA conversacional y gamificación.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Whisper', 'Stripe'],
    metrics: '+15% sesión', link: '#',
    detail: 'Non‑Stop Learning (NSL) es una plataforma de aprendizaje adaptativo. Con 9 motores pedagógicos y tutor de voz, integra gamificación y pagos con Stripe.',
    problem: 'Alta tasa de abandono en plataformas tradicionales por falta de personalización y feedback en tiempo real.',
    solution: 'Arquitectura PWA con procesamiento IA de baja latencia que incrementó la retención y el tiempo de sesión en un 15%.'
  },
  {
    id: 'finance',
    title: 'Smart Finance Pro',
    badge: 'En producción', variant: 'green',
    icon: <Icon.TrendingUp className="w-5 h-5" />,
    desc: 'Control de gastos con dashboard en tiempo real, categorización automática y metas de ahorro.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Chart.js', 'JWT'],
    metrics: 'Finanzas claras', link: '#',
    detail: 'PWA de finanzas personales con dashboards interactivos en tiempo real y categorización que aprende de los patrones del usuario.',
    problem: 'Falta de visibilidad sobre fugas de capital y la fricción de categorizar gastos manualmente en hojas de cálculo.',
    solution: 'Dashboard predictivo Zero Trust con categorización automatizada que identifica patrones de gasto al instante.'
  },
  {
    id: 'autoflow',
    title: 'AutoFlow',
    badge: '▶ Demo interactiva', 
    variant: 'blue', 
    icon: <Icon.Workflow className="w-5 h-5" />,
    desc: 'Automatización empresarial con n8n e IA, 400+ conectores y reportes inteligentes.',
    stack: ['React', 'FastAPI', 'n8n', 'IA'], 
    metrics: '400+ conectores', 
    link: '/proyectos/autoflow', 
    isDemo: true, 
    detail: 'Solución de automatización visual para PyMEs. Combina n8n con IA generativa para reportes ejecutivos.',
    problem: 'Cuellos de botella operativos en PyMEs por tareas manuales repetitivas y sistemas desconectados entre sí.',
    solution: 'Ecosistema orquestado con +400 conectores y agentes IA que reducen el trabajo manual rutinario drásticamente.'
  },
  {
    id: 'insightai',
    title: 'InsightAI',
    badge: '▶ Demo interactiva', 
    variant: 'blue', 
    icon: <Icon.Brain className="w-5 h-5" />,
    desc: 'Dashboard ejecutivo con consultas en lenguaje natural y visualización automática.',
    stack: ['React', 'FastAPI', 'LangChain', 'pgvector', 'Recharts', 'OpenAI'],
    metrics: 'SQL Agent', 
    link: '/proyectos/insightai', 
    isDemo: true, 
    detail: 'Permite a directivos consultar datos empresariales en lenguaje natural. Un SQL Agent traduce la pregunta a SQL.',
    problem: 'Directivos dependiendo de equipos técnicos para extraer métricas simples, retrasando la toma de decisiones.',
    solution: 'Interfaz conversacional RAG donde el directivo pregunta en texto plano y obtiene visualizaciones dinámicas al segundo.'
  },
  {
    id: 'docbrain',
    title: 'DocBrain',
    badge: '▶ Demo interactiva', 
    variant: 'blue', 
    icon: <Icon.Bot className="w-5 h-5" />,
    desc: 'Chatbot RAG empresarial que razona sobre documentación interna con citas de fuentes.',
    stack: ['React', 'FastAPI', 'LlamaIndex', 'pgvector', 'PostgreSQL', 'Claude'],
    metrics: 'RAG avanzado', 
    link: '/proyectos/docbrain', 
    isDemo: true, 
    detail: 'Chatbot corporativo RAG que carga PDFs, Word y Markdown. Los empleados obtienen respuestas con citas a las fuentes.',
    problem: 'Pérdida de horas productivas buscando políticas, procesos o datos específicos en silos de documentos corporativos.',
    solution: 'Motor de búsqueda semántica (pgvector + LlamaIndex) que entrega respuestas exactas, citando la página y el documento fuente.'
  },
];

/* ─────────────────────────────────────────────────────
   Chat IA — respuestas simuladas
───────────────────────────────────────────────────── */
function getAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('proyecto') || q.includes('trabajo'))
    return 'Roberto ha liderado proyectos como Non‑Stop Learning (PWA educativa con IA), Smart Finance Pro (finanzas personales), AutoFlow (automatización n8n), InsightAI (dashboard con lenguaje natural) y DocBrain (chatbot RAG empresarial). ¿Cuál te interesa?';
  if (q.includes('experiencia') || q.includes('años'))
    return 'Roberto cuenta con más de 8 años de experiencia como Full Stack Architect, especializado en PWAs, serverless, Zero Trust e IA generativa.';
  if (q.includes('stack') || q.includes('tecnología'))
    return 'Su stack principal incluye React, Python, FastAPI, PostgreSQL, OpenAI, Claude, n8n y Docker.';
  if (q.includes('contacto') || q.includes('email'))
    return 'Puedes contactarlo a través del formulario en la sección de contacto, o en LinkedIn (linkedin.com/in/robrivmx) y GitHub (github.com/RobRivMx).';
  if (q.includes('tarifa') || q.includes('precio') || q.includes('costo'))
    return 'Su compensación es MXN 35,000 mensuales o MXN 800 por hora.';
  return 'Soy el asistente virtual de Roberto Rivera. Puedo informarte sobre su experiencia, proyectos, stack tecnológico, tarifas y más. ¿En qué te ayudo?';
}

/* ─────────────────────────────────────────────────────
   App principal
───────────────────────────────────────────────────── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCmd, setSearchCmd] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente IA de Roberto Rivera. Pregúntame sobre su experiencia, proyectos o tecnologías.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDemo, setActiveDemo] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', type: 'empleo' });
  const [contactSent, setContactSent] = useState(false);

  /* Navegación suave */
  const scrollTo = (e, id) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
    setCommandOpen(false);
  };

  /* ⌘K */
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  /* Chat */
  const handleChatSend = (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: text }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: getAIResponse(text) },
      ]);
    }, 700);
  };

  /* Contacto */
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setContactForm({ name: '', email: '', message: '', type: 'empleo' });
    setTimeout(() => setContactSent(false), 3000);
  };

  const NAV_LINKS = [
    { label: 'Sobre mí', id: 'sobre-mi' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Contacto', id: 'contacto' },
  ];

  // Si hay una demo activa, suplantamos toda la pantalla
  if (activeDemo === 'autoflow') {
    return <AutoFlowDemo onClose={() => setActiveDemo(null)} />;
  }
  
  if (activeDemo === 'insightai') {
    return <InsightAIDemo onClose={() => setActiveDemo(null)} />;
  }

  if (activeDemo === 'docbrain') {
    return <DocBrainDemo onClose={() => setActiveDemo(null)} />;
  }

  // De lo contrario, renderizamos el portafolio normal
  return (
    <div className="relative min-h-screen bg-bg text-text font-sans">
      <ParticleBackground />

      {/* ── Command Palette ────────────────────────── */}
      {commandOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setCommandOpen(false)}
        >
          <div
            className="bg-surface border border-blue-500/20 rounded-card-lg w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b border-subtle">
              <Icon.Search className="w-5 h-5 text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar sección o proyecto..."
                value={searchCmd}
                onChange={(e) => setSearchCmd(e.target.value)}
                className="bg-transparent w-full outline-none text-sm font-normal placeholder-muted/50"
              />
              <kbd className="text-xs text-muted bg-card px-2 py-0.5 rounded border border-subtle">ESC</kbd>
            </div>
            <div className="p-2 max-h-60 overflow-y-auto">
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={(e) => scrollTo(e, id)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-card flex items-center gap-3 text-sm font-medium transition-colors"
                >
                  <Icon.ChevronRight className="w-4 h-4 text-blue-400" />
                  Ir a {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Header ────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" onClick={(e) => scrollTo(e, 'hero')} className="flex items-center gap-2.5 group">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_18px_rgba(59,130,246,0.9)] transition-shadow duration-300" />
            <span className="text-sm font-medium tracking-tight">Roberto <span className="font-normal text-blue-400">Rivera</span></span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollTo(e, id)}
                className="text-sm font-normal text-muted hover:text-text transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-blue-500 hover:after:w-full after:transition-all duration-200"
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-subtle bg-card text-xs font-normal text-muted hover:text-text hover:border-blue-500/40 transition-all"
            >
              <Icon.Command /> K
            </button>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen((o) => !o)} className="md:hidden p-2 text-muted hover:text-text">
            {mobileMenuOpen ? <Icon.X /> : <Icon.Menu />}
          </button>
        </div>

        {
          mobileMenuOpen && (
            <div className="md:hidden bg-surface border-b border-subtle">
              <nav className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map(({ label, id }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => scrollTo(e, id)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-card transition-all"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div >
          )
        }
      </header >

      {/* ── Main content ──────────────────────────── */}
      < main className="relative z-10 bg-grid" >

        {/* Hero */}
        < section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-36 md:pb-24 text-center" >
          
          {/* ── Avatar con ondas tecnológicas estilo Google AI ── */}
          <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-10 flex items-center justify-center mt-6">
            
            {/* Contenedores de Blobs (CSS nativo) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="google-blob w-40 h-40 sm:w-52 sm:h-52 bg-blue-500/60" style={{ animationDelay: '0s' }}></div>
              <div className="google-blob w-40 h-40 sm:w-52 sm:h-52 bg-cyan-400/60" style={{ animationDelay: '-2s', animationDirection: 'reverse' }}></div>
              <div className="google-blob w-44 h-44 sm:w-56 sm:h-56 bg-blue-600/50" style={{ animationDelay: '-4s' }}></div>
            </div>
            
            {/* Contenedor de la foto con marco radiante */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-br from-blue-400 via-blue-600/50 to-cyan-300 shadow-[0_0_40px_rgba(59,130,246,0.6)] z-10 overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out z-20"></div>
              
              <img 
                src={profileImg} 
                alt="Roberto Rivera" 
                className="w-full h-full object-cover rounded-full bg-surface relative z-10"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-float">
            <Icon.Cpu className="w-4 h-4" /> Lead Full Stack Architect
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-6">
            <Typewriter text="Código que impacta." /><br />
            <span className="text-blue-400">Arquitectura que escala.</span>
          </h1>
          <p className="text-lg sm:text-xl font-normal text-muted mb-10 max-w-2xl mx-auto">
            React · Python · FastAPI · IA Generativa · Zero Trust
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#proyectos"
              onClick={(e) => scrollTo(e, 'proyectos')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-card bg-blue-500 text-text font-medium hover:bg-blue-600 active:scale-95 transition-all shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
            >
              Ver proyectos <Icon.ChevronRight />
            </a>

            <a
              href="#contacto"
              onClick={(e) => scrollTo(e, 'contacto')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-card border border-blue-500/30 text-text font-medium hover:border-blue-500/60 hover:bg-card active:scale-95 transition-all"
            >
              <Icon.Mail /> Contactar
            </a >
          </div >
        </section >

        {/* Sobre mí */}
        < section id="sobre-mi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" >
          <div className="flex items-center gap-3 mb-8">
            <Icon.Sparkles className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-medium">Sobre mí</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-base font-normal text-muted leading-relaxed">
                Lead Full Stack Architect con más de 8 años creando productos digitales de alto impacto.
                Especializado en PWAs, arquitecturas serverless, Zero Trust e inteligencia artificial generativa.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <StatCard target={8} suffix="+" label="Años experiencia" />
                <StatCard target={15} suffix="%" label="Mejora sesión" />
                <StatCard target={9} label="Motores IA" />
              </div>
              <div className="flex flex-wrap gap-3">
                {['Rendimiento', 'Serverless', 'Zero Trust'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-card border border-subtle text-xs font-medium text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Enlaces profesionales</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: 'https://linkedin.com/in/robrivmx', Icon: Icon.Linkedin, label: 'LinkedIn' },
                  { href: 'https://github.com/RobRivMx', Icon: Icon.Github, label: 'GitHub' },
                  { href: 'https://torre.ai/robertorivera0', Icon: Icon.Briefcase, label: 'Torre' },
                  { href: '#', Icon: Icon.Briefcase, label: 'Workana' },
                ].map(({ href, Icon: Ic, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-card bg-card border border-subtle text-sm font-normal text-muted hover:text-text hover:border-blue-500/40 transition-all"
                  >
                    <Ic className="w-4 h-4" /> {label}
                  </a>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-card bg-card border border-subtle">
                <p className="text-sm font-normal text-muted">
                  Compensación:{' '}
                  <span className="text-text font-medium">MXN 35,000/mes</span>
                  {' '}o{' '}
                  <span className="text-text font-medium">MXN 800/hora</span>
                </p>
              </div>
            </div>
          </div >
        </section >

        {/* Proyectos */}
        < section id="proyectos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" >
          <div className="flex items-center gap-3 mb-8">
            <Icon.Layers className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-medium">Proyectos destacados</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, idx) => (
              <GlowCard 
                key={p.id} 
                highlight={idx === 0} 
                onClick={() => setSelectedProject(p)}
                className="p-5 flex flex-col cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={p.variant}>{p.badge}</Badge>
                  {p.metrics && (
                    <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      {p.metrics}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">{p.title}</h3>
                <p className="text-sm font-normal text-muted mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/5 text-muted border border-subtle">
                      {t}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="text-[10px] font-normal text-muted">+{p.stack.length - 4}</span>
                  )}
                </div>
                <div className="text-xs font-medium text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors mt-auto">
                  Ver detalle <Icon.ArrowUpRight />
                </div>
              </GlowCard>
            ))}
          </div>
        </section >

        {/* Contacto */}
        < section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" >
          <div className="flex items-center gap-3 mb-8">
            <Icon.Mail className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-medium">Contacto</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {[
                { label: 'Nombre', key: 'name', type: 'text', placeholder: 'Tu nombre' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'tu@email.com' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-muted mb-1">{label}</label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={contactForm[key]}
                    onChange={(e) => setContactForm({ ...contactForm, [key]: e.target.value })}
                    className="w-full px-4 py-3 rounded-card bg-card border border-subtle text-text placeholder-muted/30 focus:border-blue-500/40 outline-none transition-all text-sm font-normal"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Tipo</label>
                <select
                  value={contactForm.type}
                  onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-card bg-card border border-subtle text-text focus:border-blue-500/40 outline-none transition-all text-sm font-normal"
                >
                  <option value="empleo">Oportunidad laboral</option>
                  <option value="freelance">Proyecto freelance</option>
                  <option value="consultoria">Consultoría</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntame sobre tu proyecto..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-card bg-card border border-subtle text-text placeholder-muted/30 focus:border-blue-500/40 outline-none transition-all text-sm font-normal resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={contactSent}
                className="w-full py-3 rounded-card bg-blue-500 text-text font-medium hover:bg-blue-600 active:scale-95 transition-all shadow-lg disabled:opacity-50"
              >
                {contactSent ? '✓ Mensaje enviado' : 'Enviar mensaje'}
              </button>
            </form>
            <div className="text-sm font-normal text-muted space-y-4">
              <p>¿Tienes un proyecto desafiante? Escríbeme y lo resolvemos juntos.</p>
              <p className="text-xs">
                También disponible en{' '}
                <a href="https://linkedin.com/in/robrivmx" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
                {' '}y{' '}
                <a href="https://github.com/RobRivMx" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub</a>.
              </p>
            </div>
          </div>
        </section >

        <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 border-t border-subtle mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <span className="text-lg font-medium tracking-tight">Roberto <span className="font-normal text-blue-400">Rivera</span></span>
            </div>
            <p className="text-xs font-normal text-muted">
              © 2026 Roberto Rivera — Diseñado con precisión.
            </p>
          </div>
        </footer>
      </main >

      {/* ── Modal proyecto ────────────────────────── */}
      {/* ── Modal de Proyecto Centralizado ── */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onOpenDemo={(demoId) => {
          setSelectedProject(null); // Cerramos el modal
          setActiveDemo(demoId);    // Abrimos la demo
        }}
      />

      {/* ── Chat Widget ───────────────────────────── */}
      <div className={`fixed bottom-6 right-6 z-[80] flex flex-col transition-all duration-300 ${chatOpen ? 'w-80 h-96' : ''}`}>
        {chatOpen ? (
          <div className="flex-1 bg-surface border border-blue-500/20 rounded-card-lg overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-subtle">
              <span className="text-sm font-medium">Chat con IA</span>
              <button onClick={() => setChatOpen(false)} className="text-muted hover:text-text">
                <Icon.X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-card text-xs font-normal
                    ${msg.role === 'user'
                      ? 'bg-blue-500/20 text-blue-100'
                      : 'bg-card border border-subtle text-muted'}`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSend} className="p-3 border-t border-subtle flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pregunta sobre Roberto..."
                className="flex-1 bg-card border border-subtle rounded-card px-3 py-1.5 text-xs font-normal text-text placeholder-muted/40 outline-none focus:border-blue-500/40"
              />
              <button type="submit" className="px-3 py-1.5 rounded-card bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors">
                Enviar
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="w-12 h-12 rounded-full bg-blue-500 shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition-all animate-glow"
          >
            <Icon.MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div >
  );
}