export function calculateDiscountWithVat(
  totalWithVat: number,
  discountPercentage: number,
) {
  const discountAmount = (totalWithVat * discountPercentage) / 100;
  const finalValue = totalWithVat - discountAmount;

  return {
    discountAmount,
    finalValue,
  };
}
