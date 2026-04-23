# Day 1 — Engineering Log

Day 1 complete. The app is running at http://localhost:5173.

## What's working

- Dark canvas with dot grid background, React Flow with all custom node types
- AgentNode cards with model badge, status LED, tool chips, comment pin
- TypedEdge with hover payload preview
- InspectorPanel slides in when clicking a node — model dropdown, system prompt, tools, cost estimator
- TemplatePicker modal with 3 seeded templates — one click populates the canvas
- Empty canvas state with "Browse Templates" CTA
- AppShell with TopNav (logo, tabs, avatar stack, Run button), RunFeed, Dashboard tab
- ActivityFeed with fake collaboration data
- Observability Dashboard with KPI cards, line chart, recent runs table
- Keyboard shortcuts (F, Escape, Cmd+0)

## What's wired end-to-end

- SSE backend serving scripted events with real timing
- `run.node.failed` fires at 12.5s for the Research Agent timeout
- Retry script completes all the way to `run.completed`
- Node status updates (idle → running → success/error) driven by SSE events
- RunFeed populates in real time with fade-up animation

## To run the app

```bash
cd /Users/ronith/Conductor

# Terminal 1 (API):
cd apps/api && pnpm dev

# Terminal 2 (Web):
cd apps/web && pnpm dev
```

Or from root: `pnpm dev` (runs both concurrently).

The demo flow is ready: load template → inspect → run → watch nodes animate → Research Agent fails → retry → report completes → flip to Dashboard.
