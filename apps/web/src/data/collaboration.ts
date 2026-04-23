export const FAKE_USERS = [
  { id: 'user-sam', name: 'Sam', initials: 'SL', color: '#5E6AD2' },
  { id: 'user-jordan', name: 'Jordan', initials: 'JK', color: '#22C55E' },
]

export const ACTIVITY_FEED = [
  { user: 'Sam', action: 'edited Research Agent prompt', ago: '2m ago' },
  { user: 'Jordan', action: 'ran Email Triage workflow', ago: '18m ago' },
  { user: 'Sam', action: 'added Slack integration', ago: '1h ago' },
  { user: 'Jordan', action: 'installed Email Triage template', ago: '2h ago' },
]

export const COMMENT_PIN = {
  nodeId: 'research-1',
  user: 'Jordan',
  initials: 'JK',
  color: '#22C55E',
  text: 'Should we add a fallback to Perplexity if web.search fails?',
  ago: '3h ago',
}
