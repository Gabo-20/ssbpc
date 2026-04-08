import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FolderOpen, CheckSquare,
  Package, BarChart2, Shield, LogOut, Menu, X,
  ChevronRight, Bell
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/beneficiarios', icon: Users, label: 'Beneficiarios' },
  { path: '/proyectos', icon: FolderOpen, label: 'Proyectos' },
  { path: '/hitos', icon: CheckSquare, label: 'Hitos y Evidencias' },
  { path: '/recursos', icon: Package, label: 'Recursos' },
  { path: '/reportes', icon: BarChart2, label: 'Reportes' },
  { path: '/auditoria', icon: Shield, label: 'Auditoría' },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-primary-900 flex flex-col transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-primary-800">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-900 font-bold text-sm">SS</span>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-sm leading-tight">SSBPC</h1>
            <p className="text-primary-300 text-xs leading-tight truncate">Sistema Beneficiarios</p>
          </div>
          <button
            className="ml-auto lg:hidden text-primary-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? 'bg-primary-800 text-white shadow-sm'
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight size={14} className="opacity-60" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-primary-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">AD</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-semibold truncate">Admin SSBPC</p>
              <p className="text-primary-300 text-xs truncate">admin@ssbpc.gt</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-primary-200 hover:text-white hover:bg-primary-800 rounded-lg text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400">Sistema de Seguimiento de Beneficiarios y Proyectos de Cooperación</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 relative">
              <Bell size={18} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AD</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Admin SSBPC</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
