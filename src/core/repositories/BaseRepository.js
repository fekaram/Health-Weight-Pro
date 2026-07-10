export class BaseRepository {
  constructor({ storage, storeName }) {
    if (!storage) {
      throw new Error('Repository storage dependency is required.');
    }

    if (!storeName) {
      throw new Error('Repository storeName is required.');
    }

    this.storage = storage;
    this.storeName = storeName;
  }

  async getAll() {
    return this.storage.getAll(this.storeName);
  }

  async getById(id) {
    return this.storage.getById(this.storeName, id);
  }

  async save(record) {
    return this.storage.put(this.storeName, record);
  }

  async delete(id) {
    return this.storage.delete(this.storeName, id);
  }
}
