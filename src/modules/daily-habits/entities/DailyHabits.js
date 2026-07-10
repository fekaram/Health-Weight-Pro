import { createId } from '../../../core/utils/createId.js';
import { nowIso, todayDate } from '../../shared/utils/records.js';

export function createDailyHabits(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('daily-habit'),
    date: input.date || existingRecord?.date || todayDate(),
    waterMl: toNonNegativeInt(input.waterMl ?? existingRecord?.waterMl),
    sleepMinutes: toNonNegativeInt(input.sleepMinutes ?? existingRecord?.sleepMinutes),
    steps: toNonNegativeInt(input.steps ?? existingRecord?.steps),
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

function toNonNegativeInt(value) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) && numberValue > 0 ? Math.round(numberValue) : 0;
}
