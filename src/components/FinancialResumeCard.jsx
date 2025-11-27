import { Link } from 'react-router-dom'
import { formatValue } from '../utils/formatValue'
import { MdArrowForward } from 'react-icons/md'
import './FinancialResumeCard.css'

function FinancialResumeCard({ title, type, value, isValueVisible, change, trend, icon: Icon }) {

  return (
    <div className="financial-card">
      <div className="card-header">
        <span className="card-icon">
          <Icon />
        </span>
        <span className="card-title">{title}</span>
      </div>
      <div className="card-value">
        {isValueVisible ? formatValue(value) : '••••••'}
      </div>
      {isValueVisible ? (
        <div className={`card-change ${trend}`}>
          <>
            <span className="change-arrow">
              {trend === 'up' ? '↑' : '↓'}
            </span>
            {change}
          </>
        </div>
      ) : (
        null
      )}
      {type === 'balance' && (
        <div className="card-action">
          <Link to="/extrato" className="view-extract-button">
            Ver extrato
            <MdArrowForward />
          </Link>
        </div>
      )}
    </div>
  )
}

export default FinancialResumeCard


