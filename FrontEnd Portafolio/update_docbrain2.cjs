const fs = require('fs');

let code = fs.readFileSync('./src/components/DocBrainDemo.jsx', 'utf8');

// Replace mock data to use keys or we can just translate them inline in the component.
// It's better to translate them where they are rendered.

// Replace Header company
code = code.replace("Empresa: TechCorp SA", "{t('docbrain.companyName')}");

// Hero section
code = code.replace("RAG Empresarial — Powered by LlamaIndex", "{t('docbrain.heroBadge')}");
code = code.replace("Tu empresa sabe <span", "{t('docbrain.heroTitle1')} <span");
code = code.replace("más de lo que crees", "{t('docbrain.heroTitle2')}");
code = code.replace("DocBrain lo encuentra en segundos", "{t('docbrain.heroSubtitle')}");
code = code.replace("Conecta tus manuales, contratos y políticas. Obtén respuestas precisas con la página exacta como fuente. Nunca más buscar en carpetas.", "{t('docbrain.heroDesc')}");
code = code.replace("▶ Ver demo", "{t('docbrain.btnDemo')}");
code = code.replace("📄 Explorar documentos", "{t('docbrain.btnExplore')}");

// Metrics
code = code.replace("label: 'Documentos indexados'", "label: t('docbrain.metricsDocs')");
code = code.replace("label: 'Páginas procesadas'", "label: t('docbrain.metricsPages')");
code = code.replace("label: 'Preguntas respondidas hoy'", "label: t('docbrain.metricsQueries')");
code = code.replace("label: 'Precisión de respuestas'", "label: t('docbrain.metricsAccuracy')");

// Library
code = code.replace("Biblioteca de Documentos", "{t('docbrain.libTitle')}");
code = code.replace("Arrastra documentos o haz clic para subir", "{t('docbrain.libSubtitle')}");
code = code.replace("Almacenamiento", "{t('docbrain.libStorage')}");
code = code.replace("2.3 GB de 10 GB usados", "{t('docbrain.libStorageUsed')}");
code = code.replace("47 documentos · 3,842 páginas indexadas", "{t('docbrain.libStorageCount')}");
code = code.replace("Gestionar almacenamiento", "{t('docbrain.btnManageStorage')}");

// UploadZone (note: UploadZone does not have useTranslation, we need to pass t or add it to the component)
// It's easier to just add useTranslation to the other components:
code = code.replace("function UploadZone() {", "function UploadZone() {\n  const { t } = useTranslation();");
code = code.replace("Suelta aquí tus PDF, Word o TXT", "{t('docbrain.uploadTitle')}");
code = code.replace("o haz clic para seleccionar archivos", "{t('docbrain.uploadSubtitle')}");
code = code.replace("Seleccionar archivos", "{t('docbrain.btnSelectFiles')}");
code = code.replace("Carga de Documentos (Demo)", "{t('docbrain.uploadModalTitle')}");
code = code.replace("En un entorno real de producción, al subir un documento, DocBrain ejecuta automáticamente el siguiente pipeline de IA en segundos:", "{t('docbrain.uploadModalDesc')}");
code = code.replace("Extracción y OCR", "{t('docbrain.step1Title')}");
code = code.replace("Lee el texto de PDFs, documentos Word o escaneos estructurando la información.", "{t('docbrain.step1Desc')}");
code = code.replace("Chunking Semántico", "{t('docbrain.step2Title')}");
code = code.replace("Divide el documento inteligentemente conservando el contexto de cada párrafo.", "{t('docbrain.step2Desc')}");
code = code.replace("Generación de Embeddings", "{t('docbrain.step3Title')}");
code = code.replace("Convierte los textos en vectores matemáticos usando modelos de IA avanzados.", "{t('docbrain.step3Desc')}");
code = code.replace("Indexación Vectorial", "{t('docbrain.step4Title')}");
code = code.replace("Almacena los vectores en una base de datos especializada (ej. pgvector) para búsquedas instantáneas.", "{t('docbrain.step4Desc')}");
code = code.replace("Entendido", "{t('docbrain.btnGotIt')}");

// DocViewer
code = code.replace("function DocViewer({ documento, pagina, onClose }) {", "function DocViewer({ documento, pagina, onClose }) {\n  const { t } = useTranslation();");
code = code.replace("— Vista previa", "{t('docbrain.viewerPreview')}");
code = code.replace("Cerrar vista previa", "{t('docbrain.viewerClose')}");
code = code.replace("← Anterior", "{t('docbrain.viewerPrev')}");
code = code.replace("Siguiente →", "{t('docbrain.viewerNext')}");
code = code.replace("Página {pagina} de 128", "{t('docbrain.viewerPage')} {pagina} {t('docbrain.viewerOf')} 128");

// DocumentCard
code = code.replace("function DocumentCard({ doc }) {", "function DocumentCard({ doc }) {\n  const { t } = useTranslation();");
code = code.replace("{doc.paginas} páginas", "{doc.paginas} {t('docbrain.docPages')}");
code = code.replace("Procesando", "{t('docbrain.docProcessing')}");

// CitaDocumento
code = code.replace("function CitaDocumento({ documento, seccion, fragmento, pagina, onVerPagina }) {", "function CitaDocumento({ documento, seccion, fragmento, pagina, onVerPagina }) {\n  const { t } = useTranslation();");
code = code.replace("Fuente verificada ✓", "{t('docbrain.citeSource')}");
code = code.replace("Ver página {pagina} del documento →", "{t('docbrain.btnViewPage1')} {pagina} {t('docbrain.btnViewPage2')}");

// Chat RAG
code = code.replace("Consulta tus Documentos", "{t('docbrain.chatTitle')}");
code = code.replace("La IA responde solo con información de TUS documentos. Siempre con fuente.", "{t('docbrain.chatSubtitle')}");
code = code.replace("+ Nueva consulta", "{t('docbrain.btnNewQuery')}");
code = code.replace("Filtrar por documento", "{t('docbrain.filterDoc')}");
code = code.replace("Historial", "{t('docbrain.history')}");
code = code.replace("Aún no hay consultas", "{t('docbrain.historyEmpty')}");
code = code.replace("Acciones rápidas sugeridas", "{t('docbrain.quickActions')}");
code = code.replace("Pregunta algo sobre tus documentos...", "\"+t('docbrain.chatPlaceholder')+\""); // placeholder
code = code.replace("placeholder=\"\"+t('docbrain.chatPlaceholder')+\"\"", "placeholder={t('docbrain.chatPlaceholder')}"); // fix
code = code.replace("DocBrain solo responde con información de tus documentos. Nunca inventa respuestas.", "{t('docbrain.chatDisclaimer1')}");
code = code.replace("LlamaIndex RAG · pgvector · GPT-4o", "{t('docbrain.chatDisclaimer2')}");

// Stats
code = code.replace("Actividad de la Biblioteca", "{t('docbrain.statsTitle')}");
code = code.replace("Consultas esta semana", "{t('docbrain.statsQueries')}");
code = code.replace("{dia.consultas} consultas", "{dia.consultas} {t('docbrain.statsQueriesTooltip')}");
code = code.replace("Documentos más consultados", "{t('docbrain.statsMostRead')}");
code = code.replace("Tiempo promedio de respuesta", "{t('docbrain.statsTime')}");
code = code.replace("0.3s vs semana anterior", "{t('docbrain.statsTimeCompare')}");
code = code.replace("Estado del sistema óptimo", "{t('docbrain.statsSystemStatus')}");

// Admin
code = code.replace("Administración Avanzada", "{t('docbrain.adminTitle')}");
code = code.replace("Parámetros del Motor RAG", "{t('docbrain.adminRag')}");
code = code.replace("Algoritmo de Recuperación", "{t('docbrain.ragAlg')}");
code = code.replace(">Activo<", ">{t('docbrain.ragAlgActive')}<");
code = code.replace("Exacta (BM25)", "{t('docbrain.ragExact')}");
code = code.replace("Semántica (Vectorial)", "{t('docbrain.ragSemantic')}");
code = code.replace("Top-K Fragmentos (Chunks)", "{t('docbrain.ragChunks')}");
code = code.replace("{numFragmentos} docs", "{numFragmentos} {t('docbrain.ragChunksLabel')}");
code = code.replace("Umbral de Similitud (Cosine)", "{t('docbrain.ragThreshold')}");
code = code.replace("label=\"Forzar Citas de Origen (Footnotes)\"", "label={t('docbrain.ragToggle1')}");
code = code.replace("label=\"Modo Strict RAG (Evitar Alucinaciones)\"", "label={t('docbrain.ragToggle2')}");
code = code.replace("Control de Acceso y Roles", "{t('docbrain.adminRoles')}");
code = code.replace("Conexión Segura Activa", "{t('docbrain.roleConnection')}");
code = code.replace("Gestionar políticas", "{t('docbrain.btnManagePolicies')}");

// Footer and Modals
code = code.replace("RAG Empresarial con LlamaIndex · pgvector · GPT-4o", "{t('docbrain.footerText')}");
code = code.replace("Función Restringida", "{t('docbrain.demoModalTitle')}");
code = code.replace("Esta es una demostración interactiva de DocBrain. La gestión avanzada de políticas y roles de acceso requiere conexión a tu base de datos y Active Directory.", "{t('docbrain.demoModalDesc')}");

fs.writeFileSync('./src/components/DocBrainDemo.jsx', code);
console.log("DocBrainDemo code updated successfully!");
