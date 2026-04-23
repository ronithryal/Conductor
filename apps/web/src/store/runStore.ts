import { create } from 'zustand'
import type { RunPhase, RunEvent } from '../types/runs'

interface RunStore {
  runId: string | null
  phase: RunPhase
  events: RunEvent[]
  activeNodeId: string | null
  errorNodeId: string | null
  startRun: (templateId: string) => Promise<string | null>
  addEvent: (event: RunEvent) => void
  setPhase: (phase: RunPhase) => void
  setActiveNode: (nodeId: string | null) => void
  setErrorNode: (nodeId: string | null) => void
  retryFromError: (templateId: string) => Promise<string | null>
  resetRun: () => void
}

export const useRunStore = create<RunStore>((set, get) => ({
  runId: null,
  phase: 'idle',
  events: [],
  activeNodeId: null,
  errorNodeId: null,

  startRun: async (templateId: string) => {
    set({ phase: 'queued', events: [], activeNodeId: null, errorNodeId: null })
    try {
      const res = await fetch('/api/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId }),
      })
      const { runId } = await res.json()
      set({ runId, phase: 'running' })
      return runId as string
    } catch {
      set({ phase: 'error' })
      return null
    }
  },

  addEvent: (event: RunEvent) => {
    set({ events: [...get().events, event] })
  },

  setPhase: (phase: RunPhase) => set({ phase }),

  setActiveNode: (nodeId: string | null) => set({ activeNodeId: nodeId }),

  setErrorNode: (nodeId: string | null) => set({ errorNodeId: nodeId }),

  retryFromError: async (templateId: string) => {
    set({ phase: 'queued', errorNodeId: null })
    try {
      const res = await fetch('/api/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, isRetry: true }),
      })
      const { runId } = await res.json()
      set({ runId, phase: 'running' })
      return runId as string
    } catch {
      set({ phase: 'error' })
      return null
    }
  },

  resetRun: () => {
    set({ runId: null, phase: 'idle', events: [], activeNodeId: null, errorNodeId: null })
  },
}))
