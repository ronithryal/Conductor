import { create } from 'zustand'

interface InspectorStore {
  panelOpen: boolean
  selectedNodeId: string | null
  openPanel: (nodeId: string) => void
  closePanel: () => void
}

export const useInspectorStore = create<InspectorStore>((set) => ({
  panelOpen: false,
  selectedNodeId: null,
  openPanel: (nodeId: string) => set({ panelOpen: true, selectedNodeId: nodeId }),
  closePanel: () => set({ panelOpen: false, selectedNodeId: null }),
}))
