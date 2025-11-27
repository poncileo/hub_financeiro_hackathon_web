import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MdMenu, MdNotifications } from 'react-icons/md'
import './Header.css'

function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        <MdMenu className="menu-icon" />
      </button>
      <div className="header-content">
        <h1 className="header-title">Hub Financeiro</h1>
        <div className="header-actions">
          <div className="notification-icon">
            <MdNotifications />
          </div>
          <div className="user-info">
            <div className="user-avatar">{user?.initials || 'U'}</div>
            <div className="user-menu">
              <span className="user-name">{user?.name || 'Usuário'}</span>
              <button className="logout-button" onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


