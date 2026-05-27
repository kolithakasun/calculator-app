import type { ReactNode } from "react";
import { Card } from "@/components/Card";

interface CalculatorPanelProps {
  title: string;
  description: string;
  formula: string;
  resetLabel?: string;
  onReset: () => void;
  children: ReactNode;
}

export function CalculatorPanel({
  title,
  description,
  formula,
  resetLabel = "Reset calculator",
  onReset,
  children,
}: CalculatorPanelProps) {
  return (
    <Card
      title={title}
      description={description}
      action={
        <button type="button" className="secondary-button" onClick={onReset}>
          {resetLabel}
        </button>
      }
    >
      <div className="formula-banner">
        <span className="formula-label">Plain-language formula</span>
        <p>{formula}</p>
      </div>
      {children}
    </Card>
  );
}
