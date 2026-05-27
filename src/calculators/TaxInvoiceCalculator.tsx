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
import { buildTaxInvoiceSheet } from '../utils/excelSheets/buildSheets';
import {
  requiredNonNegativeMessage,
  requiredPercentageMessage,
} from '../utils/validation';
import { calculateTaxInvoice } from './taxInvoice';

export function TaxInvoiceCalculator() {
  const { vatPercentage } = useSettings();
  const [subtotal, setSubtotal] = useState('');
  const [retentionPercentage, setRetentionPercentage] = useState('');

  const subtotalError = requiredNonNegativeMessage(subtotal, 'Subtotal');
  const retentionError = requiredPercentageMessage(
    retentionPercentage,
    'Retention percentage',
  );

  const parsed = useMemo(() => {
    if (subtotalError || retentionError) return null;
    const subtotalVal = parseNonNegative(subtotal);
    const retention = parseNonNegative(retentionPercentage);
    if (subtotalVal === null || retention === null) return null;
    return calculateTaxInvoice(subtotalVal, vatPercentage, retention);
  }, [
    subtotal,
    retentionPercentage,
    subtotalError,
    retentionError,
    vatPercentage,
  ]);

  const excelSheet = useMemo(
    () =>
      buildTaxInvoiceSheet({
        subtotalRaw: subtotal,
        retentionRaw: retentionPercentage,
        vatPercent: vatPercentage,
        subtotal: parseNonNegative(subtotal),
        retentionPercent: parseNonNegative(retentionPercentage),
        vatAmount: parsed?.vatAmount ?? null,
        totalAfterVat: parsed?.totalAfterVat ?? null,
        retentionAmount: parsed?.retentionAmount ?? null,
        grandTotal: parsed?.grandTotal ?? null,
      }),
    [subtotal, retentionPercentage, vatPercentage, parsed],
  );

  const reset = () => {
    setSubtotal('');
    setRetentionPercentage('');
  };

  return (
    <Card
      title="Tax invoice"
      description="You already have the subtotal (before VAT). This adds VAT, then subtracts retention from the total—same as the bottom of a tax invoice."
      formula={`Add VAT = subtotal × ${formatPercent(vatPercentage)}. Total = subtotal + VAT. Retention = total × retention % ÷ 100. Grand total = total − retention.`}
      excelSheet={excelSheet}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="ti-subtotal"
            label="Subtotal (before VAT)"
            description="The amount on your invoice before VAT is added, e.g. 211,735.00"
            placeholder="e.g. 211735"
            value={subtotal}
            onChange={setSubtotal}
            error={subtotalError}
            min={0}
            step="0.01"
          />
          <Input
            id="ti-retention"
            label="Retention (%)"
            description="Taken off the total after VAT is added (e.g. 2.5%)."
            placeholder="e.g. 2.5"
            value={retentionPercentage}
            onChange={setRetentionPercentage}
            error={retentionError}
            min={0}
            max={100}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label={`Add: ${formatPercent(vatPercentage)} VAT`}
            value={
              parsed ? formatCurrency(parsed.vatAmount) : 'Enter values above'
            }
          />
          <Result
            label="Total (subtotal + VAT)"
            value={parsed ? formatCurrency(parsed.totalAfterVat) : '—'}
          />
          <Result
            label="Retention amount"
            value={parsed ? formatCurrency(parsed.retentionAmount) : '—'}
            hint={
              retentionPercentage.trim()
                ? `Retention ${formatPercent(Number(retentionPercentage))}`
                : undefined
            }
          />
          <Result
            label="GRAND TOTAL"
            value={parsed ? formatCurrency(parsed.grandTotal) : '—'}
            highlight
          />
        </div>
      </div>
    </Card>
  );
}
