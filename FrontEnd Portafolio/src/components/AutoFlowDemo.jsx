// App.jsx — AutoFlow Demo Experience
// Design System: Dark Mode Premium SaaS
// Demo demostrativa en una sola página con animaciones y magia visual

import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground';

// ============================================================
// ICONOS SVG INLINE
// ============================================================
const Icons = {
    Logo: () => (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="url(#logoGrad)" />
            <path d="M7 14L11 18L21 8" stroke="#0A0A0F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Zap: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    CheckCircle: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    ),
    AlertCircle: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    ),
    Play: () => (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
    ),
    User: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    Send: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
    ),
    Bot: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16.01" /><line x1="16" y1="16" x2="16" y2="16.01" /></svg>
    ),
    Mail: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    ),
    MessageCircle: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
    ),
    File: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
    ),
    Table: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /></svg>
    ),
    Link: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    ),
    ArrowRight: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    ),
    ChevronDown: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
    ),
    Sparkles: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /><path d="M5 3l.5 2L7 5.5 5.5 6 5 8l-.5-2L3 5.5 4.5 5 5 3z" /><path d="M19 17l.5 2 1.5.5-1.5.5-.5 2-.5-2-1.5-.5 1.5-.5.5-2z" /></svg>
    ),
    Activity: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
    ),
};

// ============================================================
// HOOK: useCountUp — Animación de conteo numérico
// ============================================================
const useCountUp = (end, duration = 1500, start = 0, trigger = true) => {
    const [value, setValue] = useState(start);
    const frameRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (!trigger) return;
        startTimeRef.current = null;
        const range = end - start;
        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(Math.floor(start + range * eased));
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [end, duration, start, trigger]);

    return value;
};

// ============================================================
// HOOK: useInView — Detecta si un elemento está en viewport
// ============================================================
const useInView = (ref, threshold = 0.2) => {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, threshold]);
    return inView;
};

// ============================================================
// COMPONENTE: ParticleField — Partículas flotantes sutiles de fondo
// ============================================================
const ParticleField = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }));

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// ============================================================
// COMPONENTE: Navbar — Simplificado para la demo
// ============================================================
const Navbar = ({ onClose }) => (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0F1117]/80 backdrop-blur-xl border-b border-[rgba(59,130,246,0.12)] flex items-center px-4 lg:px-6">
      {/* Botón Volver al Portafolio */}
      <button 
        onClick={onClose}
        className="flex items-center gap-1.5 mr-4 px-3 py-1.5 rounded-[8px] bg-white/5 text-[#8B95B0] text-[12px] font-medium hover:text-[#F0F4FF] hover:bg-white/10 border border-[rgba(59,130,246,0.12)] transition-all"
      >
        ← Volver
      </button>
        <div className="flex items-center gap-2.5">
            <Icons.Logo />
            <span className="text-sm font-medium text-[#F0F4FF] tracking-tight">AutoFlow</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20 ml-2">
                DEMO
            </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
            <span className="hidden sm:inline px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                En vivo
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#22D3EE] flex items-center justify-center text-[#0A0A0F]">
                <Icons.User />
            </div>
        </div>
    </header>
);

// ============================================================
// COMPONENTE: Badge
// ============================================================
const Badge = ({ variant = 'success', children }) => {
    const variants = {
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        error: 'bg-red-500/10 text-red-400 border-red-500/20',
        info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${variants[variant] || variants.info}`}>
            {children}
        </span>
    );
};

// ============================================================
// COMPONENTE: FlowNodeAnimado — Nodo con animación de pulso
// ============================================================
const FlowNodeAnimado = ({ type, label, x, y, active = false, glow = false }) => {
    const nodeTypes = {
        trigger: { color: '#60A5FA', bg: 'bg-blue-500/10 border-blue-500/30' },
        action: { color: '#34D399', bg: 'bg-emerald-500/10 border-emerald-500/30' },
        condition: { color: '#FBBF24', bg: 'bg-amber-500/10 border-amber-500/30' },
        http: { color: '#A78BFA', bg: 'bg-purple-500/10 border-purple-500/30' },
        code: { color: '#F472B6', bg: 'bg-pink-500/10 border-pink-500/30' },
    };
    const { color, bg } = nodeTypes[type] || nodeTypes.trigger;

    return (
        <div
            className={`absolute px-3 py-2 rounded-[8px] border ${bg} transition-all duration-500 z-10 ${active ? 'scale-110 ring-2 ring-[#60A5FA]' : 'hover:scale-105'
                } ${glow ? 'shadow-[0_0_20px_rgba(59,130,246,0.5)]' : ''}`}
            style={{ top: `${y}px`, left: `${x}px` }}
        >
            <div className="flex items-center gap-2">
                <div
                    className="w-6 h-6 rounded-[6px] flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: active ? `${color}40` : `${color}20` }}
                >
                    <Icons.Zap />
                </div>
                <div>
                    <p className="text-[11px] font-medium text-[#F0F4FF] leading-none">{label}</p>
                    <p className="text-[9px] font-normal text-[#8B95B0] leading-none mt-0.5">{type}</p>
                </div>
            </div>
            {active && (
                <div className="absolute -inset-1 rounded-[8px] animate-ping opacity-20" style={{ background: color }} />
            )}
        </div>
    );
};

// ============================================================
// COMPONENTE: ConnectorCardAnimado — Conector con animación
// ============================================================
const ConnectorCardAnimado = ({ name, icon: Icon, connected: initialConnected, category, onToggle }) => {
    const [connected, setConnected] = useState(initialConnected);
    const [animating, setAnimating] = useState(false);

    const handleToggle = () => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setConnected(!connected);
            setAnimating(false);
            onToggle?.(name, !connected);
        }, 600);
    };

    return (
        <div
            className={`p-4 rounded-[8px] border transition-all duration-500 cursor-pointer group ${animating
                ? 'border-[#60A5FA]/50 bg-[#3B82F6]/10 scale-105'
                : connected
                    ? 'border-emerald-500/20 bg-[#1A1D2E] hover:border-emerald-500/40'
                    : 'border-[rgba(59,130,246,0.12)] bg-[#1A1D2E] hover:border-[rgba(59,130,246,0.3)]'
                }`}
            onClick={handleToggle}
        >
            <div className="flex items-start justify-between mb-3">
                <div
                    className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-300 ${connected ? 'bg-emerald-500/10' : 'bg-[#3B82F6]/10'
                        }`}
                >
                    <Icon />
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${animating ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' :
                            connected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-[#8B95B0]/40'
                            }`}
                    />
                    {animating && (
                        <span className="text-[9px] font-medium text-amber-400 animate-pulse">···</span>
                    )}
                </div>
            </div>
            <p className="text-[13px] font-medium text-[#F0F4FF] mb-1">{name}</p>
            <p className="text-[11px] font-normal text-[#8B95B0] mb-3">{category}</p>
            <div
                className={`w-full py-1.5 rounded-[8px] text-[11px] font-medium text-center transition-all ${animating
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : connected
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20'
                    }`}
            >
                {animating ? 'Conectando...' : connected ? 'Conectado' : 'Conectar'}
            </div>
        </div>
    );
};

// ============================================================
// COMPONENTE: ChatMessage — UI Premium
// ============================================================
const ChatMessage = ({ role, text, time }) => {
    const isBot = role === 'bot';
    return (
        <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn mb-4`}>
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-[#1A1D2E] border border-[rgba(59,130,246,0.3)] flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <Icons.Bot />
                </div>
            )}
            <div
                className={`max-w-[80%] px-4 py-3 rounded-[16px] relative group ${
                    isBot
                        ? 'bg-[#1A1D2E]/80 backdrop-blur-md border border-[rgba(59,130,246,0.15)] text-[#F0F4FF] rounded-tl-sm'
                        : 'bg-gradient-to-br from-[#3B82F6]/20 to-[#22D3EE]/20 border border-[#3B82F6]/30 text-[#F0F4FF] rounded-tr-sm backdrop-blur-sm shadow-[0_4px_20px_rgba(59,130,246,0.15)]'
                }`}
            >
                {/* Subtle glow on hover for bot */}
                {isBot && (
                    <div className="absolute inset-0 rounded-[16px] rounded-tl-sm bg-gradient-to-br from-[#60A5FA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}
                
                {/* Texto renderizado con negritas resaltadas */}
                <p className="text-[13px] font-normal whitespace-pre-wrap leading-relaxed relative z-10" 
                   dangerouslySetInnerHTML={{__html: text.replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-[#60A5FA]">$1</span>')}}
                />
                
                <p className={`text-[9px] font-medium mt-2 flex items-center gap-1.5 ${isBot ? 'text-[#8B95B0]' : 'text-[#60A5FA] justify-end'}`}>
                    {isBot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.5)]" />}
                    {time}
                </p>
            </div>
        </div>
    );
};

// ============================================================
// PÁGINA PRINCIPAL: Demo continua
// ============================================================
export default function AutoFlowDemo({ onClose }) {
    // Al montar la demo, nos aseguramos de estar en la parte superior de la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Refs para animaciones de intersección
    const metricsRef = useRef(null);
    const flowRef = useRef(null);
    const chatRef = useRef(null);
    const connectorsRef = useRef(null);

    const metricsInView = useInView(metricsRef);
    const flowInView = useInView(flowRef, 0.1);
    const chatInView = useInView(chatRef);
    const connectorsInView = useInView(connectorsRef);

    // Animaciones de conteo
    const flowsCount = useCountUp(12, 1800, 0, metricsInView);
    const execsCount = useCountUp(847, 2000, 0, metricsInView);
    const errorsCount = useCountUp(3, 1200, 0, metricsInView);

    // Estado del flujo
    const [flowActiveNode, setFlowActiveNode] = useState(-1);
    const [flowRunning, setFlowRunning] = useState(false);
    const [flowLog, setFlowLog] = useState([]);
    const nodes = [
        { id: 0, type: 'trigger', label: 'Webhook', x: 30, y: 40 },
        { id: 1, type: 'action', label: 'Filtrar datos', x: 200, y: 40 },
        { id: 2, type: 'condition', label: '¿Aprobado?', x: 380, y: 40 },
        { id: 3, type: 'http', label: 'POST a CRM', x: 560, y: 15 },
        { id: 4, type: 'code', label: 'Transformar', x: 560, y: 85 },
    ];

    const runFlowDemo = () => {
        if (flowRunning) return;
        setFlowRunning(true);
        setFlowLog([]);
        let i = 0;
        const steps = [
            'Webhook recibido: nuevo lead desde landing page',
            'Validando email y nombre del lead...',
            '¿Lead aprobado? → Cumple criterios de segmentación',
            'Enviando datos a HubSpot CRM...',
            'Transformando payload a formato API v2',
        ];
        const interval = setInterval(() => {
            if (i < nodes.length) {
                setFlowActiveNode(i);
                setFlowLog((prev) => [...prev, { time: new Date().toLocaleTimeString(), text: steps[i] }]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setFlowActiveNode(-1);
                    setFlowRunning(false);
                }, 800);
            }
        }, 700);
    };

    // Estado del chat
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: 'Sistemas en línea. Soy **AutoFlow Nexus**, tu orquestador IA. Estoy listo para procesar tus requerimientos, sintetizar pipelines y ejecutar nodos en tiempo real. ¿Qué arquitectura vamos a construir hoy?', time: '10:32' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    const handleSend = (text) => {
        const msgText = text || input;
        if (!msgText.trim() || isLoading) return;

        const newMsg = {
            id: Date.now(),
            role: 'user',
            text: msgText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMsg]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            let botResponse = '';
            if (msgText.includes('lead') || msgText.includes('CRM') || msgText.includes('scan_leads')) {
                botResponse = 'Analizando semántica del requerimiento... **Pipeline detectado: Captura y Nutrición de Leads**.\n\nHe sintetizado la siguiente arquitectura óptima:\n1. **Trigger:** Webhook dinámico (Escucha activa)\n2. **Procesador:** Filtro Regex para email/nombre\n3. **Acción:** Integración SMTP (Bienvenida)\n4. **Notificación:** Ping a Slack/Teams\n\nDesplegando nodos en el entorno visual. Iniciando simulación en 3, 2, 1...';
                // Activar el flujo automáticamente como magia
                setTimeout(() => {
                    if (!flowRunning) runFlowDemo();
                }, 2500);
            } else if (msgText.includes('conectar') || msgText.includes('integrar') || msgText.includes('connect')) {
                botResponse = 'Accediendo al registro de integraciones... \n\nTu ecosistema actual tiene autorizaciones OAuth válidas para **Gmail** y **Slack**. Puedes gestionar tokens y Webhooks directamente en la consola de Conectores. ¿Deseas aprovisionar una nueva API Key?';
            } else {
                botResponse = 'Recibido. Analizando tu instrucción mediante NLP...\n\nComo tu orquestador IA, puedo estructurar flujos complejos, realizar debugging de payloads en tiempo real o sugerir optimizaciones de rendimiento. Por favor, sé más específico o usa uno de los comandos rápidos.';
            }
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'bot',
                    text: botResponse,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setIsLoading(false);
        }, 2000);
    };

    // Sugerencias rápidas del chat
    const suggestions = [
        { cmd: '/scan_leads', desc: 'Sintetizar flujo CRM' },
        { cmd: '/connect', desc: 'Gestionar integraciones' },
        { cmd: '/optimize', desc: 'Analizar latencia de nodos' },
        { cmd: '/debug', desc: 'Revisar logs de error' },
    ];

    // Estado de conectores
    const [connectorStatus, setConnectorStatus] = useState({
        Gmail: true,
        Slack: true,
        WhatsApp: false,
        'PDF Generator': true,
        'CSV Parser': false,
        'Google Sheets': true,
        'HubSpot CRM': false,
        Webhook: true,
        OpenAI: true,
    });

    const handleConnectorToggle = (name, newState) => {
        setConnectorStatus((prev) => ({ ...prev, [name]: newState }));
    };

    const connectors = [
        { name: 'Gmail', icon: Icons.Mail, connected: connectorStatus.Gmail, category: 'Email' },
        { name: 'Slack', icon: Icons.MessageCircle, connected: connectorStatus.Slack, category: 'Mensajería' },
        { name: 'WhatsApp', icon: Icons.MessageCircle, connected: connectorStatus.WhatsApp, category: 'Mensajería' },
        { name: 'PDF Generator', icon: Icons.File, connected: connectorStatus['PDF Generator'], category: 'Documentos' },
        { name: 'CSV Parser', icon: Icons.Table, connected: connectorStatus['CSV Parser'], category: 'Datos' },
        { name: 'Google Sheets', icon: Icons.Table, connected: connectorStatus['Google Sheets'], category: 'Datos' },
        { name: 'HubSpot CRM', icon: Icons.Link, connected: connectorStatus['HubSpot CRM'], category: 'CRM' },
        { name: 'Webhook', icon: Icons.Link, connected: connectorStatus.Webhook, category: 'APIs' },
        { name: 'OpenAI', icon: Icons.Bot, connected: connectorStatus.OpenAI, category: 'IA' },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-[#F0F4FF] font-sans relative">
            <ParticleBackground />
            <div className="fixed inset-0 pointer-events-none opacity-50 bg-grid z-0" />

            {/* Navbar */}
            <Navbar onClose={onClose} />

            {/* Contenido principal con scroll */}
            <div className="relative z-10 pt-16">
                {/* ========== HERO ========== */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
                    {/* Google Blobs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[215, 190, 250].map((hue, i) => (
                            <div
                                key={i}
                                className="absolute opacity-15"
                                style={{
                                    top: `${30 + i * 25}%`,
                                    left: `${20 + i * 30}%`,
                                    width: `${250 + i * 50}px`,
                                    height: `${250 + i * 50}px`,
                                    background: `radial-gradient(circle at 30% 30%, hsla(${hue}, 80%, 65%, 0.5), transparent 60%)`,
                                    filter: 'blur(40px)',
                                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                                    animation: `morph 8s infinite`,
                                    animationDelay: `${i * 2.5}s`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 text-[#60A5FA] text-[11px] font-medium mb-6 animate-fadeIn">
                            <Icons.Sparkles />
                            Automatización empresarial con IA
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#F0F4FF] mb-4 tracking-tight leading-tight animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            Automatiza tu negocio con{' '}
                            <span className="bg-gradient-to-r from-[#60A5FA] to-[#22D3EE] bg-clip-text text-transparent">
                                inteligencia
                            </span>
                        </h1>
                        <p className="text-[15px] sm:text-[16px] font-normal text-[#8B95B0] max-w-xl mx-auto mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            Diseña flujos de trabajo potentes con n8n, potenciados por IA. Conecta tus servicios, automatiza procesos y delega tareas al asistente inteligente.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <button
                                onClick={() => document.getElementById('flow-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-5 py-2.5 rounded-[8px] bg-[#3B82F6] text-white text-[13px] font-medium hover:bg-[#2563EB] transition-colors flex items-center gap-2 justify-center"
                            >
                                <Icons.Play /> Ver demo en vivo
                            </button>
                            <button
                                onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-5 py-2.5 rounded-[8px] border border-[rgba(59,130,246,0.15)] text-[#F0F4FF] text-[13px] font-medium hover:bg-white/[0.03] transition-colors flex items-center gap-2 justify-center"
                            >
                                <Icons.Bot /> Hablar con IA
                            </button>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <Icons.ChevronDown />
                    </div>
                </section>

                {/* ========== MÉTRICAS ========== */}
                <section ref={metricsRef} className="relative max-w-5xl mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-medium text-[#F0F4FF] mb-2">Métricas en tiempo real</h2>
                        <p className="text-[13px] font-normal text-[#8B95B0]">Monitorea el rendimiento de tus automatizaciones</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Flujos activos', value: flowsCount, icon: Icons.Activity, accent: 'blue' },
                            { label: 'Ejecuciones hoy', value: execsCount, icon: Icons.Play, accent: 'emerald' },
                            { label: 'Errores', value: errorsCount, icon: Icons.AlertCircle, accent: 'red' },
                        ].map((m) => {
                            const accents = {
                                blue: 'border-blue-500/20 bg-blue-500/5',
                                emerald: 'border-emerald-500/20 bg-emerald-500/5',
                                red: 'border-red-500/20 bg-red-500/5',
                            };
                            return (
                                <div
                                    key={m.label}
                                    className={`p-5 rounded-[12px] border ${accents[m.accent]} transition-all duration-700 ${metricsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    style={{ transitionDelay: `${m.label === 'Flujos activos' ? 0 : m.label === 'Ejecuciones hoy' ? 0.15 : 0.3}s` }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[#8B95B0] text-[12px] font-normal mb-1">{m.label}</p>
                                            <p className="text-[#F0F4FF] text-3xl font-medium tracking-tight tabular-nums">{m.value.toLocaleString()}</p>
                                        </div>
                                        <div className={`p-2.5 rounded-[8px] ${accents[m.accent]}`}>
                                            <m.icon />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ========== FLUJO INTELIGENTE ========== */}
                <section id="flow-section" ref={flowRef} className="relative max-w-5xl mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-medium text-[#F0F4FF] mb-2">Flujo Inteligente</h2>
                        <p className="text-[13px] font-normal text-[#8B95B0]">Visualiza y ejecuta automatizaciones con un solo clic</p>
                    </div>

                    <div className={`rounded-[16px] border border-[rgba(59,130,246,0.15)] bg-[#0F1117] overflow-hidden transition-all duration-700 ${flowInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {/* Header del flujo */}
                        <div className="flex items-center justify-between p-4 border-b border-[rgba(59,130,246,0.12)]">
                            <div>
                                <h3 className="text-sm font-medium text-[#F0F4FF]">Onboarding CRM</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <Badge variant="success">Listo para ejecutar</Badge>
                                </div>
                            </div>
                            <button
                                onClick={runFlowDemo}
                                disabled={flowRunning}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-[12px] font-medium transition-all ${flowRunning
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed'
                                    : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                                    }`}
                            >
                                {flowRunning ? (
                                    <>
                                        <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                        Ejecutando...
                                    </>
                                ) : (
                                    <>
                                        <Icons.Play /> Ejecutar demo
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Canvas de nodos */}
                        <div className="relative h-40 bg-[#0A0A0F] overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                            {/* Líneas conectoras */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <line x1="85" y1="62" x2="200" y2="62" stroke="rgba(59,130,246,0.25)" strokeWidth="2" strokeDasharray="6,3" />
                                <line x1="255" y1="62" x2="380" y2="62" stroke="rgba(59,130,246,0.25)" strokeWidth="2" strokeDasharray="6,3" />
                                <line x1="435" y1="62" x2="560" y2="37" stroke="rgba(59,130,246,0.25)" strokeWidth="2" strokeDasharray="6,3" />
                                <line x1="435" y1="62" x2="560" y2="107" stroke="rgba(168,85,247,0.25)" strokeWidth="2" strokeDasharray="6,3" />
                                {flowActiveNode >= 0 && (
                                    <>
                                        {flowActiveNode >= 1 && <line x1="85" y1="62" x2="200" y2="62" stroke="#60A5FA" strokeWidth="2.5" filter="url(#glow)" />}
                                        {flowActiveNode >= 2 && <line x1="255" y1="62" x2="380" y2="62" stroke="#60A5FA" strokeWidth="2.5" filter="url(#glow)" />}
                                        {flowActiveNode >= 3 && <line x1="435" y1="62" x2="560" y2="37" stroke="#60A5FA" strokeWidth="2.5" filter="url(#glow)" />}
                                        {flowActiveNode >= 4 && <line x1="435" y1="62" x2="560" y2="107" stroke="#A78BFA" strokeWidth="2.5" filter="url(#glow)" />}
                                    </>
                                )}
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                </defs>
                            </svg>

                            {nodes.map((n) => (
                                <div key={n.id} className="relative z-10">
                                    <FlowNodeAnimado
                                        type={n.type}
                                        label={n.label}
                                        x={n.x}
                                        y={n.y}
                                        active={flowActiveNode === n.id}
                                        glow={flowActiveNode >= n.id && flowRunning}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Log de ejecución */}
                        {flowLog.length > 0 && (
                            <div className="border-t border-[rgba(59,130,246,0.12)] p-3 max-h-32 overflow-y-auto">
                                <div className="space-y-1">
                                    {flowLog.map((entry, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[11px] animate-fadeIn">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                            <span className="text-[#8B95B0] font-mono text-[10px]">{entry.time}</span>
                                            <span className="text-[#F0F4FF]">{entry.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ========== CHAT IA ========== */}
                <section id="chat-section" ref={chatRef} className="relative max-w-5xl mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-medium text-[#F0F4FF] mb-2">Asistente IA</h2>
                        <p className="text-[13px] font-normal text-[#8B95B0]">Conversa con la IA para crear, depurar y optimizar flujos</p>
                    </div>

                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-700 ${chatInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {/* Sidebar sugerencias + modelo */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="p-5 rounded-[16px] border border-[rgba(59,130,246,0.15)] bg-gradient-to-b from-[#0F1117] to-[#0A0A0F] shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-[10px] bg-[#1A1D2E] border border-[rgba(59,130,246,0.3)] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                        <Icons.Bot />
                                    </div>
                                    <div>
                                        <span className="text-[13px] font-semibold text-[#F0F4FF] block">AutoFlow Nexus</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
                                            <span className="text-[10px] font-medium text-emerald-400">GPT-4o En línea</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[11px] font-medium text-[#8B95B0] mb-3 uppercase tracking-wider">Comandos Rápidos</p>
                                <div className="space-y-2">
                                    {suggestions.map((s) => (
                                        <button
                                            key={s.cmd}
                                            onClick={() => handleSend(s.cmd)}
                                            disabled={isLoading}
                                            className="w-full flex items-center gap-2 text-left px-3 py-2.5 rounded-[8px] bg-[#1A1D2E]/50 border border-[rgba(59,130,246,0.1)] hover:border-[#60A5FA]/40 hover:bg-[#3B82F6]/10 transition-all group/btn relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#3B82F6]/10 to-transparent group-hover/btn:w-full transition-all duration-500 ease-out" />
                                            <span className="text-[11px] font-mono font-semibold text-[#60A5FA] relative z-10">{s.cmd}</span>
                                            <span className="text-[11px] font-normal text-[#8B95B0] group-hover/btn:text-[#F0F4FF] transition-colors relative z-10 truncate">{s.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Indicador de acciones mágicas */}
                            <div className="p-4 rounded-[12px] bg-gradient-to-r from-[#22D3EE]/10 to-[#3B82F6]/10 border border-[#22D3EE]/20 text-center relative overflow-hidden">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#22D3EE]/0 via-[#22D3EE]/10 to-[#3B82F6]/0 animate-pulse pointer-events-none" />
                                <p className="text-[11px] font-medium text-[#22D3EE] flex items-center justify-center gap-1.5 relative z-10">
                                    <Icons.Sparkles /> Nexus puede orquestar flujos autónomamente
                                </p>
                            </div>
                        </div>

                        {/* Panel de chat */}
                        <div className="lg:col-span-2 rounded-[16px] border border-[rgba(59,130,246,0.15)] bg-[#0A0A0F]/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col h-[480px] overflow-hidden">
                            <div className="p-4 border-b border-[rgba(59,130,246,0.12)] bg-[#1A1D2E]/50 flex items-center justify-between">
                                <h3 className="text-[13px] font-medium text-[#F0F4FF] flex items-center gap-2">
                                    <Icons.Activity /> Monitor de Interacciones
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20">
                                    Terminal Activa
                                </span>
                            </div>
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
                                {messages.map((msg) => (
                                    <ChatMessage key={msg.id} {...msg} />
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-4 animate-fadeIn">
                                        <div className="w-8 h-8 rounded-full bg-[#1A1D2E] border border-[rgba(59,130,246,0.3)] flex items-center justify-center mr-3 mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                            <Icons.Bot />
                                        </div>
                                        <div className="px-4 py-3 rounded-[16px] rounded-tl-sm bg-[#1A1D2E]/80 backdrop-blur-md border border-[#60A5FA]/30 flex items-center gap-3 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60A5FA]/10 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent)' }} />
                                            <div className="flex gap-1 relative z-10">
                                                {[0, 150, 300].map((delay) => (
                                                    <span
                                                        key={delay}
                                                        className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-bounce"
                                                        style={{ animationDelay: `${delay}ms` }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[11px] font-mono text-[#60A5FA] animate-pulse relative z-10">Procesando_</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t border-[rgba(59,130,246,0.12)]">
                                <div className="flex items-center gap-2 bg-[#0F1117] border border-[rgba(59,130,246,0.15)] rounded-[10px] px-3 py-1.5 focus-within:border-[#60A5FA]/50 transition-colors">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isLoading ? 'La IA está escribiendo...' : 'Escribe tu mensaje...'}
                                        className="flex-1 bg-transparent text-[12px] font-normal text-[#F0F4FF] placeholder-[#8B95B0] outline-none"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !input.trim()}
                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all flex-shrink-0 ${isLoading || !input.trim() ? 'bg-[#3B82F6]/40 cursor-not-allowed' : 'bg-[#3B82F6] hover:bg-[#2563EB]'
                                            }`}
                                    >
                                        <Icons.Send />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== CONECTORES ========== */}
                <section ref={connectorsRef} className="relative max-w-5xl mx-auto px-4 py-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-medium text-[#F0F4FF] mb-2">Conectores</h2>
                        <p className="text-[13px] font-normal text-[#8B95B0]">Integra tus servicios favoritos. Haz clic para conectar/desconectar.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {connectors.map((c, i) => (
                            <div
                                key={c.name}
                                className={`transition-all duration-700 ${connectorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${i * 0.05}s` }}
                            >
                                <ConnectorCardAnimado {...c} onToggle={handleConnectorToggle} />
                            </div>
                        ))}
                    </div>
                    {/* Resumen */}
                    <div className={`mt-6 p-4 rounded-[12px] border border-[rgba(59,130,246,0.12)] bg-[#1A1D2E] text-center transition-all duration-700 ${connectorsInView ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center justify-center gap-8">
                            <div>
                                <p className="text-xl font-medium text-[#F0F4FF]">{Object.values(connectorStatus).filter(Boolean).length}</p>
                                <p className="text-[10px] font-normal text-[#8B95B0]">Conectados</p>
                            </div>
                            <div className="w-px h-8 bg-[rgba(59,130,246,0.15)]" />
                            <div>
                                <p className="text-xl font-medium text-[#F0F4FF]">{Object.values(connectorStatus).filter((v) => !v).length}</p>
                                <p className="text-[10px] font-normal text-[#8B95B0]">Pendientes</p>
                            </div>
                            <div className="w-px h-8 bg-[rgba(59,130,246,0.15)]" />
                            <div>
                                <p className="text-xl font-medium text-emerald-400">100%</p>
                                <p className="text-[10px] font-normal text-[#8B95B0]">Uptime</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== FOOTER ========== */}
                <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 border-t border-[rgba(59,130,246,0.12)] mt-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Icons.Logo />
                            <span className="text-lg font-medium text-[#F0F4FF]">Auto<span className="font-normal text-[#60A5FA]">Flow</span></span>
                            <span className="text-[10px] sm:text-xs rounded-full px-2 py-0.5 ml-2 bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20">DEMO</span>
                        </div>
                        <p className="text-xs text-[#8B95B0]">
                            Automatización empresarial con n8n · IA · Webhooks
                        </p>
                    </div>
                </footer>
            </div>

            {/* Estilos globales */}
            <style>{`
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 50% / 40% 50% 60% 30%; }
          75% { border-radius: 40% 30% 70% 40% / 60% 30% 50% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * {
          font-family: 'Inter', sans-serif;
        }
        .font-mono {
          font-family: 'JetBrains Mono', monospace !important;
        }
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(59,130,246,0.2);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59,130,246,0.35);
        }
        body {
          background-color: #0A0A0F;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        canvas {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
        </div>
    );
}