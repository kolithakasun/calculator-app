export function calculateDiscountWithoutVat(
  totalWithoutVat: number,
  discountPercentage: number,
  vatPercentage: number,
) {
  const discountAmount = (totalWithoutVat * discountPercentage) / 100;
  const discountedBaseValue = totalWithoutVat - discountAmount;
  const vatAmount = (discountedBaseValue * vatPercentage) / 100;
  const finalValue = discountedBaseValue + vatAmount;

  return {
    discountAmount,
    discountedBaseValue,
    vatAmount,
    finalValue,
  };
}
