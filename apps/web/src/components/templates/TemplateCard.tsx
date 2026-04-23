import type { Template } from '../../types/templates'

interface Props {
  template: Template
  onSelect: (id: string) => void
}

export function TemplateCard({ template, onSelect }: Props) {
  return (
    <button
      onClick={() => onSelect(template.id)}
      style={{
        background: '#141414',
        border: '1px solid #2A2A2A',
        borderRadius: 10,
        padding: '16px',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#5E6AD2' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A' }}
    >
      <div style={{ fontSize: 24, marginBottom: 10 }}>{template.icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F2', marginBottom: 6 }}>{template.name}</div>
      <div style={{ fontSize: 11, color: '#808080', lineHeight: 1.5, marginBottom: 10 }}>{template.description}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{ fontSize: 10, color: '#404040' }}>🤖 {template.agentCount} agents</span>
        <span style={{ fontSize: 10, color: '#404040' }}>⏱ {template.estimatedRunTime}</span>
      </div>
    </button>
  )
}
