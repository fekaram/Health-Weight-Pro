import { RepositoryFactory } from '../repositories/RepositoryFactory.js';
import { BackupService } from './BackupService.js';
import { databaseSchema } from './databaseSchema.js';
import { IndexedDBClient } from './IndexedDBClient.js';
import { storageMigrations } from './storageMigrations.js';

export function createPersistenceLayer({ logger }) {
  const storage = new IndexedDBClient({
    databaseName: databaseSchema.databaseName,
    version: databaseSchema.version,
    migrations: storageMigrations,
    logger,
  });
  const repositoryFactory = new RepositoryFactory({ storage });
  const backupService = new BackupService({
    storage,
    databaseName: databaseSchema.databaseName,
    version: databaseSchema.version,
  });

  return {
    backupService,
    repositoryFactory,
    storage,
  };
}
