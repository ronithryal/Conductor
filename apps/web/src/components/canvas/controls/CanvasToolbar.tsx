import { useReactFlow } from 'reactflow'

interface Props {
  onOpenTemplates: () => void
}

export function CanvasToolbar({ onOpenTemplates }: Props) {
  const { fitView, zoomIn, zoomOut } = useReactFlow()

  const btn = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    background: '#141414',
    border: '1px solid #2A2A2A',
    borderRadius: 6,
    cursor: 'pointer',
    color: '#808080',
    fontSize: 13,
    transition: 'border-color 0.15s, color 0.15s',
  } as const

  return (
    <div style={{
      position: 'absolute',
      top: 14,
      left: 14,
      display: 'flex',
      gap: 6,
      zIndex: 10,
    }}>
      <button
        style={{ ...btn, gap: 6, width: 'auto', padding: '0 12px', color: '#F2F2F2', borderColor: '#2A2A2A' }}
        onClick={onOpenTemplates}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = '#5E6AD2'; (e.target as HTMLElement).style.color = '#5E6AD2' }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = '#2A2A2A'; (e.target as HTMLElement).style.color = '#F2F2F2' }}
      >
        <span style={{ fontSize: 11 }}>+ Templates</span>
      </button>
      <button style={btn} onClick={() => zoomIn({ duration: 200 })} title="Zoom in (+)">+</button>
      <button style={btn} onClick={() => zoomOut({ duration: 200 })} title="Zoom out (-)">−</button>
      <button style={{ ...btn, fontSize: 10 }} onClick={() => fitView({ padding: 0.1, duration: 300 })} title="Fit view (F)">⊡</button>
    </div>
  )
}
