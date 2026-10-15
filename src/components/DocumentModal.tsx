import React, { useState } from 'react';
import { X, FileText, Clock, Users, CheckCircle2, Calendar } from 'lucide-react';
import { Documento } from '../data/mockData';

interface Props {
  doc: Documento;
  onClose: () => void;
}

export default function DocumentModal({ doc, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'documento' | 'versoes' | 'leituras'>('documento');
  const [leituraConfirmada, setLeituraConfirmada] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vigente': return { label: 'Vigente', class: 'bg-success-light text-success' };
      case 'em_revisao': return { label: 'Em revisão', class: 'bg-orange-light text-orange' };
      case 'obsoleto': return { label: 'Obsoleto', class: 'bg-gray-100 text-gray-500' };
      default: return { label: status, class: 'bg-gray-100 text-gray-500' };
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const status = getStatusBadge(doc.status);

  const tabs = [
    { id: 'documento' as const, label: 'Documento', icon: FileText },
    { id: 'versoes' as const, label: 'Versões', icon: Clock },
    { id: 'leituras' as const, label: 'Leituras', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scaleIn flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-text-muted">{doc.codigo} · Versão {doc.versao.replace('v', '')}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.class}`}>{status.label}</span>
              </div>
              <h2 className="text-xl font-bold text-text">{doc.titulo}</h2>
              <p className="text-xs text-text-muted mt-1">Setor {doc.setor} · Próxima revisão: {formatDate(doc.dataRevisao)}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-alt transition-colors">
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-surface-alt rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'documento' && (
            <div>
              {/* Reading status */}
              {!leituraConfirmada ? (
                <div className="mb-4 p-4 bg-warning-light border border-warning/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-warning" />
                    <div>
                      <p className="text-sm font-medium text-text">Leitura pendente</p>
                      <p className="text-xs text-text-muted">Confirme que leu este documento para registrar seu conhecimento.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLeituraConfirmada(true)}
                    className="px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Confirmar leitura
                  </button>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-success-light border border-success/20 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium text-success">Leitura confirmada!</p>
                    <p className="text-xs text-text-muted">Seu conhecimento foi registrado com sucesso.</p>
                  </div>
                </div>
              )}

              {/* Simulated Document Content */}
              <div className="border border-border rounded-xl overflow-hidden">
                {/* Document Header */}
                <div className="bg-surface-alt p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">ICFUC</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-text">Laboratório ICFUC RS</div>
                        <div className="text-[10px] text-text-muted">Análises Clínicas</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-text-muted">{doc.codigo}</div>
                      <div className="text-[10px] text-text-muted">Versão {doc.versao.replace('v', '')}</div>
                    </div>
                  </div>
                </div>

                {/* Document Body */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Procedimento Operacional Padrão</p>
                    <h3 className="text-lg font-bold text-text">{doc.titulo}</h3>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center">1</span>
                        Objetivo
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed pl-7">
                        Padronizar as atividades do laboratório e assegurar a qualidade, a rastreabilidade e a segurança dos processos, 
                        garantindo conformidade com os requisitos da norma ISO 15189 e as diretrizes da ANVISA.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center">2</span>
                        Aplicação
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed pl-7">
                        Equipe do setor {doc.setor} do Laboratório ICFUC RS. Este procedimento aplica-se a todos os colaboradores 
                        envolvidos nas atividades descritas, incluindo técnicos, biomédicos e responsáveis técnicos.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center">3</span>
                        Responsabilidades
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed pl-7">
                        Os colaboradores devem conhecer o procedimento vigente e comunicar ao responsável técnico qualquer desvio 
                        identificado. O responsável técnico é o encarregado por garantir a atualização periódica deste documento 
                        e a capacitação da equipe.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center">4</span>
                        Procedimento
                      </h4>
                      <div className="text-sm text-text-secondary leading-relaxed pl-7 space-y-2">
                        <p>4.1. Seguir rigorosamente as etapas descritas neste documento.</p>
                        <p>4.2. Registrar todas as atividades nos formulários apropriados.</p>
                        <p>4.3. Comunicar imediatamente qualquer não conformidade ao responsável técnico.</p>
                        <p>4.4. Manter os registros organizados e acessíveis para auditorias.</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center">5</span>
                        Referências
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed pl-7">
                        ISO 15189:2022 — Laboratórios clínicos — Requisitos de qualidade e competência. 
                        RDC ANVISA nº 302/2005.
                      </p>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="mt-8 pt-4 border-t border-border">
                    <p className="text-[10px] text-text-muted text-center italic">
                      Conteúdo ilustrativo para demonstração. O documento técnico oficial ainda não foi anexado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'versoes' && (
            <div>
              <h3 className="text-base font-semibold text-text mb-4">Histórico de versões</h3>
              <div className="space-y-3">
                {doc.versoes.map((v, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${v.isVigente ? 'border-success/30 bg-success-light/30' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text">Versão {v.numero}</span>
                        {v.isVigente && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success-light text-success">Vigente</span>
                        )}
                      </div>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(v.data)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{v.descricao}</p>
                    {v.aprovada && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-success">
                        <CheckCircle2 className="w-3 h-3" /> Aprovada
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leituras' && (
            <div>
              <h3 className="text-base font-semibold text-text mb-4">Status de leituras</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-success-light/30 border border-success/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-success">{doc.leituras.confirmadas}</div>
                  <div className="text-xs text-text-muted mt-1">Leituras confirmadas</div>
                </div>
                <div className="bg-warning-light/30 border border-warning/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{doc.leituras.total - doc.leituras.confirmadas}</div>
                  <div className="text-xs text-text-muted mt-1">Leituras pendentes</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Colaboradores</div>
                {['Maria Silva', 'João Santos', 'Ana Oliveira', 'Patricia Lima'].map((nome, i) => {
                  const confirmed = i < doc.leituras.confirmadas;
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${['bg-yellow-500', 'bg-purple-500', 'bg-emerald-500', 'bg-pink-500'][i]} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {nome.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-text">{nome}</span>
                      </div>
                      {confirmed ? (
                        <span className="flex items-center gap-1 text-[10px] text-success font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmado
                        </span>
                      ) : (
                        <span className="text-[10px] text-warning font-medium">Pendente</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
