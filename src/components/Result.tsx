type ResultProps = {
  label: string;
  value: string;
  highlight?: boolean;
  hint?: string;
};

export function Result({ label, value, highlight = false, hint }: ResultProps) {
  return (
    <div className={`result${highlight ? ' result--highlight' : ''}`}>
      <span className="result__label">{label}</span>
      <span className="result__value">{value}</span>
      {hint ? <span className="result__hint">{hint}</span> : null}
    </div>
  );
}
