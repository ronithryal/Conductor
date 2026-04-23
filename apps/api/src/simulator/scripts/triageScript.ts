import type { ScriptStep } from '../../types/events.js'

export const TRIAGE_SCRIPT: ScriptStep[] = [
  { delay: 0, type: 'run.queued', nodeId: 'trigger-1', nodeName: 'Email Trigger', message: 'Workflow triggered' },
  { delay: 500, type: 'run.node.started', nodeId: 'triage-1', nodeName: 'Inbox Triage Agent', message: 'Inbox Triage Agent starting...' },
  { delay: 1200, type: 'run.node.tool-call', nodeId: 'triage-1', nodeName: 'Inbox Triage Agent', message: 'Scanning inbox', toolName: 'gmail.list', toolInput: 'last 2 hours, unread' },
  { delay: 2800, type: 'run.node.step', nodeId: 'triage-1', nodeName: 'Inbox Triage Agent', message: 'Found 12 emails. Categorizing by urgency...' },
  { delay: 4500, type: 'run.node.tool-call', nodeId: 'triage-1', nodeName: 'Inbox Triage Agent', message: 'Labeling urgent items', toolName: 'gmail.label', toolInput: '3 emails → URGENT' },
  { delay: 5800, type: 'run.node.completed', nodeId: 'triage-1', nodeName: 'Inbox Triage Agent', message: '3 urgent, 9 routine. Handing off to Research Agent.' },
  { delay: 6200, type: 'run.node.started', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Research Agent starting...' },
  { delay: 7000, type: 'run.node.tool-call', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Searching for context', toolName: 'web.search', toolInput: 'Q2 2026 enterprise SaaS benchmarks' },
  { delay: 12500, type: 'run.node.failed', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Request timed out after 10s', errorCode: 'TIMEOUT' },
]

export const TRIAGE_RETRY_SCRIPT: ScriptStep[] = [
  { delay: 0, type: 'run.node.started', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Retrying Research Agent...', retryCount: 1 },
  { delay: 800, type: 'run.node.tool-call', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Searching (retry)', toolName: 'web.search', toolInput: 'enterprise SaaS Q2 2026' },
  { delay: 3200, type: 'run.node.step', nodeId: 'research-1', nodeName: 'Research Agent', message: 'Found 8 sources. Summarizing key insights...' },
  { delay: 5500, type: 'run.node.completed', nodeId: 'research-1', nodeName: 'Research Agent', message: '3 key insights identified. Passing to Report Generator.' },
  { delay: 5900, type: 'run.node.started', nodeId: 'report-1', nodeName: 'Report Generator', message: 'Report Generator starting...' },
  { delay: 6800, type: 'run.node.tool-call', nodeId: 'report-1', nodeName: 'Report Generator', message: 'Creating Notion doc', toolName: 'notion.create', toolInput: 'Weekly Email Intelligence Report' },
  { delay: 8200, type: 'run.node.tool-call', nodeId: 'report-1', nodeName: 'Report Generator', message: 'Posting summary to Slack', toolName: 'slack.post', toolInput: '#ops-alerts' },
  { delay: 9500, type: 'run.node.completed', nodeId: 'report-1', nodeName: 'Report Generator', message: 'Report published. Check #ops-alerts.' },
  { delay: 9800, type: 'run.completed', nodeId: '', nodeName: '', message: 'Workflow complete in 24.1s' },
]
