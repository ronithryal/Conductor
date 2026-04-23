interface Props {
  label: string
  value: string
  sub?: string
  color?: string
  hero?: boolean
}

export function KpiCard({ label, value, sub, color = '#F2F2F2', hero = false }: Props) {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid #2A2A2A',
      borderRadius: 10,
      padding: '16px 18px',
      flex: 1,
      minWidth: 120,
    }}>
      <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: hero ? 48 : 22, fontWeight: 700, color, marginBottom: 4, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: '#404040' }}>{sub}</div>}
    </div>
  )
}
