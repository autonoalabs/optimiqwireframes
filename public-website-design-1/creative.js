'use strict';
// Buildless, progressive enhancement. No analytics, data collection or animation dependency.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const carouselControllers=[];
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
  const panels=[...carousel.querySelectorAll('[data-slide]')];
  const visuals=[...carousel.querySelectorAll('[data-visual]')];
  const briefs=[...carousel.querySelectorAll('[data-brief]')];
  const controls=[...carousel.querySelectorAll('[data-go]')];
  const pauseButton=carousel.querySelector('[data-slide-pause]');
  const stage=carousel.querySelector('.hero-stage');
  const duration=6000;
  let active=0,elapsed=0,last=0,userPaused=motionPreference.matches,hover=false,inView=true,raf=0;
  const animations=new Set();
  let imageMotion=null,firstActivation=true;
  function syncImageMotion(){if(!imageMotion)return;if(userPaused||hover||!inView||document.hidden)imageMotion.pause();else imageMotion.play();}
  function animate(element,frames,options){
    if(motionPreference.matches||!element?.animate)return;
    const animation=element.animate(frames,options);animations.add(animation);
    animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));
    return animation;
  }
  function setProgress(value){controls[active].style.setProperty('--slide-progress',String(value));}
  function syncPause(){pauseButton.disabled=motionPreference.matches;pauseButton.setAttribute('aria-label',motionPreference.matches?'Automatic slideshow disabled by reduced motion':userPaused?'Play slideshow':'Pause slideshow');pauseButton.setAttribute('aria-pressed',String(userPaused));pauseButton.querySelector('[data-pause-label]').textContent=motionPreference.matches?'Static':userPaused?'Play':'Pause';}
  function activate(index,manual=false){
    active=(index+panels.length)%panels.length;elapsed=0;last=0;
    const initial=firstActivation;firstActivation=false;
    animations.forEach(a=>a.cancel());animations.clear();
    panels.forEach((panel,i)=>{panel.hidden=i!==active;panel.inert=i!==active;panel.setAttribute('aria-hidden',String(i!==active));});
    visuals.forEach((visual,i)=>{visual.hidden=i!==active;visual.inert=i!==active;visual.setAttribute('aria-hidden',String(i!==active));});
    briefs.forEach((brief,i)=>brief.hidden=i!==active);
    controls.forEach((control,i)=>{control.setAttribute('aria-pressed',String(i===active));control.style.setProperty('--slide-progress',i===active?'0':'0');});
    carousel.querySelector('[data-slide-number]').textContent=String(active+1).padStart(2,'0');
    if(manual){userPaused=true;carousel.querySelector('[data-slide-status]').textContent=`Slide ${active+1} of ${panels.length}: ${panels[active].querySelector('h1').textContent}`;}
    const children=panels[active].querySelectorAll('.eyebrow,h1,.hero-copy,.btn');
    if(initial){children.forEach(child=>{child.style.opacity='1';child.style.transform='none';});visuals[active].style.opacity='1';visuals[active].style.clipPath='none';imageMotion=null;}
    else{children.forEach((child,i)=>animate(child,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,delay:i*35,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}));animate(visuals[active],[{opacity:.78,clipPath:'inset(0 0 0 5%)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});imageMotion=animate(visuals[active].querySelector('img'),[{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:duration,easing:'linear'});}
    syncImageMotion();
    syncPause();
  }
  function frame(now){
    if(!userPaused&&!hover&&inView&&!document.hidden&&!motionPreference.matches){if(last)elapsed+=Math.min(now-last,100);setProgress(Math.min(elapsed/duration,1));if(elapsed>=duration)activate(active+1);}
    last=now;raf=requestAnimationFrame(frame);
  }
  controls.forEach((button,i)=>{
    button.addEventListener('click',()=>activate(i,true));
    button.addEventListener('keydown',event=>{if(event.ctrlKey||event.metaKey||event.altKey)return;let next;if(event.key==='ArrowRight')next=(i+1)%panels.length;if(event.key==='ArrowLeft')next=(i-1+panels.length)%panels.length;if(event.key==='Home')next=0;if(event.key==='End')next=panels.length-1;if(next!==undefined){event.preventDefault();activate(next,true);controls[next].focus();}});
  });
  carousel.querySelector('[data-slide-prev]').addEventListener('click',()=>activate(active-1,true));
  carousel.querySelector('[data-slide-next]').addEventListener('click',()=>activate(active+1,true));
  pauseButton.addEventListener('click',()=>{userPaused=!userPaused;last=0;syncImageMotion();syncPause();});
  stage.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hover=true;syncImageMotion();}});
  stage.addEventListener('pointerleave',()=>{hover=false;last=0;syncImageMotion();});
  carousel.addEventListener('focusin',event=>{if(event.target===pauseButton)return;userPaused=true;syncImageMotion();syncPause();});
  let touch=null;
  stage.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'&&!event.target.closest('a,button'))touch={x:event.clientX,y:event.clientY};});
  stage.addEventListener('pointerup',event=>{if(!touch)return;const dx=event.clientX-touch.x,dy=event.clientY-touch.y;touch=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)activate(active+(dx<0?1:-1),true);});
  stage.addEventListener('pointercancel',()=>touch=null);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;last=0;syncImageMotion();},{threshold:.1}).observe(carousel);
  document.addEventListener('visibilitychange',()=>{last=0;syncImageMotion();});
  motionPreference.addEventListener('change',()=>{if(motionPreference.matches){userPaused=true;animations.forEach(a=>a.cancel());animations.clear();}syncPause();});
  activate(0);raf=requestAnimationFrame(frame);
  carouselControllers.push({pause(){userPaused=true;syncPause();}});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);animations.forEach(a=>a.cancel());imageMotion=null;});
  window.addEventListener('pageshow',event=>{if(event.persisted){last=0;raf=requestAnimationFrame(frame);}});
});

// Reveal motion is optional; all content is readable if JS or browser APIs are unavailable.
if('IntersectionObserver' in window&&!motionPreference.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    observer.unobserve(entry.target);
    if(!motionPreference.matches&&entry.target.animate)entry.target.animate([{opacity:.15,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.22,1,.36,1)'});
  }),{threshold:.08});
  document.querySelectorAll('.section-head,.photo-paths article,.cards article,.steps article,.expertise-grid details,.story-layout,.calculator,.guide').forEach(element=>observer.observe(element));
}
