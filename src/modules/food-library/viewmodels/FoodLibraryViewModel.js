import { createMealEntry } from '../../meal-journal/entities/MealEntry.js';
import { reimportStarterCatalog, seedStarterCatalogIfNeeded } from '../services/seedStarterCatalog.js';
import { createFood, validateFood } from '../entities/Food.js';

export class FoodLibraryViewModel {
  constructor({ repository, mealJournalRepository, eventBus }) {
    this.repository = repository;
    this.mealJournalRepository = mealJournalRepository;
    this.eventBus = eventBus;
    this.foods = [];
    this.activeDialog = null;
    this.editingFoodId = null;
    this.selectedFoodId = null;
    this.errors = {};
    this.message = '';
  }

  async initialize() {
    await seedStarterCatalogIfNeeded(this.repository);
    await this.load();
  }

  // Used by Developer Mode: adds missing catalog foods and refreshes
  // nutrition values for existing built-ins without creating duplicates.
  async reimportStarterCatalog() {
    await reimportStarterCatalog(this.repository);
    await this.load();
    this.#publishChange();
  }

  async load() {
    this.foods = await this.repository.list();
  }

  getState() {
    return {
      foods: this.foods,
      activeDialog: this.activeDialog,
      editingFood: this.editingFoodId ? this.foods.find((food) => food.id === this.editingFoodId) ?? null : null,
      selectedFood: this.selectedFoodId ? this.foods.find((food) => food.id === this.selectedFoodId) ?? null : null,
      errors: this.errors,
      message: this.message,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'openAdd') {
      this.#openForm(null);
      return;
    }

    if (action === 'openEdit') {
      this.#openForm(payload.id);
      return;
    }

    if (action === 'closeDialog') {
      this.#closeDialog();
      return;
    }

    if (action === 'save') {
      await this.#save(payload);
      return;
    }

    if (action === 'openDeleteConfirm') {
      this.selectedFoodId = payload.id;
      this.activeDialog = 'delete-confirm';
      return;
    }

    if (action === 'confirmDelete') {
      await this.#delete(payload.id ?? this.selectedFoodId);
      return;
    }

    if (action === 'openQuantity') {
      this.selectedFoodId = payload.id;
      this.activeDialog = 'quantity';
      return;
    }

    if (action === 'addToMeal') {
      await this.#addToMeal(payload);
    }
  }

  #openForm(foodId) {
    this.editingFoodId = foodId;
    this.activeDialog = 'form';
    this.errors = {};
    this.message = '';
  }

  #closeDialog() {
    this.activeDialog = null;
    this.editingFoodId = null;
    this.selectedFoodId = null;
    this.errors = {};
  }

  async #save(payload) {
    const existingRecord = this.editingFoodId ? await this.repository.getById(this.editingFoodId) : null;
    const food = createFood({ ...payload, id: this.editingFoodId }, existingRecord);
    const errors = validateFood(food);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    await this.repository.save(food);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordSaved';
    this.#publishChange();
  }

  async #delete(foodId) {
    if (!foodId) {
      return;
    }

    await this.repository.delete(foodId);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordDeleted';
    this.#publishChange();
  }

  async #addToMeal(payload) {
    const food = await this.repository.getById(payload.foodId);

    if (!food) {
      return;
    }

    const quantity = Number(payload.quantity) || 0;
    const multiplier = food.servingSize > 0 ? quantity / food.servingSize : 0;

    const meal = createMealEntry({
      title: food.name,
      mealType: 'meal',
      source: 'library',
      calories: food.calories * multiplier,
      protein: food.protein * multiplier,
      carbs: food.carbs * multiplier,
      fat: food.fat * multiplier,
      fiber: food.fiber * multiplier,
    });

    await this.mealJournalRepository.save(meal);
    this.#closeDialog();
    this.message = 'message.foodAddedToMeal';
    this.eventBus.publish('meal-journal:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }

  #publishChange() {
    this.eventBus.publish('food-library:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }
}
