import {readFileSync,readdirSync} from 'node:fs';import vm from 'node:vm';
for(const name of readdirSync('appsscript')){
 const source=readFileSync('appsscript/'+name,'utf8');
 if(name.endsWith('.gs'))new vm.Script(source,{filename:name});
 if(name.endsWith('.html'))for(const match of source.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1],{filename:name});
}
JSON.parse(readFileSync('appsscript/appsscript.json','utf8'));
const expected='<script>\n'+readFileSync('appsscript/Validation.gs','utf8')+'\n</script>\n';
if(readFileSync('appsscript/Rules.html','utf8')!==expected)throw Error('Client rules differ from server validation. Run npm run sync-rules.');
console.log('All server/client scripts parse; shared validation matches.');
