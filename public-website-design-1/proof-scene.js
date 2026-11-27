'use strict';
// Owns slide-local step controls and the lifecycle classes for proof scenes.
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ar = {
    'From evidence to outcome':'من الأدلة إلى النتيجة','Evidence':'الأدلة','Back':'السابق','Next':'التالي',
    'Previous stage':'المرحلة السابقة','Next stage':'المرحلة التالية','Play flow':'تشغيل التسلسل','Pause flow':'إيقاف التسلسل مؤقتاً',
    'Proof flow controls':'عناصر التحكم في تسلسل الأدلة','Stage':'المرحلة','of':'من',
    'CV':'السيرة الذاتية','Experience evidence':'أدلة الخبرة','Reviewed':'تمت المراجعة','Three checks':'ثلاثة معايير',
    'Knowledge · behaviour · client results':'المعرفة · السلوك · نتائج العملاء','Verified':'تم التحقق','Opportunity':'فرصة','Relevant role and need':'ملاءمة الدور والاحتياج',
    'Three profiles shortlisted':'تم إعداد قائمة مختصرة بثلاثة ملفات','Capacity gap':'فجوة في القدرة الاستيعابية','Specialist profiles matched':'تمت مطابقة ملفات الخبراء','Ready team':'فريق جاهز',
    'Project need':'احتياج المشروع','Scope clarified':'تم توضيح النطاق','Experience':'الخبرة','Evidence reviewed':'تمت مراجعة الأدلة',
    'Verified fit':'ملاءمة موثقة','Expertise needed':'الخبرة المطلوبة','Role match':'مطابقة الدور','Right expert introduced':'تقديم الخبير المناسب',
    'Profile':'الملف المهني','Verified expert':'خبير موثوق','Requirement':'المتطلبات','Fit checked':'تم التحقق من الملاءمة',
    'Project brief':'موجز المشروع','Relevant evidence':'أدلة ذات صلة','Confident introduction':'تقديم بثقة','Verified profile':'ملف موثوق',
    'Knowledge · behaviour · results':'المعرفة · السلوك · النتائج','Evidence-led standing':'مكانة تستند إلى الأدلة','Career level':'المستوى المهني',
    'Assessed results':'نتائج خضعت للتقييم','Clear next step':'خطوة تالية واضحة','Expert profile':'ملف الخبير','Project fit':'ملاءمة المشروع',
    'Better-matched opportunity':'فرصة أكثر ملاءمة','Regional reach':'انتشار إقليمي','Cross-border opportunities':'فرص عابرة للحدود',
    'Client mandate':'تكليف العميل','Capacity reviewed':'تمت مراجعة القدرة الاستيعابية','Specialists shortlisted':'قائمة مختصرة بالخبراء',
    'Firm capability':'قدرات الشركة','Team strengthened':'تم تعزيز الفريق','Delivery-ready team':'فريق جاهز للتنفيذ',
    'Proposal':'عرض','Capability confirmed':'تم تأكيد القدرات','Stronger-fit opportunity':'فرصة أكثر ملاءمة','Client demand':'طلب العميل',
    'Available capacity':'القدرة المتاحة','Team gap':'فجوة في الفريق','Verified specialists':'خبراء موثوقون','Capacity added':'تمت إضافة القدرة المطلوبة',
    'Firm team':'فريق الشركة','Specialist match':'مطابقة الخبراء','Delivery capacity expanded':'تم توسيع القدرة على التنفيذ',
    'Verified standing':'مكانة موثقة','Project match':'مطابقة المشروع','Right expert introduced':'تقديم الخبير المناسب',
    'Verified match':'مطابقة موثقة','Local + global expertise':'خبرات محلية وعالمية','Opportunity introduced':'تم تقديم الفرصة',
    'Stronger-fit opportunity':'فرصة أنسب','Capacity strengthened':'تم تعزيز القدرة',
    'Capability fit':'ملاءمة القدرات','Clear path upward':'مسار واضح للتقدم','Client brief':'موجز العميل','Client outcomes checked':'تم التحقق من نتائج العملاء','Delivery team ready':'فريق جاهز للتنفيذ','Demand':'الطلب','Extra experts matched':'تمت مطابقة خبراء إضافيين','More work considered':'دراسة فرص عمل إضافية','Opportunity fit':'ملاءمة الفرصة','Project scope':'نطاق المشروع','Relevant match':'مطابقة مناسبة','Role fit':'ملاءمة الدور','Specialist capacity':'قدرات الخبراء','Team shaped to need':'فريق مصمم وفق الاحتياج','Verified profiles':'ملفات موثوقة'
  };
  const scenes = [...document.querySelectorAll('[data-proof-scene]')];
  let activeScene = null;
  function pauseCarousel(scene) {
    const button = scene.closest('[data-carousel]')?.querySelector('[data-slide-pause]');
    if (button && !button.disabled && button.getAttribute('aria-pressed') !== 'true') button.click();
  }
  function sync(scene, state = {}) {
    activeScene = scene || activeScene;
    scenes.forEach(item => {
      const active = item === activeScene;
      const motion = active && Boolean(state.motion) && !reducedMotion.matches;
      item.classList.toggle('proof-active', motion);
      item.classList.toggle('proof-paused', active && Boolean(state.paused));
      item.dataset.proofState = active ? (motion ? 'sequencing' : 'settled') : 'idle';
    });
  }
  function initialise(scene) {
    const stages = [...scene.querySelectorAll('[data-proof-step]')];
    const prev = scene.querySelector('[data-proof-prev]');
    const next = scene.querySelector('[data-proof-next]');
    const play = scene.querySelector('[data-proof-play]');
    const status = scene.querySelector('[data-proof-status]');
    let position = 0, timer = 0, playing = false;
    const count = stages.length;
    function language() { return document.documentElement.lang === 'ar' ? 'ar' : 'en'; }
    function paint() {
      stages.forEach((stage, i) => { stage.dataset.current = String(i === position); stage.dataset.complete = String(i < position); stage.setAttribute('aria-current', i === position ? 'step' : 'false'); const marker=stage.querySelector('.proof-stage-no'); if(marker){marker.dataset.stepLabel=String(i+1).padStart(2,'0');marker.textContent=i<position?'✓':marker.dataset.stepLabel;} });
      prev.disabled = position === 0;
      next.disabled = position === count - 1;
      const arMode = language() === 'ar';
      status.textContent = arMode ? `المرحلة ${position + 1} من ${count}` : `Stage ${position + 1} of ${count}`;
      status.setAttribute('aria-label', status.textContent);
      play.textContent = arMode ? (playing ? 'إيقاف مؤقت' : 'تشغيل التسلسل') : (playing ? 'Pause flow' : 'Play flow');
      play.setAttribute('aria-pressed', String(playing));
    }
    function stop() { playing = false; clearInterval(timer); timer = 0; paint(); }
    function step(delta) { position = Math.max(0, Math.min(count - 1, position + delta)); paint(); if (position === count - 1) stop(); }
    prev.addEventListener('click', () => { pauseCarousel(scene); stop(); step(-1); });
    next.addEventListener('click', () => { pauseCarousel(scene); stop(); step(1); });
    play.addEventListener('click', () => {
      pauseCarousel(scene);
      if (playing) { stop(); return; }
      if (position === count - 1) position = 0;
      playing = true; paint();
      timer = setInterval(() => step(1), 1200);
    });
    scene.querySelectorAll('[data-proof-step]').forEach(node => {
      if (!node.matches('button')) { node.setAttribute('tabindex','0'); node.setAttribute('role','group'); }
      node.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); pauseCarousel(scene); stop(); step(1); }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); pauseCarousel(scene); stop(); step(-1); }
        if (event.key === 'Home') { event.preventDefault(); pauseCarousel(scene); stop(); position=0; paint(); }
        if (event.key === 'End') { event.preventDefault(); pauseCarousel(scene); stop(); position=count-1; paint(); }
      });
    });
    scene.dataset.proofTotal = String(count);
    paint();
  }
  scenes.forEach(initialise);
  function localise() {
    const isArabic = document.documentElement.lang === 'ar';
    scenes.forEach(scene => {
      const kicker = scene.querySelector('.proof-kicker');
      const evidence = scene.querySelector('.proof-evidence > span:first-child');
      const evidenceCopy=scene.querySelector('.proof-evidence-copy');
      if(!evidenceCopy.dataset.proofEnglish)evidenceCopy.dataset.proofEnglish=evidenceCopy.textContent;
      const prev=scene.querySelector('[data-proof-prev]'), next=scene.querySelector('[data-proof-next]');
      const play=scene.querySelector('[data-proof-play]');
      kicker.textContent = isArabic ? ar['From evidence to outcome'] : 'From evidence to outcome';
      evidence.textContent = isArabic ? ar.Evidence : 'Evidence';
      evidenceCopy.textContent=isArabic?(ar[evidenceCopy.dataset.proofEnglish]||evidenceCopy.dataset.proofEnglish):evidenceCopy.dataset.proofEnglish;
      prev.setAttribute('aria-label',isArabic?'المرحلة السابقة':'Previous stage');
      next.setAttribute('aria-label',isArabic?'المرحلة التالية':'Next stage');
      scene.querySelector('[data-proof-prev] span').textContent=isArabic?'السابق':'Back';
      scene.querySelector('[data-proof-next] span').textContent=isArabic?'التالي':'Next';
      scene.querySelectorAll('.proof-stage strong,.proof-stage small,.proof-result>span:last-child').forEach(node=>{
        if (!node.dataset.proofEnglish) node.dataset.proofEnglish=node.textContent;
        node.textContent=isArabic?(ar[node.dataset.proofEnglish]||node.dataset.proofEnglish):node.dataset.proofEnglish;
      });
      const flow=scene.querySelector('[data-flow-english]');
      const labels=flow.dataset.flowEnglish.split(' then ');
      flow.setAttribute('aria-label',isArabic?labels.map(label=>ar[label]||label).join(' ثم '):flow.dataset.flowEnglish);
      const controls=scene.querySelector('.proof-controls');
      controls.setAttribute('aria-label',isArabic?'عناصر التحكم في تسلسل الأدلة':'Proof flow controls');
      play.textContent=isArabic?(play.getAttribute('aria-pressed')==='true'?'إيقاف مؤقت':'تشغيل التسلسل'):(play.getAttribute('aria-pressed')==='true'?'Pause flow':'Play flow');
      const count=Number(scene.dataset.proofTotal), current=scene.querySelectorAll('[data-proof-step][data-current="true"]').length;
      const index=[...scene.querySelectorAll('[data-proof-step]')].findIndex(x=>x.dataset.current==='true')+1;
      const status=scene.querySelector('[data-proof-status]');
      status.textContent=isArabic?`المرحلة ${index} من ${count}`:`Stage ${index} of ${count}`;
      status.setAttribute('aria-label',status.textContent);
    });
  }
  document.addEventListener('site-language-change', localise);
  document.addEventListener('DOMContentLoaded', localise);
  reducedMotion.addEventListener('change', () => sync(activeScene, { motion: false, paused: true }));
  window.optimIqProofScene = { sync };
})();
