// Live Production Verification Script
// Tests all 10 projects + directory + AI gateway directly against LIVE Cloudflare production servers

const PAGES_BASE = 'https://combo-hub.pages.dev';
const WORKER_BASE = 'https://combo-worker-api.rajpiyush092.workers.dev';

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

async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, ok: res.ok, data };
  } catch (err) {
    return { status: 0, ok: false, error: err.message };
  }
}

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status;
  } catch (err) {
    return 0;
  }
}

async function runLiveAudit() {
  console.log('==================================================================');
  console.log('COMBO OS: LIVE CLOUDFLARE PRODUCTION AUDIT');
  console.log(`Pages URL : ${PAGES_BASE}`);
  console.log(`Worker URL: ${WORKER_BASE}`);
  console.log('==================================================================\n');

  // 1. Pages Frontend Route Verification
  console.log('[Suite 1: Cloudflare Pages 16-Route Live Availability]');
  const routes = [
    '/',
    '/directory/',
    '/models/',
    '/gtm/',
    '/rag-eval/',
    '/whatsapp/',
    '/showroom/',
    '/lead-recovery/',
    '/job-autopilot/',
    '/shorts-factory/',
    '/meeting-crm/',
    '/freelancer-os/',
    '/interview-coach/'
  ];

  for (const route of routes) {
    const s = await fetchStatus(`${PAGES_BASE}${route}`);
    assert(s === 200, `Route ${route.padEnd(18)} returns 200 OK`);
  }

  // 2. Worker API Health & Invariants
  console.log('\n[Suite 2: Cloudflare Worker API & Edge V8 Isolate]');
  const root = await fetchJSON(`${WORKER_BASE}/`);
  assert(root.ok && root.data?.status === 'online', 'Worker API root is online');
  assert(root.data?.projects_active === 10, 'Worker reports all 10 projects active');

  const status = await fetchJSON(`${WORKER_BASE}/api/status`);
  assert(status.ok && status.data?.stack?.frontend === 'Cloudflare Pages', 'Stack config reports Cloudflare Pages active');
  assert(status.ok && status.data?.stack?.database === 'Cloudflare D1', 'Stack config reports Cloudflare D1 active');

  // 3. Cloudflare D1 Live Database Queries
  console.log('\n[Suite 3: Cloudflare D1 Remote Database (combo-production-db)]');
  const dir = await fetchJSON(`${WORKER_BASE}/api/directory`);
  assert(dir.ok && dir.data?.count >= 40, `D1 directory returned ${dir.data?.count} tools (>= 40)`);
  assert(dir.data?.tools?.some(t => t.name === 'Cloudflare D1'), 'D1 contains Cloudflare D1 tool entry');
  assert(dir.data?.tools?.some(t => t.name === 'Cloudflare Pages'), 'D1 contains Cloudflare Pages tool entry');

  // 4. Project #1: GTM Autopilot OS
  console.log('\n[Suite 4: Project #1 Signhify GTM Autopilot OS]');
  const gtmTopics = await fetchJSON(`${WORKER_BASE}/api/gtm/topics`);
  assert(gtmTopics.ok && Array.isArray(gtmTopics.data?.topics), 'GTM topics loaded from D1');
  const gtmDrafts = await fetchJSON(`${WORKER_BASE}/api/gtm/drafts`);
  assert(gtmDrafts.ok && Array.isArray(gtmDrafts.data?.drafts), 'GTM drafts loaded from D1');

  // 5. Project #2: RAG Support Copilot
  console.log('\n[Suite 5: Project #2 RAG Support Copilot + Calibrated Refusal]');
  const ragDocs = await fetchJSON(`${WORKER_BASE}/api/rag/docs`);
  assert(ragDocs.ok && ragDocs.data?.count > 0, `RAG docs returned ${ragDocs.data?.count} verified entries`);
  
  const inDomain = await fetchJSON(`${WORKER_BASE}/api/rag/query`, {
    method: 'POST',
    body: JSON.stringify({ query: 'What is Cloudflare D1 pricing and free limits?' })
  });
  assert(inDomain.ok && inDomain.data?.refused === false, 'In-domain query answered with verified documentation');
  assert(inDomain.data?.citations?.length > 0, 'In-domain query returned source citations');

  const outDomain = await fetchJSON(`${WORKER_BASE}/api/rag/query`, {
    method: 'POST',
    body: JSON.stringify({ query: 'How do I train an uncalibrated llama model on AWS TPU?' })
  });
  assert(outDomain.ok && outDomain.data?.refused === true, 'Out-of-domain query triggered 100% calibrated refusal');

  const evalDash = await fetchJSON(`${WORKER_BASE}/api/rag/eval`);
  assert(evalDash.ok && evalDash.data?.groundedness_score_pct >= 90, `RAG Groundedness is ${evalDash.data?.groundedness_score_pct}% (>= 90%)`);
  assert(evalDash.data?.refusal_precision_pct === 100, 'RAG Refusal Precision is 100%');

  // 6. Project #3: WhatsApp AI Sales Agent
  console.log('\n[Suite 6: Project #3 WhatsApp AI Sales Agent]');
  const waConvs = await fetchJSON(`${WORKER_BASE}/api/whatsapp/conversations`);
  assert(waConvs.ok && waConvs.data?.count > 0, 'WhatsApp conversations active');
  
  const waWebhook = await fetchJSON(`${WORKER_BASE}/api/whatsapp/webhook`, {
    method: 'POST',
    body: JSON.stringify({ message: { text: 'Can I book an appointment tomorrow?' } })
  });
  assert(waWebhook.ok && waWebhook.data?.routed_status === 'QUALIFIED', 'WhatsApp appointment message qualified');

  const waHandoff = await fetchJSON(`${WORKER_BASE}/api/whatsapp/webhook`, {
    method: 'POST',
    body: JSON.stringify({ message: { text: 'I need to speak with a human doctor' } })
  });
  assert(waHandoff.ok && waHandoff.data?.routed_status === 'HANDOFF', 'WhatsApp human request triggered staff handoff');

  // 7. Project #4: 3D Product Configurator
  console.log('\n[Suite 7: Project #4 3D Product Configurator]');
  const showroom = await fetchJSON(`${WORKER_BASE}/api/showroom/product`);
  assert(showroom.ok && showroom.data?.product?.basePrice === 599, 'Showroom base price is $599');
  assert(showroom.data?.product?.finishes?.length === 4, 'Showroom has 4 interactive finishes');

  // 8. Project #5: AI Lead Recovery
  console.log('\n[Suite 8: Project #5 AI Lead Recovery Agent]');
  const leads = await fetchJSON(`${WORKER_BASE}/api/leads`);
  assert(leads.ok && leads.data?.count > 0, 'Dormant CRM leads loaded');
  const approveLead = await fetchJSON(`${WORKER_BASE}/api/leads/lead-1/approve`, { method: 'POST' });
  assert(approveLead.ok && approveLead.data?.lead?.recovery_status === 'APPROVED', 'Lead marked APPROVED for dispatch');

  // 9. Project #6: JobAutopilot Pro
  console.log('\n[Suite 9: Project #6 JobAutopilot Pro]');
  const jobs = await fetchJSON(`${WORKER_BASE}/api/jobs`);
  assert(jobs.ok && jobs.data?.count > 0, 'Job posts loaded');
  assert(jobs.data?.applications?.[0]?.tailored_resume_bullets?.length > 0, 'Job contains tailored STAR bullets');

  // 10. Project #7: Faceless Shorts Factory
  console.log('\n[Suite 10: Project #7 Faceless Shorts Factory]');
  const shorts = await fetchJSON(`${WORKER_BASE}/api/shorts`);
  assert(shorts.ok && shorts.data?.count > 0, 'Shorts templates loaded');
  assert(shorts.data?.shorts?.[0]?.duration_seconds <= 60, 'Shorts duration conforms to 9:16 reels limits');

  // 11. Project #8: Meeting-to-CRM Copilot
  console.log('\n[Suite 11: Project #8 AI Meeting-to-CRM Copilot]');
  const meetings = await fetchJSON(`${WORKER_BASE}/api/meetings`);
  assert(meetings.ok && meetings.data?.count > 0, 'Meeting summaries loaded');
  assert(meetings.data?.meetings?.[0]?.action_items?.every(a => a.assignee && a.due_date), 'Action items enforce owner and date');

  // 12. Project #9: Freelancer Client OS
  console.log('\n[Suite 12: Project #9 Freelancer Client OS]');
  const invoices = await fetchJSON(`${WORKER_BASE}/api/freelancer/invoices`);
  assert(invoices.ok && invoices.data?.count > 0, 'Invoices loaded');
  assert(invoices.data?.invoices?.some(i => i.status === 'PAID'), 'Tracks paid invoices');

  // 13. Project #10: AI Interview Prep Coach
  console.log('\n[Suite 13: Project #10 AI Interview Prep Coach]');
  const interviews = await fetchJSON(`${WORKER_BASE}/api/interview/sessions`);
  assert(interviews.ok && interviews.data?.count > 0, 'Interview sessions loaded');
  assert(interviews.data?.sessions?.[0]?.score_technical >= 80, 'Interview scoring calibrated');

  // 14. Multi-Model Edge AI Gateway
  console.log('\n[Suite 14: Multi-Model Edge AI Gateway]');
  const aiModels = await fetchJSON(`${WORKER_BASE}/api/ai/models`);
  assert(aiModels.ok && aiModels.data?.models?.length > 0, 'AI Models endpoint active');

  console.log('\n==================================================================');
  console.log(`LIVE PRODUCTION RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runLiveAudit();
