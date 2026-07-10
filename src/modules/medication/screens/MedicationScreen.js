import {
  numberOrEmpty,
  renderEmptyState,
  renderError,
  renderMessage,
  valueOrEmpty,
} from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';
import { todayDate } from '../../shared/utils/records.js';

export function renderMedicationScreen(state) {
  const record = state.editingRecord ?? {};
  const i18n = state.app.i18n;
  const medication = state.app.settings?.medication ?? {};
  const doseUnit = medication.doseUnit || 'mg';
  const pageTitle = medication.name || i18n.t('route.medication');

  return `
    <section class="module-screen" aria-labelledby="medication-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.medication')}</p>
        <h1 id="medication-title">${escapeHtml(pageTitle)}</h1>
        <p>${i18n.t('medication.description')}</p>
      </div>

      <section class="content-panel">
        <h2>${state.editingRecord ? i18n.t('medication.edit') : i18n.t('medication.add')}</h2>
        ${renderMessage(state.message, 'success', i18n)}
        <form class="module-form" data-module="medication" data-action="save">
          <label>
            <span>${i18n.t('common.date')}</span>
            <input name="administeredAt" type="date" value="${valueOrEmpty(record.administeredAt ?? todayDate())}" />
            ${renderError(state.errors, 'administeredAt', i18n)}
          </label>
          <label>
            <span>${i18n.t('medication.doseAmount')} (${escapeHtml(doseUnit)})</span>
            <input name="doseMg" type="number" min="0" step="0.1" value="${numberOrEmpty(record.doseMg)}" />
            ${renderError(state.errors, 'doseMg', i18n)}
          </label>
          <label>
            <span>${i18n.t('medication.site')}</span>
            <select name="site">
              <option value="not-specified" ${selected(record.site ?? 'not-specified', 'not-specified')}>${i18n.t(
                'medication.notSpecified',
              )}</option>
              <option value="abdomen" ${selected(record.site, 'abdomen')}>${i18n.t('medication.abdomen')}</option>
              <option value="thigh" ${selected(record.site, 'thigh')}>${i18n.t('medication.thigh')}</option>
              <option value="upper-arm" ${selected(record.site, 'upper-arm')}>${i18n.t('medication.upperArm')}</option>
            </select>
          </label>
          <label class="module-form__wide">
            <span>${i18n.t('common.notes')}</span>
            <textarea name="notes" rows="3">${valueOrEmpty(record.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${state.editingRecord ? i18n.t('common.saveChanges') : i18n.t('medication.addButton')}</button>
            ${state.editingRecord ? `<button type="button" data-action="cancel">${i18n.t('common.cancel')}</button>` : ''}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${i18n.t('medication.listTitle')}</h2>
        ${renderApplicationRecords(state.records, medication, i18n)}
      </section>
    </section>
  `;
}

function renderApplicationRecords(records, medication, i18n) {
  if (records.length === 0) {
    return renderEmptyState(i18n.t('medication.empty'));
  }

  const doseUnit = medication.doseUnit || 'mg';
  const medicationPrefix = medication.name ? `${escapeHtml(medication.name)} &middot; ` : '';

  return `
    <div class="record-list">
      ${records
        .map(
          (record) => `
            <article class="record-card">
              <div>
                <span class="record-card__meta">${escapeHtml(i18n.formatDate(record.administeredAt))} &middot; ${escapeHtml(
                  translateSite(record.site, i18n),
                )}</span>
                <h3>${medicationPrefix}${escapeHtml(i18n.formatNumber(record.doseMg))} ${escapeHtml(doseUnit)}</h3>
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

function translateSite(site, i18n) {
  const siteKeys = {
    abdomen: 'medication.abdomen',
    thigh: 'medication.thigh',
    'upper-arm': 'medication.upperArm',
    'not-specified': 'medication.notSpecified',
  };

  return i18n.t(siteKeys[site] ?? 'medication.notSpecified');
}
