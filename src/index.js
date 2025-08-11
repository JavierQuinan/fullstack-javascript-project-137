import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './styles.scss';

import initView from './view.js';
import { validateUrl } from './validation.js';
import i18n, { initI18n } from './i18n.js';
import { loadFeedXml, parseRss } from './rss.js';

const run = () => {
    const qs = (sel) => document.querySelector(sel);
    const elements = {
        form: qs('#rss-form'),
        input: qs('#rss-url'),
        submit: qs('#rss-form button[type="submit"]'),
        feedback: qs('#feedback'),
        feedsContainer: qs('#feeds'),
    };

    // ID simple para entidades
    const uid = () => (window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

    const state = {
        feeds: [], // [{ id, url, title, description }]
        posts: [], // [{ id, feedId, title, link, description }]
        viewedPostIds: [], // IDs de posts leídos
        form: {
            processState: 'idle', // 'idle' | 'validating' | 'sending'
            errorCode: null,      // string | null (código i18n)
        },
    };

    const getExistingUrls = (st) => st.feeds.map((f) => f.url);

    // ---- Pipeline de agregado: validar -> descargar -> parsear -> guardar
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
                    id: uid(), feedId, title: it.title, link: it.link, description: it.description,
                }));

                watched.feeds = [newFeed, ...watched.feeds];
                watched.posts = [...newPosts, ...watched.posts];

                elements.form.reset();
                elements.input.focus();
                watched.form.errorCode = null; // éxito -> mensaje traducido en View
            });

    // ---- Seguimiento cada 5s con setTimeout (no setInterval)
    const makeKnownLinksSet = (posts) => new Set(posts.map((p) => p.link));

    const mergeNewPosts = (watched, feedId, items) => {
        const known = makeKnownLinksSet(watched.posts);
        const fresh = items
            .filter((it) => it.link && !known.has(it.link))
            .map((it) => ({ id: uid(), feedId, title: it.title, link: it.link, description: it.description }));
        if (fresh.length) watched.posts = [...fresh, ...watched.posts];
    };

    const refreshOneFeed = (feed) =>
        loadFeedXml(feed.url)
            .then((xml) => parseRss(xml))
            .then(({ items }) => ({ feedId: feed.id, items }));

    const refreshAllFeeds = (watched) => {
        const feeds = watched.feeds;
        if (!feeds.length) return Promise.resolve();
        return Promise.allSettled(feeds.map(refreshOneFeed))
            .then((results) => {
                results.forEach((res) => {
                    if (res.status === 'fulfilled') {
                        const { feedId, items } = res.value;
                        mergeNewPosts(watched, feedId, items);
                    }
                });
            });
    };

    const scheduleUpdates = (watched, delayMs = 5000) => {
        const tick = () => {
            refreshAllFeeds(watched)
                .catch(() => null)
                .finally(() => setTimeout(tick, delayMs));
        };
        setTimeout(tick, delayMs);
    };

    // ==== API que pasa la View para manejar leído/preview ====
    const actionsFactory = (watched) => ({
        getPostById: (id) => watched.posts.find((p) => p.id === id),
        markPostRead: (id) => {
            if (!watched.viewedPostIds.includes(id)) {
                watched.viewedPostIds = [...watched.viewedPostIds, id]; // reassign para on-change
            }
        },
    });

    // ---- Arranque (ES por defecto)
    // ---- Arranque
    initI18n().then(() => {
        const watched = initView(state, elements, i18n, actionsFactory);
        elements.input.focus();

        // Inicia el seguimiento periódico
        scheduleUpdates(watched, 5000);

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
};

run();
