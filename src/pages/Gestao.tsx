import React, { useState, useMemo } from 'react';
import { Search, Plus, FileText, ArrowUpRight, ChevronDown, Filter } from 'lucide-react';
import { documentos, setores } from '../data/mockData';
import DocumentModal from '../components/DocumentModal';

export default function Gestao() {
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [setorFilter, setSetorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return documentos.filter(d => {
      const matchSearch = !search || d.codigo.toLowerCase().includes(search.toLowerCase()) || d.titulo.toLowerCase().includes(search.toLowerCase());
      const matchTipo = !tipoFilter || d.tipo === tipoFilter;
      const matchSetor = !setorFilter || d.setor === setorFilter;
      const matchStatus = !statusFilter || d.status === statusFilter;
      return matchSearch && matchTipo && matchSetor && matchStatus;
    });
  }, [search, tipoFilter, setorFilter, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vigente': return { label: 'Vigente', class: 'bg-success-light text-success' };
      case 'em_revisao': return { label: 'Em revisão', class: 'bg-orange-light text-orange' };
      case 'obsoleto': return { label: 'Obsoleto', class: 'bg-gray-100 text-gray-500' };
      default: return { label: status, class: 'bg-gray-100 text-gray-500' };
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const selectedDocData = selectedDoc ? documentos.find(d => d.id === selectedDoc) : null;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Controle e rastreabilidade</p>
        <h1 className="text-2xl font-bold text-text">Gestão de documentos.</h1>
        <p className="text-sm text-text-muted mt-1">Organize versões e acompanhe o ciclo de vida dos seus documentos.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-dark hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Novo documento
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por código ou título..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select value={tipoFilter} onChange={e => setTipoFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20">
                <option value="">Tipos</option>
                <option value="POP">POP</option>
                <option value="DOC">DOC</option>
                <option value="FORM">FORM</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
            <div className="relative">
              <select value={setorFilter} onChange={e => setSetorFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20">
                <option value="">Setores</option>
                {setores.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20">
                <option value="">Status</option>
                <option value="vigente">Vigente</option>
                <option value="em_revisao">Em revisão</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-text-secondary font-medium">{filtered.length} documentos encontrados</span>
        <span className="text-xs text-text-muted flex items-center gap-1">
          <Filter className="w-3 h-3" /> Dados demonstrativos
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-alt border-b border-border">
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Documento</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Tipo / Setor</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Versão</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Próxima revisão</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Status</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const status = getStatusBadge(doc.status);
                return (
                  <tr key={doc.id} className="border-b border-border/50 hover:bg-surface-alt/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-text-muted">{doc.codigo}</div>
                          <div className="text-sm font-medium text-text truncate max-w-[250px]">{doc.titulo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-text-secondary">{doc.tipo}</span>
                        <span className="text-text-muted">/</span>
                        <span className="bg-surface-alt text-text-secondary text-[10px] font-medium px-2 py-0.5 rounded">{doc.setor}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-text-secondary">{doc.versao}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-text-secondary">{formatDate(doc.dataRevisao)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${status.class}`}>{status.label}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {doc.status === 'em_revisao' ? (
                          <button className="px-3 py-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-lg transition-colors">
                            Aprovar
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedDoc(doc.id)}
                            className="p-1.5 rounded-lg hover:bg-surface-alt transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4 text-text-muted" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Modal */}
      {selectedDocData && (
        <DocumentModal doc={selectedDocData} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
