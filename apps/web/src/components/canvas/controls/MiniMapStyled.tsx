import { MiniMap } from 'reactflow'

export function MiniMapStyled() {
  return (
    <MiniMap
      nodeColor={(node) => {
        const status = node.data?.status
        if (status === 'running') return '#5E6AD2'
        if (status === 'success') return '#22C55E'
        if (status === 'error') return '#EF4444'
        return '#2A2A2A'
      }}
      maskColor="rgba(10,10,10,0.7)"
      style={{
        background: '#141414',
        border: '1px solid #2A2A2A',
        borderRadius: 8,
      }}
    />
  )
}
