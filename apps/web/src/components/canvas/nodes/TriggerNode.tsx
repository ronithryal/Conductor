import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { TriggerNodeData } from '../../../types/nodes'

const TRIGGER_ICONS: Record<string, string> = {
  schedule: '⏱',
  manual: '▶',
  webhook: '🔗',
  event: '⚡',
}

function TriggerNode({ data }: NodeProps<TriggerNodeData>) {
  return (
    <div
      style={{
        background: '#141414',
        border: '1.5px solid #2A2A2A',
        borderRadius: 10,
        width: 160,
        userSelect: 'none',
      }}
      className="fade-up"
    >
      <div style={{ padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <span style={{ fontSize: 14 }}>{TRIGGER_ICONS[data.triggerType] || '▶'}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#F2F2F2' }}>{data.label}</span>
        </div>
        {data.schedule && (
          <div style={{
            fontSize: 10,
            color: '#808080',
            background: '#1C1C1C',
            border: '1px solid #2A2A2A',
            borderRadius: 4,
            padding: '2px 7px',
            display: 'inline-block',
          }}>
            {data.schedule}
          </div>
        )}
        {data.triggerType === 'manual' && (
          <div style={{
            fontSize: 10,
            color: '#5E6AD2',
            background: 'rgba(94,106,210,0.1)',
            border: '1px solid rgba(94,106,210,0.3)',
            borderRadius: 4,
            padding: '2px 7px',
            display: 'inline-block',
          }}>
            Manual
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: -5 }}
      />
    </div>
  )
}

export default memo(TriggerNode)
