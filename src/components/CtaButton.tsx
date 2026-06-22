import type { ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { Arrow } from './icons/Arrow';

/**
 * Primary action button used across the site.
 * - Filled cream pill on the dark canvas
 * - Embedded ink-coloured circle lozenge with the shared Arrow icon
 * - Subtle glow + lift on hover
 *
 * For external links, pass `href` as a string starting with http(s) and set
 * `external` so we render an <a> with target/rel.
 */
export function CtaButton({
  href,
  external = false,
  children,
  className = '',
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const sharedClassName = `focus-ring group relative inline-flex items-center gap-4 bg-bone text-ink rounded-full ps-7 pe-3 py-3 text-base md:text-lg font-medium shadow-[0_10px_40px_-10px_rgba(240,236,225,0.5)] hover:shadow-[0_18px_60px_-10px_rgba(240,236,225,0.75)] hover:scale-[1.02] transition-all duration-300 ease-smooth ${className}`;

  const inner = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-ink text-bone rtl:rotate-180 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5"
      >
        <Arrow className="w-4 h-4 md:w-[18px] md:h-[18px]" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={sharedClassName}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {inner}
    </Link>
  );
}
