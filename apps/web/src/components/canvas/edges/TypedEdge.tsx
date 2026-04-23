import { memo, useState } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from 'reactflow'
import type { TypedEdgeData } from '../../../types/nodes'

const CONNECTION_COLORS: Record<string, string> = {
  trigger: '#5E6AD2',
  data: '#4A4A4A',
  approval: '#F59E0B',
  fallback: '#EF4444',
}

function TypedEdge({
  id,
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  data,
  markerEnd,
  style,
}: EdgeProps<TypedEdgeData>) {
  const [hovered, setHovered] = useState(false)
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  })

  const color = CONNECTION_COLORS[data?.connectionType || 'data']

  return (
    <>
      {/* Invisible wider hit area */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: hovered ? color : '#3A3A3A',
          strokeWidth: hovered ? 2 : 1.5,
          transition: 'stroke 0.15s, stroke-width 0.15s',
        }}
      />
      {hovered && data?.payloadPreview && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#1C1C1C',
              border: '1px solid #2A2A2A',
              borderRadius: 6,
              padding: '5px 10px',
              fontSize: 10,
              color: '#808080',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: '#5E6AD2', fontWeight: 600, marginBottom: 2 }}>
              {data.connectionType}
            </div>
            {data.payloadPreview}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export default memo(TypedEdge)
