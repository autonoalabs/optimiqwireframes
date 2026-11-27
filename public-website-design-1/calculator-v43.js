(() => {
'use strict';
if (!document.querySelector('.workbench')) return;
const MODEL = {
  clients: { budgets:[50e3,75e3,100e3,150e3,200e3,250e3,300e3,400e3,500e3,750e3,1e6,1.5e6,2e6,3e6,5e6],
             keep:{global:0.28,boutique:0.12,mix:0.20}, risk:{strategy:0.08,transformation:0.14,delivery:0.11} },
  experts: { rates:[300,400,500,600,750,900,1000,1200,1500,2000,2500,3000],
             target:{consultant:160,advisor:120,pm:180}, fill:0.5,
             levels:[[0,"Associate",0],[5,"Professional",0.05],[10,"Senior Practitioner",0.10],[15,"Principal",0.15]] },
  firms:   { values:[25e3,50e3,75e3,100e3,150e3,200e3,250e3,300e3,400e3,500e3,750e3,1e6,1.5e6,2e6],
             share:{brand:1,bench:0,both:0.5}, a:0.25, b:0.60 },
  band: 0.15
};

/* ---------- display helpers (these stay in the browser in production) */
function fmt(n){ n=Math.round(n);
  if (Math.round(n/1e3)>=1000){ const t=Math.round(n/1e5); return t>=100?'$'+Math.round(n/1e6)+'M':'$'+(t/10)+'M'; }
  if (n>=1e3) return '$'+Math.round(n/1e3)+'K'; return '$'+n; }
function nice(n){ if(n<=0) return 0; const b=Math.pow(10,Math.floor(Math.log10(n))); const p=Math.max(1,(n>=2*b?5:1)*b/10); return Math.round(n/p)*p; }
function band(p){ return [nice(p*(1-MODEL.band)), nice(p*(1+MODEL.band))]; }
const rng = (r)=> r[0]===r[1]? fmt(r[0]) : fmt(r[0])+' – '+fmt(r[1]);

/* ---------- calculations (move to the server in production) */
function calcClients(i){ const B=MODEL.clients.budgets[i.budget];
  const keep=B*MODEL.clients.keep[i.firm], risk=B*MODEL.clients.risk[i.type];
  const r1=band(keep), r2=band(risk);
  return { budget:B, overhead:r1, risk:r2, total:[r1[0]+r2[0], r1[1]+r2[1]] }; }
function calcExperts(i){ const M=MODEL.experts, rate=M.rates[i.rate];
  let lv=M.levels[0]; for(const l of M.levels) if(i.years>=l[0]) lv=l;
  const extra=Math.max(0,Math.round((M.target[i.role]-i.days)*M.fill));
  const gain=(i.days+extra)*rate*(1+lv[2]) - i.days*rate;
  const d=extra>0?[Math.max(5,Math.round(extra*0.85/5)*5), Math.round(extra*1.15/5)*5]:[0,0];
  return { rate, level:lv[1], days:d, earn:band(gain) }; }
function calcFirms(i){ const M=MODEL.firms, V=M.values[i.value], s=M.share[i.why];
  const left=i.lost*V, back=i.lost*V*(s*M.a+(1-s)*M.b);
  const p=Math.max(1,Math.round(i.size/10));
  return { left, back:band(back), mandates:[Math.max(1,p-1), p+1] }; }

/* ---------- state + rendering */
const $=id=>document.getElementById(id);
const S={ clients:{budget:8,firm:'global',type:'transformation'},
          experts:{role:'consultant',years:12,days:90,rate:4},
          firms:{size:25,lost:8,why:'both',value:6} };
const OUT={};
let liveT;
function say(t){ clearTimeout(liveT); liveT=setTimeout(()=>{$('live').textContent=t;},500); }

function renderClients(){ const r=calcClients(S.clients); OUT.clients=r;
  $('c-budget-v').textContent=fmt(r.budget);
  $('c-budget').setAttribute('aria-valuetext',fmt(r.budget));
  const who={global:'a big-name global firm',boutique:'a regional boutique',mix:'a consulting firm'}[S.clients.firm];
  $('c-verdict').innerHTML='On a <b>'+fmt(r.budget)+'</b> project with '+who+', part of the fee pays for more than the work.';
  $('c-big').textContent=rng(r.total);
  say('You could keep '+rng(r.total)+' on this project.'); }
function renderExperts(){ const r=calcExperts(S.experts); OUT.experts=r; const i=S.experts;
  $('e-years-v').textContent=i.years>=30?'30+':i.years; $('e-days-v').textContent=i.days;
  $('e-rate-v').textContent='$'+r.rate.toLocaleString('en-US'); $('e-rate').setAttribute('aria-valuetext','$'+r.rate);
  const zero=r.earn[1]<=0;
  $('e-verdict').innerHTML= i.days>=MODEL.experts.target[i.role] ? 'You are already well booked. Better projects can still lift your rate.' : 'You billed <b>'+i.days+' days</b> last year. A steady flow of verified projects could fill more of your year.';
  $('e-big').textContent= zero ? 'Better projects' : '+'+rng(r.earn);
  $('e-big-l').textContent= zero ? 'and a clear path to grow, starting today' : 'a year you could add with OptimIQ projects';
  $('e-r1').textContent= r.days[1]===0?'—':r.days[0]+'–'+r.days[1];
  $('e-r2').textContent=r.level;
  say(zero?'You could start as '+r.level+'.':'You could add '+rng(r.earn)+' a year, starting as '+r.level+'.'); }
function renderFirms(){ const r=calcFirms(S.firms); OUT.firms=r; const i=S.firms, V=MODEL.firms.values[i.value];
  $('f-size-v').textContent=i.size; $('f-lost-v').textContent=i.lost;
  $('f-value-v').textContent=fmt(V); $('f-value').setAttribute('aria-valuetext',fmt(V));
  const m=r.mandates[0]+'–'+r.mandates[1];
  if(i.lost===0){ $('f-verdict').textContent="You didn't lose or turn down any projects last year.";
    $('f-big').textContent='+'+m+' projects'; $('f-big-l').textContent='a year you could bid on as an OptimIQ partner firm'; }
  else { $('f-verdict').innerHTML='Last year your firm missed about <b>'+fmt(r.left)+'</b> of work.';
    $('f-big').textContent=rng(r.back); $('f-big-l').textContent='a year you could win back as an OptimIQ partner firm'; }
  $('f-r1').textContent=m+' a year';
  say(i.lost===0?'You could bid on '+m+' more projects a year.':'You could win back '+rng(r.back)+' a year.'); }
const R={clients:renderClients,experts:renderExperts,firms:renderFirms};

/* inputs */
[['c-budget','clients','budget'],['e-years','experts','years'],['e-days','experts','days'],['e-rate','experts','rate'],
 ['f-size','firms','size'],['f-lost','firms','lost'],['f-value','firms','value']].forEach(([id,k,f])=>{
  if($(id)) $(id).addEventListener('input',e=>{S[k][f]=+e.target.value; R[k]();}); });
document.querySelectorAll('.chips').forEach(g=>{ const [p,f]=g.dataset.group.split('-'); const k={c:'clients',e:'experts',f:'firms'}[p];
  const field={'c-firm':'firm','c-type':'type','e-role':'role','f-why':'why'}[g.dataset.group];
  g.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return;
    g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
    S[k][field]=b.dataset.v; R[k](); }); });


if ($('c-budget')) renderClients(); if ($('e-years')) renderExperts(); if ($('f-size')) renderFirms();
})();
