const fs = require('fs');
const docbrainFile = './src/components/DocBrainDemo.jsx';
let docbrainContent = fs.readFileSync(docbrainFile, 'utf8');

docbrainContent = docbrainContent.replace(/>\s*Anterior\s*</g, '>{t("docbrain.prev")}<');
docbrainContent = docbrainContent.replace(/>\s*Siguiente\s*</g, '>{t("docbrain.next")}<');
docbrainContent = docbrainContent.replace(/>\s*Entendido\s*</g, '>{t("docbrain.understood")}<');
docbrainContent = docbrainContent.replace(/>\s*El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días\.\s*</g, '>{t("docbrain.citation")}<');

const insightFile = './src/components/InsightAIDemo.jsx';
let insightContent = fs.readFileSync(insightFile, 'utf8');
insightContent = insightContent.replace(/>\s*← Volver\s*</g, '>{t("insight.back")}<');

fs.writeFileSync(docbrainFile, docbrainContent);
fs.writeFileSync(insightFile, insightContent);
console.log('Final fixes applied!');
