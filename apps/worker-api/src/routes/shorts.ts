import { Hono } from 'hono';
import type { VideoShort } from '@combo/shared-types';

export const shortsRouter = new Hono();

const mockShorts: VideoShort[] = [
  {
    id: 'short-1',
    topic: 'How to Host Full-Stack Next.js for $0 Forever',
    hook: 'Stop burning $150 a month on cloud bills before you even have your first customer.',
    script_body: `Here is the exact zero-dollar tech stack top AI engineers use:
First, compile your frontend to Cloudflare Pages for unlimited bandwidth and zero egress fees.
Second, run your API on Cloudflare Workers with 100,000 daily requests.
Third, store your database in Cloudflare D1 with 5 million daily reads.
Fourth, use Groq and Cloudflare Workers AI for 500 tokens-per-second free inference.`,
    call_to_action: 'Drop a comment below and I will send you the complete GitHub template for free.',
    duration_seconds: 38,
    status: 'AUDIO_READY',
    created_at: new Date().toISOString()
  }
];

shortsRouter.get('/', (c) => {
  return c.json({ success: true, count: mockShorts.length, shorts: mockShorts });
});

shortsRouter.post('/', async (c) => {
  const body = await c.req.json();
  const newShort: VideoShort = {
    id: `short-${Date.now()}`,
    topic: body.topic || 'Untitled Video',
    hook: body.hook || 'Wait, did you know this?',
    script_body: body.script_body || '',
    call_to_action: body.call_to_action || 'Follow for more!',
    duration_seconds: Number(body.duration_seconds) || 35,
    status: 'DRAFT',
    created_at: new Date().toISOString()
  };
  mockShorts.unshift(newShort);
  return c.json({ success: true, short: newShort }, 201);
});
