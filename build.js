import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { getRoutes } from './lib/routes.js';
import { fileURLToPath } from 'url';
import { loadModule } from './lib/loadModule.js';

// Buat direktori dist
const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

// Salin public/
const publicSrc = path.resolve('public');
const publicDest = path.join(distDir, 'public');
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
}

// Ambil layout
const layoutPath = path.resolve('./public/layout.html');
const layout = fs.readFileSync(layoutPath, 'utf-8');

// Ambil semua halaman
const routes = getRoutes('./pages');

for (const [route, pageURL] of Object.entries(routes)) {
  try {
    const module = await loadModule(fileURLToPath(pageURL));
    let props = {};

    // Jalankan getServerSideProps jika ada
    if (typeof module.getServerSideProps === 'function') {
      const result = await module.getServerSideProps();
      // Support return { props: {...} } atau langsung {...}
      props = result?.props ?? result ?? {};
    }

    // Render halaman
    const content = module.default(props);
    const html = layout.replace('<!--CONTENT-->', content);

    const filename = route === '/' ? 'index.html' : `${route.replace(/^\/+/, '')}.html`;
    const outputPath = path.join(distDir, filename);

    // Buat folder jika perlu
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✅ Built: ${filename}`);
  } catch (err) {
    console.error(`❌ Gagal membuild ${route}:`, err);
  }
}

// Tangani custom 404 jika ada
const notFoundPath = path.resolve('pages', '404.js');
if (fs.existsSync(notFoundPath)) {
  try {
    const notFoundURL = pathToFileURL(notFoundPath).href + `?t=${Date.now()}`;
    const module = await import(notFoundURL);
    const content = module.default();
    const html = layout.replace('<!--CONTENT-->', content);

    fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf-8');
    console.log('✅ Built: 404.html');
  } catch (err) {
    console.error('❌ Gagal membuild 404:', err);
  }
}

console.log('\n🎉 Build selesai! Semua file tersedia di /dist');