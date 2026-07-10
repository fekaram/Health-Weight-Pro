import { BaseRepository } from '../../core/repositories/BaseRepository.js';

export class GenericRepository extends BaseRepository {
  async add(record) {
    return this.storage.add(this.storeName, record);
  }

  async save(record) {
    return this.storage.put(this.storeName, record);
  }

  async saveMany(records) {
    return this.storage.bulkPut(this.storeName, records);
  }

  async exists(id) {
    return this.storage.exists(this.storeName, id);
  }

  async count(query) {
    return this.storage.count(this.storeName, query);
  }

  async clear() {
    return this.storage.clear(this.storeName);
  }

  async getByIndex(indexName, value) {
    return this.storage.getByIndex(this.storeName, indexName, value);
  }

  async findByIndex(indexName, query = {}) {
    return this.storage.getAllByIndex(this.storeName, indexName, query);
  }

  async query(query = {}) {
    return this.storage.query(this.storeName, query);
  }

  async transaction(mode, operation) {
    return this.storage.transaction([this.storeName], mode, ({ getStore, transaction }) =>
      operation({
        store: getStore(this.storeName),
        transaction,
      }),
    );
  }
}
