import { useState } from 'react'
import { formatValue } from '../utils/formatValue'
import { 
  MdCreditCard, 
  MdReceipt, 
  MdAccountBalance, 
  MdPhone, 
  MdLightbulb,
  MdShoppingCart 
} from 'react-icons/md'
import './Pagamentos.css'

function Pagamentos() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const paymentCategories = [
    { id: 'bills', icon: MdReceipt, label: 'Contas', color: '#EF4444' },
    { id: 'cards', icon: MdCreditCard, label: 'Cartões', color: '#3B82F6' },
    { id: 'phone', icon: MdPhone, label: 'Recarga', color: '#10B981' },
    { id: 'shopping', icon: MdShoppingCart, label: 'Compras', color: '#F59E0B' },
  ]

  const bills = [
    { id: 1, name: 'Conta de Luz', dueDate: '2024-01-20', value: 180.50, paid: false },
    { id: 2, name: 'Internet', dueDate: '2024-01-22', value: 99.90, paid: false },
    { id: 3, name: 'Água', dueDate: '2024-01-25', value: 65.00, paid: false },
    { id: 4, name: 'Netflix', dueDate: '2024-01-15', value: 45.90, paid: true },
  ]

  const handlePayBill = (billId) => {
    // Simulação de pagamento
    alert(`Conta "${bills.find(b => b.id === billId)?.name}" paga com sucesso!`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
  }

  const getDaysUntilDue = (dateString) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="pagamentos-container">
      <div className="pagamentos-header">
        <h1>Pagamentos</h1>
        <p className="pagamentos-subtitle">Pague suas contas e gerencie pagamentos</p>
      </div>

      <div className="payment-categories">
        {paymentCategories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <Icon />
              <span>{category.label}</span>
            </button>
          )
        })}
      </div>

      <div className="bills-section">
        <div className="section-header">
          <h2>Contas a Pagar</h2>
          <span className="bills-count">{bills.filter(b => !b.paid).length} pendentes</span>
        </div>

        <div className="bills-list">
          {bills
            .filter(bill => selectedCategory === 'all' || !bill.paid)
            .map((bill) => {
              const daysUntilDue = getDaysUntilDue(bill.dueDate)
              const isOverdue = daysUntilDue < 0
              const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

              return (
                <div key={bill.id} className={`bill-card ${bill.paid ? 'paid' : ''} ${isOverdue ? 'overdue' : ''} ${isDueSoon ? 'due-soon' : ''}`}>
                  <div className="bill-info">
                    <div className="bill-header">
                      <h3>{bill.name}</h3>
                      {bill.paid && <span className="paid-badge">Paga</span>}
                    </div>
                    <div className="bill-details">
                      <span className="bill-date">
                        Vencimento: {formatDate(bill.dueDate)}
                        {!bill.paid && (
                          <span className={`days-badge ${isOverdue ? 'overdue' : isDueSoon ? 'warning' : ''}`}>
                            {isOverdue ? `${Math.abs(daysUntilDue)} dias atrasado` : 
                             isDueSoon ? `Vence em ${daysUntilDue} dias` : 
                             `${daysUntilDue} dias restantes`}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="bill-actions">
                    <div className="bill-value">
                      {formatValue(bill.value)}
                    </div>
                    {!bill.paid && (
                      <button 
                        className="pay-button"
                        onClick={() => handlePayBill(bill.id)}
                      >
                        Pagar
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-card">
            <MdPhone />
            <span>Recarga de Celular</span>
          </button>
          <button className="quick-action-card">
            <MdLightbulb />
            <span>Conta de Energia</span>
          </button>
          <button className="quick-action-card">
            <MdAccountBalance />
            <span>Boleto</span>
          </button>
          <button className="quick-action-card">
            <MdCreditCard />
            <span>Cartão de Crédito</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagamentos

