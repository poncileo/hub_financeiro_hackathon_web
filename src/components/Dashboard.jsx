import { useState } from 'react'
import { formatValue } from '../utils/formatValue'
import { MdAccountBalance, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import FinancialResumeCard from './FinancialResumeCard'
import PortfolioChart from './PortfolioChart'
import TransactionsList from './TransactionsList'
import './Dashboard.css'

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isValuesVisible, setIsValuesVisible] = useState(true);

  const toggleVisibility = () => {
    setIsValuesVisible(!isValuesVisible);
  }

  const financialData = [
    {
      title: 'Saldo Total',
      type: 'balance',
      value: 'R$ 125.450,00',
      change: '+12.5%',
      trend: 'up',
      icon: MdAccountBalance,
    },
    {
      title: 'Receitas do Mês',
      type: 'income',
      value: 'R$ 45.230,00',
      change: '+8.2%',
      trend: 'up',
      icon: MdAccountBalance,
    },
    {
      title: 'Despesas do Mês',
      type: 'expense',
      value: 'R$ 18.750,00',
      change: '-3.1%',
      trend: 'down',
      icon: MdAccountBalance,
    },
    {
      title: 'Investimentos',
      value: 'R$ 89.200,00',
      change: '+15.3%',
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
        <h2>Visão Geral</h2>
        <div className="header-actions">
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
          <div className="period-selector">
            <button
              className={selectedPeriod === 'week' ? 'active' : ''}
              onClick={() => setSelectedPeriod('week')}
            >
              Semana
            </button>
            <button
              className={selectedPeriod === 'month' ? 'active' : ''}
              onClick={() => setSelectedPeriod('month')}
            >
              Mês
            </button>
            <button
              className={selectedPeriod === 'year' ? 'active' : ''}
              onClick={() => setSelectedPeriod('year')}
            >
              Ano
            </button>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {financialData.map((card, index) => (
          <FinancialResumeCard key={index} {...card} isValueVisible={isValuesVisible} />
        ))}
      </div>

      <div className="expenses-control-card">
        <div className="expenses-header">
          <h3>Controle de Gastos</h3>
          <span className="expenses-period">Este mês</span>
        </div>
        <div className="expenses-progress">
          <div className="progress-info">
            <span className="progress-label">Gastos</span>
            <span className="progress-value">
              {isValuesVisible ? formatValue(monthlyExpenses) : '••••••'} / {isValuesVisible ? formatValue(monthlyBudget) : '••••••'}
            </span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${Math.min(expensesPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="progress-footer">
            <span className={`remaining-budget ${remainingBudget < 0 ? 'negative' : ''}`}>
              {remainingBudget >= 0 ? 'Restante: ' : 'Excedido: '}
              {isValuesVisible ? formatValue(Math.abs(remainingBudget)) : '••••••'}
            </span>
            <span className="expenses-percentage">{expensesPercentage.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <PortfolioChart />
        </div>
        <div className="transactions-section">
          <TransactionsList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard


