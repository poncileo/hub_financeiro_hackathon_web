import { useState, useEffect } from 'react'
import { useCreditScore } from '../hooks/useCreditScore'
import './PedidoEmprestimo.css'

function PedidoEmprestimo() {
  const { creditScore, scoreInfo } = useCreditScore()
  const [formData, setFormData] = useState({
    amount: '',
    installments: '12',
    purpose: '',
    monthlyIncome: '',
    employmentStatus: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Ajusta valores iniciais quando o score é carregado
    if (scoreInfo && formData.installments) {
      const currentInstallments = parseInt(formData.installments) || 12
      
      if (currentInstallments > scoreInfo.maxInstallments) {
        setFormData(prev => ({ ...prev, installments: scoreInfo.maxInstallments.toString() }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const numValue = name === 'amount' || name === 'monthlyIncome' ? parseFloat(value) : value
    
    // Validação de valor máximo baseado no score
    if (name === 'amount' && scoreInfo && numValue > scoreInfo.maxAmount) {
      setErrors(prev => ({
        ...prev,
        amount: `Valor máximo permitido: R$ ${scoreInfo.maxAmount.toLocaleString('pt-BR')} baseado no seu score de crédito.`
      }))
      return
    }
    
    setErrors(prev => ({ ...prev, [name]: '' }))
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateInstallment = () => {
    const amount = parseFloat(formData.amount) || 0
    const installments = parseInt(formData.installments) || 12
    const interestRate = scoreInfo?.interestRate || 0.02
    const monthlyPayment = amount * (interestRate * Math.pow(1 + interestRate, installments)) / 
                          (Math.pow(1 + interestRate, installments) - 1)
    return monthlyPayment
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validações
    const amount = parseFloat(formData.amount) || 0
    const installments = parseInt(formData.installments) || 12
    
    if (scoreInfo && amount > scoreInfo.maxAmount) {
      setErrors({ amount: `Valor máximo permitido: R$ ${scoreInfo.maxAmount.toLocaleString('pt-BR')}` })
      return
    }
    
    if (scoreInfo && installments > scoreInfo.maxInstallments) {
      setErrors({ installments: `Máximo de ${scoreInfo.maxInstallments} parcelas permitidas para seu score.` })
      return
    }
    
    setSubmitted(true)
    // Aqui você faria a chamada à API
    setTimeout(() => {
      setSubmitted(false)
      alert('Pedido de empréstimo enviado com sucesso! Aguarde a análise.')
    }, 2000)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const installmentAmount = calculateInstallment()
  const totalAmount = installmentAmount * (parseInt(formData.installments) || 12)
  const interestRatePercent = scoreInfo ? (scoreInfo.interestRate * 100).toFixed(2) : '2.00'

  return (
    <div className="pedido-emprestimo">
      <div className="page-header">
        <h1>Solicitar Empréstimo</h1>
        <p className="page-subtitle">
          Preencha os dados abaixo para solicitar seu empréstimo
        </p>
      </div>

      {creditScore && scoreInfo && (
        <div className="credit-score-banner">
          <div className="score-info">
            <div className="score-display">
              <span className="score-label">Seu Score de Crédito</span>
              <span className="score-value" style={{ color: scoreInfo.color }}>
                {creditScore}
              </span>
              <span className="score-category" style={{ color: scoreInfo.color }}>
                {scoreInfo.label}
              </span>
            </div>
            <div className="score-description">
              <p>{scoreInfo.description}</p>
              <p className="score-limits">
                Limite máximo: R$ {scoreInfo.maxAmount.toLocaleString('pt-BR')} | 
                Taxa de juros: {interestRatePercent}% ao mês
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="loan-container">
        <div className="loan-form-section">
          <form onSubmit={handleSubmit} className="loan-form">
            <div className="form-section">
              <h2>Dados do Empréstimo</h2>
              
              <div className="form-group">
                <label>Valor Solicitado</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">R$</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="1000"
                    max={scoreInfo?.maxAmount || 100000}
                    step="100"
                    placeholder="0,00"
                  />
                </div>
                {errors.amount && (
                  <span className="error-message">{errors.amount}</span>
                )}
                <span className="input-hint">
                  Valor mínimo: R$ 1.000,00 | 
                  Máximo: R$ {scoreInfo ? scoreInfo.maxAmount.toLocaleString('pt-BR') : '100.000,00'} 
                  {scoreInfo && ` (baseado no seu score)`}
                </span>
              </div>

              <div className="form-group">
                <label>Número de Parcelas</label>
                <select
                  name="installments"
                  value={formData.installments}
                  onChange={handleInputChange}
                  required
                >
                  {[6, 12, 24, 36, 48].map(num => {
                    const maxInstallments = scoreInfo?.maxInstallments || 48
                    if (num > maxInstallments) return null
                    return (
                      <option key={num} value={num.toString()}>
                        {num} parcelas
                      </option>
                    )
                  })}
                </select>
                {errors.installments && (
                  <span className="error-message">{errors.installments}</span>
                )}
                {scoreInfo && (
                  <span className="input-hint">
                    Máximo de {scoreInfo.maxInstallments} parcelas permitidas para seu score
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Finalidade do Empréstimo</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="personal">Uso Pessoal</option>
                  <option value="home">Reforma/Construção</option>
                  <option value="vehicle">Compra de Veículo</option>
                  <option value="education">Educação</option>
                  <option value="debt">Quitar Dívidas</option>
                  <option value="other">Outros</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h2>Dados Pessoais</h2>
              
              <div className="form-group">
                <label>Renda Mensal</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">R$</span>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="100"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Situação Profissional</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="employed">Empregado CLT</option>
                  <option value="self-employed">Autônomo</option>
                  <option value="business">Empresário</option>
                  <option value="retired">Aposentado</option>
                  <option value="other">Outros</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-loan-button" disabled={submitted}>
                {submitted ? 'Enviando...' : 'Solicitar Empréstimo'}
              </button>
            </div>
          </form>
        </div>

        <div className="loan-summary-section">
          <div className="summary-card">
            <h3>Resumo da Proposta</h3>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-label">Valor Solicitado</span>
                <span className="summary-value">
                  {formData.amount ? formatCurrency(parseFloat(formData.amount)) : 'R$ 0,00'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Parcelas</span>
                <span className="summary-value">{formData.installments}x</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Valor da Parcela</span>
                <span className="summary-value highlight">
                  {formatCurrency(installmentAmount)}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total a Pagar</span>
                <span className="summary-value">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Taxa de Juros</span>
                <span className="summary-value" style={{ color: scoreInfo?.color }}>
                  {interestRatePercent}% ao mês
                </span>
              </div>
              {scoreInfo && (
                <div className="summary-item">
                  <span className="summary-label">Limite Disponível</span>
                  <span className="summary-value">
                    R$ {scoreInfo.maxAmount.toLocaleString('pt-BR')}
                  </span>
                </div>
              )}
            </div>
            <div className="summary-footer">
              <p className="disclaimer">
                * Valores calculados com base na taxa de juros de {interestRatePercent}% ao mês 
                (determinada pelo seu score de crédito de {creditScore || 'N/A'}).
                Valores finais sujeitos à análise de crédito.
              </p>
            </div>
          </div>

          <div className="benefits-card">
            <h3>Vantagens</h3>
            <ul className="benefits-list">
              <li>✓ Aprovação rápida</li>
              <li>✓ Sem necessidade de garantia</li>
              <li>✓ Parcelas fixas</li>
              <li>✓ Dinheiro na conta em até 24h</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PedidoEmprestimo

