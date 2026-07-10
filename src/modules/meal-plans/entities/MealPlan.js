import { createId } from '../../../core/utils/createId.js';
import { nowIso } from '../../shared/utils/records.js';

export function createMealPlanMeal(input = {}) {
  return {
    favoriteMealId: input.favoriteMealId,
    mealSlot: input.mealSlot,
  };
}

export function createMealPlan(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('meal-plan'),
    name: String(input.name ?? existingRecord?.name ?? '').trim(),
    description: String(input.description ?? existingRecord?.description ?? '').trim(),
    meals: Array.isArray(input.meals) ? input.meals.map(createMealPlanMeal) : (existingRecord?.meals ?? []),
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateMealPlan(mealPlan) {
  const errors = {};

  if (!mealPlan.name) {
    errors.name = 'validation.mealPlanNameRequired';
  }

  if (!mealPlan.meals || mealPlan.meals.length === 0) {
    errors.meals = 'validation.mealPlanMealsRequired';
  }

  return errors;
}
