import type { CalculatorTab } from "@/constants/calculators";

interface TabsProps {
  items: CalculatorTab[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Calculator tabs">
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            className={`tab-button ${isActive ? "tab-button-active" : ""}`}
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
          >
            <span className="tab-label">{item.label}</span>
            <span className="tab-description">{item.description}</span>
          </button>
        );
      })}
    </div>
  );
}
