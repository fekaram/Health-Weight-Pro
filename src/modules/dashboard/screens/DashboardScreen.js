import { escapeHtml } from '../../shared/utils/html.js';

const cardDefinitions = [
  { key: 'calories', labelKey: 'dashboard.calories', unit: 'kcal', icon: 'flame' },
  { key: 'protein', labelKey: 'dashboard.protein', unit: 'g', icon: 'protein' },
  { key: 'water', labelKey: 'dashboard.water', unit: 'mL', icon: 'water' },
  { key: 'sleep', labelKey: 'dashboard.sleep', unit: 'h', icon: 'moon' },
  { key: 'steps', labelKey: 'dashboard.steps', icon: 'steps' },
  { key: 'weight', labelKey: 'dashboard.weight', icon: 'scale' },
  { key: 'medication', labelKey: 'dashboard.medication', icon: 'syringe' },
  { key: 'recentMeals', labelKey: 'dashboard.recentMealsCard', icon: 'utensils' },
  { key: 'recentActivity', labelKey: 'dashboard.recentActivityCard', icon: 'activity' },
];

export function renderDashboardScreen(state) {
  const summary = state.summary ?? {};
  const settings = state.app.settings ?? {};
  const i18n = state.app.i18n;
  const justAchievedKeys = state.justAchievedKeys ?? [];
  const allGoalsJustAchieved = state.allGoalsJustAchieved ?? false;
  const metrics = createDashboardMetrics({ summary, settings, i18n, units: state.app.units, justAchievedKeys });
  const visibleMetrics = metrics.filter((metric) => {
    if (metric.key === 'medication' && settings.medication?.enabled === false) {
      return false;
    }

    return settings.dashboardCards?.[metric.key] ?? true;
  });
  const achievableVisibleMetrics = visibleMetrics.filter((metric) => metric.achievable);
  const allGoalsAchieved =
    achievableVisibleMetrics.length > 0 && achievableVisibleMetrics.every((metric) => metric.achieved);

  return `
    <section class="module-screen module-screen--dashboard" aria-labelledby="dashboard-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('dashboard.eyebrow')}</p>
        <h1 id="dashboard-title">${i18n.t('route.dashboard')}</h1>
        <p>${i18n.t('dashboard.description')}</p>
      </div>

      ${renderDailySummary(metrics, settings, i18n)}

      <section class="dashboard-section${allGoalsJustAchieved ? ' dashboard-section--celebrate' : ''}" aria-labelledby="dashboard-progress-title">
        <div class="dashboard-section__header">
          <div>
            <p class="module-screen__eyebrow">${i18n.t('dashboard.currentProgress')}</p>
            <h2 id="dashboard-progress-title">${i18n.t('dashboard.configuredGoals')}</h2>
          </div>
          ${
            allGoalsAchieved
              ? `<span class="dashboard-trophy${allGoalsJustAchieved ? ' dashboard-trophy--celebrate' : ''}" role="img" aria-label="${i18n.t('dashboard.allGoalsAchieved')}">🏆</span>`
              : ''
          }
        </div>
        <div class="metric-grid">
          ${visibleMetrics.map((metric) => renderMetricCard(metric, i18n)).join('')}
        </div>
      </section>
    </section>
  `;
}

const ACHIEVABLE_KEYS = new Set(['calories', 'protein', 'water', 'steps', 'sleep']);

function createDashboardMetrics({ summary, settings, i18n, units, justAchievedKeys = [] }) {
  const medication = settings.medication ?? {};
  const habits = summary.dailyHabits ?? {};
  const currentWeight = summary.latestWeight?.weight ?? settings.currentWeight ?? 0;
  const currentDose = summary.latestMedicationApplication?.doseMg ?? 0;
  const goals = {
    calories: settings.calorieGoal ?? 0,
    protein: settings.proteinGoal ?? 0,
    water: settings.waterGoal ?? 0,
    sleep: settings.sleepGoal ?? 0,
    steps: settings.stepGoal ?? 0,
    weight: settings.targetWeight ?? 0,
    medication: medication.defaultDose ?? 0,
    recentMeals: 3,
    recentActivity: 7,
  };
  const current = {
    calories: summary.todayCalories ?? 0,
    protein: summary.todayProtein ?? 0,
    water: habits.waterMl ?? 0,
    sleep: (habits.sleepMinutes ?? 0) / 60,
    steps: habits.steps ?? 0,
    weight: currentWeight,
    medication: currentDose,
    recentMeals: summary.todayMealCount ?? 0,
    recentActivity: summary.activityCount ?? 0,
  };

  return cardDefinitions.map((definition) => {
    const key = definition.key;
    const isWater = key === 'water';
    const unit = key === 'weight' ? units.weight
      : key === 'medication' ? medication.doseUnit || 'mg'
      : definition.unit ?? '';
    const percent = calculatePercent(current[key], goals[key], key);
    const achievable = ACHIEVABLE_KEYS.has(key);
    const achieved = achievable && goals[key] > 0 && current[key] >= goals[key];
    const remaining = Math.max(0, goals[key] - current[key]);
    const cardUnit = isWater ? 'L' : key === 'steps' ? i18n.t('dashboard.stepsUnit') : unit;
    const cardFractionDigits = isWater ? 2 : 1;
    const toCardValue = (value) => (isWater ? value / 1000 : value);

    return {
      ...definition,
      title: key === 'medication' ? medication.name || i18n.t(definition.labelKey) : undefined,
      subtitle:
        key === 'medication' && medication.applicationDay
          ? `${i18n.t('dashboard.nextApplication')}: ${i18n.t(`day.${medication.applicationDay}`)}`
          : undefined,
      current: current[key],
      currentLabel: formatMetricValue(current[key], unit, i18n),
      goal: goals[key],
      goalLabel: formatMetricValue(goals[key], unit, i18n),
      cardCurrentLabel: formatMetricValue(toCardValue(current[key]), cardUnit, i18n, cardFractionDigits),
      cardGoalLabel: formatMetricValue(toCardValue(goals[key]), cardUnit, i18n, cardFractionDigits),
      remainingLabel: formatMetricValue(toCardValue(remaining), cardUnit, i18n, cardFractionDigits),
      achievable,
      achieved,
      justAchieved: justAchievedKeys.includes(key),
      percent,
      status: getProgressStatus(percent),
      unit,
    };
  });
}

function renderDailySummary(metrics, settings, i18n) {
  const greeting = settings.displayName
    ? i18n.t('dashboard.greeting', { name: settings.displayName })
    : i18n.t('dashboard.greetingNoName');
  const calories = metrics.find((metric) => metric.key === 'calories');
  const protein = metrics.find((metric) => metric.key === 'protein');
  const water = metrics.find((metric) => metric.key === 'water');
  const sleep = metrics.find((metric) => metric.key === 'sleep');
  const remainingItems = [calories, protein, water, sleep]
    .filter((metric) => metric.goal > metric.current)
    .map((metric) => `${formatMetricValue(metric.goal - metric.current, metric.unit, i18n)} ${i18n.t(metric.labelKey)}`);

  return `
    <section class="daily-summary">
      <div class="daily-summary__copy">
        <p class="module-screen__eyebrow">${i18n.t('dashboard.smartSummary')}</p>
        <h2>${greeting}</h2>
        <p>${i18n.t('dashboard.todayConsumed')} <strong>${calories.currentLabel}</strong> (${calories.percent}%).</p>
      </div>
      <div class="daily-summary__stats">
        ${[protein, water, sleep].map((metric) => renderSummaryStat(metric, i18n)).join('')}
      </div>
      <div class="daily-summary__remaining">
        <span>${i18n.t('common.remainingToday')}</span>
        <p>${remainingItems.length > 0 ? `${i18n.t('dashboard.missingPrefix')}: ${remainingItems.join(', ')}` : i18n.t('dashboard.allSet')}</p>
      </div>
    </section>
  `;
}

function renderSummaryStat(metric, i18n) {
  return `
    <article>
      <span>${i18n.t(metric.labelKey)}</span>
      <strong>${metric.currentLabel}</strong>
      <small>${metric.percent}%</small>
    </article>
  `;
}

function renderMetricCard(metric, i18n) {
  const cardModifiers = [`metric-card--${metric.status}`, metric.justAchieved ? 'metric-card--celebrate' : '']
    .filter(Boolean)
    .join(' ');

  return `
    <article class="metric-card ${cardModifiers}">
      <div class="metric-card__header">
        <span class="metric-card__icon" aria-hidden="true">${renderMetricIcon(metric.icon)}</span>
        <span class="metric-card__status">${i18n.t(`common.${metric.status}`)}</span>
      </div>
      <h3>${escapeHtml(metric.title ?? i18n.t(metric.labelKey))}</h3>
      ${metric.subtitle ? `<p class="metric-card__subtitle">${escapeHtml(metric.subtitle)}</p>` : ''}
      <div class="metric-card__values">
        <strong>${metric.cardCurrentLabel ?? metric.currentLabel}</strong>
        <span>${i18n.t('common.goal')}: ${metric.cardGoalLabel ?? metric.goalLabel}</span>
      </div>
      <div class="progress-bar" aria-label="${i18n.t(metric.labelKey)} ${metric.percent}%">
        <span style="width: ${metric.percent}%"></span>
      </div>
      ${renderMetricFooter(metric, i18n)}
    </article>
  `;
}

function renderMetricFooter(metric, i18n) {
  if (!metric.achievable) {
    return `<p>${metric.percent}%</p>`;
  }

  if (metric.achieved) {
    return `<p class="metric-card__goal-status metric-card__goal-status--achieved"><span class="metric-card__check" aria-hidden="true">✅</span> ${i18n.t('dashboard.goalAchieved')}</p>`;
  }

  if (metric.key === 'sleep') {
    return `<p class="metric-card__goal-status"><span aria-hidden="true">⚠️</span> ${i18n.t('dashboard.goalNotAchieved')}</p>`;
  }

  return `<p class="metric-card__remaining">${i18n.t('dashboard.remaining')} ${metric.remainingLabel}</p>`;
}

function calculatePercent(current, goal, key) {
  if (!goal || goal <= 0) {
    return 0;
  }

  if (key === 'weight') {
    return Math.min(100, Math.round((Number(current || 0) / goal) * 100));
  }

  return Math.min(100, Math.round((Number(current || 0) / goal) * 100));
}

function getProgressStatus(percent) {
  if (percent >= 100) {
    return 'reached';
  }

  if (percent >= 70) {
    return 'normal';
  }

  if (percent >= 40) {
    return 'attention';
  }

  return 'critical';
}

function formatMetricValue(value, unit, i18n, maximumFractionDigits = 1) {
  const formattedValue = i18n.formatNumber(value ?? 0, { maximumFractionDigits });

  return `${formattedValue}${unit ? ` ${escapeHtml(unit)}` : ''}`;
}

function renderMetricIcon(icon) {
  const icons = {
    flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-8-.5 2-2 3-3 4 0-3-2-6-4-8 0 4-3 6-3 11 0 4 3 8 7 8Z"></path>',
    protein: '<path d="M6 15c-2 0-4-2-4-4s2-4 4-4h12c2 0 4 2 4 4s-2 4-4 4H6Z"></path><path d="M8 15v4"></path><path d="M16 15v4"></path>',
    water: '<path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7Z"></path>',
    moon: '<path d="M21 14a8 8 0 1 1-11-11 7 7 0 0 0 11 11Z"></path>',
    steps: '<path d="M7 4a2 2 0 0 1 2 2c0 1.5-.5 2-1 3s-1 2-1 3.5A2 2 0 0 0 9 14"></path><path d="M17 10a2 2 0 0 1 2 2c0 1.5-.5 2-1 3s-1 2-1 3.5a2 2 0 0 1-2 2.5"></path><circle cx="8.5" cy="20" r="1"></circle><circle cx="16.5" cy="6" r="1"></circle>',
    scale: '<path d="M12 3v3"></path><path d="M6 7h12l3 12H3L6 7Z"></path><path d="m9 12 3 3 3-3"></path>',
    syringe: '<path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8 20l-4-4L15 5l4 4Z"></path><path d="m9 7 8 8"></path><path d="m4 20-2 2"></path>',
    utensils: '<path d="M4 3v7a4 4 0 0 0 4 4v7"></path><path d="M8 3v18"></path><path d="M12 3v7a4 4 0 0 1-4 4"></path><path d="M17 3v18"></path><path d="M17 3c2.5 2 3.5 4.5 3 8h-3"></path>',
    activity: '<path d="M3 12h4l3 8 4-16 3 8h4"></path>',
  };

  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      ${icons[icon] ?? icons.activity}
    </svg>
  `;
}
