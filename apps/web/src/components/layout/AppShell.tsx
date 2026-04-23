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
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginRight: panelOpen ? 300 : 0, transition: 'margin-right 0.2s ease' }}>
              <ConductorCanvas />
              <RunFeed />
            </div>

            {/* Activity feed (left of inspector) */}
            <div style={{
              position: 'absolute',
              left: 0,
              bottom: 220,
              width: 220,
              background: '#0F0F0F',
              borderRight: '1px solid #1F1F1F',
              borderTop: '1px solid #1F1F1F',
            }}>
              <ActivityFeed />
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
