'use strict';
document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
const start=document.querySelector('.start>button');
const options=document.querySelector('#start-menu');
function closeNav(restore=false){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');if(restore)menu?.focus();}
function closeStart(){options?.setAttribute('hidden','');start?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';closeStart();nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
start?.addEventListener('click',()=>{const open=start.getAttribute('aria-expanded')!=='true';closeNav();options.hidden=!open;start.setAttribute('aria-expanded',String(open));});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header')){closeNav();closeStart();}if(event.target.closest('nav a'))closeNav();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(menu?.getAttribute('aria-expanded')==='true')closeNav(true);if(start?.getAttribute('aria-expanded')==='true'){closeStart();start.focus();}}});
document.addEventListener('focusin',event=>{if(!event.target.closest('.site-header')){closeNav();closeStart();}});
matchMedia('(min-width:1181px)').addEventListener('change',event=>{if(event.matches){closeNav();closeStart();}});
document.querySelectorAll('[data-carousel]').forEach(carousel=>{const panels=[...carousel.querySelectorAll('[data-slide]')];const buttons=[...carousel.querySelectorAll('[data-go]')];function activate(index){panels.forEach((p,i)=>p.hidden=i!==index);buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));carousel.querySelector('[data-slide-status]').textContent=`Slide ${index+1} of ${panels.length}`;}
 buttons.forEach((button,i)=>{button.addEventListener('click',()=>activate(i));button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(i+1)%buttons.length;if(event.key==='ArrowLeft')target=(i-1+buttons.length)%buttons.length;if(target!==undefined){event.preventDefault();activate(target);buttons[target].focus();}});});});
const dialog=document.querySelector('#asset-dialog');
document.querySelectorAll('[data-asset]').forEach(button=>button.addEventListener('click',()=>{if(!dialog)return;dialog.querySelector('#asset-message').textContent=button.dataset.asset;dialog.showModal();}));
dialog?.querySelectorAll('.dialog-close').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog?.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
document.querySelector('[data-demo-form]')?.addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const status=form.querySelector('.form-status');status.textContent='Preview complete. Your message has not been sent or saved. Please use the email or phone details below to contact OptimIQ.';status.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
const downloadDialog=document.querySelector('#download-dialog');
let notePath='';
document.querySelectorAll('[data-note]').forEach(button=>button.addEventListener('click',()=>{notePath=button.dataset.note;downloadDialog.querySelector('form').reset();downloadDialog.querySelector('[role=status]').textContent='';downloadDialog.showModal();}));
downloadDialog?.querySelector('.dialog-close').addEventListener('click',()=>downloadDialog.close());
downloadDialog?.addEventListener('click',event=>{const r=downloadDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)downloadDialog.close();});
downloadDialog?.addEventListener('close',()=>{downloadDialog.querySelector('form').reset();notePath='';});
document.querySelector('[data-download-form]')?.addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity()||!notePath)return;const link=document.createElement('a');link.href=notePath;link.download=notePath.split('/').pop();document.body.append(link);link.click();link.remove();event.currentTarget.querySelector('[role=status]').textContent='Your PDF download has started. Your email has not been sent or saved.';event.currentTarget.reset();});
