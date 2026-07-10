import { renderMessage, valueOrEmpty } from '../../shared/screens/formComponents.js';

export function renderBackupRestoreScreen(state) {
  const i18n = state.app.i18n;

  return `
    <section class="module-screen" aria-labelledby="backup-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.backupRestore')}</p>
        <h1 id="backup-title">${i18n.t('route.backupRestore')}</h1>
        <p>${i18n.t('backup.description')}</p>
      </div>

      <section class="content-panel">
        <h2>${i18n.t('backup.export')}</h2>
        ${renderMessage(state.message, 'success', i18n, state.messageParams)}
        ${renderMessage(state.error, 'error', i18n, state.errorParams)}
        <div class="form-actions">
          <button type="button" data-module="backup-restore" data-action="export">${i18n.t('backup.exportJson')}</button>
        </div>
        <textarea class="backup-textarea" readonly rows="10">${valueOrEmpty(state.exportText)}</textarea>
      </section>

      <section class="content-panel">
        <h2>${i18n.t('backup.import')}</h2>
        <form class="module-form module-form--single" data-module="backup-restore" data-action="import">
          <label class="module-form__wide">
            <span>${i18n.t('backup.json')}</span>
            <textarea name="importText" rows="10" placeholder="${i18n.t('backup.placeholder')}">${valueOrEmpty(
              state.importText,
            )}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${i18n.t('backup.importJson')}</button>
          </div>
        </form>
      </section>
    </section>
  `;
}
