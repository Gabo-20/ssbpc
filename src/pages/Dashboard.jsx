import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Users, FolderOpen, TrendingUp, CheckSquare,
  UserPlus, CheckCircle, DollarSign, FileText, Folder, Calendar
} from 'lucide-react';
import {
  actividadReciente, presupuestoEjecucionData
} from '../mockData';

const KpiCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <div className="card hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
    {trend && (
      <div className="mt-3 pt-3 border-t border-gray-50">
        <span className="text-xs text-green-600 font-medium">▲ {trend}</span>
        <span className="text-xs text-gray-400"> vs mes anterior</span>
      </div>
    )}
  </div>
);

const actividadIconMap = {
  user: UserPlus,
  check: CheckCircle,
  dollar: DollarSign,
  folder: Folder,
  file: FileText,
};

const actividadColorMap = {
  beneficiario: 'bg-blue-100 text-blue-600',
  hito: 'bg-green-100 text-green-600',
  recurso: 'bg-orange-100 text-orange-600',
  proyecto: 'bg-purple-100 text-purple-600',
  reporte: 'bg-gray-100 text-gray-600',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: Q{p.value.toLocaleString()}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumen general del sistema — Diciembre 2026</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
          <Calendar size={14} className="inline mr-1" /> Actualizado: 10 Dic 2026
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Total Beneficiarios"
          value="1,240"
          subtitle="Registrados en el sistema"
          icon={Users}
          color="bg-primary-800"
          trend="+12.4%"
        />
        <KpiCard
          title="Proyectos Activos"
          value="8"
          subtitle="De 12 proyectos totales"
          icon={FolderOpen}
          color="bg-emerald-600"
          trend="+1 proyecto"
        />
        <KpiCard
          title="Presupuesto Ejecutado"
          value="67%"
          subtitle="Q1,020,500 de Q1,550,000"
          icon={TrendingUp}
          color="bg-amber-500"
          trend="+8.3%"
        />
        <KpiCard
          title="Hitos Completados"
          value="34"
          subtitle="De 52 hitos planificados"
          icon={CheckSquare}
          color="bg-violet-600"
          trend="+5 hitos"
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Ejecución Presupuestaria por Proyecto</h2>
              <p className="text-xs text-gray-400 mt-0.5">Presupuesto asignado vs ejecutado (miles Q)</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={presupuestoEjecucionData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="presupuesto" name="Presupuesto" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ejecutado" name="Ejecutado" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {actividadReciente.map((item) => {
              const Icon = actividadIconMap[item.icon] || FileText;
              const colorClass = actividadColorMap[item.tipo] || 'bg-gray-100 text-gray-600';
              return (
                <div key={item.id} className="flex gap-3 items-start group hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-snug">{item.texto}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.tiempo}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full text-xs text-primary-700 hover:text-primary-900 font-medium py-2 border-t border-gray-100 hover:bg-gray-50 transition-colors rounded-b-lg">
            Ver toda la actividad →
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="card bg-gradient-to-br from-primary-800 to-primary-700 border-0 text-white">
          <p className="text-primary-200 text-sm font-medium">Departamentos Cubiertos</p>
          <p className="text-4xl font-bold mt-1">9</p>
          <p className="text-primary-300 text-xs mt-2">De 22 departamentos de Guatemala</p>
          <div className="w-full bg-primary-900 rounded-full h-1.5 mt-3">
            <div className="bg-white rounded-full h-1.5" style={{ width: '41%' }}></div>
          </div>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm font-medium">Mujeres Beneficiarias</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">58%</p>
          <p className="text-gray-400 text-xs mt-2">719 de 1,240 beneficiarios</p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className="bg-pink-500 rounded-full h-1.5" style={{ width: '58%' }}></div>
          </div>
        </div>
        <div className="card">
          <p className="text-gray-500 text-sm font-medium">Hitos Este Mes</p>
          <p className="text-4xl font-bold text-gray-900 mt-1">5</p>
          <p className="text-gray-400 text-xs mt-2">Vencen en Diciembre 2026</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-green-600">2 completados</span>
              <span className="text-orange-500">3 pendientes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
