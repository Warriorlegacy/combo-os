import { Hono } from 'hono';
import { LLMGatewayService } from '../services/llm-gateway.ts';
import { getDatabase } from '../db/db-client.ts';
import type { GatewayRequest } from '@combo/shared-types';

export const gatewayRouter = new Hono<{ Bindings: { COMBO_DB?: any; AI?: any; GROQ_API_KEY?: string; GEMINI_API_KEY?: string } }>();

const NOTABLE_FREE_MODELS = [
  { id: '@cf/meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B Instruct', provider: 'Cloudflare Workers AI', free_daily_neurons: '10K', speed: 'Fast' },
  { id: '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B', provider: 'Cloudflare Workers AI', free_daily_neurons: '10K', speed: 'High Reasoning' },
  { id: '@cf/qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder 32B Instruct', provider: 'Cloudflare Workers AI', free_daily_neurons: '10K', speed: 'Fast Code' },
  { id: '@cf/mistral/mistral-small-3.1-24b-instruct', name: 'Mistral Small 3.1 24B', provider: 'Cloudflare Workers AI', free_daily_neurons: '10K', speed: 'Balanced' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Groq Cloud', free_daily_neurons: '14.4K req/day', speed: '500+ tok/s' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google AI Studio', free_daily_neurons: '1.5K req/day', speed: '1M Context' }
];

gatewayRouter.get('/models', (c) => {
  return c.json({
    success: true,
    count: NOTABLE_FREE_MODELS.length,
    models: NOTABLE_FREE_MODELS
  });
});

gatewayRouter.post('/complete', async (c) => {
  const body = await c.req.json() as GatewayRequest;
  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return c.json({ success: false, error: 'messages array is required' }, 400);
  }

  const service = new LLMGatewayService(c.env);
  const response = await service.complete(body);

  // Record telemetry in D1
  const db = getDatabase(c.env);
  await db
    .prepare('INSERT INTO gateway_logs')
    .bind(response.id, response.provider, response.model, response.latency_ms, response.status)
    .run();

  return c.json({ success: true, response });
});

gatewayRouter.get('/telemetry', async (c) => {
  const db = getDatabase(c.env);
  const { results } = await db.prepare('SELECT * FROM gateway_logs').bind().all();
  return c.json({ success: true, count: results.length, logs: results });
});
