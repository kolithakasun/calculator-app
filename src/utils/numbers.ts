export function parseNonNegative(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

export function parsePositive(value: string): number | null {
  const parsed = parseNonNegative(value);
  if (parsed === null || parsed === 0) return null;
  return parsed;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${formatNumber(value, 1)}%`;
}

export function formatDistanceKm(value: number): string {
  return `${formatNumber(value, 1)} km`;
}
