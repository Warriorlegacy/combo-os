import { Hono } from 'hono';
import { getDatabase } from '../db/db-client.ts';
import type { DeadLead } from '@combo/shared-types';

export const leadsRouter = new Hono<{ Bindings: { COMBO_DB?: any } }>();

const mockLeads: DeadLead[] = [
  {
    id: 'lead-1',
    company_name: 'Apex Digital Studio',
    contact_name: 'Marcus Vance',
    email: 'marcus@apexdigital.io',
    days_inactive: 48,
    intent_score: 84,
    recovery_status: 'DRAFTED',
    drafted_followup: `Hey Marcus,\n\nSaw Apex just expanded its client roster in Q4. When we spoke in September, you mentioned high AWS hosting and API costs eating 18% of margin.\n\nWe just open-sourced our $0 Cloudflare architecture that dropped client infra bills to $0/mo with sub-20ms latency. Thought you might want the benchmark breakdown. Want me to send the 3-minute deck?`,
    created_at: new Date(Date.now() - 48 * 86400000).toISOString()
  },
  {
    id: 'lead-2',
    company_name: 'Crestline Dental Care',
    contact_name: 'Dr. Sarah Lin',
    email: 'dr.lin@crestlinedental.com',
    days_inactive: 72,
    intent_score: 62,
    recovery_status: 'STALE',
    created_at: new Date(Date.now() - 72 * 86400000).toISOString()
  }
];

leadsRouter.get('/', (c) => {
  return c.json({ success: true, count: mockLeads.length, leads: mockLeads });
});

// Approve outreach draft (Human Gate)
leadsRouter.post('/:id/approve', (c) => {
  const id = c.req.param('id');
  const lead = mockLeads.find(l => l.id === id);
  if (!lead) return c.json({ success: false, error: 'Lead not found' }, 404);

  lead.recovery_status = 'APPROVED';
  return c.json({ success: true, lead, message: 'Lead outreach approved for dispatch.' });
});

