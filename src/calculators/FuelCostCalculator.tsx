import { useState } from "react";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { InputField } from "@/components/InputField";
import { ResultDisplay, type ResultItem } from "@/components/ResultDisplay";
import { useSettings } from "@/context/SettingsContext";
import { calculateFuelCost } from "@/calculators/fuelCost";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";

export function FuelCostCalculator() {
  const [totalDistance, setTotalDistance] = useState("");
  const [fuelPricePerKm, setFuelPricePerKm] = useState("");
  const { freeDeliveryDistance } = useSettings();

  const totalDistanceError = validateNumberInput(totalDistance, {
    label: "Total distance",
    allowEmpty: true,
    min: 0,
  });
  const fuelPriceError = validateNumberInput(fuelPricePerKm, {
    label: "Fuel price per km",
    allowEmpty: true,
    min: 0,
  });

  const parsedTotalDistance = parseNumberInput(totalDistance);
  const parsedFuelPrice = parseNumberInput(fuelPricePerKm);

  const calculation =
    !totalDistanceError &&
    !fuelPriceError &&
    parsedTotalDistance !== null &&
    parsedFuelPrice !== null
      ? calculateFuelCost(
          parsedTotalDistance,
          parsedFuelPrice,
          freeDeliveryDistance,
        )
      : null;

  const results: ResultItem[] = calculation
    ? [
        {
          label: "Chargeable distance",
          value: calculation.chargeableDistance,
          kind: "number",
          helperText: `This is the distance after subtracting the free ${freeDeliveryDistance} km.`,
        },
        {
          label: "Transport cost",
          value: calculation.transportCost,
          emphasis: true,
          helperText:
            "Calculated by multiplying the chargeable distance by the fuel price per km.",
        },
      ]
    : [];

  const reset = () => {
    setTotalDistance("");
    setFuelPricePerKm("");
  };

  return (
    <CalculatorPanel
      title="Fuel Cost Calculator"
      description="Estimate transport cost after the free delivery distance has been covered."
      formula="Subtract the free delivery distance from the total trip. If anything remains, multiply it by the fuel price per km."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="input-grid">
          <InputField
            id="fuel-total-distance"
            label="Total distance"
            description="The full travel distance for the delivery or trip."
            placeholder="22"
            value={totalDistance}
            min={0}
            suffix="km"
            error={totalDistanceError}
            onChange={setTotalDistance}
          />
          <InputField
            id="fuel-price-per-km"
            label="Fuel price per km"
            description="Enter the travel cost for each kilometer you want to use for the estimate."
            placeholder="4.5"
            value={fuelPricePerKm}
            min={0}
            error={fuelPriceError}
            onChange={setFuelPricePerKm}
          />
        </div>

        <ResultDisplay
          heading="Result"
          description="If the total distance is less than the free delivery setting, the transport cost stays at zero."
          items={results}
          emptyMessage="Enter the trip distance and fuel price to estimate the transport cost."
        />
      </div>
    </CalculatorPanel>
  );
}
