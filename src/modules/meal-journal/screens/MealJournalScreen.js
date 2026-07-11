import { getEnabledMealSlots, getMealSlotLabelKey } from '../../../shared/constants/mealSlots.js';
import { renderEmptyState, renderError, renderMessage, valueOrEmpty } from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';

export function renderMealJournalScreen(state) {
  const i18n = state.app.i18n;
  const record = state.editingRecord;

  return `
    <section class="module-screen" aria-labelledby="meal-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.mealJournal')}</p>
        <h1 id="meal-title">${i18n.t('route.mealJournal')}</h1>
        <p>${i18n.t('meal.description')}</p>
      </div>

      ${record ? renderEditForm(record, state, i18n) : ''}

      <section class="content-panel">
        <h2>${i18n.t('meal.listTitle')}</h2>
        ${!record ? renderMessage(state.message, 'success', i18n) : ''}
        ${renderMeals(state.records, i18n)}
      </section>
    </section>
  `;
}

// Editing an already-registered entry (fixing a typo, date, or slot) is not "registration" —
// new meals are only ever created via the FAB (Nutri IA+ / Favorites / Food Library / Meal
// Plans). This form only ever appears when the user explicitly taps Edit on a timeline entry.
function renderEditForm(record, state, i18n) {
  const enabledSlots = getEnabledMealSlots(state.app.settings ?? {});
  const mealTypeOptions =
    record.mealType && !enabledSlots.includes(record.mealType) ? [...enabledSlots, record.mealType] : enabledSlots;

  return `
    <section class="content-panel">
      <h2>${i18n.t('meal.edit')}</h2>
      ${renderMessage(state.message, 'success', i18n)}
      <form class="module-form" data-module="meal-journal" data-action="save">
        <label>
          <span>${i18n.t('common.date')}</span>
          <input name="mealDate" type="date" value="${valueOrEmpty(record.mealDate)}" />
          ${renderError(state.errors, 'mealDate', i18n)}
        </label>
        <label>
          <span>${i18n.t('meal.type')}</span>
          <select name="mealType">
            ${mealTypeOptions
              .map(
                (mealType) =>
                  `<option value="${mealType}" ${selected(record.mealType, mealType)}>${i18n.t(getMealSlotLabelKey(mealType))}</option>`,
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
          <button type="submit">${i18n.t('common.saveChanges')}</button>
          <button type="button" data-action="cancel">${i18n.t('common.cancel')}</button>
        </div>
      </form>
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
