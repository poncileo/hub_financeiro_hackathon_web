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
  registerPixKey: async (type, key) => {
    return await apiCall('/pix-keys', {
      method: 'POST',
      body: JSON.stringify({ type, key }),
    })
  },

  // Deletar chave PIX
  deletePixKey: async (pixKeyId) => {
    return await apiCall(`/pix-keys/${pixKeyId}`, {
      method: 'DELETE',
    })
  },

  // Buscar usuário por chave PIX (para enviar PIX)
  findUserByPixKey: async (pixKey) => {
    return await apiCall('/pix-keys/find', {
      method: 'POST',
      body: JSON.stringify({ pixKey }),
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
