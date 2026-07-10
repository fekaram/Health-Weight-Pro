export const MANDATORY_MEAL_SLOTS = ['breakfast', 'lunch', 'dinner'];

export const OPTIONAL_MEAL_SLOTS = ['morningSnack', 'afternoonSnack', 'preWorkout', 'postWorkout', 'supper'];

export const ALL_MEAL_SLOTS = [...MANDATORY_MEAL_SLOTS, ...OPTIONAL_MEAL_SLOTS];

export function getEnabledMealSlots(settings = {}) {
  const enabledOptional = OPTIONAL_MEAL_SLOTS.filter((slot) => settings.mealSlots?.[slot]);

  return [...MANDATORY_MEAL_SLOTS, ...enabledOptional];
}

// Legacy MealEntry records (or the Food Library's generic "add to meal" action) may still
// carry the old generic 'snack'/'meal' values, which live under the `meal.*` i18n namespace
// instead of `mealSlot.*` alongside the canonical slots.
export function getMealSlotLabelKey(mealType) {
  return ALL_MEAL_SLOTS.includes(mealType) ? `mealSlot.${mealType}` : `meal.${mealType}`;
}
