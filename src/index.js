import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.scss';

import initView from './view.js';
import { validateUrl } from './validation.js';

const buildElements = () => ({
  form: document.getElementById('rss-form'),
  input: document.getElementById('rss-url'),
  submit: document.querySelector('#rss-form button[type="submit"]'),
  feedback: document.getElementById('feedback'),
  feedsContainer: document.getElementById('feeds'),
});

const initialState = {
  feeds: [],                 // [{ url }]
  form: {
    processState: 'idle',    // 'idle' | 'validating'
    error: null,             // string | null
  },
};

// Helpers de “pipeline”
const getExistingUrls = (state) => state.feeds.map((f) => f.url);
const toFeed = (url) => ({ url });

const run = () => {
  const elements = buildElements();
  const state = JSON.parse(JSON.stringify(initialState));
  const watched = initView(state, elements);

  // foco inicial
  elements.input.focus();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.input.value.trim();

    // limpiamos feedback previo y marcamos estado
    watched.form.error = null;
    watched.form.processState = 'validating';

    // VALIDACIÓN (Promesas, sin async/await)
    validateUrl(url, getExistingUrls(watched))
      .then(() => {
        // éxito: agregamos feed
        watched.feeds = [toFeed(url)].concat(watched.feeds);

        // reset visual del formulario
        elements.form.reset();
        elements.input.focus();

        // al no haber error, view muestra success
        watched.form.error = null;
      })
      .catch((err) => {
        // Yup puede devolver múltiples errores; tomamos el primero legible
        const message = err.errors && err.errors.length ? err.errors[0] : err.message;
        watched.form.error = message || 'Error de validación';
      })
      .finally(() => {
        watched.form.processState = 'idle';
      });
  });
};

run();
