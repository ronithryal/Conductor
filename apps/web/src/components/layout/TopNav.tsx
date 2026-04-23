import { useRunStore } from '../../store/runStore'
import { useCanvasStore } from '../../store/canvasStore'
import { AvatarStack } from '../collaboration/AvatarStack'

type Tab = 'canvas' | 'dashboard'

interface Props {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const CURRENT_TEMPLATE_ID = 'email-triage'

export function TopNav({ activeTab, onTabChange }: Props) {
  const { phase, startRun } = useRunStore()
  const { nodes } = useCanvasStore()
  const isRunning = phase === 'running' || phase === 'queued'
  const hasNodes = nodes.length > 0

  const handleRun = async () => {
    if (isRunning || !hasNodes) return
    await startRun(CURRENT_TEMPLATE_ID)
  }

  return (
    <div style={{
      height: 48,
      background: '#141414',
      borderBottom: '1px solid #1F1F1F',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 12,
      flexShrink: 0,
      position: 'relative',
      zIndex: 30,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
        <div style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #5E6AD2, #8B92E5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: 'white',
        }}>
          C
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#F2F2F2', letterSpacing: '-0.02em' }}>Conductor</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2 }}>
        {(['canvas', 'dashboard'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: '5px 12px',
              background: activeTab === tab ? '#1C1C1C' : 'none',
              border: '1px solid',
              borderColor: activeTab === tab ? '#2A2A2A' : 'transparent',
              borderRadius: 6,
              color: activeTab === tab ? '#F2F2F2' : '#808080',
              fontSize: 12,
              fontWeight: activeTab === tab ? 500 : 400,
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }}
          >
            {tab === 'canvas' ? 'Canvas' : 'Dashboard'}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Collaboration */}
      <AvatarStack />

      <div style={{ width: 1, height: 20, background: '#2A2A2A', margin: '0 4px' }} />

      {/* Run button */}
      <button
        onClick={handleRun}
        disabled={isRunning || !hasNodes}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '6px 16px',
          background: isRunning ? '#1C1C1C' : '#5E6AD2',
          border: `1px solid ${isRunning ? '#5E6AD2' : 'transparent'}`,
          borderRadius: 6,
          color: isRunning ? '#5E6AD2' : 'white',
          fontSize: 12,
          fontWeight: 600,
          cursor: isRunning || !hasNodes ? 'not-allowed' : 'pointer',
          opacity: !hasNodes ? 0.4 : 1,
          transition: 'all 0.15s',
          minWidth: 80,
          justifyContent: 'center',
        }}
      >
        {isRunning ? (
          <>
            <span style={{
              width: 10,
              height: 10,
              border: '1.5px solid #5E6AD2',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              display: 'inline-block',
            }} />
            Running
          </>
        ) : (
          <>▶ Run</>
        )}
      </button>
    </div>
  )
}
