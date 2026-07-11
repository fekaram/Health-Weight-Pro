import {
  APP_DISPLAY_NAME,
  APP_VERSION,
  applyDocumentPreferences,
  createI18nContext,
} from '../../app/localization/i18n.js';
import { todayDate } from '../../modules/shared/utils/records.js';

const ACHIEVABLE_GOAL_KEYS = ['water', 'sleep', 'steps', 'protein', 'calories'];

export class AppViewModel {
  constructor({ eventBus, logger, modules, persistence, router, storage }) {
    this.eventBus = eventBus;
    this.logger = logger;
    this.modules = modules;
    this.persistence = persistence;
    this.router = router;
    this.storage = storage;
    this.celebratedGoals = new Set();
    this.justAchievedKeys = [];
    this.allGoalsJustAchieved = false;
  }

  async initialize() {
    await this.storage.initialize();
    await Promise.all(Object.values(this.modules).map((moduleViewModel) => moduleViewModel.initialize()));
    this.#seedCelebratedGoals();
    applyDocumentPreferences(this.getSettings());
    this.updateDocumentTitle(this.router.getCurrentRoute());
    this.eventBus.publish('app:initialized');
  }

  getState() {
    const currentRoute = this.router.getCurrentRoute();
    const i18n = this.getI18nContext();

    return {
      appName: APP_DISPLAY_NAME,
      appVersion: APP_VERSION,
      currentRoute: this.translateRoute(currentRoute, i18n),
      currentModuleState: this.getModuleState(currentRoute.moduleKey, i18n),
      i18n,
      routes: this.getTranslatedRoutes(i18n),
      fab: this.getFabState(i18n),
    };
  }

  navigate(pathname) {
    this.modules.fab?.handleAction('close');
    this.router.navigate(pathname);
  }

  getFabState(i18n = this.getI18nContext()) {
    return {
      ...this.modules.fab?.getState(),
      today: this.modules['daily-habits']?.getState()?.today ?? null,
      app: {
        appName: APP_DISPLAY_NAME,
        appVersion: APP_VERSION,
        i18n,
        language: i18n.language,
        settings: this.getSettings(),
        units: i18n.units,
      },
    };
  }

  onRouteChange(listener) {
    return this.router.onChange((route) => {
      this.updateDocumentTitle(route);
      listener(this.translateRoute(route, this.getI18nContext()));
    });
  }

  getModuleState(moduleKey, i18n = this.getI18nContext()) {
    const moduleState = this.modules[moduleKey]?.getState() ?? {};

    return {
      ...moduleState,
      justAchievedKeys: moduleKey === 'dashboard' ? this.justAchievedKeys : [],
      allGoalsJustAchieved: moduleKey === 'dashboard' ? this.allGoalsJustAchieved : false,
      app: {
        appName: APP_DISPLAY_NAME,
        appVersion: APP_VERSION,
        i18n,
        language: i18n.language,
        settings: this.getSettings(),
        units: i18n.units,
      },
      backupStatus:
        moduleKey === 'settings' ? this.modules['backup-restore']?.getState() ?? {} : moduleState.backupStatus,
      developer: moduleKey === 'settings' ? this.modules.developer?.getState() ?? {} : undefined,
    };
  }

  async handleAction(moduleKey, action, payload = {}) {
    const moduleViewModel = this.modules[moduleKey];

    if (!moduleViewModel) {
      this.logger.warn('Unknown module action ignored.', { moduleKey, action });
      return;
    }

    await moduleViewModel.handleAction(action, payload);

    // Pure UI state (no business data changed) — skip the cross-module refresh cascade below.
    if (moduleKey === 'settings' && action === 'toggleSection') {
      return;
    }

    await this.#refreshAfterAction(moduleKey, action);
    this.#checkGoalAchievements();
    applyDocumentPreferences(this.getSettings());
    this.updateDocumentTitle(this.router.getCurrentRoute());
  }

  getSettings() {
    return this.modules.settings?.getState().settings ?? {};
  }

  getI18nContext() {
    return createI18nContext(this.getSettings());
  }

  getTranslatedRoutes(i18n) {
    const settings = this.getSettings();

    return this.router
      .getRoutes()
      .filter((route) => route.id !== 'medication' || settings.medication?.enabled !== false)
      .map((route) => this.translateRoute(route, i18n));
  }

  translateRoute(route, i18n) {
    return {
      ...route,
      label: route.labelKey ? i18n.t(route.labelKey) : route.label,
      section: route.sectionKey ? i18n.t(route.sectionKey) : route.section,
      href: this.router.toHref(route.path),
    };
  }

  updateDocumentTitle(route) {
    const i18n = this.getI18nContext();
    const translatedRoute = this.translateRoute(route, i18n);

    document.title = `${translatedRoute.label} | ${APP_DISPLAY_NAME}`;
  }

  async #refreshAfterAction(moduleKey, action) {
    if (moduleKey === 'backup-restore' && action === 'import') {
      await Promise.all(
        Object.values(this.modules).map((moduleViewModel) => moduleViewModel.initialize()),
      );
      return;
    }

    await this.modules.dashboard?.refresh?.();

    if (moduleKey !== 'meal-journal') {
      await this.modules['meal-journal']?.initialize?.();
    }

    if (moduleKey !== 'food-library') {
      await this.modules['food-library']?.load?.();
    }

    if (moduleKey !== 'favorites') {
      await this.modules.favorites?.load?.();
    }

    if (moduleKey !== 'meal-plans') {
      await this.modules['meal-plans']?.load?.();
    }

    if (moduleKey !== 'settings') {
      await this.modules.settings?.initialize?.();
    }
  }

  #getGoalStatuses() {
    const summary = this.modules.dashboard?.getState()?.summary ?? {};
    const settings = this.getSettings();
    const habits = summary.dailyHabits ?? {};
    const dashboardCards = settings.dashboardCards ?? {};

    const goalsByKey = {
      water: { current: habits.waterMl ?? 0, goal: settings.waterGoal ?? 0 },
      sleep: { current: habits.sleepMinutes ?? 0, goal: (settings.sleepGoal ?? 0) * 60 },
      steps: { current: habits.steps ?? 0, goal: settings.stepGoal ?? 0 },
      protein: { current: 0, goal: settings.proteinGoal ?? 0 },
      calories: { current: 0, goal: settings.calorieGoal ?? 0 },
    };

    return ACHIEVABLE_GOAL_KEYS.map((key) => {
      const { current, goal } = goalsByKey[key];

      return {
        key,
        enabled: (dashboardCards[key] ?? true) && goal > 0,
        achieved: goal > 0 && current >= goal,
      };
    });
  }

  #getAchievedGoalKeys() {
    return this.#getGoalStatuses()
      .filter((status) => status.achieved)
      .map((status) => status.key);
  }

  #areAllEnabledGoalsAchieved() {
    const enabledStatuses = this.#getGoalStatuses().filter((status) => status.enabled);

    return enabledStatuses.length > 0 && enabledStatuses.every((status) => status.achieved);
  }

  #seedCelebratedGoals() {
    const today = todayDate();

    this.#getAchievedGoalKeys().forEach((key) => this.celebratedGoals.add(`${key}:${today}`));

    if (this.#areAllEnabledGoalsAchieved()) {
      this.celebratedGoals.add(`all:${today}`);
    }
  }

  #checkGoalAchievements() {
    const today = todayDate();

    this.justAchievedKeys = this.#getAchievedGoalKeys().filter((key) => {
      const celebrationKey = `${key}:${today}`;

      if (this.celebratedGoals.has(celebrationKey)) {
        return false;
      }

      this.celebratedGoals.add(celebrationKey);
      this.eventBus.publish('dashboard:goal-achieved', { key });
      return true;
    });

    const allCelebrationKey = `all:${today}`;

    this.allGoalsJustAchieved =
      !this.celebratedGoals.has(allCelebrationKey) && this.#areAllEnabledGoalsAchieved();

    if (this.allGoalsJustAchieved) {
      this.celebratedGoals.add(allCelebrationKey);
      this.eventBus.publish('dashboard:all-goals-achieved');
    }
  }
}
