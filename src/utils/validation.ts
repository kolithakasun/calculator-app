export function requiredNonNegativeMessage(
  value: string,
  fieldLabel: string,
): string | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    return `Please enter a valid number for ${fieldLabel}.`;
  }
  if (parsed < 0) {
    return `${fieldLabel} cannot be negative.`;
  }
  return undefined;
}

export function requiredPositiveMessage(
  value: string,
  fieldLabel: string,
): string | undefined {
  const base = requiredNonNegativeMessage(value, fieldLabel);
  if (base) return base;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  if (Number(trimmed) === 0) {
    return `${fieldLabel} must be greater than zero.`;
  }
  return undefined;
}

export function requiredPercentageMessage(
  value: string,
  fieldLabel: string,
): string | undefined {
  const base = requiredNonNegativeMessage(value, fieldLabel);
  if (base) return base;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  const parsed = Number(trimmed);
  if (parsed > 100) {
    return `${fieldLabel} cannot be more than 100%.`;
  }
  return undefined;
}

export function settingsPercentageMessage(
  value: string,
  fieldLabel: string,
): string | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return `${fieldLabel} is required.`;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return `Please enter a valid ${fieldLabel.toLowerCase()}.`;
  }
  if (parsed > 100) {
    return `${fieldLabel} cannot be more than 100%.`;
  }
  return undefined;
}
