export const MOCK_METRICS = {
  totalRuns: 1247,
  avgLatency: 4200,
  errorRate: 3.4,
  tokenUsage: 2340000,
  estimatedCost: 187.40,
  runsOverTime: [
    { date: 'Apr 16', runs: 142, errors: 4 },
    { date: 'Apr 17', runs: 168, errors: 7 },
    { date: 'Apr 18', runs: 189, errors: 5 },
    { date: 'Apr 19', runs: 201, errors: 9 },
    { date: 'Apr 20', runs: 223, errors: 6 },
    { date: 'Apr 21', runs: 198, errors: 8 },
    { date: 'Apr 22', runs: 126, errors: 3 },
  ],
  recentRuns: [
    { id: 'run-1247', template: 'Email Triage', status: 'success', duration: 4320, ago: '2 min ago' },
    { id: 'run-1246', template: 'Email Triage', status: 'success', duration: 3890, ago: '17 min ago' },
    { id: 'run-1245', template: 'Email Triage', status: 'error', duration: 12100, ago: '32 min ago' },
    { id: 'run-1244', template: 'Research Agent', status: 'success', duration: 8200, ago: '1 hr ago' },
    { id: 'run-1243', template: 'Report Generator', status: 'success', duration: 3100, ago: '2 hr ago' },
  ],
}
