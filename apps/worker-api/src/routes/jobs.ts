import { Hono } from 'hono';
import type { JobApplication, ApplicationStatus } from '@combo/shared-types';

export const jobsRouter = new Hono();

const mockJobs: JobApplication[] = [
  {
    id: 'job-1',
    role_title: 'Staff Generative AI Engineer',
    company: 'Anthropic AI Partner Studio',
    match_score: 96,
    status: 'INTERVIEW',
    tailored_resume_bullets: [
      'Architected full-stack AI edge pipelines across Cloudflare Pages, Workers, and D1 supporting 100K daily requests at $0 cloud cost.',
      'Designed grounded RAG evaluation suite achieving 98% citation accuracy and 100% refusal precision on out-of-domain queries.',
      'Engineered multi-model LLM router with automatic sub-50ms fallback across Workers AI, Groq LPU, and Google Gemini.'
    ],
    salary_range: '$140,000 - $180,000',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-2',
    role_title: 'Senior Full-Stack & 3D WebGL Developer',
    company: 'HyperSpace Commerce',
    match_score: 91,
    status: 'APPLIED',
    tailored_resume_bullets: [
      'Built 60 FPS Three.js product configurator with dynamic material shader switching and live price recalculation.',
      'Optimized glTF asset delivery using Draco compression to enforce a strict sub-8MB initial scene budget.'
    ],
    salary_range: '$130,000 - $160,000',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

jobsRouter.get('/', (c) => {
  return c.json({ success: true, count: mockJobs.length, applications: mockJobs });
});

jobsRouter.post('/:id/status', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const job = mockJobs.find(j => j.id === id);
  if (!job) return c.json({ success: false, error: 'Job application not found' }, 404);

  job.status = body.status as ApplicationStatus;
  return c.json({ success: true, job });
});
