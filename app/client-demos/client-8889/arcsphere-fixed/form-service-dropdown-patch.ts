export const FORM_SERVICE_DROPDOWN_PATCH = `
<script id="nguyen-service-dropdown-patch">
(() => {
  const path = window.location.pathname;
  if (path !== '/' && !path.includes('/client-demos/client-8889/arcsphere-socal')) return;

  const SERVICES = [
    'Residential',
    'Commercial',
    'ADU & SB9',
    'Land Development',
    'Engineering',
    'Builders Complete Delivery'
  ];

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).toLowerCase();

  function isTargetScope(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    const text = compact(node.textContent);
    return text.includes('enter your details') &&
      text.includes('full name') &&
      text.includes('phone number') &&
      text.includes('project type') &&
      text.includes('project scale');
  }

  function findScope() {
    const forms = Array.from(document.querySelectorAll('form'));
    const exactForm = forms.find(isTargetScope);
    if (exactForm) return exactForm;

    const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,p,span,div'));
    const marker = candidates.find((node) => compact(node.textContent) === 'enter your details');
    if (!marker) return null;

    let node = marker;
    for (let depth = 0; node && depth < 12; depth += 1, node = node.parentElement) {
      if (isTargetScope(node)) return node;
    }
    return null;
  }

  function targetSelect(scope) {
    if (!scope) return null;
    const selects = Array.from(scope.querySelectorAll('select'));
    if (!selects.length) return null;

    return selects.find((select) => {
      const optionText = Array.from(select.options || []).map((option) => compact(option.textContent));
      return compact(select.value) === 'architectural' || optionText.includes('architectural');
    }) || (selects.length === 1 ? selects[0] : null);
  }

  function optionsAreCurrent(select) {
    const labels = Array.from(select.options || []).map((option) => normalize(option.textContent));
    return labels.length === SERVICES.length + 1 &&
      labels[0] === 'Select a Service' &&
      SERVICES.every((service, index) => labels[index + 1] === service);
  }

  function patchSelect(select) {
    if (!select || optionsAreCurrent(select)) return false;

    const previousName = select.getAttribute('name');
    const previousRequired = select.required;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a Service';
    placeholder.disabled = true;
    placeholder.selected = true;

    const fragment = document.createDocumentFragment();
    fragment.appendChild(placeholder);
    SERVICES.forEach((service) => {
      const option = document.createElement('option');
      option.value = service;
      option.textContent = service;
      fragment.appendChild(option);
    });

    select.replaceChildren(fragment);
    select.value = '';
    select.selectedIndex = 0;
    if (previousName) select.setAttribute('name', previousName);
    select.required = previousRequired;
    select.setAttribute('data-nguyen-service-dropdown', 'true');
    return true;
  }

  function patch() {
    const scope = findScope();
    const select = targetSelect(scope);
    if (!select) return false;
    patchSelect(select);
    return true;
  }

  patch();
  window.addEventListener('load', patch, { once: true });
  [100, 300, 700, 1500, 3000, 6000, 12000].forEach((delay) => setTimeout(patch, delay));

  let timer;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(patch, 60);
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 20000);
})();
</script>`;
