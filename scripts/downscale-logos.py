#!/usr/bin/env python3
"""
Downscale public/clients/*.png to a sane delivery size.

The designer's exports are print-resolution: several are 12000px+ on a side
and 26MB, while the tiles that use them render at 208x112 CSS px. next/image
still has to decode the full source before it can resize, which costs about a
second of CPU per logo and risks exhausting memory on the largest ones
(zanussi is 12472x12472, ~155 megapixels, ~600MB decoded).

800px on the long edge leaves plenty of headroom for a 2x display at the
largest size any layout asks for, and it only ever shrinks.

Trimming is handled separately by trim-logos.mjs; this only resizes, so the
crop those files already have is preserved. Originals remain in _assets/logos.
"""

import os
import sys
from PIL import Image

# These are legitimately huge; opt out of the decompression-bomb guard.
Image.MAX_IMAGE_PIXELS = None

MAX_DIM = 800
DIR = os.path.join(os.path.dirname(__file__), "..", "public", "clients")


def human(n):
    for unit in ("B", "KB", "MB"):
        if n < 1024:
            return f"{n:.0f}{unit}"
        n /= 1024
    return f"{n:.1f}GB"


def main():
    directory = os.path.abspath(DIR)
    names = sorted(f for f in os.listdir(directory) if f.lower().endswith(".png"))
    if not names:
        print("no PNGs found in", directory)
        return 1

    before_total = after_total = 0
    print(f"{'file':<22}{'before':>9}{'after':>9}   dimensions")

    for name in names:
        path = os.path.join(directory, name)
        before = os.path.getsize(path)
        before_total += before

        with Image.open(path) as im:
            im.load()
            w, h = im.size
            # Normalise to RGBA so palette/greyscale sources keep transparency.
            if im.mode != "RGBA":
                im = im.convert("RGBA")
            if max(w, h) > MAX_DIM:
                s = MAX_DIM / max(w, h)
                im = im.resize(
                    (max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS
                )
            tmp = path + ".tmp"
            im.save(tmp, "PNG", optimize=True)

        os.replace(tmp, path)
        after = os.path.getsize(path)
        after_total += after
        print(
            f"{name:<22}{human(before):>9}{human(after):>9}   "
            f"{w}x{h} -> {im.size[0]}x{im.size[1]}"
        )

    print(
        f"\ntotal {human(before_total)} -> {human(after_total)}  "
        f"({100 * (1 - after_total / before_total):.1f}% smaller)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
