import { BackupRestoreRepository } from '../modules/backup-restore/repositories/BackupRestoreRepository.js';
import { BackupRestoreViewModel } from '../modules/backup-restore/viewmodels/BackupRestoreViewModel.js';
import { BodyMeasurementsRepository } from '../modules/body-measurements/repositories/BodyMeasurementsRepository.js';
import { BodyMeasurementsViewModel } from '../modules/body-measurements/viewmodels/BodyMeasurementsViewModel.js';
import { DailyHabitsRepository } from '../modules/daily-habits/repositories/DailyHabitsRepository.js';
import { DailyHabitsViewModel } from '../modules/daily-habits/viewmodels/DailyHabitsViewModel.js';
import { DashboardRepository } from '../modules/dashboard/repositories/DashboardRepository.js';
import { DashboardViewModel } from '../modules/dashboard/viewmodels/DashboardViewModel.js';
import { DeveloperModeViewModel } from '../modules/developer/viewmodels/DeveloperModeViewModel.js';
import { FavoriteMealsRepository } from '../modules/favorites/repositories/FavoriteMealsRepository.js';
import { FavoriteMealsViewModel } from '../modules/favorites/viewmodels/FavoriteMealsViewModel.js';
import { FoodLibraryRepository } from '../modules/food-library/repositories/FoodLibraryRepository.js';
import { FoodLibraryViewModel } from '../modules/food-library/viewmodels/FoodLibraryViewModel.js';
import { MealJournalRepository } from '../modules/meal-journal/repositories/MealJournalRepository.js';
import { MealJournalViewModel } from '../modules/meal-journal/viewmodels/MealJournalViewModel.js';
import { MealPlansRepository } from '../modules/meal-plans/repositories/MealPlansRepository.js';
import { MealPlansViewModel } from '../modules/meal-plans/viewmodels/MealPlansViewModel.js';
import { MedicationRepository } from '../modules/medication/repositories/MedicationRepository.js';
import { MedicationViewModel } from '../modules/medication/viewmodels/MedicationViewModel.js';
import { SettingsRepository } from '../modules/settings/repositories/SettingsRepository.js';
import { SettingsViewModel } from '../modules/settings/viewmodels/SettingsViewModel.js';
import { WeightTrackingRepository } from '../modules/weight-tracking/repositories/WeightTrackingRepository.js';
import { WeightTrackingViewModel } from '../modules/weight-tracking/viewmodels/WeightTrackingViewModel.js';
import { FabViewModel } from '../presentation/viewmodels/FabViewModel.js';

export function createCoreMvpModules({ persistence, eventBus }) {
  const repositoryFactory = persistence.repositoryFactory;
  const mealJournalRepository = new MealJournalRepository({ repositoryFactory });
  const weightTrackingRepository = new WeightTrackingRepository({ repositoryFactory });
  const bodyMeasurementsRepository = new BodyMeasurementsRepository({ repositoryFactory });
  const medicationRepository = new MedicationRepository({ repositoryFactory });
  const dailyHabitsRepository = new DailyHabitsRepository({ repositoryFactory });
  const foodLibraryRepository = new FoodLibraryRepository({ repositoryFactory });
  const favoriteMealsRepository = new FavoriteMealsRepository({ repositoryFactory });
  const mealPlansRepository = new MealPlansRepository({ repositoryFactory });
  const settingsRepository = new SettingsRepository({ repositoryFactory });
  const backupRestoreRepository = new BackupRestoreRepository({
    backupService: persistence.backupService,
  });
  const dashboardRepository = new DashboardRepository({
    mealJournalRepository,
    weightTrackingRepository,
    bodyMeasurementsRepository,
    medicationRepository,
    dailyHabitsRepository,
  });

  return {
    dashboard: new DashboardViewModel({ repository: dashboardRepository }),
    'meal-journal': new MealJournalViewModel({ repository: mealJournalRepository, eventBus }),
    'weight-tracking': new WeightTrackingViewModel({ repository: weightTrackingRepository, eventBus }),
    'body-measurements': new BodyMeasurementsViewModel({
      repository: bodyMeasurementsRepository,
      eventBus,
    }),
    medication: new MedicationViewModel({ repository: medicationRepository, eventBus }),
    'daily-habits': new DailyHabitsViewModel({ repository: dailyHabitsRepository, eventBus }),
    'food-library': new FoodLibraryViewModel({
      repository: foodLibraryRepository,
      mealJournalRepository,
      eventBus,
    }),
    favorites: new FavoriteMealsViewModel({
      repository: favoriteMealsRepository,
      foodLibraryRepository,
      mealJournalRepository,
      eventBus,
    }),
    'meal-plans': new MealPlansViewModel({
      repository: mealPlansRepository,
      favoriteMealsRepository,
      foodLibraryRepository,
      mealJournalRepository,
      eventBus,
    }),
    settings: new SettingsViewModel({ repository: settingsRepository, eventBus }),
    'backup-restore': new BackupRestoreViewModel({
      repository: backupRestoreRepository,
      eventBus,
    }),
    fab: new FabViewModel(),
    developer: new DeveloperModeViewModel({ repositoryFactory, foodLibraryRepository, eventBus }),
  };
}
