export function calculateBaseValueFromVatInclusiveAmount(
  totalWithVat: number,
  vatPercentage: number,
) {
  return totalWithVat / (1 + vatPercentage / 100);
}
