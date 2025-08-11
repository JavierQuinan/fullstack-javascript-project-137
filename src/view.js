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

  const list = document.createElement('ul');
  list.className = 'list-group';

  feeds.forEach((f) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    const h3 = document.createElement('h3');
    h3.className = 'h6 mb-1';
    h3.textContent = f.title;

    const p = document.createElement('p');
    p.className = 'mb-0 small text-muted';
    p.textContent = f.description;

    li.appendChild(h3);
    li.appendChild(p);
    list.appendChild(li);
  });

  container.appendChild(title);
  container.appendChild(list);
};

const renderPosts = (els, posts, i18n) => {
  const id = 'posts-container';
  let wrapper = document.getElementById(id);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = id;
    els.feedsContainer.after(wrapper);
  }

  wrapper.innerHTML = '';
  if (!posts.length) return;

  const title = document.createElement('h2');
  title.className = 'h5 mb-3';
  title.textContent = i18n.t('ui.postsTitle');

  const list = document.createElement('ul');
  list.className = 'list-group';

  posts.forEach((p) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';

    const a = document.createElement('a');
    a.href = p.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = p.title;

    li.appendChild(a);
    list.appendChild(li);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(list);
};

export default (state, elements, i18n) =>
  onChange(state, (path, value) => {
    if (path === 'form.processState') setFormDisabled(elements, value !== 'idle');
    if (path === 'form.errorCode') renderValidation(elements, value, i18n);
    if (path === 'feeds') renderFeeds(elements, value, i18n);
    if (path === 'posts') renderPosts(elements, value, i18n);
  });
