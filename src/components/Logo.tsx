import Image from 'next/image';

/**
 * Brand mark. Three variants:
 *  - icon:    bear silhouette only (no wordmark) — for tight spots like nav
 *  - compact: bear + EVERYBEAR stacked
 *  - full:    bear + EVERYBEAR + Advertising Agency
 */
export function Logo({
  variant = 'compact',
  className = '',
}: {
  variant?: 'icon' | 'compact' | 'full';
  className?: string;
}) {
  const config = {
    icon: { src: '/logo-everybear-icon.svg', ratio: 95 / 115 },
    compact: { src: '/logo-everybear.svg', ratio: 158 / 133 },
    full: { src: '/logo-everybear-full.svg', ratio: 370 / 125 },
  }[variant];

  return (
    <span
      aria-label="Everybear"
      className={`relative block ${className}`}
      style={{ aspectRatio: config.ratio }}
    >
      <Image
        src={config.src}
        alt="Everybear"
        fill
        priority
        sizes="240px"
        className="object-contain"
      />
    </span>
  );
}
