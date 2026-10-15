# 🧪 SGD - Sistema de Gestão de Documentos

Sistema web de gestão documental para laboratório de análises clínicas, desenvolvido para atender aos requisitos da norma **ISO 15189**.

## 🎯 Objetivo

Substituir o controle manual em pastas de rede (H:) e planilhas Excel por um sistema web moderno com:

- ✅ Controle de acesso por perfil (Admin, Responsável Técnico, Colaborador)
- 📚 Biblioteca centralizada de documentos (POPs, DOCs, Formulários)
- ✍️ Confirmação digital de leitura (controle de conhecimento)
- ⏰ Alertas automáticos de vencimento de revisão
- 📊 Relatórios de aderência para auditorias
- 🔔 Sistema de notificações

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **Lucide React** (ícones)
- **Recharts** (gráficos)
- **React Router DOM** (roteamento)

### Backend (em desenvolvimento)
- Node.js 18 + Express
- PostgreSQL 15
- JWT (autenticação)
- Docker + Docker Compose

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ ([download](https://nodejs.org/))
- npm (incluído com Node.js)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/sgd-laboratorio-icfuc.git
cd sgd-laboratorio-icfuc

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

### Build para Produção

```bash
# Gere a build otimizada
npm run build

# Preview da build
npm run preview
```

## 🔐 Credenciais de Teste

| E-mail | Senha | Perfil | Nome |
|--------|-------|--------|------|
| rt@lab.com | Lab2024! | Responsável Técnico | Mariana Costa |
| admin@lab.com | Lab2024! | Administrador | Carlos Mendes |
| maria@lab.com | Lab2024! | Colaboradora LAB | Maria Silva |
| joao@lab.com | Lab2024! | Colaborador LAB-PC | João Santos |
| ana@lab.com | Lab2024! | Colaboradora LAB-AT | Ana Oliveira |

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal (Sidebar + Header)
│   └── DocumentModal.tsx # Modal de visualização de documentos
├── contexts/            # Contextos React
│   └── AuthContext.tsx  # Contexto de autenticação
├── data/                # Dados mock
│   └── mockData.ts      # Documentos, usuários, notificações
├── pages/               # Páginas da aplicação
│   ├── Login.tsx        # Tela de login
│   ├── Dashboard.tsx    # Visão geral
│   ├── Biblioteca.tsx   # Biblioteca de documentos
│   ├── Leituras.tsx     # Minhas leituras
│   ├── Gestao.tsx       # Gestão de documentos
│   ├── Relatorios.tsx   # Relatórios e métricas
│   ├── Usuarios.tsx     # Gestão de usuários
│   └── Configuracoes.tsx # Configurações do sistema
├── App.tsx              # Componente raiz
├── main.tsx             # Ponto de entrada
└── index.css            # Estilos globais
```

## 📋 Funcionalidades

### Dashboard
- Saudação personalizada com data atual
- Cards de estatísticas (documentos vigentes, leituras, revisões)
- Gráfico de aderência (donut chart)
- Leituras pendentes com ações rápidas
- Timeline de atividades recentes

### Biblioteca de Documentos
- Busca por código ou título
- Filtros por tipo (POP/DOC/FORM), setor e status
- Visualização em grid de cards
- Modal detalhado com abas (Documento, Versões, Leituras)
- Confirmação digital de leitura

### Gestão de Documentos
- Tabela completa com todos os documentos
- Ações de aprovação para documentos em revisão
- Busca e filtros avançados
- Controle de versões

### Relatórios
- Métricas de aderência por setor
- Indicadores de qualidade (ISO 15189)
- Exportação de dados (CSV/PDF)
- Gráficos de evolução

### Configurações
- Configurações gerais do sistema
- Gerenciamento de notificações
- Configurações de segurança
- Gestão de setores

## 🎨 Design System

### Paleta de Cores
- **Primária**: Azul marinho `#1e293b`
- **Accent**: Azul `#2563eb`
- **Sucesso**: Verde `#10b981`
- **Alerta**: Amarelo `#f59e0b`
- **Perigo**: Vermelho `#ef4444`

### Tipografia
- Fonte: Inter
- Títulos: 28-32px, weight 700
- Body: 14px

## 📊 Dados de Exemplo

O sistema inclui 14 documentos de exemplo baseados em dados reais de laboratório:

- **POPs**: Procedimentos Operacionais Padrão (11 documentos)
- **DOCs**: Documentos de registro e treinamento (3 documentos)
- **Setores**: LAB, LAB-AT, LAB-PC, DOC.LAB, SECRETARIA

## 🔒 Segurança

- Autenticação JWT (em desenvolvimento)
- Controle de acesso por perfil
- Registro de IP nas confirmações de leitura
- Sessão com tempo de expiração
- Upload de arquivos com validação (PDF, máx 50MB)

## 📄 Conformidade

Este sistema foi desenvolvido para atender aos requisitos da norma:
- **ISO 15189:2022** - Laboratórios clínicos — Requisitos de qualidade e competência
- **RDC ANVISA nº 302/2005** - Regulamento técnico para funcionamento de laboratórios clínicos

## 🤝 Contribuindo

Este é um projeto interno do Laboratório ICFUC RS. Para contribuições:

1. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
2. Commit suas mudanças (`git commit -m 'feat: Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/NovaFuncionalidade`)
4. Abra um Pull Request

## 📝 Licença

Uso interno - Laboratório ICFUC RS  
Todos os direitos reservados

## 👥 Contato

**Laboratório ICFUC RS**  
Sistema de Gestão da Qualidade

---

**Desenvolvido com ❤️ para melhorar a qualidade e rastreabilidade dos processos laboratoriais.**
