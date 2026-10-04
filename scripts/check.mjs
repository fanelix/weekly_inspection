import {readFileSync,readdirSync} from 'node:fs';import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
for(const name of readdirSync('appsscript')){
 const source=readFileSync('appsscript/'+name,'utf8');
 if(name.endsWith('.gs'))new vm.Script(source,{filename:name});
 if(name.endsWith('.html'))for(const match of source.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1],{filename:name});
}
JSON.parse(readFileSync('appsscript/appsscript.json','utf8'));
const expected='<script>\n'+readFileSync('appsscript/Validation.gs','utf8')+'\n</script>\n';
if(readFileSync('appsscript/Rules.html','utf8')!==expected)throw Error('Client rules differ from server validation. Run npm run sync-rules.');
for(const folder of ['server','api','web'])for(const file of readdirSync(folder).filter(f=>f.endsWith('.js')))execFileSync(process.execPath,['--check',folder+'/'+file],{stdio:'pipe'});
const domain='// Generated from appsscript/Schema.gs and Validation.gs; run npm run sync-domain.\n'+['Schema','Validation'].map(n=>readFileSync('appsscript/'+n+'.gs','utf8')).join('\n')+'\nexport {WI_SCHEMAS_ as schemas,schema_ as schema,activeField_ as activeField,validate_ as validate,csv_ as csv,csvJoin_ as csvJoin,validDate_ as validDate};\n';
if(readFileSync('server/domain.js','utf8')!==domain)throw Error('Native domain differs from schema/validation. Run npm run sync-domain.');
JSON.parse(readFileSync('vercel.json','utf8'));
console.log('Legacy and Vercel server/client scripts parse; both generated validations match.');
