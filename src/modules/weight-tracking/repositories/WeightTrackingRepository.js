import { CORE_MVP_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { sortByDateDesc } from '../../shared/utils/records.js';

export class WeightTrackingRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.weights);
  }

  async list() {
    return sortByDateDesc(await this.repository.getAll(), 'recordedAt');
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(record) {
    return this.repository.save(record);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}
