import { Card } from "@/components/Card";
import { InputField } from "@/components/InputField";
import { useSettings } from "@/context/SettingsContext";
import { formatPercent, formatNumber } from "@/utils/format";

export function SettingsPanel() {
  const {
    vatPercentage,
    freeDeliveryDistance,
    vatInput,
    freeDeliveryInput,
    vatError,
    freeDeliveryError,
    setVatInput,
    setFreeDeliveryInput,
    resetSettings,
  } = useSettings();

  return (
    <Card
      title="Shared Settings"
      description="These values are used automatically by the VAT and fuel calculators."
      className="settings-card"
      action={
        <button type="button" className="secondary-button" onClick={resetSettings}>
          Reset settings
        </button>
      }
    >
      <div className="settings-grid">
        <InputField
          id="vat-percentage"
          label="VAT percentage"
          description="Used when a calculator needs to add or remove VAT."
          placeholder="18"
          value={vatInput}
          min={0}
          max={100}
          suffix="%"
          error={vatError}
          onChange={setVatInput}
        />
        <InputField
          id="free-delivery-distance"
          label="Free delivery distance"
          description="Delivery distance included before transport cost starts."
          placeholder="15"
          value={freeDeliveryInput}
          min={0}
          max={10000}
          suffix="km"
          error={freeDeliveryError}
          onChange={setFreeDeliveryInput}
        />
      </div>

      <div className="settings-summary">
        <div>
          <span className="summary-label">Current VAT</span>
          <strong>{formatPercent(vatPercentage)}</strong>
        </div>
        <div>
          <span className="summary-label">Free delivery</span>
          <strong>{formatNumber(freeDeliveryDistance)} km</strong>
        </div>
      </div>
    </Card>
  );
}
