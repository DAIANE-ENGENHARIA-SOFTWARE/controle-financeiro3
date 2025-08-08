# 💰 Controle Financeiro - Sistema Completo

![Status](https://img.shields.io/badge/Status-Pronto%20para%20Produ%C3%A7%C3%A3o-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF)
![License](https://img.shields.io/badge/License-MIT-yellow)

Sistema completo de controle financeiro desenvolvido em React, oferecendo uma solução abrangente para gestão de finanças pessoais e empresariais, com integração a links oficiais do governo brasileiro e sistema de monetização.

## 🚀 Funcionalidades

### Sistema de Autenticação
- **Login/Cadastro** com nome completo, telefone e senha
- **Recuperação de senha** por telefone (simulação via SMS)
- **Validação de formulários** com máscaras e verificações
- **Persistência de sessão** usando localStorage

### Dashboard Financeiro
- **Resumo financeiro** com cards de total de entradas, saídas e líquido
- **Card de Anotações Gerais** expansível para lembretes e objetivos
- **Controle por dia** baseado no modelo de planilha fornecido
- **Tabela de 31 dias** mostrando entradas, saídas e líquido por dia
- **Adicionar/Editar/Excluir transações** com data completa (dia, mês e ano)
- **Filtros** para visualizar apenas entradas, saídas ou todas as transações
- **Formatação automática** de valores monetários em Real (BRL)

### 🧮 Calculadora Completa
- **Calculadora Básica** com operações matemáticas fundamentais
- **Calculadora Científica** com funções trigonométricas e logarítmicas
- **Calculadora Financeira** para juros simples e compostos
- **Suporte a teclado** para maior produtividade
- **Interface responsiva** adaptável a qualquer dispositivo

### 📝 Sistema de Anotações Inteligente
- **Editor expansível** com formatação rica
- **Auto-save** para nunca perder informações
- **Contador de palavras** e caracteres
- **Preview inteligente** quando recolhido
- **Histórico de edições** com timestamp

### 🏛️ Links Oficiais do Governo
- **Portal do Empreendedor (MEI)** para declarações e serviços
- **Receita Federal (IRPF)** para imposto de renda
- **Sistema DAS** para pagamento de tributos do MEI
- **Links sempre atualizados** e verificados

### 💰 Sistema de Monetização
- **Google AdSense integrado** com posicionamento estratégico
- **Banners responsivos** que se adaptam ao conteúdo
- **Otimização para CTR** sem prejudicar a experiência do usuário
- **Compliance total** com políticas do Google

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca para interface de usuário
- **Vite** - Build tool moderna e rápida
- **CSS Moderno** - Estilização com Flexbox e Grid
- **LocalStorage** - Persistência de dados local
- **JavaScript ES6+** - Funcionalidades modernas

## 📋 Como Usar

1. **Primeiro Acesso**: Clique em "Cadastre-se" e preencha:
   - Nome completo
   - Telefone (formato: (11) 99999-9999)
   - Senha (mínimo 6 caracteres)

2. **Login**: Use seu telefone e senha cadastrados

3. **Recuperar Senha**: Clique em "Esqueci minha senha" e informe seu telefone

4. **Usar Anotações**:
   - Clique no card "📝 Anotações Gerais" para expandir
   - Faça anotações sobre objetivos, metas e lembretes
   - As anotações são salvas automaticamente
   - Use o botão 🔼/🔽 para expandir/recolher

5. **Adicionar Transações**:
   - Selecione o dia (1-31)
   - Escolha o mês e ano
   - Escolha o tipo (Entrada ou Saída)
   - Digite o valor (formatação automática)
   - Adicione uma descrição

5. **Visualizar Relatórios**:
   - Clique em "📊 Relatórios" no header
   - Escolha entre Relatório Anual, Mensal ou Comparativo
   - Analise gráficos e insights automáticos

6. **Visualizar Resumos**:
   - Cards com resumo geral no dashboard
   - Tabela com controle diário
   - Lista de transações com filtros

## 🎨 Design

- **Interface moderna** com gradientes e sombras
- **Responsivo** para desktop e mobile
- **Cores intuitivas** (verde para entradas, vermelho para saídas)
- **Animações suaves** para melhor experiência do usuário

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📱 Como Funciona

1. **Dados Locais**: Todas as informações são salvas no localStorage do navegador
2. **Múltiplos Usuários**: Suporte para vários usuários no mesmo dispositivo
3. **Segurança Básica**: Validação de campos e verificação de dados
4. **Recuperação**: Sistema de recuperação de senha por telefone

## � **Card de Anotações Gerais**

### Funcionalidades
- **Expansível/Recolhível**: Clique no header para mostrar/ocultar o editor
- **Auto-save**: As anotações são salvas automaticamente após 2 segundos
- **Preview**: Quando recolhido, mostra uma prévia do texto
- **Contador**: Mostra quantidade de caracteres e palavras
- **Histórico**: Exibe quando foi a última edição

### Usos Sugeridos
- 📋 Objetivos financeiros do mês
- 💰 Metas de economia
- ⏰ Lembretes de pagamentos
- 💡 Ideias para reduzir gastos
- 📈 Planejamento de investimentos
- 🛒 Anotações sobre grandes compras
- 📝 Observações sobre padrões de gasto

## �📊 Funcionalidades Avançadas dos Relatórios

### Relatório Anual
- **Resumo do ano** com totais de entradas, saídas e líquido
- **Análise de performance** mostrando melhor/pior mês e média mensal
- **Tabela mensal** com detalhamento mês a mês
- **Gráfico de evolução** com barras visuais por mês

### Relatório Mensal
- **Resumo do mês** selecionado
- **Breakdown por semanas** para análise detalhada
- **Lista completa** de transações do mês
- **Controles** para navegar entre meses e anos

### Comparativo entre Anos
- **Análise year-over-year** com percentuais de crescimento
- **Gráficos comparativos** entre diferentes anos
- **Insights automáticos** sobre tendências e performance
- **Média histórica** e identificação dos melhores/piores anos

## 🎯 Baseado no Modelo

O aplicativo foi desenvolvido seguindo o modelo de planilha financeira fornecido, mantendo a estrutura de:
- Controle por dias do mês (1-31)
- Separação entre entradas e saídas
- Cálculo automático do valor líquido
- Totais por categoria

## 📊 Funcionalidades Avançadas

- **Edição inline** de transações
- **Exclusão com confirmação**
- **Filtros em tempo real**
- **Totalizadores automáticos**
- **Histórico ordenado** por data de criação
- **Validação de dados** em tempo real

## 🔧 Estrutura do Projeto

```
src/
├── components/
│   ├── Login.jsx      # Componente de autenticação
│   ├── Login.css      # Estilos do login
│   ├── Dashboard.jsx  # Dashboard principal
│   └── Dashboard.css  # Estilos do dashboard
├── App.jsx           # Componente principal
├── App.css          # Estilos globais da aplicação
├── index.css        # Reset e estilos base
└── main.jsx         # Entry point da aplicação
```+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
