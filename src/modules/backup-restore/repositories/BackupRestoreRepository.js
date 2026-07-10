export class BackupRestoreRepository {
  constructor({ backupService }) {
    this.backupService = backupService;
  }

  exportJson() {
    return this.backupService.exportJson();
  }

  importJson(json) {
    return this.backupService.importJson(json);
  }
}
