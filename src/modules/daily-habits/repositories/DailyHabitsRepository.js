import { CORE_MVP_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { todayDate } from '../../shared/utils/records.js';

export class DailyHabitsRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.dailyHabits);
  }

  async getByDate(date) {
    return this.repository.getByIndex('date', date);
  }

  async getToday() {
    return this.getByDate(todayDate());
  }

  async save(record) {
    return this.repository.save(record);
  }
}
