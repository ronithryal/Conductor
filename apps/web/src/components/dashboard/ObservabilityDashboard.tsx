import { KpiCard } from './KpiCard'
import { RunsChart } from './RunsChart'
import { RecentRunsTable } from './RecentRunsTable'
import { MOCK_METRICS } from '../../data/mockMetrics'

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

export function ObservabilityDashboard() {
  const m = MOCK_METRICS
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#0A0A0A' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#F2F2F2', marginBottom: 4 }}>Observability</div>
        <div style={{ fontSize: 11, color: '#808080' }}>Last 7 days · All workspaces</div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <KpiCard label="Total Runs" value={formatNumber(m.totalRuns)} sub="+12% vs last week" hero />
        <KpiCard label="Avg Latency" value={`${(m.avgLatency / 1000).toFixed(1)}s`} sub="p95: 8.2s" />
        <KpiCard label="Error Rate" value={`${m.errorRate}%`} sub="3.4% (42 errors)" color="#EF4444" />
        <KpiCard label="Tokens Used" value={formatNumber(m.tokenUsage)} sub="across all agents" />
        <KpiCard label="Est. Cost" value={`$${m.estimatedCost.toFixed(2)}`} sub="this month" />
      </div>

      {/* Chart */}
      <div style={{ marginBottom: 20 }}>
        <RunsChart />
      </div>

      {/* Recent runs */}
      <RecentRunsTable />
    </div>
  )
}
