import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Result } from '../components/Result';
import { useSettings } from '../context/SettingsContext';
import {
  formatCurrency,
  formatPercent,
  parseNonNegative,
} from '../utils/numbers';
import {
  requiredNonNegativeMessage,
  requiredPercentageMessage,
} from '../utils/validation';
import { buildVatThenAdditionalSheet } from '../utils/excelSheets/buildSheets';
import {
  calculateVatThenAdditional,
  type VatThenAdditionalOperation,
} from './vatThenAdditional';

type VatThenAdditionalCalculatorProps = {
  operation: VatThenAdditionalOperation;
};

const COPY = {
  add: {
    title: 'VAT then add percentage',
    description:
      'Start with a base amount, add VAT, then add an extra percentage on that subtotal—like a markup on the VAT-inclusive figure.',
    additionalLabel: 'Additional percentage to add (%)',
    additionalDescription:
      'Applied to the subtotal (base + VAT), not to the base alone.',
    adjustmentResultLabel: 'Additional amount',
    grandTotalHint: 'Subtotal + additional amount',
  },
  subtract: {
    title: 'VAT − subtract percentage',
    description:
      'Start with a base amount, add VAT, then subtract a percentage from that subtotal—like a reduction on the VAT-inclusive figure.',
    additionalLabel: 'Additional percentage to subtract (%)',
    additionalDescription:
      'Taken off the subtotal (base + VAT), not off the base alone.',
    adjustmentResultLabel: 'Reduction amount',
    grandTotalHint: 'Subtotal − reduction amount',
  },
} as const;

export function VatThenAdditionalCalculator({
  operation,
}: VatThenAdditionalCalculatorProps) {
  const { vatPercentage } = useSettings();
  const copy = COPY[operation];

  const [baseAmount, setBaseAmount] = useState('');
  const [additionalPercentage, setAdditionalPercentage] = useState('');

  const baseError = requiredNonNegativeMessage(baseAmount, 'Base amount');
  const additionalError = requiredPercentageMessage(
    additionalPercentage,
    'Additional percentage',
  );

  const results = useMemo(() => {
    if (baseError || additionalError) return null;
    const base = parseNonNegative(baseAmount);
    const additional = parseNonNegative(additionalPercentage);
    if (base === null || additional === null) return null;
    return calculateVatThenAdditional(
      base,
      vatPercentage,
      additional,
      operation,
    );
  }, [
    baseAmount,
    additionalPercentage,
    baseError,
    additionalError,
    vatPercentage,
    operation,
  ]);

  const reset = () => {
    setBaseAmount('');
    setAdditionalPercentage('');
  };

  const excelSheet = useMemo(
    () =>
      buildVatThenAdditionalSheet({
        operation,
        baseRaw: baseAmount,
        additionalRaw: additionalPercentage,
        vatPercent: vatPercentage,
        base: parseNonNegative(baseAmount),
        additionalPercent: parseNonNegative(additionalPercentage),
        vatAmount: results?.vatAmount ?? null,
        subTotal: results?.subTotal ?? null,
        adjustmentAmount: results?.additionalAmount ?? null,
        grandTotal: results?.grandTotal ?? null,
      }),
    [
      operation,
      baseAmount,
      additionalPercentage,
      vatPercentage,
      results,
    ],
  );

  return (
    <Card
      title={copy.title}
      excelSheet={excelSheet}
      description={copy.description}
      formula={`VAT = base × ${formatPercent(vatPercentage)}. Subtotal = base + VAT. ${operation === 'add' ? 'Additional' : 'Reduction'} = subtotal × your extra % ÷ 100. Grand total = subtotal ${operation === 'add' ? '+' : '−'} that amount.`}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id={`vta-base-${operation}`}
            label="Base amount"
            description="The amount before VAT (your starting figure)."
            placeholder="e.g. 289725"
            value={baseAmount}
            onChange={setBaseAmount}
            error={baseError}
            min={0}
            step="0.01"
          />
          <Input
            id={`vta-additional-${operation}`}
            label={copy.additionalLabel}
            description={copy.additionalDescription}
            placeholder="e.g. 10"
            value={additionalPercentage}
            onChange={setAdditionalPercentage}
            error={additionalError}
            min={0}
            max={100}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label={`VAT (${formatPercent(vatPercentage)})`}
            value={
              results
                ? formatCurrency(results.vatAmount)
                : 'Enter values above'
            }
          />
          <Result
            label="Subtotal (base + VAT)"
            value={results ? formatCurrency(results.subTotal) : '—'}
          />
          <Result
            label={copy.adjustmentResultLabel}
            value={results ? formatCurrency(results.additionalAmount) : '—'}
            hint={
              results
                ? `${formatPercent(Number(additionalPercentage))} of subtotal`
                : undefined
            }
          />
          <Result
            label="Grand total"
            value={results ? formatCurrency(results.grandTotal) : '—'}
            highlight
            hint={copy.grandTotalHint}
          />
        </div>
      </div>
    </Card>
  );
}

export function VatThenAddPercentageCalculator() {
  return <VatThenAdditionalCalculator operation="add" />;
}

export function VatThenSubtractPercentageCalculator() {
  return <VatThenAdditionalCalculator operation="subtract" />;
}
