import apiCall from './api'

// Serviço de Despesas (Expenses)
const expenseService = {
  // Listar todas as despesas do usuário
  getExpenses: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString()
    return await apiCall(`/expenses${queryParams ? '?' + queryParams : ''}`, {
      method: 'GET',
    })
  },

  // Listar apenas despesas recorrentes
  getRecurringExpenses: async () => {
    return await apiCall('/expenses/recurring', {
      method: 'GET',
    })
  },

  // Listar apenas despesas ativas
  getActiveExpenses: async () => {
    return await apiCall('/expenses/active', {
      method: 'GET',
    })
  },

  // Obter detalhes de uma despesa
  getExpenseDetails: async (expenseId) => {
    return await apiCall(`/expenses/${expenseId}`, {
      method: 'GET',
    })
  },

  // Criar nova despesa
  createExpense: async (expenseData) => {
    return await apiCall('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    })
  },

  // Atualizar despesa
  updateExpense: async (expenseId, expenseData) => {
    return await apiCall(`/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(expenseData),
    })
  },

  // Deletar despesa
  deleteExpense: async (expenseId) => {
    return await apiCall(`/expenses/${expenseId}`, {
      method: 'DELETE',
    })
  },

  // Ativar/Desativar despesa recorrente
  toggleExpenseStatus: async (expenseId, isActive) => {
    return await apiCall(`/expenses/${expenseId}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    })
  },

  // Obter despesas por data de execução
  getExpensesByExecutionDate: async (startDate, endDate) => {
    return await apiCall('/expenses/execution-date', {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
    })
  },

  // Obter despesas por status
  getExpensesByStatus: async (status) => {
    return await apiCall(`/expenses/status/${status}`, {
      method: 'GET',
    })
  },

  // Obter resumo de despesas
  getExpenseSummary: async () => {
    return await apiCall('/expenses/summary', {
      method: 'GET',
    })
  },

  // Processar pagamento de despesa pendente
  processExpensePayment: async (expenseId) => {
    return await apiCall(`/expenses/${expenseId}/process`, {
      method: 'POST',
    })
  },
}

export default expenseService
