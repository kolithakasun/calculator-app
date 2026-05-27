import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Result } from '../components/Result';
import {
  formatCurrency,
  parseNonNegative,
} from '../utils/numbers';
import {
  requiredNonNegativeMessage,
  requiredPercentageMessage,
} from '../utils/validation';
import { calculateDiscountWithVat } from './discountWithVat';

export function DiscountWithVatCalculator() {
  const [totalWithVat, setTotalWithVat] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  const totalError = requiredNonNegativeMessage(
    totalWithVat,
    'Total including VAT',
  );
  const discountError = requiredPercentageMessage(
    discountPercentage,
    'Discount percentage',
  );

  const results = useMemo(() => {
    if (totalError || discountError) return null;
    const total = parseNonNegative(totalWithVat);
    const discount = parseNonNegative(discountPercentage);
    if (total === null || discount === null) return null;
    return calculateDiscountWithVat(total, discount);
  }, [totalWithVat, discountPercentage, totalError, discountError]);

  const reset = () => {
    setTotalWithVat('');
    setDiscountPercentage('');
  };

  return (
    <Card
      title="Discount on total with VAT"
      description="Use this when the discount is applied to the full price that already includes VAT—common for promotions on the final bill."
      formula="Discount = total with VAT × discount % ÷ 100. Final price = total with VAT − discount."
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="dwv-total"
            label="Total including VAT"
            description="The price before any discount is applied."
            placeholder="e.g. 11800"
            value={totalWithVat}
            onChange={setTotalWithVat}
            error={totalError}
            min={0}
            step="0.01"
          />
          <Input
            id="dwv-discount"
            label="Discount (%)"
            description="The discount rate applied to the VAT-inclusive total."
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
            label="Final price after discount"
            value={results ? formatCurrency(results.finalValue) : '—'}
            highlight
          />
        </div>
      </div>
    </Card>
  );
}
