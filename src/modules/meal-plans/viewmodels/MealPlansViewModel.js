import { registerFavoriteMeal } from '../../favorites/services/registerFavoriteMeal.js';
import { createMealPlan, validateMealPlan } from '../entities/MealPlan.js';
import { calculateMealPlanTotals, resolveFavoriteMealForPlanMeal } from '../utils/mealPlanNutrition.js';

export class MealPlansViewModel {
  constructor({ repository, favoriteMealsRepository, foodLibraryRepository, mealJournalRepository, eventBus }) {
    this.repository = repository;
    this.favoriteMealsRepository = favoriteMealsRepository;
    this.foodLibraryRepository = foodLibraryRepository;
    this.mealJournalRepository = mealJournalRepository;
    this.eventBus = eventBus;
    this.mealPlans = [];
    this.favoriteMeals = [];
    this.foods = [];
    this.activeDialog = null;
    this.wizardMode = 'create';
    this.wizardStep = 'details';
    this.draft = null;
    this.pickingFavoriteMealId = null;
    this.editingMealIndex = null;
    this.selectedPlanId = null;
    this.errors = {};
    this.message = '';
  }

  async initialize() {
    await this.load();
  }

  async load() {
    this.mealPlans = await this.repository.list();
    this.favoriteMeals = await this.favoriteMealsRepository.list();
    this.foods = await this.foodLibraryRepository.list();
  }

  getState() {
    return {
      mealPlans: this.mealPlans,
      favoriteMeals: this.favoriteMeals,
      foods: this.foods,
      activeDialog: this.activeDialog,
      wizardMode: this.wizardMode,
      wizardStep: this.wizardStep,
      draft: this.draft,
      pickingFavoriteMeal: this.pickingFavoriteMealId
        ? this.favoriteMeals.find((favoriteMeal) => favoriteMeal.id === this.pickingFavoriteMealId) ?? null
        : null,
      editingMealIndex: this.editingMealIndex,
      selectedPlanId: this.selectedPlanId,
      errors: this.errors,
      message: this.message,
      totals: this.draft ? calculateMealPlanTotals(this.draft, this.favoriteMeals, this.foods) : null,
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

    if (action === 'openFavoritePicker') {
      this.pickingFavoriteMealId = payload.id;
      this.editingMealIndex = payload.index !== undefined ? Number(payload.index) : null;
      return;
    }

    if (action === 'cancelFavoritePicker') {
      this.pickingFavoriteMealId = null;
      this.editingMealIndex = null;
      return;
    }

    if (action === 'addMeal') {
      this.#addMeal(payload);
      return;
    }

    if (action === 'removeMeal') {
      this.#removeMeal(payload);
      return;
    }

    if (action === 'goToPreview') {
      if ((this.draft?.meals?.length ?? 0) > 0) {
        this.wizardStep = 'preview';
      }
      return;
    }

    if (action === 'backToMeals') {
      this.wizardStep = 'meals';
      return;
    }

    if (action === 'saveMealPlan') {
      await this.#saveMealPlan();
      return;
    }

    if (action === 'openDeleteConfirm') {
      this.selectedPlanId = payload.id;
      this.activeDialog = 'delete-confirm';
      return;
    }

    if (action === 'confirmDelete') {
      await this.#delete(payload.id ?? this.selectedPlanId);
      return;
    }

    if (action === 'register') {
      await this.#register(payload.id);
    }
  }

  #openWizard(mode, planId) {
    if (mode === 'edit') {
      const plan = this.mealPlans.find((item) => item.id === planId);

      if (!plan) {
        return;
      }

      this.draft = {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        meals: plan.meals.map((meal) => ({ ...meal })),
      };
    } else {
      this.draft = { id: null, name: '', description: '', meals: [] };
    }

    this.wizardMode = mode;
    this.wizardStep = 'details';
    this.pickingFavoriteMealId = null;
    this.editingMealIndex = null;
    this.activeDialog = 'wizard';
    this.errors = {};
    this.message = '';
  }

  #closeDialog() {
    this.activeDialog = null;
    this.draft = null;
    this.pickingFavoriteMealId = null;
    this.editingMealIndex = null;
    this.selectedPlanId = null;
    this.errors = {};
  }

  #wizardBack() {
    if (this.wizardStep === 'meals') {
      this.wizardStep = 'details';
      return;
    }

    if (this.wizardStep === 'preview') {
      this.wizardStep = 'meals';
      return;
    }

    this.#closeDialog();
  }

  #saveDetails(payload) {
    const name = String(payload.name ?? '').trim();

    if (!name) {
      this.errors = { name: 'validation.mealPlanNameRequired' };
      return;
    }

    this.draft = { ...this.draft, name, description: String(payload.description ?? '').trim() };
    this.errors = {};
    this.wizardStep = 'meals';
  }

  #addMeal(payload) {
    const favoriteMeal = this.favoriteMeals.find((item) => item.id === payload.favoriteMealId);

    if (!favoriteMeal || !this.draft || !payload.mealSlot) {
      return;
    }

    const meal = { favoriteMealId: favoriteMeal.id, mealSlot: payload.mealSlot };
    const meals = [...this.draft.meals];

    if (this.editingMealIndex !== null && meals[this.editingMealIndex]) {
      meals[this.editingMealIndex] = meal;
    } else {
      meals.push(meal);
    }

    this.draft = { ...this.draft, meals };
    this.pickingFavoriteMealId = null;
    this.editingMealIndex = null;
  }

  #removeMeal(payload) {
    if (!this.draft) {
      return;
    }

    const index = Number(payload.index);
    const meals = this.draft.meals.filter((_, mealIndex) => mealIndex !== index);

    this.draft = { ...this.draft, meals };
  }

  async #saveMealPlan() {
    const mealPlan = createMealPlan({ ...this.draft, id: this.draft?.id ?? null }, null);
    const errors = validateMealPlan(mealPlan);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    await this.repository.save(mealPlan);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordSaved';
    this.#publishChange();
  }

  async #delete(planId) {
    if (!planId) {
      return;
    }

    await this.repository.delete(planId);
    await this.load();
    this.#closeDialog();
    this.message = 'message.recordDeleted';
    this.#publishChange();
  }

  async #register(planId) {
    const plan = this.mealPlans.find((item) => item.id === planId);

    if (!plan || plan.meals.length === 0) {
      return;
    }

    for (const planMeal of plan.meals) {
      const favoriteMeal = resolveFavoriteMealForPlanMeal(this.favoriteMeals, planMeal);

      if (!favoriteMeal) {
        continue;
      }

      await registerFavoriteMeal({
        favoriteMeal,
        mealSlot: planMeal.mealSlot,
        foods: this.foods,
        favoriteMealsRepository: this.favoriteMealsRepository,
        mealJournalRepository: this.mealJournalRepository,
      });
    }

    await this.load();
    this.message = 'message.mealPlanRegistered';
    this.eventBus.publish('meal-journal:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }

  #publishChange() {
    this.eventBus.publish('meal-plans:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }
}
