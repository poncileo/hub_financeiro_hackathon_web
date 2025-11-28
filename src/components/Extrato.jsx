import { useState, useEffect } from 'react'
import ExtratoFilter from './ExtratoFilter'
import transactionService from '../services/transactionService'
import './Extrato.css'

function Extrato() {
  const [filterType, setFilterType] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mapeamento de categorias para português
  const categoryLabels = {
    'OTHER': 'Outros',
    'FOOD': 'Alimentação',
    'TRANSPORT': 'Transporte',
    'HEALTH': 'Saúde',
    'EDUCATION': 'Educação',
    'ENTERTAINMENT': 'Entretenimento',
    'SHOPPING': 'Compras',
    'BILLS': 'Contas',
    'INCOME': 'Renda'
  }

  const categories = ['Todas', ...Array.from(new Set(transactions.map(t => t.category).filter(Boolean)))] 

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)

      try {
        const filters = {}
        if (filterType && filterType !== 'all') {
          // Converter filtros internos para formato da API
          if (filterType === 'income') filters.type = 'CREDIT'
          else if (filterType === 'expense') filters.type = 'DEBIT'
          else filters.type = filterType
        }
        if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== 'Todas') filters.category = categoryFilter
        if (searchTerm) filters.q = searchTerm

        const data = await transactionService.getTransactions(filters)
        // expect data to be an array of transactions
        setTransactions(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Erro ao buscar transações', err)
        setError('Não foi possível carregar transações')
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [filterType, categoryFilter, searchTerm])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getCategoryLabel = (category) => {
    return categoryLabels[category] || category
  }

  const filteredTransactions = transactions
    .filter(t => {
      if (filterType === 'all') return true
      if (filterType === 'income') return t.type === 'CREDIT'
      if (filterType === 'expense') return t.type === 'DEBIT'
      return t.type === filterType
    })
    .filter(t => categoryFilter === 'all' || categoryFilter === 'Todas' || t.category === categoryFilter)
    .filter(t => 
      searchTerm === '' || 
      (t.details && t.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)

  const balance = totalIncome - totalExpense

  return (
    <div className="extrato">
      <div className="extrato-header">
        <h1>Extrato</h1>
        <ExtratoFilter
          filterType={filterType}
          setFilterType={setFilterType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      </div>

      {loading ? (
        <div className="extrato-loading">Carregando transações...</div>
      ) : error ? (
        <div className="extrato-error">{error}</div>
      ) : (
        <>
          {filteredTransactions.length > 0 && (
            <div className="extrato-summary">
              <div className="summary-item">
                <span className="summary-label">Total de Entradas:</span>
                <span className="summary-value income">{formatCurrency(totalIncome)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total de Saídas:</span>
                <span className="summary-value expense">{formatCurrency(totalExpense)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Saldo:</span>
                <span className={`summary-value ${balance >= 0 ? 'income' : 'expense'}`}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
          )}

          <div className="extrato-table">
            <div className="table-header">
              <div className="table-col date">Data</div>
              <div className="table-col description">Descrição</div>
              <div className="table-col category">Categoria</div>
              <div className="table-col amount">Valor</div>
            </div>
            <div className="table-body">
              {filteredTransactions.length === 0 ? (
                <div className="table-empty">Nenhuma transação encontrada</div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="table-row">
                    <div className="table-col date">{formatDate(transaction.date)}</div>
                    <div className="table-col description">{transaction.details || '-'}</div>
                    <div className="table-col category">{getCategoryLabel(transaction.category)}</div>
                    <div className={`table-col amount ${transaction.type === 'CREDIT' ? 'income' : 'expense'}`}>
                      {transaction.type === 'CREDIT' ? '+' : '-'}
                      {formatCurrency(Math.abs(transaction.amount || 0))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Extrato


