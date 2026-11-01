(function(root){
 'use strict';
 function keys(config,a){return config.audiences[a].inputs.map(f=>f.name);}
 // Public prototype only. Production must calculate on the server using approved benchmarks.
 const preview=typeof module==='object'&&module.exports?require('./benchmark-preview.js'):root.OptimIQBenchmarkPreview;
 function validField(f,v){if(f.choices)return f.choices.some(o=>o.value===v);if(typeof v!=='number'||!Number.isFinite(v))return false;if(f.discrete)return f.values.includes(v);return Number.isInteger(v)&&v>=f.min&&v<=f.max&&(v-f.min)%f.step===0;}
 function validScenario(config,a,values){return Boolean(values)&&config.audiences[a].inputs.every(f=>validField(f,values[f.name]));}
 function calculate(a,v){return preview.calculate(a,v);}
 function snapshot(config,a,values){if(!validScenario(config,a,values))throw new Error('Invalid public scenario');return Object.fromEntries(keys(config,a).map(k=>[k,values[k]]));}
 function fields(config,a,role){
  if(a!=='expert')return config.audiences[a].sections.flatMap(s=>s.fields);
  const profile=config.audiences.expert.roleProfiles[role];if(!profile)throw new Error('Choose a valid professional role');return profile.sections.flatMap(s=>s.fields);
 }
 function buildPayload(config,a,values,scenario,attach,source){
  const definition=config.audiences[a],role=a==='expert'?values.role:null;
  const payload={audience:a,form_version:config.version,source_page:source.page,source_component:source.component};
  if(a==='expert')payload.role=role;
  for(const f of fields(config,a,role)){
   const value=values[f.name];
   if(f.type==='file'){
    if(Array.isArray(value)&&value.length)payload[f.name]=value.slice(0,f.maxFiles||1).map(file=>({name:String(file.name).slice(0,255),size:Number(file.size),type:String(file.type||'').slice(0,120)}));
   }else if(f.type==='checkboxes'){
    const allowed=new Set((f.options||[]).map(o=>o.value)),items=Array.isArray(value)?[...new Set(value.filter(v=>allowed.has(v)))]:[];
    if(items.length)payload[f.name]=items;
   }else{
    const text=typeof value==='string'?value.trim():'';
    if(text&&(!(f.type==='select'||f.type==='radios')||(f.options||[]).some(o=>o.value===text)))payload[f.name]=text;
   }
  }
  payload[definition.attachmentFlag]=Boolean(attach&&scenario&&validScenario(config,a,scenario));
  if(payload[definition.attachmentFlag])payload.scenario=snapshot(config,a,scenario);
  return payload;
 }
 function conceptNotePayload(config,a,email,source){
  const guide=config.guides[a];if(!guide?.approved||!guide.url)throw new Error('Concept note unavailable');
  email=String(email||'').trim();if(!email||email.length>254||!/^[^\s@]+@[^\s@]+$/.test(email))throw new Error('Invalid email');
  return {audience:a,lead_type:'concept_note',concept_note_id:guide.id,email,form_version:config.version,source_page:source.page,source_component:source.component};
 }
 function nextStep(a,result){if(!result||!result.receipt||!result.reference)return null;const headings={guide:'Your guide is ready.',client:'Thank you. We have received your project enquiry.',expert:'Thank you. We have received your application.',firm:'Thank you. We have received your partnership enquiry.',general:'Thank you. We have received your message.'};let text={guide:'Download your copy below. This guide request is separate from an application or enquiry.',client:'Our client team will review your information and contact you to discuss your project requirements and pricing.',expert:'Your application has been received for review.',firm:'Our partnerships team will review your information and contact you to discuss partnership terms.',general:'Our team will review your enquiry and reply to your email address.'}[a];if(a==='expert'&&result.verification==='queued')text='Check your email to verify your address and continue your profile.';if(a==='expert'&&result.verification==='failed')text='Your application has been received, but we could not send the verification email. Please contact our team for help continuing.';return {heading:headings[a],text};}
 const api={fields,conceptNotePayload,keys,validField,validScenario,calculate,snapshot,buildPayload,nextStep};if(typeof module==='object'&&module.exports)module.exports=api;else root.OptimIQPublic=Object.freeze(api);
})(typeof globalThis!=='undefined'?globalThis:this);
