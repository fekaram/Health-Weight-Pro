import { EventBus } from '../core/events/EventBus.js';
import { Logger } from '../core/logging/Logger.js';
import { createPersistenceLayer } from '../infrastructure/storage/createPersistenceLayer.js';
import { registerGoalAchievementToasts } from '../presentation/notifications/goalAchievementToasts.js';
import { AppViewModel } from '../presentation/viewmodels/AppViewModel.js';
import { renderAppShell } from '../presentation/shell/renderAppShell.js';
import { createCoreMvpModules } from './createCoreMvpModules.js';
import { createRouter } from './navigation/createRouter.js';
import { routes } from './navigation/routes.js';

export function createApplication({ root }) {
  const logger = new Logger({ namespace: 'HWP' });
  const eventBus = new EventBus();
  const persistence = createPersistenceLayer({ logger });
  const modules = createCoreMvpModules({ persistence, eventBus });
  const router = createRouter({ routes, logger });
  const viewModel = new AppViewModel({
    eventBus,
    logger,
    modules,
    persistence,
    router,
    storage: persistence.storage,
  });

  registerGoalAchievementToasts({ eventBus, getI18nContext: () => viewModel.getI18nContext() });

  return {
    logger,
    async start() {
      if (!root) {
        throw new Error('Application root element was not found.');
      }

      await viewModel.initialize();
      renderAppShell({ root, viewModel });
      router.start();
      logger.info('Application shell started.');
    },
  };
}
