#!/usr/bin/env node
/**
 * Splits a TrueType Collection (.ttc) into individual .ttf files.
 * Reads font names from each face's `name` table so output filenames
 * match the embedded family/style. Sufficient for our @font-face needs.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , inPath, outDir] = process.argv;
if (!inPath || !outDir) {
  console.error('usage: split-ttc.mjs <input.ttc> <out-dir>');
  process.exit(1);
}

const buf = readFileSync(resolve(inPath));
mkdirSync(resolve(outDir), { recursive: true });

const tag = buf.toString('ascii', 0, 4);
if (tag !== 'ttcf') throw new Error(`not a TTC: tag=${tag}`);
const numFonts = buf.readUInt32BE(8);
const offsets = [];
for (let i = 0; i < numFonts; i++) offsets.push(buf.readUInt32BE(12 + i * 4));

function readNameTableStrings(table) {
  const count = table.readUInt16BE(2);
  const storageOffset = table.readUInt16BE(4);
  const records = [];
  for (let i = 0; i < count; i++) {
    const r = 6 + i * 12;
    records.push({
      platformID: table.readUInt16BE(r),
      encodingID: table.readUInt16BE(r + 2),
      languageID: table.readUInt16BE(r + 4),
      nameID: table.readUInt16BE(r + 6),
      length: table.readUInt16BE(r + 8),
      offset: table.readUInt16BE(r + 10),
    });
  }
  const decode = (rec) => {
    const start = storageOffset + rec.offset;
    const slice = table.subarray(start, start + rec.length);
    if (rec.platformID === 3 || rec.platformID === 0)
      return slice.swap16().toString('utf16le');
    return slice.toString('ascii');
  };
  const pick = (id) => {
    const macEnglish = records.find(
      (r) => r.nameID === id && r.platformID === 1 && r.languageID === 0,
    );
    if (macEnglish) return decode(macEnglish);
    const winEnglish = records.find(
      (r) =>
        r.nameID === id && r.platformID === 3 && (r.languageID & 0xff) === 0x09,
    );
    if (winEnglish) return decode(winEnglish);
    const any = records.find((r) => r.nameID === id);
    return any ? decode(any) : '';
  };
  return { family: pick(1), subfamily: pick(2), postscript: pick(6) };
}

function extractFace(offset) {
  // Offset Table
  const numTables = buf.readUInt16BE(offset + 4);
  const headerSize = 12 + 16 * numTables;
  const entries = [];
  for (let i = 0; i < numTables; i++) {
    const e = offset + 12 + i * 16;
    entries.push({
      tag: buf.toString('ascii', e, e + 4),
      checksum: buf.readUInt32BE(e + 4),
      offset: buf.readUInt32BE(e + 8),
      length: buf.readUInt32BE(e + 12),
    });
  }

  // Lay out tables sequentially after header (4-byte aligned).
  let pos = headerSize;
  for (const ent of entries) {
    ent.newOffset = pos;
    pos += ent.length;
    pos = (pos + 3) & ~3; // pad
  }
  const total = pos;

  const out = Buffer.alloc(total);
  // Offset Table header
  out.writeUInt32BE(buf.readUInt32BE(offset), 0); // sfntVersion
  out.writeUInt16BE(numTables, 4);
  // searchRange = (2^floor(log2(n))) * 16
  const log2 = Math.floor(Math.log2(numTables));
  const searchRange = Math.pow(2, log2) * 16;
  const rangeShift = numTables * 16 - searchRange;
  out.writeUInt16BE(searchRange, 6);
  out.writeUInt16BE(log2, 8);
  out.writeUInt16BE(rangeShift, 10);

  for (let i = 0; i < entries.length; i++) {
    const ent = entries[i];
    const e = 12 + i * 16;
    out.write(ent.tag, e, 4, 'ascii');
    out.writeUInt32BE(ent.checksum, e + 4);
    out.writeUInt32BE(ent.newOffset, e + 8);
    out.writeUInt32BE(ent.length, e + 12);
    buf.copy(out, ent.newOffset, ent.offset, ent.offset + ent.length);
  }

  // Read family/style for filename
  const nameEntry = entries.find((e) => e.tag === 'name');
  if (!nameEntry) return { buffer: out, family: 'Unknown', subfamily: 'Regular' };
  const nameTable = buf.subarray(
    nameEntry.offset,
    nameEntry.offset + nameEntry.length,
  );
  const names = readNameTableStrings(nameTable);
  return { buffer: out, ...names };
}

function safe(s) {
  return s
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

const manifest = [];
for (let i = 0; i < offsets.length; i++) {
  const face = extractFace(offsets[i]);
  const filename = `${safe(face.family)}-${safe(face.subfamily)}.ttf`;
  const outPath = join(resolve(outDir), filename);
  writeFileSync(outPath, face.buffer);
  console.log(`${i + 1}/${offsets.length}  ${filename}  ${face.buffer.length.toLocaleString()} bytes`);
  manifest.push({ filename, family: face.family, subfamily: face.subfamily, postscript: face.postscript });
}

writeFileSync(
  join(resolve(outDir), 'manifest.json'),
  JSON.stringify(manifest, null, 2),
);
console.log(`\nWrote ${manifest.length} faces.`);
