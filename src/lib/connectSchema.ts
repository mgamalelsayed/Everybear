import { z } from 'zod';

export const SERVICES = [
  'packaging',
  'branding',
  'production',
  'cnc',
  'events',
  'print',
  'giveaway',
  'video',
  'other',
] as const;

export const REFERRAL_SOURCES = [
  'instagram',
  'linkedin',
  'referral',
  'search',
  'event',
  'other',
] as const;

export type ServiceKey = (typeof SERVICES)[number];
export type ReferralKey = (typeof REFERRAL_SOURCES)[number];

export const BUDGET_MIN_USD = 1_000;
export const BUDGET_MAX_USD = 500_000;
export const BUDGET_STEP_USD = 1_000;
export const USD_TO_EGP = 50;

export const connectSchema = z
  .object({
    services: z.array(z.enum(SERVICES)).min(1),
    otherService: z.string().trim().max(120).optional(),
    name: z.string().trim().min(2),
    company: z.string().trim().min(1),
    phone: z.string().trim().min(5),
    email: z.string().trim().email(),
    budgetUsd: z.number().min(BUDGET_MIN_USD).max(BUDGET_MAX_USD),
    goals: z.string().trim().min(1),
    referral: z.enum(REFERRAL_SOURCES).optional(),
  })
  .refine(
    (data) =>
      !data.services.includes('other') ||
      (data.otherService !== undefined && data.otherService.length >= 2),
    {
      message: 'Please tell us briefly what service you need.',
      path: ['otherService'],
    },
  );

export type ConnectFormValues = z.infer<typeof connectSchema>;
