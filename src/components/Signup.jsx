import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MdWarning } from 'react-icons/md'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Limpa erro quando o usuário começa a digitar
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório')
      return false
    }

    if (!formData.email.trim()) {
      setError('Email é obrigatório')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido')
      return false
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return false
    }

    if (!formData.acceptTerms) {
      setError('Você deve aceitar os termos de uso')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await signup(formData.name, formData.email, formData.password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo">
            <h1>Hub Financeiro</h1>
          </div>
          <p className="signup-subtitle">Crie sua conta e comece a gerenciar suas finanças</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && (
            <div className="error-alert">
              <MdWarning className="error-icon" />
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
              />
              <span className="input-hint">Mínimo 6 caracteres</span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
              <span>
                Eu aceito os{' '}
                <a href="#" className="terms-link">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="#" className="terms-link">
                  política de privacidade
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="login-link">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      <div className="signup-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Signup

