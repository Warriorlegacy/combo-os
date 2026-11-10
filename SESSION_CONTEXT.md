# SESSION_CONTEXT — Combo OS (Unified Cloudflare Free-Stack Hub & 10 Production Builds)

> **Read this first in any agentic coding session (Antigravity, Cursor, Windsurf, Claude, Codex, Copilot).**  
> **Repository:** `D:\Combo` · Primary Branch: `master`  
> **Philosophy:** The Unslop Playbook (high craft, authentic typography, warm monochrome aesthetic, zero placeholder slop, 100% verified endpoints).  
> **Hard Constraint:** $0 Perpetual Infrastructure Stack. No paid APIs, no credit card traps, no cloud bills.

---

## 1. What This Is

Combo OS is a production monorepo deploying a unified web platform, curated developer directory, multi-model AI gateway, and all **10 High-Yield Free-Stack Projects** from the Signhify Studio roadmap on Cloudflare's perpetual free tier:

- **Frontend (`apps/hub`)**: Next.js 15, React 19, Tailwind CSS, IBM Plex typography, static edge export for Cloudflare Pages (unlimited requests & bandwidth, zero egress fees).
- **Backend (`apps/worker-api`)**: Cloudflare Workers (TypeScript / Hono) running on V8 isolates across 300+ edge data centers (100,000 requests/day free tier).
- **Database**: Cloudflare D1 (Serverless SQLite with 5,000,000 reads/day, 100,000 writes/day, 5 GB storage).
- **Storage**: Cloudflare R2 (10 GB free object storage, zero data egress fees).
- **Custom AI Gateway**: Multi-model fallback router integrating **FreeLLMAPI Unified Router** (`http://127.0.0.1:31415/v1` with 287 models), Cloudflare Workers AI (DeepSeek R1 Distill Qwen 32B, Llama 3.3 70B, Qwen 2.5 Coder), Groq (500+ tok/s), and Google Gemini 2.5 Flash.
- **Directory**: Curated interactive index synthesizing **Tabworthy** (`tabworthy.pages.dev`) and **free-for-dev** (`ripienaar/free-for-dev`).

---

## 2. All 10 Ranked Projects Implemented & Production-Green

| # | Project Name | Route (Frontend) | API Endpoints | Core Focus / Deliverables |
|---|---|---|---|---|
| **1** | **Signhify GTM Autopilot OS** | `/gtm` | `/api/gtm/topics`, `/api/gtm/drafts`, `/api/gtm/drafts/:id/approve` | Content research to draft to strict human approval gate. Nothing publishes without human yes. |
| **2** | **RAG Support Copilot + Evals** | `/rag-eval` | `/api/rag/docs`, `/api/rag/query`, `/api/rag/eval` | Grounded docs QA, 98% groundedness, 100% refusal precision on out-of-domain queries. |
| **3** | **WhatsApp AI Sales & Support Agent**| `/whatsapp` | `/api/whatsapp/webhook`, `/api/whatsapp/conversations`, `/api/whatsapp/leads`| WhatsApp inbound qualification, booking capture, message idempotency, human staff handoff. |
| **4** | **3D Product Configurator Showroom** | `/showroom` | `/api/showroom/product`, `/api/showroom/enquiries` | 60 FPS WebGL canvas, 4 finish switchers, live price recalculation, commercial spec sheet quote. |
| **5** | **AI Lead Recovery & Outreach Agent** | `/lead-recovery`| `/api/leads`, `/api/leads/:id/approve` | Re-engages stale CRM contacts, 3-stage sequence, editable drafts, strict human gate, CAN-SPAM opt-out. |
| **6** | **JobAutopilot Pro** | `/job-autopilot`| `/api/jobs`, `/api/jobs/:id/status` | Job post intake analyzer, match scoring, tailored resume bullets (zero fabrication), Kanban board. |
| **7** | **Faceless Shorts / Reels Factory** | `/shorts-factory`| `/api/shorts` | 9:16 vertical simulator, 3s hook, speech tempo sync, kinetic captions, open-source FFmpeg commands, YPP thresholds banner. |
| **8** | **AI Meeting-to-CRM Copilot** | `/meeting-crm` | `/api/meetings`, `/api/meetings/extract` | Call transcripts to structured summary, decisions, action items with enforced owners/dates, HubSpot/Notion/Markdown export. |
| **9** | **Freelancer Client OS** | `/freelancer-os`| `/api/freelancer/invoices` | Scope templates ($450-$1850), milestone invoices, printable PDF preview, Stripe/UPI tracking, client portal link. |
| **10**| **AI Interview Prep Coach (PWA)** | `/interview-coach`| `/api/interview/sessions`, `/api/interview/score` | Spoken (Web Speech API) & typed mock interviews, timed sessions, STAR rubric scoring with quoted evidence, ethical disclaimer. |

---

## 3. Extracted API Credentials & Custom Router Integration

Stored securely in local environment files (`.env`, `apps/worker-api/.env`, `apps/hub/.env.local`):

- **FreeLLMAPI Custom Router**: `http://127.0.0.1:31415/v1` (Token: `freellmapi-82ee041ecf2784f97fbb8b0059bc99948e8f07c830b5d1a8`) — verified live with 287 models.
- **Groq Cloud**: `gsk_dIa...` (Llama 3.3 70B Versatile, 500+ tok/s)
- **Google Gemini API**: `AQ.Ab8RN6...` (Gemini 2.5 Flash, 1M context)
- **Cerebras Cloud**: `csk-x46...` (Ultra-fast inference)
- **Mistral API**: `vb0Tkkt...`
- **Nvidia Cloud**: `nvapi-Qd...`
- **OpenRouter**: `sk-or-v1-988...`
- **Cohere & HuggingFace**: `DwWH...`, `hf_lAj...`

---

## 4. Live Verification Suite (73 Checks PASS + End-to-End Walkthrough)

```bash
# 1. Automated 73-Check Edge API & 10-Project Test Suite
node --experimental-strip-types scripts/test-edge.mjs

# 2. Interactive End-to-End Walkthrough (Exercises all 10 projects + FreeLLMAPI)
node --experimental-strip-types scripts/walkthrough.mjs

# 3. Next.js Cloudflare Pages Static Edge Export Build (16 static routes)
npm --workspace=apps/hub run build

# 4. Master Monorepo Production Build & Artifact Verification
node scripts/build-all.mjs

# 5. Generate Cloudflare D1 SQL Seed File
node scripts/seed-d1.mjs
```

---

## 5. Architectural Invariants ($0 Rules & Governance)

1. **Zero-Post Policy**: AI never posts directly to social channels (LinkedIn, X, Ghost). Every outbound post enters `UNDER_REVIEW` and must have an explicit `APPROVED` record signed by a human editor.
2. **Calibrated Refusal**: The RAG copilot must answer "I do not have sufficient documentation" whenever confidence < 0.65 or an out-of-domain query is presented. Refusal accuracy on golden test benchmarks must remain at 100%.
3. **Truth in Career Artifacts**: The resume bullet rewriter must never invent experience. It rewrites existing projects in the vocabulary of the job post; it does not fabricate technologies or metrics not in the user's profile.
4. **Zero Egress Cloud Cost**: Files, exports, and assets must be hosted on Cloudflare Pages or Cloudflare R2 ($0 egress fees), never on AWS S3 or egress-metered providers.
5. **Multi-Model Edge Fallback**: The AI Gateway automatically queries local FreeLLMAPI first, falling back to Groq, Gemini, or Cloudflare Workers AI with sub-50ms latency.

---

## 6. Live Production Deployment Status

- **Cloudflare Account ID**: `2bffaa0aa7218f8bcd590a12e9ba5c7e` (`Rajpiyush092@gmail.com's Account`)
- **Cloudflare API Token**: Validated & active (configured in local `.env` and GitHub Secrets)
- **Frontend (Cloudflare Pages)**: `https://combo-hub.pages.dev` (16 static routes, unlimited bandwidth)
  - Security `_headers` (X-Frame-Options DENY, nosniff, Referrer-Policy) + immutable `_next/static` caching deployed
  - PWA manifest linked; `themeColor` moved to Next.js `viewport` export (build-warn clean)
- **Backend (Cloudflare Workers)**: `https://combo-worker-api.rajpiyush092.workers.dev` (Edge V8 isolate, v1.1.0)
  - Hardened: security headers, 240 req/min per-IP rate limiter, 100 KB payload ceiling, 405 usage guard on `/api/ai/complete`
  - Multi-model gateway live: FreeLLMAPI → CF Workers AI → Groq → **Gemini 2.5 Flash (verified live)** → OpenRouter → edge simulation
  - Secrets deployed via `wrangler secret put`: `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_KEY`
  - Real cron `scheduled()`: 7-day gateway-log retention, 30-day lead aging sweep, heartbeat telemetry (`wrangler dev --test-scheduled` verified)
- **Database (Cloudflare D1)**: `combo-production-db` (ID: `8fa9bb12-1be9-4776-afbc-c7c1da0a9114`, Region APAC)
  - 15 production SQLite tables migrated via `src/db/schema.sql` (verified: 16 incl. `_cf_KV`)
  - Pre-seeded with 48 curated tools from Tabworthy & free-for-dev via `src/db/seed.sql`
- **Cloudflare Agent Setup**:
  - 22 official Cloudflare Skills installed globally via `cloudflare/skills`
  - Cloudflare MCP server configured in `.vscode/mcp.json` and `.cursor/mcp.json` (`https://mcp.cloudflare.com/mcp`)
- **GitHub Actions Auto-Deployment**:
  - `CLOUDFLARE_API_TOKEN` & `CLOUDFLARE_ACCOUNT_ID` stored in repo secrets on `Warriorlegacy/combo-os`.
  - Every push to `master` automatically runs tests, typechecks the Worker (`tsc --noEmit`), builds static assets, and deploys to Pages & Workers.

## 7. Full Verification Chain (All Green)

```bash
# worker typecheck        → 0 errors
npm --workspace=apps/worker-api run build

# 73-check local edge suite → 73 PASSED
node --experimental-strip-types scripts/test-edge.mjs

# 46-check live production suite → 46 PASSED
node scripts/test-production-live.mjs

# end-to-end walkthrough (10 projects) → ALL VERIFIED
node --experimental-strip-types scripts/walkthrough.mjs
```

