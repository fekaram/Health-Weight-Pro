export function createDashboardSummary({ meals, weights, bodyMeasurements, medicationApplications, dailyHabits }) {
  const today = new Date().toISOString().slice(0, 10);
  const todaysMeals = meals.filter((meal) => meal.mealDate === today);

  return {
    mealCount: meals.length,
    todayMealCount: todaysMeals.length,
    todayCalories: todaysMeals.reduce((total, meal) => total + (meal.calories ?? 0), 0),
    todayProtein: todaysMeals.reduce((total, meal) => total + (meal.protein ?? 0), 0),
    weightCount: weights.length,
    bodyMeasurementCount: bodyMeasurements.length,
    medicationApplicationCount: medicationApplications.length,
    activityCount: meals.length + weights.length + bodyMeasurements.length + medicationApplications.length,
    latestMeal: meals[0] ?? null,
    latestWeight: weights[0] ?? null,
    latestBodyMeasurement: bodyMeasurements[0] ?? null,
    latestMedicationApplication: medicationApplications[0] ?? null,
    dailyHabits: dailyHabits ?? null,
  };
}
