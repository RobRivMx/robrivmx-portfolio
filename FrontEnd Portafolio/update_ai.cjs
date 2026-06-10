const fs = require('fs');

const esPath = './src/locales/es.json';
const enPath = './src/locales/en.json';

const es = JSON.parse(fs.readFileSync(esPath));
const en = JSON.parse(fs.readFileSync(enPath));

es.docbrain.q1Text = 'Según el Manual de RR.HH. 2026, los empleados tienen derecho a los siguientes días de vacaciones según su antigüedad:';
en.docbrain.q1Text = 'According to the HR Manual 2026, employees are entitled to the following vacation days based on their seniority:';

es.docbrain.q1List = ['1 año: 12 días','2 años: 14 días','3 años: 16 días','4 años: 18 días','5-9 años: 20 días','10+ años: 22 días'];
en.docbrain.q1List = ['1 year: 12 days','2 years: 14 days','3 years: 16 days','4 years: 18 days','5-9 years: 20 days','10+ years: 22 days'];

es.docbrain.q1CitaSec = 'Capítulo 4 · Página 23';
en.docbrain.q1CitaSec = 'Chapter 4 · Page 23';

es.docbrain.q1CitaFrag = '"El período vacacional se determina conforme a la Ley Federal del Trabajo, incrementando dos días laborables por cada año subsecuente de servicios, hasta llegar a 22 días."';
en.docbrain.q1CitaFrag = '"The vacation period is determined in accordance with the Federal Labor Law, increasing by two working days for each subsequent year of service, up to 22 days."';

es.docbrain.q2Text = 'El proceso de onboarding para nuevos empleados consta de 3 fases principales durante el primer mes:';
en.docbrain.q2Text = 'The onboarding process for new employees consists of 3 main phases during the first month:';

es.docbrain.q2List = ['Día 1: Bienvenida, entrega de equipo y accesos.','Semana 1: Entrenamientos de cultura y herramientas.','Mes 1: Proyecto semilla y evaluación 360.'];
en.docbrain.q2List = ['Day 1: Welcome, equipment handover and accesses.','Week 1: Culture and tools trainings.','Month 1: Seed project and 360 evaluation.'];

es.docbrain.q2CitaSec = 'Fases · Página 5';
en.docbrain.q2CitaSec = 'Phases · Page 5';

es.docbrain.q2CitaFrag = '"El éxito del nuevo talento depende del primer mes. Las tres fases (Día 1, Semana 1, Mes 1) garantizan una inmersión total en la cultura corporativa."';
en.docbrain.q2CitaFrag = '"The success of the new talent depends on the first month. The three phases (Day 1, Week 1, Month 1) guarantee total immersion in the corporate culture."';

es.docbrain.q3Text = 'Las políticas de seguridad IT establecen lineamientos estrictos para el uso de equipos corporativos:';
en.docbrain.q3Text = 'IT security policies establish strict guidelines for the use of corporate equipment:';

es.docbrain.q3List = ['Prohibido instalar software no aprobado.','Bloqueo automático de pantalla tras 5 minutos.','Obligatorio el uso de VPN en redes públicas.'];
en.docbrain.q3List = ['Prohibited to install unapproved software.','Automatic screen lock after 5 minutes.','Mandatory use of VPN on public networks.'];

es.docbrain.q3CitaSec = 'Dispositivos · Página 12';
en.docbrain.q3CitaSec = 'Devices · Page 12';

es.docbrain.q3CitaFrag = '"Todo dispositivo asignado debe cumplir con la normativa de seguridad estándar: bloqueo automático (5 min), VPN activa fuera de la oficina y restricción de software de terceros."';
en.docbrain.q3CitaFrag = '"All assigned devices must comply with standard security regulations: automatic lock (5 min), active VPN outside the office and restriction of third-party software."';

es.docbrain.q4Text = 'Los productos nuevos incorporados en el catálogo Q1 2026 son:';
en.docbrain.q4Text = 'The new products added to the Q1 2026 catalog are:';

es.docbrain.q4List = ['Teclado mecánico RGB v2','Monitor curvo 34" 5K','Hub USB-C multipuerto'];
en.docbrain.q4List = ['Mechanical RGB keyboard v2','Curved monitor 34" 5K','Multiport USB-C Hub'];

es.docbrain.q4CitaSec = 'Sección 3 · Página 12';
en.docbrain.q4CitaSec = 'Section 3 · Page 12';

es.docbrain.q4CitaFrag = '"La nueva línea de periféricos incluye el teclado mecánico RGB v2 con switches mejorados, el monitor curvo 34 pulgadas con resolución 5K y el hub USB-C con 7 puertos."';
en.docbrain.q4CitaFrag = '"The new line of peripherals includes the mechanical RGB keyboard v2 with improved switches, the curved 34-inch monitor with 5K resolution and the USB-C hub with 7 ports."';

fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("locales updated");
