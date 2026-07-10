const EMPTY_TOTALS = Object.freeze({ calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

// Catalog foods keep a stable foodCode across reimports; user-created foods never get one,
// so their own repository id is used as the reference instead.
export function foodReferenceKey(food) {
  return food.foodCode ?? food.id;
}

export function resolveFoodForItem(foods, item) {
  return foods.find((food) => foodReferenceKey(food) === item.foodCode) ?? null;
}

export function computeItemNutrition(food, item) {
  if (!food) {
    return { ...EMPTY_TOTALS };
  }

  const multiplier = food.servingSize > 0 ? item.quantity / food.servingSize : 0;

  return {
    calories: food.calories * multiplier,
    protein: food.protein * multiplier,
    carbs: food.carbs * multiplier,
    fat: food.fat * multiplier,
    fiber: food.fiber * multiplier,
  };
}

export function calculateFavoriteMealTotals(favoriteMeal, foods) {
  return (favoriteMeal.items ?? []).reduce((totals, item) => {
    const nutrition = computeItemNutrition(resolveFoodForItem(foods, item), item);

    return {
      calories: totals.calories + nutrition.calories,
      protein: totals.protein + nutrition.protein,
      carbs: totals.carbs + nutrition.carbs,
      fat: totals.fat + nutrition.fat,
      fiber: totals.fiber + nutrition.fiber,
    };
  }, { ...EMPTY_TOTALS });
}
