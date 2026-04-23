# Product Journal — Conductor

Running log of product vision, decisions, and changes. Written from the PM perspective.

---

## Vision (as of April 2026)

Conductor is the Windows of the agentic era.

The bet: the bottleneck for AI agent adoption is not model capability — it is interface design. Every powerful technology goes through a DOS-to-Windows transition. We are building that transition for AI agents.

The core insight from the PRD: less than 1% of potential users can fluently operate an AI agent today. The rest are paralyzed by blank text boxes, terminal sessions, and config files. Conductor removes that barrier entirely with a spatial, visual, drag-and-drop workspace.

**Product metaphor:** Figma meets Factorio for AI agents. Figma for the spatial canvas UX. Factorio for the operational legibility — you can see exactly what your agents are doing, where they're stuck, and what they've produced.

---

## Target personas (from PRD)

**Alex the Automator** — Operations Manager, 50-person company. Used Zapier. Not a developer. Frustrated that AI agents require a CS degree. This is our wedge user. Every product decision must pass the Alex test: could Alex do this without reading a doc?

**Sam the Builder** — Freelance AI consultant. API-comfortable. Wants speed to prototype + clean client handoff. Our power user. Sam expands usage horizontally (more clients, more templates).

**Jordan the Operator** — Head of AI, 500-person enterprise. Fleet oversight, audit trails, cost controls. Our expansion buyer. Jordan writes the check when Alex and Sam prove the value.

---

## What is in the demo vs. what will be built

### In the demo prototype (Days 1-3 sprint)

Everything in the demo is seeded, simulated, and deterministic. The goal is to prove the interface thesis, not ship infrastructure. Nothing below requires a real API key, real database, or real execution environment.

| Feature | What it is in the demo | Status |
|---------|----------------------|--------|
| Visual canvas | React Flow with custom node types, dot grid bg, zoom/pan | Built |
| Agent node cards | Name, model badge, status LED, tool chips, cost estimate | Built |
| Trigger + Tool nodes | Supporting node types for the workflow graph | Built |
| Typed connection edges | Hover tooltip shows payload type + preview | Built |
| Agent Inspector panel | Model dropdown, system prompt editor, tool list, cost estimator | Built |
| Template picker | Modal with 3 seeded templates, one-click install | Built |
| Live run simulation | SSE stream from Fastify backend, scripted with real timing | Built |
| Node status animation | idle → queued → running → success/error, pulse on running | Built |
| Scripted failure + retry | Research Agent times out at 12.5s, retry completes the run | Built |
| Run feed | Scrolling log of SSE events with elapsed times | Built |
| Observability dashboard | KPI cards, 7-day run chart, recent runs table — all seeded | Built |
| Fake collaboration | Avatar stack in nav, activity feed panel, comment pin on node | Built |

### What will be built for private beta (Phase 1, Months 3-5)

These are real features that require real infrastructure. None of them are in the demo.

| Feature | Why it matters | Who needs it |
|---------|---------------|--------------|
| Real model calls | Demo uses simulated SSE. Beta needs actual Anthropic/OpenAI/Gemini API calls routed through Conductor | Sam, Alex |
| Execution sandbox | Agents need isolated compute to run tools safely. Decision: Firecracker vs. Modal vs. E2B (CEO decision needed before Month 1 closes) | All |
| Auth + accounts | Clerk SSO, workspace isolation, invite flow | All |
| Persistent storage | Postgres for workspaces/templates/runs, Redis for queue | All |
| Real tool integrations | Gmail, Slack, Notion, web search, file I/O — the actual MCP connections the demo fakes | Alex, Sam |
| Real-time collaboration | Multiple users editing the same canvas simultaneously (Liveblocks or Partykit) | Sam, Jordan |
| Template publishing | Users can save and share their own templates within a workspace | Sam |
| Basic RBAC | Admin vs. Member roles, workspace-level permissions | Jordan |
| Run history + replay | Persistent log of every run, ability to re-inspect any past run | Jordan |
| Cost tracking per run | Actual token usage and cost per agent per run, not estimates | Jordan |

### What will be built for public launch (Phase 2, Months 6-8)

| Feature | Why it matters |
|---------|---------------|
| AI-assisted agent building | Built-in Claude that helps users write system prompts. Flagged in PRD as the biggest differentiator. Inspector panel is already designed to accommodate a "Prompt Assistant" tab. |
| Open template marketplace | Community publishing, rating, and forking of templates |
| Agent versioning | Git-like history for agent configs — diff two versions, roll back |
| Full RBAC + SSO | Enterprise-grade permissions, SAML, audit log |
| Billing | Stripe integration, usage-based pricing, team seats |
| MCP integrations | Native support for the Model Context Protocol for tool discovery |
| Advanced triggers | Webhooks, event bus, CRON, conditional branching |

### What will be built for scale (Phase 3, Months 9-12)

| Feature | Why it matters |
|---------|---------------|
| Fleet management | Jordan's view: see every agent across every workspace, aggregate cost and error rates |
| Compliance + audit trails | Immutable logs, HIPAA/SOC2 readiness |
| White-label | Enterprise buyers want Conductor embedded in their own product |
| Agent marketplace (revenue share) | Community-built agents as a distribution channel |

---

## Day 1 — 2026-04-23

### What we built

Completed the Day 1 sprint: shell + canvas. In ~8 hours, from zero to a working prototype with:

- A dark, spatial canvas with React Flow and custom node cards
- 3 seeded templates (Email Triage, Research Agent, Report Generator)
- One-click template install that populates the canvas with animated nodes
- Agent Inspector panel (model dropdown, system prompt, tools, cost estimate)
- A simulated live run with SSE streaming — nodes animate through states in real time
- Scripted failure at 12.5s (Research Agent timeout) + retry flow
- Observability Dashboard tab with KPI cards, 7-day run chart, recent runs table
- Fake collaboration (avatar stack, activity feed)

### Key product decisions made today

**Scope: recorded demo, not live demo**
The prototype targets a 60-90 second recorded walkthrough for YC/a16z. This means all data can be seeded and all model calls can be simulated. The goal is to prove the interface thesis, not the infrastructure thesis.

**The failure moment is intentional product design**
The Research Agent timeout at 12.5s is not a bug in the demo — it is the most important moment. It shows that Conductor handles failure gracefully: you see exactly which agent failed, why, and you can retry with one click. This is what "operationally legible" means in practice. No terminal logs. No JSON. Just a clear error panel and a Retry button.

**The demo script maps to the product story**
```
0:00 — Problem frame ("MS-DOS era of agents")
0:10 — Install template (one click → canvas populates)
0:20 — Configure (change model, see tool list)
0:35 — Run (click Run → nodes animate live)
0:50 — Failure (Research Agent times out → error + retry)
1:05 — Observability (flip to Dashboard → show throughput + cost)
1:20 — Close ("Conductor is the Windows of the agentic era")
```

Every UI decision should be evaluated against: does this make the 1:20 story more or less compelling?

**Design direction: Linear-purple accent, dark-first, information-dense**
We chose #5E6AD2 (Linear purple) as the accent color. Linear is the benchmark for best-in-class SaaS UI. Associating Conductor's visual language with that standard is intentional. We are not building a consumer product — we are building for operators and builders who live in dark-mode tools.

**Fake collaboration is not fake product**
The avatar stack, activity feed, and comment pin are seeded/hardcoded. But they are not decoration — they represent a real product pillar (team collaboration) that we are committing to building. Showing it in the demo sets the expectation and lets investors visualize the team use case.

### What the demo proves

1. **The category is real.** If you can show a non-technical user building and running a 3-agent workflow in under 2 minutes, the market exists.
2. **The UI is 10x better than terminals.** The canvas, live animation, and error UX are self-evidently better than `tail -f` logs and JSON.
3. **This founder ships.** Day 1 = full-stack prototype with SSE, custom canvas, scripted demo flow. That is the signal.

### Open questions (carry to CEO review)

1. **AI-assisted agent building** — should Conductor have a built-in Claude that helps users write system prompts? This was flagged in the PRD as a significant differentiator but scope-expanding. Defer to Phase 2, but design the inspector panel to accommodate it (prompt assistant could be a tab next to the system prompt editor).

2. **Execution sandbox decision** — PRD flags Firecracker vs. Modal vs. E2B. For the prototype it doesn't matter. For Phase 1 beta it matters a lot. Need CEO decision before Month 1 closes.

3. **Template marketplace** — the 3 seeded templates are placeholders. What are the highest-ROI templates to build for the private beta? Need user research from the a16z Speedrun network.

4. **Pricing anchor** — Pro at $49/mo is the plan. Is 5K runs/mo the right ceiling? With the demo showing ~24s per run, that's ~33 hours of compute/month. Need to validate against actual beta usage.

---

## Day 2 — 2026-04-23

### What we fixed

Day 2 is the polish and verification sprint. The demo needs to be flawless end-to-end before Day 3 recording. Today's work is all bug fixes and UX tightening — no new features.

**Chunk 1 — Smoke test (complete)**
- Both servers (API port 3001, web port 5174) start clean
- Full SSE stream verified: `run.node.failed` fires on Research Agent at exactly 12.5s, retry stream completes to `run.completed` at ~9.8s
- TypeScript: zero errors on both packages

**Chunk 2 — Node status reset (complete)**
- Clear button wiring confirmed correct (already worked from Day 1)
- Added defensive `resetNodeStatuses()` call at the start of every Run click, not just after Clear. Prevents stale node colors if the demo host runs twice in a row without clearing.

**Chunk 3 — ActivityFeed overlap (complete)**
- Root cause: ActivityFeed was in the AppShell's absolute layer (outside the canvas column). `bottom: 220` positioning caused it to overlap canvas nodes on viewports shorter than ~750px, and it ignored the inspector's margin entirely.
- Fix: moved inside the canvas column, repositioned to `top: 8, left: 8` as a floating frosted-glass panel. Now clear of nodes at all viewport sizes, and automatically respects the inspector sliding in.

### Remaining Day 2 work

- [ ] Chunk 4: Inspector panel transition smoothness
- [ ] Chunk 5: Node status animation timing + trigger node animation fix
- [ ] Chunk 6: Demo golden path dry run against the 1:20 script
- [ ] Chunk 7: Retry UX polish (label, immediate visual reset)
- [ ] Chunk 10: Final browser pass + log update

---

## Roadmap snapshot

| Phase | Target | Status |
|-------|--------|--------|
| Phase 0 — Demo prototype | Days 1-3 (April 2026) | Day 2 of 3 — in progress |
| Phase 1 — Private Beta | Months 3-5 | Not started |
| Phase 2 — Public Launch | Months 6-8 | Not started |
| Phase 3 — Scale | Months 9-12 | Not started |

North star metric: **Weekly Active Workspaces with at least one successful agent run.**

---

## Future entries

*Log significant product decisions, pivots, user feedback, and scope changes here as they happen.*
