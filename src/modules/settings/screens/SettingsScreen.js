import { LANGUAGE_OPTIONS, THEME_OPTIONS } from '../../../app/localization/i18n.js';
import { OPTIONAL_MEAL_SLOTS } from '../../../shared/constants/mealSlots.js';
import {
  ADMINISTRATION_TYPES,
  DOSE_UNITS,
  FREQUENCIES,
} from '../../medication/entities/Medication.js';
import { numberOrEmpty, renderMessage, valueOrEmpty } from '../../shared/screens/formComponents.js';
import { escapeHtml, selected } from '../../shared/utils/html.js';

const sexOptions = [
  { value: '', labelKey: 'settings.sexNotSet' },
  { value: 'female', labelKey: 'settings.sexFemale' },
  { value: 'male', labelKey: 'settings.sexMale' },
  { value: 'other', labelKey: 'settings.sexOther' },
];

const goalOptions = [
  { value: 'lose-weight', labelKey: 'settings.goalLoseWeight' },
  { value: 'maintain-weight', labelKey: 'settings.goalMaintainWeight' },
  { value: 'gain-muscle', labelKey: 'settings.goalGainMuscle' },
];

const activityOptions = [
  { value: 'sedentary', labelKey: 'settings.activitySedentary' },
  { value: 'light', labelKey: 'settings.activityLight' },
  { value: 'moderate', labelKey: 'settings.activityModerate' },
  { value: 'intense', labelKey: 'settings.activityIntense' },
];

const dayOptions = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
].map((day) => ({ value: day, labelKey: `day.${day}` }));

const administrationTypeOptions = ADMINISTRATION_TYPES.map((value) => ({
  value,
  labelKey: `settings.administration.${value}`,
}));

const frequencyOptions = FREQUENCIES.map((value) => ({
  value,
  labelKey: `settings.frequency.${value}`,
}));

const doseUnitOptions = DOSE_UNITS.map((value) => ({
  value,
  labelKey: `settings.doseUnit.${value}`,
}));

const dashboardCards = [
  { key: 'calories', labelKey: 'dashboard.calories' },
  { key: 'protein', labelKey: 'dashboard.protein' },
  { key: 'water', labelKey: 'dashboard.water' },
  { key: 'sleep', labelKey: 'dashboard.sleep' },
  { key: 'steps', labelKey: 'dashboard.steps' },
  { key: 'weight', labelKey: 'dashboard.weight' },
  { key: 'medication', labelKey: 'dashboard.medication' },
  { key: 'recentMeals', labelKey: 'dashboard.recentMealsCard' },
  { key: 'recentActivity', labelKey: 'dashboard.recentActivityCard' },
];

export function renderSettingsScreen(state) {
  const settings = state.settings ?? {};
  const backupStatus = state.backupStatus ?? {};
  const i18n = state.app.i18n;
  const units = state.app.units;
  const expandedSections = state.expandedSections ?? [];

  return `
    <section class="module-screen" aria-labelledby="settings-title">
      <div class="module-screen__header">
        <p class="module-screen__eyebrow">${i18n.t('route.settings')}</p>
        <h1 id="settings-title">${i18n.t('route.settings')}</h1>
        <p>${i18n.t('settings.description')}</p>
      </div>

      <form class="settings-form" data-module="settings" data-action="save">
        ${renderMessage(state.message, 'success', i18n)}
        <div class="accordion">
          ${renderAccordionItem({
            key: 'sistema',
            title: i18n.t('settings.preferences'),
            expandedSections,
            content: renderSystemFields(settings, units, i18n),
          })}
          ${renderAccordionItem({
            key: 'perfil',
            title: i18n.t('settings.profile'),
            expandedSections,
            content: renderProfileFields(settings, units, i18n),
          })}
          ${renderAccordionItem({
            key: 'objetivos',
            title: i18n.t('settings.dailyGoals'),
            expandedSections,
            content: renderGoalFields(settings, units, i18n),
          })}
          ${renderAccordionItem({
            key: 'medicacao',
            title: i18n.t('settings.medication'),
            expandedSections,
            content: renderMedicationSection(settings.medication ?? {}, i18n),
          })}
          ${renderAccordionItem({
            key: 'dashboard',
            title: i18n.t('settings.dashboardPreferences'),
            expandedSections,
            content: renderDashboardFields(settings, i18n),
          })}
        </div>
        <div class="form-actions">
          <button type="submit">${i18n.t('settings.save')}</button>
          <button type="button" data-action="reset">${i18n.t('common.reset')}</button>
        </div>
      </form>

      <div class="accordion">
        ${renderAccordionItem({
          key: 'backup',
          title: i18n.t('route.backupRestore'),
          expandedSections,
          content: renderBackupFields(backupStatus, i18n),
        })}
      </div>

      <section class="content-panel">
        <h2>${i18n.t('app.versionLabel')}</h2>
        <p class="settings-version">${i18n.t('app.name')} &middot; ${i18n.t('app.version', {
          version: state.app.appVersion,
        })}</p>
      </section>

      ${
        state.developer?.isEnabled
          ? `<div class="accordion">${renderAccordionItem({
              key: 'desenvolvedor',
              title: i18n.t('developer.title'),
              expandedSections,
              content: renderDeveloperSection(state.developer, i18n),
            })}</div>`
          : ''
      }
      ${state.developer?.confirmingAction ? renderDeveloperConfirmDialog(state.developer.confirmingAction, i18n) : ''}
    </section>
  `;
}

function renderAccordionItem({ key, title, expandedSections, content }) {
  const isOpen = expandedSections.includes(key);
  const headerId = `settings-accordion-header-${key}`;
  const panelId = `settings-accordion-panel-${key}`;

  return `
    <div class="accordion-item${isOpen ? ' is-open' : ''}">
      <button
        type="button"
        class="accordion-item__header"
        id="${headerId}"
        data-module="settings"
        data-action="toggleSection"
        data-section="${key}"
        aria-expanded="${isOpen}"
        aria-controls="${panelId}"
      >
        <span>${title}</span>
        <span class="accordion-item__chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false"><path d="m6 9 6 6 6-6"></path></svg>
        </span>
      </button>
      <div class="accordion-item__panel">
        <div class="accordion-item__panel-inner">
          <div class="accordion-item__body" id="${panelId}" role="region" aria-labelledby="${headerId}">
            ${content}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSystemFields(settings, units, i18n) {
  return `
    <div class="module-form">
      <label>
        <span>${i18n.t('settings.language')}</span>
        <select name="language">
          ${renderOptions(LANGUAGE_OPTIONS, settings.language ?? 'pt-BR', i18n)}
        </select>
      </label>
      <label>
        <span>${i18n.t('settings.theme')}</span>
        <select name="theme">
          ${renderOptions(THEME_OPTIONS, settings.theme ?? 'system', i18n)}
        </select>
      </label>
      ${renderUnits(units, i18n)}
    </div>
  `;
}

function renderProfileFields(settings, units, i18n) {
  return `
    <div class="form-subsection">
      <h3>${i18n.t('settings.personalInfo')}</h3>
      <div class="module-form">
        <label>
          <span>${i18n.t('settings.name')}</span>
          <input name="displayName" value="${valueOrEmpty(settings.displayName)}" />
        </label>
        <label>
          <span>${i18n.t('settings.sex')}</span>
          <select name="sex">
            ${renderOptions(sexOptions, settings.sex ?? '', i18n)}
          </select>
        </label>
        <label>
          <span>${i18n.t('settings.birthDate')}</span>
          <input name="birthDate" type="date" value="${valueOrEmpty(settings.birthDate)}" />
        </label>
        <label>
          <span>${i18n.t('settings.height')} (${units.measurement})</span>
          <input name="height" type="number" min="0" step="0.1" value="${numberOrEmpty(settings.height)}" />
        </label>
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.goal')}</h3>
      <div class="module-form">
        <label>
          <span>${i18n.t('settings.goal')}</span>
          <select name="healthGoal">
            ${renderOptions(goalOptions, settings.healthGoal ?? 'lose-weight', i18n)}
          </select>
        </label>
        <label>
          <span>${i18n.t('settings.activityLevel')}</span>
          <select name="activityLevel">
            ${renderOptions(activityOptions, settings.activityLevel ?? 'moderate', i18n)}
          </select>
        </label>
      </div>
    </div>
  `;
}

function renderGoalFields(settings, units, i18n) {
  return `
    <div class="form-subsection">
      <h3>${i18n.t('settings.weightGoals')}</h3>
      <div class="module-form">
        ${renderNumberField('currentWeight', 'settings.currentWeight', settings.currentWeight, units.weight, i18n)}
        ${renderNumberField('targetWeight', 'settings.targetWeight', settings.targetWeight, units.weight, i18n)}
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.nutritionGoals')}</h3>
      <div class="module-form">
        ${renderNumberField('calorieGoal', 'settings.calories', settings.calorieGoal, 'kcal', i18n)}
        ${renderNumberField('proteinGoal', 'settings.protein', settings.proteinGoal, 'g', i18n)}
        ${renderNumberField('carbsGoal', 'settings.carbohydrates', settings.carbsGoal, 'g', i18n)}
        ${renderNumberField('fatGoal', 'settings.fat', settings.fatGoal, 'g', i18n)}
        ${renderNumberField('fiberGoal', 'settings.fiber', settings.fiberGoal, 'g', i18n)}
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.hydration')}</h3>
      <div class="module-form">
        ${renderNumberField('waterGoal', 'settings.dailyWaterGoal', settings.waterGoal, 'mL', i18n)}
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.sleep')}</h3>
      <div class="module-form">
        ${renderNumberField('sleepGoal', 'settings.dailySleepGoal', settings.sleepGoal, 'h', i18n)}
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.steps')}</h3>
      <div class="module-form">
        ${renderNumberField('stepGoal', 'settings.dailyStepGoal', settings.stepGoal, '', i18n)}
      </div>
    </div>
  `;
}

function renderDashboardFields(settings, i18n) {
  return `
    <div class="form-subsection">
      <h3>${i18n.t('settings.visibleCards')}</h3>
      <div class="checkbox-grid">
        ${dashboardCards.map((card) => renderDashboardCheckbox(card, settings.dashboardCards, i18n)).join('')}
      </div>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.visibleMealSlots')}</h3>
      <p>${i18n.t('settings.visibleMealSlotsHint')}</p>
      <div class="checkbox-grid">
        ${OPTIONAL_MEAL_SLOTS.map((slot) => renderMealSlotCheckbox(slot, settings.mealSlots, i18n)).join('')}
      </div>
    </div>
  `;
}

function renderBackupFields(backupStatus, i18n) {
  return `
    <div class="form-subsection">
      <h3>${i18n.t('settings.backupExport')}</h3>
      ${renderMessage(backupStatus.message, 'success', i18n, backupStatus.messageParams)}
      ${renderMessage(backupStatus.error, 'error', i18n, backupStatus.errorParams)}
      <div class="form-actions">
        <button type="button" data-module="backup-restore" data-action="export">${i18n.t('backup.exportJson')}</button>
      </div>
      <textarea class="backup-textarea" readonly rows="8">${valueOrEmpty(backupStatus.exportText)}</textarea>
    </div>

    <div class="form-subsection">
      <h3>${i18n.t('settings.backupImport')}</h3>
      <form class="module-form module-form--single" data-module="backup-restore" data-action="import">
        <label class="module-form__wide">
          <span>${i18n.t('backup.json')}</span>
          <textarea name="importText" rows="8" placeholder="${i18n.t('backup.placeholder')}">${valueOrEmpty(
            backupStatus.importText,
          )}</textarea>
        </label>
        <div class="form-actions">
          <button type="submit">${i18n.t('backup.importJson')}</button>
        </div>
      </form>
    </div>
  `;
}

function renderDeveloperSection(developer, i18n) {
  const versions = developer.versions ?? {};
  const serviceWorkerActive = typeof navigator !== 'undefined' && Boolean(navigator.serviceWorker?.controller);

  return `
    ${renderMessage(developer.message, 'success', i18n)}
    <dl class="settings-units">
      <div>
        <dt>${i18n.t('developer.appVersionLabel')}</dt>
        <dd>${escapeHtml(versions.app)}</dd>
      </div>
      <div>
        <dt>${i18n.t('developer.databaseVersionLabel')}</dt>
        <dd>${escapeHtml(versions.database)}</dd>
      </div>
      <div>
        <dt>${i18n.t('developer.catalogVersionLabel')}</dt>
        <dd>${escapeHtml(versions.catalogCurrent)}</dd>
      </div>
      <div>
        <dt>${i18n.t('developer.catalogVersionStoredLabel')}</dt>
        <dd>${versions.catalogStored != null ? escapeHtml(versions.catalogStored) : i18n.t('developer.unknown')}</dd>
      </div>
      <div>
        <dt>${i18n.t('developer.serviceWorkerLabel')}</dt>
        <dd>${serviceWorkerActive ? i18n.t('developer.serviceWorkerActive') : i18n.t('developer.serviceWorkerInactive')}</dd>
      </div>
    </dl>
    <div class="form-actions">
      <button type="button" data-module="developer" data-action="reimportCatalog">${i18n.t('developer.reimportCatalog')}</button>
      <button type="button" data-export-logs>${i18n.t('developer.exportLogs')}</button>
      <button type="button" class="button-danger" data-module="developer" data-action="requestConfirm" data-tool="clearDatabase">${i18n.t('developer.clearDatabase')}</button>
      <button type="button" class="button-danger" data-module="developer" data-action="requestConfirm" data-tool="resetFirstLaunch">${i18n.t('developer.resetFirstLaunch')}</button>
    </div>
  `;
}

function renderDeveloperConfirmDialog(tool, i18n) {
  const titleKey = tool === 'resetFirstLaunch' ? 'developer.resetFirstLaunchConfirmTitle' : 'developer.clearDatabaseConfirmTitle';
  const messageKey =
    tool === 'resetFirstLaunch' ? 'developer.resetFirstLaunchConfirmMessage' : 'developer.clearDatabaseConfirmMessage';

  return `
    <button type="button" class="bottom-sheet-overlay" data-module="developer" data-action="cancelConfirm" aria-label="${i18n.t('common.close')}"></button>
    <div class="bottom-sheet" role="alertdialog" aria-modal="true" aria-label="${i18n.t(titleKey)}">
      <div class="bottom-sheet__header">
        <h2>${i18n.t(titleKey)}</h2>
        <button type="button" class="bottom-sheet__close" data-module="developer" data-action="cancelConfirm" aria-label="${i18n.t('common.close')}">×</button>
      </div>
      <p>${i18n.t(messageKey)}</p>
      <div class="form-actions">
        <button type="button" class="button-danger" data-module="developer" data-action="${tool}">${i18n.t('common.confirm')}</button>
        <button type="button" data-module="developer" data-action="cancelConfirm">${i18n.t('common.cancel')}</button>
      </div>
    </div>
  `;
}

function renderMedicationSection(medication, i18n) {
  const isEnabled = medication.enabled ?? true;

  return `
    <div class="module-form">
      <label class="checkbox-control">
        <input name="medicationEnabled" type="hidden" value="off" />
        <input name="medicationEnabled" type="checkbox" ${isEnabled ? 'checked' : ''} />
        <span>${i18n.t('settings.enableMedicationTracking')}</span>
      </label>
    </div>
    ${isEnabled ? renderMedicationFields(medication, i18n) : ''}
  `;
}

function renderMedicationFields(medication, i18n) {
  return `
    <div class="module-form">
      <label>
        <span>${i18n.t('settings.medicationName')}</span>
        <input name="medicationName" value="${valueOrEmpty(medication.name)}" />
      </label>
      <label>
        <span>${i18n.t('settings.administrationType')}</span>
        <select name="administrationType">
          ${renderOptions(administrationTypeOptions, medication.administrationType ?? 'injection', i18n)}
        </select>
      </label>
      <label>
        <span>${i18n.t('settings.frequency')}</span>
        <select name="frequency">
          ${renderOptions(frequencyOptions, medication.frequency ?? 'weekly', i18n)}
        </select>
      </label>
      ${renderNumberField('defaultDose', 'settings.defaultDose', medication.defaultDose, '', i18n)}
      <label>
        <span>${i18n.t('settings.doseUnit')}</span>
        <select name="doseUnit">
          ${renderOptions(doseUnitOptions, medication.doseUnit ?? 'mg', i18n)}
        </select>
      </label>
      <label>
        <span>${i18n.t('settings.applicationDay')}</span>
        <select name="applicationDay">
          ${renderOptions(dayOptions, medication.applicationDay ?? 'monday', i18n)}
        </select>
      </label>
      <label class="module-form__wide">
        <span>${i18n.t('settings.medicationNotes')}</span>
        <textarea name="medicationNotes" rows="3">${valueOrEmpty(medication.notes)}</textarea>
      </label>
    </div>
  `;
}

function renderOptions(options, currentValue, i18n) {
  return options
    .map(
      (option) => `
        <option value="${option.value}" ${selected(currentValue, option.value)}>
          ${i18n.t(option.labelKey)}
        </option>
      `,
    )
    .join('');
}

function renderUnits(units, i18n) {
  return `
    <div class="module-form__wide settings-units" aria-label="${i18n.t('settings.units')}">
      <h3>${i18n.t('settings.units')} (${i18n.t('common.automatic')})</h3>
      <p>${i18n.t('settings.unitsAutomatic')}</p>
      <dl>
        <div>
          <dt>${i18n.t('settings.weightUnit')}</dt>
          <dd>${units.weight}</dd>
        </div>
        <div>
          <dt>${i18n.t('settings.measurementUnit')}</dt>
          <dd>${units.measurement}</dd>
        </div>
        <div>
          <dt>${i18n.t('settings.dateFormat')}</dt>
          <dd>${units.dateFormat}</dd>
        </div>
      </dl>
    </div>
  `;
}

function renderNumberField(name, labelKey, value, unit, i18n) {
  return `
    <label>
      <span>${i18n.t(labelKey)}${unit ? ` (${escapeHtml(unit)})` : ''}</span>
      <input name="${name}" type="number" min="0" step="0.1" value="${numberOrEmpty(value)}" />
    </label>
  `;
}

function renderDashboardCheckbox(card, savedPreferences = {}, i18n) {
  const isChecked = savedPreferences?.[card.key] ?? true;
  const fieldName = `dashboardCard_${card.key}`;

  return `
    <label class="checkbox-control">
      <input name="${fieldName}" type="hidden" value="off" />
      <input name="${fieldName}" type="checkbox" ${isChecked ? 'checked' : ''} />
      <span>${i18n.t(card.labelKey)}</span>
    </label>
  `;
}

function renderMealSlotCheckbox(slot, savedMealSlots = {}, i18n) {
  const isChecked = savedMealSlots?.[slot] ?? false;
  const fieldName = `mealSlot_${slot}`;

  return `
    <label class="checkbox-control">
      <input name="${fieldName}" type="hidden" value="off" />
      <input name="${fieldName}" type="checkbox" ${isChecked ? 'checked' : ''} />
      <span>${i18n.t(`mealSlot.${slot}`)}</span>
    </label>
  `;
}
