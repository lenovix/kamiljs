import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadMiddleware(middlewareDir = './middleware') {
  const middlewareFns = [];

  if (!fs.existsSync(middlewareDir)) return middlewareFns;

  const files = fs.readdirSync(middlewareDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const filePath = pathToFileURL(path.resolve(middlewareDir, file)).href;
    const module = await import(filePath);
    if (typeof module.default === 'function') {
      middlewareFns.push(module.default);
    }
  }

  return middlewareFns;
}
