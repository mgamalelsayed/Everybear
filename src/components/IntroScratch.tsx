'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ease = [0.65, 0.02, 0.05, 1] as const;

/**
 * Bear scratch intro:
 *  - t=0:    fills the viewport, opacity 1
 *  - t=1.2s: starts shrinking + drifting toward background
 *  - t=2.4s: settled as a faded watermark behind the hero
 *
 * The element stays on the page after settling so it reads as the
 * hero's background mark, not a one-shot loader.
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
        animate={{ scale: 0.55, opacity: 0.08 }}
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
