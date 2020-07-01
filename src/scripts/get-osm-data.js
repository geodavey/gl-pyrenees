const queryOverpass = require("@derhuerst/query-overpass");
const osmtogeojson = require("osmtogeojson");
const turf = require("@turf/turf");
const fs = require("fs");

const getSingleFeatureGeoJSON = (path) => {
  return JSON.parse(fs.readFileSync(path)).features[0];
};

const pyrFootprint = getSingleFeatureGeoJSON("../data/pyrenees/footprint.geojson");
const outDir = "../data/pyrenees";

// get bounding box from pyr footprint. osm has minY first
const pyrBbox = turf.bbox(pyrFootprint);
const osmBbox = `${pyrBbox[1]}, ${pyrBbox[0]}, ${pyrBbox[3]}, ${pyrBbox[2]}`;

//
// Peaks > 3000m
//

queryOverpass(`
[bbox:${osmBbox}][out:json];
  ( node[natural="peak"]["ele"~"^3[0-9]{3}"]["name"]["ele"]; );
out geom meta;
`).then((osmJSON) => {
  let peaksCollection = osmtogeojson({ elements: osmJSON });
  peaksCollection.features = peaksCollection.features.map((feat) => {
    feat.properties = filterTags(feat.properties, [
      "name",
      "prominence",
      "ele",
    ]);

    feat.properties.ele = parseInt(feat.properties.ele);
    feat.properties.prominence = parseInt(feat.properties.prominence);

    return feat;
  }).sort((ft1, ft2) => ft1.properties.ele < ft2.properties.ele ? -1 : 1);

  saveGeoJSON(peaksCollection, "peaks3000");
});

//
// Hiking Routes
//

queryOverpass(`
[out:json];
  ( rel[route="hiking"][network~"iwn|nwn"](${osmBbox}); );
out geom meta;
`)
  .then((osmJSON) => {
    let routesCollection = osmtogeojson({ elements: osmJSON });
    routesCollection.features = routesCollection.features
      .map((feat) => {
        feat.properties = filterTags(feat.properties, [
          "name",
          "ref",
          "network",
        ]);
        feat.geometry = clipAllLinesToPoly(feat.geometry, pyrFootprint);

        return feat;
      })
      .filter((feat) => {
        // filter out Point's and feats with no geom
        // if linestring was fully outside clip it will have no geom
        return !(
          typeof feat.geometry === "undefined" || feat.geometry.type === "Point"
        );
      });

    saveGeoJSON(routesCollection, "hiking");
  })
  .catch((err) => {
    console.log(err);
  });

const clipLineToPoly = (line, poly) => {
  // node has no geometry clipping libraries i could find for multilinestrings?
  // roll my own...
  let clippedCollection = turf.lineSplit(line, poly);
  let clippedFeats = clippedCollection.features;

  let firstPointInside = turf.booleanPointInPolygon(
    turf.point(line.geometry.coordinates[0]),
    poly
  );

  // if no features clipped, check if whole line is inside or out
  // if features clipped, only add segments inside poly
  if (clippedFeats.length == 0) {
    return firstPointInside ? line.geometry.coordinates : [];
  } else {
    let newCoords = [];

    clippedFeats.forEach((feat, idx) => {
      // if first point is inside, add all even numbered features
      // if first point is outside, add all odd numbered features
      if ((firstPointInside + idx + 1) % 2 === 0) {
        newCoords.push(feat.geometry.coordinates);
      }
    });

    return newCoords;
  }
};

const clipAllLinesToPoly = (lines, poly) => {
  if (lines.type == "LineString") {
    let clippedCoords = clipLineToPoly(turf.feature(lines), poly);
    if (clippedCoords.length == 0) return;
    else {
      // TODO figure out why this makes it all work
      if (typeof clippedCoords[0][0][0] !== "undefined")
        return turf.lineString(clippedCoords[0]).geometry;
      else return turf.lineString(clippedCoords).geometry;
      //
    }
  } else if (lines.type == "MultiLineString") {
    let newLineStrings = [];

    lines.coordinates.forEach((lineCoords) => {
      let clippedCoords = clipLineToPoly(turf.lineString(lineCoords), poly);

      if (clippedCoords.length == 0) return;

      // TODO figure out why this makes it all work
      if (typeof clippedCoords[0][0][0] !== "undefined")
        newLineStrings.push(clippedCoords[0]);
      else newLineStrings.push(clippedCoords);
      //
    });

    return turf.multiLineString(newLineStrings).geometry;
  }
};

//
// Utils
//

const saveGeoJSON = (featureCollection, slug) => {
  fs.writeFileSync(`${outDir}/${slug}.geojson`, JSON.stringify(featureCollection, null, 2));

  console.log(`Saved ${slug}... (${featureCollection.features.length} features)`);
};

const filterTags = (tags, keepTags) => {
  let newTags = {};

  Object.keys(tags).forEach((key) => {
    if (keepTags.includes(key)) newTags[key] = tags[key];
  });

  return newTags;
};