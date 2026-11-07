import type { DirectoryTool, GTMTopic, GTMDraft, RAGDocument, RAGEvalBenchmark } from '@combo/shared-types';

export const seedTools: DirectoryTool[] = [
  // --- Infrastructure Core ($0 Stack) ---
  {
    id: 'cf-pages',
    name: 'Cloudflare Pages',
    category: 'Frontend',
    url: 'https://pages.cloudflare.com',
    description: 'Fast, secure edge frontend hosting with unlimited bandwidth, custom domains, and preview deploys.',
    free_tier: 'Unlimited requests & bandwidth, 500 builds/month, 100 custom domains',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'cf-workers',
    name: 'Cloudflare Workers',
    category: 'Compute',
    url: 'https://workers.cloudflare.com',
    description: 'Ultra-low latency V8 isolate edge serverless compute running across 300+ global locations.',
    free_tier: '100,000 requests/day, 10ms CPU time/req, zero cold starts',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'cf-d1',
    name: 'Cloudflare D1',
    category: 'Database',
    url: 'https://developers.cloudflare.com/d1',
    description: 'Serverless SQLite database distributed at the edge with automatic replication and read caching.',
    free_tier: '5,000,000 rows read/day, 100,000 rows written/day, 5 GB storage',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'cf-r2',
    name: 'Cloudflare R2',
    category: 'Storage',
    url: 'https://developers.cloudflare.com/r2',
    description: 'S3-compatible distributed object storage with zero egress fees.',
    free_tier: '10 GB storage, 1,000,000 Class A operations/mo, 10,000,000 Class B operations/mo, ZERO egress fee',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'cf-dns',
    name: 'Cloudflare DNS & WAF',
    category: 'Dev Tools',
    url: 'https://cloudflare.com',
    description: 'Industry-standard 1.1.1.1 authoritative DNS, DDoS mitigation, and free SSL certificates.',
    free_tier: 'Unlimited DNS queries, DDoS protection, universal SSL certificates',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'cf-workers-ai',
    name: 'Cloudflare Workers AI',
    category: 'AI & ML',
    url: 'https://developers.cloudflare.com/workers-ai',
    description: 'Run serverless open-source models directly on Cloudflare GPUs at the edge (DeepSeek R1, Llama 3.3, Qwen, Mistral).',
    free_tier: '10,000 Neurons/day (approx 200-500 free queries daily)',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  // --- High-Performance AI Inference ---
  {
    id: 'groq-cloud',
    name: 'Groq Cloud',
    category: 'AI & ML',
    url: 'https://groq.com',
    description: 'LPU inference engine delivering 500+ tokens/second on Llama 3.3 70B and Mixtral.',
    free_tier: '30 requests/min, 14,400 requests/day, 6,000 tokens/min free tier',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'gemini-api',
    name: 'Google Gemini 2.5 Flash',
    category: 'AI & ML',
    url: 'https://ai.google.dev',
    description: 'Multimodal foundation model with 1M context window and high reasoning capability.',
    free_tier: '15 RPM, 1,500 requests/day, 1M TPM on Flash tier',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'github-core',
    name: 'GitHub Free',
    category: 'Dev Tools',
    url: 'https://github.com',
    description: 'Unlimited public/private Git repositories, GitHub Actions CI/CD, and package registry.',
    free_tier: 'Unlimited repos, 2,000 GitHub Actions build minutes/month, 500MB Packages',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  // --- Databases & Vector Engines ---
  {
    id: 'supabase-free',
    name: 'Supabase',
    category: 'Database',
    url: 'https://supabase.com',
    description: 'The Open Source Firebase alternative: Postgres, pgvector, Auth, Storage, and Realtime.',
    free_tier: '2 free projects, 500 MB database, 1 GB file storage, 50,000 monthly active users',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'neon-tech',
    name: 'Neon Serverless Postgres',
    category: 'Database',
    url: 'https://neon.tech',
    description: 'Serverless PostgreSQL with instant branching and scale-to-zero compute.',
    free_tier: '0.5 GB storage, 1 compute branch, scale-to-zero after inactivity',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'upstash-redis',
    name: 'Upstash Serverless Redis & QStash',
    category: 'Database',
    url: 'https://upstash.com',
    description: 'Serverless Redis and HTTP-based message queue for background tasks and rate limiting.',
    free_tier: '10,000 commands/day free for Redis, 500 messages/day for QStash',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  // --- Hand-Picked Gems from Tabworthy & Free-for-Dev ---
  {
    id: 'tabworthy-resend',
    name: 'Resend',
    category: 'Dev Tools',
    url: 'https://resend.com',
    description: 'Modern email API for developers with React Email component templates.',
    free_tier: '3,000 emails/month, 100 emails/day, 1 domain',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'tabworthy-excalidraw',
    name: 'Excalidraw',
    category: 'Media',
    url: 'https://excalidraw.com',
    description: 'Virtual collaborative whiteboard for sketching hand-drawn like architecture diagrams.',
    free_tier: '100% free & open-source web application with zero login required',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'tabworthy-squoosh',
    name: 'Squoosh',
    category: 'Media',
    url: 'https://squoosh.app',
    description: 'Client-side image compression tool powered by WebAssembly (WebP, AVIF, MozJPEG).',
    free_tier: '100% free, runs completely client-side in the browser, no upload limits',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'tabworthy-rayso',
    name: 'Ray.so',
    category: 'Media',
    url: 'https://ray.so',
    description: 'Generate beautiful, shareable code snippet screenshots with clean gradients or dark backing.',
    free_tier: '100% free, unlimited exports, client-side rendering',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'tabworthy-bundlephobia',
    name: 'Bundlephobia',
    category: 'Dev Tools',
    url: 'https://bundlephobia.com',
    description: 'Inspect the cost of adding an npm package to your JavaScript bundle before installing.',
    free_tier: '100% free developer utility, open-source',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'oracle-free-tier',
    name: 'Oracle Cloud Always Free ARM',
    category: 'Compute',
    url: 'https://oracle.com/cloud/free',
    description: 'Up to 4 Ampere A1 ARM cores, 24 GB RAM, and 200 GB block volume that never expires.',
    free_tier: '4 OCPUs, 24 GB RAM, 200 GB storage permanently free',
    commercial_ok: true,
    cc_required: true,
    featured: true,
    unslop_score: 8
  },
  // --- Modern Serverless Databases & Edge Storage ---
  {
    id: 'turso-libsql',
    name: 'Turso (libSQL)',
    category: 'Database',
    url: 'https://turso.tech',
    description: 'Distributed SQLite database powered by libSQL with sub-millisecond edge replicas.',
    free_tier: '9 GB storage, 500 databases, 1B row reads/month',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'tidb-serverless',
    name: 'TiDB Serverless',
    category: 'Database',
    url: 'https://pingcap.com/ai',
    description: 'Autonomous MySQL-compatible serverless database with built-in vector search.',
    free_tier: '5 GB storage, 50M Request Units/month free',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas M0',
    category: 'Database',
    url: 'https://www.mongodb.com/cloud/atlas',
    description: 'Fully managed document database with search and aggregation pipelines.',
    free_tier: '512 MB shared storage, shared RAM, perpetually free',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 8
  },
  {
    id: 'convex-backend',
    name: 'Convex',
    category: 'Database',
    url: 'https://convex.dev',
    description: 'Reactive backend-as-a-service with automatic real-time sync and TypeScript schema.',
    free_tier: '1M function calls/mo, 1 GB database storage, 1 GB file storage',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'backblaze-b2',
    name: 'Backblaze B2',
    category: 'Storage',
    url: 'https://www.backblaze.com/cloud-storage',
    description: 'S3-compatible cloud object storage with free bandwidth alliance to Cloudflare.',
    free_tier: '10 GB storage, $0 egress fees when routed through Cloudflare',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'imagekit-io',
    name: 'ImageKit.io',
    category: 'Storage',
    url: 'https://imagekit.io',
    description: 'Real-time image and video optimization CDN with automatic WebP/AVIF delivery.',
    free_tier: '20 GB bandwidth/month, unlimited image transformations',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  // --- Edge Compute & App Hosting ---
  {
    id: 'deno-deploy',
    name: 'Deno Deploy',
    category: 'Compute',
    url: 'https://deno.com/deploy',
    description: 'Serverless JavaScript, TypeScript, and WebAssembly runtime across 35 edge regions.',
    free_tier: '100,000 requests/day, 100ms CPU execution time/req',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'fly-io',
    name: 'Fly.io',
    category: 'Compute',
    url: 'https://fly.io',
    description: 'Deploy app servers and full Docker containers close to your users on bare metal.',
    free_tier: 'Up to 3 shared-cpu-1x 256MB VMs, 3GB persistent volumes, 160GB egress',
    commercial_ok: true,
    cc_required: true,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'koyeb-serverless',
    name: 'Koyeb',
    category: 'Compute',
    url: 'https://koyeb.com',
    description: 'Serverless deployment platform with native Docker support and built-in global mesh.',
    free_tier: '1 Nano instance (512MB RAM, 0.1 vCPU), 55 hours/month active runtime',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 8
  },
  // --- AI Foundations & High-Speed Inference ---
  {
    id: 'cerebras-inference',
    name: 'Cerebras Cloud',
    category: 'AI & ML',
    url: 'https://cerebras.ai',
    description: 'Wafer-scale AI inference delivering up to 1,800 tokens/second on Llama 3.1 8B.',
    free_tier: '1,000,000 free tokens/day on developer tier',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'mistral-ai',
    name: 'Mistral AI Platform',
    category: 'AI & ML',
    url: 'https://console.mistral.ai',
    description: 'Cutting-edge European open-weights and commercial models (Mistral Small, Pixtral, Codestral).',
    free_tier: '1 req/sec rate limit on free experimental endpoints',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'huggingface-inference',
    name: 'Hugging Face Inference API',
    category: 'AI & ML',
    url: 'https://huggingface.co/inference-api',
    description: 'Instant serverless API access to 100,000+ open-source machine learning models.',
    free_tier: 'Rate-limited community tier for text, vision, and audio models',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'openrouter-ai',
    name: 'OpenRouter Free Models',
    category: 'AI & ML',
    url: 'https://openrouter.ai',
    description: 'Unified gateway providing free access to DeepSeek, Gemma, and community open-weights models.',
    free_tier: '20+ permanently free open-source models with 0-cent token billing',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  // --- APIs, Messaging & Realtime ---
  {
    id: 'meta-whatsapp-api',
    name: 'WhatsApp Cloud API',
    category: 'Dev Tools',
    url: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
    description: 'Official Meta cloud API for sending and receiving WhatsApp business messages.',
    free_tier: '1,000 free service (user-initiated) conversations each month',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'webhook-site',
    name: 'Webhook.site',
    category: 'Dev Tools',
    url: 'https://webhook.site',
    description: 'Instantly test, inspect, and mock incoming HTTP webhooks, requests, and payloads.',
    free_tier: '100% free web inspection with zero sign-up required',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'svix-webhooks',
    name: 'Svix Webhooks',
    category: 'Dev Tools',
    url: 'https://svix.com',
    description: 'Enterprise-grade webhooks-as-a-service with retry mechanisms, security signatures, and portal.',
    free_tier: '50,000 free webhook messages/month',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'pusher-channels',
    name: 'Pusher Channels',
    category: 'Dev Tools',
    url: 'https://pusher.com',
    description: 'Hosted real-time WebSockets infrastructure for notifications, chats, and live metrics.',
    free_tier: '200,000 messages/day, 100 concurrent connections',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 8
  },
  // --- Monitoring, Observability & Analytics ---
  {
    id: 'cf-web-analytics',
    name: 'Cloudflare Web Analytics',
    category: 'Dev Tools',
    url: 'https://www.cloudflare.com/web-analytics',
    description: 'Privacy-first, cookie-free web analytics measuring Core Web Vitals and pageviews.',
    free_tier: 'Unlimited sites, unlimited pageviews, zero tracking cookies',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'sentry-errors',
    name: 'Sentry',
    category: 'Dev Tools',
    url: 'https://sentry.io',
    description: 'Application performance monitoring, crash diagnostics, and error tracking.',
    free_tier: '5,000 errors/month, 10,000 performance transactions, 1 user seat',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'better-stack',
    name: 'Better Stack Uptime',
    category: 'Dev Tools',
    url: 'https://betterstack.com',
    description: 'Uptime monitoring, incident alerts via email/SMS, and public status page.',
    free_tier: '10 monitors, 3-minute check frequency, 1 public status page',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'axiom-logs',
    name: 'Axiom',
    category: 'Dev Tools',
    url: 'https://axiom.co',
    description: 'Serverless log management and event intelligence with unlimited queries.',
    free_tier: '0.5 TB log ingest/month, 30 days data retention',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'mixpanel-analytics',
    name: 'Mixpanel',
    category: 'Dev Tools',
    url: 'https://mixpanel.com',
    description: 'Product event analytics tracking funnels, retention, and user cohorts.',
    free_tier: '20,000,000 monthly events, core reports, unlimited data history',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  // --- Essential Developer Gems (Tabworthy Curation) ---
  {
    id: 'devdocs-io',
    name: 'DevDocs.io',
    category: 'Dev Tools',
    url: 'https://devdocs.io',
    description: 'Unified documentation browser for 100+ languages, libraries, and frameworks with offline mode.',
    free_tier: '100% free & open-source, zero ads, runs offline in browser cache',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'regex101',
    name: 'Regex101',
    category: 'Dev Tools',
    url: 'https://regex101.com',
    description: 'Interactive regular expression tester with live explanation, substitution, and benchmarking.',
    free_tier: '100% free web utility with syntax breakdown for PCRE, JavaScript, Python',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'caniuse-com',
    name: 'Can I Use',
    category: 'Frontend',
    url: 'https://caniuse.com',
    description: 'Up-to-date browser support tables for modern desktop and mobile web standards.',
    free_tier: '100% free developer reference tool',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 10
  },
  {
    id: 'json-hero',
    name: 'JSON Hero',
    category: 'Dev Tools',
    url: 'https://jsonhero.io',
    description: 'Clean, interactive JSON visualizer that makes navigating large payloads effortless.',
    free_tier: '100% free and open-source JSON tool',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 9
  },
  {
    id: 'crontab-guru',
    name: 'Crontab Guru',
    category: 'Dev Tools',
    url: 'https://crontab.guru',
    description: 'Interactive cron schedule expression editor and human-readable explanation calculator.',
    free_tier: '100% free web utility',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 10
  },
  {
    id: 'tinypng-api',
    name: 'TinyPNG',
    category: 'Media',
    url: 'https://tinypng.com',
    description: 'Smart lossy WebP, PNG, and JPEG compression algorithm preserving transparency.',
    free_tier: '500 image compressions/month free via official developer API',
    commercial_ok: true,
    cc_required: false,
    featured: false,
    unslop_score: 9
  },
  {
    id: 'svgomg-app',
    name: 'SVGOMG',
    category: 'Media',
    url: 'https://svgomg.net',
    description: 'Web GUI for SVGO to optimize vector graphics and strip bloat without visual quality loss.',
    free_tier: '100% free and open-source client-side SVG tool',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  },
  {
    id: 'bruno-client',
    name: 'Bruno API Client',
    category: 'Dev Tools',
    url: 'https://usebruno.com',
    description: 'Fast, open-source API client that stores collections in plain text files inside your Git repo.',
    free_tier: '100% free, offline-first, zero cloud account lock-in',
    commercial_ok: true,
    cc_required: false,
    featured: true,
    unslop_score: 10
  }
];

export const seedTopics: GTMTopic[] = [
  {
    id: 'top-1',
    title: 'The Zero-Dollar Architecture: How to Host Production Next.js on Cloudflare Pages and D1',
    source: 'Signhify Engineering Research',
    score: 96,
    status: 'DRAFTED',
    created_at: '2026-11-06T10:00:00Z'
  },
  {
    id: 'top-2',
    title: 'Why RAG Without Evals Is Malpractice: Catching 40% Hallucinations on Edge Support Bots',
    source: 'Support Ops Benchmark 2026',
    score: 92,
    status: 'NEW',
    created_at: '2026-11-06T14:30:00Z'
  },
  {
    id: 'top-3',
    title: 'WhatsApp AI Agents for Local Clinics: Step-by-Step $0 Stack Architecture',
    source: 'Signhify Studio Sales Pipeline',
    score: 88,
    status: 'NEW',
    created_at: '2026-11-07T08:15:00Z'
  }
];

export const seedDrafts: GTMDraft[] = [
  {
    id: 'draft-1',
    topic_id: 'top-1',
    channel: 'linkedin',
    content: `Most founders believe hosting a full-stack SaaS costs $50-$200/month in early server and database fees.

Here is the exact $0 production architecture running Signhify Studio:
• Frontend: Cloudflare Pages (unlimited edge bandwidth)
• Backend: Cloudflare Workers (100,000 requests/day free)
• Database: Cloudflare D1 (Serverless SQLite, 5M reads/day)
• Storage: Cloudflare R2 (10 GB free, ZERO egress fees)
• LLM Gateway: Cloudflare Workers AI + Groq fallback (0ms server spinup)

Never burn cash on infrastructure before validating demand. Code lean, measure latency, ship today.`,
    citations: ['https://pages.cloudflare.com', 'https://developers.cloudflare.com/d1', 'https://groq.com'],
    approval_status: 'UNDER_REVIEW',
    approved_by: null,
    approved_at: null,
    created_at: '2026-11-07T09:00:00Z'
  },
  {
    id: 'draft-2',
    topic_id: 'top-1',
    channel: 'x',
    content: `Stop paying $20/mo for managed Postgres before you have 10 users.

Cloudflare D1 gives you:
- 5M reads / day
- 100K writes / day
- 5GB storage
- Zero connection pool starvation

Cost: $0. Pair it with Cloudflare Workers for sub-15ms edge responses. 🧵👇`,
    citations: ['https://developers.cloudflare.com/d1'],
    approval_status: 'APPROVED',
    approved_by: 'Piyush Raj Singh',
    approved_at: '2026-11-07T11:20:00Z',
    scheduled_for: '2026-11-07T18:00:00Z',
    created_at: '2026-11-07T09:15:00Z'
  }
];

export const seedDocuments: RAGDocument[] = [
  {
    id: 'doc-1',
    title: 'Cloudflare Pages & Workers Free Tier Limits',
    content: `Cloudflare Pages offers unlimited requests and bandwidth on the free tier, with up to 500 builds per month and 100 custom domains per account.
Cloudflare Workers provides 100,000 requests per day on the free tier with up to 10 milliseconds of CPU execution time per request. Workers execute across 300+ global data centers with near-zero cold starts.
Commercial usage is 100% permitted under Cloudflare's standard terms of service.`,
    metadata: { source: 'Cloudflare Docs', category: 'Hosting' }
  },
  {
    id: 'doc-2',
    title: 'Cloudflare D1 & R2 Quotas and Invariants',
    content: `Cloudflare D1 free tier includes 5,000,000 rows read per day, 100,000 rows written per day, and 5 GB of total storage. D1 is an edge-native SQLite engine.
Cloudflare R2 provides 10 GB of object storage per month, 1,000,000 Class A operations (writes/lists), and 10,000,000 Class B operations (reads). Unlike Amazon S3, R2 has zero data egress fees.`,
    metadata: { source: 'Cloudflare Docs', category: 'Database & Storage' }
  },
  {
    id: 'doc-3',
    title: 'Signhify Studio GTM Approval Gate Rules',
    content: `Every piece of outbound content drafted by AI in Signhify GTM Autopilot OS MUST pass through a human approval gate.
No post may be scheduled, published, or transmitted to social APIs (LinkedIn, X, Ghost) without an explicit approval status of APPROVED recorded in the database.
If any fact or claim in the draft lacks a verified citation, the content generator must flag the draft as UNDER_REVIEW with a warning badge.`,
    metadata: { source: 'Signhify Operational Playbook', category: 'GTM Governance' }
  }
];

export const seedEvalBenchmarks: RAGEvalBenchmark[] = [
  {
    id: 'eval-1',
    query: 'What are the daily request limits and CPU time caps on the Cloudflare Workers free tier?',
    expected_answer: '100,000 requests per day and up to 10ms CPU execution time per request.',
    is_out_of_domain: false,
    last_groundedness_score: 0.98,
    last_citation_score: 1.0,
    last_refusal_pass: true,
    last_latency_ms: 124
  },
  {
    id: 'eval-2',
    query: 'How much data egress fee does Cloudflare R2 charge when serving files to users?',
    expected_answer: 'Cloudflare R2 charges $0 egress fees (zero data transfer fee).',
    is_out_of_domain: false,
    last_groundedness_score: 0.96,
    last_citation_score: 1.0,
    last_refusal_pass: true,
    last_latency_ms: 110
  },
  {
    id: 'eval-3',
    query: 'Can AI content automatically publish to LinkedIn without human review in Signhify GTM?',
    expected_answer: 'No. Strict human approval is mandatory; content cannot be published without APPROVED status.',
    is_out_of_domain: false,
    last_groundedness_score: 0.99,
    last_citation_score: 1.0,
    last_refusal_pass: true,
    last_latency_ms: 135
  },
  {
    id: 'eval-4',
    query: 'What is the stock price of Apple Inc and the forecast for next quarter?',
    expected_answer: 'REFUSAL: I do not have verified documentation or financial data to answer this question.',
    is_out_of_domain: true,
    last_groundedness_score: 1.0,
    last_citation_score: 1.0,
    last_refusal_pass: true,
    last_latency_ms: 88
  },
  {
    id: 'eval-5',
    query: 'Give me the recipe for traditional French onion soup.',
    expected_answer: 'REFUSAL: I am restricted to Signhify Free Stack and Cloudflare architecture documentation.',
    is_out_of_domain: true,
    last_groundedness_score: 1.0,
    last_citation_score: 1.0,
    last_refusal_pass: true,
    last_latency_ms: 72
  }
];
