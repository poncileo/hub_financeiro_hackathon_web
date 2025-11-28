import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import expenseService from '../services/expenseService'
import { useAuth } from '../contexts/AuthContext'
import '../styles/CreateGoal.css'

function CreateGoal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    executionDate: '',
    isRecurringPayment: false,
    isActive: true
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        userId: user?.id || 1, // Usar ID do usuário logado ou 1 como padrão
        description: formData.description,
        amount: Number(formData.amount),
        executionDate: formData.executionDate,
        isRecurringPayment: formData.isRecurringPayment,
        isActive: formData.isActive,
        status: 'PENDING'
      }

      // Criar despesa (adiciona à lista mockada)
      await expenseService.createExpense(payload)
      
      // Navegar de volta para o dashboard após criação
      navigate('/')
    } catch (error) {
      console.error('Erro ao criar despesa:', error)
      alert('Erro ao criar despesa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-goal-container">
      <div className="create-goal-header">
        <h1>Nova Despesa</h1>
      </div>

      <form className="create-goal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descrição *</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Conta de luz, Aluguel mensal"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor (R$) *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="executionDate">Data de Execução *</label>
          <input
            type="date"
            id="executionDate"
            name="executionDate"
            value={formData.executionDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isRecurringPayment" className="checkbox-label">
            <input
              type="checkbox"
              id="isRecurringPayment"
              name="isRecurringPayment"
              checked={formData.isRecurringPayment}
              onChange={handleChange}
            />
            <span>Pagamento Recorrente</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="isActive" className="checkbox-label">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <span>Ativo</span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Despesa'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateGoal
