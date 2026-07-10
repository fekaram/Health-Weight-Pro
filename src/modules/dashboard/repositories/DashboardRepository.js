import { createDashboardSummary } from '../entities/DashboardSummary.js';

export class DashboardRepository {
  constructor({
    mealJournalRepository,
    weightTrackingRepository,
    bodyMeasurementsRepository,
    medicationRepository,
    dailyHabitsRepository,
  }) {
    this.mealJournalRepository = mealJournalRepository;
    this.weightTrackingRepository = weightTrackingRepository;
    this.bodyMeasurementsRepository = bodyMeasurementsRepository;
    this.medicationRepository = medicationRepository;
    this.dailyHabitsRepository = dailyHabitsRepository;
  }

  async getSummary() {
    const [meals, weights, bodyMeasurements, medicationApplications, dailyHabits] = await Promise.all([
      this.mealJournalRepository.list(),
      this.weightTrackingRepository.list(),
      this.bodyMeasurementsRepository.list(),
      this.medicationRepository.list(),
      this.dailyHabitsRepository.getToday(),
    ]);

    return createDashboardSummary({
      meals,
      weights,
      bodyMeasurements,
      medicationApplications,
      dailyHabits,
    });
  }
}
