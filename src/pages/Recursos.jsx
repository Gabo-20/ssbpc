import React, { useState } from 'react';
import { Plus, AlertTriangle, ChevronDown } from 'lucide-react';
import Modal from '../components/Modal';
import { recursos as allRecursos, proyectos } from '../mockData';

const tipoConfig = {
  Presupuesto: { badge: 'badge-blue' },
  Suministro: { badge: 'badge-orange' },
};

const defaultForm = {
  proyectoId: '', tipo: 'Presupuesto', descripcion: '', monto: '', cantidad: '', notas: ''
};

const PRESUPUESTO_ALERTA_PCT = 80;

export default function Recursos() {
  const [recursos, setRecursos] = useState(allRecursos);
  const [proyectoId, setProyectoId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [budgetWarning, setBudgetWarning] = useState(false);

  const proyecto = proyectos.find(p => p.id === proyectoId);
  const recursosProyecto = recursos.filter(r => r.proyectoId === proyectoId);

  const totalPresupuesto = proyecto?.presupuesto || 0;
  const totalGastado = recursosProyecto
    .filter(r => r.tipo === 'Presupuesto')
    .reduce((acc, r) => acc + r.monto, 0)
    + recursosProyecto.filter(r => r.tipo === 'Suministro').reduce((acc, r) => acc + r.monto, 0);

  const disponible = totalPresupuesto - totalGastado;
  const pctEjecutado = totalPresupuesto > 0 ? Math.min((totalGastado / totalPresupuesto) * 100, 100) : 0;
  const overBudget = pctEjecutado >= PRESUPUESTO_ALERTA_PCT;

  const validate = () => {
    const e = {};
    if (!form.descripcion) e.descripcion = 'Descripción requerida';
    if (!form.monto || Number(form.monto) <= 0) e.monto = 'Monto válido requerido';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const monto = Number(form.monto);
    if (monto > disponible && form.tipo === 'Presupuesto') {
      setBudgetWarning(true);
    }
    const nr = {
      ...form,
      id: Date.now(),
      proyectoId: proyectoId,
      monto,
      cantidad: Number(form.cantidad) || null,
      fecha: new Date().toISOString().split('T')[0],
      asignadoPor: 'Admin SSBPC',
    };
    setRecursos([...recursos, nr]);
    setBudgetWarning(false);
    setModalOpen(false);
    setForm(defaultForm);
  };

  const checkWarning = (val) => {
    if (form.tipo === 'Presupuesto' && val && Number(val) > disponible) {
      setBudgetWarning(true);
    } else {
      setBudgetWarning(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Recursos</h1>
          <p className="page-subtitle">Gestión de presupuesto y suministros</p>
        </div>
        <button id="asignar-recurso-btn" onClick={() => { setForm({ ...defaultForm, proyectoId }); setErrors({}); setBudgetWarning(false); setModalOpen(true); }}
          className="btn-primary">
          <Plus size={16} /> Asignar Recurso
        </button>
      </div>

      {/* Project selector */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-48">
            <label className="label">Proyecto</label>
            <div className="relative">
              <select className="input-field pr-8 appearance-none" value={proyectoId}
                onChange={e => setProyectoId(Number(e.target.value))}>
                {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget summary */}
      <div className={`card mb-4 ${overBudget ? 'border-red-200 bg-red-50' : ''}`}>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-40">
            <p className="text-xs text-gray-400 mb-0.5">Presupuesto Total</p>
            <p className="text-2xl font-bold text-gray-900">Q{totalPresupuesto.toLocaleString()}</p>
          </div>
          <div className="flex-1 min-w-40">
            <p className="text-xs text-gray-400 mb-0.5">Ejecutado (Recursos)</p>
            <p className="text-2xl font-bold text-gray-900">Q{totalGastado.toLocaleString()}</p>
          </div>
          <div className="flex-1 min-w-40">
            <p className="text-xs text-gray-400 mb-0.5">Disponible</p>
            <p className={`text-2xl font-bold ${disponible < 0 ? 'text-red-600' : 'text-green-600'}`}>
              Q{disponible.toLocaleString()}
            </p>
          </div>
          <div className="flex-1 min-w-48">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Ejecución</span>
              <span className={`font-semibold ${overBudget ? 'text-red-600' : 'text-gray-700'}`}>{pctEjecutado.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${overBudget ? 'bg-red-500' : 'bg-primary-700'} rounded-full h-3 transition-all`}
                style={{ width: `${Math.min(pctEjecutado, 100)}%` }}
              ></div>
            </div>
            {overBudget && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertTriangle size={11} /> Ejecución supera el 80%</p>
            )}
          </div>
        </div>
      </div>

      {/* Resources table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="table-header">Tipo</th>
                <th className="table-header">Descripción</th>
                <th className="table-header">Monto (Q)</th>
                <th className="table-header">Cantidad</th>
                <th className="table-header">Fecha</th>
                <th className="table-header">Asignado Por</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recursosProyecto.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400 text-sm">No hay recursos asignados</td></tr>
              ) : recursosProyecto.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell">
                    <span className={tipoConfig[r.tipo]?.badge || 'badge-gray'}>{r.tipo}</span>
                  </td>
                  <td className="table-cell text-gray-700 font-medium">{r.descripcion}
                    {r.notas && <p className="text-xs text-gray-400 mt-0.5">{r.notas}</p>}
                  </td>
                  <td className="table-cell font-semibold text-gray-800">Q{r.monto.toLocaleString()}</td>
                  <td className="table-cell text-gray-500">{r.cantidad ?? '—'}</td>
                  <td className="table-cell text-gray-500 text-xs">{r.fecha}</td>
                  <td className="table-cell text-gray-500 text-xs">{r.asignadoPor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setBudgetWarning(false); }} title="Asignar Recurso">
        <div className="space-y-4">
          <div>
            <label className="label">Tipo de Recurso</label>
            <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className="input-field">
              <option>Presupuesto</option>
              <option>Suministro</option>
            </select>
          </div>

          <div>
            <label className="label">Descripción <span className="text-red-500">*</span></label>
            <input type="text" value={form.descripcion}
              onChange={e => { setForm({ ...form, descripcion: e.target.value }); setErrors({ ...errors, descripcion: undefined }); }}
              className={`input-field ${errors.descripcion ? 'border-red-400 bg-red-50' : ''}`}
              placeholder="Ej: Semillas de maíz, Transferencia Q2..." />
            {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Monto Q <span className="text-red-500">*</span></label>
              <input type="number" value={form.monto}
                onChange={e => { setForm({ ...form, monto: e.target.value }); checkWarning(e.target.value); setErrors({ ...errors, monto: undefined }); }}
                className={`input-field ${errors.monto ? 'border-red-400 bg-red-50' : ''}`}
                placeholder="0.00" />
              {errors.monto && <p className="text-red-500 text-xs mt-1">{errors.monto}</p>}
            </div>
            <div>
              <label className="label">Cantidad (unidades)</label>
              <input type="number" value={form.cantidad}
                onChange={e => setForm({ ...form, cantidad: e.target.value })}
                className="input-field" placeholder="Dejar vacío si N/A" />
            </div>
          </div>

          <div>
            <label className="label">Notas adicionales</label>
            <textarea value={form.notas} rows={2}
              onChange={e => setForm({ ...form, notas: e.target.value })}
              className="input-field resize-none" placeholder="Observaciones..." />
          </div>

          {budgetWarning && (
            <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <strong>Advertencia:</strong> El monto ingresado supera el presupuesto disponible (Q{disponible.toLocaleString()}).
                Puede continuar, pero quedará sobre el presupuesto asignado.
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => { setModalOpen(false); setBudgetWarning(false); }} className="btn-secondary">Cancelar</button>
          <button onClick={handleSave} className="btn-primary">Asignar Recurso</button>
        </div>
      </Modal>
    </div>
  );
}
