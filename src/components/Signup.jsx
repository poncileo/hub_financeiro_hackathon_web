import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MdWarning, MdCheckCircle } from 'react-icons/md'
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
  const [success, setSuccess] = useState('')
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

    if (formData.name.trim().length < 3) {
      setError('Nome deve ter pelo menos 3 caracteres')
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

    if (!formData.password) {
      setError('Senha é obrigatória')
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
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await signup(formData.name, formData.email, formData.password)
      setSuccess('Conta criada com sucesso! Redirecionando...')
      // A navegação será feita automaticamente pelo useEffect acima
    } catch (err) {
      console.error('Erro ao criar conta:', err)
      
      let errorMessage = 'Erro ao criar conta. Tente novamente.'
      
      if (err.message.includes('já existe')) {
        errorMessage = 'Este email já está cadastrado'
      } else if (err.message.includes('Email')) {
        errorMessage = 'Email inválido'
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.'
      } else {
        errorMessage = err.message || errorMessage
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <p>Carregando...</p>
        </div>
      </div>
    )
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
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="success-alert">
              <MdCheckCircle className="success-icon" />
              <span>{success}</span>
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
              autoComplete="name"
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
              autoComplete="email"
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
                autoComplete="new-password"
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
                autoComplete="new-password"
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
                <a href="#" onClick={(e) => e.preventDefault()} className="terms-link">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="#" onClick={(e) => e.preventDefault()} className="terms-link">
                  política de privacidade
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading || !formData.name || !formData.email || !formData.password}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
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

