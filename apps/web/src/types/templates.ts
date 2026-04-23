import type { Node, Edge } from 'reactflow'

export interface Template {
  id: string
  name: string
  description: string
  agentCount: number
  estimatedRunTime: string
  icon: string
  nodes: Node[]
  edges: Edge[]
}
