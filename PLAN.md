# Conductor — Implementation Plan

> Visual Command Center for AI Agents | PRD v1.0 | Target Launch: Q4 2026 (Private Beta)
> North Star: Weekly Active Workspaces with at least one successful agent run.

---

## Milestone Status

| Milestone | Phase | Timeline | Status |
|-----------|-------|----------|--------|
| M0 — Demo Prototype | Pre-funding | Week 1 (done) | ✅ Complete |
| M1 — Demo Recording | Pre-funding | This week | 🔄 In progress |
| M2 — Real Foundation | Phase 0 | Months 1–2 | Not started |
| M3 — Private Beta | Phase 1 | Months 3–5 | Not started |
| M4 — Public Launch | Phase 2 | Months 6–8 | Not started |
| M5 — Scale | Phase 3 | Months 9–12 | Not started |

---

## M0 — Demo Prototype ✅ COMPLETE

**Goal:** A polished, fully-simulated demo prototype for YC/a16z investor pitch.

**What was built:**
- Dark spatial canvas — React Flow v11, dot grid, zoom/pan, memoized custom nodes
- AgentNode, TriggerNode, ToolNode with full status animation (idle → queued → running → success/error)
- Node glow (purple) on running, shake + red glow on error, live tool-call display inside running nodes
- TypedEdge with hover payload preview
- Agent Inspector panel — model dropdown, system prompt, tools, cost estimator (slides without canvas reflow)
- 3 seeded templates (Email Triage, Research Agent, Report Generator) with one-click install
- SSE run simulation — Fastify, scripted setTimeout chains, deterministic 1:20 demo sequence
- Scripted failure at 12.5s (Research Agent TIMEOUT) + retry flow
- Run Feed — live scrolling event log with tool-call rows
- Observability Dashboard — 5 KPI cards (Total Runs hero at 48px), 7-day chart, recent runs table
- Fake collaboration — avatar stack, activity feed, comment pin on Research Agent node
- Retry button: "↻ Retry Research Agent"

**Stack:** React 18 + TypeScript + Vite + React Flow v11 + Zustand + Recharts / Fastify + SSE

---

## M1 — Demo Recording 🔄 IN PROGRESS

**Goal:** Record the 1:20 demo video. Everything is built — this is human execution only.

**Assignment: You (not Claude or Kimi)**

| Task | Owner |
|------|-------|
| Visual QA at 1280×800 — verify glow, shake, tool-call display, hero number, inspector slide | You |
| Walk the 1:20 script once dry before recording | You |
| Record with QuickTime/Loom | You |

**The 1:20 script:**
```
0:00  Open Conductor — empty canvas, tagline visible
0:05  Click "Browse Templates"
0:10  Click "Email Triage Agent" — canvas populates
0:18  Click Research Agent node — Inspector slides open (no canvas jump)
0:22  Change model to Claude 3 Opus
0:28  Close inspector → click Run
0:35  Trigger turns green → Triage Agent glows purple, tool call shows inside node
0:42  Triage Agent completes → Research Agent starts glowing
0:50  Research Agent fails at ~12s — node shakes red, error panel appears
0:55  Click "↻ Retry Research Agent"
1:05  Research Agent retries → completes → Report Generator runs → completes
1:10  Click Dashboard tab
1:15  Hero number: 1.2K runs. Cost: $187.40.
1:20  Pause. Done.
```

---

## M2 — Real Foundation

**PRD Phase 0 | Months 1–2**
**Goal:** One real end-to-end agent run with Claude. Internal team demo running 5 agent types.

| Task | Complexity | Assign |
|------|-----------|--------|
| Anthropic SDK integration — real Claude API calls from agent nodes | High — new async pattern, streaming responses, error handling | **Claude** |
| Agent execution engine — replace fake SSE with real model call + tool dispatch loop | High — core architecture, replaces entire simulator | **Claude** |
| PostgreSQL schema — workspaces, agents, runs, events | High — data model shapes everything downstream | **Claude** |
| Redis + BullMQ job queue for async agent runs | High — distributed systems, failure handling | **Claude** |
| Clerk auth — signup, login, JWT, protected routes | High — security, session management | **Claude** |
| Execution sandbox decision (Firecracker vs Modal vs E2B) + wiring | High — CEO open question #1, cost/latency tradeoffs | **Claude** |
| Real MCP server connection panel (URL input, auto-discovery, tool list) | High — new protocol integration, unknown tool shapes | **Claude** |
| SSE → WebSocket upgrade for bidirectional run control (cancel, pause) | Medium — protocol change, touches both ends | **Claude** |
| Model capability tags in model dropdown (vision, tool-use, speed tier) | Low — add tag badges to existing dropdown items, exact UI specified | **Kimi** |
| Snap-to-grid toggle in canvas toolbar | Low — React Flow `snapToGrid` prop, add toggle button | **Kimi** |
| Canvas loop detection warning (visual cycle indicator on edges) | Low — detect cycles in edge graph, show warning badge | **Kimi** |
| "Last run at" timestamp on node cards | Low — read from run store, format relative time | **Kimi** |

---

## M3 — Private Beta

**PRD Phase 1 | Months 3–5**
**Goal:** Multi-agent pipelines, MCP support, monitoring dashboard, 100 beta users. 50% deploy an agent in under 30 minutes.

| Task | Complexity | Assign |
|------|-----------|--------|
| Parallel branch execution (fan-out from one node to multiple) | High — graph traversal, concurrent run state, new edge types | **Claude** |
| Conditional routing (IF/ELSE branches based on agent output) | High — new node type, condition evaluation engine | **Claude** |
| Human-in-the-loop gates (pause pipeline, show approval prompt, resume) | High — new interaction pattern, run state machine changes | **Claude** |
| Configurable retry logic with exponential backoff | High — run engine rewrite, state persistence | **Claude** |
| Real observability dashboard wired to live run data from Postgres | High — query layer, aggregation, time-series | **Claude** |
| Workspace sharing — invite by email, roles (Owner, Editor, Viewer, Operator) | High — auth + permissions + invite flow | **Claude** |
| Agent-level permissions (who can edit vs run specific agents) | High — RBAC attached to individual nodes | **Claude** |
| MCP credential vault (encrypted, per-workspace) | High — security, key management | **Claude** |
| Webhook trigger — auto-generate endpoint URL, validate payload | High — new backend surface, security | **Claude** |
| Scheduled cron trigger — visual builder, no cron string required | Medium — new trigger type, cron UI component | **Claude** |
| Canvas comments (real, not fake) — comment on any node, thread replies | Medium — new data model + UI, but pattern is clear | **Kimi** |
| Activity feed wired to real workspace events | Low — once event stream exists, display is mechanical | **Kimi** |
| Run history table per agent (click node → see last N runs) | Low — query + table render, design already exists in dashboard | **Kimi** |
| Token usage graph per agent (bar chart, day/week/month toggle) | Low — Recharts, same pattern as existing RunsChart | **Kimi** |
| Latency heatmap — highlight slow steps in pipeline | Low — color scale on step durations, visual only | **Kimi** |
| Error rate tracker — failure patterns summarized per agent | Low — aggregate query result displayed in existing KpiCard pattern | **Kimi** |
| Template rating + usage count display | Low — counter badges on TemplateCard | **Kimi** |
| Beta user onboarding email sequence | Human | You |

---

## M4 — Public Launch

**PRD Phase 2 | Months 6–8**
**Goal:** Template marketplace, billing, team collaboration. 1,000 paid workspaces, $50K MRR.

| Task | Complexity | Assign |
|------|-----------|--------|
| Template marketplace — publish, discover, install community templates | High — new product surface, publisher permissions, review flow | **Claude** |
| Billing — Stripe integration, plan enforcement, usage metering | High — money, sensitive, plan-gating logic | **Claude** |
| Event-based triggers (file upload, email receipt, form submission) | High — integrations with external systems, webhook ingestion | **Claude** |
| Agent-to-agent triggers (output condition → fire next agent) | High — new edge evaluation logic, event routing | **Claude** |
| Marketplace revenue model (cut of paid templates) — CEO decision #2 | High — business logic, publisher payouts | **Claude** |
| Rich system prompt editor — variable injection from data sources | Medium — editor component + data source bindings | **Claude** |
| Prompt version history + A/B test mode | Medium — new data model + diff UI | **Claude** |
| Run limits enforcement per plan tier (free: 500/mo, pro: 5K/mo) | Low — middleware check against usage counter | **Kimi** |
| Plan tier badges and upgrade prompts in UI | Low — conditional UI based on plan, exact designs can be spec'd | **Kimi** |
| Template rating/filtering/search UI | Low — filter bar + sort, existing card components | **Kimi** |
| "Published by" attribution on template cards | Low — author badge, one field addition | **Kimi** |
| Cost dashboard — spend per agent, per workspace, per member | Low — aggregate query result, new KpiCard breakdown | **Kimi** |
| Audit log table — every run and config change with actor attribution | Low — table render, data already in Postgres | **Kimi** |
| Product Hunt / Hacker News launch | Human | You |

---

## M5 — Scale

**PRD Phase 3 | Months 9–12**
**Goal:** Enterprise contracts, 10K workspaces, on-prem option.

| Task | Complexity | Assign |
|------|-----------|--------|
| Enterprise SSO (Clerk + SAML/OIDC) | High — enterprise auth standards | **Claude** |
| On-premise deployment option (Docker Compose, self-hosted infra) | High — new deployment target, config management | **Claude** |
| Mobile monitor app (view run status, approve human-in-the-loop gates) | High — new platform, React Native or PWA decision | **Claude** |
| Community marketplace (open publishing, moderation pipeline) | High — trust/safety, scale concerns | **Claude** |
| Agent execution p95 latency to first token under 800ms | High — profiling, caching, infra optimization | **Claude** |
| Enterprise RBAC (department-level, custom roles) | High — complex permissions graph | **Claude** |
| SLA alerting — breach detection, PagerDuty/Slack notifications | Medium — threshold monitoring, notification routing | **Claude** |
| Mobile-optimized read-only dashboard views | Low — responsive CSS pass on existing dashboard | **Kimi** |
| Custom workspace branding (logo, accent color) | Low — CSS variable injection per workspace | **Kimi** |
| "Share run" permalink — read-only view of a specific run | Low — public route + run data snapshot | **Kimi** |

---

## Claude vs Kimi — Decision Rule

**Claude:** New architecture patterns, real backend integration, security/auth, complex cross-system wiring, anything requiring product judgment or debugging unknown systems.

**Kimi:** Tasks where the spec can be written as exact before/after code — CSS/styling additions, simple UI components that follow an existing pattern, counter/badge displays, table renders once the data exists.

When in doubt: if the task could break something invisible (auth, permissions, data loss, race conditions), it goes to Claude. If the worst case is a visual bug, it can go to Kimi.

---

## Stack Reference

| Layer | Demo Prototype (now) | V1 Target |
|-------|---------------------|-----------|
| Frontend | React 18 + TypeScript + Vite | Same |
| Canvas | React Flow v11 | Same |
| State | Zustand | Zustand + React Query |
| Real-time | SSE (simulated) | WebSocket (real) |
| Backend | Fastify (in-memory) | Fastify + PostgreSQL + Redis |
| Queue | None (setTimeout) | BullMQ |
| Auth | None | Clerk (JWT + SSO) |
| Execution | Simulated | Firecracker / Modal / E2B (TBD) |
| Styling | Tailwind v4 + Radix UI | Same |

## Design Tokens (frozen — do not drift)

```
Accent:   #5E6AD2  (Linear purple — primary action, running state, glow)
Success:  #22C55E
Error:    #EF4444
Warning:  #F59E0B
Surface:  #141414  (node cards, panels)
Base:     #0A0A0A  (canvas background)
Border:   #2A2A2A
```

---

## Open CEO Decisions (from PRD §10)

1. **Execution sandbox** — Firecracker microVMs vs Modal.com vs E2B. Cost and latency tradeoffs. Decide by end of Month 1.
2. **Marketplace revenue** — Take a cut of paid community templates? Affects publisher relationships.
3. **On-prem timeline** — Enterprise will demand it. How early to invest given infra architecture impact?
4. **Team headcount** — Need Canvas/Frontend specialist, distributed systems engineer, Head of Design. CEO approval on comp.
5. **AI-assisted agent building** — Natural language → agent config. Significant differentiator but expands scope materially.
