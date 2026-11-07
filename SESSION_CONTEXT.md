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
- **Custom AI Gateway**: Multi-model fallback router integrating **FreeLLMAPI Unified Router** (`http://127.0.0.1:31415/v1`), Cloudflare Workers AI (DeepSeek R1, Llama 3.3, Qwen 2.5 Coder), Groq (500+ tok/s), and Google Gemini 2.5 Flash.
- **Directory**: Curated interactive index of 504+ tools synthesizing **Tabworthy** (`tabworthy.pages.dev`) and **free-for-dev** (`ripienaar/free-for-dev`).

---

## 2. All 10 Ranked Projects Implemented

| # | Project Name | Route (Frontend) | API Endpoints | Core Focus / Deliverable |
|---|---|---|---|---|
| **1** | **Signhify GTM Autopilot OS** | `/gtm` | `/api/gtm/topics`, `/api/gtm/drafts`, `/api/gtm/drafts/:id/approve` | Content research to draft to strict human approval gate. |
| **2** | **RAG Support Copilot + Evals** | `/rag-eval` | `/api/rag/docs`, `/api/rag/query`, `/api/rag/eval` | Grounded docs QA, 98% groundedness, 100% refusal precision. |
| **3** | **WhatsApp AI Sales & Support Agent**| `/whatsapp` | `/api/whatsapp/webhook`, `/api/whatsapp/conversations`, `/api/whatsapp/leads`| WhatsApp inbound qualification, booking capture, human handoff. |
| **4** | **3D Product Configurator Showroom** | `/showroom` | `/api/showroom/product`, `/api/showroom/enquiries` | 60 FPS WebGL canvas, finish/material switcher, live pricing. |
| **5** | **AI Lead Recovery & Outreach Agent** | `/lead-recovery`| `/api/leads`, `/api/leads/:id/approve` | Re-engages stale CRM contacts, drafts follow-ups, human gate. |
| **6** | **JobAutopilot Pro** | `/job-autopilot`| `/api/jobs`, `/api/jobs/:id/status` | AI role matching, tailored resume bullets, Kanban tracker. |
| **7** | **Faceless Shorts / Reels Factory** | `/shorts-factory`| `/api/shorts` | 9:16 vertical short-video scripts, speech tempo, kinetic captions. |
| **8** | **AI Meeting-to-CRM Copilot** | `/meeting-crm` | `/api/meetings`, `/api/meetings/extract` | Call transcripts to structured summary, decisions & action items. |
| **9** | **Freelancer Client OS** | `/freelancer-os`| `/api/freelancer/invoices` | Proposals, invoices, payment status, Stripe & UPI tracking. |
| **10**| **AI Interview Prep Coach (PWA)** | `/interview-coach`| `/api/interview/sessions`, `/api/interview/score` | Voice mock interviews, STAR scoring rubric, real-time feedback. |

---

## 3. Extracted API Credentials & Custom Router Integration

Stored securely in local environment files (`.env`, `apps/worker-api/.env`, `apps/hub/.env.local`):

- **FreeLLMAPI Custom Router**: `http://127.0.0.1:31415/v1` (Key: `freellmapi-82ee...`)
- **Groq Cloud**: `gsk_dIa...` (Llama 3.3 70B Versatile, 500+ tok/s)
- **Google Gemini API**: `AQ.Ab8RN6...` (Gemini 2.5 Flash, 1M context)
- **Cerebras Cloud**: `csk-x46...` (Ultra-fast inference)
- **Mistral API**: `vb0Tkkt...`
- **Nvidia Cloud**: `nvapi-Qd...`
- **OpenRouter**: `sk-or-v1-988...`
- **Cohere & HuggingFace**: `DwWH...`, `hf_lAj...`

---

## 4. Live Verification Suite (73 Checks PASS)

```bash
# 1. 73-Check Edge API & 10-Project Integration Suite
node --experimental-strip-types scripts/test-edge.mjs

# 2. Next.js Cloudflare Pages Static Edge Export Build (16 static routes)
npm --workspace=apps/hub run build

# 3. Master Monorepo Production Build & Artifact Verification
node scripts/build-all.mjs
```

---

## 5. Architectural Invariants ($0 Rules & Governance)

1. **Zero-Post Policy**: AI never posts directly to social channels (LinkedIn, X, Ghost). Every outbound post enters `UNDER_REVIEW` and must have an explicit `APPROVED` record signed by a human editor.
2. **Calibrated Refusal**: The RAG copilot must answer "I do not have sufficient documentation" whenever confidence < 0.65 or an out-of-domain query is presented. Refusal accuracy on golden test benchmarks must remain at 100%.
3. **Zero Egress Cloud Cost**: Files, exports, and assets must be hosted on Cloudflare Pages or Cloudflare R2 ($0 egress fees), never on AWS S3 or egress-metered providers.
4. **Multi-Model Edge Fallback**: The AI Gateway automatically queries local FreeLLMAPI first, falling back to Groq, Gemini, or Cloudflare Workers AI with sub-50ms latency.
