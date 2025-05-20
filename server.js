import http from 'http';
import fs from 'fs';
import path from 'path';
import { getRoutes } from './lib/routes.js';
import { pathToFileURL } from 'url';
import { loadMiddleware } from './lib/loadMiddleware.js';

const routes = getRoutes('./pages');
const middlewareList = await loadMiddleware();
const layout = fs.readFileSync('./layout.html', 'utf-8');

const server = http.createServer(async (req, res) => {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - started`);

  // Middleware
  let i = 0;
  const next = () => {
    const mw = middlewareList[i++];
    if (mw) mw(req, res, next);
  };
  next();

  await new Promise(resolve => setImmediate(resolve));

  if (res.writableEnded) {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - middleware ended response after ${duration}ms`);
    return;
  }

  const urlPath = req.url === '/' ? '/' : decodeURIComponent(req.url);
  const publicPath = path.join('./public', urlPath);

  // Serve static files
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    const ext = path.extname(publicPath).toLowerCase();
    const contentTypes = {
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.html': 'text/html',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
    };
    const contentType = contentTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(publicPath));

    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - served static file in ${duration}ms`);
    return;
  }

  // Handle dynamic routes
  const pageURL = routes[urlPath];
  if (pageURL) {
    try {
      const module = await import(pageURL + `?t=${Date.now()}`); // bypass cache
      const content = module.default();
      const html = layout.replace('<!--CONTENT-->', content);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);

      const duration = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - served dynamic page in ${duration}ms`);
      return;
    } catch (err) {
      console.error('❌ Error rendering page:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');

      const duration = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - error after ${duration}ms`);
      return;
    }
  }

  // Custom 404 page
  const notFoundPath = path.resolve('pages', '404.js');
  if (fs.existsSync(notFoundPath)) {
    try {
      const module = await import(pathToFileURL(notFoundPath).href + `?t=${Date.now()}`);
      const content = module.default();
      const html = layout.replace('<!--CONTENT-->', content);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(html);

      const duration = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - served custom 404 in ${duration}ms`);
      return;
    } catch (err) {
      console.error('❌ Error rendering custom 404:', err);
    }
  }

  // Plain 404 fallback
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');

  const duration = Date.now() - startTime;
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - plain 404 served in ${duration}ms`);
});

server.listen(3000, () => {
  console.log('KamilJS running at http://localhost:3000');
});
