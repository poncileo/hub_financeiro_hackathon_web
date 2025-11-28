import { useState, useEffect } from 'react'
import { formatValue } from '../utils/formatValue'
import PortfolioChart from './PortfolioChart'
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

  const categories = ['Todas', ...Array.from(new Set(transactions.map(t => t.category)))] 

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)

      try {
        const filters = {}
        if (filterType && filterType !== 'all') filters.type = filterType
        if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== 'Todas') filters.category = categoryFilter
        if (searchTerm) filters.q = searchTerm

        const data = await transactionService.getTransactions(filters)
        // expect data to be an array of transactions
        setTransactions(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Erro ao buscar transações', err)
        setError('Não foi possível carregar transações')
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
    .filter(t => categoryFilter === 'all' || categoryFilter === 'Todas' || t.category === categoryFilter)
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

      <div className="extrato-table">
        <div className="table-header">
          <div className="table-col date">Data</div>
          <div className="table-col description">Descrição</div>
          <div className="table-col category">Categoria</div>
          <div className="table-col amount">Valor</div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Extrato


