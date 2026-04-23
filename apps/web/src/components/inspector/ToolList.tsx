interface Props {
  tools: string[]
}

export function ToolList({ tools }: Props) {
  return (
    <div>
      <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        Tools ({tools.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {tools.map((tool) => (
          <div
            key={tool}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 8px',
              background: '#1C1C1C',
              border: '1px solid #2A2A2A',
              borderRadius: 5,
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#5E6AD2', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#F2F2F2', fontFamily: 'monospace' }}>{tool}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
