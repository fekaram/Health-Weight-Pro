import { SYSTEM_STORE_NAMES } from './databaseSchema.js';

const BACKUP_FORMAT = 'hwp-platform-3.indexeddb.backup';

export class BackupService {
  constructor({ storage, databaseName, version }) {
    this.storage = storage;
    this.databaseName = databaseName;
    this.version = version;
  }

  async exportJson({ includeSystemStores = false } = {}) {
    const storeNames = await this.#getExportableStoreNames(includeSystemStores);
    const stores = {};

    await Promise.all(
      storeNames.map(async (storeName) => {
        stores[storeName] = await this.storage.getAll(storeName);
      }),
    );

    return JSON.stringify(
      {
        format: BACKUP_FORMAT,
        databaseName: this.databaseName,
        version: this.version,
        exportedAt: new Date().toISOString(),
        stores,
      },
      null,
      2,
    );
  }

  async importJson(json, { clearBeforeImport = true } = {}) {
    const backup = this.#parseBackup(json);
    const storeNames = Object.keys(backup.stores);
    const existingStoreNames = await this.storage.getStoreNames();
    const missingStores = storeNames.filter((storeName) => !existingStoreNames.includes(storeName));

    if (missingStores.length > 0) {
      throw new Error(`Backup contains unknown object stores: ${missingStores.join(', ')}.`);
    }

    if (storeNames.length === 0) {
      return {
        importedStores: [],
        importedAt: new Date().toISOString(),
      };
    }

    await this.storage.transaction(storeNames, 'readwrite', ({ getStore }) => {
      storeNames.forEach((storeName) => {
        const store = getStore(storeName);

        if (clearBeforeImport) {
          store.clear();
        }

        backup.stores[storeName].forEach((record) => store.put(record));
      });
    });

    return {
      importedStores: storeNames,
      importedAt: new Date().toISOString(),
    };
  }

  async #getExportableStoreNames(includeSystemStores) {
    const storeNames = await this.storage.getStoreNames();

    if (includeSystemStores) {
      return storeNames;
    }

    return storeNames.filter(
      (storeName) =>
        storeName !== SYSTEM_STORE_NAMES.metadata && storeName !== SYSTEM_STORE_NAMES.migrations,
    );
  }

  #parseBackup(json) {
    const backup = typeof json === 'string' ? JSON.parse(json) : json;

    if (backup.format !== BACKUP_FORMAT) {
      throw new Error('Unsupported backup format.');
    }

    if (!backup.stores || typeof backup.stores !== 'object') {
      throw new Error('Backup does not contain stores.');
    }

    Object.entries(backup.stores).forEach(([storeName, records]) => {
      if (!Array.isArray(records)) {
        throw new Error(`Backup store "${storeName}" must contain an array of records.`);
      }
    });

    return backup;
  }
}
