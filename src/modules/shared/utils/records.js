export function sortByDateDesc(records, fieldName) {
  return [...records].sort((left, right) => String(right[fieldName]).localeCompare(String(left[fieldName])));
}

export function sortByField(records, fieldName) {
  return [...records].sort((left, right) => String(left[fieldName]).localeCompare(String(right[fieldName])));
}

export function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

// The single centralized local-date utility. Business dates (meal date, weight date,
// medication date, habit date, dashboard "today") must always use the device's local
// calendar day — never `toISOString()`, which is UTC and rolls over to the next day in
// the evening for any timezone behind UTC (e.g. Brazil, UTC-3).
export function todayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Parses a 'YYYY-MM-DD' business-date string into a local Date (midnight local time),
// so formatting it (e.g. with Intl.DateTimeFormat) never shifts the day backward/forward.
// Never use `new Date('YYYY-MM-DD')` directly — that parses as UTC midnight.
export function parseLocalDate(dateString) {
  const [year, month, day] = String(dateString).slice(0, 10).split('-').map(Number);

  return new Date(year, (month || 1) - 1, day || 1);
}

export function nowIso() {
  return new Date().toISOString();
}
