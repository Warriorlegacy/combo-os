// Zero-Dependency Local Static Server for Cloudflare Pages Static Export
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 8080;
const OUT_DIR = path.resolve('apps/hub/out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

if (!fs.existsSync(OUT_DIR)) {
  console.error(`Error: Static export directory not found at ${OUT_DIR}`);
  console.error('Please run "npm run build" first to generate the static export.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';

  let filePath = path.join(OUT_DIR, safePath);

  // Check if direct file exists
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Try appending index.html (directory style)
    const indexHtml = path.join(filePath, 'index.html');
    if (fs.existsSync(indexHtml)) {
      filePath = indexHtml;
    } else {
      // Try appending .html (clean URL style)
      const withHtml = filePath + '.html';
      if (fs.existsSync(withHtml)) {
        filePath = withHtml;
      } else {
        // Fallback to 404.html
        filePath = path.join(OUT_DIR, '404.html');
        if (!fs.existsSync(filePath)) {
          filePath = path.join(OUT_DIR, '404/index.html');
        }
      }
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'X-Powered-By': 'Cloudflare Pages Emulation'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Cloudflare Pages Local Emulation Server Running!`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Serving:   ${OUT_DIR}`);
  console.log(`======================================================\n`);
});

