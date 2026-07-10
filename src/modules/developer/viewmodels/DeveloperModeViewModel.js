import { STARTER_FOOD_CATALOG_VERSION } from '../../../data/starterFoodCatalog.js';
import { APP_VERSION } from '../../../app/localization/i18n.js';
import { DATABASE_NAME, DATABASE_VERSION, SYSTEM_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { reimportStarterCatalog } from '../../food-library/services/seedStarterCatalog.js';

const DEV_MODE_METADATA_KEY = 'developer-mode:enabled';
const TAP_THRESHOLD = 7;

export class DeveloperModeViewModel {
  constructor({ repositoryFactory, foodLibraryRepository, eventBus }) {
    this.metadataRepository = repositoryFactory.getRepository(SYSTEM_STORE_NAMES.metadata);
    this.foodLibraryRepository = foodLibraryRepository;
    this.eventBus = eventBus;
    this.isEnabled = false;
    this.justEnabled = false;
    this.tapCount = 0;
    this.confirmingAction = null;
    this.message = '';
    this.storedCatalogVersion = null;
  }

  async initialize() {
    const record = await this.metadataRepository.getById(DEV_MODE_METADATA_KEY);
    this.isEnabled = Boolean(record?.value);
    this.storedCatalogVersion = await this.foodLibraryRepository.getStoredCatalogVersion();
  }

  getState() {
    return {
      isEnabled: this.isEnabled,
      justEnabled: this.justEnabled,
      confirmingAction: this.confirmingAction,
      message: this.message,
      versions: {
        app: APP_VERSION,
        database: DATABASE_VERSION,
        catalogCurrent: STARTER_FOOD_CATALOG_VERSION,
        catalogStored: this.storedCatalogVersion,
      },
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'tapLogo') {
      await this.#registerTap();
      return;
    }

    if (action === 'requestConfirm') {
      this.confirmingAction = payload.tool ?? null;
      this.message = '';
      return;
    }

    if (action === 'cancelConfirm') {
      this.confirmingAction = null;
      return;
    }

    if (action === 'clearDatabase') {
      await this.#clearDatabase();
      return;
    }

    if (action === 'resetFirstLaunch') {
      await this.#resetFirstLaunch();
      return;
    }

    if (action === 'reimportCatalog') {
      await this.#reimportCatalog();
    }
  }

  async #registerTap() {
    this.justEnabled = false;

    if (this.isEnabled) {
      return;
    }

    this.tapCount += 1;

    if (this.tapCount >= TAP_THRESHOLD) {
      this.tapCount = 0;
      this.isEnabled = true;
      this.justEnabled = true;

      await this.metadataRepository.save({
        key: DEV_MODE_METADATA_KEY,
        value: true,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async #clearDatabase() {
    this.confirmingAction = null;
    await deleteDatabase();
    window.location.reload();
  }

  async #resetFirstLaunch() {
    this.confirmingAction = null;

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();

      await Promise.all(registrations.map((registration) => registration.unregister()));
    }

    if ('caches' in window) {
      const cacheNames = await caches.keys();

      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    await deleteDatabase();
    window.location.reload();
  }

  async #reimportCatalog() {
    this.confirmingAction = null;
    await reimportStarterCatalog(this.foodLibraryRepository);
    this.storedCatalogVersion = await this.foodLibraryRepository.getStoredCatalogVersion();
    this.message = 'developer.catalogReimportedMessage';
    this.eventBus.publish('food-library:changed');
    this.eventBus.publish('core-mvp:data-changed');
  }
}

function deleteDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DATABASE_NAME);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    request.onblocked = () => resolve();
  });
}
