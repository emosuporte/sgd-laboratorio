export interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  setor: string;
  perfil: 'admin' | 'rt' | 'colaborador';
  ativo: boolean;
  iniciais: string;
  cor: string;
}

export interface Documento {
  id: string;
  codigo: string;
  tipo: 'POP' | 'DOC' | 'FORM';
  titulo: string;
  setor: string;
  status: 'vigente' | 'em_revisao' | 'obsoleto' | 'rascunho';
  versao: string;
  dataRevisao: string;
  criadoPor: string;
  leituras: { total: number; confirmadas: number };
  versoes: Versao[];
}

export interface Versao {
  numero: string;
  data: string;
  descricao: string;
  aprovada: boolean;
  isVigente: boolean;
}

export interface Notificacao {
  id: string;
  tipo: 'leitura' | 'revisao' | 'sistema';
  titulo: string;
  mensagem: string;
  lida: boolean;
  data: string;
  documentoId?: string;
}

export interface Atividade {
  id: string;
  usuario: string;
  iniciais: string;
  cor: string;
  acao: string;
  tempo: string;
}

export const usuarios: User[] = [
  { id: '1', nome: 'Mariana Costa', email: 'rt@lab.com', cargo: 'Responsável Técnico', setor: 'DOC.LAB', perfil: 'rt', ativo: true, iniciais: 'MC', cor: 'bg-blue-500' },
  { id: '2', nome: 'Maria Silva', email: 'maria@lab.com', cargo: 'Biomédica', setor: 'LAB', perfil: 'colaborador', ativo: true, iniciais: 'MS', cor: 'bg-yellow-500' },
  { id: '3', nome: 'João Santos', email: 'joao@lab.com', cargo: 'Técnico de Laboratório', setor: 'LAB-PC', perfil: 'colaborador', ativo: true, iniciais: 'JS', cor: 'bg-purple-500' },
  { id: '4', nome: 'Ana Oliveira', email: 'ana@lab.com', cargo: 'Técnica de Laboratório', setor: 'LAB-AT', perfil: 'colaborador', ativo: true, iniciais: 'AO', cor: 'bg-emerald-500' },
  { id: '5', nome: 'Carlos Mendes', email: 'admin@lab.com', cargo: 'Administrador', setor: 'SECRETARIA', perfil: 'admin', ativo: true, iniciais: 'CM', cor: 'bg-red-500' },
  { id: '6', nome: 'Patricia Lima', email: 'patricia@lab.com', cargo: 'Auxiliar Administrativa', setor: 'SECRETARIA', perfil: 'colaborador', ativo: true, iniciais: 'PL', cor: 'bg-pink-500' },
];

export const documentos: Documento[] = [
  {
    id: '1', codigo: 'POP.LAB.001', tipo: 'POP', titulo: 'Instruções de Coleta de Material para Hemoculturas',
    setor: 'LAB', status: 'vigente', versao: 'v1.0', dataRevisao: '2026-09-04', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 5 },
    versoes: [
      { numero: '1.0', data: '2025-09-04', descricao: 'Versão inicial', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '2', codigo: 'POP.LAB.002', tipo: 'POP', titulo: 'Cadastro e Recebimento de Material Coletado',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 3 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Atualização do fluxo de recebimento', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-06-15', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '3', codigo: 'POP.LAB.003', tipo: 'POP', titulo: 'Transporte de Material Biológico — Posto de Coleta',
    setor: 'LAB-PC', status: 'vigente', versao: 'v1.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 6, confirmadas: 2 },
    versoes: [
      { numero: '1.0', data: '2025-10-29', descricao: 'Versão inicial', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '4', codigo: 'POP.LAB.004', tipo: 'POP', titulo: 'Controle de Temperatura Ambiente da Sala de Abastecimento',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 6 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Inclusão de novos parâmetros', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-03-10', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '5', codigo: 'POP.LAB.005', tipo: 'POP', titulo: 'Registro de Não Conformidades',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 4 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Atualização do formulário de registro', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-05-20', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '6', codigo: 'POP.LAB.006', tipo: 'POP', titulo: 'Implementar Ações Corretivas para Desvios de Temperatura',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 5 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Revisão dos procedimentos de ação corretiva', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-04-12', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '7', codigo: 'POP.LAB.013', tipo: 'POP', titulo: 'Transcrição e Conferência de Laudos do Laboratório de Apoio',
    setor: 'LAB', status: 'vigente', versao: 'v1.0', dataRevisao: '2026-05-05', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 4 },
    versoes: [
      { numero: '1.0', data: '2025-05-05', descricao: 'Versão inicial', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '8', codigo: 'POP.LAB.019', tipo: 'POP', titulo: 'Higienização das Mãos',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 7 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Atualização conforme ANVISA RDC 42', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-02-01', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '9', codigo: 'POP.LAB.021', tipo: 'POP', titulo: 'Instruções de Coleta de Urina em Amostra',
    setor: 'LAB', status: 'vigente', versao: 'v2.0', dataRevisao: '2026-10-29', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 5 },
    versoes: [
      { numero: '2.0', data: '2025-10-29', descricao: 'Revisão dos critérios de aceitação', aprovada: true, isVigente: true },
      { numero: '1.0', data: '2024-07-18', descricao: 'Versão inicial', aprovada: true, isVigente: false },
    ]
  },
  {
    id: '10', codigo: 'POP.LAB-AT.001', tipo: 'POP', titulo: 'Centrifugação de Materiais Biológicos',
    setor: 'LAB-AT', status: 'vigente', versao: 'v1.0', dataRevisao: '2026-12-01', criadoPor: 'Mariana Costa',
    leituras: { total: 5, confirmadas: 3 },
    versoes: [
      { numero: '1.0', data: '2025-12-01', descricao: 'Versão inicial', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '11', codigo: 'POP.LAB-AT.013', tipo: 'POP', titulo: 'Creatinina Fosfoquinase Total - CPK',
    setor: 'LAB-AT', status: 'vigente', versao: 'v1.0', dataRevisao: '2026-12-01', criadoPor: 'Mariana Costa',
    leituras: { total: 5, confirmadas: 2 },
    versoes: [
      { numero: '1.0', data: '2025-12-01', descricao: 'Versão inicial', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '12', codigo: 'DOC.LAB.001', tipo: 'DOC', titulo: 'Treinamento POP — Cadastro e Recebimento de Material Coletado',
    setor: 'DOC.LAB', status: 'vigente', versao: 'v1.0', dataRevisao: '2027-01-10', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 6 },
    versoes: [
      { numero: '1.0', data: '2025-01-10', descricao: 'Registro de treinamento', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '13', codigo: 'DOC.LAB.002', tipo: 'DOC', titulo: 'Registro de Controle de Temperatura Ambiente',
    setor: 'DOC.LAB', status: 'vigente', versao: 'v1.0', dataRevisao: '2027-02-15', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 7 },
    versoes: [
      { numero: '1.0', data: '2025-02-15', descricao: 'Formulário de registro', aprovada: true, isVigente: true },
    ]
  },
  {
    id: '14', codigo: 'DOC.LAB.006', tipo: 'DOC', titulo: 'Registro de Treinamento — Recebimento de Material dos Fornecedores',
    setor: 'DOC.LAB', status: 'em_revisao', versao: 'v1.0', dataRevisao: '2026-12-15', criadoPor: 'Mariana Costa',
    leituras: { total: 8, confirmadas: 3 },
    versoes: [
      { numero: '1.0', data: '2025-12-15', descricao: 'Em revisão - aguardando aprovação', aprovada: false, isVigente: false },
    ]
  },
];

export const notificacoes: Notificacao[] = [
  { id: '1', tipo: 'leitura', titulo: 'Nova versão disponível', mensagem: 'POP.LAB.002 foi atualizado para v2.0. Confirme sua leitura.', lida: false, data: '2026-10-15', documentoId: '2' },
  { id: '2', tipo: 'revisao', titulo: 'Revisão próxima', mensagem: 'POP.LAB.001 vence em 5 dias. Verifique a necessidade de atualização.', lida: false, data: '2026-10-14', documentoId: '1' },
  { id: '3', tipo: 'leitura', titulo: 'Leitura pendente', mensagem: 'POP.LAB.005 está aguardando sua confirmação de leitura.', lida: false, data: '2026-10-13', documentoId: '5' },
  { id: '4', tipo: 'sistema', titulo: 'Documento aprovado', mensagem: 'DOC.LAB.002 foi aprovado e está vigente.', lida: true, data: '2026-10-12', documentoId: '13' },
  { id: '5', tipo: 'revisao', titulo: 'Documento vencido', mensagem: 'POP.LAB.013 está com revisão vencida. Priorize a atualização.', lida: true, data: '2026-10-10', documentoId: '7' },
];

export const atividades: Atividade[] = [
  { id: '1', usuario: 'Ana Oliveira', iniciais: 'AO', cor: 'bg-emerald-500', acao: 'confirmou a leitura de POP.LAB-AT.001', tempo: 'Há 15 minutos' },
  { id: '2', usuario: 'Mariana Costa', iniciais: 'MC', cor: 'bg-blue-500', acao: 'atualizou o documento POP.LAB.019 — v2.0', tempo: 'Há 42 minutos' },
  { id: '3', usuario: 'Maria Silva', iniciais: 'MS', cor: 'bg-yellow-500', acao: 'confirmou a leitura de POP.LAB.002', tempo: 'Há 1 hora' },
  { id: '4', usuario: 'João Santos', iniciais: 'JS', cor: 'bg-purple-500', acao: 'confirmou a leitura de POP.LAB.003', tempo: 'Há 2 horas' },
  { id: '5', usuario: 'Mariana Costa', iniciais: 'MC', cor: 'bg-blue-500', acao: 'criou o documento DOC.LAB.006', tempo: 'Há 3 horas' },
  { id: '6', usuario: 'Carlos Mendes', iniciais: 'CM', cor: 'bg-red-500', acao: 'adicionou o usuário Patricia Lima', tempo: 'Há 5 horas' },
];

export const setores = ['LAB', 'LAB-AT', 'LAB-PC', 'DOC.LAB', 'SECRETARIA'];

export const credenciaisTeste = [
  { email: 'rt@lab.com', senha: 'Lab2024!', perfil: 'Responsável Técnico', nome: 'Mariana Costa' },
  { email: 'admin@lab.com', senha: 'Lab2024!', perfil: 'Administrador', nome: 'Carlos Mendes' },
  { email: 'maria@lab.com', senha: 'Lab2024!', perfil: 'Colaboradora LAB', nome: 'Maria Silva' },
  { email: 'joao@lab.com', senha: 'Lab2024!', perfil: 'Colaborador LAB-PC', nome: 'João Santos' },
  { email: 'ana@lab.com', senha: 'Lab2024!', perfil: 'Colaboradora LAB-AT', nome: 'Ana Oliveira' },
];
