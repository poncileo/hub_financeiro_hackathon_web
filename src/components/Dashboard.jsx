import { useState } from 'react'
import { formatValue } from '../utils/formatValue'
import { MdAccountBalance, MdVisibility, MdVisibilityOff, MdAdd } from 'react-icons/md'
import FinancialResumeCard from './FinancialResumeCard'
import TransactionsList from './TransactionsList'
import './Dashboard.css'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [isValuesVisible, setIsValuesVisible] = useState(true);

  const toggleVisibility = () => {
    setIsValuesVisible(!isValuesVisible);
  }

  const financialData = [
    {
      title: 'Saldo Total',
      type: 'balance',
      value: 'R$ 125.450,00',
      trend: 'up',
      icon: MdAccountBalance,
    },
  ]

  // Cálculo de gastos em tempo real
  const monthlyExpenses = 18750
  const monthlyBudget = 25000
  const expensesPercentage = (monthlyExpenses / monthlyBudget) * 100
  const remainingBudget = monthlyBudget - monthlyExpenses

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-actions">
          <h2>Visão Geral</h2>
          <button
            className="visibility-toggle"
            onClick={toggleVisibility}
            title={isValuesVisible ? 'Ocultar valores' : 'Mostrar valores'}
            aria-label={isValuesVisible ? 'Ocultar valores' : 'Mostrar valores'}
          >
            {isValuesVisible ? (
              <MdVisibility className="eye-icon" />
            ) : (
              <MdVisibilityOff className="eye-icon" />
            )}
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {financialData.map((card, index) => (
          <FinancialResumeCard key={index} {...card} isValueVisible={isValuesVisible} />
        ))}
      </div>

      <div className="dashboard-actions">
        <div className="savings-goal-card">
          <div className="savings-card-left">
            <h3>Cadastrar Despesa</h3>
            <p>Registre uma nova despesa ou pagamento recorrente</p>
          </div>
          <Link to="/create-goal" className="savings-card-action" aria-label="Cadastrar despesa">
            <MdAdd />
          </Link>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="transactions-section">
          <TransactionsList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


