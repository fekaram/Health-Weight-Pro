import { STARTER_FOOD_CATALOG, STARTER_FOOD_CATALOG_VERSION } from '../../../data/starterFoodCatalog.js';
import { createFood } from '../entities/Food.js';

function buildCatalogFood(entry, existingRecord) {
  return createFood(
    {
      foodCode: entry.foodCode,
      isBuiltIn: true,
      category: entry.category,
      servingSize: entry.servingSize,
      servingUnit: entry.servingUnit,
      calories: entry.calories,
      protein: entry.protein,
      carbs: entry.carbs,
      fat: entry.fat,
      fiber: entry.fiber,
      name: existingRecord?.name ?? entry.names.en,
    },
    existingRecord,
  );
}

export async function seedStarterCatalogIfNeeded(repository) {
  const alreadySeeded = await repository.hasSeededStarterCatalog();

  if (alreadySeeded) {
    return;
  }

  const existingFoods = await repository.list();

  if (existingFoods.length === 0) {
    await repository.saveMany(STARTER_FOOD_CATALOG.map((entry) => buildCatalogFood(entry)));
  }

  await repository.markStarterCatalogSeeded(STARTER_FOOD_CATALOG_VERSION);
}

// Safe upsert keyed by foodCode: adds missing catalog foods and refreshes
// nutrition values for existing built-ins without creating duplicates or
// touching user-created entries.
export async function reimportStarterCatalog(repository) {
  const existingFoods = await repository.list();
  const existingByCode = new Map(existingFoods.filter((food) => food.foodCode).map((food) => [food.foodCode, food]));

  const foods = STARTER_FOOD_CATALOG.map((entry) => buildCatalogFood(entry, existingByCode.get(entry.foodCode)));

  await repository.saveMany(foods);
  await repository.markStarterCatalogSeeded(STARTER_FOOD_CATALOG_VERSION);
}
