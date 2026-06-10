const fs = require('fs');
const file = 'src/components/AutoFlowDemo.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<p className="text-\[11px\] font-normal text-\[#8B95B0\] mb-3">\{category\}<\/p>/g,
  '<p className="text-[11px] font-normal text-[#8B95B0] mb-3">{t(category)}</p>'
);

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

fs.writeFileSync(file, content);
console.log("AutoFlow repaired!");
