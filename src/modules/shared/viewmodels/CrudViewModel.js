export class CrudViewModel {
  constructor({ repository, eventBus, entityName, createEntity, validateEntity }) {
    this.repository = repository;
    this.eventBus = eventBus;
    this.entityName = entityName;
    this.createEntity = createEntity;
    this.validateEntity = validateEntity;
    this.records = [];
    this.editingId = null;
    this.errors = {};
    this.message = '';
  }

  async initialize() {
    await this.load();
  }

  async load() {
    this.records = await this.repository.list();
  }

  getState() {
    return {
      records: this.records,
      editingRecord: this.records.find((record) => record.id === this.editingId) ?? null,
      errors: this.errors,
      message: this.message,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'save') {
      await this.#save(payload);
      return;
    }

    if (action === 'edit') {
      this.editingId = payload.id;
      this.errors = {};
      this.message = '';
      return;
    }

    if (action === 'delete') {
      await this.repository.delete(payload.id);
      this.editingId = null;
      this.errors = {};
      this.message = 'message.recordDeleted';
      await this.load();
      this.publishChange();
      return;
    }

    if (action === 'cancel') {
      this.editingId = null;
      this.errors = {};
      this.message = '';
    }
  }

  async #save(payload) {
    const existingRecord = this.editingId ? await this.repository.getById(this.editingId) : null;
    const entity = this.createEntity(
      {
        ...payload,
        id: this.editingId,
      },
      existingRecord,
    );
    const errors = this.validateEntity(entity);

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      this.message = '';
      return;
    }

    await this.repository.save(entity);
    this.editingId = null;
    this.errors = {};
    this.message = 'message.recordSaved';
    await this.load();
    this.publishChange();
  }

  publishChange() {
    this.eventBus.publish(`${this.entityName}:changed`);
    this.eventBus.publish('core-mvp:data-changed');
  }
}
