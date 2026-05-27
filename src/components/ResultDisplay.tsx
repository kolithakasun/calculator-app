import { formatAmount, formatNumber } from "@/utils/format";

export interface ResultItem {
  label: string;
  value: number;
  kind?: "amount" | "number";
  emphasis?: boolean;
  helperText?: string;
}

interface ResultDisplayProps {
  heading: string;
  description?: string;
  items?: ResultItem[];
  emptyMessage?: string;
}

export function ResultDisplay({
  heading,
  description,
  items,
  emptyMessage = "Enter values to see the result.",
}: ResultDisplayProps) {
  return (
    <section className="result-card" aria-live="polite">
      <div className="result-header">
        <h4>{heading}</h4>
        {description ? <p>{description}</p> : null}
      </div>

      {!items || items.length === 0 ? (
        <p className="result-empty">{emptyMessage}</p>
      ) : (
        <div className="result-list">
          {items.map((item) => (
            <article
              key={item.label}
              className={`result-item ${item.emphasis ? "result-item-emphasis" : ""}`}
            >
              <div>
                <span className="result-label">{item.label}</span>
                {item.helperText ? (
                  <p className="result-helper">{item.helperText}</p>
                ) : null}
              </div>
              <strong className="result-value">
                {item.kind === "number"
                  ? formatNumber(item.value)
                  : formatAmount(item.value)}
              </strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
