#!/bin/sh

set -e

OUTPUT_DIR='/out'
export TOTAL=$(find /images -type f -name '*' | grep -v '^$' | wc -l)

if [ -z "${SKIP_EXIF}" ]; then
  find /images -type f -name '*' | \
    xargs -P 4 -I {} sh -c 'node /transform.js "$(exiftool -j \"{}\")"' | \
  tippecanoe \
    --layer=data \
    -zg \
    --force \
    --no-tile-compression \
    --output-to-directory $OUTPUT_DIR/tiles \
    --drop-densest-as-needed

  find  $OUTPUT_DIR/tiles -name "*.pbf" -exec sh -c 'mv "$1" "${1%.pbf}".mvt' - '{}' \;
else
  echo 'Skip exif reading..'
fi

cp /index.html $OUTPUT_DIR/index.html
node /server.js $OUTPUT_DIR
