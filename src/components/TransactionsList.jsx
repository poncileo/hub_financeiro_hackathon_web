import { useState, useEffect } from 'react'
import { formatValue } from '../utils/formatValue'
import { MdMoneyOff, MdSchedule, MdCheckCircle, MdCancel } from 'react-icons/md'
import expenseService from '../services/expenseService'
import './TransactionsList.css'

function TransactionsList() {  
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExpenses = () => {
      setLoading(true)
      setError(null)
      try {
        // Usar GetExpenses para obter a lista mockada
        const data = expenseService.GetExpenses()
        // Ordenar por data de execução (mais recentes primeiro) e limitar a 5
        const sortedExpenses = Array.isArray(data) 
          ? data.sort((a, b) => new Date(b.executionDate) - new Date(a.executionDate)).slice(0, 5)
          : []
        setExpenses(sortedExpenses)
      } catch (err) {
        console.error('Erro ao buscar despesas:', err)
        setError('Não foi possível carregar as despesas')
        setExpenses([])
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS':
        return <MdCheckCircle className="status-icon success" />
      case 'PENDING':
        return <MdSchedule className="status-icon pending" />
      default:
        return <MdCancel className="status-icon cancelled" />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'Pago'
      case 'PENDING':
        return 'Pendente'
      default:
        return 'Cancelado'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
  }

  if (loading) {
    return (
      <div className="transactions-list">
        <div className="transactions-header">
          <h3>Despesas Cadastradas</h3>
        </div>
        <div className="loading-message">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="transactions-list">
        <div className="transactions-header">
          <h3>Despesas Cadastradas</h3>
        </div>
        <div className="error-message">{error}</div>
      </div>
    )
  }

  return (
    <div className="transactions-list">
      <div className="transactions-header">
        <h3>Despesas Cadastradas</h3>
        <button className="view-all-button">Ver todas</button>
      </div>
      <div className="transactions-items">
        {expenses.length === 0 ? (
          <div className="empty-message">Nenhuma despesa cadastrada</div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="transaction-item">
              <div className="transaction-icon">
                <MdMoneyOff />
              </div>
              <div className="transaction-details">
                <div className="transaction-description">
                  {expense.description}
                </div>
                <div className="transaction-meta">
                  <span className="transaction-category">
                    {expense.isRecurringPayment ? 'Recorrente' : 'Única'}
                    {getStatusIcon(expense.status)}
                    <span className="status-label">{getStatusLabel(expense.status)}</span>
                  </span>
                  <span className="transaction-date">{formatDate(expense.executionDate)}</span>
                </div>
              </div>
              <div className="transaction-amount expense">
                -{formatValue(Math.abs(expense.amount))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TransactionsList


