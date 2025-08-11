import * as yup from 'yup';

yup.setLocale({
  mixed: { required: 'errors.required', notOneOf: 'errors.duplicate' },
  string: { url: 'errors.url' },
});

export const makeUrlSchema = (existingUrls) => {
  const normalized = existingUrls.map((u) => u.trim());
  return yup.string().trim().required().url().notOneOf(normalized);
};

export const validateUrl = (url, existingUrls) => {
  const schema = makeUrlSchema(existingUrls);
  return schema.validate(url, { abortEarly: false });
};
