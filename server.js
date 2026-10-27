const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  const requestUrl = new URL(req.url,'http://localhost');
  let pathname = decodeURIComponent(requestUrl.pathname);
  const origin = process.env.SITE_URL || 'http://localhost:3000';
  if (pathname === '/robots.txt') { res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'}); return res.end(`User-agent: *\nAllow: /\nSitemap: ${origin.replace(/\/$/,'')}/sitemap.xml\n`); }
  if (pathname === '/sitemap.xml') { const urls=['/','/about','/activities','/programs','/events','/mission','/volunteer','/contact','/privacy-policy','/terms'].map(p=>`<url><loc>${origin.replace(/\/$/,'')}${p}</loc></url>`).join(''); res.writeHead(200,{'Content-Type':'application/xml; charset=utf-8'}); return res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`); }
  if (pathname.startsWith('/api/')) { res.writeHead(503,{'Content-Type':'application/json; charset=utf-8'}); return res.end(JSON.stringify({error:'Form submission service is not configured.'})); }
  let file = path.join(root, pathname.replace(/^\/+/,''));
  if (!fs.existsSync(file)) file = path.join(root,'public',pathname.replace(/^\/+/,''));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  const appRoutes = new Set(['/','/about','/activities','/programs','/events','/mission','/volunteer','/contact','/privacy-policy','/terms']);
  const routePath = pathname.replace(/\/$/,'') || '/';
  const responseStatus = fs.existsSync(file) || appRoutes.has(routePath) ? 200 : 404;
  if (!fs.existsSync(file)) file = path.join(root,'index.html');
  fs.readFile(file,(err,data)=>{ if(err){res.writeHead(404);return res.end('Not found');} res.writeHead(responseStatus,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data); });
}).listen(process.env.PORT||3000,'127.0.0.1',()=>console.log(`Site available at http://localhost:${process.env.PORT||3000}`));
