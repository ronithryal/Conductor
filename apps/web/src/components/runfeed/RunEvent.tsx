import type { RunEvent as RunEventType } from '../../types/runs'

interface Props {
  event: RunEventType
}

const EVENT_ICONS: Record<string, string> = {
  queued: '⋯',
  'node-started': '▶',
  'tool-call': '⚙',
  step: '→',
  completed: '✓',
  failed: '✕',
  'run-complete': '★',
  'run-failed': '✕',
}

const EVENT_COLORS: Record<string, string> = {
  queued: '#808080',
  'node-started': '#5E6AD2',
  'tool-call': '#F59E0B',
  step: '#808080',
  completed: '#22C55E',
  failed: '#EF4444',
  'run-complete': '#22C55E',
  'run-failed': '#EF4444',
}

function formatElapsed(ms: number) {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

export function RunEvent({ event }: Props) {
  const color = EVENT_COLORS[event.type] || '#808080'
  const icon = EVENT_ICONS[event.type] || '→'

  return (
    <div
      className="fade-up"
      style={{
        display: 'flex',
        gap: 8,
        padding: '5px 0',
        borderBottom: '1px solid #1A1A1A',
      }}
    >
      <span style={{ color, fontSize: 11, flexShrink: 0, width: 12, textAlign: 'center', marginTop: 1 }}>
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginBottom: 1 }}>
          <span style={{ fontSize: 11, color: '#F2F2F2', fontWeight: event.type === 'node-started' ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {event.nodeName && event.type === 'node-started' ? event.nodeName : event.message}
          </span>
          <span style={{ fontSize: 10, color: '#404040', flexShrink: 0 }}>{formatElapsed(event.elapsed)}</span>
        </div>
        {event.type === 'tool-call' && event.toolName && (
          <div style={{ fontSize: 10, color: '#808080', fontFamily: 'monospace' }}>
            <span style={{ color: '#F59E0B' }}>{event.toolName}</span>
            {event.toolInput && <span style={{ color: '#404040' }}> {event.toolInput}</span>}
          </div>
        )}
        {event.type !== 'node-started' && event.type !== 'tool-call' && event.nodeName && (
          <div style={{ fontSize: 10, color: '#404040' }}>{event.nodeName}</div>
        )}
      </div>
    </div>
  )
}
