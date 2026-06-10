import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
    id: 1, nombre: 'docbrain.docName1', categoria: 'docbrain.catHR', paginas: 128, subido: 'docbrain.subido1', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#10B981', colorDoc: '#EF4444',
  },
  {
    id: 2, nombre: 'docbrain.docName2', categoria: 'docbrain.catLegal', paginas: 45, subido: 'docbrain.subido2', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#F59E0B', colorDoc: '#3B82F6',
  },
  {
    id: 3, nombre: 'docbrain.docName3', categoria: 'docbrain.catIT', paginas: 23, subido: 'docbrain.subido3', estado: 'indexado', progreso: 100, icono: 'docx', colorCat: '#EF4444', colorDoc: '#3B82F6',
  },
  {
    id: 4, nombre: 'docbrain.docName4', categoria: 'docbrain.catSales', paginas: 89, subido: 'docbrain.subido4', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#3B82F6', colorDoc: '#10B981',
  },
  {
    id: 5, nombre: 'docbrain.docName5', categoria: 'docbrain.catOps', paginas: 34, subido: 'docbrain.subido5', estado: 'procesando', progreso: 67, icono: 'docx', colorCat: '#8B5CF6', colorDoc: '#F97316',
  },
  {
    id: 6, nombre: 'docbrain.docName6', categoria: 'docbrain.catComp', paginas: 12, subido: 'docbrain.subido6', estado: 'indexado', progreso: 100, icono: 'txt', colorCat: '#14B8A6', colorDoc: '#6B7280',
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
    text: 'docbrain.q1Text',
    lista: 'docbrain.q1List',
    cita: { documento: 'docbrain.docName1', seccion: 'docbrain.q1CitaSec', fragmento: 'docbrain.q1CitaFrag', pagina: 23 },
  },
  'Proceso de onboarding': {
    text: 'docbrain.q2Text',
    lista: 'docbrain.q2List',
    cita: { documento: 'docbrain.docName5', seccion: 'docbrain.q2CitaSec', fragmento: 'docbrain.q2CitaFrag', pagina: 5 },
  },
  'Políticas IT': {
    text: 'docbrain.q3Text',
    lista: 'docbrain.q3List',
    cita: { documento: 'docbrain.docName3', seccion: 'docbrain.q3CitaSec', fragmento: 'docbrain.q3CitaFrag', pagina: 12 },
  },
  'Productos disponibles': {
    text: 'docbrain.q4Text',
    lista: 'docbrain.q4List',
    cita: { documento: 'docbrain.docName4', seccion: 'docbrain.q4CitaSec', fragmento: 'docbrain.q4CitaFrag', pagina: 12 },
  }
};

const estadisticasConsultas = [
  { dia: 'docbrain.day1', consultas: 45 }, { dia: 'docbrain.day2', consultas: 62 }, { dia: 'docbrain.day3', consultas: 38 },
  { dia: 'docbrain.day4', consultas: 78 }, { dia: 'docbrain.day5', consultas: 91 }, { dia: 'docbrain.day6', consultas: 55 }, { dia: 'docbrain.day7', consultas: 32 },
];

const documentosMasConsultados = [
  { nombre: 'docbrain.docShort1', porcentaje: 85 },
  { nombre: 'docbrain.docShort2', porcentaje: 67 },
  { nombre: 'docbrain.docShort4', porcentaje: 52 },
];

const usuariosAcceso = [
  { nombre: 'Admin (tú)', acceso: 'docbrain.roleAdmin', rol: 'admin' },
  { nombre: 'Marketing Team', acceso: 'docbrain.access1', rol: 'limitado' },
  { nombre: 'RR.HH. Team', acceso: 'docbrain.access2', rol: 'limitado' },
  { nombre: 'Legal Team', acceso: 'docbrain.docShort2', rol: 'limitado' },
];

/* ============================================================
   COMPONENTES REUTILIZABLES
   ============================================================ */

/** Componente estrella: Cita de documento */
function CitaDocumento({ documento, seccion, fragmento, pagina, onVerPagina }) {
  const { t } = useTranslation();
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
              {t('docbrain.citeSource')}
            </span>
            <button
              onClick={() => onVerPagina && onVerPagina(documento, pagina)}
              className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors duration-200 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20"
            >
              {t('docbrain.btnViewPage1')} {pagina} {t('docbrain.btnViewPage2')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tarjeta de documento con barra de progreso si está procesando */
function DocumentCard({ doc }) {
  const { t } = useTranslation();
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
            <span className="text-sm sm:text-base font-medium text-text">{t(doc.nombre)}</span>
            <span className="text-[10px] sm:text-xs font-medium rounded-full px-2 py-0.5 inline-block w-fit" style={{ background: `${doc.colorCat}20`, color: doc.colorCat }}>
              {t(doc.categoria)}
            </span>
          </div>
        </div>
        {doc.estado === 'indexado' ? (
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {t('docbrain.docProcessing')}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{doc.paginas} {t('docbrain.docPages')}</span>
        <span>{t(doc.subido)}</span>
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
  const { t } = useTranslation();
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
          {t('docbrain.uploadTitle')}
        </h3>
        <p className="text-sm mb-4 text-muted">
          {t('docbrain.uploadSubtitle')}
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
          {t('docbrain.btnSelectFiles')}
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
            <h3 className="text-xl sm:text-2xl font-medium text-text mb-3">{t('docbrain.uploadModalTitle')}</h3>
            <p className="text-sm text-muted mb-5 leading-relaxed">
              {t('docbrain.uploadModalDesc')}
            </p>
            <ol className="text-sm text-muted mb-7 space-y-4">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
                <div>
                  <strong className="text-text block mb-0.5">{t('docbrain.step1Title')}</strong>
                  <span>{t('docbrain.step1Desc')}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
                <div>
                  <strong className="text-text block mb-0.5">{t('docbrain.step2Title')}</strong>
                  <span>{t('docbrain.step2Desc')}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
                <div>
                  <strong className="text-text block mb-0.5">{t('docbrain.step3Title')}</strong>
                  <span>{t('docbrain.step3Desc')}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span>
                <div>
                  <strong className="text-text block mb-0.5">{t('docbrain.step4Title')}</strong>
                  <span>{t('docbrain.step4Desc')}</span>
                </div>
              </li>
            </ol>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="text-sm font-medium rounded-lg px-6 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                {t('docbrain.btnGotIt')}
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
  const { t } = useTranslation();
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
            <h3 className="text-xl font-medium text-text">{documento} {t('docbrain.viewerPreview')}</h3>
            <div className="flex items-center gap-2 text-sm mt-1 text-muted">
              <span>{t("docbrain.chapter4")}</span>
              <span>›</span>
              <span>{t("docbrain.benefits")}</span>
              <span>›</span>
              <span>{t("docbrain.vacations")}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors bg-transparent text-muted border border-subtle hover:text-text hover:bg-white/10"
          >
            {t('docbrain.viewerClose')}
          </button>
        </div>
        
        <div className="p-6 sm:p-8 bg-black/20">
          <div className="bg-[#13151E] rounded-xl p-6 border border-subtle shadow-inner mb-6">
            <p className="text-sm sm:text-base leading-relaxed mb-4 text-text/90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              {' '}
              <mark className="bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-medium">{t("docbrain.citation")}</mark>
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
                <span>←</span>{t("docbrain.prev")}</button>
              <button className="text-sm font-medium rounded-lg px-4 py-2 bg-white/5 text-text border border-subtle hover:bg-white/10 transition-colors flex items-center gap-2">{t("docbrain.next")}<span>→</span>
              </button>
            </div>
            <span className="text-sm font-medium text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-subtle">
              {t('docbrain.viewerPage')} {pagina} {t('docbrain.viewerOf')} 128
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Toggle switch premium */
function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group w-full">
      <span className="text-sm text-text group-hover:text-white transition-colors">{label}</span>
      <div
        className={`relative w-11 h-6 flex-shrink-0 rounded-full transition-all duration-300 ${checked ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-black/40 border border-subtle'}`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </div>
    </label>
  );
}

/** Barra de progreso interactiva */
function ProgressBar({ value, max = 100, color = '#3B82F6' }) {
  return (
    <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-subtle">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
        style={{ width: `${(value / max) * 100}%`, background: color, boxShadow: `0 0 10px ${color}50` }}
      >
        <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }} />
      </div>
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
  const { t, i18n } = useTranslation();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'ai',
      text: t('docbrain.aiWelcome')
    }
  ]);
  const [history, setHistory] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showDocViewer, setShowDocViewer] = useState(null); // { documento, pagina }
  const [filtroDocumento, setFiltroDocumento] = useState('todos');

  // Update chat initial message when language changes
  useEffect(() => {
    setChatMessages([
      {
        role: 'ai',
        text: t('docbrain.aiWelcome')
      }
    ]);
    setHistory([]);
  }, [i18n.language, t]);

  const [modoBusqueda, setModoBusqueda] = useState('semantica'); // 'exacta' | 'semantica'
  const [numFragmentos, setNumFragmentos] = useState(5);
  const [umbralConfianza, setUmbralConfianza] = useState(85);
  const [citarFuente, setCitarFuente] = useState(true);
  const [soloDocumentos, setSoloDocumentos] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const chatContainerRef = useRef(null);

  // Bloquear scroll para modal demo
  useEffect(() => {
    if (showDemoModal) {
      document.body.style.overflow = 'hidden';
    } else if (!showDocViewer) {
      document.body.style.overflow = 'unset';
    }
  }, [showDemoModal, showDocViewer]);

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
    setHistory(prev => [{ pregunta: trimmed, fecha: t('docbrain.justNow') }, ...prev]);
    setChatInput('');
    setIsAiLoading(true);
    
    setTimeout(() => {
      let originalKey = trimmed;
      if (trimmed === t('docbrain.q1')) originalKey = 'Días de vacaciones';
      if (trimmed === t('docbrain.q2')) originalKey = 'Proceso de onboarding';
      if (trimmed === t('docbrain.q3')) originalKey = 'Políticas IT';
      if (trimmed === t('docbrain.q4')) originalKey = 'Productos disponibles';

      let aiResponse = prebuiltResponses[originalKey];
      
      if (!aiResponse) {
         aiResponse = {
           role: 'ai',
           text: t('docbrain.aiFallback')
         };
      } else {
         aiResponse = { 
           role: 'ai', 
           text: t(aiResponse.text),
           lista: t(aiResponse.lista, { returnObjects: true }),
           cita: {
             documento: t(aiResponse.cita.documento),
             seccion: t(aiResponse.cita.seccion),
             fragmento: t(aiResponse.cita.fragmento),
             pagina: aiResponse.cita.pagina
           }
         };
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
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
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

      <div className="min-h-screen font-sans bg-bg text-text relative overflow-x-hidden">
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
                  {t('docbrain.backBtn')}
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
              <button
                onClick={() => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-white/5 text-xs font-medium text-blue-400 hover:text-white hover:border-blue-500/40 transition-colors"
              >
                {i18n.language.startsWith('es') ? 'EN' : 'ES'}
              </button>
              <span className="hidden md:flex items-center gap-2 text-xs rounded-full px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                {t('docbrain.companyName')}
              </span>
            </div>
          </header>

          {/* ========== HERO SECTION ========== */}
          <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 text-center z-10">
            <div className="absolute inset-0 pointer-events-none">
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
                {t('docbrain.heroBadge')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-text mb-4 tracking-tight leading-tight animate-fade-in delay-100">
                {t('docbrain.heroTitle1')} <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{t('docbrain.heroTitle2')}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium mb-6 text-blue-400 animate-fade-in delay-200">
                {t('docbrain.heroSubtitle')}
              </p>
              <p className="text-[15px] sm:text-[16px] font-normal text-muted max-w-xl mx-auto mb-8 animate-fade-in delay-300">
                {t('docbrain.heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in delay-300">
                <button
                  onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-2.5 rounded-[8px] bg-blue-500 text-white text-[13px] font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  {t('docbrain.btnDemo')}
                </button>
                <button
                  onClick={() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-2.5 rounded-[8px] border border-blue-500/30 text-blue-400 text-[13px] font-medium hover:bg-blue-500/10 transition-colors flex items-center gap-2 justify-center"
                >
                  {t('docbrain.btnExplore')}
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
                { icon: '📚', value: countDocs, label: t('docbrain.metricsDocs'), suffix: '' },
                { icon: '📄', value: countPages, label: t('docbrain.metricsPages'), suffix: '' },
                { icon: '💬', value: countPreguntas, label: t('docbrain.metricsQueries'), suffix: '' },
                { icon: '🎯', value: countPrecision, label: t('docbrain.metricsAccuracy'), suffix: '%' },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl p-4 sm:p-5 flex flex-col gap-1.5 bg-white/5 backdrop-blur-xl border border-subtle hover:bg-white/10 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 origin-bottom-left">{metric.icon}</span>
                  <span className="text-2xl sm:text-3xl font-medium text-text group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
                    {metric.value.toLocaleString()}{metric.suffix}
                  </span>
                  <span className="text-xs sm:text-sm text-muted group-hover:text-blue-200/70 transition-colors">{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SECCIÓN 3: BIBLIOTECA DE DOCUMENTOS ===== */}
          <section id="biblioteca" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-text">{t('docbrain.libTitle')}</h2>
            <p className="text-sm sm:text-base mb-6 text-muted">{t('docbrain.libSubtitle')}</p>

            <div className="mb-6">
              <UploadZone />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {documentos.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>

            <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle">
              <h3 className="text-lg font-medium mb-4 text-text">{t('docbrain.libStorage')}</h3>
              <ProgressBar value={2.3} max={10} color="#3B82F6" />
              <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-muted">
                <span>{t('docbrain.libStorageUsed')}</span>
                <span>{t('docbrain.libStorageCount')}</span>
              </div>
              <button className="mt-4 text-xs font-medium rounded-lg px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                {t('docbrain.btnManageStorage')}
              </button>
            </div>
          </section>

          {/* ===== SECCIÓN 4: CHAT RAG ===== */}
          <section id="chat" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-text">{t('docbrain.chatTitle')}</h2>
            <p className="text-sm sm:text-base mb-6 text-muted">
              {t('docbrain.chatSubtitle')}
            </p>

            <div className="flex flex-col lg:flex-row gap-0 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-subtle h-[600px] max-h-[80vh]">
              {/* Sidebar */}
              <div className="hidden lg:flex lg:flex-col w-full lg:w-64 lg:min-w-[256px] p-4 gap-4 bg-surface/50 border-r border-subtle overflow-y-auto custom-scrollbar">
                <button
                  className="text-sm font-medium rounded-lg py-2.5 px-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  onClick={() => setChatMessages([initialMessage])}
                >
                  {t('docbrain.btnNewQuery')}
                </button>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">{t('docbrain.filterDoc')}</span>
                  <div className="flex flex-col gap-1">
                    {['docbrain.filterAll', 'docbrain.docShort1', 'docbrain.docShort2', 'docbrain.docShort3', 'docbrain.docShort5'].map((filtro) => (
                      <button
                        key={filtro}
                        onClick={() => setFiltroDocumento(filtro)}
                        className={`text-left text-xs sm:text-sm rounded-lg px-3 py-2 transition-colors flex items-center gap-2.5 ${filtroDocumento === filtro ? 'bg-blue-500/10 text-blue-400' : 'text-muted hover:text-text hover:bg-white/5'
                          }`}
                      >
                        <div className={`w-3.5 h-3.5 flex-shrink-0 rounded-sm flex items-center justify-center transition-colors ${filtroDocumento === filtro ? 'bg-blue-500' : 'bg-black/20 border border-white/20'}`}>
                          {filtroDocumento === filtro && <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span className="truncate">{t(filtro)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">{t('docbrain.history')}</span>
                  <div className="flex flex-col gap-1">
                    {history.length === 0 ? (
                      <span className="text-xs text-muted/60 px-2">{t('docbrain.historyEmpty')}</span>
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
                  <span className="text-[10px] uppercase tracking-wider text-muted mb-2 block">{t('docbrain.quickActions')}</span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[t('docbrain.q1'), t('docbrain.q2'), t('docbrain.q3'), t('docbrain.q4')].map((chip) => (
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
                      placeholder={t('docbrain.chatPlaceholder')}
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
                    {t('docbrain.chatDisclaimer1')}
                  </p>
                  <p className="text-[10px] sm:text-xs text-center mt-1 text-muted">
                    {t('docbrain.chatDisclaimer2')}
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
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-text">{t('docbrain.statsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Consultas esta semana */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-blue-500/30 transition-all group">
                <h3 className="text-sm font-medium mb-3 text-muted group-hover:text-text transition-colors">{t('docbrain.statsQueries')}</h3>
                <div className="flex items-end gap-1.5 h-24">
                  {estadisticasConsultas.map((dia, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                      <div className="w-full flex items-end justify-center group/bar relative h-full">
                        <div className="absolute bottom-[calc(100%+5px)] bg-surface border border-subtle text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg whitespace-nowrap">
                          {dia.consultas} {t('docbrain.statsQueriesTooltip')}
                        </div>
                        <div
                          className="w-full rounded-sm bg-blue-500/60 group-hover/bar:bg-blue-400 transition-all cursor-pointer relative overflow-hidden"
                          style={{ height: `${(dia.consultas / 100) * 100}%` }}
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent to-white/20" />
                        </div>
                      </div>
                      <span className="text-[10px] text-muted group-hover/bar:text-text transition-colors">{t(dia.dia)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* {t('docbrain.statsMostRead')} */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-blue-500/30 transition-all">
                <h3 className="text-sm font-medium mb-3 text-muted">{t("docbrain.mostConsulted")}</h3>
                <div className="space-y-3">
                  {documentosMasConsultados.map((doc, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text group-hover:text-blue-300 transition-colors">{t(doc.nombre)}</span>
                        <span className="text-blue-400 font-medium">{doc.porcentaje}%</span>
                      </div>
                      <ProgressBar value={doc.porcentaje} max={100} color={idx === 0 ? '#3B82F6' : '#60A5FA'} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiempo respuesta */}
              <div className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-subtle hover:border-green-500/30 transition-all group cursor-pointer relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors" />
                <h3 className="text-sm font-medium mb-3 text-muted group-hover:text-text transition-colors">{t('docbrain.statsTime')}</h3>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-4xl font-medium text-text drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]">1.2s</span>
                  <span className="text-sm text-green-400 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t('docbrain.statsTimeCompare')}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 relative z-10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-muted group-hover:text-green-400 transition-colors">{t('docbrain.statsSystemStatus')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SECCIÓN 7: ADMINISTRACIÓN ===== */}
          <section id="admin" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-6 text-text flex items-center gap-3">
              {t('docbrain.adminTitle')}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-blue-500/5 blur-[100px] pointer-events-none" />

              {/* Configuración RAG */}
              <div className="rounded-2xl p-6 sm:p-8 bg-[#0F111A]/80 backdrop-blur-xl border border-subtle relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full transition-transform group-hover:scale-150" />
                
                <h3 className="text-xl font-medium mb-8 text-text flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                  {t('docbrain.adminRag')}
                </h3>
                
                <div className="space-y-8 relative z-10">
                  {/* Modo de Búsqueda (Pill Switch) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-text">{t('docbrain.ragAlg')}</p>
                      <span className="text-[10px] uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{t('docbrain.ragAlgActive')}</span>
                    </div>
                    <div className="flex relative bg-black/40 p-1 rounded-xl border border-subtle">
                      <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-lg transition-transform duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)] ${modoBusqueda === 'semantica' ? 'translate-x-full left-1' : 'translate-x-0 left-1'}`} />
                      <button
                        onClick={() => setModoBusqueda('exacta')}
                        className={`flex-1 relative z-10 text-xs sm:text-sm font-medium py-2.5 transition-colors ${modoBusqueda === 'exacta' ? 'text-white' : 'text-muted hover:text-white'}`}
                      >
                        {t('docbrain.ragExact')}
                      </button>
                      <button
                        onClick={() => setModoBusqueda('semantica')}
                        className={`flex-1 relative z-10 text-xs sm:text-sm font-medium py-2.5 transition-colors ${modoBusqueda === 'semantica' ? 'text-white' : 'text-muted hover:text-white'}`}
                      >
                        {t('docbrain.ragSemantic')}
                      </button>
                    </div>
                  </div>

                  {/* Fragmentos (Interactive Segments) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-text">{t('docbrain.ragChunks')}</p>
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{numFragmentos} {t('docbrain.ragChunksLabel')}</span>
                    </div>
                    <div className="flex gap-1.5 w-full">
                      {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          onClick={() => setNumFragmentos(n)}
                          className={`flex-1 h-8 rounded border transition-all duration-300 flex items-center justify-center text-xs font-mono
                            ${numFragmentos >= n 
                              ? 'bg-blue-600/90 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                              : 'bg-surface border-subtle text-muted hover:border-white/20 hover:bg-white/5'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confianza (Glowing Slider) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-text">{t('docbrain.ragThreshold')}</p>
                      <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{umbralConfianza}%</span>
                    </div>
                    <div className="relative pt-2 pb-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={umbralConfianza}
                        onChange={(e) => setUmbralConfianza(e.target.value)}
                        className="w-full h-2 rounded-full appearance-none bg-black/50 cursor-pointer relative z-10"
                        style={{
                          background: `linear-gradient(to right, #F59E0B ${(umbralConfianza)}%, rgba(0,0,0,0.5) ${(umbralConfianza)}%)`,
                          accentColor: '#FBBF24'
                        }}
                      />
                      {/* Slider Glow */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-amber-500 blur-md opacity-40 transition-all pointer-events-none"
                        style={{ width: `${umbralConfianza}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-8 bg-black/30 border border-subtle rounded-xl p-5 flex flex-col gap-4 relative z-10">
                    <Toggle label={t('docbrain.ragToggle1')} checked={citarFuente} onChange={setCitarFuente} />
                    <Toggle label={t('docbrain.ragToggle2')} checked={soloDocumentos} onChange={setSoloDocumentos} />
                  </div>
                </div>
              </div>

              {/* Seguridad y Acceso */}
              <div className="rounded-2xl p-6 sm:p-8 bg-[#0F111A]/80 backdrop-blur-xl border border-subtle relative overflow-hidden group hover:border-blue-500/30 transition-colors flex flex-col">
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full transition-transform group-hover:scale-150" />
                
                <h3 className="text-xl font-medium mb-6 text-text flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  {t('docbrain.adminRoles')}
                </h3>
                
                <div className="space-y-3 relative z-10 flex-1">
                  {usuariosAcceso.map((user, idx) => (
                    <div key={idx} className="group/user flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm border shadow-inner ${
                          user.rol === 'admin' 
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                            : 'bg-surface text-muted border-subtle'
                        }`}>
                          {user.nombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text group-hover/user:text-white transition-colors">{user.nombre}</p>
                          <p className="text-xs text-muted flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            {t(user.acceso)}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 border transition-colors ${
                        user.rol === 'admin'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(74,222,128,0.1)] group-hover/user:bg-green-500/20'
                          : 'bg-white/5 text-muted border-subtle group-hover/user:border-white/20'
                        }`}>
                        {user.rol === 'admin' ? t('docbrain.roleAdmin') : t('docbrain.roleLimit')}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-black/30 border border-subtle rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <p className="text-xs font-medium text-muted flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    </span>
                    {t('docbrain.roleConnection')}
                  </p>
                  <button 
                    onClick={() => setShowDemoModal(true)}
                    className="relative group/btn overflow-hidden text-xs font-medium rounded-lg px-6 py-2.5 bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t('docbrain.btnManagePolicies')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </button>
                </div>
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
                {t('docbrain.footerText')}
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* ===== MODAL DEMO ===== */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setShowDemoModal(false)}>
          <div className="bg-[#0F111A] border border-subtle rounded-2xl max-w-sm w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 className="text-xl font-medium text-text mb-2">{t('docbrain.demoModalTitle')}</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              {t('docbrain.demoModalDesc')}
            </p>
            <button
              onClick={() => setShowDemoModal(false)}
              className="w-full text-sm font-medium rounded-lg px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >{t("docbrain.understood")}</button>
          </div>
        </div>
      )}
    </>
  );
}