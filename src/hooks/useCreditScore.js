import { useState, useEffect } from 'react'

// Hook para gerenciar o score de crédito do usuário
export function useCreditScore() {
  const [creditScore, setCreditScore] = useState(null)

  useEffect(() => {
    // Simula busca do score (em produção, viria de uma API)
    // Por enquanto, vamos usar um valor fixo ou calcular baseado em dados do usuário
    const fetchCreditScore = () => {
      // Simulação: score entre 300 e 900
      // Em produção, isso viria de uma API ou cálculo baseado no histórico
      const simulatedScore = 720 // Score de exemplo
      setCreditScore(simulatedScore)
    }

    fetchCreditScore()
  }, [])

  const getScoreCategory = (score) => {
    if (score >= 751) return 'excellent'
    if (score >= 601) return 'good'
    if (score >= 451) return 'regular'
    if (score >= 301) return 'poor'
    return 'very-poor'
  }

  const getScoreInfo = (score) => {
    const category = getScoreCategory(score)
    
    const categories = {
      'excellent': {
        label: 'Excelente',
        color: '#10B981',
        interestRate: 0.015, // 1.5% ao mês
        maxAmount: 100000,
        maxInstallments: 48,
        description: 'Você tem um excelente histórico de crédito!',
      },
      'good': {
        label: 'Bom',
        color: '#3B82F6',
        interestRate: 0.02, // 2% ao mês
        maxAmount: 75000,
        maxInstallments: 36,
        description: 'Seu score de crédito é bom.',
      },
      'regular': {
        label: 'Regular',
        color: '#F59E0B',
        interestRate: 0.025, // 2.5% ao mês
        maxAmount: 50000,
        maxInstallments: 24,
        description: 'Seu score de crédito está regular.',
      },
      'poor': {
        label: 'Ruim',
        color: '#EF4444',
        interestRate: 0.035, // 3.5% ao mês
        maxAmount: 25000,
        maxInstallments: 12,
        description: 'Seu score de crédito precisa melhorar.',
      },
      'very-poor': {
        label: 'Muito Ruim',
        color: '#DC2626',
        interestRate: 0.05, // 5% ao mês
        maxAmount: 10000,
        maxInstallments: 6,
        description: 'Seu score de crédito está muito baixo.',
      },
    }

    return categories[category] || categories['regular']
  }

  return {
    creditScore,
    scoreInfo: creditScore ? getScoreInfo(creditScore) : null,
    scoreCategory: creditScore ? getScoreCategory(creditScore) : null,
  }
}


