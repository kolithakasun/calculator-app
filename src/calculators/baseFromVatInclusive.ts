export function calculateBaseFromVatInclusive(
  totalWithVat: number,
  vatPercentage: number,
): number {
  return totalWithVat / (1 + vatPercentage / 100);
}

export function calculateVatAmountFromTotal(
  totalWithVat: number,
  vatPercentage: number,
): number {
  const base = calculateBaseFromVatInclusive(totalWithVat, vatPercentage);
  return totalWithVat - base;
}
