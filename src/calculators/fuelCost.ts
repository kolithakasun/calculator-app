export function calculateFuelCost(
  totalDistanceKm: number,
  fuelPricePerKm: number,
  freeDeliveryDistanceKm: number,
): { chargeableDistanceKm: number; transportCost: number } {
  const chargeableDistanceKm = Math.max(
    totalDistanceKm - freeDeliveryDistanceKm,
    0,
  );
  const transportCost = chargeableDistanceKm * fuelPricePerKm;
  return { chargeableDistanceKm, transportCost };
}
