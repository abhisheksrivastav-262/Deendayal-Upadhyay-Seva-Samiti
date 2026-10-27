const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

function copyTree(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) copyTree(from, to);
    else fs.copyFileSync(from, to);
  }
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'app.js', 'styles.css']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
copyTree(path.join(root, 'public'), output);

const configuredOrigin = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const origin = configuredOrigin
  ? `${configuredOrigin.startsWith('http') ? '' : 'https://'}${configuredOrigin}`.replace(/\/$/, '')
  : '';
const routes = ['/', '/about', '/activities', '/programs', '/events', '/mission', '/volunteer', '/contact', '/privacy-policy', '/terms'];

if (origin) {
  const urls = routes.map((route) => `<url><loc>${origin}${route}</loc></url>`).join('');
  fs.writeFileSync(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  fs.writeFileSync(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  fs.writeFileSync(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n');
}

console.log(`Static site built in ${path.relative(root, output)}`);
