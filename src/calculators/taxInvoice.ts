export type TaxInvoiceResult = {
  baseAmount: number;
  vatAmount: number;
  subTotal: number;
  retentionAmount: number;
  grandTotal: number;
};

export function calculateTaxInvoice(
  quantity: number,
  rate: number,
  vatPercentage: number,
  retentionPercentage: number,
): TaxInvoiceResult {
  const baseAmount = quantity * rate;
  const vatAmount = (baseAmount * vatPercentage) / 100;
  const subTotal = baseAmount + vatAmount;
  const retentionAmount = (subTotal * retentionPercentage) / 100;
  const grandTotal = subTotal - retentionAmount;
  return {
    baseAmount,
    vatAmount,
    subTotal,
    retentionAmount,
    grandTotal,
  };
}
