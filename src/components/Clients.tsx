'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CLIENTS } from '@/lib/clients';
import { SectionReveal } from './SectionReveal';

type Client = (typeof CLIENTS)[number];

const ROW_COUNT = 3;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Per-breakpoint tile metrics. Must match the Tailwind sizes on the tile. */
const METRICS = {
  sm: { w: 144, h: 80, gap: 16, rowGap: 16 },
  md: { w: 208, h: 112, gap: 24, rowGap: 20 },
};

/**
 * Each logo is rendered twice. Copy 0 lays out the sphere; copy 1 is parked
 * inside the sphere at zero opacity and only fades in as the wall unfolds,
 * where it doubles the row width so the marquee can wrap without a visible
 * seam on wide screens. Keeping the DOM count fixed is what lets a single
 * transform lerp morph one state into the other.
 */
const COPIES = 2;

/** Seconds for a full fold or unfold. */
const FOLD_DURATION = 1.15;

/**
 * Evaluates a CSS cubic-bezier(x1, y1, x2, y2) in JS. Newton-Raphson to
 * invert x -> t, then read y. Replaces the exponential chase this used to
 * do, which never really settled and gave the motion no ease-out at all.
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (u: number, v: number) => 1 - 3 * v + 3 * u;
  const b = (u: number, v: number) => 3 * v - 6 * u;
  const c = (u: number) => 3 * u;
  const calc = (t: number, u: number, v: number) =>
    ((a(u, v) * t + b(u, v)) * t + c(u)) * t;
  const slope = (t: number, u: number, v: number) =>
    3 * a(u, v) * t * t + 2 * b(u, v) * t + c(u);

  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const dx = calc(t, x1, x2) - x;
      if (Math.abs(dx) < 1e-5) break;
      const d = slope(t, x1, x2);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return calc(t, y1, y2);
  };
}

/**
 * Symmetric ease-in-out. Deliberately not the site's `ease-smooth`
 * (0.6, 0.05, 0.05, 1): that curve puts ~82% of the travel in the first
 * half, which suits a snappy hover but makes a full-second morph lurch off
 * the mark. This eases evenly at both ends.
 */
const EASE_IN_OUT = cubicBezier(0.45, 0, 0.55, 1);

type Placed = {
  client: Client;
  copy: number;
  /** Unit vector on the sphere (copy 0 only; copy 1 mirrors its twin). */
  ux: number;
  uy: number;
  uz: number;
  row: number;
  col: number;
};

function buildLayout(clients: Client[]): { tiles: Placed[]; perRow: number[] } {
  const n = clients.length;
  const perRow = Array.from({ length: ROW_COUNT }, (_, r) =>
    Math.floor(n / ROW_COUNT) + (r < n % ROW_COUNT ? 1 : 0),
  );

  // Fibonacci sphere — even spacing without clustering at the poles.
  const unit = clients.map((_, i) => {
    const uy = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - uy * uy));
    const theta = GOLDEN_ANGLE * i;
    return { ux: Math.cos(theta) * r, uy, uz: Math.sin(theta) * r };
  });

  const tiles: Placed[] = [];
  for (let copy = 0; copy < COPIES; copy++) {
    let idx = 0;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < perRow[row]; col++) {
        tiles.push({ client: clients[idx], copy, row, col, ...unit[idx] });
        idx++;
      }
    }
  }
  return { tiles, perRow };
}

export function Clients() {
  const t = useTranslations('clients');
  const { tiles, perRow } = useMemo(() => buildLayout(CLIENTS), []);

  const stageRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Target fold state: 0 = sphere, 1 = unfolded rows.
  const targetRef = useRef(0);
  const [unfolded, setUnfolded] = useState(false);
  const [canHover, setCanHover] = useState(true);
  // Live geometry, written by measure() so pointer hit-testing uses the same
  // numbers the tiles are actually laid out with.
  const metricsRef = useRef({ ...METRICS.md, radius: 260 });

  // Drag state. `pending` accumulates pointer movement between frames and is
  // drained by the loop, so the fling velocity is derived against a real dt
  // rather than whatever rate pointermove happens to fire at.
  const dragRef = useRef({ active: false, lastX: 0, pointerId: -1, pending: 0 });
  // Distance of the last gesture, so a drag on touch does not also fire the
  // tap-to-toggle.
  const draggedRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Radius is measured off the stage rather than hard-coded, so the poles
    // never clip: the container height is a clamp() that moves independently
    // of the 768px breakpoint the tile size switches on.
    const measure = () => {
      const base = window.innerWidth >= 768 ? METRICS.md : METRICS.sm;
      const stageH = stageRef.current?.clientHeight ?? 0;
      const radius = Math.max(120, (stageH / 2 - base.h / 2) * 0.94);
      metricsRef.current = { ...base, radius };
      return metricsRef.current;
    };

    let m = measure();
    const onResize = () => {
      m = measure();
    };
    window.addEventListener('resize', onResize);

    // Reduced motion: skip the sphere entirely and present the flat wall.
    if (reduced) targetRef.current = 1;

    let raf = 0;
    let last = performance.now();
    // Linear clock for the fold; the bezier is applied on read. Reversing
    // mid-flight just walks this back from wherever it got to.
    let clock = reduced ? 1 : 0;
    let spin = 0;
    let tilt = -0.18;
    const offsets = [0, 0, 0];
    // Carried velocity after a flick, in px/s. Decays back to the drift.
    let fling = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      clock += (targetRef.current === 1 ? 1 : -1) * (dt / FOLD_DURATION);
      clock = clock < 0 ? 0 : clock > 1 ? 1 : clock;
      const p = EASE_IN_OUT(clock);

      if (!reduced) {
        // Sphere keeps turning; the spin winds down as the wall flattens.
        spin += dt * 0.28 * (1 - p);
        tilt += (-0.18 * (1 - p) - tilt) * Math.min(1, dt * 4);
      }

      const drag = dragRef.current;
      const pulled = drag.pending;
      drag.pending = 0;

      if (drag.active) {
        // Track the pointer 1:1 across every row, and keep a smoothed estimate
        // of the throw speed for when the finger lifts.
        for (let r = 0; r < ROW_COUNT; r++) offsets[r] += pulled;
        if (dt > 0) fling = fling * 0.7 + (pulled / dt) * 0.3;
      } else {
        // Rows only travel once there is something to travel. This runs
        // regardless of hover: the wall should never stall under the cursor.
        const speed = 45 * p;
        offsets[0] -= speed * dt;
        offsets[1] += speed * dt;
        offsets[2] -= speed * dt;

        if (fling !== 0) {
          for (let r = 0; r < ROW_COUNT; r++) offsets[r] += fling * dt;
          // ~4% of the speed survives each second; below 1px/s just stop.
          fling *= Math.pow(0.04, dt);
          if (Math.abs(fling) < 1) fling = 0;
        }
      }

      const cs = Math.cos(spin);
      const ss = Math.sin(spin);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      for (let i = 0; i < tiles.length; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;
        const tile = tiles[i];

        // --- sphere position ---
        const rx = tile.ux * cs + tile.uz * ss;
        const rz = -tile.ux * ss + tile.uz * cs;
        const ry = tile.uy * ct - rz * st;
        const rz2 = tile.uy * st + rz * ct;

        const sx = rx * m.radius;
        const sy = ry * m.radius;
        const sz = rz2 * m.radius;

        // --- row position, wrapped over the doubled row width ---
        const span = m.w + m.gap;
        const rowW = perRow[tile.row] * span;
        const total = rowW * COPIES;
        let lx = tile.col * span + tile.copy * rowW + offsets[tile.row];
        lx = (((lx % total) + total) % total) - total / 2;
        const ly = (tile.row - (ROW_COUNT - 1) / 2) * (m.h + m.rowGap);

        const fx = sx + (lx - sx) * p;
        const fy = sy + (ly - sy) * p;
        const fz = sz + (0 - sz) * p;

        el.style.transform = `translate3d(${fx.toFixed(2)}px, ${fy.toFixed(2)}px, ${fz.toFixed(2)}px)`;

        // Depth fade on the sphere; duplicates stay hidden until it unfolds.
        const depth = (rz2 + 1) / 2;
        const sphereOpacity = tile.copy === 0 ? 0.25 + 0.75 * depth : 0;
        el.style.opacity = (sphereOpacity + (1 - sphereOpacity) * p).toFixed(3);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [tiles, perRow]);

  const setOpen = (open: boolean) => {
    const next = open ? 1 : 0;
    if (targetRef.current === next) return;
    targetRef.current = next;
    setUnfolded(open);
  };

  /**
   * Hit-test against the shape actually on screen, not the full-width band.
   * Folded, that is the sphere's ellipse. Once open it widens to the row
   * block, so sweeping across the unfolded logos does not collapse it.
   */
  const pointerOnShape = (e: { clientX: number; clientY: number }) => {
    const el = stageRef.current;
    if (!el) return false;
    const box = el.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    const m = metricsRef.current;

    if (targetRef.current === 1) {
      return Math.abs(dy) <= (ROW_COUNT * (m.h + m.rowGap)) / 2;
    }
    const rx = m.radius + m.w / 2;
    const ry = m.radius + m.h / 2;
    return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
  };

  return (
    <section
      id="studio"
      className="clients-section relative overflow-hidden py-16 md:py-24"
    >
      {/* Backdrop EVERYBEAR wordmark, low-opacity, fades in on tile hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center select-none"
      >
        <span
          lang="en"
          className="clients-backdrop font-condensed font-black uppercase leading-none tracking-[-0.04em] text-bone opacity-0 transition-opacity duration-700 ease-smooth whitespace-nowrap"
          style={{ fontSize: 'clamp(3rem, 16vw, 22rem)' }}
        >
          Everybear
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 mb-10 md:mb-14">
        <SectionReveal>
          <div className="text-center">
            <h2 className="font-condensed font-black uppercase text-display-section">
              {t('headline')}
            </h2>
            <p className="mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-bone/75 leading-relaxed">
              {t('lede')}
            </p>
            <p className="mt-4 font-medium text-[11px] rtl:text-sm uppercase tracking-widest rtl:tracking-normal text-bone/45">
              {canHover ? t('hintHover') : t('hintTap')}
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Sphere / wall stage */}
      <div
        ref={stageRef}
        role={canHover ? undefined : 'button'}
        tabIndex={canHover ? undefined : 0}
        aria-label={canHover ? undefined : t('hintTap')}
        aria-expanded={canHover ? undefined : unfolded}
        onPointerDown={(e) => {
          // Only the unfolded wall is draggable; the sphere has nothing to
          // scrub through.
          if (targetRef.current !== 1) return;
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          dragRef.current = {
            active: true,
            lastX: e.clientX,
            pointerId: e.pointerId,
            pending: 0,
          };
          draggedRef.current = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const drag = dragRef.current;
          if (drag.active) {
            const dx = e.clientX - drag.lastX;
            drag.lastX = e.clientX;
            drag.pending += dx;
            draggedRef.current += Math.abs(dx);
            return;
          }
          // Not dragging: hover drives the fold.
          if (canHover) setOpen(pointerOnShape(e));
        }}
        onPointerUp={(e) => {
          const drag = dragRef.current;
          if (!drag.active) return;
          drag.active = false;
          if (e.currentTarget.hasPointerCapture(drag.pointerId)) {
            e.currentTarget.releasePointerCapture(drag.pointerId);
          }
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
        onMouseLeave={
          canHover
            ? () => {
                // A drag that leaves the stage keeps its grip; the pointer is
                // captured, so folding here would yank it shut mid-gesture.
                if (!dragRef.current.active) setOpen(false);
              }
            : undefined
        }
        onClick={
          canHover
            ? undefined
            : (e) => {
                // Swallow the click that terminates a swipe.
                if (draggedRef.current > 8) return;
                if (pointerOnShape(e) || unfolded) setOpen(!unfolded);
              }
        }
        onKeyDown={
          canHover
            ? undefined
            : (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(!unfolded);
                }
              }
        }
        className={`focus-ring relative z-10 w-full select-none ${
          unfolded ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        style={{
          height: 'clamp(440px, 62vw, 660px)',
          perspective: '1400px',
          // Keep vertical page scrolling with the browser, take horizontal.
          touchAction: 'pan-y',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {tiles.map((tile, i) => (
            <div
              key={`${tile.client.slug}-${tile.copy}`}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className="client-tile group/tile absolute left-1/2 top-1/2 w-36 h-20 md:w-52 md:h-28 -ml-[72px] -mt-10 md:-ml-[104px] md:-mt-14"
              // Hidden until the first frame places it, otherwise all 76 tiles
              // paint stacked at dead centre before the loop starts.
              style={{ opacity: 0 }}
            >
              {/*
                Solid tile rather than the old frosted glass: 76 of these are
                re-transformed every frame, and backdrop-filter on that many
                moving layers drops the sphere well below 60fps.
              */}
              <div className="relative w-full h-full bg-white/85 border border-white/40 rounded-md overflow-hidden shadow-[0_12px_40px_-24px_rgba(0,0,0,0.6)] transition-[background-color,box-shadow] duration-500 group-hover/tile:bg-white group-hover/tile:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)]">
                <Image
                  src={`/clients/${tile.client.slug}.${tile.client.ext ?? 'png'}`}
                  alt={tile.client.name}
                  fill
                  sizes="(max-width: 768px) 144px, 208px"
                  className="object-contain p-3 md:p-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
