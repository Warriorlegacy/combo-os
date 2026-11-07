import { Hono } from 'hono';
import type { MeetingNote } from '@combo/shared-types';

export const meetingsRouter = new Hono();

const mockMeetings: MeetingNote[] = [
  {
    id: 'meet-1',
    title: 'Signhify Studio Q4 Architecture & Client Onboarding',
    date: '2026-11-06',
    attendees: ['Piyush Raj Singh', 'Marcus Vance (Apex)', 'Elena Rostova'],
    summary: 'Aligned on migrating client web assets from legacy AWS infrastructure to Cloudflare Pages & Workers to eliminate egress and server fees.',
    decisions: [
      'Approved migration to Cloudflare D1 for all client CMS data.',
      'Enforced human approval gate on all automated outbound marketing workflows.'
    ],
    action_items: [
      { id: 'act-1', task: 'Seed 504 directory tools into D1', assignee: 'Piyush', due_date: '2026-11-08', completed: true },
      { id: 'act-2', task: 'Connect FreeLLMAPI custom endpoint to AI Gateway', assignee: 'Piyush', due_date: '2026-11-08', completed: true }
    ],
    crm_synced: true,
    created_at: new Date().toISOString()
  }
];

meetingsRouter.get('/', (c) => {
  return c.json({ success: true, count: mockMeetings.length, meetings: mockMeetings });
});

meetingsRouter.post('/extract', async (c) => {
  const body = await c.req.json();
  const transcript = body.transcript || '';

  // Extract structured decisions and action items
  const extracted: MeetingNote = {
    id: `meet-${Date.now()}`,
    title: body.title || 'Client Strategy Session',
    date: new Date().toISOString().split('T')[0],
    attendees: ['Founder', 'Client Lead'],
    summary: transcript.slice(0, 200) + '...',
    decisions: ['Agreed on zero-dollar edge deployment model', 'Approved initial pilot scope'],
    action_items: [
      { id: `act-${Date.now()}`, task: 'Deliver staging credentials to client', assignee: 'Founder', due_date: '2026-11-10', completed: false }
    ],
    crm_synced: false,
    created_at: new Date().toISOString()
  };

  mockMeetings.unshift(extracted);
  return c.json({ success: true, meeting: extracted });
});
