export type NodeStatus = 'idle' | 'queued' | 'running' | 'success' | 'error'

export type ModelOption =
  | 'claude-sonnet-4'
  | 'claude-opus-4'
  | 'gpt-4o'
  | 'o3'
  | 'gemini-2-flash'
  | 'ollama-llama3'

export type ConnectionType = 'trigger' | 'data' | 'approval' | 'fallback'

export interface AgentNodeData {
  name: string
  model: ModelOption
  status: NodeStatus
  systemPrompt: string
  tools: string[]
  estimatedCost: string
  lastRunAt?: string
  retryCount: number
  activeToolCall?: { toolName: string; toolInput: string } | null
}

export interface ToolNodeData {
  name: string
  category: 'web' | 'files' | 'api' | 'database' | 'comms'
  status: NodeStatus
}

export interface TriggerNodeData {
  label: string
  triggerType: 'manual' | 'schedule' | 'webhook' | 'event'
  schedule?: string
}

export interface TypedEdgeData {
  connectionType: ConnectionType
  payloadPreview: string
  lastTransmit?: string
}
