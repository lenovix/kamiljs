import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export function getRoutes(pagesDir = './pages') {
  const routes = {};
  const files = fs.readdirSync(pagesDir);

  files.forEach(file => {
    const ext = path.extname(file);
    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) return;
    if (file.startsWith('404.')) return; // Abaikan 404.js/404.jsx/etc

    const routePath = file.startsWith('index.')
      ? '/'
      : `/${file.replace(ext, '')}`;

    routes[routePath] = pathToFileURL(path.resolve(pagesDir, file)).href;
  });

  return routes;
}
