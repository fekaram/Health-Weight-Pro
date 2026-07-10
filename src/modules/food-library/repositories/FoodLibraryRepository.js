import { CORE_MVP_STORE_NAMES, SYSTEM_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { sortByField } from '../../shared/utils/records.js';

const CATALOG_SEEDED_METADATA_KEY = 'food-library:starter-catalog-seeded';
const CATALOG_VERSION_METADATA_KEY = 'food-library:starter-catalog-version';

export class FoodLibraryRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.foods);
    this.metadataRepository = repositoryFactory.getRepository(SYSTEM_STORE_NAMES.metadata);
  }

  async list() {
    return sortByField(await this.repository.getAll(), 'name');
  }

  async getById(id) {
    return this.repository.getById(id);
  }

  async save(food) {
    return this.repository.save(food);
  }

  async saveMany(foods) {
    return this.repository.saveMany(foods);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async hasSeededStarterCatalog() {
    const record = await this.metadataRepository.getById(CATALOG_SEEDED_METADATA_KEY);

    return Boolean(record?.value);
  }

  async getStoredCatalogVersion() {
    const record = await this.metadataRepository.getById(CATALOG_VERSION_METADATA_KEY);

    return record?.value ?? null;
  }

  async markStarterCatalogSeeded(version) {
    const timestamp = new Date().toISOString();

    await this.metadataRepository.save({
      key: CATALOG_SEEDED_METADATA_KEY,
      value: true,
      updatedAt: timestamp,
    });

    await this.metadataRepository.save({
      key: CATALOG_VERSION_METADATA_KEY,
      value: version,
      updatedAt: timestamp,
    });
  }
}
