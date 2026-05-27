import type { ComponentType } from 'react';
import type { CalculatorId } from '../constants/calculators';
import { BaseFromVatCalculator } from './BaseFromVatCalculator';
import { DiscountWithoutVatCalculator } from './DiscountWithoutVatCalculator';
import { DiscountWithVatCalculator } from './DiscountWithVatCalculator';
import { FuelCostCalculator } from './FuelCostCalculator';
import { PercentageValueCalculator } from './PercentageValueCalculator';
import {
  VatThenAddPercentageCalculator,
  VatThenSubtractPercentageCalculator,
} from './VatThenAdditionalCalculator';

export const CALCULATOR_COMPONENTS: Record<
  CalculatorId,
  ComponentType
> = {
  'percentage-value': PercentageValueCalculator,
  'base-from-vat': BaseFromVatCalculator,
  'vat-then-add-percentage': VatThenAddPercentageCalculator,
  'vat-then-subtract-percentage': VatThenSubtractPercentageCalculator,
  'discount-with-vat': DiscountWithVatCalculator,
  'discount-without-vat': DiscountWithoutVatCalculator,
  'fuel-cost': FuelCostCalculator,
};
