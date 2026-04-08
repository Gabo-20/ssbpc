import React, { useState } from 'react';
import { Plus, Filter, Users, Calendar, DollarSign, Edit2, FolderOpen } from 'lucide-react';
import Modal from '../components/Modal';
import { proyectos as initialProyectos } from '../mockData';

const estadoConfig = {
  Activo: { badge: 'badge-green', label: 'Activo', bar: 'bg-green-500' },
  Pausado: { badge: 'badge-yellow', label: 'Pausado', bar: 'bg-yellow-500' },
  Finalizado: { badge: 'badge-gray', label: 'Finalizado', bar: 'bg-gray-400' },
};

const defaultForm = {
  nombre: '', descripcion: '', estado: 'Activo', fechaInicio: '', fechaFin: '',
  presupuesto: '', cooperante: '', responsable: '', departamento: ''
};

export default function Proyectos() {
  const [proyectos, setProyectos] = useState(initialProyectos);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const filtered = proyectos.filter(p => !filtroEstado || p.estado === filtroEstado);

  const openNew = () => {
    setForm(defaultForm);
    setErrors({});
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setForm({ ...p, presupuesto: String(p.presupuesto) });
    setErrors({});
    setEditId(p.id);
    setModalOpen(true);
  };

  const validate = () => {
    const e = {};
    if (!form.nombre) e.nombre = 'Nombre es requerido';
    if (!form.fechaInicio) e.fechaInicio = 'Fecha inicio requerida';
    if (!form.presupuesto) e.presupuesto = 'Presupuesto requerido';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editId) {
      setProyectos(proyectos.map(p => p.id === editId ? { ...p, ...form, presupuesto: Number(form.presupuesto) } : p));
    } else {
      const np = { ...form, id: Date.now(), presupuesto: Number(form.presupuesto), gastado: 0, progreso: 0, beneficiarios: 0 };
      setProyectos([np, ...proyectos]);
    }
    setModalOpen(false);
  };

  const fld = (name, label, type = 'text', required = false) => (
    <div>
      <label className="label">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} value={form[name] || ''}
        onChange={e => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: undefined }); }}
        className={`input-field ${errors[name] ? 'border-red-400 bg-red-50' : ''}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Proyectos</h1>
          <p className="page-subtitle">{proyectos.length} proyectos en total</p>
        </div>
        <button id="nuevo-proyecto-btn" onClick={openNew} className="btn-primary">
          <Plus size={16} /> Nuevo Proyecto
        </button>
      </div>

      {/* Filter */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Filtrar por:</span>
          {['', 'Activo', 'Pausado', 'Finalizado'].map(s => (
            <button key={s} onClick={() => setFiltroEstado(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filtroEstado === s
                ? 'bg-primary-800 text-white border-primary-800'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-700'}`}>
              {s || 'Todos'}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => {
          const cfg = estadoConfig[p.estado] || estadoConfig.Activo;
          const pct = p.gastado && p.presupuesto ? Math.round((p.gastado / p.presupuesto) * 100) : 0;
          return (
            <div key={p.id} className="card hover:shadow-md transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-primary-800 transition-colors">{p.nombre}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{p.departamento}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  <span className={cfg.badge}>{cfg.label}</span>
                  <button onClick={() => openEdit(p)} className="p-1 text-gray-300 hover:text-primary-600 rounded transition-colors">
                    <Edit2 size={13} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4 line-clamp-2">{p.descripcion}</p>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Avance del proyecto</span>
                  <span className="font-semibold text-gray-700">{p.progreso}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${cfg.bar} rounded-full h-2 transition-all`} style={{ width: `${p.progreso}%` }}></div>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Ejecución presupuestaria</span>
                  <span className="font-semibold text-gray-700">{pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`${pct > 80 ? 'bg-red-500' : 'bg-primary-600'} rounded-full h-1.5 transition-all`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-50">
                <div className="text-center">
                  <div className="flex justify-center mb-0.5"><DollarSign size={13} className="text-gray-400" /></div>
                  <p className="text-xs font-semibold text-gray-700">Q{(p.presupuesto / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-400">Presupuesto</p>
                </div>
                <div className="text-center border-x border-gray-50">
                  <div className="flex justify-center mb-0.5"><Users size={13} className="text-gray-400" /></div>
                  <p className="text-xs font-semibold text-gray-700">{p.beneficiarios}</p>
                  <p className="text-xs text-gray-400">Beneficiarios</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-0.5"><Calendar size={13} className="text-gray-400" /></div>
                  <p className="text-xs font-semibold text-gray-700">{p.fechaFin}</p>
                  <p className="text-xs text-gray-400">Finaliza</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
                <span className="font-medium text-gray-600">Responsable:</span> {p.responsable} · <span className="font-medium text-gray-600">Cooperante:</span> {p.cooperante}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center py-10 text-gray-400">
          <FolderOpen size={32} className="mx-auto mb-2 opacity-40" />
          <p>No hay proyectos con el filtro seleccionado</p>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editar Proyecto' : 'Nuevo Proyecto'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">{fld('nombre', 'Nombre del Proyecto', 'text', true)}</div>

          <div className="sm:col-span-2">
            <label className="label">Descripción</label>
            <textarea value={form.descripcion} rows={3}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
              className="input-field resize-none" placeholder="Descripción general del proyecto..." />
          </div>

          <div>
            <label className="label">Estado</label>
            <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} className="input-field">
              <option>Activo</option><option>Pausado</option><option>Finalizado</option>
            </select>
          </div>

          {fld('cooperante', 'Cooperante / Donante')}
          {fld('responsable', 'Responsable del Proyecto')}
          {fld('presupuesto', 'Presupuesto Total (Q)', 'number', true)}
          {fld('fechaInicio', 'Fecha de Inicio', 'date', true)}
          {fld('fechaFin', 'Fecha de Finalización', 'date')}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-secondary">Cancelar</button>
          <button onClick={handleSave} className="btn-primary">{editId ? 'Guardar Cambios' : 'Crear Proyecto'}</button>
        </div>
      </Modal>
    </div>
  );
}
