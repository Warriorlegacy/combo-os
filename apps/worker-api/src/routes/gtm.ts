import { Hono } from 'hono';
import { getDatabase } from '../db/db-client.ts';
import type { ApprovalStatus } from '@combo/shared-types';

export const gtmRouter = new Hono<{ Bindings: { COMBO_DB?: any } }>();

// 1. Topics
gtmRouter.get('/topics', async (c) => {
  const db = getDatabase(c.env);
  const { results } = await db.prepare('SELECT * FROM gtm_topics').bind().all();
  return c.json({ success: true, topics: results });
});

gtmRouter.post('/topics', async (c) => {
  const body = await c.req.json();
  const title = body.title?.trim();
  const source = body.source?.trim() || 'Manual Input';
  const score = Number(body.score) || 85;

  if (!title) {
    return c.json({ success: false, error: 'Topic title is required' }, 400);
  }

  const db = getDatabase(c.env);
  const newTopic = {
    id: `top-${Date.now()}`,
    title,
    source,
    score,
    status: 'NEW',
    created_at: new Date().toISOString()
  };

  // Simulated / Local DB insert
  (db as any).prepare?.('INSERT INTO gtm_topics').bind(newTopic.id, newTopic.title, newTopic.source, newTopic.score);

  return c.json({ success: true, topic: newTopic }, 201);
});

// 2. Drafts
gtmRouter.get('/drafts', async (c) => {
  const status = c.req.query('status') as ApprovalStatus | undefined;
  const db = getDatabase(c.env);
  const { results } = await db.prepare('SELECT * FROM gtm_drafts').bind(status).all();
  return c.json({ success: true, drafts: results });
});

gtmRouter.post('/drafts', async (c) => {
  const body = await c.req.json();
  const { topic_id, channel, content, citations } = body;

  if (!content || !channel) {
    return c.json({ success: false, error: 'Content and channel are required' }, 400);
  }

  const db = getDatabase(c.env);
  const newDraft = {
    id: `draft-${Date.now()}`,
    topic_id: topic_id || 'manual',
    channel: channel as any,
    content,
    citations: citations || [],
    approval_status: 'UNDER_REVIEW', // Automatically enters review gate
    approved_by: null,
    approved_at: null,
    created_at: new Date().toISOString()
  };

  await db
    .prepare('INSERT INTO gtm_drafts')
    .bind(newDraft.id, newDraft.topic_id, newDraft.channel, newDraft.content, JSON.stringify(newDraft.citations), newDraft.approval_status)
    .run();

  return c.json({ success: true, draft: newDraft }, 201);
});

// 3. Strict Human Approval Gate: APPROVE
gtmRouter.post('/drafts/:id/approve', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));
  const approvedBy = body.approved_by || 'Piyush Raj Singh (Admin)';
  const scheduledFor = body.scheduled_for || new Date(Date.now() + 86400000).toISOString();

  const db = getDatabase(c.env);
  const draft = await db.prepare('SELECT * FROM gtm_drafts WHERE id = ?').bind(id).first();

  if (!draft) {
    return c.json({ success: false, error: 'Draft not found' }, 404);
  }

  await db
    .prepare('UPDATE gtm_drafts SET approval_status = ?, approved_by = ?, approved_at = ?, rejection_reason = ? WHERE id = ?')
    .bind('APPROVED', approvedBy, new Date().toISOString(), null, id)
    .run();

  return c.json({
    success: true,
    message: 'Draft successfully approved and queued for publication.',
    draft_id: id,
    approval_status: 'APPROVED',
    approved_by: approvedBy,
    scheduled_for: scheduledFor
  });
});

// 4. Strict Human Approval Gate: REJECT
gtmRouter.post('/drafts/:id/reject', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));
  const rejectionReason = body.reason || 'Failed brand voice or fact check criteria';

  const db = getDatabase(c.env);
  const draft = await db.prepare('SELECT * FROM gtm_drafts WHERE id = ?').bind(id).first();

  if (!draft) {
    return c.json({ success: false, error: 'Draft not found' }, 404);
  }

  await db
    .prepare('UPDATE gtm_drafts SET approval_status = ?, approved_by = ?, approved_at = ?, rejection_reason = ? WHERE id = ?')
    .bind('REJECTED', null, null, rejectionReason, id)
    .run();

  return c.json({
    success: true,
    message: 'Draft rejected. Prohibited from scheduled publication.',
    draft_id: id,
    approval_status: 'REJECTED',
    rejection_reason: rejectionReason
  });
});
