import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Result } from '../components/Result';
import { useSettings } from '../context/SettingsContext';
import {
  formatCurrency,
  formatDistanceKm,
  parseNonNegative,
} from '../utils/numbers';
import { requiredNonNegativeMessage } from '../utils/validation';
import { buildFuelCostSheet } from '../utils/excelSheets/buildSheets';
import { calculateFuelCost } from './fuelCost';

export function FuelCostCalculator() {
  const { freeDeliveryDistanceKm } = useSettings();
  const [totalDistance, setTotalDistance] = useState('');
  const [fuelPricePerKm, setFuelPricePerKm] = useState('');

  const distanceError = requiredNonNegativeMessage(
    totalDistance,
    'Total distance',
  );
  const priceError = requiredNonNegativeMessage(
    fuelPricePerKm,
    'Fuel price per km',
  );

  const results = useMemo(() => {
    if (distanceError || priceError) return null;
    const distance = parseNonNegative(totalDistance);
    const price = parseNonNegative(fuelPricePerKm);
    if (distance === null || price === null) return null;
    return calculateFuelCost(
      distance,
      price,
      freeDeliveryDistanceKm,
    );
  }, [
    totalDistance,
    fuelPricePerKm,
    distanceError,
    priceError,
    freeDeliveryDistanceKm,
  ]);

  const excelSheet = useMemo(
    () =>
      buildFuelCostSheet({
        distanceRaw: totalDistance,
        priceRaw: fuelPricePerKm,
        freeDeliveryKm: freeDeliveryDistanceKm,
        distance: parseNonNegative(totalDistance),
        pricePerKm: parseNonNegative(fuelPricePerKm),
        chargeableKm: results?.chargeableDistanceKm ?? null,
        transportCost: results?.transportCost ?? null,
      }),
    [totalDistance, fuelPricePerKm, freeDeliveryDistanceKm, results],
  );

  const reset = () => {
    setTotalDistance('');
    setFuelPricePerKm('');
  };

  return (
    <Card
      title="Delivery / fuel cost"
      excelSheet={excelSheet}
      description="Estimate transport cost for a delivery. The first part of the distance is free; only the remaining distance is charged."
      formula={`Chargeable distance = the part of the trip beyond your free ${freeDeliveryDistanceKm} km. Transport cost = chargeable distance × fuel price per km.`}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="fc-distance"
            label="Total distance (km)"
            description="The full delivery distance."
            placeholder="e.g. 25"
            value={totalDistance}
            onChange={setTotalDistance}
            error={distanceError}
            min={0}
            step="0.1"
          />
          <Input
            id="fc-price"
            label="Fuel price per km"
            description="Your transport cost for each chargeable kilometer."
            placeholder="e.g. 50"
            value={fuelPricePerKm}
            onChange={setFuelPricePerKm}
            error={priceError}
            min={0}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label="Chargeable distance"
            value={
              results
                ? formatDistanceKm(results.chargeableDistanceKm)
                : 'Enter values above'
            }
            hint={`First ${formatDistanceKm(freeDeliveryDistanceKm)} are free`}
          />
          <Result
            label="Transport cost"
            value={results ? formatCurrency(results.transportCost) : '—'}
            highlight
          />
        </div>
      </div>
    </Card>
  );
}
