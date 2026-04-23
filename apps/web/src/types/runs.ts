export type RunPhase = 'idle' | 'queued' | 'running' | 'success' | 'error'

export interface RunEvent {
  id: string
  nodeId: string
  nodeName: string
  type: 'queued' | 'node-started' | 'tool-call' | 'step' | 'completed' | 'failed' | 'run-complete' | 'run-failed'
  message: string
  toolName?: string
  toolInput?: string
  output?: string
  elapsed: number
  timestamp: number
}
