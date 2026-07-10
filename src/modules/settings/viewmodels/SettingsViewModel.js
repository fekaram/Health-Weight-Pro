export class SettingsViewModel {
  constructor({ repository, eventBus }) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.settings = null;
    this.message = '';
  }

  async initialize() {
    this.settings = await this.repository.getSettings();
  }

  getState() {
    return {
      settings: this.settings,
      message: this.message,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'save') {
      this.settings = await this.repository.saveSettings(payload);
      this.message = 'message.settingsSaved';
      this.eventBus.publish('settings:changed', this.settings);
      return;
    }

    if (action === 'reset') {
      this.settings = await this.repository.resetSettings();
      this.message = 'message.settingsReset';
      this.eventBus.publish('settings:changed', this.settings);
    }
  }
}
