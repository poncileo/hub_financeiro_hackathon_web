import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import Extrato from './components/Extrato'
import Pix from './components/Pix'
import Pagamentos from './components/Pagamentos'
import TransacoesRecorrentes from './components/TransacoesRecorrentes'
import PedidoEmprestimo from './components/PedidoEmprestimo'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/extrato"
            element={
              <ProtectedRoute>
                <Extrato />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pix"
            element={
              <ProtectedRoute>
                <Pix />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pagamentos"
            element={
              <ProtectedRoute>
                <Pagamentos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transacoes-recorrentes"
            element={
              <ProtectedRoute>
                <TransacoesRecorrentes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedido-emprestimo"
            element={
              <ProtectedRoute>
                <PedidoEmprestimo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

