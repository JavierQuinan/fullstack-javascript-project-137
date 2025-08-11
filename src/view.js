import onChange from 'on-change';

// Render helpers (solo View)
const setFeedback = (elements, text, type) => {
  const { feedback } = elements;
  feedback.textContent = text || '';
  feedback.classList.remove('text-danger', 'text-success');
  if (type) feedback.classList.add(type); // 'text-danger' | 'text-success'
};

const toggleForm = (elements, disabled) => {
  const { input, submit } = elements;
  input.disabled = disabled;
  submit.disabled = disabled;
};

const renderValidation = (elements, error) => {
  const { input } = elements;
  if (error) {
    input.classList.add('is-invalid');
    setFeedback(elements, error, 'text-danger');
  } else {
    input.classList.remove('is-invalid');
    setFeedback(elements, 'RSS agregado correctamente', 'text-success');
  }
};

const renderFeeds = (elements, feeds) => {
  const { feedsContainer } = elements;
  // Simple placeholder (en esta etapa basta con listar URLs)
  feedsContainer.innerHTML = '';
  if (feeds.length === 0) return;

  const ul = document.createElement('ul');
  ul.className = 'list-group';
  feeds.forEach((f) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = f.url;
    ul.appendChild(li);
  });
  feedsContainer.appendChild(ul);
};

export default (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'form.processState': {
      // 'idle' | 'validating' | 'sending' (por si luego haces request real)
      toggleForm(elements, value !== 'idle');
      break;
    }

    case 'form.error': {
      renderValidation(elements, value);
      break;
    }

    case 'feeds': {
      renderFeeds(elements, value);
      break;
    }

    default:
      break;
  }
});
