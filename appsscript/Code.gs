function doGet(){return HtmlService.createTemplateFromFile('Index').evaluate().setTitle('BSI · Weekly Inspection').addMetaTag('viewport','width=device-width, initial-scale=1');}
function include_(name){return HtmlService.createHtmlOutputFromFile(name).getContent();}
function rpc_(action){try{return action();}catch(error){console.error('Weekly Inspection:',String(error&&error.message));return {ok:false,message:String(error&&error.message||'Permintaan belum dapat diproses. Coba lagi.')};}}
function getBootstrap(){return {ok:true,schemas:WI_SCHEMAS_,version:config_().version,pinRequired:!!PropertiesService.getScriptProperties().getProperty('TECHNICIAN_PIN_HASH'),ticket:issueTicket_(),limits:{photo:config_().maxPhotoBytes,total:config_().maxTotalPhotoBytes}};}
function saveInspection(request){return rpc_(function(){
  if(!request||typeof request!=='object')throw new Error('Data pengiriman tidak valid.');ticket_(request.ticket);technician_(request.pin);schema_(request.type);
  if(typeof request.receiptKey!=='string'||!/^[a-f0-9]{64}$/.test(request.receiptKey))throw new Error('Kunci pengiriman tidak valid.');
  if(JSON.stringify(request.answers||{}).length>100000)throw new Error('Jawaban terlalu panjang.');
  if(!Array.isArray(request.photos)||request.photos.length>7)throw new Error('Jumlah foto tidak valid.');
  var fields=schema_(request.type).fields,seen=new Set(),prepared=[],total=0;
  request.photos.forEach(function(p){var field=fields.find(function(f){return f.name===p.field&&f.type==='Image';});if(!field||seen.has(p.field))throw new Error('Kolom foto tidak valid atau berulang.');seen.add(p.field);if(!activeField_(field,request.answers))return;var parsed=photoBytes_(p);total+=parsed.bytes.length;prepared.push(Object.assign(parsed,{field:p.field}));});
  if(total>config_().maxTotalPhotoBytes)throw new Error('Total foto melebihi 8 MB.');
  var checked=validate_(request.type,request.answers,prepared.map(function(p){return p.field;}));if(checked.errors.length)return {ok:false,message:'Lengkapi kolom yang ditandai.',errors:checked.errors};
  return saveRecord_(request,checked,prepared);
 });}
function getInspection(request){return rpc_(function(){var record=authorizedRecord_(request);return {ok:true,record:publicRecord_(record),csv:csv_(record.type,record.answers,reportSchema_(record.type,record.answers,Object.keys(record.photos)).fields)};});}
function getInspectionPhoto(request){return rpc_(function(){var record=authorizedRecord_(request),p=record.photos[request.field];if(!p)throw new Error('Foto tidak ditemukan.');var field=reportSchema_(request.type,record.answers,Object.keys(record.photos)).fields.find(function(f){return f.name===request.field&&f.type==='Image';});if(!field||!new RegExp('^'+field.name+'\\.(jpg|png|webp)$').test(p.name))throw new Error('Metadata foto tidak valid.');var folder=reportFolder_(request.type,request.id,false),file=fileNamed_(folder,p.name);if(!file||file.getId()!==p.id)throw new Error('Foto harus berada di dalam folder laporan ini.');var bytes=file.getBlob().getBytes(),data=Utilities.base64Encode(bytes);photoBytes_({data:data,type:p.type});return {ok:true,type:p.type,name:p.name,data:data};});}
function listInspections(request){return rpc_(function(){
  request=request||{};admin_(request.token);schema_(request.type);var from=request.from||'',to=request.to||'';if(from&&!validDate_(from,false)||to&&!validDate_(to,false)||from&&to&&from>to)throw new Error('Rentang tanggal tidak valid.');
  var folders=request.cursor?DriveApp.continueFolderIterator(request.cursor):typeFolder_(request.type).getFolders(),items=[],scanned=0,skipped=0;
  while(folders.hasNext()&&scanned<100&&items.length<30){var folder=folders.next();scanned++;try{var r=readRecord_(folder);if(!r)continue;var s=summary_(r),date=s.date.slice(0,10);if(from&&date<from||to&&date>to||request.unit&&s.unit.toLowerCase().indexOf(String(request.unit).toLowerCase())<0||request.status&&s.status!==request.status)continue;items.push(s);}catch(e){skipped++;}}
  items.sort(function(a,b){return b.date.localeCompare(a.date);});return {ok:true,items:items,nextCursor:folders.hasNext()?folders.getContinuationToken():null,skipped:skipped};
 });}
