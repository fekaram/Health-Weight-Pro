import { toNumberOrNull } from '../../shared/utils/records.js';

export const ADMINISTRATION_TYPES = ['injection', 'tablet', 'capsule', 'drops', 'cream', 'other'];
export const FREQUENCIES = ['daily', 'weekly', 'every-2-weeks', 'monthly', 'custom'];
export const DOSE_UNITS = ['mg', 'mcg', 'mL', 'IU', 'units', 'other'];
export const APPLICATION_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const defaultMedication = Object.freeze({
  enabled: true,
  name: '',
  administrationType: 'injection',
  frequency: 'weekly',
  defaultDose: null,
  doseUnit: 'mg',
  applicationDay: 'monday',
  notes: '',
});

export function createMedication(input = {}, existingRecord, legacySettings = {}) {
  const existing = existingRecord?.medication ?? {};

  return {
    enabled:
      input.medicationEnabled !== undefined
        ? input.medicationEnabled === 'on'
        : existing.enabled ?? defaultMedication.enabled,
    name: String(input.medicationName ?? existing.name ?? defaultMedication.name).trim(),
    administrationType: normalizeOption(
      input.administrationType ?? existing.administrationType ?? defaultMedication.administrationType,
      ADMINISTRATION_TYPES,
    ),
    frequency: normalizeOption(
      input.frequency ?? existing.frequency ?? defaultMedication.frequency,
      FREQUENCIES,
    ),
    defaultDose: toNumberOrNull(
      input.defaultDose ?? existing.defaultDose ?? legacySettings.tirzepatideDose,
    ),
    doseUnit: normalizeOption(
      input.doseUnit ?? existing.doseUnit ?? legacySettings.doseUnit ?? defaultMedication.doseUnit,
      DOSE_UNITS,
    ),
    applicationDay: normalizeOption(
      input.applicationDay ?? existing.applicationDay ?? legacySettings.injectionDay ?? defaultMedication.applicationDay,
      APPLICATION_DAYS,
    ),
    notes: String(input.medicationNotes ?? existing.notes ?? defaultMedication.notes).trim(),
  };
}

function normalizeOption(value, options) {
  return options.includes(value) ? value : options[0];
}
