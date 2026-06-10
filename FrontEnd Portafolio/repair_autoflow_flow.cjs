const fs = require('fs');
const file = 'src/components/AutoFlowDemo.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace nodes array
const origNodes = `    const nodes = [
        { id: 0, type: 'trigger', label: 'Webhook', x: 30, y: 40 },
        { id: 1, type: 'action', label: 'Filtrar datos', x: 200, y: 40 },
        { id: 2, type: 'condition', label: '¿Aprobado?', x: 380, y: 40 },
        { id: 3, type: 'http', label: 'POST a CRM', x: 560, y: 15 },
        { id: 4, type: 'code', label: 'Transformar', x: 560, y: 85 },
    ];`;
const newNodes = `    const nodes = [
        { id: 0, type: 'trigger', label: t('autoflow.node1'), x: 30, y: 40 },
        { id: 1, type: 'action', label: t('autoflow.node2'), x: 200, y: 40 },
        { id: 2, type: 'condition', label: t('autoflow.node3'), x: 380, y: 40 },
        { id: 3, type: 'http', label: t('autoflow.node4'), x: 560, y: 15 },
        { id: 4, type: 'code', label: t('autoflow.node5'), x: 560, y: 85 },
    ];`;
content = content.replace(/const nodes = \[\s*\{ id: 0, type: 'trigger', label: 'Webhook'[\s\S]*?\];/g, newNodes);

// Replace steps array
const newSteps = `        const steps = [
            t('autoflow.step1'),
            t('autoflow.step2'),
            t('autoflow.step3'),
            t('autoflow.step4'),
            t('autoflow.step5'),
        ];`;
content = content.replace(/const steps = \[\s*'Webhook recibido: nuevo lead desde landing page'[\s\S]*?\];/g, newSteps);

// And since I'm checking out, I also need to apply the connector categories fix!
const newConnectors = `    const connectors = [
        { name: 'Gmail', icon: Icons.Mail, connected: connectorStatus.Gmail, category: 'autoflow.catEmail' },
        { name: 'Slack', icon: Icons.MessageCircle, connected: connectorStatus.Slack, category: 'autoflow.catMessaging' },
        { name: 'WhatsApp', icon: Icons.MessageCircle, connected: connectorStatus.WhatsApp, category: 'autoflow.catMessaging' },
        { name: 'PDF Generator', icon: Icons.File, connected: connectorStatus['PDF Generator'], category: 'autoflow.catDocs' },
        { name: 'CSV Parser', icon: Icons.Table, connected: connectorStatus['CSV Parser'], category: 'autoflow.catData' },
        { name: 'Google Sheets', icon: Icons.Table, connected: connectorStatus['Google Sheets'], category: 'autoflow.catData' },
        { name: 'HubSpot CRM', icon: Icons.Link, connected: connectorStatus['HubSpot CRM'], category: 'autoflow.catCRM' },
        { name: 'Webhook', icon: Icons.Link, connected: connectorStatus.Webhook, category: 'autoflow.catAPIs' },
        { name: 'OpenAI', icon: Icons.Bot, connected: connectorStatus.OpenAI, category: 'autoflow.catAI' },
    ];`;
content = content.replace(/const connectors = \[\s*\{ name: 'Gmail'[\s\S]*?\];/g, newConnectors);

content = content.replace(
  /<p className="text-\[11px\] font-normal text-\[#8B95B0\] mb-3">\{category\}<\/p>/g,
  '<p className="text-[11px] font-normal text-[#8B95B0] mb-3">{t(category)}</p>'
);

fs.writeFileSync(file, content);
console.log("AutoFlow flow and connectors repaired!");
