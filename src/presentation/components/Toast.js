import { escapeHtml } from '../../modules/shared/utils/html.js';

const VISIBLE_DELAY_MS = 20;
const AUTO_DISMISS_MS = 3500;
const FADE_OUT_MS = 300;

let toastRegion = null;

export function showToast({ icon, title, message }) {
  const region = getToastRegion();
  const toast = document.createElement('div');

  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">${escapeHtml(icon)}</span>
    <div class="toast__body">
      <p class="toast__title">${escapeHtml(title)}</p>
      <p class="toast__message">${escapeHtml(message)}</p>
    </div>
    <div class="toast__progress-track">
      <span class="toast__progress-bar"></span>
    </div>
  `;

  region.appendChild(toast);

  const progressBar = toast.querySelector('.toast__progress-bar');

  window.setTimeout(() => {
    toast.classList.add('toast--visible');
    progressBar.style.transitionDuration = `${AUTO_DISMISS_MS}ms`;
    requestAnimationFrame(() => {
      progressBar.style.width = '0%';
    });
  }, VISIBLE_DELAY_MS);

  window.setTimeout(() => {
    toast.classList.remove('toast--visible');
    window.setTimeout(() => toast.remove(), FADE_OUT_MS);
  }, AUTO_DISMISS_MS);
}

function getToastRegion() {
  if (toastRegion && document.body.contains(toastRegion)) {
    return toastRegion;
  }

  toastRegion = document.createElement('div');
  toastRegion.className = 'toast-region';
  toastRegion.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastRegion);

  return toastRegion;
}
