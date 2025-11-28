import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import goalsService from '../services/goalsService'
import '../styles/CreateGoal.css'

function CreateGoal() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: 'savings',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        name: formData.name,
        targetAmount: Number(formData.targetAmount),
        targetDate: formData.targetDate,
        category: formData.category,
        description: formData.description,
      }

      await goalsService.createGoal(payload)
      // navigate back to dashboard after creation
      navigate('/')
    } catch (error) {
      console.error('Error creating goal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-goal-container">
      <div className="create-goal-header">
        <h1>Nova Meta de Poupança</h1>
      </div>

      <form className="create-goal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome da Meta *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Viagem para Paris"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Valor Alvo (R$) *</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetDate">Data Alvo *</label>
          <input
            type="date"
            id="targetDate"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="savings">Poupança</option>
            <option value="travel">Viagem</option>
            <option value="home">Casa</option>
            <option value="education">Educação</option>
            <option value="car">Carro</option>
            <option value="emergency">Fundo de Emergência</option>
            <option value="other">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição (Opcional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Adicione uma descrição para sua meta..."
            rows="3"
          />
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
            {loading ? 'Criando...' : 'Criar Meta'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateGoal
