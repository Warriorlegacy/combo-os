# Combo OS: Unified Cloudflare Free-Stack Hub & Production Suite — Technical Specification

**Date:** 2026-11-07  
**Author:** Piyush Raj Singh (Signhify Studio) & Autonomous Engineering Agent  
**Status:** Approved for Implementation  
**Target Repository:** `D:\Combo`  
**Primary Stack:** GitHub, Cloudflare Pages, Cloudflare Workers (Hono / TypeScript), Cloudflare D1 (SQLite), Cloudflare R2, Cloudflare AI / Groq / Gemini Flash  
**Aesthetic & UX Standard:** The Unslop Playbook (IBM Plex typography, warm monochrome theme, high contrast, zero placeholder slop, keyboard accessible)

---

## 1. Executive Summary & Problem Statement

Modern software developers and AI engineers face two competing traps:
1. **The Cost Trap**: Cloud infrastructure costs escalate rapidly through proprietary APIs, managed DBs, and LLM token pricing before achieving product-market fit or landing high-paying clients.
2. **The "AI Slop" Trap**: Generic low-effort AI projects built from templated boilerplates with purple gradients, broken buttons, missing tests, and ungrounded LLM hallucinations that fail basic hiring manager and client evaluations.

**Combo OS** solves both problems in a production monorepo. It implements:
- A $0-infrastructure foundation utilizing GitHub, Cloudflare Pages, Cloudflare Workers, Cloudflare D1, Cloudflare R2, and free-tier LLM inference (Cloudflare Workers AI, Groq, Gemini Flash).
- A curated, high-craft **Free Developer Stack & Hidden-Gem Directory** synthesizing 504+ resources from **Tabworthy** (`tabworthy.pages.dev`) and **free-for-dev** (`ripienaar/free-for-dev`).
- The top two high-yield flagship engines from the *High-Yield Free-Stack Projects* roadmap:
  - **Project #1: Signhify GTM Autopilot OS** — Content research, AI draft generation, grounded fact-checking, strict human approval gates, and multi-channel publication.
  - **Project #2: RAG Support Copilot with Live Eval Dashboard** — Grounded document QA with citations, strict confidence refusal, and an evaluation suite measuring groundedness, citation precision, and refusal accuracy.
- Rigorous verification and an auditable `SESSION_CONTEXT.md` matching production standards.

---

## 2. Hard Architectural Constraints ($0 Budget & Unslop Standard)

1. **$0 Budget Ceiling**: No paid tiers, no credit card requirements, no subscription APIs. Every single component must run on perpetual free tiers or open-source software (Cloudflare Pages, Cloudflare Workers free 100K req/day, Cloudflare D1 5M reads/day, Cloudflare R2 10GB storage, Cloudflare Workers AI 10K neurons/day, Groq free tier, Gemini 2.5 Flash free tier).
2. **The Unslop Playbook Rule**:
   - Zero generic rounded-card purple gradient templates.
   - Distinctive typography using IBM Plex (IBM Plex Serif for headings, IBM Plex Sans for UI, IBM Plex Mono for code/metrics).
   - High typographic contrast and tactile surfaces (`#f7f6f1` / `#111410` light/dark palettes, crisp 1px borders).
   - Zero non-functional UI mocks: every button, filter, tab, and search field must perform an active, tested operation.
3. **Resilience & Edge Fallback**: If an LLM provider hits rate limits, the Edge Gateway gracefully falls back across Cloudflare AI -> Groq -> Gemini without crashing the client UI.

---

## 3. Monorepo Architecture & Structure

```
D:\Combo\
├── apps/
│   ├── hub/                            # Cloudflare Pages Next.js / Static Edge Web Application
│   │   ├── app/
│   │   │   ├── layout.tsx              # Root layout with IBM Plex fonts & Unslop theme
│   │   │   ├── page.tsx                # Combo OS Launchpad & Live Telemetry Overview
│   │   │   ├── directory/page.tsx      # Curated Tabworthy + Free-for-Dev Interactive Directory
│   │   │   ├── gtm/page.tsx            # Signhify GTM Autopilot OS (Topic -> Draft -> Approval)
│   │   │   ├── rag-eval/page.tsx       # RAG Support Copilot & Live Eval Benchmarking
│   │   │   └── models/page.tsx         # Multi-LLM Gateway Playground & Latency Tester
│   │   ├── components/                 # Accessible, unslop UI components
│   │   └── lib/                        # Edge API client, D1 queries, model gateway bindings
│   └── worker-api/                     # Cloudflare Worker Edge Backend (TypeScript / Hono)
│       ├── src/
│       │   ├── index.ts                # Edge router, CORS, rate-limiting, error handling
│       │   ├── routes/
│       │   │   ├── directory.ts        # /api/directory (Search, filter, paginate free tools)
│       │   │   ├── gtm.ts              # /api/gtm (Topics, draft generator, approval gate)
│       │   │   ├── rag.ts              # /api/rag (Doc ingest, semantic search, eval metrics)
│       │   │   └── gateway.ts          # /api/ai/gateway (Multi-provider LLM edge router)
│       │   ├── db/
│       │   │   ├── schema.sql          # Cloudflare D1 SQLite database schema
│       │   │   └── seed.sql            # Seed data (curated tools, initial topics, golden evals)
│       │   └── services/
│       │       ├── llm.ts              # Workers AI + Groq + Gemini router with fallback
│       │       ├── embed.ts            # Fast local/edge embedding pipeline
│       │       └── eval.ts             # Groundedness & citation verification evaluator
│       ├── wrangler.toml               # D1 (COMBO_DB), R2 (COMBO_BUCKET), AI bindings
│       └── package.json
├── packages/
│   ├── shared-types/                   # Shared TypeScript definitions (Tool, Draft, Eval, Model)
│   └── unslop-tokens/                  # Color tokens, typography, borders, badges
├── scripts/
│   ├── test-edge.mjs                   # Automated Edge integration verification (all routes 200)
│   ├── build-all.mjs                   # Monorepo build orchestrator
│   └── seed-d1.mjs                     # D1 seeding script
├── docs/superpowers/specs/             # Specification documents
├── .github/workflows/ci.yml            # CI workflow for lint, test, build, and deploy
├── SESSION_CONTEXT.md                  # Single source of truth for runtime state & endpoints
└── README.md                           # Comprehensive production documentation
```

---

## 4. Subsystem Detailed Specifications

### 4.1 Subsystem A: Curated Free-Stack & Hidden Gems Directory
- **Source Data**: Synthesizes 504+ tools from Tabworthy and core categories from `free-for-dev` (Compute, Edge Functions, Databases, AI Inference, Storage, Auth, Observability).
- **Attributes**: Tool Name, Category, URL, Description, Free Tier Limit, Commercial Use (Yes/No), Credit Card Required (Yes/No), Unslop Rating.
- **Interactions**: Instant debounced search, category pill toggles, free-tier limit badge, direct launch links, and JSON export.

### 4.2 Subsystem B: Cloudflare Multi-LLM Edge Gateway
- **Edge Routing**: A unified endpoint (`POST /api/ai/gateway`) routing to:
  1. Cloudflare Workers AI (`@cf/meta/llama-3.3-70b-instruct`, `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`, `@cf/qwen/qwen2.5-coder-32b-instruct`)
  2. Groq Free Tier (`llama-3.3-70b-versatile`, `mixtral-8x7b-32768`)
  3. Google Gemini 2.5 Flash / Flash-Lite API
- **Fallback Queue**: Automatically attempts next provider on 429 (rate limit) or 5xx failures.
- **Telemetry**: Measures execution time (ms), provider used, prompt tokens, and completion tokens.

### 4.3 Subsystem C: Signhify GTM Autopilot OS (Project #1)
- **Topic Engine**: Scans incoming developer/AI topics, scores them for market relevance (1-100), and rejects duplicates.
- **Draft Generator**: Produces LinkedIn posts, X threads, or technical blog briefs matching the Signhify Studio voice profile.
- **Strict Human Approval Gate**:
  - Three immutable states: `DRAFT` -> `UNDER_REVIEW` -> `APPROVED` | `REJECTED`.
  - Zero-post policy: no content moves to `SCHEDULED` or `PUBLISHED` without an explicit cryptographic/session approval record.
- **Fact-Check Gate**: Cross-checks claims against source citations; flags ungrounded assertions.

### 4.4 Subsystem D: RAG Support Copilot with Live Eval Dashboard (Project #2)
- **Document Store**: Knowledge base ingested into Cloudflare D1 / R2 (chunked text with metadata and vector embeddings).
- **Grounded Answering**: Retrieves top-k chunks, synthesizes answer with exact `[Doc #]` citations. If similarity score < 0.65, responds with a calibrated refusal: *"I do not have sufficient verified documentation to answer this question accurately."*
- **Live Eval Dashboard**:
  - Golden test set (20 standard support questions + 5 out-of-domain trick questions).
  - Metrics computed: Groundedness Score (0-100%), Citation Precision (0-100%), Refusal Accuracy (0-100%), Average Latency (ms).

---

## 5. Cloudflare D1 Database Schema (`schema.sql`)

```sql
-- 1. Free Developer Tools Directory
CREATE TABLE IF NOT EXISTS directory_tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  free_tier TEXT NOT NULL,
  commercial_ok INTEGER NOT NULL DEFAULT 1,
  cc_required INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. GTM Autopilot Topics & Content Drafts
CREATE TABLE IF NOT EXISTS gtm_topics (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gtm_drafts (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES gtm_topics(id),
  channel TEXT NOT NULL, -- 'linkedin', 'x', 'blog'
  content TEXT NOT NULL,
  citations TEXT NOT NULL, -- JSON array of URLs
  approval_status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'PENDING', 'APPROVED', 'REJECTED'
  approved_by TEXT,
  approved_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. RAG Knowledge Chunks & Evals
CREATE TABLE IF NOT EXISTS rag_documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT, -- JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rag_eval_benchmarks (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  expected_answer TEXT NOT NULL,
  is_out_of_domain INTEGER NOT NULL DEFAULT 0,
  last_groundedness_score REAL DEFAULT 0.0,
  last_citation_score REAL DEFAULT 0.0,
  last_refusal_pass INTEGER DEFAULT 1,
  last_latency_ms INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Gateway Telemetry & Logs
CREATE TABLE IF NOT EXISTS gateway_logs (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  latency_ms INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Verification & Quality Assurance Gate

Before declaring the system production-ready, the automated test harness (`scripts/test-edge.mjs`) must verify:
1. `GET /api/health` -> 200 OK (`{"status":"healthy","uptime":...}`).
2. `GET /api/directory?q=cloudflare` -> 200 OK with filtered results.
3. `POST /api/ai/gateway` -> 200 OK with multi-model fallback.
4. `POST /api/gtm/topics` & `POST /api/gtm/drafts` -> 200 OK with strict approval state machine.
5. `GET /api/rag/eval` -> 200 OK with groundedness scores > 90% and refusal accuracy 100%.
6. Static web build produces 0 TypeScript errors and 0 broken links.

---

## 7. Delivery & Production Deployment Checklist

1. **Git Initialization**: Repository initialized with clean, atomic commits.
2. **Monorepo Build**: Cloudflare Pages (`apps/hub`) and Cloudflare Workers (`apps/worker-api`).
3. **Database Migration**: D1 schema and curated dataset seed applied.
4. **CI/CD Pipeline**: `.github/workflows/ci.yml` covering lint, tests, and automated deployment.
5. **SESSION_CONTEXT.md**: Created and verified with active routes, schemas, and operational instructions.
