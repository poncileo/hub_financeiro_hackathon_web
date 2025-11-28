import apiCall from './api'

// Serviço de Usuários
const userService = {
  // Obter perfil do usuário autenticado
  // Endpoint: GET /users/me
  getProfile: async () => {
    return await apiCall('/users/me', {
      method: 'GET',
    })
  },

  // Atualizar perfil do usuário
  // Endpoint: PUT /users/{userId}
  updateProfile: async (userId, userData) => {
    return await apiCall(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  // Buscar usuário por chave PIX
  // Endpoint: GET /users/pix/{key}
  getUserByPixKey: async (key) => {
    // Codificar a chave para URL (especialmente para emails e telefones)
    const encodedKey = encodeURIComponent(key)
    return await apiCall(`/users/pix/${encodedKey}`, {
      method: 'GET',
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
