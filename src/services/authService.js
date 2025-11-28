import apiCall from './api'

// Serviço de Autenticação
const authService = {
  // Login do usuário
  login: async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    return response
  },

  // Signup (registro de novo usuário)
  signup: async (name, email, password) => {
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })

    if (response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }

    return response
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Atualizar token
  refreshToken: async () => {
    const response = await apiCall('/auth/refresh', {
      method: 'POST',
    })

    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    return response
  },
}

export default authService
