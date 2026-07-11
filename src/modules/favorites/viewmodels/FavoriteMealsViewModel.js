import { createFood } from '../../food-library/entities/Food.js';
import {
  createFavoriteMeal,
  mapFavoriteCategoryToMealType,
  mapMealTypeToFavoriteCategory,
  validateFavoriteMeal,
} from '../entities/FavoriteMeal.js';
import { registerFavoriteMeal } from '../services/registerFavoriteMeal.js';
import { calculateFavoriteMealTotals, foodReferenceKey } from '../utils/favoriteMealNutrition.js';

const SORT_OPTIONS = ['mostUsed', 'recentlyUsed', 'alphabetical'];

function sortFavoriteMeals(favoriteMeals, sortOption) {
  const sorted = [...favoriteMeals];

  if (sortOption === 'recentlyUsed') {
    return sorted.sort((a, b) => String(b.lastUsedAt ?? '').localeCompare(String(a.lastUsedAt ?? '')));
  }

  if (sortOption === 'alphabetical') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted.sort((a, b) => (b.usageCount ?? 0) - (a.usageCount ?? 0));
}

export class FavoriteMealsViewModel {
  constructor({ repository, foodLibraryRepository, mealJournalRepository, eventBus }) {
    this.repository = repository;
    this.foodLibraryRepository = foodLibraryRepository;
    this.mealJournalRepository = mealJournalRepository;
    this.eventBus = eventBus;
    this.favoriteMeals = [];
    this.foods = [];
    this.sortOption = 'mostUsed';
    this.activeDialog = null;
    this.wizardMode = 'create';
    this.wizardStep = 'details';
    this.draft = null;
    this.pickingFoodId = null;
    this.editingItemIndex = null;
    this.selectedFavoriteId = null;
    this.errors = {};
    this.message = '';
  }

  async initialize() {
    this.sortOption = await this.repository.getSortOption();
    await this.load();
  }

  async load() {
    this.favoriteMeals = await this.repository.list();
    this.foods = await this.foodLibraryRepository.list();
  }

  getState() {
    return {
      favoriteMeals: sortFavoriteMeals(this.favoriteMeals, this.sortOption),
      sortOption: this.sortOption,
      foods: this.foods,
      activeDialog: this.activeDialog,
      wizardMode: this.wizardMode,
      wizardStep: this.wizardStep,
      draft: this.draft,
      pickingFood: this.pickingFoodId ? this.foods.find((food) => food.id === this.pickingFoodId) ?? null : null,
      editingItemIndex: this.editingItemIndex,
      selectedFavoriteId: this.selectedFavoriteId,
      errors: this.errors,
      message: this.message,
      totals: this.draft ? calculateFavoriteMealTotals(this.draft, this.foods) : null,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'openCreate') {
      this.#openWizard('create', null);
      return;
    }

    if (action === 'openEdit') {
      this.#openWizard('edit', payload.id);
      return;
    }

    if (action === 'closeDialog' || action === 'closeWizard') {
      this.#closeDialog();
      return;
    }

    if (action === 'wizardBack') {
      this.#wizardBack();
      return;
    }

    if (action === 'saveDetails') {
      this.#saveDetails(payload);
      return;
    }

    if (action === 'openFoodPicker') {
      this.pickingFoodId = payload.id;
      this.editingItemIndex = payload.index !== undefined ? Number(payload.index) : null;
      return;
    }

    if (action === 'cancelFoodPicker') {
      this.pickingFoodId = null;
      this.editingItemIndex = null;
      return;
    }

    if (action === 'addItem') {
      this.#addItem(payload);
      return;
    }

    if (action === 'removeItem') {
      this.#removeItem(payload);
      return;
    }

    if (action === 'goToPreview') {
      if ((this.draft?.items?.length ?? 0) > 0) {
        this.wizardStep = 'preview';
      }
      return;
    }

    if (action === 'backToItems') {
      this.wizardStep = 'items';
      return;
    }

    if (action === 'saveFavorite') {
      await this.#saveFavorite();
      return;
    }

    if (action === 'openDeleteConfirm') {
      this.selectedFavoriteId = payload.id;
      this.activeDialog = 'delete-confirm';
      return;
    }

    if (action === 'confirmDelete') {
      await this.#delete(payload.id ?? this.selectedFavoriteId);
      return;
    }

    if (action === 'register') {
      await this.#register(payload.id);
      return;
    }

    if (action === 'startFromImportedMeal') {
      await this.#startFromImportedMeal(payload);
      return;
    }

    if (action === 'saveQuickFavorite') {
      await this.#saveQuickFavorite(payload);
      return;
    }

    if (action === 'setSortOption') {
      await this.#setSortOption(payload.sortOption);
    }
  }

  async #setSortOption(sortOption) {
    if (!SORT_OPTIONS.includes(sortOption)) {
      return;
    }

    this.sortOption = sortOption;
    await this.repository.saveSortOption(sortOption);
  }

  #openWizard(mode, favoriteId) {
    if (mode === 'edit') {
      const favorite = this.favoriteMeals.find((item) => item.id === favoriteId);

      if (!favorite) {
        return;
      }

      this.draft = {
        id: favorite.id,
        name: favorite.name,
        category: favorite.category,
        items: favorite.items.map((item) => ({ ...item })),
      };
    } else {
      this.draft = { id: null, name: '', category: 'custom', items: [] };
    }

    this.wizardMode = mode;
    this.wizardStep = 'details';
    this.pickingFoodId = null;
    this.editingItemIndex = null;
    this.activeDialog = 'wizard';
    this.errors = {};
    this.message = '';
  }

  #closeDialog() {
    this.activeDialog = null;
    this.draft = null;
    this.pickingFoodId = null;
    this.editingItemIndex = null;
    this.selectedFavoriteId = null;
    this.errors = {};
  }

  #wizardBack() {
    if (this.wizardStep === 'items') {
      this.wizardStep = 'details';
      return;
    }

    if (this.wizardStep === 'preview') {
      this.wizardStep = 'items';
      return;
    }

    this.#closeDialog();
  }

  #saveDetails(payload) {
    const name = String(payload.name ?? '').trim();

    if (!name) {
      this.errors = { name: 'validation.favoriteMealNameRequired' };
      return;
    }

    this.draft = { ...this.draft, name, category: payload.category ?? this.draft.category };
    this.errors = {};
    this.wizardStep = 'items';
  }

  #addItem(payload) {
    const food = this.foods.find((item) => item.id === payload.foodId);

    if (!food || !this.draft) {
      return;
    }

    const quantity = Number(payload.quantity) || 0;

    if (quantity <= 0) {
      return;
    }

    const item = { foodCode: foodReferenceKey(food), quantity, servingUnit: food.servingUnit };
    const items = [...this.draft.items];

    if (this.editingItemIndex !== null && items[this.editingItemIndex]) {
      items[this.editingItemIndex] = item;
    } else {
      items.push(item);
    }

    this.draft = { ...this.draft, items };
    this.pickingFoodId = null;
    this.editingItemIndex = null;
  }

  #removeItem(payload) {
    if (!this.draft) {
      return;
    }

    const index = Number(payload.index);
    const items = this.draft.items.filter((_, itemIndex) => itemIndex !== index);

    this.draft = { ...this.draft, items };
  }

  // Simplified two-field path for meals that already have their nutrition (imported via
  // Nutri IA+): only Name + Category are asked for, then reuses the same save/validate/
  // publish logic as the full wizard — no rebuilding the meal, no items/preview steps.
  async #saveQuickFavorite(payload) {
    const name = String(payload.name ?? '').trim();

    if (!name) {
      this.errors = { name: 'validation.favoriteMealNameRequired' };
      return;
    }

    this.draft = { ...this.draft, name, category: payload.category ?? this.draft.category };
    this.errors = {};
    await this.#saveFavorite();
  }

  async #saveFavorite() {
    const favoriteMeal = createFavoriteMeal({ ...this.draft, id: this.draft?.id ?? null }, null);
    const errors = validateFavoriteMeal(favoriteMeal);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    await this.repository.save(favoriteMeal);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordSaved';
    this.#publishChange();
  }

  async #delete(favoriteId) {
    if (!favoriteId) {
      return;
    }

    await this.repository.delete(favoriteId);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordDeleted';
    this.#publishChange();
  }

  async #register(favoriteId) {
    const favorite = this.favoriteMeals.find((item) => item.id === favoriteId);

    if (!favorite) {
      return;
    }

    await registerFavoriteMeal({
      favoriteMeal: favorite,
      mealSlot: mapFavoriteCategoryToMealType(favorite.category),
      foods: this.foods,
      favoriteMealsRepository: this.repository,
      mealJournalRepository: this.mealJournalRepository,
    });

    await this.load();
    this.message = 'message.favoriteRegistered';
    this.eventBus.publish('meal-journal:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }

  async #startFromImportedMeal(payload) {
    const importedFood = createFood({
      name: payload.name,
      category: 'others',
      servingSize: 100,
      servingUnit: 'serving',
      calories: Number(payload.calories) || 0,
      protein: Number(payload.protein) || 0,
      carbs: Number(payload.carbs) || 0,
      fat: Number(payload.fat) || 0,
      fiber: Number(payload.fiber) || 0,
    });

    await this.foodLibraryRepository.save(importedFood);
    await this.load();
    this.eventBus.publish('food-library:changed');
    this.eventBus.publish('core-mvp:data-changed');

    this.draft = {
      id: null,
      name: payload.name ?? '',
      category: mapMealTypeToFavoriteCategory(payload.mealType),
      items: [
        {
          foodCode: foodReferenceKey(importedFood),
          quantity: importedFood.servingSize,
          servingUnit: importedFood.servingUnit,
        },
      ],
    };
    this.wizardMode = 'create';
    this.wizardStep = 'details';
    this.activeDialog = 'quick-save';
    this.pickingFoodId = null;
    this.editingItemIndex = null;
    this.errors = {};
    this.message = '';
  }

  #publishChange() {
    this.eventBus.publish('favorites:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }
}
