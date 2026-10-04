import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
mkdirSync('server',{recursive:true});
const source=['Schema','Validation'].map(n=>readFileSync('appsscript/'+n+'.gs','utf8')).join('\n');
writeFileSync('server/domain.js','// Generated from appsscript/Schema.gs and Validation.gs; run npm run sync-domain.\n'+source+'\nexport {WI_SCHEMAS_ as schemas,schema_ as schema,reportSchema_ as reportSchema,activeField_ as activeField,validate_ as validate,csv_ as csv,csvReports_ as csvReports,csvJoin_ as csvJoin,validDate_ as validDate};\n');
