export class DashboardViewModel {
  constructor({ repository }) {
    this.repository = repository;
    this.summary = null;
  }

  async initialize() {
    await this.refresh();
  }

  async refresh() {
    this.summary = await this.repository.getSummary();
  }

  getState() {
    return {
      summary: this.summary,
    };
  }

  async handleAction() {
    await this.refresh();
  }
}
