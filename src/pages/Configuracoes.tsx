import React, { useState } from 'react';
import { Settings, Bell, Shield, Building2, Save, Check, Plus } from 'lucide-react';
import { setores } from '../data/mockData';

export default function Configuracoes() {
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('geral');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: 'geral', label: 'Geral', icon: Settings },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'setores', label: 'Setores', icon: Building2 },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Configurações</h1>
        <p className="text-sm text-text-muted mt-1">Personalize o sistema de acordo com as necessidades do laboratório.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border p-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-surface-alt'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'geral' && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-base font-semibold text-text mb-4">Configurações gerais</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Nome do laboratório</label>
                  <input
                    type="text"
                    defaultValue="Laboratório ICFUC RS"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Sigla</label>
                  <input
                    type="text"
                    defaultValue="ICFUC RS"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Norma de referência</label>
                  <select className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all">
                    <option>ISO 15189:2022</option>
                    <option>ISO 15189:2012</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Prazo padrão de revisão (dias)</label>
                  <input
                    type="number"
                    defaultValue="365"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Salvo!' : 'Salvar alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notificacoes' && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-base font-semibold text-text mb-4">Configurações de notificações</h3>
              <div className="space-y-4">
                {[
                  { label: 'Notificar nova versão de documento', desc: 'Envia alerta quando um documento é atualizado' },
                  { label: 'Alerta de revisão próxima', desc: 'Notifica 30 dias antes do vencimento' },
                  { label: 'Alerta de documento vencido', desc: 'Notifica quando a revisão está atrasada' },
                  { label: 'Leitura pendente', desc: 'Lembra colaboradores de leituras não confirmadas' },
                  { label: 'Resumo semanal', desc: 'Envia relatório semanal por e-mail' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-text">{item.label}</div>
                      <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 4} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Salvo!' : 'Salvar alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'seguranca' && (
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-base font-semibold text-text mb-4">Segurança</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Tempo de sessão (horas)</label>
                  <input
                    type="number"
                    defaultValue="168"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                  <p className="text-xs text-text-muted mt-1">Tempo máximo antes de exigir novo login.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Tamanho máximo de upload (MB)</label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-text">Registro de IP nas leituras</div>
                    <div className="text-xs text-text-muted mt-0.5">Registra o endereço IP ao confirmar leitura</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Salvo!' : 'Salvar alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'setores' && (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-text">Setores</h3>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-medium rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Novo setor
                </button>
              </div>
              <div className="space-y-2">
                {setores.map(setor => (
                  <div key={setor} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-surface-alt transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm font-medium text-text">{setor}</span>
                    </div>
                    <button className="text-xs text-accent font-medium hover:underline">Editar</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
