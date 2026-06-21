import Image from 'next/image';

/**
 * Wordmark + bear. Single source so Nav and Footer stay in sync.
 */
export function Logo({
  variant = 'compact',
  className = '',
}: {
  variant?: 'compact' | 'full';
  className?: string;
}) {
  const src =
    variant === 'full' ? '/logo-everybear-full.svg' : '/logo-everybear.svg';
  // Native aspect ratios from the source SVG viewBoxes
  const ratio = variant === 'full' ? 433.16 / 191.94 : 205.93 / 191.94;

  return (
    <span
      aria-label="Everybear"
      className={`relative block ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt="Everybear"
        fill
        priority
        sizes="240px"
        className="object-contain"
      />
    </span>
  );
}
