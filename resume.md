# Conductor — Session Resume Guide

How to pick up exactly where we left off. Read this at the start of every new session.

---

## Current status — as of 2026-04-23 (end of Day 2, mid-sprint)

| Day | Focus | Status |
|-----|-------|--------|
| Day 1 | Shell + canvas, SSE backend, templates, dashboard, collaboration | Complete |
| Day 2 | Bug fixes, animation polish, visual differentiation, demo dry run | In progress — chunks 1–4 done, chunks 5–10 remaining |
| Day 3 | Demo script dry run, final polish, record video | Not started |

**The next thing to build (Claude):** Chunk 5c (live tool-call display inside node), then chunk 6 (demo dry run), then chunk 10 (final pass).

**Delegated to Kimi (do in parallel):** Chunks 5, 5b, 7, 7b. Full copy-paste specs are in the Kimi section below.

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

---

## What's left — Day 2 remaining chunks

### Claude tasks

| # | Chunk | Notes |
|---|-------|-------|
| 5c | Live tool-call display inside node | When `run.node.tool-call` fires for a node, show current tool name + input inside the card. Monospace, small, below the tool chips while running. Disappears on complete/error. Requires SSE→store→AgentNode wiring. |
| 6 | Demo golden path dry run | Walk the exact 1:20 script. Flag every moment that feels like "just another workflow tool." Fix before recording. |
| 10 | Final browser pass + log update | DevTools console clean, test at 1280×800, update eng.md, commit. |

### Kimi tasks (full specs below — copy-paste ready)

| # | Chunk | Summary |
|---|-------|---------|
| 5 | Trigger-1 animation | One extra `case` in a switch statement |
| 5b | Node glow on running state | Update one CSS `@keyframes` block |
| 7 | Failure shake + red glow + retry label | New CSS keyframe, 3 small edits across 3 files |
| 7b | Dashboard hero number | Add `hero` prop to KpiCard, pass it for Total Runs |

---

## Kimi task specs

> Kimi: read each task fully before touching any file. Run `cd apps/web && npx tsc --noEmit` after each task — it must return zero output. Do not move to the next task if there are TypeScript errors.

---

### Kimi Task A — Chunk 5: Trigger-1 animation

**What and why:** The trigger node (id: `trigger-1`) never changes visual state during a run. When a workflow is queued, a `run.queued` SSE event fires but nothing handles it. Add one case to make it turn green.

**File:** `apps/web/src/hooks/useRunSimulation.ts`

Find the `switch (type)` block (around line 36). It currently starts with:

```ts
switch (type) {
  case 'run.node.started':
    setActiveNode(payload.nodeId)
    updateNodeStatus(payload.nodeId, 'running')
    break
```

Add the new case **before** `run.node.started` so it becomes:

```ts
switch (type) {
  case 'run.queued':
    updateNodeStatus('trigger-1', 'success')
    break
  case 'run.node.started':
    setActiveNode(payload.nodeId)
    updateNodeStatus(payload.nodeId, 'running')
    break
```

That is the only change. No other files need to be touched.

**Verify:** `cd apps/web && npx tsc --noEmit` returns zero output.

---

### Kimi Task B — Chunk 5b: Node glow on running state

**What and why:** When an agent node enters `running` state, it should glow purple so it literally lights up on screen. The CSS class `node-running` already gets applied but the `pulse-ring` keyframe only animates a faint ring. Replace the keyframe so the glow layers are always present and the outer ring pulses on top of them.

**File:** `apps/web/src/styles/globals.css`

Find this exact block:

```css
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(94, 106, 210, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(94, 106, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(94, 106, 210, 0); }
}
```

Replace it with:

```css
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 1px #5E6AD2, 0 0 20px rgba(94,106,210,0.5), 0 0 40px rgba(94,106,210,0.2), 0 0 0 0   rgba(94,106,210,0.6); }
  70%  { box-shadow: 0 0 0 1px #5E6AD2, 0 0 20px rgba(94,106,210,0.5), 0 0 40px rgba(94,106,210,0.2), 0 0 0 10px rgba(94,106,210,0); }
  100% { box-shadow: 0 0 0 1px #5E6AD2, 0 0 20px rgba(94,106,210,0.5), 0 0 40px rgba(94,106,210,0.2), 0 0 0 0   rgba(94,106,210,0); }
}
```

No other files need to change. `AgentNode.tsx` already applies the `node-running` class which already runs this keyframe.

**Verify:** `cd apps/web && npx tsc --noEmit` returns zero output (this is a CSS-only change so TS will always pass, but run it anyway).

---

### Kimi Task C — Chunk 7: Failure shake + red glow + retry button

**What and why:** When a node fails, it should shake once and glow red so the failure is unmissable. The retry button label should name the specific agent. Three files, three changes.

#### Change 1 of 3 — `apps/web/src/styles/globals.css`

At the very bottom of the file, after all existing content, add:

```css
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-6px); }
  40%     { transform: translateX(6px); }
  60%     { transform: translateX(-4px); }
  80%     { transform: translateX(4px); }
}

.node-shake {
  animation: shake 0.4s ease-out 1;
}
```

#### Change 2 of 3 — `apps/web/src/components/canvas/nodes/AgentNode.tsx`

**Step 2a — Update `getStatusStyle`.**

Find this entire function:

```ts
function getStatusStyle(status: string) {
  switch (status) {
    case 'running': return { border: '1.5px solid #5E6AD2', className: 'node-running' }
    case 'success': return { border: '1.5px solid #22C55E', className: '' }
    case 'error': return { border: '1.5px solid #EF4444', className: '' }
    case 'queued': return { border: '1.5px solid #F59E0B', className: '' }
    default: return { border: '1.5px solid #2A2A2A', className: '' }
  }
}
```

Replace it with:

```ts
function getStatusStyle(status: string) {
  switch (status) {
    case 'running': return { border: '1.5px solid #5E6AD2', className: 'node-running',  boxShadow: undefined }
    case 'success': return { border: '1.5px solid #22C55E', className: '',              boxShadow: undefined }
    case 'error':   return { border: '1.5px solid #EF4444', className: 'node-shake',    boxShadow: '0 0 0 1px #EF4444, 0 0 20px rgba(239,68,68,0.3)' }
    case 'queued':  return { border: '1.5px solid #F59E0B', className: '',              boxShadow: undefined }
    default:        return { border: '1.5px solid #2A2A2A', className: '',              boxShadow: undefined }
  }
}
```

**Step 2b — Destructure `boxShadow`.**

Find:

```ts
const { border, className } = getStatusStyle(data.status)
```

Replace with:

```ts
const { border, className, boxShadow } = getStatusStyle(data.status)
```

**Step 2c — Apply `boxShadow` to the node's outer `<div>`.**

Find this style object (it's on the outer `<div>` that wraps the whole node card):

```tsx
style={{
  background: '#141414',
  border: selected || selectedNodeId === id ? '1.5px solid #5E6AD2' : border,
  borderRadius: 10,
  width: 220,
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
}}
```

Replace with:

```tsx
style={{
  background: '#141414',
  border: selected || selectedNodeId === id ? '1.5px solid #5E6AD2' : border,
  borderRadius: 10,
  width: 220,
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',
  boxShadow: boxShadow,
}}
```

#### Change 3 of 3 — `apps/web/src/components/runfeed/RunFeed.tsx`

Find (around line 117):

```tsx
                    ↻ Retry
```

Replace with:

```tsx
                    ↻ Retry Research Agent
```

**Verify:** `cd apps/web && npx tsc --noEmit` returns zero output.

---

### Kimi Task D — Chunk 7b: Dashboard hero number

**What and why:** The Total Runs KPI (1,247) should dominate the dashboard at 48px bold — investors pattern-match big run counts as "this is in production." All other KPI cards stay at normal size.

#### Change 1 of 2 — `apps/web/src/components/dashboard/KpiCard.tsx`

Replace the entire file with:

```tsx
interface Props {
  label: string
  value: string
  sub?: string
  color?: string
  hero?: boolean
}

export function KpiCard({ label, value, sub, color = '#F2F2F2', hero = false }: Props) {
  return (
    <div style={{
      background: '#141414',
      border: '1px solid #2A2A2A',
      borderRadius: 10,
      padding: '16px 18px',
      flex: 1,
      minWidth: 120,
    }}>
      <div style={{ fontSize: 10, color: '#808080', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: hero ? 48 : 22, fontWeight: 700, color, marginBottom: 4, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: '#404040' }}>{sub}</div>}
    </div>
  )
}
```

#### Change 2 of 2 — `apps/web/src/components/dashboard/ObservabilityDashboard.tsx`

Find:

```tsx
        <KpiCard label="Total Runs" value={formatNumber(m.totalRuns)} sub="+12% vs last week" />
```

Replace with:

```tsx
        <KpiCard label="Total Runs" value={formatNumber(m.totalRuns)} sub="+12% vs last week" hero />
```

**Verify:** `cd apps/web && npx tsc --noEmit` returns zero output. Open the Dashboard tab — "1.2K" should appear much larger than the other KPI numbers.

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
