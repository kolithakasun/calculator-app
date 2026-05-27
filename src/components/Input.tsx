import type { InputHTMLAttributes } from 'react';

type InputProps = {
  id: string;
  label: string;
  description?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'value' | 'onChange' | 'className'
>;

export function Input({
  id,
  label,
  description,
  error,
  value,
  onChange,
  ...inputProps
}: InputProps) {
  const describedBy = [
    description ? `${id}-desc` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {description ? (
        <p className="field__description" id={`${id}-desc`}>
          {description}
        </p>
      ) : null}
      <input
        className={`field__input${error ? ' field__input--error' : ''}`}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        inputMode="decimal"
        {...inputProps}
      />
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
