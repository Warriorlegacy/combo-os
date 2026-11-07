import { Hono } from 'hono';
import type { InterviewSession } from '@combo/shared-types';

export const interviewRouter = new Hono();

const mockSessions: InterviewSession[] = [
  {
    id: 'int-1',
    role_target: 'Senior Generative AI & Systems Engineer',
    question: 'How do you prevent hallucinations in high-stakes customer-facing LLM deployments?',
    user_answer_transcript: 'We implemented strict retrieval-augmented generation with verified document citations, an automated confidence refusal gate below 0.65 similarity, and an offline golden benchmark test set measuring groundedness and refusal accuracy continuously.',
    score_communication: 94,
    score_technical: 96,
    score_star_structure: 90,
    specific_feedback: 'Excellent use of concrete metrics (0.65 threshold) and clear explanation of refusal gating. Structured STAR response.',
    created_at: new Date().toISOString()
  }
];

interviewRouter.get('/sessions', (c) => {
  return c.json({ success: true, count: mockSessions.length, sessions: mockSessions });
});

interviewRouter.post('/score', async (c) => {
  const body = await c.req.json();
  const transcript = body.user_answer_transcript || '';

  // Evaluate candidate answer based on technical keywords and STAR structure
  const wordCount = transcript.trim().split(/\s+/).length;
  const hasMetrics = /\d+%|\d+ms|\d+/.test(transcript);
  const hasKeywords = /rag|grounded|eval|latency|cloudflare|edge/i.test(transcript);

  const scoreComm = Math.min(98, 70 + (wordCount > 20 ? 15 : 5));
  const scoreTech = Math.min(99, 72 + (hasKeywords ? 18 : 5) + (hasMetrics ? 8 : 0));
  const scoreStar = Math.min(95, 75 + (hasMetrics ? 15 : 5));

  const session: InterviewSession = {
    id: `int-${Date.now()}`,
    role_target: body.role_target || 'AI Engineer',
    question: body.question || 'Explain your experience with edge systems.',
    user_answer_transcript: transcript,
    score_communication: scoreComm,
    score_technical: scoreTech,
    score_star_structure: scoreStar,
    specific_feedback: hasMetrics 
      ? 'Strong quantifiable impact cited. Clear communication style.'
      : 'Good theoretical response, but consider adding specific numbers and metrics from your past projects.',
    created_at: new Date().toISOString()
  };

  mockSessions.unshift(session);
  return c.json({ success: true, session });
});

