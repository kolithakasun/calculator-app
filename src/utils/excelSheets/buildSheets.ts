import type { ExcelSheet } from '../../types/excelSheet';
import {
  excelInputDisplay,
  excelPreview,
  toExcelNumber,
} from '../excelFormat';

const COLS: ExcelSheet['columns'] = [
  'A — What',
  'B — Copy into Excel',
  'C — Your result',
];

function label(ref: string, text: string) {
  return { ref, content: text, kind: 'label' as const };
}

function input(ref: string, content: string) {
  return { ref, content: content || ' ', kind: 'input' as const };
}

function formula(ref: string, content: string) {
  return { ref, content, kind: 'formula' as const };
}

function result(ref: string, content: string) {
  return { ref, content, kind: 'result' as const };
}

function sheet(
  intro: string,
  rows: ExcelSheet['rows'],
  tip?: string,
): ExcelSheet {
  return { intro, columns: COLS, rows, tip };
}

// —— Percentage value ——
export function buildPercentageValueSheet(params: {
  baseRaw: string;
  percentRaw: string;
  base: number | null;
  percent: number | null;
  percentageValue: number | null;
}): ExcelSheet {
  const { baseRaw, percentRaw, base, percent, percentageValue } = params;
  return sheet(
    'Type the values in column B exactly as shown. Formulas start with = — paste them into the same cell (e.g. B3).',
    [
      [label('A1', 'Base amount'), input('B1', excelInputDisplay(baseRaw, base)), result('C1', '')],
      [
        label('A2', 'Percentage (%)'),
        input('B2', excelInputDisplay(percentRaw, percent, 4)),
        result('C2', ''),
      ],
      [
        label('A3', 'Percentage value'),
        formula('B3', '=B1*B2/100'),
        result('C3', excelPreview(percentageValue)),
      ],
    ],
    'In Excel: put your base in B1, percent in B2, then enter =B1*B2/100 in B3.',
  );
}

// —— Base from VAT ——
export function buildBaseFromVatSheet(params: {
  totalRaw: string;
  vatPercent: number;
  total: number | null;
  base: number | null;
  vatAmount: number | null;
}): ExcelSheet {
  const { totalRaw, vatPercent, total, base, vatAmount } = params;
  return sheet(
    'You know the total with VAT. Column B is what you type or paste into Excel.',
    [
      [
        label('A1', 'Total including VAT'),
        input('B1', excelInputDisplay(totalRaw, total)),
        result('C1', ''),
      ],
      [
        label('A2', 'VAT %'),
        input('B2', toExcelNumber(vatPercent, 2)),
        result('C2', ''),
      ],
      [
        label('A3', 'Base (before VAT)'),
        formula('B3', '=B1/(1+B2/100)'),
        result('C3', excelPreview(base)),
      ],
      [
        label('A4', 'VAT amount'),
        formula('B4', '=B1-B3'),
        result('C4', excelPreview(vatAmount)),
      ],
    ],
    `B2 uses your app VAT setting (${vatPercent}%). Change B2 if your Excel sheet uses a different rate.`,
  );
}

// —— VAT then add / subtract ——
export function buildVatThenAdditionalSheet(params: {
  operation: 'add' | 'subtract';
  baseRaw: string;
  additionalRaw: string;
  vatPercent: number;
  base: number | null;
  additionalPercent: number | null;
  vatAmount: number | null;
  subTotal: number | null;
  adjustmentAmount: number | null;
  grandTotal: number | null;
}): ExcelSheet {
  const {
    operation,
    baseRaw,
    additionalRaw,
    vatPercent,
    base,
    additionalPercent,
    vatAmount,
    subTotal,
    adjustmentAmount,
    grandTotal,
  } = params;
  const isAdd = operation === 'add';
  const pctLabel = isAdd ? 'Extra % (on subtotal)' : 'Subtract % (on subtotal)';
  const amtLabel = isAdd ? 'Extra amount' : 'Amount to subtract';
  const totalFormula = isAdd ? '=B4+B6' : '=B4-B6';

  return sheet(
    isAdd
      ? 'Invoice style: base → VAT → add a % on the subtotal. Copy column B into Excel.'
      : 'Invoice style: base → VAT → subtract a % from the subtotal (e.g. retention). Copy column B into Excel.',
    [
      [label('A1', 'Base amount'), input('B1', excelInputDisplay(baseRaw, base)), result('C1', '')],
      [
        label('A2', 'VAT %'),
        input('B2', toExcelNumber(vatPercent, 2)),
        result('C2', ''),
      ],
      [
        label('A3', 'VAT amount'),
        formula('B3', '=B1*B2/100'),
        result('C3', excelPreview(vatAmount)),
      ],
      [
        label('A4', 'Subtotal (base + VAT)'),
        formula('B4', '=B1+B3'),
        result('C4', excelPreview(subTotal)),
      ],
      [
        label('A5', pctLabel),
        input('B5', excelInputDisplay(additionalRaw, additionalPercent, 4)),
        result('C5', ''),
      ],
      [
        label('A6', amtLabel),
        formula('B6', '=B4*B5/100'),
        result('C6', excelPreview(adjustmentAmount)),
      ],
      [
        label('A7', 'GRAND TOTAL'),
        formula('B7', totalFormula),
        result('C7', excelPreview(grandTotal)),
      ],
    ],
  );
}

// —— Tax invoice (subtotal given) ——
export function buildTaxInvoiceSheet(params: {
  subtotalRaw: string;
  retentionRaw: string;
  vatPercent: number;
  subtotal: number | null;
  retentionPercent: number | null;
  vatAmount: number | null;
  totalAfterVat: number | null;
  retentionAmount: number | null;
  grandTotal: number | null;
}): ExcelSheet {
  const {
    subtotalRaw,
    retentionRaw,
    vatPercent,
    subtotal,
    retentionPercent,
    vatAmount,
    totalAfterVat,
    retentionAmount,
    grandTotal,
  } = params;

  return sheet(
    'Start with your invoice subtotal (before VAT). Copy column B into Excel row by row.',
    [
      [
        label('A1', 'Subtotal (before VAT)'),
        input('B1', excelInputDisplay(subtotalRaw, subtotal)),
        result('C1', ''),
      ],
      [
        label('A2', 'VAT %'),
        input('B2', toExcelNumber(vatPercent, 2)),
        result('C2', ''),
      ],
      [
        label('A3', 'Add: VAT amount'),
        formula('B3', '=B1*B2/100'),
        result('C3', excelPreview(vatAmount)),
      ],
      [
        label('A4', 'Total (subtotal + VAT)'),
        formula('B4', '=B1+B3'),
        result('C4', excelPreview(totalAfterVat)),
      ],
      [
        label('A5', 'Retention %'),
        input('B5', excelInputDisplay(retentionRaw, retentionPercent, 4)),
        result('C5', ''),
      ],
      [
        label('A6', 'Retention amount'),
        formula('B6', '=B4*B5/100'),
        result('C6', excelPreview(retentionAmount)),
      ],
      [
        label('A7', 'GRAND TOTAL'),
        formula('B7', '=B4-B6'),
        result('C7', excelPreview(grandTotal)),
      ],
    ],
    'Example: Subtotal 211735, VAT 18%, Retention 2.5% → Grand total 243,601.12',
  );
}

// —— Discount with VAT ——
export function buildDiscountWithVatSheet(params: {
  totalRaw: string;
  discountRaw: string;
  total: number | null;
  discountPercent: number | null;
  discountAmount: number | null;
  finalValue: number | null;
}): ExcelSheet {
  const { totalRaw, discountRaw, total, discountPercent, discountAmount, finalValue } =
    params;
  return sheet(
    'Discount is taken from the total that already includes VAT.',
    [
      [
        label('A1', 'Total including VAT'),
        input('B1', excelInputDisplay(totalRaw, total)),
        result('C1', ''),
      ],
      [
        label('A2', 'Discount %'),
        input('B2', excelInputDisplay(discountRaw, discountPercent, 4)),
        result('C2', ''),
      ],
      [
        label('A3', 'Discount amount'),
        formula('B3', '=B1*B2/100'),
        result('C3', excelPreview(discountAmount)),
      ],
      [
        label('A4', 'Final price'),
        formula('B4', '=B1-B3'),
        result('C4', excelPreview(finalValue)),
      ],
    ],
  );
}

// —— Discount without VAT ——
export function buildDiscountWithoutVatSheet(params: {
  totalRaw: string;
  discountRaw: string;
  vatPercent: number;
  total: number | null;
  discountPercent: number | null;
  discountAmount: number | null;
  discountedBase: number | null;
  vatAmount: number | null;
  finalValue: number | null;
}): ExcelSheet {
  const {
    totalRaw,
    discountRaw,
    vatPercent,
    total,
    discountPercent,
    discountAmount,
    discountedBase,
    vatAmount,
    finalValue,
  } = params;
  return sheet(
    'Discount on the price before VAT; then VAT is added on the discounted amount.',
    [
      [
        label('A1', 'Total without VAT'),
        input('B1', excelInputDisplay(totalRaw, total)),
        result('C1', ''),
      ],
      [
        label('A2', 'Discount %'),
        input('B2', excelInputDisplay(discountRaw, discountPercent, 4)),
        result('C2', ''),
      ],
      [
        label('A3', 'VAT %'),
        input('B3', toExcelNumber(vatPercent, 2)),
        result('C3', ''),
      ],
      [
        label('A4', 'Discount amount'),
        formula('B4', '=B1*B2/100'),
        result('C4', excelPreview(discountAmount)),
      ],
      [
        label('A5', 'After discount (before VAT)'),
        formula('B5', '=B1-B4'),
        result('C5', excelPreview(discountedBase)),
      ],
      [
        label('A6', 'VAT amount'),
        formula('B6', '=B5*B3/100'),
        result('C6', excelPreview(vatAmount)),
      ],
      [
        label('A7', 'Final price with VAT'),
        formula('B7', '=B5+B6'),
        result('C7', excelPreview(finalValue)),
      ],
    ],
  );
}

// —— Fuel cost ——
export function buildFuelCostSheet(params: {
  distanceRaw: string;
  priceRaw: string;
  freeDeliveryKm: number;
  distance: number | null;
  pricePerKm: number | null;
  chargeableKm: number | null;
  transportCost: number | null;
}): ExcelSheet {
  const {
    distanceRaw,
    priceRaw,
    freeDeliveryKm,
    distance,
    pricePerKm,
    chargeableKm,
    transportCost,
  } = params;
  return sheet(
    'Chargeable km = distance minus free delivery. Transport cost = chargeable km × price per km.',
    [
      [
        label('A1', 'Total distance (km)'),
        input('B1', excelInputDisplay(distanceRaw, distance, 4)),
        result('C1', ''),
      ],
      [
        label('A2', 'Free delivery (km)'),
        input('B2', toExcelNumber(freeDeliveryKm, 4)),
        result('C2', ''),
      ],
      [
        label('A3', 'Fuel price per km'),
        input('B3', excelInputDisplay(priceRaw, pricePerKm)),
        result('C3', ''),
      ],
      [
        label('A4', 'Chargeable distance (km)'),
        formula('B4', '=MAX(B1-B2,0)'),
        result('C4', excelPreview(chargeableKm, 4)),
      ],
      [
        label('A5', 'Transport cost'),
        formula('B5', '=B4*B3'),
        result('C5', excelPreview(transportCost)),
      ],
    ],
    'B2 should match “Free delivery distance” in app settings.',
  );
}
