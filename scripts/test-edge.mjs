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
  console.log('Combo OS: Automated Edge API & 10-Project Test Suite');
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

  // --- Suite 3: Project #1 Signhify GTM Autopilot & Human Approval Gate ---
  console.log('\n[Suite 3: Project #1 Signhify GTM Autopilot & Human Approval Gate]');
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
    const res = await request(`/api/gtm/drafts/${testDraftId}/approve`, {
      method: 'POST',
      body: { approved_by: 'Piyush Raj Singh (Lead)' }
    });
    assert(res.status === 200, 'Approve draft returns 200 OK');
    assert(res.data.approval_status === 'APPROVED', 'Approval gate marks draft APPROVED');
    assert(res.data.approved_by.includes('Piyush Raj Singh'), 'Approval records author identity');
  }

  // --- Suite 4: Project #2 RAG Support Copilot & Live Eval Dashboard ---
  console.log('\n[Suite 4: Project #2 RAG Support Copilot & Live Eval Dashboard]');
  {
    const res = await request('/api/rag/docs');
    assert(res.status === 200, 'RAG docs list returns 200 OK');
    assert(res.data.documents.length >= 2, 'Knowledge documents loaded');
  }
  {
    const res = await request('/api/rag/query', {
      method: 'POST',
      body: { query: 'What are the daily request limits on the Cloudflare Workers free tier?' }
    });
    assert(res.status === 200, 'Grounded query returns 200 OK');
    assert(!res.data.refused, 'Grounded query is NOT refused');
    assert(res.data.citations.length > 0, 'Grounded query provides verified citations');
  }
  {
    const res = await request('/api/rag/query', {
      method: 'POST',
      body: { query: 'Give me the recipe for french onion soup and apple stock predictions' }
    });
    assert(res.status === 200, 'Out-of-domain query returns 200 OK');
    assert(res.data.refused === true, 'Out-of-domain query triggers strict REFUSAL gate');
  }
  {
    const res = await request('/api/rag/eval');
    assert(res.status === 200, 'RAG Eval benchmark returns 200 OK');
    assert(res.data.groundedness_score_pct >= 90, 'Groundedness score is >= 90%');
    assert(res.data.refusal_precision_pct === 100, 'Refusal precision is 100%');
  }

  // --- Suite 5: Project #3 WhatsApp AI Sales & Support Agent ---
  console.log('\n[Suite 5: Project #3 WhatsApp AI Sales & Support Agent]');
  {
    const res = await request('/api/whatsapp/conversations');
    assert(res.status === 200, 'WhatsApp conversations list returns 200 OK');
    assert(res.data.count >= 1, 'Contains active WhatsApp inquiries');
  }
  {
    const res = await request('/api/whatsapp/webhook', {
      method: 'POST',
      body: { message: { text: 'Hi, I need an appointment tomorrow afternoon' } }
    });
    assert(res.status === 200, 'WhatsApp inbound message webhook returns 200 OK');
    assert(res.data.routed_status === 'QUALIFIED', 'Appointment intent qualifies lead');
  }
  {
    const res = await request('/api/whatsapp/webhook', {
      method: 'POST',
      body: { message: { text: 'Can I speak with staff or doctor directly?' } }
    });
    assert(res.status === 200, 'WhatsApp human request returns 200 OK');
    assert(res.data.routed_status === 'HANDOFF', 'Triggers human staff handoff');
  }

  // --- Suite 6: Project #4 3D Product Configurator ---
  console.log('\n[Suite 6: Project #4 3D Product Configurator]');
  {
    const res = await request('/api/showroom/product');
    assert(res.status === 200, 'Showroom product returns 200 OK');
    assert(res.data.product.finishes.length >= 3, 'Product has multiple material finishes');
    assert(res.data.product.basePrice === 599, 'Hero product base price is $599');
  }
  {
    const res = await request('/api/showroom/enquiries', {
      method: 'POST',
      body: {
        product_id: 'chair-aero-01',
        variant_finish: 'walnut-wood',
        calculated_price: 719,
        customer_name: 'David Sterling',
        customer_email: 'david@vanguardrealty.co'
      }
    });
    assert(res.status === 201, 'Showroom enquiry submission returns 201 Created');
    assert(res.data.enquiry.calculated_price === 719, 'Enquiry records configured finish price');
  }

  // --- Suite 7: Project #5 AI Lead Recovery Agent ---
  console.log('\n[Suite 7: Project #5 AI Lead Recovery Agent]');
  {
    const res = await request('/api/leads');
    assert(res.status === 200, 'Leads list returns 200 OK');
    assert(res.data.leads.length >= 2, 'Stale CRM leads loaded');
  }
  {
    const res = await request('/api/leads/lead-1/approve', { method: 'POST' });
    assert(res.status === 200, 'Approve lead follow-up returns 200 OK');
    assert(res.data.lead.recovery_status === 'APPROVED', 'Lead marked APPROVED for dispatch');
  }

  // --- Suite 8: Project #6 JobAutopilot Pro ---
  console.log('\n[Suite 8: Project #6 JobAutopilot Pro]');
  {
    const res = await request('/api/jobs');
    assert(res.status === 200, 'Jobs list returns 200 OK');
    assert(res.data.applications[0].tailored_resume_bullets.length >= 2, 'Contains tailored resume bullets');
  }
  {
    const res = await request('/api/jobs/job-1/status', {
      method: 'POST',
      body: { status: 'OFFER' }
    });
    assert(res.status === 200, 'Job status update returns 200 OK');
    assert(res.data.job.status === 'OFFER', 'Application status moved to OFFER');
  }

  // --- Suite 9: Project #7 Faceless Shorts Factory ---
  console.log('\n[Suite 9: Project #7 Faceless Shorts Factory]');
  {
    const res = await request('/api/shorts');
    assert(res.status === 200, 'Shorts list returns 200 OK');
    assert(res.data.shorts[0].duration_seconds <= 60, 'Duration is within vertical shorts limit');
  }

  // --- Suite 10: Project #8 AI Meeting-to-CRM Copilot ---
  console.log('\n[Suite 10: Project #8 AI Meeting-to-CRM Copilot]');
  {
    const res = await request('/api/meetings');
    assert(res.status === 200, 'Meetings list returns 200 OK');
    assert(res.data.meetings[0].decisions.length >= 2, 'Structured decisions loaded');
    assert(res.data.meetings[0].action_items.length >= 2, 'Action items with owners loaded');
  }

  // --- Suite 11: Project #9 Freelancer Client OS ---
  console.log('\n[Suite 11: Project #9 Freelancer Client OS]');
  {
    const res = await request('/api/freelancer/invoices');
    assert(res.status === 200, 'Invoices list returns 200 OK');
    assert(res.data.invoices.some(i => i.status === 'PAID'), 'Tracks paid client invoices');
  }

  // --- Suite 12: Project #10 AI Interview Prep Coach ---
  console.log('\n[Suite 12: Project #10 AI Interview Prep Coach]');
  {
    const res = await request('/api/interview/sessions');
    assert(res.status === 200, 'Interview sessions list returns 200 OK');
    assert(res.data.sessions[0].score_technical >= 90, 'Technical scoring recorded');
  }
  {
    const res = await request('/api/interview/score', {
      method: 'POST',
      body: {
        role_target: 'Senior GenAI Engineer',
        question: 'Explain your experience with Cloudflare Workers',
        user_answer_transcript: 'We built an edge gateway with Cloudflare Workers that reduced latency to 38ms and served 100K requests at $0 cost.'
      }
    });
    assert(res.status === 200, 'Interview score endpoint returns 200 OK');
    assert(res.data.session.score_technical >= 80, 'Evaluates metric-driven response');
  }

  // --- Suite 13: FreeLLMAPI Custom Endpoint & Multi-Model Gateway ---
  console.log('\n[Suite 13: FreeLLMAPI Custom Endpoint & Multi-Model Gateway]');
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
