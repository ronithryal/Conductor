import { create } from 'zustand'
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from 'reactflow'
import type { NodeStatus, AgentNodeData } from '../types/nodes'
import { TEMPLATES } from '../data/templates'

interface CanvasStore {
  nodes: Node[]
  edges: Edge[]
  selectedNodeId: string | null
  templateAnimating: boolean
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  loadTemplate: (templateId: string) => void
  updateNodeStatus: (nodeId: string, status: NodeStatus) => void
  updateNodeData: (nodeId: string, data: Partial<AgentNodeData>) => void
  selectNode: (nodeId: string | null) => void
  clearCanvas: () => void
  resetNodeStatuses: () => void
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  templateAnimating: false,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) })
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) })
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, type: 'typed', data: { connectionType: 'data', payloadPreview: '{ ... }' } },
        get().edges,
      ),
    })
  },

  loadTemplate: (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId)
    if (!template) return
    set({ templateAnimating: true })
    set({ nodes: template.nodes, edges: template.edges })
    setTimeout(() => set({ templateAnimating: false }), 600)
  },

  updateNodeStatus: (nodeId: string, status: NodeStatus) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, status } } : n,
      ),
    })
  },

  updateNodeData: (nodeId: string, data: Partial<AgentNodeData>) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    })
  },

  selectNode: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId })
  },

  clearCanvas: () => {
    set({ nodes: [], edges: [], selectedNodeId: null })
  },

  resetNodeStatuses: () => {
    set({
      nodes: get().nodes.map((n) => ({ ...n, data: { ...n.data, status: 'idle' } })),
    })
  },
}))
