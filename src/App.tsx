import { useState } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { Tabs } from './components/Tabs';
import { CALCULATORS, type CalculatorId } from './constants/calculators';
import { CALCULATOR_COMPONENTS } from './calculators/registry';
import { SettingsProvider } from './context/SettingsContext';

function AppContent() {
  const [activeId, setActiveId] = useState<CalculatorId>('percentage-value');
  const ActiveCalculator = CALCULATOR_COMPONENTS[activeId];

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__eyebrow">Business calculators</span>
        <h1 className="app__title">Practical pricing & delivery tools</h1>
        <p className="app__subtitle">
          Simple calculators for VAT, discounts, percentages, and delivery
          costs. Enter your numbers and see results instantly—no spreadsheet
          required.
        </p>
      </header>

      <div className="app__layout">
        <SettingsPanel />

        <div>
          <Tabs
            calculators={CALCULATORS}
            activeId={activeId}
            onChange={(id) => setActiveId(id as CalculatorId)}
          />
          <div
            className="calculator-panel"
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
          >
            <ActiveCalculator />
          </div>
        </div>
      </div>

      <footer className="app__footer">
        Built for everyday business use. Deploy as a static site on Netlify.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
