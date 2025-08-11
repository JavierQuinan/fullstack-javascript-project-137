import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.scss';

import initView from './view.js';
import { validateUrl } from './validation.js';
import i18n, { initI18n } from './i18n.js';

const qs = (sel) => document.querySelector(sel);
const elements = {
  form: qs('#rss-form'),
  input: qs('#rss-url'),
  submit: qs('#rss-form button[type="submit"]'),
  feedback: qs('#feedback'),
  feedsContainer: qs('#feeds'),
};

const state = {
  feeds: [], // [{ url }]
  form: {
    processState: 'idle', // 'idle' | 'validating'
    errorCode: null,      // string (código i18n) | null
  },
};

const getExistingUrls = (st) => st.feeds.map((f) => f.url);
const toFeed = (url) => ({ url });

// Inicializamos i18next con Promesa y luego montamos la app
initI18n('es')
  .then(() => {
    const watched = initView(state, elements, i18n);
    elements.input.focus();

    elements.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = elements.input.value.trim();

      watched.form.errorCode = null;
      watched.form.processState = 'validating';

      validateUrl(url, getExistingUrls(watched))
        .then(() => {
          watched.feeds = [toFeed(url), ...watched.feeds];

          elements.form.reset();
          elements.input.focus();

          watched.form.errorCode = null; // dispara mensaje de éxito traducido
        })
        .catch((err) => {
          const key = err.errors?.[0] || 'errors.parse';
          watched.form.errorCode = key;  // guardamos CÓDIGO, no texto
        })
        .finally(() => {
          watched.form.processState = 'idle';
        });
    });
  });
