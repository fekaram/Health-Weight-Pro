import { CORE_MVP_STORE_NAMES, SYSTEM_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { sortByField } from '../../shared/utils/records.js';

const SORT_OPTION_METADATA_KEY = 'favorites:sort-option';

export class FavoriteMealsRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.favoriteMeals);
    this.metadataRepository = repositoryFactory.getRepository(SYSTEM_STORE_NAMES.metadata);
  }

  async list() {
    return sortByField(await this.repository.getAll(), 'name');
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(favoriteMeal) {
    return this.repository.save(favoriteMeal);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async getSortOption() {
    const record = await this.metadataRepository.getById(SORT_OPTION_METADATA_KEY);

    return record?.value ?? 'mostUsed';
  }

  async saveSortOption(sortOption) {
    await this.metadataRepository.save({
      key: SORT_OPTION_METADATA_KEY,
      value: sortOption,
      updatedAt: new Date().toISOString(),
    });
  }
}
