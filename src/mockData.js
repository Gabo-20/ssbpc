// mockData.js - Datos de prueba para SSBPC

export const departamentos = [
  'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula',
  'El Progreso', 'Escuintla', 'Guatemala', 'Huehuetenango',
  'Izabal', 'Jalapa', 'Jutiapa', 'Petén',
  'Quetzaltenango', 'Quiché', 'Retalhuleu', 'Sacatepéquez',
  'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez',
  'Totonicapán', 'Zacapa'
];

export const municipiosPorDepto = {
  'Guatemala': ['Guatemala', 'Mixco', 'Villa Nueva', 'San Miguel Petapa', 'Chinautla', 'Amatitlán'],
  'Quetzaltenango': ['Quetzaltenango', 'Coatepeque', 'San Marcos Palajunoj', 'Colomba Costa Cuca'],
  'Huehuetenango': ['Huehuetenango', 'Chiantla', 'Malacatancito', 'Cuilco', 'Nentón'],
  'Alta Verapaz': ['Cobán', 'San Pedro Carchá', 'Cahabón', 'Chisec', 'Lanquín'],
  'San Marcos': ['San Marcos', 'Malacatán', 'Ayutla', 'Catarina', 'Comitancillo'],
  'Chimaltenango': ['Chimaltenango', 'Tecpán Guatemala', 'Patzún', 'Patzicía'],
  'Sololá': ['Sololá', 'Panajachel', 'San Pedro La Laguna', 'Santiago Atitlán'],
  'Quiché': ['Santa Cruz del Quiché', 'Chichicastenango', 'Nebaj', 'Joyabaj'],
  'Escuintla': ['Escuintla', 'Santa Lucía Cotzumalguapa', 'Palín', 'Guanagazapa'],
  'Petén': ['Flores', 'Santa Elena', 'San Benito', 'Sayaxché', 'Poptún'],
};

export const proyectos = [
  {
    id: 1,
    nombre: 'Seguridad Alimentaria Huehuetenango',
    descripcion: 'Programa de apoyo nutricional y agrícola para familias en condición de vulnerabilidad en el departamento de Huehuetenango.',
    estado: 'Activo',
    fechaInicio: '2024-01-15',
    fechaFin: '2025-12-31',
    presupuesto: 450000,
    gastado: 287500,
    progreso: 64,
    cooperante: 'USAID Guatemala',
    responsable: 'Ing. María López',
    departamento: 'Huehuetenango',
    beneficiarios: 320,
  },
  {
    id: 2,
    nombre: 'Educación Rural Alta Verapaz',
    descripcion: 'Mejora de infraestructura educativa y capacitación docente en comunidades rurales de Alta Verapaz.',
    estado: 'Activo',
    fechaInicio: '2023-06-01',
    fechaFin: '2025-05-31',
    presupuesto: 380000,
    gastado: 198000,
    progreso: 52,
    cooperante: 'Unión Europea',
    responsable: 'Lic. Carlos Mendoza',
    departamento: 'Alta Verapaz',
    beneficiarios: 280,
  },
  {
    id: 3,
    nombre: 'Salud Comunitaria Quiché',
    descripcion: 'Atención médica primaria y campañas de salud preventiva en municipios del Quiché.',
    estado: 'Activo',
    fechaInicio: '2024-03-01',
    fechaFin: '2025-08-31',
    presupuesto: 290000,
    gastado: 145000,
    progreso: 50,
    cooperante: 'OPS/OMS',
    responsable: 'Dr. Ana García',
    departamento: 'Quiché',
    beneficiarios: 215,
  },
  {
    id: 4,
    nombre: 'Agua y Saneamiento San Marcos',
    descripcion: 'Instalación de sistemas de agua potable y letrinización en comunidades rurales de San Marcos.',
    estado: 'Pausado',
    fechaInicio: '2023-09-01',
    fechaFin: '2025-03-31',
    presupuesto: 220000,
    gastado: 88000,
    progreso: 40,
    cooperante: 'UNICEF',
    responsable: 'Arq. Pedro Solís',
    departamento: 'San Marcos',
    beneficiarios: 180,
  },
  {
    id: 5,
    nombre: 'Empleo Juvenil Xela',
    descripcion: 'Capacitación técnica y vocacional para jóvenes en situación de riesgo en Quetzaltenango.',
    estado: 'Activo',
    fechaInicio: '2024-02-01',
    fechaFin: '2024-12-31',
    presupuesto: 175000,
    gastado: 140000,
    progreso: 80,
    cooperante: 'GIZ Alemania',
    responsable: 'Lic. Rosa Tzunum',
    departamento: 'Quetzaltenango',
    beneficiarios: 110,
  },
  {
    id: 6,
    nombre: 'Protección Ecosistemas Petén',
    descripcion: 'Conservación de biodiversidad y apoyo a comunidades rurales en el departamento de Petén.',
    estado: 'Finalizado',
    fechaInicio: '2022-01-01',
    fechaFin: '2023-12-31',
    presupuesto: 320000,
    gastado: 318500,
    progreso: 99,
    cooperante: 'WWF Guatemala',
    responsable: 'Biol. Juan Tún',
    departamento: 'Petén',
    beneficiarios: 95,
  },
  {
    id: 7,
    nombre: 'Microcréditos Mujeres Indígenas',
    descripcion: 'Acceso a servicios financieros y asistencia técnica para mujeres indígenas emprendedoras.',
    estado: 'Activo',
    fechaInicio: '2024-04-01',
    fechaFin: '2025-10-31',
    presupuesto: 195000,
    gastado: 58500,
    progreso: 30,
    cooperante: 'PNUD',
    responsable: 'Lic. Lucía Cac',
    departamento: 'Sololá',
    beneficiarios: 40,
  },
  {
    id: 8,
    nombre: 'Infraestructura Vial Rural',
    descripcion: 'Mejoramiento de caminos rurales para facilitar el acceso a mercados y servicios en Chimaltenango.',
    estado: 'Activo',
    fechaInicio: '2024-05-01',
    fechaFin: '2026-04-30',
    presupuesto: 520000,
    gastado: 104000,
    progreso: 20,
    cooperante: 'BID Guatemala',
    responsable: 'Ing. Marco Ajú',
    departamento: 'Chimaltenango',
    beneficiarios: 0,
  },
];

export const beneficiarios = [
  { id: 1, dpi: '1234567890101', nombre: 'María', apellido: 'Toj Ajú', municipio: 'Chiantla', departamento: 'Huehuetenango', proyecto: 'Seguridad Alimentaria Huehuetenango', proyectoId: 1, fechaRegistro: '2024-01-20', genero: 'Femenino', telefono: '50221234567', educacion: 'Primaria', ingreso: 800, lat: 15.3497, lng: -91.5714 },
  { id: 2, dpi: '2345678901202', nombre: 'Pedro', apellido: 'Xicay López', municipio: 'San Pedro Carchá', departamento: 'Alta Verapaz', proyecto: 'Educación Rural Alta Verapaz', proyectoId: 2, fechaRegistro: '2023-06-15', genero: 'Masculino', telefono: '50222345678', educacion: 'Básico', ingreso: 1200, lat: 15.4791, lng: -90.2988 },
  { id: 3, dpi: '3456789012303', nombre: 'Rosa', apellido: 'García Caal', municipio: 'Nebaj', departamento: 'Quiché', proyecto: 'Salud Comunitaria Quiché', proyectoId: 3, fechaRegistro: '2024-03-10', genero: 'Femenino', telefono: '50223456789', educacion: 'Ninguno', ingreso: 650, lat: 15.3979, lng: -91.1494 },
  { id: 4, dpi: '4567890123404', nombre: 'Carlos', apellido: 'Mendez Solís', municipio: 'Malacatán', departamento: 'San Marcos', proyecto: 'Agua y Saneamiento San Marcos', proyectoId: 4, fechaRegistro: '2023-09-05', genero: 'Masculino', telefono: '50224567890', educacion: 'Primaria', ingreso: 900, lat: 14.9012, lng: -92.0613 },
  { id: 5, dpi: '5678901234505', nombre: 'Ana', apellido: 'Lima Tzunum', municipio: 'Quetzaltenango', departamento: 'Quetzaltenango', proyecto: 'Empleo Juvenil Xela', proyectoId: 5, fechaRegistro: '2024-02-12', genero: 'Femenino', telefono: '50225678901', educacion: 'Diversificado', ingreso: 2000, lat: 14.8347, lng: -91.5181 },
  { id: 6, dpi: '6789012345606', nombre: 'Juan', apellido: 'Caal Bop', municipio: 'Cahabón', departamento: 'Alta Verapaz', proyecto: 'Educación Rural Alta Verapaz', proyectoId: 2, fechaRegistro: '2023-07-22', genero: 'Masculino', telefono: '50226789012', educacion: 'Primaria', ingreso: 750, lat: 15.5703, lng: -89.8271 },
  { id: 7, dpi: '7890123456707', nombre: 'Lucía', apellido: 'Morales Seb', municipio: 'Panajachel', departamento: 'Sololá', proyecto: 'Microcréditos Mujeres Indígenas', proyectoId: 7, fechaRegistro: '2024-04-18', genero: 'Femenino', telefono: '50227890123', educacion: 'Básico', ingreso: 1500, lat: 14.7403, lng: -91.1602 },
  { id: 8, dpi: '8901234567808', nombre: 'Roberto', apellido: 'Choc Ac', municipio: 'Chichicastenango', departamento: 'Quiché', proyecto: 'Salud Comunitaria Quiché', proyectoId: 3, fechaRegistro: '2024-03-28', genero: 'Masculino', telefono: '50228901234', educacion: 'Primaria', ingreso: 850, lat: 14.9461, lng: -91.1115 },
  { id: 9, dpi: '9012345678909', nombre: 'Elvira', apellido: 'Pop Xol', municipio: 'Chisec', departamento: 'Alta Verapaz', proyecto: 'Educación Rural Alta Verapaz', proyectoId: 2, fechaRegistro: '2023-08-03', genero: 'Femenino', telefono: '50229012345', educacion: 'Ninguno', ingreso: 600, lat: 15.8170, lng: -90.2939 },
  { id: 10, dpi: '0123456789010', nombre: 'Miguel', apellido: 'Quixtán Ajú', municipio: 'Cuilco', departamento: 'Huehuetenango', proyecto: 'Seguridad Alimentaria Huehuetenango', proyectoId: 1, fechaRegistro: '2024-01-30', genero: 'Masculino', telefono: '50220123456', educacion: 'Primaria', ingreso: 920, lat: 15.4044, lng: -92.0342 },
];

export const hitos = [
  {
    id: 1, proyectoId: 1,
    nombre: 'Diagnóstico Comunitario',
    descripcion: 'Levantamiento de información socioeconómica de 320 familias beneficiarias.',
    fechaInicio: '2024-01-15', fechaFin: '2024-02-28',
    progreso: 100, estado: 'Completado',
    evidencias: [
      { id: 1, nombre: 'Informe_Diagnostico.pdf', tipo: 'pdf', fecha: '2024-02-28' },
      { id: 2, nombre: 'Fotos_Campo.jpg', tipo: 'jpg', fecha: '2024-02-20' },
    ]
  },
  {
    id: 2, proyectoId: 1,
    nombre: 'Distribución de Insumos Agrícolas',
    descripcion: 'Entrega de semillas mejoradas, fertilizantes y herramientas a familias beneficiarias.',
    fechaInicio: '2024-03-01', fechaFin: '2024-04-30',
    progreso: 100, estado: 'Completado',
    evidencias: [{ id: 3, nombre: 'Acta_Entrega.pdf', tipo: 'pdf', fecha: '2024-04-30' }]
  },
  {
    id: 3, proyectoId: 1,
    nombre: 'Capacitación en Técnicas Agrícolas',
    descripcion: 'Talleres de capacitación sobre agricultura sostenible y seguridad alimentaria.',
    fechaInicio: '2024-05-01', fechaFin: '2024-07-31',
    progreso: 100, estado: 'Completado',
    evidencias: [{ id: 4, nombre: 'Listas_Asistencia.pdf', tipo: 'pdf', fecha: '2024-07-31' }]
  },
  {
    id: 4, proyectoId: 1,
    nombre: 'Seguimiento y Monitoreo',
    descripcion: 'Visitas de campo y monitoreo del avance de cultivos y nutrición familiar.',
    fechaInicio: '2024-08-01', fechaFin: '2025-06-30',
    progreso: 65, estado: 'En Progreso',
    evidencias: [{ id: 5, nombre: 'Reporte_Seguimiento_Q3.pdf', tipo: 'pdf', fecha: '2024-12-10' }]
  },
  {
    id: 5, proyectoId: 1,
    nombre: 'Evaluación Final',
    descripcion: 'Evaluación de impacto y elaboración del informe final del proyecto.',
    fechaInicio: '2025-07-01', fechaFin: '2025-12-31',
    progreso: 0, estado: 'Pendiente',
    evidencias: []
  },
  {
    id: 6, proyectoId: 2,
    nombre: 'Rehabilitación de Aulas',
    descripcion: 'Reparación y adecuación de 12 aulas en escuelas comunitarias.',
    fechaInicio: '2023-06-01', fechaFin: '2023-12-31',
    progreso: 100, estado: 'Completado',
    evidencias: [{ id: 6, nombre: 'Fotos_Aulas.jpg', tipo: 'jpg', fecha: '2023-12-31' }]
  },
  {
    id: 7, proyectoId: 2,
    nombre: 'Formación Docente',
    descripcion: 'Capacitación a 45 docentes en metodologías pedagógicas innovadoras.',
    fechaInicio: '2024-01-15', fechaFin: '2024-06-30',
    progreso: 100, estado: 'Completado',
    evidencias: []
  },
  {
    id: 8, proyectoId: 2,
    nombre: 'Dotación de Material Educativo',
    descripcion: 'Entrega de libros, material didáctico y equipo tecnológico a 280 estudiantes.',
    fechaInicio: '2024-07-01', fechaFin: '2024-12-31',
    progreso: 80, estado: 'En Progreso',
    evidencias: []
  },
];

export const recursos = [
  { id: 1, proyectoId: 1, tipo: 'Presupuesto', descripcion: 'Transferencia inicial Q1 2024', monto: 150000, cantidad: null, fecha: '2024-01-15', asignadoPor: 'USAID Guatemala', notas: 'Primer desembolso del convenio.' },
  { id: 2, proyectoId: 1, tipo: 'Presupuesto', descripcion: 'Transferencia Q2 2024', monto: 100000, cantidad: null, fecha: '2024-04-01', asignadoPor: 'USAID Guatemala', notas: 'Segundo desembolso.' },
  { id: 3, proyectoId: 1, tipo: 'Suministro', descripcion: 'Semillas de maíz HB-83', monto: 25000, cantidad: 500, fecha: '2024-03-05', asignadoPor: 'Ing. María López', notas: 'Para distribución en fase 2.' },
  { id: 4, proyectoId: 1, tipo: 'Suministro', descripcion: 'Fertilizante 20-20-0 (qq)', monto: 18500, cantidad: 370, fecha: '2024-03-10', asignadoPor: 'Ing. María López', notas: '' },
  { id: 5, proyectoId: 1, tipo: 'Presupuesto', descripcion: 'Transferencia Q3 2024', monto: 50000, cantidad: null, fecha: '2024-07-01', asignadoPor: 'USAID Guatemala', notas: 'Tercer desembolso.' },
  { id: 6, proyectoId: 2, tipo: 'Presupuesto', descripcion: 'Primer desembolso UE', monto: 120000, cantidad: null, fecha: '2023-06-01', asignadoPor: 'Unión Europea', notas: '' },
  { id: 7, proyectoId: 2, tipo: 'Suministro', descripcion: 'Mobiliario escolar', monto: 45000, cantidad: 60, fecha: '2023-09-15', asignadoPor: 'Lic. Carlos Mendoza', notas: 'Escritorios y sillas para 12 aulas.' },
  { id: 8, proyectoId: 3, tipo: 'Presupuesto', descripcion: 'Primer desembolso OPS', monto: 145000, cantidad: null, fecha: '2024-03-01', asignadoPor: 'OPS/OMS', notas: '' },
];

export const actividadReciente = [
  { id: 1, tipo: 'beneficiario', texto: 'Nuevo beneficiario registrado: María Toj Ajú (Huehuetenango)', tiempo: 'Hace 2 horas', icon: 'user' },
  { id: 2, tipo: 'hito', texto: 'Hito completado: Capacitación en Técnicas Agrícolas — Proyecto SA-HHT', tiempo: 'Hace 4 horas', icon: 'check' },
  { id: 3, tipo: 'recurso', texto: 'Recurso asignado: Q50,000 al Proyecto Seguridad Alimentaria', tiempo: 'Hace 1 día', icon: 'dollar' },
  { id: 4, tipo: 'proyecto', texto: 'Proyecto actualizado: Agua y Saneamiento San Marcos — Estado: Pausado', tiempo: 'Hace 2 días', icon: 'folder' },
  { id: 5, tipo: 'reporte', texto: 'Reporte mensual generado — Abril 2024', tiempo: 'Hace 3 días', icon: 'file' },
  { id: 6, tipo: 'beneficiario', texto: 'Nuevo beneficiario registrado: Juan Caal Bop (Alta Verapaz)', tiempo: 'Hace 3 días', icon: 'user' },
];

export const presupuestoEjecucionData = [
  { name: 'SA-HHT', presupuesto: 450, ejecutado: 288 },
  { name: 'EDU-AV', presupuesto: 380, ejecutado: 198 },
  { name: 'SAL-QCH', presupuesto: 290, ejecutado: 145 },
  { name: 'AGS-SM', presupuesto: 220, ejecutado: 88 },
  { name: 'EMP-XEL', presupuesto: 175, ejecutado: 140 },
  { name: 'MCR-SOL', presupuesto: 195, ejecutado: 59 },
  { name: 'INF-CHI', presupuesto: 520, ejecutado: 104 },
];

export const beneficiariosTimeline = [
  { mes: 'Ene', beneficiarios: 48 },
  { mes: 'Feb', beneficiarios: 92 },
  { mes: 'Mar', beneficiarios: 134 },
  { mes: 'Abr', beneficiarios: 198 },
  { mes: 'May', beneficiarios: 267 },
  { mes: 'Jun', beneficiarios: 345 },
  { mes: 'Jul', beneficiarios: 420 },
  { mes: 'Ago', beneficiarios: 512 },
  { mes: 'Sep', beneficiarios: 630 },
  { mes: 'Oct', beneficiarios: 780 },
  { mes: 'Nov', beneficiarios: 980 },
  { mes: 'Dic', beneficiarios: 1240 },
];

export const distribucionPresupuesto = [
  { name: 'SA-Huehuetenango', value: 450000 },
  { name: 'Educación AV', value: 380000 },
  { name: 'Salud Quiché', value: 290000 },
  { name: 'Agua San Marcos', value: 220000 },
  { name: 'Empleo Xela', value: 175000 },
  { name: 'Otros', value: 1035000 },
];

export const auditoriaLogs = [
  { id: 1, usuario: 'admin@ssbpc.gt', accion: 'INSERT', tabla: 'beneficiarios', detalle: 'Registro de beneficiario DPI: 1234567890101', ip: '192.168.1.10', fecha: '2024-12-10 09:15:32' },
  { id: 2, usuario: 'maria.lopez@ssbpc.gt', accion: 'UPDATE', tabla: 'proyectos', detalle: 'Actualización estado proyecto ID:4 → Pausado', ip: '192.168.1.22', fecha: '2024-12-09 14:32:11' },
  { id: 3, usuario: 'carlos.mendoza@ssbpc.gt', accion: 'INSERT', tabla: 'hitos', detalle: 'Nuevo hito ID:8 en proyecto ID:2', ip: '192.168.1.15', fecha: '2024-12-09 11:05:44' },
  { id: 4, usuario: 'admin@ssbpc.gt', accion: 'DELETE', tabla: 'recursos', detalle: 'Eliminación recurso ID:9 (duplicado)', ip: '192.168.1.10', fecha: '2024-12-08 16:22:19' },
  { id: 5, usuario: 'rosa.garcia@ssbpc.gt', accion: 'INSERT', tabla: 'beneficiarios', detalle: 'Registro de beneficiario DPI: 3456789012303', ip: '192.168.1.31', fecha: '2024-12-08 10:44:07' },
  { id: 6, usuario: 'admin@ssbpc.gt', accion: 'UPDATE', tabla: 'usuarios', detalle: 'Cambio de contraseña usuario ID:5', ip: '192.168.1.10', fecha: '2024-12-07 08:30:00' },
  { id: 7, usuario: 'maria.lopez@ssbpc.gt', accion: 'INSERT', tabla: 'evidencias', detalle: 'Carga de evidencia para hito ID:4', ip: '192.168.1.22', fecha: '2024-12-06 15:10:55' },
  { id: 8, usuario: 'carlos.mendoza@ssbpc.gt', accion: 'UPDATE', tabla: 'beneficiarios', detalle: 'Actualización teléfono beneficiario ID:6', ip: '192.168.1.15', fecha: '2024-12-06 12:05:33' },
  { id: 9, usuario: 'lucia.cac@ssbpc.gt', accion: 'INSERT', tabla: 'recursos', detalle: 'Asignación recurso Q45,000 a proyecto ID:7', ip: '192.168.1.40', fecha: '2024-12-05 09:22:18' },
  { id: 10, usuario: 'admin@ssbpc.gt', accion: 'DELETE', tabla: 'hitos', detalle: 'Eliminación hito ID:12 (creación errónea)', ip: '192.168.1.10', fecha: '2024-12-04 17:45:01' },
  { id: 11, usuario: 'rosa.garcia@ssbpc.gt', accion: 'UPDATE', tabla: 'proyectos', detalle: 'Actualización presupuesto proyecto ID:3', ip: '192.168.1.31', fecha: '2024-12-03 14:18:42' },
  { id: 12, usuario: 'admin@ssbpc.gt', accion: 'INSERT', tabla: 'proyectos', detalle: 'Nuevo proyecto: Infraestructura Vial Rural ID:8', ip: '192.168.1.10', fecha: '2024-12-02 10:00:00' },
];
