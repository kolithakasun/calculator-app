export type CalculatorId =
  | "percentage-value"
  | "base-value-from-vat"
  | "discount-with-vat"
  | "discount-without-vat"
  | "fuel-cost";

export interface CalculatorTab {
  id: CalculatorId;
  label: string;
  description: string;
}

export const CALCULATOR_TABS: CalculatorTab[] = [
  {
    id: "percentage-value",
    label: "Percentage Value",
    description: "Find a percentage of a base amount.",
  },
  {
    id: "base-value-from-vat",
    label: "Base Value from VAT",
    description: "Get the value before VAT from a VAT-inclusive total.",
  },
  {
    id: "discount-with-vat",
    label: "Discount with VAT",
    description: "Apply a discount to the total amount including VAT.",
  },
  {
    id: "discount-without-vat",
    label: "Discount without VAT",
    description: "Discount the base amount, then add VAT.",
  },
  {
    id: "fuel-cost",
    label: "Fuel Cost",
    description: "Estimate transport cost after the free delivery distance.",
  },
];

export const DEFAULT_CALCULATOR_ID: CalculatorId = "percentage-value";
