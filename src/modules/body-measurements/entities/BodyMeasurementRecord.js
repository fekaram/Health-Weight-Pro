import { createId } from '../../../core/utils/createId.js';
import { nowIso, toNumberOrNull, todayDate } from '../../shared/utils/records.js';

export function createBodyMeasurementRecord(input = {}, existingRecord) {
  const timestamp = nowIso();

  return {
    id: existingRecord?.id ?? input.id ?? createId('body'),
    recordedAt: input.recordedAt || existingRecord?.recordedAt || todayDate(),
    chest: toNumberOrNull(input.chest ?? existingRecord?.chest),
    waist: toNumberOrNull(input.waist ?? existingRecord?.waist),
    hips: toNumberOrNull(input.hips ?? existingRecord?.hips),
    arm: toNumberOrNull(input.arm ?? existingRecord?.arm),
    thigh: toNumberOrNull(input.thigh ?? existingRecord?.thigh),
    unit: input.unit || existingRecord?.unit || 'in',
    notes: String(input.notes ?? existingRecord?.notes ?? '').trim(),
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

export function validateBodyMeasurementRecord(record) {
  const errors = {};
  const values = [record.chest, record.waist, record.hips, record.arm, record.thigh];

  if (!record.recordedAt) {
    errors.recordedAt = 'validation.dateRequired';
  }

  if (!values.some((value) => value !== null && value > 0)) {
    errors.measurements = 'validation.measurementRequired';
  }

  return errors;
}
