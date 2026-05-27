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
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [retentionPercentage, setRetentionPercentage] = useState('');

  const qtyError = requiredNonNegativeMessage(quantity, 'Quantity');
  const rateError = requiredNonNegativeMessage(rate, 'Rate');
  const retentionError = requiredPercentageMessage(
    retentionPercentage,
    'Retention percentage',
  );

  const parsed = useMemo(() => {
    if (qtyError || rateError || retentionError) return null;
    const qty = parseNonNegative(quantity);
    const rateVal = parseNonNegative(rate);
    const retention = parseNonNegative(retentionPercentage);
    if (qty === null || rateVal === null || retention === null) return null;
    return calculateTaxInvoice(qty, rateVal, vatPercentage, retention);
  }, [
    quantity,
    rate,
    retentionPercentage,
    qtyError,
    rateError,
    retentionError,
    vatPercentage,
  ]);

  const excelSheet = useMemo(
    () =>
      buildTaxInvoiceSheet({
        qtyRaw: quantity,
        rateRaw: rate,
        retentionRaw: retentionPercentage,
        vatPercent: vatPercentage,
        qty: parseNonNegative(quantity),
        rate: parseNonNegative(rate),
        retentionPercent: parseNonNegative(retentionPercentage),
        baseAmount: parsed?.baseAmount ?? null,
        vatAmount: parsed?.vatAmount ?? null,
        subTotal: parsed?.subTotal ?? null,
        retentionAmount: parsed?.retentionAmount ?? null,
        grandTotal: parsed?.grandTotal ?? null,
      }),
    [quantity, rate, retentionPercentage, vatPercentage, parsed],
  );

  const reset = () => {
    setQuantity('');
    setRate('');
    setRetentionPercentage('');
  };

  return (
    <Card
      title="Tax invoice"
      description="For supply invoices: multiply Qty × Rate, add VAT, then subtract retention (e.g. 2.5%) from the VAT-inclusive subtotal."
      formula={`Amount = Qty × Rate. VAT = amount × ${formatPercent(vatPercentage)}. Subtotal = amount + VAT. Retention = subtotal × retention % ÷ 100. Grand total = subtotal − retention.`}
      excelSheet={excelSheet}
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="ti-qty"
            label="Quantity (Qty)"
            description="Number of units, e.g. 1.00 Nos"
            placeholder="e.g. 1"
            value={quantity}
            onChange={setQuantity}
            error={qtyError}
            min={0}
            step="0.01"
          />
          <Input
            id="ti-rate"
            label="Rate (Rs.)"
            description="Price per unit before VAT."
            placeholder="e.g. 211735"
            value={rate}
            onChange={setRate}
            error={rateError}
            min={0}
            step="0.01"
          />
          <Input
            id="ti-retention"
            label="Retention (%)"
            description="Taken off the subtotal after VAT is added (e.g. 2.5%)."
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
            label="Amount (Qty × Rate)"
            value={
              parsed ? formatCurrency(parsed.baseAmount) : 'Enter values above'
            }
          />
          <Result
            label={`VAT (${formatPercent(vatPercentage)})`}
            value={parsed ? formatCurrency(parsed.vatAmount) : '—'}
          />
          <Result
            label="Subtotal (amount + VAT)"
            value={parsed ? formatCurrency(parsed.subTotal) : '—'}
          />
          <Result
            label="Retention amount"
            value={parsed ? formatCurrency(parsed.retentionAmount) : '—'}
            hint={
              retentionPercentage.trim()
                ? `${formatPercent(Number(retentionPercentage))} of subtotal`
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
