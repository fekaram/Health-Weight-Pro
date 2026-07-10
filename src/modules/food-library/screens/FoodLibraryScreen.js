import { getCatalogFoodName } from '../../../data/starterFoodCatalog.js';
import { FOOD_CATEGORIES, SERVING_UNITS } from '../entities/Food.js';
import {
  numberOrEmpty,
  renderEmptyState,
  renderError,
  renderMessage,
  valueOrEmpty,
} from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';

export function renderFoodLibraryScreen(state) {
  const i18n = state.app.i18n;
  const foods = state.foods ?? [];
  const isEmpty = foods.length === 0;

  return `
    <section class="module-screen" aria-labelledby="food-library-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.foodLibrary')}</p>
        <h1 id="food-library-title">${i18n.t('route.foodLibrary')}</h1>
        <p>${i18n.t('foodLibrary.description')}</p>
      </div>

      ${isEmpty ? renderEmptyLibrary(i18n) : renderLibraryContent(foods, state.message, i18n)}

      ${state.activeDialog === 'form' ? renderFoodFormDialog(state, i18n) : ''}
      ${state.activeDialog === 'quantity' && state.selectedFood ? renderQuantityDialog(state.selectedFood, i18n) : ''}
      ${state.activeDialog === 'delete-confirm' && state.selectedFood ? renderDeleteConfirmDialog(state.selectedFood, i18n) : ''}
    </section>
  `;
}

export function wireFoodLibraryScreen(container, state) {
  const i18n = state.app.i18n;

  wireSearchAndFilter(container, state.foods ?? [], i18n);

  if (state.activeDialog === 'quantity' && state.selectedFood) {
    wireQuantityPreview(container, state.selectedFood, i18n);
  }
}

function renderEmptyLibrary(i18n) {
  return `
    <section class="content-panel food-library-empty">
      <span class="food-library-empty__icon" aria-hidden="true">📚</span>
      <h2>${i18n.t('foodLibrary.emptyTitle')}</h2>
      <p>${i18n.t('foodLibrary.emptyHint')}</p>
      <button type="button" data-module="food-library" data-action="openAdd">${i18n.t('foodLibrary.addFood')}</button>
    </section>
  `;
}

function renderLibraryContent(foods, message, i18n) {
  return `
    <section class="content-panel">
      ${renderMessage(message, 'success', i18n)}
      <div class="food-library__toolbar">
        <input
          type="search"
          class="food-library__search"
          data-food-search
          placeholder="${i18n.t('foodLibrary.searchPlaceholder')}"
          aria-label="${i18n.t('foodLibrary.searchPlaceholder')}"
        />
        <select class="food-library__category-filter" data-food-category-filter aria-label="${i18n.t('foodLibrary.category')}">
          <option value="all">${i18n.t('foodLibrary.allCategories')}</option>
          ${FOOD_CATEGORIES.map(
            (category) => `<option value="${category}">${i18n.t(`foodLibrary.category.${category}`)}</option>`,
          ).join('')}
        </select>
        <button type="button" data-module="food-library" data-action="openAdd">${i18n.t('foodLibrary.addFood')}</button>
      </div>
      <div class="food-card-grid" data-food-list>
        ${renderFoodCards(foods, i18n)}
      </div>
    </section>
  `;
}

function renderFoodCards(foods, i18n) {
  if (foods.length === 0) {
    return renderEmptyState(i18n.t('foodLibrary.noResults'));
  }

  return foods.map((food) => renderFoodCard(food, i18n)).join('');
}

function renderFoodCard(food, i18n) {
  return `
    <article class="food-card" data-module="food-library" data-action="openQuantity" data-id="${food.id}" role="button" tabindex="0">
      <div class="food-card__header">
        <h3>${escapeHtml(foodDisplayName(food, i18n))}</h3>
        <span class="food-card__category">${escapeHtml(i18n.t(`foodLibrary.category.${food.category}`))}</span>
      </div>
      <p class="food-card__serving">${i18n.formatNumber(food.servingSize)} ${escapeHtml(unitLabel(food.servingUnit, i18n))}</p>
      <div class="food-card__macros">
        <span>${i18n.formatNumber(food.calories)} kcal</span>
        <span>${i18n.formatNumber(food.protein)} g ${i18n.t('settings.protein').toLowerCase()}</span>
      </div>
      <div class="food-card__actions">
        <button type="button" data-module="food-library" data-action="openEdit" data-id="${food.id}">${i18n.t('common.edit')}</button>
        <button type="button" data-module="food-library" data-action="openDeleteConfirm" data-id="${food.id}">${i18n.t('common.delete')}</button>
      </div>
    </article>
  `;
}

function renderFoodFormDialog(state, i18n) {
  const food = state.editingFood ?? {};
  const isEdit = Boolean(state.editingFood);

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${i18n.t(isEdit ? 'foodLibrary.editFood' : 'foodLibrary.addFood')}">
      <div class="bottom-sheet__header">
        <h2>${i18n.t(isEdit ? 'foodLibrary.editFood' : 'foodLibrary.addFood')}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <form class="module-form" data-module="food-library" data-action="save">
        <label class="module-form__wide">
          <span>${i18n.t('foodLibrary.foodName')}</span>
          <input name="name" value="${valueOrEmpty(isEdit ? foodDisplayName(food, i18n) : food.name)}" />
          ${renderError(state.errors, 'name', i18n)}
        </label>
        <label>
          <span>${i18n.t('foodLibrary.category')}</span>
          <select name="category">${renderCategoryOptions(food.category ?? 'others', i18n)}</select>
        </label>
        <label>
          <span>${i18n.t('foodLibrary.servingSize')}</span>
          <input name="servingSize" type="number" min="0" step="0.1" value="${numberOrEmpty(food.servingSize ?? 100)}" />
          ${renderError(state.errors, 'servingSize', i18n)}
        </label>
        <label>
          <span>${i18n.t('foodLibrary.servingUnit')}</span>
          <select name="servingUnit">${renderServingUnitOptions(food.servingUnit ?? 'g', i18n)}</select>
        </label>
        <label>
          <span>${i18n.t('settings.calories')}</span>
          <input name="calories" type="number" min="0" step="0.1" value="${numberOrEmpty(food.calories ?? 0)}" />
        </label>
        <label>
          <span>${i18n.t('settings.protein')}</span>
          <input name="protein" type="number" min="0" step="0.1" value="${numberOrEmpty(food.protein ?? 0)}" />
        </label>
        <label>
          <span>${i18n.t('settings.carbohydrates')}</span>
          <input name="carbs" type="number" min="0" step="0.1" value="${numberOrEmpty(food.carbs ?? 0)}" />
        </label>
        <label>
          <span>${i18n.t('settings.fat')}</span>
          <input name="fat" type="number" min="0" step="0.1" value="${numberOrEmpty(food.fat ?? 0)}" />
        </label>
        <label>
          <span>${i18n.t('settings.fiber')}</span>
          <input name="fiber" type="number" min="0" step="0.1" value="${numberOrEmpty(food.fiber ?? 0)}" />
        </label>
        <div class="form-actions">
          <button type="submit">${i18n.t('common.save')}</button>
          <button type="button" data-module="food-library" data-action="closeDialog">${i18n.t('common.cancel')}</button>
        </div>
      </form>
    </div>
  `;
}

function renderQuantityDialog(food, i18n) {
  const unit = unitLabel(food.servingUnit, i18n);

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="dialog" aria-modal="true" aria-label="${i18n.t('foodLibrary.chooseQuantity')}">
      <div class="bottom-sheet__header">
        <h2>${escapeHtml(foodDisplayName(food, i18n))}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <p class="bottom-sheet__subtitle">${i18n.t('foodLibrary.chooseQuantity')}</p>
      <form class="module-form module-form--single" data-module="food-library" data-action="addToMeal">
        <input type="hidden" name="foodId" value="${food.id}" />
        <label>
          <span>${i18n.t('foodLibrary.quantity')} (${escapeHtml(unit)})</span>
          <input name="quantity" type="number" min="0" step="0.1" value="${food.servingSize}" data-quantity-input />
        </label>
        <div data-quantity-preview></div>
        <div class="form-actions">
          <button type="submit">${i18n.t('foodLibrary.addToMeal')}</button>
          <button type="button" data-module="food-library" data-action="closeDialog">${i18n.t('common.cancel')}</button>
        </div>
      </form>
    </div>
  `;
}

function renderDeleteConfirmDialog(food, i18n) {
  return `
    <button type="button" class="bottom-sheet-overlay" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${i18n.t('foodLibrary.deleteConfirmTitle')}">
      <div class="bottom-sheet__header">
        <h2>${i18n.t('foodLibrary.deleteConfirmTitle')}</h2>
        <button type="button" class="bottom-sheet__close" data-module="food-library" data-action="closeDialog" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <p>${escapeHtml(i18n.t('foodLibrary.deleteConfirmMessage', { name: foodDisplayName(food, i18n) }))}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="food-library" data-action="confirmDelete" data-id="${food.id}">${i18n.t('common.delete')}</button>
        <button type="button" data-module="food-library" data-action="closeDialog">${i18n.t('common.cancel')}</button>
      </div>
    </div>
  `;
}

function renderCategoryOptions(currentValue, i18n) {
  return FOOD_CATEGORIES.map(
    (category) =>
      `<option value="${category}" ${selected(currentValue, category)}>${i18n.t(`foodLibrary.category.${category}`)}</option>`,
  ).join('');
}

function renderServingUnitOptions(currentValue, i18n) {
  return SERVING_UNITS.map(
    (unit) => `<option value="${unit}" ${selected(currentValue, unit)}>${unitLabel(unit, i18n)}</option>`,
  ).join('');
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

function renderFoodPreview(nutrition, i18n) {
  return `
    <div class="food-preview-card">
      <dl class="food-preview-grid">
        <div><dt>${i18n.t('settings.calories')}</dt><dd>${i18n.formatNumber(nutrition.calories)} kcal</dd></div>
        <div><dt>${i18n.t('settings.protein')}</dt><dd>${i18n.formatNumber(nutrition.protein)} g</dd></div>
        <div><dt>${i18n.t('settings.carbohydrates')}</dt><dd>${i18n.formatNumber(nutrition.carbs)} g</dd></div>
        <div><dt>${i18n.t('settings.fat')}</dt><dd>${i18n.formatNumber(nutrition.fat)} g</dd></div>
        <div><dt>${i18n.t('settings.fiber')}</dt><dd>${i18n.formatNumber(nutrition.fiber)} g</dd></div>
      </dl>
    </div>
  `;
}

function wireSearchAndFilter(container, allFoods, i18n) {
  const searchInput = container?.querySelector('[data-food-search]');
  const categorySelect = container?.querySelector('[data-food-category-filter]');
  const listContainer = container?.querySelector('[data-food-list]');

  if (!searchInput || !listContainer) {
    return;
  }

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect?.value ?? 'all';

    const filtered = allFoods.filter((food) => {
      const matchesCategory = category === 'all' || food.category === category;
      const categoryLabel = i18n.t(`foodLibrary.category.${food.category}`).toLowerCase();
      const nameLabel = foodDisplayName(food, i18n).toLowerCase();
      const matchesQuery = !query || nameLabel.includes(query) || categoryLabel.includes(query);

      return matchesCategory && matchesQuery;
    });

    listContainer.innerHTML = renderFoodCards(filtered, i18n);
  };

  searchInput.addEventListener('input', applyFilter);
  categorySelect?.addEventListener('change', applyFilter);
}

function wireQuantityPreview(container, food, i18n) {
  const input = container?.querySelector('[data-quantity-input]');
  const preview = container?.querySelector('[data-quantity-preview]');

  if (!input || !preview) {
    return;
  }

  const updatePreview = () => {
    const quantity = Number(input.value) || 0;
    const multiplier = food.servingSize > 0 ? quantity / food.servingSize : 0;

    preview.innerHTML = renderFoodPreview(
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
