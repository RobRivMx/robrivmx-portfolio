const fs = require('fs');
const path = require('path');

const esPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'es.json');
const enPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'en.json');
const jsxPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'components', 'InsightAIDemo.jsx');

const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

Object.assign(esData.insightai, {
  "chatQuickActions": "Acciones rápidas",
  "chatQA1": "Top productos",
  "chatQA2": "Ventas por día",
  "chatQA3": "Clientes nuevos",
  "chatQA4": "Comparar períodos",
  "chatInputPlaceholder": "Pregúntale a tus datos...",
  "chatFooter": "GPT-4o · LangChain SQL Agent · Conectado a PostgreSQL",
  "btnFullInsight": "Ver insight interactivo completo ↓",

  "connTitle": "Conecta tus fuentes de datos",
  "connSub": "InsightAI se conecta a cualquier DB en menos de 2 minutos",
  "connRel": "Bases de datos relacionales",
  "connCloud": "Cloud databases",
  "connFiles": "Archivos y hojas de cálculo",
  "connActive": "Conexión activa: PostgreSQL",
  "connDesc": "InsightAI está analizando esta base de datos en tiempo real. Todas las consultas que realices en el chat utilizarán inteligencia artificial para convertir tu lenguaje natural en queries SQL, consultando directamente estas tablas de forma segura.",
  "connHost": "Host",
  "connDb": "Base de datos",
  "connTables": "Tablas detectadas",
  "btnUpdating": "Actualizando...",
  "btnHideSchema": "Ocultar esquema",
  "btnShowSchema": "Ver esquema",
  "schemaDetected": "Esquema de tablas detectadas",

  "expTitle": "Insight Expandido",
  "expOriginal": "Consulta original",
  "expQuery": "\"¿Cuál fue mi producto más vendido esta semana?\"",
  "expDesc": "Analizando tu base de datos de ventas para la semana del 18 al 24 de mayo de 2026, identifiqué que <strong className=\"font-medium text-blue-400\">Laptop Pro X1</strong> fue el producto con mayor volumen, totalizando 47 unidades (+23% vs semana anterior), impulsado por la renovación de equipos de CorpTech SA.",
  "expChartTitle": "Ventas diarias — Laptop Pro X1 (Esta semana)",
  "expKpi1": "Unidades vendidas",
  "expKpi1Sub": "Esta semana",
  "expKpi2": "Ingreso generado",
  "expKpi2Sub": "Precio promedio $975",
  "expKpi3": "Margen bruto",
  "expKpi3Sub": "+2.1% vs semana anterior",
  "expTableTitle": "Detalle de transacciones",
  "expTableHead1": "Fecha",
  "expTableHead2": "Cliente",
  "expTableHead3": "Cantidad",
  "expTableHead4": "Precio",
  "expTableHead5": "Sucursal",
  "btnCsv": "Exportar CSV",
  "btnPdf": "Generar PDF",
  "btnHide": "Ocultar"
});

Object.assign(enData.insightai, {
  "chatQuickActions": "Quick actions",
  "chatQA1": "Top products",
  "chatQA2": "Sales by day",
  "chatQA3": "New clients",
  "chatQA4": "Compare periods",
  "chatInputPlaceholder": "Ask your data...",
  "chatFooter": "GPT-4o · LangChain SQL Agent · Connected to PostgreSQL",
  "btnFullInsight": "View full interactive insight ↓",

  "connTitle": "Connect your data sources",
  "connSub": "InsightAI connects to any DB in under 2 minutes",
  "connRel": "Relational databases",
  "connCloud": "Cloud databases",
  "connFiles": "Files and spreadsheets",
  "connActive": "Active connection: PostgreSQL",
  "connDesc": "InsightAI is analyzing this database in real time. All queries you make in the chat will use artificial intelligence to convert your natural language into SQL queries, securely querying these tables directly.",
  "connHost": "Host",
  "connDb": "Database",
  "connTables": "Detected tables",
  "btnUpdating": "Updating...",
  "btnHideSchema": "Hide schema",
  "btnShowSchema": "View schema",
  "schemaDetected": "Detected tables schema",

  "expTitle": "Expanded Insight",
  "expOriginal": "Original query",
  "expQuery": "\"What was my best-selling product this week?\"",
  "expDesc": "Analyzing your sales database for the week of May 18-24, 2026, I identified that <strong className=\"font-medium text-blue-400\">Laptop Pro X1</strong> was the product with the highest volume, totaling 47 units (+23% vs previous week), driven by equipment renewal from CorpTech SA.",
  "expChartTitle": "Daily sales — Laptop Pro X1 (This week)",
  "expKpi1": "Units sold",
  "expKpi1Sub": "This week",
  "expKpi2": "Revenue generated",
  "expKpi2Sub": "Average price $975",
  "expKpi3": "Gross margin",
  "expKpi3Sub": "+2.1% vs previous week",
  "expTableTitle": "Transaction detail",
  "expTableHead1": "Date",
  "expTableHead2": "Client",
  "expTableHead3": "Quantity",
  "expTableHead4": "Price",
  "expTableHead5": "Branch",
  "btnCsv": "Export CSV",
  "btnPdf": "Generate PDF",
  "btnHide": "Hide"
});

fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

let jsx = fs.readFileSync(jsxPath, 'utf8');

// Chat Input Bar
jsx = jsx.replace(">Acciones rápidas<", ">{t('insightai.chatQuickActions')}<");
jsx = jsx.replace("['Top productos', 'Ventas por día', 'Clientes nuevos', 'Comparar períodos']", "[t('insightai.chatQA1'), t('insightai.chatQA2'), t('insightai.chatQA3'), t('insightai.chatQA4')]");
jsx = jsx.replace("placeholder=\"Pregúntale a tus datos...\"", "placeholder={t('insightai.chatInputPlaceholder')}");
jsx = jsx.replace(">GPT-4o · LangChain SQL Agent · Conectado a PostgreSQL<", ">{t('insightai.chatFooter')}<");
jsx = jsx.replace("Ver insight interactivo completo ↓", "{t('insightai.btnFullInsight')}");

// Conectores
jsx = jsx.replace(">Conecta tus fuentes de datos<", ">{t('insightai.connTitle')}<");
jsx = jsx.replace(">InsightAI se conecta a cualquier DB en menos de 2 minutos<", ">{t('insightai.connSub')}<");
jsx = jsx.replace(">Bases de datos relacionales<", ">{t('insightai.connRel')}<");
jsx = jsx.replace(">Cloud databases<", ">{t('insightai.connCloud')}<");
jsx = jsx.replace(">Archivos y hojas de cálculo<", ">{t('insightai.connFiles')}<");
jsx = jsx.replace(">Conexión activa: PostgreSQL<", ">{t('insightai.connActive')}<");
jsx = jsx.replace("InsightAI está analizando esta base de datos en tiempo real. Todas las consultas que realices en el chat utilizarán inteligencia artificial para convertir tu lenguaje natural en queries SQL, consultando directamente estas tablas de forma segura.", "{t('insightai.connDesc')}");

jsx = jsx.replace(
  "[{ label: 'Host', value: 'db.insightai-prod.com', icon: '🌐' }, { label: 'Base de datos', value: 'ventas_q1_2026', icon: '🗄️' }, { label: 'Tablas detectadas', value: '8 tablas', icon: '📋' }]",
  "[{ label: t('insightai.connHost'), value: 'db.insightai-prod.com', icon: '🌐' }, { label: t('insightai.connDb'), value: 'ventas_q1_2026', icon: '🗄️' }, { label: t('insightai.connTables'), value: '8 tablas', icon: '📋' }]"
);

jsx = jsx.replace("Actualizando...</>", "t('insightai.btnUpdating')}</>");
jsx = jsx.replace("showSchema ? 'Ocultar esquema' : 'Ver esquema'", "showSchema ? t('insightai.btnHideSchema') : t('insightai.btnShowSchema')");
jsx = jsx.replace(">Esquema de tablas detectadas<", ">{t('insightai.schemaDetected')}<");

// Expanded Insight
jsx = jsx.replace(">Insight Expandido<", ">{t('insightai.expTitle')}<");
jsx = jsx.replace(">Consulta original<", ">{t('insightai.expOriginal')}<");
jsx = jsx.replace(">\"¿Cuál fue mi producto más vendido esta semana?\"<", ">{t('insightai.expQuery')}<");

jsx = jsx.replace(
  "Analizando tu base de datos de ventas para la semana del 18 al 24 de mayo de 2026, identifiqué que{' '}\n                <strong className=\"font-medium text-blue-400\">Laptop Pro X1</strong> fue el producto con mayor volumen, totalizando 47 unidades (+23% vs semana anterior), impulsado por la renovación de equipos de CorpTech SA.",
  "<span dangerouslySetInnerHTML={{__html: t('insightai.expDesc')}} />"
);

// Fallback in case the multiline replace above fails:
jsx = jsx.replace(
  /Analizando tu base de datos de ventas para la semana del 18 al 24 de mayo de 2026, identifiqué que\{' '\}\s*<strong className="font-medium text-blue-400">Laptop Pro X1<\/strong> fue el producto con mayor volumen, totalizando 47 unidades \(\+23% vs semana anterior\), impulsado por la renovación de equipos de CorpTech SA\./g,
  "<span dangerouslySetInnerHTML={{__html: t('insightai.expDesc')}} />"
);


jsx = jsx.replace(">Ventas diarias — Laptop Pro X1 (Esta semana)<", ">{t('insightai.expChartTitle')}<");

jsx = jsx.replace(
  "[{ label: 'Unidades vendidas', value: '47', sub: 'Esta semana' }, { label: 'Ingreso generado', value: '$45,830 MXN', sub: 'Precio promedio $975' }, { label: 'Margen bruto', value: '34.2%', sub: '+2.1% vs semana anterior' }]",
  "[{ label: t('insightai.expKpi1'), value: '47', sub: t('insightai.expKpi1Sub') }, { label: t('insightai.expKpi2'), value: '$45,830 MXN', sub: t('insightai.expKpi2Sub') }, { label: t('insightai.expKpi3'), value: '34.2%', sub: t('insightai.expKpi3Sub') }]"
);

jsx = jsx.replace(">Detalle de transacciones<", ">{t('insightai.expTableTitle')}<");
jsx = jsx.replace("['Fecha', 'Cliente', 'Cantidad', 'Precio', 'Sucursal']", "[t('insightai.expTableHead1'), t('insightai.expTableHead2'), t('insightai.expTableHead3'), t('insightai.expTableHead4'), t('insightai.expTableHead5')]");

jsx = jsx.replace(">Exportar CSV<", ">{t('insightai.btnCsv')}<");
jsx = jsx.replace(">Generar PDF<", ">{t('insightai.btnPdf')}<");
jsx = jsx.replace(">Ocultar<", ">{t('insightai.btnHide')}<");

fs.writeFileSync(jsxPath, jsx, 'utf8');
console.log('Part 2 update successful!');
