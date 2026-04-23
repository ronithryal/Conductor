import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { AgentNodeData } from '../../../types/nodes'
import { useInspectorStore } from '../../../store/inspectorStore'
import { useCanvasStore } from '../../../store/canvasStore'
import { COMMENT_PIN } from '../../../data/collaboration'

const MODEL_LABELS: Record<string, string> = {
  'claude-sonnet-4': 'Claude Sonnet',
  'claude-opus-4': 'Claude Opus',
  'gpt-4o': 'GPT-4o',
  'o3': 'o3',
  'gemini-2-flash': 'Gemini 2 Flash',
  'ollama-llama3': 'Llama 3 (local)',
}

const MODEL_COLORS: Record<string, string> = {
  'claude-sonnet-4': '#8B6CF7',
  'claude-opus-4': '#B07EFF',
  'gpt-4o': '#19C37D',
  'o3': '#FF6B35',
  'gemini-2-flash': '#4285F4',
  'ollama-llama3': '#F59E0B',
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'running': return { border: '1.5px solid #5E6AD2', className: 'node-running' }
    case 'success': return { border: '1.5px solid #22C55E', className: '' }
    case 'error': return { border: '1.5px solid #EF4444', className: '' }
    case 'queued': return { border: '1.5px solid #F59E0B', className: '' }
    default: return { border: '1.5px solid #2A2A2A', className: '' }
  }
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    idle: '#404040',
    queued: '#F59E0B',
    running: '#5E6AD2',
    success: '#22C55E',
    error: '#EF4444',
  }
  return (
    <div
      style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: colors[status] || colors.idle,
        flexShrink: 0,
        boxShadow: status === 'running' ? '0 0 6px #5E6AD2' : undefined,
      }}
    />
  )
}

function AgentNode({ id, data, selected }: NodeProps<AgentNodeData>) {
  const { openPanel } = useInspectorStore()
  const { selectedNodeId } = useCanvasStore()
  const { border, className } = getStatusStyle(data.status)
  const hasComment = COMMENT_PIN.nodeId === id

  return (
    <div
      onClick={() => openPanel(id)}
      className={`fade-up ${className}`}
      style={{
        background: '#141414',
        border: selected || selectedNodeId === id ? '1.5px solid #5E6AD2' : border,
        borderRadius: 10,
        width: 220,
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: -5 }}
      />

      {/* Header */}
      <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #1F1F1F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
          <StatusDot status={data.status} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#F2F2F2', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {data.name}
          </span>
        </div>
        {/* Model badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          background: '#1C1C1C',
          border: '1px solid #2A2A2A',
          borderRadius: 4,
          padding: '2px 7px',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: MODEL_COLORS[data.model] || '#808080' }} />
          <span style={{ fontSize: 10, color: '#808080', fontWeight: 500 }}>
            {MODEL_LABELS[data.model] || data.model}
          </span>
        </div>
      </div>

      {/* Tools */}
      <div style={{ padding: '8px 12px 10px' }}>
        <div style={{ fontSize: 10, color: '#404040', marginBottom: 5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {data.tools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              style={{
                fontSize: 10,
                color: '#808080',
                background: '#1C1C1C',
                border: '1px solid #2A2A2A',
                borderRadius: 3,
                padding: '1px 6px',
              }}
            >
              {tool}
            </span>
          ))}
          {data.tools.length > 3 && (
            <span style={{ fontSize: 10, color: '#404040' }}>+{data.tools.length - 3}</span>
          )}
        </div>
      </div>

      {/* Cost */}
      <div style={{
        padding: '5px 12px',
        borderTop: '1px solid #1F1F1F',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, color: '#404040' }}>{data.estimatedCost}</span>
        {data.retryCount > 0 && (
          <span style={{ fontSize: 10, color: '#F59E0B' }}>↻ {data.retryCount} retries</span>
        )}
      </div>

      {/* Comment pin */}
      {hasComment && (
        <div style={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#22C55E',
          border: '2px solid #0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          color: 'white',
          fontWeight: 700,
          zIndex: 10,
        }}>
          1
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ right: -5 }}
      />
    </div>
  )
}

export default memo(AgentNode)
