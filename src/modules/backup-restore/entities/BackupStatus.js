export function createBackupStatus(input = {}) {
  return {
    exportText: input.exportText ?? '',
    importText: input.importText ?? '',
    message: input.message ?? '',
    messageParams: input.messageParams ?? {},
    error: input.error ?? '',
    errorParams: input.errorParams ?? {},
  };
}
