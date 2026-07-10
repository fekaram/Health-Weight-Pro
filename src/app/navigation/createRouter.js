export function createRouter({ routes, logger }) {
  const routeMap = new Map(routes.map((route) => [route.path, route]));
  const listeners = new Set();
  let currentRoute = routeMap.get('/') ?? routes[0];

  function resolveRoute(pathname) {
    return routeMap.get(pathname) ?? routeMap.get('/') ?? currentRoute;
  }

  function notify() {
    listeners.forEach((listener) => listener(currentRoute));
  }

  return {
    getCurrentRoute() {
      return currentRoute;
    },

    getRoutes() {
      return routes;
    },

    navigate(pathname) {
      const nextRoute = resolveRoute(pathname);

      if (nextRoute.path === currentRoute.path) {
        return;
      }

      currentRoute = nextRoute;
      window.history.pushState({}, '', currentRoute.path);
      document.title = `${currentRoute.label} | Health Weight Pro`;
      logger.info('Navigation changed.', { path: currentRoute.path });
      notify();
    },

    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    start() {
      currentRoute = resolveRoute(window.location.pathname);
      document.title = `${currentRoute.label} | Health Weight Pro`;
      window.addEventListener('popstate', () => {
        currentRoute = resolveRoute(window.location.pathname);
        document.title = `${currentRoute.label} | Health Weight Pro`;
        notify();
      });
      notify();
    },
  };
}
