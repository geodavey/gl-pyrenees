#!/usr/bin/env python3

from logging.config import dictConfig
from pathlib import Path
import geopandas as gpd

base_dir = (Path(__file__).parent / "../../").resolve()
in_dir  = base_dir / "src/data/input"
osm_dir = base_dir / "src/data/osm/"
pyr_dir = base_dir / "src/data/pyr/"

out_dir = base_dir / "static/data/"

pyr_footprint = gpd.GeoDataFrame.from_file(in_dir / "footprint.geojson").loc[0].geometry

def rel_path(path):
    return str(path)[len(str(base_dir))+1:]

dictConfig({
    "version": 1,
    'formatters': {
        'f': {
            'format': '[%(levelname)7s] %(message)s',
            'datefmt': '%H:%M:%S'
        }
    },
    'handlers': {
        'h': {
            'class': 'logging.StreamHandler',
            'formatter': 'f',
            'level': 0
        }
    },
    "root": {
        'handlers': ['h'],
        'level': 20
    }
})
