import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import './PortfolioChart.css'

function PortfolioChart() {
  // Dados de gastos médios dos últimos 7 dias
  const data = [
    { name: 'Seg', gastos: 325, media: 350 },
    { name: 'Ter', gastos: 420, media: 365 },
    { name: 'Qua', gastos: 280, media: 355 },
    { name: 'Qui', gastos: 610, media: 405 },
    { name: 'Sex', gastos: 580, media: 440 },
    { name: 'Sab', gastos: 750, media: 490 },
    { name: 'Dom', gastos: 595, media: 510 },
  ]

  return (
    <div className="portfolio-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
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
            formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
          />
          <Line
            type="monotone"
            dataKey="gastos"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: '#EF4444', r: 4 }}
            name="Gastos Diários"
          />
          <Line
            type="monotone"
            dataKey="media"
            stroke="#10B981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#10B981', r: 4 }}
            name="Média"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-header">
        <h3>Gastos - Última Semana</h3>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-color gastos"></span>
            Gastos Diários
          </span>
          <span className="legend-item">
            <span className="legend-color media"></span>
            Média
          </span>
        </div>
      </div>
    </div>
  )
}

export default PortfolioChart


