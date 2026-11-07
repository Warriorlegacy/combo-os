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
