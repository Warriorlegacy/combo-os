-- Cloudflare D1 (SQLite) Schema for Combo OS

-- 1. Curated Free-Stack & Developer Tools Directory
CREATE TABLE IF NOT EXISTS directory_tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  free_tier TEXT NOT NULL,
  commercial_ok INTEGER NOT NULL DEFAULT 1,
  cc_required INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  unslop_score INTEGER NOT NULL DEFAULT 9,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. GTM Autopilot Topics & Content Drafts
CREATE TABLE IF NOT EXISTS gtm_topics (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gtm_drafts (
  id TEXT PRIMARY KEY,
  topic_id TEXT REFERENCES gtm_topics(id),
  channel TEXT NOT NULL, -- 'linkedin', 'x', 'blog', 'newsletter'
  content TEXT NOT NULL,
  citations TEXT NOT NULL, -- JSON string array
  approval_status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'
  approved_by TEXT,
  approved_at TIMESTAMP,
  rejection_reason TEXT,
  scheduled_for TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. RAG Support Copilot Knowledge Base & Golden Eval Benchmarks
CREATE TABLE IF NOT EXISTS rag_documents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT, -- JSON string
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rag_eval_benchmarks (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  expected_answer TEXT NOT NULL,
  is_out_of_domain INTEGER NOT NULL DEFAULT 0,
  last_groundedness_score REAL DEFAULT 0.0,
  last_citation_score REAL DEFAULT 0.0,
  last_refusal_pass INTEGER DEFAULT 1,
  last_latency_ms INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Multi-Model Edge Gateway Telemetry
CREATE TABLE IF NOT EXISTS gateway_logs (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  latency_ms INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid query performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON directory_tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON directory_tools(featured);
CREATE INDEX IF NOT EXISTS idx_drafts_status ON gtm_drafts(approval_status);
CREATE INDEX IF NOT EXISTS idx_topics_score ON gtm_topics(score DESC);

-- 5. WhatsApp AI Sales & Support Agent Tables (Project #3)
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id TEXT PRIMARY KEY,
  phone_number TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  last_message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'QUALIFIED', 'HANDOFF', 'BOOKED'
  office_hours_only INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_leads (
  id TEXT PRIMARY KEY,
  conversation_id TEXT REFERENCES whatsapp_conversations(id),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_requested TEXT NOT NULL,
  budget TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. 3D Product Configurator Leads & Analytics (Project #4)
CREATE TABLE IF NOT EXISTS showroom_enquiries (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  variant_finish TEXT NOT NULL,
  calculated_price INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. AI Lead Recovery & Outreach Agent (Project #5)
CREATE TABLE IF NOT EXISTS dead_leads (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  days_inactive INTEGER NOT NULL,
  intent_score INTEGER NOT NULL DEFAULT 50, -- 1-100
  recovery_status TEXT NOT NULL DEFAULT 'STALE', -- 'STALE', 'DRAFTED', 'APPROVED', 'SENT', 'REVIVED'
  drafted_followup TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. JobAutopilot Pro Pipeline (Project #6)
CREATE TABLE IF NOT EXISTS job_applications (
  id TEXT PRIMARY KEY,
  role_title TEXT NOT NULL,
  company TEXT NOT NULL,
  match_score INTEGER NOT NULL, -- 0-100%
  status TEXT NOT NULL DEFAULT 'BOOKMARKED', -- 'BOOKMARKED', 'APPLIED', 'INTERVIEW', 'OFFER'
  tailored_resume_bullets TEXT,
  salary_range TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Faceless Shorts / Reels Factory (Project #7)
CREATE TABLE IF NOT EXISTS video_shorts (
  id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  hook TEXT NOT NULL,
  script_body TEXT NOT NULL,
  call_to_action TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 35,
  status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'AUDIO_READY', 'RENDERED'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. AI Meeting-to-CRM Copilot (Project #8)
CREATE TABLE IF NOT EXISTS meeting_notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  attendees TEXT NOT NULL,
  summary TEXT NOT NULL,
  decisions TEXT NOT NULL, -- JSON
  action_items TEXT NOT NULL, -- JSON
  crm_synced INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Freelancer Client OS (Project #9)
CREATE TABLE IF NOT EXISTS freelancer_invoices (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'PENDING', -- 'DRAFT', 'SENT', 'PAID'
  due_date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. AI Interview Prep Coach (Project #10)
CREATE TABLE IF NOT EXISTS interview_sessions (
  id TEXT PRIMARY KEY,
  role_target TEXT NOT NULL,
  question TEXT NOT NULL,
  user_answer_transcript TEXT NOT NULL,
  score_communication INTEGER NOT NULL, -- 1-100
  score_technical INTEGER NOT NULL, -- 1-100
  score_star_structure INTEGER NOT NULL, -- 1-100
  specific_feedback TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

