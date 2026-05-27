export type VatThenAdditionalOperation = 'add' | 'subtract';

export type VatThenAdditionalResult = {
  vatAmount: number;
  subTotal: number;
  additionalAmount: number;
  grandTotal: number;
};

export function calculateVatThenAdditional(
  baseAmount: number,
  vatPercentage: number,
  additionalPercentage: number,
  operation: VatThenAdditionalOperation,
): VatThenAdditionalResult {
  const vatAmount = (baseAmount * vatPercentage) / 100;
  const subTotal = baseAmount + vatAmount;
  const additionalAmount = (subTotal * additionalPercentage) / 100;
  const grandTotal =
    operation === 'add'
      ? subTotal + additionalAmount
      : subTotal - additionalAmount;

  return { vatAmount, subTotal, additionalAmount, grandTotal };
}
