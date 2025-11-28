// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

// Função auxiliar para fazer requisições
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Erro na requisição: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Erro na requisição para ${endpoint}:`, error)
    throw error
  }
}

export default apiCall
