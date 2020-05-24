#!/bin/bash

SRC_DATA="../data"
DST_MBTL="../../public/data/pyrenees.mbtiles"
DST_PBFS="../../public/data/pyrenees/"

tippecanoe --drop-densest-as-needed \
    --force \
    -z 13 \
    -o "${DST_VTILE}" \
    ${SRC_DATA}/*.geojson

tippecanoe --drop-densest-as-needed \
    --no-tile-compression \
    --force \
    -z 13 \
    -e "${DST_PBFS}" \
    ${SRC_DATA}/*.geojson
