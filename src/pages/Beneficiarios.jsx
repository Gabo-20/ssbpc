import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin, Camera } from 'lucide-react';
import Modal from '../components/Modal';
import { beneficiarios as initialData, proyectos, departamentos, municipiosPorDepto } from '../mockData';

const generos = ['Masculino', 'Femenino', 'Otro'];
const nivelesEducativos = ['Ninguno', 'Primaria', 'Básico', 'Diversificado', 'Universidad'];

const defaultForm = { dpi: '', nombre: '', apellido: '', fechaNacimiento: '', genero: '', telefono: '', educacion: '', ingreso: '', departamento: '', municipio: '', lat: '', lng: '' };

export default function Beneficiarios() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filtroMunicipio, setFiltroMunicipio] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroProyecto, setFiltroProyecto] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const filtered = data.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !search || `${b.nombre} ${b.apellido} ${b.dpi}`.toLowerCase().includes(q);
    const matchMun = !filtroMunicipio || b.municipio === filtroMunicipio;
    const matchGen = !filtroGenero || b.genero === filtroGenero;
    const matchProy = !filtroProyecto || String(b.proyectoId) === filtroProyecto;
    return matchSearch && matchMun && matchGen && matchProy;
  });

  const municipios = filtroMunicipio ? [filtroMunicipio] :
    [...new Set(data.map(b => b.municipio))].sort();

  const openNew = () => {
    setForm(defaultForm);
    setErrors({});
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setForm({ ...b, ingreso: String(b.ingreso), lat: String(b.lat), lng: String(b.lng) });
    setErrors({});
    setEditId(b.id);
    setModalOpen(true);
  };

  const validate = () => {
    const e = {};
    if (!form.dpi) e.dpi = 'DPI es requerido';
    else if (form.dpi.length !== 13) e.dpi = 'DPI debe tener 13 dígitos';
    else if (!editId && data.find(b => b.dpi === form.dpi)) e.dpi = 'DPI ya está registrado';
    if (!form.nombre) e.nombre = 'Nombre es requerido';
    if (!form.apellido) e.apellido = 'Apellido es requerido';
    if (!form.genero) e.genero = 'Género es requerido';
    if (!form.departamento) e.departamento = 'Departamento es requerido';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (editId) {
      setData(data.map(b => b.id === editId ? { ...b, ...form, ingreso: Number(form.ingreso) } : b));
    } else {
      const newBen = {
        ...form,
        id: Date.now(),
        ingreso: Number(form.ingreso),
        lat: Number(form.lat) || 14.6407,
        lng: Number(form.lng) || -90.5133,
        proyecto: proyectos.find(p => p.id === Number(form.proyectoId))?.nombre || 'Sin asignar',
        proyectoId: Number(form.proyectoId) || null,
        fechaRegistro: new Date().toISOString().split('T')[0],
      };
      setData([newBen, ...data]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter(b => b.id !== id));
    setDeleteModal(null);
  };

  const fld = (name, label, type = 'text', required = false) => (
    <div>
      <label className="label">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => { setForm({ ...form, [name]: e.target.value }); setErrors({ ...errors, [name]: undefined }); }}
        className={`input-field ${errors[name] ? 'border-red-400 bg-red-50' : ''}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Beneficiarios</h1>
          <p className="page-subtitle">{data.length} beneficiarios registrados</p>
        </div>
        <button id="nuevo-beneficiario-btn" onClick={openNew} className="btn-primary">
          <Plus size={16} /> Nuevo Beneficiario
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input-field pl-9" placeholder="Buscar por nombre o DPI..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field" value={filtroMunicipio} onChange={e => setFiltroMunicipio(e.target.value)}>
            <option value="">Todos los municipios</option>
            {municipios.map(m => <option key={m}>{m}</option>)}
          </select>
          <select className="input-field" value={filtroGenero} onChange={e => setFiltroGenero(e.target.value)}>
            <option value="">Todos los géneros</option>
            {generos.map(g => <option key={g}>{g}</option>)}
          </select>
          <select className="input-field" value={filtroProyecto} onChange={e => setFiltroProyecto(e.target.value)}>
            <option value="">Todos los proyectos</option>
            {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="table-header">DPI</th>
                <th className="table-header">Nombre Completo</th>
                <th className="table-header">Municipio</th>
                <th className="table-header">Proyecto Asignado</th>
                <th className="table-header">Fecha Registro</th>
                <th className="table-header">Género</th>
                <th className="table-header text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-gray-400 text-sm">No se encontraron beneficiarios</td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-mono text-xs text-gray-500">{b.dpi}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-700 font-semibold text-xs">{b.nombre[0]}</span>
                      </div>
                      <span className="font-medium text-gray-800">{b.nombre} {b.apellido}</span>
                    </div>
                  </td>
                  <td className="table-cell text-gray-600">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-gray-400" />{b.municipio}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium truncate max-w-32 block">{b.proyecto}</span>
                  </td>
                  <td className="table-cell text-gray-500 text-xs">{b.fechaRegistro}</td>
                  <td className="table-cell">
                    <span className={b.genero === 'Femenino' ? 'badge-blue' : 'badge-gray'}>{b.genero}</span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(b)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Editar">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteModal(b)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          Mostrando {filtered.length} de {data.length} beneficiarios
        </div>
      </div>

      {/* Modal Form */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editar Beneficiario' : 'Nuevo Beneficiario'} maxWidth="max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fld('dpi', 'DPI (13 dígitos)', 'text', true)}
          {fld('nombre', 'Nombre', 'text', true)}
          {fld('apellido', 'Apellido', 'text', true)}
          {fld('fechaNacimiento', 'Fecha de Nacimiento', 'date')}

          <div>
            <label className="label">Género <span className="text-red-500">*</span></label>
            <select value={form.genero} onChange={e => { setForm({ ...form, genero: e.target.value }); setErrors({ ...errors, genero: undefined }); }}
              className={`input-field ${errors.genero ? 'border-red-400 bg-red-50' : ''}`}>
              <option value="">Seleccionar...</option>
              {generos.map(g => <option key={g}>{g}</option>)}
            </select>
            {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
          </div>

          {fld('telefono', 'Teléfono', 'tel')}

          <div>
            <label className="label">Nivel Educativo</label>
            <select value={form.educacion} onChange={e => setForm({ ...form, educacion: e.target.value })} className="input-field">
              <option value="">Seleccionar...</option>
              {nivelesEducativos.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>

          {fld('ingreso', 'Ingreso Mensual (Q)', 'number')}

          <div>
            <label className="label">Departamento <span className="text-red-500">*</span></label>
            <select value={form.departamento} onChange={e => { setForm({ ...form, departamento: e.target.value, municipio: '' }); setErrors({ ...errors, departamento: undefined }); }}
              className={`input-field ${errors.departamento ? 'border-red-400 bg-red-50' : ''}`}>
              <option value="">Seleccionar...</option>
              {departamentos.map(d => <option key={d}>{d}</option>)}
            </select>
            {errors.departamento && <p className="text-red-500 text-xs mt-1">{errors.departamento}</p>}
          </div>

          <div>
            <label className="label">Municipio</label>
            <select value={form.municipio} onChange={e => setForm({ ...form, municipio: e.target.value })} className="input-field">
              <option value="">Seleccionar...</option>
              {(municipiosPorDepto[form.departamento] || []).map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Proyecto Asignado</label>
            <select value={form.proyectoId} onChange={e => setForm({ ...form, proyectoId: e.target.value })} className="input-field">
              <option value="">Sin asignar</option>
              {proyectos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
          </div>

          {/* GPS */}
          <div className="sm:col-span-2">
            <label className="label">Coordenadas GPS</label>
            <div className="flex gap-2 items-center">
              <input placeholder="Latitud" type="number" step="any" value={form.lat}
                onChange={e => setForm({ ...form, lat: e.target.value })}
                className="input-field flex-1" />
              <input placeholder="Longitud" type="number" step="any" value={form.lng}
                onChange={e => setForm({ ...form, lng: e.target.value })}
                className="input-field flex-1" />
              <button type="button" className="btn-secondary flex-shrink-0 text-xs gap-1"
                onClick={() => setForm({ ...form, lat: '14.6407', lng: '-90.5133' })}>
                <MapPin size={14} />Capturar GPS
              </button>
            </div>
          </div>

          {/* Photo upload */}
          <div className="sm:col-span-2">
            <label className="label">Foto del Beneficiario</label>
            <button type="button" className="btn-secondary text-sm gap-2 w-full justify-center py-3 border-dashed">
              <Camera size={16} />
              Seleccionar o capturar foto
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={() => setModalOpen(false)} className="btn-secondary">Cancelar</button>
          <button onClick={handleSave} className="btn-primary">{editId ? 'Guardar Cambios' : 'Registrar Beneficiario'}</button>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Confirmar Eliminación" maxWidth="max-w-sm">
        {deleteModal && (
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 size={20} className="text-red-600" />
            </div>
            <p className="text-gray-700 mb-2">¿Eliminar a <strong>{deleteModal.nombre} {deleteModal.apellido}</strong>?</p>
            <p className="text-gray-400 text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteModal(null)} className="btn-secondary">Cancelar</button>
              <button onClick={() => handleDelete(deleteModal.id)} className="btn-danger">Eliminar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
