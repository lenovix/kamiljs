import { getRoutes } from './lib/routes.js'; // atau sesuai path kamu
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

const routes = getRoutes();

export async function handleRoute(url) {
  const pageUrl = routes[url];

  if (pageUrl) {
    const module = await import(pageUrl);
    return module.default();
  }

  // Handle 404
  const notFoundPath = path.resolve('pages', '404.js');
  if (fs.existsSync(notFoundPath)) {
    const notFoundUrl = pathToFileURL(notFoundPath).href;
    const module = await import(notFoundUrl);
    return module.default();
  }

  return `<h1>404 - Page Not Found</h1>`;
}