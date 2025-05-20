export default function auth(req, res, next) {
    if (req.url.startsWith('/admin')) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    next(); // penting kalau tidak diblok
  }