/**
 * Formata um valor monetário, ocultando-o se necessário
 * @param {number|string} value - Valor a ser formatado
 * @param {boolean} visible - Se o valor deve ser visível
 * @returns {string} Valor formatado ou "••••••" se oculto
 */
export function formatValue(value, visible = true) {
  if (!visible) {
    return '••••••'
  }

  // Se já é uma string formatada (ex: "R$ 125.450,00"), retorna como está
  if (typeof value === 'string' && value.includes('R$')) {
    return value
  }

  // Se é um número, formata como moeda
  if (typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  // Se é uma string numérica, tenta converter
  if (typeof value === 'string') {
    const numValue = parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.'))
    if (!isNaN(numValue)) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numValue)
    }
  }

  // Retorna o valor original se não conseguir formatar
  return value
}

