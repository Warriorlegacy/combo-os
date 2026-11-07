import { Hono } from 'hono';
import { getDatabase } from '../db/db-client.ts';
import type { WhatsAppConversation, WhatsAppLead } from '@combo/shared-types';

export const whatsappRouter = new Hono<{ Bindings: { COMBO_DB?: any } }>();

const mockConversations: WhatsAppConversation[] = [
  {
    id: 'wa-conv-1',
    phone_number: '+919876543210',
    sender_name: 'Dr. Mehta Clinic Patient',
    last_message: 'Hi, what is the consultation fee for root canal treatment?',
    status: 'QUALIFIED',
    office_hours_only: false,
    updated_at: new Date().toISOString()
  },
  {
    id: 'wa-conv-2',
    phone_number: '+919812345678',
    sender_name: 'Real Estate Buyer (South Delhi)',
    last_message: 'Can I speak with a human agent about 3BHK flats?',
    status: 'HANDOFF',
    office_hours_only: false,
    updated_at: new Date(Date.now() - 3600000).toISOString()
  }
];

const mockLeads: WhatsAppLead[] = [
  {
    id: 'wa-lead-1',
    conversation_id: 'wa-conv-1',
    name: 'Ananya Sharma',
    phone: '+919876543210',
    service_requested: 'Root Canal & Crown',
    budget: '₹8,000 - ₹15,000',
    preferred_time: 'Tomorrow 5:00 PM',
    status: 'NEW',
    created_at: new Date().toISOString()
  }
];

// Meta Webhook Verification (GET)
whatsappRouter.get('/webhook', (c) => {
  const mode = c.req.query('hub.mode');
  const token = c.req.query('hub.verify_token');
  const challenge = c.req.query('hub.challenge');

  if (mode === 'subscribe' && token === 'signhify_free_stack_secret') {
    return c.text(challenge || 'VERIFIED');
  }
  return c.text('Forbidden', 403);
});

// Incoming Message Webhook (POST)
whatsappRouter.post('/webhook', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const incomingMsg = body.message?.text || body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || '';
  const sender = body.from || '+919876543210';

  // Rule-based qualification & human handoff check
  const isHumanHandoff = incomingMsg.toLowerCase().includes('human') || 
                         incomingMsg.toLowerCase().includes('staff') || 
                         incomingMsg.toLowerCase().includes('doctor') ||
                         incomingMsg.toLowerCase().includes('#agent');

  const isBooking = incomingMsg.toLowerCase().includes('book') || 
                    incomingMsg.toLowerCase().includes('appointment') || 
                    incomingMsg.toLowerCase().includes('price');

  let replyText = '';
  let status: 'ACTIVE' | 'QUALIFIED' | 'HANDOFF' | 'BOOKED' = 'ACTIVE';

  if (isHumanHandoff) {
    status = 'HANDOFF';
    replyText = 'Understood! I have notified our on-call coordinator. A team member will join this chat in less than 5 minutes.';
  } else if (isBooking) {
    status = 'QUALIFIED';
    replyText = 'Thank you for inquiring! Our consultation fee is ₹500, and procedures start at ₹2,500. What day and time work best for you?';
  } else {
    replyText = 'Hello! Welcome to our automated care line. Reply with your preferred service, budget, or text #agent to speak directly with staff.';
  }

  return c.json({
    success: true,
    routed_status: status,
    reply: replyText,
    sender,
    timestamp: new Date().toISOString()
  });
});

// Admin API
whatsappRouter.get('/conversations', (c) => {
  return c.json({ success: true, count: mockConversations.length, conversations: mockConversations });
});

whatsappRouter.get('/leads', (c) => {
  return c.json({ success: true, count: mockLeads.length, leads: mockLeads });
});
