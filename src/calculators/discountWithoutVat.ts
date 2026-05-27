export type DiscountWithoutVatResult = {
  discountAmount: number;
  discountedBase: number;
  vatAmount: number;
  finalValue: number;
};

export function calculateDiscountWithoutVat(
  totalWithoutVat: number,
  discountPercentage: number,
  vatPercentage: number,
): DiscountWithoutVatResult {
  const discountAmount = (totalWithoutVat * discountPercentage) / 100;
  const discountedBase = totalWithoutVat - discountAmount;
  const vatAmount = (discountedBase * vatPercentage) / 100;
  const finalValue = discountedBase + vatAmount;
  return { discountAmount, discountedBase, vatAmount, finalValue };
}
