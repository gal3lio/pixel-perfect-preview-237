import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  compact?: boolean;
}

export function QuantityStepper({ value, min, max, step, onChange, compact }: Props) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-card ${
        compact ? "h-10" : "h-12"
      }`}
    >
      <button
        type="button"
        aria-label="Decrease length"
        onClick={() => onChange(clamp(value - step))}
        disabled={value <= min}
        className={`grid ${compact ? "size-10" : "size-12"} place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary disabled:opacity-35`}
      >
        <Minus className="size-4" />
      </button>
      <span
        className={`min-w-[5.5rem] text-center font-semibold tabular-nums ${compact ? "text-sm" : ""}`}
      >
        {value} m
      </span>
      <button
        type="button"
        aria-label="Increase length"
        onClick={() => onChange(clamp(value + step))}
        disabled={value >= max}
        className={`grid ${compact ? "size-10" : "size-12"} place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary disabled:opacity-35`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
