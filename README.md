# Hub Financeiro - Financial Hub

Um hub financeiro moderno e responsivo construído com React, Vite e Recharts.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com tema escuro
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Dashboard Interativo**: Visualização de dados financeiros com gráficos
- **Componentes Reutilizáveis**: Arquitetura modular e escalável
- **Performance Otimizada**: Construído com Vite para carregamento rápido

## 📦 Tecnologias

- React 18
- Vite
- React Router DOM (para navegação)
- Recharts (para gráficos)
- CSS3 (com variáveis CSS)

## 🛠️ Instalação

### Instalação Local

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Instalação com Docker

#### Produção

1. Construa e inicie o container:
```bash
docker-compose up -d --build
```

2. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

3. Para parar o container:
```bash
docker-compose down
```

#### Desenvolvimento

1. Inicie o container em modo desenvolvimento:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

3. O código será recarregado automaticamente quando você fizer alterações

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção

## 🐳 Docker

O projeto inclui configuração Docker completa:

- **Dockerfile**: Build multi-stage para produção (React + Nginx)
- **Dockerfile.dev**: Para desenvolvimento com hot-reload
- **docker-compose.yml**: Configuração para produção
- **docker-compose.dev.yml**: Configuração para desenvolvimento
- **nginx.conf**: Configuração do servidor Nginx para SPA

### Comandos Docker Úteis

```bash
# Produção
docker-compose up -d --build          # Construir e iniciar
docker-compose down                   # Parar e remover
docker-compose logs -f                # Ver logs
docker-compose restart                # Reiniciar

# Desenvolvimento
docker-compose -f docker-compose.dev.yml up    # Iniciar dev
docker-compose -f docker-compose.dev.yml down   # Parar dev
```

## 🎨 Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard.jsx              # Componente principal do dashboard
│   ├── Extrato.jsx                # Tela de extrato bancário
│   ├── TransacoesRecorrentes.jsx  # Cadastro de transações recorrentes
│   ├── PedidoEmprestimo.jsx       # Tela de solicitação de empréstimo
│   ├── FinancialCard.jsx          # Cards de métricas financeiras
│   ├── Header.jsx                 # Cabeçalho da aplicação
│   ├── Sidebar.jsx                # Menu lateral com navegação
│   ├── PortfolioChart.jsx         # Gráfico de portfólio
│   └── TransactionsList.jsx       # Lista de transações
├── App.jsx                         # Componente raiz com rotas
├── main.jsx                        # Ponto de entrada
├── App.css                         # Estilos do App
└── index.css                       # Estilos globais
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Funcionalidades

### Dashboard
- Visão geral das finanças
- Cards financeiros: Saldo total, receitas, despesas e investimentos
- Gráficos interativos: Evolução do portfólio ao longo do tempo
- Lista de transações recentes

### Extrato
- Visualização completa de todas as transações
- Filtros por tipo (Receitas, Despesas, Investimentos)
- Seleção de período (Semana, Mês, Ano)
- Resumo financeiro (Receitas, Despesas, Saldo)
- Exportação de dados

### Transações Recorrentes
- Cadastro de transações que se repetem automaticamente
- Configuração de frequência (Diária, Semanal, Mensal, Anual)
- Ativação/desativação de transações
- Gestão completa de transações recorrentes

### Pedido de Empréstimo
- Formulário completo para solicitação de empréstimo
- Cálculo automático de parcelas e juros
- Resumo da proposta em tempo real
- Validação de dados e informações sobre vantagens

## 🔧 Personalização

As cores e estilos podem ser facilmente personalizados através das variáveis CSS em `src/index.css`:

```css
:root {
  --primary-color: #4F46E5;
  --secondary-color: #10B981;
  --bg-primary: #0F172A;
  /* ... */
}
```

## 📄 Licença

Este projeto foi criado para o hackathon FMU.

