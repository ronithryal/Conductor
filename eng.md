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
- [ ] Inspector panel margin-right transition on canvas could be smoother
- [ ] `useCanvasKeyboard` — Cmd+A selects nodes in the store but React Flow's visual selection is a separate concept; may need wiring
- [ ] No loading skeleton for template picker (minor)
- [ ] ActivityFeed is positioned absolutely over the canvas bottom-left — needs to be moved to a better spot (currently overlaps canvas nodes if zoomed out)

---

## Day 2 — (upcoming)

Focus: verify run animation end-to-end in browser, fix any visual issues from Day 1, polish node status transitions.

---

## Day 3 — (upcoming)

Focus: demo script dry run, final polish, record the video.
