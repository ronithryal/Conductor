# Conductor — Session Resume Guide

How to pick up exactly where we left off. Read this at the start of every new session.

---

## Current status — as of 2026-04-23 (end of Day 2, mid-sprint)

| Day | Focus | Status |
|-----|-------|--------|
| Day 1 | Shell + canvas, SSE backend, templates, dashboard, collaboration | Complete |
| Day 2 | Bug fixes, animation polish, visual differentiation, demo dry run | In progress — chunks 1-3 done, chunks 4-10 remaining |
| Day 3 | Demo script dry run, final polish, record video | Not started |

**The next thing to build:** Chunk 4 (inspector panel transition), then immediately into the visual differentiation work (chunks 5b and 5c). See below.

---

## How to run the app

You need both servers running simultaneously. Two terminals:

```bash
# Terminal 1 — Fastify API on port 3001
cd /Users/ronith/Conductor/apps/api && pnpm dev

# Terminal 2 — Vite web app on port 5173 (or 5174 if 5173 is taken)
cd /Users/ronith/Conductor/apps/web && pnpm dev
```

Or from the repo root to start both at once:

```bash
cd /Users/ronith/Conductor && pnpm dev
```

The web app proxies `/api/*` to `localhost:3001`. If the API isn't running, clicking Run fails silently.

---

## Verify before coding (run these first every session)

```bash
# 1. TypeScript — should return nothing (zero errors)
cd apps/web && npx tsc --noEmit
cd apps/api && npx tsc --noEmit

# 2. API health
curl http://localhost:3001/health
# → {"ok":true}

# 3. Full SSE stream — verify failure fires at 12.5s
RUN=$(curl -s -X POST http://localhost:3001/api/runs \
  -H "Content-Type: application/json" \
  -d '{"templateId":"email-triage","isRetry":false}')
RUN_ID=$(echo $RUN | python3 -c "import sys,json; print(json.load(sys.stdin)['runId'])")
curl -N --max-time 15 http://localhost:3001/api/runs/$RUN_ID/stream
# → should see run.node.failed on research-1 at ~12.5s
```

---

## What's built (Day 1 complete)

- Dark spatial canvas — React Flow v11, dot grid background, zoom/pan
- Three node types: AgentNode, TriggerNode, ToolNode — all custom styled, memoized
- TypedEdge with hover payload preview tooltip
- Agent Inspector right panel — model dropdown, system prompt, tools, cost estimator
- Three seeded templates with one-click install (Email Triage, Research Agent, Report Generator)
- SSE run simulation — Fastify backend, scripted setTimeout chains, deterministic timing
- Node status animations: idle → queued → running → success/error
- Scripted failure at 12.5s (Research Agent TIMEOUT) + retry flow
- Run Feed — scrolling live event log driven by SSE
- Observability Dashboard — KPI cards, 7-day run chart, recent runs table (all seeded)
- Fake collaboration — avatar stack in nav, activity feed panel (now top-left floating), comment pin on Research Agent node

---

## What's left — Day 2 remaining chunks

### Bugs and polish (pick up here)

| # | Chunk | Notes |
|---|-------|-------|
| 4 | Inspector panel transition | `margin-right` reflow on canvas is janky. Switch to `transform: translateX` on the panel so the canvas doesn't jump. 20-30 min. |
| 5 | Node animation timing + trigger node | Trigger-1 never animates — `run.queued` event unhandled in `useRunSimulation`. Add case to mark trigger-1 as success when workflow fires. |
| 10 | Final browser pass + log update | DevTools console clean, test at 1280×800, update eng.md, commit. |

### Visual differentiation — the demo's "unmissable" work

The current build looks like n8n or Make.com. These four moves create clear separation before recording. All are required.

| # | Move | File(s) | What to build |
|---|------|---------|--------------|
| 5b | Node glow on running state | `AgentNode.tsx`, `globals.css` | Add layered `box-shadow` radial glow when `status === 'running'`: `0 0 0 1px #5E6AD2, 0 0 20px rgba(94,106,210,0.5), 0 0 40px rgba(94,106,210,0.2)`. Makes the node literally light up. |
| 5c | Live tool-call display inside node | `AgentNode.tsx`, `runStore.ts` or `canvasStore.ts` | When `run.node.tool-call` fires for a node, show the current tool name + input inside the card. Small, monospace, replaces or sits below the tool chip list while running. Disappears on complete/error. No workflow tool does this. |
| 7 | Failure shake + prominent retry | `AgentNode.tsx`, `globals.css`, `RunFeed.tsx` | `@keyframes shake` plays once on `run.node.failed`. Red glow on error node. Retry button label should be "↻ Retry Research Agent" not just "↻ Retry". |
| 7b | Dashboard hero number | `ObservabilityDashboard.tsx` or `KpiCard.tsx` | Total runs (1,247) should be dominant — 48px bold, front and center. Other KPIs stay smaller. Investors pattern-match big run counts as "this is in production." |

### Demo golden path dry run (after visual work)

| # | Chunk | Notes |
|---|-------|-------|
| 6 | Demo golden path dry run | Walk the exact 1:20 script. Flag every moment that feels like "just another workflow tool." Fix before recording. |

---

## The 1:20 demo script

```
0:00  Open Conductor — empty canvas, tagline visible
0:05  Click "Browse Templates"
0:10  Click "Email Triage Agent" — canvas populates with 4 nodes
0:18  Click Research Agent node — Inspector slides open
0:22  Change model to Claude 3 Opus
0:28  Close inspector — click Run
0:35  Nodes animate: Trigger → Triage Agent starts (glow)
0:42  Triage Agent completes → Research Agent starts (glow)
0:50  Research Agent fails at ~12s — node shakes red, error panel
0:55  Click "↻ Retry Research Agent"
1:05  Research Agent retries → completes → Report Generator runs → completes
1:10  Click Dashboard tab
1:15  Hero number: 1,247 runs. Cost: $187.40.
1:20  Pause. Done.
```

Every UI decision is evaluated against: does this moment land?

---

## Key files to know

```
apps/web/src/
  components/canvas/nodes/AgentNode.tsx     ← primary node card, status LED, glow goes here
  components/canvas/ConductorCanvas.tsx     ← React Flow root, edge animation
  components/runfeed/RunFeed.tsx            ← error panel, retry button
  components/dashboard/ObservabilityDashboard.tsx  ← hero number goes here
  components/layout/AppShell.tsx            ← inspector margin transition
  hooks/useRunSimulation.ts                 ← SSE → store wiring, add trigger-1 handling here
  store/runStore.ts                         ← run state machine
  store/canvasStore.ts                      ← node status updates
  styles/globals.css                        ← keyframes (pulse-ring, node-appear, add shake here)

apps/api/src/
  simulator/scripts/triageScript.ts        ← the scripted demo sequence
  simulator/runEngine.ts                   ← setTimeout chain runner
  routes/runs.ts                           ← POST /api/runs, GET /api/runs/:id/stream
```

---

## Design tokens (do not drift from these)

```
Accent:   #5E6AD2  (Linear purple — primary action, running state, glow color)
Success:  #22C55E
Error:    #EF4444
Warning:  #F59E0B
Surface:  #141414  (node cards, panels)
Base:     #0A0A0A  (canvas background)
Border:   #2A2A2A
```

---

## Repo

https://github.com/ronithryal/Conductor
