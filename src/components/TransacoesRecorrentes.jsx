import { useState } from 'react'
import './TransacoesRecorrentes.css'

function TransacoesRecorrentes() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    frequency: 'monthly',
    startDate: '',
    endDate: '',
  })

  const [recurringTransactions, setRecurringTransactions] = useState([
    {
      id: 1,
      description: 'Netflix',
      amount: -45.90,
      type: 'expense',
      category: 'Entretenimento',
      frequency: 'monthly',
      startDate: '2024-01-01',
      endDate: null,
      active: true,
    },
    {
      id: 2,
      description: 'Salário',
      amount: 8500.00,
      type: 'income',
      category: 'Receita',
      frequency: 'monthly',
      startDate: '2024-01-01',
      endDate: null,
      active: true,
    },
    {
      id: 3,
      description: 'Academia',
      amount: -120.00,
      type: 'expense',
      category: 'Saúde',
      frequency: 'monthly',
      startDate: '2024-01-01',
      endDate: null,
      active: true,
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTransaction = {
      id: recurringTransactions.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
      active: true,
    }
    setRecurringTransactions([...recurringTransactions, newTransaction])
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      frequency: 'monthly',
      startDate: '',
      endDate: '',
    })
    setShowForm(false)
  }

  const toggleActive = (id) => {
    setRecurringTransactions(transactions =>
      transactions.map(t =>
        t.id === id ? { ...t, active: !t.active } : t
      )
    )
  }

  const deleteTransaction = (id) => {
    setRecurringTransactions(transactions =>
      transactions.filter(t => t.id !== id)
    )
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getFrequencyLabel = (frequency) => {
    const labels = {
      daily: 'Diária',
      weekly: 'Semanal',
      monthly: 'Mensal',
      yearly: 'Anual',
    }
    return labels[frequency] || frequency
  }

  return (
    <div className="transacoes-recorrentes">
      <div className="page-header">
        <h1>Transações Recorrentes</h1>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancelar' : '+ Nova Transação Recorrente'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="recurring-form">
            <h2>Nova Transação Recorrente</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Netflix, Salário, etc."
                />
              </div>
              
              <div className="form-group">
                <label>Valor</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tipo</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </select>
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Entretenimento, Receita, etc."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Frequência</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  required
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                  <option value="yearly">Anual</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data de Início</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Data de Término (opcional)</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Salvar Transação
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="transactions-list">
        {recurringTransactions.map((transaction) => (
          <div key={transaction.id} className="recurring-card">
            <div className="card-main">
              <div className="card-info">
                <div className="card-header-info">
                  <h3>{transaction.description}</h3>
                  <span className={`status-toggle ${transaction.active ? 'active' : ''}`}>
                    {transaction.active ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
                <div className="card-details">
                  <span className="card-category">{transaction.category}</span>
                  <span className="card-separator">•</span>
                  <span className="card-frequency">{getFrequencyLabel(transaction.frequency)}</span>
                </div>
              </div>
              <div className="card-amount">
                <span className={`amount-value ${transaction.type}`}>
                  {transaction.amount > 0 ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="action-button toggle"
                onClick={() => toggleActive(transaction.id)}
              >
                {transaction.active ? 'Desativar' : 'Ativar'}
              </button>
              <button
                className="action-button delete"
                onClick={() => deleteTransaction(transaction.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransacoesRecorrentes


