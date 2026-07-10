import { ALL_MEAL_SLOTS } from '../../../shared/constants/mealSlots.js';
import { createId } from '../../../core/utils/createId.js';
import { nowIso } from '../../shared/utils/records.js';

// 'custom' is not a real meal slot (no visibility toggle, never hidden) — it's a catch-all
// category for favorites that don't belong to a specific slot of the day.
export const FAVORITE_MEAL_CATEGORIES = [...ALL_MEAL_SLOTS, 'custom'];

const MEAL_TYPE_TO_CATEGORY = {
  snack: 'morningSnack',
  meal: 'custom',
};

// Every canonical meal slot category maps to itself as a MealEntry.mealType; only the
// non-slot 'custom' category and legacy generic values need translation.
export function mapFavoriteCategoryToMealType(category) {
  return category === 'custom' ? 'meal' : category;
}

export function mapMealTypeToFavoriteCategory(mealType) {
  if (ALL_MEAL_SLOTS.includes(mealType)) {
    return mealType;
  }

  return MEAL_TYPE_TO_CATEGORY[mealType] ?? 'custom';
}

export function createFavoriteMealItem(input = {}) {
  return {
    foodCode: input.foodCode,
    quantity: toPositiveNumber(input.quantity),
    servingUnit: input.servingUnit,
  };
}

export function createFavoriteMeal(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('favorite-meal'),
    name: String(input.name ?? existingRecord?.name ?? '').trim(),
    category: normalizeOption(input.category ?? existingRecord?.category, FAVORITE_MEAL_CATEGORIES, 'custom'),
    items: Array.isArray(input.items)
      ? input.items.map(createFavoriteMealItem)
      : (existingRecord?.items ?? []),
    usageCount: toNonNegativeInteger(input.usageCount ?? existingRecord?.usageCount),
    lastUsedAt: input.lastUsedAt ?? existingRecord?.lastUsedAt ?? null,
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

// Called whenever a Favorite Meal is registered (directly or as part of a Meal Plan) so
// sorting by Most Used / Recently Used stays accurate without re-running full validation.
export function markFavoriteMealUsed(favoriteMeal) {
  const timestamp = nowIso();

  return {
    ...favoriteMeal,
    usageCount: (favoriteMeal.usageCount ?? 0) + 1,
    lastUsedAt: timestamp,
    updatedAt: timestamp,
  };
}

export function validateFavoriteMeal(favoriteMeal) {
  const errors = {};

  if (!favoriteMeal.name) {
    errors.name = 'validation.favoriteMealNameRequired';
  }

  if (!favoriteMeal.items || favoriteMeal.items.length === 0) {
    errors.items = 'validation.favoriteMealItemsRequired';
  }

  return errors;
}

function normalizeOption(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function toPositiveNumber(value) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : 0;
}

function toNonNegativeInteger(value) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue >= 0 ? Math.trunc(numberValue) : 0;
}
