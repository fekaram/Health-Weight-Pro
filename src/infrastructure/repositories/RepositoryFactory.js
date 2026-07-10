import { GenericRepository } from './GenericRepository.js';

export class RepositoryFactory {
  #repositories = new Map();

  constructor({ storage }) {
    this.storage = storage;
  }

  getRepository(storeName) {
    if (!this.#repositories.has(storeName)) {
      this.#repositories.set(
        storeName,
        new GenericRepository({
          storage: this.storage,
          storeName,
        }),
      );
    }

    return this.#repositories.get(storeName);
  }

  clearCache() {
    this.#repositories.clear();
  }
}
