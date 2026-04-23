import { FAKE_USERS } from '../../data/collaboration'

export function AvatarStack() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {FAKE_USERS.map((user, i) => (
        <div
          key={user.id}
          title={user.name}
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: user.color,
            border: '2px solid #0A0A0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: 'white',
            marginLeft: i > 0 ? -6 : 0,
            cursor: 'default',
          }}
        >
          {user.initials}
        </div>
      ))}
      <span style={{ marginLeft: 8, fontSize: 11, color: '#808080' }}>2 online</span>
    </div>
  )
}
