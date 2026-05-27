import { useState } from 'react';
import {
  DEFAULT_FREE_DELIVERY_DISTANCE_KM,
  DEFAULT_VAT_PERCENTAGE,
} from '../constants/defaults';
import { useSettings } from '../context/SettingsContext';
import { settingsPercentageMessage } from '../utils/validation';
import { Input } from './Input';

function distanceErrorMessage(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return 'Free delivery distance is required.';
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 'Please enter a valid distance in kilometers.';
  }
  return undefined;
}

export function SettingsPanel() {
  const {
    vatPercentage,
    freeDeliveryDistanceKm,
    setVatPercentage,
    setFreeDeliveryDistanceKm,
  } = useSettings();

  const [vatInput, setVatInput] = useState(String(vatPercentage));
  const [distanceInput, setDistanceInput] = useState(
    String(freeDeliveryDistanceKm),
  );

  const vatError = settingsPercentageMessage(vatInput, 'VAT percentage');
  const distanceError = distanceErrorMessage(distanceInput);

  const handleVatChange = (value: string) => {
    setVatInput(value);
    const error = settingsPercentageMessage(value, 'VAT percentage');
    if (!error) {
      setVatPercentage(Number(value));
    }
  };

  const handleDistanceChange = (value: string) => {
    setDistanceInput(value);
    const error = distanceErrorMessage(value);
    if (!error) {
      setFreeDeliveryDistanceKm(Number(value));
    }
  };

  const resetDefaults = () => {
    setVatInput(String(DEFAULT_VAT_PERCENTAGE));
    setVatPercentage(DEFAULT_VAT_PERCENTAGE);
    setDistanceInput(String(DEFAULT_FREE_DELIVERY_DISTANCE_KM));
    setFreeDeliveryDistanceKm(DEFAULT_FREE_DELIVERY_DISTANCE_KM);
  };

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <div className="settings__header">
        <div>
          <h2 className="settings__title" id="settings-heading">
            App settings
          </h2>
          <p className="settings__description">
            These values apply to calculators that use VAT or free delivery
            distance. Changes take effect immediately.
          </p>
        </div>
        <button type="button" className="btn btn--ghost" onClick={resetDefaults}>
          Restore defaults
        </button>
      </div>
      <div className="settings__grid">
        <Input
          id="setting-vat"
          label="VAT percentage"
          description="Used when working out prices before or after VAT. Default is 18%."
          placeholder="e.g. 18"
          value={vatInput}
          onChange={handleVatChange}
          error={vatError}
          min={0}
          max={100}
          step="0.01"
        />
        <Input
          id="setting-distance"
          label="Free delivery distance (km)"
          description="Distance covered at no transport charge. Default is 15 km."
          placeholder="e.g. 15"
          value={distanceInput}
          onChange={handleDistanceChange}
          error={distanceError}
          min={0}
          step="0.1"
        />
      </div>
      <p className="settings__active">
        Active: VAT at <strong>{vatPercentage}%</strong>, free delivery up to{' '}
        <strong>{freeDeliveryDistanceKm} km</strong>
      </p>
    </section>
  );
}
