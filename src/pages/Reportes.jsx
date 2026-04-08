import React, { useState } from 'react';
import { Filter, Download, FileText, Users, MapPin, CheckCircle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { beneficiariosTimeline, distribucionPresupuesto, proyectos } from '../mockData';

const PIE_COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const KPIS = [
  { label: 'Beneficiarios Totales', value: '1,240', sub: 'En todos los proyectos', icon: Users, color: 'bg-primary-800' },
  { label: 'Mujeres Beneficiadas', value: '719', sub: '58% del total', icon: Users, color: 'bg-pink-600' },
  { label: 'Familias Beneficiadas', value: '312', sub: 'Promedio 3.9 miembros', icon: MapPin, color: 'bg-emerald-600' },
  { label: 'Proyectos Exitosos', value: '1', sub: 'Finalizados con éxito', icon: CheckCircle, color: 'bg-violet-600' },
];

const depts = ['Todos', 'Guatemala', 'Quetzaltenango', 'Huehuetenango', 'Alta Verapaz', 'Quiché', 'San Marcos', 'Sololá'];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-gray-500">Q{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Reportes() {
  const [depto, setDepto] = useState('Todos');
  const [tipoProyecto, setTipoProyecto] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  // Summary table
  const summaryData = proyectos.map(p => ({
    nombre: p.nombre,
    beneficiarios: p.beneficiarios,
    presupuesto: p.presupuesto,
    ejecutado: p.gastado,
    pct: p.gastado > 0 ? Math.round((p.gastado / p.presupuesto) * 100) : 0,
    estado: p.estado,
  }));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reportes e Impacto</h1>
          <p className="page-subtitle">Análisis y estadísticas del programa</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs gap-1">
            <Download size={13} /> Exportar PDF
          </button>
          <button className="btn-secondary text-xs gap-1">
            <FileText size={13} /> Exportar Excel
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="card mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="label">Departamento</label>
            <select className="input-field" value={depto} onChange={e => setDepto(e.target.value)}>
              {depts.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Tipo de Proyecto</label>
            <select className="input-field" value={tipoProyecto} onChange={e => setTipoProyecto(e.target.value)}>
              <option value="">Todos</option>
              <option>Seguridad Alimentaria</option>
              <option>Educación</option>
              <option>Salud</option>
              <option>Agua y Saneamiento</option>
            </select>
          </div>
          <div>
            <label className="label">Desde</label>
            <input type="date" className="input-field" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
          </div>
          <div>
            <label className="label">Hasta</label>
            <input type="date" className="input-field" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button className="btn-primary text-sm gap-1">
            <Filter size={14} /> Aplicar Filtros
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {KPIS.map((k, i) => (
          <div key={i} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">{k.label}</p>
                <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
              </div>
              <div className={`w-10 h-10 ${k.color} rounded-lg flex items-center justify-center`}>
                <k.icon size={18} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
        {/* Line chart */}
        <div className="xl:col-span-3 card">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">Beneficiarios Registrados en el Tiempo</h2>
            <p className="text-xs text-gray-400 mt-0.5">Crecimiento acumulado durante 2024</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={beneficiariosTimeline} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v) => [v, 'Beneficiarios']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="beneficiarios"
                  stroke="#1e40af"
                  strokeWidth={2.5}
                  dot={{ fill: '#1e40af', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart */}
        <div className="xl:col-span-2 card">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">Distribución Presupuestaria</h2>
            <p className="text-xs text-gray-400 mt-0.5">Por proyecto</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribucionPresupuesto}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {distribucionPresupuesto.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Resumen por Proyecto</h2>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs gap-1"><Download size={12} /> PDF</button>
            <button className="btn-secondary text-xs gap-1"><FileText size={12} /> Excel</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="table-header">Proyecto</th>
                <th className="table-header">Beneficiarios</th>
                <th className="table-header">Presupuesto Q</th>
                <th className="table-header">Ejecutado Q</th>
                <th className="table-header">Ejecución</th>
                <th className="table-header">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {summaryData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-800">{row.nombre}</td>
                  <td className="table-cell text-gray-600">{row.beneficiarios}</td>
                  <td className="table-cell text-gray-600">Q{row.presupuesto.toLocaleString()}</td>
                  <td className="table-cell text-gray-600">Q{row.ejecutado.toLocaleString()}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className={`${row.pct > 80 ? 'bg-red-500' : 'bg-primary-600'} rounded-full h-1.5`} style={{ width: `${Math.min(row.pct, 100)}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-8 text-right">{row.pct}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={row.estado === 'Activo' ? 'badge-green' : row.estado === 'Pausado' ? 'badge-yellow' : 'badge-gray'}>
                      {row.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
