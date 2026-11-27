'use strict';

(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let arabic = {
    'Home':'الرئيسية','For clients':'للعملاء','For consultants':'للاستشاريين','For consulting firms':'للشركات الاستشارية',
    'OptimIQ Certified':'أوبتيم آي كيو المعتمد','About':'عن أوبتيم آي كيو','Contact':'تواصل معنا','Member login':'دخول الأعضاء',
    'Get started':'ابدأ الآن','Find your path':'اختر مسارك','Get in touch':'تواصل معنا',
    'Proven, Not Polished.':'الكفاءة الحقيقية، لا المظاهر.','Real results beat a nice-looking CV. Every time.':'النتائج الفعلية أهم من السيرة الذاتية اللامعة.',
    'The Right Expert. Without the Big-Firm Bill.':'الخبير المناسب، من دون تكاليف الشركات الكبرى.','Your Results Speak First.':'نتائجك تتحدث أولاً.',
    'Grow Bigger. Without Hiring More.':'نمُ أكثر، من دون توظيف إضافي.','Great CV. Wrong Fit?':'سيرة ذاتية مميزة، لكن هل هو الاختيار المناسب؟',
    'Proven Before You Meet Them.':'خبراء تم التحقق من نتائجهم قبل لقائك بهم.','Pay for Expertise, Not the Logo.':'استثمر في الخبرة، لا في الاسم التجاري.',
    'Great Work. Not Enough Projects?':'إنجازات مميزة، لكن هل تحتاج إلى فرص أكثر؟','Better Projects. Global Clients. A Clear Path Up.':'مشاريع أفضل، وعملاء عالميون، ومسار مهني واضح.',
    'Lost the Bid to a Bigger Name?':'هل خسرت العرض لصالح اسم أكبر؟','More of the Right Clients and Projects.':'عملاء ومشاريع أكثر ملاءمة لشركتك.',
    'Team Full? Say Yes Anyway.':'فريقك مشغول؟ أضف الخبرات التي تحتاج إليها.','Built for Decisions That Matter.':'خبرة تصنع الفارق في القرارات المهمة.',
    'Not Sure Where to Start? Start Here.':'لست متأكداً من أين تبدأ؟ ابدأ من هنا.','The right expert shapes what comes next.':'الخبير المناسب يصنع الفرق في خطوتك القادمة.',
    'Most Experts Are Chosen on Too Little Proof.':'اختيار الخبراء يحتاج إلى أدلة أقوى.','Every Expert Passes Three Checks.':'يمر كل خبير بثلاثة معايير للتحقق.',
    'Where Do You Fit?':'ما المسار المناسب لك؟','Nine Areas. One Clear Result.':'تسعة مجالات، ونتيجة واضحة.','We Verify the Talent. You Get the Result.':'نتحقق من الخبرة لتصل إلى النتائج.',
    'Pay for Expertise, Not Overhead.':'ادفع مقابل الخبرة، لا التكاليف الإضافية.','What Do You Do?':'ما دورك المهني؟',
    'A Clear Path Up.':'مسار مهني واضح.','Four Levels. One Standard.':'أربعة مستويات، ومعيار واحد.','Who Can Apply.':'من يمكنه التقديم؟',
    'Your questions, answered.':'إجابات عن أسئلتك.','Want the full picture?':'تعرّف على التفاصيل.',
    'Find Your Expert':'اعثر على خبيرك','Apply in 2 Minutes':'قدّم طلبك خلال دقيقتين','Register Your Firm':'سجّل شركتك',
    'Share Your Requirement':'أرسل متطلباتك','Start My Application':'ابدأ طلبي','Send Us a Message.':'أرسل لنا رسالة.',
    'Full name':'الاسم الكامل','Work email':'البريد الإلكتروني للعمل','Email':'البريد الإلكتروني','Phone / WhatsApp':'الهاتف أو واتساب',
    'Organization':'الجهة','Firm name':'اسم الشركة','Your name & title':'اسمك ومسمّاك الوظيفي','I need':'أحتاج إلى',
    'Area':'المجال','Main area':'المجال الرئيسي','What do you want to solve?':'ما التحدي الذي تريد معالجته؟',
    'What do you need?':'ما الذي تحتاج إليه؟','Firm size':'حجم الشركة','Anything else?':'تفاصيل إضافية',
    'I’m applying as':'أتقدم بصفتي','Years of experience':'سنوات الخبرة','LinkedIn profile':'رابط لينكدإن',
    'Upload CV':'تحميل السيرة الذاتية','Provide either your LinkedIn profile or your CV.':'يرجى إدخال رابط لينكدإن أو تحميل السيرة الذاتية.',
    'What is your next project really costing you?':'ما التكلفة الفعلية لمشروعك القادم؟',
    'What Could Your Experience Earn You?':'ما العائد الذي يمكن أن تحققه خبرتك؟',
    'How Much Work Did Your Firm Miss Last Year?':'ما حجم الفرص التي فاتت شركتك العام الماضي؟',
    'Illustrative USD estimate. Assumptions are under review. Results are not a quote, offer or guarantee.':'تقدير توضيحي بالدولار الأمريكي. الافتراضات قيد المراجعة. النتائج ليست عرضاً أو ضماناً.',
    'Include my answers and estimate in my enquiry':'أرفق إجاباتي وتقديري بطلب التواصل',
    'Download the concept note':'تنزيل المذكرة التعريفية','Open calculator':'افتح الحاسبة','Share this calculator':'شارك الحاسبة',
    'Illustrative storyboard. Final production film and approved captions are pending.':'مشاهد توضيحية. الفيلم النهائي والترجمة المعتمدة قيد الإعداد.',
    'Read transcript':'اقرأ النص','Play story':'شغّل القصة','Pause story':'أوقف القصة مؤقتاً',
    'Full story':'القصة كاملة','15-second teaser':'إعلان تشويقي 15 ثانية','6-second bumper':'مقطع قصير 6 ثوانٍ',
    'The people behind OptimIQ.':'فريق أوبتيم آي كيو.','Leadership roster, photographs and biographies await client confirmation.':'قائمة القيادة والصور والسير الذاتية بانتظار تأكيد العميل.',
    'Image pending from client':'الصورة بانتظار العميل','Blueprint image brief:':'وصف الصورة في المخطط:',
    'We reply within [1 business day].':'سنرد خلال [يوم عمل واحد].','About 2 minutes.':'نحو دقيقتين.','Preview only. Information is not submitted or saved; no account is created.':'هذه معاينة فقط. لا يتم إرسال المعلومات أو حفظها ولا يتم إنشاء حساب.',
    'India':'الهند','UAE':'الإمارات العربية المتحدة','Saudi Arabia':'المملكة العربية السعودية',
    'Strategy & Growth':'الاستراتيجية والنمو','Revenue Enhancement':'تعزيز الإيرادات','Customer & Market Experience':'تجربة العملاء والأسواق',
    'Digital Transformation':'التحول الرقمي','AI & Emerging Tech':'الذكاء الاصطناعي والتقنيات الناشئة','Supply Chain & ESG':'سلاسل الإمداد والاستدامة',
    'Finance & Operations':'المالية والعمليات','Talent & Manpower':'المواهب والقوى العاملة','People, L&D & Culture':'الأفراد والتعلّم والثقافة',
    'Knowledge':'المعرفة','Behaviour':'السلوك المهني','Judgement':'الحُكم المهني','Confirmed, not assumed':'موثّق بالأدلة، لا بالافتراض',
    'See the full partnership model.':'تعرّف على نموذج الشراكة الكامل.','Preview only. Your email is not sent or saved.':'هذه معاينة فقط. لن يتم إرسال بريدك أو حفظه.',
    'Arabic review draft':'مسودة عربية للمراجعة','English':'English'
  };

  const english = new Map();
  function rebuildEnglishMap() {
    english.clear();
    Object.entries(arabic).forEach(([source, translated]) => english.set(translated, source));
  }
  rebuildEnglishMap();
  const originalDocumentTitle = document.title;
  const descriptionMeta = document.querySelector('meta[name=description]');
  const originalDescription = descriptionMeta?.content || '';
  const originalText = new WeakMap();
  let currentLanguage = 'en';

  function addLanguageControl() {
    const nav = document.querySelector('.nav-wrap');
    if (!nav || nav.querySelector('[data-site-lang]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'site-language';
    button.dataset.siteLang = '';
    button.textContent = 'العربية';
    button.setAttribute('aria-label', 'Switch to Arabic review draft');
    nav.append(button);
    button.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ar' : 'en'));
  }

  function localizeCalculatorResults(isArabic) {
    const ids = ['c-verdict', 'e-verdict', 'f-verdict', 'live'];
    for (const id of ids) {
      const element = document.getElementById(id);
      if (!element) continue;
      const current = element.innerHTML;
      if (!/[\u0600-\u06FF]/.test(current)) element.dataset.englishMarkup = current;
      const source = element.dataset.englishMarkup || current;
      if (!isArabic) {
        if (element.innerHTML !== source) element.innerHTML = source;
        continue;
      }
      const plain = source.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      let translated = '';
      if (id === 'c-verdict') {
        const match = source.match(/^On a <b>(.*?)<\/b> project with (.*?), part of the fee pays for more than the work\.$/);
        if (match) {
          const firms = {'a big-name global firm':'شركة عالمية كبرى','a regional boutique':'شركة استشارية إقليمية متخصصة','a consulting firm':'شركة استشارية'};
          translated = `في مشروع بقيمة <b>${match[1]}</b> مع ${firms[match[2]] || match[2]}، يغطي جزء من الأتعاب تكاليف تتجاوز العمل نفسه.`;
        }
      } else if (id === 'e-verdict') {
        const match = source.match(/^You billed <b>(.*?) days<\/b> last year\. A steady flow of verified projects could fill more of your year\.$/);
        translated = match ? `أنجزت <b>${match[1]} يوماً</b> مدفوع الأجر العام الماضي. وقد تتيح لك المشاريع الموثقة فرصاً أكثر على مدار العام.` : (plain === 'You are already well booked. Better projects can still lift your rate.' ? 'جدولك ممتلئ جيداً بالفعل. ويمكن للمشاريع الأفضل أن ترفع قيمة أتعابك.' : '');
      } else if (id === 'f-verdict') {
        const match = source.match(/^Last year your firm missed about <b>(.*?)<\/b> of work\.$/);
        translated = match ? `فاتت شركتك فرص عمل بقيمة تقارب <b>${match[1]}</b> العام الماضي.` : (plain === "You didn't lose or turn down any projects last year." ? 'لم تخسر شركتك أي مشاريع ولم ترفضها العام الماضي.' : '');
      } else {
        const patterns = [
          [/^You could keep (.+) on this project\.$/, m=>`قد توفّر ${m[1]} في هذا المشروع.`],
          [/^You could start as (.+)\.$/, m=>`يمكنك البدء بمستوى ${m[1]}.`],
          [/^You could add (.+) a year, starting as (.+)\.$/, m=>`قد تضيف ${m[1]} سنوياً، بدءاً بمستوى ${m[2]}.`],
          [/^You could bid on (.+) more projects a year\.$/, m=>`يمكنك التقدم لعطاءات ${m[1]} مشاريع إضافية سنوياً.`],
          [/^You could win back (.+) a year\.$/, m=>`قد تستعيد فرصاً بقيمة ${m[1]} سنوياً.`]
        ];
        for (const [pattern, render] of patterns) { const match=plain.match(pattern); if(match){translated=render(match);break;} }
      }
      if (translated && element.innerHTML !== translated) element.innerHTML = translated;
    }
  }

  function setLanguage(language) {
    currentLanguage = language;
    const isArabic = language === 'ar';
    localizeCalculatorResults(isArabic);
    document.documentElement.lang = language;
    if (isArabic) {
      const sourceTitle = originalDocumentTitle.split(' | ')[0];
      const translatedTitle = arabic[originalDocumentTitle] || (arabic[sourceTitle] ? `${arabic[sourceTitle]} | OptimIQ Consultus` : originalDocumentTitle);
      document.title = translatedTitle;
      if (descriptionMeta && arabic[originalDescription]) descriptionMeta.content = arabic[originalDescription];
    } else {
      document.title = originalDocumentTitle;
      if (descriptionMeta) descriptionMeta.content = originalDescription;
    }
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-arabic', isArabic);
    if (isArabic && !document.querySelector('.locale-draft')) {
      const notice = document.createElement('p');
      notice.className = 'locale-draft';
      notice.setAttribute('role', 'note');
      notice.textContent = 'مسودة عربية للمراجعة · الترجمة بانتظار اعتماد العميل';
      document.querySelector('.site-header')?.after(notice);
    }
    if (!isArabic) document.querySelector('.locale-draft')?.remove();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const trim = original.trim();
      const translated = isArabic ? arabic[trim] : english.get(trim);
      if (!translated) continue;
      const leading = original.match(/^\s*/)[0];
      const trailing = original.match(/\s*$/)[0];
      node.nodeValue = leading + translated + trailing;
    }

    document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(element => {
      ['placeholder', 'aria-label', 'title'].forEach(attribute => {
        const value = element.getAttribute(attribute);
        const translated = isArabic ? arabic[value] : english.get(value);
        if (translated && value !== translated) element.setAttribute(attribute, translated);
      });
    });
    const control = document.querySelector('[data-site-lang]');
    if (control) {
      control.textContent = isArabic ? 'English' : 'العربية';
      control.setAttribute('aria-label', isArabic ? 'Switch to English' : 'Switch to Arabic review draft');
      control.setAttribute('aria-pressed', String(isArabic));
    }
    const proofBefore = document.querySelector('[data-proof-before]');
    const proofAfter = document.querySelector('[data-proof-after]');
    const proofLabel = document.querySelector('[data-proof-label]');
    if (proofBefore) proofBefore.textContent = isArabic ? 'السيرة الذاتية' : 'CV';
    if (proofAfter) proofAfter.textContent = isArabic ? 'نتائج موثقة' : 'Verified outcome';
    if (proofLabel) proofLabel.textContent = isArabic ? 'حرّك المؤشر من السيرة الذاتية إلى النتائج الموثقة' : 'Move from CV to verified outcome';
    document.querySelectorAll('[data-caption]').forEach(caption => {
      caption.lang = isArabic ? 'ar' : 'en';
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      if (button.closest('[data-player]')) button.textContent = isArabic ? 'English' : 'العربية';
    });
    document.dispatchEvent(new CustomEvent('site-language-change', { detail: { language } }));
  }

  addLanguageControl();
  setLanguage('en');
  function addProofScrubber() {
    const visual = document.querySelector('[data-carousel] [data-visual]');
    const image = visual?.querySelector('img[data-supplied-hero]');
    if (!visual || !image || visual.querySelector('[data-proof-scrubber]')) return;
    image.classList.add('proof-scrub-image');
    image.style.objectFit = 'cover';
    image.style.objectPosition = '0% 50%';
    const control = document.createElement('div');
    control.className = 'proof-scrubber';
    control.dataset.proofScrubber = '';
    control.innerHTML = '<span data-proof-before>CV</span><label><span class="sr-only" data-proof-label>Move from CV to verified outcome</span><input type="range" min="0" max="100" value="0" aria-label="Move from CV to verified outcome"><i aria-hidden="true"></i></label><span data-proof-after>Verified outcome</span>';
    const range = control.querySelector('input');
    range.addEventListener('input', () => {
      image.style.objectPosition = `${range.value}% 50%`;
      range.setAttribute('aria-valuetext', `${control.querySelector('[data-proof-before]').textContent} → ${control.querySelector('[data-proof-after]').textContent}`);
    });
    visual.append(control);
  }
  addProofScrubber();
  document.addEventListener('optimIqArabicReady', () => {
    Object.assign(arabic, window.optimIqArabicDictionary || {});
    rebuildEnglishMap();
    setLanguage(currentLanguage);
  });
  if (window.optimIqArabicDictionary) {
    Object.assign(arabic, window.optimIqArabicDictionary);
    rebuildEnglishMap();
  }
  document.addEventListener('input', () => requestAnimationFrame(() => setLanguage(currentLanguage)));
  document.addEventListener('click', event => {
    if (event.target.closest('.chips button,[data-slide-next],[data-slide-prev],[data-go]')) {
      requestAnimationFrame(() => setLanguage(currentLanguage));
    }
  });

  let localeRefreshQueued = false;
  new MutationObserver(() => {
    if (localeRefreshQueued) return;
    localeRefreshQueued = true;
    requestAnimationFrame(() => {
      localeRefreshQueued = false;
      if (currentLanguage === 'ar') setLanguage('ar');
    });
  }).observe(document.body, { childList: true, subtree: true });

  function formatTime(seconds) {
    const whole = Math.floor(seconds);
    return String(Math.floor(whole / 60)).padStart(2, '0') + ':' + String(whole % 60).padStart(2, '0');
  }

  document.querySelectorAll('[data-player]').forEach(player => {
    const scenes = JSON.parse(player.dataset.scenes);
    const root = player.dataset.root;
    const screen = player.querySelector('.screen');
    const image = player.querySelector('.frame-art');
    const title = player.querySelector('.intertitle strong');
    const caption = player.querySelector('[data-caption]');
    const seek = player.querySelector('[data-seek]');
    const time = player.querySelector('[data-time]');
    const playButton = player.querySelector('[data-play]');
    const lengthSelect = player.querySelector('[data-length]');
    const languageButton = player.querySelector('[data-lang]');
    const transcript = player.querySelector('[data-transcript]');
    let language = currentLanguage;
    let playing = false;
    let position = 0;
    let lastFrame = 0;
    let sequence = scenes;
    let fullDuration = scenes.at(-1).end;
    let duration = fullDuration;
    let currentScene = -1;
    let frameId = 0;

    function sequenceFor(length) {
      if (length === 'full') return scenes;
      if (length === '15') return [scenes[0], scenes[Math.floor(scenes.length * .65)], scenes.at(-1)];
      return [scenes[0], scenes[Math.floor(scenes.length * .65)], scenes.at(-1)];
    }

    function sceneAt(value) {
      return sequence.findIndex(scene => value < scene.end) === -1
        ? sequence.length - 1
        : sequence.findIndex(scene => value < scene.end);
    }

    function updateTranscript() {
      transcript.replaceChildren(...sequence.map((scene, index) => {
        const item = document.createElement('li');
        const label = document.createElement('span');
        const spoken = document.createElement('p');
        label.textContent = scene[language][0];
        spoken.textContent = scene[language][1];
        item.dataset.active = String(index === sceneAt(position));
        item.append(label, spoken);
        return item;
      }));
    }

    function render() {
      const index = sceneAt(position);
      const scene = sequence[index];
      if (index !== currentScene) {
        currentScene = index;
        screen.dataset.motif = scene.motif;
        image.src = root + 'assets/hero-images/' + scene.image + '-800.webp';
        image.alt = '';
        title.textContent = scene[language][0];
        caption.textContent = scene[language][1];
        updateTranscript();
      }
      caption.lang = language;
      player.dir = language === 'ar' ? 'rtl' : 'ltr';
      seek.value = Math.min(position, duration);
      seek.setAttribute('aria-valuetext', formatTime(position) + ' of ' + formatTime(duration));
      time.textContent = formatTime(position) + ' / ' + formatTime(duration);
      screen.querySelector('.screen-time').textContent = formatTime(position);
    }

    function stop() {
      playing = false;
      playButton.textContent = 'Play story';
      playButton.setAttribute('aria-pressed', 'false');
      cancelAnimationFrame(frameId);
      lastFrame = 0;
    }

    function tick(now) {
      if (!playing) return;
      if (lastFrame) position += Math.min((now - lastFrame) / 1000, 0.1) * duration / fullDuration;
      lastFrame = now;
      if (position >= duration) {
        position = duration;
        render();
        stop();
        return;
      }
      render();
      frameId = requestAnimationFrame(tick);
    }

    function setLength(value) {
      stop();
      sequence = sequenceFor(value);
      duration = value === 'full' ? fullDuration : Number(value);
      const interval = duration / sequence.length;
      sequence = sequence.map((scene, index) => ({ ...scene, end: interval * (index + 1) }));
      seek.max = duration;
      position = 0;
      currentScene = -1;
      render();
    }

    playButton.addEventListener('click', () => {
      if (playing) {
        stop();
        return;
      }
      if (position >= duration) position = 0;
      playing = true;
      playButton.textContent = 'Pause story';
      playButton.setAttribute('aria-pressed', 'true');
      frameId = requestAnimationFrame(tick);
    });

    seek.addEventListener('input', () => {
      position = Number(seek.value);
      currentScene = -1;
      render();
    });
    seek.addEventListener('pointerdown', stop);
    seek.addEventListener('keydown', stop);
    lengthSelect.addEventListener('change', () => setLength(lengthSelect.value));
    languageButton.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'ar' : 'en'));
    document.addEventListener('site-language-change', event => {
      language = event.detail.language;
      languageButton.setAttribute('aria-pressed', String(language === 'ar'));
      currentScene = -1;
      render();
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) stop();
    });
    player.addEventListener('pagehide', stop);
    render();
  });
})();
