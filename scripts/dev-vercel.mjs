// Local development only. Missing real credentials stays visibly unconfigured.
import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {join,extname} from 'node:path';
import {createRpcHandler} from '../server/rpc.js';
try{process.loadEnvFile('.env.local');}catch{}
const handler=createRpcHandler();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg'};
export const server=createServer(async(req,res)=>{if(req.url==='/api/rpc'){await handler(req,res);return;}const name=req.url.split('?')[0]==='/'?'index.html':req.url.split('?')[0].slice(1);if(!/^(assets\/)?[A-Za-z0-9_-][A-Za-z0-9_.-]*$/.test(name)||name.includes('..')){res.writeHead(404);res.end();return;}try{const bytes=readFileSync(join('public',name));res.setHeader('content-type',types[extname(name)]||'application/octet-stream');res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}});
server.listen(4173,'0.0.0.0',()=>console.log('Local Vercel application ready on port 4173; real Drive writes require .env.local credentials.'));
