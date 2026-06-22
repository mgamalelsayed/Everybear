'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ease = [0.65, 0.02, 0.05, 1] as const;

/**
 * Bear scratch intro:
 *  - t=0:    fills the viewport, opacity 1
 *  - t=0.35s: starts shrinking + fading out
 *  - t=1.95s: fully gone — no watermark left behind
 *
 * One-shot loader. Once the animation completes the element is invisible
 * (opacity 0) and pointer-events-none.
 */
export function IntroScratch() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 1.8, opacity: 0.95 }}
        animate={{ scale: 0.4, opacity: 0 }}
        transition={{
          duration: 1.6,
          delay: 0.35,
          ease,
        }}
        className="relative aspect-square w-[min(95vh,95vw)]"
        style={{ transformOrigin: 'center' }}
      >
        <Image
          src="/bear-scratch.svg"
          alt=""
          fill
          priority
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
}
