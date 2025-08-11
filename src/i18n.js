import i18next from 'i18next';

const resources = {
  es: {
    translation: {
      success: { added: 'RSS cargado con éxito' },
      errors: {
        required: 'No debe estar vacío',
        url: 'El enlace debe ser una URL válida',
        duplicate: 'El RSS ya existe',
        parse: 'El recurso no contiene un RSS válido',
        network: 'Error de red',
      },
      ui: {
        feedsTitle: 'Feeds',
        postsTitle: 'Posts',
        preview: 'Vista previa',
      },
    },
  },
  en: {
    translation: {
      success: { added: 'RSS has been loaded' },
      errors: {
        required: 'Must not be empty',
        url: 'The link must be a valid URL',
        duplicate: 'RSS already exists',
        parse: 'The resource does not contain a valid RSS',
        network: 'Network error',
      },
      ui: {
        feedsTitle: 'Feeds',
        postsTitle: 'Posts',
        preview: 'Preview',
      },
    },
  },
};

// Nota: dejamos i18n sin detector para evitar incertidumbre en CI.
// Por defecto usará 'es' (fallback), pero en index.js forzamos 'en'.
export const initI18n = () =>
  i18next.init({
    resources,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18next;
