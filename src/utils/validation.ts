export interface NumberValidationOptions {
  label: string;
  min?: number;
  max?: number;
  allowEmpty?: boolean;
}

export function parseNumberInput(value: string): number | null {
  if (!value.trim()) {
    return null;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export function validateNumberInput(
  value: string,
  options: NumberValidationOptions,
): string | undefined {
  const { allowEmpty = false, label, min, max } = options;

  if (!value.trim()) {
    return allowEmpty ? undefined : `${label} is required.`;
  }

  const parsedValue = parseNumberInput(value);

  if (parsedValue === null) {
    return `Enter a valid number for ${label.toLowerCase()}.`;
  }

  if (min !== undefined && parsedValue < min) {
    return `${label} cannot be less than ${min}.`;
  }

  if (max !== undefined && parsedValue > max) {
    return `${label} cannot be more than ${max}.`;
  }

  return undefined;
}
