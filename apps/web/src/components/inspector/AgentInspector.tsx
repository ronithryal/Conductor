import { useCanvasStore } from '../../store/canvasStore'
import { ModelDropdown } from './ModelDropdown'
import { ToolList } from './ToolList'
import { CostEstimator } from './CostEstimator'
import type { AgentNodeData, ModelOption } from '../../types/nodes'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  idle: { label: 'Idle', color: '#404040' },
  queued: { label: 'Queued', color: '#F59E0B' },
  running: { label: 'Running', color: '#5E6AD2' },
  success: { label: 'Success', color: '#22C55E' },
  error: { label: 'Error', color: '#EF4444' },
}

interface Props {
  nodeId: string
  data: AgentNodeData
}

export function AgentInspector({ nodeId, data }: Props) {
  const { updateNodeData } = useCanvasStore()
  const status = STATUS_LABELS[data.status] || STATUS_LABELS.idle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Node name + status */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#F2F2F2' }}>{data.name}</span>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: status.color,
            background: `${status.color}18`,
            border: `1px solid ${status.color}40`,
            borderRadius: 4,
            padding: '2px 8px',
          }}>
            {status.label}
          </span>
        </div>
        <div style={{ fontSize: 10, color: '#404040', fontFamily: 'monospace' }}>id: {nodeId}</div>
      </div>

      {/* Model */}
      <ModelDropdown
        value={data.model}
        onChange={(model: ModelOption) => updateNodeData(nodeId, { model })}
      />

      {/* System Prompt */}
      <div>
        <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
          System Prompt
        </div>
        <textarea
          value={data.systemPrompt}
          onChange={(e) => updateNodeData(nodeId, { systemPrompt: e.target.value })}
          style={{
            width: '100%',
            minHeight: 100,
            background: '#1C1C1C',
            border: '1px solid #2A2A2A',
            borderRadius: 6,
            padding: '8px 10px',
            color: '#F2F2F2',
            fontSize: 11,
            lineHeight: 1.6,
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { (e.target as HTMLElement).style.borderColor = '#4A4A4A' }}
          onBlur={(e) => { (e.target as HTMLElement).style.borderColor = '#2A2A2A' }}
        />
      </div>

      {/* Tools */}
      <ToolList tools={data.tools} />

      {/* Cost */}
      <CostEstimator estimatedCost={data.estimatedCost} retryCount={data.retryCount} />
    </div>
  )
}
