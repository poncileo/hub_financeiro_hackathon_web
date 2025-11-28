import apiCall from './api'

// Serviço de Transações
const transactionService = {
  // Listar todas as transações do usuário
  getTransactions: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString()
    return await apiCall(`/transactions${queryParams ? '?' + queryParams : ''}`, {
      method: 'GET',
    })
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
  sendPix: async (recipientPixKey, amount, description = '') => {
    return await apiCall('/transactions/pix/send', {
      method: 'POST',
      body: JSON.stringify({ 
        recipientPixKey, 
        amount, 
        description,
        type: 'DEBIT',
        category: 'OTHER'
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
