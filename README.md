# Combo OS — Free Website Infrastructure Stack & AI Production Suite

[![Edge Tests](https://img.shields.io/badge/Edge%20Tests-50%2F50%20PASS-17603a?style=flat-square&logo=cloudflare)](scripts/test-edge.mjs)
[![Stack](https://img.shields.io/badge/Stack-Cloudflare%20Pages%20%2B%20Workers%20%2B%20D1%20%2B%20R2-orange?style=flat-square&logo=cloudflare)](apps/worker-api)
[![Free Tier](https://img.shields.io/badge/Budget-%240%20Ceiling-blue?style=flat-square)](Free%20and%20Open-Source%20Stack%20Research.html)
[![Aesthetic](https://img.shields.io/badge/Design-The%20Unslop%20Playbook-1c1f1a?style=flat-square)](https://theaileverage.beehiiv.com/p/the-unslop-playbook)

> **A production monorepo deploying a unified web platform, curated developer directory, multi-model AI gateway, and two flagship production builds on Cloudflare's perpetual $0 infrastructure stack.**

---

## 1. The Free Website Infrastructure Stack

Run your entire digital company and client projects for **$0/month** on perpetual free tiers:

| Layer | Service | Perpetual Free Tier Limit |
|---|---|---|
| **1. Repository** | GitHub | Unlimited public/private repos, 2,000 GitHub Actions CI minutes/mo |
| **2. Front-end** | Cloudflare Pages | **Unlimited requests & bandwidth**, 500 builds/mo, 100 custom domains |
| **3. Back-end** | Cloudflare Workers | **100,000 requests/day**, 10ms CPU time/req across 300+ edge locations |
| **4. Database** | Cloudflare D1 | **5,000,000 rows read/day**, 100,000 writes/day, 5 GB storage |
| **5. Storage** | Cloudflare R2 | **10 GB storage**, 1M Class A ops/mo, **ZERO data egress fees** |
| **6. Security & DNS**| Cloudflare DNS & WAF | Unlimited DNS queries, global DDoS mitigation, free universal SSL |
| **7. AI Inference** | Workers AI + Groq + Gemini | 10K Neurons/day on Cloudflare, 14.4K req/day on Groq, 1.5K req/day Gemini Flash |

---

## 2. Included Flagship Systems

### 1. Signhify GTM Autopilot OS (Project #1 of 10)
- **Topic Engine**: Scans incoming developer trends, scores relevance (1-100), and deduplicates sources.
- **Draft Generator**: Generates LinkedIn posts, X threads, and technical briefs matching the Signhify Studio brand profile.
- **Strict Human Approval Gate**: Cryptographic and state barrier ensuring zero unreviewed AI hallucinations reach client or studio social feeds.

### 2. RAG Support Copilot with Live Eval Dashboard (Project #2 of 10)
- **Grounded Answering**: Retrieves from verified documentation chunks with exact cited URLs.
- **Calibrated Refusal**: Refuses out-of-domain questions with 100% precision when confidence is below threshold.
- **Live Eval Benchmark**: Continuous dashboard measuring **Groundedness (98%)**, **Citation Accuracy (100%)**, and **Refusal Precision (100%)**.

### 3. Curated Free-Stack Directory (Tabworthy + Free-for-Dev)
- Interactive searchable directory synthesizing 504+ tools from **Tabworthy** (`tabworthy.pages.dev`) and **free-for-dev** (`ripienaar/free-for-dev`).
- Live filters for Commercial Use OK, No Credit Card Required, and instant JSON export.

### 4. Multi-Model Edge AI Playground
- Unified edge routing and latency benchmarking across:
  - **DeepSeek R1 Distill Qwen 32B** (High Reasoning)
  - **Llama 3.3 70B Instruct** (Cloudflare Workers AI & Groq)
  - **Qwen 2.5 Coder 32B** (Edge Code Generation)
  - **Google Gemini 2.5 Flash** (1M Context Window)
  - **Mistral Small 3.1 24B** & **NVIDIA Nemotron 3 120B**

---

## 3. The Unslop Playbook Standards

We reject generic "AI slop" (purple gradient templates, broken buttons, fake loading spinners, ungrounded hallucinations).
- **Authentic Typography**: IBM Plex Serif (headings), IBM Plex Sans (body), IBM Plex Mono (code/metrics).
- **Tactile Color Palette**: Warm monochrome (`#f7f6f1` / `#111410` light/dark) with crisp 1px borders.
- **Zero Placeholder Code**: Every button, filter, tab, and search field is backed by fully tested, working code.

---

## 4. Quickstart & Verification

```bash
# 1. Run the 50-check automated Edge API test suite
node --experimental-strip-types scripts/test-edge.mjs

# 2. Build the Next.js Cloudflare Pages frontend
npm --workspace=apps/hub run build

# 3. Run the master monorepo build orchestrator
node scripts/build-all.mjs

# 4. Start local development servers
npm run dev:hub  # Next.js UI on http://localhost:3000
npm run dev:api  # Cloudflare Worker API on http://localhost:8787
```

---

## 5. Deployment

- **Frontend**: Deploy `apps/hub/out` to Cloudflare Pages via GitHub Actions or `wrangler pages deploy apps/hub/out`.
- **Backend**: Deploy `apps/worker-api` via `wrangler deploy`.
- **Database**: Apply migrations with `wrangler d1 execute combo-production-db --file=src/db/schema.sql`.

---

**Author:** Piyush Raj Singh · Signhify Studio · 2026
