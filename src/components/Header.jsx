import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MdMenu, MdNotifications, MdArrowBack } from 'react-icons/md'
import './Header.css'

function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <header className="header">
      {location.pathname == '/' && (
      <button className="menu-button" onClick={onMenuClick}>
        <MdMenu className="menu-icon" />
      </button>
      )}
      {/* Back button visible on mobile when not on Dashboard */}
      {location.pathname !== '/' && (
        <button className="back-button" onClick={handleBack} aria-label="Voltar para o Dashboard">
          <MdArrowBack className="menu-icon" />
        </button>
      )}
      <div className="header-content">
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


