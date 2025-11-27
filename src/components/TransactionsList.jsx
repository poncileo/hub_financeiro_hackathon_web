import { formatValue } from '../utils/formatValue'
import { MdAttachMoney, MdMoneyOff, MdTrendingUp, MdCreditCard } from 'react-icons/md'
import './TransactionsList.css'

function TransactionsList() {  
  const transactions = [
    {
      id: 1,
      description: 'Salário',
      category: 'Receita',
      amount: 8500.00,
      date: '2024-01-15',
      type: 'income',
    },
    {
      id: 2,
      description: 'Supermercado',
      category: 'Alimentação',
      amount: -450.00,
      date: '2024-01-14',
      type: 'expense',
    },
    {
      id: 3,
      description: 'Investimento em Ações',
      category: 'Investimento',
      amount: 2000.00,
      date: '2024-01-13',
      type: 'investment',
    },
    {
      id: 4,
      description: 'Conta de Luz',
      category: 'Utilidades',
      amount: -180.00,
      date: '2024-01-12',
      type: 'expense',
    },
    {
      id: 5,
      description: 'Freelance',
      category: 'Receita',
      amount: 1200.00,
      date: '2024-01-11',
      type: 'income',
    },
  ]

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'income':
        return <MdAttachMoney />
      case 'expense':
        return <MdMoneyOff />
      case 'investment':
        return <MdTrendingUp />
      default:
        return <MdCreditCard />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
  }

  return (
    <div className="transactions-list">
      <div className="transactions-header">
        <h3>Transações Recentes</h3>
        <button className="view-all-button">Ver todas</button>
      </div>
      <div className="transactions-items">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="transaction-details">
              <div className="transaction-description">
                {transaction.description}
              </div>
              <div className="transaction-meta">
                <span className="transaction-category">{transaction.category}</span>
                <span className="transaction-date">{formatDate(transaction.date)}</span>
              </div>
            </div>
            <div className={`transaction-amount ${transaction.type}`}>
                {transaction.amount > 0 ? '+' : ''}
                {formatValue(Math.abs(transaction.amount))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionsList


