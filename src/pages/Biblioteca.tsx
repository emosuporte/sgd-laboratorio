import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, FileText, Filter, ChevronDown } from 'lucide-react';
import { documentos, setores } from '../data/mockData';
import DocumentModal from '../components/DocumentModal';

export default function Biblioteca() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get('doc');
  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [setorFilter, setSetorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(docId);

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
      case 'rascunho': return { label: 'Rascunho', class: 'bg-blue-50 text-blue-500' };
      default: return { label: status, class: 'bg-gray-100 text-gray-500' };
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'POP': return 'bg-blue-50 text-accent';
      case 'DOC': return 'bg-purple-50 text-purple-600';
      case 'FORM': return 'bg-amber-50 text-amber-600';
      default: return 'bg-gray-50 text-gray-600';
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
        <h1 className="text-2xl font-bold text-text">Biblioteca de documentos</h1>
        <p className="text-sm text-text-muted mt-1">Todos os procedimentos e documentos técnicos do laboratório.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por código, título ou conteúdo..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <select
                value={tipoFilter}
                onChange={e => setTipoFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Todos os tipos</option>
                <option value="POP">POP</option>
                <option value="DOC">DOC</option>
                <option value="FORM">FORM</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={setorFilter}
                onChange={e => setSetorFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Todos os setores</option>
                {setores.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-surface-alt border border-border rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="">Todos os status</option>
                <option value="vigente">Vigente</option>
                <option value="em_revisao">Em revisão</option>
                <option value="obsoleto">Obsoleto</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-muted">{filtered.length} documentos encontrados</span>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Filter className="w-3 h-3" />
            Filtros ativos: {[tipoFilter, setorFilter, statusFilter].filter(Boolean).length || 'nenhum'}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => {
            const status = getStatusBadge(doc.status);
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc.id)}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getTipoIcon(doc.tipo)}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-text-muted">{doc.codigo}</div>
                    <h3 className="text-sm font-semibold text-text truncate group-hover:text-accent transition-colors">{doc.titulo}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="bg-surface-alt text-text-secondary text-[10px] font-medium px-2 py-0.5 rounded">{doc.setor}</span>
                  <span className="text-[10px] text-text-muted">{doc.versao}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.class}`}>{status.label}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-[10px] text-text-muted">Revisão: {formatDate(doc.dataRevisao)}</span>
                  <span className="text-[10px] text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">Abrir →</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-text-muted" />
          </div>
          <h3 className="text-base font-semibold text-text mb-1">Nenhum documento encontrado</h3>
          <p className="text-sm text-text-muted">Tente ajustar os filtros ou termos de busca.</p>
        </div>
      )}

      {/* Document Modal */}
      {selectedDocData && (
        <DocumentModal doc={selectedDocData} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
