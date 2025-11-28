import apiCall from './api'

// Lista global mockada de transações (temporária até integração com API real)
let transactionsTemp = [
  {
    "id": 1,
    "type": "CREDIT",
    "date": "2025-11-28T10:30:00.000Z",
    "amount": 500.00,
    "details": "Salário mensal",
    "userId": 1,
    "category": "OTHER",
    "createdAt": "2025-11-28T10:30:00.000Z",
    "updatedAt": "2025-11-28T10:30:00.000Z"
  },
  {
    "id": 2,
    "type": "DEBIT",
    "date": "2025-11-28T11:15:00.000Z",
    "amount": 50.00,
    "details": "Compra no supermercado",
    "userId": 1,
    "category": "FOOD",
    "createdAt": "2025-11-28T11:15:00.000Z",
    "updatedAt": "2025-11-28T11:15:00.000Z"
  },
  {
    "id": 3,
    "type": "DEBIT",
    "date": "2025-11-28T12:00:00.000Z",
    "amount": 100.00,
    "details": "Transferência PIX para maria@example.com",
    "userId": 1,
    "category": "OTHER",
    "createdAt": "2025-11-28T12:00:00.000Z",
    "updatedAt": "2025-11-28T12:00:00.000Z"
  }
]

// Serviço de Transações
const transactionService = {
  // Obter lista mockada de transações
  getAllTransactions: () => {
    return transactionsTemp
  },

  // Listar todas as transações do usuário
  // Endpoint: GET /transactions/me
  getTransactions: async (filters = {}) => {
    try {
      // Buscar da API real
      const transactions = await apiCall('/transactions/me', {
        method: 'GET',
      })
      
      // Aplicar filtros no frontend (já que a API retorna todas)
      let filtered = Array.isArray(transactions) ? transactions : []
      
      if (filters.type) {
        filtered = filtered.filter(t => t.type === filters.type)
      }
      if (filters.category) {
        filtered = filtered.filter(t => t.category === filters.category)
      }
      if (filters.q) {
        const searchTerm = filters.q.toLowerCase()
        filtered = filtered.filter(t => 
          (t.details && t.details.toLowerCase().includes(searchTerm)) ||
          (t.category && t.category.toLowerCase().includes(searchTerm))
        )
      }
      
      return filtered
    } catch (error) {
      // Fallback para lista mockada em caso de erro
      console.warn('Erro ao buscar transações da API, usando dados mockados:', error)
      let transactions = transactionService.getAllTransactions()
      
      if (filters.type) {
        transactions = transactions.filter(t => t.type === filters.type)
      }
      if (filters.category) {
        transactions = transactions.filter(t => t.category === filters.category)
      }
      if (filters.q) {
        const searchTerm = filters.q.toLowerCase()
        transactions = transactions.filter(t => 
          (t.details && t.details.toLowerCase().includes(searchTerm)) ||
          (t.category && t.category.toLowerCase().includes(searchTerm))
        )
      }
      
      return transactions
    }
  },

  // Obter transações por intervalo de datas
  getTransactionsByDateRange: async (startDate, endDate) => {
    return await apiCall('/transactions/date-range', {
      method: 'POST',
      body: JSON.stringify({ startDate, endDate }),
    })
  },

  // Obter transações por categoria
  getTransactionsByCategory: async (category) => {
    return await apiCall(`/transactions/category/${category}`, {
      method: 'GET',
    })
  },

  // Obter detalhes de uma transação específica
  getTransactionDetails: async (transactionId) => {
    return await apiCall(`/transactions/${transactionId}`, {
      method: 'GET',
    })
  },

  // Criar transação (débito/crédito)
  createTransaction: async (transactionData) => {
    return await apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    })
  },

  // Enviar PIX para outro usuário
  // Endpoint: POST /transfers/pix
  sendPix: async (toPixKey, amount, description = '') => {
    return await apiCall('/transfers/pix', {
      method: 'POST',
      body: JSON.stringify({ 
        toPixKey, 
        amount, 
        description
      }),
    })
  },

  // Gerar QR Code para receber PIX
  generatePixQrCode: async (amount) => {
    return await apiCall('/pix/qr-code', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    })
  },

  // Obter resumo das transações (últimas, totais, etc)
  getTransactionSummary: async () => {
    return await apiCall('/transactions/summary', {
      method: 'GET',
    })
  },
}

export default transactionService
