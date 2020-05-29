#!/bin/bash

SRC_DATA="../data/pyr"
DST_MBTL="../../public/data/pyr.mbtiles"
DST_PBFS="../../public/data/pyr/"

## Generate pyr.mbtiles
tippecanoe --drop-densest-as-needed \
    --force \
    -z 13 \
    -o "${DST_MBTL}" \
    ${SRC_DATA}/*.geojson

## Generate pyr PBFs
tippecanoe --drop-densest-as-needed \
    --no-tile-compression \
    --force \
    -z 13 \
    -e "${DST_PBFS}" \
    ${SRC_DATA}/*.geojson

echo "Done"