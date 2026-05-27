import { useState } from "react";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { InputField } from "@/components/InputField";
import { ResultDisplay, type ResultItem } from "@/components/ResultDisplay";
import { calculateDiscountWithVat } from "@/calculators/discountWithVat";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";

export function DiscountWithVatCalculator() {
  const [totalWithVat, setTotalWithVat] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  const totalWithVatError = validateNumberInput(totalWithVat, {
    label: "Total amount including VAT",
    allowEmpty: true,
    min: 0,
  });
  const discountPercentageError = validateNumberInput(discountPercentage, {
    label: "Discount percentage",
    allowEmpty: true,
    min: 0,
    max: 100,
  });

  const parsedTotalWithVat = parseNumberInput(totalWithVat);
  const parsedDiscountPercentage = parseNumberInput(discountPercentage);

  const calculation =
    !totalWithVatError &&
    !discountPercentageError &&
    parsedTotalWithVat !== null &&
    parsedDiscountPercentage !== null
      ? calculateDiscountWithVat(parsedTotalWithVat, parsedDiscountPercentage)
      : null;

  const results: ResultItem[] = calculation
    ? [
        {
          label: "Discount amount",
          value: calculation.discountAmount,
          helperText: "This amount is removed from the VAT-inclusive total.",
        },
        {
          label: "Final value after discount",
          value: calculation.finalValue,
          emphasis: true,
        },
      ]
    : [];

  const reset = () => {
    setTotalWithVat("");
    setDiscountPercentage("");
  };

  return (
    <CalculatorPanel
      title="Discount with VAT"
      description="Use this when the discount is applied to the final amount that already includes VAT."
      formula="Find the discount from the VAT-inclusive total, then subtract it from that same total."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="input-grid">
          <InputField
            id="discount-with-vat-total"
            label="Total amount including VAT"
            description="The full amount before the discount is applied."
            placeholder="2500"
            value={totalWithVat}
            min={0}
            error={totalWithVatError}
            onChange={setTotalWithVat}
          />
          <InputField
            id="discount-with-vat-rate"
            label="Discount percentage"
            description="Enter a value between 0 and 100."
            placeholder="10"
            value={discountPercentage}
            min={0}
            max={100}
            suffix="%"
            error={discountPercentageError}
            onChange={setDiscountPercentage}
          />
        </div>

        <ResultDisplay
          heading="Result"
          description="Discount and final value update automatically when the inputs are valid."
          items={results}
          emptyMessage="Enter the total amount and discount percentage to calculate the final value."
        />
      </div>
    </CalculatorPanel>
  );
}
