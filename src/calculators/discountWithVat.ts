export type DiscountWithVatResult = {
  discountAmount: number;
  finalValue: number;
};

export function calculateDiscountWithVat(
  totalWithVat: number,
  discountPercentage: number,
): DiscountWithVatResult {
  const discountAmount = (totalWithVat * discountPercentage) / 100;
  const finalValue = totalWithVat - discountAmount;
  return { discountAmount, finalValue };
}
