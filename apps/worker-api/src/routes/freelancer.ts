import { Hono } from 'hono';
import type { FreelancerInvoice } from '@combo/shared-types';

export const freelancerRouter = new Hono();

const mockInvoices: FreelancerInvoice[] = [
  {
    id: 'inv-2026-001',
    client_name: 'Apex Digital Studio',
    project_title: 'Cloudflare Pages & Workers $0 Migration',
    amount_cents: 185000, // $1,850.00
    currency: 'USD',
    status: 'PAID',
    due_date: '2026-11-05',
    created_at: '2026-10-28T10:00:00Z'
  },
  {
    id: 'inv-2026-002',
    client_name: 'Crestline Dental Clinic',
    project_title: 'WhatsApp AI Booking Agent Setup',
    amount_cents: 65000, // $650.00
    currency: 'USD',
    status: 'SENT',
    due_date: '2026-11-15',
    created_at: '2026-11-06T14:00:00Z'
  }
];

freelancerRouter.get('/invoices', (c) => {
  return c.json({ success: true, count: mockInvoices.length, invoices: mockInvoices });
});

freelancerRouter.post('/invoices', async (c) => {
  const body = await c.req.json();
  const newInvoice: FreelancerInvoice = {
    id: `inv-${Date.now()}`,
    client_name: body.client_name || 'Client',
    project_title: body.project_title || 'Software Development Service',
    amount_cents: Number(body.amount_cents) || 50000,
    currency: body.currency || 'USD',
    status: 'SENT',
    due_date: body.due_date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };
  mockInvoices.unshift(newInvoice);
  return c.json({ success: true, invoice: newInvoice }, 201);
});

freelancerRouter.post('/invoices/:id/send', async (c) => {
  const id = c.req.param('id');
  const invoice = mockInvoices.find(inv => inv.id === id);
  if (!invoice) return c.json({ success: false, error: 'Invoice not found' }, 404);

  invoice.status = 'SENT';
  return c.json({
    success: true,
    message: `Invoice ${id} dispatched to ${invoice.client_name}.`,
    invoice,
    portal_link: `https://combo-hub.pages.dev/freelancer-os?inv=${id}`
  });
});

