import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'
import type { ToolNodeData } from '../../../types/nodes'

const CATEGORY_COLORS: Record<string, string> = {
  web: '#4285F4',
  files: '#F59E0B',
  api: '#5E6AD2',
  database: '#22C55E',
  comms: '#EC4899',
}

function ToolNode({ data }: NodeProps<ToolNodeData>) {
  const color = CATEGORY_COLORS[data.category] || '#808080'
  return (
    <div
      style={{
        background: '#141414',
        border: `1.5px solid ${color}40`,
        borderRadius: 8,
        width: 140,
        userSelect: 'none',
      }}
      className="fade-up"
    >
      <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#F2F2F2' }}>{data.name}</span>
      </div>
      <div style={{ paddingBottom: 8, paddingLeft: 12 }}>
        <span style={{ fontSize: 10, color: '#808080' }}>{data.category}</span>
      </div>
      <Handle type="target" position={Position.Left} style={{ left: -5 }} />
      <Handle type="source" position={Position.Right} style={{ right: -5 }} />
    </div>
  )
}

export default memo(ToolNode)
