import { CrudViewModel } from '../../shared/viewmodels/CrudViewModel.js';
import { createMealEntry, validateMealEntry } from '../entities/MealEntry.js';

export class MealJournalViewModel extends CrudViewModel {
  constructor({ repository, eventBus }) {
    super({
      repository,
      eventBus,
      entityName: 'meal-journal',
      createEntity: createMealEntry,
      validateEntity: validateMealEntry,
    });
  }

  async handleAction(action, payload = {}) {
    if (action === 'importHwpFood') {
      await this.#importHwpFood(payload);
      return;
    }

    await super.handleAction(action, payload);
  }

  async #importHwpFood(payload) {
    const entity = createMealEntry({
      mealType: payload.mealType,
      title: payload.name,
      calories: payload.calories,
      protein: payload.protein,
      carbs: payload.carbs,
      fat: payload.fat,
      fiber: payload.fiber,
      source: 'hwp_food',
      hwpFoodRaw: payload.raw,
    });

    await this.repository.save(entity);
    await this.load();
    this.message = 'message.mealImported';
    this.publishChange();
  }
}
