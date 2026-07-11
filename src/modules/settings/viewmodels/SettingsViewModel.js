export class SettingsViewModel {
  constructor({ repository, eventBus }) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.settings = null;
    this.message = '';
    // Session-only (never persisted): which accordion sections are expanded. Resets on
    // reload by design — only the current session's choices are "remembered".
    this.expandedSections = new Set();
  }

  async initialize() {
    this.settings = await this.repository.getSettings();
  }

  getState() {
    return {
      settings: this.settings,
      message: this.message,
      expandedSections: [...this.expandedSections],
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
      return;
    }

    if (action === 'toggleSection') {
      this.#toggleSection(payload.section);
    }
  }

  #toggleSection(section) {
    if (!section) {
      return;
    }

    if (this.expandedSections.has(section)) {
      this.expandedSections.delete(section);
    } else {
      this.expandedSections.add(section);
    }
  }
}
