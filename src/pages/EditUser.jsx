import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import userService from '../services/userService'
import { useAuth } from '../contexts/AuthContext'
import '../styles/EditUser.css'

function EditUser() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await userService.getProfile()
        if (profile) {
          setFormData({
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            cpf: profile.cpf || '',
            birthDate: profile.birthDate || '',
            address: profile.address || '',
            city: profile.city || '',
            state: profile.state || '',
            zipCode: profile.zipCode || '',
          })
        }
      } catch (err) {
        console.error('Erro ao carregar perfil', err)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Preparar dados para atualização (apenas campos permitidos pela API)
      const updateData = {
        name: formData.name,
        email: formData.email,
        // balance e creditScore podem ser atualizados se necessário
      }
      
      await userService.updateProfile(user?.id || 1, updateData)
      alert('Dados atualizados com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Error updating user:', error)
      alert(error.message || 'Erro ao atualizar dados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="edit-user-container">
      <div className="edit-user-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <MdArrowBack />
        </button>
        <h1>Editar Perfil</h1>
      </div>

      <form className="edit-user-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Dados Pessoais</h2>

          <div className="form-group">
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(11) 98765-4321"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="123.456.789-00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Data de Nascimento</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Endereço</h2>

          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Rua, Número, Complemento"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">Estado</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">CEP</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="01234-567"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
