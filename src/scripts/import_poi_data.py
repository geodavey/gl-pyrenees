#!/usr/bin/env python3

import geopandas as gpd
import logging
import click
import json
import re

import settings as s

@click.command()
@click.argument("saved_places_json",
                default=(s.in_dir / "saved-places.json"))

def main(saved_places_json):
    log = logging.getLogger()

    ##
    ## Import Google Places POIs
    ##

    ## Input Google Places POIs
    in_path = saved_places_json
    in_pois = get_json(in_path)

    ## Output GeoJSON
    out_path = s.pyr_dir / "pois.geojson"
    out_pois = gpd.GeoDataFrame.from_file(out_path) if out_path.exists() else gpd.GeoDataFrame()

    ## Map saved-places properties to flat geojson properties
    for poi in in_pois['features']:
        poi['properties'] = {
            "cid": get_cid(poi['properties']['Google Maps URL']),
            "type": "",
            "place": "",
            "name": poi['properties']['Location']['Business Name'],
            "address": poi['properties']['Location']['Address'],
            "country": get_country(poi['properties']['Location']['Address'])
        }

    in_gdf = gpd.GeoDataFrame.from_features(in_pois)
    in_gdf = gpd.clip(in_gdf, s.pyr_footprint)
    
    ## Find features not already added in GeoJSON
    existing_cid = list() if not "cid" in out_pois.columns.tolist() else list(out_pois['cid'])
    new_pois = in_gdf[~in_gdf['cid'].isin(existing_cid)]

    if len(new_pois) > 0:
        log.info("Adding {} new POIs".format(len(new_pois)))
        out_pois = out_pois.append(new_pois)

        out_pois.to_file(out_path, driver="GeoJSON")
        log.info("Saved {}".format(s.rel_path(out_path)))
    else:
        log.info("No new POIs to add")

    ##
    ## Import Refuges
    ##

    ## Downloaded from https://www.pyrenees-refuges.com/api.php?type_fichier=GEOJSON
    ref_path = s.in_dir / "pyrenees-refuges.geojson"
    ref_gdf = gpd.GeoDataFrame.from_file(ref_path, driver="geojson")

    ref_gdf = ref_gdf[ref_gdf["type_hebergement"] != "ruine"]
    ref_gdf["id"] = ref_gdf["url"].apply(lambda u: int(u.split("=")[1]))
    ref_gdf["cap"] = ref_gdf["cap_ete"]
    ref_gdf["photo"] = ref_gdf["photo"].apply(lambda p: None if p == "refugesansphoto.jpg" else p)
    ref_gdf["alt"] = ref_gdf["altitude"].apply(lambda a: int(re.sub(r"[^0-9]", "", a)) if a else -1)

    ref_gdf.drop(columns=["altitude", "cap_hiver", "cap_ete", "region", "url", "type_hebergement"], inplace=True)

    log.info("Adding {} refuges".format(len(ref_gdf)))
    ref_gdf.to_file(s.pyr_dir / "refuges.geojson", driver="GeoJSON")

def get_cid(url):
    return url.split("?cid=")[1] if url.find("?cid=") > -1 else url

def get_country(address):
    if address.find("Spain") > -1:
        return "Spain"
    elif address.find("France") > -1:
        return "France"
    elif address.find("Andorra") > -1:
        return "Andorra"
    else:
        return None

def crop_raw(in_path):
    ## for cropping out unrelated starred places to commit only relevant to repo

    raw_pois = get_json(in_path)
    gdf_pois = gpd.GeoDataFrame.from_file(in_path)

    in_ids = list(gpd.clip(gdf_pois, s.pyr_footprint).index)
    raw_pois["features"] = [raw_pois['features'][i] for i in in_ids]

    write_json(in_path, raw_pois)

def get_json(path):
    with open(path) as json_data:
        return json.load(json_data)

def write_json(path, dict_):
    with open(path, "w") as json_file:
        json.dump(dict_, json_file, indent=4)

if __name__ == "__main__":
    main()
