// Exemplo de uso dos serviços

// ============ AUTENTICAÇÃO ============
import { authService } from './services'

// Login
try {
  const loginResponse = await authService.login('usuario@email.com', 'senha123')
  console.log('Login bem-sucedido:', loginResponse)
} catch (error) {
  console.error('Erro ao fazer login:', error)
}

// Signup
try {
  const signupResponse = await authService.signup('João Silva', 'joao@email.com', 'senha123')
  console.log('Cadastro bem-sucedido:', signupResponse)
} catch (error) {
  console.error('Erro ao fazer cadastro:', error)
}

// Logout
authService.logout()

// Verificar autenticação
if (authService.isAuthenticated()) {
  console.log('Usuário autenticado')
}

// ============ USUÁRIOS ============
import { userService } from './services'

// Obter perfil
try {
  const profile = await userService.getProfile()
  console.log('Perfil:', profile)
} catch (error) {
  console.error('Erro ao obter perfil:', error)
}

// Atualizar perfil
try {
  const updated = await userService.updateProfile({ name: 'Novo Nome' })
  console.log('Perfil atualizado:', updated)
} catch (error) {
  console.error('Erro ao atualizar perfil:', error)
}

// Obter saldo
try {
  const balance = await userService.getBalance()
  console.log('Saldo:', balance.amount)
} catch (error) {
  console.error('Erro ao obter saldo:', error)
}

// Obter score de crédito
try {
  const creditScore = await userService.getCreditScore()
  console.log('Score de crédito:', creditScore.score)
} catch (error) {
  console.error('Erro ao obter score de crédito:', error)
}

// ============ CHAVES PIX ============
import { pixKeyService } from './services'

// Listar chaves PIX
try {
  const pixKeys = await pixKeyService.getPixKeys()
  console.log('Chaves PIX:', pixKeys)
} catch (error) {
  console.error('Erro ao listar chaves PIX:', error)
}

// Registrar chave PIX
try {
  const newKey = await pixKeyService.registerPixKey('EMAIL', 'usuario@email.com')
  console.log('Chave PIX registrada:', newKey)
} catch (error) {
  console.error('Erro ao registrar chave PIX:', error)
}

// Deletar chave PIX
try {
  await pixKeyService.deletePixKey(1)
  console.log('Chave PIX deletada')
} catch (error) {
  console.error('Erro ao deletar chave PIX:', error)
}

// Buscar usuário por chave PIX
try {
  const user = await pixKeyService.findUserByPixKey('usuario@email.com')
  console.log('Usuário encontrado:', user)
} catch (error) {
  console.error('Erro ao buscar usuário:', error)
}

// Validar chave PIX
try {
  const validation = await pixKeyService.validatePixKey('EMAIL', 'usuario@email.com')
  console.log('Validação:', validation)
} catch (error) {
  console.error('Erro ao validar chave PIX:', error)
}

// ============ TRANSAÇÕES ============
import { transactionService } from './services'

// Listar transações
try {
  const transactions = await transactionService.getTransactions()
  console.log('Transações:', transactions)
} catch (error) {
  console.error('Erro ao listar transações:', error)
}

// Listar com filtros
try {
  const filtered = await transactionService.getTransactions({
    type: 'DEBIT',
    category: 'FOOD',
    limit: 10,
  })
  console.log('Transações filtradas:', filtered)
} catch (error) {
  console.error('Erro ao filtrar transações:', error)
}

// Transações por data
try {
  const byDate = await transactionService.getTransactionsByDateRange(
    '2024-01-01',
    '2024-01-31'
  )
  console.log('Transações por data:', byDate)
} catch (error) {
  console.error('Erro ao obter transações por data:', error)
}

// Transações por categoria
try {
  const byCategory = await transactionService.getTransactionsByCategory('FOOD')
  console.log('Transações de FOOD:', byCategory)
} catch (error) {
  console.error('Erro ao obter transações por categoria:', error)
}

// Detalhes de transação
try {
  const details = await transactionService.getTransactionDetails(1)
  console.log('Detalhes:', details)
} catch (error) {
  console.error('Erro ao obter detalhes:', error)
}

// Enviar PIX
try {
  const pix = await transactionService.sendPix(
    'usuario@email.com',
    150.00,
    'Pagamento de almoço'
  )
  console.log('PIX enviado:', pix)
} catch (error) {
  console.error('Erro ao enviar PIX:', error)
}

// Gerar QR Code
try {
  const qrCode = await transactionService.generatePixQrCode(100.00)
  console.log('QR Code:', qrCode)
} catch (error) {
  console.error('Erro ao gerar QR Code:', error)
}

// Resumo de transações
try {
  const summary = await transactionService.getTransactionSummary()
  console.log('Resumo:', summary)
} catch (error) {
  console.error('Erro ao obter resumo:', error)
}

// ============ DESPESAS ============
import { expenseService } from './services'

// Listar despesas
try {
  const expenses = await expenseService.getExpenses()
  console.log('Despesas:', expenses)
} catch (error) {
  console.error('Erro ao listar despesas:', error)
}

// Listar despesas recorrentes
try {
  const recurring = await expenseService.getRecurringExpenses()
  console.log('Despesas recorrentes:', recurring)
} catch (error) {
  console.error('Erro ao listar despesas recorrentes:', error)
}

// Listar despesas ativas
try {
  const active = await expenseService.getActiveExpenses()
  console.log('Despesas ativas:', active)
} catch (error) {
  console.error('Erro ao listar despesas ativas:', error)
}

// Criar despesa
try {
  const newExpense = await expenseService.createExpense({
    isRecurringPayment: true,
    isActive: true,
    amount: 150.00,
    description: 'Aluguel do apartamento',
    executionDate: '2024-02-01',
  })
  console.log('Despesa criada:', newExpense)
} catch (error) {
  console.error('Erro ao criar despesa:', error)
}

// Atualizar despesa
try {
  const updated = await expenseService.updateExpense(1, {
    amount: 160.00,
    description: 'Aluguel do apartamento (atualizado)',
  })
  console.log('Despesa atualizada:', updated)
} catch (error) {
  console.error('Erro ao atualizar despesa:', error)
}

// Deletar despesa
try {
  await expenseService.deleteExpense(1)
  console.log('Despesa deletada')
} catch (error) {
  console.error('Erro ao deletar despesa:', error)
}

// Toggle status de despesa
try {
  const toggled = await expenseService.toggleExpenseStatus(1, false)
  console.log('Status alterado:', toggled)
} catch (error) {
  console.error('Erro ao alterar status:', error)
}

// Despesas por data
try {
  const byDate = await expenseService.getExpensesByExecutionDate(
    '2024-01-01',
    '2024-01-31'
  )
  console.log('Despesas por data:', byDate)
} catch (error) {
  console.error('Erro ao obter despesas por data:', error)
}

// Despesas por status
try {
  const byStatus = await expenseService.getExpensesByStatus('PENDING')
  console.log('Despesas pendentes:', byStatus)
} catch (error) {
  console.error('Erro ao obter despesas por status:', error)
}

// Resumo de despesas
try {
  const summary = await expenseService.getExpenseSummary()
  console.log('Resumo:', summary)
} catch (error) {
  console.error('Erro ao obter resumo:', error)
}

// Processar pagamento
try {
  const processed = await expenseService.processExpensePayment(1)
  console.log('Pagamento processado:', processed)
} catch (error) {
  console.error('Erro ao processar pagamento:', error)
}
