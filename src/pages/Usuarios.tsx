import React, { useState } from 'react';
import { Plus, Search, UserCheck, UserX, Shield } from 'lucide-react';
import { usuarios } from '../data/mockData';

export default function Usuarios() {
  const [search, setSearch] = useState('');

  const filtered = usuarios.filter(u =>
    u.nome.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.setor.toLowerCase().includes(search.toLowerCase())
  );

  const getPerfilBadge = (perfil: string) => {
    switch (perfil) {
      case 'admin': return { label: 'Administrador', class: 'bg-red-50 text-red-600' };
      case 'rt': return { label: 'Resp. Técnico', class: 'bg-blue-50 text-accent' };
      case 'colaborador': return { label: 'Colaborador', class: 'bg-emerald-50 text-success' };
      default: return { label: perfil, class: 'bg-gray-50 text-gray-600' };
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Usuários</h1>
          <p className="text-sm text-text-muted mt-1">Gerencie os acessos e perfis do sistema.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          Novo usuário
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xl font-bold text-text">{usuarios.length}</div>
            <div className="text-xs text-text-muted">Total de usuários</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xl font-bold text-text">{usuarios.filter(u => u.ativo).length}</div>
            <div className="text-xs text-text-muted">Ativos</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <UserX className="w-5 h-5 text-danger" />
          </div>
          <div>
            <div className="text-xl font-bold text-text">{usuarios.filter(u => !u.ativo).length}</div>
            <div className="text-xs text-text-muted">Inativos</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar usuário..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-alt border-b border-border">
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Usuário</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Cargo</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Setor</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Perfil</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const perfil = getPerfilBadge(user.perfil);
                return (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${user.cor} flex items-center justify-center text-white text-xs font-bold`}>
                          {user.iniciais}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text">{user.nome}</div>
                          <div className="text-xs text-text-muted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-text-secondary">{user.cargo}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-surface-alt text-text-secondary text-xs font-medium px-2 py-0.5 rounded">{user.setor}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${perfil.class}`}>{perfil.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${user.ativo ? 'text-success' : 'text-danger'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.ativo ? 'bg-success' : 'bg-danger'}`} />
                        {user.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
