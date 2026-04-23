interface Props {
  estimatedCost: string
  retryCount: number
}

export function CostEstimator({ estimatedCost, retryCount }: Props) {
  return (
    <div style={{
      background: '#1C1C1C',
      border: '1px solid #2A2A2A',
      borderRadius: 6,
      padding: '10px 12px',
    }}>
      <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        Cost Estimate
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#808080' }}>Per run</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#F2F2F2' }}>{estimatedCost}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#808080' }}>Monthly (est.)</span>
        <span style={{ fontSize: 11, color: '#808080' }}>~$4.32</span>
      </div>
      {retryCount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 6, borderTop: '1px solid #2A2A2A' }}>
          <span style={{ fontSize: 11, color: '#F59E0B' }}>Retry overhead</span>
          <span style={{ fontSize: 11, color: '#F59E0B' }}>+{retryCount}x</span>
        </div>
      )}
    </div>
  )
}
