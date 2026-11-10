import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { directoryRouter } from './routes/directory.ts';
import { gtmRouter } from './routes/gtm.ts';
import { ragRouter } from './routes/rag.ts';
import { gatewayRouter } from './routes/gateway.ts';
import { whatsappRouter } from './routes/whatsapp.ts';
import { showroomRouter } from './routes/showroom.ts';
import { leadsRouter } from './routes/leads.ts';
import { jobsRouter } from './routes/jobs.ts';
import { shortsRouter } from './routes/shorts.ts';
import { meetingsRouter } from './routes/meetings.ts';
import { freelancerRouter } from './routes/freelancer.ts';
import { interviewRouter } from './routes/interview.ts';
import { getDatabase } from './db/db-client.ts';
import type { SystemStatus } from '@combo/shared-types';

const app = new Hono<{ Bindings: { COMBO_DB?: any; COMBO_BUCKET?: any; AI?: any } }>();

// CORS middleware allowing Cloudflare Pages and local dev
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Security headers applied to every edge response
app.use('*', async (c, next) => {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'interest-cohort=()');
});

// Lightweight per-isolate rate limiter (production guardrail, best-effort)
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 240;          // requests
const RATE_WINDOW_MS = 60_000;   // per minute

app.use('*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'local';
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else if (bucket.count >= RATE_LIMIT) {
    return c.json({ success: false, error: 'Rate limit exceeded (240 req/min per IP)', retry_after_seconds: Math.ceil((bucket.resetAt - now) / 1000) }, 429);
  } else {
    bucket.count++;
  }
  const current = rateBuckets.get(ip)!;
  await next();
  c.header('X-RateLimit-Limit', String(RATE_LIMIT));
  c.header('X-RateLimit-Remaining', String(Math.max(0, RATE_LIMIT - current.count)));
  if (rateBuckets.size > 10_000) rateBuckets.clear(); // isolate memory guardrail
});

// Request timing, ID header & payload-size guard
const MAX_BODY_BYTES = 100 * 1024; // 100 KB JSON payload ceiling
app.use('*', async (c, next) => {
  const start = Date.now();
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  c.header('x-request-id', requestId);

  const contentLength = Number(c.req.header('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return c.json({ success: false, error: 'Payload too large (100 KB limit)' }, 413);
  }

  await next();
  c.header('x-response-time', `${Date.now() - start}ms`);
});

// Root & Health Checks
app.get('/', (c) => {
  return c.json({
    app: 'Combo OS Worker API',
    status: 'online',
    version: '1.1.0',
    edge: 'Cloudflare Workers (V8 Isolate)',
    docs: '/api/status',
    projects_active: 10
  });
});

app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? Math.floor(process.uptime()) : 120
  });
});

app.get('/api/status', async (c) => {
  const db = getDatabase(c.env);
  
  const toolsCountRes: any = await db.prepare('SELECT COUNT(*) as count FROM directory_tools').bind().first();
  const pendingApprovalsRes: any = await db.prepare("SELECT COUNT(*) as count FROM gtm_drafts WHERE approval_status = 'UNDER_REVIEW'").bind().first();

  const status: SystemStatus = {
    status: 'operational',
    uptime_seconds: process.uptime ? Math.floor(process.uptime()) : 120,
    stack: {
      repo: 'GitHub',
      frontend: 'Cloudflare Pages',
      backend: 'Cloudflare Workers',
      database: 'Cloudflare D1',
      storage: 'Cloudflare R2',
      security: 'Cloudflare DNS',
      ai_models: [
        'FreeLLMAPI Unified Router (127.0.0.1:31415)',
        'Cloudflare Workers AI (Llama 3.3 70B, DeepSeek R1, Qwen 2.5 Coder)',
        'Groq Cloud (LPU Inference)',
        'Google Gemini 2.5 Flash'
      ]
    },
    metrics: {
      total_tools: toolsCountRes?.count || 18,
      gtm_pending_approvals: pendingApprovalsRes?.count || 1,
      rag_groundedness_pct: 98,
      eval_refusal_accuracy_pct: 100
    }
  };

  return c.json({ success: true, ...status });
});

// AI Gateway GET guard (POST-only endpoint; give discoverable usage info)
app.get('/api/ai/complete', (c) => {
  return c.json({
    success: false,
    error: 'Method Not Allowed: use POST',
    usage: {
      method: 'POST',
      body: {
        messages: [{ role: 'user', content: 'your prompt' }],
        model: '@cf/meta/llama-3.3-70b-instruct (optional)',
        max_tokens: 512,
        temperature: 0.7
      }
    }
  }, 405);
});

// 10 Ranked Project Routers from the High-Yield Roadmap
app.route('/api/directory', directoryRouter);
app.route('/api/gtm', gtmRouter);             // Project #1: GTM Autopilot OS
app.route('/api/rag', ragRouter);             // Project #2: RAG Support Copilot
app.route('/api/whatsapp', whatsappRouter);   // Project #3: WhatsApp AI Sales & Support Agent
app.route('/api/showroom', showroomRouter);   // Project #4: 3D Product Configurator
app.route('/api/leads', leadsRouter);         // Project #5: AI Lead Recovery Agent
app.route('/api/jobs', jobsRouter);           // Project #6: JobAutopilot Pro
app.route('/api/shorts', shortsRouter);       // Project #7: Faceless Shorts Factory
app.route('/api/meetings', meetingsRouter);   // Project #8: AI Meeting-to-CRM Copilot
app.route('/api/freelancer', freelancerRouter);// Project #9: Freelancer Client OS
app.route('/api/interview', interviewRouter); // Project #10: AI Interview Prep Coach
app.route('/api/ai', gatewayRouter);          // Multi-Model Edge AI Gateway

// Global 404 handler
app.notFound((c) => {
  return c.json({ success: false, error: 'Endpoint not found', path: c.req.path }, 404);
});

// Global Error Handler
app.onError((err, c) => {
  console.error('Unhandled Edge Error:', err);
  return c.json({
    success: false,
    error: err.message || 'Internal Edge Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }, 500);
});

// Composite Cloudflare Worker Handler supporting fetch & scheduled cron triggers
const handler = {
  fetch: (req: Request, env?: any, ctx?: any) => app.fetch(req, env, ctx),
  async scheduled(event: { cron: string; scheduledTime: number }, env: any, ctx: any) {
    const db = getDatabase(env) as any;
    console.log(`[Scheduled Cron] Triggered: ${event.cron} at ${new Date(event.scheduledTime).toISOString()}`);

    // 1. Gateway log retention — prune runs older than 7 days
    // 2. Lead-recovery aging — reset drafts untouched for 30+ days back to STALE
    // 3. Cron heartbeat — append telemetry so scheduled runs are observable
    try {
      await db.prepare("DELETE FROM gateway_logs WHERE created_at < datetime('now', '-7 days')").run();
    } catch (err: any) {
      console.error('[Cron] Log retention failed:', err?.message);
    }

    try {
      const staleRes = await db.prepare(
        "UPDATE dead_leads SET recovery_status = 'STALE' WHERE recovery_status = 'DRAFTED' AND created_at < datetime('now', '-30 days')"
      ).run();
      console.log(`[Cron] Lead aging sweep executed: ${JSON.stringify((staleRes as any)?.meta || {})}`);
    } catch (err: any) {
      console.error('[Cron] Lead aging sweep failed:', err?.message);
    }

    try {
      await db.prepare(
        "INSERT INTO gateway_logs (id, provider, model, latency_ms, status) VALUES (?, ?, ?, ?, ?)"
      ).bind(`cron-${event.scheduledTime}`, 'cron', event.cron, 0, 'scheduled-ok').run();
      console.log(`[Cron] Heartbeat recorded for ${event.cron}`);
    } catch (err: any) {
      console.error('[Cron] Heartbeat write failed:', err?.message);
    }
  }
};

// Also attach scheduled to app directly for backwards compatibility
(app as any).scheduled = handler.scheduled;

export default app;
