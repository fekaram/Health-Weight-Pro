export const DATABASE_NAME = 'hwp-platform-3';
export const DATABASE_VERSION = 6;

export const SYSTEM_STORE_NAMES = Object.freeze({
  metadata: '__storage_metadata',
  migrations: '__storage_migrations',
});

export const systemStores = Object.freeze([
  {
    name: SYSTEM_STORE_NAMES.metadata,
    keyPath: 'key',
    indexes: [
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
  {
    name: SYSTEM_STORE_NAMES.migrations,
    keyPath: 'id',
    indexes: [
      {
        name: 'version',
        keyPath: 'version',
      },
      {
        name: 'completedAt',
        keyPath: 'completedAt',
      },
    ],
  },
]);

export const CORE_MVP_STORE_NAMES = Object.freeze({
  meals: 'meals',
  weights: 'weights',
  bodyMeasurements: 'body_measurements',
  // Internal store identifier kept unchanged to avoid a breaking IndexedDB migration.
  medicationApplications: 'tirzepatide_doses',
  dailyHabits: 'daily_habits',
  foods: 'foods',
  settings: 'settings',
  favoriteMeals: 'favorite_meals',
  mealPlans: 'meal_plans',
});

export const coreMvpStores = Object.freeze([
  {
    name: CORE_MVP_STORE_NAMES.meals,
    keyPath: 'id',
    indexes: [
      {
        name: 'mealDate',
        keyPath: 'mealDate',
      },
      {
        name: 'mealType',
        keyPath: 'mealType',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
  {
    name: CORE_MVP_STORE_NAMES.weights,
    keyPath: 'id',
    indexes: [
      {
        name: 'recordedAt',
        keyPath: 'recordedAt',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
  {
    name: CORE_MVP_STORE_NAMES.bodyMeasurements,
    keyPath: 'id',
    indexes: [
      {
        name: 'recordedAt',
        keyPath: 'recordedAt',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
  {
    name: CORE_MVP_STORE_NAMES.medicationApplications,
    keyPath: 'id',
    indexes: [
      {
        name: 'administeredAt',
        keyPath: 'administeredAt',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
  {
    name: CORE_MVP_STORE_NAMES.settings,
    keyPath: 'id',
    indexes: [
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
]);

export const dailyHabitsStores = Object.freeze([
  {
    name: CORE_MVP_STORE_NAMES.dailyHabits,
    keyPath: 'id',
    indexes: [
      {
        name: 'date',
        keyPath: 'date',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
]);

export const foodLibraryStores = Object.freeze([
  {
    name: CORE_MVP_STORE_NAMES.foods,
    keyPath: 'id',
    indexes: [
      {
        name: 'name',
        keyPath: 'name',
      },
      {
        name: 'category',
        keyPath: 'category',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
]);

export const favoriteMealsStores = Object.freeze([
  {
    name: CORE_MVP_STORE_NAMES.favoriteMeals,
    keyPath: 'id',
    indexes: [
      {
        name: 'name',
        keyPath: 'name',
      },
      {
        name: 'category',
        keyPath: 'category',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
]);

export const mealPlansStores = Object.freeze([
  {
    name: CORE_MVP_STORE_NAMES.mealPlans,
    keyPath: 'id',
    indexes: [
      {
        name: 'name',
        keyPath: 'name',
      },
      {
        name: 'updatedAt',
        keyPath: 'updatedAt',
      },
    ],
  },
]);

export const databaseSchema = Object.freeze({
  databaseName: DATABASE_NAME,
  version: DATABASE_VERSION,
  stores: [
    ...systemStores,
    ...coreMvpStores,
    ...dailyHabitsStores,
    ...foodLibraryStores,
    ...favoriteMealsStores,
    ...mealPlansStores,
  ],
});
