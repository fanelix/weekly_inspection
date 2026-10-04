import {readFileSync,writeFileSync,mkdirSync,readdirSync,copyFileSync,rmSync} from 'node:fs';
import './sync-domain.mjs';
rmSync('public',{recursive:true,force:true});mkdirSync('public',{recursive:true});
for(const name of readdirSync('web'))if(/\.(html|css|js)$/.test(name))copyFileSync('web/'+name,'public/'+name);
writeFileSync('public/rules.js',readFileSync('appsscript/Validation.gs','utf8'));
writeFileSync('public/zip.js',readFileSync('appsscript/Zip.html','utf8').replace(/^<script>\s*/,'').replace(/\s*<\/script>\s*$/,''));
writeFileSync('public/robots.txt','User-agent: *\nDisallow: /\n');
const html=readFileSync('public/index.html','utf8');if(html.includes('<?')||html.includes('google.script.run'))throw Error('Apps Script template leaked into Vercel build.');
console.log('Vercel build ready: public/ + api/rpc.js (native Drive backend).');
