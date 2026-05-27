export type CalculatorId =
  | 'percentage-value'
  | 'base-from-vat'
  | 'vat-then-add-percentage'
  | 'vat-then-subtract-percentage'
  | 'tax-invoice'
  | 'discount-with-vat'
  | 'discount-without-vat'
  | 'fuel-cost';

export type CalculatorMeta = {
  id: CalculatorId;
  label: string;
  shortDescription: string;
};

export const CALCULATORS: CalculatorMeta[] = [
  {
    id: 'percentage-value',
    label: 'Percentage value',
    shortDescription: 'Find how much a percentage is of any amount.',
  },
  {
    id: 'base-from-vat',
    label: 'Price before VAT',
    shortDescription: 'Work out the amount before VAT from a VAT-inclusive total.',
  },
  {
    id: 'vat-then-add-percentage',
    label: 'VAT + add %',
    shortDescription: 'Base amount, add VAT, then add a percentage on the subtotal.',
  },
  {
    id: 'vat-then-subtract-percentage',
    label: 'VAT − subtract %',
    shortDescription: 'Base amount, add VAT, then subtract a percentage from the subtotal.',
  },
  {
    id: 'tax-invoice',
    label: 'Tax invoice',
    shortDescription: 'Subtotal given: add VAT, then subtract retention % for grand total.',
  },
  {
    id: 'discount-with-vat',
    label: 'Discount (on total with VAT)',
    shortDescription: 'Apply a discount to a price that already includes VAT.',
  },
  {
    id: 'discount-without-vat',
    label: 'Discount (before VAT)',
    shortDescription: 'Apply a discount to the price before VAT, then add VAT again.',
  },
  {
    id: 'fuel-cost',
    label: 'Delivery / fuel cost',
    shortDescription: 'Estimate transport cost based on distance and fuel price.',
  },
];
