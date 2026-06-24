#!/usr/bin/env node
/**
 * Trim ambient padding from every PNG in public/clients/.
 *
 * Sharp's built-in `trim()` only matches the corner pixel exactly, so it
 * fails on PNGs that have semi-transparent edges (e.g. Computer Shop) or
 * mixed white+transparent borders. We do a manual content-bounding-box
 * detection instead: walk the pixels and find the tightest rectangle
 * containing anything that isn't "blank".
 *
 * "Blank" = (alpha < 12) OR (rgb all > 248 AND alpha low/none).
 * Anything else counts as logo content.
 */

import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const DIR = new URL('../public/clients/', import.meta.url).pathname;

const ALPHA_THRESHOLD = 30; // pixels with alpha below this are blank
const WHITE_THRESHOLD = 245; // r/g/b above this with low alpha is treated as blank
const PAD = 0.005; // 0.5% breathing room around content bbox

async function findContentBbox(path) {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  let minX = w,
    minY = h,
    maxX = -1,
    maxY = -1;

  // Quickly scan rows. Stop early once we have the bbox column-wise too.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * channels;
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];

      // Blank if alpha is essentially 0
      if (a < ALPHA_THRESHOLD) continue;
      // Blank if it's "almost white" with not-fully-opaque alpha
      if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD && a < 255) {
        continue;
      }

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX === -1) return null; // entirely blank, leave as is

  const padX = Math.max(1, Math.round(w * PAD));
  const padY = Math.max(1, Math.round(h * PAD));
  return {
    left: Math.max(0, minX - padX),
    top: Math.max(0, minY - padY),
    width: Math.min(w, maxX - minX + 1 + padX * 2),
    height: Math.min(h, maxY - minY + 1 + padY * 2),
    sourceW: w,
    sourceH: h,
  };
}

const files = (await readdir(DIR))
  .filter((f) => extname(f).toLowerCase() === '.png')
  .sort();

let trimmed = 0;
let skipped = 0;

for (const file of files) {
  const path = join(DIR, file);
  const beforeSize = (await stat(path)).size;

  try {
    const bbox = await findContentBbox(path);
    if (!bbox) {
      console.log(`  ⏭  ${file.padEnd(28)} fully blank, skipped`);
      continue;
    }

    const reduction =
      (bbox.width * bbox.height) / (bbox.sourceW * bbox.sourceH);
    // Anything within 2% of the original size is already tight enough
    if (reduction > 0.98) {
      skipped++;
      console.log(`  ⏭  ${file.padEnd(28)} already tight (${bbox.sourceW}×${bbox.sourceH})`);
      continue;
    }

    await sharp(path)
      .extract({ left: bbox.left, top: bbox.top, width: bbox.width, height: bbox.height })
      .png({ compressionLevel: 9 })
      .toFile(path + '.tmp');

    await sharp(path + '.tmp').toFile(path);
    await import('node:fs/promises').then((fs) => fs.unlink(path + '.tmp'));

    const afterSize = (await stat(path)).size;
    console.log(
      `  ✓ ${file.padEnd(28)} ${bbox.sourceW}×${bbox.sourceH} → ${bbox.width}×${bbox.height}   ${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB`,
    );
    trimmed++;
  } catch (err) {
    console.log(`  ✗ ${file.padEnd(28)} ${err.message}`);
  }
}

console.log(`\n${trimmed} trimmed, ${skipped} already tight.`);
