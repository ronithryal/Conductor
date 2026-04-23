import { useState } from 'react'
import { TopNav } from './TopNav'
import { ConductorCanvas } from '../canvas/ConductorCanvas'
import { InspectorPanel } from '../inspector/InspectorPanel'
import { RunFeed } from '../runfeed/RunFeed'
import { ObservabilityDashboard } from '../dashboard/ObservabilityDashboard'
import { ActivityFeed } from '../collaboration/ActivityFeed'
import { useInspectorStore } from '../../store/inspectorStore'

type Tab = 'canvas' | 'dashboard'

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('canvas')
  const { panelOpen } = useInspectorStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {activeTab === 'canvas' ? (
          <>
            {/* Canvas + run feed column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
              <ConductorCanvas />
              <RunFeed />

              {/* Activity feed — top-left of canvas column, clear of nodes */}
              <div style={{
                position: 'absolute',
                top: 8,
                left: 8,
                width: 210,
                background: 'rgba(15,15,15,0.92)',
                border: '1px solid #1F1F1F',
                borderRadius: 8,
                backdropFilter: 'blur(8px)',
                zIndex: 10,
              }}>
                <ActivityFeed />
              </div>
            </div>

            {/* Inspector */}
            <InspectorPanel />
          </>
        ) : (
          <ObservabilityDashboard />
        )}
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
