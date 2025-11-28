import apiCall from './api'

// Lista global mockada de despesas (temporária até integração com API real)
let expensesTemp = []

// Serviço de Despesas (Expenses)
const expenseService = {
  // Adicionar despesa à lista mockada
  addExpenseToTemp: (expenseData) => {
    const newExpense = {
      id: expensesTemp.length > 0 ? Math.max(...expensesTemp.map(e => e.id)) + 1 : 1,
      userId: expenseData.userId || 1,
      isRecurringPayment: expenseData.isRecurringPayment || false,
      isActive: expenseData.isActive !== undefined ? expenseData.isActive : true,
      amount: expenseData.amount,
      description: expenseData.description,
      executionDate: expenseData.executionDate,
      status: expenseData.status || 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    expensesTemp.push(newExpense)
    return newExpense
  },

  // Obter lista mockada de despesas
  GetExpenses: () => {
    return expensesTemp
  },
  // Listar todas as despesas do usuário
  // Endpoint: GET /expenses/me
  getExpenses: async (filters = {}) => {
    try {
      // Buscar da API real
      const expenses = await apiCall('/expenses/me', {
        method: 'GET',
      })
      
      // Aplicar filtros no frontend (já que a API retorna todas)
      let filtered = Array.isArray(expenses) ? expenses : []
      
      if (filters.status) {
        filtered = filtered.filter(e => e.status === filters.status)
      }
      if (filters.isActive !== undefined) {
        filtered = filtered.filter(e => e.isActive === (filters.isActive === 'true'))
      }
      if (filters.isRecurringPayment !== undefined) {
        filtered = filtered.filter(e => e.isRecurringPayment === (filters.isRecurringPayment === 'true'))
      }
      
      return filtered
    } catch (error) {
      // Fallback para lista mockada em caso de erro
      console.warn('Erro ao buscar despesas da API, usando dados mockados:', error)
      let expenses = expenseService.GetExpenses()
      
      if (filters.status) {
        expenses = expenses.filter(e => e.status === filters.status)
      }
      if (filters.isActive !== undefined) {
        expenses = expenses.filter(e => e.isActive === (filters.isActive === 'true'))
      }
      if (filters.isRecurringPayment !== undefined) {
        expenses = expenses.filter(e => e.isRecurringPayment === (filters.isRecurringPayment === 'true'))
      }
      
      return expenses
    }
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
  // Endpoint: POST /expenses
  createExpense: async (expenseData) => {
    try {
      // Preparar payload (remover userId, pois é obtido do token)
      const payload = {
        isRecurringPayment: expenseData.isRecurringPayment || false,
        isActive: expenseData.isActive !== undefined ? expenseData.isActive : true,
        amount: expenseData.amount,
        description: expenseData.description,
        executionDate: expenseData.executionDate,
        status: expenseData.status || 'PENDING'
      }
      
      // Criar na API real
      const newExpense = await apiCall('/expenses', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      
      return newExpense
    } catch (error) {
      // Fallback para lista mockada em caso de erro
      console.warn('Erro ao criar despesa na API, usando lista mockada:', error)
      const newExpense = expenseService.addExpenseToTemp(expenseData)
      return newExpense
    }
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
