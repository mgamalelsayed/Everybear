import Script from 'next/script';

/**
 * Plausible analytics. Renders only when both env vars are set.
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=everybear.net
 *   NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.js
 *
 * Use a self-hosted Plausible by pointing SRC at your instance, or omit
 * both env vars to keep analytics turned off.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ??
    'https://plausible.io/js/script.js';

  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
