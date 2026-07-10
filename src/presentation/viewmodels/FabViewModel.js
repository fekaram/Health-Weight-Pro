const DIALOG_PARENT = Object.freeze({
  'nutri-ia': 'meal-register',
  'nutri-ia-help': 'nutri-ia',
  'nutri-ia-success': 'meal-register',
});

export class FabViewModel {
  constructor() {
    this.isOpen = false;
    this.activeDialog = null;
    this.lastImportedMeal = null;
  }

  async initialize() {}

  getState() {
    return {
      isOpen: this.isOpen,
      activeDialog: this.activeDialog,
      lastImportedMeal: this.lastImportedMeal,
    };
  }

  async handleAction(action, payload = {}) {
    if (action === 'open') {
      this.isOpen = true;
      this.activeDialog = null;
      return;
    }

    if (action === 'close') {
      this.isOpen = false;
      this.activeDialog = null;
      this.lastImportedMeal = null;
      return;
    }

    if (action === 'openDialog') {
      this.activeDialog = payload.dialog;
      return;
    }

    if (action === 'showImportSuccess') {
      this.activeDialog = 'nutri-ia-success';
      this.lastImportedMeal = payload;
      return;
    }

    if (action === 'closeDialog') {
      this.activeDialog = DIALOG_PARENT[this.activeDialog] ?? null;
      this.lastImportedMeal = null;
    }
  }
}
