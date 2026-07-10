import { createBackupStatus } from '../entities/BackupStatus.js';

export class BackupRestoreViewModel {
  constructor({ repository, eventBus }) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.status = createBackupStatus();
  }

  async initialize() {
    this.status = createBackupStatus(this.status);
  }

  getState() {
    return this.status;
  }

  async handleAction(action, payload = {}) {
    if (action === 'export') {
      this.status = createBackupStatus({
        exportText: await this.repository.exportJson(),
        message: 'message.backupExported',
      });
      return;
    }

    if (action === 'import') {
      try {
        const result = await this.repository.importJson(payload.importText);
        this.status = createBackupStatus({
          importText: payload.importText,
          message: 'message.backupImported',
          messageParams: {
            stores: result.importedStores.join(', ') || 'message.noStores',
          },
        });
        this.eventBus.publish('backup:imported', result);
        this.eventBus.publish('core-mvp:data-changed');
      } catch (error) {
        const normalizedError = normalizeBackupError(error);

        this.status = createBackupStatus({
          importText: payload.importText,
          error: normalizedError.key,
          errorParams: normalizedError.params,
        });
      }
    }
  }
}

function normalizeBackupError(error) {
  const message = error?.message ?? '';

  if (message.includes('JSON')) {
    return { key: 'error.backupInvalidJson', params: {} };
  }

  if (message.includes('unknown object stores')) {
    return {
      key: 'error.backupUnknownStores',
      params: {
        stores: message.split(':').slice(1).join(':').replace('.', '').trim(),
      },
    };
  }

  if (message.includes('Unsupported backup format')) {
    return { key: 'error.backupUnsupportedFormat', params: {} };
  }

  if (message.includes('Backup does not contain stores')) {
    return { key: 'error.backupNoStores', params: {} };
  }

  if (message.includes('must contain an array of records')) {
    return { key: 'error.backupStoreRecords', params: {} };
  }

  return { key: 'error.backupInvalidJson', params: {} };
}
