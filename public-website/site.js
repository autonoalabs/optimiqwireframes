'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');
function closeMenu() { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }
menuButton.addEventListener('click', () => {const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open));});
document.addEventListener('click', e => {if (!menu.contains(e.target) && !menuButton.contains(e.target)) closeMenu();});
document.addEventListener('keydown', e => {if (e.key === 'Escape') { const wasOpen = menu.classList.contains('open'); closeMenu(); if(wasOpen) menuButton.focus(); }});
matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
const tabs = [...document.querySelectorAll('[data-tab]')];
function selectAudience(name, focus = false) {
  if (!['client','consultant','firm'].includes(name)) return;
  tabs.forEach(t => {const active = t.dataset.tab === name; t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.querySelector(`#panel-${t.dataset.tab}`).hidden=!active;});
  if(focus) document.querySelector(`#tab-${name}`).focus();
}
tabs.forEach((t, i) => {
  t.addEventListener('click',()=>selectAudience(t.dataset.tab));
  t.addEventListener('keydown', e => {let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectAudience(tabs[next].dataset.tab,true);}});
});
document.querySelectorAll('[data-audience]').forEach(a => a.addEventListener('click',()=>{selectAudience(a.dataset.audience);closeMenu();}));
const goalInput = document.querySelector('#billing-goal');
const feeInput = document.querySelector('#daily-fee');
const formatter = new Intl.NumberFormat('en-US',{maximumFractionDigits:1});
const compactFormatter = new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1});
const formatDays = n => n < .1 ? '<0.1' : n > 9999 ? compactFormatter.format(n) : formatter.format(n);
const money = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
let currentPlan = '';
function updatePlan() {
  document.querySelector('#copy-status').textContent='';
  const goal=goalInput.valueAsNumber,fee=feeInput.valueAsNumber;
  const valid=[goalInput,feeInput].map(input=>{const ok=input.validity.valid&&Number.isFinite(input.valueAsNumber);input.setAttribute('aria-invalid',String(!ok));return ok;}).every(Boolean);
  const copyButton=document.querySelector('#copy-plan');
  if(!valid){document.querySelector('#days-result').textContent='—';document.querySelector('#month-result').textContent='—';document.querySelector('#planner-message').textContent='Enter positive values within the supported range for both fields.';document.querySelector('#workload-fill').style.width='0';copyButton.disabled=true;currentPlan='';return;}
  const days=goal/fee,monthly=days/12;
  document.querySelector('#days-result').textContent=formatDays(days);
  document.querySelector('#month-result').textContent=formatDays(monthly);
  document.querySelector('#workload-fill').style.width=`${Math.min(days/260*100,100)}%`;
  document.querySelector('#planner-message').textContent=days>260?'This scenario exceeds 260 billable days. Revisit your fee or goal and allow for non-billable time.':'A scenario based on your inputs. Allow for non-billable time and actual project demand.';
  currentPlan=`My consulting workload scenario: ${money.format(goal)} annual gross billing goal at my assumed ${money.format(fee)}/day requires ${formatter.format(days)} billable days per year (${formatter.format(monthly)} per month). This is a user-input calculation, not an OptimIQ rate quote, earnings forecast or promise of work. Fees, expenses and taxes are excluded.`;
  copyButton.disabled=false;
}
[goalInput,feeInput].forEach(input=>input.addEventListener('input',updatePlan));
document.querySelector('#planner').addEventListener('submit',e=>e.preventDefault());
document.querySelector('#copy-plan').addEventListener('click',async()=>{if(!currentPlan)return;try{await navigator.clipboard.writeText(currentPlan);document.querySelector('#copy-status').textContent='Your plan has been copied.';}catch{document.querySelector('#copy-status').textContent=currentPlan;}});
document.querySelector('#year').textContent=new Date().getFullYear();
updatePlan();
