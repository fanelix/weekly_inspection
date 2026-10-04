import {readFileSync,writeFileSync} from 'node:fs';
writeFileSync('appsscript/Rules.html','<script>\n'+readFileSync('appsscript/Validation.gs','utf8')+'\n</script>\n');
