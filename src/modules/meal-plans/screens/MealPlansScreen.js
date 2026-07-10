import { getEnabledMealSlots, getMealSlotLabelKey } from '../../../shared/constants/mealSlots.js';
import { renderEmptyState, renderError, renderMessage, valueOrEmpty } from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';
import { calculateFavoriteMealTotals } from '../../favorites/utils/favoriteMealNutrition.js';
import { calculateMealPlanTotals, resolveFavoriteMealForPlanMeal } from '../utils/mealPlanNutrition.js';

const WIZARD_STEPS = ['details', 'meals', 'preview'];

export function renderMealPlansScreen(state) {
  const i18n = state.app.i18n;
  const plans = state.mealPlans ?? [];
  const favoriteMeals = state.favoriteMeals ?? [];
  const foods = state.foods ?? [];
  const isEmpty = plans.length === 0;

  return `
    <section class="module-screen" aria-labelledby="meal-plans-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.mealPlans')}</p>
        <h1 id="meal-plans-title">${i18n.t('route.mealPlans')}</h1>
        <p>${i18n.t('mealPlans.description')}</p>
      </div>

      ${isEmpty ? renderEmptyMealPlans(i18n) : renderMealPlansContent(plans, favoriteMeals, foods, state.message, i18n)}

      ${
        state.activeDialog === 'wizard' && state.draft
          ? renderWizardDialog(state, state.app.settings ?? {}, i18n)
          : ''
      }
      ${
        state.activeDialog === 'delete-confirm'
          ? renderDeleteConfirmDialog(plans.find((plan) => plan.id === state.selectedPlanId), i18n)
          : ''
      }
    </section>
  `;
}

export function wireMealPlansScreen(container, state) {
  const i18n = state.app.i18n;
  const favoriteMeals = state.favoriteMeals ?? [];
  const foods = state.foods ?? [];

  wireSearchAndFilter(container, state.mealPlans ?? [], favoriteMeals, foods, i18n);

  if (state.activeDialog === 'wizard' && state.wizardStep === 'meals' && !state.pickingFavoriteMeal) {
    wireFavoritePickerSearch(container, favoriteMeals, foods, i18n);
  }
}

function renderEmptyMealPlans(i18n) {
  return `
    <section class="content-panel meal-plans-empty">
      <span class="meal-plans-empty__icon" aria-hidden="true">🍽</span>
      <h2>${i18n.t('mealPlans.emptyTitle')}</h2>
      <p>${i18n.t('mealPlans.emptyHint')}</p>
      <button type="button" data-module="meal-plans" data-action="openCreate">${i18n.t('mealPlans.createButton')}</button>
    </section>
  `;
}

function renderMealPlansContent(plans, favoriteMeals, foods, message, i18n) {
  return `
    <section class="content-panel">
      ${renderMessage(message, 'success', i18n)}
      <div class="favorites__toolbar">
        <input
          type="search"
          class="favorites__search"
          data-mealplan-search
          placeholder="${i18n.t('mealPlans.searchPlaceholder')}"
          aria-label="${i18n.t('mealPlans.searchPlaceholder')}"
        />
        <button type="button" data-module="meal-plans" data-action="openCreate">${i18n.t('mealPlans.createButton')}</button>
      </div>
      <div class="favorite-card-grid" data-mealplan-list>
        ${renderMealPlanCards(plans, favoriteMeals, foods, i18n)}
      </div>
    </section>
  `;
}

function renderMealPlanCards(plans, favoriteMeals, foods, i18n) {
  if (plans.length === 0) {
    return renderEmptyState(i18n.t('mealPlans.noResults'));
  }

  return plans.map((plan) => renderMealPlanCard(plan, favoriteMeals, foods, i18n)).join('');
}

function renderMealPlanCard(plan, favoriteMeals, foods, i18n) {
  const totals = calculateMealPlanTotals(plan, favoriteMeals, foods);

  return `
    <article class="favorite-card" data-module="meal-plans" data-action="register" data-id="${plan.id}" role="button" tabindex="0">
      <div class="favorite-card__header">
        <h3>${escapeHtml(plan.name)}</h3>
      </div>
      <p class="favorite-card__meta">${i18n.t('mealPlans.mealsCount', { count: plan.meals.length })}</p>
      <div class="favorite-card__macros">
        <span>${i18n.formatNumber(totals.calories)} kcal</span>
        <span>${i18n.formatNumber(totals.protein)} g ${i18n.t('settings.protein').toLowerCase()}</span>
      </div>
      <div class="favorite-card__actions">
        <button type="button" data-module="meal-plans" data-action="openEdit" data-id="${plan.id}">${i18n.t('common.edit')}</button>
        <button type="button" data-module="meal-plans" data-action="openDeleteConfirm" data-id="${plan.id}">${i18n.t('common.delete')}</button>
      </div>
    </article>
  `;
}

function renderWizardDialog(state, settings, i18n) {
  const { draft, wizardMode, wizardStep } = state;
  const title = i18n.t(wizardMode === 'edit' ? 'mealPlans.editPlan' : 'mealPlans.createPlan');
  const stepIndex = WIZARD_STEPS.indexOf(wizardStep);

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="meal-plans" data-action="closeWizard" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet favorites-wizard" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="bottom-sheet__header">
        ${
          wizardStep !== 'details'
            ? `<button type="button" class="bottom-sheet__back" data-module="meal-plans" data-action="wizardBack" aria-label="${i18n.t('common.back')}">←</button>`
            : ''
        }
        <h2>${title}</h2>
        <button type="button" class="bottom-sheet__close" data-module="meal-plans" data-action="closeWizard" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <div class="favorites-wizard__steps" aria-hidden="true">
        ${WIZARD_STEPS.map((_, index) => `<span class="favorites-wizard__step${index <= stepIndex ? ' is-active' : ''}"></span>`).join('')}
      </div>
      ${
        wizardStep === 'details'
          ? renderDetailsStep(draft, state.errors, i18n)
          : wizardStep === 'meals'
            ? renderMealsStep(state, settings, i18n)
            : renderPreviewStep(state, i18n)
      }
    </div>
  `;
}

function renderDetailsStep(draft, errors, i18n) {
  return `
    <form class="module-form" data-module="meal-plans" data-action="saveDetails">
      <label class="module-form__wide">
        <span>${i18n.t('mealPlans.planName')}</span>
        <input name="name" value="${valueOrEmpty(draft.name)}" placeholder="${i18n.t('mealPlans.namePlaceholder')}" />
        ${renderError(errors, 'name', i18n)}
      </label>
      <label class="module-form__wide">
        <span>${i18n.t('mealPlans.planDescription')}</span>
        <textarea name="description" rows="3" placeholder="${i18n.t('mealPlans.descriptionPlaceholder')}">${valueOrEmpty(draft.description)}</textarea>
      </label>
      <div class="form-actions">
        <button type="submit">${i18n.t('favorites.nextButton')}</button>
        <button type="button" data-module="meal-plans" data-action="closeWizard">${i18n.t('common.cancel')}</button>
      </div>
    </form>
  `;
}

function renderMealsStep(state, settings, i18n) {
  const { draft, favoriteMeals, foods, pickingFavoriteMeal, editingMealIndex } = state;

  if (pickingFavoriteMeal) {
    const editingMeal = editingMealIndex !== null ? draft.meals[editingMealIndex] : null;
    const enabledSlots = getEnabledMealSlots(settings);
    const slotOptions =
      editingMeal?.mealSlot && !enabledSlots.includes(editingMeal.mealSlot)
        ? [...enabledSlots, editingMeal.mealSlot]
        : enabledSlots;
    const totals = calculateFavoriteMealTotals(pickingFavoriteMeal, foods);

    return `
      <div class="favorites-wizard__section">
        <h3>${escapeHtml(pickingFavoriteMeal.name)}</h3>
        <p class="bottom-sheet__subtitle">${i18n.formatNumber(totals.calories)} kcal &middot; ${i18n.formatNumber(totals.protein)} g ${i18n.t('settings.protein').toLowerCase()}</p>
        <form class="module-form module-form--single" data-module="meal-plans" data-action="addMeal">
          <input type="hidden" name="favoriteMealId" value="${pickingFavoriteMeal.id}" />
          ${editingMealIndex !== null ? `<input type="hidden" name="index" value="${editingMealIndex}" />` : ''}
          <label>
            <span>${i18n.t('mealPlans.assignSlot')}</span>
            <select name="mealSlot">
              ${slotOptions.map((slot) => `<option value="${slot}" ${selected(editingMeal?.mealSlot, slot)}>${i18n.t(getMealSlotLabelKey(slot))}</option>`).join('')}
            </select>
          </label>
          <div class="form-actions">
            <button type="submit">${i18n.t('mealPlans.addToPlanButton')}</button>
            <button type="button" data-module="meal-plans" data-action="cancelFavoritePicker">${i18n.t('common.cancel')}</button>
          </div>
        </form>
      </div>
    `;
  }

  return `
    <div class="favorites-wizard__section">
      <input
        type="search"
        class="favorites__search"
        data-mealplan-favorite-search
        placeholder="${i18n.t('mealPlans.searchFavoritesPlaceholder')}"
        aria-label="${i18n.t('mealPlans.searchFavoritesPlaceholder')}"
      />
      <div class="food-card-grid food-card-grid--compact" data-mealplan-favorite-results>
        ${renderFavoritePickerResults(favoriteMeals, foods, i18n)}
      </div>
    </div>
    <div class="favorites-wizard__section">
      <h3>${i18n.t('mealPlans.addedMeals')}</h3>
      ${renderAddedMeals(draft.meals, favoriteMeals, i18n)}
    </div>
    <div class="form-actions">
      <button type="button" data-module="meal-plans" data-action="goToPreview" ${draft.meals.length === 0 ? 'disabled' : ''}>${i18n.t('favorites.continueToPreview')}</button>
    </div>
  `;
}

function renderPreviewStep(state, i18n) {
  const { draft, favoriteMeals, totals } = state;

  return `
    <div class="favorites-wizard__section">
      <p class="favorites-preview__name">${escapeHtml(draft.name)}</p>
      ${draft.description ? `<p>${escapeHtml(draft.description)}</p>` : ''}
    </div>
    <div class="favorites-wizard__section">
      ${renderAddedMeals(draft.meals, favoriteMeals, i18n)}
    </div>
    ${renderTotalsPreview(totals, i18n)}
    <div class="form-actions">
      <button type="button" data-module="meal-plans" data-action="saveMealPlan">${i18n.t('mealPlans.savePlanButton')}</button>
    </div>
  `;
}

function renderFavoritePickerResults(favoriteMeals, foods, i18n) {
  if (favoriteMeals.length === 0) {
    return renderEmptyState(i18n.t('favorites.noResults'));
  }

  return favoriteMeals
    .map((favoriteMeal) => {
      const totals = calculateFavoriteMealTotals(favoriteMeal, foods);

      return `
        <article class="food-card food-card--compact" data-module="meal-plans" data-action="openFavoritePicker" data-id="${favoriteMeal.id}" role="button" tabindex="0">
          <div class="food-card__header">
            <h3>${escapeHtml(favoriteMeal.name)}</h3>
          </div>
          <p class="food-card__serving">${i18n.formatNumber(totals.calories)} kcal</p>
        </article>
      `;
    })
    .join('');
}

function renderAddedMeals(meals, favoriteMeals, i18n) {
  if (!meals || meals.length === 0) {
    return renderEmptyState(i18n.t('mealPlans.noMealsAddedYet'));
  }

  return `
    <div class="favorites-item-list">
      ${meals
        .map((meal, index) => {
          const favoriteMeal = resolveFavoriteMealForPlanMeal(favoriteMeals, meal);
          const name = favoriteMeal ? favoriteMeal.name : i18n.t('common.noRecord');

          return `
            <div class="favorites-item-row">
              <div>
                <strong>${escapeHtml(name)}</strong>
                <span>${escapeHtml(i18n.t(getMealSlotLabelKey(meal.mealSlot)))}</span>
              </div>
              <div class="favorites-item-row__actions">
                <button type="button" data-module="meal-plans" data-action="openFavoritePicker" data-id="${favoriteMeal?.id ?? ''}" data-index="${index}">${i18n.t('common.edit')}</button>
                <button type="button" data-module="meal-plans" data-action="removeMeal" data-index="${index}">${i18n.t('common.delete')}</button>
              </div>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderTotalsPreview(totals, i18n) {
  return `
    <div class="food-preview-card">
      <dl class="food-preview-grid">
        <div><dt>${i18n.t('settings.calories')}</dt><dd>${i18n.formatNumber(totals.calories)} kcal</dd></div>
        <div><dt>${i18n.t('settings.protein')}</dt><dd>${i18n.formatNumber(totals.protein)} g</dd></div>
        <div><dt>${i18n.t('settings.carbohydrates')}</dt><dd>${i18n.formatNumber(totals.carbs)} g</dd></div>
        <div><dt>${i18n.t('settings.fat')}</dt><dd>${i18n.formatNumber(totals.fat)} g</dd></div>
        <div><dt>${i18n.t('settings.fiber')}</dt><dd>${i18n.formatNumber(totals.fiber)} g</dd></div>
      </dl>
    </div>
  `;
}

function renderDeleteConfirmDialog(plan, i18n) {
  if (!plan) {
    return '';
  }

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="meal-plans" data-action="closeDialog" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${i18n.t('mealPlans.deleteConfirmTitle')}">
      <div class="bottom-sheet__header">
        <h2>${i18n.t('mealPlans.deleteConfirmTitle')}</h2>
        <button type="button" class="bottom-sheet__close" data-module="meal-plans" data-action="closeDialog" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <p>${escapeHtml(i18n.t('mealPlans.deleteConfirmMessage', { name: plan.name }))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="meal-plans" data-action="confirmDelete" data-id="${plan.id}">${i18n.t('common.delete')}</button>
        <button type="button" data-module="meal-plans" data-action="closeDialog">${i18n.t('common.cancel')}</button>
      </div>
    </div>
  `;
}

function wireSearchAndFilter(container, allPlans, favoriteMeals, foods, i18n) {
  const searchInput = container?.querySelector('[data-mealplan-search]');
  const listContainer = container?.querySelector('[data-mealplan-list]');

  if (!searchInput || !listContainer) {
    return;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allPlans.filter((plan) => !query || plan.name.toLowerCase().includes(query));

    listContainer.innerHTML = renderMealPlanCards(filtered, favoriteMeals, foods, i18n);
  });
}

function wireFavoritePickerSearch(container, favoriteMeals, foods, i18n) {
  const searchInput = container?.querySelector('[data-mealplan-favorite-search]');
  const resultsContainer = container?.querySelector('[data-mealplan-favorite-results]');

  if (!searchInput || !resultsContainer) {
    return;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = favoriteMeals.filter((favoriteMeal) => !query || favoriteMeal.name.toLowerCase().includes(query));

    resultsContainer.innerHTML = renderFavoritePickerResults(filtered, foods, i18n);
  });
}
