// Automated Integration Test Suite for Combo OS Edge Worker API
// Runs directly with Node.js standard library (Zero external test runner dependencies needed)

import app from '../apps/worker-api/src/index.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

async function request(path, options = {}) {
  const url = `http://localhost${path}`;
  const req = new Request(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const res = await app.fetch(req);
  const data = await res.json().catch(() => ({}));
  return { status: res.status, headers: res.headers, data };
}

async function runTests() {
  console.log('\n======================================================');
  console.log('Combo OS: Automated Edge API & Invariant Test Suite');
  console.log('======================================================\n');

  // --- Suite 1: System Health & Telemetry ---
  console.log('[Suite 1: System Health & Telemetry]');
  {
    const res = await request('/');
    assert(res.status === 200, 'Root endpoint returns 200 OK');
    assert(res.data.status === 'online', 'Status is online');
    assert(res.data.edge === 'Cloudflare Workers (V8 Isolate)', 'Edge platform matches Cloudflare');
  }
  {
    const res = await request('/api/health');
    assert(res.status === 200, 'Health check returns 200 OK');
    assert(res.data.status === 'healthy', 'Health payload status is healthy');
  }
  {
    const res = await request('/api/status');
    assert(res.status === 200, 'Status check returns 200 OK');
    assert(res.data.stack.frontend === 'Cloudflare Pages', 'Stack config includes Cloudflare Pages');
    assert(res.data.stack.database === 'Cloudflare D1', 'Stack config includes Cloudflare D1');
    assert(res.data.metrics.total_tools >= 10, 'Curated tools count is greater than 10');
  }

  // --- Suite 2: Curated Free-Stack Directory ---
  console.log('\n[Suite 2: Curated Free-Stack Directory]');
  {
    const res = await request('/api/directory');
    assert(res.status === 200, 'Directory list returns 200 OK');
    assert(Array.isArray(res.data.tools) && res.data.tools.length > 0, 'Directory returns list of tools');
    
    // Check specific free stack core tools
    const toolNames = res.data.tools.map(t => t.name);
    assert(toolNames.includes('Cloudflare Pages'), 'Directory contains Cloudflare Pages');
    assert(toolNames.includes('Cloudflare D1'), 'Directory contains Cloudflare D1');
    assert(toolNames.includes('Groq Cloud'), 'Directory contains Groq Cloud');
  }
  {
    const res = await request('/api/directory?category=Compute');
    assert(res.status === 200, 'Category filter returns 200 OK');
    assert(res.data.tools.every(t => t.category.toLowerCase() === 'compute'), 'All filtered tools have Compute category');
  }
  {
    const res = await request('/api/directory?q=cloudflare');
    assert(res.status === 200, 'Search filter returns 200 OK');
    assert(res.data.tools.length >= 3, 'Search finds multiple Cloudflare tools');
  }
  {
    const res = await request('/api/directory/categories');
    assert(res.status === 200, 'Categories endpoint returns 200 OK');
    assert(Array.isArray(res.data.categories) && res.data.categories.length > 3, 'Returns category breakdown');
  }

  // --- Suite 3: Signhify GTM Autopilot & Human Approval Gate ---
  console.log('\n[Suite 3: Signhify GTM Autopilot & Human Approval Gate]');
  let testDraftId = '';
  {
    const res = await request('/api/gtm/topics');
    assert(res.status === 200, 'GTM Topics returns 200 OK');
    assert(res.data.topics.length >= 1, 'Contains pre-seeded high-yield topics');
  }
  {
    const res = await request('/api/gtm/drafts', {
      method: 'POST',
      body: {
        topic_id: 'top-1',
        channel: 'linkedin',
        content: 'Test automated draft requiring strict human review before publication.',
        citations: ['https://pages.cloudflare.com']
      }
    });
    assert(res.status === 201, 'Create draft returns 201 Created');
    assert(res.data.draft.approval_status === 'UNDER_REVIEW', 'Draft enters UNDER_REVIEW approval gate');
    testDraftId = res.data.draft.id;
  }
  {
    // Approve Draft
    const res = await request(`/api/gtm/drafts/${testDraftId}/approve`, {
      method: 'POST',
      body: { approved_by: 'Piyush Raj Singh (Lead)' }
    });
    assert(res.status === 200, 'Approve draft returns 200 OK');
    assert(res.data.approval_status === 'APPROVED', 'Approval gate marks draft APPROVED');
    assert(res.data.approved_by.includes('Piyush Raj Singh'), 'Approval records author identity');
  }
  {
    // Reject Gate
    const res = await request('/api/gtm/drafts', {
      method: 'POST',
      body: {
        topic_id: 'top-2',
        channel: 'x',
        content: 'Unverified claim to test rejection.',
        citations: []
      }
    });
    const rejectDraftId = res.data.draft.id;
    const rejRes = await request(`/api/gtm/drafts/${rejectDraftId}/reject`, {
      method: 'POST',
      body: { reason: 'No source citations provided' }
    });
    assert(rejRes.status === 200, 'Reject draft returns 200 OK');
    assert(rejRes.data.approval_status === 'REJECTED', 'Approval gate marks draft REJECTED');
  }

  // --- Suite 4: RAG Support Copilot & Live Eval Dashboard ---
  console.log('\n[Suite 4: RAG Support Copilot & Live Eval Dashboard]');
  {
    const res = await request('/api/rag/docs');
    assert(res.status === 200, 'RAG docs list returns 200 OK');
    assert(res.data.documents.length >= 2, 'Knowledge documents loaded');
  }
  {
    // Grounded Query
    const res = await request('/api/rag/query', {
      method: 'POST',
      body: { query: 'What are the daily request limits on the Cloudflare Workers free tier?' }
    });
    assert(res.status === 200, 'Grounded query returns 200 OK');
    assert(!res.data.refused, 'Grounded query is NOT refused');
    assert(res.data.citations.length > 0, 'Grounded query provides verified citations');
    assert(res.data.confidence >= 0.7, 'Grounded query confidence is high');
  }
  {
    // Out-of-Domain Refusal Trick Query
    const res = await request('/api/rag/query', {
      method: 'POST',
      body: { query: 'Give me the recipe for french onion soup and apple stock predictions' }
    });
    assert(res.status === 200, 'Out-of-domain query returns 200 OK');
    assert(res.data.refused === true, 'Out-of-domain query triggers strict REFUSAL gate');
    assert(res.data.citations.length === 0, 'Refused query yields 0 citations');
  }
  {
    // Live Eval Benchmark Dashboard
    const res = await request('/api/rag/eval');
    assert(res.status === 200, 'RAG Eval benchmark returns 200 OK');
    assert(res.data.groundedness_score_pct >= 90, 'Groundedness score is >= 90%');
    assert(res.data.refusal_precision_pct === 100, 'Refusal precision is 100%');
    assert(res.data.evaluation_status === 'PASS', 'Overall evaluation status is PASS');
  }

  // --- Suite 5: Multi-Model Edge Gateway ---
  console.log('\n[Suite 5: Multi-Model Edge Gateway]');
  {
    const res = await request('/api/ai/models');
    assert(res.status === 200, 'Models list returns 200 OK');
    assert(res.data.models.some(m => m.name.includes('DeepSeek R1')), 'Includes DeepSeek R1 Distill Qwen');
    assert(res.data.models.some(m => m.name.includes('Llama 3.3')), 'Includes Llama 3.3 70B');
  }
  {
    const res = await request('/api/ai/complete', {
      method: 'POST',
      body: {
        model: '@cf/meta/llama-3.3-70b-instruct',
        messages: [{ role: 'user', content: 'Explain Cloudflare Pages free tier' }]
      }
    });
    assert(res.status === 200, 'Gateway complete returns 200 OK');
    assert(Boolean(res.data.response.content), 'Gateway response contains generated content');
    assert(res.data.response.latency_ms > 0, 'Gateway tracks latency');
  }
  {
    const res = await request('/api/ai/telemetry');
    assert(res.status === 200, 'Telemetry endpoint returns 200 OK');
    assert(res.data.logs.length > 0, 'Telemetry logs are recorded');
  }

  console.log('\n======================================================');
  console.log(`Summary: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
