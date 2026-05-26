import React, { useState, useRef, useEffect, useCallback } from 'react';
import ParticleBackground from './ParticleBackground';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

/* ============================================================
   HOOKS
   ============================================================ */
const useCountUp = (end, duration = 1500, start = 0, trigger = true, isFloat = false) => {
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
      const current = start + range * eased;
      setValue(isFloat ? current : Math.floor(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, start, trigger, isFloat]);

  return value;
};

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

/* ============================================================
   DATOS MOCKEADOS
   ============================================================ */
const kpiData = [
  { label: 'Ingresos del mes', value: 847320, isCurrency: true, delta: '+12.3%', positive: true, subtitle: 'vs mes anterior' },
  { label: 'Órdenes activas', value: 1847, isCurrency: false, delta: '+8.7%', positive: true, subtitle: 'vs mes anterior' },
  { label: 'Ticket promedio', value: 458, isCurrency: true, delta: '-2.1%', positive: false, subtitle: 'vs mes anterior' },
  { label: 'Tasa de conversión', value: 3.8, isPercent: true, isFloat: true, delta: '+0.4%', positive: true, subtitle: 'vs mes anterior' },
];

const ingresosData = [
  { mes: 'Ene', ingresos: 620000 }, { mes: 'Feb', ingresos: 710000 }, { mes: 'Mar', ingresos: 695000 },
  { mes: 'Abr', ingresos: 780000 }, { mes: 'May', ingresos: 820000 }, { mes: 'Jun', ingresos: 847320 },
];

const topProductosData = [
  { nombre: 'Laptop Pro', ventas: 245 }, { nombre: 'Teclado Mec', ventas: 189 },
  { nombre: 'Monitor 4K', ventas: 167 }, { nombre: 'Webcam HD', ventas: 134 }, { nombre: 'Mouse Ergo', ventas: 98 },
];

const transaccionesData = [
  { id: '#TX-1847', cliente: 'CorpTech SA', producto: 'Laptop Pro X1', monto: '$24,500', status: 'Completado', fecha: '2026-05-21' },
  { id: '#TX-1846', cliente: 'InnovaMex', producto: 'Monitor 4K', monto: '$8,900', status: 'Completado', fecha: '2026-05-21' },
  { id: '#TX-1845', cliente: 'DataFlow', producto: 'Teclado Mec', monto: '$3,200', status: 'Pendiente', fecha: '2026-05-20' },
  { id: '#TX-1844', cliente: 'CloudServ', producto: 'Webcam HD', monto: '$1,850', status: 'Cancelado', fecha: '2026-05-20' },
  { id: '#TX-1843', cliente: 'TechNova', producto: 'Mouse Ergo', monto: '$1,450', status: 'Completado', fecha: '2026-05-19' },
];

const chatHistory = [
  { pregunta: '¿Cuál fue el producto más vendido?', fecha: 'Hoy' },
  { pregunta: 'Ventas por región Q1 2026', fecha: 'Ayer' },
  { pregunta: 'Clientes con mayor churn risk', fecha: 'Hace 2 días' },
  { pregunta: 'Comparar Q1 vs Q4 2025', fecha: 'Hace 3 días' },
];

const conectoresRelacionales = [
  { nombre: 'PostgreSQL', desc: 'Base de datos relacional open source', conectado: true, icono: '🐘' },
  { nombre: 'MySQL', desc: 'Motor de base de datos popular', conectado: false, icono: '🐬' },
  { nombre: 'SQL Server', desc: 'Base de datos empresarial Microsoft', conectado: false, icono: '🔷' },
];
const conectoresCloud = [
  { nombre: 'Supabase', desc: 'Backend como servicio con PostgreSQL', conectado: false, icono: '⚡' },
  { nombre: 'PlanetScale', desc: 'MySQL serverless en la nube', conectado: false, icono: '🪐' },
  { nombre: 'Neon', desc: 'PostgreSQL serverless escalable', conectado: false, icono: '💡' },
];
const conectoresArchivos = [
  { nombre: 'CSV Upload', desc: 'Sube archivos CSV directamente', conectado: true, icono: '📄' },
  { nombre: 'Google Sheets', desc: 'Conecta hojas de cálculo', conectado: false, icono: '📊' },
  { nombre: 'Excel', desc: 'Archivos Excel (.xlsx)', conectado: false, icono: '📗' },
];

const ventasDiariasData = [
  { dia: 'Lun', ventas: 8 }, { dia: 'Mar', ventas: 11 }, { dia: 'Mié', ventas: 9 },
  { dia: 'Jue', ventas: 14 }, { dia: 'Vie', ventas: 15 }, { dia: 'Sáb', ventas: 7 }, { dia: 'Dom', ventas: 3 },
];
const detalleTransacciones = [
  { fecha: '2026-05-18', cliente: 'CorpTech SA', cantidad: 3, precio: '$8,500', sucursal: 'CDMX Norte' },
  { fecha: '2026-05-19', cliente: 'InnovaMex', cantidad: 2, precio: '$8,500', sucursal: 'Guadalajara' },
  { fecha: '2026-05-20', cliente: 'DataFlow', cantidad: 5, precio: '$8,200', sucursal: 'Monterrey' },
  { fecha: '2026-05-21', cliente: 'CloudServ', cantidad: 1, precio: '$8,800', sucursal: 'CDMX Sur' },
];
const top3Semana = [
  { nombre: 'Laptop Pro X1', ventas: 47 }, { nombre: 'Monitor 4K', ventas: 32 }, { nombre: 'Teclado Mec', ventas: 28 },
];

/* ============================================================
   COMPONENTES REUTILIZABLES
   ============================================================ */
function KpiCard({ label, value, isCurrency, isPercent, isFloat, delta, positive, subtitle, delay = 0 }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, 0.1);
  const animatedValue = useCountUp(value, 2000, 0, inView, isFloat);

  let formattedValue = animatedValue;
  if (isFloat) formattedValue = animatedValue.toFixed(1);
  else formattedValue = animatedValue.toLocaleString();

  if (isCurrency) formattedValue = `$${formattedValue} MXN`;
  if (isPercent) formattedValue = `${formattedValue}%`;

  return (
    <div
      ref={cardRef}
      className="kpi-card rounded-xl p-4 sm:p-5 flex flex-col gap-1.5 bg-white/5 backdrop-blur-xl border border-subtle hover:bg-white/10 transition-colors duration-300"
      style={{
        animation: inView ? `fadeSlideUp 0.6s ease-out ${delay}s both` : 'none',
        opacity: inView ? 1 : 0
      }}
    >
      <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-muted">
        {label}
      </span>
      <span className="text-2xl sm:text-3xl font-medium leading-tight tracking-tight text-text">
        {formattedValue}
      </span>
      <div className="flex items-center gap-1.5 mt-1">
        <span
          className={`text-xs sm:text-sm font-medium flex items-center gap-1 ${positive ? 'text-green-400' : 'text-red-400'}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            {positive ? (
              <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
            ) : (
              <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
            )}
          </svg>
          {delta}
        </span>
        <span className="text-[10px] sm:text-xs font-normal text-muted/70">{subtitle}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Completado: { bg: 'rgba(16,185,129,0.12)', text: '#10B981', dot: '#10B981' },
    Pendiente: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B', dot: '#F59E0B' },
    Cancelado: { bg: 'rgba(239,68,68,0.12)', text: '#EF4444', dot: '#EF4444' },
  };
  const c = colors[status] || colors.Pendiente;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-normal rounded-full px-2.5 py-1"
      style={{ background: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {status}
    </span>
  );
}

function ConnectorCard({ nombre, desc, conectado: inicialConectado, icono }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [conectado, setConectado] = useState(inicialConectado);

  const handleConnect = () => {
    if (conectado) return; // Si ya está conectado, sería abrir modal de config
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConectado(true);
    }, 1500);
  };

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 backdrop-blur-xl border ${conectado ? 'bg-green-500/5 border-green-500/20 shadow-[0_0_20px_rgba(16,185,129,0.06)]' : 'bg-white/5 border-subtle hover:border-blue-500/30 hover:bg-white/10'}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl sm:text-3xl">{icono}</span>
        <span
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${conectado ? 'bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-[#3B3F55]'}`}
        />
      </div>
      <span className="text-sm sm:text-base font-medium text-text">{nombre}</span>
      <span className="text-[11px] sm:text-xs font-normal leading-relaxed text-muted">{desc}</span>
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`mt-auto text-xs font-medium rounded-md py-1.5 px-3 transition-all duration-200 border ${
          conectado 
            ? 'bg-transparent text-blue-400 border-blue-500/40 hover:bg-blue-500/10' 
            : isConnecting 
              ? 'bg-blue-500/20 text-yellow-500 border-transparent opacity-70 cursor-wait'
              : 'bg-blue-500/20 text-blue-300 border-transparent hover:bg-blue-500/30 hover:text-white'
        }`}
      >
        {isConnecting ? (
          <span className="flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
            Conectando...
          </span>
        ) : conectado ? 'Configurar' : 'Conectar'}
      </button>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full loading-dot"
          style={{
            background: '#60A5FA',
            animation: `bounceDot 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ReportGeneratorSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPreview(false);
    setProgress(0);
    setStatusText('Analizando tablas de base de datos...');
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 30 && currentProgress < 60) setStatusText('Cruzando métricas de ventas vs inventario...');
      if (currentProgress >= 60 && currentProgress < 90) setStatusText('Generando gráficas predictivas con IA...');
      if (currentProgress >= 90) setStatusText('Ensamblando y renderizando PDF ejecutivo...');
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          setShowPreview(true);
        }, 800);
      } else {
        setProgress(currentProgress);
      }
    }, 400);
  };

  return (
    <section className="animate-fade-in delay-300">
      <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-text">Generador de Reportes</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Configurador */}
        <div className="rounded-xl p-5 sm:p-6 bg-white/5 backdrop-blur-xl border border-subtle">
          <h3 className="text-base sm:text-lg font-medium mb-5 text-text">Crear reporte ejecutivo</h3>
          {['Tipo de reporte', 'Período', 'Formato'].map((label, idx) => (
            <div key={label} className="mb-4">
              <label className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-1.5 text-muted">{label}</label>
              <div className="relative">
                <select
                  className="w-full text-xs sm:text-sm font-normal rounded-lg px-3.5 py-2.5 outline-none appearance-none cursor-pointer bg-black/20 border border-subtle text-text focus:border-blue-500/50 transition-colors"
                  defaultValue={idx === 0 ? 'ventas' : idx === 1 ? 'este_mes' : 'pdf'}
                >
                  {idx === 0 && (<><option value="ventas">Reporte de ventas</option><option value="inventario">Reporte de inventario</option><option value="clientes">Reporte de clientes</option><option value="financiero">Reporte financiero</option></>)}
                  {idx === 1 && (<><option value="este_mes">Este mes</option><option value="mes_anterior">Mes anterior</option><option value="q1_2026">Q1 2026</option></>)}
                  {idx === 2 && (<><option value="pdf">PDF ejecutivo</option><option value="excel">Excel (.xlsx)</option><option value="csv">CSV</option></>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#8B95B0" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </div>
          ))}
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-3 text-muted">Incluir</span>
          {[{ label: 'Gráficas automáticas', checked: true }, { label: 'Resumen ejecutivo con IA', checked: true }, { label: 'Comparativo vs período anterior', checked: true }, { label: 'Predicciones próximo período', checked: false }, { label: 'Alertas y anomalías', checked: false }].map((opt, i) => (
            <label key={i} className={`flex items-center gap-2.5 py-1.5 cursor-pointer text-xs sm:text-sm font-medium ${opt.checked ? 'text-text' : 'text-muted'}`}>
              <div className={`w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0 border transition-colors ${opt.checked ? 'border-blue-500 bg-blue-500' : 'border-subtle bg-transparent'}`}>
                {opt.checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              {opt.label}
            </label>
          ))}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full text-sm sm:text-base font-medium rounded-xl py-3.5 mt-5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:shadow-none"
          >
            {isGenerating ? 'Generando...' : 'Generar con IA'}
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl p-5 sm:p-6 relative overflow-hidden bg-white/5 backdrop-blur-xl border border-subtle flex flex-col justify-center min-h-[380px]">
          {!isGenerating && !showPreview && (
            <div className="text-center text-muted flex flex-col items-center opacity-60">
              <svg className="w-12 h-12 mb-3 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-sm">Configura y presiona "Generar con IA" para ver el reporte interactivo.</p>
            </div>
          )}
          
          {isGenerating && (
            <div className="flex flex-col items-center justify-center w-full max-w-[80%] mx-auto text-center gap-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }}></div>
              </div>
              <p className="text-xs sm:text-sm text-blue-400 font-medium tracking-wide animate-pulse">{statusText}</p>
            </div>
          )}

          {showPreview && (
            <div className="animate-fade-in-up" style={{ animation: 'fadeSlideUp 0.8s ease-out both' }}>
              <div className="absolute top-4 right-4 rounded-full px-3 py-1 text-[9px] sm:text-[10px] font-medium tracking-wider z-10 bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">PREVIEW LISTO</div>
              <div className="rounded-lg p-5 sm:p-7 flex flex-col gap-3.5 text-[#1a1a2e] bg-white/90 min-h-[380px] shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-sm font-medium">📊 InsightAI</span>
                  <span className="text-[10px] text-gray-500">Junio 2026</span>
                </div>
                <h4 className="text-lg font-medium text-gray-900 m-0">Reporte de Ventas — Junio 2026</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed m-0">Las ventas totales del mes alcanzaron $847,320 MXN (+12.3% vs mes anterior). El producto estrella fue Laptop Pro X1 con 245 unidades.</p>
                <div className="bg-gray-50 rounded-lg p-3.5 h-24 flex items-center justify-center border border-gray-200">
                  <ResponsiveContainer width="100%" height={80}>
                    <AreaChart data={ingresosData}><defs><linearGradient id="gradPreview2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="ingresos" stroke="#3B82F6" strokeWidth={1.5} fill="url(#gradPreview2)" /></AreaChart>
                  </ResponsiveContainer>
                </div>
                <table className="w-full text-[10px]">
                  <thead><tr className="border-b border-gray-200">{['Producto', 'Unidades', 'Ingreso'].map(h => <th key={h} className="text-left py-1.5 text-gray-500 font-normal">{h}</th>)}</tr></thead>
                  <tbody>{topProductosData.slice(0, 3).map((p, i) => <tr key={i} className="border-b border-gray-100"><td className="py-1.5 text-gray-900">{p.nombre}</td><td className="py-1.5 text-gray-600">{p.ventas}</td><td className="py-1.5 text-gray-600">${(p.ventas * 3400).toLocaleString()}</td></tr>)}</tbody>
                </table>
                <div className="mt-auto border-t border-gray-200 pt-2.5 flex justify-between text-[9px] text-gray-400"><span>Generado por InsightAI</span><span>Página 1 de 3</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL — ALL IN ONE / MOBILE FIRST
   ============================================================ */
export default function InsightAIDemo({ onClose }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [chatMessages, setChatMessages] = useState([
    { role: 'user', text: '¿Cuál fue mi producto más vendido esta semana?' },
    {
      role: 'ai',
      text: 'El producto más vendido esta semana fue **Laptop Pro X1** con 47 unidades vendidas (+23% vs semana anterior).',
      analysis: 'Analizando tu base de datos de ventas... Detecté un incremento significativo en la categoría de laptops premium, impulsado por la campaña de descuentos corporativos activa desde el lunes.',
      showMiniChart: true,
    },
    { role: 'user', text: '¿Qué clientes tienen mayor probabilidad de no renovar?' },
    {
      role: 'ai',
      text: 'Detecté 3 clientes con alto riesgo de churn basado en su patrón de compras decreciente y tickets de soporte abiertos.',
      analysis: 'CorpTech SA (score: 87/100), InnovaMex (score: 72/100) y DataFlow (score: 68/100) muestran señales de posible no renovación.',
      showClientTable: true,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showExpandedInsight, setShowExpandedInsight] = useState(false);
  const chatEndRef = useRef(null);
  const insightRef = useRef(null);
  const prevChatLength = useRef(4); // Inicial con 4 mensajes
  const prevLoading = useRef(false);

  useEffect(() => {
    // Solo hacer scroll si hay nuevos mensajes o si el bot empezó a escribir
    if (
      chatMessages.length > prevChatLength.current ||
      (isAiLoading && !prevLoading.current)
    ) {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    prevChatLength.current = chatMessages.length;
    prevLoading.current = isAiLoading;
  }, [chatMessages, isAiLoading]);

  // Enviar mensaje en chat
  const handleSendMessage = (overrideText = null) => {
    const textToUse = typeof overrideText === 'string' ? overrideText : chatInput;
    const trimmed = textToUse.trim();
    if (!trimmed || isAiLoading) return;
    
    const newMessages = [...chatMessages, { role: 'user', text: trimmed }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsAiLoading(true);

    setTimeout(() => {
      let aiResponse = {
        role: 'ai',
        text: 'He analizado la información y encuentro datos relevantes que pueden ser de tu interés.',
        analysis: 'Consulta procesada contra el modelo de datos. Resultados obtenidos en 1.2s.',
        showMiniChart: false,
        showClientTable: false,
      };

      const lower = trimmed.toLowerCase();
      if (lower.includes('top productos')) {
        aiResponse = {
          role: 'ai',
          text: 'Aquí están los 3 productos más vendidos de la semana. **Laptop Pro X1** sigue liderando con fuerza.',
          analysis: 'Query ejecutado: SELECT nombre, ventas FROM productos ORDER BY ventas DESC LIMIT 3',
          showMiniChart: true,
        };
      } else if (lower.includes('clientes') || lower.includes('churn')) {
        aiResponse = {
          role: 'ai',
          text: 'Atención: he detectado 3 clientes corporativos con un patrón de compras decreciente que indica riesgo de abandono (churn).',
          analysis: 'Algoritmo predictivo de Churn Risk (XGBoost) detectó anomalías en la frecuencia de órdenes.',
          showClientTable: true,
        };
      } else if (lower.includes('ventas por día') || lower.includes('comparar')) {
        aiResponse = {
          role: 'ai',
          text: 'Las ventas se han mantenido sólidas, mostrando un crecimiento del **+12.3%** comparado con el mes anterior.',
          analysis: 'Cálculo de delta mes a mes completado sobre la serie temporal de ingresos.',
        };
      }

      setChatMessages([...newMessages, aiResponse]);
      setIsAiLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  // Mostrar insight expandido con scroll
  const handleShowInsight = () => {
    setShowExpandedInsight(true);
    setTimeout(() => {
      if (insightRef.current) {
        insightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        .hover-highlight:hover { background: rgba(59,130,246,0.1) !important; }
        * { scrollbar-width: thin; scrollbar-color: rgba(59,130,246,0.2) transparent; }
        *::-webkit-scrollbar { width: 5px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.25); border-radius: 10px; }
        .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      `}</style>

      <div className="min-h-screen font-sans bg-bg text-text relative">
        {/* Glow Effects de fondo */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <ParticleBackground />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute top-0 left-0 w-full h-full bg-grid z-0 opacity-50" />
        </div>

        {/* ========== HEADER STICKY ========== */}
        <header
          className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 gap-3 bg-surface/80 backdrop-blur-xl border-b border-subtle shadow-sm"
        >
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            {onClose && (
              <button
                onClick={onClose}
                className="mr-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/5 text-muted text-[12px] font-medium hover:text-text hover:bg-white/10 border border-subtle transition-all"
              >
                ← Volver
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="sm:hidden text-muted text-[12px] font-medium hover:text-text transition-all px-2"
              >
                ←
              </button>
            )}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
              <rect x="2" y="2" width="18" height="18" rx="5" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
              <circle cx="11" cy="11" r="4" fill="#3B82F6" opacity="0.6" />
              <circle cx="11" cy="11" r="1.5" fill="#60A5FA" />
            </svg>
            <span className="text-sm sm:text-base font-medium tracking-tight text-text">
              Insight<span className="font-normal text-blue-400">AI</span>
            </span>
            <span className="hidden sm:inline text-[11px] sm:text-xs font-normal text-muted">Tu CFO con IA</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 z-10">
            <div
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span>PostgreSQL — Q1 2026</span>
            </div>
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-white shadow-lg shadow-blue-500/20"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}
            >C</div>
          </div>
        </header>

        {/* ========== HERO SECTION ========== */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden z-10">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[210, 240, 280].map((hue, i) => (
              <div
                key={i}
                className="absolute opacity-20"
                style={{
                  top: `${30 + i * 20}%`,
                  left: `${20 + i * 30}%`,
                  width: `${250 + i * 50}px`,
                  height: `${250 + i * 50}px`,
                  background: `radial-gradient(circle at 30% 30%, hsla(${hue}, 80%, 60%, 0.4), transparent 60%)`,
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium mb-6 animate-fade-in">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              Tu CFO Impulsado por IA
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-text mb-4 tracking-tight leading-tight animate-fade-in delay-100">
              Decisiones estratégicas con{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                datos en tiempo real
              </span>
            </h1>
            <p className="text-[15px] sm:text-[16px] font-normal text-muted max-w-xl mx-auto mb-8 animate-fade-in delay-200">
              Conecta tus bases de datos en minutos, analiza métricas clave y genera reportes ejecutivos interactuando directamente en lenguaje natural.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-300">
              <button
                onClick={() => document.getElementById('dashboard-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-[8px] bg-blue-500 text-white text-[13px] font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Ver Demo en vivo
              </button>
              <button
                onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-[8px] border border-blue-500/30 text-blue-400 text-[13px] font-medium hover:bg-blue-500/10 transition-colors flex items-center gap-2 justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                Consultar a la IA
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </section>

        {/* ========== CONTENIDO PRINCIPAL ========== */}
        <main id="dashboard-section" className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-8 space-y-8 sm:space-y-10">

          {/* ===== SECCIÓN 1: DASHBOARD ===== */}
          <section className="animate-fade-in">
            <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-text">Dashboard Ejecutivo</h2>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {kpiData.map((kpi, i) => (
                <KpiCard key={i} {...kpi} delay={i * 0.08} />
              ))}
            </div>

            {/* Gráficas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Ingresos */}
              <div className="rounded-xl p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-subtle">
                <span className="text-sm sm:text-base font-medium block mb-3 text-text">Ingresos últimos 6 meses</span>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={ingresosData}>
                    <defs>
                      <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(59,130,246,0.06)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fill: '#8B95B0', fontSize: 11, fontWeight: 400 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8B95B0', fontSize: 11, fontWeight: 400 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: '#13151E', border: '0.5px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#F0F4FF', fontSize: '12px', fontWeight: 400 }} formatter={(value) => [`$${value.toLocaleString()} MXN`, 'Ingresos']} />
                    <Area type="monotone" dataKey="ingresos" stroke="#3B82F6" strokeWidth={2} fill="url(#gradIngresos)" dot={{ fill: '#3B82F6', r: 3, stroke: '#1A1D2E', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#60A5FA' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Top productos */}
              <div className="rounded-xl p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-subtle">
                <span className="text-sm sm:text-base font-medium block mb-3 text-text">Top 5 productos por venta</span>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topProductosData} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <CartesianGrid stroke="rgba(59,130,246,0.06)" strokeDasharray="3 3" horizontal vertical={false} />
                    <XAxis type="number" tick={{ fill: '#8B95B0', fontSize: 11, fontWeight: 400 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="nombre" type="category" tick={{ fill: '#F0F4FF', fontSize: 11, fontWeight: 400 }} axisLine={false} tickLine={false} width={75} />
                    <Tooltip contentStyle={{ background: '#13151E', border: '0.5px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#F0F4FF', fontSize: '12px', fontWeight: 400 }} formatter={(value) => [`${value} unidades`, 'Ventas']} />
                    <Bar dataKey="ventas" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabla transacciones */}
            <div className="rounded-xl p-4 sm:p-5 table-responsive bg-white/5 backdrop-blur-xl border border-subtle">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm sm:text-base font-medium text-text">Últimas transacciones</span>
                <span className="text-[10px] sm:text-xs font-normal text-muted">5 de 1,847</span>
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-subtle">
                      {['ID', 'Cliente', 'Producto', 'Monto', 'Status', 'Fecha'].map(h => (
                        <th key={h} className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 sm:px-3 py-2 text-muted">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transaccionesData.map((tx, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-blue-400">{tx.id}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-text">{tx.cliente}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-text">{tx.producto}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-text">{tx.monto}</td>
                        <td className="px-2 sm:px-3 py-2.5"><StatusBadge status={tx.status} /></td>
                        <td className="px-2 sm:px-3 py-2.5 text-[10px] sm:text-xs font-normal text-muted">{tx.fecha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Paginación */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-subtle">
                <span className="text-[10px] sm:text-xs font-normal text-muted">Página 1 de 370</span>
                <div className="flex gap-1.5 sm:gap-2">
                  <button className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-md bg-white/5 text-muted border border-subtle hover:text-text hover:bg-white/10 transition-colors">Anterior</button>
                  <button className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-md bg-blue-500 text-white border border-transparent shadow-[0_0_10px_rgba(59,130,246,0.3)]">1</button>
                  <button className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-md bg-white/5 text-muted border border-subtle hover:text-text hover:bg-white/10 transition-colors">2</button>
                  <button className="text-[10px] sm:text-xs font-medium px-2.5 py-1.5 rounded-md bg-white/5 text-muted border border-subtle hover:text-text hover:bg-white/10 transition-colors">Siguiente</button>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SECCIÓN 2: CHAT IA ===== */}
          <section id="chat-section" className="animate-fade-in delay-100">
            <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-text">Chat IA — Consultas en Lenguaje Natural</h2>
            <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-subtle shadow-xl h-[500px] max-h-[65vh] lg:h-[600px] lg:max-h-[70vh]">
              {/* Sidebar historial (escritorio) */}
              <div className="hidden lg:flex lg:flex-col lg:w-64 lg:min-w-[256px] p-4 gap-1 border-r border-subtle bg-black/20">
                <button
                  className="text-sm font-medium rounded-lg py-2.5 px-4 mb-3 transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  onClick={() => setChatMessages([...chatMessages, { role: 'user', text: 'Nueva consulta' }])}
                >+ Nueva consulta</button>
                <span className="text-[10px] font-medium uppercase tracking-wider px-1 mb-1 text-muted">Historial</span>
                {chatHistory.map((item, i) => (
                  <div key={i} className={`rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 hover:bg-white/10 ${i === 0 ? 'bg-blue-500/10 text-blue-400' : 'bg-transparent text-text'}`}>
                    <span className="text-xs sm:text-sm font-medium block leading-tight">{item.pregunta}</span>
                    <span className="text-[10px] font-normal block mt-1 text-muted">{item.fecha}</span>
                  </div>
                ))}
              </div>

              {/* Panel chat */}
              <div className="flex-1 flex flex-col bg-transparent h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 scrollbar-hide">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.role === 'user' ? (
                        <div className="max-w-[85%] sm:max-w-[70%] text-sm sm:text-base font-medium leading-relaxed rounded-2xl rounded-br-md px-4 py-3 bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                          {msg.text}
                        </div>
                      ) : (
                        <div className="max-w-[95%] sm:max-w-[85%] flex flex-col gap-3">
                          <div className="flex items-start gap-3 bg-white/5 backdrop-blur-md rounded-2xl rounded-bl-md p-4 border border-subtle shadow-sm">
                            <div className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.2" fill="none" /><path d="M7 3.5V7.5L9.5 9" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" /></svg>
                            </div>
                            <div>
                              <p className="text-[11px] sm:text-xs font-normal italic m-0 text-muted">{msg.analysis}</p>
                              <p className="text-sm sm:text-base font-normal mt-1.5 leading-relaxed text-text">
                                {msg.text?.replace(/\*\*(.*?)\*\*/g, '«$1»')}
                              </p>
                            </div>
                          </div>
                          {msg.showMiniChart && (
                            <div className="ml-10 rounded-lg p-3 sm:p-4 bg-black/20 border border-subtle">
                              <span className="text-[10px] sm:text-xs font-medium block mb-2 text-muted">Top 3 productos — Esta semana</span>
                              <ResponsiveContainer width="100%" height={90}>
                                <BarChart data={top3Semana}>
                                  <XAxis dataKey="nombre" tick={{ fill: '#8B95B0', fontSize: 10, fontWeight: 400 }} axisLine={false} tickLine={false} />
                                  <Tooltip contentStyle={{ background: '#13151E', border: '0.5px solid rgba(59,130,246,0.3)', borderRadius: '6px', color: '#F0F4FF', fontSize: '11px' }} />
                                  <Bar dataKey="ventas" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={28} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          )}
                          {msg.showClientTable && (
                            <div className="ml-10 rounded-lg p-3 sm:p-4 bg-red-500/5 border border-red-500/20">
                              <span className="text-[10px] sm:text-xs font-medium block mb-2 text-red-400">⚠ Clientes en riesgo de churn</span>
                              {[{ nombre: 'CorpTech SA', score: 87 }, { nombre: 'InnovaMex', score: 72 }, { nombre: 'DataFlow', score: 68 }].map((c, j) => (
                                <div key={j} className={`flex justify-between py-1.5 ${j < 2 ? 'border-b border-red-500/10' : ''}`}>
                                  <span className="text-xs sm:text-sm font-medium text-text">{c.nombre}</span>
                                  <span className="text-xs sm:text-sm font-medium text-red-400">Riesgo: {c.score}%</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.2" fill="none" /><path d="M7 3.5V7.5L9.5 9" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      </div>
                      <div className="rounded-2xl px-5 py-3 bg-white/5 backdrop-blur-md border border-subtle">
                        <LoadingDots />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input bar */}
                <div className="p-4 sm:p-5 bg-black/20 border-t border-subtle backdrop-blur-md">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['Top productos', 'Ventas por día', 'Clientes nuevos', 'Comparar períodos'].map(chip => (
                      <button key={chip} onClick={() => handleSendMessage(chip)} className="text-[10px] sm:text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-200 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20">{chip}</button>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Pregúntale a tus datos..."
                      className="flex-1 text-sm sm:text-base font-normal rounded-xl px-4 py-3 outline-none bg-black/20 border border-subtle text-text focus:border-blue-500/50 focus:bg-black/40 transition-all placeholder:text-muted"
                    />
                    <button
                      onClick={handleSendMessage} disabled={isAiLoading}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.3)] disabled:shadow-none"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9L16 2L9 16L7.5 10.5L2 9Z" fill="currentColor" /></svg>
                    </button>
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-normal text-center mt-2.5 text-muted">GPT-4o · LangChain SQL Agent · Conectado a PostgreSQL</p>
                </div>
              </div>
            </div>
            {/* Botón Ver reporte completo (flotante en el chat) */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleShowInsight}
                className="text-xs sm:text-sm font-medium rounded-lg px-4 py-2.5 transition-all duration-200 bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20"
              >
                Ver insight interactivo completo ↓
              </button>
            </div>
          </section>

          {/* ===== SECCIÓN 3: CONECTORES ===== */}
          <section className="animate-fade-in delay-200">
            <h2 className="text-lg sm:text-xl font-medium mb-1 sm:mb-1.5 text-text">Conecta tus fuentes de datos</h2>
            <p className="text-xs sm:text-sm font-normal mb-5 sm:mb-6 text-muted">InsightAI se conecta a cualquier DB en menos de 2 minutos</p>

            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-3 text-muted">Bases de datos relacionales</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {conectoresRelacionales.map((c, i) => <ConnectorCard key={i} {...c} />)}
            </div>

            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-3 text-muted">Cloud databases</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {conectoresCloud.map((c, i) => <ConnectorCard key={i} {...c} />)}
            </div>

            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-3 text-muted">Archivos y hojas de cálculo</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {conectoresArchivos.map((c, i) => <ConnectorCard key={i} {...c} />)}
            </div>

            {/* Conexión activa */}
            <div className="rounded-xl p-4 sm:p-6 bg-green-500/5 backdrop-blur-md border border-green-500/20 shadow-[0_0_30px_rgba(16,185,129,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm sm:text-base font-medium text-text">Conexión activa: PostgreSQL</span>
                </div>
                <span className="text-[10px] sm:text-xs font-normal text-muted">Sincronizado hace 5 min</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {[{ label: 'Host', value: 'db.insightai-prod.com' }, { label: 'Base de datos', value: 'ventas_q1_2026' }, { label: 'Tablas detectadas', value: '8 tablas' }].map((item, i) => (
                  <div key={i} className="rounded-lg p-3 sm:p-4 bg-black/20 border border-subtle">
                    <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider block mb-1 text-muted">{item.label}</span>
                    <span className="text-sm sm:text-base font-medium text-text">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5">
                <button className="text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.2)]">Resincronizar</button>
                <button className="text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-5 py-2 sm:py-2.5 bg-transparent text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-colors">Ver esquema</button>
              </div>
            </div>
          </section>

          {/* ===== SECCIÓN 4: GENERADOR DE REPORTES ===== */}
          <ReportGeneratorSection />

          {/* ===== SECCIÓN 5: INSIGHT EXPANDIDO (condicional) ===== */}
          {showExpandedInsight && (
            <section ref={insightRef} className="animate-fade-in delay-100">
              <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-text">Insight Expandido</h2>
              <div className="rounded-xl p-4 sm:p-5 mb-5 bg-blue-500/5 border border-blue-500/20 backdrop-blur-md">
                <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider block mb-1.5 text-blue-300">Consulta original</span>
                <span className="text-sm sm:text-base font-medium text-blue-100">"¿Cuál fue mi producto más vendido esta semana?"</span>
              </div>
              <p className="text-sm sm:text-base font-normal leading-relaxed mb-5 text-text">
                Analizando tu base de datos de ventas para la semana del 18 al 24 de mayo de 2026, identifiqué que{' '}
                <strong className="font-medium text-blue-400">Laptop Pro X1</strong> fue el producto con mayor volumen, totalizando 47 unidades (+23% vs semana anterior), impulsado por la renovación de equipos de CorpTech SA.
              </p>
              <div className="rounded-xl p-4 sm:p-5 mb-5 bg-white/5 backdrop-blur-xl border border-subtle">
                <span className="text-sm sm:text-base font-medium block mb-3 text-text">Ventas diarias — Laptop Pro X1 (Esta semana)</span>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={ventasDiariasData}>
                    <defs><linearGradient id="gradLaptop2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid stroke="rgba(59,130,246,0.06)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="dia" tick={{ fill: '#8B95B0', fontSize: 12, fontWeight: 400 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8B95B0', fontSize: 12, fontWeight: 400 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#13151E', border: '0.5px solid rgba(59,130,246,0.3)', borderRadius: '8px', color: '#F0F4FF', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={2.5} fill="url(#gradLaptop2)" dot={{ fill: '#3B82F6', r: 4, stroke: '#1A1D2E', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5">
                {[{ label: 'Unidades vendidas', value: '47', sub: 'Esta semana' }, { label: 'Ingreso generado', value: '$45,830 MXN', sub: 'Precio promedio $975' }, { label: 'Margen bruto', value: '34.2%', sub: '+2.1% vs semana anterior' }].map((m, i) => (
                  <div key={i} className="rounded-xl p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-subtle">
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider block mb-1.5 text-muted">{m.label}</span>
                    <span className="text-xl sm:text-2xl font-medium block mb-1 text-text">{m.value}</span>
                    <span className="text-[10px] sm:text-xs font-normal text-muted">{m.sub}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 sm:p-5 mb-5 table-responsive bg-white/5 backdrop-blur-xl border border-subtle">
                <span className="text-sm sm:text-base font-medium block mb-3 text-text">Detalle de transacciones</span>
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left min-w-[550px]">
                    <thead><tr className="border-b border-subtle">{['Fecha', 'Cliente', 'Cantidad', 'Precio', 'Sucursal'].map(h => <th key={h} className="text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 sm:px-3 py-2 text-muted">{h}</th>)}</tr></thead>
                    <tbody>{detalleTransacciones.map((tx, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-text">{tx.fecha}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-text">{tx.cliente}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-blue-400">{tx.cantidad}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium text-green-400">{tx.precio}</td>
                        <td className="px-2 sm:px-3 py-2.5 text-[10px] sm:text-xs font-normal text-muted">{tx.sucursal}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button className="text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]">Exportar CSV</button>
                <button className="text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-5 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]">Generar PDF</button>
                <button onClick={() => setShowExpandedInsight(false)} className="text-xs sm:text-sm font-medium rounded-lg px-4 sm:px-5 py-2.5 bg-transparent text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-colors">Ocultar</button>
              </div>
            </section>
          )}

        </main>
      </div>
    </>
  );
}