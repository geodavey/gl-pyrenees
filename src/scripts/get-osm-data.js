const queryOverpass = require("@derhuerst/query-overpass");
const turf = require("@turf/turf");
const fs = require("fs");

const hrpLineStringPath = "../data/hrp-route.geojson";
const bufferDist = 2; // kilometers
const outDir = "../data";
const bbox = "42.12,-1.86,43.42,3.2";

const hrpLineString = JSON.parse(fs.readFileSync(hrpLineStringPath))
  .features[0];

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
  .then((nodes) => {
    let w_hut = nodes
      .filter((n) => {
        return n.tags.tourism && n.tags.tourism == "wilderness_hut";
      })
      .map(nodeToGeoJSON)
      .filter(isNodeInBuffer);

    let a_hut = nodes
      .filter((n) => {
        return n.tags.tourism && n.tags.tourism == "alpine_hut";
      })
      .map(nodeToGeoJSON)
      .filter(isNodeInBuffer);

    let conv = nodes
      .filter((n) => {
        return n.tags.shop && n.tags.shop == "convenience";
      })
      .map(nodeToGeoJSON)
      .filter(isNodeInBuffer);

    let supr = nodes
      .filter((n) => {
        return n.tags.shop && n.tags.shop == "supermarket";
      })
      .map(nodeToGeoJSON)
      .filter(isNodeInBuffer);

    saveGeoJSON(w_hut, "wilderness_huts");
    saveGeoJSON(a_hut, "alpine_huts");
    saveGeoJSON(conv, "convenience_stores");
    saveGeoJSON(supr, "supermarkets");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });

const isNodeInBuffer = (node) => {
  return (
    turf.pointToLineDistance(node, hrpLineString, { units: "kilometers" }) <
    bufferDist
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

const saveGeoJSON = (features, slug) => {
  let featCollection = turf.featureCollection(features);  

  fs.writeFileSync(
    `${outDir}/${slug}.geojson`,
    JSON.stringify(featCollection)
  );

  console.log(`Saved ${slug}...`);
};
