import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_FREE_DELIVERY_DISTANCE,
  DEFAULT_VAT_PERCENTAGE,
} from "@/constants/settings";
import {
  parseNumberInput,
  validateNumberInput,
} from "@/utils/validation";

interface SettingsState {
  vatPercentage: number;
  freeDeliveryDistance: number;
}

interface SettingsContextValue extends SettingsState {
  vatInput: string;
  freeDeliveryInput: string;
  vatError?: string;
  freeDeliveryError?: string;
  setVatInput: (value: string) => void;
  setFreeDeliveryInput: (value: string) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

interface SettingValidationConfig {
  label: string;
  min: number;
  max: number;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [vatInput, setVatInputState] = useState(String(DEFAULT_VAT_PERCENTAGE));
  const [freeDeliveryInput, setFreeDeliveryInputState] = useState(
    String(DEFAULT_FREE_DELIVERY_DISTANCE),
  );
  const [settings, setSettings] = useState<SettingsState>({
    vatPercentage: DEFAULT_VAT_PERCENTAGE,
    freeDeliveryDistance: DEFAULT_FREE_DELIVERY_DISTANCE,
  });
  const vatValidation: SettingValidationConfig = {
    label: "VAT percentage",
    min: 0,
    max: 100,
  };
  const freeDeliveryValidation: SettingValidationConfig = {
    label: "Free delivery distance",
    min: 0,
    max: 10000,
  };

  const vatError = validateNumberInput(vatInput, vatValidation);
  const freeDeliveryError = validateNumberInput(
    freeDeliveryInput,
    freeDeliveryValidation,
  );

  const updateSetting =
    (
      setter: (value: string) => void,
      updater: (value: number) => void,
      validation: SettingValidationConfig,
    ) =>
    (value: string) => {
      setter(value);

      const error = validateNumberInput(value, validation);

      if (!error) {
        const parsedValue = parseNumberInput(value);

        if (parsedValue !== null) {
          updater(parsedValue);
        }
      }
    };

  const setVatInput = updateSetting(
    setVatInputState,
    (value) =>
      setSettings((current) => ({
        ...current,
        vatPercentage: value,
      })),
    vatValidation,
  );

  const setFreeDeliveryInput = updateSetting(
    setFreeDeliveryInputState,
    (value) =>
      setSettings((current) => ({
        ...current,
        freeDeliveryDistance: value,
      })),
    freeDeliveryValidation,
  );

  const resetSettings = () => {
    setVatInputState(String(DEFAULT_VAT_PERCENTAGE));
    setFreeDeliveryInputState(String(DEFAULT_FREE_DELIVERY_DISTANCE));
    setSettings({
      vatPercentage: DEFAULT_VAT_PERCENTAGE,
      freeDeliveryDistance: DEFAULT_FREE_DELIVERY_DISTANCE,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        vatInput,
        freeDeliveryInput,
        vatError,
        freeDeliveryError,
        setVatInput,
        setFreeDeliveryInput,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider.");
  }

  return context;
}
