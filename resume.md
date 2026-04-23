# Conductor — Session Resume Guide

How to pick up exactly where we left off. Read this at the start of every new session.

---

## Current status — as of 2026-04-23 (end of Day 2, mid-sprint)

| Day | Focus | Status |
|-----|-------|--------|
| Day 1 | Shell + canvas, SSE backend, templates, dashboard, collaboration | Complete |
| Day 2 | Bug fixes, animation polish, visual differentiation, demo dry run | Complete |
| Day 3 | Demo script dry run, final polish, record video | Not started |

**The next thing to do:** Day 3 — manual visual QA at 1280×800 (glow, shake, tool-call display, hero number, inspector slide), then record the video.

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

## What's built (Day 1 + Day 2 chunks 1–4 complete)

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
- Fake collaboration — avatar stack in nav, activity feed panel (top-left floating), comment pin on Research Agent node
- Inspector panel opens/closes via `transform: translateX` — no canvas reflow (chunk 4 ✓)
- Trigger node turns green when workflow fires (chunk 5 ✓)
- Running nodes glow purple with layered box-shadow + pulsing ring (chunk 5b ✓)
- Live tool-call display inside running node — tool name + input, disappears on complete/error (chunk 5c ✓)
- Failed node shakes + red glow; retry button says "↻ Retry Research Agent" (chunk 7 ✓)
- Dashboard Total Runs hero number at 48px bold (chunk 7b ✓)
- Demo golden path SSE dry run verified — all events fire correctly in sequence (chunk 6 ✓)

---

## What's left — Day 2 remaining chunks

### Completed Day 2 chunks

| # | Chunk | Done |
|---|-------|------|
| 1 | Smoke test | ✓ |
| 2 | Node status reset | ✓ |
| 3 | ActivityFeed overlap | ✓ |
| 4 | Inspector panel transition | ✓ |
| 5 | Trigger-1 animation | ✓ |
| 5b | Node glow on running state | ✓ |
| 5c | Live tool-call display inside node | ✓ |
| 6 | Demo golden path dry run | ✓ |
| 7 | Failure shake + red glow + retry label | ✓ |
| 7b | Dashboard hero number | ✓ |
| 10 | Final browser pass | ✓ |

---

## The 1:20 demo script

```
0:00  Open Conductor — empty canvas, tagline visible
0:05  Click "Browse Templates"
0:10  Click "Email Triage Agent" — canvas populates with 4 nodes
0:18  Click Research Agent node — Inspector slides open
0:22  Change model to Claude 3 Opus
0:28  Close inspector — click Run
0:35  Nodes animate: Trigger turns green → Triage Agent starts (glow)
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
  components/canvas/nodes/AgentNode.tsx     ← primary node card, status LED, glow/shake here
  components/canvas/ConductorCanvas.tsx     ← React Flow root, edge animation
  components/runfeed/RunFeed.tsx            ← error panel, retry button
  components/dashboard/ObservabilityDashboard.tsx  ← hero number goes here
  components/dashboard/KpiCard.tsx          ← hero prop lives here
  components/layout/AppShell.tsx            ← inspector uses transform now (chunk 4 done)
  components/inspector/InspectorPanel.tsx   ← panel always mounted, slides via translateX
  hooks/useRunSimulation.ts                 ← SSE → store wiring, trigger-1 handling here
  store/runStore.ts                         ← run state machine
  store/canvasStore.ts                      ← node status updates
  styles/globals.css                        ← keyframes (pulse-ring, node-appear, shake goes here)

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
