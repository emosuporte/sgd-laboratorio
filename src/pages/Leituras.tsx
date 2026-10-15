import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { documentos } from '../data/mockData';
import DocumentModal from '../components/DocumentModal';

export default function Leituras() {
  const [activeTab, setActiveTab] = useState<'pendentes' | 'concluidas' | 'historico'>('pendentes');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const pendentes = documentos.slice(0, 3);
  const concluidas = documentos.slice(3, 10);
  const historico = documentos.slice(10);

  const tabs = [
    { id: 'pendentes' as const, label: 'Pendentes', count: pendentes.length, icon: Clock },
    { id: 'concluidas' as const, label: 'Concluídas', count: concluidas.length, icon: CheckCircle2 },
    { id: 'historico' as const, label: 'Histórico', count: historico.length, icon: FileText },
  ];

  const currentDocs = activeTab === 'pendentes' ? pendentes : activeTab === 'concluidas' ? concluidas : historico;
  const selectedDocData = selectedDoc ? documentos.find(d => d.id === selectedDoc) : null;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Minhas leituras</h1>
        <p className="text-sm text-text-muted mt-1">Documentos que você precisa ler ou já leu.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-border rounded-xl p-1 mb-6 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-accent text-white shadow-sm' : 'text-text-muted hover:text-text hover:bg-surface-alt'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface-alt text-text-muted'
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {currentDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-border p-4 hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group"
            onClick={() => setSelectedDoc(doc.id)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'pendentes' ? 'bg-warning-light' : 'bg-success-light'
              }`}>
                {activeTab === 'pendentes' ? (
                  <Clock className="w-6 h-6 text-warning" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-text-muted">{doc.codigo}</span>
                  <span className="text-[10px] text-text-muted">{doc.versao}</span>
                </div>
                <h3 className="text-sm font-semibold text-text truncate group-hover:text-accent transition-colors">{doc.titulo}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="bg-surface-alt text-text-secondary text-[10px] font-medium px-2 py-0.5 rounded">{doc.setor}</span>
                  <span className={`text-[10px] font-medium ${
                    activeTab === 'pendentes' ? 'text-danger' : 'text-success'
                  }`}>
                    {activeTab === 'pendentes' ? 'Leitura obrigatória' : 'Leitura confirmada'}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <button className="px-4 py-2 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5">
                  {activeTab === 'pendentes' ? 'Ler documento' : 'Ver documento'} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentDocs.length === 0 && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-success" />
          </div>
          <h3 className="text-base font-semibold text-text mb-1">Tudo em dia!</h3>
          <p className="text-sm text-text-muted">Não há documentos pendentes nesta categoria.</p>
        </div>
      )}

      {/* Document Modal */}
      {selectedDocData && (
        <DocumentModal doc={selectedDocData} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
