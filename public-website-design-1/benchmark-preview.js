/* Client-supplied PUBLIC PROTOTYPE benchmarks, Feedback 1, 2026-11-01.
 * Placeholder coefficients are for review. This static preview is inspectable.
 * Production: send validated answers to .NET and return only rounded ranges.
 * Never ship private CTQ weights, production benchmarks or scoring engines here.
 */
(function(root){
 'use strict';
 const MODEL={clients:{keep:{global:.28,boutique:.12,mix:.20},risk:{strategy:.08,transformation:.14,delivery:.11}},experts:{target:{consultant:160,advisor:120,pm:180},fill:.5,levels:[[0,'Associate',0],[5,'Consultant',.05],[10,'Senior Consultant',.10],[15,'Principal',.12],[20,'Expert Partner',.15]]},firms:{share:{brand:1,bench:0,both:.5},a:.25,b:.60},band:.15};
 function fmt(n){n=Math.round(n);if(Math.round(n/1000)>=1000){const t=Math.round(n/100000);return t>=100?'$'+Math.round(n/1000000)+'M':'$'+(t/10)+'M';}return n>=1000?'$'+Math.round(n/1000)+'K':'$'+n;}
 function nice(n){if(n<=0)return 0;const b=10**Math.floor(Math.log10(n)),p=Math.max(1,(n>=2*b?5:1)*b/10);return Math.round(n/p)*p;}
 const band=p=>[nice(p*(1-MODEL.band)),nice(p*(1+MODEL.band))];
 const range=r=>r[0]===r[1]?fmt(r[0]):fmt(r[0])+' – '+fmt(r[1]);
 const base="Illustrative estimate from OptimIQ's benchmark model, shown as a range. ";
 function calculate(a,v){
  if(a==='client'){
   const overhead=band(v.budget*MODEL.clients.keep[v.provider]),risk=band(v.budget*MODEL.clients.risk[v.project_type]),total=[overhead[0]+risk[0],overhead[1]+risk[1]],who={global:'a big-name global firm',boutique:'a regional boutique',mix:'a consulting firm'}[v.provider];
   return {headline:range(total),label:'value you could keep on this project',verdict:`On a ${fmt(v.budget)} project with ${who}, part of the fee pays for more than the work.`,total,overhead,risk,details:[{label:'Overhead you stop paying',value:range(overhead),description:'No brand premium, partner layers or big-firm overhead.'},{label:'Value protected from delivery risk',value:range(risk),description:'Experts verified on what they have actually delivered.'}],disclaimer:base+'Not a quote or a guarantee. Your actual figures depend on your project.'};
  }
  if(a==='expert'){
   const m=MODEL.experts,lv=m.levels.filter(l=>v.years>=l[0]).at(-1),extra=Math.max(0,Math.round((m.target[v.professional_role]-v.days)*m.fill)),gain=(v.days+extra)*v.daily_rate*(1+lv[2])-v.days*v.daily_rate,days=extra>0?[Math.max(5,Math.round(extra*.85/5)*5),Math.round(extra*1.15/5)*5]:[0,0],earn=band(gain);
   return {headline:earn[1]>0?'+'+range(earn):'Better projects',label:earn[1]>0?'a year you could add with OptimIQ projects':'and a clear path to grow, starting today',verdict:v.days>=m.target[v.professional_role]?'You are already well booked. Better projects can still lift your rate.':`You billed ${v.days} days last year. A steady flow of verified projects could fill more of your year.`,total:earn,days,level:lv[1],details:[{label:'Extra project days a year',value:days[1]>0?days[0]+'–'+days[1]:'—',description:'Matched to your verified expertise, with clients in the region and worldwide.'},{label:'Where you could start',value:lv[1],description:'A clear career path, working alongside international experts.'}],disclaimer:base+'Not an offer of work or a guarantee of earnings. Your starting level is confirmed after evaluation.'};
  }
  if(a!=='firm')throw new Error('Unknown audience');
  const m=MODEL.firms,left=v.missed_projects*v.average_project_value,s=m.share[v.reason],back=band(left*(s*m.a+(1-s)*m.b)),p=Math.max(1,Math.round(v.practitioners/10)),mandates=[Math.max(1,p-1),p+1],zero=v.missed_projects===0;
  return {headline:zero?'+'+mandates[0]+'–'+mandates[1]+' mandates':range(back),label:zero?'a year you could bid on as an OptimIQ partner firm':'a year you could win back as an OptimIQ partner firm',verdict:zero?"You didn't lose or turn down any mandates last year.":`Last year you left about ${fmt(left)} of mandates on the table.`,total:back,left,mandates,zero,details:[{label:'Pre-qualified mandates to bid on',value:mandates[0]+'–'+mandates[1]+' a year',description:'Client opportunities matched to your strengths.'},{label:'Extra fixed payroll needed',value:'$0',description:'Verified experts join your team only when a mandate needs them.'}],disclaimer:base+'Not a guarantee of work or revenue. You keep your brand and your clients.'};
 }
 const api=Object.freeze({calculate});if(typeof module==='object'&&module.exports)module.exports=api;else root.OptimIQBenchmarkPreview=api;
})(typeof globalThis!=='undefined'?globalThis:this);
