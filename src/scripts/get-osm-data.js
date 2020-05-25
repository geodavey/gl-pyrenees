const queryOverpass = require("@derhuerst/query-overpass");
const osmtogeojson = require("osmtogeojson");
const turf = require("@turf/turf");
const fs = require("fs");

const getSingleFeatureGeoJSON = (path) => {
  return JSON.parse(fs.readFileSync(path)).features[0];
};

const hrpLineString = getSingleFeatureGeoJSON("../data/hrp_route.geojson");
const pyrFootprint = getSingleFeatureGeoJSON("../data/pyr_footprint.geojson");
const bufferKm = 12;
const outDir = "../data";

// get bounding box from pyr footprint. osm has minY first
const pyrBbox = turf.bbox(pyrFootprint);
const osmBbox = `${pyrBbox[1]}, ${pyrBbox[0]}, ${pyrBbox[3]}, ${pyrBbox[2]}`;

console.log(pyrBbox);
return;
//
// Hiking Routes
//

queryOverpass(`
[out:json];
  ( rel[route="hiking"](${osmBbox});
  );
out geom meta;
`)
  .then((osmJSON) => {
    let routesCollection = osmtogeojson({ elements: osmJSON });
    routesCollection.features = routesCollection.features
      .map((feat) => {
        console.log(feat.id);
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
          typeof feat.geometry === "undefined" ||
          feat.geometry.type === "Point"
        )
      });

    saveGeoJSON(routesCollection, "hiking_routes");
  })
  .catch((err) => {
    console.log(err);
  });

//
//
//

const saveGeoJSON = (features, slug) => {
  fs.writeFileSync(`${outDir}/${slug}.geojson`, JSON.stringify(features));

  console.log(`Saved ${slug}...`);
};

const clipLineToPoly = (line, poly) => {
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
      if (typeof clippedCoords[0][0][0] !== "undefined")
        return turf.lineString(clippedCoords[0]).geometry;
      else return turf.lineString(clippedCoords).geometry;
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
    });

    return turf.multiLineString(newLineStrings).geometry;
  }
};

const filterTags = (tags, keepTags) => {
  let newTags = {};

  Object.keys(tags).forEach((key) => {
    if (keepTags.includes(key)) newTags[key] = tags[key];
  });

  return newTags;
};

return;

queryOverpass(`
  [out:json]; 
    ( 
        nwr[tourism="wilderness_hut"](${bbox});
        nwr[tourism="alpine_hut"](${bbox});
        nwr[shop="convenience"](${bbox});
        nwr[shop="supermarket"](${bbox});
    );
  out center;
`)
  .then((poiNodes) => {
    let poiFeatures = poiNodes
      .map(nodeToGeoJSON)
      .filter((n) => isNodeInBuffer(n, bufferKm));
    saveGeoJSON(poiFeatures, "pois");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });

const isNodeInBuffer = (node) => {
  return (
    turf.pointToLineDistance(node, hrpLineString, { units: "kilometers" }) <
    bufferKm
  );
};

const nodeToGeoJSON = (n) => {
  // convert Overpass response to GeoJSON
  // assumes all responses are nodes/points

  // use center lat/lon if lat/lon not defined (for relations/closed ways)
  let lon = typeof n.lon === "undefined" ? n.center.lon : n.lon;
  let lat = typeof n.lat === "undefined" ? n.center.lat : n.lat;

  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lon, lat],
    },
    properties: Object.assign({}, n.tags, { id: n.id }),
  };
};
