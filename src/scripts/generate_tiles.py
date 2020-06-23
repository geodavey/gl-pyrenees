#!/usr/bin/env python3

import settings as s
import subprocess
import logging

log = logging.getLogger()

def exec(cmd):
    log.info("Executing: {}".format("\n            ".join([str(c) for c in cmd])))
    return subprocess.Popen(cmd, stdout=subprocess.PIPE).communicate()

exec(["tippecanoe",
      "--force",
      "--minimum-zoom=9",
      "--maximum-zoom=14",
      "-o", s.out_dir/"highway.mbtiles"]
     +
     [s.pyr_dir/"paths.geojson",
      s.pyr_dir/"tracks.geojson"])

exec(["tippecanoe",
      "--force",
      "--maximum-zoom=14",
      "-r1",
      "-o", s.out_dir/"hiking.mbtiles"]
     +
     [s.pyr_dir/"refuges.geojson",
      s.pyr_dir/"hiking.geojson",
      s.pyr_dir/"peaks.geojson",
      s.pyr_dir/"pois.geojson"])

exec(["tile-join",
      "--force",
      "-o", s.out_dir/"pyr.mbtiles"]
     +
     [s.out_dir/"highway.mbtiles",
      s.out_dir/"hiking.mbtiles"])

exec(["tile-join",
      "--force",
      "--no-tile-compression",
      "-e", s.out_dir/"pyr/"]
     +
     [s.out_dir/"highway.mbtiles",
      s.out_dir/"hiking.mbtiles"])

[f.unlink() for f in [s.out_dir/"highway.mbtiles", s.out_dir/"hiking.mbtiles"]]