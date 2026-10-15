import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, BookOpen, BookMarked, FolderOpen, BarChart3,
  Users, Settings, ShieldCheck, HelpCircle, Bell, Search,
  ChevronDown, LogOut, FlaskConical, Menu, X
} from 'lucide-react';
import { notificacoes } from '../data/mockData';

const menuPrincipal = [
  { icon: LayoutDashboard, label: 'Visão geral', path: '/' },
  { icon: BookOpen, label: 'Biblioteca de documentos', path: '/biblioteca' },
  { icon: BookMarked, label: 'Minhas leituras', path: '/leituras', badge: 3 },
  { icon: FolderOpen, label: 'Gestão de documentos', path: '/gestao' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
];

const menuAdmin = [
  { icon: Users, label: 'Usuários', path: '/usuarios' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notificacoes.filter(n => !n.lida).length;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Visão geral';
    if (path === '/biblioteca') return 'Biblioteca de documentos';
    if (path === '/leituras') return 'Minhas leituras';
    if (path === '/gestao') return 'Gestão de documentos';
    if (path === '/relatorios') return 'Relatórios';
    if (path === '/usuarios') return 'Usuários';
    if (path === '/configuracoes') return 'Configurações';
    return 'SGD';
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[272px] bg-primary-dark flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-tight">SGD</div>
              <div className="text-slate-400 text-xs">ICFUC RS</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="px-4 pb-4">
          <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-sm">L</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">Laboratório ICFUC RS</div>
              <div className="text-slate-400 text-xs">Gestão da qualidade</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Menu Principal */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <div className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Principal</div>
          {menuPrincipal.map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}

          <div className="mt-5 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Administração</div>
          {menuAdmin.map(item => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-accent/10 text-accent'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quality Card */}
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold">Qualidade em cada etapa</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-2">Documentos organizados. Cuidado que faz a diferença.</p>
            <a href="#" className="text-accent text-xs font-medium hover:underline flex items-center gap-1">
              ISO 15189 <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        {/* Help */}
        <div className="px-4 pb-4">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 text-xs transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            Central de ajuda
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-text-secondary font-medium">{getPageTitle()}</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar no sistema..."
                className="w-full pl-9 pr-12 py-2 bg-surface-alt border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-text-muted bg-white border border-border rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl hover:bg-surface-alt transition-colors"
              >
                <Bell className="w-5 h-5 text-text-secondary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-border z-50 animate-scaleIn">
                  <div className="p-3 border-b border-border">
                    <h3 className="text-sm font-semibold text-text">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificacoes.slice(0, 4).map(n => (
                      <div key={n.id} className={`p-3 border-b border-border/50 hover:bg-surface-alt cursor-pointer ${!n.lida ? 'bg-blue-50/50' : ''}`}>
                        <div className="text-xs font-medium text-text">{n.titulo}</div>
                        <div className="text-xs text-text-muted mt-0.5">{n.mensagem}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-border">
              <div className={`w-8 h-8 rounded-full ${user?.cor || 'bg-blue-500'} flex items-center justify-center text-white text-xs font-semibold`}>
                {user?.iniciais || 'U'}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-text leading-tight">{user?.nome || 'Usuário'}</div>
                <div className="text-[11px] text-text-muted">{user?.cargo || ''}</div>
              </div>
              <button onClick={logout} className="p-1.5 rounded-lg hover:bg-red-50 text-text-muted hover:text-danger transition-colors" title="Sair">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
