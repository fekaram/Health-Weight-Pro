export function registerServiceWorker(logger) {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      logger?.warn('Service worker registration failed.', { error: error.message });
    });
  });
}
