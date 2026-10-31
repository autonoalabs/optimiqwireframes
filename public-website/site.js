'use strict';
const menuButton=document.querySelector('#menu-toggle'),menu=document.querySelector('#navigation');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded',String(menu.classList.toggle('open')));});
document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();menuButton.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
const goalInput=document.querySelector('#billing-goal'),feeInput=document.querySelector('#daily-fee');
const number=new Intl.NumberFormat('en-US',{maximumFractionDigits:1}),compact=new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:1});
const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const format=n=>n<.1?'<0.1':n>9999?compact.format(n):number.format(n);
let plan='';
function update(){
 document.querySelector('#copy-status').textContent='';
 const valid=[goalInput,feeInput].map(input=>{const ok=input.validity.valid&&Number.isFinite(input.valueAsNumber);input.setAttribute('aria-invalid',String(!ok));return ok;}).every(Boolean);
 document.querySelector('#copy-plan').disabled=!valid;
 if(!valid){document.querySelector('#days-result').textContent='—';document.querySelector('#month-result').textContent='—';document.querySelector('#planner-message').textContent='Enter positive values in both fields to explore your scenario.';plan='';return;}
 const goal=goalInput.valueAsNumber,fee=feeInput.valueAsNumber,days=goal/fee;
 document.querySelector('#days-result').textContent=format(days);document.querySelector('#month-result').textContent=format(days/12);
 document.querySelector('#planner-message').textContent=days>260?'This exceeds 260 billable days. Revisit your inputs and allow for non-billable time.':'A scenario based on your inputs. Allow for non-billable time and actual project demand.';
 plan=`My consulting workload scenario: ${money.format(goal)} annual gross billing goal at my assumed ${money.format(fee)}/day requires ${format(days)} billable days per year (${format(days/12)} per month). This calculation is not an OptimIQ fee quote, earnings forecast or promise of work. Fees, expenses and taxes are excluded.`;
}
[goalInput,feeInput].forEach(i=>i.addEventListener('input',update));document.querySelector('#planner').addEventListener('submit',e=>e.preventDefault());
document.querySelector('#copy-plan').addEventListener('click',async()=>{if(!plan)return;try{await navigator.clipboard.writeText(plan);document.querySelector('#copy-status').textContent='Your plan has been copied.';}catch{document.querySelector('#copy-status').textContent=plan;}});
document.querySelector('#year').textContent=new Date().getFullYear();update();
