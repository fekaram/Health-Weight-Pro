export function deepFreeze(value) {
  if (!value || typeof value !== 'object') {
    return value;
  }

  Object.freeze(value);
  Object.values(value).forEach((childValue) => deepFreeze(childValue));

  return value;
}
