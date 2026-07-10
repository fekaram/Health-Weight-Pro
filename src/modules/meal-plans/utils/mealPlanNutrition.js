import { calculateFavoriteMealTotals } from '../../favorites/utils/favoriteMealNutrition.js';

const EMPTY_TOTALS = Object.freeze({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

export function resolveFavoriteMealForPlanMeal(favoriteMeals, planMeal) {
  return favoriteMeals.find((favoriteMeal) => favoriteMeal.id === planMeal.favoriteMealId) ?? null;
}

export function calculateMealPlanTotals(mealPlan, favoriteMeals, foods) {
  return (mealPlan.meals ?? []).reduce((totals, planMeal) => {
    const favoriteMeal = resolveFavoriteMealForPlanMeal(favoriteMeals, planMeal);
    const nutrition = favoriteMeal ? calculateFavoriteMealTotals(favoriteMeal, foods) : EMPTY_TOTALS;

    return {
      calories: totals.calories + nutrition.calories,
      protein: totals.protein + nutrition.protein,
      carbs: totals.carbs + nutrition.carbs,
      fat: totals.fat + nutrition.fat,
      fiber: totals.fiber + nutrition.fiber,
    };
  }, { ...EMPTY_TOTALS });
}
