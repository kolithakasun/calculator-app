import { useState } from "react";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { InputField } from "@/components/InputField";
import { ResultDisplay, type ResultItem } from "@/components/ResultDisplay";
import { useSettings } from "@/context/SettingsContext";
import { calculateBaseValueFromVatInclusiveAmount } from "@/calculators/baseValueFromVat";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";

export function BaseValueFromVatCalculator() {
  const [totalWithVat, setTotalWithVat] = useState("");
  const { vatPercentage } = useSettings();

  const totalWithVatError = validateNumberInput(totalWithVat, {
    label: "Total value including VAT",
    allowEmpty: true,
    min: 0,
  });

  const parsedTotalWithVat = parseNumberInput(totalWithVat);

  const results: ResultItem[] =
    !totalWithVatError && parsedTotalWithVat !== null
      ? [
          {
            label: "Base value without VAT",
            value: calculateBaseValueFromVatInclusiveAmount(
              parsedTotalWithVat,
              vatPercentage,
            ),
            emphasis: true,
            helperText: `Calculated using the shared VAT setting of ${vatPercentage}%.`,
          },
        ]
      : [];

  const reset = () => {
    setTotalWithVat("");
  };

  return (
    <CalculatorPanel
      title="Base Value from VAT-Inclusive Amount"
      description="Enter the final amount that already includes VAT to estimate the value before VAT was added."
      formula="Take the VAT-inclusive total and divide it by one plus the VAT rate."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="input-grid">
          <InputField
            id="vat-inclusive-total"
            label="Total value including VAT"
            description="For example, the final billed amount paid by the customer."
            placeholder="1180"
            value={totalWithVat}
            min={0}
            error={totalWithVatError}
            onChange={setTotalWithVat}
          />
        </div>

        <ResultDisplay
          heading="Result"
          description="The shared VAT percentage is applied automatically."
          items={results}
          emptyMessage="Enter a VAT-inclusive total to find the base value."
        />
      </div>
    </CalculatorPanel>
  );
}
