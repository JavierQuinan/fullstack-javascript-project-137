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
};

export const initI18n = (lng = 'es') =>
  i18next.init({ lng, fallbackLng: 'es', resources, interpolation: { escapeValue: false } });

export default i18next;
