(() => {
  const PAGES = [
    ['Terms & declarations', 'OptimIQ_Consultant_Terms_Declarations.html', '1'],
    ['CTQ form', 'OptimIQ_Consultant_Profile_CTQ_Stepper.html', '2'],
    ['Role fit', 'OptimIQ_Consultant_Role_Fit_Selection.html', '3'],
    ['Profile & assessment', 'OptimIQ_Consultant_Profile_Assessment.html', '4'],
    ['Opportunities', 'OptimIQ_Consultant_Opportunities.html', '5'],
    ['Project agreements', 'OptimIQ_Consultant_Agreement_Gate.html', '6'],
    ['Engagements', 'OptimIQ_Consultant_Engagements.html', '7'],
    ['Payments & invoices', 'OptimIQ_Consultant_Payments_Invoices.html', '8'],
    ['Communications', 'OptimIQ_Consultant_Communications.html', '9'],
    ['Project calendar', 'OptimIQ_Consultant_Project_Calendar.html', '10'],
    ['Performance & CPD', 'OptimIQ_Consultant_Performance_CPD.html', '11'],
    ['Project documents', 'OptimIQ_Consultant_Project_Documents.html', '12'],
  ];
  const FIRM_PAGES = [
    ['Dashboard', 'OptimIQ_Consulting_Firm_Dashboard_Concept.html', '1'],
    ['Terms & declarations', 'OptimIQ_Consulting_Firm_Terms_Declarations.html', '2'],
    ['Firm profile & CTQ', 'OptimIQ_Consulting_Firm_CTQ_Stepper.html', '3'],
    ['Qualification & empanelment', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#qualification', '4'],
    ['Corporate membership', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#membership', '5'],
    ['Seller opportunities', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#seller', '6'],
    ['Relationship-manager bid support', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#bid-support', '7'],
    ['Bids & proposals', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#bids', '8'],
    ['Buyer Expert requests', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#buyer', '9'],
    ['Expert shortlist & selection', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#expert-selection', '10'],
    ['Won projects to staff', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#win-and-staff', '11'],
    ['Agreements & award', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#agreements', '12'],
    ['Engagements & delivery', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#engagements', '13'],
    ['Payments & invoices', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#payments', '14'],
    ['Communications', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#communications', '15'],
    ['Project calendar', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#calendar', '16'],
    ['Project documents', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#documents', '17'],
    ['Performance & review', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#performance', '18'],
    ['Renewal & membership status', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#renewal', '19'],
    ['Grievances & change requests', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#support', '20'],
    ['Exit & final settlement', 'OptimIQ_Consulting_Firm_Workspace_Concept.html#exit', '21'],
  ];
  const CLIENT_PAGES = [
    ['Dashboard', 'OptimIQ_Client_Dashboard_Concept.html', '1'],
    ['Terms & declarations', 'OptimIQ_Client_Terms_Declarations.html', '2'],
    ['Client profile', 'OptimIQ_Client_Workspace_Concept.html#profile', '3'],
    ['Requirements', 'OptimIQ_Client_Workspace_Concept.html#requirements', '4'],
    ['Track A shortlist', 'OptimIQ_Client_Workspace_Concept.html#track-a', '5'],
    ['Masked profile detail', 'OptimIQ_Client_Workspace_Concept.html#masked-profile', '6'],
    ['Request more profiles', 'OptimIQ_Client_Workspace_Concept.html#request-more', '7'],
    ['Track B tender & evaluation', 'OptimIQ_Client_Workspace_Concept.html#track-b', '8'],
    ['Agreements & award', 'OptimIQ_Client_Workspace_Concept.html#agreements', '9'],
    ['Meetings & introduction', 'OptimIQ_Client_Workspace_Concept.html#meetings', '10'],
    ['Engagements & milestones', 'OptimIQ_Client_Workspace_Concept.html#engagements', '11'],
    ['Invoices & payments', 'OptimIQ_Client_Workspace_Concept.html#payments', '12'],
    ['Feedback & re-engagement', 'OptimIQ_Client_Workspace_Concept.html#feedback', '13'],
    ['Communications', 'OptimIQ_Client_Workspace_Concept.html#communications', '14'],
    ['Project calendar', 'OptimIQ_Client_Workspace_Concept.html#calendar', '15'],
    ['Project documents', 'OptimIQ_Client_Workspace_Concept.html#documents', '16'],
    ['Support & account', 'OptimIQ_Client_Workspace_Concept.html#support', '17'],
  ];
  const file = location.pathname.split('/').pop() || 'index.html';
  const fileToPage = new Map(PAGES.map(([, url]) => [url, true]));
  const fileToFirmPage = new Map(FIRM_PAGES.map(([, url]) => [url.split('#')[0], true]));
  const fileToClientPage = new Map(CLIENT_PAGES.map(([, url]) => [url.split('#')[0], true]));
  const consultantPage = fileToPage.has(file) || file === 'OptimIQ_Consultant_Workspace_Concept.html';
  const firmPage = fileToFirmPage.has(file);
  const clientPage = fileToClientPage.has(file);
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const roleLabel = (role) => ({'consultant':'Consultant','strategic-advisor':'Strategic Advisor','project-manager':'Project Manager'}[role] || role);

  function addNavigation() {
    const rail = document.querySelector('aside.rail, .app > aside');
    if (!rail || (!consultantPage && !firmPage && !clientPage)) return;
    const pages = firmPage ? FIRM_PAGES : clientPage ? CLIENT_PAGES : PAGES;
    const journeyName = firmPage ? 'Consulting firm journey' : clientPage ? 'Client journey' : 'Consultant journey';
    let details = rail.querySelector('.firm-journey');
    if (!details) details = document.createElement('details');
    details.className = `consultant-journey${firmPage ? ' firm-journey' : ''}${clientPage ? ' client-journey' : ''}`;
    details.innerHTML = `<summary>☰ <span>${journeyName}</span></summary><nav class="journey-nav" aria-label="${journeyName}">${pages.map(([label,url,n]) => `<a href="${url}"${url.split('#')[0] === file && (!url.includes('#') || url.endsWith(location.hash)) ? ' aria-current="page"' : ''}><span class="journey-number">${n}</span><span>${escapeHtml(label)}</span></a>`).join('')}</nav>`;
    const brand = rail.querySelector('.brand');
    if (!details.parentElement) rail.insertBefore(details, brand?.nextElementSibling || null);
    rail.querySelectorAll('nav:not(.journey-nav), .mobile-menu:not(.consultant-journey), .side-flow, .nav, .step-list').forEach((el) => el.classList.add('consultant-journey-oldnav'));
    rail.querySelectorAll(':scope > .workspace').forEach((el) => el.classList.add('consultant-journey-oldnav'));
    if (file === 'OptimIQ_Consultant_Profile_CTQ_Stepper.html') rail.querySelectorAll(':scope > .role-label').forEach((el) => el.classList.add('consultant-journey-oldnav'));
    const oldStyle = document.createElement('style');
    oldStyle.textContent = 'aside nav.consultant-journey-oldnav,aside .consultant-journey-oldnav{display:none!important}';
    document.head.append(oldStyle);
    const mq = matchMedia('(max-width:820px)');
    const sync = () => { details.open = !mq.matches; document.body.classList.toggle('navigation-open', mq.matches && details.open); };
    details.addEventListener('toggle', () => document.body.classList.toggle('navigation-open', mq.matches && details.open));
    details.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { if (mq.matches) details.open = false; }));
    document.addEventListener('click', (event) => { if (mq.matches && details.open && !details.contains(event.target)) details.open = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mq.matches) details.open = false; });
    mq.addEventListener('change', sync);
    sync();
  }

  function addProfileMenu() {
    if ((!consultantPage && !firmPage && !clientPage) || file === 'OptimIQ_Portal_Login_Concept.html') return;
    const right = document.querySelector('header.topbar .right, header.topbar .user, header.topbar .user-chip');
    if (!right) return;
    const name = localStorage.getItem('optiq-demo-name') || (firmPage ? 'Firm representative' : clientPage ? 'Client representative' : 'Jordan Davis');
    const roles = JSON.parse(localStorage.getItem('optiq-demo-roles') || '[]');
    const activeRole = firmPage ? 'Consulting firm' : clientPage ? 'Client' : roleLabel(localStorage.getItem('optiq-demo-active-role') || roles[0] || 'consultant');
    const initials = name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase();
    const roleOptions = consultantPage && roles.length ? roles : [];
    const dashboard = firmPage ? 'OptimIQ_Consulting_Firm_Dashboard_Concept.html' : clientPage ? 'OptimIQ_Client_Dashboard_Concept.html' : 'OptimIQ_Consultant_Workspace_Concept.html';
    const profileHref = firmPage ? 'OptimIQ_Consulting_Firm_CTQ_Stepper.html' : clientPage ? 'OptimIQ_Client_Workspace_Concept.html#profile' : 'OptimIQ_Consultant_Profile_Assessment.html';
    const audience = firmPage ? 'consulting-firm' : clientPage ? 'client' : 'consultant';
    const profile = document.createElement('details');
    profile.className = 'account-menu';
    profile.innerHTML = `<summary aria-label="Account menu for ${escapeHtml(name)}"><span class="account-avatar" aria-hidden="true">${escapeHtml(initials)}</span><span class="account-summary"><b>${escapeHtml(name)}</b><small>${escapeHtml(activeRole)} profile</small></span></summary><div class="account-panel"><div class="account-identity"><b>${escapeHtml(name)}</b><span class="account-active-role">${escapeHtml(activeRole)} profile</span></div><a href="${dashboard}">Dashboard</a><a href="${profileHref}">${firmPage ? 'Firm CTQ profile' : clientPage ? 'Organisation profile' : 'Edit profile'}</a>${roleOptions.length > 1 ? `<div class="account-switch"><span>Switch profile</span>${roleOptions.map(role => `<button type="button" data-profile-role="${escapeHtml(role)}"${role === (localStorage.getItem('optiq-demo-active-role') || roles[0]) ? ' aria-current="true"' : ''}>${escapeHtml(roleLabel(role))}${role === (localStorage.getItem('optiq-demo-active-role') || roles[0]) ? ' · Active' : ''}</button>`).join('')}</div>` : ''}<button type="button" class="account-signout">Sign out</button></div>`;
    right.replaceChildren(profile);
    document.addEventListener('click', (event) => { if (profile.open && !profile.contains(event.target)) profile.open = false; });
    profile.querySelectorAll('[data-profile-role]').forEach(button => { button.dataset.demoWired = 'true'; button.addEventListener('click', () => {
      localStorage.setItem('optiq-demo-active-role', button.dataset.profileRole);
      toast(`Switched to ${roleLabel(button.dataset.profileRole)} profile for this demo.`);
      addProfileMenu();
    }); });
    const signOut = profile.querySelector('.account-signout');
    if (signOut) signOut.dataset.demoWired = 'true';
    signOut?.addEventListener('click', () => {
      ['optiq-demo-email','optiq-demo-roles','optiq-demo-active-role','optiq-demo-name'].forEach(key => localStorage.removeItem(key));
      go(`OptimIQ_Portal_Login_Concept.html?audience=${audience}`);
    });
  }

  function setupDashboardPhases() {
    if (file !== 'OptimIQ_Consultant_Workspace_Concept.html') return;
    const main = document.querySelector('.app > main');
    if (!main || main.querySelector('.dashboard-phase-tabs')) return;
    const sections = [...main.querySelectorAll(':scope > section.card, :scope > section.cards, :scope > section.layout')];
    if (sections.length < 4) return;
    sections[0].dataset.dashboardPhase = '1';
    const phaseOneSequence = document.createElement('div');
    phaseOneSequence.className = 'dashboard-sequence';
    phaseOneSequence.dataset.dashboardPhase = '1';
    phaseOneSequence.setAttribute('aria-label', 'Your CTQ and role-fit sequence');
    phaseOneSequence.innerHTML = '<div class="dashboard-sequence__step dashboard-sequence__step--complete"><span class="dashboard-sequence__mark" aria-hidden="true">✓</span><span><small>Step 1</small><strong>CTQ form</strong></span><em>Submitted</em></div><span class="dashboard-sequence__arrow" aria-hidden="true">→</span><div class="dashboard-sequence__step dashboard-sequence__step--current"><span class="dashboard-sequence__mark" aria-hidden="true">2</span><span><small>Step 2</small><strong>Role fit</strong></span><em>Recommendations</em></div>';
    sections[0].insertAdjacentElement('beforebegin', phaseOneSequence);
    sections.slice(1).forEach(section => { section.dataset.dashboardPhase = '2'; });
    const tabs = document.createElement('div');
    tabs.className = 'dashboard-phase-tabs';
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Dashboard phases');
    tabs.innerHTML = '<button type="button" aria-pressed="true" data-phase="1">Phase 1 · Registration &amp; CTQ</button><button type="button" aria-pressed="false" data-phase="2">Phase 2 · Projects &amp; ongoing journey</button>';
    tabs.querySelectorAll('button').forEach(button => { button.dataset.demoWired = 'true'; });
    const title = main.querySelector('h1');
    if (title) title.insertAdjacentElement('afterend', tabs);
    else main.querySelector('.topbar')?.insertAdjacentElement('afterend', tabs);
    const selectPhase = (phase) => {
      main.querySelectorAll('[data-dashboard-phase]').forEach(section => { section.hidden = section.dataset.dashboardPhase !== phase; });
      tabs.querySelectorAll('[data-phase]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.phase === phase)));
    };
    tabs.querySelectorAll('[data-phase]').forEach(button => button.addEventListener('click', () => selectPhase(button.dataset.phase)));
    selectPhase('1');
  }

  function compactReviewIndex() {
    if (file !== 'index.html') return;
    const audienceContainer = document.querySelector('.audiences');
    const audienceOrder = ['consultant-heading', 'firm-heading', 'client-heading', 'staff-heading'];
    audienceOrder.forEach((id) => {
      const section = document.querySelector(`#${id}`)?.closest('.audience');
      if (section && audienceContainer) audienceContainer.append(section);
    });
    document.querySelectorAll('.audience').forEach((audience) => {
      const heading = audience.querySelector('.audience-head');
      if (!heading) return;
      const journey = audience.querySelector('.journey');
      if (journey) journey.id = `review-journey-${heading.querySelector('h2')?.id || 'audience'}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'audience-toggle';
      button.dataset.demoWired = 'true';
      button.setAttribute('aria-expanded', 'false');
      if (journey) button.setAttribute('aria-controls', journey.id);
      button.textContent = 'Show screens';
      heading.append(button);
      audience.classList.add('is-collapsed');
      button.addEventListener('click', () => {
        const collapsed = audience.classList.toggle('is-collapsed');
        button.setAttribute('aria-expanded', String(!collapsed));
        button.textContent = collapsed ? 'Show screens' : 'Hide screens';
      });
      const headingId = heading.querySelector('h2')?.id;
      const audienceType = headingId === 'firm-heading' ? 'consulting-firm' : headingId === 'client-heading' ? 'client' : headingId === 'staff-heading' ? 'staff' : 'consultant';
      audience.querySelectorAll('a[href="OptimIQ_Portal_Login_Concept.html"]').forEach((link) => { link.href = `OptimIQ_Portal_Login_Concept.html?audience=${audienceType}`; });
    });
    document.querySelectorAll('.page .phase-badge').forEach((badge) => {
      if (/^Phase 2/i.test(badge.textContent.trim())) badge.classList.add('phase-2');
      if (/^Phase 3/i.test(badge.textContent.trim())) badge.classList.add('phase-3');
    });
  }

  function getPhase() {
    if (['OptimIQ_Portal_Login_Concept.html','OptimIQ_Consultant_Terms_Declarations.html','OptimIQ_Consultant_Profile_CTQ_Stepper.html','OptimIQ_Consultant_Role_Fit_Selection.html','OptimIQ_Consulting_Firm_Terms_Declarations.html','OptimIQ_Consulting_Firm_CTQ_Stepper.html','OptimIQ_Consulting_Firm_Dashboard_Concept.html'].includes(file)) return 1;
    if (file === 'OptimIQ_Consultant_Project_Documents.html') return 2;
    if (file === 'OptimIQ_Admin_Workspace_Concept.html') return 1;
    return 2;
  }

  function addPhaseBadge() {
    if (file === 'index.html' || ['OptimIQ_Consultant_Workspace_Concept.html','OptimIQ_Consulting_Firm_Dashboard_Concept.html','OptimIQ_Client_Dashboard_Concept.html','OptimIQ_Client_Terms_Declarations.html','OptimIQ_Client_Categorization_Enrichment.html'].includes(file)) return;
    const phase = getPhase();
    let strip = document.createElement('div');
    strip.className = 'phase-strip';
    const text = phase === 1 ? 'Phase 1 · Registration through CTQ score completion' : 'Phase 2 · Post-CTQ assessment and project journey';
    strip.innerHTML = `<span class="phase-badge phase-${phase}">${text}</span>`;
    if (file === 'OptimIQ_Consultant_Project_Documents.html') strip.innerHTML += '<span class="phase-badge phase-3">Phase 3 · Knowledge library proposed</span>';
    const main = document.querySelector('main');
    const topbar = main?.querySelector('.topbar');
    if (topbar) topbar.insertAdjacentElement('afterend', strip);
    else {
      const target = document.querySelector('.form-wrap') || document.querySelector('.form-panel');
      target?.prepend(strip);
    }
  }

  function simplifyConsultantBreadcrumb() {
    if (!consultantPage && !firmPage && !clientPage) return;
    document.querySelectorAll('header.topbar .crumb').forEach((crumb) => {
      const current = crumb.querySelector('strong, b');
      if (current) crumb.replaceChildren(current.cloneNode(true));
      else crumb.textContent = crumb.textContent.replace(/^\s*(Consultant|Consulting firm|Client) workspace\s*\/\s*/i, '').trim();
    });
  }

  const toast = (message) => {
    let el = document.querySelector('.demo-toast');
    if (!el) { el = document.createElement('div'); el.className = 'demo-toast'; el.setAttribute('role','status'); document.body.append(el); }
    el.textContent = message;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.remove(), 3200);
  };
  const go = (href) => { location.href = href; };

  function renderCtq() {
    const form = document.querySelector('#ctq-form');
    const fields = window.CTQ_DEMO_FIELDS;
    if (!form || !fields?.length) return;
    document.querySelectorAll('.content > .notice,.content > .progress-row,.content > .step-header').forEach((el) => el.remove());
    const grouped = fields.reduce((m,f) => ((m[f.categoryCode] ||= []).push(f),m),{});
    const categories = Object.entries(grouped);
    const saved = JSON.parse(localStorage.getItem('optiq-demo-ctq') || '{}');
    form.innerHTML = `<p class="notice"><span class="notice-icon">i</span><span>Complete the client-provided CTQ questions. Your answers can be changed until final submission. This demo keeps draft answers in this browser and does not calculate or display scores.</span></p><div class="ctq-progress-track"><div class="ctq-progress-fill" style="width:12.5%"></div></div><div class="progress-row"><span>CTQ form progress</span><span class="progress-track"><span class="progress-fill" style="width:12.5%"></span></span><strong class="ctq-step-count">CTQ SECTION 1 OF ${categories.length}</strong></div><div class="ctq-priority-legend" aria-label="Question indicators"><span>Question indicators</span><span><i class="priority-dot required" aria-hidden="true"></i>Required</span><span><i class="priority-dot recommended" aria-hidden="true"></i>Recommended</span><span><i class="priority-dot optional" aria-hidden="true"></i>Optional</span></div><nav class="ctq-section-list" aria-label="CTQ sections">${categories.map(([,group],i) => `<button type="button" data-step-target="${i}"><span>${i+1}</span>${escapeHtml(group[0].category)}</button>`).join('')}</nav><div id="ctq-step-container"></div><div class="ctq-actions"><div class="ctq-save-group"><button type="button" class="ctq-save-draft">Save draft</button><span class="save-state" aria-live="polite">Draft answers are saved in this browser</span></div><div class="actions"><button type="button" class="ctq-back" disabled>Back</button><button type="button" class="primary ctq-next">Next section</button></div></div>`;
    const container = form.querySelector('#ctq-step-container');
    categories.forEach(([code, group], index) => {
      const section = document.createElement('section');
      section.className = 'ctq-step';
      section.hidden = index !== 0;
      section.dataset.step = index;
      const label = group[0].category;
      section.innerHTML = `<div class="step-header"><div><span class="step-kicker">Section ${index+1}</span><h2>${escapeHtml(label)}</h2><p>Answer the questions in this section. Scoring details are handled after submission.</p></div><span class="step-count">${group.length} questions</span></div><div class="fields ctq-field-grid"></div>`;
      const grid = section.querySelector('.ctq-field-grid');
      group.forEach((field) => {
        const wrap = document.createElement('div');
        wrap.className = 'field';
        const required = field.tier === 'Must Have';
        const options = field.options.map((option) => `<option value="${escapeHtml(option)}"${saved[field.id] === option ? ' selected' : ''}>${escapeHtml(option)}</option>`).join('');
        const marker = required ? 'required' : field.tier === 'Good to Have' ? 'recommended' : 'optional';
        wrap.innerHTML = `<div class="field-head"><label class="field-title" for="${field.id}">${escapeHtml(field.name)}${required ? ' <span aria-hidden="true">*</span>' : ''}</label><i class="priority-dot ${marker}" role="img" aria-label="${marker === 'required' ? 'Required' : marker === 'recommended' ? 'Recommended' : 'Optional'} question" title="${marker === 'required' ? 'Required' : marker === 'recommended' ? 'Recommended' : 'Optional'}"></i></div><select id="${field.id}" name="${field.id}" ${required ? 'required' : ''}><option value="">Select an answer</option>${options}</select>`;
        grid.append(wrap);
      });
      container.append(section);
    });
    let current = 0;
    const steps = [...container.querySelectorAll('.ctq-step')];
    const focusSectionQuestion = () => {
      const firstQuestion = steps[current].querySelector('select, input, textarea');
      firstQuestion?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstQuestion) window.setTimeout(() => firstQuestion.focus({ preventScroll: true }), 350);
    };
    const progress = () => {
      const pct = ((current + 1) / steps.length) * 100;
      form.querySelector('.ctq-progress-fill').style.width = `${pct}%`;
      form.querySelector('.progress-fill').style.width = `${pct}%`;
      form.querySelector('.ctq-step-count').textContent = `CTQ SECTION ${current+1} OF ${steps.length}`;
      form.querySelector('.ctq-back').disabled = current === 0;
      form.querySelector('.ctq-next').textContent = current === steps.length - 1 ? 'Submit CTQ form' : 'Next section';
      steps.forEach((s,i) => { s.hidden = i !== current; });
      form.querySelectorAll('[data-step-target]').forEach((button) => { if (Number(button.dataset.stepTarget) === current) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current'); });
      const stepLinks = document.querySelectorAll('.journey-nav a');
      stepLinks.forEach(a => a.removeAttribute('aria-current'));
      document.querySelector('.journey-nav a[href="OptimIQ_Consultant_Profile_CTQ_Stepper.html"]')?.setAttribute('aria-current','page');
    };
    form.addEventListener('change', (e) => {
      if (e.target.matches('select')) { saved[e.target.name] = e.target.value; localStorage.setItem('optiq-demo-ctq', JSON.stringify(saved)); }
    });
    const saveDraftButton = form.querySelector('.ctq-save-draft');
    saveDraftButton.dataset.demoWired = 'true';
    saveDraftButton.addEventListener('click', () => {
      localStorage.setItem('optiq-demo-ctq', JSON.stringify(saved));
      localStorage.setItem('optiq-demo-ctq-draft-saved', new Date().toISOString());
      form.querySelector('.save-state').textContent = 'Draft saved just now';
      toast('Your CTQ draft is saved in this browser.');
    });
    form.querySelector('.ctq-back').addEventListener('click', () => { if (current > 0) { current--; progress(); focusSectionQuestion(); } });
    form.querySelectorAll('[data-step-target]').forEach((button) => button.addEventListener('click', () => { current = Number(button.dataset.stepTarget); progress(); focusSectionQuestion(); }));
    form.querySelector('.ctq-next').addEventListener('click', () => {
      const visibleRequired = [...steps[current].querySelectorAll('[required]')];
      const firstMissing = visibleRequired.find((el) => !el.value);
      if (firstMissing) { firstMissing.focus(); firstMissing.reportValidity(); return; }
      if (current < steps.length - 1) { current++; progress(); focusSectionQuestion(); return; }
      const missing = [...form.querySelectorAll('[required]')].find((field) => !field.value);
      if (missing) { const section = missing.closest('.ctq-step'); current = Number(section.dataset.step); progress(); missing.focus(); missing.reportValidity(); return; }
      localStorage.setItem('optiq-demo-ctq-complete','true');
      go('OptimIQ_Consultant_Role_Fit_Selection.html');
    });
    progress();
  }

  function wireDemo() {
    if (file === 'OptimIQ_Portal_Login_Concept.html') {
      const form = document.querySelector('.login-form');
      const email = form?.querySelector('input[type=email]');
      const password = form?.querySelector('input[type=password]');
      if (email) email.required = true;
      if (password) password.required = true;
      const button = form?.querySelector('.sign-in');
      if (button) button.type = 'submit';
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const audience = new URLSearchParams(location.search).get('audience') || localStorage.getItem('optiq-demo-audience');
        const destinations = { consultant:'OptimIQ_Consultant_Terms_Declarations.html', 'consulting-firm':'OptimIQ_Consulting_Firm_Terms_Declarations.html', client:'OptimIQ_Client_Terms_Declarations.html', staff:'OptimIQ_Admin_Workspace_Concept.html' };
        if (!destinations[audience]) { toast('For this screen demo, open sign-in from the audience section on the review page.'); return; }
        localStorage.setItem('optiq-demo-email', email.value);
        localStorage.setItem('optiq-demo-audience', audience);
        go(destinations[audience]);
      });
      form?.querySelector('[data-reset-password]')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!email?.value.trim()) { email?.focus(); toast('Enter your email address to continue with password recovery.'); return; }
        toast('In the live portal, password reset instructions would be sent to this email.');
      });
    }
    if (file === 'OptimIQ_Consultant_Terms_Declarations.html') {
      document.querySelector('#continue')?.addEventListener('click', () => go('OptimIQ_Consultant_Profile_CTQ_Stepper.html'));
    }
    if (file === 'OptimIQ_Consulting_Firm_Terms_Declarations.html') {
      document.querySelector('#continue')?.addEventListener('click', () => go('OptimIQ_Consulting_Firm_CTQ_Stepper.html'));
    }
    if (file === 'OptimIQ_Client_Terms_Declarations.html') {
      document.querySelector('#continue')?.addEventListener('click', () => {
        const accepted = document.querySelector('input[type="checkbox"]');
        if (accepted && !accepted.checked) { accepted.focus(); toast('Accept the required terms before continuing.'); return; }
        go('OptimIQ_Client_Dashboard_Concept.html');
      });
    }
    if (file === 'OptimIQ_Client_Categorization_Enrichment.html') {
      const form = document.querySelector('#enrichment-form');
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(form).entries());
        localStorage.setItem('optiq-demo-client-enrichment', JSON.stringify(values));
        go('OptimIQ_Portal_Login_Concept.html?audience=client');
      });
      document.querySelector('[data-enrichment-skip]')?.addEventListener('click', () => go('OptimIQ_Portal_Login_Concept.html?audience=client'));
    }
    if (file === 'OptimIQ_Consultant_Profile_CTQ_Stepper.html') renderCtq();
    if (file === 'OptimIQ_Consultant_Role_Fit_Selection.html') {
      document.querySelector('#role-selection-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const selected = [...e.currentTarget.querySelectorAll('input[name=roles]:checked')];
        if (!selected.length) { toast('Choose at least one role to continue.'); return; }
        localStorage.setItem('optiq-demo-roles', JSON.stringify(selected.map((i) => i.value)));
        localStorage.setItem('optiq-demo-active-role', selected[0].value);
        go('OptimIQ_Consultant_Workspace_Concept.html');
      });
    }
    if (file === 'OptimIQ_Consultant_Agreement_Gate.html') {
      document.querySelector('[data-demo-sign]')?.addEventListener('click', (e) => {
        document.querySelectorAll('.rows>div span').forEach((span) => { span.textContent = 'Signed in this browser demo'; });
        localStorage.setItem('optiq-demo-agreements-signed','true');
        e.currentTarget.textContent = 'Agreements marked signed · demo';
        e.currentTarget.disabled = true;
        const next = document.querySelector('[data-demo-next]');
        if (next) next.disabled = false;
        toast('Demo state updated: the agreement gate is marked complete in this browser.');
      });
      document.querySelector('[data-demo-next]')?.addEventListener('click', () => go('OptimIQ_Consultant_Engagements.html'));
    }
    if (file === 'OptimIQ_Consultant_Opportunities.html') {
      document.querySelectorAll('button').forEach((button) => {
        const label = button.textContent.trim();
        if (label === 'Express interest') { button.dataset.demoWired = 'true'; button.addEventListener('click', () => { button.textContent = 'Interest recorded · demo'; button.disabled = true; toast('Your demo interest is saved in this browser.'); }); }
        if (label === 'Prepare response') { button.dataset.demoWired = 'true'; button.addEventListener('click', () => go('OptimIQ_Consultant_Agreement_Gate.html')); }
      });
    }
    if (file === 'OptimIQ_Consultant_Communications.html') {
      const markRead = [...document.querySelectorAll('button')].find((b) => /mark all read/i.test(b.textContent));
      if (markRead) markRead.dataset.demoWired = 'true';
      markRead?.addEventListener('click', () => {
        document.querySelectorAll('.message.unread,.notification.unread,[data-unread="true"]').forEach((el) => { el.classList.remove('unread'); el.dataset.unread = 'false'; });
        markRead.textContent = 'All caught up';
        toast('Notifications marked as read for this demo.');
      });
    }
    if (file === 'OptimIQ_Consultant_Performance_CPD.html') {
      const add = [...document.querySelectorAll('button')].find((b) => /add activity/i.test(b.textContent));
      if (add) add.dataset.demoWired = 'true';
      add?.addEventListener('click', () => {
        const row = document.createElement('div'); row.innerHTML = '<b>New development activity</b><span>Draft · saved in this browser demo</span>';
        document.querySelector('.rows')?.append(row);
        toast('A sample CPD activity was added to this demo screen.');
      });
    }
    if (file === 'OptimIQ_Consultant_Project_Documents.html') {
      const upload = [...document.querySelectorAll('button')].find((b) => /upload document/i.test(b.textContent));
      if (upload) upload.dataset.demoWired = 'true';
      upload?.addEventListener('click', () => {
        const input = document.createElement('input'); input.type = 'file'; input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg'; input.hidden = true;
        document.body.append(input);
        input.addEventListener('change', () => { if (input.files?.length) { upload.textContent = `Selected: ${input.files[0].name}`; toast('File selected for the browser demo; it was not uploaded.'); } input.remove(); });
        input.click();
      });
    }
    if (file === 'OptimIQ_Consultant_Project_Calendar.html') {
      document.querySelectorAll('button').forEach((button) => {
        const label = button.textContent.trim();
        if (label.includes('Previous') || label.includes('Next')) { button.dataset.demoWired = 'true'; button.addEventListener('click', () => toast(`Calendar ${label.toLowerCase()} month · demo view.`)); }
      });
    }
    document.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); toast(`${a.textContent.trim().replace(/\s+/g,' ')} is shown as a front-end demo action.`); }));
    document.querySelectorAll('button:not(.ctq-back):not(.ctq-next):not(#continue):not(.sign-in)').forEach((button) => {
      if (button.type === 'submit' && button.closest('form')) return;
      if (button.closest('.login-form')) return;
      button.addEventListener('click', (e) => {
        if (button.dataset.demoWired || button.matches('[data-demo-sign],[data-demo-next]')) return;
        if (button.id === 'continue' || button.classList.contains('doc-action')) return;
        if (button.dataset.demoWired) return;
        if (e.defaultPrevented) return;
        const label = button.textContent.trim().replace(/\s+/g,' ') || 'Action';
        toast(`${label} is a simulated demo action. No information is sent to a server.`);
      });
    });
  }

  simplifyConsultantBreadcrumb();
  compactReviewIndex();
  setupDashboardPhases();
  addNavigation();
  addProfileMenu();
  addPhaseBadge();
  wireDemo();
})();
