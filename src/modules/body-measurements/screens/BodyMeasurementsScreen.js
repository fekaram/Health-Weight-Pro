import {
  numberOrEmpty,
  renderEmptyState,
  renderError,
  renderMessage,
  valueOrEmpty,
} from '../../shared/screens/formComponents.js';
import { escapeHtml } from '../../shared/utils/html.js';
import { todayDate } from '../../shared/utils/records.js';

export function renderBodyMeasurementsScreen(state) {
  const record = state.editingRecord ?? {};
  const i18n = state.app.i18n;
  const measurementUnit = state.app.units.measurement;

  return `
    <section class="module-screen" aria-labelledby="body-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.bodyMeasurements')}</p>
        <h1 id="body-title">${i18n.t('route.bodyMeasurements')}</h1>
        <p>${i18n.t('body.description')}</p>
      </div>

      <section class="content-panel">
        <h2>${state.editingRecord ? i18n.t('body.edit') : i18n.t('body.add')}</h2>
        ${renderMessage(state.message, 'success', i18n)}
        <form class="module-form" data-module="body-measurements" data-action="save">
          <label>
            <span>${i18n.t('common.date')}</span>
            <input name="recordedAt" type="date" value="${valueOrEmpty(record.recordedAt ?? todayDate())}" />
            ${renderError(state.errors, 'recordedAt', i18n)}
          </label>
          <label>
            <span>${i18n.t('common.unit')}</span>
            <input value="${measurementUnit}" readonly aria-readonly="true" />
            <input name="unit" type="hidden" value="${measurementUnit}" />
          </label>
          <label>
            <span>${i18n.t('body.chest')}</span>
            <input name="chest" type="number" min="0" step="0.1" value="${numberOrEmpty(record.chest)}" />
          </label>
          <label>
            <span>${i18n.t('body.waist')}</span>
            <input name="waist" type="number" min="0" step="0.1" value="${numberOrEmpty(record.waist)}" />
          </label>
          <label>
            <span>${i18n.t('body.hips')}</span>
            <input name="hips" type="number" min="0" step="0.1" value="${numberOrEmpty(record.hips)}" />
          </label>
          <label>
            <span>${i18n.t('body.arm')}</span>
            <input name="arm" type="number" min="0" step="0.1" value="${numberOrEmpty(record.arm)}" />
          </label>
          <label>
            <span>${i18n.t('body.thigh')}</span>
            <input name="thigh" type="number" min="0" step="0.1" value="${numberOrEmpty(record.thigh)}" />
          </label>
          <label class="module-form__wide">
            <span>${i18n.t('common.notes')}</span>
            <textarea name="notes" rows="3">${valueOrEmpty(record.notes)}</textarea>
            ${renderError(state.errors, 'measurements', i18n)}
          </label>
          <div class="form-actions">
            <button type="submit">${state.editingRecord ? i18n.t('common.saveChanges') : i18n.t('body.addButton')}</button>
            ${state.editingRecord ? `<button type="button" data-action="cancel">${i18n.t('common.cancel')}</button>` : ''}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${i18n.t('body.listTitle')}</h2>
        ${renderBodyRecords(state.records, i18n)}
      </section>
    </section>
  `;
}

function renderBodyRecords(records, i18n) {
  if (records.length === 0) {
    return renderEmptyState(i18n.t('body.empty'));
  }

  return `
    <div class="record-list">
      ${records
        .map(
          (record) => `
            <article class="record-card">
              <div>
                <span class="record-card__meta">${escapeHtml(i18n.formatDate(record.recordedAt))} &middot; ${escapeHtml(
                  record.unit,
                )}</span>
                <h3>${renderMeasurementSummary(record, i18n)}</h3>
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

function renderMeasurementSummary(record, i18n) {
  const labels = {
    chest: i18n.t('body.chest'),
    waist: i18n.t('body.waist'),
    hips: i18n.t('body.hips'),
    arm: i18n.t('body.arm'),
    thigh: i18n.t('body.thigh'),
  };

  return ['chest', 'waist', 'hips', 'arm', 'thigh']
    .filter((field) => record[field] !== null && record[field] !== undefined)
    .map((field) => `${escapeHtml(labels[field])}: ${escapeHtml(i18n.formatNumber(record[field]))}`)
    .join(' &middot; ');
}
