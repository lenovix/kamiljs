import fs from 'fs';
import sucrase from 'sucrase';
import { pathToFileURL } from 'url';

export async function loadModule(filePath) {
  const ext = filePath.split('.').pop();

  if (['jsx', 'tsx'].includes(ext)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { code } = sucrase.transform(raw, {
      transforms: ['jsx', 'typescript'],
    });

    const tempPath = `.kamil-temp-${Date.now()}.mjs`;
    fs.writeFileSync(tempPath, code);

    const module = await import(pathToFileURL(tempPath).href);
    fs.unlinkSync(tempPath);
    return module;
  }

  return await import(pathToFileURL(filePath).href + `?t=${Date.now()}`);
}
