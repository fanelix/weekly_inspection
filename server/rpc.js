import {loadConfig,configurationState,requireStorage} from './config.js';
import {schemas} from './domain.js';
import {hash,signToken,verifyToken,passwordMatches,requireTechnician,adminSession,sessionCookie,validOrigin} from './auth.js';
import {GoogleDrive} from './drive.js';
import {createInspectionService} from './inspection.js';
const MAX_BODY=2000000;
async function readBody(req){if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))throw Error('Kirim data dalam format JSON.');if(req.body!==undefined){const raw=typeof req.body==='string'?req.body:JSON.stringify(req.body);if(Buffer.byteLength(raw)>MAX_BODY){const e=Error('Permintaan terlalu besar. Kirim foto satu per satu.');e.status=413;throw e;}return typeof req.body==='string'?JSON.parse(req.body):req.body;}const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>MAX_BODY){const e=Error('Permintaan terlalu besar. Kirim foto satu per satu.');e.status=413;throw e;}chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}
export function createRpcHandler({config=loadConfig(),drive=new GoogleDrive(config)}={}){
 const service=createInspectionService({drive,config}),failures=new Map();
 const bootstrap=()=>{const readiness=configurationState(config);return {ok:true,schemas,version:config.version||'2.0.0',pinRequired:!!config.technicianPin,ticket:readiness.securityReady?signToken(config,'bootstrap'):'',limits:{photo:1000000,total:8000000},configuration:readiness};};
 return async function handler(req,res){res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');const send=(status,data)=>{res.statusCode=status;res.end(JSON.stringify(data));};
  try{if(req.method==='GET'){send(200,bootstrap());return;}if(req.method!=='POST'){res.setHeader('Allow','GET, POST');send(405,{ok:false,message:'Metode tidak tersedia.'});return;}if(!validOrigin(config,req)){send(403,{ok:false,message:'Asal permintaan tidak diizinkan.'});return;}const data=await readBody(req),p=data?.payload||{};let result;
   switch(data?.method){
    case 'getBootstrap':result=bootstrap();break;
    case 'loginAdmin':{verifyToken(config,p.ticket,'bootstrap');if(config.adminPassword.length<12)throw Error('Password admin belum dikonfigurasi di Vercel.');const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').slice(0,100),now=Date.now(),f=failures.get(ip);if(f&&f.until>now&&f.count>=10)throw Error('Terlalu banyak percobaan. Coba kembali dalam 10 menit.');if(!passwordMatches(config.adminPassword,p.password,config.secret)){failures.set(ip,{count:f&&f.until>now?f.count+1:1,until:now+600000});if(failures.size>2000)failures.clear();throw Error('Password admin tidak sesuai.');}failures.delete(ip);res.setHeader('Set-Cookie',sessionCookie(config,signToken(config,'admin',{version:hash(config.adminPassword)},3600)));result={ok:true,token:'cookie'};break;}
    case 'logoutAdmin':adminSession(config,req);res.setHeader('Set-Cookie',sessionCookie(config,'',0));result={ok:true};break;
    case 'allocateInspection':requireStorage(config);verifyToken(config,p.ticket,'bootstrap');requireTechnician(config,p.pin);result=await service.allocate(p);break;
    case 'beginInspection':requireStorage(config);result=await service.begin(p);break;
    case 'uploadInspectionPhoto':requireStorage(config);result=await service.photo(p);break;
    case 'commitInspection':requireStorage(config);result=await service.commit(p);break;
    case 'getInspection':{requireStorage(config);const admin=!!p.token;if(admin)adminSession(config,req);result=await service.read(p,admin);break;}
    case 'getInspectionPhoto':{requireStorage(config);const admin=!!p.token;if(admin)adminSession(config,req);result=await service.readPhoto(p,admin);break;}
    case 'listInspections':adminSession(config,req);requireStorage(config);result=await service.list(p);break;
    case 'checkStorage':adminSession(config,req);requireStorage(config);result=await service.checkStorage();break;
    default:send(400,{ok:false,message:'Endpoint tidak tersedia.'});return;
   }
   send(200,result);
  }catch(e){send(e.status===413?413:400,{ok:false,message:e.message||'Permintaan belum dapat diproses.',...(e.errors?{errors:e.errors}:{})});}
 };
}
