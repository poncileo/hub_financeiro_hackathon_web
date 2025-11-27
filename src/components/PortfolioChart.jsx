import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import './PortfolioChart.css'

function PortfolioChart() {
  const data = [
    { name: 'Jan', value: 85000 },
    { name: 'Fev', value: 92000 },
    { name: 'Mar', value: 88000 },
    { name: 'Abr', value: 105000 },
    { name: 'Mai', value: 112000 },
    { name: 'Jun', value: 125000 },
  ]

  return (
    <div className="portfolio-chart">
      <div className="chart-header">
        <h3>Evolução do Portfólio</h3>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-color portfolio"></span>
            Portfólio
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#F9FAFB',
            }}
            formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PortfolioChart


