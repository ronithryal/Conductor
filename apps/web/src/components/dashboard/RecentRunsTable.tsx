import { MOCK_METRICS } from '../../data/mockMetrics'

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  success: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', label: 'Success' },
  error: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', label: 'Error' },
  running: { color: '#5E6AD2', bg: 'rgba(94,106,210,0.1)', label: 'Running' },
}

function formatDuration(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`
}

export function RecentRunsTable() {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid #2A2A2A',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1F1F1F' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#F2F2F2' }}>Recent Runs</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Run ID', 'Template', 'Status', 'Duration', 'Time'].map((h) => (
              <th key={h} style={{ padding: '8px 18px', textAlign: 'left', fontSize: 10, color: '#404040', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #1F1F1F' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_METRICS.recentRuns.map((run, i) => {
            const s = STATUS_STYLE[run.status] || STATUS_STYLE.success
            return (
              <tr key={run.id} style={{ borderBottom: i < MOCK_METRICS.recentRuns.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <td style={{ padding: '9px 18px', fontSize: 11, color: '#808080', fontFamily: 'monospace' }}>{run.id}</td>
                <td style={{ padding: '9px 18px', fontSize: 11, color: '#F2F2F2' }}>{run.template}</td>
                <td style={{ padding: '9px 18px' }}>
                  <span style={{ fontSize: 10, color: s.color, background: s.bg, border: `1px solid ${s.color}40`, borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>
                    {s.label}
                  </span>
                </td>
                <td style={{ padding: '9px 18px', fontSize: 11, color: '#808080' }}>{formatDuration(run.duration)}</td>
                <td style={{ padding: '9px 18px', fontSize: 11, color: '#404040' }}>{run.ago}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
