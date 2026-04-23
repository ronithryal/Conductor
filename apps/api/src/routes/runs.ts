import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { startRunEngine, heartbeat } from '../simulator/runEngine.js'

const runMeta = new Map<string, { templateId: string; isRetry: boolean }>()

export async function runsRoutes(app: FastifyInstance) {
  app.post<{ Body: { templateId?: string; isRetry?: boolean } }>('/api/runs', async (request, reply) => {
    const { templateId = 'email-triage', isRetry = false } = request.body
    const runId = randomUUID()
    runMeta.set(runId, { templateId, isRetry })
    reply.send({ runId })
  })

  app.get<{ Params: { id: string } }>('/api/runs/:id/stream', async (request, reply) => {
    const { id } = request.params
    const meta = runMeta.get(id) ?? { templateId: 'email-triage', isRetry: false }

    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    heartbeat(reply)
    startRunEngine(id, meta.templateId, meta.isRetry, reply)

    await new Promise<void>((resolve) => {
      reply.raw.on('close', resolve)
    })
  })
}
