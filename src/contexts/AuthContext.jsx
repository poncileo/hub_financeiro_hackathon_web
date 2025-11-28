import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verifica se há uma sessão ativa ao montar o componente
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user')
        const token = localStorage.getItem('authToken')

        if (savedUser && token) {
          // Valida o token tentando fazer uma requisição autenticada
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err)
        // Limpa dados inválidos
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await authService.login(email, password)
      
      setUser(response.user)
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response.user
    } catch (err) {
      const errorMessage = err.message || 'Erro ao fazer login'
      setError(errorMessage)
      throw err
    }
  }

  const signup = async (name, email, password) => {
    setError(null)
    try {
      const response = await authService.signup(name, email, password)
      
      setUser(response.user)
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response.user
    } catch (err) {
      const errorMessage = err.message || 'Erro ao fazer cadastro'
      setError(errorMessage)
      throw err
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    } finally {
      setUser(null)
      setError(null)
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    error,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

