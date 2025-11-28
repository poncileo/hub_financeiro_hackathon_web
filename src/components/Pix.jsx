import { useState } from 'react'
import { formatValue } from '../utils/formatValue'
import { MdQrCode, MdAccountBalance, MdSend, MdArrowDownward, MdAdd, MdDelete } from 'react-icons/md'
import transactionService from '../services/transactionService'
import pixKeyService from '../services/pixKeyService'
import { useAuth } from '../contexts/AuthContext'
import './Pix.css'

function Pix() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('send')
  const [formData, setFormData] = useState({
    pixKey: '',
    value: '',
    description: '',
  })
  const [registrationForm, setRegistrationForm] = useState({
    keyType: 'EMAIL',
    keyValue: '',
  })
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [pixKeys, setPixKeys] = useState([
    { id: 1, type: 'CPF', value: '123.456.789-00' },
    { id: 2, type: 'EMAIL', value: 'usuario@email.com' },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleRegisterPixKey = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    if (!registrationForm.keyValue && registrationForm.keyType !== 'RANDOM') {
      alert('Por favor, preencha a chave PIX')
      setLoading(false)
      return
    }

    try {
      const keyValue = registrationForm.keyType === 'RANDOM' ? generateRandomKey() : registrationForm.keyValue
      
      // Cadastrar chave PIX na API
      const response = await pixKeyService.registerPixKey(
        user?.id || 1,
        registrationForm.keyType,
        keyValue
      )
      
      // Atualizar lista local (a resposta da API contém as chaves atualizadas)
      if (response.pixKeys) {
        setPixKeys(response.pixKeys.map((key, index) => ({
          id: index + 1,
          type: key.type,
          value: key.key
        })))
      } else {
        // Fallback: adicionar à lista local
        const newKey = {
          id: Date.now(),
          type: registrationForm.keyType,
          value: keyValue,
        }
        setPixKeys([...pixKeys, newKey])
      }
      
      setRegistrationForm({ keyType: 'EMAIL', keyValue: '' })
      alert('Chave PIX cadastrada com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar chave PIX:', error)
      alert(error.message || 'Erro ao cadastrar chave PIX. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePixKey = async (keyValue) => {
    if (!confirm('Deseja remover esta chave PIX?')) {
      return
    }
    
    setLoading(true)
    try {
      await pixKeyService.deletePixKey(user?.id || 1, keyValue)
      // Remover da lista local
      setPixKeys(pixKeys.filter(key => key.value !== keyValue))
      alert('Chave PIX removida com sucesso!')
    } catch (error) {
      console.error('Erro ao remover chave PIX:', error)
      alert(error.message || 'Erro ao remover chave PIX. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendPix = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Validar chave PIX antes de enviar
      try {
        const recipient = await pixKeyService.findUserByPixKey(formData.pixKey)
        if (!recipient || !recipient.name) {
          alert('Chave PIX não encontrada. Verifique a chave e tente novamente.')
          setLoading(false)
          return
        }
        
        // Confirmar envio mostrando o nome do destinatário
        const confirmMessage = `Confirmar transferência de ${formatValue(Number(formData.value))} para ${recipient.name}?`
        if (!confirm(confirmMessage)) {
          setLoading(false)
          return
        }
      } catch (validationError) {
        if (validationError.message && validationError.message.includes('não encontrada')) {
          alert('Chave PIX não encontrada. Verifique a chave e tente novamente.')
          setLoading(false)
          return
        }
        // Se for outro erro, continuar tentando enviar (pode ser que a validação falhe mas o envio funcione)
      }
      
      // Enviar PIX via API
      const response = await transactionService.sendPix(
        formData.pixKey,
        Number(formData.value),
        formData.description || ''
      )
      
      alert('PIX enviado com sucesso!')
      setFormData({ pixKey: '', value: '', description: '' })
    } catch (error) {
      console.error('Erro ao enviar PIX:', error)
      alert(error.message || 'Erro ao enviar PIX. Verifique o saldo e a chave PIX.')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateQrCode = () => {
    // Simulação de geração de QR Code
    setQrCode('QR_CODE_SIMULADO_123456')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Chave copiada!')
  }

  const recentPix = [
    { id: 1, type: 'sent', name: 'João Silva', value: 150.00, date: '2024-01-15', time: '14:30' },
    { id: 2, type: 'received', name: 'Maria Santos', value: 500.00, date: '2024-01-15', time: '10:15' },
    { id: 3, type: 'sent', name: 'Pedro Costa', value: 75.50, date: '2024-01-14', time: '18:45' },
  ]

  return (
    <div className="pix-container">
      <div className="pix-header">
        <h1>PIX</h1>
        <p className="pix-subtitle">Envie e receba pagamentos instantâneos</p>
      </div>

      <div className="pix-balance-card">
        <div className="balance-info">
          <span className="balance-label">Saldo Disponível</span>
          <span className="balance-value">
            {formatValue(125450)}
          </span>
        </div>
        <button className="generate-qr-button" onClick={handleGenerateQrCode}>
          <MdQrCode />
          Gerar QR Code
        </button>
      </div>

      <div className="pix-tabs">
        <button
          className={`pix-tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          <MdSend />
          Enviar PIX
        </button>
        <button
          className={`pix-tab ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => setActiveTab('receive')}
        >
          <MdArrowDownward />
          Receber PIX
        </button>
        <button
          className={`pix-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          <MdAdd />
          Cadastrar Chave
        </button>
      </div>

      {activeTab === 'send' && (
        <div className="pix-form-section">
          <form onSubmit={handleSendPix} className="pix-form">
            <div className="form-group">
              <label>Chave PIX</label>
              <input
                type="text"
                name="pixKey"
                value={formData.pixKey}
                onChange={handleInputChange}
                placeholder="CPF, Email, Telefone ou Chave Aleatória"
                required
              />
            </div>

            <div className="form-group">
              <label>Valor</label>
              <div className="input-with-prefix">
                <span className="input-prefix">R$</span>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="0,00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição (opcional)</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ex: Pagamento de serviços"
              />
            </div>

            <button type="submit" className="pix-submit-button" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar PIX'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'receive' && (
        <div className="pix-receive-section">
          <div className="qr-code-display">
            {qrCode ? (
              <div className="qr-code-container">
                <div className="qr-code-placeholder">
                  <MdQrCode className="qr-icon" />
                  <p>QR Code gerado</p>
                  <span className="qr-code-value">{qrCode}</span>
                </div>
              </div>
            ) : (
              <div className="qr-code-empty">
                <MdQrCode className="qr-icon" />
                <p>Clique em "Gerar QR Code" para receber pagamentos</p>
              </div>
            )}
          </div>

          <div className="pix-keys-section">
            <h3>Minhas Chaves PIX</h3>
            <div className="pix-keys-list">
              <div className="pix-key-item">
                <MdAccountBalance />
                <div className="key-info">
                  <span className="key-type">CPF</span>
                  <span className="key-value">123.456.789-00</span>
                </div>
                <button className="copy-button">Copiar</button>
              </div>
              <div className="pix-key-item">
                <MdAccountBalance />
                <div className="key-info">
                  <span className="key-type">Email</span>
                  <span className="key-value">usuario@email.com</span>
                </div>
                <button className="copy-button">Copiar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'register' && (
        <div className="pix-register-section">
          <div className="register-form-card">
            <h3>Cadastrar Nova Chave PIX</h3>
            <form onSubmit={handleRegisterPixKey} className="pix-form">
              <div className="form-group">
                <label>Tipo de Chave</label>
                <select
                  name="keyType"
                  value={registrationForm.keyType}
                  onChange={handleRegistrationChange}
                  className="form-select"
                >
                  <option value="EMAIL">Email</option>
                  <option value="CPF">CPF</option>
                  <option value="PHONE">Telefone</option>
                  <option value="RANDOM">Chave Aleatória (Gerada)</option>
                </select>
              </div>

              {registrationForm.keyType !== 'RANDOM' && (
                <div className="form-group">
                  <label>
                    {registrationForm.keyType === 'EMAIL' && 'Email'}
                    {registrationForm.keyType === 'CPF' && 'CPF (XXX.XXX.XXX-XX)'}
                    {registrationForm.keyType === 'PHONE' && 'Telefone (+55 XX XXXXX-XXXX)'}
                  </label>
                  <input
                    type="text"
                    name="keyValue"
                    value={registrationForm.keyValue}
                    onChange={handleRegistrationChange}
                    placeholder={
                      registrationForm.keyType === 'EMAIL' ? 'seu@email.com' :
                      registrationForm.keyType === 'CPF' ? '123.456.789-00' :
                      registrationForm.keyType === 'PHONE' ? '+55 11 99999-9999' : ''
                    }
                    required={registrationForm.keyType !== 'RANDOM'}
                  />
                </div>
              )}

              {registrationForm.keyType === 'RANDOM' && (
                <div className="info-box">
                  <p>Uma chave aleatória será gerada automaticamente para você.</p>
                </div>
              )}

              <button type="submit" className="pix-submit-button" disabled={loading}>
                <MdAdd />
                {loading ? 'Cadastrando...' : 'Cadastrar Chave'}
              </button>
            </form>
          </div>

          <div className="registered-keys-card">
            <h3>Minhas Chaves PIX Cadastradas</h3>
            {pixKeys.length === 0 ? (
              <div className="empty-state">
                <p>Nenhuma chave PIX cadastrada ainda</p>
              </div>
            ) : (
              <div className="keys-list-register">
                {pixKeys.map((key) => (
                  <div key={key.id} className="key-item-register">
                    <div className="key-header">
                      <div className="key-type-badge">{key.type}</div>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeletePixKey(key.value)}
                        title="Remover chave"
                        disabled={loading}
                      >
                        <MdDelete />
                      </button>
                    </div>
                    <div className="key-value-register">{key.value}</div>
                    <button
                      type="button"
                      className="copy-button-register"
                      onClick={() => copyToClipboard(key.value)}
                    >
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="recent-pix-section">
        <h3>PIX Recentes</h3>
        <div className="recent-pix-list">
          {recentPix.map((pix) => (
            <div key={pix.id} className={`pix-item ${pix.type}`}>
              <div className="pix-item-icon">
                {pix.type === 'sent' ? <MdSend /> : <MdArrowDownward />}
              </div>
              <div className="pix-item-info">
                <span className="pix-item-name">{pix.name}</span>
                <span className="pix-item-date">{pix.date} às {pix.time}</span>
              </div>
              <div className={`pix-item-value ${pix.type}`}>
                {pix.type === 'sent' ? '-' : '+'}
                {formatValue(pix.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pix

