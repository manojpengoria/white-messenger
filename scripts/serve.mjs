/**
 * Express server for the pre-built static site.
 * Production: `npm start` (listens on process.env.PORT). Local: `npm run serve [-- --port 8080]`.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHandler } from '../api/_lib/handler.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portArg = process.argv.indexOf('--port');
const PORT = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 8080);

const app = express();
app.disable('x-powered-by');

// Never expose source, tooling or dependencies.
app.use((req, res, next) => {
  const isFormPost = req.method === 'POST' && /^\/api\/(inquiry|careers)$/.test(req.path);
  if (!isFormPost && /^\/(src|scripts|api|node_modules|\.git)(\/|$)|^\/(package(-lock)?\.json|tailwind\.config\.js|vercel\.json)$/.test(req.path)) {
    return res.status(404).sendFile(path.join(ROOT, '404.html'));
  }
  next();
});

// Form submissions: the same handlers Vercel runs as serverless functions.
const formBody = express.urlencoded({ extended: false, limit: '32kb' });
app.post('/api/inquiry', formBody, createHandler('inquiry'));
app.post('/api/careers', formBody, createHandler('careers'));

app.use(express.static(ROOT, {
  index: 'index.html',
  extensions: ['html'],
  dotfiles: 'ignore',
  setHeaders(res, file) {
    // HTML always revalidates; versionless assets get a modest cache.
    res.setHeader('Cache-Control', file.endsWith('.html') ? 'no-cache' : 'public, max-age=86400');
  },
}));

app.use((req, res) => res.status(404).sendFile(path.join(ROOT, '404.html')));

app.listen(PORT, () => console.log(`White Messenger listening on http://localhost:${PORT}/`));
