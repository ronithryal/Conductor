import { useInspectorStore } from '../../store/inspectorStore'
import { useCanvasStore } from '../../store/canvasStore'
import { AgentInspector } from './AgentInspector'
import type { AgentNodeData } from '../../types/nodes'

export function InspectorPanel() {
  const { panelOpen, selectedNodeId, closePanel } = useInspectorStore()
  const { nodes } = useCanvasStore()

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null

  if (!panelOpen) return null

  return (
    <div
      className="slide-in-right"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 300,
        background: '#141414',
        borderLeft: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #1F1F1F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#F2F2F2' }}>Inspector</span>
        <button
          onClick={closePanel}
          style={{ background: 'none', border: 'none', color: '#808080', cursor: 'pointer', fontSize: 16, padding: 2 }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {!selectedNode ? (
          <div style={{ textAlign: 'center', marginTop: 60, color: '#404040', fontSize: 12 }}>
            Click an agent to inspect
          </div>
        ) : selectedNode.type === 'agent' ? (
          <AgentInspector nodeId={selectedNode.id} data={selectedNode.data as AgentNodeData} />
        ) : (
          <div style={{ color: '#808080', fontSize: 12 }}>
            <div style={{ fontWeight: 600, color: '#F2F2F2', marginBottom: 8 }}>
              {selectedNode.data?.label || selectedNode.data?.name || 'Node'}
            </div>
            <div style={{ color: '#808080', fontSize: 11 }}>
              Type: {selectedNode.type}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
