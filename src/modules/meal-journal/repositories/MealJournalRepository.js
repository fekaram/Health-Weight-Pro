import { CORE_MVP_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { sortByDateDesc } from '../../shared/utils/records.js';

export class MealJournalRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.meals);
  }

  async list() {
    return sortByDateDesc(await this.repository.getAll(), 'mealDate');
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(entry) {
    return this.repository.save(entry);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}
