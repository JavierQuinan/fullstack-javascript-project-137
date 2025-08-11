import * as yup from 'yup';

// Hacemos que yup emita códigos de error (que luego traducimos con i18next)
yup.setLocale({
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.duplicate',
  },
  string: {
    url: 'errors.url',
  },
});

// esquema a partir de URLs existentes
export const makeUrlSchema = (existingUrls) => {
  const normalized = existingUrls.map((u) => u.trim());
  return yup
    .string()
    .trim()
    .required()
    .url()
    .notOneOf(normalized);
};

// Valida y devuelve una Promesa que, en caso de error, tendrá .errors con códigos
export const validateUrl = (url, existingUrls) => {
  const schema = makeUrlSchema(existingUrls);
  return schema.validate(url, { abortEarly: false });
};
