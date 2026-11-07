# Combo OS: Unified Cloudflare Free-Stack Hub & Production Suite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Combo OS, a production-ready monorepo combining a curated Tabworthy + Free-for-Dev developer directory, Cloudflare Multi-LLM Edge Gateway (Workers AI, Groq, Gemini), Signhify GTM Autopilot OS with strict human approval gates, and RAG Support Copilot with live eval metrics, adhering to The Unslop Playbook and Cloudflare's $0 infrastructure stack.

**Architecture:** Monorepo containing Cloudflare Worker (`apps/worker-api`) powered by Hono + TypeScript with Cloudflare D1 (SQLite) and R2 bindings, and Cloudflare Pages (`apps/hub`) Next.js/Static app with IBM Plex typography, tactile monochrome design, and strict verification tests (`scripts/test-edge.mjs`).

**Tech Stack:** Cloudflare Pages, Cloudflare Workers, Cloudflare D1, Cloudflare R2, Cloudflare Workers AI / Groq / Gemini Flash, Hono, TypeScript, Next.js 15 / React 19, Tailwind CSS, FastEmbed.

---

## File Structure Map

- `package.json`: Root monorepo workspace manifest
- `packages/shared-types/src/index.ts`: TypeScript contracts for Tools, GTM Drafts, Evals, Gateway requests
- `packages/unslop-tokens/src/index.ts`: Editorial CSS classes, palette hex tokens, typography rules
- `apps/worker-api/package.json`: Cloudflare Worker dependencies (hono, wrangler)
- `apps/worker-api/wrangler.toml`: Cloudflare bindings (COMBO_DB, COMBO_BUCKET, AI)
- `apps/worker-api/src/index.ts`: Worker entry point & route registration
- `apps/worker-api/src/db/schema.sql`: D1 SQLite schema (directory_tools, gtm_topics, gtm_drafts, rag_docs, rag_evals, telemetry)
- `apps/worker-api/src/db/seed-data.ts`: Pre-seeded Tabworthy + free-for-dev tools, golden support Q&A, and sample GTM topics
- `apps/worker-api/src/routes/directory.ts`: Filter, search, and category listing endpoints
- `apps/worker-api/src/routes/gateway.ts`: Multi-provider LLM edge router with fallback & latency telemetry
- `apps/worker-api/src/routes/gtm.ts`: GTM topic scoring, draft generator, and strict approval gate state machine
- `apps/worker-api/src/routes/rag.ts`: Document chunking, grounded QA answering, and live eval scoring engine
- `apps/hub/package.json`: Frontend web dependencies (next, react, react-dom, lucide-react)
- `apps/hub/app/layout.tsx`: Root HTML shell with IBM Plex Serif, Sans, Mono and unslop styling
- `apps/hub/app/page.tsx`: Combo OS Executive Command Center & live telemetry
- `apps/hub/app/directory/page.tsx`: Interactive Tabworthy & Free-for-Dev tool finder with live filters
- `apps/hub/app/gtm/page.tsx`: GTM Autopilot approval board, fact-check inspector, and publisher preview
- `apps/hub/app/rag-eval/page.tsx`: Grounded copilot interface with live eval dashboard (groundedness %, refusal %)
- `apps/hub/app/models/page.tsx`: Cloudflare AI / Groq / Gemini multi-model comparison playground
- `scripts/test-edge.mjs`: Complete automated integration test suite verifying all HTTP endpoints and invariants
- `.github/workflows/ci.yml`: Automated CI pipeline
- `SESSION_CONTEXT.md`: Up-to-date system topology, verified routes, endpoints, and deployment runbook

---

## Implementation Tasks

### Task 1: Monorepo Foundation & Workspace Setup
**Files:**
- Create: `package.json`
- Create: `packages/shared-types/package.json`
- Create: `packages/shared-types/src/index.ts`
- Create: `packages/unslop-tokens/package.json`
- Create: `packages/unslop-tokens/src/index.ts`
- Create: `.gitignore`

- [ ] **Step 1: Create root package.json and .gitignore**
- [ ] **Step 2: Create packages/shared-types with full TypeScript interfaces**
- [ ] **Step 3: Create packages/unslop-tokens with editorial design tokens**
- [ ] **Step 4: Commit foundation**

---

### Task 2: Cloudflare D1 Database Schema & Seeding Engine
**Files:**
- Create: `apps/worker-api/src/db/schema.sql`
- Create: `apps/worker-api/src/db/seed-data.ts`
- Create: `apps/worker-api/src/db/db-client.ts`

- [ ] **Step 1: Write D1 SQLite schema (directory, gtm, rag, telemetry)**
- [ ] **Step 2: Build curated seed dataset combining Tabworthy (504 tools) & free-for-dev items**
- [ ] **Step 3: Implement database abstraction helper with in-memory SQLite fallback for tests**
- [ ] **Step 4: Commit D1 schema and seed engine**

---

### Task 3: Cloudflare Worker Edge API Service & Multi-Model Gateway
**Files:**
- Create: `apps/worker-api/package.json`
- Create: `apps/worker-api/tsconfig.json`
- Create: `apps/worker-api/wrangler.toml`
- Create: `apps/worker-api/src/services/llm-gateway.ts`
- Create: `apps/worker-api/src/routes/directory.ts`
- Create: `apps/worker-api/src/routes/gtm.ts`
- Create: `apps/worker-api/src/routes/rag.ts`
- Create: `apps/worker-api/src/routes/gateway.ts`
- Create: `apps/worker-api/src/index.ts`

- [ ] **Step 1: Implement multi-provider LLM gateway (Workers AI + Groq + Gemini fallback)**
- [ ] **Step 2: Implement directory search and filtering routes**
- [ ] **Step 3: Implement Signhify GTM Autopilot routes with approval gate state machine**
- [ ] **Step 4: Implement RAG copilot grounded answering and live eval calculation engine**
- [ ] **Step 5: Assemble Hono edge router in index.ts with CORS and health checks**
- [ ] **Step 6: Commit worker API services**

---

### Task 4: Edge Test Harness & Verification Suite
**Files:**
- Create: `scripts/test-edge.mjs`

- [ ] **Step 1: Write automated integration tests for health, directory search, gateway, GTM approval gate, and RAG evals**
- [ ] **Step 2: Execute test suite and verify 100% pass rate**
- [ ] **Step 3: Commit edge test harness**

---

### Task 5: Unslop Design System & Cloudflare Pages Frontend (`apps/hub`)
**Files:**
- Create: `apps/hub/package.json`
- Create: `apps/hub/tsconfig.json`
- Create: `apps/hub/next.config.mjs`
- Create: `apps/hub/tailwind.config.ts`
- Create: `apps/hub/app/globals.css`
- Create: `apps/hub/app/layout.tsx`
- Create: `apps/hub/app/page.tsx`
- Create: `apps/hub/components/Nav.tsx`

- [ ] **Step 1: Configure Next.js 15, Tailwind, and IBM Plex fonts**
- [ ] **Step 2: Build Unslop navigation bar and layout shell**
- [ ] **Step 3: Build main launchpad with real-time system telemetry and quick actions**
- [ ] **Step 4: Commit frontend shell**

---

### Task 6: Signhify GTM Autopilot OS Interactive Dashboard
**Files:**
- Create: `apps/hub/app/gtm/page.tsx`
- Create: `apps/hub/components/gtm/ApprovalQueue.tsx`
- Create: `apps/hub/components/gtm/DraftEditor.tsx`

- [ ] **Step 1: Build topic discovery board with automated score meters**
- [ ] **Step 2: Build content draft editor with brand voice settings and source citation list**
- [ ] **Step 3: Implement human approval gate (approve/reject/schedule) with audit trail**
- [ ] **Step 4: Commit GTM dashboard**

---

### Task 7: RAG Support Copilot with Live Eval Benchmark UI
**Files:**
- Create: `apps/hub/app/rag-eval/page.tsx`
- Create: `apps/hub/components/rag/EvalMetrics.tsx`
- Create: `apps/hub/components/rag/ChatCopilot.tsx`

- [ ] **Step 1: Build grounded customer support chat interface with cited sources and confidence display**
- [ ] **Step 2: Build real-time Eval Dashboard showing groundedness, citation accuracy, and refusal precision**
- [ ] **Step 3: Add golden dataset benchmark runner button with live failure inspection**
- [ ] **Step 4: Commit RAG Copilot & Eval Dashboard**

---

### Task 8: Interactive Developer Directory & Multi-Model Playground
**Files:**
- Create: `apps/hub/app/directory/page.tsx`
- Create: `apps/hub/app/models/page.tsx`

- [ ] **Step 1: Build Tabworthy + Free-for-Dev searchable directory with category chips, badges, and export**
- [ ] **Step 2: Build Multi-Model Edge Gateway playground with latency comparison and prompt runner**
- [ ] **Step 3: Commit Directory & Model Playground**

---

### Task 9: Production Build, CI/CD Pipeline & GitHub Workflow
**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `scripts/build-all.mjs`

- [ ] **Step 1: Create GitHub Actions CI workflow (lint, test, build)**
- [ ] **Step 2: Verify full build (`npm run build`) runs cleanly without errors**
- [ ] **Step 3: Commit CI/CD pipeline**

---

### Task 10: Production Verification & Comprehensive `SESSION_CONTEXT.md`
**Files:**
- Create: `SESSION_CONTEXT.md`
- Create: `README.md`

- [ ] **Step 1: Run comprehensive end-to-end tests against both API and Web UI**
- [ ] **Step 2: Generate complete production `SESSION_CONTEXT.md` with live state, routes, schemas, and invariants**
- [ ] **Step 3: Final commit and deployment report**

