// Descarga el XML del feed con All Origins (sin caché)
export const loadFeedXml = (url) => {
  const encoded = encodeURIComponent(url);
  const endpoint = `https://allorigins.hexlet.app/get?disableCache=true&url=${encoded}`;

  return fetch(endpoint)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error('errors.network'))))
    .then((data) => {
      if (!data || typeof data.contents !== 'string') {
        return Promise.reject(new Error('errors.network'));
      }
      return data.contents;
    })
    .catch(() => Promise.reject(new Error('errors.network')));
};

// Parsea el XML -> { feed: {title, description}, items: [{title, link, description}] }
export const parseRss = (xmlString) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');
    const parserError = doc.querySelector('parsererror');
    if (parserError) throw new Error('errors.parse');

    const channel = doc.querySelector('channel');
    const feed = {
      title: channel?.querySelector('title')?.textContent?.trim() ?? '',
      description: channel?.querySelector('description')?.textContent?.trim() ?? '',
    };
    const items = Array.from(doc.querySelectorAll('item')).map((item) => ({
      title: item.querySelector('title')?.textContent?.trim() ?? '',
      link: item.querySelector('link')?.textContent?.trim() ?? '',
      description: item.querySelector('description')?.textContent?.trim() ?? '',
    }));

    if (!feed.title) throw new Error('errors.parse');
    return { feed, items };
  } catch (e) {
    const code = e?.message || 'errors.parse';
    throw new Error(code);
  }
};
