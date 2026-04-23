import { useEffect, useRef } from 'react'
import { useRunStore } from '../store/runStore'
import { useCanvasStore } from '../store/canvasStore'
import type { RunEvent } from '../types/runs'

export function useRunSimulation() {
  const { runId, phase, addEvent, setPhase, setActiveNode, setErrorNode } = useRunStore()
  const { updateNodeStatus } = useCanvasStore()
  const esRef = useRef<EventSource | null>(null)

  useEffect(() => {
    if (!runId || phase !== 'running') return

    const es = new EventSource(`/api/runs/${runId}/stream`)
    esRef.current = es

    es.onmessage = (e) => {
      try {
        const sseEvent = JSON.parse(e.data)
        const { type, payload } = sseEvent

        const runEvent: RunEvent = {
          id: sseEvent.id,
          nodeId: payload.nodeId,
          nodeName: payload.nodeName,
          type: mapSSEType(type),
          message: payload.message,
          toolName: payload.toolName,
          toolInput: payload.toolInput,
          elapsed: payload.elapsed,
          timestamp: sseEvent.timestamp,
        }

        addEvent(runEvent)

        switch (type) {
          case 'run.node.started':
            setActiveNode(payload.nodeId)
            updateNodeStatus(payload.nodeId, 'running')
            break
          case 'run.node.completed':
            updateNodeStatus(payload.nodeId, 'success')
            break
          case 'run.node.failed':
            updateNodeStatus(payload.nodeId, 'error')
            setErrorNode(payload.nodeId)
            setPhase('error')
            es.close()
            break
          case 'run.completed':
            setPhase('success')
            setActiveNode(null)
            es.close()
            break
          case 'run.failed':
            setPhase('error')
            setActiveNode(null)
            es.close()
            break
        }
      } catch {
        // ignore parse errors
      }
    }

    es.onerror = () => {
      es.close()
    }

    return () => {
      es.close()
    }
  }, [runId, phase])
}

function mapSSEType(type: string): RunEvent['type'] {
  switch (type) {
    case 'run.queued': return 'queued'
    case 'run.node.started': return 'node-started'
    case 'run.node.tool-call': return 'tool-call'
    case 'run.node.step': return 'step'
    case 'run.node.completed': return 'completed'
    case 'run.node.failed': return 'failed'
    case 'run.completed': return 'run-complete'
    case 'run.failed': return 'run-failed'
    default: return 'step'
  }
}
