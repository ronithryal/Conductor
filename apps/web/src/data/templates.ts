import type { Template } from '../types/templates'

export const TEMPLATES: Template[] = [
  {
    id: 'email-triage',
    name: 'Email Triage Agent',
    description: 'Monitors inbox, categorizes by urgency, researches context, generates a report',
    agentCount: 3,
    estimatedRunTime: '~24s',
    icon: '📬',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        position: { x: 80, y: 220 },
        data: { label: 'Email Trigger', triggerType: 'schedule', schedule: 'Every 15 min' },
      },
      {
        id: 'triage-1',
        type: 'agent',
        position: { x: 360, y: 220 },
        data: {
          name: 'Inbox Triage Agent',
          model: 'claude-sonnet-4',
          status: 'idle',
          tools: ['gmail.list', 'gmail.label'],
          systemPrompt:
            'You are an inbox triage agent. Scan the last 2 hours of unread email. Categorize each as URGENT, ROUTINE, or FYI. Label urgent emails and return a structured summary.',
          estimatedCost: '$0.002/run',
          retryCount: 0,
        },
      },
      {
        id: 'research-1',
        type: 'agent',
        position: { x: 660, y: 220 },
        data: {
          name: 'Research Agent',
          model: 'gpt-4o',
          status: 'idle',
          tools: ['web.search', 'notion.write'],
          systemPrompt:
            'You are a research agent. Given the urgent email topics, search the web for relevant context and recent data. Return 3-5 key insights with sources.',
          estimatedCost: '$0.008/run',
          retryCount: 0,
        },
      },
      {
        id: 'report-1',
        type: 'agent',
        position: { x: 960, y: 220 },
        data: {
          name: 'Report Generator',
          model: 'claude-sonnet-4',
          status: 'idle',
          tools: ['notion.create', 'slack.post'],
          systemPrompt:
            'You are a report generator. Combine the triage summary and research findings into a concise briefing. Create a Notion doc and post a summary to #ops-alerts.',
          estimatedCost: '$0.003/run',
          retryCount: 0,
        },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'trigger-1',
        target: 'triage-1',
        type: 'typed',
        data: { connectionType: 'trigger', payloadPreview: '{ type: "email_batch", count: 12 }' },
      },
      {
        id: 'e2-3',
        source: 'triage-1',
        target: 'research-1',
        type: 'typed',
        data: { connectionType: 'data', payloadPreview: '{ emails: [...], urgent_count: 3 }' },
      },
      {
        id: 'e3-4',
        source: 'research-1',
        target: 'report-1',
        type: 'typed',
        data: { connectionType: 'data', payloadPreview: '{ findings: [...], sources: 8 }' },
      },
    ],
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    description: 'Deep research on any topic: web search, synthesis, structured output',
    agentCount: 2,
    estimatedRunTime: '~35s',
    icon: '🔍',
    nodes: [
      {
        id: 'trigger-r1',
        type: 'trigger',
        position: { x: 80, y: 220 },
        data: { label: 'Manual Trigger', triggerType: 'manual' },
      },
      {
        id: 'research-r1',
        type: 'agent',
        position: { x: 360, y: 220 },
        data: {
          name: 'Deep Research Agent',
          model: 'gpt-4o',
          status: 'idle',
          tools: ['web.search', 'web.scrape', 'perplexity.search'],
          systemPrompt:
            'You are a deep research agent. Given a topic, run 5-7 web searches, scrape key sources, and synthesize findings into a structured report with citations.',
          estimatedCost: '$0.015/run',
          retryCount: 0,
        },
      },
      {
        id: 'writer-r1',
        type: 'agent',
        position: { x: 660, y: 220 },
        data: {
          name: 'Report Writer',
          model: 'claude-sonnet-4',
          status: 'idle',
          tools: ['notion.create', 'google-docs.create'],
          systemPrompt:
            'You are a report writer. Take structured research findings and write a polished executive summary. Format as Notion doc with TL;DR, key findings, and recommendations.',
          estimatedCost: '$0.005/run',
          retryCount: 0,
        },
      },
    ],
    edges: [
      {
        id: 'er1-2',
        source: 'trigger-r1',
        target: 'research-r1',
        type: 'typed',
        data: { connectionType: 'trigger', payloadPreview: '{ topic: "string", depth: "deep" }' },
      },
      {
        id: 'er2-3',
        source: 'research-r1',
        target: 'writer-r1',
        type: 'typed',
        data: { connectionType: 'data', payloadPreview: '{ findings: [...], sources: [...] }' },
      },
    ],
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    description: 'Pull data from multiple sources and generate a formatted weekly report',
    agentCount: 2,
    estimatedRunTime: '~18s',
    icon: '📊',
    nodes: [
      {
        id: 'trigger-rg1',
        type: 'trigger',
        position: { x: 80, y: 220 },
        data: { label: 'Weekly Schedule', triggerType: 'schedule', schedule: 'Every Monday 9am' },
      },
      {
        id: 'data-rg1',
        type: 'agent',
        position: { x: 360, y: 220 },
        data: {
          name: 'Data Collector',
          model: 'claude-sonnet-4',
          status: 'idle',
          tools: ['airtable.read', 'postgres.query', 'notion.read'],
          systemPrompt:
            'You are a data collection agent. Pull this week\'s metrics from Airtable, run the weekly summary query in Postgres, and fetch the team updates from Notion.',
          estimatedCost: '$0.004/run',
          retryCount: 0,
        },
      },
      {
        id: 'report-rg1',
        type: 'agent',
        position: { x: 660, y: 220 },
        data: {
          name: 'Report Generator',
          model: 'claude-opus-4',
          status: 'idle',
          tools: ['notion.create', 'slack.post', 'email.send'],
          systemPrompt:
            'You are a report generator. Take the collected data and write a weekly business report with charts, trends, and action items. Publish to Notion and email the team.',
          estimatedCost: '$0.020/run',
          retryCount: 0,
        },
      },
    ],
    edges: [
      {
        id: 'erg1-2',
        source: 'trigger-rg1',
        target: 'data-rg1',
        type: 'typed',
        data: { connectionType: 'trigger', payloadPreview: '{ week: "2026-W17", format: "executive" }' },
      },
      {
        id: 'erg2-3',
        source: 'data-rg1',
        target: 'report-rg1',
        type: 'typed',
        data: { connectionType: 'data', payloadPreview: '{ metrics: {...}, updates: [...] }' },
      },
    ],
  },
]
