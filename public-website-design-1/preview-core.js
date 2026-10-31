/* Public arithmetic only. No assessment, scoring, margins or allocation rules. */
(function(root){
 'use strict';
 function clientDifference(days,current,target){const delta=days*(current-target);return {label:delta>0?'Estimated fee reduction':delta<0?'Estimated fee increase':'No fee difference ($0)',amount:Math.abs(delta)};}
 function buildApplication(a,values,confirmedScenario,attach){
  const fields=a==='client'?['fullName','organisation','email','phone']:a==='expert'?['fullName','email','experience','phone','linkedin']:['firmName','contactName','leadershipRole','email','practice','phone'];
  const payload=Object.fromEntries(fields.map(k=>[k,String(values[k]||'').trim()]));
  if(a==='firm')payload.interests=(values.interests||[]).filter(x=>['projects','capacity'].includes(x));
  if(attach&&confirmedScenario)payload.scenario={...confirmedScenario};
  return payload;
 }
 const api={clientDifference,buildApplication};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.OptimIQPublic=Object.freeze(api);
})(typeof globalThis!=='undefined'?globalThis:this);
