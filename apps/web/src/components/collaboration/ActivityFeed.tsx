import { ACTIVITY_FEED, FAKE_USERS } from '../../data/collaboration'

export function ActivityFeed() {
  return (
    <div style={{
      padding: '10px 14px',
      borderTop: '1px solid #1F1F1F',
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#404040', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        Recent Activity
      </div>
      {ACTIVITY_FEED.slice(0, 3).map((item, i) => {
        const user = FAKE_USERS.find((u) => u.name === item.user)
        return (
          <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 7, alignItems: 'flex-start' }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: user?.color || '#808080',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
              marginTop: 1,
            }}>
              {user?.initials || item.user[0]}
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#808080' }}>
                <span style={{ color: '#F2F2F2', fontWeight: 500 }}>{item.user}</span>
                {' '}{item.action}
              </span>
              <div style={{ fontSize: 10, color: '#404040' }}>{item.ago}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
