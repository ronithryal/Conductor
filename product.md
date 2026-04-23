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
2. **The UI is 10x better than terminals.** The canvas, live animation, and error UX are self-evidently better than tail -f logs and JSON.
3. **This founder ships.** Day 1 = full-stack prototype with SSE, custom canvas, scripted demo flow. That is the signal.

### Open questions (carry to CEO review)

1. **AI-assisted agent building** — should Conductor have a built-in Claude that helps users write system prompts? This was flagged in the PRD as a significant differentiator but scope-expanding. Defer to Phase 2, but design the inspector panel to accommodate it (prompt assistant could be a tab next to the system prompt editor).

2. **Execution sandbox decision** — PRD flags Firecracker vs. Modal vs. E2B. For the prototype it doesn't matter. For Phase 1 beta it matters a lot. Need CEO decision before Month 1 closes.

3. **Template marketplace** — the 3 seeded templates are placeholders. What are the highest-ROI templates to build for the private beta? Need user research from the a16z Speedrun network.

4. **Pricing anchor** — Pro at $49/mo is the plan. Is 5K runs/mo the right ceiling? With the demo showing ~24s per run, that's ~33 hours of compute/month. Need to validate against actual beta usage.

---

## Roadmap snapshot

| Phase | Target | Status |
|-------|--------|--------|
| Phase 0 — Foundation | Months 1-2 | In progress (Day 1 of 3 for demo) |
| Phase 1 — Private Beta | Months 3-5 | Not started |
| Phase 2 — Public Launch | Months 6-8 | Not started |
| Phase 3 — Scale | Months 9-12 | Not started |

North star metric: **Weekly Active Workspaces with at least one successful agent run.**

---

## Future entries

*Log significant product decisions, pivots, user feedback, and scope changes here as they happen.*
