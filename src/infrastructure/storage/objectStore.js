export function ensureObjectStore(database, storeDefinition, upgradeTransaction) {
  if (database.objectStoreNames.contains(storeDefinition.name)) {
    return getObjectStoreFromUpgrade(upgradeTransaction, storeDefinition.name);
  }

  const objectStore = database.createObjectStore(storeDefinition.name, {
    keyPath: storeDefinition.keyPath ?? 'id',
    autoIncrement: storeDefinition.autoIncrement ?? false,
  });

  createIndexes(objectStore, storeDefinition.indexes ?? []);

  return objectStore;
}

export function ensureIndexes(objectStore, indexes = []) {
  createIndexes(objectStore, indexes);
}

function createIndexes(objectStore, indexes) {
  indexes.forEach((indexDefinition) => {
    if (objectStore.indexNames.contains(indexDefinition.name)) {
      return;
    }

    objectStore.createIndex(indexDefinition.name, indexDefinition.keyPath, {
      multiEntry: indexDefinition.multiEntry ?? false,
      unique: indexDefinition.unique ?? false,
    });
  });
}

function getObjectStoreFromUpgrade(upgradeTransaction, storeName) {
  if (!upgradeTransaction) {
    throw new Error(`Object store "${storeName}" already exists outside an upgrade transaction.`);
  }

  return upgradeTransaction.objectStore(storeName);
}
