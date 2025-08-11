import onChange from 'on-change';
import Modal from 'bootstrap/js/dist/modal';

// ---------- helpers UI ----------
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

const ensurePostsWrapper = (els) => {
  const id = 'posts-container';
  let wrapper = document.getElementById(id);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = id;
    els.feedsContainer.after(wrapper);
  }
  return wrapper;
};

const ensurePreviewModal = () => {
  let modal = document.getElementById('previewModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'previewModal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="previewModalLabel"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body" id="previewModalBody"></div>
        <div class="modal-footer">
          <a class="btn btn-primary" id="previewReadFull" target="_blank" rel="noopener noreferrer">Leer completo</a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
};

// ---------- renders ----------
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

const renderPosts = (els, state, i18n) => {
  const wrapper = ensurePostsWrapper(els);
  const { posts, viewedPostIds } = state;

  wrapper.innerHTML = '';
  if (!posts.length) return;

  const title = document.createElement('h2');
  title.className = 'h5 mb-3';
  title.textContent = i18n.t('ui.postsTitle');

  const list = document.createElement('ul');
  list.className = 'list-group';

  posts.forEach((p) => {
    const isRead = viewedPostIds.includes(p.id);

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start gap-2';

    const a = document.createElement('a');
    a.href = p.link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.dataset.id = p.id; // para marcar leído al hacer click
    a.className = isRead ? 'fw-normal' : 'fw-bold';
    a.textContent = p.title;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-primary btn-sm';
    btn.dataset.id = p.id;
    btn.textContent = 'Vista previa';

    li.appendChild(a);
    li.appendChild(btn);
    list.appendChild(li);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(list);
};

// ---------- eventos delegados para posts (preview y marcar leído) ----------
const attachPostsEventsOnce = (els, state, actions) => {
  const wrapper = ensurePostsWrapper(els);
  if (wrapper._eventsAttached) return;
  wrapper._eventsAttached = true;

  // Click en enlaces: marcar leído
  wrapper.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-id]');
    if (a) {
      actions(state).markPostRead(a.dataset.id);
      return;
    }
    const btn = e.target.closest('button[data-id]');
    if (btn) {
      const id = btn.dataset.id;
      const post = actions(state).getPostById(id);
      if (!post) return;

      // marcar leído
      actions(state).markPostRead(id);

      // abrir modal
      const modalEl = ensurePreviewModal();
      const modalTitle = modalEl.querySelector('#previewModalLabel');
      const modalBody = modalEl.querySelector('#previewModalBody');
      const readFull = modalEl.querySelector('#previewReadFull');

      modalTitle.textContent = post.title;
      modalBody.textContent = post.description || '';
      readFull.href = post.link;

      const instance = Modal.getOrCreateInstance(modalEl);
      instance.show();
    }
  });
};

// ---------- init ----------
export default (state, elements, i18n, actionsFactory) => {
  // engancha watchers
  const watched = onChange(state, (path) => {
    if (path === 'form.processState') setFormDisabled(elements, state.form.processState !== 'idle');
    if (path === 'form.errorCode') renderValidation(elements, state.form.errorCode, i18n);
    if (path === 'feeds') renderFeeds(elements, state.feeds, i18n);
    if (path === 'posts' || path === 'viewedPostIds') renderPosts(elements, state, i18n);
  });

  // una sola vez: preparar wrapper y eventos
  ensurePostsWrapper(elements);
  attachPostsEventsOnce(elements, watched, actionsFactory);

  return watched;
};
