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

export function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function nowIso() {
  return new Date().toISOString();
}
