#!/usr/bin/env python3

from pyrosm import get_data
from pathlib import Path
import geopandas as gpd
import numpy as np
import subprocess
import tempfile
import logging
import pyrosm
import click
import re

import settings as s

@click.command()
@click.option("--overwrite", is_flag=True, help="Overwrite output data if exists?")
@click.option("--redownload", is_flag=True, help="Redownload raw input data if exists")

def main(overwrite, redownload):
    log = logging.getLogger()

    out_pbf = s.osm_dir / "pyrenees.osm.pbf"
    regions = ["spain", "andorra",
               "aquitaine", "midi_pyrenees", "languedoc_roussillon"] # franecosmc

    ## Make sure tmp osm/ directory exists
    s.osm_dir.mkdir(exist_ok=True)

    ##
    ## Download all regions .osm.pbf
    ##

    for r in regions:
        r_path = s.osm_dir / "{}-latest.osm.pbf".format(r.replace("_", "-"))

        if not r_path.exists() or redownload:
            log.info("Downloading {}".format(r))
            get_data(r, directory=str(s.osm_dir), update=redownload)

    ##
    ## Merge & Crop to pyrenees region
    ##

    if not out_pbf.exists() or redownload:
        log.info("Merging and Cropping...".format(s.rel_path(out_pbf)))

        ## Get pyrenees footprint for cropping
        pyr_polyfile = polygon_to_polyfile(s.pyr_footprint)

        ## https://help.openstreetmap.org/questions/48843/merging-two-or-more-geographical-areas-to-import-two-or-more-osm-files-in-nominatim
        ## Convert .osm.pbf to .o5m for merging
        pbf_paths = list(s.osm_dir.glob("*-latest.osm.pbf"))

        for p in pbf_paths:
            log.debug("Converting {}".format(p.stem))
            subprocess.Popen(["osmconvert", p] + ["-o={}/{}.o5m".format(p.parent, p.stem)], stdout=subprocess.PIPE).communicate()

        ## Merge .o5m and crop
        out_o5m = s.osm_dir / "pyrenees.osm.o5m"
        o5m_paths = list(s.osm_dir.glob("*-latest.osm.o5m"))

        log.debug("Merging")
        subprocess.Popen(["osmconvert"] + o5m_paths + ["-o={}".format(out_o5m)],
                         stdout=subprocess.PIPE).communicate()

        ## Convert to pbf
        log.debug("Compressing")
        subprocess.Popen(["osmconvert"] + [out_o5m] + ["-B={}".format(pyr_polyfile)] + ["-o={}".format(out_pbf)],
                         stdout=subprocess.PIPE).communicate()

        ## Delete temp o5m files
        log.debug("Deleting temp .o5m files")
        out_o5m.unlink()
        for o in o5m_paths:
            o.unlink()

        log.info("Output: {}".format(s.rel_path(out_pbf)))

    else:
        log.info("Using cached {}".format(s.rel_path(out_pbf)))

    ##
    ## Extract to GeoJSON 
    ##

    log.info("Loading data {}".format(s.rel_path(out_pbf)))
    pyr = pyrosm.OSM(str(out_pbf))
    log.info("Loaded")

    s.pyr_dir.mkdir(exist_ok=True)

    ##
    ## Paths
    ##

    if not gjn_exists("paths") or overwrite:
        paths = pyr.get_data_by_custom_criteria(custom_filter = {"highway": ["path"]},
                                                osm_keys_to_keep = "highway",
                                                filter_type = "keep",
                                                keep_nodes = False,
                                                keep_relations = False)

        tracks = pyr.get_data_by_custom_criteria(custom_filter = {"highway": ["track"]},
                                                 osm_keys_to_keep="highway",
                                                 filter_type = "keep",
                                                 keep_nodes = False,
                                                 keep_relations = False)

        save_gjn(paths[["highway", "geometry"]], "paths")
        save_gjn(tracks[["highway", "geometry"]], "tracks")

    ##
    ## Highways
    ##


    if not gjn_exists("highways_maj") or overwrite:

        highways = pyr.get_data_by_custom_criteria(custom_filter = {},
                                                  osm_keys_to_keep = "highway",
                                                  filter_type = "keep",
                                                  tags_as_columns = ["highway"],
                                                  keep_nodes = False,
                                                  keep_relations = False)

        save_gjn(highways[["highway", "geometry"]], "highways_")

    ##
    ## Peaks
    ##

    if not gjn_exists("peaks") or overwrite:
        peaks = pyr.get_data_by_custom_criteria(custom_filter = {"natural": ["peak"]},
                                                osm_keys_to_keep="natural",
                                                filter_type="keep",
                                                extra_attributes=["ele", "name"],
                                                keep_ways = False,
                                                keep_relations = False)

        ## filter only peaks with elevation that look like above 3000m
        peaks = peaks[["ele", "name", "geometry"]]
        peaks = peaks[peaks['ele'].notnull()]
        peaks = peaks[peaks.ele.str.contains("^3[0-9]{3}")]

        ## interpret ele as integer and sort by ele
        peaks["ele"] = peaks['ele'].apply(lambda d: re.findall("[0-9]{4}", d)[0]).astype(np.int64)
        peaks = peaks.sort_values("ele", ascending=True).reset_index(drop=True)

        save_gjn(peaks, "peaks")

    ##
    ## Major hiking routes
    ##

    if not gjn_exists("routes") or overwrite:
        routes = pyr.get_data_by_custom_criteria(custom_filter = {"route": ["hiking"], "network": ["iwn", "nwn"]},
                                                 osm_keys_to_keep = "route",
                                                 extra_attributes = ["ref", "name", "network"],
                                                 keep_nodes = False)

        routes = routes[["name", "ref", "network", "geometry"]]

        save_gjn(routes, "hiking")

    log.info("Done")
    
def gjn_exists(name):
    return (s.pyr_dir / "{}.geojson".format(name)).exists()

def save_gjn(gdf, name):
    out_path = s.pyr_dir / "{}.geojson".format(name)
    logging.getLogger().info("Saving {}".format(s.rel_path(out_path)))

    return gdf.to_file(out_path, driver="GeoJSON")

def polygon_to_polyfile(polygon):
    ## Simple polygon to temporary polyfile for clipping

    polydata = b"pyrenees\n1\n"

    (x, y) = polygon.exterior.xy
    for coord in zip(x, y):
        polydata += "   {:.6f}   {:.6f}\n".format(coord[0], coord[1]).encode() # encode to bytes

    polydata += b"END"

    ## Create temporary poly file
    polyfile = tempfile.NamedTemporaryFile(delete=False)
    polyfile.write(polydata)

    return polyfile.name

if __name__ == "__main__":
    main()
