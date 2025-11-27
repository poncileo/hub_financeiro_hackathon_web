import { useState } from 'react'
import { formatValue } from '../utils/formatValue'
import { MdQrCode, MdAccountBalance, MdSend, MdArrowDownward } from 'react-icons/md'
import './Pix.css'

function Pix() {
  const [activeTab, setActiveTab] = useState('send')
  const [formData, setFormData] = useState({
    pixKey: '',
    value: '',
    description: '',
  })
  const [qrCode, setQrCode] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendPix = (e) => {
    e.preventDefault()
    // Simulação de envio de PIX
    alert('PIX enviado com sucesso!')
    setFormData({ pixKey: '', value: '', description: '' })
  }

  const handleGenerateQrCode = () => {
    // Simulação de geração de QR Code
    setQrCode('QR_CODE_SIMULADO_123456')
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

            <button type="submit" className="pix-submit-button">
              Enviar PIX
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

