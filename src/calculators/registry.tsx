import type { ComponentType } from "react";
import type { CalculatorId } from "@/constants/calculators";
import { PercentageValueCalculator } from "@/calculators/PercentageValueCalculator";
import { BaseValueFromVatCalculator } from "@/calculators/BaseValueFromVatCalculator";
import { DiscountWithVatCalculator } from "@/calculators/DiscountWithVatCalculator";
import { DiscountWithoutVatCalculator } from "@/calculators/DiscountWithoutVatCalculator";
import { FuelCostCalculator } from "@/calculators/FuelCostCalculator";

export const calculatorRegistry: Record<CalculatorId, ComponentType> = {
  "percentage-value": PercentageValueCalculator,
  "base-value-from-vat": BaseValueFromVatCalculator,
  "discount-with-vat": DiscountWithVatCalculator,
  "discount-without-vat": DiscountWithoutVatCalculator,
  "fuel-cost": FuelCostCalculator,
};
