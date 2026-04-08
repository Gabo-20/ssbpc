import React, { useState } from 'react';
import { Upload, CheckCircle, Clock, Circle, FileText, Image, X, ChevronDown } from 'lucide-react';
import Modal from '../components/Modal';
import { proyectos, hitos as allHitos } from '../mockData';

const estadoConfig = {
  'Completado': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300', dot: 'bg-green-500' },
  'En Progreso': { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300', dot: 'bg-blue-500' },
  'Pendiente': { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-100', border: 'border-gray-200', dot: 'bg-gray-300' },
};

export default function Hitos() {
  const [proyectoId, setProyectoId] = useState(1);
  const [hitos, setHitos] = useState(allHitos);
  const [uploadModal, setUploadModal] = useState(null); // hito object
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const proyecto = proyectos.find(p => p.id === proyectoId);
  const hitosProyecto = hitos.filter(h => h.proyectoId === proyectoId);
  const totalProgreso = hitosProyecto.length
    ? Math.round(hitosProyecto.reduce((acc, h) => acc + h.progreso, 0) / hitosProyecto.length)
    : 0;

  const handleUpload = () => {
    if (!uploadedFile || !uploadModal) return;
    const evidence = { id: Date.now(), nombre: uploadedFile.name, tipo: uploadedFile.name.split('.').pop(), fecha: new Date().toISOString().split('T')[0] };
    setHitos(hitos.map(h => h.id === uploadModal.id ? { ...h, evidencias: [...h.evidencias, evidence] } : h));
    setUploadModal(null);
    setUploadedFile(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) setUploadedFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hitos y Evidencias</h1>
          <p className="page-subtitle">Seguimiento de avances por proyecto</p>
        </div>
      </div>

      {/* Project selector */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <label className="label">Seleccionar Proyecto</label>
            <div className="relative">
              <select className="input-field pr-8 appearance-none"
                value={proyectoId}
                onChange={e => setProyectoId(Number(e.target.value))}>
                {proyectos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          {proyecto && (
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Progreso General del Proyecto</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-primary-700 rounded-full h-3 transition-all"
                    style={{ width: `${totalProgreso}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-primary-800 w-10 text-right">{totalProgreso}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info banner */}
      {proyecto && (
        <div className="card mb-4 bg-primary-50 border border-primary-100">
          <div className="flex flex-wrap gap-4 text-sm">
            <div><span className="text-gray-500">Responsable:</span> <strong className="text-gray-800">{proyecto.responsable}</strong></div>
            <div><span className="text-gray-500">Cooperante:</span> <strong className="text-gray-800">{proyecto.cooperante}</strong></div>
            <div><span className="text-gray-500">Período:</span> <strong className="text-gray-800">{proyecto.fechaInicio} → {proyecto.fechaFin}</strong></div>
            <div><span className="text-gray-500">Hitos:</span> <strong className="text-gray-800">{hitosProyecto.length} planificados</strong></div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" style={{ marginLeft: '-1px' }}></div>
        <div className="space-y-4">
          {hitosProyecto.length === 0 ? (
            <div className="card text-center py-10 text-gray-400">No hay hitos para este proyecto</div>
          ) : hitosProyecto.map((hito, idx) => {
            const cfg = estadoConfig[hito.estado] || estadoConfig.Pendiente;
            const Icon = cfg.icon;
            return (
              <div key={hito.id} className="relative md:pl-16">
                {/* Timeline dot */}
                <div className={`absolute left-3.5 top-5 w-5 h-5 rounded-full ${cfg.dot} border-2 border-white shadow hidden md:flex items-center justify-center`}
                  style={{ zIndex: 1 }}>
                </div>

                <div className="card hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon size={18} className={cfg.color} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{idx + 1}. {hito.nombre}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>{hito.estado}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{hito.descripcion}</p>
                        <p className="text-xs text-gray-400 mt-1">📅 {hito.fechaInicio} → {hito.fechaFin}</p>
                      </div>
                    </div>

                    <button
                      id={`subir-evidencia-${hito.id}`}
                      onClick={() => { setUploadModal(hito); setUploadedFile(null); }}
                      className="btn-secondary text-xs gap-1 flex-shrink-0"
                    >
                      <Upload size={13} /> Subir Evidencia
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Avance del hito</span>
                      <span className="font-semibold">{hito.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${cfg.dot} rounded-full h-2 transition-all`} style={{ width: `${hito.progreso}%` }}></div>
                    </div>
                  </div>

                  {/* Evidencias */}
                  {hito.evidencias.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-xs font-medium text-gray-500 mb-2">Evidencias adjuntas ({hito.evidencias.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {hito.evidencias.map(ev => (
                          <div key={ev.id} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                            {ev.tipo === 'pdf' ? <FileText size={12} className="text-red-500" /> : <Image size={12} className="text-blue-500" />}
                            <span className="max-w-32 truncate">{ev.nombre}</span>
                            <span className="text-gray-400">{ev.fecha}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={!!uploadModal} onClose={() => setUploadModal(null)} title={`Subir Evidencia — ${uploadModal?.nombre}`} maxWidth="max-w-lg">
        {uploadModal && (
          <div>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Upload size={32} className="mx-auto mb-3 text-gray-300" />
              <p className="text-sm font-medium text-gray-600 mb-1">Arrastre el archivo aquí</p>
              <p className="text-xs text-gray-400 mb-4">Formatos aceptados: PDF, JPG, PNG (máx. 10MB)</p>
              <label className="btn-secondary text-xs cursor-pointer inline-flex items-center gap-2">
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => setUploadedFile(e.target.files[0])} />
                Seleccionar Archivo
              </label>
            </div>

            {uploadedFile && (
              <div className="mt-3 flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle size={15} />
                  <span className="font-medium truncate max-w-xs">{uploadedFile.name}</span>
                </div>
                <button onClick={() => setUploadedFile(null)} className="text-green-500 hover:text-green-700"><X size={14} /></button>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              La evidencia se asociará al hito <strong>{uploadModal.nombre}</strong> y quedará visible para auditores.
            </p>

            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
              <button onClick={() => setUploadModal(null)} className="btn-secondary">Cancelar</button>
              <button onClick={handleUpload} disabled={!uploadedFile} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <Upload size={14} /> Subir Evidencia
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
