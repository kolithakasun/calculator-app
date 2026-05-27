/** Plain number for typing or copying into Excel (no currency symbol). */
export function toExcelNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace(/\.?0+$/, (match) =>
    match.startsWith('.') ? '' : match,
  );
}

export function excelInputDisplay(
  rawInput: string,
  parsed: number | null,
  decimals = 2,
): string {
  const trimmed = rawInput.trim();
  if (trimmed !== '') return trimmed;
  if (parsed !== null) return toExcelNumber(parsed, decimals);
  return '';
}

export function excelPreview(
  value: number | null | undefined,
  decimals = 2,
): string {
  if (value === null || value === undefined) return '—';
  return toExcelNumber(value, decimals);
}
