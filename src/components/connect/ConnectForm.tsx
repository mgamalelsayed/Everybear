'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  REFERRAL_SOURCES,
  SERVICES,
  connectSchema,
  type ConnectFormValues,
  type ServiceKey,
} from '@/lib/connectSchema';
import { BudgetSlider } from './BudgetSlider';
import { Arrow } from '../icons/Arrow';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldCls =
  'focus-ring w-full bg-transparent border-0 border-b border-bone/15 focus:border-bone py-3 text-base md:text-lg placeholder:text-bone/30 transition-colors';

export function ConnectForm() {
  const t = useTranslations('connect.form');
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConnectFormValues>({
    resolver: zodResolver(connectSchema),
    mode: 'onSubmit',
    defaultValues: {
      services: [],
      otherService: '',
      name: '',
      company: '',
      phone: '',
      email: '',
      budgetUsd: 25_000,
      goals: '',
      referral: undefined,
    },
  });

  const services = watch('services');
  const otherSelected = services.includes('other');

  const onSubmit = async (values: ConnectFormValues) => {
    setStatus('submitting');
    try {
      const honeypot = (document.getElementById('website') as HTMLInputElement | null)?.value ?? '';
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <SuccessCard />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl bg-bone/5 border border-bone/10 backdrop-blur-md p-6 md:p-10"
    >
      {/* Honeypot — must stay empty. Visually hidden from humans. */}
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px] w-0 h-0 opacity-0"
      />
      <div className="mb-10 md:mb-14">
        <h2 className="text-display-md font-medium leading-tight">
          {t('headline')}{' '}
          <span className="text-bone/80">{t('sub')}</span>
        </h2>
      </div>

      {/* Services */}
      <fieldset className="mb-10 md:mb-14">
        <legend className="font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-4">
          {t('services.label')}
        </legend>
        <Controller
          control={control}
          name="services"
          render={({ field }) => {
            const selected = field.value ?? [];
            const toggle = (key: ServiceKey) =>
              field.onChange(
                selected.includes(key)
                  ? selected.filter((k) => k !== key)
                  : [...selected, key],
              );
            return (
              <div className="flex flex-wrap gap-2.5">
                {SERVICES.map((key) => {
                  const active = selected.includes(key);
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => toggle(key)}
                      aria-pressed={active}
                      className={`focus-ring rounded-full border px-4 py-2 text-sm transition-all ${
                        active
                          ? 'bg-bone text-ink border-bone'
                          : 'border-bone/20 text-bone/80 hover:border-bone/60 hover:text-bone'
                      }`}
                    >
                      {t(`services.options.${key}`)}
                    </button>
                  );
                })}
              </div>
            );
          }}
        />
        {errors.services && (
          <p className="mt-3 text-xs text-bone/85" role="alert">
            {t('errors.services')}
          </p>
        )}

        {/* Reveals when "Something else" is selected. Brief text to clarify. */}
        <AnimatePresence initial={false}>
          {otherSelected && (
            <motion.div
              key="otherService"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.6, 0.05, 0.05, 1] }}
              className="overflow-hidden"
            >
              <label
                htmlFor="otherService"
                className="block font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-2"
              >
                {t('otherService.label')}
              </label>
              <input
                id="otherService"
                placeholder={t('otherService.placeholder')}
                className={fieldCls}
                {...register('otherService')}
              />
              {errors.otherService && (
                <p className="mt-2 text-xs text-bone/85" role="alert">
                  {t('errors.otherService')}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>

      {/* Identity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
        <Field
          id="name"
          label={t('name.label')}
          error={errors.name && t('errors.required')}
        >
          <input
            id="name"
            placeholder={t('name.placeholder')}
            className={fieldCls}
            {...register('name')}
          />
        </Field>
        <Field
          id="company"
          label={t('company.label')}
          error={errors.company && t('errors.required')}
        >
          <input
            id="company"
            placeholder={t('company.placeholder')}
            className={fieldCls}
            {...register('company')}
          />
        </Field>
        <Field
          id="phone"
          label={t('phone.label')}
          error={errors.phone && t('errors.required')}
        >
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder={t('phone.placeholder')}
            className={fieldCls}
            {...register('phone')}
          />
        </Field>
        <Field
          id="email"
          label={t('email.label')}
          error={errors.email && t('errors.email')}
        >
          <input
            id="email"
            type="email"
            inputMode="email"
            placeholder={t('email.placeholder')}
            className={fieldCls}
            {...register('email')}
          />
        </Field>
      </div>

      {/* Budget */}
      <div className="mb-12 md:mb-14">
        <Controller
          control={control}
          name="budgetUsd"
          render={({ field }) => (
            <BudgetSlider
              value={field.value}
              onChange={field.onChange}
              label={t('budget.label')}
            />
          )}
        />
      </div>

      {/* Goals */}
      <Field
        id="goals"
        label={t('goals.label')}
        error={errors.goals && t('errors.required')}
        className="mb-10"
      >
        <textarea
          id="goals"
          rows={4}
          placeholder={t('goals.placeholder')}
          className={`${fieldCls} resize-none`}
          {...register('goals')}
        />
      </Field>

      {/* Referral */}
      <Field id="referral" label={t('referral.label')} className="mb-12 md:mb-14">
        <Controller
          control={control}
          name="referral"
          render={({ field }) => (
            <div className="relative">
              <select
                id="referral"
                value={field.value ?? ''}
                onChange={field.onChange}
                className={`${fieldCls} appearance-none pr-8 cursor-pointer`}
              >
                <option value="" className="bg-ink">
                  {t('referral.placeholder')}
                </option>
                {REFERRAL_SOURCES.map((key) => (
                  <option key={key} value={key} className="bg-ink">
                    {t(`referral.options.${key}`)}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute end-0 top-1/2 -translate-y-1/2 text-bone/85"
              >
                ↓
              </span>
            </div>
          )}
        />
      </Field>

      {/* Submit */}
      <div className="flex items-center justify-between gap-4">
        {status === 'error' ? (
          <p className="text-sm text-bone/85" role="alert">
            {t('errors.submit')}
          </p>
        ) : (
          <span className="text-xs text-bone/85">{t('disclaimer')}</span>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="focus-ring inline-flex items-center gap-3 rounded-full border border-bone/40 hover:bg-bone hover:text-ink px-6 py-3 text-sm transition-all disabled:opacity-90"
        >
          {status === 'submitting' ? t('submitting') : t('submit')}
          <span className="inline-block rtl:rotate-180">
            <Arrow className="w-4 h-4" />
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string | false;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/55 mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-bone/85" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessCard() {
  const t = useTranslations('connect.success');
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.05, 1] }}
      className="rounded-xl bg-bone/5 border border-bone/10 backdrop-blur-md p-10 md:p-16 text-center"
    >
      <h2 className="text-display-md font-medium mb-4">{t('headline')}</h2>
      <p className="text-base md:text-lg text-bone/85 max-w-xl mx-auto">
        {t('body')}
      </p>
    </motion.div>
  );
}
