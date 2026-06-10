const fs = require('fs');

// 1. Update es.json and en.json
const esPath = './src/locales/es.json';
const enPath = './src/locales/en.json';
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Keys for InsightAIDemo
es.insight = es.insight || {};
en.insight = en.insight || {};
es.insight.june2026 = "Junio 2026";
en.insight.june2026 = "June 2026";
es.insight.back = "← Volver";
en.insight.back = "← Back";

// Keys for DocBrainDemo
es.docbrain = es.docbrain || {};
en.docbrain = en.docbrain || {};
es.docbrain.chapter4 = "Capítulo 4";
en.docbrain.chapter4 = "Chapter 4";
es.docbrain.benefits = "Beneficios";
en.docbrain.benefits = "Benefits";
es.docbrain.vacations = "Vacaciones";
en.docbrain.vacations = "Vacation";
es.docbrain.citation = "El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días.";
en.docbrain.citation = "The vacation period is determined according to the Federal Labor Law, increasing two working days for each subsequent year of service, up to 22 days.";
es.docbrain.prev = "Anterior";
en.docbrain.prev = "Previous";
es.docbrain.next = "Siguiente";
en.docbrain.next = "Next";
es.docbrain.mostConsulted = "Documentos más consultados";
en.docbrain.mostConsulted = "Most consulted documents";
es.docbrain.understood = "Entendido";
en.docbrain.understood = "Understood";

fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

// 2. Fix InsightAIDemo.jsx
const insightFile = './src/components/InsightAIDemo.jsx';
let insightContent = fs.readFileSync(insightFile, 'utf8');
insightContent = insightContent.replace(/>Junio 2026</g, '>{t("insight.june2026")}<');
insightContent = insightContent.replace(/>← Volver</g, '>{t("insight.back")}<');
fs.writeFileSync(insightFile, insightContent);

// 3. Fix DocBrainDemo.jsx
const docbrainFile = './src/components/DocBrainDemo.jsx';
let docbrainContent = fs.readFileSync(docbrainFile, 'utf8');
docbrainContent = docbrainContent.replace(/>Capítulo 4</g, '>{t("docbrain.chapter4")}<');
docbrainContent = docbrainContent.replace(/>Beneficios</g, '>{t("docbrain.benefits")}<');
docbrainContent = docbrainContent.replace(/>Vacaciones</g, '>{t("docbrain.vacations")}<');
docbrainContent = docbrainContent.replace(/>El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días.</g, '>{t("docbrain.citation")}<');
docbrainContent = docbrainContent.replace(/>Anterior</g, '>{t("docbrain.prev")}<');
docbrainContent = docbrainContent.replace(/>Siguiente</g, '>{t("docbrain.next")}<');
docbrainContent = docbrainContent.replace(/>Documentos más consultados</g, '>{t("docbrain.mostConsulted")}<');
docbrainContent = docbrainContent.replace(/>Entendido</g, '>{t("docbrain.understood")}<');

fs.writeFileSync(docbrainFile, docbrainContent);

console.log('Audit fixes applied successfully!');
