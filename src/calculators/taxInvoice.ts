export type TaxInvoiceResult = {
  subtotal: number;
  vatAmount: number;
  totalAfterVat: number;
  retentionAmount: number;
  grandTotal: number;
};

/** Subtotal is the amount before VAT (e.g. line item total on invoice). */
export function calculateTaxInvoice(
  subtotal: number,
  vatPercentage: number,
  retentionPercentage: number,
): TaxInvoiceResult {
  const vatAmount = (subtotal * vatPercentage) / 100;
  const totalAfterVat = subtotal + vatAmount;
  const retentionAmount = (totalAfterVat * retentionPercentage) / 100;
  const grandTotal = totalAfterVat - retentionAmount;
  return {
    subtotal,
    vatAmount,
    totalAfterVat,
    retentionAmount,
    grandTotal,
  };
}
