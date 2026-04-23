import type { FastifyInstance } from 'fastify'

const TEMPLATES = [
  { id: 'email-triage', name: 'Email Triage Agent', agentCount: 3, estimatedRunTime: '~24s', icon: '📬' },
  { id: 'research-agent', name: 'Research Agent', agentCount: 2, estimatedRunTime: '~35s', icon: '🔍' },
  { id: 'report-generator', name: 'Report Generator', agentCount: 2, estimatedRunTime: '~18s', icon: '📊' },
]

export async function templatesRoutes(app: FastifyInstance) {
  app.get('/api/templates', async (_request, reply) => {
    reply.send(TEMPLATES)
  })

  app.get('/api/templates/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const template = TEMPLATES.find((t) => t.id === id)
    if (!template) return reply.status(404).send({ error: 'Not found' })
    reply.send(template)
  })
}
