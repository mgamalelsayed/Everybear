'use client';

import { useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import {
  BUDGET_MAX_USD,
  BUDGET_MIN_USD,
  BUDGET_STEP_USD,
  USD_TO_EGP,
} from '@/lib/connectSchema';

type Currency = 'USD' | 'EGP';

function format(usd: number, currency: Currency): string {
  const value = currency === 'USD' ? usd : usd * USD_TO_EGP;
  const symbol = currency === 'USD' ? '$' : 'EGP';
  const isMax = usd >= BUDGET_MAX_USD;

  let pretty: string;
  if (value >= 1_000_000) {
    pretty = `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  } else if (value >= 1_000) {
    pretty = `${Math.round(value / 1_000)}K`;
  } else {
    pretty = String(value);
  }

  const formatted =
    currency === 'USD' ? `${symbol}${pretty}` : `${pretty} ${symbol}`;
  return `${formatted}${isMax ? '+' : ''}`;
}

export function BudgetSlider({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
}) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [currency, setCurrency] = useState<Currency>('EGP');

  const fill = useMemo(() => {
    const pct = ((value - BUDGET_MIN_USD) / (BUDGET_MAX_USD - BUDGET_MIN_USD)) * 100;
    return Math.min(100, Math.max(0, pct));
  }, [value]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5">
        {/*
          Local dir override on the label so the inline label+value reads in
          natural language order even though the page layout stays LTR. In
          Arabic the label sits on the right and the value sits on the left.
        */}
        <label
          htmlFor="budget"
          dir={isAr ? 'rtl' : 'ltr'}
          className="text-sm md:text-base text-bone/85"
        >
          {label}{' '}
          <span dir="ltr" className="text-bone font-medium ms-2 inline-block">
            {format(value, currency)}
          </span>
        </label>

        <div
          role="tablist"
          className="inline-flex rounded-full border hairline p-0.5 text-[11px] rtl:text-sm font-medium uppercase tracking-widest rtl:tracking-normal"
        >
          {(['USD', 'EGP'] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={currency === c}
              onClick={() => setCurrency(c)}
              className={`focus-ring rounded-full px-3 py-1.5 transition-colors ${
                currency === c
                  ? 'bg-bone text-ink'
                  : 'text-bone/85 hover:text-bone'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <input
        id="budget"
        type="range"
        dir={isAr ? 'rtl' : 'ltr'}
        className="budget"
        min={BUDGET_MIN_USD}
        max={BUDGET_MAX_USD}
        step={BUDGET_STEP_USD}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--fill' as string]: `${fill}%` }}
      />

      <div className="mt-3 flex items-center justify-between font-medium text-[11px] rtl:text-sm text-bone/85 uppercase tracking-widest rtl:tracking-normal">
        <span dir="ltr">{format(BUDGET_MIN_USD, currency)}</span>
        <span dir="ltr">{format(BUDGET_MAX_USD, currency)}</span>
      </div>
    </div>
  );
}
