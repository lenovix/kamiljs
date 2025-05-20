import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export function getRoutes(pagesDir = './pages') {
  const routes = {};
  const files = fs.readdirSync(pagesDir);

  files.forEach(file => {
    if (!file.endsWith('.js')) return;

    const routePath = file === 'index.js'
      ? '/'
      : `/${file.replace('.js', '')}`;

    routes[routePath] = pathToFileURL(path.resolve(pagesDir, file)).href;
  });

  return routes;
}