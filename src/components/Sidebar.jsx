import { Link, useLocation } from 'react-router-dom'
import { 
  MdDashboard, 
  MdDescription, 
  MdSync, 
  MdCreditCard, 
  MdPayment,
  MdQrCode,
  MdWork, 
  MdTrendingUp, 
  MdSettings 
} from 'react-icons/md'
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  
  const menuItems = [
    { icon: MdDashboard, label: 'Dashboard', path: '/' },
    { icon: MdDescription, label: 'Extrato', path: '/extrato' },
    { icon: MdQrCode, label: 'PIX', path: '/pix' },
    { icon: MdPayment, label: 'Pagamentos', path: '/pagamentos' },
    { icon: MdSync, label: 'Transações Recorrentes', path: '/transacoes-recorrentes' },
    { icon: MdCreditCard, label: 'Empréstimos', path: '/pedido-emprestimo' },
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Hub Financeiro</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={index}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">
                  <item.icon />
                </span>
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

