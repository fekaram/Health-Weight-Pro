import { CORE_MVP_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { sortByField } from '../../shared/utils/records.js';

export class MealPlansRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.mealPlans);
  }

  async list() {
    return sortByField(await this.repository.getAll(), 'name');
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(mealPlan) {
    return this.repository.save(mealPlan);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}
