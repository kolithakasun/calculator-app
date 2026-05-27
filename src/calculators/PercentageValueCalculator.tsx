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
import { buildPercentageValueSheet } from '../utils/excelSheets/buildSheets';
import { calculatePercentageValue } from './percentageValue';

export function PercentageValueCalculator() {
  const [baseValue, setBaseValue] = useState('');
  const [percentage, setPercentage] = useState('');

  const baseError = requiredNonNegativeMessage(baseValue, 'Base value');
  const percentageError = requiredPercentageMessage(percentage, 'Percentage');

  const percentageValue = useMemo(() => {
    if (baseError || percentageError) return null;
    const base = parseNonNegative(baseValue);
    const percent = parseNonNegative(percentage);
    if (base === null || percent === null) return null;
    return calculatePercentageValue(base, percent);
  }, [baseValue, percentage, baseError, percentageError]);

  const excelSheet = useMemo(
    () =>
      buildPercentageValueSheet({
        baseRaw: baseValue,
        percentRaw: percentage,
        base: parseNonNegative(baseValue),
        percent: parseNonNegative(percentage),
        percentageValue,
      }),
    [baseValue, percentage, percentageValue],
  );

  const reset = () => {
    setBaseValue('');
    setPercentage('');
  };

  return (
    <Card
      title="Percentage value"
      excelSheet={excelSheet}
      description="Find how much a given percentage is of any amount—for example, 15% of a product price."
      formula="Percentage value = base amount × percentage ÷ 100"
      onReset={reset}
    >
      <div className="calculator-grid">
        <div className="calculator-grid__inputs">
          <Input
            id="pv-base"
            label="Base value"
            description="The full amount you are taking a percentage of."
            placeholder="e.g. 10000"
            value={baseValue}
            onChange={setBaseValue}
            error={baseError}
            min={0}
            step="0.01"
          />
          <Input
            id="pv-percent"
            label="Percentage (%)"
            description="The percentage you want to calculate."
            placeholder="e.g. 15"
            value={percentage}
            onChange={setPercentage}
            error={percentageError}
            min={0}
            max={100}
            step="0.01"
          />
        </div>
        <div className="calculator-grid__results">
          <Result
            label="Percentage value"
            value={
              percentageValue !== null
                ? formatCurrency(percentageValue)
                : 'Enter values above'
            }
            highlight
            hint="Updates as you type"
          />
        </div>
      </div>
    </Card>
  );
}
