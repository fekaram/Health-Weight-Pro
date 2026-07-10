import { createId } from '../../../core/utils/createId.js';
import { nowIso, toNumberOrNull, todayDate } from '../../shared/utils/records.js';

export function createWeightRecord(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('weight'),
    recordedAt: input.recordedAt || existingRecord?.recordedAt || todayDate(),
    weight: toNumberOrNull(input.weight ?? existingRecord?.weight),
    unit: input.unit || existingRecord?.unit || 'lb',
    notes: String(input.notes ?? existingRecord?.notes ?? '').trim(),
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateWeightRecord(record) {
  const errors = {};

  if (!record.recordedAt) {
    errors.recordedAt = 'validation.dateRequired';
  }

  if (record.weight === null || record.weight <= 0) {
    errors.weight = 'validation.weightPositive';
  }

  return errors;
}
