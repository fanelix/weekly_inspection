import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createHash,randomUUID} from 'node:crypto';
export function runtime(){
 const props=new Map(),cache=new Map(),files=new Map(),folders=new Map(),continuations=new Map();let failName='';
 const iterator=list=>{let n=0;return {hasNext:()=>n<list.length,next:()=>list[n++],getContinuationToken:()=>{const token=randomUUID();continuations.set(token,list.slice(n));return token;}}};
 const makeBlob=(bytes,type,name)=>({getBytes:()=>Array.from(bytes),getContentType:()=>type,getName:()=>name,getDataAsString:()=>Buffer.from(bytes).toString('utf8')});
 function folder(name,id,parent){const item={id,name,parent,children:[],files:[],getId(){return id;},getName(){return this.name;},setName(n){this.name=n;return this;},getParents(){return iterator(parent?[folders.get(parent)]:[]);},getFolders(){return iterator(this.children.map(i=>folders.get(i)));},getFoldersByName(n){return iterator(this.children.map(i=>folders.get(i)).filter(f=>f.name===n));},getFilesByName(n){return iterator(this.files.map(i=>files.get(i)).filter(f=>f.name===n));},createFolder(n){return folder(n,randomUUID(),id);},createFile(blob){const n=blob.getName();if(n===failName){failName='';throw Error('Simulated interruption');}const fid=randomUUID(),f={id:fid,name:n,blob,getId(){return fid;},getName(){return this.name;},getBlob(){return this.blob;},setContent(s){this.blob=makeBlob(Buffer.from(s),blob.getContentType(),n);return this;},getUrl(){return 'https://drive.example/'+fid;}};files.set(fid,f);this.files.push(fid);return f;},getUrl(){return 'https://drive.example/'+id;}};folders.set(id,item);if(parent)folders.get(parent).children.push(id);return item;}
 const root=folder('Weekly Inspection','1JoaN3UkwcEGNGo0awHsOdQgkWfvLi6hJ');folder('Radar','1Hy712mdHN7nc9vl0qlvp7767mZ94mzkj',root.id);folder('RTS','1doqkhGxYICXQJeRpLmtyc1mZl5olgMzt',root.id);
 const context=vm.createContext({console,JSON,Date,Set,Map,Math,Number,String,Object,Array,RegExp,Error,Buffer,
 PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.get(k)||null,setProperty(k,v){props.set(k,v);},deleteProperty:k=>props.delete(k)})},
 CacheService:{getScriptCache:()=>({get:k=>cache.get(k)||null,put:(k,v)=>cache.set(k,v),remove:k=>cache.delete(k)})},
 Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},getUuid:randomUUID,computeDigest:(_,s,charset)=>{if(typeof s!=='string'&&charset)throw Error('Apps Script byte digest accepts no charset');return Array.from(createHash('sha256').update(typeof s==='string'?s:Buffer.from(s)).digest());},base64Decode:s=>Array.from(Buffer.from(s,'base64')),base64Encode:b=>Buffer.from(b).toString('base64'),newBlob:(b,t,n)=>makeBlob(typeof b==='string'?Buffer.from(b):b,t,n)},
 DriveApp:{getFolderById:id=>{if(!folders.has(id))throw Error('Folder unavailable');return folders.get(id);},getFileById:id=>files.get(id),continueFolderIterator:token=>iterator(continuations.get(token)||[])},
 LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})}});
 for(const file of ['Schema.gs','Validation.gs','Config.gs','Auth.gs','Storage.gs','Code.gs'])vm.runInContext(readFileSync(new URL('../appsscript/'+file,import.meta.url),'utf8'),context,{filename:file});
 return {context,props,cache,files,folders,failOn:name=>{failName=name;}};
}
export function request(ctx,type='RTS'){
 const a={Inspection_DateTime:'2026-10-04T11:30',Technician_Name:'TEST ONLY',RTS_ID:'TM60-TEST',RTS_Location:'TEST',Radar_ID:'H-29',Radar_Location:'TEST'};
 ctx.schema_(type).fields.filter(f=>f.name.endsWith('_Section_Status')).forEach(f=>a[f.name]='Tidak berlaku (N/A)');
 return {id:randomUUID(),type,receiptKey:randomUUID().replaceAll('-','')+randomUUID().replaceAll('-',''),ticket:ctx.getBootstrap().ticket,answers:a,photos:[]};
}
