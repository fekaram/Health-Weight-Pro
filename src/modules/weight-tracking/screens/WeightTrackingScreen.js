import {
  numberOrEmpty,
  renderEmptyState,
  renderError,
  renderMessage,
  valueOrEmpty,
} from '../../shared/screens/formComponents.js';
import { escapeHtml } from '../../shared/utils/html.js';
import { todayDate } from '../../shared/utils/records.js';

export function renderWeightTrackingScreen(state) {
  const record = state.editingRecord ?? {};
  const i18n = state.app.i18n;
  const weightUnit = state.app.units.weight;

  return `
    <section class="module-screen" aria-labelledby="weight-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.weightTracking')}</p>
        <h1 id="weight-title">${i18n.t('route.weightTracking')}</h1>
        <p>${i18n.t('weight.description')}</p>
      </div>

      <section class="content-panel">
        <h2>${state.editingRecord ? i18n.t('weight.edit') : i18n.t('weight.add')}</h2>
        ${renderMessage(state.message, 'success', i18n)}
        <form class="module-form" data-module="weight-tracking" data-action="save">
          <label>
            <span>${i18n.t('common.date')}</span>
            <input name="recordedAt" type="date" value="${valueOrEmpty(record.recordedAt ?? todayDate())}" />
            ${renderError(state.errors, 'recordedAt', i18n)}
          </label>
          <label>
            <span>${i18n.t('weight.weight')}</span>
            <input name="weight" type="number" min="0" step="0.1" value="${numberOrEmpty(record.weight)}" />
            ${renderError(state.errors, 'weight', i18n)}
          </label>
          <label>
            <span>${i18n.t('common.unit')}</span>
            <input value="${weightUnit}" readonly aria-readonly="true" />
            <input name="unit" type="hidden" value="${weightUnit}" />
          </label>
          <label class="module-form__wide">
            <span>${i18n.t('common.notes')}</span>
            <textarea name="notes" rows="3">${valueOrEmpty(record.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${state.editingRecord ? i18n.t('common.saveChanges') : i18n.t('weight.addButton')}</button>
            ${state.editingRecord ? `<button type="button" data-action="cancel">${i18n.t('common.cancel')}</button>` : ''}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${i18n.t('weight.listTitle')}</h2>
        ${renderWeightRecords(state.records, i18n)}
      </section>
    </section>
  `;
}

function renderWeightRecords(records, i18n) {
  if (records.length === 0) {
    return renderEmptyState(i18n.t('weight.empty'));
  }

  return `
    <div class="record-list">
      ${records
        .map(
          (record) => `
            <article class="record-card">
              <div>
                <span class="record-card__meta">${escapeHtml(i18n.formatDate(record.recordedAt))}</span>
                <h3>${escapeHtml(i18n.formatNumber(record.weight))} ${escapeHtml(record.unit)}</h3>
                <p>${record.notes ? escapeHtml(record.notes) : i18n.t('common.noNotes')}</p>
              </div>
              <div class="record-card__actions">
                <button type="button" data-action="edit" data-id="${record.id}">${i18n.t('common.edit')}</button>
                <button type="button" data-action="delete" data-id="${record.id}">${i18n.t('common.delete')}</button>
              </div>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}
