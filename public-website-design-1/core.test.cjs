const assert=require('node:assert/strict');
const {clientDifference,buildApplication}=require('./preview-core.js');
assert.deepEqual(clientDifference(240,2000,1300),{label:'Estimated fee reduction',amount:168000});
assert.deepEqual(clientDifference(240,2000,2500),{label:'Estimated fee increase',amount:120000});
assert.deepEqual(clientDifference(240,2000,2000),{label:'No fee difference ($0)',amount:0});
const fields={fullName:' Example Reviewer ',email:'reviewer@gmail.com',experience:'10–14 years',rate:1000,earnings:135000,score:90,internalMargin:10};
const scenario={days:90,rate:1000,growthPercent:50,targetBillings:135000};
assert.deepEqual(buildApplication('expert',fields,scenario,false),{fullName:'Example Reviewer',email:'reviewer@gmail.com',experience:'10–14 years',phone:'',linkedin:''});
assert.equal(buildApplication('expert',fields,null,true).scenario,undefined);
assert.deepEqual(buildApplication('expert',fields,scenario,true).scenario,scenario);
assert.equal(buildApplication('firm',{firmName:'Example',interests:['capacity','secret']},null,false).interests.join(','),'capacity');
function luminance(hex){const rgb=hex.match(/[a-f0-9]{2}/gi).map(v=>parseInt(v,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
for(const [fg,bg,min] of [['ffffff','0D5C3A',4.5],['ffffff','0B4D30',4.5],['64748B','ffffff',4.5],['64748B','F8F9FA',4.5],['10B981','0F172A',4.5],['B42318','ffffff',4.5],['0D5C3A','CBD5E1',3]]){const l=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);const contrast=(l[0]+.05)/(l[1]+.05);assert.ok(contrast>=min,`${fg}/${bg}: ${contrast}`);console.log(`${fg}/${bg}: ${contrast.toFixed(2)}:1`);}
console.log('Public calculation, attachment allowlist and colour contrast checks passed.');
