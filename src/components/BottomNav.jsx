import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { MdHome, MdList, MdAdd, MdQrCode, MdPerson, MdHomeFilled } from 'react-icons/md'
import './BottomNav.css'

function BottomNav() {

  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <MdHome />
      </Link>
      <Link to="/extrato" className="nav-item">
        <MdList />
      </Link>

      <Link to="/create-goal" className="nav-item nav-add">
        <MdAdd />
      </Link>

      <Link to="/pix" className="nav-item">
        <MdQrCode />
      </Link>
      <Link to="/perfil" className="nav-item">
        <MdPerson />
      </Link>
    </nav>
  )
}

export default BottomNav
