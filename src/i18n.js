import i18next from 'i18next';

// Recursos mínimamente necesarios para esta etapa
const resources = {
  es: {
    translation: {
      success: {
        added: 'RSS agregado correctamente',
      },
      errors: {
        required: 'La URL es obligatoria',
        url: 'La URL no es válida',
        duplicate: 'El feed ya fue agregado',
        network: 'Error de red',
        parse: 'RSS inválido',
      },
      ui: {
        feedsTitle: 'Feeds',
      },
    },
  },
  en: {
    translation: {
      success: { added: 'RSS added successfully' },
      errors: {
        required: 'URL is required',
        url: 'URL is invalid',
        duplicate: 'Feed already added',
        network: 'Network error',
        parse: 'Invalid RSS',
      },
      ui: {
        feedsTitle: 'Feeds',
      },
    },
  },
};

// Devuelve una Promesa (sin async/await)
export const initI18n = (lng = 'es') =>
  i18next.init({
    lng,
    fallbackLng: 'es',
    resources,
    interpolation: { escapeValue: false },
  });

export default i18next;
