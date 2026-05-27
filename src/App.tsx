import { useEffect, useState } from "react";
import { SettingsProvider } from "@/context/SettingsContext";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Tabs } from "@/components/Tabs";
import { calculatorRegistry } from "@/calculators/registry";
import {
  CALCULATOR_TABS,
  DEFAULT_CALCULATOR_ID,
  type CalculatorId,
} from "@/constants/calculators";

function readCalculatorFromHash(): CalculatorId {
  if (typeof window === "undefined") {
    return DEFAULT_CALCULATOR_ID;
  }

  const requestedId = window.location.hash.replace("#", "") as CalculatorId;
  return CALCULATOR_TABS.some((tab) => tab.id === requestedId)
    ? requestedId
    : DEFAULT_CALCULATOR_ID;
}

function AppShell() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>(
    readCalculatorFromHash,
  );

  useEffect(() => {
    const syncFromHash = () => {
      setActiveCalculator(readCalculatorFromHash());
    };

    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const ActiveCalculator = calculatorRegistry[activeCalculator];

  const handleTabChange = (nextCalculator: string) => {
    const calculatorId = nextCalculator as CalculatorId;
    setActiveCalculator(calculatorId);
    window.history.replaceState(null, "", `#${calculatorId}`);
  };

  return (
    <div className="app-shell">
      <div className="background-orb background-orb-left" aria-hidden="true" />
      <div className="background-orb background-orb-right" aria-hidden="true" />

      <main className="app-container">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Static and Netlify-ready</p>
            <h1>Business Calculators</h1>
            <p className="hero-text">
              Fast, friendly calculations for pricing, VAT, discounts, and
              delivery costs. Adjust the shared settings once, then move between
              calculator tabs as needed.
            </p>
          </div>
          <div className="hero-note">
            <span className="hero-note-title">Built for quick decisions</span>
            <p>
              Every calculator uses plain-language formulas, instant feedback,
              and clear results that are easy to read on mobile or desktop.
            </p>
          </div>
        </section>

        <SettingsPanel />

        <section className="calculator-area" aria-labelledby="calculator-tabs">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Calculator workspace</p>
              <h2 id="calculator-tabs">Choose a calculator</h2>
            </div>
            <p className="section-copy">
              Each calculator works independently and can be shared directly
              with its URL hash.
            </p>
          </div>

          <Tabs
            items={CALCULATOR_TABS}
            activeId={activeCalculator}
            onChange={handleTabChange}
          />

          <div className="calculator-content">
            <ActiveCalculator />
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  );
}
