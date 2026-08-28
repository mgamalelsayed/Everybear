'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll wrapper for the whole document.
 *
 * Why: scroll-driven camera work in R3F reads *terrible* on the browser's
 * native stepped scroll. Lenis rewrites the wheel handler to interpolate
 * over ~1s, and its `scroll` events pipe into three-fiber's `useFrame`
 * cleanly so the camera can be scroll-position-driven with sub-pixel smoothness.
 *
 * Also broadcasts to `window` so any component (including R3F scenes) can
 * subscribe without lifting state.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
      infinite: false,
      lerp: 0.11,
    });

    // Expose for other components (e.g. R3F scenes) to read scroll position.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
