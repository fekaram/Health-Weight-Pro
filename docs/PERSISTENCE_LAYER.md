# Persistence Layer

## Scope

This layer provides reusable offline-first persistence infrastructure for future HWP Platform modules.

It does not implement business features, business repositories, calculations, module data models, or module object stores.

## Entry Point

Future modules must access persistence through:

- `createPersistenceLayer`
- `RepositoryFactory`
- `GenericRepository`
- `BackupService`

Future modules must not call `indexedDB` directly.

## Database

- Database name: `hwp-platform-3`
- Version source: `src/infrastructure/storage/databaseSchema.js`
- Migration source: `src/infrastructure/storage/storageMigrations.js`

The current database version creates only system stores:

- `__storage_metadata`
- `__storage_migrations`

Module-specific stores must be added later through versioned storage migrations.

## Object Stores

Object stores are created through store definitions with:

- `name`
- `keyPath`
- `autoIncrement`
- `indexes`

Store creation is centralized in `objectStore.js`.

## Repositories

`RepositoryFactory` creates `GenericRepository` instances for existing object stores.

The generic repository supports:

- `add`
- `save`
- `saveMany`
- `getAll`
- `getById`
- `getByIndex`
- `findByIndex`
- `query`
- `exists`
- `count`
- `delete`
- `clear`
- `transaction`

Business-specific repositories should not be created until their sprint explicitly requires them.

## Backup

`BackupService` supports local JSON backup export and import.

By default, exports exclude system stores. System stores can be included when needed for diagnostics or full local transfer.

## Migration Rule

Every future persistence change must:

1. Increase the database version.
2. Add a new migration.
3. Create or update object stores only inside the migration.
4. Keep module code isolated from raw IndexedDB APIs.
