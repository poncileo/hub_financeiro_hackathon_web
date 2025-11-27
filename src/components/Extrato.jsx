import { useState } from 'react'
import { MdDownload, MdFilterList, MdSearch } from 'react-icons/md'
import './Extrato.css'

function Extrato() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Salário',
      category: 'Receita',
      amount: 8500.00,
      type: 'income',
      status: 'completed',
    },
    {
      id: 2,
      date: '2024-01-14',
      description: 'Supermercado',
      category: 'Alimentação',
      amount: -450.00,
      type: 'expense',
      status: 'completed',
    },
    {
      id: 3,
      date: '2024-01-13',
      description: 'Investimento em Ações',
      category: 'Investimento',
      amount: 2000.00,
      type: 'investment',
      status: 'completed',
    },
    {
      id: 4,
      date: '2024-01-12',
      description: 'Conta de Luz',
      category: 'Utilidades',
      amount: -180.00,
      type: 'expense',
      status: 'completed',
    },
    {
      id: 5,
      date: '2024-01-11',
      description: 'Freelance',
      category: 'Receita',
      amount: 1200.00,
      type: 'income',
      status: 'completed',
    },
    {
      id: 6,
      date: '2024-01-10',
      description: 'Netflix',
      category: 'Entretenimento',
      amount: -45.90,
      type: 'expense',
      status: 'completed',
    },
    {
      id: 7,
      date: '2024-01-09',
      description: 'Transferência Recebida',
      category: 'Transferência',
      amount: 500.00,
      type: 'income',
      status: 'completed',
    },
    {
      id: 8,
      date: '2024-01-08',
      description: 'Restaurante',
      category: 'Alimentação',
      amount: -120.00,
      type: 'expense',
      status: 'completed',
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const filteredTransactions = transactions
    .filter(t => filterType === 'all' || t.type === filterType)
    .filter(t => 
      searchTerm === '' || 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="extrato">
      <div className="extrato-header">
        <h1>Extrato</h1>
      <div className="extrato-controls">
        <div className="search-box">
          <MdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
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
        <button className="export-button">
          <MdDownload />
          Exportar
        </button>
      </div>
      </div>

      <div className="extrato-summary">
        <div className="summary-card">
          <span className="summary-label">Receitas</span>
          <span className="summary-value income">
            {formatCurrency(totalIncome)}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Despesas</span>
          <span className="summary-value expense">
            {formatCurrency(totalExpense)}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Saldo</span>
          <span className={`summary-value ${balance >= 0 ? 'income' : 'expense'}`}>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>

      <div className="extrato-filters">
        <button
          className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          <MdFilterList />
          Todas
        </button>
        <button
          className={`filter-button ${filterType === 'income' ? 'active' : ''}`}
          onClick={() => setFilterType('income')}
        >
          Receitas
        </button>
        <button
          className={`filter-button ${filterType === 'expense' ? 'active' : ''}`}
          onClick={() => setFilterType('expense')}
        >
          Despesas
        </button>
        <button
          className={`filter-button ${filterType === 'investment' ? 'active' : ''}`}
          onClick={() => setFilterType('investment')}
        >
          Investimentos
        </button>
      </div>

      <div className="extrato-table">
        <div className="table-header">
          <div className="table-col date">Data</div>
          <div className="table-col description">Descrição</div>
          <div className="table-col category">Categoria</div>
          <div className="table-col amount">Valor</div>
          <div className="table-col status">Status</div>
        </div>
        <div className="table-body">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="table-row">
              <div className="table-col date">{formatDate(transaction.date)}</div>
              <div className="table-col description">{transaction.description}</div>
              <div className="table-col category">{transaction.category}</div>
              <div className={`table-col amount ${transaction.type}`}>
                <>
                  {transaction.amount > 0 ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </>
              </div>
              <div className="table-col status">
                <span className={`status-badge ${transaction.status}`}>
                  {transaction.status === 'completed' ? 'Concluída' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Extrato


