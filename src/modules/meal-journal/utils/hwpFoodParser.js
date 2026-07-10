import { ALL_MEAL_SLOTS } from '../../../shared/constants/mealSlots.js';

const MARKER_LINE = /^HWP_FOOD\s*$/i;
const FIELD_LINE = /^([a-zA-Z]+)\s*=\s*(.*)$/;
const MEAL_TYPES = [...ALL_MEAL_SLOTS, 'snack', 'meal'];

export function parseHwpFood(rawText) {
  const lines = String(rawText ?? '').split(/\r?\n/);
  const markerIndex = lines.findIndex((line) => MARKER_LINE.test(line.trim()));

  if (markerIndex === -1) {
    return { valid: false };
  }

  const fields = {};
  const blockLines = [lines[markerIndex]];

  for (let index = markerIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      if (Object.keys(fields).length > 0) {
        break;
      }

      continue;
    }

    const match = trimmed.match(FIELD_LINE);

    if (!match) {
      break;
    }

    fields[match[1].trim().toLowerCase()] = match[2].trim();
    blockLines.push(line);
  }

  const name = String(fields.name ?? '').trim();
  const mealType = normalizeMealType(fields.slot);
  const calories = toNonNegativeNumber(fields.calories);
  const protein = toNonNegativeNumber(fields.protein);
  const carbs = toNonNegativeNumber(fields.carbs ?? fields.carbohydrates);
  const fat = toNonNegativeNumber(fields.fat);
  const fiber = toNonNegativeNumber(fields.fiber) ?? 0;

  if (!name || calories === null || protein === null || carbs === null || fat === null) {
    return { valid: false };
  }

  return {
    valid: true,
    data: { mealType, name, calories, protein, carbs, fat, fiber },
    raw: blockLines.join('\n'),
  };
}

function normalizeMealType(rawSlot) {
  const normalized = String(rawSlot ?? '').trim().toLowerCase();

  return MEAL_TYPES.find((mealType) => mealType.toLowerCase() === normalized) ?? 'meal';
}

function toNonNegativeNumber(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue >= 0 ? numberValue : null;
}
