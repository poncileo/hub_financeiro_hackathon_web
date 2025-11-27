import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulação de login - em produção, isso seria uma chamada à API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação simples (em produção, seria verificado no backend)
        if (email && password) {
          const userData = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            initials: email.split('@')[0].substring(0, 2).toUpperCase(),
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Email e senha são obrigatórios'))
        }
      }, 1000)
    })
  }

  const signup = (name, email, password) => {
    // Simulação de cadastro - em produção, isso seria uma chamada à API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validação simples (em produção, seria verificado no backend)
        if (name && email && password) {
          // Verifica se já existe um usuário com esse email (simulação)
          const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
          const userExists = existingUsers.some(u => u.email === email)
          
          if (userExists) {
            reject(new Error('Este email já está cadastrado'))
            return
          }

          // Cria novo usuário
          const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            initials: name.substring(0, 2).toUpperCase(),
            createdAt: new Date().toISOString(),
          }

          // Salva na lista de usuários (simulação)
          existingUsers.push(newUser)
          localStorage.setItem('users', JSON.stringify(existingUsers))

          // Faz login automático após cadastro
          setUser(newUser)
          localStorage.setItem('user', JSON.stringify(newUser))
          resolve(newUser)
        } else {
          reject(new Error('Todos os campos são obrigatórios'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
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

