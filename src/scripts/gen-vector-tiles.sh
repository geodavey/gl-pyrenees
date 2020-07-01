#!/bin/bash

SRC_DATA="../data/pyrenees"
DST_MBTL="../../dist/data/pyrenees.mbtiles"

## Generate pyr.mbtiles
tippecanoe --drop-densest-as-needed \
    --force \
    -z 13 \
    -r1 \
    -o "${DST_MBTL}" \
    ${SRC_DATA}/*.geojson

echo "Done"