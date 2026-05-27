import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  description: string;
  formula: string;
  children: ReactNode;
  onReset?: () => void;
};

export function Card({
  title,
  description,
  formula,
  children,
  onReset,
}: CardProps) {
  return (
    <section className="card" aria-labelledby={`card-${title}`}>
      <header className="card__header">
        <div>
          <h2 className="card__title" id={`card-${title}`}>
            {title}
          </h2>
          <p className="card__description">{description}</p>
        </div>
        {onReset ? (
          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Reset
          </button>
        ) : null}
      </header>
      <p className="card__formula">
        <span className="card__formula-label">How it works:</span> {formula}
      </p>
      <div className="card__body">{children}</div>
    </section>
  );
}
