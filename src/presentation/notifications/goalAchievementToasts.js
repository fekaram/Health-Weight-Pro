import { showToast } from '../components/Toast.js';

const TOAST_CONFIG_BY_KEY = Object.freeze({
  water: { icon: '💧', titleKey: 'toast.water.title', messageKey: 'toast.water.message' },
  protein: { icon: '💪', titleKey: 'toast.protein.title', messageKey: 'toast.protein.message' },
  calories: { icon: '🔥', titleKey: 'toast.calories.title', messageKey: 'toast.calories.message' },
  steps: { icon: '👣', titleKey: 'toast.steps.title', messageKey: 'toast.steps.message' },
  sleep: { icon: '😴', titleKey: 'toast.sleep.title', messageKey: 'toast.sleep.message' },
});

export function registerGoalAchievementToasts({ eventBus, getI18nContext }) {
  eventBus.subscribe('dashboard:goal-achieved', ({ key } = {}) => {
    const config = TOAST_CONFIG_BY_KEY[key];

    if (!config) {
      return;
    }

    const i18n = getI18nContext();

    showToast({
      icon: config.icon,
      title: i18n.t(config.titleKey),
      message: i18n.t(config.messageKey),
    });
  });

  eventBus.subscribe('dashboard:all-goals-achieved', () => {
    const i18n = getI18nContext();

    showToast({
      icon: '🏆',
      title: i18n.t('toast.allGoals.title'),
      message: i18n.t('toast.allGoals.message'),
    });
  });
}
