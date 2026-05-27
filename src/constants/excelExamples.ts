import type { CalculatorId } from './calculators';

export type ExcelGuideRow = {
  row: number;
  label: string;
  cell: string;
  entry: string;
  isFormula?: boolean;
  highlight?: boolean;
};

export type ExcelGuide = {
  intro: string;
  rows: ExcelGuideRow[];
  tip?: string;
};

export const EXCEL_EXAMPLES: Record<CalculatorId, ExcelGuide> = {
  'percentage-value': {
    intro:
      'Put your numbers in column A. Use the formula in column B to get the percentage value.',
    rows: [
      { row: 1, label: 'Base amount', cell: 'A1', entry: '10000' },
      { row: 2, label: 'Percentage (%)', cell: 'A2', entry: '15' },
      {
        row: 3,
        label: 'Percentage value',
        cell: 'B1',
        entry: '=A1*A2/100',
        isFormula: true,
        highlight: true,
      },
    ],
    tip: 'In Excel you can also write =A1*15% if A2 holds 15 as a number.',
  },

  'base-from-vat': {
    intro:
      'You know the total including VAT. Work backward to find the base and VAT amount.',
    rows: [
      { row: 1, label: 'Total including VAT', cell: 'A1', entry: '11800' },
      {
        row: 2,
        label: 'VAT % (same as app setting)',
        cell: 'A2',
        entry: '18',
      },
      {
        row: 3,
        label: 'Base (before VAT)',
        cell: 'B1',
        entry: '=A1/(1+A2/100)',
        isFormula: true,
        highlight: true,
      },
      {
        row: 4,
        label: 'VAT amount',
        cell: 'B2',
        entry: '=A1-B1',
        isFormula: true,
      },
    ],
    tip: 'Change A2 when you change VAT % in the app settings.',
  },

  'vat-then-add-percentage': {
    intro:
      'Same steps as a typical invoice: base, add VAT, then add a percentage on the subtotal.',
    rows: [
      { row: 1, label: 'Base amount', cell: 'A1', entry: '289725' },
      { row: 2, label: 'VAT %', cell: 'A2', entry: '18' },
      {
        row: 3,
        label: 'VAT amount',
        cell: 'B1',
        entry: '=A1*A2/100',
        isFormula: true,
      },
      {
        row: 4,
        label: 'Subtotal (base + VAT)',
        cell: 'B2',
        entry: '=A1+B1',
        isFormula: true,
      },
      { row: 5, label: 'Additional % (on subtotal)', cell: 'A3', entry: '10' },
      {
        row: 6,
        label: 'Additional amount',
        cell: 'B3',
        entry: '=B2*A3/100',
        isFormula: true,
      },
      {
        row: 7,
        label: 'Grand total',
        cell: 'B4',
        entry: '=B2+B3',
        isFormula: true,
        highlight: true,
      },
    ],
    tip: 'Sample matches: 289,725 + 18% VAT + 10% on subtotal → 376,063.05',
  },

  'vat-then-subtract-percentage': {
    intro:
      'Base, add VAT, then subtract a percentage from the subtotal (not from the base alone).',
    rows: [
      { row: 1, label: 'Base amount', cell: 'A1', entry: '289725' },
      { row: 2, label: 'VAT %', cell: 'A2', entry: '18' },
      {
        row: 3,
        label: 'VAT amount',
        cell: 'B1',
        entry: '=A1*A2/100',
        isFormula: true,
      },
      {
        row: 4,
        label: 'Subtotal (base + VAT)',
        cell: 'B2',
        entry: '=A1+B1',
        isFormula: true,
      },
      { row: 5, label: 'Reduction % (on subtotal)', cell: 'A3', entry: '10' },
      {
        row: 6,
        label: 'Reduction amount',
        cell: 'B3',
        entry: '=B2*A3/100',
        isFormula: true,
      },
      {
        row: 7,
        label: 'Grand total',
        cell: 'B4',
        entry: '=B2-B3',
        isFormula: true,
        highlight: true,
      },
    ],
  },

  'discount-with-vat': {
    intro: 'Discount is calculated on the price that already includes VAT.',
    rows: [
      { row: 1, label: 'Total including VAT', cell: 'A1', entry: '11800' },
      { row: 2, label: 'Discount %', cell: 'A2', entry: '10' },
      {
        row: 3,
        label: 'Discount amount',
        cell: 'B1',
        entry: '=A1*A2/100',
        isFormula: true,
      },
      {
        row: 4,
        label: 'Final price after discount',
        cell: 'B2',
        entry: '=A1-B1',
        isFormula: true,
        highlight: true,
      },
    ],
  },

  'discount-without-vat': {
    intro:
      'Discount applies to the amount before VAT. VAT is then calculated on the discounted base.',
    rows: [
      { row: 1, label: 'Total without VAT', cell: 'A1', entry: '10000' },
      { row: 2, label: 'Discount %', cell: 'A2', entry: '10' },
      { row: 3, label: 'VAT % (app setting)', cell: 'A3', entry: '18' },
      {
        row: 4,
        label: 'Discount amount',
        cell: 'B1',
        entry: '=A1*A2/100',
        isFormula: true,
      },
      {
        row: 5,
        label: 'Price after discount (before VAT)',
        cell: 'B2',
        entry: '=A1-B1',
        isFormula: true,
      },
      {
        row: 6,
        label: 'VAT amount',
        cell: 'B3',
        entry: '=B2*A3/100',
        isFormula: true,
      },
      {
        row: 7,
        label: 'Final price including VAT',
        cell: 'B4',
        entry: '=B2+B3',
        isFormula: true,
        highlight: true,
      },
    ],
  },

  'fuel-cost': {
    intro:
      'First distance is free (app setting). Only chargeable kilometers are multiplied by price per km.',
    rows: [
      { row: 1, label: 'Total distance (km)', cell: 'A1', entry: '25' },
      {
        row: 2,
        label: 'Free delivery distance (km)',
        cell: 'A2',
        entry: '15',
      },
      { row: 3, label: 'Fuel price per km', cell: 'A3', entry: '50' },
      {
        row: 4,
        label: 'Chargeable distance (km)',
        cell: 'B1',
        entry: '=MAX(A1-A2,0)',
        isFormula: true,
      },
      {
        row: 5,
        label: 'Transport cost',
        cell: 'B2',
        entry: '=B1*A3',
        isFormula: true,
        highlight: true,
      },
    ],
    tip: 'Set A2 to the same value as “Free delivery distance” in app settings.',
  },
};
