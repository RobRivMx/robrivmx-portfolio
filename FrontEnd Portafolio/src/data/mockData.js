// ============================================================
// MOCK DATA PARA DEMOS
// Este archivo contiene los datos estáticos de demostración para
// separar la lógica de presentación de los datos.
// ============================================================

// ------------------------------------------------------------
// INSIGHT AI DEMO DATA
// ------------------------------------------------------------
export const insightaiData = {
  kpiData: [
    { label: 'insightai.kpiSales', value: 847320, isCurrency: true, delta: '+12.3%', positive: true, subtitle: 'insightai.kpiSub' },
    { label: 'insightai.kpiOrders', value: 1847, isCurrency: false, delta: '+8.7%', positive: true, subtitle: 'insightai.kpiSub' },
    { label: 'insightai.kpiTicket', value: 458, isCurrency: true, delta: '-2.1%', positive: false, subtitle: 'insightai.kpiSub' },
    { label: 'insightai.kpiConv', value: 3.8, isPercent: true, isFloat: true, delta: '+0.4%', positive: true, subtitle: 'insightai.kpiSub' },
  ],
  ingresosData: [
    { mes: 'Ene', ingresos: 620000 }, { mes: 'Feb', ingresos: 710000 }, { mes: 'Mar', ingresos: 695000 },
    { mes: 'Abr', ingresos: 780000 }, { mes: 'May', ingresos: 820000 }, { mes: 'Jun', ingresos: 847320 },
  ],
  topProductosData: [
    { nombre: 'Laptop Pro', ventas: 245 }, { nombre: 'Teclado Mec', ventas: 189 },
    { nombre: 'Monitor 4K', ventas: 167 }, { nombre: 'Webcam HD', ventas: 134 }, { nombre: 'Mouse Ergo', ventas: 98 },
  ],
  transaccionesData: [
    { id: '#TX-1847', cliente: 'CorpTech SA', producto: 'Laptop Pro X1', monto: '$24,500', status: 'Completado', fecha: '2026-05-21' },
    { id: '#TX-1846', cliente: 'InnovaMex', producto: 'Monitor 4K', monto: '$8,900', status: 'Completado', fecha: '2026-05-21' },
    { id: '#TX-1845', cliente: 'DataFlow', producto: 'Teclado Mec', monto: '$3,200', status: 'Pendiente', fecha: '2026-05-20' },
    { id: '#TX-1844', cliente: 'CloudServ', producto: 'Webcam HD', monto: '$1,850', status: 'Cancelado', fecha: '2026-05-20' },
    { id: '#TX-1843', cliente: 'TechNova', producto: 'Mouse Ergo', monto: '$1,450', status: 'Completado', fecha: '2026-05-19' },
  ],
  conectoresRelacionales: [
    { nombre: 'PostgreSQL', desc: 'insightai.connDesc1', conectado: true, icono: '🐘' },
    { nombre: 'MySQL', desc: 'insightai.connDesc2', conectado: false, icono: '🐬' },
    { nombre: 'SQL Server', desc: 'insightai.connDesc3', conectado: false, icono: '🔷' },
  ],
  conectoresCloud: [
    { nombre: 'Supabase', desc: 'insightai.connDesc4', conectado: false, icono: '⚡' },
    { nombre: 'PlanetScale', desc: 'insightai.connDesc5', conectado: false, icono: '🪐' },
    { nombre: 'Neon', desc: 'insightai.connDesc6', conectado: false, icono: '💡' },
  ],
  conectoresArchivos: [
    { nombre: 'CSV Upload', desc: 'insightai.connDesc7', conectado: true, icono: '📄' },
    { nombre: 'Google Sheets', desc: 'insightai.connDesc8', conectado: false, icono: '📊' },
    { nombre: 'Excel', desc: 'insightai.connDesc9', conectado: false, icono: '📗' },
  ],
  ventasDiariasData: [
    { dia: 'Lun', ventas: 8 }, { dia: 'Mar', ventas: 11 }, { dia: 'Mié', ventas: 9 },
    { dia: 'Jue', ventas: 14 }, { dia: 'Vie', ventas: 15 }, { dia: 'Sáb', ventas: 7 }, { dia: 'Dom', ventas: 3 },
  ],
  detalleTransacciones: [
    { fecha: '2026-05-18', cliente: 'CorpTech SA', cantidad: 3, precio: '$8,500', sucursal: 'CDMX Norte' },
    { fecha: '2026-05-19', cliente: 'InnovaMex', cantidad: 2, precio: '$8,500', sucursal: 'Guadalajara' },
    { fecha: '2026-05-20', cliente: 'DataFlow', cantidad: 5, precio: '$8,200', sucursal: 'Monterrey' },
    { fecha: '2026-05-21', cliente: 'CloudServ', cantidad: 1, precio: '$8,800', sucursal: 'CDMX Sur' },
  ],
  top3Semana: [
    { nombre: 'Laptop Pro X1', ventas: 47 }, { nombre: 'Monitor 4K', ventas: 32 }, { nombre: 'Teclado Mec', ventas: 28 },
  ]
};

// ------------------------------------------------------------
// DOCBRAIN DEMO DATA
// ------------------------------------------------------------
export const docbrainData = {
  documentos: [
    { id: 1, nombre: 'docbrain.docName1', categoria: 'docbrain.catHR', paginas: 128, subido: 'docbrain.subido1', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#10B981', colorDoc: '#EF4444' },
    { id: 2, nombre: 'docbrain.docName2', categoria: 'docbrain.catLegal', paginas: 45, subido: 'docbrain.subido2', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#F59E0B', colorDoc: '#3B82F6' },
    { id: 3, nombre: 'docbrain.docName3', categoria: 'docbrain.catIT', paginas: 23, subido: 'docbrain.subido3', estado: 'indexado', progreso: 100, icono: 'docx', colorCat: '#EF4444', colorDoc: '#3B82F6' },
    { id: 4, nombre: 'docbrain.docName4', categoria: 'docbrain.catSales', paginas: 89, subido: 'docbrain.subido4', estado: 'indexado', progreso: 100, icono: 'pdf', colorCat: '#3B82F6', colorDoc: '#10B981' },
    { id: 5, nombre: 'docbrain.docName5', categoria: 'docbrain.catOps', paginas: 34, subido: 'docbrain.subido5', estado: 'procesando', progreso: 67, icono: 'docx', colorCat: '#8B5CF6', colorDoc: '#F97316' },
    { id: 6, nombre: 'docbrain.docName6', categoria: 'docbrain.catComp', paginas: 12, subido: 'docbrain.subido6', estado: 'indexado', progreso: 100, icono: 'txt', colorCat: '#14B8A6', colorDoc: '#6B7280' },
  ],
  estadisticasConsultas: [
    { dia: 'docbrain.day1', consultas: 45 }, { dia: 'docbrain.day2', consultas: 62 }, { dia: 'docbrain.day3', consultas: 38 },
    { dia: 'docbrain.day4', consultas: 78 }, { dia: 'docbrain.day5', consultas: 91 }, { dia: 'docbrain.day6', consultas: 55 }, { dia: 'docbrain.day7', consultas: 32 },
  ],
  documentosMasConsultados: [
    { nombre: 'docbrain.docShort1', porcentaje: 85 },
    { nombre: 'docbrain.docShort2', porcentaje: 67 },
    { nombre: 'docbrain.docShort4', porcentaje: 52 },
  ],
  usuariosAcceso: [
    { nombre: 'Admin (tú)', acceso: 'docbrain.roleAdmin', rol: 'admin' },
    { nombre: 'Marketing Team', acceso: 'docbrain.access1', rol: 'limitado' },
    { nombre: 'RR.HH. Team', acceso: 'docbrain.access2', rol: 'limitado' },
    { nombre: 'Legal Team', acceso: 'docbrain.docShort2', rol: 'limitado' },
  ],
  prebuiltResponsesKeys: {
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
  }
};

// ------------------------------------------------------------
// AUTOFLOW DEMO DATA
// ------------------------------------------------------------
export const autoflowData = {
  nodes: [
    { id: 0, type: 'trigger', labelKey: 'autoflow.node1', x: 30, y: 40 },
    { id: 1, type: 'action', labelKey: 'autoflow.node2', x: 200, y: 40 },
    { id: 2, type: 'condition', labelKey: 'autoflow.node3', x: 380, y: 40 },
    { id: 3, type: 'http', labelKey: 'autoflow.node4', x: 560, y: 15 },
    { id: 4, type: 'code', labelKey: 'autoflow.node5', x: 560, y: 85 },
  ],
  steps: [
    'autoflow.step1',
    'autoflow.step2',
    'autoflow.step3',
    'autoflow.step4',
    'autoflow.step5',
  ],
  connectorsTemplate: [
    { name: 'Gmail', iconName: 'Mail', initial: true, category: 'autoflow.catEmail' },
    { name: 'Slack', iconName: 'MessageCircle', initial: true, category: 'autoflow.catMessaging' },
    { name: 'WhatsApp', iconName: 'MessageCircle', initial: false, category: 'autoflow.catMessaging' },
    { name: 'PDF Generator', iconName: 'File', initial: true, category: 'autoflow.catDocs' },
    { name: 'CSV Parser', iconName: 'Table', initial: false, category: 'autoflow.catData' },
    { name: 'Google Sheets', iconName: 'Table', initial: true, category: 'autoflow.catData' },
    { name: 'HubSpot CRM', iconName: 'Link', initial: false, category: 'autoflow.catCRM' },
    { name: 'Webhook', iconName: 'Link', initial: true, category: 'autoflow.catAPIs' },
    { name: 'OpenAI', iconName: 'Bot', initial: true, category: 'autoflow.catAI' },
  ]
};
