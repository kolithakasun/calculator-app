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
import { requiredNonNegativeMessage } from '../utils/validation';
import { buildBaseFromVatSheet } from '../utils/excelSheets/buildSheets';
import {
  calculateBaseFromVatInclusive,
  calculateVatAmountFromTotal,
} from './baseFromVatInclusive';

export function BaseFromVatCalculator() {
  const { vatPercentage } = useSettings();
  const [totalWithVat, setTotalWithVat] = useState('');

  const totalError = requiredNonNegativeMessage(
    totalWithVat,
    'Total including VAT',
  );

  const results = useMemo(() => {
    if (totalError) return null;
    const total = parseNonNegative(totalWithVat);
    if (total === null) return null;
    const base = calculateBaseFromVatInclusive(total, vatPercentage);
    const vatAmount = calculateVatAmountFromTotal(total, vatPercentage);
    return { base, vatAmount };
  }, [totalWithVat, totalError, vatPercentage]);

  const excelSheet = useMemo(
    () =>
      buildBaseFromVatSheet({
        totalRaw: totalWithVat,
        vatPercent: vatPercentage,
        total: parseNonNegative(totalWithVat),
        base: results?.base ?? null,
        vatAmount: results?.vatAmount ?? null,
      }),
    [totalWithVat, vatPercentage, results],
  );

  const reset = () => setTotalWithVat('');

  return (
    <Card
      title="Price before VAT"
      excelSheet={excelSheet}
      description="You have a total that already includes VAT. This works out the amount before VAT was added."
      formula={`Base amount = total including VAT ÷ (1 + ${vatPercentage}% ÷ 100). VAT is taken from your app settings.`}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="bv-total"
            label="Total including VAT"
            description="The full price the customer pays, VAT included."
            placeholder="e.g. 11800"
            value={totalWithVat}
            onChange={setTotalWithVat}
            error={totalError}
            min={0}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label="Base value (before VAT)"
            value={
              results ? formatCurrency(results.base) : 'Enter a total above'
            }
            highlight
          />
          <Result
            label="VAT amount"
            value={results ? formatCurrency(results.vatAmount) : '—'}
            hint={`Using ${formatPercent(vatPercentage)} VAT`}
          />
        </div>
      </div>
    </Card>
  );
}
