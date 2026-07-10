import { createId } from '../../../core/utils/createId.js';
import { nowIso, todayDate, toNumberOrNull } from '../../shared/utils/records.js';

export function createMealEntry(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('meal'),
    mealDate: input.mealDate || existingRecord?.mealDate || todayDate(),
    mealType: input.mealType || existingRecord?.mealType || 'meal',
    title: String(input.title ?? existingRecord?.title ?? '').trim(),
    notes: String(input.notes ?? existingRecord?.notes ?? '').trim(),
    source: input.source || existingRecord?.source || 'manual',
    calories: toNumberOrNull(input.calories ?? existingRecord?.calories),
    protein: toNumberOrNull(input.protein ?? existingRecord?.protein),
    carbs: toNumberOrNull(input.carbs ?? existingRecord?.carbs),
    fat: toNumberOrNull(input.fat ?? existingRecord?.fat),
    fiber: toNumberOrNull(input.fiber ?? existingRecord?.fiber),
    hwpFoodRaw: input.hwpFoodRaw ?? existingRecord?.hwpFoodRaw ?? null,
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateMealEntry(entry) {
  const errors = {};

  if (!entry.mealDate) {
    errors.mealDate = 'validation.dateRequired';
  }

  if (!entry.title) {
    errors.title = 'validation.mealNameRequired';
  }

  return errors;
}
