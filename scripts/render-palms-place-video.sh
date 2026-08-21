#!/usr/bin/env bash
# Render Palms Place Las Vegas social videos from first-party photos.
# Usage: scripts/render-palms-place-video.sh [output-dir]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${1:-/opt/cursor/artifacts}"
IMG="$ROOT/public/images"
FONT_BOLD="/usr/share/fonts/truetype/macos/Inter-Bold.ttf"
FONT_SEMI="/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

mkdir -p "$OUT_DIR"

# Captions match PalmsPlaceCondos_VideoScript_2026-08-21_V2 (Jan-first).
cat >"$WORK/c1.txt" <<'EOF'
Dr. Jan Duffy
Palms Place listing specialist
EOF
cat >"$WORK/c2.txt" <<'EOF'
The realtor this tower's
buyers and sellers work with first
EOF
cat >"$WORK/c3.txt" <<'EOF'
Her listing: #8322
1 bed · 1,220 SF · 8th-floor corner
EOF
cat >"$WORK/c4.txt" <<'EOF'
She tours Palms Place with you
HOA packet first
EOF
cat >"$WORK/c5.txt" <<'EOF'
Live Palms Place search
with Dr. Jan Duffy
EOF
cat >"$WORK/c6.txt" <<'EOF'
Call (702) 827-4544
PalmsPlaceCondos.com
EOF

clip() {
  local src="$1" dur="$2" cap="$3" dest="$4" w="$5" h="$6"
  ffmpeg -y -hide_banner -loglevel error \
    -loop 1 -framerate 30 -t "$dur" -i "$src" \
    -vf "
      scale=${w}:${h}:force_original_aspect_ratio=increase,
      crop=${w}:${h},
      fade=t=in:st=0:d=0.35,
      fade=t=out:st=$(awk -v d="$dur" 'BEGIN{printf "%.2f", d-0.35}'),
      drawbox=x=0:y=0:w=iw:h=96:color=0x0D0D0D@0.82:t=fill,
      drawtext=fontfile=${FONT_SEMI}:text='DR. JAN DUFFY  ·  PALMS PLACE LISTING SPECIALIST':fontcolor=0xC5A35A:fontsize=26:x=(w-text_w)/2:y=34,
      drawtext=fontfile=${FONT_BOLD}:textfile=${cap}:reload=0:fontcolor=0xF5F0E6:fontsize=44:line_spacing=10:x=(w-text_w)/2:y=h-th-160:box=1:boxcolor=0x0D0D0D@0.78:boxborderw=32
    " \
    -c:v libx264 -pix_fmt yuv420p -an "$dest"
}

render_aspect() {
  local w="$1" h="$2" label="$3"
  local dir="$WORK/$label"
  mkdir -p "$dir"
  clip "$IMG/hero-tower-dusk.webp" 8 "$WORK/c1.txt" "$dir/01.mp4" "$w" "$h"
  clip "$IMG/listings/unit-8322/palms-place-8322-living-room-strip-view-las-vegas.jpg" 8 "$WORK/c2.txt" "$dir/02.mp4" "$w" "$h"
  clip "$IMG/listings/unit-8322/palms-place-8322-balcony-strip-view-las-vegas.jpg" 8 "$WORK/c3.txt" "$dir/03.mp4" "$w" "$h"
  clip "$IMG/unwind-pool-amenities.webp" 8 "$WORK/c4.txt" "$dir/04.mp4" "$w" "$h"
  clip "$IMG/stay-one-bedroom-interior.webp" 8 "$WORK/c5.txt" "$dir/05.mp4" "$w" "$h"
  clip "$IMG/hero-tower-dusk.webp" 8 "$WORK/c6.txt" "$dir/06.mp4" "$w" "$h"
  printf "file '%s'\n" "$dir"/0{1,2,3,4,5,6}.mp4 >"$dir/list.txt"
  ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$dir/list.txt" \
    -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an \
    "$OUT_DIR/palms-place-las-vegas-${label}.mp4"
}

render_aspect 1080 1920 shorts
render_aspect 1920 1080 youtube

echo "Wrote:"
ls -lh "$OUT_DIR"/palms-place-las-vegas-*.mp4
