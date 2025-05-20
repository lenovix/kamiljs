import http from 'http';
import fs from 'fs';
import path from 'path';
import { getRoutes } from './lib/router.js';
import { pathToFileURL } from 'url';

const routes = getRoutes('./pages');

const server = http.createServer(async (req, res) => {
  const publicPath = `./public${req.url}`;
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    const ext = path.extname(req.url);
    const type = {
      '.js': 'application/javascript',
      '.css': 'text/css',
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': type });
    res.end(fs.readFileSync(publicPath));
    return;
  }

  const pageURL = routes[req.url];
  if (pageURL) {
    const module = await import(pageURL + `?t=${Date.now()}`); // bypass cache
    const html = module.default();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('KamilJS running at http://localhost:3000');
});
