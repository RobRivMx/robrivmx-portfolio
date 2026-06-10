const fs = require('fs');
const path = require('path');

const esPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'es.json');
const enPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'locales', 'en.json');
const jsxPath = path.join(__dirname, 'FrontEnd Portafolio', 'src', 'components', 'AutoFlowDemo.jsx');

const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

esData.autoflow = {
    "back": "← Volver",
    "demoBadge": "DEMO",
    "live": "En vivo",
    "connecting": "Conectando...",
    "connected": "Conectado",
    "connect": "Conectar",
    "badgeAi": "Automatización empresarial con IA",
    "title1": "Automatiza tu negocio con",
    "title2": "inteligencia",
    "desc": "Diseña flujos de trabajo potentes con n8n, potenciados por IA. Conecta tus servicios, automatiza procesos y delega tareas al asistente inteligente.",
    "btnLive": "Ver demo en vivo",
    "btnAi": "Hablar con IA",
    "metricsTitle": "Métricas en tiempo real",
    "metricsDesc": "Monitorea el rendimiento de tus automatizaciones",
    "metric1": "Flujos activos",
    "metric2": "Ejecuciones hoy",
    "metric3": "Errores",
    "flowTitle": "Flujo Inteligente",
    "flowDesc": "Visualiza y ejecuta automatizaciones con un solo clic",
    "flowName": "Onboarding CRM",
    "flowReady": "Listo para ejecutar",
    "flowRunning": "Ejecutando...",
    "flowRunBtn": "Ejecutar demo",
    "step1": "Webhook recibido: nuevo lead desde landing page",
    "step2": "Validando email y nombre del lead...",
    "step3": "¿Lead aprobado? → Cumple criterios de segmentación",
    "step4": "Enviando datos a HubSpot CRM...",
    "step5": "Transformando payload a formato API v2",
    "chatTitle": "Asistente IA",
    "chatDesc": "Conversa con la IA para crear, depurar y optimizar flujos",
    "botName": "AutoFlow Nexus",
    "botStatus": "GPT-4o En línea",
    "quickCmds": "Comandos Rápidos",
    "cmd1Desc": "Sintetizar flujo CRM",
    "cmd2Desc": "Gestionar integraciones",
    "cmd3Desc": "Analizar latencia de nodos",
    "cmd4Desc": "Revisar logs de error",
    "magicAction": "Nexus puede orquestar flujos autónomamente",
    "monitor": "Monitor de Interacciones",
    "terminal": "Terminal Activa",
    "processing": "Procesando_",
    "typing": "La IA está escribiendo...",
    "placeholder": "Escribe tu mensaje...",
    "connectorsTitle": "Conectores",
    "connectorsDesc": "Integra tus servicios favoritos. Haz clic para conectar/desconectar.",
    "summaryConnected": "Conectados",
    "summaryPending": "Pendientes",
    "summaryUptime": "Uptime",
    "footerDesc": "Automatización empresarial con n8n · IA · Webhooks",
    "botWelcome": "Sistemas en línea. Soy **AutoFlow Nexus**, tu orquestador IA. Estoy listo para procesar tus requerimientos, sintetizar pipelines y ejecutar nodos en tiempo real. ¿Qué arquitectura vamos a construir hoy?",
    "botResp1": "Analizando semántica del requerimiento... **Pipeline detectado: Captura y Nutrición de Leads**.\n\nHe sintetizado la siguiente arquitectura óptima:\n1. **Trigger:** Webhook dinámico (Escucha activa)\n2. **Procesador:** Filtro Regex para email/nombre\n3. **Acción:** Integración SMTP (Bienvenida)\n4. **Notificación:** Ping a Slack/Teams\n\nDesplegando nodos en el entorno visual. Iniciando simulación en 3, 2, 1...",
    "botResp2": "Accediendo al registro de integraciones... \n\nTu ecosistema actual tiene autorizaciones OAuth válidas para **Gmail** y **Slack**. Puedes gestionar tokens y Webhooks directamente en la consola de Conectores. ¿Deseas aprovisionar una nueva API Key?",
    "botRespDefault": "Recibido. Analizando tu instrucción mediante NLP...\n\nComo tu orquestador IA, puedo estructurar flujos complejos, realizar debugging de payloads en tiempo real o sugerir optimizaciones de rendimiento. Por favor, sé más específico o usa uno de los comandos rápidos."
};

enData.autoflow = {
    "back": "← Back",
    "demoBadge": "DEMO",
    "live": "Live",
    "connecting": "Connecting...",
    "connected": "Connected",
    "connect": "Connect",
    "badgeAi": "Enterprise Automation with AI",
    "title1": "Automate your business with",
    "title2": "intelligence",
    "desc": "Design powerful workflows with n8n, powered by AI. Connect your services, automate processes, and delegate tasks to the smart assistant.",
    "btnLive": "View live demo",
    "btnAi": "Talk to AI",
    "metricsTitle": "Real-time Metrics",
    "metricsDesc": "Monitor the performance of your automations",
    "metric1": "Active flows",
    "metric2": "Executions today",
    "metric3": "Errors",
    "flowTitle": "Smart Flow",
    "flowDesc": "Visualize and execute automations with a single click",
    "flowName": "CRM Onboarding",
    "flowReady": "Ready to execute",
    "flowRunning": "Running...",
    "flowRunBtn": "Run demo",
    "step1": "Webhook received: new lead from landing page",
    "step2": "Validating email and lead name...",
    "step3": "Lead approved? → Meets segmentation criteria",
    "step4": "Sending data to HubSpot CRM...",
    "step5": "Transforming payload to API v2 format",
    "chatTitle": "AI Assistant",
    "chatDesc": "Chat with the AI to create, debug, and optimize flows",
    "botName": "AutoFlow Nexus",
    "botStatus": "GPT-4o Online",
    "quickCmds": "Quick Commands",
    "cmd1Desc": "Synthesize CRM flow",
    "cmd2Desc": "Manage integrations",
    "cmd3Desc": "Analyze node latency",
    "cmd4Desc": "Check error logs",
    "magicAction": "Nexus can orchestrate flows autonomously",
    "monitor": "Interaction Monitor",
    "terminal": "Active Terminal",
    "processing": "Processing_",
    "typing": "AI is typing...",
    "placeholder": "Type your message...",
    "connectorsTitle": "Connectors",
    "connectorsDesc": "Integrate your favorite services. Click to connect/disconnect.",
    "summaryConnected": "Connected",
    "summaryPending": "Pending",
    "summaryUptime": "Uptime",
    "footerDesc": "Enterprise automation with n8n · AI · Webhooks",
    "botWelcome": "Systems online. I am **AutoFlow Nexus**, your AI orchestrator. I am ready to process your requirements, synthesize pipelines, and execute nodes in real time. What architecture are we building today?",
    "botResp1": "Analyzing request semantics... **Pipeline detected: Lead Capture and Nurturing**.\n\nI have synthesized the following optimal architecture:\n1. **Trigger:** Dynamic Webhook (Active listening)\n2. **Processor:** Regex Filter for email/name\n3. **Action:** SMTP Integration (Welcome)\n4. **Notification:** Slack/Teams Ping\n\nDeploying nodes to the visual environment. Starting simulation in 3, 2, 1...",
    "botResp2": "Accessing integrations registry... \n\nYour current ecosystem has valid OAuth authorizations for **Gmail** and **Slack**. You can manage tokens and Webhooks directly in the Connectors console. Do you want to provision a new API Key?",
    "botRespDefault": "Received. Analyzing your instruction using NLP...\n\nAs your AI orchestrator, I can structure complex flows, debug payloads in real time, or suggest performance optimizations. Please be more specific or use one of the quick commands."
};

fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

let jsx = fs.readFileSync(jsxPath, 'utf8');

// Add import
if(!jsx.includes("import { useTranslation }")) {
    jsx = jsx.replace(
        "import React, { useState, useEffect, useRef } from 'react';",
        "import React, { useState, useEffect, useRef } from 'react';\nimport { useTranslation } from 'react-i18next';"
    );
}

// Modify Navbar
jsx = jsx.replace(
    /const Navbar = \(\{ onClose \}\) => \(/,
    "const Navbar = ({ onClose }) => {\n    const { t, i18n } = useTranslation();\n    const toggleLanguage = () => {\n        i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es');\n    };\n    return ("
).replace(
    /<\/header>\r?\n\);/,
    "</header>\n    );\n};"
);
jsx = jsx.replace("← Volver", "{t('autoflow.back')}");
jsx = jsx.replace("DEMO", "{t('autoflow.demoBadge')}");
jsx = jsx.replace("En vivo", "{t('autoflow.live')}");

jsx = jsx.replace(
    '<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#22D3EE]',
    "<button\n                onClick={toggleLanguage}\n                className=\"flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(59,130,246,0.2)] bg-[#1A1D2E] text-xs font-medium text-[#60A5FA] hover:text-[#F0F4FF] hover:border-[#60A5FA]/40 transition-colors\"\n            >\n                {i18n.language.startsWith('es') ? 'EN' : 'ES'}\n            </button>\n            <div className=\"w-8 h-8 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#22D3EE]"
);

// Modify ConnectorCardAnimado
jsx = jsx.replace(
    "const ConnectorCardAnimado = ({ name, icon: Icon, connected: initialConnected, category, onToggle }) => {",
    "const ConnectorCardAnimado = ({ name, icon: Icon, connected: initialConnected, category, onToggle }) => {\n    const { t } = useTranslation();"
);
jsx = jsx.replace("{animating ? 'Conectando...' : connected ? 'Conectado' : 'Conectar'}", "{animating ? t('autoflow.connecting') : connected ? t('autoflow.connected') : t('autoflow.connect')}");

// Modify AutoFlowDemo
jsx = jsx.replace(
    "export default function AutoFlowDemo({ onClose }) {",
    "export default function AutoFlowDemo({ onClose }) {\n    const { t } = useTranslation();"
);

// Steps inside runFlowDemo
jsx = jsx.replace(
    "        const steps = [\n            'Webhook recibido: nuevo lead desde landing page',\n            'Validando email y nombre del lead...',\n            '¿Lead aprobado? → Cumple criterios de segmentación',\n            'Enviando datos a HubSpot CRM...',\n            'Transformando payload a formato API v2',\n        ];",
    "        const steps = [\n            t('autoflow.step1'),\n            t('autoflow.step2'),\n            t('autoflow.step3'),\n            t('autoflow.step4'),\n            t('autoflow.step5'),\n        ];"
);

// Messages initialization
jsx = jsx.replace(
    "        { id: 1, role: 'bot', text: 'Sistemas en línea. Soy **AutoFlow Nexus**, tu orquestador IA. Estoy listo para procesar tus requerimientos, sintetizar pipelines y ejecutar nodos en tiempo real. ¿Qué arquitectura vamos a construir hoy?', time: '10:32' },",
    "        { id: 1, role: 'bot', text: t('autoflow.botWelcome'), time: '10:32' },"
);

// Bot responses inside handleSend
jsx = jsx.replace(
    "                botResponse = 'Analizando semántica del requerimiento... **Pipeline detectado: Captura y Nutrición de Leads**.\\n\\nHe sintetizado la siguiente arquitectura óptima:\\n1. **Trigger:** Webhook dinámico (Escucha activa)\\n2. **Procesador:** Filtro Regex para email/nombre\\n3. **Acción:** Integración SMTP (Bienvenida)\\n4. **Notificación:** Ping a Slack/Teams\\n\\nDesplegando nodos en el entorno visual. Iniciando simulación en 3, 2, 1...';",
    "                botResponse = t('autoflow.botResp1');"
);
jsx = jsx.replace(
    "                botResponse = 'Accediendo al registro de integraciones... \\n\\nTu ecosistema actual tiene autorizaciones OAuth válidas para **Gmail** y **Slack**. Puedes gestionar tokens y Webhooks directamente en la consola de Conectores. ¿Deseas aprovisionar una nueva API Key?';",
    "                botResponse = t('autoflow.botResp2');"
);
jsx = jsx.replace(
    "                botResponse = 'Recibido. Analizando tu instrucción mediante NLP...\\n\\nComo tu orquestador IA, puedo estructurar flujos complejos, realizar debugging de payloads en tiempo real o sugerir optimizaciones de rendimiento. Por favor, sé más específico o usa uno de los comandos rápidos.';",
    "                botResponse = t('autoflow.botRespDefault');"
);

// Suggestions
jsx = jsx.replace("'Sintetizar flujo CRM'", "t('autoflow.cmd1Desc')");
jsx = jsx.replace("'Gestionar integraciones'", "t('autoflow.cmd2Desc')");
jsx = jsx.replace("'Analizar latencia de nodos'", "t('autoflow.cmd3Desc')");
jsx = jsx.replace("'Revisar logs de error'", "t('autoflow.cmd4Desc')");

// JSX Text replacements
jsx = jsx.replace("Automatización empresarial con IA", "{t('autoflow.badgeAi')}");
jsx = jsx.replace("Automatiza tu negocio con", "{t('autoflow.title1')}");
jsx = jsx.replace("inteligencia", "{t('autoflow.title2')}");
jsx = jsx.replace("Diseña flujos de trabajo potentes con n8n, potenciados por IA. Conecta tus servicios, automatiza procesos y delega tareas al asistente inteligente.", "{t('autoflow.desc')}");
jsx = jsx.replace("Ver demo en vivo", "{t('autoflow.btnLive')}");
jsx = jsx.replace("Hablar con IA", "{t('autoflow.btnAi')}");

jsx = jsx.replace("Métricas en tiempo real", "{t('autoflow.metricsTitle')}");
jsx = jsx.replace("Monitorea el rendimiento de tus automatizaciones", "{t('autoflow.metricsDesc')}");
jsx = jsx.replace("'Flujos activos'", "t('autoflow.metric1')");
jsx = jsx.replace("'Ejecuciones hoy'", "t('autoflow.metric2')");
jsx = jsx.replace("'Errores'", "t('autoflow.metric3')");
jsx = jsx.replace("m.label === 'Flujos activos'", "m.label === t('autoflow.metric1')").replace("m.label === 'Ejecuciones hoy'", "m.label === t('autoflow.metric2')");

jsx = jsx.replace("Flujo Inteligente", "{t('autoflow.flowTitle')}");
jsx = jsx.replace("Visualiza y ejecuta automatizaciones con un solo clic", "{t('autoflow.flowDesc')}");
jsx = jsx.replace("Onboarding CRM", "{t('autoflow.flowName')}");
jsx = jsx.replace("Listo para ejecutar", "{t('autoflow.flowReady')}");
jsx = jsx.replace("Ejecutando...", "{t('autoflow.flowRunning')}");
jsx = jsx.replace("Ejecutar demo", "{t('autoflow.flowRunBtn')}");

jsx = jsx.replace("Asistente IA", "{t('autoflow.chatTitle')}");
jsx = jsx.replace("Conversa con la IA para crear, depurar y optimizar flujos", "{t('autoflow.chatDesc')}");
jsx = jsx.replace("AutoFlow Nexus", "{t('autoflow.botName')}");
jsx = jsx.replace("GPT-4o En línea", "{t('autoflow.botStatus')}");
jsx = jsx.replace("Comandos Rápidos", "{t('autoflow.quickCmds')}");
jsx = jsx.replace("Nexus puede orquestar flujos autónomamente", "{t('autoflow.magicAction')}");
jsx = jsx.replace("Monitor de Interacciones", "{t('autoflow.monitor')}");
jsx = jsx.replace("Terminal Activa", "{t('autoflow.terminal')}");
jsx = jsx.replace("Procesando_", "{t('autoflow.processing')}");
jsx = jsx.replace("'La IA está escribiendo...'", "t('autoflow.typing')");
jsx = jsx.replace("'Escribe tu mensaje...'", "t('autoflow.placeholder')");

jsx = jsx.replace("Conectores", "{t('autoflow.connectorsTitle')}");
jsx = jsx.replace("Integra tus servicios favoritos. Haz clic para conectar/desconectar.", "{t('autoflow.connectorsDesc')}");
jsx = jsx.replace("Conectados", "{t('autoflow.summaryConnected')}");
jsx = jsx.replace("Pendientes", "{t('autoflow.summaryPending')}");
jsx = jsx.replace("Uptime", "{t('autoflow.summaryUptime')}");

jsx = jsx.replace("Automatización empresarial con n8n · IA · Webhooks", "{t('autoflow.footerDesc')}");

fs.writeFileSync(jsxPath, jsx, 'utf8');
console.log('Update successful!');
