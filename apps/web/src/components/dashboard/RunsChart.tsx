import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { MOCK_METRICS } from '../../data/mockMetrics'

export function RunsChart() {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid #2A2A2A',
      borderRadius: 10,
      padding: '18px 20px',
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#F2F2F2', marginBottom: 16 }}>
        Runs over time (7d)
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={MOCK_METRICS.runsOverTime} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#808080' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#808080' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#1C1C1C', border: '1px solid #2A2A2A', borderRadius: 6, fontSize: 11 }}
            labelStyle={{ color: '#F2F2F2' }}
            itemStyle={{ color: '#808080' }}
          />
          <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
          <Line
            type="monotone"
            dataKey="runs"
            stroke="#5E6AD2"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#5E6AD2' }}
          />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="#EF4444"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 2"
            activeDot={{ r: 4, fill: '#EF4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
