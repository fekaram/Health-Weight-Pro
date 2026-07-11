import { OPTIONAL_MEAL_SLOTS } from '../../../shared/constants/mealSlots.js';
import { nowIso } from '../../shared/utils/records.js';
import { createMedication, defaultMedication } from '../../medication/entities/Medication.js';

export const APP_SETTINGS_ID = 'app-settings';

const unitsByLanguage = Object.freeze({
  en: {
    weightUnit: 'lb',
    measurementUnit: 'in',
  },
  'pt-BR': {
    weightUnit: 'kg',
    measurementUnit: 'cm',
  },
});

export const defaultSettings = Object.freeze({
  id: APP_SETTINGS_ID,
  displayName: '',
  language: 'pt-BR',
  theme: 'system',
  sex: '',
  birthDate: '',
  height: null,
  healthGoal: 'lose-weight',
  activityLevel: 'moderate',
  currentWeight: null,
  targetWeight: null,
  calorieGoal: 2000,
  proteinGoal: 120,
  carbsGoal: 180,
  fatGoal: 65,
  fiberGoal: 25,
  waterGoal: 3000,
  sleepGoal: 8,
  stepGoal: 8000,
  medication: defaultMedication,
  dashboardCards: {
    calories: true,
    protein: true,
    water: true,
    sleep: true,
    steps: true,
    weight: true,
    medication: true,
    recentMeals: true,
    recentActivity: true,
  },
  weightUnit: 'lb',
  measurementUnit: 'in',
  startScreen: '/',
  mealSlots: Object.fromEntries(OPTIONAL_MEAL_SLOTS.map((slot) => [slot, false])),
});

export function createAppSettings(input = {}, existingRecord) {
  const timestamp = nowIso();
  const language = normalizeLanguage(input.language ?? existingRecord?.language ?? defaultSettings.language);
  const units = unitsByLanguage[language];

  return {
    ...defaultSettings,
    ...existingRecord,
    displayName: String(input.displayName ?? existingRecord?.displayName ?? defaultSettings.displayName).trim(),
    language,
    theme: normalizeTheme(input.theme ?? existingRecord?.theme ?? defaultSettings.theme),
    sex: normalizeOption(input.sex ?? existingRecord?.sex, ['', 'female', 'male', 'other']),
    birthDate: input.birthDate ?? existingRecord?.birthDate ?? defaultSettings.birthDate,
    height: toNumberOrNull(input.height ?? existingRecord?.height),
    healthGoal: normalizeOption(input.healthGoal ?? existingRecord?.healthGoal, [
      'lose-weight',
      'maintain-weight',
      'gain-muscle',
    ]),
    activityLevel: normalizeOption(input.activityLevel ?? existingRecord?.activityLevel, [
      'sedentary',
      'light',
      'moderate',
      'intense',
    ]),
    currentWeight: toNumberOrNull(input.currentWeight ?? existingRecord?.currentWeight),
    targetWeight: toNumberOrNull(input.targetWeight ?? existingRecord?.targetWeight),
    calorieGoal: toNumberOrDefault(input.calorieGoal ?? existingRecord?.calorieGoal, defaultSettings.calorieGoal),
    proteinGoal: toNumberOrDefault(input.proteinGoal ?? existingRecord?.proteinGoal, defaultSettings.proteinGoal),
    carbsGoal: toNumberOrDefault(input.carbsGoal ?? existingRecord?.carbsGoal, defaultSettings.carbsGoal),
    fatGoal: toNumberOrDefault(input.fatGoal ?? existingRecord?.fatGoal, defaultSettings.fatGoal),
    fiberGoal: toNumberOrDefault(input.fiberGoal ?? existingRecord?.fiberGoal, defaultSettings.fiberGoal),
    waterGoal: toNumberOrDefault(input.waterGoal ?? existingRecord?.waterGoal, defaultSettings.waterGoal),
    sleepGoal: toNumberOrDefault(input.sleepGoal ?? existingRecord?.sleepGoal, defaultSettings.sleepGoal),
    stepGoal: toNumberOrDefault(input.stepGoal ?? existingRecord?.stepGoal, defaultSettings.stepGoal),
    medication: createMedication(input, existingRecord, {
      tirzepatideDose: existingRecord?.tirzepatideDose,
      doseUnit: existingRecord?.doseUnit,
      injectionDay: existingRecord?.injectionDay,
    }),
    dashboardCards: createDashboardCards(input, existingRecord),
    mealSlots: createMealSlots(input, existingRecord),
    weightUnit: units.weightUnit,
    measurementUnit: units.measurementUnit,
    startScreen: input.startScreen || existingRecord?.startScreen || defaultSettings.startScreen,
    createdAt: existingRecord?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };
}

function normalizeLanguage(language) {
  return language === 'pt-BR' ? 'pt-BR' : 'en';
}

function normalizeTheme(theme) {
  return ['light', 'dark', 'system'].includes(theme) ? theme : 'system';
}

function createDashboardCards(input, existingRecord) {
  const defaults = existingRecord?.dashboardCards ?? defaultSettings.dashboardCards;

  return Object.fromEntries(
    Object.keys(defaultSettings.dashboardCards).map((cardKey) => [
      cardKey,
      input[`dashboardCard_${cardKey}`] !== undefined
        ? input[`dashboardCard_${cardKey}`] === 'on'
        : defaults[cardKey] ?? true,
    ]),
  );
}

function createMealSlots(input, existingRecord) {
  const defaults = existingRecord?.mealSlots ?? defaultSettings.mealSlots;

  return Object.fromEntries(
    OPTIONAL_MEAL_SLOTS.map((slot) => [
      slot,
      input[`mealSlot_${slot}`] !== undefined ? input[`mealSlot_${slot}`] === 'on' : defaults[slot] ?? false,
    ]),
  );
}

function normalizeOption(value, options) {
  return options.includes(value) ? value : options[0];
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

function toNumberOrDefault(value, fallback) {
  const numberValue = toNumberOrNull(value);

  return numberValue === null ? fallback : numberValue;
}
