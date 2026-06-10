import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, GlowCard, StatCard, Typewriter } from './components/ui/Cards';
import * as Icon from './components/Icons';
import ProjectModal from './components/ProjectModal';
import profileImg from './assets/Roberto-Rivera-Profile.jpg';
import AutoFlowDemo from './components/AutoFlowDemo';
import InsightAIDemo from './components/InsightAIDemo';
import DocBrainDemo from './components/DocBrainDemo';

import ParticleBackground from './components/ParticleBackground';

/* ─────────────────────────────────────────────────────
   App principal
───────────────────────────────────────────────────── */
export default function App() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCmd, setSearchCmd] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDemo, setActiveDemo] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  /* Data — proyectos (se mueve adentro para que reaccione al cambio de idioma) */
  const PROJECTS = [
    {
      id: 'nsl',
      title: t('projects.list.nsl.title'),
      badge: t('projects.badges.production'), variant: 'green',
      icon: <Icon.Zap className="w-5 h-5" />,
      desc: t('projects.list.nsl.desc'),
      stack: ['React', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Whisper', 'Stripe'],
      metrics: t('projects.list.nsl.metrics'), link: '#',
      detail: t('projects.list.nsl.detail'),
      problem: t('projects.list.nsl.problem'),
      solution: t('projects.list.nsl.solution')
    },
    {
      id: 'finance',
      title: t('projects.list.finance.title'),
      badge: t('projects.badges.production'), variant: 'green',
      icon: <Icon.TrendingUp className="w-5 h-5" />,
      desc: t('projects.list.finance.desc'),
      stack: ['React', 'FastAPI', 'PostgreSQL', 'Chart.js', 'JWT'],
      metrics: t('projects.list.finance.metrics'), link: '#',
      detail: t('projects.list.finance.detail'),
      problem: t('projects.list.finance.problem'),
      solution: t('projects.list.finance.solution')
    },
    {
      id: 'autoflow',
      title: t('projects.list.autoflow.title'),
      badge: t('projects.badges.demo'), 
      variant: 'blue', 
      icon: <Icon.Workflow className="w-5 h-5" />,
      desc: t('projects.list.autoflow.desc'),
      stack: ['React', 'FastAPI', 'n8n', 'IA'], 
      metrics: t('projects.list.autoflow.metrics'), 
      link: '/proyectos/autoflow', 
      isDemo: true, 
      detail: t('projects.list.autoflow.detail'),
      problem: t('projects.list.autoflow.problem'),
      solution: t('projects.list.autoflow.solution')
    },
    {
      id: 'insightai',
      title: t('projects.list.insightai.title'),
      badge: t('projects.badges.demo'), 
      variant: 'blue', 
      icon: <Icon.Brain className="w-5 h-5" />,
      desc: t('projects.list.insightai.desc'),
      stack: ['React', 'FastAPI', 'LangChain', 'pgvector', 'Recharts', 'OpenAI'],
      metrics: t('projects.list.insightai.metrics'), 
      link: '/proyectos/insightai', 
      isDemo: true, 
      detail: t('projects.list.insightai.detail'),
      problem: t('projects.list.insightai.problem'),
      solution: t('projects.list.insightai.solution')
    },
    {
      id: 'docbrain',
      title: t('projects.list.docbrain.title'),
      badge: t('projects.badges.demo'), 
      variant: 'blue', 
      icon: <Icon.Bot className="w-5 h-5" />,
      desc: t('projects.list.docbrain.desc'),
      stack: ['React', 'FastAPI', 'LlamaIndex', 'pgvector', 'PostgreSQL', 'Claude'],
      metrics: t('projects.list.docbrain.metrics'), 
      link: '/proyectos/docbrain', 
      isDemo: true, 
      detail: t('projects.list.docbrain.detail'),
      problem: t('projects.list.docbrain.problem'),
      solution: t('projects.list.docbrain.solution')
    },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('arq.roberto.rivera.sanchez@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

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

  /* Toggle de Idioma */
  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  /* Navegación - command */
  const NAV_LINKS = [
    { label: t('nav.about'), id: 'sobre-mi' },
    { label: t('nav.projects'), id: 'proyectos' },
    { label: t('nav.contact'), id: 'contacto' },
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
                placeholder={t('command.searchPlaceholder')}
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
                  {t('command.goto')} {label}
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
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-subtle bg-card text-xs font-medium text-muted hover:text-text hover:border-blue-500/40 transition-all"
            >
              <Icon.Globe className="w-3.5 h-3.5" />
              {i18n.language.startsWith('es') ? 'EN' : 'ES'}
            </button>

            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-subtle bg-card text-xs font-normal text-muted hover:text-text hover:border-blue-500/40 transition-all"
            >
              <Icon.Command /> K
            </button>
          </nav>

          {/* Mobile toggle & Language */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-subtle bg-card text-xs font-medium text-muted hover:text-text"
            >
              <Icon.Globe className="w-3.5 h-3.5" />
              {i18n.language.startsWith('es') ? 'EN' : 'ES'}
            </button>
            <button onClick={() => setMobileMenuOpen((o) => !o)} className="p-2 text-muted hover:text-text">
              {mobileMenuOpen ? <Icon.X /> : <Icon.Menu />}
            </button>
          </div>
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
          
          <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-10 flex items-center justify-center mt-6">
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="google-blob w-40 h-40 sm:w-52 sm:h-52 bg-blue-500/60" style={{ animationDelay: '0s' }}></div>
              <div className="google-blob w-40 h-40 sm:w-52 sm:h-52 bg-cyan-400/60" style={{ animationDelay: '-2s', animationDirection: 'reverse' }}></div>
              <div className="google-blob w-44 h-44 sm:w-56 sm:h-56 bg-blue-600/50" style={{ animationDelay: '-4s' }}></div>
            </div>
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
            <Icon.Cpu className="w-4 h-4" /> {t('hero.role')}
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-6">
            <Typewriter text={t('hero.title1')} /><br />
            <span className="text-blue-400">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg sm:text-xl font-normal text-muted mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#proyectos"
              onClick={(e) => scrollTo(e, 'proyectos')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-card bg-blue-500 text-text font-medium hover:bg-blue-600 active:scale-95 transition-all shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
            >
              {t('hero.viewProjects')} <Icon.ChevronRight />
            </a>

            <a
              href="#contacto"
              onClick={(e) => scrollTo(e, 'contacto')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-card border border-blue-500/30 text-text font-medium hover:border-blue-500/60 hover:bg-card active:scale-95 transition-all"
            >
              <Icon.Mail /> {t('hero.contact')}
            </a >
          </div >
        </section >

        {/* Sobre mí */}
        < section id="sobre-mi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" >
          <div className="flex items-center gap-3 mb-8">
            <Icon.Sparkles className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-medium">{t('about.title')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-base font-normal text-muted leading-relaxed">
                {t('about.desc')}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <StatCard target={8} suffix="+" label={t('about.years')} />
                <StatCard target={15} suffix="%" label={t('about.retention')} />
                <StatCard target={9} label={t('about.aiEngines')} />
              </div>
              <div className="flex flex-wrap gap-3">
                {[t('about.tags.perf'), t('about.tags.serverless'), t('about.tags.zeroTrust')].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-card border border-subtle text-xs font-medium text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('about.linksTitle')}</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: 'https://linkedin.com/in/robrivmx', Icon: Icon.Linkedin, label: 'LinkedIn', hoverColor: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5' },
                  { href: 'https://github.com/RobRivMx', Icon: Icon.Github, label: 'GitHub', hoverColor: 'hover:text-white hover:border-white/50 hover:bg-white/5' },
                  { href: 'https://torre.ai/robertorivera0', Icon: Icon.Briefcase, label: 'Torre', hoverColor: 'hover:text-[#CDDC39] hover:border-[#CDDC39]/50 hover:bg-[#CDDC39]/5' },
                  { href: '#', Icon: Icon.Briefcase, label: 'Workana', hoverColor: 'hover:text-[#00A0D6] hover:border-[#00A0D6]/50 hover:bg-[#00A0D6]/5' },
                ].map(({ href, Icon: Ic, label, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-card bg-surface border border-subtle text-sm font-medium text-muted transition-all duration-300 shadow-sm ${hoverColor}`}
                  >
                    <Ic className="w-4.5 h-4.5" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div >
        </section >

        {/* Proyectos */}
        < section id="proyectos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24" >
          <div className="flex items-center gap-3 mb-8">
            <Icon.Layers className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-medium">{t('projects.title')}</h2>
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
                  {p.stack.slice(0, 4).map((tg) => (
                    <span key={tg} className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/5 text-muted border border-subtle">
                      {tg}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="text-[10px] font-normal text-muted">+{p.stack.length - 4}</span>
                  )}
                </div>
                <div className="text-xs font-medium text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors mt-auto">
                  {t('projects.viewDetail')} <Icon.ArrowUpRight />
                </div>
              </GlowCard>
            ))}
          </div>
        </section >

        {/* Contacto */}
        < section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" >
          <div className="mb-8 relative p-8 sm:p-12 rounded-card-lg bg-surface border border-blue-500/20 overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700"></div>
            
            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                <Icon.Zap className="w-3.5 h-3.5" />
                <span>{t('contact.availability')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-text mb-6 tracking-tight">
                {t('contact.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t('contact.title2')}</span>
              </h2>
              <p className="text-base sm:text-lg text-muted font-normal mb-8 leading-relaxed max-w-2xl">
                {t('contact.desc')} <strong className="text-text">{t('contact.descBold')}</strong> {t('contact.desc2')}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 text-sm font-medium text-muted">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon.Check className="w-4 h-4 text-green-400" />
                  <span>{t('contact.bullets.startups')}</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon.Check className="w-4 h-4 text-green-400" />
                  <span>{t('contact.bullets.serverless')}</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon.Check className="w-4 h-4 text-green-400" />
                  <span>{t('contact.bullets.zeroTrust')}</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon.Check className="w-4 h-4 text-green-400" />
                  <span>{t('contact.bullets.ai')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'email',
                title: t('contact.cards.email.title'),
                desc: t('contact.cards.email.desc'),
                href: '#',
                onClick: (e) => {
                  e.preventDefault();
                  setEmailModalOpen(true);
                },
                Icon: Icon.Mail,
                brandClass: 'hover:border-red-500/50 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] group-hover:text-red-400',
                iconClass: 'group-hover:bg-red-500 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]'
              },
              {
                id: 'linkedin',
                title: t('contact.cards.linkedin.title'),
                desc: t('contact.cards.linkedin.desc'),
                href: 'https://linkedin.com/in/robrivmx',
                Icon: Icon.Linkedin,
                brandClass: 'hover:border-[#0A66C2]/50 hover:shadow-[0_8px_30px_rgba(10,102,194,0.15)] group-hover:text-[#0A66C2]',
                iconClass: 'group-hover:bg-[#0A66C2] group-hover:shadow-[0_0_25px_rgba(10,102,194,0.6)]'
              },
              {
                id: 'github',
                title: t('contact.cards.github.title'),
                desc: t('contact.cards.github.desc'),
                href: 'https://github.com/RobRivMx',
                Icon: Icon.Github,
                brandClass: 'hover:border-gray-300/50 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] group-hover:text-white',
                iconClass: 'group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
              },
              {
                id: 'whatsapp',
                title: t('contact.cards.whatsapp.title'),
                desc: t('contact.cards.whatsapp.desc'),
                href: 'https://wa.me/5215610480746?text=Hola%20Roberto%2C%20me%20interesa%20tu%20perfil%20como%20Lead%20Full%20Stack%20Architect.',
                Icon: Icon.MessageCircle,
                brandClass: 'hover:border-[#25D366]/50 hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] group-hover:text-[#25D366]',
                iconClass: 'group-hover:bg-[#25D366] group-hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]'
              },
            ].map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                onClick={card.onClick}
                target={card.onClick ? undefined : "_blank"}
                rel={card.onClick ? undefined : "noreferrer"}
                className={`flex items-center gap-4 p-6 rounded-card bg-surface border border-subtle hover:bg-card hover:-translate-y-1 transition-all duration-300 group shadow-sm ${card.brandClass}`}
              >
                <div className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted group-hover:text-white transition-all duration-300 ${card.iconClass}`}>
                  <card.Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-medium text-text transition-colors duration-300 ${card.brandClass.split(' ').find(c => c.startsWith('group-hover:text-'))}`}>{card.title}</h3>
                  <p className="text-sm font-normal text-muted group-hover:text-muted/80 transition-colors">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section >

        <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 border-t border-subtle mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              <span className="text-lg font-medium tracking-tight">Roberto <span className="font-normal text-blue-400">Rivera</span></span>
            </div>
            <p className="text-xs font-normal text-muted">
              {t('footer.copyright')}
            </p>
          </div>
        </footer>
      </main >

      {/* ── Modal proyecto ────────────────────────── */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onOpenDemo={(demoId) => {
          setSelectedProject(null);
          setActiveDemo(demoId);
        }}
      />

      {/* ── WhatsApp Widget ───────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[80]">
        <a
          href="https://wa.me/5215610480746?text=Hola%20Roberto%2C%20he%20visto%20tu%20portafolio%20y%20me%20interesa%20tu%20perfil%20como%20Lead%20Full%20Stack%20Architect.%20%C2%BFPodemos%20agendar%20una%20llamada%20para%20platicar%20sobre%20un%20posible%20proyecto%3F"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-blue-500 shadow-lg flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all animate-glow"
          aria-label="Contactar por WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

      {/* ── Modal de Correo Electrónico ── */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setEmailModalOpen(false)}>
          <div className="bg-surface border border-blue-500/20 rounded-card-lg w-full max-w-md shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-subtle bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Icon.Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-text">{t('emailModal.title')}</h3>
                  <p className="text-xs text-muted">{t('emailModal.subtitle')}</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailModalOpen(false)}
                className="text-muted hover:text-text p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <Icon.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=arq.roberto.rivera.sanchez@gmail.com"
                  target="_blank" rel="noreferrer"
                  onClick={() => setEmailModalOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl border border-subtle hover:border-red-500/40 hover:bg-red-500/5 group transition-all"
                >
                  <span className="text-sm font-medium text-text group-hover:text-red-400 transition-colors">{t('emailModal.gmail')}</span>
                  <Icon.ArrowUpRight className="w-4 h-4 text-muted group-hover:text-red-400 transition-colors" />
                </a>
                <a 
                  href="https://outlook.live.com/mail/0/deeplink/compose?to=arq.roberto.rivera.sanchez@gmail.com"
                  target="_blank" rel="noreferrer"
                  onClick={() => setEmailModalOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl border border-subtle hover:border-blue-500/40 hover:bg-blue-500/5 group transition-all"
                >
                  <span className="text-sm font-medium text-text group-hover:text-blue-400 transition-colors">{t('emailModal.outlook')}</span>
                  <Icon.ArrowUpRight className="w-4 h-4 text-muted group-hover:text-blue-400 transition-colors" />
                </a>
                <a 
                  href="https://compose.mail.yahoo.com/?to=arq.roberto.rivera.sanchez@gmail.com"
                  target="_blank" rel="noreferrer"
                  onClick={() => setEmailModalOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl border border-subtle hover:border-purple-500/40 hover:bg-purple-500/5 group transition-all"
                >
                  <span className="text-sm font-medium text-text group-hover:text-purple-400 transition-colors">{t('emailModal.yahoo')}</span>
                  <Icon.ArrowUpRight className="w-4 h-4 text-muted group-hover:text-purple-400 transition-colors" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px bg-subtle flex-1"></div>
                <span className="text-xs font-medium text-muted uppercase tracking-wider">{t('emailModal.orCopy')}</span>
                <div className="h-px bg-subtle flex-1"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-card border border-subtle rounded-xl px-4 py-3 text-sm font-medium text-text overflow-hidden text-ellipsis whitespace-nowrap">
                  arq.roberto.rivera.sanchez@gmail.com
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={`px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                    emailCopied 
                      ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  }`}
                >
                  {emailCopied ? (
                    <>
                      <Icon.Check className="w-4 h-4" />
                      {t('emailModal.copied')}
                    </>
                  ) : (
                    t('emailModal.copy')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}