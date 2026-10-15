import React from 'react';
import { BarChart3, Download, FileText, TrendingUp, Users, PieChart } from 'lucide-react';
import { documentos, setores } from '../data/mockData';

export default function Relatorios() {
  const totalDocs = documentos.length;
  const vigentes = documentos.filter(d => d.status === 'vigente').length;
  const totalLeituras = documentos.reduce((acc, d) => acc + d.leituras.total, 0);
  const leiturasConfirmadas = documentos.reduce((acc, d) => acc + d.leituras.confirmadas, 0);
  const aderencia = Math.round((leiturasConfirmadas / totalLeituras) * 100);

  // Sector stats
  const sectorStats = setores.map(setor => {
    const docs = documentos.filter(d => d.setor === setor);
    const total = docs.reduce((acc, d) => acc + d.leituras.total, 0);
    const confirmed = docs.reduce((acc, d) => acc + d.leituras.confirmadas, 0);
    return { setor, docs: docs.length, total, confirmed, rate: total > 0 ? Math.round((confirmed / total) * 100) : 0 };
  });

  const reports = [
    { title: 'Aderência por setor', desc: 'Percentual de leituras confirmadas por setor', icon: BarChart3, color: 'bg-blue-50 text-accent' },
    { title: 'Documentos por tipo', desc: 'Distribuição de POPs, DOCs e formulários', icon: PieChart, color: 'bg-purple-50 text-purple-600' },
    { title: 'Status de revisão', desc: 'Documentos vigentes, em revisão e vencidos', icon: TrendingUp, color: 'bg-emerald-50 text-success' },
    { title: 'Histórico de leituras', desc: 'Evolução das confirmações ao longo do tempo', icon: Users, color: 'bg-amber-50 text-warning' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Relatórios</h1>
        <p className="text-sm text-text-muted mt-1">Análises e indicadores para auditorias ISO 15189.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{totalDocs}</div>
              <div className="text-xs text-text-muted">Total de documentos</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{aderencia}%</div>
              <div className="text-xs text-text-muted">Aderência geral</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{leiturasConfirmadas}</div>
              <div className="text-xs text-text-muted">Leituras confirmadas</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-text">{vigentes}</div>
              <div className="text-xs text-text-muted">Documentos vigentes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.color}`}>
                  <report.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text">{report.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{report.desc}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors opacity-0 group-hover:opacity-100">
                <Download className="w-4 h-4 text-text-muted" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sector Adherence Table */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-text">Aderência por setor</h3>
            <p className="text-xs text-text-muted mt-0.5">Percentual de leituras confirmadas em cada setor.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-alt hover:bg-gray-100 text-text-secondary text-xs font-medium rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Setor</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Documentos</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Leituras</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Confirmadas</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Taxa</th>
                <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-3">Progresso</th>
              </tr>
            </thead>
            <tbody>
              {sectorStats.map(s => (
                <tr key={s.setor} className="border-b border-border/50">
                  <td className="py-3">
                    <span className="text-sm font-medium text-text">{s.setor}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-text-secondary">{s.docs}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-text-secondary">{s.total}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-sm text-text-secondary">{s.confirmed}</span>
                  </td>
                  <td className="py-3">
                    <span className={`text-sm font-semibold ${s.rate >= 70 ? 'text-success' : s.rate >= 50 ? 'text-warning' : 'text-danger'}`}>
                      {s.rate}%
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${s.rate >= 70 ? 'bg-success' : s.rate >= 50 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${s.rate}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
