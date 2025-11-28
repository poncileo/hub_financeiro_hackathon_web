import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { MdWarning, MdCheckCircle } from 'react-icons/md'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redireciona se já está autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email é obrigatório')
      return false
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido')
      return false
    }

    if (!password) {
      setError('Senha é obrigatória')
      return false
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
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
      await login(email, password)
      setSuccess('Login realizado com sucesso! Redirecionando...')
      // A navegação será feita automaticamente pelo useEffect acima
    } catch (err) {
      console.error('Erro ao fazer login:', err)
      
      // Trata diferentes tipos de erro
      let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.'
      
      if (err.message.includes('Email ou senha inválidos')) {
        errorMessage = 'Email ou senha inválidos'
      } else if (err.message.includes('não pode ser vazio')) {
        errorMessage = 'Email e senha são obrigatórios'
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (error) setError('')
  }

  if (authLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <h1>Hub Financeiro</h1>
          </div>
          <p className="login-subtitle">Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="seu@email.com"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
              autoComplete="current-password"
            />
          </div>

          <div className="form-options">
            <a href="#" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || !email || !password}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem uma conta?{' '}
            <Link to="/signup" className="signup-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      <div className="login-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Login

