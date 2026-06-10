const fs = require('fs');
const path = require('path');

const esPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'es.json');
const enPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'en.json');
const jsxPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'components', 'InsightAIDemo.jsx');

const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

esData.insightai = {
  "back": "← Volver",
  "cfoSubtitle": "Tu CFO con IA",
  "headerStatus": "PostgreSQL — Q1 2026",
  "heroBadge": "Tu CFO Impulsado por IA",
  "heroTitle1": "Decisiones estratégicas con",
  "heroTitle2": "datos en tiempo real",
  "heroDesc": "Conecta tus bases de datos en minutos, analiza métricas clave y genera reportes ejecutivos interactuando directamente en lenguaje natural.",
  "btnLive": "Ver Demo en vivo",
  "btnAi": "Consultar a la IA",
  "dashTitle": "Dashboard Ejecutivo",
  "chart1Title": "Ingresos últimos 6 meses",
  "chart2Title": "Top 5 productos por venta",
  "tableTitle": "Últimas transacciones",
  "tableSubtitle": "5 de 1,847",
  "tableId": "ID",
  "tableClient": "Cliente",
  "tableProduct": "Producto",
  "tableAmount": "Monto",
  "tableStatus": "Status",
  "tableDate": "Fecha",
  "tablePage": "Página 1 de 370",
  "btnPrev": "Anterior",
  "btnNext": "Siguiente",
  "chatTitle": "Chat IA — Consultas en Lenguaje Natural",
  "btnNewQuery": "+ Nueva consulta",
  "chatHistory": "Historial",
  "chatHistoryEmpty": "Aún no hay consultas",
  "justNow": "Justo ahora",
  "chatPlaceholder": "Escribe tu consulta aquí...",
  "chatExamples": "Ejemplos",
  "chatEx1": "Top productos del mes",
  "chatEx2": "Mostrar ventas por día",
  "chatEx3": "Generar reporte ejecutivo",
  "aiWelcome": "¡Hola! Soy InsightAI, tu CFO virtual. Para que veas la magia en acción, te invito a probar los botones de **acciones rápidas** abajo, o puedes escribir tu propia consulta.\n\nDescubre cómo genero gráficos y tablas dinámicas en segundos basándome en tus datos.",
  "aiWelcomeAnalysis": "Conexión a PostgreSQL establecida con éxito. Listo para procesar consultas.",
  "aiDemo": "Esta es una demostración interactiva. En un entorno de producción, **InsightAI** se conectará directamente a tu Base de Datos para analizar esta consulta personalizada y generar reportes financieros en tiempo real.",
  "aiDemoAnalysis": "Modo Demo Activo. Conexión a base de datos del cliente requerida para consultas personalizadas.",
  "aiTopProducts": "Aquí están los 3 productos más vendidos de la semana. **Laptop Pro X1** sigue liderando con fuerza.",
  "aiTopProductsAnalysis": "Query ejecutado: SELECT nombre, ventas FROM productos ORDER BY ventas DESC LIMIT 3",
  "aiChurn": "Atención: he detectado 3 clientes corporativos con un patrón de compras decreciente que indica riesgo de abandono (churn).",
  "aiChurnAnalysis": "Algoritmo predictivo de Churn Risk (XGBoost) detectó anomalías en la frecuencia de órdenes.",
  "aiSales": "Las ventas se han mantenido sólidas, mostrando un crecimiento del **+12.3%** comparado con el mes anterior.",
  "aiSalesAnalysis": "Cálculo de delta mes a mes completado sobre la serie temporal de ingresos.",
  "miniChartTitle": "Top 3 productos — Esta semana",
  "miniTableTitle": "⚠ Clientes en riesgo de churn",
  "schemaTitle": "Esquema de BD",
  "schemaDb": "Bases de datos",
  "schemaEco": "Ecosistema",
  "syncLoading": "Sincronizando metadata...",
  "syncDone": "Sincronizado justo ahora",
  "syncOld": "Sincronizado hace 5 min",
  "btnResync": "Resincronizar",
  "repTitle": "Generador de Reportes",
  "repCreate": "Crear reporte ejecutivo",
  "repLabel1": "Tipo de reporte",
  "repLabel2": "Período",
  "repLabel3": "Formato",
  "repType1": "Reporte de ventas",
  "repType2": "Reporte de inventario",
  "repType3": "Reporte de clientes",
  "repType4": "Reporte financiero",
  "repPer1": "Este mes",
  "repPer2": "Mes anterior",
  "repPer3": "Q1 2026",
  "repFmt1": "PDF ejecutivo",
  "repFmt2": "Excel (.xlsx)",
  "repFmt3": "CSV",
  "repInclude": "Incluir",
  "repInc1": "Gráficas automáticas",
  "repInc2": "Resumen ejecutivo con IA",
  "repInc3": "Comparativo vs período anterior",
  "repInc4": "Predicciones próximo período",
  "repInc5": "Alertas y anomalías",
  "btnGenerating": "Generando...",
  "btnGenerate": "Generar con IA",
  "repPreviewEmpty": "Configura y presiona \"Generar con IA\" para ver el reporte interactivo.",
  "repStep1": "Analizando tablas de base de datos...",
  "repStep2": "Cruzando métricas de ventas vs inventario...",
  "repStep3": "Generando gráficas predictivas con IA...",
  "repStep4": "Ensamblando y renderizando PDF ejecutivo...",
  "repPreviewBadge": "PREVIEW LISTO",
  "repPreviewTitle": "Reporte de Ventas — Junio 2026",
  "repPreviewDesc": "Las ventas totales del mes alcanzaron $847,320 MXN (+12.3% vs mes anterior). El producto estrella fue Laptop Pro X1 con 245 unidades.",
  "repHead1": "Producto",
  "repHead2": "Unidades",
  "repHead3": "Ingreso",
  "repFooter1": "Generado por InsightAI",
  "repFooter2": "Página 1 de 3",
  "moreHelp": "¿En qué más te puedo ayudar? Prueba con otra de las acciones rápidas.",
  "newQueryReady": "Lista para una nueva consulta.",
  "kpiSales": "Ingresos del mes",
  "kpiOrders": "Órdenes activas",
  "kpiTicket": "Ticket promedio",
  "kpiConv": "Tasa de conversión",
  "kpiSub": "vs mes anterior"
};

enData.insightai = {
  "back": "← Back",
  "cfoSubtitle": "Your AI CFO",
  "headerStatus": "PostgreSQL — Q1 2026",
  "heroBadge": "Your AI-Powered CFO",
  "heroTitle1": "Strategic decisions with",
  "heroTitle2": "real-time data",
  "heroDesc": "Connect your databases in minutes, analyze key metrics, and generate executive reports interacting directly in natural language.",
  "btnLive": "View live Demo",
  "btnAi": "Consult the AI",
  "dashTitle": "Executive Dashboard",
  "chart1Title": "Revenue last 6 months",
  "chart2Title": "Top 5 products by sales",
  "tableTitle": "Latest transactions",
  "tableSubtitle": "5 of 1,847",
  "tableId": "ID",
  "tableClient": "Client",
  "tableProduct": "Product",
  "tableAmount": "Amount",
  "tableStatus": "Status",
  "tableDate": "Date",
  "tablePage": "Page 1 of 370",
  "btnPrev": "Previous",
  "btnNext": "Next",
  "chatTitle": "AI Chat — Natural Language Queries",
  "btnNewQuery": "+ New query",
  "chatHistory": "History",
  "chatHistoryEmpty": "No queries yet",
  "justNow": "Just now",
  "chatPlaceholder": "Type your query here...",
  "chatExamples": "Examples",
  "chatEx1": "Top products of the month",
  "chatEx2": "Show sales by day",
  "chatEx3": "Generate executive report",
  "aiWelcome": "Hello! I am InsightAI, your virtual CFO. To see the magic in action, I invite you to try the **quick actions** below, or you can type your own query.\n\nDiscover how I generate charts and pivot tables in seconds based on your data.",
  "aiWelcomeAnalysis": "PostgreSQL connection established successfully. Ready to process queries.",
  "aiDemo": "This is an interactive demonstration. In a production environment, **InsightAI** will connect directly to your Database to analyze this custom query and generate financial reports in real time.",
  "aiDemoAnalysis": "Active Demo Mode. Client database connection required for custom queries.",
  "aiTopProducts": "Here are the top 3 best-selling products of the week. **Laptop Pro X1** remains strongly in the lead.",
  "aiTopProductsAnalysis": "Query executed: SELECT name, sales FROM products ORDER BY sales DESC LIMIT 3",
  "aiChurn": "Attention: I have detected 3 corporate clients with a decreasing purchase pattern indicating churn risk.",
  "aiChurnAnalysis": "Churn Risk predictive algorithm (XGBoost) detected anomalies in order frequency.",
  "aiSales": "Sales have remained solid, showing a **+12.3%** growth compared to the previous month.",
  "aiSalesAnalysis": "Month-over-month delta calculation completed over revenue time series.",
  "miniChartTitle": "Top 3 products — This week",
  "miniTableTitle": "⚠ Clients at churn risk",
  "schemaTitle": "DB Schema",
  "schemaDb": "Databases",
  "schemaEco": "Ecosystem",
  "syncLoading": "Syncing metadata...",
  "syncDone": "Synced just now",
  "syncOld": "Synced 5 mins ago",
  "btnResync": "Resync",
  "repTitle": "Report Generator",
  "repCreate": "Create executive report",
  "repLabel1": "Report type",
  "repLabel2": "Period",
  "repLabel3": "Format",
  "repType1": "Sales report",
  "repType2": "Inventory report",
  "repType3": "Client report",
  "repType4": "Financial report",
  "repPer1": "This month",
  "repPer2": "Previous month",
  "repPer3": "Q1 2026",
  "repFmt1": "Executive PDF",
  "repFmt2": "Excel (.xlsx)",
  "repFmt3": "CSV",
  "repInclude": "Include",
  "repInc1": "Automatic charts",
  "repInc2": "AI executive summary",
  "repInc3": "Comparison vs previous period",
  "repInc4": "Predictions for next period",
  "repInc5": "Alerts and anomalies",
  "btnGenerating": "Generating...",
  "btnGenerate": "Generate with AI",
  "repPreviewEmpty": "Configure and press \"Generate with AI\" to see the interactive report.",
  "repStep1": "Analyzing database tables...",
  "repStep2": "Cross-referencing sales vs inventory metrics...",
  "repStep3": "Generating predictive charts with AI...",
  "repStep4": "Assembling and rendering executive PDF...",
  "repPreviewBadge": "PREVIEW READY",
  "repPreviewTitle": "Sales Report — June 2026",
  "repPreviewDesc": "Total sales for the month reached $847,320 MXN (+12.3% vs previous month). The star product was Laptop Pro X1 with 245 units.",
  "repHead1": "Product",
  "repHead2": "Units",
  "repHead3": "Revenue",
  "repFooter1": "Generated by InsightAI",
  "repFooter2": "Page 1 of 3",
  "moreHelp": "How else can I help you? Try another quick action.",
  "newQueryReady": "Ready for a new query.",
  "kpiSales": "Monthly revenue",
  "kpiOrders": "Active orders",
  "kpiTicket": "Average ticket",
  "kpiConv": "Conversion rate",
  "kpiSub": "vs previous month"
};

fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

let jsx = fs.readFileSync(jsxPath, 'utf8');

if (!jsx.includes('import { useTranslation } from')) {
    jsx = jsx.replace(
        "import React, { useState, useRef, useEffect, useCallback } from 'react';",
        "import React, { useState, useRef, useEffect, useCallback } from 'react';\nimport { useTranslation } from 'react-i18next';"
    );
}

// Add language toggle & translation to InsightAIDemo
jsx = jsx.replace(
    "export default function InsightAIDemo({ onClose }) {",
    "export default function InsightAIDemo({ onClose }) {\n  const { t, i18n } = useTranslation();\n  const toggleLanguage = () => {\n    i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es');\n  };\n"
);

// Inject toggle button in the header
jsx = jsx.replace(
    /<div\s*className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center/g,
    "<button\n              onClick={toggleLanguage}\n              className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-500/20 bg-white/5 text-xs font-medium text-blue-400 hover:text-white hover:border-blue-500/40 transition-colors\"\n            >\n              {i18n.language.startsWith('es') ? 'EN' : 'ES'}\n            </button>\n            <div\n              className=\"w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
);

// Mocks
jsx = jsx.replace("'Ingresos del mes'", "t('insightai.kpiSales')");
jsx = jsx.replace("'Órdenes activas'", "t('insightai.kpiOrders')");
jsx = jsx.replace("'Ticket promedio'", "t('insightai.kpiTicket')");
jsx = jsx.replace("'Tasa de conversión'", "t('insightai.kpiConv')");
jsx = jsx.replace(/'vs mes anterior'/g, "t('insightai.kpiSub')");

jsx = jsx.replace("'Completado'", "t('insightai.tableStatus')"); // Hacky but tableStatus works in demo
// Wait, the status is checked by string "Completado" for colors. I should leave status as is, and translate it in rendering.
// So let's not replace data strings unless needed. I'll translate only the JSX text.

// Header
jsx = jsx.replace(">← Volver<", ">{t('insightai.back')}<");
jsx = jsx.replace(">Tu CFO con IA<", ">{t('insightai.cfoSubtitle')}<");
jsx = jsx.replace(">PostgreSQL — Q1 2026<", ">{t('insightai.headerStatus')}<");

// Hero
jsx = jsx.replace("Tu CFO Impulsado por IA", "{t('insightai.heroBadge')}");
jsx = jsx.replace("Decisiones estratégicas con{' '}", "{t('insightai.heroTitle1')}{' '}");
jsx = jsx.replace("datos en tiempo real", "{t('insightai.heroTitle2')}");
jsx = jsx.replace("Conecta tus bases de datos en minutos, analiza métricas clave y genera reportes ejecutivos interactuando directamente en lenguaje natural.", "{t('insightai.heroDesc')}");
jsx = jsx.replace("Ver Demo en vivo", "{t('insightai.btnLive')}");
jsx = jsx.replace("Consultar a la IA", "{t('insightai.btnAi')}");

// Dash
jsx = jsx.replace("Dashboard Ejecutivo", "{t('insightai.dashTitle')}");
jsx = jsx.replace(">Ingresos últimos 6 meses<", ">{t('insightai.chart1Title')}<");
jsx = jsx.replace(">Top 5 productos por venta<", ">{t('insightai.chart2Title')}<");
jsx = jsx.replace("Últimas transacciones", "{t('insightai.tableTitle')}");
jsx = jsx.replace(">5 de 1,847<", ">{t('insightai.tableSubtitle')}<");

jsx = jsx.replace("['ID', 'Cliente', 'Producto', 'Monto', 'Status', 'Fecha']", "[t('insightai.tableId'), t('insightai.tableClient'), t('insightai.tableProduct'), t('insightai.tableAmount'), t('insightai.tableStatus'), t('insightai.tableDate')]");
jsx = jsx.replace(">Página 1 de 370<", ">{t('insightai.tablePage')}<");
jsx = jsx.replace(">Anterior<", ">{t('insightai.btnPrev')}<");
jsx = jsx.replace(">Siguiente<", ">{t('insightai.btnNext')}<");

// Chat
jsx = jsx.replace("Chat IA — Consultas en Lenguaje Natural", "{t('insightai.chatTitle')}");
jsx = jsx.replace(">+ Nueva consulta<", ">{t('insightai.btnNewQuery')}<");
jsx = jsx.replace(">Historial<", ">{t('insightai.chatHistory')}<");
jsx = jsx.replace(">Aún no hay consultas<", ">{t('insightai.chatHistoryEmpty')}<");
jsx = jsx.replace("'Justo ahora'", "t('insightai.justNow')");

// Responses
jsx = jsx.replace("'¿En qué más te puedo ayudar? Prueba con otra de las acciones rápidas.'", "t('insightai.moreHelp')");
jsx = jsx.replace("'Lista para una nueva consulta.'", "t('insightai.newQueryReady')");

jsx = jsx.replace("'¡Hola! Soy InsightAI, tu CFO virtual. Para que veas la magia en acción, te invito a probar los botones de **acciones rápidas** abajo, o puedes escribir tu propia consulta.\\n\\nDescubre cómo genero gráficos y tablas dinámicas en segundos basándome en tus datos.'", "t('insightai.aiWelcome')");
jsx = jsx.replace("'Conexión a PostgreSQL establecida con éxito. Listo para procesar consultas.'", "t('insightai.aiWelcomeAnalysis')");
jsx = jsx.replace("'Esta es una demostración interactiva. En un entorno de producción, **InsightAI** se conectará directamente a tu Base de Datos para analizar esta consulta personalizada y generar reportes financieros en tiempo real.'", "t('insightai.aiDemo')");
jsx = jsx.replace("'Modo Demo Activo. Conexión a base de datos del cliente requerida para consultas personalizadas.'", "t('insightai.aiDemoAnalysis')");
jsx = jsx.replace("'Aquí están los 3 productos más vendidos de la semana. **Laptop Pro X1** sigue liderando con fuerza.'", "t('insightai.aiTopProducts')");
jsx = jsx.replace("'Query ejecutado: SELECT nombre, ventas FROM productos ORDER BY ventas DESC LIMIT 3'", "t('insightai.aiTopProductsAnalysis')");
jsx = jsx.replace("'Atención: he detectado 3 clientes corporativos con un patrón de compras decreciente que indica riesgo de abandono (churn).'", "t('insightai.aiChurn')");
jsx = jsx.replace("'Algoritmo predictivo de Churn Risk (XGBoost) detectó anomalías en la frecuencia de órdenes.'", "t('insightai.aiChurnAnalysis')");
jsx = jsx.replace("'Las ventas se han mantenido sólidas, mostrando un crecimiento del **+12.3%** comparado con el mes anterior.'", "t('insightai.aiSales')");
jsx = jsx.replace("'Cálculo de delta mes a mes completado sobre la serie temporal de ingresos.'", "t('insightai.aiSalesAnalysis')");

jsx = jsx.replace(">Top 3 productos — Esta semana<", ">{t('insightai.miniChartTitle')}<");
jsx = jsx.replace(">⚠ Clientes en riesgo de churn<", ">{t('insightai.miniTableTitle')}<");

jsx = jsx.replace("placeholder=\"Escribe tu consulta aquí...\"", "placeholder={t('insightai.chatPlaceholder')}");
jsx = jsx.replace(">Ejemplos<", ">{t('insightai.chatExamples')}<");
jsx = jsx.replace("['Top productos del mes', 'Mostrar ventas por día', 'Generar reporte ejecutivo']", "[t('insightai.chatEx1'), t('insightai.chatEx2'), t('insightai.chatEx3')]");

jsx = jsx.replace(">Esquema de BD<", ">{t('insightai.schemaTitle')}<");
jsx = jsx.replace(">Bases de datos<", ">{t('insightai.schemaDb')}<");
jsx = jsx.replace(">Ecosistema<", ">{t('insightai.schemaEco')}<");

jsx = jsx.replace("'Sincronizando metadata...'", "t('insightai.syncLoading')");
jsx = jsx.replace("'Sincronizado justo ahora'", "t('insightai.syncDone')");
jsx = jsx.replace("'Sincronizado hace 5 min'", "t('insightai.syncOld')");
jsx = jsx.replace(">Resincronizar<", ">{t('insightai.btnResync')}<");

// Report
// We have ReportGeneratorSection outside. I need to pass t or call useTranslation there!
jsx = jsx.replace(
    "function ReportGeneratorSection() {",
    "function ReportGeneratorSection() {\n  const { t } = useTranslation();"
);

jsx = jsx.replace("Generador de Reportes", "{t('insightai.repTitle')}");
jsx = jsx.replace("Crear reporte ejecutivo", "{t('insightai.repCreate')}");
jsx = jsx.replace("['Tipo de reporte', 'Período', 'Formato']", "[t('insightai.repLabel1'), t('insightai.repLabel2'), t('insightai.repLabel3')]");

jsx = jsx.replace(">Reporte de ventas<", ">{t('insightai.repType1')}<");
jsx = jsx.replace(">Reporte de inventario<", ">{t('insightai.repType2')}<");
jsx = jsx.replace(">Reporte de clientes<", ">{t('insightai.repType3')}<");
jsx = jsx.replace(">Reporte financiero<", ">{t('insightai.repType4')}<");
jsx = jsx.replace(">Este mes<", ">{t('insightai.repPer1')}<");
jsx = jsx.replace(">Mes anterior<", ">{t('insightai.repPer2')}<");
jsx = jsx.replace(">Q1 2026<", ">{t('insightai.repPer3')}<");
jsx = jsx.replace(">PDF ejecutivo<", ">{t('insightai.repFmt1')}<");
jsx = jsx.replace(">Excel (.xlsx)<", ">{t('insightai.repFmt2')}<");
jsx = jsx.replace(">CSV<", ">{t('insightai.repFmt3')}<");

jsx = jsx.replace(">Incluir<", ">{t('insightai.repInclude')}<");
jsx = jsx.replace(
    "[{ label: 'Gráficas automáticas', checked: true }, { label: 'Resumen ejecutivo con IA', checked: true }, { label: 'Comparativo vs período anterior', checked: true }, { label: 'Predicciones próximo período', checked: false }, { label: 'Alertas y anomalías', checked: false }]",
    "[{ label: t('insightai.repInc1'), checked: true }, { label: t('insightai.repInc2'), checked: true }, { label: t('insightai.repInc3'), checked: true }, { label: t('insightai.repInc4'), checked: false }, { label: t('insightai.repInc5'), checked: false }]"
);

jsx = jsx.replace("isGenerating ? 'Generando...' : 'Generar con IA'", "isGenerating ? t('insightai.btnGenerating') : t('insightai.btnGenerate')");
jsx = jsx.replace("Configura y presiona \"Generar con IA\" para ver el reporte interactivo.", "{t('insightai.repPreviewEmpty')}");

jsx = jsx.replace("'Analizando tablas de base de datos...'", "t('insightai.repStep1')");
jsx = jsx.replace("'Cruzando métricas de ventas vs inventario...'", "t('insightai.repStep2')");
jsx = jsx.replace("'Generando gráficas predictivas con IA...'", "t('insightai.repStep3')");
jsx = jsx.replace("'Ensamblando y renderizando PDF ejecutivo...'", "t('insightai.repStep4')");

jsx = jsx.replace("PREVIEW LISTO", "{t('insightai.repPreviewBadge')}");
jsx = jsx.replace("Reporte de Ventas — Junio 2026", "{t('insightai.repPreviewTitle')}");
jsx = jsx.replace("Las ventas totales del mes alcanzaron $847,320 MXN (+12.3% vs mes anterior). El producto estrella fue Laptop Pro X1 con 245 unidades.", "{t('insightai.repPreviewDesc')}");

jsx = jsx.replace("['Producto', 'Unidades', 'Ingreso']", "[t('insightai.repHead1'), t('insightai.repHead2'), t('insightai.repHead3')]");
jsx = jsx.replace(">Generado por InsightAI<", ">{t('insightai.repFooter1')}<");
jsx = jsx.replace(">Página 1 de 3<", ">{t('insightai.repFooter2')}<");


fs.writeFileSync(jsxPath, jsx, 'utf8');
console.log('Update successful!');
