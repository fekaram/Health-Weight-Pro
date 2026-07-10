export function createKeyRange(query = {}) {
  if (query.only !== undefined) {
    return IDBKeyRange.only(query.only);
  }

  if (query.lower !== undefined && query.upper !== undefined) {
    return IDBKeyRange.bound(
      query.lower,
      query.upper,
      query.excludeLower ?? false,
      query.excludeUpper ?? false,
    );
  }

  if (query.lower !== undefined) {
    return IDBKeyRange.lowerBound(query.lower, query.excludeLower ?? false);
  }

  if (query.upper !== undefined) {
    return IDBKeyRange.upperBound(query.upper, query.excludeUpper ?? false);
  }

  return null;
}

export function normalizeCursorDirection(direction = 'next') {
  const allowedDirections = new Set(['next', 'nextunique', 'prev', 'prevunique']);

  if (!allowedDirections.has(direction)) {
    throw new Error(`Unsupported cursor direction "${direction}".`);
  }

  return direction;
}
