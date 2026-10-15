import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FileText, CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  BookOpen, TrendingUp, Calendar
} from 'lucide-react';
import { documentos, atividades } from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const vigentes = documentos.filter(d => d.status === 'vigente').length;
  const emRevisao = documentos.filter(d => d.status === 'em_revisao').length;
  const totalLeituras = documentos.reduce((acc, d) => acc + d.leituras.total, 0);
  const leiturasConfirmadas = documentos.reduce((acc, d) => acc + d.leituras.confirmadas, 0);
  const aderencia = Math.round((leiturasConfirmadas / totalLeituras) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️';
    if (hour < 18) return '🌤️';
    return '🌙';
  };

  const pendentes = documentos.filter(d => {
    const userSetor = user?.setor;
    return d.setor === userSetor || d.setor === 'DOC.LAB';
  }).slice(0, 3);

  const revisaoDocs = documentos.filter(d => d.status === 'vigente' || d.status === 'em_revisao').slice(0, 3);

  const getStatusBadge = (dataRevisao: string) => {
    const today = new Date();
    const revision = new Date(dataRevisao);
    const diffDays = Math.ceil((revision.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Vencido', class: 'bg-danger-light text-danger' };
    if (diffDays <= 30) return { label: 'Revisão próxima', class: 'bg-warning-light text-warning' };
    return { label: 'Vigente', class: 'bg-success-light text-success' };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const todayFormatted = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Donut chart data
  const donutSize = 160;
  const donutStroke = 16;
  const radius = (donutSize - donutStroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (aderencia / 100) * circumference;

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary-dark via-slate-800 to-primary rounded-2xl p-6 lg:p-8 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tMi0xNGgydjEyaC0yVjE2em0tMTIgMGgydjEyaC0yVjE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">Gestão Documental</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {getGreeting()}, {user?.nome?.split(' ')[0]} {getEmoji()}
            </h1>
            <p className="text-slate-300 text-sm lg:text-base max-w-md">
              Conhecimento compartilhado. Qualidade que se transforma em cuidado.
            </p>
            <button
              onClick={() => navigate('/biblioteca')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm font-medium transition-all"
            >
              Explorar biblioteca <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
            <Calendar className="w-4 h-4 text-slate-300" />
            <span className="text-white text-sm font-medium capitalize">{todayFormatted}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <span className="text-2xl font-bold text-text">{vigentes}</span>
          </div>
          <p className="text-sm font-medium text-text">Documentos vigentes</p>
          <p className="text-xs text-text-muted mt-0.5">Documentos disponíveis</p>
          <button onClick={() => navigate('/biblioteca')} className="mt-3 text-xs text-accent font-medium hover:underline flex items-center gap-1">
            Biblioteca atualizada <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <span className="text-2xl font-bold text-text">{Math.round((leiturasConfirmadas / vigentes) * 100)}%</span>
          </div>
          <p className="text-sm font-medium text-text">Leituras confirmadas</p>
          <p className="text-xs text-text-muted mt-0.5">{leiturasConfirmadas} de {totalLeituras} documentos</p>
          <button onClick={() => navigate('/leituras')} className="mt-3 text-xs text-accent font-medium hover:underline flex items-center gap-1">
            Seu acompanhamento <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <span className="text-2xl font-bold text-text">07</span>
          </div>
          <p className="text-sm font-medium text-text">Revisão próxima</p>
          <p className="text-xs text-text-muted mt-0.5">Nos próximos 30 dias</p>
          <button className="mt-3 text-xs text-accent font-medium hover:underline flex items-center gap-1">
            Acompanhar revisões <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-danger" />
            </div>
            <span className="text-2xl font-bold text-text">02</span>
          </div>
          <p className="text-sm font-medium text-text">Documentos vencidos</p>
          <p className="text-xs text-text-muted mt-0.5">Precisam de atenção</p>
          <button className="mt-3 text-xs text-accent font-medium hover:underline flex items-center gap-1">
            Priorizar atualizações <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pending Readings */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-text">Leituras pendentes</h3>
                <span className="bg-warning-light text-warning text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">Novos conhecimentos para a sua rotina.</p>
            </div>
            <button onClick={() => navigate('/leituras')} className="text-xs text-accent font-medium hover:underline">Ver todas →</button>
          </div>

          <div className="space-y-3">
            {pendentes.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:border-accent/30 hover:bg-surface-alt transition-all group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-text-muted">{doc.codigo}</span>
                    <span className="text-[10px] text-text-muted">{doc.versao}</span>
                  </div>
                  <p className="text-sm font-medium text-text truncate">{doc.titulo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-surface-alt text-text-secondary text-[10px] font-medium px-2 py-0.5 rounded">{doc.setor}</span>
                    <span className="text-[10px] text-danger font-medium">Leitura obrigatória</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/biblioteca?doc=${doc.id}`)}
                  className="shrink-0 px-3 py-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  Ler documento ↗
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-xs text-text-muted flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Cada leitura fortalece a segurança dos nossos processos.
            </p>
          </div>
        </div>

        {/* Adherence Chart */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-text">Aderência de leitura</h3>
              <p className="text-xs text-text-muted mt-0.5">Uma equipe alinhada faz a diferença.</p>
            </div>
            <select className="text-xs border border-border rounded-lg px-2 py-1 text-text-secondary">
              <option>Este mês</option>
              <option>Último trimestre</option>
            </select>
          </div>

          {/* Donut Chart */}
          <div className="flex justify-center my-4">
            <div className="relative">
              <svg width={donutSize} height={donutSize} className="-rotate-90">
                <circle
                  cx={donutSize / 2}
                  cy={donutSize / 2}
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth={donutStroke}
                />
                <circle
                  cx={donutSize / 2}
                  cy={donutSize / 2}
                  r={radius}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={donutStroke}
                  strokeDasharray={`${progress} ${circumference}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-text">{aderencia}%</span>
                <span className="text-xs text-text-muted">de aderência</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-text-secondary">Confirmadas</span>
              </div>
              <span className="text-sm font-semibold text-text">{leiturasConfirmadas}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="text-xs text-text-secondary">Pendentes</span>
              </div>
              <span className="text-sm font-semibold text-text">{totalLeituras - leiturasConfirmadas}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-xs text-success font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              ↑ 8,2% em relação ao período anterior
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revision Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-text">Fique de olho nas revisões</h3>
              <p className="text-xs text-text-muted mt-0.5">Documentos que precisam da sua atenção.</p>
            </div>
            <button onClick={() => navigate('/biblioteca')} className="text-xs text-accent font-medium hover:underline">Ver documentos →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-2">Documento</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-2">Setor</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-2">Próxima revisão</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted pb-2">Situação</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {revisaoDocs.map(doc => {
                  const status = getStatusBadge(doc.dataRevisao);
                  return (
                    <tr key={doc.id} className="border-b border-border/50 hover:bg-surface-alt transition-colors cursor-pointer" onClick={() => navigate(`/biblioteca?doc=${doc.id}`)}>
                      <td className="py-3 pr-4">
                        <div className="text-xs font-mono text-text-muted">{doc.codigo}</div>
                        <div className="text-sm text-text truncate max-w-[200px]">{doc.titulo}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="bg-surface-alt text-text-secondary text-[10px] font-medium px-2 py-0.5 rounded">{doc.setor}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(doc.dataRevisao)}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${status.class}`}>{status.label}</span>
                      </td>
                      <td className="py-3">
                        <ArrowUpRight className="w-4 h-4 text-text-muted" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-muted" />
              <h3 className="text-base font-semibold text-text">Atividades recentes</h3>
            </div>
          </div>
          <p className="text-xs text-text-muted mb-4">O que acontece por aqui.</p>

          <div className="space-y-4">
            {atividades.slice(0, 5).map(atv => (
              <div key={atv.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${atv.cor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                  {atv.iniciais}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-text">
                    <span className="font-semibold">{atv.usuario}</span>{' '}
                    <span className="text-text-secondary">{atv.acao}</span>
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">{atv.tempo}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-xs text-accent font-medium hover:underline">Ver todas as atividades →</button>
        </div>
      </div>
    </div>
  );
}
