export function calculateFuelCost(
  totalDistance: number,
  fuelPricePerKm: number,
  freeDeliveryDistance: number,
) {
  const chargeableDistance = Math.max(totalDistance - freeDeliveryDistance, 0);
  const transportCost = chargeableDistance * fuelPricePerKm;

  return {
    chargeableDistance,
    transportCost,
  };
}
