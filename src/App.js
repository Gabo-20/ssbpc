import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Beneficiarios from './pages/Beneficiarios';
import Proyectos from './pages/Proyectos';
import Hitos from './pages/Hitos';
import Recursos from './pages/Recursos';
import Reportes from './pages/Reportes';
import Auditoria from './pages/Auditoria';
import './index.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* App pages with layout */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/beneficiarios" element={<Layout><Beneficiarios /></Layout>} />
        <Route path="/proyectos" element={<Layout><Proyectos /></Layout>} />
        <Route path="/hitos" element={<Layout><Hitos /></Layout>} />
        <Route path="/recursos" element={<Layout><Recursos /></Layout>} />
        <Route path="/reportes" element={<Layout><Reportes /></Layout>} />
        <Route path="/auditoria" element={<Layout><Auditoria /></Layout>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
