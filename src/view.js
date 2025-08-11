import onChange from 'on-change';

const setFeedback = (els, text, className) => {
  const { feedback } = els;
  feedback.textContent = text || '';
  feedback.classList.remove('text-danger', 'text-success');
  if (className) feedback.classList.add(className);
};

const setFormDisabled = (els, disabled) => {
  els.input.disabled = disabled;
  els.submit.disabled = disabled;
};

const renderValidation = (els, errorCode, i18n) => {
  if (errorCode) {
    els.input.classList.add('is-invalid');
    setFeedback(els, i18n.t(errorCode), 'text-danger');
  } else {
    els.input.classList.remove('is-invalid');
    setFeedback(els, i18n.t('success.added'), 'text-success');
  }
};

const renderFeeds = (els, feeds, i18n) => {
  const container = els.feedsContainer;
  container.innerHTML = '';
  if (!feeds.length) return;

  const title = document.createElement('h2');
  title.className = 'h5 mb-3';
  title.textContent = i18n.t('ui.feedsTitle');

  const ul = document.createElement('ul');
  ul.className = 'list-group';
  feeds.forEach((f) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = f.url;
    ul.appendChild(li);
  });

  container.appendChild(title);
  container.appendChild(ul);
};

export default (state, elements, i18n) =>
  onChange(state, (path, value) => {
    if (path === 'form.processState') setFormDisabled(elements, value !== 'idle');
    if (path === 'form.errorCode') renderValidation(elements, value, i18n);
    if (path === 'feeds') renderFeeds(elements, value, i18n);
  });
