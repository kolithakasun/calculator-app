import type { ReactNode } from 'react';
import type { ExcelSheet } from '../types/excelSheet';
import { ExcelGuide } from './ExcelGuide';

type CardProps = {
  title: string;
  description: string;
  formula: string;
  excelSheet: ExcelSheet;
  children: ReactNode;
  onReset?: () => void;
};

export function Card({
  title,
  description,
  formula,
  excelSheet,
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
      <ExcelGuide sheet={excelSheet} />
      <div className="card__body">{children}</div>
    </section>
  );
}
