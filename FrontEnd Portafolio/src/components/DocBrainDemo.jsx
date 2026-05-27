import React, { useState, useRef, useEffect, useCallback } from 'react';
import ParticleBackground from './ParticleBackground';

/* ============================================================
   HOOKS PERSONALIZADOS
   ============================================================ */

/** Hook para contar animadamente hasta un valor objetivo */
function useCountUp(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      return;
    }
    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, startCounting]);

  return count;
}

/** Hook para detectar si un elemento está en viewport */
function useInView(options = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ============================================================
   DATOS MOCKEADOS
   ============================================================ */

const documentos = [
  {
    id: 1, nombre: 'Manual de RR.HH. 2026', categoria: 'Recursos Humanos', paginas: 128, subido: 'Hace 2 días', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#10B981', colorDoc: '#EF4444',
  },
  {
    id: 2, nombre: 'Contrato Marco de Servicios', categoria: 'Legal', paginas: 45, subido: 'Hace 1 semana', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#F59E0B', colorDoc: '#3B82F6',
  },
  {
    id: 3, nombre: 'Política de Seguridad IT', categoria: 'IT & Seguridad', paginas: 23, subido: 'Hace 3 días', estado: 'indexado', progreso: 100, icono: 'docx', colorCat: '#EF4444', colorDoc: '#3B82F6',
  },
  {
    id: 4, nombre: 'Catálogo de Productos Q1 2026', categoria: 'Ventas', paginas: 89, subido: 'Hace 5 días', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#3B82F6', colorDoc: '#10B981',
  },
  {
    id: 5, nombre: 'Protocolo de Onboarding', categoria: 'Operaciones', paginas: 34, subido: 'Hace 1 hora', estado: 'procesando', progreso: 67, icono: 'docx', colorCat: '#8B5CF6', colorDoc: '#F97316',
  },
  {
    id: 6, nombre: 'Código de Conducta 2026', categoria: 'Compliance', paginas: 12, subido: 'Hace 4 días', estado: 'indexado', progreso: 100, icono: 'txt', colorCat: '#14B8A6', colorDoc: '#6B7280',
  },
];

const initialMessage = {
  role: 'ai',
  text: 'DocBrain Core Engine v2.4 inicializado. He procesado e indexado el 100% de tu repositorio documental corporativo.\n\nExperimenta el poder de la búsqueda semántica ejecutando alguna de las **acciones rápidas** a continuación, o formula un query complejo en lenguaje natural.\n\nGeneraré respuestas determinísticas extrayendo insights accionables y adjuntando la cita exacta de la fuente original.',
};

const formatTextWithBold = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-medium">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

const prebuiltResponses = {
  'Días de vacaciones': {
    text: 'Según el Manual de RR.HH. 2026, los empleados tienen derecho a los siguientes días de vacaciones según su antigüedad:',
    lista: ['1 año: 12 días', '2 años: 14 días', '3 años: 16 días', '4 años: 18 días', '5-9 años: 20 días', '10+ años: 22 días'],
    cita: { documento: 'Manual de RR.HH. 2026', seccion: 'Capítulo 4 · Página 23', fragmento: '"El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días."', pagina: 23 },
  },
  'Proceso de onboarding': {
    text: 'El proceso de onboarding para nuevos empleados consta de 3 fases principales durante el primer mes:',
    lista: ['Día 1: Bienvenida, entrega de equipo y accesos.', 'Semana 1: Entrenamientos de cultura y herramientas.', 'Mes 1: Proyecto semilla y evaluación 360.'],
    cita: { documento: 'Protocolo de Onboarding', seccion: 'Fases · Página 5', fragmento: '"El éxito del nuevo talento depende del primer mes. Las tres fases (Día 1, Semana 1, Mes 1) garantizan una inmersión total en la cultura corporativa."', pagina: 5 },
  },
  'Políticas IT': {
    text: 'Las políticas de seguridad IT establecen lineamientos estrictos para el uso de equipos corporativos:',
    lista: ['Prohibido instalar software no aprobado.', 'Bloqueo automático de pantalla tras 5 minutos.', 'Obligatorio el uso de VPN en redes públicas.'],
    cita: { documento: 'Política de Seguridad IT', seccion: 'Dispositivos · Página 12', fragmento: '"Todo dispositivo asignado debe cumplir con la normativa de seguridad estándar: bloqueo automático (5 min), VPN activa fuera de la oficina y restricción de software de terceros."', pagina: 12 },
  },
  'Productos disponibles': {
    text: 'Los productos nuevos incorporados en el catálogo Q1 2026 son:',
    lista: ['Teclado mecánico RGB v2', 'Monitor curvo 34" 5K', 'Hub USB-C multipuerto'],
    cita: { documento: 'Catálogo de Productos Q1 2026', seccion: 'Sección 3 · Página 12', fragmento: '"La nueva línea de periféricos incluye el teclado mecánico RGB v2 con switches mejorados, el monitor curvo 34 pulgadas con resolución 5K y el hub USB-C con 7 puertos."', pagina: 12 },
  }
};

const estadisticasConsultas = [
  { dia: 'Lun', consultas: 45 }, { dia: 'Mar', consultas: 62 }, { dia: 'Mié', consultas: 38 },
  { dia: 'Jue', consultas: 78 }, { dia: 'Vie', consultas: 91 }, { dia: 'Sáb', consultas: 55 }, { dia: 'Dom', consultas: 32 },
];

const documentosMasConsultados = [
  { nombre: 'Manual RR.HH. 2026', porcentaje: 85 },
  { nombre: 'Contrato Marco', porcentaje: 67 },
  { nombre: 'Catálogo Q1', porcentaje: 52 },
];

const usuariosAcceso = [
  { nombre: 'Admin (tú)', acceso: 'Acceso total', rol: 'admin' },
  { nombre: 'Marketing Team', acceso: 'Solo Catálogo Q1', rol: 'limitado' },
  { nombre: 'RR.HH. Team', acceso: 'Manual + Protocolo', rol: 'limitado' },
  { nombre: 'Legal Team', acceso: 'Contrato Marco', rol: 'limitado' },
];

/* ============================================================
   COMPONENTES REUTILIZABLES
   ============================================================ */

/** Componente estrella: Cita de documento */
function CitaDocumento({ documento, seccion, fragmento, pagina, onVerPagina }) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5 mt-3 mb-2 relative bg-surface border border-subtle border-l-[3px] border-l-blue-500 animate-fade-in-up"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-1">📄</div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
            <span className="text-sm font-medium text-text">{documento}</span>
            <span className="text-xs text-muted">{seccion}</span>
          </div>
          <p className="text-sm italic leading-relaxed mb-3 text-text/80">
            {fragmento}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 bg-green-500/10 text-green-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Fuente verificada ✓
            </span>
            <button
              onClick={() => onVerPagina && onVerPagina(documento, pagina)}
              className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors duration-200 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
            >
              Ver página {pagina} del documento →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tarjeta de documento con barra de progreso si está procesando */
function DocumentCard({ doc }) {
  const progresoFinal = doc.estado === 'procesando' ? 100 : doc.progreso;
  // Animación de progreso
  const [progresoAnim, setProgresoAnim] = useState(doc.progreso);
  useEffect(() => {
    if (doc.estado === 'procesando') {
      const timer = setTimeout(() => setProgresoAnim(100), 500);
      return () => clearTimeout(timer);
    }
  }, [doc.estado]);

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 backdrop-blur-xl border hover:bg-white/10 ${doc.estado === 'indexado' ? 'bg-white/5 border-subtle' : 'bg-white/5 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl" style={{ color: doc.colorDoc }}>{doc.icono === 'pdf' ? '📕' : doc.icono === 'docx' ? '📘' : '📄'}</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm sm:text-base font-medium text-text">{doc.nombre}</span>
            <span className="text-[10px] sm:text-xs font-medium rounded-full px-2 py-0.5 inline-block w-fit" style={{ background: `${doc.colorCat}20`, color: doc.colorCat }}>
              {doc.categoria}
            </span>
          </div>
        </div>
        {doc.estado === 'indexado' ? (
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Procesando
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{doc.paginas} páginas</span>
        <span>{doc.subido}</span>
      </div>
      {doc.estado === 'procesando' && (
        <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out bg-amber-500"
            style={{ width: `${progresoAnim}%` }}
          />
        </div>
      )}
    </div>
  );
}

/** Zona de upload drag & drop */
function UploadZone() {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  const handleClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <div
        className={`rounded-xl p-6 sm:p-8 text-center transition-all duration-300 cursor-pointer bg-surface border-2 border-dashed ${hover ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-subtle'}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => { e.preventDefault(); setHover(false); handleClick(e); }}
      >
        <div className="text-4xl mb-3">📂</div>
        <h3 className="text-lg sm:text-xl font-medium mb-2 text-text">
          Suelta aquí tus PDF, Word o TXT
        </h3>
        <p className="text-sm mb-4 text-muted">
          o haz clic para seleccionar archivos
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {['PDF', 'DOCX', 'TXT', 'MD', 'XLSX'].map((fmt) => (
            <span key={fmt} className="text-xs font-medium rounded-full px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {fmt}
            </span>
          ))}
        </div>
        <button
          className="text-sm font-medium rounded-lg px-5 py-2.5 transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleClick}
        >
          Seleccionar archivos
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-surface border border-subtle rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-muted hover:text-text transition-colors"
              onClick={() => setShowModal(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-5">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-text mb-3">Carga de Documentos (Demo)</h3>
            <p className="text-sm text-muted mb-5 leading-relaxed">
              En un entorno real de producción, al subir un documento, DocBrain ejecuta automáticamente el siguiente pipeline de IA en segundos:
            </p>
            <ol className="text-sm text-muted mb-7 space-y-4">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
                <div>
                  <strong className="text-text block mb-0.5">Extracción y OCR</strong>
                  <span>Lee el texto de PDFs, documentos Word o escaneos estructurando la información.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
                <div>
                  <strong className="text-text block mb-0.5">Chunking Semántico</strong>
                  <span>Divide el documento inteligentemente conservando el contexto de cada párrafo.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
                <div>
                  <strong className="text-text block mb-0.5">Generación de Embeddings</strong>
                  <span>Convierte los textos en vectores matemáticos usando modelos de IA avanzados.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span>
                <div>
                  <strong className="text-text block mb-0.5">Indexación Vectorial</strong>
                  <span>Almacena los vectores en una base de datos especializada (ej. pgvector) para búsquedas instantáneas.</span>
                </div>
              </li>
            </ol>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="text-sm font-medium rounded-lg px-6 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Vista previa de documento modal premium */
function DocViewer({ documento, pagina, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-4xl bg-[#0F111A] border border-subtle rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/5 backdrop-blur-xl p-5 border-b border-subtle flex items-center justify-between">
          <div>
            <h3 className="text-xl font-medium text-text">{documento} — Vista previa</h3>
            <div className="flex items-center gap-2 text-sm mt-1 text-muted">
              <span>Capítulo 4</span>
              <span>›</span>
              <span>Beneficios</span>
              <span>›</span>
              <span>Vacaciones</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors bg-transparent text-muted border border-subtle hover:text-text hover:bg-white/10"
          >
            Cerrar vista previa
          </button>
        </div>
        
        <div className="p-6 sm:p-8 bg-black/20">
          <div className="bg-[#13151E] rounded-xl p-6 border border-subtle shadow-inner mb-6">
            <p className="text-sm sm:text-base leading-relaxed mb-4 text-text/90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              {' '}
              <mark className="bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-medium">
                El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días.
              </mark>
              {' '}
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-sm sm:text-base text-muted/80">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button className="text-sm font-medium rounded-lg px-4 py-2 bg-white/5 text-text border border-subtle hover:bg-white/10 transition-colors flex items-center gap-2">
                <span>←</span> Anterior
              </button>
              <button className="text-sm font-medium rounded-lg px-4 py-2 bg-white/5 text-text border border-subtle hover:bg-white/10 transition-colors flex items-center gap-2">
                Siguiente <span>→</span>
              </button>
            </div>
            <span className="text-sm font-medium text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-subtle">
              Página {pagina} de 128
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Toggle switch */
function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <span className="text-sm" style={{ color: '#F0F4FF' }}>{label}</span>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-blue-500' : 'bg-gray-700'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-4' : ''
            }`}
        />
      </div>
    </label>
  );
}

/** Barra de progreso simple */
function ProgressBar({ value, max = 100, color = '#3B82F6' }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, background: color }}
      />
    </div>
  );
}

/** Loading dots animados */
function LoadingDots() {
  return (
    <div className="flex gap-1.5 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full loading-dot"
          style={{ background: '#60A5FA' }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */
export default function DocBrainDemo({ onClose }) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([initialMessage]);
  const [history, setHistory] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showDocViewer, setShowDocViewer] = useState(null); // { documento, pagina }
  const [filtroDocumento, setFiltroDocumento] = useState('todos');
  const [modoBusqueda, setModoBusqueda] = useState('semantica'); // 'exacta' | 'semantica'
  const [numFragmentos, setNumFragmentos] = useState(5);
  const [umbralConfianza, setUmbralConfianza] = useState(85);
  const [citarFuente, setCitarFuente] = useState(true);
  const [soloDocumentos, setSoloDocumentos] = useState(true);
  const chatContainerRef = useRef(null);

  // Scroll al inicio al abrir el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll al final del chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isAiLoading]);

  // Referencias para count-up
  const [metricsRef, metricsInView] = useInView();
  const countDocs = useCountUp(47, 2000, metricsInView);
  const countPages = useCountUp(3842, 2000, metricsInView);
  const countPreguntas = useCountUp(128, 2000, metricsInView);
  const countPrecision = useCountUp(94, 2000, metricsInView);

  // Manejar envío de chat
  const handleSendMessage = (textOverride) => {
    const textToUse = typeof textOverride === 'string' ? textOverride : chatInput;
    const trimmed = textToUse.trim();
    if (!trimmed || isAiLoading) return;
    
    setChatMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setHistory(prev => [{ pregunta: trimmed, fecha: 'Justo ahora' }, ...prev]);
    setChatInput('');
    setIsAiLoading(true);
    
    setTimeout(() => {
      let aiResponse = prebuiltResponses[trimmed];
      
      if (!aiResponse) {
         aiResponse = {
           role: 'ai',
           text: '¡Excelente pregunta! Como esta es una demostración, tus documentos reales aún no están conectados. En un entorno de producción con tu propia cuenta, DocBrain buscaría semánticamente en toda tu base de datos y te daría la respuesta exacta citando la página de referencia.'
         };
      } else {
         aiResponse = { role: 'ai', ...aiResponse };
      }

      setChatMessages(prev => [...prev, aiResponse]);
      setIsAiLoading(false);
    }, 1500);
  };

  // Mostrar vista previa de documento
  const handleVerPagina = (documento, pagina) => {
    setShowDocViewer({ documento, pagina });
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loading-dot {
          animation: bounceDot 1.2s ease-in-out infinite;
        }
        .loading-dot:nth-child(1) { animation-delay: 0s; }
        .loading-dot:nth-child(2) { animation-delay: 0.15s; }
        .loading-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        * { scroll-behavior: smooth; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      <div className="min-h-screen font-sans bg-bg text-text relative">
        <ParticleBackground />
        <div className="absolute inset-0 bg-grid z-0 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          {/* ========== HEADER STICKY ========== */}
          <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 gap-3 bg-surface/80 backdrop-blur-xl border-b border-subtle shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 z-10">
              {onClose && (
                <button
                  onClick={onClose}
                  className="mr-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/5 text-muted text-[12px] font-medium hover:text-text hover:bg-white/10 border border-subtle transition-all"
                >
                  ← Volver
                </button>
              )}
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="17" cy="17" r="3" stroke="#60A5FA" strokeWidth="1.5" />
                </svg>
                <span className="text-sm sm:text-base font-medium tracking-tight text-text">
                  Doc<span className="font-normal text-blue-400">Brain</span>
                </span>
              </div>
              <span className="text-[10px] sm:text-xs rounded-full px-2.5 py-0.5 hidden sm:inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20">DEMO</span>
            </div>
            <div className="flex items-center gap-3 z-10">
              <span className="hidden md:flex items-center gap-2 text-xs rounded-full px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                Empresa: TechCorp SA
              </span>
            </div>
          </header>

          {/* ========== HERO SECTION ========== */}
          <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden z-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[200, 220, 260].map((hue, i) => (
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
                RAG Empresarial — Powered by LlamaIndex
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-text mb-4 tracking-tight leading-tight animate-fade-in delay-100">
                Tu empresa sabe <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">más de lo que crees</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium mb-6 text-blue-400 animate-fade-in delay-200">
                DocBrain lo encuentra en segundos
              </p>
              <p className="text-[15px] sm:text-[16px] font-normal text-muted max-w-xl mx-auto mb-8 animate-fade-in delay-300">
                Conecta tus manuales, contratos y políticas. Obtén respuestas precisas con la página exacta como fuente. Nunca más buscar en carpetas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-300">
                <button
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-2.5 rounded-[8px] bg-blue-500 text-white text-[13px] font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  ▶ Ver demo
                </button>
                <button
                  onClick={() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-2.5 rounded-[8px] border border-blue-500/30 text-blue-400 text-[13px] font-medium hover:bg-blue-500/10 transition-colors flex items-center gap-2 justify-center"
                >
                  📄 Explorar documentos
                </button>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-muted hover:text-text transition-colors" onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          {/* ===== SECCIÓN 2: MÉTRICAS ===== */}
          <section id="metrics" ref={metricsRef} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '📚', value: countDocs, label: 'Documentos indexados', suffix: '' },
                { icon: '📄', value: countPages, label: 'Páginas procesadas', suffix: '' },
                { icon: '💬', value: countPreguntas, label: 'Preguntas respondidas hoy', suffix: '' },
                { icon: '🎯', value: countPrecision, label: 'Precisión de respuestas', suffix: '%' },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 sm:p-5 flex flex-col gap-1.5 bg-white/5 backdrop-blur-xl border border-subtle"
                >
                  <span className="text-2xl">{metric.icon}</span>
                  <span className="text-2xl sm:text-3xl font-medium text-text">
                    {metric.value.toLocaleString()}{metric.suffix}
                  </span>
                  <span className="text-xs sm:text-sm text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SECCIÓN 3: BIBLIOTECA DE DOCUMENTOS ===== */}
          <section id="biblioteca" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-text">Biblioteca de Documentos</h2>
            <p className="text-sm sm:text-base mb-6 text-muted">Arrastra documentos o haz clic para subir</p>

            <div className="mb-6">
              <UploadZone />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {documentos.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>

            <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle">
              <h3 className="text-lg font-medium mb-4 text-text">Almacenamiento</h3>
              <ProgressBar value={2.3} max={10} color="#3B82F6" />
              <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-muted">
                <span>2.3 GB de 10 GB usados</span>
                <span>47 documentos · 3,842 páginas indexadas</span>
              </div>
              <button className="mt-4 text-xs font-medium rounded-lg px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                Gestionar almacenamiento
              </button>
            </div>
          </section>

          {/* ===== SECCIÓN 4: CHAT RAG ===== */}
          <section id="chat" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-text">Consulta tus Documentos</h2>
            <p className="text-sm sm:text-base mb-6 text-muted">
              La IA responde solo con información de TUS documentos. Siempre con fuente.
            </p>

            <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-subtle h-[600px] max-h-[80vh]">
              {/* Sidebar */}
              <div className="hidden lg:flex lg:flex-col w-full lg:w-64 lg:min-w-[256px] p-4 gap-4 bg-surface/50 border-r border-subtle overflow-y-auto custom-scrollbar">
                <button
                  className="text-sm font-medium rounded-lg py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  onClick={() => setChatMessages([initialMessage])}
                >
                  + Nueva consulta
                </button>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">Filtrar por documento</span>
                  <div className="flex flex-col gap-1">
                    {['Todos los documentos', 'Manual RR.HH. 2026', 'Contrato Marco', 'Política Seguridad IT', 'Catálogo Productos'].map((filtro) => (
                      <button
                        key={filtro}
                        onClick={() => setFiltroDocumento(filtro)}
                        className={`text-left text-xs sm:text-sm rounded-lg px-3 py-2 transition-colors flex items-center gap-2.5 ${filtroDocumento === filtro ? 'bg-blue-500/10 text-blue-400' : 'text-muted hover:text-text hover:bg-white/5'
                          }`}
                      >
                        <div className={`w-3.5 h-3.5 flex-shrink-0 rounded-sm flex items-center justify-center transition-colors ${filtroDocumento === filtro ? 'bg-blue-500' : 'bg-black/20 border border-white/20'}`}>
                          {filtroDocumento === filtro && <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span className="truncate">{filtro}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">Historial</span>
                  <div className="flex flex-col gap-1">
                    {history.length === 0 ? (
                      <span className="text-xs text-muted/60 px-2">Aún no hay consultas</span>
                    ) : (
                      history.map((item, idx) => (
                        <div key={idx} className="rounded-lg px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors">
                          <span className="text-xs sm:text-sm block text-text truncate">{item.pregunta}</span>
                          <span className="text-[10px] text-muted">{item.fecha}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Panel chat */}
              <div className="flex-1 flex flex-col bg-transparent min-h-0">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 custom-scrollbar" ref={chatContainerRef}>
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.role === 'user' ? (
                        <div className="max-w-[85%] sm:max-w-[70%] rounded-2xl rounded-br-md px-4 py-3 text-sm sm:text-base bg-blue-500 text-white shadow-md leading-relaxed whitespace-pre-wrap">
                          {formatTextWithBold(msg.text)}
                        </div>
                      ) : (
                        <div className="max-w-[95%] sm:max-w-[85%]">
                          {msg.text && <p className="text-sm sm:text-base mb-2 text-text leading-relaxed whitespace-pre-wrap">{formatTextWithBold(msg.text)}</p>}
                          {msg.lista && (
                            <ul className="list-disc pl-5 mb-3 space-y-1">
                              {msg.lista.map((item, i) => (
                                <li key={i} className="text-sm text-text/80">{item}</li>
                              ))}
                            </ul>
                          )}
                          {msg.cita && (
                            <CitaDocumento
                              documento={msg.cita.documento}
                              seccion={msg.cita.seccion}
                              fragmento={msg.cita.fragmento}
                              pagina={msg.cita.pagina}
                              onVerPagina={handleVerPagina}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.2" fill="none" />
                          <path d="M7 3.5V7.5L9.5 9" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="rounded-2xl px-5 py-3 bg-surface border border-subtle">
                        <LoadingDots />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input bar */}
                <div className="p-4 sm:p-5 border-t border-subtle bg-surface/50">
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">Acciones rápidas sugeridas</span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['Días de vacaciones', 'Proceso de onboarding', 'Políticas IT', 'Productos disponibles'].map((chip) => (
                      <button
                        key={chip}
                        onClick={() => handleSendMessage(chip)}
                        className="text-xs font-medium rounded-full px-3 py-1.5 transition-colors bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Pregunta algo sobre tus documentos..."
                      className="flex-1 text-sm sm:text-base font-medium rounded-xl px-4 py-3 outline-none bg-black/20 border border-subtle text-text focus:border-blue-500/50 transition-colors"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isAiLoading}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isAiLoading ? 'bg-white/10 text-muted' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 9L16 2L9 16L7.5 10.5L2 9Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-[10px] sm:text-xs text-center mt-2.5 text-muted">
                    DocBrain solo responde con información de tus documentos. Nunca inventa respuestas.
                  </p>
                  <p className="text-[10px] sm:text-xs text-center mt-1 text-muted">
                    LlamaIndex RAG · pgvector · GPT-4o
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SECCIÓN 5: VISTA PREVIA DE DOCUMENTO ===== */}
          {showDocViewer && (
            <DocViewer
              documento={showDocViewer.documento}
              pagina={showDocViewer.pagina}
              onClose={() => setShowDocViewer(null)}
            />
          )}

          {/* ===== SECCIÓN 6: ESTADÍSTICAS DE USO ===== */}
          <section id="stats" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-text">Actividad de la Biblioteca</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Consultas esta semana */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-blue-500/30 transition-colors">
                <h3 className="text-sm font-medium mb-3 text-muted">Consultas esta semana</h3>
                <div className="flex items-end gap-1.5 h-24">
                  {estadisticasConsultas.map((dia, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-blue-500/80 hover:bg-blue-400 transition-colors cursor-pointer"
                        style={{ height: `${(dia.consultas / 100) * 100}%` }}
                      />
                      <span className="text-[10px] text-muted">{dia.dia}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentos más consultados */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-blue-500/30 transition-colors">
                <h3 className="text-sm font-medium mb-3 text-muted">Documentos más consultados</h3>
                <div className="space-y-3">
                  {documentosMasConsultados.map((doc, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text">{doc.nombre}</span>
                        <span className="text-blue-400 font-medium">{doc.porcentaje}%</span>
                      </div>
                      <ProgressBar value={doc.porcentaje} max={100} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiempo respuesta */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-blue-500/30 transition-colors">
                <h3 className="text-sm font-medium mb-3 text-muted">Tiempo promedio de respuesta</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-medium text-text">1.2s</span>
                  <span className="text-sm text-green-400">↓ 0.3s vs semana anterior</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#60A5FA" strokeWidth="1.5" />
                    <path d="M10 5v5l3 2" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-muted">Respuesta casi instantánea</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SECCIÓN 7: ADMINISTRACIÓN ===== */}
          <section id="admin" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-text">Administración</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuración RAG */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle">
                <h3 className="text-lg font-medium mb-5 text-text">Configuración RAG</h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm mb-2 text-text">Modo de búsqueda</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setModoBusqueda('exacta')}
                        className={`text-xs font-medium rounded-lg px-4 py-2 transition-colors border ${modoBusqueda === 'exacta' ? 'bg-blue-600 text-white border-blue-500' : 'bg-surface text-muted border-subtle hover:bg-white/10'
                          }`}
                      >
                        Exacta
                      </button>
                      <button
                        onClick={() => setModoBusqueda('semantica')}
                        className={`text-xs font-medium rounded-lg px-4 py-2 transition-colors border ${modoBusqueda === 'semantica' ? 'bg-blue-600 text-white border-blue-500' : 'bg-surface text-muted border-subtle hover:bg-white/10'
                          }`}
                      >
                        Semántica
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-2 text-text">Número de fragmentos: {numFragmentos}</p>
                    <div className="flex gap-2">
                      {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          onClick={() => setNumFragmentos(n)}
                          className={`w-6 h-6 rounded-full text-xs font-medium transition-all border ${numFragmentos === n ? 'bg-blue-600 text-white scale-110 border-blue-500' : 'bg-surface text-muted border-subtle hover:bg-white/10'
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-2 text-text">Umbral de confianza: {umbralConfianza}%</p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={umbralConfianza}
                      onChange={(e) => setUmbralConfianza(e.target.value)}
                      className="w-full h-1.5 rounded-full appearance-none bg-black/40"
                      style={{ accentColor: '#3B82F6' }}
                    />
                  </div>

                  <Toggle label="Citar siempre la fuente" checked={citarFuente} onChange={setCitarFuente} />
                  <Toggle label="Responder solo con documentos" checked={soloDocumentos} onChange={setSoloDocumentos} />
                </div>
              </div>

              {/* Seguridad y Acceso */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle">
                <h3 className="text-lg font-medium mb-5 text-text">Seguridad y Acceso</h3>
                <div className="space-y-3">
                  {usuariosAcceso.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-subtle last:border-0">
                      <div>
                        <p className="text-sm font-medium text-text">{user.nombre}</p>
                        <p className="text-xs text-muted">{user.acceso}</p>
                      </div>
                      <span className={`text-xs rounded-full px-2 py-0.5 border ${user.rol === 'admin'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                        : 'bg-white/5 text-muted border-subtle'
                        }`}>
                        {user.rol}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 text-xs font-medium rounded-lg px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  Gestionar permisos
                </button>
                <p className="text-xs mt-3 text-muted">Último acceso: hace 5 minutos</p>
              </div>
            </div>
          </section>

          {/* ===== FOOTER ===== */}
          <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 border-t border-subtle">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="17" cy="17" r="3" stroke="#60A5FA" strokeWidth="1.5" />
                </svg>
                <span className="text-lg font-medium text-text">Doc<span className="font-normal text-blue-400">Brain</span></span>
                <span className="text-[10px] sm:text-xs rounded-full px-2 py-0.5 ml-2 bg-blue-500/10 text-blue-400 border border-blue-500/20">DEMO</span>
              </div>
              <p className="text-xs text-muted">
                RAG Empresarial con LlamaIndex · pgvector · GPT-4o
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}