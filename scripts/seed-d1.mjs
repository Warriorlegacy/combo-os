// Seed Script for Cloudflare D1 Database (Combo OS)
import fs from 'fs';
import path from 'path';
import { seedTools, seedTopics, seedDrafts, seedDocuments, seedEvalBenchmarks } from '../apps/worker-api/src/db/seed-data.ts';

console.log('Generating production SQL seed file for Cloudflare D1...');

let sql = '-- Auto-generated Cloudflare D1 Seed SQL for Combo OS\n\n';

// 1. Tools Directory
for (const t of seedTools) {
  const comm = t.commercial_ok ? 1 : 0;
  const cc = t.cc_required ? 1 : 0;
  const feat = t.featured ? 1 : 0;
  const score = t.unslop_score || 9;
  sql += `INSERT OR REPLACE INTO directory_tools (id, name, category, url, description, free_tier, commercial_ok, cc_required, featured, unslop_score) VALUES ('${t.id}', '${t.name.replace(/'/g, "''")}', '${t.category}', '${t.url}', '${t.description.replace(/'/g, "''")}', '${t.free_tier.replace(/'/g, "''")}', ${comm}, ${cc}, ${feat}, ${score});\n`;
}

// 2. GTM Topics & Drafts
for (const top of seedTopics) {
  sql += `INSERT OR REPLACE INTO gtm_topics (id, title, source, score, status) VALUES ('${top.id}', '${top.title.replace(/'/g, "''")}', '${top.source.replace(/'/g, "''")}', ${top.score}, '${top.status}');\n`;
}

for (const d of seedDrafts) {
  sql += `INSERT OR REPLACE INTO gtm_drafts (id, topic_id, channel, content, citations, approval_status, approved_by, approved_at) VALUES ('${d.id}', '${d.topic_id}', '${d.channel}', '${d.content.replace(/'/g, "''")}', '${JSON.stringify(d.citations).replace(/'/g, "''")}', '${d.approval_status}', ${d.approved_by ? `'${d.approved_by}'` : 'NULL'}, ${d.approved_at ? `'${d.approved_at}'` : 'NULL'});\n`;
}

// 3. RAG Documents & Evals
for (const doc of seedDocuments) {
  sql += `INSERT OR REPLACE INTO rag_documents (id, title, content, metadata) VALUES ('${doc.id}', '${doc.title.replace(/'/g, "''")}', '${doc.content.replace(/'/g, "''")}', '${JSON.stringify(doc.metadata || {}).replace(/'/g, "''")}');\n`;
}

for (const ev of seedEvalBenchmarks) {
  const isOut = ev.is_out_of_domain ? 1 : 0;
  const pass = ev.last_refusal_pass ? 1 : 0;
  sql += `INSERT OR REPLACE INTO rag_eval_benchmarks (id, query, expected_answer, is_out_of_domain, last_groundedness_score, last_citation_score, last_refusal_pass, last_latency_ms) VALUES ('${ev.id}', '${ev.query.replace(/'/g, "''")}', '${ev.expected_answer.replace(/'/g, "''")}', ${isOut}, ${ev.last_groundedness_score}, ${ev.last_citation_score}, ${pass}, ${ev.last_latency_ms});\n`;
}

const outPath = path.resolve('apps/worker-api/src/db/seed.sql');
fs.writeFileSync(outPath, sql, 'utf-8');
console.log(`✓ Generated ${outPath} successfully with complete dataset.`);

