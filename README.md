# ⚡ KamilJS v0.0.3

KamilJS adalah framework JavaScript ringan untuk membuat aplikasi web dengan pendekatan mirip Next.js, namun dibuat dari nol sebagai eksperimen dan proyek pembelajaran.

---

### ✨ Fitur

- ✅ Routing berbasis file otomatis dari folder `pages/`
- ✅ Server built-in dengan Node.js
- ✅ Auto-reload server saat file berubah (`chokidar`)
- ✅ Live browser reload menggunakan WebSocket (`ws`)
- ✅ Static file serving dari folder `public/`
- ✅ Styling default bertema **"masa depan"**
- ✅ Middleware system (seperti Next.js middleware)
- ✅ Custom 404 page support
- ✅ Build system untuk menghasilkan HTML statis dari halaman dinamis (Static HTML export)
- ✅ Support `getServerSideProps` untuk pre-render dengan data dinamis saat build

---

## 🧪 Cara Menjalankan

```bash
npm install
kamil dev
```
Buka browser di http://localhost:3000

Untuk build statis:
```
kamil build
```

## 🗂️ Struktur Direktori
```
kamiljs/
├── build.js                # Build statis (Static HTML export)
├── dev.js                  # Dev runner (watch & reload)
├── live-server.js          # WebSocket server untuk live reload
├── server.js               # Server utama
├── lib/
│   ├── loadMiddleware.js
│   ├── loadModule.js
│   └── routes.js           # File-based routing logic
├── pages/
│   ├── index.js            # Halaman utama
│   └── 404.js              # Halaman custom 404 (opsional)
├── public/
│   └── reload-client.js    # Script client live reload
├── layout.html             # Template HTML layout utama
├── package.json
└── README.md
```

## 🛣️ Rencana Fitur Mendatang
### Versi 0.0.4
- Support JSX/TSX (menggunakan Babel atau Sucrase)
- Support layout system (misal: _layout.js)
- Static Site Generation (SSG) lebih lengkap dan terintegrasi
- API Routes (pages/api)
- Plugin system
- CSS Modules atau scoped styles
- Deployment CLI (kamil deploy)
- ESM bundling untuk produksi

## 🤝 Kontribusi
KamilJS adalah proyek pembelajaran dan eksplorasi pribadi. Jika kamu tertarik untuk berkontribusi, fork repo ini dan buat PR atau issue.