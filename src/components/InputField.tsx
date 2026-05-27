interface InputFieldProps {
  id: string;
  label: string;
  description?: string;
  placeholder?: string;
  value: string;
  min?: number;
  max?: number;
  step?: number | "any";
  error?: string;
  suffix?: string;
  onChange: (value: string) => void;
}

export function InputField({
  id,
  label,
  description,
  placeholder,
  value,
  min,
  max,
  step = "any",
  error,
  suffix,
  onChange,
}: InputFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      {description ? (
        <p id={descriptionId} className="input-description">
          {description}
        </p>
      ) : null}
      <div className={`input-shell ${error ? "input-shell-error" : ""}`}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          value={value}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? <span className="input-suffix">{suffix}</span> : null}
      </div>
      {error ? (
        <p id={errorId} className="input-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
