const base = import.meta.env.BASE_URL;

// Routes are keyed by "logical" paths (e.g. '/meal-journal') everywhere else in the app —
// navigate(), route.path, data-route attributes, etc. all stay in that vocabulary. Only this
// module translates to/from the real browser pathname, which is prefixed with the deployment
// base path (e.g. '/Health-Weight-Pro/meal-journal' on GitHub Pages, '/meal-journal' locally).
function toBrowserPath(logicalPath) {
  if (logicalPath === '/') {
    return base;
  }

  return `${base}${logicalPath.slice(1)}`;
}

function toLogicalPath(browserPathname) {
  if (!browserPathname.startsWith(base)) {
    return '/';
  }

  const rest = browserPathname.slice(base.length).replace(/\/+$/, '');

  return rest ? `/${rest}` : '/';
}

export function createRouter({ routes, logger }) {
  const routeMap = new Map(routes.map((route) => [route.path, route]));
  const listeners = new Set();
  let currentRoute = routeMap.get('/') ?? routes[0];

  function resolveRoute(logicalPath) {
    return routeMap.get(logicalPath) ?? routeMap.get('/') ?? currentRoute;
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

    // Resolves a logical route path (route.path) to the real, base-prefixed URL a browser
    // needs for <a href>, so right-click / open-in-new-tab / no-JS still work correctly.
    toHref(logicalPath) {
      return toBrowserPath(logicalPath);
    },

    navigate(logicalPath) {
      const nextRoute = resolveRoute(logicalPath);

      if (nextRoute.path === currentRoute.path) {
        return;
      }

      currentRoute = nextRoute;
      window.history.pushState({}, '', toBrowserPath(currentRoute.path));
      document.title = `${currentRoute.label} | Health Weight Pro`;
      logger.info('Navigation changed.', { path: currentRoute.path });
      notify();
    },

    onChange(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    start() {
      currentRoute = resolveRoute(toLogicalPath(window.location.pathname));
      document.title = `${currentRoute.label} | Health Weight Pro`;
      window.addEventListener('popstate', () => {
        currentRoute = resolveRoute(toLogicalPath(window.location.pathname));
        document.title = `${currentRoute.label} | Health Weight Pro`;
        notify();
      });
      notify();
    },
  };
}
