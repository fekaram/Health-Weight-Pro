export function registerServiceWorker(logger) {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const base = import.meta.env.BASE_URL;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch((error) => {
      logger?.warn('Service worker registration failed.', { error: error.message });
    });
  });
}
