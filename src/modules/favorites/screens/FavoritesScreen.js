import { getCatalogFoodName } from '../../../data/starterFoodCatalog.js';
import { getEnabledMealSlots } from '../../../shared/constants/mealSlots.js';
import {
  numberOrEmpty,
  renderEmptyState,
  renderError,
  renderMessage,
  valueOrEmpty,
} from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';
import { calculateFavoriteMealTotals, resolveFoodForItem } from '../utils/favoriteMealNutrition.js';

const WIZARD_STEPS = ['details', 'items', 'preview'];
const SORT_OPTIONS = [
  { value: 'mostUsed', icon: '⭐', labelKey: 'favorites.sort.mostUsed' },
  { value: 'recentlyUsed', icon: '🕒', labelKey: 'favorites.sort.recentlyUsed' },
  { value: 'alphabetical', icon: '🔤', labelKey: 'favorites.sort.alphabetical' },
];

function categoryLabel(category, i18n) {
  return category === 'custom' ? i18n.t('favorites.category.custom') : i18n.t(`mealSlot.${category}`);
}

function getVisibleFavoriteCategories(settings) {
  return [...getEnabledMealSlots(settings), 'custom'];
}

export function renderFavoritesScreen(state) {
  const i18n = state.app.i18n;
  const settings = state.app.settings ?? {};
  const favorites = state.favoriteMeals ?? [];
  const foods = state.foods ?? [];
  const isEmpty = favorites.length === 0;

  return `
    <section class="module-screen" aria-labelledby="favorites-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.favorites')}</p>
        <h1 id="favorites-title">${i18n.t('route.favorites')}</h1>
        <p>${i18n.t('favorites.description')}</p>
      </div>

      ${
        isEmpty
          ? renderEmptyFavorites(i18n)
          : renderFavoritesContent(favorites, foods, state.sortOption, settings, state.message, i18n)
      }

      ${state.activeDialog === 'wizard' && state.draft ? renderWizardDialog(state, settings, i18n) : ''}
      ${
        state.activeDialog === 'delete-confirm'
          ? renderDeleteConfirmDialog(favorites.find((favorite) => favorite.id === state.selectedFavoriteId), i18n)
          : ''
      }
    </section>
  `;
}

export function wireFavoritesScreen(container, state) {
  const i18n = state.app.i18n;
  const foods = state.foods ?? [];

  wireSearchAndFilter(container, state.favoriteMeals ?? [], foods, i18n);

  if (state.activeDialog === 'wizard' && state.wizardStep === 'items') {
    if (state.pickingFood) {
      const editingItem = state.editingItemIndex !== null ? state.draft.items[state.editingItemIndex] : null;
      const quantityDefault = editingItem ? editingItem.quantity : state.pickingFood.servingSize;

      wireQuantityPreview(container, state.pickingFood, quantityDefault, i18n);
    } else {
      wireFoodPickerSearch(container, foods, i18n);
    }
  }
}

function renderEmptyFavorites(i18n) {
  return `
    <section class="content-panel favorites-empty">
      <span class="favorites-empty__icon" aria-hidden="true">⭐</span>
      <h2>${i18n.t('favorites.emptyTitle')}</h2>
      <p>${i18n.t('favorites.emptyHint')}</p>
      <button type="button" data-module="favorites" data-action="openCreate">${i18n.t('favorites.createButton')}</button>
    </section>
  `;
}

function renderFavoritesContent(favorites, foods, sortOption, settings, message, i18n) {
  return `
    <section class="content-panel">
      ${renderMessage(message, 'success', i18n)}
      <div class="favorites__sort" role="group" aria-label="${i18n.t('favorites.sortLabel')}">
        ${SORT_OPTIONS.map(
          (option) => `
            <button
              type="button"
              class="favorites__sort-option${sortOption === option.value ? ' is-active' : ''}"
              data-module="favorites"
              data-action="setSortOption"
              data-sort-option="${option.value}"
            >${option.icon} ${i18n.t(option.labelKey)}</button>
          `,
        ).join('')}
      </div>
      <div class="favorites__toolbar">
        <input
          type="search"
          class="favorites__search"
          data-favorite-search
          placeholder="${i18n.t('favorites.searchPlaceholder')}"
          aria-label="${i18n.t('favorites.searchPlaceholder')}"
        />
        <select class="favorites__category-filter" data-favorite-category-filter aria-label="${i18n.t('favorites.category')}">
          <option value="all">${i18n.t('favorites.allCategories')}</option>
          ${getVisibleFavoriteCategories(settings)
            .map((category) => `<option value="${category}">${categoryLabel(category, i18n)}</option>`)
            .join('')}
        </select>
        <button type="button" data-module="favorites" data-action="openCreate">${i18n.t('favorites.createButton')}</button>
      </div>
      <div class="favorite-card-grid" data-favorite-list>
        ${renderFavoriteCards(favorites, foods, i18n)}
      </div>
    </section>
  `;
}

function renderFavoriteCards(favorites, foods, i18n) {
  if (favorites.length === 0) {
    return renderEmptyState(i18n.t('favorites.noResults'));
  }

  return favorites.map((favorite) => renderFavoriteCard(favorite, foods, i18n)).join('');
}

function renderFavoriteCard(favorite, foods, i18n) {
  const totals = calculateFavoriteMealTotals(favorite, foods);

  return `
    <article class="favorite-card" data-module="favorites" data-action="register" data-id="${favorite.id}" role="button" tabindex="0">
      <div class="favorite-card__header">
        <h3>${escapeHtml(favorite.name)}</h3>
        <span class="favorite-card__category">${escapeHtml(categoryLabel(favorite.category, i18n))}</span>
      </div>
      <p class="favorite-card__meta">${i18n.t('favorites.foodsCount', { count: favorite.items.length })}</p>
      <div class="favorite-card__macros">
        <span>${i18n.formatNumber(totals.calories)} kcal</span>
        <span>${i18n.formatNumber(totals.protein)} g ${i18n.t('settings.protein').toLowerCase()}</span>
      </div>
      <div class="favorite-card__actions">
        <button type="button" data-module="favorites" data-action="openEdit" data-id="${favorite.id}">${i18n.t('common.edit')}</button>
        <button type="button" data-module="favorites" data-action="openDeleteConfirm" data-id="${favorite.id}">${i18n.t('common.delete')}</button>
      </div>
    </article>
  `;
}

function renderWizardDialog(state, settings, i18n) {
  const { draft, wizardMode, wizardStep } = state;
  const title = i18n.t(wizardMode === 'edit' ? 'favorites.editFavorite' : 'favorites.createFavorite');
  const stepIndex = WIZARD_STEPS.indexOf(wizardStep);

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="favorites" data-action="closeWizard" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet favorites-wizard" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="bottom-sheet__header">
        ${
          wizardStep !== 'details'
            ? `<button type="button" class="bottom-sheet__back" data-module="favorites" data-action="wizardBack" aria-label="${i18n.t('common.back')}">←</button>`
            : ''
        }
        <h2>${title}</h2>
        <button type="button" class="bottom-sheet__close" data-module="favorites" data-action="closeWizard" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <div class="favorites-wizard__steps" aria-hidden="true">
        ${WIZARD_STEPS.map((_, index) => `<span class="favorites-wizard__step${index <= stepIndex ? ' is-active' : ''}"></span>`).join('')}
      </div>
      ${
        wizardStep === 'details'
          ? renderDetailsStep(draft, state.errors, settings, i18n)
          : wizardStep === 'items'
            ? renderItemsStep(state, i18n)
            : renderPreviewStep(state, i18n)
      }
    </div>
  `;
}

function renderDetailsStep(draft, errors, settings, i18n) {
  return `
    <form class="module-form" data-module="favorites" data-action="saveDetails">
      <label class="module-form__wide">
        <span>${i18n.t('favorites.mealName')}</span>
        <input name="name" value="${valueOrEmpty(draft.name)}" placeholder="${i18n.t('favorites.namePlaceholder')}" />
        ${renderError(errors, 'name', i18n)}
      </label>
      <label>
        <span>${i18n.t('favorites.category')}</span>
        <select name="category">${renderCategoryOptions(draft.category, settings, i18n)}</select>
      </label>
      <div class="form-actions">
        <button type="submit">${i18n.t('favorites.nextButton')}</button>
        <button type="button" data-module="favorites" data-action="closeWizard">${i18n.t('common.cancel')}</button>
      </div>
    </form>
  `;
}

function renderItemsStep(state, i18n) {
  const { draft, foods, pickingFood, editingItemIndex } = state;

  if (pickingFood) {
    const editingItem = editingItemIndex !== null ? draft.items[editingItemIndex] : null;
    const quantityDefault = editingItem ? editingItem.quantity : pickingFood.servingSize;

    return `
      <div class="favorites-wizard__section">
        <h3>${escapeHtml(foodDisplayName(pickingFood, i18n))}</h3>
        <form class="module-form module-form--single" data-module="favorites" data-action="addItem">
          <input type="hidden" name="foodId" value="${pickingFood.id}" />
          ${editingItemIndex !== null ? `<input type="hidden" name="index" value="${editingItemIndex}" />` : ''}
          <label>
            <span>${i18n.t('foodLibrary.quantity')} (${escapeHtml(unitLabel(pickingFood.servingUnit, i18n))})</span>
            <input name="quantity" type="number" min="0" step="0.1" value="${numberOrEmpty(quantityDefault)}" data-favorite-quantity-input />
          </label>
          <div data-favorite-quantity-preview></div>
          <div class="form-actions">
            <button type="submit">${i18n.t('favorites.addFoodButton')}</button>
            <button type="button" data-module="favorites" data-action="cancelFoodPicker">${i18n.t('common.cancel')}</button>
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
        data-favorite-food-search
        placeholder="${i18n.t('favorites.searchFoodPlaceholder')}"
        aria-label="${i18n.t('favorites.searchFoodPlaceholder')}"
      />
      <div class="food-card-grid food-card-grid--compact" data-favorite-food-results>
        ${renderFoodPickerResults(foods, i18n)}
      </div>
    </div>
    <div class="favorites-wizard__section">
      <h3>${i18n.t('favorites.addedFoods')}</h3>
      ${renderAddedItems(draft.items, foods, i18n)}
    </div>
    <div class="form-actions">
      <button type="button" data-module="favorites" data-action="goToPreview" ${draft.items.length === 0 ? 'disabled' : ''}>${i18n.t('favorites.continueToPreview')}</button>
    </div>
  `;
}

function renderPreviewStep(state, i18n) {
  const { draft, foods, totals } = state;

  return `
    <div class="favorites-wizard__section">
      <p class="favorites-preview__name">${escapeHtml(draft.name)}</p>
      <span class="favorite-card__category">${escapeHtml(categoryLabel(draft.category, i18n))}</span>
    </div>
    <div class="favorites-wizard__section">
      ${renderAddedItems(draft.items, foods, i18n)}
    </div>
    ${renderTotalsPreview(totals, i18n)}
    <div class="form-actions">
      <button type="button" data-module="favorites" data-action="saveFavorite">${i18n.t('favorites.saveFavorite')}</button>
    </div>
  `;
}

function renderFoodPickerResults(foods, i18n) {
  if (foods.length === 0) {
    return renderEmptyState(i18n.t('foodLibrary.noResults'));
  }

  return foods
    .map(
      (food) => `
        <article class="food-card food-card--compact" data-module="favorites" data-action="openFoodPicker" data-id="${food.id}" role="button" tabindex="0">
          <div class="food-card__header">
            <h3>${escapeHtml(foodDisplayName(food, i18n))}</h3>
            <span class="food-card__category">${escapeHtml(i18n.t(`foodLibrary.category.${food.category}`))}</span>
          </div>
          <p class="food-card__serving">${i18n.formatNumber(food.servingSize)} ${escapeHtml(unitLabel(food.servingUnit, i18n))}</p>
        </article>
      `,
    )
    .join('');
}

function renderAddedItems(items, foods, i18n) {
  if (!items || items.length === 0) {
    return renderEmptyState(i18n.t('favorites.noFoodsAddedYet'));
  }

  return `
    <div class="favorites-item-list">
      ${items
        .map((item, index) => {
          const food = resolveFoodForItem(foods, item);
          const name = food ? foodDisplayName(food, i18n) : i18n.t('common.noRecord');

          return `
            <div class="favorites-item-row">
              <div>
                <strong>${escapeHtml(name)}</strong>
                <span>${i18n.formatNumber(item.quantity)} ${escapeHtml(unitLabel(item.servingUnit, i18n))}</span>
              </div>
              <div class="favorites-item-row__actions">
                <button type="button" data-module="favorites" data-action="openFoodPicker" data-id="${food?.id ?? ''}" data-index="${index}">${i18n.t('common.edit')}</button>
                <button type="button" data-module="favorites" data-action="removeItem" data-index="${index}">${i18n.t('common.delete')}</button>
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

function renderDeleteConfirmDialog(favorite, i18n) {
  if (!favorite) {
    return '';
  }

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="favorites" data-action="closeDialog" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${i18n.t('favorites.deleteConfirmTitle')}">
      <div class="bottom-sheet__header">
        <h2>${i18n.t('favorites.deleteConfirmTitle')}</h2>
        <button type="button" class="bottom-sheet__close" data-module="favorites" data-action="closeDialog" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <p>${escapeHtml(i18n.t('favorites.deleteConfirmMessage', { name: favorite.name }))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="favorites" data-action="confirmDelete" data-id="${favorite.id}">${i18n.t('common.delete')}</button>
        <button type="button" data-module="favorites" data-action="closeDialog">${i18n.t('common.cancel')}</button>
      </div>
    </div>
  `;
}

function renderCategoryOptions(currentValue, settings, i18n) {
  const visibleCategories = getVisibleFavoriteCategories(settings);
  const categories = visibleCategories.includes(currentValue) ? visibleCategories : [...visibleCategories, currentValue];

  return categories
    .map((category) => `<option value="${category}" ${selected(currentValue, category)}>${categoryLabel(category, i18n)}</option>`)
    .join('');
}

function unitLabel(unit, i18n) {
  if (unit === 'g' || unit === 'mL') {
    return unit;
  }

  return i18n.t(`foodLibrary.unit.${unit}`);
}

function foodDisplayName(food, i18n) {
  if (food.isBuiltIn && food.foodCode) {
    const isUnmodifiedName =
      food.name === getCatalogFoodName(food.foodCode, 'en') || food.name === getCatalogFoodName(food.foodCode, 'pt-BR');

    if (isUnmodifiedName) {
      return getCatalogFoodName(food.foodCode, i18n.language) ?? food.name;
    }
  }

  return food.name;
}

function wireSearchAndFilter(container, allFavorites, foods, i18n) {
  const searchInput = container?.querySelector('[data-favorite-search]');
  const categorySelect = container?.querySelector('[data-favorite-category-filter]');
  const listContainer = container?.querySelector('[data-favorite-list]');

  if (!searchInput || !listContainer) {
    return;
  }

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect?.value ?? 'all';

    const filtered = allFavorites.filter((favorite) => {
      const matchesCategory = category === 'all' || favorite.category === category;
      const categoryText = categoryLabel(favorite.category, i18n).toLowerCase();
      const nameLabel = favorite.name.toLowerCase();
      const matchesQuery = !query || nameLabel.includes(query) || categoryText.includes(query);

      return matchesCategory && matchesQuery;
    });

    listContainer.innerHTML = renderFavoriteCards(filtered, foods, i18n);
  };

  searchInput.addEventListener('input', applyFilter);
  categorySelect?.addEventListener('change', applyFilter);
}

function wireFoodPickerSearch(container, foods, i18n) {
  const searchInput = container?.querySelector('[data-favorite-food-search]');
  const resultsContainer = container?.querySelector('[data-favorite-food-results]');

  if (!searchInput || !resultsContainer) {
    return;
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = foods.filter((food) => {
      const categoryLabel = i18n.t(`foodLibrary.category.${food.category}`).toLowerCase();
      const nameLabel = foodDisplayName(food, i18n).toLowerCase();

      return !query || nameLabel.includes(query) || categoryLabel.includes(query);
    });

    resultsContainer.innerHTML = renderFoodPickerResults(filtered, i18n);
  });
}

function wireQuantityPreview(container, food, quantityDefault, i18n) {
  const input = container?.querySelector('[data-favorite-quantity-input]');
  const preview = container?.querySelector('[data-favorite-quantity-preview]');

  if (!input || !preview) {
    return;
  }

  const updatePreview = () => {
    const quantity = Number(input.value) || 0;
    const multiplier = food.servingSize > 0 ? quantity / food.servingSize : 0;

    preview.innerHTML = renderTotalsPreview(
      {
        calories: food.calories * multiplier,
        protein: food.protein * multiplier,
        carbs: food.carbs * multiplier,
        fat: food.fat * multiplier,
        fiber: food.fiber * multiplier,
      },
      i18n,
    );
  };

  input.addEventListener('input', updatePreview);
  updatePreview();
}
