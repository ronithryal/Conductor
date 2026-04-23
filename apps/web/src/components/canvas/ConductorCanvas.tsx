import { useCallback, useMemo, useState } from 'react'
import ReactFlow, { Background, BackgroundVariant, ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import { useCanvasStore } from '../../store/canvasStore'
import { useInspectorStore } from '../../store/inspectorStore'
import { useRunStore } from '../../store/runStore'
import { useRunSimulation } from '../../hooks/useRunSimulation'
import { useCanvasKeyboard } from '../../hooks/useCanvasKeyboard'
import { nodeTypes } from './nodes'
import { edgeTypes } from './edges'
import { MiniMapStyled } from './controls/MiniMapStyled'
import { CanvasToolbar } from './controls/CanvasToolbar'
import { TemplatePicker } from '../templates/TemplatePicker'
import { COMMENT_PIN } from '../../data/collaboration'

function CanvasInner() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, selectNode } = useCanvasStore()
  const { openPanel } = useInspectorStore()
  const { phase } = useRunStore()
  const [showTemplates, setShowTemplates] = useState(false)

  useRunSimulation()
  useCanvasKeyboard()

  const onNodeClick = useCallback((_: React.MouseEvent, node: { id: string }) => {
    selectNode(node.id)
    openPanel(node.id)
  }, [selectNode, openPanel])

  const onPaneClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  const animatedEdges = useMemo(
    () => edges.map((e) => ({ ...e, animated: phase === 'running' })),
    [edges, phase],
  )

  const isEmpty = nodes.length === 0

  return (
    <div style={{ flex: 1, position: 'relative', background: '#0A0A0A' }}>
      <ReactFlow
        nodes={nodes}
        edges={animatedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        panOnScroll={false}
        panOnDrag={[1, 2]}
        selectionOnDrag={false}
        deleteKeyCode="Delete"
        style={{ background: '#0A0A0A' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2A2A2A"
        />
        <MiniMapStyled />
        <CanvasToolbar onOpenTemplates={() => setShowTemplates(true)} />

        {/* Comment pin overlay */}
        {nodes.find((n) => n.id === COMMENT_PIN.nodeId) && (
          <div style={{ position: 'absolute', bottom: 60, right: 10, zIndex: 5 }} />
        )}
      </ReactFlow>

      {/* Empty state */}
      {isEmpty && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          gap: 12,
        }}>
          <div style={{ fontSize: 32, opacity: 0.3 }}>⬡</div>
          <div style={{ fontSize: 14, color: '#404040', fontWeight: 600 }}>Start from a template</div>
          <div style={{ fontSize: 12, color: '#2A2A2A' }}>or drag nodes to build your own workflow</div>
          <button
            style={{
              marginTop: 8,
              padding: '8px 20px',
              background: '#5E6AD2',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              pointerEvents: 'all',
            }}
            onClick={() => setShowTemplates(true)}
          >
            Browse Templates
          </button>
        </div>
      )}

      {showTemplates && (
        <TemplatePicker onClose={() => setShowTemplates(false)} />
      )}
    </div>
  )
}

export function ConductorCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  )
}
