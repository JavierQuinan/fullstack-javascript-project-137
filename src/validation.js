import * as yup from 'yup';

// Construye el esquema en función de los feeds ya existentes.
// Composición: recibe dependencias (urls actuales) -> devuelve esquema.
export const makeUrlSchema = (existingUrls) => {
  // normalizamos para comparar sin sesgos de espacios
  const normalized = existingUrls.map((u) => u.trim());
  return yup
    .string()
    .trim()
    .required('La URL es obligatoria')
    .url('La URL no es válida')
    .notOneOf(normalized, 'El feed ya fue agregado');
};

// Valida y retorna una promesa (sin async/await)
export const validateUrl = (url, existingUrls) => {
  const schema = makeUrlSchema(existingUrls);
  // validate() devuelve una Promesa; abortEarly:false si luego quieres acumular mensajes
  return schema.validate(url, { abortEarly: false });
};
