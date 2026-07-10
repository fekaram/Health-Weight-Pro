import { getEnabledMealSlots, getMealSlotLabelKey } from '../../../shared/constants/mealSlots.js';
import { renderEmptyState, renderError, renderMessage, valueOrEmpty } from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';
import { todayDate } from '../../shared/utils/records.js';

export function renderMealJournalScreen(state) {
  const record = state.editingRecord ?? {};
  const i18n = state.app.i18n;
  const enabledSlots = getEnabledMealSlots(state.app.settings ?? {});
  const mealTypeOptions =
    record.mealType && !enabledSlots.includes(record.mealType) ? [...enabledSlots, record.mealType] : enabledSlots;

  return `
    <section class="module-screen" aria-labelledby="meal-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.mealJournal')}</p>
        <h1 id="meal-title">${i18n.t('route.mealJournal')}</h1>
        <p>${i18n.t('meal.description')}</p>
      </div>

      <section class="content-panel">
        <h2>${state.editingRecord ? i18n.t('meal.edit') : i18n.t('meal.add')}</h2>
        ${renderMessage(state.message, 'success', i18n)}
        <form class="module-form" data-module="meal-journal" data-action="save">
          <label>
            <span>${i18n.t('common.date')}</span>
            <input name="mealDate" type="date" value="${valueOrEmpty(record.mealDate ?? todayDate())}" />
            ${renderError(state.errors, 'mealDate', i18n)}
          </label>
          <label>
            <span>${i18n.t('meal.type')}</span>
            <select name="mealType">
              ${mealTypeOptions
                .map(
                  (mealType) =>
                    `<option value="${mealType}" ${selected(record.mealType ?? mealTypeOptions[0], mealType)}>${i18n.t(getMealSlotLabelKey(mealType))}</option>`,
                )
                .join('')}
            </select>
          </label>
          <label class="module-form__wide">
            <span>${i18n.t('meal.name')}</span>
            <input name="title" value="${valueOrEmpty(record.title)}" placeholder="${i18n.t('meal.placeholder')}" />
            ${renderError(state.errors, 'title', i18n)}
          </label>
          <label class="module-form__wide">
            <span>${i18n.t('common.notes')}</span>
            <textarea name="notes" rows="3" placeholder="${i18n.t('meal.optionalNotes')}">${valueOrEmpty(record.notes)}</textarea>
          </label>
          <div class="form-actions">
            <button type="submit">${state.editingRecord ? i18n.t('common.saveChanges') : i18n.t('meal.addButton')}</button>
            ${state.editingRecord ? `<button type="button" data-action="cancel">${i18n.t('common.cancel')}</button>` : ''}
          </div>
        </form>
      </section>

      <section class="content-panel">
        <h2>${i18n.t('meal.listTitle')}</h2>
        ${renderMeals(state.records, i18n)}
      </section>
    </section>
  `;
}

function renderMeals(records, i18n) {
  if (records.length === 0) {
    return renderEmptyState(i18n.t('meal.empty'));
  }

  return `
    <div class="record-list">
      ${records
        .map(
          (record) => `
            <article class="record-card">
              <div>
                <span class="record-card__meta">${escapeHtml(i18n.formatDate(record.mealDate))} &middot; ${escapeHtml(
                  i18n.t(getMealSlotLabelKey(record.mealType)),
                )}</span>
                <h3>${escapeHtml(record.title)}</h3>
                ${
                  record.calories != null
                    ? `<p class="record-card__nutrition">${escapeHtml(i18n.formatNumber(record.calories))} kcal &middot; ${escapeHtml(
                        i18n.formatNumber(record.protein ?? 0),
                      )} g ${i18n.t('settings.protein').toLowerCase()}</p>`
                    : ''
                }
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
