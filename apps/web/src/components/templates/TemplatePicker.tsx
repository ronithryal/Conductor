import { useCanvasStore } from '../../store/canvasStore'
import { TEMPLATES } from '../../data/templates'
import { TemplateCard } from './TemplateCard'

interface Props {
  onClose: () => void
}

export function TemplatePicker({ onClose }: Props) {
  const { loadTemplate } = useCanvasStore()

  const handleSelect = (id: string) => {
    loadTemplate(id)
    onClose()
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#141414',
          border: '1px solid #2A2A2A',
          borderRadius: 14,
          padding: 28,
          width: 560,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#F2F2F2', marginBottom: 4 }}>Templates</div>
            <div style={{ fontSize: 12, color: '#808080' }}>One click to populate your canvas</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#808080', cursor: 'pointer', fontSize: 18, padding: 4 }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} template={t} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}
