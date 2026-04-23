export type SSEEventType =
  | 'run.queued'
  | 'run.node.started'
  | 'run.node.tool-call'
  | 'run.node.step'
  | 'run.node.completed'
  | 'run.node.failed'
  | 'run.completed'
  | 'run.failed'

export interface SSEPayload {
  nodeId: string
  nodeName: string
  message: string
  toolName?: string
  toolInput?: string
  elapsed: number
  errorCode?: string
  retryCount?: number
}

export interface SSEEvent {
  id: string
  type: SSEEventType
  timestamp: number
  payload: SSEPayload
}

export interface ScriptStep {
  delay: number
  type: SSEEventType
  nodeId: string
  nodeName?: string
  message: string
  toolName?: string
  toolInput?: string
  errorCode?: string
  retryCount?: number
}
