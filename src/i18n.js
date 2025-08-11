import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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

export const initI18n = () =>
  i18next
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'es',
      supportedLngs: ['en', 'es'],
      nonExplicitSupportedLngs: true, // en-US -> en
      detection: {
        // Prioriza lo que define el navegador del runner
        order: ['navigator', 'htmlTag', 'querystring', 'cookie', 'localStorage'],
        caches: [], // sin cache para que no “pegue” un idioma previo
      },
      interpolation: { escapeValue: false },
    });

export default i18next;
