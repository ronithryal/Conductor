#### PRODUCT REQUIREMENTS DOCUMENT

# Conductor

### The Visual Command Center for AI Agents

```
Version 1.0 | April 2026 |
Product Name Conductor — GUI for AI Agents
Document Version 1.
Date April 22, 2026
Authors CPO + Product & Engineering Team
Status Draft — Pending CEO Review
Target Launch Q4 2026 (Private Beta)
```
## Executive Summary

We are at a 1984 moment for AI. The technology is powerful but locked behind a Conductor
line. Less than 1% of the world can fluently operate an AI agent today. The rest are paralyzed by
blank text boxes and terminal sessions.
Conductor is the Windows of the agentic era: a visual, spatial, intuitive interface that puts AI
agents in the hands of everyone. Inspired by the control logic of strategy games where complex
systems become manageable through great UI, Conductor gives users a drag-and-drop
workspace to build, deploy, and orchestrate AI agents without writing a single line of code.
**The Bet**
Just as Windows unlocked personal computing for the mass market, Conductor will unlock
agentic AI for individuals, SMBs, and enterprise teams. The GUI layer is the last mile
infrastructure of the AI revolution, and it is wide open.

## 1. Problem Statement


### 1.1 The MS-DOS Era of Agents

Today's AI agent ecosystem mirrors the computing landscape of 1980: extraordinary capability
trapped behind an interface designed for experts. Current agent interfaces require users to:

- Write prompts in raw text with no visual feedback on what the agent is doing
- Configure tools, MCP servers, and API connections through code or config files
- Monitor multi-step workflows through terminal logs or raw JSON
- Orchestrate multiple agents with no spatial or relational representation
- Recover from failures with no visual debugging or audit trail
The result: a small slice of Silicon Valley power users can leverage agents. The rest of the
world, 99% of potential users, cannot.

### 1.2 Who Is Suffering

- Knowledge workers who need to automate repetitive tasks but cannot code
- Small business owners who want AI employees but cannot hire engineers
- Enterprise teams who have AI budgets but no deployment surface for non-technical staff
- Operators who need to monitor and manage agent fleets without reading logs

### 1.3 Why Now

- MCP has emerged as a standard for agent tool connectivity
- Foundation models are capable enough for reliable multi-step agentic tasks
- The agent marketplace is exploding but lacks a consumer-grade GUI layer
- No dominant visual agent interface exists — the category is greenfield
**Market Insight**
The bottleneck for agentic AI adoption is not model capability, it is interface design. The first
company to build a great GUI wins the distribution layer for the entire agent ecosystem.

## 2. Solution: Conductor

### 2.1 Product Vision

Conductor is a visual agent workspace: a spatial canvas where users build, deploy, and manage
AI agents and multi-agent workflows through an intuitive graphical interface. Think Figma meets
Factorio for AI agents.

### 2.2 The Strategy Game Lens


Great strategy games like Factorio, StarCraft, and Civilization have solved the problem of
making complex systems manageable for non-experts. Their design patterns are directly
applicable to agent orchestration:
**Game Mechanic In-Game Use In Conductor**
Zoom to birds-eye view Survey battlefield, manage multiple
fronts
Monitor all agent activity from a
single canvas
Queue orders via
shortcuts
Conductor units efficiently without
clicking each one
Trigger agent tasks, pipelines, and
escalations quickly
Resource and production
graphs
Track economic output and
bottlenecks
See agent throughput, errors,
token usage, latency
Tech trees Plan upgrades and capabilities
visually
Design agent skill stacks and tool
configurations
Multiplayer coordination Assign roles across team members Multi-user agent management with
permissions

### 2.3 What Conductor Is Not

- Not a chatbot interface — Conductor is spatial and visual, not conversational-first
- Not a code editor — zero code required for core workflows
- Not just an agent builder — Conductor also handles monitoring, debugging, and
    orchestration
- Not a model provider — Conductor is the interface layer; models are pluggable

## 3. Target Users and Personas

### 3.1 Primary Personas

**Persona 1: The Automator — Alex**
Operations Manager at a 50-person company. Wants to automate internal workflows: approvals,
reporting, data entry. Has used Zapier. Not a developer. Frustrated that AI agents require a CS
degree to configure.

- Needs: Visual workflow builder, pre-built templates, reliable execution monitoring
- Success: Built and deployed 3 agents in week 1 without engineering help
**Persona 2: The Builder — Sam**
Freelance AI consultant building custom agent systems for clients. Comfortable with APIs.
Wants a faster way to prototype, test, and hand off agent workflows to non-technical clients.
- Needs: Full MCP and tool configurability, sharable workspaces, client-facing views


- Success: Cut build time by 60%; clients can self-serve monitoring
**Persona 3: The Operator — Jordan**
Head of AI at a 500-person enterprise. Managing a fleet of deployed agents across
departments. Needs oversight, audit trails, cost controls, and team permissions.
- Needs: Fleet dashboard, role-based access, usage analytics, SLA alerts
- Success: Full visibility into agent operations; can report ROI to leadership

### 3.2 Out of Scope for v

- Researchers building novel agent architectures (too custom)
- Pure developers who prefer code-first workflows (not our wedge)
- Consumer users with no professional workflow context (later phases)

## 4. Product Features and Requirements

### 4.1 The Canvas — Agent Workspace

The core interaction surface. An infinite, pannable, zoomable canvas where agents, tools, data
sources, and workflows exist as visual nodes and connections.
**Agent Nodes**

- Each agent is a card/node on the canvas with: name, model, status indicator, last-run
    timestamp
- Drag to reposition; group related agents into labeled zones
- Click to expand: shows system prompt, tools, recent runs, logs
- Color-coded status: idle (gray), running (blue pulse), success (green), error (red)
**Connection Graph**
- Draw connections between agents to define data flow and handoff chains
- Connections are typed: triggers, data-passing, approval gates, fallback routes
- Hovering a connection shows payload preview and last transmission timestamp
- Visual loop detection and cycle warning
**Canvas Controls**
- Zoom via scroll or pinch; keyboard shortcuts mirror Figma conventions
- Minimap in corner for spatial navigation of large workspaces
- Snap-to-grid toggle and alignment guides

### 4.2 Agent Builder


A structured, form-based panel for configuring agents without code.
**Model Selection**

- Dropdown with all supported models (Claude, GPT-4o, Gemini, local via Ollama)
- Model capability tags: vision, tool-use, long-context, speed tier
- Cost estimator based on expected token usage
**System Prompt Editor**
- Rich text editor with variable injection via drag-and-drop from data sources
- Prompt templates library with pre-written prompts for common agent types
- Version history for prompts; A/B test mode
- Live prompt testing panel with mock inputs
**Tool and MCP Configuration**
- Visual tool palette: browse and add tools by category — web, files, APIs, databases
- MCP server connection panel: URL, auth, available tools auto-discovered
- Drag tools onto agent cards to attach them
- Tool call preview: see what a tool call looks like before running

### 4.3 Workflow Orchestration

Multi-agent pipelines defined visually without code.
**Pipeline Builder**

- Sequential chains: Agent A output feeds Agent B input
- Parallel branches: trigger multiple agents simultaneously from one input
- Conditional routing: IF/ELSE branches based on agent output content
- Human-in-the-loop gates: pause pipeline pending user approval
- Loops and retries: configurable retry logic with exponential backoff
**Triggers**
- Manual run button
- Scheduled cron with visual builder — no cron string syntax required
- Webhook trigger that auto-generates an endpoint URL
- Event-based: file upload, email receipt, form submission
- Agent-to-agent triggers based on output conditions

### 4.4 Monitoring and Observability Dashboard

The birds-eye view of all agent activity — the Conductor center.

- Real-time run feed: all active agent runs with status, current step, elapsed time
- Token usage graph: per agent, per day/week/month


- Error rate tracker: failure patterns highlighted and summarized
- Latency heatmaps: identify slow steps in pipelines
- Cost dashboard: spend per agent, per workspace, per team member
- Audit log: full history of every agent run and config change with actor attribution

### 4.5 Templates and Marketplace

Pre-built agent templates and community-shared workflows to reduce time to value.

- Curated starter templates: Research Agent, Email Triage Agent, Report Generator, Data
    Enrichment Agent
- One-click deploy: install template, configure credentials, run in under 5 minutes
- Community marketplace for publishing and discovering agent templates (v2)
- Template rating, usage count, and author attribution

### 4.6 Collaboration and Permissions

- Workspace sharing: invite teammates by email
- Role-based access: Owner, Editor, Viewer, Operator (run-only)
- Agent-level permissions: restrict who can edit vs. run specific agents
- Canvas comments like Figma — comment on any node
- Activity feed: see what teammates changed or triggered

## 5. Technical Architecture

```
Architecture Principle
Conductor is a thin, beautiful orchestration layer. We do not build or own models, tools, or MCP
servers. We are the interface that connects everything. Stay lean, stay fast, stay pluggable.
```
### 5.1 Frontend

- Framework: React and TypeScript
- Canvas Engine: React Flow — battle-tested node-based canvas library
- State Management: Zustand for canvas state; React Query for server state
- Real-time: WebSocket connection for live agent run status updates
- Styling: Tailwind CSS and Radix UI primitives
- Desktop: Tauri v2 wrapper for optional native desktop distribution

### 5.2 Backend

- Runtime: Node.js and TypeScript with Fastify framework


- Agent Execution Engine: sandboxed per agent run
- Queue: BullMQ (Redis-backed) for scheduled and async agent jobs
- Database: PostgreSQL for workspaces, agents, config, users; Redis for run state and
    cache
- Storage: S3-compatible for agent artifacts, file inputs/outputs, and logs
- Auth: Clerk with JWT-based auth and SSO support for enterprise

### 5.3 Agent Execution Layer

- Each agent run executes in an isolated short-lived container (Firecracker microVM)
- Model calls routed through unified provider abstraction across Anthropic, OpenAI,
    Google, Ollama
- MCP connections managed per-workspace with encrypted credential vault
- Tool call results streamed back to UI in real time via SSE
- Configurable hard limits: max tokens, max steps, max wall-clock time

### 5.4 Launch Integrations

- MCP Servers: any URL-based MCP server with auto-discovery of tools
- Models: Claude (sonnet-4, opus-4), GPT-4o, o3, Gemini 2.0 Flash, Gemini 2.5 Pro
- Files: Google Drive, Dropbox, local upload
- Communication: Gmail, Slack, SMTP
- Databases: PostgreSQL, Airtable, Notion

## 6. Phased Roadmap

```
Phase Timeline Key Deliverables Success Metric
Phase 0 —
Foundation
Months 1-2 Canvas renderer, single agent
builder, manual run, Claude
integration
Internal team demo
running 5 agent types
Phase 1 — Private
Beta
Months 3-5 Multi-agent pipelines, MCP
support, monitoring dashboard,
100 beta users
50% of beta users
deploy an agent in
under 30 minutes
Phase 2 — Public
Launch
Months 6-8 Template marketplace,
scheduling, team collaboration,
billing
1,000 paid workspaces;
$50K MRR
Phase 3 — Scale Months 9-12 Enterprise SSO/RBAC,
on-prem option, community
marketplace, mobile monitor
10K workspaces; first
enterprise contracts
```
## 7. Success Metrics and OKRs


```
North Star Metric
Weekly Active Workspaces with at least one successful agent run — because value is only
created when agents actually work.
```
### 7.1 Launch OKRs (First 6 Months)

**O1: Deliver a product people love to use**

- KR1: Net Promoter Score above 50 in beta cohort
- KR2: 70% of new users complete first agent run within 20 minutes of signup
- KR3: D30 retention above 40% for users who ran at least one workflow
**O2: Prove willingness to pay**
- KR1: 500 paying customers within 3 months of public launch
- KR2: Average revenue per user above $49 per month
- KR3: Monthly churn below 5% on paid plans
**O3: Establish technical moat**
- KR1: Agent run p95 latency to first token under 800ms
- KR2: 99.9% agent execution uptime SLA
- KR3: Support 10 or more MCP server integrations at launch

## 8. Risks and Mitigations

```
Risk Severity Probability Mitigation
OpenAI or Anthropic builds a
competing GUI
High Medium Move fast; own the multi-model,
multi-agent layer they will not build
Canvas UX too complex for
non-technical users
High Medium Invest in guided onboarding;
templates eliminate blank-canvas
anxiety
Agent execution reliability
erodes trust
High Low Sandboxed execution; retry logic;
transparent error UI with diagnostics
MCP ecosystem fragments or
stalls
Medium Low Build native tool integrations as
fallback; MCP is one pathway not
the only one
Enterprise sales cycle too
long for runway
Medium Medium Bottom-up PLG motion first;
enterprise follows proven organic
usage
```

## 9. Go-to-Market Strategy

### 9.1 Pricing

```
Free Pro — $49/mo Team — $149/mo Enterprise
3 agents
500 runs/mo
1 user
Community support
Unlimited agents
5,000 runs/mo
1 user
All integrations
Priority support
Unlimited agents
25,000 runs/mo
Up to 10 users
RBAC
Analytics
Custom runs
Unlimited users
SSO + on-prem
SLA + support
Custom contracts
```
### 9.2 Launch Motion

- Closed beta with 100 hand-selected builders and operators from the a16z Speedrun
    network
- Product Hunt and Hacker News Show HN launch at public availability
- Bottom-up PLG: free tier drives word of mouth; upgrade prompt at run limits
- Enterprise motion begins when 3 or more users from the same company adopt
    organically

## 10. Open Questions for CEO Decision

1. Build vs. buy the execution sandbox: Firecracker microVMs vs. Modal.com vs. E2B —
    each has cost and latency tradeoffs. Decision needed by end of Month 1.
2. Marketplace revenue model: Do we take a cut of paid templates sold by community
    builders? If so, what percentage? This affects publisher relationships and ecosystem
    dynamics.
3. On-premise vs. cloud-only at launch: Enterprise will demand on-prem. How early do we
    invest in this, given it materially changes our infrastructure architecture?
4. Team composition: We need a Canvas/Frontend specialist, a distributed systems
    engineer, and a Head of Design immediately. CEO approval needed on headcount and
    comp bands.
5. AI-assisted agent building: Should Conductor have a built-in AI that helps users build
    agents via natural language? This is a significant differentiator but meaningfully expands
    scope.

## Appendix: Competitive Landscape


The visual agent GUI space is nascent. No current player combines beautiful spatial canvas UX,
true multi-agent orchestration, real-time monitoring, model-agnostic architecture, and zero-code
accessibility. Conductor owns all five.
**Player What They Do Gap Conductor Fills**
LangGraph Studio Visual graph editor for
LangGraph agents
Requires Python/code; developer-only; no
execution monitoring
n8n / Make Automation workflow builders Not agent-native; no LLM-first design;
limited multi-agent support
Dust.tt Agent builder with visual
elements
Limited orchestration; weak monitoring; no
canvas spatial UX
Dify Open-source LLM app builder Chatbot-first; not agent/workflow-first;
complex to self-host
Microsoft Copilot
Studio
Enterprise agent builder Microsoft-locked; no multi-model; poor UX
for non-enterprise
Conductor — PRD v1.
Prepared by the Product & Engineering Team | April 2026


