import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { useCanvasStore } from '../store/canvasStore'
import { useInspectorStore } from '../store/inspectorStore'

export function useCanvasKeyboard() {
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const { nodes, selectNode } = useCanvasStore()
  const { closePanel, selectedNodeId } = useInspectorStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      if (e.key === 'Escape') {
        closePanel()
        selectNode(null)
        return
      }

      if (isInput) return

      if (e.key === 'f' || e.key === 'F') {
        fitView({ padding: 0.1, duration: 300 })
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault()
        fitView({ padding: 0.1, duration: 300 })
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault()
        nodes.forEach((n) => selectNode(n.id))
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fitView, nodes, closePanel, selectNode])
}
