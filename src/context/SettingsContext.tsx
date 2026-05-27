import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_FREE_DELIVERY_DISTANCE_KM,
  DEFAULT_VAT_PERCENTAGE,
} from '../constants/defaults';

export type SettingsContextValue = {
  vatPercentage: number;
  freeDeliveryDistanceKm: number;
  setVatPercentage: (value: number) => void;
  setFreeDeliveryDistanceKm: (value: number) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [vatPercentage, setVatPercentage] = useState(DEFAULT_VAT_PERCENTAGE);
  const [freeDeliveryDistanceKm, setFreeDeliveryDistanceKm] = useState(
    DEFAULT_FREE_DELIVERY_DISTANCE_KM,
  );

  const value = useMemo(
    () => ({
      vatPercentage,
      freeDeliveryDistanceKm,
      setVatPercentage,
      setFreeDeliveryDistanceKm,
    }),
    [vatPercentage, freeDeliveryDistanceKm],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
