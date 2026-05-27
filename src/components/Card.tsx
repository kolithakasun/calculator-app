import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function Card({
  title,
  description,
  className,
  action,
  children,
}: CardProps) {
  return (
    <section className={`card ${className ?? ""}`.trim()}>
      {(title || description || action) && (
        <header className="card-header">
          <div>
            {title ? <h3>{title}</h3> : null}
            {description ? <p className="card-description">{description}</p> : null}
          </div>
          {action ? <div className="card-action">{action}</div> : null}
        </header>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
}
