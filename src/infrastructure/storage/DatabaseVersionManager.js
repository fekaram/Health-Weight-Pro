export class DatabaseVersionManager {
  constructor({ version, migrations }) {
    this.version = version;
    this.migrations = [...migrations].sort((left, right) => left.version - right.version);
  }

  validate() {
    if (!Number.isInteger(this.version) || this.version < 1) {
      throw new Error('IndexedDB version must be a positive integer.');
    }

    this.migrations.forEach((migration) => {
      if (!Number.isInteger(migration.version) || migration.version < 1) {
        throw new Error(`Migration "${migration.id}" must define a positive integer version.`);
      }

      if (migration.version > this.version) {
        throw new Error(`Migration "${migration.id}" is newer than the configured database version.`);
      }
    });
  }

  getUpgradeMigrations(oldVersion, newVersion) {
    return this.migrations.filter(
      (migration) => migration.version > oldVersion && migration.version <= newVersion,
    );
  }

  getPostUpgradeMigrations(oldVersion, newVersion) {
    return this.getUpgradeMigrations(oldVersion, newVersion).filter(
      (migration) => typeof migration.afterUpgrade === 'function',
    );
  }
}
