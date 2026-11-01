const assert=require('node:assert/strict');
const config=require('./site-config.json');
const core=require('./public-core.js');
const {createSubmissionService}=require('./submission-service.js');
const defaults=a=>Object.fromEntries(config.audiences[a].inputs.map(f=>[f.name,f.default]));
const source={page:'/',component:'homepage-drawer'};
async function main(){
 const clients=core.calculate('client',defaults('client'));assert.equal(clients.headline,'$180K – $240K');assert.deepEqual(clients.overhead,[120000,160000]);assert.deepEqual(clients.risk,[60000,80000]);
 const expert=core.calculate('expert',defaults('expert'));assert.equal(expert.headline,'+$30K – $40K');assert.equal(expert.level,'Senior Consultant');assert.deepEqual(expert.days,[30,40]);
 const firmDefault=core.calculate('firm',defaults('firm'));assert.equal(firmDefault.headline,'$700K – $1M');assert.deepEqual(firmDefault.mandates,[2,4]);assert.equal(firmDefault.left,2000000);
 for(const a of ['client','expert','firm']){assert.equal(config.audiences[a].fields.filter(f=>f.required).length,3);assert.ok(core.validScenario(config,a,defaults(a)));assert.ok(!core.validScenario(config,a,{}));}
 assert.equal(config.audiences.firm.fields.find(f=>f.name==='practice_area').required,undefined);
 for(const a of ['client','expert','firm'])for(const f of config.audiences[a].inputs){
  const allowed=f.choices?f.choices.map(o=>o.value):f.discrete?f.values:[f.min,f.max];
  for(const value of allowed){const v={...defaults(a),[f.name]:value};assert.ok(core.validScenario(config,a,v));const r=core.calculate(a,v);assert.ok(!JSON.stringify(r).includes('null'));assert.ok(!r.headline.includes('NaN'));assert.ok(r.total[0]<=r.total[1]);}
  for(const value of [null,undefined,NaN,Infinity,{},'not-an-option'])assert.ok(!core.validScenario(config,a,{...defaults(a),[f.name]:value}));
 }
 assert.ok(!core.validScenario(config,'client',{...defaults('client'),budget:27000}));
 assert.ok(!core.validScenario(config,'expert',{...defaults('expert'),days:91}));
 for(const [years,level] of [[3,'Associate'],[4,'Associate'],[5,'Consultant'],[9,'Consultant'],[10,'Senior Consultant'],[14,'Senior Consultant'],[15,'Principal'],[19,'Principal'],[20,'Expert Partner'],[30,'Expert Partner']])assert.equal(core.calculate('expert',{...defaults('expert'),years}).level,level);
 const booked=core.calculate('expert',{...defaults('expert'),days:220});assert.deepEqual(booked.days,[0,0]);assert.match(booked.verdict,/already well booked/);assert.notEqual(booked.headline,'Better projects');
 assert.equal(core.calculate('expert',{...defaults('expert'),years:3,days:220}).headline,'Better projects');
 assert.deepEqual(core.calculate('expert',{...defaults('expert'),professional_role:'advisor'}).days,[15,15]);
 assert.deepEqual(core.calculate('expert',{...defaults('expert'),professional_role:'pm'}).days,[40,50]);
 const zero=core.calculate('firm',{...defaults('firm'),missed_projects:0});assert.equal(zero.headline,'+2–4 mandates');assert.deepEqual(zero.total,[0,0]);assert.match(zero.label,/could bid on/);assert.ok(!zero.label.includes('win back'));
 assert.ok(core.calculate('firm',{...defaults('firm'),reason:'bench'}).total[0]>core.calculate('firm',{...defaults('firm'),reason:'brand'}).total[0]);
 assert.ok(core.calculate('client',{...defaults('client'),provider:'global'}).total[0]>core.calculate('client',{...defaults('client'),provider:'boutique'}).total[0]);
 const form={full_name:"  O’Connor Example  ",email:'reviewer@gmail.com',experience_band:'10–14 years',role:'Project Manager',daily_rate:1000,target_annual_billings:135000,internal_margin:50};
 const declined=core.buildPayload(config,'expert',form,defaults('expert'),false,source);
 assert.equal(declined.full_name,'O’Connor Example');assert.equal(declined.role,'Project Manager');assert.equal(declined.attach_earnings_calculation,false);for(const key of ['daily_rate','target_annual_billings','internal_margin','scenario'])assert.ok(!(key in declined));
 const attached=core.buildPayload(config,'expert',form,{...defaults('expert'),target_annual_billings:135000},true,source);assert.deepEqual(attached.scenario,defaults('expert'));assert.equal(attached.attach_earnings_calculation,true);
 assert.equal(core.buildPayload(config,'expert',form,{days:90},true,source).attach_earnings_calculation,false);
 const firm=core.buildPayload(config,'firm',{firm_name:'Example',contact_name_role:'Example, Partner',email:'partner@example.com'},null,false,source);assert.ok(!('practice_area' in firm));assert.equal(firm.new_project_opportunities,false);assert.ok(!firm.scenario);
 assert.equal(core.nextStep('expert',{receipt:false,reference:'x'}),null);
 assert.ok(!core.nextStep('expert',{receipt:true,reference:'x',verification:'failed'}).text.includes('Check your email'));
 assert.ok(core.nextStep('expert',{receipt:true,reference:'x',verification:'queued'}).text.includes('Check your email'));
 const preview=createSubmissionService();assert.equal((await preview.submit(declined)).status,'preview');
 let calls=[],attempt=0,ids=0;
 const retry=createSubmissionService({createId:()=>`request-${++ids}`,transport:async payload=>{calls.push(payload);if(attempt++===0)throw new Error('ambiguous timeout');return {status:'accepted',receipt:true,reference:'opaque-test-reference',verification:'failed'};}});
 assert.equal((await retry.submit(declined)).status,'retry');assert.equal((await retry.submit(declined)).status,'accepted');assert.equal(calls[0].request_id,calls[1].request_id);assert.ok(!calls[1].scenario);await retry.submit(declined);assert.equal(calls.length,2);
 retry.invalidate();await retry.submit({...declined,full_name:'Changed Enquiry'});assert.notEqual(calls[1].request_id,calls[2].request_id);
 let release,duplicateCalls=0;const duplicate=createSubmissionService({createId:()=> 'one-request',transport:()=>{duplicateCalls++;return new Promise(resolve=>{release=resolve;});}});const pending=duplicate.submit(declined),same=duplicate.submit(declined);assert.equal(pending,same);await Promise.resolve();release({status:'accepted',receipt:true,reference:'one-record'});await pending;assert.equal(duplicateCalls,1);
 const falseReceipt=createSubmissionService({transport:async()=>({status:'accepted',receipt:false,reference:'not-durable'})});assert.equal((await falseReceipt.submit(declined)).status,'retry');
 const syncFailure=createSubmissionService({transport:()=>{throw new Error('failed');}});assert.equal((await syncFailure.submit(declined)).status,'retry');assert.equal((await syncFailure.submit(declined)).status,'retry');
 const validation=createSubmissionService({transport:async()=>({status:'validation',fields:{email:'Please enter a valid email address.'}})});assert.equal((await validation.submit(declined)).fields.email,'Please enter a valid email address.');
 const throttled=createSubmissionService({transport:async()=>({status:'throttled'})});assert.equal((await throttled.submit(declined)).status,'throttled');
 for(const a of ['client','expert','firm']){
  assert.equal(config.guides[a].approved,true);assert.equal(config.guides[a].endpoint,null);
  const lead=core.conceptNotePayload(config,a,' reviewer@example.com ',{page:'/',component:'calculator'});
  assert.equal(lead.email,'reviewer@example.com');assert.equal(lead.audience,a);assert.equal(lead.lead_type,'concept_note');assert.equal(lead.concept_note_id,config.guides[a].id);
  assert.deepEqual(Object.keys(lead).sort(),['audience','lead_type','concept_note_id','email','form_version','source_page','source_component'].sort());
  for(const bad of ['', 'wrong-email', 'a'.repeat(255)+'@example.com'])assert.throws(()=>core.conceptNotePayload(config,a,bad,source));
 }
 assert.throws(()=>core.conceptNotePayload(config,'unknown','reviewer@example.com',source));
 assert.ok(Object.values(config.integrations.endpoints).every(v=>v===null));
 console.log('Passed client-reference defaults, all discrete values and enums, year-level boundaries, capacity/zero-loss branches, range boundaries, three-field forms, firm optional practice, role/earnings separation, opt-in/out, raw-input allowlists, durable receipt, retries, duplicate prevention and failure-state tests.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
