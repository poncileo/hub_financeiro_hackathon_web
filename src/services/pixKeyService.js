import apiCall from './api'

// Serviço de Chaves PIX
const pixKeyService = {
  // Listar todas as chaves PIX do usuário
  getPixKeys: async () => {
    return await apiCall('/pix-keys', {
      method: 'GET',
    })
  },

  // Cadastrar nova chave PIX
  // Endpoint: POST /users/{userId}/pix
  registerPixKey: async (userId, type, key) => {
    return await apiCall(`/users/${userId}/pix`, {
      method: 'POST',
      body: JSON.stringify({ type, key }),
    })
  },

  // Deletar chave PIX
  // Endpoint: DELETE /users/{userId}/pix/{key}
  deletePixKey: async (userId, key) => {
    // Codificar a chave para URL
    const encodedKey = encodeURIComponent(key)
    return await apiCall(`/users/${userId}/pix/${encodedKey}`, {
      method: 'DELETE',
    })
  },

  // Buscar usuário por chave PIX (para enviar PIX)
  // Endpoint: GET /users/pix/{key}
  findUserByPixKey: async (pixKey) => {
    // Codificar a chave para URL
    const encodedKey = encodeURIComponent(pixKey)
    return await apiCall(`/users/pix/${encodedKey}`, {
      method: 'GET',
    })
  },

  // Validar se a chave PIX já está registrada
  validatePixKey: async (type, key) => {
    return await apiCall('/pix-keys/validate', {
      method: 'POST',
      body: JSON.stringify({ type, key }),
    })
  },
}

export default pixKeyService
