import type { CalculatorMeta } from '../constants/calculators';

type TabsProps = {
  calculators: CalculatorMeta[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ calculators, activeId, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Calculators">
      {calculators.map((calculator) => {
        const isActive = calculator.id === activeId;
        return (
          <button
            key={calculator.id}
            type="button"
            role="tab"
            id={`tab-${calculator.id}`}
            className={`tabs__tab${isActive ? ' tabs__tab--active' : ''}`}
            aria-selected={isActive}
            aria-controls={`panel-${calculator.id}`}
            onClick={() => onChange(calculator.id)}
          >
            <span className="tabs__label">{calculator.label}</span>
            <span className="tabs__hint">{calculator.shortDescription}</span>
          </button>
        );
      })}
    </div>
  );
}
