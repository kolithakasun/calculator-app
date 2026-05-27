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
import { buildDiscountWithoutVatSheet } from '../utils/excelSheets/buildSheets';
import { calculateDiscountWithoutVat } from './discountWithoutVat';

export function DiscountWithoutVatCalculator() {
  const { vatPercentage } = useSettings();
  const [totalWithoutVat, setTotalWithoutVat] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const totalError = requiredNonNegativeMessage(
    totalWithoutVat,
    'Total without VAT',
  );
  const discountError = requiredPercentageMessage(
    discountPercentage,
    'Discount percentage',
  );

  const results = useMemo(() => {
    if (totalError || discountError) return null;
    const total = parseNonNegative(totalWithoutVat);
    const discount = parseNonNegative(discountPercentage);
    if (total === null || discount === null) return null;
    return calculateDiscountWithoutVat(total, discount, vatPercentage);
  }, [totalWithoutVat, discountPercentage, totalError, discountError, vatPercentage]);

  const excelSheet = useMemo(
    () =>
      buildDiscountWithoutVatSheet({
        totalRaw: totalWithoutVat,
        discountRaw: discountPercentage,
        vatPercent: vatPercentage,
        total: parseNonNegative(totalWithoutVat),
        discountPercent: parseNonNegative(discountPercentage),
        discountAmount: results?.discountAmount ?? null,
        discountedBase: results?.discountedBase ?? null,
        vatAmount: results?.vatAmount ?? null,
        finalValue: results?.finalValue ?? null,
      }),
    [totalWithoutVat, discountPercentage, vatPercentage, results],
  );

  const reset = () => {
    setTotalWithoutVat('');
    setDiscountPercentage('');
  };

  return (
    <Card
      title="Discount before VAT"
      excelSheet={excelSheet}
      description="Use this when the discount applies to the price before VAT. VAT is then calculated on the discounted amount."
      formula={`Discount = price without VAT × discount % ÷ 100. VAT (${formatPercent(vatPercentage)}) is added to the discounted base.`}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="dwo-total"
            label="Total without VAT"
            description="The net price before VAT and before discount."
            placeholder="e.g. 10000"
            value={totalWithoutVat}
            onChange={setTotalWithoutVat}
            error={totalError}
            min={0}
            step="0.01"
          />
          <Input
            id="dwo-discount"
            label="Discount (%)"
            description="The discount rate applied to the amount before VAT."
            placeholder="e.g. 10"
            value={discountPercentage}
            onChange={setDiscountPercentage}
            error={discountError}
            min={0}
            max={100}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label="Discount amount"
            value={
              results
                ? formatCurrency(results.discountAmount)
                : 'Enter values above'
            }
          />
          <Result
            label="Price after discount (before VAT)"
            value={results ? formatCurrency(results.discountedBase) : '—'}
          />
          <Result
            label="VAT amount"
            value={results ? formatCurrency(results.vatAmount) : '—'}
            hint={`At ${formatPercent(vatPercentage)}`}
          />
          <Result
            label="Final price including VAT"
            value={results ? formatCurrency(results.finalValue) : '—'}
            highlight
          />
        </div>
      </div>
    </Card>
  );
}
