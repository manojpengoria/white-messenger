/**
 * Express server for the pre-built static site.
 * Production: `npm start` (listens on process.env.PORT). Local: `npm run serve [-- --port 8080]`.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portArg = process.argv.indexOf('--port');
const PORT = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT || 8080);

const app = express();
app.disable('x-powered-by');

// Never expose source, tooling or dependencies.
app.use((req, res, next) => {
  if (/^\/(src|scripts|node_modules|\.git)(\/|$)|^\/(package(-lock)?\.json|tailwind\.config\.js)$/.test(req.path)) {
    return res.status(404).sendFile(path.join(ROOT, '404.html'));
  }
  next();
});

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
