import { createMealEntry } from '../../meal-journal/entities/MealEntry.js';
import { markFavoriteMealUsed } from '../entities/FavoriteMeal.js';
import { calculateFavoriteMealTotals } from '../utils/favoriteMealNutrition.js';

// Shared by direct Favorite Meal registration and Meal Plan registration (which registers
// every Favorite Meal it contains) so usage stats stay consistent regardless of entry point.
export async function registerFavoriteMeal({ favoriteMeal, mealSlot, foods, favoriteMealsRepository, mealJournalRepository }) {
  const totals = calculateFavoriteMealTotals(favoriteMeal, foods);

  const entry = createMealEntry({
    mealType: mealSlot,
    title: favoriteMeal.name,
    source: 'favorite',
    calories: totals.calories,
    protein: totals.protein,
    carbs: totals.carbs,
    fat: totals.fat,
    fiber: totals.fiber,
  });

  await mealJournalRepository.save(entry);
  await favoriteMealsRepository.save(markFavoriteMealUsed(favoriteMeal));

  return entry;
}
