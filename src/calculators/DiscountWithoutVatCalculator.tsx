import { useState } from "react";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { InputField } from "@/components/InputField";
import { ResultDisplay, type ResultItem } from "@/components/ResultDisplay";
import { useSettings } from "@/context/SettingsContext";
import { calculateDiscountWithoutVat } from "@/calculators/discountWithoutVat";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";

export function DiscountWithoutVatCalculator() {
  const [totalWithoutVat, setTotalWithoutVat] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const { vatPercentage } = useSettings();

  const totalWithoutVatError = validateNumberInput(totalWithoutVat, {
    label: "Total amount without VAT",
    allowEmpty: true,
    min: 0,
  });
  const discountPercentageError = validateNumberInput(discountPercentage, {
    label: "Discount percentage",
    allowEmpty: true,
    min: 0,
    max: 100,
  });

  const parsedTotalWithoutVat = parseNumberInput(totalWithoutVat);
  const parsedDiscountPercentage = parseNumberInput(discountPercentage);

  const calculation =
    !totalWithoutVatError &&
    !discountPercentageError &&
    parsedTotalWithoutVat !== null &&
    parsedDiscountPercentage !== null
      ? calculateDiscountWithoutVat(
          parsedTotalWithoutVat,
          parsedDiscountPercentage,
          vatPercentage,
        )
      : null;

  const results: ResultItem[] = calculation
    ? [
        {
          label: "Discount amount",
          value: calculation.discountAmount,
        },
        {
          label: "Discounted base value",
          value: calculation.discountedBaseValue,
          helperText: "This is the value after discount and before VAT is added.",
        },
        {
          label: "VAT amount",
          value: calculation.vatAmount,
          helperText: `Using the shared VAT setting of ${vatPercentage}%.`,
        },
        {
          label: "Final value including VAT",
          value: calculation.finalValue,
          emphasis: true,
        },
      ]
    : [];

  const reset = () => {
    setTotalWithoutVat("");
    setDiscountPercentage("");
  };

  return (
    <CalculatorPanel
      title="Discount without VAT"
      description="Use this when the discount should be applied before VAT is added."
      formula="Reduce the base amount by the discount, calculate VAT on the reduced base, then add them together."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="input-grid">
          <InputField
            id="discount-without-vat-total"
            label="Total amount without VAT"
            description="The base amount before VAT or discount."
            placeholder="2000"
            value={totalWithoutVat}
            min={0}
            error={totalWithoutVatError}
            onChange={setTotalWithoutVat}
          />
          <InputField
            id="discount-without-vat-rate"
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
          description="The VAT setting is applied after the discount reduces the base value."
          items={results}
          emptyMessage="Enter the base amount and discount percentage to calculate the final value."
        />
      </div>
    </CalculatorPanel>
  );
}
