import { DatabaseVersionManager } from './DatabaseVersionManager.js';
import { createKeyRange, normalizeCursorDirection } from './queryHelpers.js';

export class IndexedDBClient {
  #databasePromise;
  #versionManager;

  constructor({ databaseName, version, migrations = [], logger }) {
    this.databaseName = databaseName;
    this.version = version;
    this.migrations = migrations;
    this.logger = logger;
    this.#versionManager = new DatabaseVersionManager({ version, migrations });
    this.#versionManager.validate();
  }

  async initialize() {
    await this.getDatabase();
  }

  async getDatabase() {
    if (!this.#databasePromise) {
      this.#databasePromise = this.#openDatabase();
    }

    return this.#databasePromise;
  }

  async getStoreNames() {
    const database = await this.getDatabase();

    return [...database.objectStoreNames];
  }

  async hasStore(storeName) {
    const database = await this.getDatabase();

    return database.objectStoreNames.contains(storeName);
  }

  async getAll(storeName) {
    return this.request(storeName, 'readonly', (store) => store.getAll());
  }

  async getById(storeName, id) {
    return this.request(storeName, 'readonly', (store) => store.get(id));
  }

  async getByIndex(storeName, indexName, value) {
    return this.request(storeName, 'readonly', (store) => store.index(indexName).get(value));
  }

  async getAllByIndex(storeName, indexName, query = {}) {
    return this.request(storeName, 'readonly', (store) =>
      store.index(indexName).getAll(createKeyRange(query)),
    );
  }

  async add(storeName, value) {
    return this.request(storeName, 'readwrite', (store) => store.add(value));
  }

  async put(storeName, value) {
    return this.request(storeName, 'readwrite', (store) => store.put(value));
  }

  async bulkPut(storeName, values) {
    if (!Array.isArray(values)) {
      throw new Error('bulkPut expects an array of records.');
    }

    return this.transaction([storeName], 'readwrite', ({ getStore }) => {
      const store = getStore(storeName);

      values.forEach((value) => store.put(value));

      return values.length;
    });
  }

  async delete(storeName, id) {
    return this.request(storeName, 'readwrite', (store) => store.delete(id));
  }

  async clear(storeName) {
    return this.request(storeName, 'readwrite', (store) => store.clear());
  }

  async count(storeName, query = {}) {
    return this.request(storeName, 'readonly', (store) => store.count(createKeyRange(query)));
  }

  async exists(storeName, id) {
    const record = await this.getById(storeName, id);

    return record !== undefined;
  }

  async query(storeName, query = {}) {
    const { direction, indexName, limit = Number.POSITIVE_INFINITY, predicate, range } = query;

    return this.transaction([storeName], 'readonly', ({ getStore }) => {
      const store = getStore(storeName);
      const source = indexName ? store.index(indexName) : store;
      const records = [];
      const request = source.openCursor(createKeyRange(range), normalizeCursorDirection(direction));

      request.onsuccess = () => {
        const cursor = request.result;

        if (!cursor || records.length >= limit) {
          return;
        }

        if (!predicate || predicate(cursor.value)) {
          records.push(cursor.value);
        }

        cursor.continue();
      };

      return records;
    });
  }

  async request(storeName, mode, operation) {
    return this.transaction([storeName], mode, ({ getStore }) => operation(getStore(storeName)), {
      resolveRequestResult: true,
    });
  }

  async transaction(storeNames, mode, operation, options = {}) {
    if (!Array.isArray(storeNames) || storeNames.length === 0) {
      throw new Error('transaction requires at least one object store.');
    }

    const database = await this.getDatabase();
    const missingStores = storeNames.filter((storeName) => !database.objectStoreNames.contains(storeName));

    if (missingStores.length > 0) {
      throw new Error(`Unknown object stores: ${missingStores.join(', ')}.`);
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeNames, mode);
      let operationResult;

      const getStore = (storeName) => transaction.objectStore(storeName);

      transaction.oncomplete = () => resolve(operationResult);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);

      try {
        const result = operation({
          database,
          getStore,
          transaction,
        });

        if (options.resolveRequestResult && result) {
          result.onsuccess = () => {
            operationResult = result.result;
          };
          result.onerror = () => {
            transaction.abort();
          };
          return;
        }

        operationResult = result;
      } catch (error) {
        transaction.abort();
        reject(error);
      }
    });
  }

  close() {
    if (!this.#databasePromise) {
      return;
    }

    this.#databasePromise.then((database) => database.close());
    this.#databasePromise = undefined;
  }

  #openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, this.version);
      let oldVersion = 0;
      let newVersion = this.version;
      let didUpgrade = false;

      request.onupgradeneeded = (event) => {
        const database = request.result;
        didUpgrade = true;
        oldVersion = event.oldVersion;
        newVersion = event.newVersion ?? this.version;
        const migrations = this.#versionManager.getUpgradeMigrations(oldVersion, newVersion);

        migrations.forEach((migration) => {
          migration.up({
            database,
            oldVersion,
            newVersion,
            transaction: request.transaction,
          });
        });
      };

      request.onsuccess = async () => {
        const database = request.result;
        const postUpgradeMigrations = didUpgrade
          ? this.#versionManager.getPostUpgradeMigrations(oldVersion, newVersion)
          : [];

        try {
          for (const migration of postUpgradeMigrations) {
            await migration.afterUpgrade({
              database,
              oldVersion,
              newVersion,
            });
          }

          this.logger?.info('IndexedDB initialized.', {
            databaseName: this.databaseName,
            version: this.version,
          });
          resolve(database);
        } catch (error) {
          database.close();
          reject(error);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}
