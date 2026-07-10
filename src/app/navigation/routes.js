import { renderBackupRestoreScreen } from '../../modules/backup-restore/screens/BackupRestoreScreen.js';
import { renderBodyMeasurementsScreen } from '../../modules/body-measurements/screens/BodyMeasurementsScreen.js';
import { renderDashboardScreen } from '../../modules/dashboard/screens/DashboardScreen.js';
import { renderFavoritesScreen, wireFavoritesScreen } from '../../modules/favorites/screens/FavoritesScreen.js';
import { renderFoodLibraryScreen, wireFoodLibraryScreen } from '../../modules/food-library/screens/FoodLibraryScreen.js';
import { renderMealJournalScreen } from '../../modules/meal-journal/screens/MealJournalScreen.js';
import { renderMealPlansScreen, wireMealPlansScreen } from '../../modules/meal-plans/screens/MealPlansScreen.js';
import { renderMedicationScreen } from '../../modules/medication/screens/MedicationScreen.js';
import { renderSettingsScreen } from '../../modules/settings/screens/SettingsScreen.js';
import { renderWeightTrackingScreen } from '../../modules/weight-tracking/screens/WeightTrackingScreen.js';

export const routes = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    labelKey: 'route.dashboard',
    path: '/',
    section: 'Core',
    sectionKey: 'section.core',
    moduleKey: 'dashboard',
    render: renderDashboardScreen,
  },
  {
    id: 'meal-journal',
    label: 'Meal Journal',
    labelKey: 'route.mealJournal',
    path: '/meal-journal',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'meal-journal',
    render: renderMealJournalScreen,
  },
  {
    id: 'weight-tracking',
    label: 'Weight Tracking',
    labelKey: 'route.weightTracking',
    path: '/weight-tracking',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'weight-tracking',
    render: renderWeightTrackingScreen,
  },
  {
    id: 'body-measurements',
    label: 'Body Measurements',
    labelKey: 'route.bodyMeasurements',
    path: '/body-measurements',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'body-measurements',
    render: renderBodyMeasurementsScreen,
  },
  {
    id: 'medication',
    label: 'Medication',
    labelKey: 'route.medication',
    path: '/medication',
    section: 'Medication',
    sectionKey: 'section.medication',
    moduleKey: 'medication',
    render: renderMedicationScreen,
  },
  {
    id: 'favorites',
    label: 'Favorites',
    labelKey: 'route.favorites',
    path: '/favorites',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'favorites',
    hidden: true,
    render: renderFavoritesScreen,
    afterRender: wireFavoritesScreen,
  },
  {
    id: 'meal-plans',
    label: 'Meal Plans',
    labelKey: 'route.mealPlans',
    path: '/meal-plans',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'meal-plans',
    hidden: true,
    render: renderMealPlansScreen,
    afterRender: wireMealPlansScreen,
  },
  {
    id: 'food-library',
    label: 'Food Library',
    labelKey: 'route.foodLibrary',
    path: '/food-library',
    section: 'Tracking',
    sectionKey: 'section.tracking',
    moduleKey: 'food-library',
    hidden: true,
    render: renderFoodLibraryScreen,
    afterRender: wireFoodLibraryScreen,
  },
  {
    id: 'settings',
    label: 'Settings',
    labelKey: 'route.settings',
    path: '/settings',
    section: 'Support',
    sectionKey: 'section.support',
    moduleKey: 'settings',
    render: renderSettingsScreen,
  },
  {
    id: 'backup-restore',
    label: 'Backup & Restore',
    labelKey: 'route.backupRestore',
    path: '/backup-restore',
    section: 'Support',
    sectionKey: 'section.support',
    moduleKey: 'backup-restore',
    render: renderBackupRestoreScreen,
  },
];
