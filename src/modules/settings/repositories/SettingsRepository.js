import { CORE_MVP_STORE_NAMES } from '../../../infrastructure/storage/index.js';
import { APP_SETTINGS_ID, createAppSettings, defaultSettings } from '../entities/AppSettings.js';

export class SettingsRepository {
  constructor({ repositoryFactory }) {
    this.repository = repositoryFactory.getRepository(CORE_MVP_STORE_NAMES.settings);
  }

  async getSettings() {
    return (await this.repository.getById(APP_SETTINGS_ID)) ?? defaultSettings;
  }

  async saveSettings(input) {
    const existingRecord = await this.getSettings();
    const settings = createAppSettings(input, existingRecord);

    await this.repository.save(settings);

    return settings;
  }

  async resetSettings() {
    const settings = createAppSettings(defaultSettings);

    await this.repository.save(settings);

    return settings;
  }
}
