import { createId } from '../../../core/utils/createId.js';
import { nowIso } from '../../shared/utils/records.js';

export const FOOD_CATEGORIES = [
  'fruits',
  'vegetables',
  'legumes',
  'grains',
  'roots',
  'nuts',
  'meat',
  'chicken',
  'fish',
  'eggs',
  'dairy',
  'bread',
  'beverages',
  'supplements',
  'desserts',
  'snacks',
  'others',
];

export const SERVING_UNITS = ['g', 'mL', 'unit', 'slice', 'scoop', 'cup', 'tablespoon', 'serving'];

export function createFood(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('food'),
    foodCode: input.foodCode ?? existingRecord?.foodCode ?? null,
    isBuiltIn: existingRecord?.isBuiltIn ?? Boolean(input.isBuiltIn),
    name: String(input.name ?? existingRecord?.name ?? '').trim(),
    category: normalizeOption(input.category ?? existingRecord?.category, FOOD_CATEGORIES, 'others'),
    servingSize: toPositiveNumber(input.servingSize ?? existingRecord?.servingSize, 100),
    servingUnit: normalizeOption(input.servingUnit ?? existingRecord?.servingUnit, SERVING_UNITS, 'g'),
    calories: toNonNegativeNumber(input.calories ?? existingRecord?.calories),
    protein: toNonNegativeNumber(input.protein ?? existingRecord?.protein),
    carbs: toNonNegativeNumber(input.carbs ?? existingRecord?.carbs),
    fat: toNonNegativeNumber(input.fat ?? existingRecord?.fat),
    fiber: toNonNegativeNumber(input.fiber ?? existingRecord?.fiber),
    favorite: existingRecord?.favorite ?? false,
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateFood(food) {
  const errors = {};

  if (!food.name) {
    errors.name = 'validation.foodNameRequired';
  }

  if (!food.servingSize || food.servingSize <= 0) {
    errors.servingSize = 'validation.servingSizePositive';
  }

  return errors;
}

function normalizeOption(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function toPositiveNumber(value, fallback) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue > 0 ? numberValue : fallback;
}

function toNonNegativeNumber(value) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue >= 0 ? numberValue : 0;
}
