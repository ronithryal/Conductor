import Fastify from 'fastify'
import cors from '@fastify/cors'
import { runsRoutes } from './routes/runs.js'
import { templatesRoutes } from './routes/templates.js'

const app = Fastify({ logger: false })

await app.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST'],
})

await app.register(runsRoutes)
await app.register(templatesRoutes)

app.get('/health', async () => ({ ok: true }))

const port = Number(process.env.PORT) || 3001
try {
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`Conductor API running on http://localhost:${port}`)
} catch (err) {
  console.error(err)
  process.exit(1)
}
