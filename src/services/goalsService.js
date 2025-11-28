import apiCall from './api'

// Serviço de Metas (Goals)
const goalsService = {
  // Criar nova meta
  createGoal: async (goalData) => {
    return await apiCall('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    })
  },

  // Listar metas do usuário
  getGoals: async () => {
    return await apiCall('/goals', {
      method: 'GET',
    })
  },

  // Obter detalhes de uma meta
  getGoal: async (goalId) => {
    return await apiCall(`/goals/${goalId}`, {
      method: 'GET',
    })
  },
}

export default goalsService
