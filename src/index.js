import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.scss';

import initView from './view.js';
import { validateUrl } from './validation.js';
import i18n, { initI18n } from './i18n.js';
import { loadFeedXml, parseRss } from './rss.js';

const qs = (sel) => document.querySelector(sel);
const elements = {
  form: qs('#rss-form'),
  input: qs('#rss-url'),
  submit: qs('#rss-form button[type="submit"]'),
  feedback: qs('#feedback'),
  feedsContainer: qs('#feeds'),
};

// id simple (evitamos depender de crypto en navegadores viejos)
const uid = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

const state = {
  feeds: [], // [{ id, url, title, description }]
  posts: [], // [{ id, feedId, title, link, description }]
  form: {
    processState: 'idle',    // 'idle' | 'validating' | 'sending'
    errorCode: null,         // código i18n de error o null
  },
};

const getExistingUrls = (st) => st.feeds.map((f) => f.url);

// pipeline: validar -> descargar -> parsear -> guardar
const addFeedPipeline = (url, watched) =>
  validateUrl(url, getExistingUrls(watched))
    .then(() => {
      watched.form.processState = 'sending';
      return loadFeedXml(url);
    })
    .then((xml) => parseRss(xml))
    .then(({ feed, items }) => {
      const feedId = uid();
      const newFeed = { id: feedId, url, title: feed.title, description: feed.description };
      const newPosts = items.map((it) => ({
        id: uid(),
        feedId,
        title: it.title,
        link: it.link,
        description: it.description,
      }));

      watched.feeds = [newFeed, ...watched.feeds];
      watched.posts = [...newPosts, ...watched.posts];

      elements.form.reset();
      elements.input.focus();
      watched.form.errorCode = null; // éxito -> mensaje de éxito en View
    });

initI18n('es').then(() => {
  const watched = initView(state, elements, i18n);
  elements.input.focus();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.input.value.trim();

    watched.form.errorCode = null;
    watched.form.processState = 'validating';

    addFeedPipeline(url, watched)
      .catch((err) => {
        const code = err?.message || 'errors.network';
        watched.form.errorCode = code;
      })
      .finally(() => {
        watched.form.processState = 'idle';
      });
  });
});
