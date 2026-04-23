# Conductor

**The visual command center for AI agents.**

Conductor is a spatial canvas where you build, deploy, and monitor AI agent workflows without writing a single line of code. Think Figma meets Factorio — for agents.

---

## Why this exists

I kept running into the same wall: the agents I wanted to build were conceptually simple, but operating them was painful. Prompts lived in config files. Tool connections were YAML. Debugging meant reading raw JSON in a terminal. There was no way to see what was actually happening.

I wasn't alone. Jonathan Lai at a16z put it directly in his *Request for Startups* — "GUI for agents" is one of the clearest gaps in the current AI stack. The models are ready. The tools are ready. The interface layer doesn't exist yet.

Conductor is that interface layer.

---

## What it does

You drag agents onto a canvas. You connect them. You run the workflow and watch it execute — live, node by node, tool call by tool call. When something fails, you see exactly where and why, and retry from that point.

![Conductor canvas demo](docs/demo.gif)
*← drop your screen recording here*

### The canvas

- Infinite pannable/zoomable workspace
- Agent nodes with live status: idle → queued → running (glow) → success / error (shake)
- Tool calls stream inside the running node in real time — you can read the agent's mind
- Typed connection edges with payload preview on hover
- One-click template install — canvas populates in under a second

### The inspector

Click any agent node to open the inspector panel. Change the model, edit the system prompt, configure tools, and see a cost estimate before you run.

### The run feed

Every SSE event from every agent streams into a live log at the bottom of the canvas. Tool names, inputs, step outputs, elapsed time — everything is visible.

### The dashboard

A birds-eye view of your agent fleet. Total runs, average latency, error rate, token usage, estimated cost. A 7-day activity chart. A table of recent runs with status and duration.

---

## Current state

This is a working prototype with a fully scripted simulation backend. The UI is complete and demo-ready. Real model execution, auth, and persistence are next.

What works today:
- Full canvas UX — drag, connect, zoom, template install
- Agent inspector with model/prompt/tool configuration
- Live run simulation via SSE (deterministic, scriptable)
- Failure → shake animation → "Retry Research Agent" → success flow
- Observability dashboard with seeded realistic metrics
- Fake collaboration (avatar stack, activity feed, comment pins)

What's coming:
- Real Claude / GPT-4o / Gemini agent execution
- MCP server connections with auto-discovery
- PostgreSQL persistence + BullMQ job queue
- Clerk auth and workspace sharing
- Scheduled and webhook triggers
- Template marketplace

---

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + TypeScript + Vite |
| Canvas | React Flow v11 |
| State | Zustand |
| Charts | Recharts |
| Styling | Tailwind CSS v4 + Radix UI |
| Backend | Fastify (Node.js + TypeScript) |
| Real-time | Server-Sent Events (SSE) |
| Monorepo | pnpm workspaces |

---

## Running locally

```bash
# Clone
git clone https://github.com/ronithryal/Conductor.git
cd Conductor

# Install dependencies
pnpm install

# Start both servers (API on :3001, web on :5173)
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). Click **Browse Templates**, install **Email Triage Agent**, and click **Run**.

---

## Design principles

**Spatial over sequential.** Agent relationships are inherently graph-shaped. A canvas makes the structure visible and editable in ways a list never can.

**Observable by default.** Every agent run should be fully legible — what it called, what it received, where it failed. No more log archaeology.

**Zero-code for the operator.** The person running agents shouldn't need to be the person who built them. Conductor separates authorship from operation.

**Model-agnostic.** Claude, GPT-4o, Gemini, local models via Ollama. The interface layer should not be owned by any one model provider.

---

## Roadmap

| Phase | Focus | Target |
|-------|-------|--------|
| Phase 0 — Foundation | Real agent execution, auth, Postgres | Month 2 |
| Phase 1 — Private Beta | Multi-agent pipelines, MCP support, 100 users | Month 5 |
| Phase 2 — Public Launch | Template marketplace, billing, scheduling | Month 8 |
| Phase 3 — Scale | Enterprise SSO, on-prem, mobile monitor | Month 12 |

---

*Built by [Ronith](https://github.com/ronithryal)*
