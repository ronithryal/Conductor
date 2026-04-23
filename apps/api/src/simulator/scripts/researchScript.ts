import type { ScriptStep } from '../../types/events.js'

export const RESEARCH_SCRIPT: ScriptStep[] = [
  { delay: 0, type: 'run.queued', nodeId: 'trigger-r1', nodeName: 'Manual Trigger', message: 'Manual run triggered' },
  { delay: 400, type: 'run.node.started', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: 'Deep Research Agent starting...' },
  { delay: 1000, type: 'run.node.tool-call', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: 'Running web search', toolName: 'web.search', toolInput: 'topic query' },
  { delay: 3500, type: 'run.node.step', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: 'Found 12 sources. Scraping top 5...' },
  { delay: 6000, type: 'run.node.tool-call', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: 'Scraping sources', toolName: 'web.scrape', toolInput: 'urls: [...]' },
  { delay: 9000, type: 'run.node.step', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: 'Synthesizing findings...' },
  { delay: 11000, type: 'run.node.completed', nodeId: 'research-r1', nodeName: 'Deep Research Agent', message: '8 key insights extracted from 12 sources.' },
  { delay: 11400, type: 'run.node.started', nodeId: 'writer-r1', nodeName: 'Report Writer', message: 'Report Writer starting...' },
  { delay: 12500, type: 'run.node.tool-call', nodeId: 'writer-r1', nodeName: 'Report Writer', message: 'Creating document', toolName: 'notion.create', toolInput: 'Research Report' },
  { delay: 14000, type: 'run.node.completed', nodeId: 'writer-r1', nodeName: 'Report Writer', message: 'Report published to Notion.' },
  { delay: 14300, type: 'run.completed', nodeId: '', nodeName: '', message: 'Workflow complete in 14.3s' },
]
