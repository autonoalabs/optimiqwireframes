(function(root){
 'use strict';
 function keys(config,a){return config.audiences[a].inputs.map(f=>f.name);}
 // Public prototype only. Production must calculate on the server using approved benchmarks.
 const preview=typeof module==='object'&&module.exports?require('./benchmark-preview.js'):root.OptimIQBenchmarkPreview;
 function validField(f,v){if(f.choices)return f.choices.some(o=>o.value===v);if(typeof v!=='number'||!Number.isFinite(v))return false;if(f.discrete)return f.values.includes(v);return Number.isInteger(v)&&v>=f.min&&v<=f.max&&(v-f.min)%f.step===0;}
 function validScenario(config,a,values){return Boolean(values)&&config.audiences[a].inputs.every(f=>validField(f,values[f.name]));}
 function calculate(a,v){return preview.calculate(a,v);}
 function snapshot(config,a,values){if(!validScenario(config,a,values))throw new Error('Invalid public scenario');return Object.fromEntries(keys(config,a).map(k=>[k,values[k]]));}
 function buildPayload(config,a,values,scenario,attach,source){
  const definition=config.audiences[a];const payload={audience:a,form_version:config.version,source_page:source.page,source_component:source.component};
  for(const f of definition.fields){const value=String(values[f.name]||'').trim();if(value)payload[f.name]=value;}
  if(a==='expert'&&payload.role&&!config.roles.includes(payload.role))delete payload.role;
  if(a==='firm'){payload.new_project_opportunities=values.new_project_opportunities===true;payload.additional_consultant_capacity=values.additional_consultant_capacity===true;}
  payload[definition.attachmentFlag]=Boolean(attach&&scenario&&validScenario(config,a,scenario));
  if(payload[definition.attachmentFlag])payload.scenario=snapshot(config,a,scenario);
  return payload;
 }
 function nextStep(a,result){if(!result||!result.receipt||!result.reference)return null;const headings={guide:'Your guide is ready.',client:'Thank you. We have received your project enquiry.',expert:'Thank you. We have received your application.',firm:'Thank you. We have received your partnership enquiry.',general:'Thank you. We have received your message.'};let text={guide:'Download your copy below. This guide request is separate from an application or enquiry.',client:'Our client team will review your information and contact you to discuss your project requirements and pricing.',expert:'Your application has been received for review.',firm:'Our partnerships team will review your information and contact you to discuss partnership terms.',general:'Our team will review your enquiry and reply to your email address.'}[a];if(a==='expert'&&result.verification==='queued')text='Check your email to verify your address and continue your profile.';if(a==='expert'&&result.verification==='failed')text='Your application has been received, but we could not send the verification email. Please contact our team for help continuing.';return {heading:headings[a],text};}
 const api={keys,validField,validScenario,calculate,snapshot,buildPayload,nextStep};if(typeof module==='object'&&module.exports)module.exports=api;else root.OptimIQPublic=Object.freeze(api);
})(typeof globalThis!=='undefined'?globalThis:this);
