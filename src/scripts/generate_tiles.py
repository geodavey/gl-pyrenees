#!/usr/bin/env python3

import settings as s
import subprocess

subprocess.Popen(["tippecanoe",
                  "--force",
                  "--minimum-zoom=10",
                  "--maximum-zoom=14",
                  "-o", s.out_dir/"highway.mbtiles"]
                 +
                 [s.pyr_dir/"paths.geojson",
                  s.pyr_dir/"tracks.geojson"],
                 stdout=subprocess.PIPE).communicate()


subprocess.Popen(["tippecanoe",
                  "--force",
                  "--maximum-zoom=14",
                  "-o", s.out_dir/"hiking.mbtiles"]
                 +
                 [s.pyr_dir/"hiking.geojson",
                  s.pyr_dir/"peaks.geojson"],
                 stdout=subprocess.PIPE).communicate()

subprocess.Popen(["tile-join",
                  "--force",
                  "-o", s.out_dir/"pyr.mbtiles"]
                 +
                 [s.out_dir/"highway.mbtiles",
                  s.out_dir/"hiking.mbtiles"],
                 stdout=subprocess.PIPE).communicate()

subprocess.Popen(["tile-join",
                  "--force",
                  "--no-tile-compression",
                  "-e", s.out_dir/"pyr/"]
                 +
                 [s.out_dir/"highway.mbtiles",
                  s.out_dir/"hiking.mbtiles"],
                 stdout=subprocess.PIPE).communicate()

[f.unlink() for f in [s.out_dir/"highway.mbtiles", s.out_dir/"hiking.mbtiles"]]
