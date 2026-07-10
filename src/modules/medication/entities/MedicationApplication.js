import { createId } from '../../../core/utils/createId.js';
import { nowIso, toNumberOrNull, todayDate } from '../../shared/utils/records.js';

export function createMedicationApplication(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('medication'),
    administeredAt: input.administeredAt || existingRecord?.administeredAt || todayDate(),
    doseMg: toNumberOrNull(input.doseMg ?? existingRecord?.doseMg),
    site: input.site || existingRecord?.site || 'not-specified',
    notes: String(input.notes ?? existingRecord?.notes ?? '').trim(),
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateMedicationApplication(record) {
  const errors = {};

  if (!record.administeredAt) {
    errors.administeredAt = 'validation.dateRequired';
  }

  if (record.doseMg === null || record.doseMg <= 0) {
    errors.doseMg = 'validation.dosePositive';
  }

  return errors;
}
