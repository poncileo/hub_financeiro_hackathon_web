import apiCall from './api'

// Serviço de Usuários
const userService = {
  // Obter perfil do usuário autenticado
  getProfile: async () => {
    return await apiCall('/users/profile', {
      method: 'GET',
    })
  },

  // Atualizar perfil do usuário
  updateProfile: async (userData) => {
    return await apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  // Obter saldo do usuário
  getBalance: async () => {
    return await apiCall('/users/balance', {
      method: 'GET',
    })
  },

  // Obter score de crédito
  getCreditScore: async () => {
    return await apiCall('/users/credit-score', {
      method: 'GET',
    })
  },

  // Obter configurações do usuário
  getConfiguration: async () => {
    return await apiCall('/users/configuration', {
      method: 'GET',
    })
  },

  // Atualizar configurações do usuário
  updateConfiguration: async (configuration) => {
    return await apiCall('/users/configuration', {
      method: 'PUT',
      body: JSON.stringify({ configuration }),
    })
  },

  // Obter informações públicas de um usuário (por email para PIX)
  getUserByEmail: async (email) => {
    return await apiCall(`/users/email/${email}`, {
      method: 'GET',
    })
  },
}

export default userService
