# Day 2 — Engineering Plan

Goal: everything works in the browser, the demo golden path is flawless, and the rough edges from Day 1 are gone. Day 3 is recording — nothing structural should change after today.

---

## Task Tracker

| # | Chunk | Priority | Est. | Status |
|---|-------|----------|------|--------|
| 1 | Boot & smoke test | Critical | 30m | [x] |
| 2 | Fix node status reset (Clear button) | Critical | 30m | [x] |
| 3 | Fix ActivityFeed overlap | High | 30m | [x] |
| 4 | Polish inspector panel transition | High | 45m | [ ] |
| 5 | Node status animation timing | High | 45m | [ ] |
| 6 | Demo golden path dry run | Critical | 60m | [ ] |
| 7 | Retry UX polish | High | 30m | [ ] |
| 8 | Wire Cmd+A to React Flow selection | Low | 30m | [ ] |
| 9 | Template picker loading skeleton | Low | 20m | [ ] |
| 10 | Final browser pass + eng log update | Critical | 30m | [ ] |

**Total estimated:** ~5.5 hours. Do chunks 1-7 in order. 8-9 are stretch if time allows.

---

## Chunk 1 — Boot & Smoke Test

**Goal:** confirm the app starts clean and the basic flow doesn't crash.

Steps:
1. `pnpm dev` from repo root — both API (port 3001) and web (port 5173) should start
2. Open browser, verify canvas loads with empty state + "Browse Templates" CTA
3. Open template picker, install Email Triage
4. Click Run — watch all nodes animate through states
5. Confirm Research Agent fails at ~12.5s with error panel
6. Click Retry — confirm run completes to `run.completed`
7. Flip to Dashboard tab — verify KPI cards and chart render

Write down every visual bug observed. Feed those into chunks 2-7.

---

## Chunk 2 — Fix Node Status Reset (Clear Button)

**Bug:** after a run, clicking Clear in the RunFeed should reset all node status LEDs to idle. `resetNodeStatuses` is wired in the store but the visual reset has not been confirmed in browser.

Files:
- `apps/web/src/components/runfeed/RunFeed.tsx` — Clear button handler
- `apps/web/src/store/canvasStore.ts` — `resetNodeStatuses()`
- `apps/web/src/store/runStore.ts` — `resetRun()`

What to verify:
- Clear button calls both `resetRun()` and `resetNodeStatuses()`
- Node LEDs go back to grey/idle color
- RunFeed events list empties
- Run button re-enables

Test sequence: run → wait for failure → click Retry → wait for complete → click Clear → all nodes show idle → run again cleanly.

---

## Chunk 3 — Fix ActivityFeed Overlap

**Bug:** ActivityFeed is `position: absolute` bottom-left on the canvas. When zoomed out on the Email Triage template (4 nodes), it overlaps the bottom node cards.

File: `apps/web/src/components/collaboration/ActivityFeed.tsx`
File: `apps/web/src/components/layout/AppShell.tsx`

Fix options (pick one):
- **Option A (recommended):** Move ActivityFeed out of the canvas div entirely. Dock it as a fixed strip at the bottom of AppShell, below the canvas, above nothing. Keep it always-visible but compact (collapsed by default, one-click expand).
- **Option B:** Keep it on the canvas but anchor it bottom-right instead of bottom-left, with a higher z-index and a semi-transparent backdrop so it doesn't fully obscure nodes.

Either way: it must not overlap canvas nodes during the demo. The demo camera will be on the canvas.

---

## Chunk 4 — Polish Inspector Panel Transition

**Issue:** when clicking a node to open the Inspector, the canvas column shrinks to make room (margin-right transition). Currently can feel jarring or jumpy.

Files:
- `apps/web/src/components/layout/AppShell.tsx` — layout column sizing
- `apps/web/src/components/inspector/InspectorPanel.tsx` — slide-in animation

What good looks like:
- Inspector slides in from the right with `transform: translateX` (not layout reflow)
- Canvas column does not jump — React Flow re-fits smoothly or stays put
- The transition takes 200-250ms, ease-out
- Closing the inspector is the reverse — no pop or snap

Check that the panel does not fight the React Flow minimap or overlap canvas controls.

---

## Chunk 5 — Node Status Animation Timing

**Goal:** the idle → running → success/error transitions need to feel alive but not distracting.

Files:
- `apps/web/src/styles/globals.css` — keyframes (`pulse-ring`, `node-appear`)
- `apps/web/src/components/canvas/nodes/AgentNode.tsx` — status LED and border color

Walk through each state visually:

| State | LED color | Border | Animation |
|-------|-----------|--------|-----------|
| idle | `#2A2A2A` | `#2A2A2A` | none |
| queued | `#F59E0B` | `#F59E0B` | slow pulse |
| running | `#5E6AD2` | `#5E6AD2` | `pulse-ring` |
| success | `#22C55E` | `#22C55E` | none (static) |
| error | `#EF4444` | `#EF4444` | none (static) |

Verify: when `run.node.started` fires, the node border and LED switch within one frame. No delay between SSE event and visual update. If there's a visible lag, check the Zustand subscription — confirm `AgentNode` is reading from `runStore` directly (not a prop drill that batches updates).

---

## Chunk 6 — Demo Golden Path Dry Run

**This is the most important chunk of Day 2.** Walk the exact 1:20 demo script end to end, camera-ready speed.

```
0:00  Open Conductor — empty canvas
0:05  Click "Browse Templates" — template picker opens
0:10  Click "Email Triage Agent" — canvas populates with 4 nodes
0:18  Click Research Agent node — Inspector slides open
0:22  Change model from Claude 3.5 Sonnet → Claude 3 Opus
0:28  Close Inspector — click Run
0:35  Nodes animate: Trigger fires → Email Triage starts → Research Agent starts
0:50  Research Agent fails — error panel appears in RunFeed
0:55  Click Retry
1:05  All nodes complete — run.completed fires
1:10  Click Dashboard tab — KPIs and chart visible
1:20  Pause on Dashboard — done
```

For every beat, ask: does this feel obvious? Would Alex (non-technical operations manager) know what to do without a tooltip? If no, flag it.

Document blockers. Anything that breaks the story gets fixed before Day 3.

---

## Chunk 7 — Retry UX Polish

The retry moment is the most important product statement in the demo ("Conductor handles failure gracefully"). It needs to feel intentional, not accidental.

Files:
- `apps/web/src/components/runfeed/RunFeed.tsx` — error panel + Retry button
- `apps/web/src/styles/globals.css` — error state styling

What to tighten:
- The error panel should be visually distinct from the event list — consider a red-tinted background or left border accent
- The Retry button label should be "Retry Research Agent" not just "Retry" — makes it clear *which* agent is being retried
- When Retry is clicked, the Research Agent node should visually reset to `queued` immediately (before the SSE stream starts) — no flash of stale `error` state
- After retry completes, the RunFeed should show a clean "Completed" banner — not just stop scrolling

---

## Chunk 8 — Wire Cmd+A to React Flow Selection (Stretch)

**Issue:** `useCanvasKeyboard` calls `selectNode` on Cmd+A, which sets `selectedNodeId` in the store. But React Flow's visual selection highlight is a separate internal concept — nodes may not show the blue selection ring.

File: `apps/web/src/hooks/useCanvasKeyboard.ts`

Fix: instead of (or in addition to) setting store state, use the React Flow instance's `setNodes` to set `selected: true` on all nodes:

```typescript
const { setNodes } = useReactFlow()
// on Cmd+A:
setNodes((nds) => nds.map((n) => ({ ...n, selected: true })))
```

Only do this if Chunk 6 reveals it's noticeable. Otherwise skip.

---

## Chunk 9 — Template Picker Loading Skeleton (Stretch)

**Issue:** template picker has no loading state — if there's any async (even a fake setTimeout), the modal can flash empty before cards appear.

File: `apps/web/src/components/templates/TemplatePicker.tsx`

Add a simple 3-card skeleton using CSS animation (`animate-pulse` equivalent in Tailwind v4). Only matters if the picker visibly flashes during the demo. Skip if it opens instantly.

---

## Chunk 10 — Final Browser Pass + Log Update

Before closing Day 2:

1. Full demo path one more time, clean browser (clear localStorage if any)
2. Open DevTools Console — zero errors, zero warnings (React Flow's `nodeTypes` warning should already be gone)
3. Check DevTools Network — SSE stream connects, no failed requests
4. Check at 1280x800 (laptop resolution likely used for recording)
5. Update `eng.md` Day 2 section with what was fixed and what remains
6. Commit: `git commit -m "Day 2: polish, fixes, demo-ready"`

---

## Definition of Done for Day 2

- [ ] Full demo golden path runs without intervention from 0:00 to 1:20
- [ ] No console errors during the run
- [ ] Node status LEDs reset cleanly after Clear
- [ ] ActivityFeed does not overlap canvas nodes
- [ ] Inspector slides in/out smoothly
- [ ] Retry button clearly labels which agent is retrying
- [ ] App looks correct at 1280x800

If all boxes are checked, Day 3 is just recording.
