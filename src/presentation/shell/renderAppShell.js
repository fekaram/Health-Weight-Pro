import { getNutriIaPrompt } from '../../config/prompts/nutriIaPrompt.js';
import { parseHwpFood } from '../../modules/meal-journal/utils/hwpFoodParser.js';
import { escapeHtml } from '../../modules/shared/utils/html.js';
import { getMealSlotLabelKey } from '../../shared/constants/mealSlots.js';
import { showToast } from '../components/Toast.js';

export function renderAppShell({ root, viewModel }) {
  const state = viewModel.getState();

  root.innerHTML = `
    <main class="app-shell">
      <aside class="app-shell__sidebar" aria-label="${state.i18n.t('aria.primaryNavigation')}">
        ${renderBrand(state)}
        ${renderNavigationGroups(state.routes, state.currentRoute)}
      </aside>
      <section class="app-shell__workspace">
        <header class="app-shell__topbar">
          ${renderBrand(state)}
          <nav class="app-shell__mobile-nav" aria-label="${state.i18n.t('aria.mobileNavigation')}">
            ${renderMobileLinks(state.routes, state.currentRoute)}
          </nav>
        </header>
        <section class="app-shell__content" aria-live="polite">
          ${renderCurrentScreen(state.currentRoute, state.currentModuleState)}
        </section>
      </section>
      <div class="app-shell__fab-region">
        ${renderFabRegion(state.fab, state.routes, state.i18n)}
      </div>
    </main>
  `;

  wireNutriIaTextarea(root.querySelector('.app-shell__fab-region'), state.i18n);
  state.currentRoute.afterRender?.(root.querySelector('.app-shell__content'), state.currentModuleState);

  root.addEventListener('click', async (event) => {
    const routeLink = event.target.closest('[data-route]');

    if (routeLink) {
      event.preventDefault();

      if (routeLink.classList.contains('app-shell__brand')) {
        await viewModel.handleAction('developer', 'tapLogo', {});

        if (viewModel.modules.developer?.getState().justEnabled) {
          showToast({
            icon: '🛠',
            title: viewModel.getI18nContext().t('developer.enabledTitle'),
            message: viewModel.getI18nContext().t('developer.enabledMessage'),
          });
        }
      }

      viewModel.navigate(routeLink.dataset.route);
      return;
    }

    const copyPromptButton = event.target.closest('[data-copy-prompt]');

    if (copyPromptButton) {
      event.preventDefault();
      await copyNutriIaPrompt(viewModel.getI18nContext());
      return;
    }

    const exportLogsButton = event.target.closest('[data-export-logs]');

    if (exportLogsButton) {
      event.preventDefault();
      await exportApplicationLogs(viewModel);
      return;
    }

    const actionButton = event.target.closest('button[data-action], [role="button"][data-action]');

    if (!actionButton || actionButton.type === 'submit') {
      return;
    }

    event.preventDefault();
    const moduleKey = getActionModule(actionButton, viewModel);
    const action = actionButton.dataset.action;
    await viewModel.handleAction(moduleKey, action, { ...actionButton.dataset });

    if (moduleKey === 'meal-journal' && action === 'importHwpFood') {
      await handleMealImportSuccess({ root, viewModel, importButton: actionButton });
      return;
    }

    if (moduleKey === 'favorites' && action === 'startFromImportedMeal') {
      viewModel.navigate('/favorites');
      updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
      return;
    }

    if (moduleKey === 'favorites' && action === 'register') {
      showToast({
        icon: '⭐',
        title: viewModel.getI18nContext().t('toast.favoriteRegistered.title'),
        message: viewModel.getI18nContext().t('toast.favoriteRegistered.message'),
      });
    }

    if (moduleKey === 'meal-plans' && action === 'register') {
      showToast({
        icon: '🍽',
        title: viewModel.getI18nContext().t('toast.mealPlanRegistered.title'),
        message: viewModel.getI18nContext().t('toast.mealPlanRegistered.message'),
      });
    }

    updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
  });

  root.addEventListener('submit', async (event) => {
    const form = event.target.closest('form[data-action]');

    if (!form) {
      return;
    }

    event.preventDefault();
    await viewModel.handleAction(getActionModule(form, viewModel), form.dataset.action, getFormPayload(form));
    updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
  });

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    const target = event.target.closest('[role="button"][tabindex]');

    if (!target) {
      return;
    }

    event.preventDefault();
    target.click();
  });

  document.addEventListener('keydown', async (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    await closeTopmostDialog({ root, viewModel });
  });

  viewModel.onRouteChange((route) => {
    updateShell({ root, state: viewModel.getState(), route });
  });
}

// Every bottom-sheet overlay already closes its dialog on backdrop click; Escape mirrors
// that same "closeDialog"/"closeWizard" semantics (full close, not a wizard step-back).
const ESCAPE_CLOSE_ACTIONS = Object.freeze({
  favorites: 'closeDialog',
  'food-library': 'closeDialog',
  'meal-plans': 'closeDialog',
});

async function closeTopmostDialog({ root, viewModel }) {
  const state = viewModel.getState();

  if (state.fab?.isOpen) {
    await viewModel.handleAction('fab', 'close', {});
    updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
    return;
  }

  const moduleKey = state.currentRoute.moduleKey;
  const moduleState = state.currentModuleState ?? {};

  if (moduleKey === 'settings' && moduleState.developer?.confirmingAction) {
    await viewModel.handleAction('developer', 'cancelConfirm', {});
    updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
    return;
  }

  if (moduleState.activeDialog && ESCAPE_CLOSE_ACTIONS[moduleKey]) {
    await viewModel.handleAction(moduleKey, ESCAPE_CLOSE_ACTIONS[moduleKey], {});
    updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
  }
}

function renderBrand(state) {
  const homeHref = state.routes.find((route) => route.path === '/')?.href ?? import.meta.env.BASE_URL;

  return `
    <a class="app-shell__brand" href="${homeHref}" data-route="/">
      <img class="app-shell__logo" src="${import.meta.env.BASE_URL}icons/logo.png" alt="" aria-hidden="true" />
      <span class="app-shell__brand-copy">
        <span class="app-shell__brand-text">${state.appName}</span>
        <span class="app-shell__brand-version">${state.i18n.t('app.version', { version: state.appVersion })}</span>
      </span>
    </a>
  `;
}

function renderNavigationGroups(routes, currentRoute) {
  const visibleRoutes = routes.filter((route) => !route.hidden);
  const sections = [...new Set(visibleRoutes.map((route) => route.section))];

  return sections
    .map((section) => {
      const sectionRoutes = visibleRoutes.filter((route) => route.section === section);

      return `
        <div class="app-shell__nav-group">
          <p class="app-shell__nav-heading">${section}</p>
          <nav class="app-shell__links" aria-label="${section}">
            ${sectionRoutes.map((route) => renderRouteLink(route, currentRoute)).join('')}
          </nav>
        </div>
      `;
    })
    .join('');
}

function renderMobileLinks(routes, currentRoute) {
  return routes
    .filter((route) => !route.hidden)
    .map((route) => renderRouteLink(route, currentRoute))
    .join('');
}

function renderRouteLink(route, currentRoute) {
  const isActive = route.path === currentRoute.path;

  return `
    <a
      class="app-shell__link${isActive ? ' app-shell__link--active' : ''}"
      href="${route.href}"
      data-route="${route.path}"
      ${isActive ? 'aria-current="page"' : ''}
    >
      <span class="app-shell__link-mark" aria-hidden="true">${renderRouteIcon(route.id)}</span>
      <span>${route.label}</span>
    </a>
  `;
}

function renderRouteIcon(routeId) {
  const icons = {
    dashboard:
      '<path d="M3 13h8V3H3v10Z"></path><path d="M13 21h8V11h-8v10Z"></path><path d="M13 3v6h8V3h-8Z"></path><path d="M3 21h8v-6H3v6Z"></path>',
    'meal-journal':
      '<path d="M4 3v7a4 4 0 0 0 4 4v7"></path><path d="M8 3v18"></path><path d="M12 3v7a4 4 0 0 1-4 4"></path><path d="M17 3v18"></path><path d="M17 3c2.5 2 3.5 4.5 3 8h-3"></path>',
    'weight-tracking':
      '<path d="M12 3v3"></path><path d="M6 7h12l3 12H3L6 7Z"></path><path d="m9 12 3 3 3-3"></path>',
    'body-measurements':
      '<path d="M4 7h16"></path><path d="M4 17h16"></path><path d="M6 7v10"></path><path d="M10 7v5"></path><path d="M14 7v10"></path><path d="M18 7v5"></path>',
    medication:
      '<path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8 20l-4-4L15 5l4 4Z"></path><path d="m9 7 8 8"></path><path d="m4 20-2 2"></path>',
    settings:
      '<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"></path>',
    'backup-restore':
      '<path d="M4 7c0-2 3.6-4 8-4s8 2 8 4-3.6 4-8 4-8-2-8-4Z"></path><path d="M4 7v5c0 2 3.6 4 8 4s8-2 8-4V7"></path><path d="M4 12v5c0 2 3.6 4 8 4s8-2 8-4v-5"></path>',
  };

  return `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      ${icons[routeId] ?? icons.dashboard}
    </svg>
  `;
}

function renderCurrentScreen(route, moduleState) {
  return route.render(moduleState);
}

function updateShell({ root, state, route }) {
  const content = root.querySelector('.app-shell__content');
  const sidebar = root.querySelector('.app-shell__sidebar');
  const mobileNav = root.querySelector('.app-shell__mobile-nav');
  const fabRegion = root.querySelector('.app-shell__fab-region');

  content.innerHTML = renderCurrentScreen(route, state.currentModuleState);
  route.afterRender?.(content, state.currentModuleState);
  sidebar.setAttribute('aria-label', state.i18n.t('aria.primaryNavigation'));
  mobileNav.setAttribute('aria-label', state.i18n.t('aria.mobileNavigation'));
  sidebar.innerHTML = `${renderBrand(state)}${renderNavigationGroups(state.routes, route)}`;
  mobileNav.innerHTML = renderMobileLinks(state.routes, route);
  fabRegion.innerHTML = renderFabRegion(state.fab, state.routes, state.i18n);
  wireNutriIaTextarea(fabRegion, state.i18n);
}

function getActionModule(element, viewModel) {
  return element.dataset.module || viewModel.getState().currentRoute.moduleKey;
}

function getFormPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function copyNutriIaPrompt(i18n) {
  try {
    await navigator.clipboard.writeText(getNutriIaPrompt(i18n.language));
    showToast({
      icon: '📋',
      title: i18n.t('nutriIa.promptCopiedTitle'),
      message: i18n.t('nutriIa.promptCopiedMessage'),
    });
  } catch {
    showToast({
      icon: '⚠️',
      title: i18n.t('nutriIa.promptCopyFailedTitle'),
      message: i18n.t('nutriIa.promptCopyFailedMessage'),
    });
  }
}

async function exportApplicationLogs(viewModel) {
  const i18n = viewModel.getI18nContext();

  try {
    const entries = viewModel.logger.getEntries();
    const developerState = viewModel.modules.developer?.getState();
    const payload = {
      exportedAt: new Date().toISOString(),
      versions: developerState?.versions ?? {},
      entries,
    };

    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    showToast({
      icon: '📋',
      title: i18n.t('developer.logsExportedTitle'),
      message: i18n.t('developer.logsExportedMessage'),
    });
  } catch {
    showToast({
      icon: '⚠️',
      title: i18n.t('nutriIa.promptCopyFailedTitle'),
      message: i18n.t('nutriIa.promptCopyFailedMessage'),
    });
  }
}

async function handleMealImportSuccess({ root, viewModel, importButton }) {
  const i18n = viewModel.getI18nContext();

  showToast({
    icon: '✔',
    title: i18n.t('toast.mealImported.title'),
    message: i18n.t('toast.mealImported.message'),
  });

  await viewModel.handleAction('fab', 'showImportSuccess', { ...importButton.dataset });
  updateShell({ root, state: viewModel.getState(), route: viewModel.getState().currentRoute });
}

function renderFabRegion(fabState = {}, routes = [], i18n) {
  const { isOpen, activeDialog, today, lastImportedMeal } = fabState;
  const settings = fabState.app?.settings ?? {};

  return `
    <button type="button" class="fab-button" data-module="fab" data-action="open" aria-label="${i18n.t('aria.quickActions')}">
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>
    </button>
    ${isOpen ? renderBottomSheet({ activeDialog, today, settings, routes, lastImportedMeal, i18n }) : ''}
  `;
}

function renderBottomSheet({ activeDialog, today, settings, routes, lastImportedMeal, i18n }) {
  return `
    <button type="button" class="bottom-sheet-overlay" data-module="fab" data-action="close" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${i18n.t('aria.quickActions')}">
      ${renderBottomSheetBody({ activeDialog, today, settings, routes, lastImportedMeal, i18n })}
    </div>
  `;
}

function renderBottomSheetBody({ activeDialog, today, settings, routes, lastImportedMeal, i18n }) {
  if (activeDialog === 'water') {
    return renderWaterDialog(today, settings, i18n);
  }

  if (activeDialog === 'sleep') {
    return renderSleepDialog(today, settings, i18n);
  }

  if (activeDialog === 'steps') {
    return renderStepsDialog(today, settings, i18n);
  }

  if (activeDialog === 'meal-register') {
    return renderMealRegisterDialog(routes, i18n);
  }

  if (activeDialog === 'nutri-ia') {
    return renderNutriIaDialog(i18n);
  }

  if (activeDialog === 'nutri-ia-help') {
    return renderNutriIaHelpDialog(i18n);
  }

  if (activeDialog === 'nutri-ia-success') {
    return renderNutriIaSuccessDialog(lastImportedMeal, i18n);
  }

  return renderSheetOptions(routes, i18n);
}

function renderSheetOptions(routes, i18n) {
  const medicationRoute = routes.find((route) => route.id === 'medication');

  return `
    <ul class="bottom-sheet__options">
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="meal-register">
          <span aria-hidden="true">🍽</span><span>${i18n.t('habit.meal')}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="water">
          <span aria-hidden="true">💧</span><span>${i18n.t('habit.water')}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="sleep">
          <span aria-hidden="true">😴</span><span>${i18n.t('habit.sleep')}</span>
        </button>
      </li>
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="steps">
          <span aria-hidden="true">👣</span><span>${i18n.t('habit.steps')}</span>
        </button>
      </li>
      ${
        medicationRoute
          ? `<li><a class="bottom-sheet__option" href="${medicationRoute.href}" data-route="${medicationRoute.path}"><span aria-hidden="true">💉</span><span>${i18n.t('habit.medication')}</span></a></li>`
          : ''
      }
    </ul>
  `;
}

function renderDialogHeader(icon, titleKey, i18n) {
  return `
    <div class="bottom-sheet__header">
      <button type="button" class="bottom-sheet__back" data-module="fab" data-action="closeDialog" aria-label="${i18n.t('common.back')}">←</button>
      <h2><span aria-hidden="true">${icon}</span> ${i18n.t(titleKey)}</h2>
      <button type="button" class="bottom-sheet__close" data-module="fab" data-action="close" aria-label="${i18n.t('common.close')}">×</button>
    </div>
  `;
}

function renderMealRegisterDialog(routes, i18n) {
  const favoritesRoute = routes.find((route) => route.id === 'favorites');
  const mealPlansRoute = routes.find((route) => route.id === 'meal-plans');
  const foodLibraryRoute = routes.find((route) => route.id === 'food-library');

  return `
    ${renderDialogHeader('🍽', 'fab.registerMeal', i18n)}
    <ul class="bottom-sheet__options">
      <li>
        <button type="button" class="bottom-sheet__option" data-module="fab" data-action="openDialog" data-dialog="nutri-ia">
          <span aria-hidden="true">✨</span><span>${i18n.t('nutriIa.title')}</span>
        </button>
      </li>
      ${
        favoritesRoute
          ? `<li><a class="bottom-sheet__option" href="${favoritesRoute.href}" data-route="${favoritesRoute.path}"><span aria-hidden="true">⭐</span><span>${i18n.t('fab.favorites')}</span></a></li>`
          : ''
      }
      ${
        mealPlansRoute
          ? `<li><a class="bottom-sheet__option" href="${mealPlansRoute.href}" data-route="${mealPlansRoute.path}"><span aria-hidden="true">🍽️</span><span>${i18n.t('fab.mealPlans')}</span></a></li>`
          : ''
      }
      ${
        foodLibraryRoute
          ? `<li><a class="bottom-sheet__option" href="${foodLibraryRoute.href}" data-route="${foodLibraryRoute.path}"><span aria-hidden="true">📚</span><span>${i18n.t('fab.foodLibrary')}</span></a></li>`
          : ''
      }
    </ul>
  `;
}

function renderNutriIaDialog(i18n) {
  return `
    ${renderDialogHeader('✨', 'nutriIa.title', i18n)}
    <p class="bottom-sheet__subtitle">${i18n.t('nutriIa.description')}</p>
    <textarea class="nutri-ia-textarea" data-nutri-ia-input rows="8" placeholder="${i18n.t('nutriIa.placeholder')}"></textarea>
    <div data-nutri-ia-preview></div>
    <div class="form-actions">
      <button type="button" data-nutri-ia-import data-module="meal-journal" data-action="importHwpFood" disabled>${i18n.t('nutriIa.importButton')}</button>
      <button type="button" data-module="fab" data-action="close">${i18n.t('common.cancel')}</button>
    </div>
    <button type="button" class="nutri-ia-help-link" data-module="fab" data-action="openDialog" data-dialog="nutri-ia-help">
      <span aria-hidden="true">❓</span> ${i18n.t('nutriIa.helpLink')}
    </button>
  `;
}

function renderNutriIaHelpDialog(i18n) {
  const steps = ['helpStep1', 'helpStep2', 'helpStep3', 'helpStep4'];

  return `
    ${renderDialogHeader('✨', 'nutriIa.title', i18n)}
    <p>${i18n.t('nutriIa.helpIntro')}</p>
    <p class="nutri-ia-help-examples">ChatGPT &middot; Claude &middot; Gemini &middot; Grok &middot; Copilot &middot; DeepSeek &middot; ${i18n.t('nutriIa.helpOtherAssistants')}</p>
    <ol class="nutri-ia-help-steps">
      ${steps.map((key) => `<li>${i18n.t(`nutriIa.${key}`)}</li>`).join('')}
    </ol>
    <button type="button" class="nutri-ia-copy-prompt" data-copy-prompt>${i18n.t('nutriIa.copyPrompt')}</button>
  `;
}

function renderNutriIaSuccessDialog(lastImportedMeal, i18n) {
  const meal = lastImportedMeal ?? {};

  return `
    ${renderDialogHeader('✔', 'toast.mealImported.title', i18n)}
    <p class="bottom-sheet__subtitle">${i18n.t('nutriIa.saveAsFavoritePrompt')}</p>
    <div class="form-actions">
      <button
        type="button"
        data-module="favorites"
        data-action="startFromImportedMeal"
        data-meal-type="${escapeHtml(meal.mealType ?? 'meal')}"
        data-name="${escapeHtml(meal.name ?? '')}"
        data-calories="${escapeHtml(meal.calories ?? '0')}"
        data-protein="${escapeHtml(meal.protein ?? '0')}"
        data-carbs="${escapeHtml(meal.carbs ?? '0')}"
        data-fat="${escapeHtml(meal.fat ?? '0')}"
        data-fiber="${escapeHtml(meal.fiber ?? '0')}"
      >⭐ ${i18n.t('favorites.saveAsFavorite')}</button>
      <button type="button" data-module="fab" data-action="close">${i18n.t('common.close')}</button>
    </div>
  `;
}

function renderNutriIaPreview(data, i18n) {
  return `
    <div class="nutri-ia-preview-card">
      <p class="nutri-ia-preview-status">✔ ${escapeHtml(i18n.t('nutriIa.validDetected'))}</p>
      <dl class="nutri-ia-preview-grid">
        <div><dt>${i18n.t('nutriIa.mealLabel')}</dt><dd>${escapeHtml(data.name)}</dd></div>
        <div><dt>${i18n.t('nutriIa.mealSlotLabel')}</dt><dd>${escapeHtml(i18n.t(getMealSlotLabelKey(data.mealType)))}</dd></div>
        <div><dt>${i18n.t('settings.calories')}</dt><dd>${i18n.formatNumber(data.calories)} kcal</dd></div>
        <div><dt>${i18n.t('settings.protein')}</dt><dd>${i18n.formatNumber(data.protein)} g</dd></div>
        <div><dt>${i18n.t('settings.carbohydrates')}</dt><dd>${i18n.formatNumber(data.carbs)} g</dd></div>
        <div><dt>${i18n.t('settings.fat')}</dt><dd>${i18n.formatNumber(data.fat)} g</dd></div>
        <div><dt>${i18n.t('settings.fiber')}</dt><dd>${i18n.formatNumber(data.fiber)} g</dd></div>
        <div><dt>${i18n.t('nutriIa.originLabel')}</dt><dd>✨ ${i18n.t('nutriIa.title')}</dd></div>
      </dl>
    </div>
  `;
}

function wireNutriIaTextarea(fabRegion, i18n) {
  const textarea = fabRegion?.querySelector('[data-nutri-ia-input]');

  if (!textarea) {
    return;
  }

  const previewContainer = fabRegion.querySelector('[data-nutri-ia-preview]');
  const importButton = fabRegion.querySelector('[data-nutri-ia-import]');

  const updatePreview = () => {
    const trimmed = textarea.value.trim();

    if (!trimmed) {
      previewContainer.innerHTML = '';
      importButton.disabled = true;
      return;
    }

    const result = parseHwpFood(textarea.value);

    if (!result.valid) {
      previewContainer.innerHTML = `<p class="nutri-ia-preview-status nutri-ia-preview-status--invalid">${escapeHtml(
        i18n.t('nutriIa.invalidMessage'),
      )}</p>`;
      importButton.disabled = true;
      return;
    }

    previewContainer.innerHTML = renderNutriIaPreview(result.data, i18n);
    importButton.disabled = false;
    importButton.dataset.mealType = result.data.mealType;
    importButton.dataset.name = result.data.name;
    importButton.dataset.calories = String(result.data.calories);
    importButton.dataset.protein = String(result.data.protein);
    importButton.dataset.carbs = String(result.data.carbs);
    importButton.dataset.fat = String(result.data.fat);
    importButton.dataset.fiber = String(result.data.fiber);
    importButton.dataset.raw = result.raw;
  };

  textarea.addEventListener('input', updatePreview);
  updatePreview();
}

function renderWaterDialog(today, settings, i18n) {
  const currentMl = today?.waterMl ?? 0;
  const goalMl = settings.waterGoal ?? 0;

  return `
    ${renderDialogHeader('💧', 'habit.water', i18n)}
    <p class="bottom-sheet__progress">${i18n.formatNumber(currentMl)} / ${i18n.formatNumber(goalMl)} mL</p>
    <div class="quick-actions-grid">
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="250"><span aria-hidden="true">🥤</span> +250 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="500"><span aria-hidden="true">🥤</span> +500 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="750"><span aria-hidden="true">🥤</span> +750 mL</button>
      <button type="button" data-module="daily-habits" data-action="addWater" data-amount="1000"><span aria-hidden="true">🧴</span> +1 L</button>
    </div>
    <div class="quick-actions-grid quick-actions-grid--corrections">
      <button type="button" class="quick-actions-grid__correction" data-module="daily-habits" data-action="addWater" data-amount="-250"><span aria-hidden="true">➖</span> 250 mL</button>
      <button type="button" class="quick-actions-grid__correction" data-module="daily-habits" data-action="addWater" data-amount="-500"><span aria-hidden="true">➖</span> 500 mL</button>
    </div>
    <form class="module-form module-form--single" data-module="daily-habits" data-action="addWater">
      <label>
        <span>${i18n.t('habit.customAmount')}</span>
        <input name="amount" type="number" min="0" step="10" />
      </label>
      <button type="submit">${i18n.t('common.add')}</button>
    </form>
  `;
}

const SLEEP_MINUTE_STEPS = [0, 15, 30, 45];

function renderSleepDialog(today, settings, i18n) {
  const currentMinutes = today?.sleepMinutes ?? 0;
  const currentHours = Math.min(23, Math.floor(currentMinutes / 60));
  const remainderMinutes = currentMinutes % 60;
  const goalHours = settings.sleepGoal ?? 0;

  return `
    <div class="bottom-sheet__header">
      <button type="button" class="bottom-sheet__back" data-module="fab" data-action="closeDialog" aria-label="${i18n.t('common.back')}">←</button>
      <button type="button" class="bottom-sheet__close" data-module="fab" data-action="close" aria-label="${i18n.t('common.close')}">×</button>
    </div>
    <div class="bottom-sheet__intro">
      <span class="bottom-sheet__intro-icon" aria-hidden="true">😴</span>
      <h2>${i18n.t('habit.sleepQuestion')}</h2>
      <p class="bottom-sheet__subtitle">${i18n.t('habit.sleepGoalHint')}</p>
    </div>
    <p class="bottom-sheet__progress">${i18n.formatNumber(currentMinutes / 60)} / ${i18n.formatNumber(goalHours)} h</p>
    <form class="module-form" data-module="daily-habits" data-action="setSleep">
      <label>
        <span>${i18n.t('habit.hours')}</span>
        <select name="hours">${renderRangeOptions(0, 23, currentHours)}</select>
      </label>
      <label>
        <span>${i18n.t('habit.minutes')}</span>
        <select name="minutes">${renderStepOptions(SLEEP_MINUTE_STEPS, remainderMinutes)}</select>
      </label>
      <button type="submit">${i18n.t('common.saveChanges')}</button>
    </form>
  `;
}

function renderStepsDialog(today, settings, i18n) {
  const currentSteps = today?.steps ?? 0;
  const goalSteps = settings.stepGoal ?? 0;

  return `
    ${renderDialogHeader('👣', 'habit.todaysSteps', i18n)}
    <p class="bottom-sheet__progress">${i18n.formatNumber(currentSteps)} / ${i18n.formatNumber(goalSteps)}</p>
    <form class="module-form module-form--single" data-module="daily-habits" data-action="setSteps">
      <label>
        <span>${i18n.t('habit.stepsCount')}</span>
        <input name="steps" type="number" min="0" step="1" value="${currentSteps || ''}" />
      </label>
      <button type="submit">${i18n.t('common.saveChanges')}</button>
    </form>
  `;
}

function renderRangeOptions(min, max, selectedValue) {
  const options = [];

  for (let value = min; value <= max; value += 1) {
    options.push(`<option value="${value}" ${value === selectedValue ? 'selected' : ''}>${value}</option>`);
  }

  return options.join('');
}

function renderStepOptions(steps, selectedValue) {
  const nearest = steps.reduce(
    (closest, step) => (Math.abs(step - selectedValue) < Math.abs(closest - selectedValue) ? step : closest),
    steps[0],
  );

  return steps.map((step) => `<option value="${step}" ${step === nearest ? 'selected' : ''}>${step}</option>`).join('');
}
