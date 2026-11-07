import { Hono } from 'hono';
import { getDatabase } from '../db/db-client.ts';

export const directoryRouter = new Hono<{ Bindings: { COMBO_DB?: any } }>();

directoryRouter.get('/', async (c) => {
  const category = c.req.query('category') || 'All';
  const search = c.req.query('q') || '';
  const db = getDatabase(c.env);

  let query = 'SELECT * FROM directory_tools WHERE 1=1';
  const params: unknown[] = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ? OR use_case LIKE ?)';
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  query += ' ORDER BY name ASC';

  const stmt = db.prepare(query);
  const { results } = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

  return c.json({
    success: true,
    count: results.length,
    tools: results
  });
});

directoryRouter.get('/categories', async (c) => {
  const db = getDatabase(c.env);
  const { results } = await db.prepare('SELECT * FROM directory_tools').all();
  
  const categoryCounts: Record<string, number> = { All: results.length };
  for (const t of results as any[]) {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  }

  return c.json({
    success: true,
    categories: Object.entries(categoryCounts).map(([name, count]) => ({ name, count }))
  });
});

directoryRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const db = getDatabase(c.env);
  const tool = await db.prepare('SELECT * FROM directory_tools WHERE id = ?').bind(id).first();

  if (!tool) {
    return c.json({ success: false, error: 'Tool not found' }, 404);
  }

  return c.json({ success: true, tool });
});
