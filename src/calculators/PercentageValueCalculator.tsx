import { useState } from "react";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { InputField } from "@/components/InputField";
import { ResultDisplay, type ResultItem } from "@/components/ResultDisplay";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";
import { calculatePercentageValue } from "@/calculators/percentageValue";

export function PercentageValueCalculator() {
  const [baseValue, setBaseValue] = useState("");
  const [percentage, setPercentage] = useState("");

  const baseValueError = validateNumberInput(baseValue, {
    label: "Base value",
    allowEmpty: true,
    min: 0,
  });
  const percentageError = validateNumberInput(percentage, {
    label: "Percentage",
    allowEmpty: true,
    min: 0,
  });

  const parsedBaseValue = parseNumberInput(baseValue);
  const parsedPercentage = parseNumberInput(percentage);

  const results: ResultItem[] =
    !baseValueError &&
    !percentageError &&
    parsedBaseValue !== null &&
    parsedPercentage !== null
      ? [
          {
            label: "Percentage value",
            value: calculatePercentageValue(parsedBaseValue, parsedPercentage),
            emphasis: true,
            helperText: "This is the portion taken from the base value.",
          },
        ]
      : [];

  const reset = () => {
    setBaseValue("");
    setPercentage("");
  };

  return (
    <CalculatorPanel
      title="Percentage Value Calculator"
      description="Use this when you need to quickly find part of an amount, such as 18% of a price."
      formula="Base value multiplied by the percentage, then divided by 100."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="input-grid">
          <InputField
            id="percentage-base-value"
            label="Base value"
            description="The full amount you want to calculate from."
            placeholder="250"
            value={baseValue}
            min={0}
            error={baseValueError}
            onChange={setBaseValue}
          />
          <InputField
            id="percentage-value-rate"
            label="Percentage"
            description="The portion you want to find."
            placeholder="18"
            value={percentage}
            min={0}
            suffix="%"
            error={percentageError}
            onChange={setPercentage}
          />
        </div>

        <ResultDisplay
          heading="Result"
          description="The result updates as soon as both values are valid."
          items={results}
          emptyMessage="Enter a base value and percentage to calculate the result."
        />
      </div>
    </CalculatorPanel>
  );
}
