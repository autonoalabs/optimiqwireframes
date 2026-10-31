(function(root){
 'use strict';
 // No configured transport means a preview. No request or successful receipt is fabricated.
 function createSubmissionService({transport=null,createId=()=>crypto.randomUUID()}={}){
  let logicalBody=null,requestId=null,inFlight=null,accepted=null;
  function invalidate(){if(inFlight)return;logicalBody=null;requestId=null;accepted=null;}
  function submit(payload){
   if(inFlight)return inFlight;
   const body=JSON.stringify(payload);
   if(body!==logicalBody){logicalBody=body;requestId=createId();accepted=null;}
   if(accepted)return Promise.resolve(accepted);
   if(!transport)return Promise.resolve({status:'preview'});
   inFlight=(async()=>{try{const result=await Promise.resolve().then(()=>transport({...payload,request_id:requestId}));if(result?.status==='accepted'&&result.receipt===true&&typeof result.reference==='string'&&result.reference){accepted=result;return result;}if(result?.status==='validation')return {status:'validation',fields:result.fields||{}};if(result?.status==='throttled')return {status:'throttled'};return {status:'retry'};}catch{return {status:'retry'};}finally{inFlight=null;}})();
   return inFlight;
  }
  return {submit,invalidate};
 }
 if(typeof module==='object'&&module.exports)module.exports={createSubmissionService};else root.OptimIQSubmission=Object.freeze({createSubmissionService});
})(typeof globalThis!=='undefined'?globalThis:this);
