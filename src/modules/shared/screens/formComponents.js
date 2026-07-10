import { escapeHtml } from '../utils/html.js';

export function renderMessage(message, type = 'success', i18n, params = {}) {
  if (!message) {
    return '';
  }

  return `<p class="form-message form-message--${type}">${escapeHtml(translateText(message, i18n, params))}</p>`;
}

export function renderError(errors, fieldName, i18n) {
  if (!errors[fieldName]) {
    return '';
  }

  return `<span class="field-error">${escapeHtml(translateText(errors[fieldName], i18n))}</span>`;
}

export function renderEmptyState(message) {
  return `<p class="empty-state">${escapeHtml(message)}</p>`;
}

export function valueOrEmpty(value) {
  return escapeHtml(value ?? '');
}

export function numberOrEmpty(value) {
  return value === null || value === undefined ? '' : escapeHtml(value);
}

function translateText(value, i18n, params = {}) {
  if (!i18n?.t) {
    return value;
  }

  const translatedParams = Object.fromEntries(
    Object.entries(params).map(([key, paramValue]) => [
      key,
      typeof paramValue === 'string' && paramValue.includes('.')
        ? i18n.t(paramValue)
        : paramValue,
    ]),
  );

  return i18n.t(value, translatedParams);
}
