# Documentação dos Serviços de API

## Visão Geral

Este documento descreve todos os serviços de comunicação com o backend (Node.js) para a aplicação financeira.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## Serviços Disponíveis

### 1. Auth Service (`authService`)

Gerencia autenticação e autorização de usuários.

#### Métodos

- **`login(email, password)`**
  - Faz login do usuário
  - Salva token e dados do usuário no localStorage
  - Retorna: `{ token, user: { id, name, email, balance, credit_score } }`

- **`signup(name, email, password)`**
  - Cria novo usuário
  - Salva token e dados do usuário no localStorage
  - Retorna: `{ token, user: { id, name, email, balance, credit_score } }`

- **`logout()`**
  - Remove token e dados do usuário do localStorage
  - Sem retorno

- **`isAuthenticated()`**
  - Verifica se o usuário está autenticado
  - Retorna: `boolean`

- **`getCurrentUser()`**
  - Obtém dados do usuário atual do localStorage
  - Retorna: `{ id, name, email, balance, credit_score } | null`

- **`refreshToken()`**
  - Renova o token de autenticação
  - Atualiza token no localStorage
  - Retorna: `{ token }`

### 2. User Service (`userService`)

Gerencia dados e configurações do usuário.

#### Métodos

- **`getProfile()`**
  - Obtém perfil completo do usuário autenticado
  - Retorna: `{ id, name, email, balance, credit_score, type, configuration }`

- **`updateProfile(userData)`**
  - Atualiza dados do perfil
  - Parâmetros: `{ name?, email?, password? }`
  - Retorna: `{ id, name, email, balance, credit_score, updated_at }`

- **`getBalance()`**
  - Obtém saldo atual do usuário
  - Retorna: `{ amount, lastUpdated }`

- **`getCreditScore()`**
  - Obtém score de crédito (0-1000)
  - Retorna: `{ score, lastUpdated }`

- **`getConfiguration()`**
  - Obtém configurações do usuário (JSONB)
  - Retorna: `{ configuration: {...} }`

- **`updateConfiguration(configuration)`**
  - Atualiza configurações do usuário
  - Parâmetros: `{ configuration: {...} }`
  - Retorna: `{ configuration: {...}, updated_at }`

- **`getUserByEmail(email)`**
  - Busca usuário por email (para PIX)
  - Retorna: `{ id, name, email }` (apenas dados públicos)

### 3. PIX Key Service (`pixKeyService`)

Gerencia chaves PIX do usuário.

#### Métodos

- **`getPixKeys()`**
  - Lista todas as chaves PIX cadastradas
  - Retorna: `[{ id, type, key, created_at }, ...]`

- **`registerPixKey(type, key)`**
  - Registra nova chave PIX
  - Parâmetros: `type: 'EMAIL' | 'CPF' | 'PHONE' | 'RANDOM'`
  - Retorna: `{ id, type, key, created_at }`

- **`deletePixKey(pixKeyId)`**
  - Remove chave PIX
  - Parâmetros: `pixKeyId: number`
  - Retorna: `{ success: true }`

- **`findUserByPixKey(pixKey)`**
  - Busca usuário pela chave PIX
  - Retorna: `{ id, name, email }`

- **`validatePixKey(type, key)`**
  - Valida se a chave PIX é válida e disponível
  - Retorna: `{ isValid: boolean, message: string }`

### 4. Transaction Service (`transactionService`)

Gerencia transações e operações PIX.

#### Métodos

- **`getTransactions(filters?)`**
  - Lista transações do usuário
  - Filtros: `{ type?, category?, startDate?, endDate?, limit?, offset? }`
  - Retorna: `[{ id, type, amount, date, category, details }, ...]`

- **`getTransactionsByDateRange(startDate, endDate)`**
  - Obtém transações em um período
  - Retorna: `[{ id, type, amount, date, category }, ...]`

- **`getTransactionsByCategory(category)`**
  - Obtém transações por categoria
  - Categorias: `'FOOD' | 'TRANSPORT' | 'ENTERTAINMENT' | 'EXPENSES' | 'OTHER'`
  - Retorna: `[{ id, type, amount, date, category }, ...]`

- **`getTransactionDetails(transactionId)`**
  - Obtém detalhes completos de uma transação
  - Retorna: `{ id, type, amount, date, category, details, status }`

- **`createTransaction(transactionData)`**
  - Cria transação manual
  - Parâmetros: `{ type, amount, category, details }`
  - Retorna: `{ id, type, amount, date, category, details, created_at }`

- **`sendPix(recipientPixKey, amount, description?)`**
  - Envia PIX para outro usuário
  - Retorna: `{ transactionId, status, recipientName, amount, date }`

- **`generatePixQrCode(amount)`**
  - Gera QR Code para receber PIX
  - Retorna: `{ qrCode: string, pixKey: string, amount }`

- **`getTransactionSummary()`**
  - Obtém resumo de transações
  - Retorna: `{ totalIncome, totalExpense, lastTransactions, categories }`

### 5. Expense Service (`expenseService`)

Gerencia despesas recorrentes e agendadas.

#### Métodos

- **`getExpenses(filters?)`**
  - Lista despesas do usuário
  - Filtros: `{ status?, isRecurring?, isActive?, limit?, offset? }`
  - Retorna: `[{ id, amount, description, executionDate, status, isRecurring }, ...]`

- **`getRecurringExpenses()`**
  - Lista apenas despesas recorrentes
  - Retorna: `[{ id, amount, description, executionDate, status }, ...]`

- **`getActiveExpenses()`**
  - Lista apenas despesas ativas
  - Retorna: `[{ id, amount, description, executionDate, status }, ...]`

- **`getExpenseDetails(expenseId)`**
  - Obtém detalhes completos de uma despesa
  - Retorna: `{ id, amount, description, executionDate, status, isRecurring, isActive, created_at, updated_at }`

- **`createExpense(expenseData)`**
  - Cria nova despesa
  - Parâmetros: `{ amount, description, executionDate, isRecurringPayment, isActive }`
  - Retorna: `{ id, amount, description, executionDate, status, created_at }`

- **`updateExpense(expenseId, expenseData)`**
  - Atualiza despesa
  - Parâmetros: `{ amount?, description?, executionDate?, isActive? }`
  - Retorna: `{ id, amount, description, executionDate, status, updated_at }`

- **`deleteExpense(expenseId)`**
  - Remove despesa
  - Retorna: `{ success: true }`

- **`toggleExpenseStatus(expenseId, isActive)`**
  - Ativa/desativa despesa recorrente
  - Retorna: `{ id, isActive, status }`

- **`getExpensesByExecutionDate(startDate, endDate)`**
  - Obtém despesas por data de execução
  - Retorna: `[{ id, amount, description, executionDate, status }, ...]`

- **`getExpensesByStatus(status)`**
  - Obtém despesas por status
  - Status: `'PENDING' | 'FAILED' | 'SUCCESS'`
  - Retorna: `[{ id, amount, description, executionDate, status }, ...]`

- **`getExpenseSummary()`**
  - Obtém resumo de despesas
  - Retorna: `{ totalPending, totalFailed, totalSuccess, nextExecutions }`

- **`processExpensePayment(expenseId)`**
  - Processa pagamento de despesa pendente
  - Retorna: `{ id, status, transactionId, processedAt }`

## Como Usar

### Exemplo 1: Login e Obter Perfil

```javascript
import { authService, userService } from './services'

// Login
const loginData = await authService.login('usuario@email.com', 'senha123')
console.log('Logado como:', loginData.user.name)

// Obter perfil
const profile = await userService.getProfile()
console.log('Saldo:', profile.balance)
```

### Exemplo 2: Enviar PIX

```javascript
import { transactionService, pixKeyService } from './services'

// Validar chave PIX
const validation = await pixKeyService.validatePixKey('EMAIL', 'usuario@email.com')

if (validation.isValid) {
  // Enviar PIX
  const result = await transactionService.sendPix(
    'usuario@email.com',
    150.00,
    'Pagamento de almoço'
  )
  console.log('PIX enviado:', result)
}
```

### Exemplo 3: Gerenciar Despesas

```javascript
import { expenseService } from './services'

// Criar despesa recorrente
const expense = await expenseService.createExpense({
  amount: 1500.00,
  description: 'Aluguel',
  executionDate: '2024-02-01',
  isRecurringPayment: true,
  isActive: true,
})

// Listar despesas pendentes
const pending = await expenseService.getExpensesByStatus('PENDING')
console.log('Despesas pendentes:', pending)
```

## Tratamento de Erros

Todos os serviços utilizam a mesma estrutura de tratamento de erros:

```javascript
try {
  const result = await authService.login(email, password)
  console.log('Sucesso:', result)
} catch (error) {
  console.error('Erro:', error.message)
  // Exibir mensagem ao usuário
}
```

## Autenticação

O token de autenticação é automaticamente incluído em todas as requisições após o login. Ele é armazenado em `localStorage` com a chave `authToken`.

Para fazer logout:

```javascript
authService.logout()
```

## Endpoints do Backend

Os serviços fazem requisições para os seguintes endpoints:

### Auth
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/refresh`

### Users
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/balance`
- `GET /api/users/credit-score`
- `GET /api/users/configuration`
- `PUT /api/users/configuration`
- `GET /api/users/email/:email`

### PIX Keys
- `GET /api/pix-keys`
- `POST /api/pix-keys`
- `DELETE /api/pix-keys/:id`
- `POST /api/pix-keys/find`
- `POST /api/pix-keys/validate`

### Transactions
- `GET /api/transactions`
- `POST /api/transactions/date-range`
- `GET /api/transactions/category/:category`
- `GET /api/transactions/:id`
- `POST /api/transactions`
- `POST /api/transactions/pix/send`
- `POST /api/pix/qr-code`
- `GET /api/transactions/summary`

### Expenses
- `GET /api/expenses`
- `GET /api/expenses/recurring`
- `GET /api/expenses/active`
- `GET /api/expenses/:id`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `PATCH /api/expenses/:id/toggle`
- `POST /api/expenses/execution-date`
- `GET /api/expenses/status/:status`
- `GET /api/expenses/summary`
- `POST /api/expenses/:id/process`

## Notas Importantes

1. **Token JWT**: O token é automaticamente salvo e incluído em todas as requisições
2. **localStorage**: Dados sensíveis devem ser tratados com cuidado
3. **Período de expiração**: Configure o tempo de expiração do token no backend
4. **Refresh Token**: Use `authService.refreshToken()` antes que o token expire
5. **CORS**: Configure CORS no backend para aceitar requisições do frontend

## Variáveis de Ambiente

Certifique-se de que o arquivo `.env` contém:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

Ou customize a URL conforme necessário.
