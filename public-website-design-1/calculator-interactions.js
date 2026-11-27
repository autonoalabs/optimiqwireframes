/* Review-only calculator UX: sharing, explicit session transfer, and guide navigation. */
(() => {
  'use strict';
  const keyFor = (audience) => `optimiq:review-estimate:${audience}`;
  const summaryFor = (root) => {
    const value = root.querySelector('.big')?.textContent.trim() || 'Estimate unavailable';
    const caption = root.querySelector('.cap')?.textContent.trim() || 'Illustrative estimate';
    const inputs = [...root.querySelectorAll('input, [data-group] [aria-pressed="true"]')]
      .map((node) => node.matches('input') ? `${node.closest('.field')?.querySelector('label')?.textContent || node.id}: ${node.value}` : node.textContent.trim())
      .filter(Boolean);
    return { audience: root.dataset.tool, value, caption, inputs, created: Date.now() };
  };

  document.querySelectorAll('.workbench[data-tool]').forEach((root) => {
    const audience = root.dataset.tool;
    const consent = root.querySelector('[data-estimate-consent]');
    const apply = root.querySelector('[data-apply]');
    if (apply && consent) {
      apply.addEventListener('click', () => {
        if (consent.checked) sessionStorage.setItem(keyFor(audience), JSON.stringify(summaryFor(root)));
        else sessionStorage.removeItem(keyFor(audience));
      });
      consent.addEventListener('change', () => {
        if (!consent.checked) sessionStorage.removeItem(keyFor(audience));
      });
    }
    const share = root.querySelector('[data-share]');
    const status = root.querySelector('[data-share-status]');
    share?.addEventListener('click', async (event) => {
      event.preventDefault();
      const url = new URL(share.getAttribute('href'), location.href).href;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
        else {
          const input = document.createElement('textarea'); input.value = url;
          input.setAttribute('readonly', ''); input.style.position = 'fixed'; input.style.opacity = '0';
          document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
        }
        if (status) status.textContent = 'Calculator link copied.';
      } catch { if (status) status.textContent = url; }
    });
  });

  document.querySelectorAll('form[data-registration]').forEach((form) => {
    const audience = form.dataset.registration;
    const saved = sessionStorage.getItem(keyFor(audience));
    if (!saved) return;
    let estimate;
    try { estimate = JSON.parse(saved); } catch { sessionStorage.removeItem(keyFor(audience)); return; }
    const card = document.createElement('aside'); card.className = 'estimate-transfer';
    const title = document.createElement('strong'); title.textContent = 'Your estimate';
    const amount = document.createElement('p'); amount.textContent = `${estimate.value} ${estimate.caption}`;
    const detail = document.createElement('p'); detail.className = 'fine';
    detail.textContent = 'You chose to include this illustrative estimate for this enquiry. It has not been sent.';
    const answers = document.createElement('details');
    const answersTitle = document.createElement('summary'); answersTitle.textContent = 'Included answers'; answers.append(answersTitle);
    const answersList = document.createElement('ul');
    (estimate.inputs || []).forEach((answer) => { const item = document.createElement('li'); item.textContent = answer; answersList.append(item); });
    answers.append(answersList);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'text-btn'; remove.textContent = 'Remove estimate';
    remove.addEventListener('click', () => { sessionStorage.removeItem(keyFor(audience)); card.remove(); });
    card.append(title, amount, answers, detail, remove); form.prepend(card);
  });

  document.querySelectorAll('form[data-guide-gate]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      location.href = form.dataset.guideNext;
    });
  });
})();
