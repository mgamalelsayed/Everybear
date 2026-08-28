'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Kept out of the initial bundle: three.js is ~40MB of dependency and devices
// that fall back to the flat image should never pay to download it.
const BearCanvas = dynamic(
  () => import('./three/BearCanvas').then((m) => m.BearCanvas),
  { ssr: false },
);

/**
 * The bear behind the whole site.
 *
 * On a capable desktop this is the 3D plane: inset rather than full-bleed, and
 * drifting slightly against the cursor. Where WebGL is unavailable, the
 * viewport is narrow, or motion is reduced, it falls back to the same
 * photograph as a flat image dimmed to match, so the backdrop is never simply
 * missing.
 */
export function BearBackdrop() {
  const pathname = usePathname();
  const isHome = /^\/(en|ar)\/?$/.test(pathname ?? '');
  const [use3D, setUse3D] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const isNarrow = window.innerWidth < 640;
    const hasWebGL = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        );
      } catch {
        return false;
      }
    })();

    setUse3D(!prefersReduced && !isNarrow && hasWebGL);
  }, []);

  if (use3D) return <BearCanvas isHome={isHome} />;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink"
    >
      {/* Matches the 3D tint: the plane multiplies the texture by #8a8a8a
          (0.54) and settles at 0.22 on home / 0.12 elsewhere. */}
      <Image
        src="/bear-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover transition-opacity duration-700 ease-smooth"
        style={{
          opacity: use3D === null ? 0 : isHome ? 0.22 : 0.12,
          filter: 'brightness(0.55)',
        }}
      />
    </div>
  );
}
