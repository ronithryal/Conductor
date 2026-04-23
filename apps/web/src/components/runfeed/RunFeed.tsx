import { useEffect, useRef, useState } from 'react'
import { useRunStore } from '../../store/runStore'
import { useCanvasStore } from '../../store/canvasStore'
import { RunEvent } from './RunEvent'

const CURRENT_TEMPLATE_ID = 'email-triage'

export function RunFeed() {
  const { events, phase, errorNodeId, retryFromError, resetRun } = useRunStore()
  const { resetNodeStatuses } = useCanvasStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events])

  const isEmpty = events.length === 0 && phase === 'idle'

  const phaseLabel: Record<string, { text: string; color: string }> = {
    idle: { text: 'Idle', color: '#404040' },
    queued: { text: 'Queued...', color: '#F59E0B' },
    running: { text: 'Running', color: '#5E6AD2' },
    success: { text: 'Complete', color: '#22C55E' },
    error: { text: 'Failed', color: '#EF4444' },
  }

  const pl = phaseLabel[phase] || phaseLabel.idle

  return (
    <div style={{
      background: '#0F0F0F',
      borderTop: '1px solid #1F1F1F',
      height: collapsed ? 36 : 220,
      display: 'flex',
      flexDirection: 'column',
      transition: 'height 0.2s ease',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 14px',
        height: 36,
        borderBottom: collapsed ? 'none' : '1px solid #1F1F1F',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#808080', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Run Feed
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: pl.color }} />
          <span style={{ fontSize: 10, color: pl.color }}>{pl.text}</span>
        </div>
        <div style={{ flex: 1 }} />
        {(phase === 'success' || phase === 'error') && (
          <button
            onClick={() => { resetRun(); resetNodeStatuses() }}
            style={{ fontSize: 10, color: '#808080', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
          >
            Clear
          </button>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: 11, color: '#404040', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          {collapsed ? '▲' : '▼'}
        </button>
      </div>

      {!collapsed && (
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '8px 14px' }}>
          {isEmpty ? (
            <div style={{ textAlign: 'center', marginTop: 30, color: '#404040', fontSize: 11 }}>
              Click Run to see agent activity
            </div>
          ) : (
            <>
              {events.map((event) => (
                <RunEvent key={event.id} event={event} />
              ))}
              {/* Retry prompt */}
              {phase === 'error' && errorNodeId && (
                <div style={{
                  marginTop: 10,
                  padding: '10px 12px',
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 600, marginBottom: 2 }}>Agent failed</div>
                    <div style={{ fontSize: 10, color: '#808080' }}>TIMEOUT — Request exceeded 10s limit</div>
                  </div>
                  <button
                    onClick={() => retryFromError(CURRENT_TEMPLATE_ID)}
                    style={{
                      padding: '5px 14px',
                      background: '#5E6AD2',
                      border: 'none',
                      borderRadius: 5,
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    ↻ Retry
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
