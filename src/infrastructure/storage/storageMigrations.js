import {
  CORE_MVP_STORE_NAMES,
  SYSTEM_STORE_NAMES,
  coreMvpStores,
  dailyHabitsStores,
  favoriteMealsStores,
  foodLibraryStores,
  mealPlansStores,
  systemStores,
} from './databaseSchema.js';
import { ensureObjectStore } from './objectStore.js';

export const storageMigrations = Object.freeze([
  {
    version: 1,
    id: '001_create_persistence_system_stores',
    description: 'Create reusable persistence metadata and migration stores.',
    up({ database, transaction }) {
      systemStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
          },
        }),
        writeMigrationRecord(database, {
          id: '001_create_persistence_system_stores',
          version: 1,
          description: 'Create reusable persistence metadata and migration stores.',
        }),
      ]);
    },
  },
  {
    version: 2,
    id: '002_create_core_mvp_stores',
    description: 'Create Core MVP stores for approved offline modules.',
    up({ database, transaction }) {
      coreMvpStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
            stores: Object.values(CORE_MVP_STORE_NAMES),
          },
        }),
        writeMigrationRecord(database, {
          id: '002_create_core_mvp_stores',
          version: 2,
          description: 'Create Core MVP stores for approved offline modules.',
        }),
      ]);
    },
  },
  {
    version: 3,
    id: '003_create_daily_habits_store',
    description: 'Create Daily Habits store for quick water, sleep, and steps logging.',
    up({ database, transaction }) {
      dailyHabitsStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
            stores: Object.values(CORE_MVP_STORE_NAMES),
          },
        }),
        writeMigrationRecord(database, {
          id: '003_create_daily_habits_store',
          version: 3,
          description: 'Create Daily Habits store for quick water, sleep, and steps logging.',
        }),
      ]);
    },
  },
  {
    version: 4,
    id: '004_create_food_library_store',
    description: 'Create Food Library store for reusable nutrition data.',
    up({ database, transaction }) {
      foodLibraryStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
            stores: Object.values(CORE_MVP_STORE_NAMES),
          },
        }),
        writeMigrationRecord(database, {
          id: '004_create_food_library_store',
          version: 4,
          description: 'Create Food Library store for reusable nutrition data.',
        }),
      ]);
    },
  },
  {
    version: 5,
    id: '005_create_favorite_meals_store',
    description: 'Create Favorite Meals store for reusable recipes referencing the Food Library.',
    up({ database, transaction }) {
      favoriteMealsStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
            stores: Object.values(CORE_MVP_STORE_NAMES),
          },
        }),
        writeMigrationRecord(database, {
          id: '005_create_favorite_meals_store',
          version: 5,
          description: 'Create Favorite Meals store for reusable recipes referencing the Food Library.',
        }),
      ]);
    },
  },
  {
    version: 6,
    id: '006_create_meal_plans_store',
    description: 'Create Meal Plans store for reusable daily eating plans referencing Favorite Meals.',
    up({ database, transaction }) {
      mealPlansStores.forEach((storeDefinition) =>
        ensureObjectStore(database, storeDefinition, transaction),
      );
    },
    afterUpgrade({ database }) {
      return Promise.all([
        writeMetadataRecord(database, {
          key: 'database',
          value: {
            name: database.name,
            version: database.version,
            stores: Object.values(CORE_MVP_STORE_NAMES),
          },
        }),
        writeMigrationRecord(database, {
          id: '006_create_meal_plans_store',
          version: 6,
          description: 'Create Meal Plans store for reusable daily eating plans referencing Favorite Meals.',
        }),
      ]);
    },
  },
]);

function writeMetadataRecord(database, metadata) {
  if (!database.objectStoreNames.contains(SYSTEM_STORE_NAMES.metadata)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(SYSTEM_STORE_NAMES.metadata, 'readwrite');
    const store = transaction.objectStore(SYSTEM_STORE_NAMES.metadata);

    store.put({
      ...metadata,
      updatedAt: new Date().toISOString(),
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function writeMigrationRecord(database, migration) {
  if (!database.objectStoreNames.contains(SYSTEM_STORE_NAMES.migrations)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(SYSTEM_STORE_NAMES.migrations, 'readwrite');
    const store = transaction.objectStore(SYSTEM_STORE_NAMES.migrations);

    store.put({
      ...migration,
      completedAt: new Date().toISOString(),
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
