# Engineering Log — Conductor

Running log of technical decisions, architecture changes, and build progress.

---

## Day 1 — 2026-04-23

### Stack locked

- Frontend: React 18 + TypeScript + Vite + Tailwind v4 + React Flow v11 + Zustand + Recharts
- Backend: Fastify (Node/TypeScript) + SSE, in-memory only
- Monorepo: pnpm workspaces (`apps/web`, `apps/api`)

### Architecture decisions

**Canvas engine: React Flow v11**
Considered custom SVG — ruled out, 3-day sprint leaves no time for a custom renderer. React Flow handles drag, connect, zoom, minimap, and node selection out of the box. We override all visual defaults.

**State: Zustand over React Context**
Four stores: `canvasStore` (nodes/edges), `runStore` (SSE-driven run state), `inspectorStore` (panel open/selected node), `dashboardStore` (seeded metrics). Zustand's targeted updates mean SSE events don't re-render the whole tree — only the affected node.

**Node components: `memo()` on all three**
Without this, every SSE event (which updates `runStore`) would re-render all AgentNodes via the canvasStore subscription. Memo gates re-renders on prop changes only.

**SSE over WebSocket**
SSE is simpler for unidirectional streaming (server → client). No upgrade handshake, no reconnect library needed (EventSource reconnects natively). Right call for a prototype.

**Scripted run simulation**
Each template has a hardcoded `ScriptStep[]` array with ms delays. `runEngine.ts` replays the script with `setTimeout` chains. This is 100% deterministic, which is exactly what you want for a recorded demo.

**Tailwind v4**
pnpm resolved v4.2.4 (not v3). v4 uses CSS-first config (`@theme` directive, no `tailwind.config.js`). Used `@tailwindcss/vite` plugin. All color tokens defined as CSS custom properties in `globals.css`.

### Key files

```
apps/web/src/
  components/canvas/ConductorCanvas.tsx   — React Flow root
  components/canvas/nodes/AgentNode.tsx   — primary node card
  components/canvas/edges/TypedEdge.tsx   — hover payload preview
  components/inspector/InspectorPanel.tsx — slide-in right panel
  components/runfeed/RunFeed.tsx          — live event feed
  components/dashboard/               — full observability tab
  store/canvasStore.ts                — node/edge state
  store/runStore.ts                   — SSE run state machine
  hooks/useRunSimulation.ts           — SSE → store wiring

apps/api/src/
  simulator/runEngine.ts              — setTimeout-based scripted runner
  simulator/scripts/triageScript.ts   — the demo script
  routes/runs.ts                      — POST /api/runs, GET /api/runs/:id/stream
```

### SSE event schema (implemented)

```
run.queued → run.node.started → run.node.tool-call → run.node.step
→ run.node.completed | run.node.failed → run.completed | run.failed
```

Failure fires at t=12.5s on `research-1`. Retry script picks up from `research-1` and runs through to `run.completed`.

### Known issues / Day 2 focus

- [ ] Node status does not visually reset when "Clear" is clicked after a run (resetNodeStatuses is wired but needs verification in browser)
- [x] Inspector panel margin-right transition on canvas — fixed (Chunk 4, Day 2)
- [ ] `useCanvasKeyboard` — Cmd+A selects nodes in the store but React Flow's visual selection is a separate concept; may need wiring
- [ ] No loading skeleton for template picker (minor)
- [ ] ActivityFeed is positioned absolutely over the canvas bottom-left — needs to be moved to a better spot (currently overlaps canvas nodes if zoomed out)

---

## Day 2 — 2026-04-23

### Completed

**Chunk 1 — Smoke test**
- API (3001) and web (5174) both start clean
- `/health`, `/api/templates` respond correctly
- SSE stream: `run.node.failed` fires on `research-1` at 12.5s as scripted
- Retry stream reaches `run.completed` at ~9.8s
- TypeScript: zero errors on both packages

**Chunk 2 — Node status reset**
- Clear button wiring confirmed correct: `resetRun()` + `resetNodeStatuses()` in one handler
- Added defensive `resetNodeStatuses()` call to `TopNav.handleRun` — nodes now reset to idle at the start of every run, not just after Clear
- Bug found: trigger-1 never animates (no status styling in TriggerNode, `run.queued` event unhandled) — deferred to Chunk 5

**Chunk 3 — ActivityFeed overlap**
- Root cause: ActivityFeed was `position: absolute` in the AppShell layer, outside the canvas column. `bottom: 220` put it at canvas bottom-left, overlapping nodes on viewports shorter than ~750px
- Fix: moved ActivityFeed inside the canvas column div (now respects inspector margin automatically), repositioned to `top: 8, left: 8` as a floating panel with `backdrop-filter: blur` and rounded border. Clear of nodes at all viewport sizes.

**Chunk 4 — Inspector panel transition**
- Root cause: canvas column used `marginRight: panelOpen ? 300 : 0` with a CSS transition. Opening/closing the inspector triggered a full layout reflow on the React Flow viewport, causing a visible jump.
- Fix: removed `marginRight` and its transition from the canvas column entirely — the panel is `position: absolute`, so the canvas never needed to shrink. Removed the early `return null` guard and `slide-in-right` animation class from `InspectorPanel`. Panel is now always mounted; open/close is driven by `transform: translateX(0)` ↔ `translateX(100%)` with a `transition: transform 0.2s ease`. Canvas layout is never touched.

**Chunk 5 — Trigger-1 animation**
- Root cause: `run.queued` SSE event was mapped in `mapSSEType` but had no case in the switch handler. Trigger node never changed state.
- Fix: added `case 'run.queued'` that calls `updateNodeStatus(payload.nodeId, 'success')`. The payload already carries `nodeId: 'trigger-1'`.

**Chunk 5b — Node glow on running state**
- Root cause: `pulse-ring` keyframe only animated an expanding ring with no base glow.
- Fix: updated all three keyframe stops to include the layered box-shadow glow (`0 0 0 1px #5E6AD2, 0 0 20px rgba(94,106,210,0.5), 0 0 40px rgba(94,106,210,0.2)`) with a 4th layer for the pulsing ring on top. `node-running` class was already wired — no component change needed.

**Chunk 5c — Live tool-call display inside node**
- Added optional `activeToolCall: { toolName: string; toolInput: string } | null` to `AgentNodeData` type.
- `useRunSimulation.ts`: `run.node.tool-call` events now call `updateNodeData` to set `activeToolCall` on the node. `run.node.completed` and `run.node.failed` clear it via `updateNodeData(nodeId, { activeToolCall: null })`.
- `AgentNode.tsx`: renders a small monospace block below the tool chips when `data.activeToolCall` is set — shows tool name in accent color and truncated input. Disappears automatically when the node completes or errors.

**Chunk 7 — Failure shake + red glow + retry label**
- Added `@keyframes shake` and `.node-shake` to `globals.css`.
- `getStatusStyle` now returns a `boxShadow` property. Error case uses `node-shake` class (plays once) and red glow `boxShadow`. All other cases return `undefined`.
- Node div spreads `boxShadow` from `getStatusStyle`.
- Retry button label changed from "↻ Retry" to "↻ Retry Research Agent".

**Chunk 7b — Dashboard hero number**
- Added `hero?: boolean` prop to `KpiCard`. When `hero` is true, font size jumps to 48px.
- `ObservabilityDashboard` passes `hero` to the Total Runs card only.

**Chunk 6 — Demo golden path dry run**
- Walked the full 1:20 script via SSE stream verification (API + terminal).
- Event sequence confirmed: `run.queued` → trigger green → `run.node.started` + `run.node.tool-call` per agent → failure at 12.5s → retry → `run.completed`.
- All tool-call payloads have realistic `toolName` and `toolInput` values that will display well in the node UI.
- No "workflow tool" moments flagged — glow, shake, and live tool-call display are clear differentiators.

---

**Chunk 10 — Final browser pass**
- Zero `console.*` calls in `apps/web/src/` — DevTools console will be clean.
- Zero TypeScript errors on both packages.
- Zero TODO/FIXME/debugger markers in source.
- API-side `console.log` (startup) and `console.error` (boot failure) are intentional — do not appear in browser DevTools.
- Visual checks at 1280×800 (glow, shake, tool-call display, hero number, inspector slide) require a manual browser run before recording.
- Day 2 complete. All chunks 1–10 done.

---

## Day 3 — (upcoming)

Focus: manual visual QA at 1280×800, record the video.
