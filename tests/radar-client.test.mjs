import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
function client(){
 const nodes=new Map(),node=()=>({classList:{toggle(){},remove(){}},innerHTML:'',hidden:false,querySelectorAll:()=>[],querySelector:()=>null,replaceChildren(image){this.image=image;}});
 const c=vm.createContext({console,Promise,JSON,Date,Set,Map,Math,Number,String,Object,Array,RegExp,Error,Blob,TextEncoder,Uint8Array,crypto:globalThis.crypto,atob,URL:{revokeObjectURL(){}},document:{querySelector(selector){if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);},querySelectorAll:()=>[],createElement:node},sessionStorage:{getItem:()=>null,setItem(){},removeItem(){}},setTimeout(){},window:{scrollTo(){}},CSS:{escape:x=>x},wiRpc:()=>new Promise(()=>{})});
 for(const file of ['appsscript/Schema.gs','appsscript/Validation.gs','web/client.js'])vm.runInContext(readFileSync(new URL('../'+file,import.meta.url),'utf8'),c);
 vm.runInContext('globalThis.s=state;state.bootstrap={schemas:WI_SCHEMAS_,ticket:"test"};state.type="RADAR";renderForm=()=>{};toast=()=>{};',c);
 return {c,nodes};
}
test('adding a radar prevents navigation from changing the receiving draft',async()=>{
 const {c}=client();c.s.id='current-draft';c.s.radarAdd={open:true,value:'H-31',busy:false,error:''};
 let finish;const response=new Promise(resolve=>finish=resolve);
 c.rpc=async method=>method==='getBootstrap'?{ticket:'test'}:response;
 const pending=c.addRadar();
 c.choose('RTS');assert.equal(c.s.type,'RADAR');
 finish({id:'H-31',radars:['H-31']});await pending;
 assert.equal(c.s.answers.Radar_ID,'H-31');assert.equal(c.s.id,'current-draft');assert.equal(c.s.busy,false);
});
test('temporary radar list failure can be retried without reloading the draft',async()=>{
 const {c}=client();let calls=0;
 c.rpc=async method=>{if(method==='getBootstrap')return {ticket:'test'};if(++calls===1)throw Error('Drive temporarily unavailable');return {radars:['H-31']};};
 await c.loadRadars();assert.equal(c.s.radarsLoaded,false);assert.match(c.s.radarsError,/temporarily/);
 await c.loadRadars();assert.deepEqual(Array.from(c.s.radars),['H-31']);assert.equal(c.s.radarsLoaded,true);assert.equal(c.s.radarsError,'');
});
test('a delayed list response cannot erase a radar just added to the draft',async()=>{
 const {c}=client();let finish;
 const listResponse=new Promise(resolve=>finish=resolve);
 c.s.radarAdd={open:true,value:'H-31',busy:false,error:''};
 c.rpc=async method=>method==='getBootstrap'?{ticket:'test'}:method==='listRadars'?listResponse:{id:'H-31',radars:['H-31']};
 const loading=c.loadRadars();await c.addRadar();
 finish({radars:[]});await loading;
 assert.equal(c.s.answers.Radar_ID,'H-31');assert.ok(c.s.radars.includes('H-31'));
});
test('historical report renders and loads the removed Moxa photo in its original section',async()=>{
 const {c,nodes}=client();const answers={RTS_ID:'TM60-01',RTS_Network_Image:'RTS/old/RTS_Network_Image.jpg',RTS_Network_Notes:'Old network issue'};
 c.s.reportAuth={id:'old-report',type:'RTS'};c.s.report={record:{id:'old-report',type:'RTS',model:'Leica TM60',answers,photos:[{field:'RTS_Network_Image',name:'RTS_Network_Image.jpg'}]}};
 await c.showReport(false);assert.match(nodes.get('#app').innerHTML,/photo-RTS_Network_Image/);assert.match(nodes.get('#app').innerHTML,/Old network issue/);
 c.rpc=async()=>({name:'RTS_Network_Image.jpg',type:'image/jpeg',data:'/9j/4A=='});
 assert.equal(await c.loadPhoto('RTS_Network_Image'),true);assert.match(nodes.get('#photo-RTS_Network_Image').image.alt,/Moxa|jaringan/i);
});
