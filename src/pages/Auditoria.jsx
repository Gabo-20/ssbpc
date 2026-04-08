import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Modal from '../components/Modal';
import { auditoriaLogs } from '../mockData';

const accionConfig = {
  INSERT: { badge: 'badge-green', label: 'INSERT' },
  UPDATE: { badge: 'badge-blue', label: 'UPDATE' },
  DELETE: { badge: 'badge-red', label: 'DELETE' },
};

const PAGE_SIZE = 8;

export default function Auditoria() {
  const [search, setSearch] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroAccion, setFiltroAccion] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [detailModal, setDetailModal] = useState(null);
  const [page, setPage] = useState(1);

  const usuarios = [...new Set(auditoriaLogs.map(l => l.usuario))];

  const filtered = auditoriaLogs.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      l.usuario.toLowerCase().includes(q) ||
      l.tabla.toLowerCase().includes(q) ||
      l.detalle.toLowerCase().includes(q);
    const matchUser = !filtroUsuario || l.usuario === filtroUsuario;
    const matchAcc = !filtroAccion || l.accion === filtroAccion;
    const matchDesde = !fechaDesde || l.fecha >= fechaDesde;
    const matchHasta = !fechaHasta || l.fecha <= fechaHasta + ' 23:59:59';
    return matchSearch && matchUser && matchAcc && matchDesde && matchHasta;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setSearch(''); setFiltroUsuario(''); setFiltroAccion('');
    setFechaDesde(''); setFechaHasta(''); setPage(1);
  };

  const hasFilters = search || filtroUsuario || filtroAccion || fechaDesde || fechaHasta;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Auditoría del Sistema</h1>
          <p className="page-subtitle">{filtered.length} registros encontrados</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input-field pl-9" placeholder="Buscar..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="input-field" value={filtroUsuario} onChange={e => { setFiltroUsuario(e.target.value); setPage(1); }}>
            <option value="">Todos los usuarios</option>
            {usuarios.map(u => <option key={u}>{u}</option>)}
          </select>
          <select className="input-field" value={filtroAccion} onChange={e => { setFiltroAccion(e.target.value); setPage(1); }}>
            <option value="">Todas las acciones</option>
            <option>INSERT</option>
            <option>UPDATE</option>
            <option>DELETE</option>
          </select>
          <div>
            <input type="date" className="input-field" placeholder="Desde" value={fechaDesde} onChange={e => { setFechaDesde(e.target.value); setPage(1); }} />
          </div>
          <div className="flex gap-2">
            <input type="date" className="input-field flex-1" placeholder="Hasta" value={fechaHasta} onChange={e => { setFechaHasta(e.target.value); setPage(1); }} />
            {hasFilters && (
              <button onClick={clearFilters} className="btn-secondary px-2" title="Limpiar filtros"><X size={15} /></button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="table-header">Usuario</th>
                <th className="table-header">Acción</th>
                <th className="table-header">Tabla Afectada</th>
                <th className="table-header">Detalle</th>
                <th className="table-header">IP</th>
                <th className="table-header">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400 text-sm">No se encontraron registros</td></tr>
              ) : paged.map(log => (
                <tr
                  key={log.id}
                  onClick={() => setDetailModal(log)}
                  className="hover:bg-primary-50 cursor-pointer transition-colors"
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-600 font-bold">{log.usuario[0].toUpperCase()}</span>
                      </div>
                      <span className="text-xs text-gray-600 truncate max-w-32">{log.usuario}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={accionConfig[log.accion]?.badge || 'badge-gray'}>{log.accion}</span>
                  </td>
                  <td className="table-cell font-mono text-xs text-gray-500">{log.tabla}</td>
                  <td className="table-cell text-gray-600 max-w-xs">
                    <span className="truncate block max-w-56">{log.detalle}</span>
                  </td>
                  <td className="table-cell font-mono text-xs text-gray-400">{log.ip}</td>
                  <td className="table-cell text-xs text-gray-400 whitespace-nowrap">{log.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            Mostrando {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length} registros
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-7 h-7 text-xs rounded-lg font-medium transition-colors ${n === page ? 'bg-primary-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!detailModal} onClose={() => setDetailModal(null)} title="Detalle de Registro de Auditoría" maxWidth="max-w-lg">
        {detailModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Usuario</p>
                <p className="text-sm font-semibold text-gray-800">{detailModal.usuario}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Acción</p>
                <span className={accionConfig[detailModal.accion]?.badge || 'badge-gray'}>{detailModal.accion}</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Tabla Afectada</p>
                <code className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">{detailModal.tabla}</code>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Dirección IP</p>
                <code className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-mono">{detailModal.ip}</code>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Fecha y Hora</p>
              <p className="text-sm text-gray-800">{detailModal.fecha}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Descripción del Cambio</p>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-gray-700">
                {detailModal.detalle}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setDetailModal(null)} className="btn-secondary">Cerrar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
