import type { FastifyReply } from 'fastify'
import type { SSEEvent, ScriptStep } from '../types/events.js'
import { TRIAGE_SCRIPT, TRIAGE_RETRY_SCRIPT } from './scripts/triageScript.js'
import { RESEARCH_SCRIPT } from './scripts/researchScript.js'

const activeRuns = new Map<string, { aborted: boolean; timeouts: ReturnType<typeof setTimeout>[] }>()

function getScript(templateId: string, isRetry: boolean): ScriptStep[] {
  if (templateId === 'email-triage') return isRetry ? TRIAGE_RETRY_SCRIPT : TRIAGE_SCRIPT
  if (templateId === 'research-agent') return RESEARCH_SCRIPT
  return TRIAGE_SCRIPT
}

export function startRunEngine(
  runId: string,
  templateId: string,
  isRetry: boolean,
  reply: FastifyReply,
): void {
  const script = getScript(templateId, isRetry)
  const startTime = Date.now()
  const timeouts: ReturnType<typeof setTimeout>[] = []
  const run = { aborted: false, timeouts }
  activeRuns.set(runId, run)

  let eventCounter = 0

  const sendEvent = (step: ScriptStep) => {
    if (run.aborted) return
    const event: SSEEvent = {
      id: `evt-${++eventCounter}`,
      type: step.type,
      timestamp: Date.now(),
      payload: {
        nodeId: step.nodeId,
        nodeName: step.nodeName || '',
        message: step.message,
        toolName: step.toolName,
        toolInput: step.toolInput,
        elapsed: Date.now() - startTime,
        errorCode: step.errorCode,
        retryCount: step.retryCount,
      },
    }

    reply.raw.write(`data: ${JSON.stringify(event)}\n\n`)
  }

  for (const step of script) {
    const t = setTimeout(() => sendEvent(step), step.delay)
    timeouts.push(t)
  }

  const lastStep = script[script.length - 1]
  const closeDelay = lastStep.delay + 300
  const closeTimeout = setTimeout(() => {
    if (!run.aborted) {
      reply.raw.write(': stream complete\n\n')
      reply.raw.end()
      activeRuns.delete(runId)
    }
  }, closeDelay)
  timeouts.push(closeTimeout)
}

export function abortRun(runId: string): void {
  const run = activeRuns.get(runId)
  if (run) {
    run.aborted = true
    run.timeouts.forEach(clearTimeout)
    activeRuns.delete(runId)
  }
}

export function heartbeat(reply: FastifyReply, intervalMs = 15000) {
  const id = setInterval(() => {
    if (reply.raw.writableEnded) {
      clearInterval(id)
      return
    }
    reply.raw.write(': ping\n\n')
  }, intervalMs)
  reply.raw.on('close', () => clearInterval(id))
}
