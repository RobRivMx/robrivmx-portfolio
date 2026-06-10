const fs = require('fs');

const esPath = './src/locales/es.json';
const enPath = './src/locales/en.json';

const es = JSON.parse(fs.readFileSync(esPath));
const en = JSON.parse(fs.readFileSync(enPath));

const tES = {
  "backBtn": "← Volver",
  "companyName": "Empresa: TechCorp SA",
  "heroBadge": "RAG Empresarial — Powered by LlamaIndex",
  "heroTitle1": "Tu empresa sabe",
  "heroTitle2": "más de lo que crees",
  "heroSubtitle": "DocBrain lo encuentra en segundos",
  "heroDesc": "Conecta tus manuales, contratos y políticas. Obtén respuestas precisas con la página exacta como fuente. Nunca más buscar en carpetas.",
  "btnDemo": "▶ Ver demo",
  "btnExplore": "📄 Explorar documentos",
  "metricsDocs": "Documentos indexados",
  "metricsPages": "Páginas procesadas",
  "metricsQueries": "Preguntas respondidas hoy",
  "metricsAccuracy": "Precisión de respuestas",
  "libTitle": "Biblioteca de Documentos",
  "libSubtitle": "Arrastra documentos o haz clic para subir",
  "libStorage": "Almacenamiento",
  "libStorageUsed": "2.3 GB de 10 GB usados",
  "libStorageCount": "47 documentos · 3,842 páginas indexadas",
  "btnManageStorage": "Gestionar almacenamiento",
  "docPages": "páginas",
  "docProcessing": "Procesando",
  "uploadTitle": "Suelta aquí tus PDF, Word o TXT",
  "uploadSubtitle": "o haz clic para seleccionar archivos",
  "btnSelectFiles": "Seleccionar archivos",
  "uploadModalTitle": "Carga de Documentos (Demo)",
  "uploadModalDesc": "En un entorno real de producción, al subir un documento, DocBrain ejecuta automáticamente el siguiente pipeline de IA en segundos:",
  "step1Title": "Extracción y OCR",
  "step1Desc": "Lee el texto de PDFs, documentos Word o escaneos estructurando la información.",
  "step2Title": "Chunking Semántico",
  "step2Desc": "Divide el documento inteligentemente conservando el contexto de cada párrafo.",
  "step3Title": "Generación de Embeddings",
  "step3Desc": "Convierte los textos en vectores matemáticos usando modelos de IA avanzados.",
  "step4Title": "Indexación Vectorial",
  "step4Desc": "Almacena los vectores en una base de datos especializada (ej. pgvector) para búsquedas instantáneas.",
  "btnGotIt": "Entendido",
  "viewerPreview": "— Vista previa",
  "viewerClose": "Cerrar vista previa",
  "viewerPrev": "← Anterior",
  "viewerNext": "Siguiente →",
  "viewerPage": "Página",
  "viewerOf": "de",
  "chatTitle": "Consulta tus Documentos",
  "chatSubtitle": "La IA responde solo con información de TUS documentos. Siempre con fuente.",
  "btnNewQuery": "+ Nueva consulta",
  "filterDoc": "Filtrar por documento",
  "history": "Historial",
  "historyEmpty": "Aún no hay consultas",
  "quickActions": "Acciones rápidas sugeridas",
  "chatPlaceholder": "Pregunta algo sobre tus documentos...",
  "chatDisclaimer1": "DocBrain solo responde con información de tus documentos. Nunca inventa respuestas.",
  "chatDisclaimer2": "LlamaIndex RAG · pgvector · GPT-4o",
  "citeSource": "Fuente verificada ✓",
  "btnViewPage1": "Ver página",
  "btnViewPage2": "del documento →",
  "statsTitle": "Actividad de la Biblioteca",
  "statsQueries": "Consultas esta semana",
  "statsQueriesTooltip": "consultas",
  "statsMostRead": "Documentos más consultados",
  "statsTime": "Tiempo promedio de respuesta",
  "statsTimeCompare": "0.3s vs semana anterior",
  "statsSystemStatus": "Estado del sistema óptimo",
  "adminTitle": "Administración Avanzada",
  "adminRag": "Parámetros del Motor RAG",
  "ragAlg": "Algoritmo de Recuperación",
  "ragAlgActive": "Activo",
  "ragExact": "Exacta (BM25)",
  "ragSemantic": "Semántica (Vectorial)",
  "ragChunks": "Top-K Fragmentos (Chunks)",
  "ragChunksLabel": "docs",
  "ragThreshold": "Umbral de Similitud (Cosine)",
  "ragToggle1": "Forzar Citas de Origen (Footnotes)",
  "ragToggle2": "Modo Strict RAG (Evitar Alucinaciones)",
  "adminRoles": "Control de Acceso y Roles",
  "roleConnection": "Conexión Segura Activa",
  "btnManagePolicies": "Gestionar políticas",
  "footerText": "RAG Empresarial con LlamaIndex · pgvector · GPT-4o",
  "demoModalTitle": "Función Restringida",
  "demoModalDesc": "Esta es una demostración interactiva de DocBrain. La gestión avanzada de políticas y roles de acceso requiere conexión a tu base de datos y Active Directory.",
  "justNow": "Justo ahora",
  "aiWelcome": "DocBrain Core Engine v2.4 inicializado. He procesado e indexado el 100% de tu repositorio documental corporativo.\n\nExperimenta el poder de la búsqueda semántica ejecutando alguna de las **acciones rápidas** a continuación, o formula un query complejo en lenguaje natural.\n\nGeneraré respuestas determinísticas extrayendo insights accionables y adjuntando la cita exacta de la fuente original.",
  "aiFallback": "¡Excelente pregunta! Como esta es una demostración, tus documentos reales aún no están conectados. En un entorno de producción con tu propia cuenta, DocBrain buscaría semánticamente en toda tu base de datos y te daría la respuesta exacta citando la página de referencia.",
  "catHR": "Recursos Humanos",
  "catLegal": "Legal",
  "catIT": "IT & Seguridad",
  "catSales": "Ventas",
  "catOps": "Operaciones",
  "catComp": "Compliance",
  "subido1": "Hace 2 días",
  "subido2": "Hace 1 semana",
  "subido3": "Hace 3 días",
  "subido4": "Hace 5 días",
  "subido5": "Hace 1 hora",
  "subido6": "Hace 4 días",
  "roleAdmin": "Acceso total",
  "roleLimit": "Limitado",
  "q1": "Días de vacaciones",
  "q2": "Proceso de onboarding",
  "q3": "Políticas IT",
  "q4": "Productos disponibles"
};

const tEN = {
  "backBtn": "← Back",
  "companyName": "Company: TechCorp Inc.",
  "heroBadge": "Enterprise RAG — Powered by LlamaIndex",
  "heroTitle1": "Your company knows",
  "heroTitle2": "more than you think",
  "heroSubtitle": "DocBrain finds it in seconds",
  "heroDesc": "Connect your manuals, contracts, and policies. Get precise answers with the exact page as the source. Never search through folders again.",
  "btnDemo": "▶ View demo",
  "btnExplore": "📄 Explore documents",
  "metricsDocs": "Indexed documents",
  "metricsPages": "Processed pages",
  "metricsQueries": "Questions answered today",
  "metricsAccuracy": "Answer accuracy",
  "libTitle": "Document Library",
  "libSubtitle": "Drag documents or click to upload",
  "libStorage": "Storage",
  "libStorageUsed": "2.3 GB of 10 GB used",
  "libStorageCount": "47 documents · 3,842 pages indexed",
  "btnManageStorage": "Manage storage",
  "docPages": "pages",
  "docProcessing": "Processing",
  "uploadTitle": "Drop your PDF, Word, or TXT here",
  "uploadSubtitle": "or click to select files",
  "btnSelectFiles": "Select files",
  "uploadModalTitle": "Document Upload (Demo)",
  "uploadModalDesc": "In a real production environment, when uploading a document, DocBrain automatically runs the following AI pipeline in seconds:",
  "step1Title": "Extraction and OCR",
  "step1Desc": "Reads text from PDFs, Word docs, or scans, structuring the information.",
  "step2Title": "Semantic Chunking",
  "step2Desc": "Intelligently divides the document preserving the context of each paragraph.",
  "step3Title": "Embeddings Generation",
  "step3Desc": "Converts text into mathematical vectors using advanced AI models.",
  "step4Title": "Vector Indexing",
  "step4Desc": "Stores vectors in a specialized database (e.g. pgvector) for instant search.",
  "btnGotIt": "Got it",
  "viewerPreview": "— Preview",
  "viewerClose": "Close preview",
  "viewerPrev": "← Previous",
  "viewerNext": "Next →",
  "viewerPage": "Page",
  "viewerOf": "of",
  "chatTitle": "Query your Documents",
  "chatSubtitle": "The AI answers only with information from YOUR documents. Always cited.",
  "btnNewQuery": "+ New query",
  "filterDoc": "Filter by document",
  "history": "History",
  "historyEmpty": "No queries yet",
  "quickActions": "Suggested quick actions",
  "chatPlaceholder": "Ask something about your documents...",
  "chatDisclaimer1": "DocBrain answers only with info from your documents. Never hallucinates.",
  "chatDisclaimer2": "LlamaIndex RAG · pgvector · GPT-4o",
  "citeSource": "Verified source ✓",
  "btnViewPage1": "View page",
  "btnViewPage2": "of the document →",
  "statsTitle": "Library Activity",
  "statsQueries": "Queries this week",
  "statsQueriesTooltip": "queries",
  "statsMostRead": "Most accessed documents",
  "statsTime": "Average response time",
  "statsTimeCompare": "0.3s vs last week",
  "statsSystemStatus": "System status optimal",
  "adminTitle": "Advanced Administration",
  "adminRag": "RAG Engine Parameters",
  "ragAlg": "Retrieval Algorithm",
  "ragAlgActive": "Active",
  "ragExact": "Exact (BM25)",
  "ragSemantic": "Semantic (Vectorial)",
  "ragChunks": "Top-K Segments (Chunks)",
  "ragChunksLabel": "docs",
  "ragThreshold": "Similarity Threshold (Cosine)",
  "ragToggle1": "Force Source Citations (Footnotes)",
  "ragToggle2": "Strict RAG Mode (Avoid Hallucinations)",
  "adminRoles": "Access Control and Roles",
  "roleConnection": "Secure Connection Active",
  "btnManagePolicies": "Manage policies",
  "footerText": "Enterprise RAG with LlamaIndex · pgvector · GPT-4o",
  "demoModalTitle": "Restricted Feature",
  "demoModalDesc": "This is an interactive demo of DocBrain. Advanced policy and access role management requires connection to your database and Active Directory.",
  "justNow": "Just now",
  "aiWelcome": "DocBrain Core Engine v2.4 initialized. I have processed and indexed 100% of your corporate document repository.\n\nExperience the power of semantic search by executing one of the **quick actions** below, or ask a complex query in natural language.\n\nI will generate deterministic answers by extracting actionable insights and attaching the exact citation from the original source.",
  "aiFallback": "Excellent question! Since this is a demo, your real documents are not yet connected. In a production environment with your own account, DocBrain would semantically search your entire database and give you the exact answer citing the reference page.",
  "catHR": "Human Resources",
  "catLegal": "Legal",
  "catIT": "IT & Security",
  "catSales": "Sales",
  "catOps": "Operations",
  "catComp": "Compliance",
  "subido1": "2 days ago",
  "subido2": "1 week ago",
  "subido3": "3 days ago",
  "subido4": "5 days ago",
  "subido5": "1 hour ago",
  "subido6": "4 days ago",
  "roleAdmin": "Full access",
  "roleLimit": "Limited",
  "q1": "Vacation days",
  "q2": "Onboarding process",
  "q3": "IT policies",
  "q4": "Available products"
};

es.docbrain = tES;
en.docbrain = tEN;

fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Locales updated!");

let code = fs.readFileSync('./src/components/DocBrainDemo.jsx', 'utf8');

// Inject useTranslation
if (!code.includes("import { useTranslation }")) {
  code = code.replace("import React, { useState, useRef, useEffect, useCallback } from 'react';", "import React, { useState, useRef, useEffect, useCallback } from 'react';\nimport { useTranslation } from 'react-i18next';");
}

// Add the translation keys into DocBrainDemo data using translation placeholders:
// We will modify the data structures so they map to keys and render with t().

// We also need to add the language toggle. Let's find the header.
const headerTarget = `              {onClose && (
                <button
                  onClick={onClose}
                  className="mr-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/5 text-muted text-[12px] font-medium hover:text-text hover:bg-white/10 border border-subtle transition-all"
                >
                  ← Volver
                </button>
              )}`;
const headerReplacement = `              {onClose && (
                <button
                  onClick={onClose}
                  className="mr-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/5 text-muted text-[12px] font-medium hover:text-text hover:bg-white/10 border border-subtle transition-all"
                >
                  {t('docbrain.backBtn')}
                </button>
              )}`;

code = code.replace(headerTarget, headerReplacement);

const toggleTarget = `              <span className="text-[10px] sm:text-xs rounded-full px-2.5 py-0.5 hidden sm:inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20">DEMO</span>
            </div>
            <div className="flex items-center gap-3 z-10">`;
const toggleReplacement = `              <span className="text-[10px] sm:text-xs rounded-full px-2.5 py-0.5 hidden sm:inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20">DEMO</span>
            </div>
            <div className="flex items-center gap-3 z-10">
              <button
                onClick={() => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-white/5 text-xs font-medium text-blue-400 hover:text-white hover:border-blue-500/40 transition-colors"
              >
                {i18n.language.startsWith('es') ? 'EN' : 'ES'}
              </button>`;

code = code.replace(toggleTarget, toggleReplacement);

// Add t and i18n
code = code.replace("export default function DocBrainDemo({ onClose }) {", "export default function DocBrainDemo({ onClose }) {\n  const { t, i18n } = useTranslation();");

// To handle all other string replacements, we will write them directly into the file using a separate pass to make sure it handles all cases.

fs.writeFileSync('./src/components/DocBrainDemo.jsx', code);
console.log("DocBrainDemo code updated!");
