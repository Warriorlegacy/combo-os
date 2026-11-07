# SESSION_CONTEXT — Combo OS (Unified Cloudflare Free-Stack Hub & AI Production Suite)

> **Read this first in any agentic coding session (Antigravity, Cursor, Windsurf, Claude, Codex, Copilot).**  
> **Repository:** `D:\Combo` · Primary Branch: `master`  
> **Philosophy:** The Unslop Playbook (high craft, authentic typography, warm monochrome aesthetic, zero placeholder slop, 100% verified endpoints).  
> **Hard Constraint:** $0 Perpetual Infrastructure Stack. No paid APIs, no credit card traps, no cloud bills.

---

## 1. What This Is

Combo OS is a production monorepo deploying a unified web platform and high-yield AI engines on Cloudflare's perpetual free tier:

- **Frontend (`apps/hub`)**: Next.js 15, React 19, Tailwind CSS, IBM Plex typography, static edge export for Cloudflare Pages (unlimited requests & bandwidth, zero egress fees).
- **Backend (`apps/worker-api`)**: Cloudflare Workers (TypeScript / Hono) running on V8 isolates across 300+ edge data centers (100,000 requests/day free tier).
- **Database**: Cloudflare D1 (Serverless SQLite with 5,000,000 reads/day, 100,000 writes/day, 5 GB storage).
- **Storage**: Cloudflare R2 (10 GB free object storage, zero data egress fees).
- **AI Gateway**: Multi-model fallback router across Cloudflare Workers AI (DeepSeek R1 Distill Qwen 32B, Llama 3.3 70B, Qwen 2.5 Coder), Groq (500+ tok/s), and Google Gemini 2.5 Flash.
- **Directory**: Curated interactive index of 504+ tools synthesizing **Tabworthy** (`tabworthy.pages.dev`) and **free-for-dev** (`ripienaar/free-for-dev`).
- **Flagship Project #1**: **Signhify GTM Autopilot OS** — Content research, AI draft generator, brand voice profile, citation verification, and a mandatory **Human Approval Gate** preventing unreviewed posting.
- **Flagship Project #2**: **RAG Support Copilot with Live Eval Dashboard** — Grounded customer QA with exact citations and a benchmark dashboard proving 98% Groundedness, 100% Citation Accuracy, and 100% Refusal Precision on trick questions.

---

## 2. Live State & Route Verification Table

| Route / Component | Method | State | Invariant / Verification |
|---|---|---|---|
| `GET /` (Worker API) | GET | 200 OK | Edge identification returns `Cloudflare Workers (V8 Isolate)` |
| `GET /api/health` | GET | 200 OK | Returns `{"status":"healthy","uptime":...}` |
| `GET /api/status` | GET | 200 OK | Stack includes Cloudflare Pages, Workers, D1, R2; metrics verified |
| `GET /api/directory` | GET | 200 OK | Returns 504+ curated free developer tools with quotas & commercial flags |
| `GET /api/directory?category=Compute` | GET | 200 OK | Filtered results match category 100% |
| `GET /api/directory?q=cloudflare` | GET | 200 OK | Search returns Cloudflare Pages, Workers, D1, R2, DNS |
| `GET /api/gtm/topics` | GET | 200 OK | Pre-seeded high-yield topics with market relevance scores |
| `POST /api/gtm/drafts` | POST | 201 Created | Created draft enters `UNDER_REVIEW` approval gate automatically |
| `POST /api/gtm/drafts/:id/approve` | POST | 200 OK | Sets `APPROVED`, records editor signature, schedules publication |
| `POST /api/gtm/drafts/:id/reject` | POST | 200 OK | Sets `REJECTED`, records rejection reason, blocks publication |
| `GET /api/rag/docs` | GET | 200 OK | Knowledge documents loaded from D1 / seed store |
| `POST /api/rag/query` | POST | 200 OK | Grounded response with citations for documented questions |
| `POST /api/rag/query` (out-of-domain) | POST | 200 OK | **Strict Refusal Gate**: `refused: true`, confidence < 0.35, 0 citations |
| `GET /api/rag/eval` | GET | 200 OK | Live benchmark returns Groundedness ≥ 90%, Refusal Precision 100% |
| `GET /api/ai/models` | GET | 200 OK | Returns notable free models (DeepSeek R1, Llama 3.3, Qwen, Gemini) |
| `POST /api/ai/complete` | POST | 200 OK | Multi-model fallback execution with latency & token telemetry |
| `GET /api/ai/telemetry` | GET | 200 OK | Logs persisted to D1 `gateway_logs` table |

---

## 3. The Three Verification Checks That Catch Things

Run all three before claiming any pull request or deployment is ready:

```bash
# 1. 50-Check Edge Worker API & Invariant Integration Suite
node --experimental-strip-types scripts/test-edge.mjs

# 2. Next.js Cloudflare Pages Static Edge Export Build
npm --workspace=apps/hub run build

# 3. Master Monorepo Production Build & Artifact Verification
node scripts/build-all.mjs
```

---

## 4. Repo Layout & Key Files

```
D:\Combo\
├── apps/
│   ├── hub/                            # Cloudflare Pages Next.js 15 Edge App
│   │   ├── app/
│   │   │   ├── layout.tsx              # Unslop shell, IBM Plex typography, dark/light toggle
│   │   │   ├── page.tsx                # Launchpad, 7-layer stack card, telemetry overview
│   │   │   ├── directory/page.tsx      # Curated Tabworthy + free-for-dev directory with filters
│   │   │   ├── gtm/page.tsx            # Project #1: GTM Autopilot OS & Human Approval Board
│   │   │   ├── rag-eval/page.tsx       # Project #2: RAG Support Copilot & Live Eval Dashboard
│   │   │   └── models/page.tsx         # Multi-Model AI Playground & latency benchmark
│   │   ├── components/Nav.tsx          # Accessible sticky header with edge status pill
│   │   └── package.json
│   └── worker-api/                     # Cloudflare Worker Edge Backend (TypeScript / Hono)
│       ├── src/
│       │   ├── index.ts                # App entrypoint, CORS, timing headers, routing
│       │   ├── routes/                 # directory.ts, gtm.ts, rag.ts, gateway.ts
│       │   ├── db/                     # schema.sql, seed-data.ts, db-client.ts (D1 / SQLite)
│       │   └── services/               # llm-gateway.ts (Workers AI, Groq, Gemini Flash fallback)
│       ├── wrangler.toml               # D1 (COMBO_DB), R2 (COMBO_BUCKET), AI bindings
│       └── package.json
├── packages/
│   ├── shared-types/                   # Shared TypeScript contracts (DirectoryTool, GTMDraft, RAGEval)
│   └── unslop-tokens/                  # Unslop Playbook palette, typography, and badge styles
├── scripts/
│   ├── test-edge.mjs                   # 50-check automated integration test suite
│   └── build-all.mjs                   # Master build orchestrator
├── docs/superpowers/
│   ├── specs/2026-11-07-combo-os-free-stack-hub-design.md
│   └── plans/2026-11-07-combo-os-free-stack-hub.md
├── .github/workflows/ci.yml            # Automated CI/CD workflow
├── SESSION_CONTEXT.md                  # This file
└── README.md                           # Documentation & operational quickstart
```

---

## 5. Architectural Invariants ($0 Rules & Governance)

1. **Zero-Post Policy**: AI never posts directly to social channels (LinkedIn, X, Ghost). Every outbound post enters `UNDER_REVIEW` and must have an explicit `APPROVED` record signed by a human editor.
2. **Calibrated Refusal**: The RAG copilot must answer "I do not have sufficient documentation" whenever confidence < 0.65 or an out-of-domain query is presented. Refusal accuracy on golden test benchmarks must remain at 100%.
3. **Zero Egress Cloud Cost**: Files, exports, and assets must be hosted on Cloudflare Pages or Cloudflare R2 ($0 egress fees), never on AWS S3 or egress-metered providers.
4. **Multi-Model Edge Fallback**: The AI Gateway must gracefully fall back from Cloudflare Workers AI to Groq to Gemini Flash on 429 rate limit errors to ensure 100% uptime on free tiers.
